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
    original_directory = os.getcwd()
    new_directory = "/backend"
    os.chdir(os.path.join(original_directory, new_directory))
    with open("user.json") as f:
        mock_user = json.load(f)

    os.chdir(original_directory)

    return mock_user


def increase_user_score(score=0):
    with open("user.json") as f:
        mock_user = json.load(f)
    mock_user["score"] += score
    with open('data.json', 'w') as f:
        json.dump(mock_user, f)


def get_characteristics():
    return jsonify(mock_characteristics)
