# import os allows access to environment variables
import os

# dotenv package allows adding .env file contents to environment variables
from dotenv import load_dotenv

# requests package allows sending api requests to external sevices
import requests

# imports Flask app; Flask request object contains the data that the client (eg a browser) has sent to your app
from flask import Flask, request

# inserting .env file into environment variables custom file name
load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = 'https://api.unsplash.com/photos/random/'

# accessing environment variables and looking for UNSPLASH_KEY and assigning to new variable
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")

# declaring new variable DEBUG; accessing environment variable, looking for DEBUG variable, setting default value of true if it's absent in environment variables. If present, converting the string that is provided as a result of get method of environment variable into boolean value.
DEBUG=bool(os.environ.get("DEBUG", True))

# exception when UNSPLASH_KEY is absent to raise an error and stop app
if not UNSPLASH_KEY:
    raise EnvironmentError("Please create .env.local file and insert UNSPLASH_KEY there")

# creation of Flask app instance. __name__ represents the name of the application package and it's used by Flask to identify resources like templates, static assets and the instance folder. __name__ is automatically renamed into current filename at runtime.
app = Flask(__name__)

# configuration of Flask app to enable Debug mode (relaunches app after save)
app.config["DEBUG"] = DEBUG

# @app. route("/") is a Python decorator that Flask provides to assign URLs in our app to functions easily. The decorator is telling our @app that whenever a user visits our app domain (myapp.com) at the given . route() , execute the home() function.
@app.route("/new-image")

# function declaration
def new_image():

# request.arg is an immutable multi dictionary that is the query part of user request, has key value pairs that can be accessed with GET method.
    word = request.args.get("query")

# creating a dictionary and inserting one of the possible authorization methods of Unsplash (through headers dict); HTTP headers let the client and the server pass additional information with an HTTP request or response. All the headers are case-insensitive, headers fields are separated by colon, key-value pairs in clear-text string format.
    headers = {
        "Authorization": "Client-ID " + UNSPLASH_KEY,
        "Accept-Version": "v1"
    }

# creating the params dictionary; params - A dictionary, list of tuples or bytes to send as a query string.
    params = {"query": word}

# the actual request to Unsplash API and putting it into response variable. 
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)

#The json() method of the Response interface takes a Response stream and reads it to completion. It returns a promise which resolves with the result of parsing the body text as JSON. Note that despite the method being named json(), the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
    data = response.json()
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
