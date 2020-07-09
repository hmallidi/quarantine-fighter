import React, { Component } from "react";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';

class Healthcare extends Component {

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
      /*
      <HashRouter>
	        <div>
	        <h1>COVID	FIGHTER</h1>
	          <ul className="header">
	            <li><NavLink exact to="/">Home</NavLink></li>
	            <li><NavLink exact to="/Grocery">Grocery</NavLink></li>
	            <li><NavLink exact to="/Restaurant">Restaurant</NavLink></li>
	            <li><NavLink exact to="/Healthcare">Healthcare</NavLink></li>
	            <li><NavLink exact to="/About">About</NavLink></li>
	          </ul>
	          <div className="content">
				  <Route exact path="/" component={Home}/>
				  <Route path="/Grocery" exact component={Grocery}/>
				  <Route path="/Restaurant" exact component={Restaurant}/>
				  <Route path="/Healthcare" exact component={Healthcare}/>
				  <Route path="/About" exact component={About}/>
        </div>
        */
	      // </div>
          <table className = "m-table">
        <thead>
          <th onClick = {e => this.onSort(e, 'name')}>Name</th>
          <th onClick = {e => this.onSort(e, 'address')}>Address</th>
          <th onClick = {e => this.onSort(e, 'hours')}>Hours</th>
        </thead>
        <tbody>
          {newdata.map(function(hospital, index) {
            return (
              <tr key={index} data-item={hospital}>
                <td data-title="Name">{hospital.name}</td>
                <td data-title="Address">{hospital.address}</td>
                <td data-title="Hours">{hospital.hours}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      //</HashRouter>
    );
  }
}
export default Healthcare;