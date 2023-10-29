import json
import db_controller
from datetime import date, timedelta
import time
import random


def delete_current_collection():
    db = db_controller.get_task_collection()
    result = db.delete_many({})
    print(f'db cleared: {result}')
    return


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


def create_manual_data_set():
    """
    "name": task_name,"urgency": get_val(urgency_range),
            "importance": get_val(importance_range),
            # "fun_factor": get_val(fun_factor_range),
            # "duration": get_val(duration_range),
            # "dependency": [],
            "creation_date": creation_unix,
            # "deadline": deadline_unix,
            "status": get_val(status_range),
            "delayed_int": get_val(delayed_int_range),
            "task_type": get_val(task_type_range)
    """
    task_list = [
        {
            "name": "Pay membership for Slothful Social Club",
            "importance": 3,
            "urgency": 2,
            "status": "open",
            "delayed_int": 0,
            "task_type": "monthly"

         },
        {
            "name": "Buy bug spray and bring to Baselhack",
            "importance": 3,
            "urgency": 3,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },
        {
            "name": "Play Beethoven for house plants",
            "importance": 2,
            "urgency": 1,
            "status": "open",
            "delayed_int": 0,
            "task_type": "weekly"

        },
        {
            "name": "Learn Brainfuck",
            "importance": 1,
            "urgency": 1,
            "status": "open",
            "delayed_int": 0,
            "task_type": "weekly"

        },
        {
            "name": "Switch VS Code to dark mode",
            "importance": 3,
            "urgency": 3,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },
        {
            "name": "Buy: 1/2 watermelon, 1/2 watermelon, super glue",
            "importance": 1,
            "urgency": 1,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },
        {
            "name": "Buy flowers for Mom's birthday",
            "importance": 3,
            "urgency": 3,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },
        {
            "name": 'Book flight to greece',
            "importance": 0,
            "urgency": 2,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },
        {
            "name": 'search ideas for Lena company farewell',
            "importance": 2,
            "urgency": 2,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },
        {
            "name": 'f*cking tax declaration!!!',
            "importance": 3,
            "urgency": 3,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },
        {
            "name": 'do laundry (only white)',
            "importance": 1,
            "urgency": 2,
            "status": "open",
            "delayed_int": 0,
            "task_type": "monthly"

        },
        {
            "name": 'plan my week',
            "importance": 3,
            "urgency": 3,
            "status": "open",
            "delayed_int": 0,
            "task_type": "weekly"

        },
        {
            "name": 'yoga-session with Silvan',
            "importance": 2,
            "urgency": 1,
            "status": "open",
            "delayed_int": 0,
            "task_type": "weekly"

        },
        {
            "name": 'Challenge proposals for BaselHack',
            "importance": 3,
            "urgency": 3,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },
        {
            "name": 'presentation for the master thesis',
            "importance": 3,
            "urgency": 1,
            "status": "open",
            "delayed_int": 0,
            "task_type": "single"

        },

        {
            "name": 'water plants(only a little)',
            "importance": 1,
            "urgency": 1,
            "status": "open",
            "delayed_int": 0,
            "task_type": "weekly"

        }]

    urgency_range = range(1, 4)
    importance_range = range(1, 4)
    # fun_factor_range = range(1,4)
    # duration_range = range(5,120,5)
    # deadline_range = range(1,11) #days
    # dependency = []
    creation_date_range = range(1, 11)
    status_range = ["open", "do_later", "done"]
    delayed_int_range = range(1, 11)
    task_type_range = ["single", "daily", "weekly"]

    tasks = []

    get_val = lambda r: random.choice(r)

    creation_date_min = 15

    for task in task_list:
        creation_day = creation_date_min + get_val(creation_date_range)
        creation_date = date(2023, 10, creation_day)
        creation_unix = int(time.mktime(creation_date.timetuple()))

        # deadline_date = creation_date + timedelta(days=get_val(deadline_range))
        # deadline_unix = int(time.mktime(deadline_date.timetuple()))

        task = {
            "name": task["name"],
            "urgency": task["urgency"],
            "importance": task["importance"],
            "score": task["urgency"]+task["importance"],
            # "fun_factor": get_val(fun_factor_range),
            # "duration": get_val(duration_range),
            # "dependency": [],
            "creation_date": creation_unix,
            # "deadline": deadline_unix,
            "status": task["status"],
            "delayed_int": task["delayed_int"],
            "task_type": task["task_type"]
        }

        tasks.append(task)

    return tasks


def add_data_set(tasks):
    db = db_controller.get_task_collection()
    result = db.insert_many(tasks)
    print()
    return


if __name__ == '__main__':
    delete_current_collection()
    new_tasks = create_manual_data_set()
    add_data_set(new_tasks)
