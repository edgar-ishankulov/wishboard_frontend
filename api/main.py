from mongoengine import *
from mongo_client import *
import os
from dotenv import load_dotenv
import requests
from flask_cors import CORS
from flask import Flask, request
from flask_mongoengine import MongoEngine

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


@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        image = Image.objects()
        return image.to_json()
    # if request.method == "POST":


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
