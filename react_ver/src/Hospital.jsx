import React, { Component, useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import ReactDOM from "react-dom";
import { MDBDataTable } from 'mdbreact';
import "./subpage.css";
import hospitalpic from "./hospital.jpeg"

function Hospital(props){
  const [searchCity, setSearchCity] = useState(""); // search is null to start with
  const [searchName, setSearchName] = useState("");
    
  //data encapsulates all of the fields below it, so those aren't necessary
  const [data, setData] = useState();

  useEffect(()=> {
    axios.get(getURL()).then((result) => {
   //axios.get('/api/City/1').then((result) => {
     console.log(result)
     console.log(result.data);

     for (var index = 0; index < result.data.length; index++) {

        result.data[index].google_maps_url =  <a href={result.data[index].google_maps_url} > Open Google Maps </a>
        for(var openingIndex = 0; openingIndex < result.data[index].opening_hours.length; openingIndex++){
          result.data[index].opening_hours[openingIndex] = <li> {result.data[index].opening_hours[openingIndex]} </li>
        }
     
      }

     // setState({ data: result.data});
     setData(result.data);
   });

  }, []  )

  const getURL = () => {
    //var replaceName = searchName.replace(' ', '+');
    //var searchString = '/api/City/?name='.concat(replaceName);
    var searchString  = '/api/Hospital/all/';
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
        label: 'Address',
        field: 'address',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Opening Hours',
        field: 'opening_hours',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Business Status',
        field: 'business_status',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Google Maps URL',
        field: 'google_maps_url',
        sort: 'asc',
        width: 150
      }
    ],
    rows: data
  };

 

  return (
    <div>
  <img src={hospitalpic} className={"subpage_img"} alt="hospital"/>
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

GoogleApiWrapper({
  apiKey: 'AIzaSyAYVNrhNbNDCs08puZcbPtPfXXj1sH61x8'
})(Hospital);
export default Hospital;