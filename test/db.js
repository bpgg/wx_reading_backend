
let { init, exec, sql, transaction } = require('mysqls')

init({
  host: 'localhost',
  user: 'root',
  password:'admin',
  database: 'wx_reading',
  port: 3306,
})

const sqlstr = sql
    .table('user')
    .field('id,username')
    .where({id:1})
    .select();

var getData = async(sqlstr)=>{
  const result = await exec(sqlstr);
  console.log(result[0].id);
}
getData(sqlstr)