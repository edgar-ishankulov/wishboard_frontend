import os
from dotenv import load_dotenv
import requests
from flask_cors import CORS
from flask import Flask, jsonify, request
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"
DB_HOST = os.environ.get("DB_HOST")
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))
client = pymongo.MongoClient(DB_HOST)

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



@app.route("/images", methods=["GET", "POST", "DELETE"])
def images():
    
    if request.method == "GET":
        db = client["images-db"]
        imagesCollection = db["imagesCollection"]
        return dumps(imagesCollection.find())
    
    if request.method == "POST":
        db = client["images-db"]
        imagesCollection = db["imagesCollection"]
        img = request.get_json()
        imagesCollection.insert_one(img)
        return "Image saved"

    if request.method == "DELETE":
        db = client["images-db"]
        imagesCollection = db["imagesCollection"]
        img = request.get_json()
        imagesCollection.delete_one(img)
        return "Image Deleted"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)