const  mongoose= require('mongoose');
const Schema = mongoose.Schema;

var loginLogs = new Schema({
    username : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    }
});

module.exports = mongoose.model('LoginLogs',loginLogs ,'loginlogs');