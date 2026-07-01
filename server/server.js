import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
import taskRouter from "./routes/task.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json())
app.use("/task",taskRouter)

connectDB();
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Express API!' });
});

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});

