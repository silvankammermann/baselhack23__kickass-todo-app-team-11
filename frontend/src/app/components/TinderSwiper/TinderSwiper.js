"use client";

import styles from "./TinderSwiper.module.css";
import TinderCard from "react-tinder-card";
import React, { useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

const TinderSwiper = ({ tasks }) => {
  const router = useRouter();

  // Initial state for remaining tasks
  const [remainingTasks, setRemainingTasks] = useState(tasks);
  const [currentTask, setCurrentTask] = useState(tasks);

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
  const handleOutOfFrame = (direction, id) => {
    const currentTask = remainingTasks.find((task) => task._id === id);

    // let currentTask = remainingTasks.find((task) => task.id === id);
    setRemainingTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== id)
    );

    if (direction === "right") {
      sessionStorage.setItem("ongoing_task", JSON.stringify(currentTask));
      router.push("/ongoing-task");
    }
    if (direction === "left") {
      const url = `http://localhost:5000/set-do-later/${id}`;
      fetch(url, {
        method: "GET",
      }).then((r) => r);
    }
  };

  return (
    <>
      <div className={styles.cardStack}>
        {tasks.map(({ _id, name }, index) => (
          <TinderCard
            key={_id}
            className={styles.card}
            ref={cardRefs[index]}
            onCardLeftScreen={(direction) => handleOutOfFrame(direction, _id)}
          >
            <div className={styles.container}>
              <span className="h1">{name}</span>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className={styles.decissionTriggers}>
        <button
          style={{ width: "3em" }}
          className="h2 button circle bgRed colorWhite"
          onClick={() => {
            swipe("left");
          }}
        >
          Later
        </button>
        <button
          style={{ width: "3em" }}
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
