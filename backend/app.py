# save this as app.py
import json
# import reset_user

from flask import Flask, request
from flask import jsonify
from flask_cors import CORS # needs pip install Flask-CORS

from user_handling import get_user as user_get_user
from user_handling import get_characteristics as user_get_characteristics
from task_handling import set_done as task_set_done
from task_handling import set_do_later as task_set_later
from task_handling import add_task as task_add_task
from task_handling import get_tasks as task_get_tasks
from task_handling import get_subtask as task_get_subtask

from data_handling import check_new_task as data_check_new_task

from db_controller import get_task_collection, get_user_collection

app = Flask(__name__)
CORS(app)

# call like this: http://127.0.0.1:5000/gettasks/foo
@app.route("/<search>", defaults={'search': None})
@app.route("/get-tasks/<search>", methods=["GET"])
def get_tasks(search):
    return task_get_tasks(search)

@app.route("/add-tasks", methods=["POST"])
def add_tasks(tasks: list):
    for task in tasks:
        task_add_task(task)
    return

@app.route("/add-task", methods=["POST"])
def add_task():

    task_data = request.get_json()
    task_data_cleaned = data_check_new_task(task_data)
    task_add_task(task_data_cleaned)
    return task_get_tasks()


@app.route("/set-done/<task_id>", methods=["GET"])
@app.route("/<task_id>", defaults={'task_id': None})
def set_done(task_id):
    task_set_done(task_id)
    return task_get_tasks()

@app.route("/set-do-later/<task_id>", methods=["GET"])
@app.route("/<task_id>", defaults={'task_id': None})
def do_later(task_id):
    task_set_later(task_id)
    return task_get_tasks()

@app.route("/get-user", methods=["GET"])
def get_user():
    return get_user()

@app.route("/get-characteristics", methods=["GET"])
def get_characteristics():
    return user_get_characteristics()

@app.route("/get-subtasks/<int:task_id>", methods=["GET"])
def get_subtask(task_id):
    return task_get_subtask(task_id)


if __name__ == "__main__":
    app.run()
