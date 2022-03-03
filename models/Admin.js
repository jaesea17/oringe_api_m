const mongoose = require("mongoose");



//Creating a Schema
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        min: 2,
    },
    
    email:{
        type: String,
        required: true,
        min: 3,
        unique:true
    },

    adminId:{
        type: String,
        required: true,
        min: 2,
    },

    password:{
        type: String,
        required: true,
        min: 6,
    }    
});

module.exports = mongoose.model("Admin",userSchema);