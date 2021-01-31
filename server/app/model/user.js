module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const PostSchema = new Schema({
    username: {
      type: String
    },
    password: {
      type: String
    },
    name: {
      type: String
    },
    age: {
      type: Number
    },
    avatar: {
      type: String
    },
    birthday: {
      type: String
    }
  }, {
    versionKey:false
  })
  
  return mongoose.model('User', PostSchema)
}