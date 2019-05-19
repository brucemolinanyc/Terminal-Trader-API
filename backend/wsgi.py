# from flask_app import app

# if __name__ == "__main__":
#     app.run(debug=True)


from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

from flask_app import routes
