# save this as app.py
from flask import Flask
import json
from db_controller import get_task_collection, get_user_collection
import task_handling

app = Flask(__name__)

@app.route("/gettasks")
def get_tasks():
    collection = get_task_collection()
    sorted_tasks = task_handling.order_tasks()

    return sorted_tasks


def delete_task(task):
    pass

if __name__ == "__main__":
    app.run()

