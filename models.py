from flask import Flask, render_template

app = Flask(__name__)

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
    return render_template('grocery.html')

@app.route('/restaurants', methods=['GET', 'POST'])
def restaurants():
    """
        restaurants page, contains open/close status and general info for each restaurants listed
    """
    return render_template('restaurants.html')

@app.route('/healthcare', methods=['GET', 'POST'])
def healthcare():
    """
        healthcare page, contains open/close status and general info for each healthcare listed
    """
    return render_template('healthcare.html')

@app.route('/about', methods=['GET', 'POST'])
def about():
    """
        about page, contains introductions of each team memeber, data source used, and all the required information
    """
    return render_template('about.html')

@app.route('/api')
def api():
    return "Welcome to the API"

if __name__ == "__main__":
    app.debug = True
    app.run()