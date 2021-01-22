const http = require('http');
const mariadb = require('mariadb');
const interval = require('interval-promise');
//Conexão com o banco e url para pegar as informações
const optionsNobreak1 = {
    host: '192.168.0.1',
    port: '64111',
    path: '/medicoes.cgi'
}
const optionsNobreak2 = {
  host: '192.168.0.1',
  port: '64112',
  path: '/medicoes.cgi'
}
const optionsDB = {
  host: '127.0.0.1',
  port: '3306',
  user:'root',
  password: '',
  database: 'logsnobreak',
  connectionLimit: 5
}
const conexaorMariadb = mariadb.createPool(optionsDB);

// Função para buscar informações da url 1
function get_nobreak_1(){
  http.get(optionsNobreak1, (res) => {
    let data = '';
    res.on('data', (collect) => { data += collect; });
    res.on('end', async () => {
      try {
        await asyncFunction(data, "logsnobreak");
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on("error", (e) => {
    console.error("Error: " + e.message);
  });
}
// Função para buscar informações da url 2
function get_nobreak_2(){
  http.get(optionsNobreak2, (res) => {
    let data = '';
    res.on('data', (collect) => { data += collect; });
    res.on('end', async () => {
      try {
        await asyncFunction(data, "logsnobreak2");
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on("error", (e) => {
  console.error("Error: " + e.message);
  });
}
// Armazenar no banco de dados as informações
async function asyncFunction(dataref,tabela){
  const tratamento = dataref.replace(/[\(,\),\%]/g,"").replace("&#176;","");
  const arrayData = tratamento.split(/\s/g);
  const sqlTab = `INSERT INTO ${tabela} (entradaR,entradaS,entradaT,entradaFreq,bypassR,bypassS,bypassT,freqBypass,saidaR,saidaS,saidaT,freqSaida,potSaidaAparentR,potSaidaAparentS,potSaidaAparentT,potSaidaAtivaR,potSaidaAtivaS,potSaidaAtivaT,correnteSaidaR,correnteSaidaS,correnteSaidaT,barramento,bateria,temperatura) VALUES (${arrayData[0]},${arrayData[2]},${arrayData[4]},${arrayData[6]},${arrayData[8]},${arrayData[10]},${arrayData[12]},${arrayData[14]},${arrayData[16]},${arrayData[18]},${arrayData[20]},${arrayData[22]},${arrayData[24]},${arrayData[27]},${arrayData[30]},${arrayData[33]},${arrayData[36]},${arrayData[39]},${arrayData[42]},${arrayData[45]},${arrayData[48]},${arrayData[51]},${arrayData[53]},${arrayData[55]})`;
  let conn;
  try{
    conn = await conexaorMariadb.getConnection();
    await conn.query(sqlTab);   
  }catch(err){
    throw err;
  } finally {
    if (conn){
     return conn.release();
    }      
  }
}
// Intervalo com Promisse para aguardar o resultado e não criar várias Instâncias!
interval(async () => {
  await get_nobreak_1();
  await get_nobreak_2();
}, 1000)