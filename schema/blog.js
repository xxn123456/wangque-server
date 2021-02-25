const {
    Schema
} = require('../config/coon');
const mongoose = require('../config/coon');
let blogSchema = new mongoose.Schema({
    artcleName: {
        required: true,
        type: String
    },
    artcleTypeId: Number,
    vistNum: {
        type: Number,
        default: 0
    },
    CreaterId: String,
    content: String
   
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})

blogSchema.statics.findByName = function (name, cb) {
    return this.find({
        "name": name
    }, cb)
}

const Blog = mongoose.model('blog', blogSchema, 'blog')

module.exports = Blog;
