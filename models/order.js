const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    orderTitle : String,
    orderDate : Date,
    startTime : String,
    status : String 
});
module.exports = mongoose.model('Order',orderSchema);
