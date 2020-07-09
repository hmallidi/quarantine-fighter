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

#@app.route('/')
#def index():
       # home page, can be redirected to grocery, restaurants, healthcare page, and about page
  #  return 'Hello'

# @app.route('/grocery', methods=['GET', 'POST'])
# def grocery():
#     """
#         grocery page, contains open/close status and general info for each grocery stores listed
#     """
#     return render_template('grocery.js')


# @app.route('/restaurants', methods=['GET', 'POST'])
# def restaurants():
#     """
#         restaurants page, contains open/close status and general info for each restaurants listed
#     """
#     return render_template('restaurants.js')


# @app.route('/healthcare', methods=['GET', 'POST'])
# def healthcare():
#     """
#         healthcare page, contains open/close status and general info for each healthcare listed
#     """
#     return render_template('healthcare.js')


# @app.route('/about', methods=['GET', 'POST'])
# def about():
#     """
#         about page, contains introductions of each team memeber, data source used, and all the required
#     """
#     return render_template('about.html')


# API ENDPOINTS FROM HERE ON DOWN #

error_dict = {
            'code': 500,
            'message': 'An error occurred'
        }


@app.route("/api/City/")
def getCitiesByQuery():
    name = request.args.get("name")
    cities_dict = {'cities': list()}
    try:
        if name is None:
            return jsonify({}), 200
        else:
            city_result = db.session.query(City).filter_by(name=name).all()

            if len(city_result) == 0:
                return jsonify({}), 200

            for city in city_result:
                city_dict = {"id": city.id, "name": city.name, "state": city.state,
                             "latitude": city.latitude, "longitude": city.longitude,
                             "population": city.population,
                             "hospitals": [hospital.id for hospital in city.hospitals],
                             "drugstores": [drugstore.id for drugstore in city.drugstores]}

                cities_dict['cities'].append(city_dict)

        return jsonify(cities_dict), 200
    except Exception:
        return jsonify(error_dict), 500


@app.route("/api/City/<int:city_id>")
def getCityById(city_id: int):
    try:
        city_result = db.session.query(City).filter_by(id=city_id).all()

        if len(city_result) == 0:
            return jsonify({}), 200

        city = city_result[0]

        city_dict = {"id": city.id, "name": city.name, "state": city.state,
                     "latitude": city.latitude, "longitude": city.longitude,
                     "population": city.population,
                     "hospitals": [hospital.id for hospital in city.hospitals],
                     "drugstores": [drugstore.id for drugstore in city.drugstores]}

        return jsonify(city_dict), 200
    except Exception:
        return jsonify(error_dict), 500


@app.route("/api/Hospital/")
def getHospitalsByQuery():
    name = request.args.get("name")
    city = request.args.get("city")

    hospitals_dict = {'hospitals': list()}
    try:
        if name is None and city is None:
            return jsonify({}), 200

        elif name is None:
            city_result = db.session.query(City).filter_by(name=city).all()

            if len(city_result) == 0:
                return jsonify({}), 200

            for city in city_result:
                hospital_results = db.session.query(Hospital).filter_by(city_id=city.id).all()

                if len(hospital_results) == 0:
                    continue

                for hospital in hospital_results:
                    hospital_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                                     'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                                     'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id,
                                     'drugstores_nearby': [drugstore.id for drugstore in hospital.drugstores_nearby]}

                    hospitals_dict['hospitals'].append(hospital_dict)

        elif city is None:
            hospital_results = db.session.query(Hospital).filter_by(name=name).all()

            if len(hospital_results) == 0:
                return jsonify({}), 200

            for hospital in hospital_results:
                hospital_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                                 'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                                 'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id,
                                 'drugstores_nearby': [drugstore.id for drugstore in hospital.drugstores_nearby]}

                hospitals_dict['hospitals'].append(hospital_dict)

        else:
            city_result = db.session.query(City).filter_by(name=city).all()

            if len(city_result) == 0:
                return jsonify({}), 200

            for city in city_result:
                hospital_results = db.session.query(Hospital).filter_by(city_id=city.id, name=name).all()

                if len(hospital_results) == 0:
                    continue

                for hospital in hospital_results:
                    hospital_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                                     'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                                     'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id,
                                     'drugstores_nearby': [drugstore.id for drugstore in hospital.drugstores_nearby]}

                    hospitals_dict['hospitals'].append(hospital_dict)

        return jsonify(hospitals_dict), 200
    except Exception:
        return jsonify(error_dict), 500


