import json
import db_controller
from datetime import date
import random


def delete_current_collection():
    db = db_controller.get_task_collection()
    result = db.delete_many({})
    print(f'db cleared: {result}')
    return


def get_deadline():
    print(date.today())


def create_data_set(n=50):
    pass


if __name__ == '__main__':
    get_deadline()
