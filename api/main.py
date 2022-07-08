import email
import os
import json
from dotenv import load_dotenv
import requests
from flask_cors import CORS
from flask import Flask, jsonify, request, url_for, redirect
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
from flask_mail import Mail, Message
from itsdangerous import SignatureExpired, URLSafeTimedSerializer

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random/"
FRONTEND_HOST = os.environ.get("FRONTEND_HOST")
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
serializer = URLSafeTimedSerializer("SecretKey")
app.config["DEBUG"] = DEBUG
app.config["JWT_SECRET_KEY"] = "jhsdkldshljashLJHDFJLfhlssa123!!!" #nosec
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=3)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USERNAME"] = "edgar.ishankulov@gmail.com"
app.config["MAIL_PASSWORD"] = "fdbpkuqonvbhjlhm" #nosec




jwt = JWTManager(app)

@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Authorization": "Client-ID " + UNSPLASH_KEY, "Accept-Version": "v1"}
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST", "DELETE"])
@jwt_required()

def images():

    if request.method == "GET":
        db = client["images-db"]
        imagesCollection = db["users"]
        identity = get_jwt_identity()
        userImages = dumps(db["users"].find({"email": identity}, {"images": 1, "_id": 0} ))
        print(userImages)
        return userImages

    if request.method == "POST":
        db = client["images-db"]
        usersCollection = db["users"]
        identity = get_jwt_identity()
        img = request.get_json()
        print()
        usersCollection.update_one({"email": identity}, { "$push": {'images': img} })
        return "Image saved"

    if request.method == "DELETE":
        db = client["images-db"]
        imagesCollection = db["imagesCollection"]
        img = request.get_json()
        imagesCollection.delete_one(img)
        return "Image Deleted"

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




# @app.route("/profile")
# @jwt_required()
# def my_profile():
#     response_body = {
#         "name": "Nagato",
#         "about": "Hello! I'm a full stack developer that loves python and javascript",
#     }
#     return response_body

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route("/token", methods=["POST"])
def create_token():
    db = client["images-db"]
    usersCollection = db["users"]
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = usersCollection.find_one({"email": email})
    if user == None:
        return {"msg": "Wrong email or password"}, 401
    if email != user['email'] or password != user['password']: #nosec
        return {"msg": "Wrong email or password"}, 401
    if (user['is_verified'] == False):
        return {"msg": "Account not verified"}, 402

    additional_claims = {"user": email}
    access_token = create_access_token(identity=email, additional_claims=additional_claims)
    response = {"access_token": access_token}
    return response

mail = Mail(app)

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        request_data = request.get_json()
        db = client["images-db"]
        usersCollection = db["users"]
        email = request_data['email']
        emailToken = serializer.dumps(email)

        msg = Message('Confirm Email', sender='edgar.ishankulov@gmail.com', recipients=[email])
        link = url_for('confirm_email', emailToken=emailToken, _external=True)
        msg.body = 'Your link is {}'.format(link)
        mail.send(msg)

        password = request_data['password']
        user = {
        'email': email, 
        'password': password,
        'is_verified': False
        }
    
        usersCollection.insert_one(user)
        return "User signed up successfully with token" + emailToken

@app.route("/confirm_email/<emailToken>")
def confirm_email(emailToken):
    try:
        db = client["images-db"]
        usersCollection = db["users"]
        email = serializer.loads(emailToken)
        print(email)
        user = usersCollection.find_one({'email': email})
        if (email == user['email']):
            usersCollection.find_one_and_update({'email': email}, { '$set': {'is_verified': True}})
            # return redirect(FRONTEND_HOST+"/profile", )

            return redirect("http://localhost:3000/profile", )
        #find email and change is_verified to true
    except SignatureExpired:
        return "The token expired"



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050) #nosec
    # app.run(host="192.168.0.171", port=5050) #nosec
