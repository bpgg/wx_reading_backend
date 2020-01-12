import express from 'express'
import Book from '../controller/book/book'
const router = express.Router()

router.get('/getBookDetail/', Book.getBookDetail);
router.get('/getBooks',Book.getBooks)
router.get('/getChapterContent',Book.getChapterContent)

router.get('/getBookComments',Book.getBookComments)
router.get('/getBooksByCategory',Book.getBooksByCategory)
router.get('/getChapterList',Book.getChapterList)
router.get('/getBookByKeyword',Book.getBookByKeyword)
export default router