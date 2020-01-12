import db from '../../mysql/db'

var db_story = {
  getStorys:async()=>{
    const data = await db.exec(db.sql
      .table('story')
      .field('story_name,story_id,story_source,story_coverImg,story_tag')
      .limit(3)
      .select())
      return data
  },
  getStoryDetail:async(story_id)=>{
    const data = await db.exec(db.sql
      .table('story')
      .where({story_id:story_id})
      .select())
      return data[0]
  }
}

export default db_story