import styles from "./TaskRow.module.css";

const TaskRow = ({ taskName }) => {
  return (
    <div className={styles.container}>
      <div className={styles.colWrap}>
        <span>{taskName}</span>
        <span>edit</span>
      </div>
    </div>
  );
};

export default TaskRow;
