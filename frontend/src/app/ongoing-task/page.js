"use client";

import { useState, useEffect } from "react";
import SuccessVideo from "@/app/components/SuccessVideo/SuccessVideo";
import styles from "./page.module.css";

export default function OngoingTask() {
  const [isDone, setIsDone] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    name: "Loading...",
    _id: 0,
  });

  useEffect(() => {
    setCurrentTask(JSON.parse(sessionStorage.getItem("ongoing_task")));
  }, []);

  const handleDoneClick = () => {
    const url = `http://localhost:5000/set-done/${currentTask._id}`;
    fetch(url, {
      method: "GET",
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
          DONE!
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
