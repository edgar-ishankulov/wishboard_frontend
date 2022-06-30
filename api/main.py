from mongoengine import *
import os
from dotenv import load_dotenv
import requests
from flask_cors import CORS
from flask import Flask, jsonify, request
from flask_mongoengine import MongoEngine
# from pymongo import MongoClient
connect(host='mongodb+srv://edgarishankulov:numberfucking23@cluster0.avgjl.mongodb.net/images-db?retryWrites=true&w=majority')

# client = MongoClient('mongodb+srv://edgarishankulov:numberfucking23@cluster0.avgjl.mongodb.net/images-db?retryWrites=true&w=majority')
load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert UNSPLASH_KEY there"
    )

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = DEBUG


@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Authorization": "Client-ID " +
               UNSPLASH_KEY, "Accept-Version": "v1"}
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data

class User(DynamicDocument):
    id = StringField(primary_key=True)

    # test = StringField()
    # meta = {'strict': False}

@app.route("/images", methods=["GET", "POST", "DELETE"])
def images():
    
    if request.method == "GET":
        image = User.objects()
        return image.to_json()
    
    if request.method == "POST":
        
        img = request.get_json()
        imageSave = User(**img).save()
        return 'imageSave'

    # if request.method == "DELETE":




if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
