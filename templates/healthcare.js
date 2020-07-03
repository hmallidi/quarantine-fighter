import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav class = "navbar navbar-default">
            <div class="container">
            <div class = "navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span class="sr-only">Toggle navigation</span>
                  <!-- hamburger bars = icon-bar -->
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                  <!-- Return to main page when you hit the "Covid Fighter" button-->
                  <a href="/" class="navbar-brand">Covid Fighter</a>
            </div>
        
          <!-- id matches target -->
          <div class = "collapse navbar-collapse" id = "bs-example-navbar-collapse-1">
              <ul class="nav navbar-nav">
              <!-- Generate interactive buttons across bar for the three pages -->
              <li><a href="grocery">Grocery</a></li>
              <li><a href="restaurants">Restaurant</a></li>
              <li><a href="healthcare">Healthcare</a></li>
              </ul>

              <!-- Place About button on right side of navigation bar-->
              <ul class="nav navbar-nav navbar-right">
              <li><a href="about">About</a></li>
              </ul>
            </div>
        
            </div> <!-- end of container -->
        </nav>

        <center><h1> COVID-19 Testing Locations Currently Open: </h1> </center>
        <center>
            <!--Table featuring information of each place in the respective page-->
            <table id = "healthTable" class="table table-striped table-bordered table-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Website</th>
                        <th>Hours</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td> Round Rock Baylor Clinic </td>
                        <td>  425 University Blvd, Round Rock, TX 78665 </td>
                        <td><a href="tel: (512)-509-0200 ">(512)-509-0200 </a></td>
                        <td>  <a href="https://www.bswhealth.com/locations/round-rock-425-university-clinic/?y_source=1_MTM0MTE2MzgtNzE1LWxvY2F0aW9uLndlYnNpdGU=" target="_blank"><font size = "-1"> Round Rock Baylor Webpage</font></a> </td>
                        <td>
                                <li> 8AM-5PM (Mon-Thurs)</li>
                                <li> 8AM-5PM (Fri-Sat)</li>
                                <li> 8AM-5PM (Sun)</li>
                        </td>
                    </tr>
            
                    <tr>
                        <td> Austin Baylor Clinic</td>
                        <td> 5245 West US Highway 290 Service Rd, Austin, TX 78735</td>
                        <td><a href="tel: 512-654-2100">(512)-654-2100</a></td>
                        <td><a href="https://www.bswhealth.com/locations/austin-medical-center/" target="_blank"><font size = "-1"> Austin Baylor Webpage</font></a> </td>
                        <td>
                                <li> 24 Hours (Mon-Thurs)</li>
                                <li> 24 Hours (Fri-Sat)</li>
                                <li> 24 Hours (Sun)</li>
                        </td>
                    </tr>
                
                    <tr>
                        <td> UT Health Austin</td>
                        <td> Health Transformation Building, 1601 Trinity St Building A, Austin, TX 78712</td>
                        <td><a href="tel: 833-882-2737">(833)-882-2737</a></td>
                        <td> <a href="https://uthealthaustin.org/" target="_blank"><font size = "-1"> UT Health Webpage</font></a> </td>
                        <td>
                                <li> 8AM-5PM (Mon-Fri)</li>
                                <li> Closed (Sat-Sun)</li>
                        </td>
                    </tr>
                
                    <tr>
                    <td> Toney Berger Activity Center</td>
                    <td> 3200 Jones Rd, Austin, TX, 78745</td>
                    <td><a href="tel: 512-414-1050">(512)-414-1050</a></td>
                    <td>  <a href="https://www.austinisd.org/construction-management/bond/bond-and-construction-projects/burger-athletic-complex" target="_blank"><font size = "-1"> Toney Berger Webpage</font></a> </td>
                    <td>
                            <li> 8AM-8PM (Mon-Fri)</li>
                            <li> Closed (Sat-Sun)</li>
                    </td>
                    </tr>
            
                    <tr>
                    <td>Advent Health Central Texas</td>
                    <td> 2201 South Clear Creek Road, Killeen, TX, 76549 </td>
                    <td><a href="tel: 254-526-7523">(254)-526-7523</a></td>
                    <td> <a href="https://www.adventhealth.com/hospital/adventhealth-central-texas" target="_blank"><font size = "-1"> Advent Health Webpage </font></a> </td>
                    <td>
                            <li> 9AM-9PM (Mon-Thurs)</li>
                            <li> 9AM-9PM (Fri-Sat)</li>
                            <li> 9AM-9PM (Sun)</li>
                    </td>
                    </tr>
                </tbody>
            </table>

            <script>
                $(document).ready(function() {
                    $('#healthTable').DataTable();
                    $('.dataTables_length').addClass('bs-select');
                });
            </script>
        </center>

        <center>
            <!-- Information and images and stuff for 3 restaurants -->
            <!--Collapsable buttons to showcase information from table-->
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#RoundRockBaylor"> Round Rock Baylor Clinic</button>
            <div class = "collapse" id="RoundRockBaylor">
            <div class="testcenter" id="RoundRockBaylor">
                <img src="../static/img/RoundRockBaylor.jpg" alt="Round Rock Baylor Clinic" style="width:25%" style = "height:25%"> 
                <!-- Round Rock Baylor Clinic -->
                <h2> Round Rock Baylor Clinic</h2>
                <h3> 425 University Blvd, Round Rock, TX 78665</h3>
                <a href="tel: 512-509-0200" target="_blank"><font size = "+2"> (512)-509-0200</font></a>
                <br>
                <!--FIX CENTER ALIGNMENT:-->
                <a href="https://www.bswhealth.com/locations/round-rock-425-university-clinic/?y_source=1_MTM0MTE2MzgtNzE1LWxvY2F0aW9uLndlYnNpdGU=" target="_blank"><font size = "+2"> Round Rock Baylor Webpage</font></a>
                <ul>
                    <h3> Hours</h3>
                    <li> 8AM-5PM (Mon-Thurs)</li>
                    <li> 8AM-5PM (Fri-Sat)</li>
                    <li> 8AM-5PM (Sun)</li>
                </ul>
            </div>
            </div>
            <br></br>
            

            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#AustinBaylor"> Austin Baylor Clinic</button>
            <div class = "collapse" id="AustinBaylor">
            <div class="testcenter" id="AustinBaylor">
                <img src="../static/img/AustinBaylor.jpg" alt="Austin Baylor Clinic" style="width:25%" style = "height:25%"> 
                <!-- Austin  Baylor Clinic -->
                <h2> Austin Baylor Clinic</h2>
                <h3> 5245 West US Highway 290 Service Rd, Austin, TX 78735</h3>
                <a href="tel: 512-654-2100" target="_blank"><font size = "+2">512-654-2100</font></a>
                <br>
                <a href="https://www.bswhealth.com/locations/austin-medical-center/" target="_blank"><font size = "+2"> Austin Baylor Webpage</font></a>
                <ul>
                    <h3> Hours</h3>
                    <li> 24 Hours (Mon-Thurs)</li>
                    <li> 24 Hours (Fri-Sat)</li>
                    <li> 24 Hours (Sun)</li>
                </ul>
            </div>
            </div>
            <br></br>

            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#UTHealth"> UT Health Austin</button>
            <div class = "collapse" id="UTHealth">
            <div class="testcenter" id="UTHealth">
                <img src="../static/img/UTHealth.jpg" alt="UT Health Austin" style="width:25%" style = "height:25%"> 
                <!-- UT Health -->
                <h2> UT Health Austin</h2>
                <h3> Health Transformation Building, 1601 Trinity St Building A, Austin, TX 78712</h3>
                <a href="tel: 833-882-2737" target="_blank"><font size = "+2"> (833)-882-2737 </font></a>
                <br>
                <a href="https://uthealthaustin.org/" target="_blank"><font size = "+2"> UT Health Webpage</font></a>
                <ul>
                    <h3> Hours</h3>
                    <li> 8AM-5PM (Mon-Fri)</li>
                    <li> Closed (Sat-Sun)</li>
                </ul>
            </div>
            </div>
            <br></br>

            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#TonyBerger"> Toney Berger Activity Center</button>
            <div class = "collapse" id="TonyBerger">
            <div class="testcenter" id="TonyBerger">
                <img src="../static/img/TonyBerger.jpg" alt="Toney Berger Activity Center" style="width:25%" style = "height:25%"> 
                <!-- Toney Berger Activity Center -->
                <h2> Toney Berger Activity Center</h2>
                <h3> 3200 Jones Rd, Austin, TX, 78745</h3>
                <a href="tel: 512-414-1050" target="_blank"><font size = "+2"> (512)-414-1050 </font> </a>
                <br>
                <a href="https://www.austinisd.org/construction-management/bond/bond-and-construction-projects/burger-athletic-complex" target="_blank"><font size = "+2"> Tony Berger Webpage</font></a>
                <ul>
                    <h3> Hours</h3>
                    <li> 8AM-8PM (Mon-Fri)</li>
                    <li> Closed (Sat-Sun)</li>
                </ul>
            </div>
            </div>
            <br></br>

            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#AdventHealth"> Advent Health Central Texas</button>
            <div class = "collapse" id="AdventHealth">
            <div class="testcenter" id="AdventHealth">
                <img src="../static/img/AdventHealth.jpg" alt="Advent Health Central Texas" style="width:25%" style = "height:25%"> 
                <!-- Advent Health-->
                <h2> Advent Health Central Texas</h2>
                <h3> 2201 South Clear Creek Road, Killeen, TX, 76549</h3>
                <a href="tel: 254-526-7523" target="_blank"><font size = "+2">(254)-526-7523 </font></a>
                <br>
                <a href="https://www.adventhealth.com/hospital/adventhealth-central-texas" target="_blank"><font size = "+2"> Advent Health Webpage </font></a>
                <ul>
                    <h3> Hours</h3>
                    <li> 9AM-9PM (Mon-Thurs)</li>
                    <li> 9AM-9PM (Fri-Sat)</li>
                    <li> 9AM-9PM (Sun)</li>
                </ul>
            </div>
            </div>
            <br></br>
            <!--Google Map to showcase location of places featured in this certain page-->
            <h3>Map</h3>
            <div id="map"></div>
            <script>
                function initMap() {
                    var austin = {lat: 30.313021, lng: -97.730750};
                    var map = new google.maps.Map(document.getElementById('map'), {zoom: 11, center: austin});
                    var roundrockbaylor = {lat: 30.556611, lng: -97.683091};
                    var infoWindowOne = new google.maps.InfoWindow({content: '<h6>Round Rock Baylor</h6>'})
                    var marker_one = new google.maps.Marker({position: roundrockbaylor, title: 'Round Rock Baylor', map: map, animation: google.maps.Animation.DROP}); 
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
                    var austinbaylor = {lat: 30.234960, lng: -97.834664};
                    var infoWindowTwo = new google.maps.InfoWindow({content: '<h6>Austin Baylor</h6>'});
                    var marker_two = new google.maps.Marker({position: austinbaylor, title: 'Austin Baylor', map: map, animation: google.maps.Animation.DROP});
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
                    var uthealth = {lat: 30.274748, lng: -97.736660};
                    var infoWindowThree = new google.maps.InfoWindow({content: '<h6>UT Healh Austin</h6>'});
                    var marker_three = new google.maps.Marker({position: uthealth, title: 'UT Health Austin', map: map, animation: google.maps.Animation.DROP});
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
                    var toney = {lat: 30.228801, lng: -97.807816};
                    var infoWindowFour = new google.maps.InfoWindow({content: '<h6>Toney Berger Activity Center</h6>'});
                    var marker_four = new google.maps.Marker({position: toney, title: 'Toney Berger Activity Center', map: map, animation: google.maps.Animation.DROP});
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
                    var advent = {lat: 31.112264, lng: -97.802921};
                    var infoWindowFive = new google.maps.InfoWindow({content: '<h6>Advent Health Central Texas</h6>'});
                    var marker_five = new google.maps.Marker({position: advent, title: 'Advent Health Central Texas', map: map, animation: google.maps.Animation.DROP});
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