import db from '../../mysql/db'
import dtime from 'time-formater'
import { comment } from 'mysqls/build/common'
// import { comment } from 'mysqls/build/common'


// 获取前10本书籍的基本信息
var db_book = {
  getBooks:async()=>{
    const data = await db.exec(db.sql
      .table('book')
      .field('book_id,book_name,author,book_grade,book_coverImage,book_tip')
      .limit(10)
      .select())
      return data
  },
  getBooksByCategory:async(category)=>{
    const data = await db.exec(db.sql
      .table('book')
      .field('book_id,book_name,author,book_grade,book_coverImage')
      .where({category:category})
      .limit(3)
      .select())
      return data
  },
  // 获取指定书籍的详细信息
  getBookByID :async(book_id) =>{
    const data = await db.exec(db.sql
      .table('book')
      .where({book_id:book_id})
      .select())
    return data[0]
  },
  getBookCommentsByID:async(comment_id)=>{
    const comments = await  db.exec(db.sql
      .table('comment')
      .where({comment_id:comment_id})
      .select())
      return comments
  },
  updateAverageGrade : async(book_id)=>{
    //根据book_id,查comment_id，根据
    db.sql.avg('comment_grade').table('comment').where({comment_id:comment_id}).select()
  },
  getChapterContent : async(chapter_id,chapter_contentID=1)=>{
    const data = await db.exec(db.sql
      .table('chapter')
      .where({chapter_id:chapter_id,chapter_contentID:chapter_contentID})
      .select())
    return data
  },
  getChapterList: async(chapter_id)=>{
    const data = await  db.exec(db.sql
      .table('chapter')
      .field('chapter_contentID,chapter_name')
      .order('chapter_contentID')
      .where({chapter_id:chapter_id})
      .select())
      return data
  },
  getBookByKeyword:async(keyword)=>{
    console.log(keyword)
    // const condition = 
    const data = await db.exec(db.sql
      .table('book')
      .field('book_id,book_name')
      .where({book_name:{like:`%${keyword}%`},author:{like:`%${keyword}%`},_type:'or'})
      .select())
      return data
  }
}



export default db_book