import json
import db_controller
import pymongo
import time

from datetime import datetime


# functionality around task scheduling, task prioritization etc.

def add_task(taskJson):
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
    # todo get current
    return list(db_controller.get_task_collection().find().sort("deadline").limit(n))


def set_done(document_id):
    update_status(document_id, "done")

def set_do_later(document_id):
    update_status(document_id, "do_later")

def get_tasks():
    return list(db_controller.get_task_collection().find({'creation_date': {'$lt': int(time.time())}}).sort("deadline"))
