const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    isAvailable : {
        type : Boolean,
        required : true
    },
    current_order_id: {
        type : String
    }
});

module.exports = mongoose.model('Employee',employeeSchema,'employees');

