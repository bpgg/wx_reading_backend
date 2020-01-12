// var mysql   = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'admin',
//   database : 'wx_reading',
//   port: 3306
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });


let { init, exec, sql, transaction } = require('mysqls')

init({
  host: 'localhost',
  // host: '192.168.1.131',
  user: 'root',
  password:'admin',
  database: 'wx_reading',
  port: 3306,
})

var db = {
  exec:exec,
  sql:sql,
  transaction:transaction
}

export default db