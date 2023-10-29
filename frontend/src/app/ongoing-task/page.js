"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import SuccessVideo from "@/app/components/SuccessVideo/SuccessVideo";
import styles from "./page.module.css";
import fetchUserData from "@/app/components/Api/UserApi";
import { gsap } from "gsap";

export default function OngoingTask() {
  useEffect(() => {
    setCurrentTask(JSON.parse(sessionStorage.getItem("ongoing_task")));
    fetchUserData().then((r) => setUserData(r));
  }, []);

  useLayoutEffect(() => {
    gsap
      .timeline()
      .fromTo(
        `.${styles.container}`,
        {
          scale: 0.7,
          rotate: -10,
        },
        {
          duration: 0.6,
          rotate: 10,
          scale: 1,
          ease: "power3.in",
        }
      )
      .to(`.${styles.container}`, {
        duration: 1,
        rotate: 5,
        scale: 1,
        ease: "power3.out",
      });
    gsap.fromTo(
      `.${styles.container}`,
      {
        scale: 1,
      },
      {
        duration: 1,
        scale: 1.03,
        ease: "power1.in",
        yoyo: true,
        repeat: -1,
        delay: 1.6,
      }
    );
  }, []);

  const [isDone, setIsDone] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentTask, setCurrentTask] = useState({
    name: "Loading...",
    _id: 0,
  });

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
      {currentTask && userData ? (
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
              src={
                userData.score >= 5
                  ? "/videos/success__busy-beaver.mp4"
                  : "/videos/success__productive-sloth.mp4"
              }
              onClick={() => {
                sessionStorage.removeItem("ongoing_task");
                router.push("/");
              }}
            />
          )}
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}
