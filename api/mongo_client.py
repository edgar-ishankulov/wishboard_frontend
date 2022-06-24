import os;
from dotenv import load_dotenv;
load_dotenv(dotenv_path="./.env.local");
from mongoengine import *;
connect(host='mongodb+srv://edgarishankulov:numberfucking23@cluster0.avgjl.mongodb.net/images-db?retryWrites=true&w=majority')

class Image(Document):
    email = StringField(required=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)


# ross = Image(email='ross@example.com')
# ross.first_name = 'Ross'
# ross.last_name = 'Lawley'
# ross.save()
john = Image(email='john@example.com')
john.first_name = 'John'
john.last_name = 'Lawley'
john.save()

