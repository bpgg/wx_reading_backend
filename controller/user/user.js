import db_user from '../../dao/user/user'
var crypto = require('crypto')
import formidable from 'formidable'
import db from '../../mysql/db'
var path = require("path")
var fs = require("fs")

const request = require('request')

const appid = "wxda7c6c9805840a1a"
const appsecret = "c7a2f0da2e741d3c32bee74cf21dc547"

class User{
  constructor(){

  }
	
  async login(req,res){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
      const {user_id, password} = fields;
			
			const newpassword = password;
			try{
				var user = await db_user.getUserByID(user_id)
				if (!user) {
					res.send({
						status: 0,
						type: 'USER_NOT_EXIST',
						msg:'用户不存在'
					})
				}else if(newpassword.toString() !== user.password.toString()){
					console.log('登录密码错误');
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '密码输入错误'
					})
				}else{
					req.session.user_id = user_id;
					res.send({
						status: 1,
						success: '登录成功'
					})
				}
			}catch(err){
				console.log('登录失败', err);
				res.send({
					status: 0,
					type: 'LOGIN_FAILED',
					message: '登录失败'
				})
			}
		})
	}
	async register(req,res){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				return res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
			}
			const {user_id, password} = fields;

			try{
				var user = await db_user.getUserByID(user_id)
				if (user) {
					console.log('该用户已经存在');
					res.send({
						status: 0,
						type: 'USER_HAS_EXIST',
						message: '该用户已经存在',
					})
				}else{
					// const newpassword = this.encryption(password);
					await db_user.createUser({user_id:user_id,password:password})
					req.session.user_id = user_id;
			
					res.send({
						status: 1,
						message: '注册成功',
					})
				}
			}catch(err){
				console.log('注册失败', err);
				res.send({
					status: 0,
					type: 'REGISTER_USER_FAILED',
					message: '注册失败',
				})
			}
		})
	}

  encryption(password){
		const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		return newpassword
	}
	Md5(password){
		const md5 = crypto.createHash('md5');
		return md5.update(password).digest('base64');
  }
  
  async logout(req, res, next){
		try{
			delete req.session.user_id;
			res.send({
				status: 1,
				message: '退出成功'
			})
		}catch(err){
			console.log('退出失败', err)
			res.send({
				status: 0,
				message: '退出失败'
			})
		}
	}
	async updateAvatar2(req, res, next){
		console.log('123')
	}
  
  async updateAvatar(req, res, next){
		var form = new formidable.IncomingForm();//既处理表单，又处理文件上传
    //设置文件上传文件夹/路径，__dirname是一个常量，为当前路径
    let uploadDir = path.join(__dirname, "../../upload/");
    form.uploadDir = uploadDir;//本地文件夹目录路径

    form.parse(req, (err, fields, files) => {
				
				let {openid} = fields
				console.log(files.file)
        let oldPath = files.file.path;//这里的路径是图片的本地路径
        console.log(files.file.name)//图片传过来的名字
        let newPath = path.join(path.dirname(oldPath), files.file.name);
        //这里我传回一个下载此图片的Url
				// var downUrl = "http://localhost:" + 3000 + "/upload/" + files.file.name;//
				var downUrl = "http://localhost:" + 3000 + "/" + files.file.name;//
				db_user.wx_updateAvatar(openid,downUrl)
        fs.rename(oldPath, newPath, () => {//fs.rename重命名图片名称
            res.json({ downUrl: downUrl })
        })
    })
		// res.send({
		// 	status: 1,
		// 	success: '更新头像成功'
		// })
	}
	async wx_getStoryShelf(req,res){
		var openid = req.query.openid
		var storys = await db_user.wx_getStoryShelf(openid)
		res.send({
			data:storys
		})
	}
	async wx_getUserInfo(req,res){
		var openid = req.query.openid
		var user = await db_user.wx_getUserInfo(openid)
		res.send({
			data:user
		})
	}
	async wx_updateUserInfo(req,res){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			let {openid,nickName,gender} = await fields;
			gender = (gender=='男')?1:0;
			let userInfo = {
				gender:gender,
				nickName:nickName
			}
			var user = await db_user.wx_updateUserInfo(openid,userInfo)
			res.send({
				data:user
			})
		})
		
		
	}
	async getUserInfo(req,res){
		var user_id = req.query.user_id
		var user = await db_user.getUserByID(user_id)
		res.send({
			data:user
		})
	}
	async getUsers(req,res){
		var users = await db_user.getUsers()
		res.send({
			data:users
		})
	}
	async wx_login(req,res2){
		let form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if(err){
            return res.send({
							status: 0,
							message: '获取用户信息失败'
						});
				}
				let { code,userInfo} = fields 
				userInfo = JSON.parse(userInfo)
				console.log(fields)
				const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`
				request(url, async(err,res,body)=>{

					body = JSON.parse(body);
					let {openid,session_key} = body;
					console.log('openid',openid);
					console.log('session_key',session_key)
					// 根据openid判断是否已经存在数据库，不存在则生成wx_user存进数据
					const flag = await db_user.wx_hasUser(openid)
					
					if(!flag){
						await db_user.wx_saveUser(userInfo,openid)
					}
					res2.send({
						data:body
					})  //将请求到的 OpenID与 session_key 返回给小程序页面js文件
				})
    });

	}

	async wx_getBookShelf(req,res){
		const openid = req.query.openid
		const data = await db_user.wx_getBookShelf(openid)
		return res.send({
			data:data
		})
	}
	async wx_addBook(req,res){
		const {openid,book_id}  = req.query
		const data = await db_user.wx_addBook(openid,book_id)
		return res.send({
			msg:'success'
		})
	}

	async wx_removeBook(req,res){
		const {openid,book_id}  = req.query
		const data = await db_user.wx_removeBook(openid,book_id)
		res.send({
			data:data
		})
	}

	async wx_hasStoreBook(req,res){
		const {openid,book_id}  = req.query
		const data = await db_user.wx_hasStoreBook(openid,book_id)
		res.send({
			hasAdd:data
		})
	}


}

export default new User()