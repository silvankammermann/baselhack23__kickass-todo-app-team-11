import { useState } from "react";
import Input from "../Forms/Input";

export default function AddTask() {

  const [taskName, setTaskName] = useState("");
  const [importance, setImportance] = useState(0);
  const [urgency, setUrgency] = useState(0);
  const [repeat, setRepeat] = useState(0);

  const importanceOptions = [
    {
      weight: 1,
      name: "Nice to have"
    },
    {
      weight: 2,
      name: "Quite important"
    },
    {
      weight: 3,
      name: "F*cking important"
    }
  ];

  const urgencyOptions = [
    {
      weight: 1,
      name: "Maybe one day"
    },
    {
      weight: 2,
      name: "To be done ASAP"
    },
    {
      weight: 3,
      name: "Right now!"
    }
  ];

  const repeatOptions = [
    {
      weight: 1,
      name: "Daily"
    },
    {
      weight: 2,
      name: "Weekly"
    },
    {
      weight: 3,
      name: "Monthly"
    }
  ];

  const addTask = async (e) => {
    e.preventDefault();

  };

  return (
    <>
      <h2>Add Task</h2>
      <form onSubmit={addTask}></form>
        <Input 
          onChange={e => setTaskName(e.target.value)} 
          type="text" 
          value={taskName} 
          name="taskName"
          style={{width: "100%"}}
         />

        


    </>
  );
}