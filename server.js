import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import taskRouter from "./routes/taskRoutes.js"

import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = process.env.PORT || 8000

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//DB connect
connectDB()

//Routes
app.get('/',(req, res)=> {
    res.send("API working")
})

app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)

app.listen(port, ()=> {
    console.log(`Server started on http://localhost:${port}`)
})