from flask import Flask
from flask_sqlalchemy import SQLalchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",) #need to change it
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLalchemy(app)

class Restaurants(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    google_api_id = db.Column(db.String, unique=True, nullable=False)
    type = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    open_status = db.Column(db.String, nullable=False)
    rating = db.Column(db.Double, nullable=False)
    price_level = db.Column(db.Integer, nullable=False)
    website = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)

class Grocery(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    google_api_id = db.Column(db.String, unique=True, nullable=False)
    type = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    open_status = db.Column(db.String, nullable=False)
    rating = db.Column(db.Double, nullable=False)
    price_level = db.Column(db.Integer, nullable=False)
    website = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)

class Healthcare(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True)
    google_api_id = db.Column(db.String, unique=True, nullable=False)
    type = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    open_status = db.Column(db.String, nullable=False)
    rating = db.Column(db.Double, nullable=False)
    price_level = db.Column(db.Integer, nullable=False)
    website = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)


if __name__ == "__main__":
    db.drop_all()
    db.create_all()

# from flask import Flask, render_template

# app = Flask(__name__)

# @app.route('/')
# def index():
#     """
#        home page, can be redirected to grocery, restaurants, healthcare page, and about page
#     """
#     return render_template('index.html')

# @app.route('/grocery', methods=['GET', 'POST'])
# def grocery():
#     """
#         grocery page, contains open/close status and general info for each grocery stores listed
#     """
#     return render_template('grocery.html')

# @app.route('/restaurants', methods=['GET', 'POST'])
# def restaurants():
#     """
#         restaurants page, contains open/close status and general info for each restaurants listed
#     """
#     return render_template('restaurants.html')

# @app.route('/healthcare', methods=['GET', 'POST'])
# def healthcare():
#     """
#         healthcare page, contains open/close status and general info for each healthcare listed
#     """
#     return render_template('healthcare.html')

# @app.route('/about', methods=['GET', 'POST'])
# def about():
#     """
#         about page, contains introductions of each team memeber, data source used, and all the required information
#     """
#     return render_template('about.html')

# if __name__ == "__main__":
#     app.debug = True
#     app.run()