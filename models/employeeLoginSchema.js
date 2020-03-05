const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var loginSchema = new Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true,
        min : 8,
        max : 255
    },
    name : {
        type : String,
        required : true
    },
    isOwner : {
        type : Boolean,
        required : true
    }
});
module.exports = mongoose.model('EmployeeLoginSchema' , loginSchema,'employeeLogin');
