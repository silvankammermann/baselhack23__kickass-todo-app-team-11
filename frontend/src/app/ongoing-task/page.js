"use client";

import {useEffect, useState} from "react";
import SuccessVideo from "@/app/components/SuccessVideo/SuccessVideo";
import styles from "./page.module.css";
import fetchUserData from "@/app/components/Api/UserApi";

export default function OngoingTask() {
  const [isDone, setIsDone] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentTask, setCurrentTask] = useState({
    name: "Loading...",
    _id: 0,
  });

  useEffect(() => {
    setCurrentTask(JSON.parse(sessionStorage.getItem("ongoing_task")));
    fetchUserData().then((r) => setUserData(r));
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
          src={userData.score >= 5
              ? "/videos/success__busy-beaver.mp4"
              : "/videos/success__productive-sloth.mp4"}
          onClick={() => {
            sessionStorage.removeItem("ongoing_task");
            router.push("/");
          }}
        />
      )}
    </>
  );
}
