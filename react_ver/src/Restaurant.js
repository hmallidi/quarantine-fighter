import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import 'bootstrap/dist/css/bootstrap.css';

class Restaurant extends Component {
  constructor (props) {
    super(props)
    this.state = {data: [] };
    this.onSort = this.onSort.bind(this)
  }

  componentDidMount() {
    fetch("http://hostname:xxxx/yyyy/zzzz")
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
    return (
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
	        </div>
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
      </HashRouter>
    );
  }
}
export default Restaurant;