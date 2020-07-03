import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav class = "navbar navbar-default">
            <div class="container">
        
            <div class = "navbar-header">
              <!-- resize and get the hamburger -->
              <!-- data target matches id  -->
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <!-- hamburger bars = icon-bar -->
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                  <a href="/" class="navbar-brand">Covid Fighter</a>
            </div>
        
          <!-- id matches target -->
          <div class = "collapse navbar-collapse" id = "bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
              <li><a href="grocery">Grocery</a></li>
              <li><a href="restaurants">Restaurant</a></li>
              <li><a href="healthcare">Healthcare</a></li>
              </ul>
        
              <ul class="nav navbar-nav navbar-right">
              <li><a href="about">About</a></li>
              </ul>
            </div>
        
            </div> <!-- end of container -->
        </nav>
        <center><h1>Restaurants Open During COVID-19</h1></center>
        <center>
            <!--Table featuring information of each place in the respective page-->
            <table class="js-sort-table table table-striped table-bordered table-sm" style="width: 100%;">
                <thead>
                    <tr>
                        <th class="th-sm">Name</th>
                        <th class="th-sm">Address</th>
                        <th class="th-sm">Phone Number</th>
                        <th class="th-sm">Website</th>
                        <th class="th-sm">Hours</th>
                        <th class="th-sm">Type of Food</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Home Slice Pizza</td>
                        <td>1415 S Congress Avenue, Austin 78704</td>
                        <td><a href="tel: 512-444-7437">(512) 444-7437</a></td>
                        <td><a href="https://homeslicepizza.com/">homeslicepizza.com</a></td>
                        <td>
                            <li>11AM-11PM (Mon-Thurs)</li>
                            <li>11AM-12AM (Fri-Sat)</li>
                            <li>11AM-10PM (Sun)</li>
                        </td>
                        <td>Pizza</td>
                    </tr>
                    <tr>
                        <td>Franklin's Barbecue</td>
                        <td>900 East 11th Street, Austin 78702</td>
                        <td><a href="tel: 512-653-1187">(512) 653-1187</a></td>
                        <td><a href="https://franklinbbq.com/">franklinbbq.com</a></td>
                        <td>
                            <li>Closed (Mon)</li>
                            <li>11AM-2PM (Tues-Sun)</li>
                        </td>
                        <td>BBQ</td>
                    </tr>
                    <tr>
                        <td>Hula Hut</td>
                        <td>3825 Lake Austin Boulevard, Austin 78703</td>
                        <td><a href="tel: 512-476-4852">(512) 476-4852</a></td>
                        <td><a href="https://www.hulahut.com/">hulahut.com</a></td>
                        <td>
                            <li>11AM-10PM (Mon-Thurs)</li>
                            <li>11AM-11PM (Fri)</li>
                            <li>10:30AM-11PM (Sat)</li>
                            <li>10:30AM-10PM (Sun)</li>
                        </td>
                        <td>Tex-Mex</td>
                    </tr>
                    <tr>
                        <td>Gourdough's</td>
                        <td>1503 S 1st Street, Austin 78704</td>
                        <td><a href="tel: 512-947-0917">(512) 947-0917</a></td>
                        <td><a href="https://gourdoughs.com/">gourdoughs.com</a></td>
                        <td>
                            <li>10AM-12AM (Mon-Thurs)</li>
                            <li>10AM-3AM (Fri)</li>
                            <li>8AM-3AM (Sat)</li>
                            <li>8AM-12AM (Sun)</li>
                        </td>
                        <td>Desserts</td>
                    </tr>
                    <tr>
                        <td>Mandola's Kitchen</td>
                        <td>4700 West Guadalupe Street #12 78751</td>
                        <td><a href="tel: 512-419-9700">(512) 419-9700</a></td>
                        <td><a href="https://mandolas.com/">mandolas.com</a></td>
                        <td>
                            <li>11AM-10PM (Mon-Sat)</li>
                            <li>11AM-9PM (Sun)</li>
                        </td>
                        <td>Italian</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <!-- <h2>Search A Restaurant</h2> -->
            <!-- <form action="{{ url_for('restaurants') }}" method="post"> -->
                <!-- <input type="text" placeholder="Search for a restaurant" name="user_input">
                <button>Search!</button> -->
            <!-- </form> -->
            <!-- Information and images and stuff for 3 restaurants -->
            <!--Collapsable buttons to showcase information from table-->
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#Homeslice">Home Slice Pizza</button>
            <div class = "collapse" id="Homeslice">
            <div class="restaurant" id="Homeslice">
                <!-- Homeslice Pizza -->
                <h2>Home Slice Pizza</h2>
                <h3>1415 S Congress Avenue, Austin 78704</h3>
                <img src="https://b.zmtcdn.com/data/res_imagery/16912869_RESTAURANT_0f148925df0611d850745f5bbeff6546.jpg" style="width: 25%;">
                <ul style="list-style-type:none;">
                    <h3>Hours</h3>
                    <li>11AM-11PM (Mon-Thurs)</li>
                    <li>11AM-12AM (Fri-Sat)</li>
                    <li>11AM-10PM (Sun)</li>
                </ul>
                <a href="https://homeslicepizza.com/"><h3>Restaurant Webpage</h3></a>
            </div>
            </div>
            <br></br>
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#Franklins">Franklin's Barbecue</button>
            <div class = "collapse" id="Franklins">
            <div class="restaurant" id="Franklins">
                <!-- Franklin's Barbecue -->
                <h2>Franklin's Barbecue</h2>
                <h3>900 East 11th Street, Austin 78702</h3>
                <img src="https://b.zmtcdn.com/data/res_imagery/16915865_RESTAURANT_dcf726ac4b64ffc5331b907e78c7e38b_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A">
                <ul style="list-style-type:none;">
                    <h3>Hours</h3>
                    <li>Closed (Mon)</li>
                    <li>11AM-2PM (Tues-Sun)</li>
                </ul>
                <a href="https://franklinbbq.com/"><h3>Restaurant Webpage</h3></a>
            </div>
            </div>
            <br></br>
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#Hula">Hula Hut</button>
            <div class = "collapse" id="Hula">
            <div class="restaurant" id="Hula">
                <!-- Hula Hut -->
                <h2>Hula Hut</h2>
                <h3>3825 Lake Austin Boulevard, Austin 78703</h3>
                <img src="https://b.zmtcdn.com/data/res_imagery/16912890_RESTAURANT_964a32bbc8a663b4f2793924f743f71b_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A">
                <ul style="list-style-type:none;">
                    <h3>Hours</h3>
                    <li>11AM-10PM (Mon-Thurs)</li>
                    <li>11AM-11PM (Fri)</li>
                    <li>10:30AM-11PM (Sat)</li>
                    <li>10:30AM-10PM (Sun)</li>
                </ul>
                <a href="https://www.hulahut.com/"><h3>Restaurant Webpage</h3></a>
            </div>
            </div>

            <br></br>
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#Gourdough">Gourdough's</button>
            <div class = "collapse" id="Gourdough">
            <div class="restaurant" id="Gourdough">
                <!-- Gourdough's -->
                <h2>Gourdough's</h2>
                <h3>1503 S 1st Street, Austin 78704</h3>
                <img src="https://b.zmtcdn.com/data/res_imagery/16915822_RESTAURANT_053ad1580042eb89ab5e7ccbe6842081_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A">
                <ul style="list-style-type:none;">
                    <h3>Hours</h3>
                    <li>10AM-12AM (Mon-Thurs)</li>
                    <li>10AM-3AM (Fri)</li>
                    <li>8AM-3AM (Sat)</li>
                    <li>8AM-12AM (Sun)</li>
                </ul>
                <a href="https://gourdoughs.com/"><h3>Restaurant Webpage</h3></a>
            </div>
            </div>
            
            <br></br>
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#Mandola">Mandola's Kitchen</button>
            <div class = "collapse" id="Mandola">
            <div class="restaurant" id="Mandola">
                <!-- Mandola's Kitchen -->
                <h2>Mandola's Kitchen</h2>
                <h3>4700 West Guadalupe Street #12 78751</h3>
                <img src="https://b.zmtcdn.com/data/res_imagery/16913237_CHAIN_765725196137fed1fb3ab3643f89eb37_c.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A">
                <ul style="list-style-type:none;">
                    <h3>Hours</h3>
                    <li>11AM-10PM (Mon-Sat)</li>
                    <li>11AM-9PM (Sun)</li>
                </ul>
                <a href="https://mandolas.com/"><h3>Restaurant Webpage</h3></a>
            </div>
            </div>
            <!--Google Map to showcase location of places featured in this certain page-->
            <h3>Map</h3>
            <div id="map"></div>
            <script>
                function initMap() {
                    var austin = {lat: 30.313021, lng: -97.730750};
                    var map = new google.maps.Map(document.getElementById('map'), {zoom: 11, center: austin});
                    var homeslice = {lat: 30.249077, lng: -97.749307};
                    var infoWindowOne = new google.maps.InfoWindow({content: '<h6>Home Slice Pizza</h6>'});
                    var marker_one = new google.maps.Marker({position: homeslice, title: 'Home Slice Pizza', map: map, animation: google.maps.Animation.DROP}); 
                    marker_one.addListener('click', function(){
                        infoWindowOne.open(map, marker_one);
                    });
                    marker_one.addListener('click', function() {
                        if(marker_one.getAnimation() !== null) {
                            marker_one.setAnimation(null);
                        } 
                        else {
                            marker_one.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    });
                    var franklin = {lat: 30.268243, lng: -97.730781};
                    var infoWindowTwo = new google.maps.InfoWindow({content: '<h6>Franklin\'s Barbecue</h6>'});
                    var marker_two = new google.maps.Marker({position: franklin, title: 'Franklin\'s Barbecue', map: map, animation: google.maps.Animation.DROP}); 
                    marker_two.addListener('click', function(){
                        infoWindowTwo.open(map, marker_two);
                    });
                    marker_two.addListener('click', function() {
                        if(marker_two.getAnimation() !== null) {
                            marker_two.setAnimation(null);
                        } 
                        else {
                            marker_two.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    });
                    var hula = {lat: 30.292153, lng: -97.787852};
                    var infoWindowThree = new google.maps.InfoWindow({content: '<h6>Hula Hut</h6>'});
                    var marker_three = new google.maps.Marker({position: hula, title: 'Hula Hut', map: map, animation: google.maps.Animation.DROP}); 
                    marker_three.addListener('click', function(){
                        infoWindowThree.open(map, marker_three);
                    });
                    marker_three.addListener('click', function() {
                        if(marker_three.getAnimation() !== null) {
                            marker_three.setAnimation(null);
                        } 
                        else {
                            marker_three.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    });
                    var gourdough = {lat: 30.247063, lng: -97.753936};
                    var infoWindowFour = new google.maps.InfoWindow({content: '<h6>Gourdough\'s</h6>'});
                    var marker_four = new google.maps.Marker({position: gourdough, title: 'Gourdough\'s', map: map, animation: google.maps.Animation.DROP}); 
                    marker_four.addListener('click', function(){
                        infoWindowFour.open(map, marker_four);
                    });
                    marker_four.addListener('click', function() {
                        if(marker_four.getAnimation() !== null) {
                            marker_four.setAnimation(null);
                        } 
                        else {
                            marker_four.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    });
                    var mandola = {lat: 30.313883, lng: -97.735797};
                    var infoWindowFive = new google.maps.InfoWindow({content: '<h6>Mandola\'s Kitchen</h6>'});
                    var marker_five = new google.maps.Marker({position: mandola, title: 'Mandola\'s Kitchen', map: map, animation: google.maps.Animation.DROP}); 
                    marker_five.addListener('click', function(){
                        infoWindowFive.open(map, marker_five);
                    });
                    marker_five.addListener('click', function() {
                        if(marker_five.getAnimation() !== null) {
                            marker_five.setAnimation(null);
                        } 
                        else {
                            marker_five.setAnimation(google.maps.Animation.BOUNCE);
                        }
                    });
                }
            </script>
            <!-- Google Maps API-->
            <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVNrhNbNDCs08puZcbPtPfXXj1sH61x8&callback=initMap"
            type="text/javascript"></script>
            <br></br>
        </center>
    </div>
  );
}

export default App;