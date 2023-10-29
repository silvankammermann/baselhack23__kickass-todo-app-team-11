import React, {useState} from "react";
import styles from "./TaskCreate.module.css";
import {Grid, FormControl, RadioGroup, FormControlLabel, Radio, Button} from "@mui/material";
import Input from "../Forms/Input";
import Image from "next/image";

const TaskCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    deadline: "",
  });

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
      name: "Maybe one day",
      icon: '/images/__importance-1.png'
    },
    {
      weight: 2,
      name: "To be done ASAP",
      icon: '/images/__importance-2.png'
    },
    {
      weight: 3,
      name: "Right now!",
      icon: '/images/__importance-3.png'
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

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send the data to an API or perform other actions.

    const datas = {
      ...formData,
      urgency,
      importance,
      repeat,
    };

    fetch('http://127.0.0.1:5000/add-task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datas)
    }).then(() => {
      console.log('new task added')
    }).catch((error) => {
      console.log(error)
    })
  };

  const handleUrgencyChange = (event) => {
    setUrgency(parseInt(event.target.value));
  }

  const handleRepeatChange = (event) => {
    setRepeat(parseInt(event.target.value));
  }

  const handleImportanceChange = (event) => {
    setImportance(parseInt(event.target.value));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Input
            onChange={handleChange}
            type="text"
            value={formData.name}
            name="name"
            style={{width: "100%"}}
          />
        </Grid>
        <Grid item xs={6}>
          {/* <TextField
            fullWidth
            label="Duration (minutes)"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
          /> */}
        </Grid>
        <Grid item xs={6}>
          {/* <TextField
            fullWidth
            label="Deadline"
            name="deadline"
            type="datetime-local"
            value={formData.deadline}
            onChange={handleChange}
            required
          /> */}
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset" style={{
            display: "flex",
          }}>
            <RadioGroup
              row
              aria-label="options"
              name="importance"
              value={urgency}
              onChange={handleImportanceChange}
              required
            >
              <Grid container spacing={4}>
                {importanceOptions.map((item) => (
                  <Grid item key={`importance_${item.weight}`} xs={4}>
                    <div
                      className={`${styles.taskCreate__radio} ${importance == item.weight ? styles.taskCreate__radio__active : ""
                      }`}>
                      <FormControlLabel
                        value={item.weight}
                        control={<Radio sx={{display: "none"}}/>} // Hide the radio button
                        label={item.name}
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset" style={{
            display: "flex",
          }}>
            <RadioGroup
              row
              aria-label="options"
              name="urgency"
              value={urgency}
              onChange={handleUrgencyChange}
              required
            >
              <Grid container spacing={4}>
                {urgencyOptions.map((item) => (
                  <Grid item key={`urgency_${item.weight}`} xs={4}>
                    <div
                      className={`${styles.taskCreate__radio} ${urgency == item.weight ? styles.taskCreate__radio__active : ""
                      }`}>
                      <FormControlLabel
                        value={item.weight}
                        control={<Radio sx={{display: "none"}}/>} // Hide the radio button
                        label={
                          <>
                            <div style={{display: 'flex', 'justifyContent': 'center'}}>
                              <Image
                              width={30}
                              height={30}
                              src={item.icon}
                              alt="Icon"
                              style={{
                                height: "auto",
                                maxWidth: "100%",
                                marginBottom: '10px'
                              }}
                            />
                            </div>
                            <div style={{display: 'flex', 'justifyContent': 'center'}}>
                              {item.name}
                            </div>
                          </>
                        }
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset" style={{
            display: "flex",
          }}>
            <RadioGroup
              row
              aria-label="options"
              name="task_type"
              value={repeat}
              onChange={handleRepeatChange}
              required
            >
              <Grid container spacing={4}>
                {repeatOptions.map((item) => (
                  <Grid item key={`repeat_${item.weight}`} xs={4}>
                    <div
                      className={`${styles.taskCreate__radio} ${repeat === item.weight ? styles.taskCreate__radio__active + ' ' + styles[`taskCreate__radio__active__${item.weight}`] : ''}`}
                    >
                      <FormControlLabel
                        value={item.weight}
                        control={<Radio sx={{display: "none"}}/>} // Hide the radio button
                        label={item.name}
                      />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button className="button p b bgGreen" type="submit" variant="contained">
            Save changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskCreate;
