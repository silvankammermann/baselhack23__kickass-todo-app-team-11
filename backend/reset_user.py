import json

with open("user.json") as f:
    mock_user = json.load(f)
mock_user["score"] = 0
with open('data.json', 'w') as f:
    json.dump(mock_user, f)