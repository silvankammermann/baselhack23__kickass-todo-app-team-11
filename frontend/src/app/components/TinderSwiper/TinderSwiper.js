import styles from "./TinderSwiper.module.css";

const TinderSwiper = ({ taskName }) => {
  return (
    <div className={styles.container}>
      <div className={styles.colWrap}>
        <span>{taskName}</span>
      </div>
    </div>
  );
};

export default TinderSwiper;
