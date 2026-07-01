import Task from "../models/task.js";

// 1. READ ALL TASKS
export const allTask = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. CREATE A TASK
export const addTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    next(error);
  }
};

// 3. READ A SINGLE TASK (by ID)
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// 4. UPDATE A TASK (by ID)
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedTask)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// 5. DELETE A TASK (by ID)
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    res
      .status(200)
      .json({ success: true, message: "Task successfully deleted" });
  } catch (error) {
    next(error);
  }
};
