import json
import os
from flask import jsonify

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
    path = os.getcwd()
    if "backend" in path:
        with open("user.json") as f:
            mock_user = json.load(f)
    else:
        with open("backend/user.json") as f:
            mock_user = json.load(f)

    return mock_user


def increase_user_score(score=0):
    with open("user.json") as f:
        mock_user = json.load(f)
    mock_user["score"] += score
    with open('data.json', 'w') as f:
        json.dump(mock_user, f)


def get_characteristics():
    return jsonify(mock_characteristics)
