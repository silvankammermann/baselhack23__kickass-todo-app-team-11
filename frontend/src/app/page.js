"use client";

import {useState} from "react";
import TaskRow from "./components/TaskRow/TaskRow";
import defaultTasks from "./testdata/tasks.js";
import Popover from "@/app/components/Popover/Popover";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TaskCreate from "@/app/components/TaskCreate/TaskCreate";

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
      <Popover trigger={
          <div>
            <AddCircleIcon className="fcolor--purple" />
          </div>
        }>
          <TaskCreate />
      </Popover>

      {tasks.map(({ name, id }) => {
        return <TaskRow key={id} taskName={name} />;
      })}
    </>
  );
}
