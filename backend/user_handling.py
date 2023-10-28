from flask import jsonify

mock_user = {
    "username": "john_doe",
    "characteristics": ["Musical", "Extrovert", "Social", "Ambivalent", "Humorous"]
}

mock_characteristics = [
    "Extrovert",
    "Night-Active",
    "Social",
    "Sportive",
    "Perfectionist",
    "Musical",
    "Humorous",
    "Calm",
    "Ambivalent",
]

def get_user():
    return jsonify(mock_user)

def get_characteristics():
    return jsonify(mock_characteristics)