import googlemaps
import json
import time
import usaddress
import requests

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
               'Laredo', 'Akron', 'Orlando', 'Durham', 'Glendale', 'Fremont',
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
    if "geometry" in location and "location" in location["geometry"]:
        location['latitude'] = location["geometry"]["location"]['lat']
        location['longitude'] = location["geometry"]["location"]['lng']
        del location["geometry"]

    if "location" in location and 'lat' in location['location'] \
       and 'lng' in location['location']:
        latitude = location['location']['lat']
        longitude = location['location']['lng']

    if "opening_hours" in location and "weekday_text" in location["opening_hours"]:
        weekday_text = location["opening_hours"]["weekday_text"]
        location["weekday_text"] = weekday_text
        del location["opening_hours"]

        location['latitude'] = latitude
        location['longitude'] = longitude

    location['address'] = location['formatted_address']
    del location['formatted_address']

    try:
        parsed_address = usaddress.tag(location["address"])[0]

        location['zipcode'] = parsed_address['ZipCode']
    except (usaddress.RepeatedLabelError, KeyError):
        return None

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

        for location in places_results_next_page["results"]:

            # check if place_id is already in database here

            # new_place_results = gmaps.place(place_id=location["place_id"],
            #                                 fields=('business_status',
            #                                         'formatted_address',
            #                                         'formatted_phone_number',
            #                                         'geometry', 'name',
            #                                         'opening_hours',
            #                                         'place_id', 'rating',
            #                                         'url', 'website',))
            # location = new_place_results["result"]

            location = reformatLocation(location)

            if location is not None:
                location['city'] = city
                location['state'] = state
                location['place_type'] = place_type
                places_results.append(location)

        time.sleep(2)

        if "next_page_token" in places_results_next_page:
            page_token = places_results_next_page["next_page_token"]
        else:
            break

    return places_results


city = 'Anaheim'
city_result = get_city_opendata(city)
state = city_result['state']
places_results = getJSON("hospital", city, state)
places_results.extend(getJSON("drugstore", city, state))

# LOCATIONS DICT (HOSPITALS, DRUGSTORES)
#   Keys/Info
#       place_id - primary key (string) Ex: ('ChIJfZvX20Ep3YAROaNeDxI_FBs')
#
#       name - string
#
#       address - string
#       city - string
#       state - string
#       zipcode - string
#       latitude - float
#       longitude - float
#
#       business_status
#       opening_hours - string array ["Monday: Open 24 hours",
#                                     "Tuesday: Open 24 hours",
#                                     "Wednesday: Open 24 hours",
#                                     "Thursday: Open 24 hours",
#                                     "Friday: Open 24 hours",
#                                     "Saturday: Open 24 hours",
#                                     "Sunday: Open 24 hours"]   
#       rating - float
#
#       url - string
#       website - string
#       formatted_phone_number - string

# CITY DICT (CITIES)
#   Keys/Info
#       city - string
#       state_abbr - string
#
#       longitude - string
#       latitude - string
#
#       population - int


for location in places_results:
    print(location)
    break

# usaddress==0.5.10
# requests==2.23.0
