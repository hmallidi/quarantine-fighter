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

function Drugstore(props){
  const [search, setSearch] = useState(""); // search is null to start with
  const [data, setData] = useState(); 
  const [originalData, setOriginalData] = useState();

  const updateTable = (result) => {
    console.log(result);
    console.log(result.data);
    
    for (var index = 0; index < result.data.length; index++) {

      result.data[index].google_maps_url =  <a href={result.data[index].google_maps_url} > Open Google Maps </a>
      for(var openingIndex = 0; openingIndex < result.data[index].opening_hours.length; openingIndex++){
        result.data[index].opening_hours[openingIndex] = <li> {result.data[index].opening_hours[openingIndex]} </li>
      }
   
    }

   setOriginalData(result.data);
   setData(result.data);

  }

  useEffect(()=> {
    var urlString = '/api/Drugstore/all/';
    
    axios.get(urlString).then((result) => {
      updateTable(result);
    });
 
  }, []  )

  let testData = {
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

 
  const getUserInput = event => {
    setSearch(event.target.value);
    updateSearchTable(event.target.value);
  };

  const Highlight = ({ children, highlightIndex }) => (
    <strong className="highlighted-text">{children}</strong>
  );

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
            if(!(originalData[index].name.toLowerCase().includes(words[i].toLowerCase())) && !(originalData[index].address.toLowerCase().includes(words[i].toLowerCase())) && 
                !(originalData[index].business_status.toLowerCase().includes(words[i].toLowerCase()))){
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
        if(originalData[index].name.toLowerCase().includes(input_text.toLowerCase()) || originalData[index].address.toLowerCase().includes(input_text.toLowerCase()) ||
          (originalData[index].business_status.toLowerCase().includes(input_text.toLowerCase()))){

            updateData.push(originalData[index]);
        }
      }
    }
  
    
    setData(updateData);

  }; 
   
  return (
    <div>
      <img src={drugstorepic} className={"subpage_img"} alt="drugstore"/>

      <br></br>
      <br></br>

      <center>
          <h2>Drugstores</h2>
          <br></br>
          <h5>{`(Click on the table headers to sort!)`}</h5>
      </center>

      <br></br>
      <br></br>

      <center>
        <form onSubmit={e => { e.preventDefault(); }}>
        <input type="text" name="input" value={search} onChange={getUserInput} placeholder="Search by Name, Location, Business Status"></input>
      </form>
      </center>
  
      <br></br>

      <MDBDataTable
        striped
        bordered
        small
        data={testData}
        searching={false}
      />

    </div>
  );

};

export default Drugstore;
