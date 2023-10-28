# save this as app.py
from flask import Flask
import json
from db_controller import get_task_collection, get_user_collection
import task_handling

app = Flask(__name__)


@app.route("/gettasks", methods=["GET"])
def get_tasks():
    pass


@app.route("/addtask", methods=["POST"])
def add_tasks(tasks: list):
    pass


@app.route("/set_done/<int:task_id>", methods=["POST"])
def set_done(task_id: int):
    pass


@app.route("/set_do_later/<int:task_id>", methods=["POST"])
def do_later(task_id: int):
    pass


if __name__ == "__main__":
    app.run()
