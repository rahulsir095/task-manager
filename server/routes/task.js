import express from "express";
import { 
    allTask, 
    addTask, 
    getTask, 
    updateTask, 
    deleteTask 
} from "../controllers/task.js";

const router = express.Router();


router.route("/")
    .get(allTask)   
    .post(addTask); 

router.route("/:id")
    .get(getTask)       
    .put(updateTask)    
    .delete(deleteTask); 

export default router;