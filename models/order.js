const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    orderTitle : {
        type : String,
        required : true
    },
    orderDate : {
        type : Date,
        required :true,
    },
    startTime : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        min : 1,
        max : 500
    },
    createdAt : {
        type : Number,
        required : true 
    }
});
module.exports = mongoose.model('Order',orderSchema,'orders');
