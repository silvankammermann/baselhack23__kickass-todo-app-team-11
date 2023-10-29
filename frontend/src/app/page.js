"use client";

import { useState, useEffect, createContext } from "react";
import styles from "./page.module.css";
import TinderSwiper from "@/app/components/TinderSwiper/TinderSwiper";
import defaultTasks from "@/app/testdata/tasks.js";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // TODO: might need refactoring -> maybe move to
  const fetchTaskData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/gettasks`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setTasks(defaultTasks);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  return (
    <>
      {tasks && tasks.length > 0 ? (
        <TinderSwiper tasks={tasks} />
      ) : (
        <div className={`h1 ${styles.msgLoading}`}>loading...</div>
      )}
    </>
  );
}
