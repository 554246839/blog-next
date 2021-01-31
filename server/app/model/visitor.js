module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

/**
 * visitors: {
 *   ip: {
 *     type: String
 *   },
 *   time: {
 *     type: String
 *   },
 *   url: {
 *     type: String
 *   }
 * }
 */

  const PostSchema = new Schema({
    date: {
      type: String
    },
    visitors: {
      type: Array
    }
  }, {
    versionKey:false
  })
  
  return mongoose.model('Visitor', PostSchema)
}