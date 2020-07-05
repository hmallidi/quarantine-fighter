from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/api/City/")
def getCitiesByQuery():
    name = request.args.get("name")
    try:
        return jsonify({'name': name}), 200
    except Exception:
        return jsonify({'error': 'An error occured'}), 500


@app.route("/api/City/<int:city_id>")
def getCityById(city_id: int):
    try:
        return jsonify({'city_id': city_id}), 200
    except Exception:
        return jsonify({'error': 'An error occured'}), 500


@app.route("/api/Hospital/")
def getHospitalsByQuery():
    name = request.args.get("name")
    city = request.args.get("city")
    min_rating = request.args.get("min_rating")
    max_rating = request.args.get("max_rating")

    try:
        dicty = {
            'name': name,
            'city': city,
            'min_rating': min_rating,
            'max_rating': max_rating
        }
        return jsonify(dicty), 200
    except Exception:
        return jsonify({'error': 'An error occured'}), 500


@app.route("/api/Hospital/nearby/<string:drugstore_id>")
def getNearbyHospitals(drugstore_id: str):
    try:
        return jsonify({'drugstore_id': drugstore_id}), 200
    except Exception:
        return jsonify({'error': 'An error occured'}), 500


@app.route("/api/Drugstore/")
def getDrugstoresByQuery():
    name = request.args.get("name")
    city = request.args.get("city")
    min_rating = request.args.get("min_rating")
    max_rating = request.args.get("max_rating")
    try:
        dicty = {
            'name': name,
            'city': city,
            'min_rating': min_rating,
            'max_rating': max_rating
        }
        return jsonify(dicty), 200
    except Exception:
        return jsonify({'error': 'An error occured'}), 500


@app.route("/api/Drugstore/nearby/<string:hospital_id>")
def getNearbyDrugstores(hospital_id: str):
    try:
        return jsonify({'hospital_id': hospital_id}), 200
    except Exception:
        return jsonify({'error': 'An error occured'}), 500


if __name__ == "__main__":
    app.run()
