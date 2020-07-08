import googlemaps
import json
import time
import usaddress
import requests


from flask import Flask, session, render_template, request, url_for, session, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import text
import os

from models import City, Hospital, Drugstore, db

cities_list = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia',
               'Phoenix', 'San Diego', 'San Antonio', 'Dallas', 'San Jose',
               'Detroit', 'Jacksonville', 'Indianapolis', 'Columbus',
               'San Francisco', 'Austin', 'Memphis', 'Fort Worth', 'Baltimore',
               'Charlotte', 'El Paso', 'Milwaukee', 'Boston', 'Seattle',
               'Denver', 'Washington', 'Portland', 'Las Vegas',
               'Oklahoma City', 'Nashville', 'Tucson', 'Albuquerque',
               'Long Beach', 'Sacramento', 'Fresno', 'New Orleans', 'Mesa',
               'Cleveland', 'Virginia Beach', 'Kansas City', 'Atlanta',
               'San Juan', 'Omaha', 'Oakland', 'Honolulu', 'Miami', 'Tulsa',
               'Colorado Springs', 'Minneapolis', 'Arlington', 'Wichita',
               'Santa Ana', 'Raleigh', 'Anaheim', 'Tampa', 'Saint Louis',
               'Pittsburgh', 'Toledo', 'Cincinnati', 'Aurora', 'Riverside',
               'Bakersfield', 'Stockton', 'Corpus Christi', 'Newark',
               'Buffalo', 'Anchorage', 'Saint Paul', 'Lexington-Fayette',
               'Plano', 'Saint Petersburg', 'Norfolk', 'Louisville',
               'Lincoln', 'Glendale', 'Henderson', 'Jersey City', 'Chandler',
               'Greensboro', 'Birmingham', 'Fort Wayne', 'Scottsdale',
               'Hialeah', 'Madison', 'Baton Rouge', 'Chesapeake', 'Garland',
               'Modesto', 'Paradise', 'Chula Vista', 'Lubbock', 'Rochester',
               'Laredo', 'Akron', 'Orlando', 'Durham', 'Fremont',
               'San Bernardino', 'Reno']


def get_city_opendata(city):
    tmp = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=worldcitiespop&q=%s&sort=population&facet=country&refine.country=%s'
    city = city.replace(" ", "+")
    cmd = tmp % (city, 'us')
    res = requests.get(cmd)
    dct = json.loads(res.content)
    out = dct['records'][0]['fields']

    out['city'] = out['accentcity']
    out['state'] = out['region']

    del out['country']
    del out['accentcity']
    del out['region']
    del out['geopoint']

    return out


def getQuery(city, state, name):
    name = name.replace(" ", "+")
    city = city.replace(" ", "+")

    if name == "":
        query = city + "+" + state
    else:
        query = name + "+in+" + city + "+" + state

    return query


def reformatLocation(location):
    if "geometry" in location:
        if "location" in location["geometry"]:
            location['latitude'] = location["geometry"]["location"]['lat']
            location['longitude'] = location["geometry"]["location"]['lng']
        else:
            location['latitude'] = ''
            location['longitude'] = ''
        del location["geometry"]
    else:
        location['latitude'] = ''
        location['longitude'] = ''
    
    if "opening_hours" in location:
        if "weekday_text" in location["opening_hours"]:
            weekday_text_array = location["opening_hours"]["weekday_text"]

            del location["opening_hours"]
            weekday_text = ''

            for text in weekday_text_array:
                weekday_text += text + "\n"

            weekday_text = weekday_text[:-1]
            location['opening_hours'] = weekday_text
        else:
            location['opening_hours'] = ''
    else:
        location['opening_hours'] = ''


    if 'url' not in location:
        location['url'] = ''


    location['address'] = location['formatted_address']
    del location['formatted_address']

    try:
        parsed_address = usaddress.tag(location["address"])[0]

        location['zipcode'] = parsed_address['ZipCode']
    except (usaddress.RepeatedLabelError, KeyError):
        return None

    return location


def getPlaceDetails(place_id):
    gmaps = googlemaps.Client(key='AIzaSyDzN3W-S4TxBm3wqslV1_JqfwhLjEsSKI8')

    new_place_results = gmaps.place(place_id=place_id,
                                    fields=('business_status',
                                            'formatted_address',
                                            'geometry', 'name',
                                            'opening_hours',
                                            'place_id', 'url'))
    location = new_place_results['result']

    return location


def getJSON(place_type, city, state, name=""):
    gmaps = googlemaps.Client(key='AIzaSyDzN3W-S4TxBm3wqslV1_JqfwhLjEsSKI8')

    city = city.strip()
    name = name.strip()

    page_token = ""
    places_results = list()
    query = getQuery(city, state, name)

    while True:
        places_results_next_page = None

        places_results_next_page = gmaps.places(query=query,
                                                type=place_type,
                                                page_token=page_token)

        if places_results_next_page is None:
            break

        for location in places_results_next_page["results"]:
            location = getPlaceDetails(location['place_id'])
            location = reformatLocation(location)

            if location is not None:
                places_results.append(location)

        time.sleep(2)

        if "next_page_token" in places_results_next_page:
            page_token = places_results_next_page["next_page_token"]
        else:
            break

    return places_results


