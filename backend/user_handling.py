import json
import os
from flask import jsonify
from db_controller import get_user_collection

mock_characteristics = [
    "extrovert",
    "night",
    "social",
    "sportive",
    "perfectionist",
    "musical",
    "humorous",
    "calm",
    "ambivalent",
]


def get_user():
    collection = get_user_collection()
    user = collection.find_one({"username": "john_doe"})
    return user


def increase_user_score(score=0):
    filter = {"username": "john_doe"}
    collection = get_user_collection()
    update = {'$inc': {'score': score}}
    result = collection.update_one(filter, update)
    return result


def get_characteristics():
    return jsonify(mock_characteristics)