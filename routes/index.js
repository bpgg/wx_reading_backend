import user from './user'
import book from './book';
import story from './story'
export default app =>{
  app.use('/user',user)
  app.use('/story',story)
  app.use('/book',book)
}