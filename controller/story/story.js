import db_story from '../../dao/story/story'

class Story{
  constructor(){

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