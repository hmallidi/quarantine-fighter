import googlemaps
import json
import time
import usaddress


def getQuery(city, name):
    name = name.replace(" ", "+")
    city = city.replace(" ", "+")

    if name == "":
        query = city
    else:
        query = name + "+in+" + city

    return query


def reformatLocation(location):
    if "geometry" in location and "location" in location["geometry"]:
        coordinates = location["geometry"]["location"]
        location["location"] = coordinates
        del location["geometry"]

    if "opening_hours" in location and "weekday_text" in location["opening_hours"]:
        weekday_text = location["opening_hours"]["weekday_text"]
        location["weekday_text"] = weekday_text
        del location["opening_hours"]

    try:
        parsed_address = usaddress.tag(location["formatted_address"])[0]

        if 'PlaceName' in parsed_address:
            location['city'] = parsed_address['PlaceName']
        if 'ZipCode' in parsed_address:
            location['zip_code'] = parsed_address['ZipCode']
    except usaddress.RepeatedLabelError:
        return None

    return location


def getJSON(place_type, city, name="", min_price=0, max_price=4):
    gmaps = googlemaps.Client(key='AIzaSyDzN3W-S4TxBm3wqslV1_JqfwhLjEsSKI8')

    city = city.strip()
    name = name.strip()

    page_token = ""
    places_results = list()
    query = getQuery(city, name)

    while True:
        places_results_next_page = None

        if place_type == "restaurant":
            places_results_next_page = gmaps.places(query=query,
                                                    min_price=min_price,
                                                    max_price=max_price,
                                                    type=place_type,
                                                    page_token=page_token)
        else:
            places_results_next_page = gmaps.places(query=query,
                                                    type=place_type,
                                                    page_token=page_token)

        for location in places_results_next_page["results"]:

            # check if place_id is already in database here

            # new_place_results = gmaps.place(place_id=location["place_id"],
            #                                 fields=('business_status',
            #                                         'formatted_address',
            #                                         'formatted_phone_number',
            #                                         'geometry', 'icon',
            #                                         'name', 'opening_hours',
            #                                         'place_id', 'price_level',
            #                                         'rating', 'url',
            #                                         'website',))
            # location = new_place_results["result"]

            location = reformatLocation(location)

            if location is not None:
                places_results.append(location)

        time.sleep(2)

        if "next_page_token" in places_results_next_page:
            page_token = places_results_next_page["next_page_token"]
        else:
            break

    return places_results


# RESTAURANTS
places_results = getJSON("supermarket", "Kansas City")

# HOSPITALS
# places_results = getJSON("hospital", "Amarillo")

# SUPERMARKETS AND DRUGSTORES
# places_results = getJSON("supermarket", "Amarillo")
# places_results.extend(getJSON("drugstore", "Amarillo"))

# LOCATIONS DICT
#   Keys/Info
#       place_id
#
#       name
#
#       formatted_address
#       city
#       zip-code
#       location
#
#       business_status
#       icon
#       opening_hours
#       price_level
#       rating
#
#       url
#       website

# for location in places_results:
#     print(location['city'])
#     print(location['name'])
