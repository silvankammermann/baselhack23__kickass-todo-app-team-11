"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import TaskRow from "./components/TaskRow/TaskRow";
import defaultTasks from "./testdata/tasks.js";

export default function Home() {
  const [tasks, setTasks] = useState(defaultTasks);

  /*
  const fetchTaskList = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getTasks`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchTaskList();
  }, []);
  */

  return (
    <>
      {tasks.map(({ name, id }) => {
        return <TaskRow key={id} taskName={name} />;
      })}
    </>
  );
}
