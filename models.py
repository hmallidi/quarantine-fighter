from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
import psycopg2

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:locations123@35.193.211.128/locationsdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)



drugstore_hospital_link = db.Table('drugstore_hospital_link',
                                   db.Column('drugstore_id', db.String, db.ForeignKey('drugstore.id')),
                                   db.Column('hospital_id', db.String, db.ForeignKey('hospital.id')))

class Drugstore(db.Model):
    __tablename__ = 'drugstore'
    id = db.Column(db.String, primary_key=True, nullable=False)

    name = db.Column(db.String, nullable=False)

    address = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    opening_hours = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)

    # rating = db.Column(db.Float, nullable=False)

    # website = db.Column(db.String, nullable=False)
    google_maps_url = db.Column(db.String, nullable=False)
    # phone_number = db.Column(db.String, nullable=False)
    # img_url = db.Column(db.String, nullable=False)

    city_id = db.Column(db.Integer, db.ForeignKey('city.id'))
    hospitals_nearby = db.relationship('Hospital', secondary=drugstore_hospital_link, backref=db.backref('drugstores_nearby', lazy='dynamic'))


class Hospital(db.Model):
    __tablename__ = 'hospital'
    id = db.Column(db.String, primary_key=True, nullable=False)

    name = db.Column(db.String, nullable=False)

    address = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.String, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    opening_hours = db.Column(db.String, nullable=False)
    business_status = db.Column(db.String, nullable=False)

    # rating = db.Column(db.Float, nullable=False)

    # website = db.Column(db.String, nullable=False)
    google_maps_url = db.Column(db.String, nullable=False)
    # phone_number = db.Column(db.String, nullable=False)
    # img_url = db.Column(db.String, nullable=False)

    city_id = db.Column(db.Integer, db.ForeignKey('city.id'))


class City(db.Model):
    __tablename__ = 'city'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    state = db.Column(db.String(2), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    population = db.Column(db.Integer, nullable=False)

    hospitals = db.relationship('Hospital', backref='city')
    drugstores = db.relationship('Drugstore', backref='city')



if __name__ == "__main__":
    db.drop_all()
    db.create_all()
