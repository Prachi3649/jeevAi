
const mongoose = require("mongoose")



const taskSchema = new mongoose.Schema({

    userId : {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    

    title: {
        type: String,
        require: true
    },

    body: {
        type: String,
        require: true

    },


}, { timestamps: true })

module.exports = new mongoose.model("task", taskSchema)