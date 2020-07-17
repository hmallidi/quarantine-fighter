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
import drugstorepic from "./drugstore.jpg"

function SearchAll(props){
  const [search, setSearch] = useState(""); // search is null to start with
  const [dataDrugstore, setDataDrugstore] = useState(); 
  const [dataCity, setDataCity] = useState(); 
  const [dataHospital, setDataHospital] = useState(); 
  const [originalDataDrugstore, setOriginalDataDrugstore] = useState();
  const [originalDataCity, setOriginalDataCity] = useState();
  const [originalDataHospital, setOriginalDataHospital] = useState();

  useEffect(()=> {    
    axios.get('/api/Drugstore/all/').then((result) => {
      updateTableDrugstore(result);
    });

    axios.get('/api/Hospital/all/').then((result) => {
        updateTableHospital(result);
    });

    axios.get('/api/City/all/').then((result) => {
        updateTableCity(result);
    });
  }, []  )

  const getUserInput = event => {
    setSearch(event.target.value);

    updateSearchTableDrugstore(event.target.value);
    updateSearchTableHospital(event.target.value);
    updateSearchTableCity(event.target.value);
  };

  const updateTableDrugstore = (result) => {  
    for (var index = 0; index < result.data.length; index++) {

      result.data[index].google_maps_url =  <a href={result.data[index].google_maps_url} > Open Google Maps </a>
      for(var openingIndex = 0; openingIndex < result.data[index].opening_hours.length; openingIndex++){
        result.data[index].opening_hours[openingIndex] = <li> {result.data[index].opening_hours[openingIndex]} </li>
      }
   
    }

    setOriginalDataDrugstore(result.data);
    setDataDrugstore(result.data);

  };

  const updateTableHospital = (result) => {  
    for (var index = 0; index < result.data.length; index++) {

      result.data[index].google_maps_url =  <a href={result.data[index].google_maps_url} > Open Google Maps </a>
      for(var openingIndex = 0; openingIndex < result.data[index].opening_hours.length; openingIndex++){
        result.data[index].opening_hours[openingIndex] = <li> {result.data[index].opening_hours[openingIndex]} </li>
      }
    }

    setOriginalDataHospital(result.data);
    setDataHospital(result.data);
  };

  const updateTableCity = (result) => {  
    for (var index = 0; index < result.data.length; index++) {
        result.data[index].latitude = result.data[index].latitude.toString();
        result.data[index].longitude = result.data[index].longitude.toString();
        result.data[index].population = result.data[index].population.toString();
      }
    
      setOriginalDataCity(result.data);
      setDataCity(result.data);
  };

  let testDataDrugstore = {
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
    rows: dataDrugstore
  };

  let testDataHospital = {
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
    rows: dataHospital
  };

  let testDataCity = {
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
    rows: dataCity
  };

  const updateSearchTableDrugstore = (input_text) => {
    let updateData = [];
   
    if(input_text === ""){
      setDataDrugstore(originalDataDrugstore);
    }
  
    if(input_text.includes(" ")){
      let words = input_text.split(" ");

        for (var index = 0; index < originalDataDrugstore.length; index++) {
          let wordAdded = true;

          for(var i = 0; i < words.length; i++){
            if(!(originalDataDrugstore[index].name.toLowerCase().includes(words[i].toLowerCase())) && !(originalDataDrugstore[index].address.toLowerCase().includes(words[i].toLowerCase())) && 
                !(originalDataDrugstore[index].business_status.toLowerCase().includes(words[i].toLowerCase()))){
              wordAdded = false;

            }
          }

          if(wordAdded){
            updateData.push(originalDataDrugstore[index]);
          }
        }
    }
    else{
      for (var index = 0; index < originalDataDrugstore.length; index++) {
        if(originalDataDrugstore[index].name.toLowerCase().includes(input_text.toLowerCase()) || originalDataDrugstore[index].address.toLowerCase().includes(input_text.toLowerCase()) ||
          (originalDataDrugstore[index].business_status.toLowerCase().includes(input_text.toLowerCase()))){

            updateData.push(originalDataDrugstore[index]);
        }
      }
    }
  
    
    setDataDrugstore(updateData);

  }; 

  const updateSearchTableHospital = (input_text) => {
    let updateData = [];
   
    if(input_text === ""){
      setDataHospital(originalDataHospital);
    }
    
    if(input_text.includes(" ")){
      let words = input_text.split(" ");

        for (var index = 0; index < originalDataHospital.length; index++) {
          let wordAdded = true;

          for(var i = 0; i < words.length; i++){
            if(!(originalDataHospital[index].name.toLowerCase().includes(words[i].toLowerCase())) && !(originalDataHospital[index].address.toLowerCase().includes(words[i].toLowerCase())) && 
                !(originalDataHospital[index].business_status.toLowerCase().includes(words[i].toLowerCase()))){
              wordAdded = false;
            }
          }
          
          if(wordAdded){
            updateData.push(originalDataHospital[index]);
          }
        }
    } else {
      for (var index = 0; index < originalDataHospital.length; index++) {
        if(originalDataHospital[index].name.toLowerCase().includes(input_text.toLowerCase()) || originalDataHospital[index].address.toLowerCase().includes(input_text.toLowerCase()) ||
          (originalDataHospital[index].business_status.toLowerCase().includes(input_text.toLowerCase()))){
          
            updateData.push(originalDataHospital[index]);
        }
      }
    }
  
    setDataHospital(updateData);
  };

  const updateSearchTableCity = (input_text) => {
    let updateData = [];
   
    if(input_text === ""){
      setDataCity(originalDataCity);
    }
    if(input_text.includes(" ")){
      let words = input_text.split(" ");
  
        for (var index = 0; index < originalDataCity.length; index++) {
          let wordAdded = true;
  
          for(var i = 0; i < words.length; i++){
            if(!(originalDataCity[index].name.toLowerCase().includes(words[i].toLowerCase())) && !(originalDataCity[index].state.toLowerCase().includes(words[i].toLowerCase())) && 
                !(originalDataCity[index].latitude.toLowerCase().includes(words[i].toLowerCase())) && !(originalDataCity[index].longitude.toLowerCase().includes(words[i].toLowerCase()))
                && !(originalDataCity[index].population.toLowerCase().includes(words[i].toLowerCase()))){
  
              wordAdded = false;
            }
          }
          
          if(wordAdded){
            updateData.push(originalDataCity[index]);
          }
        }
    }
    else{
      for (var index = 0; index < originalDataCity.length; index++) {
        if((originalDataCity[index].name.toLowerCase().includes(input_text.toLowerCase())) || (originalDataCity[index].state.toLowerCase().includes(input_text.toLowerCase())) ||
          (originalDataCity[index].latitude.toLowerCase().includes(input_text.toLowerCase())) ||  (originalDataCity[index].longitude.toLowerCase().includes(input_text.toLowerCase()))
          || (originalDataCity[index].population.toLowerCase().includes(input_text.toLowerCase()))){
          
            updateData.push(originalDataCity[index]);
        }
      }
    }
  
    setDataCity(updateData);
  }; 

  return (
    <div>
      <br></br>
      <br></br>

      <center>
          <h2>Search through All Tables</h2>
          <br></br>
          <h5>(Click on the table headers to sort!)</h5>
      </center>

      <br></br>
      <br></br>

      <center>
        <form onSubmit={e => { e.preventDefault(); }}>
        <input type="text" name="input" value={search} onChange={getUserInput} placeholder="Search by Name, Location, Business Status"></input>
      </form>
      </center>
  
      <br></br>
      <br></br>

      <center>
          <h2>City List</h2>
        </center>

        <br></br>
        <MDBDataTable
          striped
          bordered
          small
          data={testDataCity}
        />

        <br></br>
        <br></br>
        
        <center>
          <h2>Drugstore List</h2>
        </center>

        <br></br>

        <MDBDataTable
          striped
          bordered
          small
          entriesOptions={[1, 2, 5, 10]}
          entries={5}
          data={testDataDrugstore}
        />
        
        <br></br>
        <br></br>
        
        <center>
          <h2>Hospital List</h2>
        </center>

        <br></br>

        <MDBDataTable
          striped
          bordered
          small
          entriesOptions={[1, 2, 5, 10]}
          entries={5}
          data={testDataHospital}
        />

    </div>
  );

};

export default SearchAll;