city = 'Anaheim'
city_result = get_city_opendata(city) # city information (dict)


#uses the cities api to populate information about the cities in the table
def populateCitiesTable():
    for city in cities_list:
        city_info = get_city_opendata(city)
        #city table fields: name, state, lat/long, population, drugstores (rel), hospitals (rel)
        lat = city_info['latitude']
        longitude = city_info['longitude']
        state = city_info['state']
        pop = city_info['population']
        entry = City(name = city, state = state, latitude = lat, longitude = longitude, population = pop)
        db.session.add(entry)
    db.session.commit()


def populateTable(type):
    # fields: name, address, zipcode, lat/long, opening_hours, business_status, rating, website, google_maps_url
    # phone_number, city_id, drugstores_nearby
    for city in cities_list:
        city_info = get_city_opendata(city)
        result = getJSON(type, city, city_info['state'])
        name = result['name']
        address = result['address']
        zipcode = result['zipcode']
        latitude = result['latitude']
        longitude = result['longitude']
        opening_hours = result['opening_hours']
        business_status = result['business_status']
        # rating = result['rating']
        # website = result['website']
        google_maps_url = result['url']
        # phone_number = result['phone_number']
        id = result['place_id']
        city_id = db.execute("SELECT * FROM city WHERE name = :city", {":city": city}).first()
        if(type == 'hospital'):
            entry = Hospital(id=id, name=name, address=address, zipcode=zipcode, latitude=latitude, longitude=longitude,
                             opening_hours=opening_hours, business_status=business_status, google_maps_url=google_maps_url, city_id=city_id)
        else:
            entry = Drugstore(id=id, name=name, address=address, zipcode=zipcode, latitude=latitude, longitude=longitude,
                              opening_hours=opening_hours, business_status=business_status, google_maps_url=google_maps_url, city_id=city_id)

        db.session.add(entry)
    db.session.commit()


def populateTable():
    for city in cities_list:
        addOneCityInfo(city)


def addOneCityInfo(city_name):
    city_info = get_city_opendata(city_name)
    lat = city_info['latitude']
    longitude = city_info['longitude']
    state = city_info['state']
    pop = city_info['population']

    entryCity = City(name=city_name, state=state, latitude=lat, longitude=longitude, population=pop)
    db.session.add(entryCity)

    db.session.commit()

    sql_query = text("SELECT city.id FROM city WHERE city.name = \'" + city_name + "\';")
    result = db.engine.execute(sql_query).first()
    cityID = result[0]

    hospital_results = getJSON('hospital', city_name, state)

    for hospital in hospital_results:
        name = hospital['name']
        address = hospital['address']
        zipcode = hospital['zipcode']
        latitude = hospital['latitude']
        longitude = hospital['longitude']
        opening_hours = hospital['opening_hours']
        business_status = hospital['business_status']

        google_maps_url = hospital['url']
        id = hospital['place_id']

        entry = Hospital(id=id, name=name, address=address, zipcode=zipcode, latitude=latitude, longitude=longitude,
                         opening_hours=opening_hours, business_status=business_status, google_maps_url=google_maps_url, city_id=cityID)
        db.session.add(entry)

    db.session.commit()

    drugstore_results = getJSON('drugstore', city_name, state)

    for drugstore in drugstore_results:
        name = drugstore['name']
        address = drugstore['address']
        zipcode = drugstore['zipcode']
        latitude = drugstore['latitude']
        longitude = drugstore['longitude']
        opening_hours = drugstore['opening_hours']
        business_status = drugstore['business_status']

        google_maps_url = drugstore['url']
        id = drugstore['place_id']

        entry = Drugstore(id=id, name=name, address=address, zipcode=zipcode, latitude=latitude, longitude=longitude,
                         opening_hours=opening_hours, business_status=business_status, google_maps_url=google_maps_url,
                         city_id = cityID)
        db.session.add(entry)
        db.session.commit()

        sql_query = text("SELECT hospital.id FROM hospital WHERE hospital.zipcode = \'" + zipcode + "\';")
        result = db.engine.execute(sql_query)

        if result.returns_rows:
            hospital_ids = [item[0] for item in result.fetchall()]
            for hospital_id in hospital_ids:
                hospitalObj = db.session.query(Hospital).get(hospital_id)
                #print(hospitalObj)
                entry.hospitals_nearby.append(hospitalObj)
                db.session.commit()

    


if __name__ == "__main__":
    populateTable()
    # populateCitiesTable()
    # populateTable('hospital')
    # populateTable('drugstore')