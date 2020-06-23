from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/grocery', methods=['GET', 'POST'])
def grocery():
    return render_template('grocery.html')

@app.route('/restaurants', methods=['GET', 'POST'])
def restaurants():
    return render_template('restaurants.html')

@app.route('/about', methods=['GET', 'POST'])
def about():
    return render_template('about.html')

if __name__ == "__main__":
	app.debug = True
	app.run()