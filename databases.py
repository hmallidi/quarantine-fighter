from flask import Flask
from flask_sqlalchemy import SQLalchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "" #need to change it
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLalchemy(app)

# class Restaurant(db.Model):
#     __tablename__ = 'restuarants'

# class GroceryStore(db.Model):
#     __tablename__ = 'grocery_stores'

# class HealthCare(db.Model):
#     __tablename__ = 'healthcare_facilities'

class Locations(db.Model):
    __tablename__ = 'locations'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    type = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String, nullable=False)
    #need other fields, such as website, hours, etc.


if __name__ == "__main__":
    db.create_all()