import db_story from '../../dao/story/story'

class Story{
  constructor(){

  }
  async wx_getStoryShelf(req,res){
		var openid = req.query.openid
		var storys = await db_story.wx_getStoryShelf(openid)
		res.send({
			data:storys
		})
	}

  async getStorys(req,res){
    const data = await db_story.getStorys()
    res.send({
      data:data
    })
  }
  async getStoryDetail(req,res){
    const story_id = req.query.story_id
    const data = await db_story.getStoryDetail(story_id)
    res.send({
      data:data
    })
  }
}


export default new Story()