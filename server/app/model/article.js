module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const ArticleSchema = new Schema({
    title: {
      type: String
    },
    abstract: {
      type: String
    },
    banner: {
      type: String
    },
    category: {
      type: String
    },
    categoryLabel: {
      type: String
    },
    content: {
      type: String
    },
    mavon: {
      type: String
    },
    readNums: {
      type: Number
    },
    likeNums: {
      type: Number
    },
    isPublic: {
      type: Boolean
    },
    created: {
      type: String
    },
    updateTime: {
      type: String
    },
    comment: {
      type: Array
    }
  }, {
    versionKey:false
  })

  return mongoose.model('Article', ArticleSchema)
}