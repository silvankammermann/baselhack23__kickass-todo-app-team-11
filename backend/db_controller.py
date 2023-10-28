from flask import Flask
from pymongo import MongoClient

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)

# Set up a connection to MongoDB
username = "kickass"
password = "Stein123"
cluster_name = "baselhack23.oc5gztg.mongodb.net"
database_name = "Hack01"

uri = f"mongodb+srv://kickass:{password}@baselhack23.oc5gztg.mongodb.net/?retryWrites=true&w=majority"


# Create a new client and connect to the server

def check_connection():
    client = MongoClient(uri, server_api=ServerApi('1'))
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)


@app.route('/')
def call_database():
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client[database_name]
    return db


def get_user_collection():
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client[database_name]
    collection = db["user"]
    return collection


def get_task_collection():
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client[database_name]
    collection = db["task"]
    return collection


if __name__=="__main__":
    get_task_collection()