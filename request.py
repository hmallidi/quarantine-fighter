import googlemaps
import json
import time


def reformatLocation(location):
    if "geometry" in location and "location" in location["geometry"]:
        coordinates = location["geometry"]["location"]
        location["location"] = coordinates
        del location["geometry"]

    if "opening_hours" in location and "weekday_text" in location["opening_hours"]:
        weekday_text = location["opening_hours"]["weekday_text"]
        location["weekday_text"] = weekday_text
        del location["opening_hours"]

    return location


def getJSON(place_type, city, name="", min_price=0, max_price=4):
    gmaps = googlemaps.Client(key='AIzaSyDzN3W-S4TxBm3wqslV1_JqfwhLjEsSKI8')

    page_token = ""

    places_results = list()

    while True:
        name = name.replace(" ", "+")

        query = city
        if name != "":
            query = name + "+in+" + city

        places_results_next_page = gmaps.places(query=query,
                                                min_price=min_price,
                                                max_price=max_price,
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

            places_results.append(location)

        time.sleep(5)

        if "next_page_token" in places_results_next_page:
            page_token = places_results_next_page["next_page_token"]
        else:
            break

    return places_results


# RESTAURANTS
# places_results = getJSON("restaurant", "Amarillo")

# HOSPITALS
# places_results = getJSON("hospital", "Amarillo")

# SUPERMARKETS AND DRUGSTORES
# places_results = getJSON("supermarket", "Amarillo")
# places_results.extend(getJSON("drugstore", "Amarillo"))

# for location in places_results:
#     print(location['name'])

