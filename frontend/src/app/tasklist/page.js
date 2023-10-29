"use client";

import Image from "next/image";
import styles from "./page.module.css";
import TaskRow from "@/app/components/TaskRow/TaskRow";
import Popover from "@/app/components/Popover/Popover";
import AddTask from "@/app/components/Tasks/AddTask";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import defaultTask from "@/app/testdata/tasks";
import React, { useState, useEffect } from "react";

export default function Tinder() {
  const [tasks, setTasks] = useState(defaultTask);

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
            <AddCircleRoundedIcon className={styles.icon__add} />
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
