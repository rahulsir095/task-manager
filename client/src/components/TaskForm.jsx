import { useState } from 'react';
import styles from './TaskForm.module.css';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Send data up to the parent component container
    onTaskAdded({ title, description, priority });

    // Reset input fields
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task Title..." 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <textarea 
        placeholder="Task Description..." 
        value={description} 
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
      />
      <div className={styles.row}>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className={styles.select}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit" className={styles.button}>Add Task</button>
      </div>
    </form>
  );
}

export default TaskForm;