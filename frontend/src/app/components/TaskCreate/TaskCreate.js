import React, {useState} from "react";
import styles from "./TaskCreate.module.css";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

const TaskCreate = () => {
  const [formData, setFormData] = useState({
    name: "",
    urgency: "",
    importance: "",
    funFactor: "",
    duration: "",
    deadline: "",
  });

  const [selectedValue, setSelectedValue] = useState(null);
  const [clickedValue, setClickedValue] = useState(null);

  const gridData = [
    { title: "Daily", value: "daily" },
    { title: "Weekly", value: "weekly" },
    { title: "MONTHLY", value: "monthly" },
    { title: "nice to have", value: "nice_to_have" },
    { title: "quite important", value: "quite_important" },
    { title: "f*cking important!", value: "fucking_important" },
    { title: "maybe one day", value: "one_day" },
    { title: "to be done asap", value: "asap" },
    { title: "right now!", value: "now" },
  ];

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    setClickedValue(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send the data to an API or perform other actions.
    console.log(formData);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Urgency</InputLabel>
              <Select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Importance</InputLabel>
              <Select
                name="importance"
                value={formData.importance}
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Fun Factor</InputLabel>
              <Select
                name="funFactor"
                value={formData.funFactor}
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Deadline"
              name="deadline"
              type="datetime-local"
              value={formData.deadline}
              onChange={handleChange}
            />
          </Grid>
<Grid item xs={12}>
          <FormControl component="fieldset" style={{
            display: "flex",
          }}>
        <RadioGroup
          row
          aria-label="options"
          name="options"
          value={selectedValue}
          onChange={handleRadioChange}
        >
          <Grid container spacing={4}>
            {gridData.map((item) => (
              <Grid item key={item.value} xs={4}>
                <div className={`${styles.taskCreate__radio} ${
                    selectedValue === item.value ? styles.taskCreate__radio__active : ""
                  }`}>
                  <FormControlLabel
                    value={item.value}
                    control={<Radio sx={{ display: "none" }} />} // Hide the radio button
                    label={item.title}
                  />
                </div>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
</Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TaskCreate;
