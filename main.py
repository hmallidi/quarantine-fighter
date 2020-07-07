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
    except Exception:
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
    except Exception:
        return jsonify(errordict), 500


if __name__ == "__main__":
    app.debug = True
    app.run()
