from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/restaurants')
def restaurants():
    return render_template('restaurants.html')