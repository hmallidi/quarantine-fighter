from flask import Flask
#from flask_sqlalchemy import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING", 'postgres://varanasipranav:locations123@localhost:5432/locationsdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

class Restaurants(db.Model):
    __tablename__ = 'restaurant'
    id = db.Column(db.Integer, primary_key=True)
    google_api_id = db.Column(db.String, unique=True, nullable=False)
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

class Grocery(db.Model):
    __tablename__ = 'grocery'
    id = db.Column(db.Integer, primary_key=True)
    google_api_id = db.Column(db.String, unique=True, nullable=False)
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

class Healthcare(db.Model):
    __tablename__ = 'healthcare'
    id = db.Column(db.Integer, primary_key=True)
    google_api_id = db.Column(db.String, unique=True, nullable=False)
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


if __name__ == "__main__":
    db.drop_all()
    db.create_all()
