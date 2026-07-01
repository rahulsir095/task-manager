import styles from './TaskItem.module.css';

function TaskItem({ task, onUpdateStatus, onDeleteTask }) {
  // Dynamic class assignment based on status/priority values
  const priorityClass = styles[task.priority] || '';
  const isCompleted = task.status === 'completed';

  return (
    <div className={`${styles.card} ${priorityClass} ${isCompleted ? styles.completedCard : ''}`}>
      <div className={styles.content}>
        <h3 className={isCompleted ? styles.completedText : ''}>{task.title}</h3>
        <p>{task.description}</p>
        <div className={styles.meta}>
          <span className={styles.badge}>Priority: {task.priority}</span>
          <span className={styles.badge}>Status: {task.status}</span>
        </div>
      </div>
      <div className={styles.actions}>
        {task.status !== 'completed' && (
          <button 
            onClick={() => onUpdateStatus(task._id, 'completed')} 
            className={styles.completeBtn}
          >
            ✓ Done
          </button>
        )}
        <button onClick={() => onDeleteTask(task._id)} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;