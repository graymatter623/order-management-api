const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var loginSchema = new Schema({
    username : String,
    password : String,
    name : String,
    isOwner : Boolean
});
module.exports = mongoose.model('EmployeeLoginSchema' , loginSchema,'employeeLogin');
