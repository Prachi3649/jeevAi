

const tasksModel = require("../model/taskModel")
const userModel = require("../model/userModel")
const jwt = require("jsonwebtoken")
const validation = require('../validation/validator')


const createTasks = async function (req, res) {

    try {
        const data = req.body
        const {userId}  = req.params
        const { title, body } = data
        req.body.userId = userId

        // title
        if (!validation.isValid(title)) {
            return res.status(400).send({ status: false, message: "Please provide user title" })
        }

        if (!validation.isValid(body)) {
            return res.status(400).send({ status: false, message: "Please provide user body" })
        }

        if (req.decodedToken.userId == userId) {
            const users = await tasksModel.create(data)
            console.log(users)
            return res.status(201).send({ status: true, message: "product created successfully", data: users })
        }
        

    } catch (err) {
        return res.status(500).send({
            status: false,
            Error: err.message
        })
    }
}

//GET ALL TASK 

const getTask = async function (req, res) {

    try {
        const tasks = await tasksModel.find().limit(5).sort({title:1})

            if (tasks == null) {
                return res.status(400).send({ status: false, message: "No task found" })
            } 
            res.status(200).send({ status: true, message: "successful", data: tasks })

        // })   

    } catch (err) {
        return res.status(500).send({
            status: false,
            Error: err.message
        })
    }
}


//update task


const updateTasks = async function (req, res) {
    try {
        const data = req.body

        let obj = {}

        const { title, body} = data
        const taskId = req.params.taskId

        const task = await tasksModel.findById(taskId)
        if (!task) { return res.status(400).send({ status: false, message: "No task Exist with This User" }) }

        if (validation.isValid(title)) {
            obj['title'] = title
        }

        if (validation.isValid(body)) {
            obj['body'] = body
        }

            const updateTask = await tasksModel.findOneAndUpdate({ _id: taskId }, { $set: obj }, { new: true })
            return res.status(200).send({
                status: true,
                message: "successful",
                Data: updateTask
            })
       

    } catch (err) {
        return res.status(500).send({
            status: false,
            Error: err.message
        })
    }

}

// DELECTE

const taskDelete = async function (req, res) {

    try {   //const data = req.body
        const userId = req.params.userId
        const taskId = req.params.taskId

        const task = await tasksModel.findById(taskId)
        if (!task) { return res.status(400).send({ status: false, message: "No task Exist with This User" }) }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(401).send({ status: false, message: 'unauthorised access! owner info does not match' })
        }

        if (req.decodedToken.userId == userId) {
            if (task.isActive == false) {
                const deleteTak = await tasksModel.findByIdAndUpdate({ _id: taskId }, { $set: { isActive: true } }, { new: true })
                return res.status(200).send({
                    status: true,
                    message: "successfully deleted"
                })
            } else {
                return res.status(403).send({
                    status: true,
                    message: "Already deleted",
                })
            }
        } else {
            return res.status(403).send({ status: false, message: "authorization denied" })

        }


    } catch (err) {
        return res.status(500).send({
            status: false,
            Error: err.message
        })
    }
}


module.exports = {
    createTasks,
    getTask,
    updateTasks,
    taskDelete
}