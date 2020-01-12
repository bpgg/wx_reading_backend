import express from 'express'
import Story from '../controller/story/story'
const router = express.Router()

router.get('/getStorys/', Story.getStorys);
router.get('/getStoryDetail/', Story.getStoryDetail);

export default router