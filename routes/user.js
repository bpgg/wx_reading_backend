import express from 'express'
import User from '../controller/user/user'
const router = express.Router()

router.post('/login', User.login);
router.post('/wx_login', User.wx_login);
// router.get('/login', User.login);
router.post('/register', User.register);
router.post('/updateAvatar', User.updateAvatar);
router.post('/updateAvatar2', User.updateAvatar2);

router.get('/logout', User.logout);
router.get('/getUserInfo', User.getUserInfo);
router.get('/getUsers', User.getUsers);

router.post('/wx_updateUserInfo', User.wx_updateUserInfo);  // 更新除了头像外的信息
router.get('/wx_getUserInfo', User.wx_getUserInfo); // 获取全部
router.get('/wx_getBookShelf', User.wx_getBookShelf);
router.get('/wx_getStoryShelf', User.wx_getStoryShelf);
router.get('/wx_addBook', User.wx_addBook);
router.get('/wx_removeBook', User.wx_removeBook);
router.get('/wx_hasStoreBook', User.wx_hasStoreBook);
6

export default router