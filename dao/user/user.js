
import db from '../../mysql/db'
import dtime from 'time-formater'
import cookieParser from 'cookie-parser'

var db_user = {
  getUserByID : async (id)=>{
    const data = await db.exec(db.sql
      .table('user')
      .field('id,password')
      .where({id:id})
      .select())
    return data[0]
  },
  createUser : async (user)=>{
    // 生成一个随机的书架id
    // const bookshelf_id = parseInt(user.user_id + Date.now().toString().substr(0,10)) 
    const bookshelf_id = parseInt(user.user_id +1) 
    const data = await db.exec(db.sql
      .table('user')
      .data({username:'',id:user.user_id,password:user.password,created_time:dtime().format('YYYY-MM-DD HH:mm'),bookshelf_id:bookshelf_id})
      .insert())
      console.log('新建用户成功');
      // data ->
      // ResultSetHeader {
      //   fieldCount: 0,
      //   affectedRows: 1,
      //   insertId: 0,
      //   info: '',
      //   serverStatus: 2,
      //   warningStatus: 0
      // }
  },
  getUsers:async()=>{
    const data = await db.exec(db.sql
      .table('user')
      .select())
      return data
  },
  wx_hasUser:async(openid)=>{
    const data = await db.exec(db.sql
      .table('wx_user')
      .where({openid:openid})
      .select())
      
      return !(data[0]===undefined)
  },
  wx_saveUser:async(userInfo,openid)=>{
    const {nickname,gender,avatarUrl} = userInfo
    // const bookshelf_id = openid + (Date.now()).toString()
    const res = await db.exec(db.sql
      .table('wx_user')
      .data({nickname:nickname,gender:gender,avatarUrl:avatarUrl,openid:openid})
      .insert())
      console.log(res)
  },
  wx_addBook:async(openid,book_id)=>{
    const res = await db.exec(db.sql
      .table('bookshelf')
      .data({openid:openid,book_id:book_id})
      .insert())
      return res.affectedRows
  },
  wx_removeBook:async(openid,book_id)=>{
    const res = await db.exec(db.sql
      .table('bookshelf')
      .where({openid:openid,book_id:book_id})
      .delet())
      console.log(res)
  },
  wx_getBookShelf:async(openid)=>{
    // 先获取openid 对应的所有 book_id
        const query = `
        SELECT
          book.*
        FROM
            book,
            bookshelf
          WHERE
          book.book_id = bookshelf.book_id AND
          bookshelf.openid = "${openid}"`
        const bookList = await db.exec(query)
          console.log(bookList)
        return bookList
  },
  wx_hasStoreBook:async(openid,book_id)=>{
    const res = await db.exec(db.sql
      .table('bookshelf')
      .where({openid:openid,book_id:book_id})
      .select())
      return !!res[0]
  },
  wx_getStoryShelf:async(openid)=>{
    const res = await db.exec(db.sql
      .table('storyShelf')
      .where({openid:openid})
      .select())
      return res
  },
  wx_searchStoreBookByKeyword:async(keyword)=>{

  },
  wx_updateAvatar:async(openid,avatarUrl)=>{
    const res = await db.exec(db.sql
      .table('wx_user')
      .data({avatarUrl:avatarUrl})
      .where({openid:openid})
      .update())
      return res
  },
  wx_getUserInfo:async(openid)=>{
    const res = await db.exec(db.sql
      .table('wx_user')
      .where({openid:openid})
      .select())
      return res[0]
  },
  wx_updateUserInfo:async(openid,userInfo)=>{
    console.log(userInfo)
    const res = await db.exec(db.sql
      .table('wx_user')
      .data({gender:userInfo.gender,nickName:userInfo.nickName})
      .where({openid:openid})
      .update())
      return res[0]
  }







}


export default db_user