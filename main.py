import googlemaps
import json
import time
import usaddress
import requests

from flask import Flask, session, render_template, request, url_for, session, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import text
import os
from models import City, Hospital, Drugstore, db, app
from request import cities_list
from models import app, db

# app = Flask(__name__)


@app.route('/')
def index():
    """
       home page, can be redirected to grocery, restaurants, healthcare page, and about page
    """
    return render_template('index.html')


@app.route('/grocery', methods=['GET', 'POST'])
def grocery():
    """
        grocery page, contains open/close status and general info for each grocery stores listed
    """
    return render_template('grocery.js')


@app.route('/restaurants', methods=['GET', 'POST'])
def restaurants():
    """
        restaurants page, contains open/close status and general info for each restaurants listed
    """
    return render_template('restaurants.js')


@app.route('/healthcare', methods=['GET', 'POST'])
def healthcare():
    """
        healthcare page, contains open/close status and general info for each healthcare listed
    """
    return render_template('healthcare.js')


@app.route('/about', methods=['GET', 'POST'])
def about():
    """
        about page, contains introductions of each team memeber, data source used, and all the required
    """
    return render_template('about.html')


errordict = {
            'code': 500,
            'message': 'An error occurred'
        }


@app.route("/api/City/")
def getCitiesByQuery():
    name = request.args.get("name")
    try:
        if name is None:
            return jsonify([]), 200
        else:
            city_result = db.session.query(City).filter_by(name=name).all()

            if len(city_result) == 0:
                return jsonify([]), 200

            city_result = city_result[0]

            city_dict = {"id": city_result.id, "name": city_result.name, "state": city_result.state,
                         "latitude": city_result.latitude, "longitude": city_result.longitude,
                         "population": city_result.population}

            hospital_list = list()
            hospital_result = db.session.query(Hospital).filter_by(city_id=city_result.id).all()

            for hospital in hospital_result:
                hospital_list.append(hospital.id)

            drugstore_list = list()
            drugstore_result = db.session.query(Drugstore).filter_by(city_id=city_result.id).all()

            for drugstore in drugstore_result:
                drugstore_list.append(drugstore.id)

            city_dict['hospitals'] = hospital_list
            city_dict['drugstores'] = drugstore_list

            city_list = []
            city_list.append(city_dict)

        return jsonify(city_list), 200
    except Exception:
        return jsonify(errordict), 500


@app.route("/api/City/<int:city_id>")
def getCityById(city_id: int):
    try:
        city_result = db.session.query(City).filter_by(id=city_id).all()

        if len(city_result) == 0:
            return jsonify([]), 200

        city_result = city_result[0]

        city_dict = {"id": city_result.id, "name": city_result.name, "state": city_result.state,
                     "latitude": city_result.latitude, "longitude": city_result.longitude,
                     "population": city_result.population}

        hospital_list = list()
        hospital_result = db.session.query(Hospital).filter_by(city_id=city_result.id).all()

        for hospital in hospital_result:
            hospital_list.append(hospital.id)

        drugstore_list = list()
        drugstore_result = db.session.query(Drugstore).filter_by(city_id=city_result.id).all()

        for drugstore in drugstore_result:
            drugstore_list.append(drugstore.id)

        city_dict['hospitals'] = hospital_list
        city_dict['drugstores'] = drugstore_list

        city_list = []
        city_list.append(city_dict)

        return jsonify(city_list), 200
    except Exception:
        return jsonify(errordict), 500


@app.route("/api/Hospital/")
def getHospitalsByQuery():
    name = request.args.get("name")
    city = request.args.get("city")

    try:
        if name is None and city is None:
            return jsonify([]), 200

        elif name is None:
            city_result = db.session.query(City).filter_by(name=city).all()

            if len(city_result) == 0:
                return jsonify([]), 200

            city_id = city_result[0].id

            result = db.session.query(Hospital).filter_by(city_id=city_id).all()

            if len(result) == 0:
                return jsonify([]), 200

            return_list = list()

            for hospital in result:
                return_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                               'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                               'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id}

                return_dict['drugstores_nearby'] = list()

                for drugstore in hospital.drugstores_nearby:
                    return_dict['drugstores_nearby'].append(drugstore.id)

                return_list.append(return_dict)

            return jsonify(return_list), 200

        elif city is None:
            result = db.session.query(Hospital).filter_by(name=name).all()

            if len(result) == 0:
                return jsonify([]), 200

            return_list = list()

            for hospital in result:
                return_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                               'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                               'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id}

                return_dict['drugstores_nearby'] = list()

                for drugstore in hospital.drugstores_nearby:
                    return_dict['drugstores_nearby'].append(drugstore.id)

                return_list.append(return_dict)

            return jsonify(return_list), 200

        else:
            city_result = db.session.query(City).filter_by(name=city).all()

            if len(city_result) == 0:
                return jsonify([]), 200

            city_id = city_result[0].id

            print("hello")
            result = db.session.query(Hospital).filter_by(name=name, city_id=city_id).all()
            print("hello2")

            if len(result) == 0:
                return jsonify([]), 200

            return_list = list()

            for hospital in result:
                return_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                               'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                               'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id}

                return_dict['drugstores_nearby'] = list()

                for drugstore in hospital.drugstores_nearby:
                    return_dict['drugstores_nearby'].append(drugstore.id)

                return_list.append(return_dict)

            return jsonify(return_list), 200
    except Exception:
        return jsonify(errordict), 500


if __name__ == "__main__":
    app.debug = True
    app.run()
