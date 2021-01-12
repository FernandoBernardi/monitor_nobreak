const http = require('http');
const mariadb = require('mariadb');
const options = {
    host: '127.0.0.1',
    path: '/text.cgi'
}
let optionsDB = {
  host: '127.0.0.1', 
  port: '3306',
  user:'root', 
  password: '',
  database: 'dataNobreak',
  connectionLimit: 5
}
setInterval(() => {
    let request = http.request(options, (res) => {
        let data = '';
        res.on('data', (atualStage) => {
            data += atualStage;
        });        
        res.on('end', async () => {          
          try{
            await asyncFunction(data, "logsnobreak");
          }catch(err){
            console.error(err);
            throw(err);
          }
        });
    });
    request.on('error', (e) => {
        console.log(e.message);
    });
    request.end();
    let request2 = http.request(options, function (res) {
      let data2 = '';
      res.on('data', (atualStage) => {
          data2 += atualStage;
      });        
      res.on('end', async () => {          
        try{
          await asyncFunction(data2, "logsnobreak2");
        }catch(err){
          console.error(err);
          throw(err);
        }
      });
    });
    request2.on('error', (e) => {
        console.error(e.message);
    });
    request2.end();
}, 1000);

// async function asyncFunction(dataref,tabela){
//     let tratamento = dataref.replace(/[\(,\),\%]/g,"");
//     let arrayData = tratamento.split(/\s/g);
//     const dataAtual = new Date();
//     const sqlData = "INSERT INTO "+tabela+" (dataTempo,valor1,valor2,valor3,valor4,valor5,valor6,valor7,valor8,valor9,valor10,valor11,valor12,valor13,valor14,valor15,valor16,valor17) VALUES ?";
//     let valuesData = [dataAtual,arrayData[0],arrayData[1],arrayData[2],arrayData[3],arrayData[4],arrayData[5],arrayData[6],arrayData[7],arrayData[8],arrayData[9],arrayData[10],arrayData[11],arrayData[12],arrayData[13],arrayData[14],arrayData[15],arrayData[16]];
//     mariadb.createConnection(optionsDB)
//     .then(conn => {
//       conn.query(sqlData, [valuesData])
//         .then(() => {
//           conn.end();          
//         })
//         .catch(err => { 
//           console.error(err);
//           throw err;
//         });
//     })
//     .catch(err => {
//       console.error(err);
//       throw err;
//     });
//   }