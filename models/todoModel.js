const mongoose = require('mongoose');

//schema
const todoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true
    }
}) ;
//Exporting as model
module.exports = mongoose.model('todo',todoSchema);