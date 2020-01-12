import express from 'express'
import User from '../controller/user/user'
const router = express.Router()

router.post('/login', User.login);
router.post('/wx_login', User.wx_login);
// router.get('/login', User.login);
router.post('/register', User.register);

router.get('/logout', User.logout);
router.get('/getUserInfo', User.getUserInfo);
router.get('/getUsers', User.getUsers);
router.get('/update/avatar', User.updateAvatar);


router.get('/wx_getBookShelf', User.wx_getBookShelf);
router.get('/wx_addBook', User.wx_addBook);
router.get('/wx_removeBook', User.wx_removeBook);
router.get('/wx_hasStoreBook', User.wx_hasStoreBook);
// router.get('/all', Admin.getAllAdmin);
// router.get('/count', Admin.getAdminCount);
// router.get('/info', Admin.getAdminInfo);
// router.post('/update/avatar/:admin_id', Admin.updateAvatar);

export default router