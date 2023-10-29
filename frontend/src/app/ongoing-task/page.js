"use client";

import { useState, useEffect } from "react";
import SuccessVideo from "@/app/components/SuccessVideo/SuccessVideo";
import styles from "./page.module.css";

export default function OngoingTask() {
  const [isDone, setIsDone] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    name: "Loading...",
    id: 0,
  });

  useEffect(() => {
    setCurrentTask(JSON.parse(sessionStorage.getItem("ongoing_task")));
  }, []);

  const handleDoneClick = () => {
    const url = `http://localhost:5000/set-done/${currentTask.id}`;
    fetch(url, {
      method: "POST",
    }).then((response) => {
      setIsDone(true);
    });
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.container}>
          <span className="h1">{currentTask.name}</span>
        </div>
        <button
          className={`h2 button circle bgGreen colorWhite ${styles.doneTrigger}`}
          onClick={handleDoneClick}
        >
          Yes!
        </button>
      </div>
      {isDone && (
        <SuccessVideo
          src=""
          onClick={() => {
            sessionStorage.removeItem("ongoing_task");
            router.push("/");
          }}
        />
      )}
    </>
  );
}
