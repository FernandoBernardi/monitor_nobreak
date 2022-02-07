const mariadb = require("mariadb");
const axios = require("axios");
const { exec } = require("child_process");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Conexão com o banco e url para pegar as informações
const optionsDB = {
  host: "localhost",
  port: "3306",
  user: "nobreak",
  password: "n0br3ak",
  database: "logsnobreak",
  connectionLimit: 5,
};
// const optionsDB = {
//   host: "127.0.0.1",
//   port: "3306",
//   user: "root",
//   password: "",
//   database: "logsnobreak",
//   connectionLimit: 5,
// };
const conexaorMariadb = mariadb.createPool(optionsDB);
// Função para buscar informações servidor

// app.post("/", async (req, res, next) => {
//   // console.log(req.body.DATA);
//   logs_wattmeter(req.body.DATA);
// });

// app.listen(1000, () => console.log("Escutando na porta 1000"));

// async function logs_wattmeter(parms) {
//   let conn;
//   const dataAtual = new Date();
//   try {
//     const sqlTab =
//       "INSERT INTO logswattmeter (criado_em,VARMS,VBRMS,VCRMS,IARMS,IBRMS,ICRMS,VABRMS,VBCRMS,VCARMS,VABCTRMS,PA,PB,PC,PT,QA,QB,QC,QT,SA,SB,SC,ST,FPA,FPB,FPC,FPT,KVARHA,KVARHB,KVARHC,KVARHT,KWHA,KWHB,KWHC,KWHT,FREQ,TEMP,SERRS) VALUES ?";
//     const sqlQuery = [
//       dataAtual,
//       parms.VARMS,
//       parms.VBRMS,
//       parms.VCRMS,
//       parms.IARMS,
//       parms.IBRMS,
//       parms.ICRMS,
//       parms.VABRMS,
//       parms.VBCRMS,
//       parms.VCARMS,
//       parms.VABCTRMS,
//       parms.PA,
//       parms.PB,
//       parms.PC,
//       parms.PT,
//       parms.QA,
//       parms.QB,
//       parms.QC,
//       parms.QT,
//       parms.SA,
//       parms.SB,
//       parms.SC,
//       parms.ST,
//       parms.FPA,
//       parms.FPB,
//       parms.FPC,
//       parms.FPT,
//       parms.KVARHA,
//       parms.KVARHB,
//       parms.KVARHC,
//       parms.KVARHT,
//       parms.KWHA,
//       parms.KWHB,
//       parms.KWHC,
//       parms.KWHT,
//       parms.FREQ,
//       parms.TEMP,
//       parms.SERRS,
//     ];
//     conn = await conexaorMariadb.getConnection();
//     await conn.query(sqlTab, [sqlQuery]);
//   } catch (err) {
//     console.error(err.stack);
//   } finally {
//     if (conn) {
//       conn.end();
//     }
//   }
// }

async function getNobreakData() {
  try {
    // Nobreak 1
    axios
      .get("http://192.168.0.1:64111/medicoes.cgi")
      .then(async (response) => {
        try {
          await insertDB(response.data, "logsnobreak");
        } catch (err) {
          throw new Error("Não foi possível inserir no banco de dados");
        }
      })
      .catch((err) => {
        console.error(err.stack);
        throw new Error("Não foi possível coletar as informações nobreak 1");
      });
    // Nobreak 2
    axios
      .get("http://192.168.0.1:64112/medicoes.cgi")
      .then(async (response) => {
        try {
          await insertDB(response.data, "logsnobreak2");
        } catch (err) {
          throw new Error("Não foi possível inserir no banco de dados");
        }
      })
      .catch((err) => {
        console.error(err.stack);
        throw new Error("Não foi possível coletar as informações nobreak 1");
      });
  } catch (err) {
    console.error(err.stack);
  } finally {
    setTimeout(getNobreakData, 1000);
  }
}
// Armazenar no banco de dados as informações
async function insertDB(dataref, tabela) {
  let conn;
  try {
    const tratamento = dataref.replace(/[\(,\),\%]/g, "").replace("&#176;", "");
    const arrayData = tratamento.split(/\s/g);
    const sqlTab = `INSERT INTO ${tabela} (entradaR,entradaS,entradaT,entradaFreq,bypassR,bypassS,bypassT,freqBypass,saidaR,saidaS,saidaT,freqSaida,potSaidaAparentR,potSaidaAparentS,potSaidaAparentT,potSaidaAtivaR,potSaidaAtivaS,potSaidaAtivaT,correnteSaidaR,correnteSaidaS,correnteSaidaT,barramento,bateria,temperatura) VALUES (${arrayData[0]},${arrayData[2]},${arrayData[4]},${arrayData[6]},${arrayData[8]},${arrayData[10]},${arrayData[12]},${arrayData[14]},${arrayData[16]},${arrayData[18]},${arrayData[20]},${arrayData[22]},${arrayData[24]},${arrayData[27]},${arrayData[30]},${arrayData[33]},${arrayData[36]},${arrayData[39]},${arrayData[42]},${arrayData[45]},${arrayData[48]},${arrayData[51]},${arrayData[53]},${arrayData[55]})`;
    conn = await conexaorMariadb.getConnection();
    await conn.query(sqlTab);
  } catch (err) {
    console.error(err.stack);
  } finally {
    if (conn) {
      conn.end();
    }
  }
}
// Matar processos que estiverem em aberto
function kill_old_process_node() {
  exec("pkill node", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}
// Chama a função para começar o monitoramento
getNobreakData();
// Intervalo de duas hora para matar os processos que ficaram em aberto
setInterval(() => {
  kill_old_process_node();
}, 7200000);
