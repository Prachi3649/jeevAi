
const express = require ("express")
const router =  express.Router()

const usersController = require("../controller/uesrController")
const taskController = require('../controller/taskController')
const middle = require("../middleware/auth")



// user
router.post("/register", usersController.register )
router.post("/login", usersController.login)



// client

router.post("/create/:userId",middle.authentication,  taskController.createTasks)

router.get("/list",  taskController.getTask)

router.put("/task/:taskId/update/:userId" , middle.authentication, taskController.updateTasks)

router.delete("/tasks/:taskId/delete/:userId",middle.authentication,  taskController.taskDelete)





module.exports=router