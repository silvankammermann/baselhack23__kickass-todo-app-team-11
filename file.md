### Input data

```json
{
  "name": "default",
  "id": 42,
  "urgency": 0,
  "importance": 0,
  "fun_factor": 0,
  "duration": 0,
  "deadline": "2023-10-29_16:00",
  "dependency": "tba",
  "creation_date": "2023-10-29_16:00",
  "status": 0,
  "delayed_int": 0
}
```

### Intended Behavior

- swiping task based on pre-computed order
- Insert task
  - add element to database (currently `backend/dummy_data.json`)
- Show task
  - Sample task with highest priority
  - Forward to frontend
- Swip task
  - Accept task
    - block app for defined **duration**
    - Delete or Ask if really finished ?
  - Not Accept
    - Check if possible (deadline)
    - If possible decrease **motivation/fun_factor**
    - Reschedule
- Task not done in time ?