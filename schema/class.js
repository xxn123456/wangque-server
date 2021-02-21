const { Schema } = require('../config/coon');
const mongoose = require('../config/coon');
let classSchema = new mongoose.Schema({
    className:String
})

const studentClass = mongoose.model('studentClass',classSchema,'studentClass')

module.exports = studentClass



