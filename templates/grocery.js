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
            <li><a href="grocery.html">Grocery</a></li>
            <li><a href="restaurants.html">Restaurant</a></li>
            <li><a href="healthcare.html">Healthcare</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
            <li><a href="about">About</a></li>
            </ul>
        </div>
        </div> <!-- end of container -->
    </nav> <!-- end of class navbar navbar-default -->
    <center><h1>Grocery Stores Open During COVID-19</h1></center>
    <!--<center>-->
        <!--Table featuring information of each place in the respective page-->
        <table id = "groceryTable" class="table table-striped table-bordered table-sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Website</th>
                    <th>Hours</th>
                    <th>Senior Hours</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>HEB</td>
                    <td>1000 E 41st St, Austin, TX 78751</td>
                    <td><a href="tel: 512-459-6513">(512)459-6513</a></td>
                    <td><a href="https://newsroom.heb.com/hancock-center-h%E2%80%91e%E2%80%91b/" target="_blank">newsroom.heb.com</a></td>
                    <td>
                        <ul>
                            <li>7AM - 11PM</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li>N/A</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Whole Foods Market</td>
                    <td>525 N Lamar Blvd, Austin, TX 78703</td>
                    <td><a href="tel: 512-542-2200">(512)542-2200</a></td>
                    <td><a href="https://www.wholefoodsmarket.com/stores/lamar" target="_blank">wholefoodsmarket.com</a></td>
                    <td>
                        <ul>
                            <li>7AM - 9PM (Sun - Tues & Thurs & Sat)</li>
                            <li>7AM - 8PM (Wed & Fri)</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li>Closed (Sun - Tues & Thurs & Sat)</li>
                            <li>7AM - 8AM (Wed & Fri)</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>MT Supermarket</td>
                    <td>10901 N Lamar Blvd G, Austin, TX 78753</td>
                    <td><a href="tel: 512-454-4804">(512)454-4804</a></td>
                    <td><a href="http://mtsupermarket.com" target="_blank">mtsupermarket.com</a></td>
                    <td>
                        <ul>
                            <li>9AM - 8PM</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li>N/A</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>HMart</td>
                    <td>11301 Lakeline Blvd, Austin, TX 78717</td>
                    <td><a href="tel: 737-717-6900">(737)717-6900</a></td>
                    <td><a href="https://www.hmart.com/storelocator/index/index/id/61/" target="_blank">hmart.com</a></td>
                    <td>
                        <ul>
                            <li>8AM - 10PM</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li>N/A</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>99 Ranch</td>
                    <td>6929 Airport Blvd #110, Austin, TX 78752</td>
                    <td><a href="tel: 512-381-8899">(512)381-8899</a></td>
                    <td><a href="https://www.99ranch.com/stores/austin" target="_blank">99ranch.com</a></td>
                    <td>
                        <ul>
                            <li>9AM - 8PM (Sun)</li>
                            <li>10AM - 8PM (Mon - Thurs)</li>
                            <li>10AM - 9PM (Fri)</li>
                            <li>9AM - 9PM (Sat)</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li>9AM - 10AM (Mon - Fri)</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td>Randalls</td>
                    <td>1500 W 35th St, Austin, TX 78703</td>
                    <td><a href="tel: 512-453-8406">(512)453-8406</a></td>
                    <td>
                        <a href="https://local.randalls.com/tx/austin/1500-w-35th-st.html" target="_blank">local.randalls.com</a>
                    </td>
                    <td>
                        <ul>
                            <li>6AM - 11PM</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <p>Closed (Sun - Mon & Wed & Fri - Sat)</p>
                            <p>6AM - 9AM (Tues & Thurs)</p>
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <!--
        <script>
            $(document).ready(function() {
                $('#groceryTable').DataTable();
                $('.dataTables_length').addClass('bs-select');
            });
        </script>
    -->
    <!--</center>-->
    <center>
        <!--Collapsable buttons to showcase information from table-->
    <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#HEB">HEB</button>
    <div class = "collapse" id="HEB">
        <div class = "grocery store" id = "HEB">
            <h2>HEB</h2>
            <h3>1000 E 41st St, Austin, TX 78751</h3>
            <p><strong>Phone Number: </strong><a href="tel: 512-459-6513">(512)459-6513</a></p>
            <img src="https://regcorpweb.blob.core.windows.net/marketingassets/FeaturedImages/77ebd721-4b8a-4dcf-86dc-77f58121e94c-full.jpg" height=25% width=25%>
                <h3>Hours</h3>
                <p>7AM - 11PM</p>
            <h3>No Senior Hours</h3>
            <a href="https://newsroom.heb.com/hancock-center-h%E2%80%91e%E2%80%91b/" target="_blank"><h3>Store Webpage</h3></a>
        </div>
    </div>
    <br></br>
    <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#WFM">Whole Foods Market</button>
    <div class = "collapse" id="WFM">
        <div class = "grocery store" id = "WFM">
            <h2>Whole Foods Market</h2>
            <h3>525 N Lamar Blvd, Austin, TX 78703</h3>
            <p><strong>Phone Number: </strong><a href="tel: 512-542-2200">(512)542-2200</a></p>
            <img src="https://cdn.vox-cdn.com/thumbor/J4j71jjqk1NgKHvmbKEM18IfBE4=/0x0:1000x748/1520x1013/filters:focal(420x294:580x454)/cdn.vox-cdn.com/uploads/chorus_image/image/62850991/wholefoodsaustin.0.0.jpg" height=25% width=25%>
                <h3>Hours</h3>
                <p>7AM - 9PM (Sun - Tues & Thurs & Sat)</p>
                <p>7AM - 8PM (Wed & Fri)</p>
                <h3>Senior Hours</h3>
                <p>Closed (Sun - Tues & Thurs & Sat)</p>
                <p>7AM - 8AM (Wed & Fri)</p>
                <a href="https://www.wholefoodsmarket.com/stores/lamar" target="_blank"><h3>Store Webpage</h3></a>
        </div>
    </div>
    <br></br>
    <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#MT">MT Supermarket</button>
    <div class = "collapse" id="MT">
        <div class = "grocery store" id = "MT">
            <h2>MT Supermarket</h2>
            <h3>10901 N Lamar Blvd G, Austin, TX 78753</h3>
            <p><strong>Phone Number: </strong><a href="tel: 512-454-4804">(512)454-4804</a></p>
            <img src="https://communityimpact.com/wp-content/uploads/2017/04/NWA-2017-04-9-hero.jpg" height=25% width=25%>
                <h3>Hours</h3>
                <p>9AM - 8PM</p>
            <h3>No Senior Hours</h3>
            <a href="https://www.wholefoodsmarket.com/stores/lamar" target="_blank"><h3>Store Webpage</h3></a>
        </div>
    </div>
    <br></br>
    <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#HMart">H Mart</button>
    <div class = "collapse" id="HMart">
        <div class = "grocery store" id = "HMart">
            <h2>H Mart</h2>
            <h3>11301 Lakeline Blvd, Austin, TX 78717</h3>
            <p><strong>Phone Number: </strong><a href="tel: 737-717-6900">(737)717-6900</a></p>
            <img src="https://cdn.vox-cdn.com/thumbor/IH45XORljambw7jkcZNsDc2VM8o=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13297749/h_mart_austin.jpg" height=25% width=25%>
                <h3>Hours</h3>
                <p>8AM - 10PM</p>
            <h3>No Senior Hours</h3>
            <a href="http://mtsupermarket.com" target="_blank"><h3>Store Webpage</h3></a>
        </div>
    </div>
    <br></br>
    <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#99Ranch">99 Ranch</button>
    <div class = "collapse" id="99Ranch">
        <div class = "grocery store" id = "99Ranch">
            <h2>99 Ranch</h2>
            <h3>6929 Airport Blvd #110, Austin, TX 78752</h3>
            <p><strong>Phone Number: </strong><a href="tel: 512-381-8899">(512)381-8899</a></p>
            <img src="https://4.bp.blogspot.com/-XBPEhgClmJs/WqZre_6dYCI/AAAAAAAAP24/QyTTDVPRbesocz_cLn7G0BVmVpCyXFIBwCLcBGAs/s640/DSCF3800.jpg" height=25% width=25%>
                <h3>Hours</h3>
                <p>9AM - 8PM (Sun)</p>
                <p>10AM - 8PM (Mon - Thurs)</p>
                <p>10AM - 9PM (Fri)</p>
                <p>9AM - 9PM (Sat)</p>
                <h3>Senior Hours</h3>
                <p>9AM - 10AM (Mon - Fri)</p>
                <a href="https://www.99ranch.com/stores/austin" target="_blank"><h3>Store Webpage</h3></a>
        </div>
    </div>
    <br></br>
    <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#Randalls">Randalls</button>
    <div class = "collapse" id="Randalls">
        <div class = "grocery store" id = "Randalls">
            <h2>Randalls</h2>
            <h3>1500 W 35th St, Austin, TX 78703</h3>
            <p><strong>Phone Number: </strong><a href="512-453-8406">(512)453-8406</a></p>
            <img src="https://dynl.mktgcdn.com/p/y23YI2uyBoBcxMudDHGHyM8o2H4yUkWflcphttC_Se0/288x162.jpg" height=25% width=25%>
                <h3>Hours</h3>
                <p>6AM - 11PM</p>
                <h3>Senior Hours</h3>
                <p>Closed (Sun - Mon & Wed & Fri - Sat)</p>
                <p>6AM - 9AM (Tues & Thurs)</p>
                <a href="https://local.randalls.com/tx/austin/1500-w-35th-st.html" target="_blank"><h3>Store Webpage</h3></a>
        </div>
    </div>
    <!--Google Map to showcase location of places featured in this certain page-->
    <h3>Map</h3>
    <div id="map"></div>
    <script>
        function initMap() {
            var austin = {lat: 30.313021, lng: -97.730750};
            var map = new google.maps.Map(document.getElementById('map'), {zoom: 11, center: austin});
            var heb = {lat: 30.300545, lng: -97.719710};
            var infoWindowOne = new google.maps.InfoWindow({content: '<h6>HEB</h6>'})
            var marker_one = new google.maps.Marker({position: heb, title: 'HEB', map: map, animation: google.maps.Animation.DROP}); 
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
            var wfm = {lat: 30.270317, lng: -97.753556};
            var infoWindowTwo = new google.maps.InfoWindow({content: '<h6>Whole Foods Market</h6>'});
            var marker_two = new google.maps.Marker({position: wfm, title: 'Whole Foods Market', map: map, animation: google.maps.Animation.DROP});
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
            var mt = {lat: 30.377592, lng: -97.686341};
            var infoWindowThree = new google.maps.InfoWindow({content: '<h6>MT Supermarket</h6>'});
            var marker_three = new google.maps.Marker({position: mt, title: 'MT Supermarket', map: map, animation: google.maps.Animation.DROP});
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
            var hmart = {lat: 30.478603, lng: -97.799759};
            var infoWindowFour = new google.maps.InfoWindow({content: '<h6>HMart</h6>'});
            var marker_four = new google.maps.Marker({position: hmart, title: 'HMart', map: map, animation: google.maps.Animation.DROP});
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
            var ninenineranch = {lat: 30.335742, lng: -97.717340};
            var infoWindowFive = new google.maps.InfoWindow({content: '<h6>99 Ranch</h6>'});
            var marker_five = new google.maps.Marker({position: ninenineranch, title: '99 Ranch', map: map, animation: google.maps.Animation.DROP});
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
            var randalls = {lat: 30.305411, lng: -97.748765};
            var infoWindowSix = new google.maps.InfoWindow({content: '<h6>Randalls</h6>'});
            var marker_six = new google.maps.Marker({position: randalls, title: 'Randalls', map: map, animation: google.maps.Animation.DROP});
            marker_six.addListener('click', function(){
                infoWindowSix.open(map, marker_six);
            });
            marker_six.addListener('click', function() {
                if(marker_six.getAnimation() !== null) {
                    marker_six.setAnimation(null);
                } 
                else {
                    marker_six.setAnimation(google.maps.Animation.BOUNCE);
                }
            });
        }
    </script>
    <!-- Google Maps API-->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVNrhNbNDCs08puZcbPtPfXXj1sH61x8&callback=initMap"
    type="text/javascript"></script>
    <br></br>
    <div id="root"></div>
    <script>
        class Hello extends React.Component {
            render() {
                return <h1>Hello, world!</h1>
            }
        }
        ReactDOM.render(
            <Hello />, 
            document.getElementById('root')
        ); 
    </script>
    </center>
    </div>
  );
}

export default App;