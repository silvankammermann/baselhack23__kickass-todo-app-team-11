"use client";

import styles from "./TinderSwiper.module.css";
import TinderCard from "react-tinder-card";
import React, { useState, useMemo, useRef } from "react";

const TinderSwiper = ({ tasks }) => {
  // Initial state for remaining tasks.
  const [remainingTasks, setRemainingTasks] = useState(tasks);

  const cardRefs = useMemo(
    () =>
      Array(remainingTasks.length)
        .fill(0)
        .map((i) => React.createRef()),
    [remainingTasks]
  );

  const swipe = (direction) => {
    // Swipe the topmost card.
    const lastCardIndex = remainingTasks.length - 1;
    if (cardRefs[lastCardIndex].current) {
      cardRefs[lastCardIndex].current.swipe(direction);
    }
  };

  // Callback for outOfFrame.
  const handleOutOfFrame = (name) => {
    setRemainingTasks((prevTasks) =>
      prevTasks.filter((task) => task.name !== name)
    );
  };

  return (
    <>
      <div className={styles.cardStack}>
        {tasks.map(({ id, name }, index) => (
          <TinderCard
            key={id}
            className={styles.card}
            ref={cardRefs[index]}
            onCardLeftScreen={() => handleOutOfFrame(name)}
          >
            <div className={styles.container}>
              <span className="h1">{name}</span>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className={styles.decissionTriggers}>
        <button style={{ width: "3em" }}
          className="h2 button circle bgRed colorWhite"
          onClick={() => {
            swipe("left");
          }}
        >
          Later
        </button>
        <button style={{ width: "3em" }}
          className="h2 button circle bgGreen colorWhite"
          onClick={() => {
            swipe("right");
          }}
        >
          Yes!
        </button>
      </div>
    </>
  );
};

export default TinderSwiper;
