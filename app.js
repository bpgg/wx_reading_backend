import config from './config';
import session from 'express-session';
import express from 'express';
import router from './routes/index.js';
import db from './mysql/db'

const app = express()

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})


app.use(session({
    name: config.session.name,
    secret: config.session.secret,
    resave: true,
    saveUninitialized: false,
    cookie: config.session.cookie,
    // store: new MongoStore({
    //   url: config.url
    // })
}))

router(app);


app.use(express.static('./public'));
app.use(express.static('./upload'));

app.listen(config.port, () => {
	console.log(`成功监听端口：${config.port}`)
});

process.on('exit', (code) => {
    // 关闭数据库连接
    db.end((err)=>{
        if(err)  return console.log('关闭数据库失败'); 
        console.log('关闭数据库成功');
    })
 });