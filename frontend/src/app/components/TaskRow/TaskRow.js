import styles from "./TaskRow.module.css";

const TaskRow = ({ taskName }) => {
  return (
    <div className={styles.container}>
      <span className="h2">{taskName}</span>
    </div>
  );
};

export default TaskRow;
