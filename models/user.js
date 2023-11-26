const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true,
        unique : true,
    },
    createdAt : {
        type : Date,
        // required : true,
        default : Date.new,
    },
});

const User = mongoose.model("User", todoSchema);

module.exports = User