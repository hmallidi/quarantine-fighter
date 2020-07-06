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


errordict = {
            'code': 500,
            'message': 'An error occurred'
        }

@app.route("/api/City/")
def getCitiesByQuery():
    name = request.args.get("name")
    print(name)
    try:
        if name is None:
            return jsonify([]), 200
        else:
            sql_query = text("SELECT * FROM city WHERE city.name = \'" + name + "\';")
            result = db.engine.execute(sql_query).first()
            if result is None:
                return jsonify([]), 200

            city_id = result[0]
            new_query = text("SELECT hospital.id FROM city JOIN hospital ON hospital.city_id = " + str(city_id) + ";")
            result2 = db.engine.execute(new_query)

            hospital_ids = [item[0] for item in result2.fetchall()]
                
            new_query = text("SELECT drugstore.id FROM city JOIN drugstore ON drugstore.city_id = " + str(city_id) + ";")
            result3 = db.engine.execute(new_query).fetchall()

            drugstore_ids = [item[0] for item in result3]

            city_dict = {"id": city_id, "name": result[1], "state": result[2], "latitude": result[3], "longitude": result[4], "population": result[5], "hospitals": hospital_ids, "drugstores": drugstore_ids}
            city_list = []
            city_list.append(city_dict)
    

        return jsonify(city_list), 200
    except Exception as e:
        return jsonify(errordict), 500


@app.route("/api/City/<int:city_id>")
def getCityById(city_id: int):
    try:
        sql_query = text("SELECT * FROM city WHERE city.id = \'" + str(city_id) + "\';")
        result = db.engine.execute(sql_query).first()

        if result is None:
            return jsonify({}), 200

        new_query = text("SELECT hospital.id FROM city JOIN hospital ON hospital.city_id = " + str(city_id) + ";")
        result2 = db.engine.execute(new_query).fetchall()
        hospital_ids = [item[0] for item in result2]
                
        new_query = text("SELECT drugstore.id FROM city JOIN drugstore ON drugstore.city_id = " + str(city_id) + ";")
        result3 = db.engine.execute(new_query).fetchall()
        drugstore_ids = [item[0] for item in result3]

        city_dict = {"id": city_id, "name": result[1], "state": result[2], "latitude": result[3], "longitude": result[4], "population": result[5], "hospitals": hospital_ids, "drugstores": drugstore_ids}
    
        return jsonify(city_dict), 200
    except Exception as e:
        print(e)
        return jsonify(errordict), 500


@app.route("/api/Hospital/")
def getHospitalsByQuery():
    name = request.args.get("name")
    city = request.args.get("city")

    try:
        if name is None and city is None:
            pass
        elif name is None:
            pass
        elif city is None:
            pass
        else:
            pass

        dicty = {
            'name': name,
            'city': city,
        }
        return jsonify(dicty), 200
    except Exception:
        return jsonify(errordict), 500


@app.route("/api/Hospital/nearby/<string:drugstore_id>")
def getNearbyHospitals(drugstore_id: str):
    try:
        return jsonify({'drugstore_id': drugstore_id}), 200
    except Exception:
        return jsonify(errordict), 500


@app.route("/api/Drugstore/")
def getDrugstoresByQuery():
    name = request.args.get("name")
    city = request.args.get("city")

    try:
        if name is None and city is None:
            pass
        elif name is None:
            pass
        elif city is None:
            pass
        else:
            pass

        dicty = {
            'name': name,
            'city': city,
        }
        return jsonify(dicty), 200
    except Exception:
        return jsonify(errordict), 500


@app.route("/api/Drugstore/nearby/<string:hospital_id>")
def getNearbyDrugstores(hospital_id: str):
    try:
        return jsonify({'hospital_id': hospital_id}), 200
    except Exception:
        return jsonify({'error': 'An error occured'}), 500


if __name__ == "__main__":
    app.debug = True
    app.run()
