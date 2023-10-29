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
            display: "block"
          }}
          alt="Icon"
        />
        <span className="h2">{taskName}</span>
      </div>
    </>
  );
};

export default TaskRow;
