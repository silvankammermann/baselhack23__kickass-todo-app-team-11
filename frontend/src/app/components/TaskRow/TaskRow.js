import styles from "./TaskRow.module.css";
import RemoveIcon from '@mui/icons-material/Remove';

const TaskRow = ({ taskName }) => {
  return (
    <div className={`${styles.container} bgPatternOrange`}>
      <button className={`${styles.removeButton} h3 circle bgPurple colorWhite`}>
        <RemoveIcon className="colorWhite bgPurple circle" />
      </button>
      <span className="h2">{taskName}</span>
    </div>
  );
};

export default TaskRow;
