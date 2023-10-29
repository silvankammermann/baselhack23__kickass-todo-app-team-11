import styles from "./TaskRow.module.css";
import RemoveIcon from '@mui/icons-material/Remove';
import Image from "next/image";

const TaskRow = ({ taskName }) => {
  return (
    <>
      <div className={`${styles.container} bgPatternOrange`}>
        <button className={`${styles.removeButton} h3 circle bgPurple colorWhite`}>
          <RemoveIcon className="colorWhite bgPurple circle" />
        </button>
        <Image
          // className={styles.logo}
          width={50}
          height={50}
          src="/images/__importance-1.svg"
          style={{
            height: "auto",
            display: "block",
            margin: "0 auto",
            width: "30px",
            transformY: "20px",
          }}
          alt="Icon"
        />
        <div className={`${styles.taskIcon} h2`}>{taskName}</div>
      </div>
    </>
  );
};

export default TaskRow;
