import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

function TaskList({ tasks, onUpdateStatus, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className={styles.empty}>No tasks available. Add some above!</p>;
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onUpdateStatus={onUpdateStatus} 
          onDeleteTask={onDeleteTask} 
        />
      ))}
    </div>
  );
}

export default TaskList;