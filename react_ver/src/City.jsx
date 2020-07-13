import React, { Component, useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from "axios";
import citypic from "./citypic.jpg"
import { MDBDataTable } from 'mdbreact';
import "./subpage.css";


// function made from the Grocery class below
function City(props){



//variables for search parameters
const [searchName, setSearchName] = useState("");

//variables, change all vars to const or let
const [data, setData] = useState();
const [id, setID] = useState(0);
const [name, setName] = useState("");
const [state, setState] = useState("");
const [latitude, setLatitude] = useState(0.0);
const [longitude, setLongitude] = useState(0.0);
const [popuation, setPopulation] = useState(0); 

useEffect(()=> {
    axios.get(getURL()).then((result) => {
  //axios.get('/api/City/1').then((result) => {

    console.log(result)
    console.log(result.data);

    // setState({ data: result.data});
    setData(result.data);
    console.log(state.data);
  });

}, []  )

//stores the input for searching by city name
const getNameInput = event => {
  setSearchName(event.target.value);
  console.log(searchName);
};



const onSort = (event, sortKey) => {
  const data = state.data;
  data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
  setState({data})
}

const getURL = () => {
  //var replaceName = searchName.replace(' ', '+');
  //var searchString = '/api/City/?name='.concat(replaceName);
  var searchString  = '/api/City/all/';
  console.log(searchString);
  return searchString;
}



const testData = {
  columns: [
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'State',
      field: 'state',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Latitude',
      field: 'latitude',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Longitude',
      field: 'longitude',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Population',
      field: 'population',
      sort: 'asc',
      width: 150
    }
  ],
  rows: data
};

return (
  <div>
  <img src={citypic} className={"city_img"} alt="city"/>
  <br></br>
  <br></br>
  <MDBDataTable
    striped
    bordered
    small
    data={testData}
  />
  </div>
  

);
};


export default City;

