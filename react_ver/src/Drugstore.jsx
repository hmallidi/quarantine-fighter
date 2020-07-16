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
  // const [searchName, setSearchName] = useState("");
    
  //data encapsulates all of the fields below it, so those aren't necessary
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

   //setState({ data: result.data});
   setOriginalData(result.data);
   setData(result.data);
    
    // let temp = [];

    // for (var index = 0; index < result.data.length; index++) {
    //    let addToList = result.data[index].name.includes(searchName);
    //    if(addToList){
    //       result.data[index].google_maps_url =  <a href={result.data[index].google_maps_url} > Open Google Maps </a>
    //       for(var openingIndex = 0; openingIndex < result.data[index].opening_hours.length; openingIndex++){
    //        result.data[index].opening_hours[openingIndex] = <li> {result.data[index].opening_hours[openingIndex]} </li>
    //      }
    //      temp.push(result.data[index]);
    //    }
    //  }

    // // setData(result.data);
    // setData(temp);
  }

  useEffect(()=> {
    console.log("Hi inside use effect");
    var urlString = '/api/Drugstore/all/';

    // console.log(searchName.concat("Helloname"))
    // console.log(searchCity.concat("Hellocity"))
    
    axios.get(urlString).then((result) => {
      updateTable(result);
    });
 
    // axios.post(urlString, {
    //   name: searchName,
    //   city: searchCity
    // }).then(function (result) {
    //   console.log("In post:");
    //   console.log(result);
    //   updateTable(result);
    // })
  }, []  )

  const getURL = () => {
    //var replaceName = searchName.replace(' ', '+');
    //var searchString = '/api/City/?name='.concat(replaceName);
    var searchString  = '/api/Drugstore/all/';
    console.log(searchString);
    return searchString;
  }


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

  // const getNameInput = event => {
  //   setSearchName(event.target.value);
  //   // axios.get(urlString).then((result) => {
  //   //   updateTable(result);
  //   // });
  //   console.log(searchName);
  // };

  const getUserInput = event => {
    const prevLength = search.length;
    setSearch(event.target.value);
    console.log(search);

    updateSearchTable(prevLength, event);
    //ReactDOM.render(testData, document.getElementById('root'));
  };

  const updateSearchTable = (ogSearchLength, event) => {
    let updateData = [];

    console.log("Event handler:");
    console.log(event.target.keyCode);

    console.log("Search Length : ");
    console.log(search.length);

    console.log("Original Search Length : ");
    console.log(ogSearchLength);

   
    if(search === ""){
      console.log("In empty branch");
      setData(originalData);
    }


    if(search.includes(" ")){
      let words = search.split(" ");

        for (var index = 0; index < originalData.length; index++) {
          let wordAdded = true;

          for(var i = 0; i < words.length; i++){
            if(!(originalData[index].name.toLowerCase().includes(words[i].toLowerCase())) && !(originalData[index].address.toLowerCase().includes(words[i].toLowerCase()))){
              wordAdded = false;
            }
          }
          
          if(wordAdded){
            updateData.push(originalData[index]);
          }

        }
      }
      else{
        console.log("In backspace branch");
        for (var index = 0; index < originalData.length; index++) {
          if(originalData[index].name.toLowerCase().includes(search.toLowerCase())){
            updateData.push(originalData[index]);
          }
          else if(originalData[index].address.toLowerCase().includes(search.toLowerCase())){
            updateData.push(originalData[index]);
          }
        }
      }
  
      setData(updateData);
    }; 
    // else{
    //   console.log("In regular branch");
    //   for (var index = 0; index < data.length; index++) {
    //     if(data[index].name.includes(search)){
    //       updateData.push(data[index]);
    //     }
    //     else if(data[index].address.includes(search)){
    //       updateData.push(data[index]);
    //     }
    //   }
      
    //  setData(updateData);
    // }

  return (
    <div>
      <img src={drugstorepic} className={"subpage_img"} alt="drugstore"/>

      <br></br>
      <br></br>

      <center>
          <h2>Drugstores</h2>
      </center>

      <br></br>
      <br></br>

      <center>
        <form onSubmit={e => { e.preventDefault(); }}>
        <input type="text" name="input" value={search} onChange={getUserInput} placeholder="Search by name or location"></input>
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

GoogleApiWrapper({
  apiKey: 'AIzaSyAYVNrhNbNDCs08puZcbPtPfXXj1sH61x8'
})(Drugstore);
export default Drugstore;