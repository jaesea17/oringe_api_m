const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true,
        min: 2
    },
    state: {
        type: String,
        required: true
    },
    yearFounded: {
        type: String,
        required: true
    },
    gameMaster: {
        type: String,
        required: true
    },
    gameMasterEmail: {
        type: String,
        required: true,
        unique: true
    },
    gameMasterPhoneNumber: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Participants",userSchema);