import React, { Component, useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from "axios";

const mapStyles = {
  width: '50%',
  height: '50%'
};

class Grocery extends React.Component {

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }; 
  
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      city_id: 0,
      name: "",
      state: "",
      latitude: 0.0,
      longitude: 0.0,
      population: 0,  
    };
    this.onSort = this.onSort.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/City/1")
      .then(function(response) {
        return response.json();
      })
      .then(items => this.setState({data: items}));


    let url = "http://localhost:5000/";
    axios.get(url + 'api/City').then((result) => {
      console.log(result.data);
      this.setState({ data: result.data});
      console.log(this.state.data);
    });

    this.setState({name: this.state.name});
  }

  onSort(event, sortKey) {
    const data = this.state.data;
    data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
  }

  
  render() {
  // Option 1: var data = this.getCities()   <th onClick = {e => this.onSort(e, 'name')}>{{data}}</th> 
  
  return (
    <div class = "grocery-container">
        <table className = "m-table">
        <thead>
          <th onClick = {e => this.onSort(e, 'name')}> Name </th>
          <th onClick = {e => this.onSort(e, 'address')}>Address</th>
          <th onClick = {e => this.onSort(e, 'phoneNumber')}>Phone Number</th>
          <th onClick = {e => this.onSort(e, 'website')}>Website</th>
          <th onClick = {e => this.onSort(e, 'hours')}>Hours</th>
        </thead>

        {/* <tbody>
          {newdata.map(function(hospital, index) {
            return (
              <tr key={index} data-item={hospital}>
                <td data-title="Name">{hospital.name}</td>
                <td data-title="Address">{hospital.address}</td>
                <td data-title="Phone Number">{hospital.phoneNumber}</td>
                <td data-title="Website">{hospital.website}</td>
                <td data-title="Hours">{hospital.hours}</td>
              </tr>
            );
          })}
        </tbody>  */}
        
      </table>  

      <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
      </div> 
  );
}
}

//App = GoogleApiWrapper({
  //apiKey: 'AIzaSyAYVNrhNbNDCs08puZcbPtPfXXj1sH61x8'
//})(App);

const rootElement = document.getElementById("root");
export default Grocery;