import { useState, useEffect } from 'react';
import API from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import styles from './App.module.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // 1. Get All Tasks on startup
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/task');
      setTasks(res.data.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // 2. Add New Task
  const handleAddTask = async (taskData) => {
    try {
      const res = await API.post('/task', taskData);
      setTasks((prev) => [res.data.data, ...prev]); // Prepend new task to list
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // 3. Mark Task Done (Update Status)
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await API.put(`/task/${id}`, { status });
      setTasks((prev) => prev.map(t => t._id === id ? res.data.data : t));
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  // 4. Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/task/${id}`);
      setTasks((prev) => prev.filter(t => t._id !== id));
    } catch (err) {
      console.error("Error removing task:", err);
    }
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}> Task Tracker Dashboard</h1>
      <TaskForm onTaskAdded={handleAddTask} />
      <TaskList 
        tasks={tasks} 
        onUpdateStatus={handleUpdateStatus} 
        onDeleteTask={handleDeleteTask} 
      />
    </div>
  );
}

export default App;
