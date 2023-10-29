import random
import time
import json
import db_controller

tasks = []
base_time = time.mktime(time.strptime("2023-10-28 19:00:00", "%Y-%m-%d %H:%M:%S"))
names = ["Read a Book", "Write an Essay", "Clean the Room", "Go for a Run", "Prepare Dinner",
         "Watch a Movie", "Study for Exam", "Visit a Friend", "Attend a Meeting", "Work on Project"]

for i in range(1, 41):
    creation_date = int(base_time - random.randint(0, 2 * 24 * 3600) + random.randint(0, 24 * 3600))
    duration = random.randint(1, 8)  # Assuming duration is in hours
    deadline = creation_date + duration * 3600 + random.randint(1, 24 * 3600)  # Deadline after creation_date
    task = {
        "id": i,
        "name": random.choice(names),
        "urgency": random.randint(1, 3),
        "importance": random.randint(1, 3),
        "fun_factor": random.randint(1, 3),
        "duration": duration,
        "deadline": deadline,
        "depends_on": [],
        "creation_date": creation_date,
        "status": "open"
    }
    tasks.append(task)

# Print the generated tasks
data = []
for task in tasks:
    data.append(task)

def read_json_file(file_path):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error decoding JSON in '{file_path}'.")
        return None

# Replace 'your_file.json' with the path to your JSON file
file_path = 'dummy_data.json'
json_data = read_json_file(file_path)

if json_data:
    db = db_controller.get_task_collection()
    db.delete_many({})
    result = db.insert_many(data)
    print(result.inserted_ids)