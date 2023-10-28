# save this as app.py
import json
from flask import Flask
from flask import jsonify

from user_handling import get_user as user_get_user
from task_handling import set_done as task_set_done
from task_handling import set_do_later as task_set_later
from task_handling import add_task as task_add_task
from task_handling import get_tasks as task_get_tasks

from db_controller import get_task_collection, get_user_collection


app = Flask(__name__)

@app.route("/<search>", defaults={'search': None})
@app.route("/gettasks/<search>", methods=["GET"])
def get_tasks(search):
    # call like this: http://127.0.0.1:5000/gettasks/foo
    print(search)
    tasks = task_get_tasks()
    return tasks


# @app.route("/gettasks", methods=["GET"])
# def get_tasks_all(search):
#     tasks = task_get_tasks()
#     return tasks


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

@app.route("/get-user", methods=["GET"])
def get_user():
    return user_get_user()

if __name__ == "__main__":
    app.run()
