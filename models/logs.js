const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logs = new Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        required : true,
    },

});
module.exports = mongoose.model('Logs' , logs,'logs');
