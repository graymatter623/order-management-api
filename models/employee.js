const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeSchema = new Schema({
    username : String,
    name : String,
    isAvailable : Boolean,
    current_order_id: String
});

module.exports = mongoose.model('Employee',employeeSchema,'employees');

