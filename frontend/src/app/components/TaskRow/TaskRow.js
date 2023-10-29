import styles from "./TaskRow.module.css";
import RemoveIcon from '@mui/icons-material/Remove';
import Image from "next/image";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const TaskRow = ({ taskName }) => {
  const iconNumber = getRandomNumber(1, 3);

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
          src={`/images/__importance-${iconNumber}.svg`}
          style={{
            height: "auto",
            display: "block",
            margin: "0 auto",
            width: "30px",
          }}
          alt="Icon"
        />
        <div className={`${styles.taskIcon} h2`}>{taskName}</div>
      </div>
    </>
  );
};

export default TaskRow;
