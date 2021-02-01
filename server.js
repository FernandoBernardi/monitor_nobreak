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
        await axios.get("http://192.168.0.1:64111/medicoes.cgi")
            .then(async response => {
                    try {
                        const {
                            statusasyncFunction(response.data, "logsnobreak");
                        } catch (err) {
                            console.error(err);
                        }
                    })
                .catch(error => {
                    console.error(error);
                })
                // Nobreak 2
                await axios.get("http://192.168.0.1:64112/medicoes.cgi")
                .then(async response => {
                    asyncFunction(response.data, "logsnobreak2");
                })
                .catch(error => {
                    console.error(error);
                })
            }
        catch (error) {
            console.error(error);
        }
    }
    // Armazenar no banco de dados as informações
    async function asyncFunction(dataref, tabela) {
        let conn, result;
        try {
            const tratamento = dataref.replace(/[\(,\),\%]/g, "").replace("&#176;", "");
            const arrayData = tratamento.split(/\s/g);
            const sqlTab = `INSERT INTO ${tabela} (entradaR,entradaS,entradaT,entradaFreq,bypassR,bypassS,bypassT,freqBypass,saidaR,saidaS,saidaT,freqSaida,potSaidaAparentR,potSaidaAparentS,potSaidaAparentT,potSaidaAtivaR,potSaidaAtivaS,potSaidaAtivaT,correnteSaidaR,correnteSaidaS,correnteSaidaT,barramento,bateria,temperatura) VALUES (${arrayData[0]},${arrayData[2]},${arrayData[4]},${arrayData[6]},${arrayData[8]},${arrayData[10]},${arrayData[12]},${arrayData[14]},${arrayData[16]},${arrayData[18]},${arrayData[20]},${arrayData[22]},${arrayData[24]},${arrayData[27]},${arrayData[30]},${arrayData[33]},${arrayData[36]},${arrayData[39]},${arrayData[42]},${arrayData[45]},${arrayData[48]},${arrayData[51]},${arrayData[53]},${arrayData[55]})`;
            conn = await conexaorMariadb.getConnection();
            const { affectedRows } = await conn.query(sqlTab);
            if (affectedRows === 1) {
                result = {
                    status: 200
                }
            } else {
                result = {
                    status: 500
                }
            }
            return result;
        } catch (err) {
            console.error(err);
            return { status: 500 }
        } finally {
            if (conn) {
                conn.end();
            }
        }
    }

    async function kill_old_process_node() {
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

    // Intervalo buscar informações e inserir no banco
    setInterval(async() => {
        await get_nobreak();
    }, 1000);

    // Intervalo para matara antigos processos node
    setInterval(async() => {
        await kill_old_process_node();
    }, 7200000);