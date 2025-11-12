import express, {Router} from "express"
import authMiddleware from "../middleware/auth.js"
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/tasKController.js"

const taskRouter = Router()

taskRouter.route('/gp')
    .get(authMiddleware, getTasks)
    .post(authMiddleware, createTask)

taskRouter.route('/:id/gp')
    .get(authMiddleware, getTaskById)
    .put(authMiddleware, updateTask)
    .delete(authMiddleware, deleteTask)


export default taskRouter