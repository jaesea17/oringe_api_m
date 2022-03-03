const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    home: {
        type: String,
        required: true,
        min: 2
    },
    away: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }   
})

module.exports = mongoose.model("Matches",userSchema);