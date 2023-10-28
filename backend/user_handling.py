from flask import jsonify

mock_user = {
    "username": "john_doe",
    "name": "John",
    "lastname": "Doe",
    "characteristics": ["friendly", "creative", "enthusiastic"]
}

def get_user():
    return jsonify(mock_user)