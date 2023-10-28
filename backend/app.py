# save this as app.py
from flask import Flask
import json

app = Flask(__name__)

@app.route("/gettasks")
def hello():
    with open('dummy_data.json') as task_file:
        tasks = task_file.read()
        # tasks = json.load(task_file)

        foo = json.loads(tasks)
        print(foo)

    return foo


if __name__ == "__main__":
    app.run()

