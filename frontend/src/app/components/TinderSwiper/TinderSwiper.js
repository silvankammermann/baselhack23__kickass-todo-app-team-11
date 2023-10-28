"use client";

import styles from "./TinderSwiper.module.css";
import TinderCard from "react-tinder-card";
import React, { useMemo, useRef } from "react";

const TinderSwiper = ({ tasks }) => {
  const cardRefs = useMemo(
    () =>
      Array(tasks.length)
        .fill(0)
        .map((i) => React.createRef()),
    [tasks]
  );

  const swipe = (direction) => {
    // swipe the topmost card.
    const lastCardIndex = tasks.length - 1;
    if (cardRefs[lastCardIndex].current) {
      cardRefs[lastCardIndex].current.swipe(direction);
    }
  };

  return (
    <>
      <div className={styles.cardStack}>
        {tasks.map(({ id, name }, index) => (
          <TinderCard key={id} className={styles.card} ref={cardRefs[index]}>
            <div className={styles.container}>
              <span className="h1">{name}</span>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className={styles.decissionTriggers}>
        <button
          className="h2 circle bgRed colorWhite"
          onClick={() => {
            swipe("left");
          }}
        >
          Later
        </button>
        <button
          className="h2 circle bgGreen colorWhite"
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