@app.route("/api/Hospital/nearby/<string:drugstore_id>")
def getNearbyHospitals(drugstore_id: str):
    hospitals_dict = {'hospitals': list()}
    try:
        drugstore_result = db.session.query(Drugstore).filter_by(id=drugstore_id).all()

        if len(drugstore_result) == 0:
            return jsonify({}), 200

        drugstore = drugstore_result[0]

        for hospital in drugstore.hospitals_nearby:
            hospital_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                             'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                             'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id,
                             'drugstores_nearby': [drugstore.id for drugstore in hospital.drugstores_nearby]}

            hospitals_dict['hospitals'].append(hospital_dict)

        return jsonify(hospitals_dict), 200
    except Exception:
        return jsonify(error_dict), 500


@app.route("/api/Hospital/<string:hospital_id>")
def getHospitalById(hospital_id: str):
    try:
        hospital_result = db.session.query(Hospital).filter_by(id=hospital_id).all()

        if len(hospital_result) == 0:
            return jsonify({}), 200

        hospital = hospital_result[0]

        hospital_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                         'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                         'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id,
                         'drugstores_nearby': [drugstore.id for drugstore in hospital.drugstores_nearby]}

        return jsonify(hospital_dict), 200
    except Exception:
        return jsonify(error_dict), 500


@app.route("/api/Drugstore/")
def getDrugstoresByQuery():
    name = request.args.get("name")
    city = request.args.get("city")

    drugstores_dict = {'drugstores': list()}
    try:
        if name is None and city is None:
            return jsonify({}), 200

        elif name is None:
            city_result = db.session.query(City).filter_by(name=city).all()

            if len(city_result) == 0:
                return jsonify({}), 200

            for city in city_result:
                drugstore_results = db.session.query(Drugstore).filter_by(city_id=city.id).all()

                if len(drugstore_results) == 0:
                    continue

                for drugstore in drugstore_results:
                    drugstore_dict = {'id': drugstore.id, 'name': drugstore.name, 'address': drugstore.address, 'zipcode': drugstore.zipcode, 'latitude': drugstore.latitude,
                                      'longitude': drugstore.longitude, 'opening_hours': drugstore.opening_hours, 'business_status': drugstore.business_status,
                                      'google_maps_url': drugstore.google_maps_url, 'city_id': drugstore.city_id,
                                      'hospitals_nearby': [hospital.id for hospital in drugstore.hospitals_nearby]}

                    drugstores_dict['drugstores'].append(drugstore_dict)

        elif city is None:
            drugstore_results = db.session.query(Drugstore).filter_by(name=name).all()

            if len(drugstore_results) == 0:
                return jsonify({}), 200

            for drugstore in drugstore_results:
                drugstore_dict = {'id': drugstore.id, 'name': drugstore.name, 'address': drugstore.address, 'zipcode': drugstore.zipcode, 'latitude': drugstore.latitude,
                                  'longitude': drugstore.longitude, 'opening_hours': drugstore.opening_hours, 'business_status': drugstore.business_status,
                                  'google_maps_url': drugstore.google_maps_url, 'city_id': drugstore.city_id,
                                  'hospitals_nearby': [hospital.id for hospital in drugstore.hospitals_nearby]}

                drugstores_dict['drugstores'].append(drugstore_dict)

        else:
            city_result = db.session.query(City).filter_by(name=city).all()

            if len(city_result) == 0:
                return jsonify({}), 200

            for city in city_result:
                drugstore_results = db.session.query(Drugstore).filter_by(city_id=city.id, name=name).all()

                if len(drugstore_results) == 0:
                    continue

                for drugstore in drugstore_results:
                    drugstore_dict = {'id': drugstore.id, 'name': drugstore.name, 'address': drugstore.address, 'zipcode': drugstore.zipcode, 'latitude': drugstore.latitude,
                                      'longitude': drugstore.longitude, 'opening_hours': drugstore.opening_hours, 'business_status': drugstore.business_status,
                                      'google_maps_url': drugstore.google_maps_url, 'city_id': drugstore.city_id,
                                      'hospitals_nearby': [hospital.id for hospital in drugstore.hospitals_nearby]}

                    drugstores_dict['drugstores'].append(drugstore_dict)

        return jsonify(drugstores_dict), 200
    except Exception:
        return jsonify(error_dict), 500


