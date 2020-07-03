from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING", 'postgres://postgres:cvsu2020@localhost:5432/locationsdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

# class Restaurants(db.Model):
#     __tablename__ = 'restaurant'
#     google_api_id = db.Column(db.String, primary_key=True, nullable=False)
#     type = db.Column(db.String, nullable=False)
#     name = db.Column(db.String, nullable=False)
#     address = db.Column(db.String, nullable=False)
#     city = db.Column(db.String, nullable=False)
#     zipcode = db.Column(db.String, nullable=False)
#     open_status = db.Column(db.String, nullable=False)
#     rating = db.Column(db.Float, nullable=False)
#     price_level = db.Column(db.Integer, nullable=False)
#     website = db.Column(db.String, nullable=False)
#     img_url = db.Column(db.String, nullable=False)
#     business_status = db.Column(db.String, nullable=False)
#     phone_number = db.Column(db.String, nullable=False)

class Grocery(db.Model):
    __tablename__ = 'grocery'
    google_api_id = db.Column(db.String, primary_key=True, nullable=False)
    type = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    open_status = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    price_level = db.Column(db.Integer, nullable=False)
    website = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)

class Healthcare(db.Model):
    __tablename__ = 'healthcare'
    google_api_id = db.Column(db.String, primary_key=True, nullable=False)
    type = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    open_status = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    price_level = db.Column(db.Integer, nullable=False)
    website = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)

class City(db.Model):
    __tablename__ = 'tables'
    name = db.Column(db.String, nullable=False, primary_key=True)
    population = db.Column(db.Integer, nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    # covid_cases = db.Column(db.Integer, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    hospitals = db.Column() #relational to hospital table
    grocery_stores = db.Column() #relational to grocery store table

if __name__ == "__main__":
    db.drop_all()
    db.create_all()
