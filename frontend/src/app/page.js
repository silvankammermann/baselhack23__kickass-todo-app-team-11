"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import TaskRow from "./components/TaskRow/TaskRow";
import defaultTasks from "./testdata/tasks.js";
import Popover from "./components/Popover/Popover";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddTask from "./components/Tasks/AddTask";

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
      <Popover
        trigger={
          <div className={styles.addTaskIcon}>
            <AddCircleRoundedIcon
              className={styles.icon__add}
            />
          </div>
        }
      >
        <AddTask />
      </Popover>
      {tasks.map(({ name, id }) => {
        return <TaskRow key={id} taskName={name} />;
      })}
    </>
  );
}
