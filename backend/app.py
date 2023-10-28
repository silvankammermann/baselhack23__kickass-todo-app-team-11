# save this as app.py
import json
from flask import Flask
from flask import jsonify

from task_handling import set_done as task_set_done
from task_handling import set_do_later as task_set_later
from task_handling import add_task as task_add_task
from task_handling import get_tasks as task_get_tasks

from db_controller import get_task_collection, get_user_collection


app = Flask(__name__)


@app.route("/", methods=["GET"])
def get_tasks():
    tasks = {"data": task_get_tasks()}
    # tasks = jsonify
    return tasks


@app.route("/addtask", methods=["POST"])
def add_tasks(tasks: list):
    for task in tasks:
        task_add_task(task)
    return

@app.route("/set_done/<int:task_id>", methods=["POST"])
def set_done(task_id: int):
    task_set_done(task_id)
    return

@app.route("/set_do_later/<int:task_id>", methods=["POST"])
def do_later(task_id: int):
    task_set_later(task_id)
    return

if __name__ == "__main__":
    app.run()
