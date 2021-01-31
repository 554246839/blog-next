module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const CategorySchema = new Schema({
    name: {
      type: String
    },
    value: {
      type: String
    }
  }, {
    versionKey:false
  })

  return mongoose.model('Category', CategorySchema)
}