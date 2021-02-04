const mariadb = require('mariadb');
const axios = require('axios');
const { exec } = require("child_process");
//Conexão com o banco e url para pegar as informações
const optionsDB = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'logsnobreak',
    connectionLimit: 5
}
const conexaorMariadb = mariadb.createPool(optionsDB);

// Função para buscar informações servidor
async function get_nobreak() {
    try {
        // Nobreak 1
        axios.get("http://192.168.0.1:64111/medicoes.cgi")
            .then(async response => {
                try {
                    await insertDB(response.data, "logsnobreak");
                } catch (err) {
                    throw new Error("Não foi possível inserir no banco de dados");
                }
            })
            .catch(err => {
                console.error(err.stack);
                throw new Error("Não foi possível coletar as informações nobreak 1");
            })

        // Nobreak 2
        axios.get("http://192.168.0.1:64112/medicoes.cgi")
            .then(async response => {
                try {
                    await insertDB(response.data, "logsnobreak2");
                } catch (err) {
                    throw new Error("Não foi possível inserir no banco de dados");
                }
            })
            .catch(err => {
                console.error(err.stack);
                throw new Error("Não foi possível coletar as informações nobreak 2");
            })
    } catch (err) {
        console.error(err.stack);
    } finally {
        setTimeout(get_nobreak, 1000);
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
    exec("sudo pkill node", (error, stdout, stderr) => {
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
get_nobreak();
// Intervalo de duas hora para matar os processos que ficaram em aberto
setInterval(() => { kill_old_process_node() }, 7200000);