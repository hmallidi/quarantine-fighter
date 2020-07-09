import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';

const mapStyles = {
  width: '50%',
  height: '50%'
};

class Restaurant extends Component {
  constructor (props) {
    super(props)
    this.state = {data: [] };
    this.onSort = this.onSort.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:5000/api/City/1")
      .then(function(response) {
        return response.json();
      })
      .then(items => this.setState({data: items}));
  }

  onSort(event, sortKey) {
    const data = this.state.data;
    data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
    this.setState({data})
  }
  render() {
    var newdata = this.state.data;
    return (
      <div class = "drugstore-container">
      <table className = "m-table">
        <thead>
          <th onClick = {e => this.onSort(e, 'name')}>Name</th>
          <th onClick = {e => this.onSort(e, 'address')}>Address</th>
          <th onClick = {e => this.onSort(e, 'phoneNumber')}>Phone Number</th>
          <th onClick = {e => this.onSort(e, 'website')}>Website</th>
          <th onClick = {e => this.onSort(e, 'hours')}>Hours</th>
        </thead>
        <tbody>
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
        </tbody>
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
GoogleApiWrapper({
  apiKey: 'AIzaSyDzN3W-S4TxBm3wqslV1_JqfwhLjEsSKI8'
})(Restaurant);
export default Restaurant;