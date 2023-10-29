import json
import random

from bson import ObjectId

import db_controller
import pymongo
import time
from get_subtasks import generate_subtasks, makes_sense_to_divide_task
from user_handling import increase_user_score

import numpy as np

from datetime import datetime


# functionality around task scheduling, task prioritization etc.

def add_task(taskJson):
    """
    {'_id': '653e3db0d131d9f3d598269a',
    'name': 'Pay membership for Slothful Social Club',
    'urgency': 3,
    'importance': 3,
    'fun_factor': 1,
    'duration': 55,
    'dependency': [],
    'creation_date': 1697925600,
    'deadline': 1698184800,
    'status': 'do_later',
    'delayed_int': 3,
    'task_type': 'single'}
    """

    # No Subtasks
    tasks = []
    if True or makes_sense_to_divide_task(taskJson["name"]):
        taskJson["creation_date"] = int(time.time())
        taskJson["status"] = "open"
        taskJson["score"] = taskJson['urgency'] + taskJson['importance']
        taskJson["delayed_int"] = 0

        tasks.append(taskJson)
    # With Subtasks
    else:
        subtasks = generate_subtasks(taskJson["name"])
        for task in subtasks:
            task["creation_date"] = int(time.time())
            task["status"] = "open"
            task["score"] = task['urgency'] + task['importance']
            task["delayed_int"] = 0

            task['dependency'] = taskJson['dependency']
            task['deadline'] = taskJson['deadline']
            task['task_type'] = taskJson['task_type']

            tasks.append(task)

    try:
        db = db_controller.get_task_collection()
        result = db.insert_many(tasks)
    except pymongo.errors.PyMongoError as e:
        # Handle any potential errors here
        print(f"Error inserting task: {e}")
        return None


def update_status(document_id, new_status):
    db = db_controller.get_task_collection()
    filter = {"_id": ObjectId(document_id)}
    if new_status == "do_later":
        update = {'$inc': {'score': 1, 'delayed_int': 1}}
        result = db.update_one(filter, update)
    elif new_status == "done":
        document = db_controller.get_task_collection().find_one(
            {'_id': ObjectId(document_id)},
            {'score': 1, '_id': 0}
        )
        increase_user_score(document['score'])
        # increase_user_score(1)

    update = {"$set": {"status": new_status}}

    try:
        result = db.update_one(filter, update)
        return result
    except pymongo.errors.PyMongoError as e:
        # Handle any potential errors here
        print(f"Error inserting task: {e}")
        return None


def get_ordered_tasks(n=10):
    """
    n: max number of task forwarded from the function
    :return list of dicts
    """
    return list(db_controller.get_task_collection().find().sort("deadline").limit(n))


def set_done(document_id):
    update_status(document_id, "done")


def set_do_later(document_id):
    update_status(document_id, "do_later")


def sort_tasks(sorting, data):
    """
    One sorting function for now, can update with more later
    """

    if sorting == "importance":
        return sorted(data, key=lambda task: task["importance"], reverse=True)

    if sorting == "importance-deadline":
        return sorted(data, key=lambda task: (task["importance"], task["deadline"]), reverse=True)

    if sorting == "importance-urgency":
        return sorted(data, key=lambda task: (task["urgency"], task["importance"], -task["delayed_int"]), reverse=True)

    return data


def get_tasks(search="", sorting="importance-urgency"):
    data = []
    search_criteria = {
        'creation_date': {'$lt': int(time.time())},
        'status': {'$ne': 'done'}
    }
    if search:
        search_criteria['name'] = {'$regex': search, '$options': 'i'}

    # for document in db_controller.get_task_collection().find():
    #     update_score(document)

    results = db_controller.get_task_collection().find({'$and': [search_criteria]})
    for obj in results:
        obj_i = obj
        obj_i["_id"] = str(obj_i["_id"])

        obj_name = obj_i["name"]

        data.append(obj_i)


        # No Subtasks
  #      if makes_sense_to_divide_task(obj_name):
  #          data.append(obj_i)
        # With Subtasks
  #      else:
  #          subtasks = generate_subtasks(obj)
  #          for task in subtasks:
  #              data.append(task)

    if sorting != "deadline":
        data = sort_tasks(sorting, data)
    return data


def get_subtask(task_id):
    filter = {"_id": task_id}
    task = db_controller.get_task_collection().find_one(filter)
    subtasks = generate_subtasks(task)
    return subtasks


def update_score(document):
    db = db_controller.get_task_collection()
    score = calculate_importance_score(document)

    # The query to find the document you want to update
    query = {"_id": document["_id"]}

    # The new value you want to set
    new_values = {"$set": {"score": score}}
    db.update_one(query, new_values)

    return None


def calculate_importance_score(task):
    current_time = int(time.time())
    time_until_deadline = int(task['deadline']) - current_time
    time_until_deadline = max(time_until_deadline, 1)  # Avoid division by zero

    urgency_weight = 1
    importance_weight = 1

    score = (int(task['urgency']) * urgency_weight +  # important
             int(task['importance']) * importance_weight)  # important

    # score = 1/(1+np.exp(-np.clip(score, a_min=-100, a_max=100)))

    return score
