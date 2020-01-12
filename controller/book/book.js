import db_book from '../../dao/book/book'
import formidable from 'formidable'
import db from '../../mysql/db'

// 
class Book{
  constructor(){

  }
  // 通用操作

  // 获取首页展示书籍的基本信息
	async getBooks(req,res){
    const data = await db_book.getBooks()
    res.send({
      data:data
    })
  }
  // 根据类别获取书籍信息
  async getBooksByCategory(req,res){
    console.log(req.query)
    const category = req.query.category
    const data = await db_book.getBooksByCategory(category)
    res.send({
      data:data
    })
  }
  // 获取一本书的详细信息
  async getBookDetail(req,res){
    // const book_id = parseInt(req.query.book_id)
    const book_id = req.query.book_id
    const data = await db_book.getBookByID(book_id)
    res.send({
      status:0,
      data:data
    })
  }
  // 获取书籍评论
  // 1. 获取书籍评论表id
  // 2. 根据该id区评论表获取评论
  async getBookComments(req,res){
    // const book_id = parseInt(req.query.book_id)
    const book_id = req.query.book_id
    const book = await db_book.getBookByID(book_id)
    const comment_id = book.book_commentID
    const comments = await db_book.getBookCommentsByID(comment_id)
    res.send({
      status:0,
      comments:comments
    })
  }
    // 刷新评分平均分，新的用户评分后，执行刷新。
    async updateAverageGrade(book_id){

    var book_grade = await db_book.updateAverageGrade(book_id)
      // 1. 获取book的commment所有对应的grade，计算平均值，更新book_grade
  }
  async getChapterContent(req,res){
    const chapter_id =  req.query.chapter_id
    const chapter_contentID = parseInt(req.query.chapter_contentID) 
    try{
      const content = await db_book.getChapterContent(chapter_id,chapter_contentID)
      // content[0].chaper_chapter_content=content[0].chaper_chapter_content.split(/\s+/g)
      res.send({
        content:content[0]
      })
    }catch(e){
      console.log(e)
    }
  }
  async getChapterList(req,res){
    const chapter_id =  req.query.chapter_id
    try{
      const chapterList = await db_book.getChapterList(chapter_id)
      // content[0].chaper_chapter_content=content[0].chaper_chapter_content.split(/\s+/g)
      res.send({
        chapterList:chapterList
      })
    }catch(e){
      console.log(e)
    }
  }
  // 查询书籍
  async getBookByKeyword(req,res){
    const keyword = req.query.keyword
    const bookList = await db_book.getBookByKeyword(keyword)
    res.send({
      bookList:bookList
    })
  }
  // 管理员操作
  
}

export default new Book()