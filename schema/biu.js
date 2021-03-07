const {
    Schema
  } = require('../config/coon');
  const mongoose = require('../config/coon');
  
  var moment = require('moment'); 
  let biuchema = new mongoose.Schema({
    color:String,
    biuContent:String,
    createdAt:{
      type: String,
      default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
   ,
    // 更新时间
    updatedAt: {
      type: String,
      default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
  })
  
  
  
  const Biu = mongoose.model('biu', biuchema, 'biu')
  
  module.exports = Biu