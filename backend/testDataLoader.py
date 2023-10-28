import json
import db_controller

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
    result = db.insert_many(json_data)
    print(result.inserted_ids)