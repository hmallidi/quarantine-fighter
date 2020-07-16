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
  const [search, setSearch] = useState("");


  //variables, change all vars to const or let
  const [data, setData] = useState();
  const [originalData, setOriginalData] = useState();

  useEffect(()=> {
      var searchString  = '/api/City/all/';
      axios.get(searchString).then((result) => {
        for (var index = 0; index < result.data.length; index++) {
          result.data[index].latitude = result.data[index].latitude.toString();
          result.data[index].longitude = result.data[index].longitude.toString();
          result.data[index].population = result.data[index].population.toString();
        }
      
        setOriginalData(result.data);
        setData(result.data);
    });

  }, []  )

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


const getUserInput = event => {
  setSearch(event.target.value);
  updateSearchTable(event.target.value);
};

const updateSearchTable = (input_text) => {
  let updateData = [];
 
  if(input_text === ""){
    setData(originalData);
  }
  if(input_text.includes(" ")){
    let words = input_text.split(" ");

      for (var index = 0; index < originalData.length; index++) {
        let wordAdded = true;

        for(var i = 0; i < words.length; i++){
          if(!(originalData[index].name.toLowerCase().includes(words[i].toLowerCase())) && !(originalData[index].state.toLowerCase().includes(words[i].toLowerCase())) && 
              !(originalData[index].latitude.toLowerCase().includes(words[i].toLowerCase())) && !(originalData[index].longitude.toLowerCase().includes(words[i].toLowerCase()))
              && !(originalData[index].population.toLowerCase().includes(words[i].toLowerCase()))){

            wordAdded = false;
          }
        }
        
        if(wordAdded){
          updateData.push(originalData[index]);
        }
      }
  }
  else{
    for (var index = 0; index < originalData.length; index++) {
      if((originalData[index].name.toLowerCase().includes(input_text.toLowerCase())) || (originalData[index].state.toLowerCase().includes(input_text.toLowerCase())) ||
        (originalData[index].latitude.toLowerCase().includes(input_text.toLowerCase())) ||  (originalData[index].longitude.toLowerCase().includes(input_text.toLowerCase()))
        || (originalData[index].population.toLowerCase().includes(input_text.toLowerCase()))){
        
          updateData.push(originalData[index]);
      }
    }
  }

  setData(updateData);

}; 


return (
  <div>
  <img src={citypic} className={"subpage_img"} alt="city"/>
  <br></br>
  <br></br>

  <center>
    <h2>Cities</h2>
      </center>    
  
    <br></br>
    <br></br>

    <center>
      <form onSubmit={e => { e.preventDefault(); }}>
        <input type="text" name="input" value={search} onChange={getUserInput} placeholder= "Search by Name, State, Latitude, Longitude, Population"></input>
      </form>
    </center>

    <br></br>

  <MDBDataTable
    striped
    bordered
    small
    data={testData}
    searching = {false}
  />
  </div>
  

);
};


export default City;

