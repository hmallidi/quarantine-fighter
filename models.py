from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING", 'postgres://postgres:cvsu2020@localhost:5432/locationsdb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)


class Drugstore(db.Model):
    __tablename__ = 'drugstore'
    google_api_id = db.Column(db.String, primary_key=True, nullable=False)
    place_type = db.Column(db.String, nullable=False)

    name = db.Column(db.String, nullable=False)

    address = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    open_state = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)

    rating = db.Column(db.Float, nullable=False)

    website = db.Column(db.String, nullable=False)
    google_maps_url = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    # img_url = db.Column(db.String, nullable=False)

    city = db.Column(db.String, db.ForeignKey('city.name'))


class Hospital(db.Model):
    __tablename__ = 'hospital'
    google_api_id = db.Column(db.String, primary_key=True, nullable=False)
    place_type = db.Column(db.String, nullable=False)

    name = db.Column(db.String, nullable=False)

    address = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    open_state = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)
    
    rating = db.Column(db.Float, nullable=False)

    website = db.Column(db.String, nullable=False)
    google_maps_url = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    # img_url = db.Column(db.String, nullable=False)

    city = db.Column(db.String, db.ForeignKey('city.name'))


class City(db.Model):
    __tablename__ = 'city'
    # id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, primary_key=True)
    population = db.Column(db.Integer, nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    hospitals = db.relationship('Hospital', backref='city')
    drug_stores = db.relationship('Drugstore', backref='city')


if __name__ == "__main__":
    db.drop_all()
    db.create_all()
