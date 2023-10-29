import json

from bson import ObjectId

import db_controller
import pymongo
import time
from get_subtasks import generate_subtasks

import numpy as np

from datetime import datetime


# functionality around task scheduling, task prioritization etc.

def add_task(taskJson):
    taskJson["creation_date"] = int(time.time())
    taskJson["status"] = "todo"
    taskJson["score"] = taskJson['urgency'] + taskJson['importance']

    date_time = datetime.strptime(taskJson["deadline"], '%Y-%m-%dT%H:%M')
    timestamp = date_time.timestamp()
    timestamp_as_int = int(timestamp)
    taskJson["deadline"] = timestamp_as_int

    try:
        db = db_controller.get_task_collection()
        result = db.insert_one(taskJson)
        return result
    except pymongo.errors.PyMongoError as e:
        # Handle any potential errors here
        print(f"Error inserting task: {e}")
        return None

def update_status(document_id, new_status):
    db = db_controller.get_task_collection()
    filter = {"_id": ObjectId(document_id)}
    if new_status == "do_later":
        update = {'$inc': {'score': 1}}
        result = db.update_one(filter, update)

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
        return sorted(data, key=lambda task: (task["urgency"], task["importance"]), reverse=True)

    return data


def get_tasks(search="", sorting="importance-urgency"):
    data = []
    search_criteria = {
        'creation_date': {'$lt': int(time.time())}
    }
    if search:
        search_criteria['name'] = {'$regex': search, '$options': 'i'}

    # for document in db_controller.get_task_collection().find():
    #     update_score(document)

    results = db_controller.get_task_collection().find({'$and': [search_criteria]})
    for obj in results:
        obj_i = obj
        obj_i["_id"] = str(obj_i["_id"])
        data.append(obj_i)

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
