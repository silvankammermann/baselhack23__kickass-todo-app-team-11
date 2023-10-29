"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function OngoingTask() {
  const [currentTask, setCurrentTask] = useState({
    name: "Loading...",
    id: 0,
  });

  useEffect(() => {
    setCurrentTask(sessionStorage.getItem("ongoing_task"));
    console.log(currentTask);
  }, []);

  const handleDoneClick = () => {
    const url = `http://localhost:5000/set-done/${currentTask.id}`;
    fetch(url, {}).then((r) => r);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.container}>
          <span className="h1">...{currentTask.name}...</span>
        </div>
        <button
          className={`h2 button circle bgGreen colorWhite ${styles.doneTrigger}`}
          onClick={handleDoneClick}
        >
          Yes!
        </button>
      </div>
    </>
  );
}
