from flask import jsonify

mock_user = {
    "username": "john_doe",
    "characteristics": ["extrovert", "night", "sportive", "musical", "calm"]
}

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
    return jsonify(mock_user)

def get_characteristics():
    return jsonify(mock_characteristics)