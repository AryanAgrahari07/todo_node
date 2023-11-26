const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
    },
    description: {
        type : String,
        required : true,
    },
    isCompleted : {
        type : Boolean,
        default : false,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    password: {
        type : String,
        select : false,
    },
    createdAt : {
        type : Date,
        default : Date.new,
    },
});

 const Task = new mongoose.model("task" , schema)

module.exports = {Task}