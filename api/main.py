import os
import json
from dotenv import load_dotenv
import requests
from flask_cors import CORS
from flask import Flask, jsonify, request, redirect
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
    JWTManager,
)
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
app.config["JWT_SECRET_KEY"] = "jhsdkldshljashLJHDFJLfhlssa123!!!" #nosec
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)
jwt = JWTManager(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now +timedelta(minutes=30) )
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test": #nosec
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token": access_token}
    return response


@app.route("/profile")
@jwt_required()
def my_profile():
    response_body = {
        "name": "Nagato",
        "about": "Hello! I'm a full stack developer that loves python and javascript",
    }
    return response_body

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Authorization": "Client-ID " + UNSPLASH_KEY, "Accept-Version": "v1"}
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

@app.route("/signup", methods=["POST"])
def signup():
    db = client["images-db"]
    users = db["users"]
    user = {
        "user": request.get_json(),
        }
    users.insert_one(user)
    return "User signed up successfully"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050) #nosec