@app.route("/api/Drugstore/nearby/<string:hospital_id>")
def getNearbyDrugstores(hospital_id: str):
    drugstores_dict = {'drugstores': list()}
    try:
        hospital_result = db.session.query(Hospital).filter_by(id=hospital_id).all()

        if len(hospital_result) == 0:
            return jsonify({}), 200

        hospital = hospital_result[0]

        for drugstore in hospital.drugstores_nearby:
            drugstore_dict = {'id': drugstore.id, 'name': drugstore.name, 'address': drugstore.address, 'zipcode': drugstore.zipcode, 'latitude': drugstore.latitude,
                              'longitude': drugstore.longitude, 'opening_hours': drugstore.opening_hours, 'business_status': drugstore.business_status,
                              'google_maps_url': drugstore.google_maps_url, 'city_id': drugstore.city_id,
                              'hospitals_nearby': [hospital.id for hospital in drugstore.hospitals_nearby]}

            drugstores_dict['drugstores'].append(drugstore_dict)

        return jsonify(drugstores_dict), 200
    except Exception:
        return jsonify(error_dict), 500


@app.route("/api/Drugstore/<string:drugstore_id>")
def getDrugstoreById(drugstore_id: str):
    try:
        drugstore_result = db.session.query(Drugstore).filter_by(id=drugstore_id).all()

        if len(drugstore_result) == 0:
            return jsonify({}), 200

        drugstore = drugstore_result[0]

        drugstore_dict = {'id': drugstore.id, 'name': drugstore.name, 'address': drugstore.address, 'zipcode': drugstore.zipcode, 'latitude': drugstore.latitude,
                          'longitude': drugstore.longitude, 'opening_hours': drugstore.opening_hours, 'business_status': drugstore.business_status,
                          'google_maps_url': drugstore.google_maps_url, 'city_id': drugstore.city_id,
                          'hospitals_nearby': [hospital.id for hospital in drugstore.hospitals_nearby]}

        return jsonify(drugstore_dict), 200
    except Exception:
        return jsonify(error_dict), 500


# @app.route("/api/City/all/")
def getAllCities():
    cities_dict = {'cities': list()}
    city_result = db.session.query(City).all()

    if len(city_result) == 0:
        return jsonify({}), 200

    for city in city_result:
        city_dict = {"id": city.id, "name": city.name, "state": city.state,
                     "latitude": city.latitude, "longitude": city.longitude,
                     "population": city.population,
                     "hospitals": [hospital.id for hospital in city.hospitals],
                     "drugstores": [drugstore.id for drugstore in city.drugstores]}

        cities_dict['cities'].append(city_dict)

    return jsonify(cities_dict), 200


# @app.route("/api/Hospital/all/")
def getAllHospitals():
    hospitals_dict = {'hospitals': list()}
    hospital_results = db.session.query(Hospital).all()

    if len(hospital_results) == 0:
        return jsonify({}), 200

    for hospital in hospital_results:
        hospital_dict = {'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'zipcode': hospital.zipcode, 'latitude': hospital.latitude,
                         'longitude': hospital.longitude, 'opening_hours': hospital.opening_hours, 'business_status': hospital.business_status,
                         'google_maps_url': hospital.google_maps_url, 'city_id': hospital.city_id,
                         'drugstores_nearby': [drugstore.id for drugstore in hospital.drugstores_nearby]}

        hospitals_dict['hospitals'].append(hospital_dict)

    return jsonify(hospitals_dict), 200


# @app.route("/api/Drugstore/all/")
def getAllDrugstores():
    drugstores_dict = {'drugstores': list()}
    drugstore_results = db.session.query(Drugstore).all()

    if len(drugstore_results) == 0:
        return jsonify({}), 200

    for drugstore in drugstore_results:
        drugstore_dict = {'id': drugstore.id, 'name': drugstore.name, 'address': drugstore.address, 'zipcode': drugstore.zipcode, 'latitude': drugstore.latitude,
                          'longitude': drugstore.longitude, 'opening_hours': drugstore.opening_hours, 'business_status': drugstore.business_status,
                          'google_maps_url': drugstore.google_maps_url, 'city_id': drugstore.city_id,
                          'hospitals_nearby': [hospital.id for hospital in drugstore.hospitals_nearby]}

        drugstores_dict['drugstores'].append(drugstore_dict)

    return jsonify(drugstores_dict), 200


if __name__ == "__main__":
    app.debug = True
    app.run()
