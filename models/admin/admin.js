var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/users_db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

var Schema = mongoose.Schema

const AdminSchema = new Schema({
	account_id: {
        type:Number,
        required:true
    },
	password:{
        type:String,
        required:true
    },
	created_time: String,
	status: {
        type:Number,
        // 0 管理员可以登录，1 管理员无法登录
        enum:[0,1],
        default:0
    },
	avatar: {type: String, default: '/public/img/avator-default.png'}
})

const Admin =  mongoose.model('Admin',AdminSchema)

module.exports = Admin