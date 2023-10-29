"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import random from "@/app/utils.js";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OngoingTask() {
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState();

  useEffect(() => {
    setCurrentTask(JSON.parse(sessionStorage.getItem("procrastinated_task")));
  }, []);

  const handleProcrastinationClick = () => {
    const url = `http://localhost:5000/set-do-later/${currentTask._id}`;
    fetch(url, {
      method: "GET",
    }).then((response) => {
      router.push("/");
    });
  };

  const handleDoAnywayClick = () => {
    sessionStorage.setItem("ongoing_task", JSON.stringify(currentTask));
    router.push("/ongoing-task");
  };

  const randomMeme = random(1, 3);

  return (
    <>
      <h1 className={styles.hugeStatement}>YOU SURE?</h1>
      <div className={styles.memeContainer}>
        <Image
          src={`/images/motivation_meme_${randomMeme}.gif`}
          width={300}
          height={300}
          alt="Meme"
          style={{
            width: "100%",
            height: "auto",
            overflow: "hidden",
            borderRadius: "20px",
            marginBottom: "2rem",
          }}
        />
      </div>
      <button
        className={`h3 button bgRed colorWhite ${styles.decisionButton}`}
        onClick={handleProcrastinationClick}
      >
        Leave me alone!
      </button>
      <button
        className={`h3 button bgGreen colorWhite ${styles.decisionButton}`}
        onClick={handleDoAnywayClick}
      >
        Ok, I’ll do it!
      </button>
    </>
  );
}
