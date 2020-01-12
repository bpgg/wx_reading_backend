var express = require('express')
var path = require('path')
var md5 = require('blueimp-md5')

var router = express.Router()

// 获取操作模块
var User = require(path.join(__dirname,'./models/user'))

router.get('/',(req,res)=>{
    // console.log(req.session.user)
    res.send('index')
   
})

router.post('/login',async (req,res)=>{
    // console.log(req.session.user)
   var body = req.body
   try{
    if (await User.findOne({ phone: body.phone ,password: md5(md5(body.password))})) {
        // 用户存在，登陆成功，通过 Session 记录登陆状态
        req.session.user = user
        return res.status(200).json({
          err_code: 0,
          message: '登录成功'
        })
     }

    res.status(200).json({
      err_code: 1,
      message: '账号或密码错误'
    })
   }catch(err){
        res.status(500).json({
            err_code: 500,
            message: err.message
        })
   } 
})

router.post('/register', async function (req, res) {
  var body = req.body
  try {
    if (await User.findOne({ email: body.email })) {
      return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在'
      })
    }

    if (await User.findOne({ nickname: body.nickname })) {
      return res.status(200).json({
        err_code: 2,
        message: '昵称已存在'
      })
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))

    // 创建用户，执行注册
    await new User(body).save()

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  } catch (err) {
    res.status(500).json({
      err_code: 500,
      message: err.message
    })
  }
})


module.exports = router