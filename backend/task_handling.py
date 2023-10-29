import json
import db_controller
import pymongo
import time

from datetime import datetime


# functionality around task scheduling, task prioritization etc.

def add_task(taskJson):
    taskJson["creation_date"] = int(time.time())
    taskJson["status"] = "todo"

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
    filter = {"_id": document_id}
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

    return data



def get_tasks(search="", sorting="deadline"):
    data = []
    search_criteria = {
        'creation_date': {'$lt': int(time.time())}
    }
    if search:
        search_criteria['name'] = {'$regex': search, '$options': 'i'}

    results = db_controller.get_task_collection().find({'$and': [search_criteria]}).sort("deadline")
    for obj in results:
        obj_i = obj
        obj_i["_id"] = str(obj_i["_id"])
        data.append(obj_i)

    if sorting != "deadline":
        data = sort_tasks(sorting, data)
    return data


def update_score():
    raise NotImplementedError
