import React, { Component } from "react";
import {Link } from "react-router-dom";
 
class Home extends Component {
  render() {
    return (
      // <div>
      //   <h2>Welcome to the world of covid fighters!</h2>
      //   <p>This is a website for tracking the open/closed status of restaurants, 
      //     healthcare facilities, and grocery stores during covid-19.</p>
 
       
      // </div>
      <main>
      <div>
      <h1>Welcome to the World of Covid Fighters!</h1>
      <p className="lead">
          COVID-19 has had a tremendous impact on the world. 
          Aside from the health crisis, it has also caused the closing of many businesses 
          to help reduce the rate at which it spreads. 
          Additionally, some hospitals have closed down as well due to the large number of cases and hospitalizations.</p>
      <p className="lead">

          We decided to create an opportunity out of this situation by providing a simple 
          means of viewing the accommodations that multiple businesses and healthcare have created. 
          Our website will allow people to easily look up any restaurant, 
          grocery store, or healthcare facility in their area and have it return 
          information such as new hours of operation, addresses, 
          contact information, and links to the business webpage.
      </p>

      
      </div>
       <Link to ='/About' >
            <button  className="btn btn-lg btn-secondary">
              Learn More
            </button>
       </Link>
    </main>
  
    );
  }
}
 
export default Home;