import express from "express"

import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import taskRouter from "./routes/taskRoutes.js"

import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = process.env.PORT || 8000

//middleware
import cors from "cors";

const allowedOrigins = [
    'http://localhost:5173',           // dev frontend          // other dev port if needed
    'https://taskverse-backend-n6id.onrender.com/',        // production frontend
]

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions))
// ensure preflight is handled
app.options('*', cors(corsOptions))


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//DB connect
connectDB()

//Routes
app.get('/', (req, res) => {
    res.send("API working")
})

app.use("/api/users", userRouter)
app.use("/api/tasks", taskRouter)

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})