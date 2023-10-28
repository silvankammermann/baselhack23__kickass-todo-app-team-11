"use client";

import styles from "./TinderSwiper.module.css";
import TinderCard from "react-tinder-card";

const TinderSwiper = ({ tasks }) => {
  console.log(tasks);
  return (
    <>
      <div className={styles.cardStack}>
        {tasks.map(({ id, name }) => (
          <TinderCard key={id} className={styles.card}>
            <div className={styles.container}>
              <span className="h1">{name}</span>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className={styles.decissionTriggers}>
        <button className="h2 circle bgRed colorWhite">Later</button>
        <button className="h2 circle bgGreen colorWhite">Yes!</button>
      </div>
    </>
  );
};

export default TinderSwiper;
