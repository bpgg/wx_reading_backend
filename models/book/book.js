var mongoose = require('mongoose')
var Chapter = require('../chapter/chapter')
mongoose.connect('mongodb://localhost:27017/users_db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

var Schema = mongoose.Schema

const BookSchema = new Schema({
	book_id: {
    type:Number,
    required:true
  },
	book_name:{
    type:String,
    required:true
  },
  book_introduction:{},
  book_coverImage:{
    type:String,
    default:'./default.jpg'
  },
  // 阅读者
  book_readerNum:{
    type:Number,
    default:0
  },
  book_chapterListID:{
    type:Number,
    default:0
    // required:true
  },
  book_commentListID:{
    type:Number
  },
  author:{
    type:String
  },
	created_time: String
})

console.log(Chapter)
const Book =  mongoose.model('Book',BookSchema)

// Book.create({
//   book_id:123,
//   book_name:'美丽的世界',
//   book_chapterListID:001
// },function(err,doc){
//   if(err) console.log('err');
//   console.log('success');
//   Chapter.create({
//     book_chapterListID:doc._id,
//     book_chapterList:[
//       "哈哈哈",
//       "dfdf",
//       "dsfsdf"
//     ]
//   },function(err,doc){
//     console.log(err)
//   })
// })
Book.find({},(err,data)=>{
  console.log(data)
})
Chapter.find({},(err,data)=>{
  console.log(data);
})

module.exports = Book