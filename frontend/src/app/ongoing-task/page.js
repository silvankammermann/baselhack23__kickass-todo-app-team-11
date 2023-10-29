"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function OngoingTask() {
  const [currentTask, setCurrentTask] = useState({
    id: 0,
    name: "dummy",
  });

  useEffect(() => {
    setCurrentTask(sessionStorage.getItem("ongoing_task"));
  }, []);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.container}>
          <span className="h1">{currentTask.name}</span>
        </div>
        <button
          className={`h2 button circle bgGreen colorWhite ${styles.doneTrigger}`}
          onClick={() => {
            console.log("TODO: handle click");
          }}
        >
          Yes!
        </button>
      </div>
    </>
  );
}
