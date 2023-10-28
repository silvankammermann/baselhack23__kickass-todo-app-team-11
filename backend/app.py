# save this as app.py
from flask import Flask
import json
import task_handling

app = Flask(__name__)

@app.route("/gettasks")
def get_tasks():
    # with open('dummy_data.json') as task_file:
    #     tasks_str = task_file.read()
    #     # tasks = json.load(task_file)
    #     tasks = json.loads(tasks_str)

    sorted_tasks = task_handling.order_tasks()

    return sorted_tasks


if __name__ == "__main__":
    app.run()

