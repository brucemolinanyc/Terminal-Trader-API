from flask import Flask
from flask_cors import CORS

app = Flask(__name__, static_url_path='')
cors = CORS(app)

from flask_app import routes
