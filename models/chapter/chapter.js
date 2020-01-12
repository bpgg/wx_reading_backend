var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/users_db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

var Schema = mongoose.Schema

const ChapterSchema = new Schema({
	book_chapterListID:{
    type: Schema.Types.ObjectId, ref: 'book'
  },
  book_chapterList:{
    type:Array
  }
  
})

const Chapter =  mongoose.model('Chapter',ChapterSchema)

module.exports = Chapter