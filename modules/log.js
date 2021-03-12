const LogSure = require('../schema/log.js');

class LogModel {

    static async add(content) {
    
        await  LogSure.create(content);
    }



}

module.exports = LogModel;