import React, { Component, useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';

const mapStyles = {
  width: '50%',
  height: '50%'
};

function Drugstore(props){
  const [searchCity, setSearchCity] = useState(""); // search is null to start with
  const [searchName, setSearchName] = useState("");
    
  //data encapsulates all of the fields below it, so those aren't necessary
  const [data, setData] = useState();

  // const [id, setID] = useState("");
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [zipcode, setZipcode] = useState("");
  // const [latitude, setLatitude] = useState(0.0);
  // const [longitude, setLongitude] = useState(0.0);
  // const [openingHours, setOpeningHours] = useState("");
  // const [businessStatus, seBusinessStatus] = useState("");
  // const [gMapURL, setGMapURL] = useState("");
  // const [cityID, setCityID] = useState(0);


  useEffect(()=> {
    axios.get('/drugstore/?name' + searchName + '=&city=' + searchCity).then((result) => {
    // axios.get('/api/Drugstore/?name=&city=Austin').then((result) => {
      console.log("Hello");
      console.log(result)
      console.log(result.data);
      setData(result.data);
    });
  }, [] )

  //functions to set the search variable to the input of the form
  const getCityInput = event => {
    setSearchCity(event.target.value);
    console.log(searchCity);
  };

  const getNameInput = event => {
    setSearchName(event.target.value);
    console.log(searchName);
  };

  // const onSort = (event, sortKey) => {
  //   const data = state.data;
  //   data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
  //   setState({data})
  // }
  // what’s being returned
  return (
    //form that represents the search bars
    <div>
      <form action="/drugstore" method="post">
        {/* search by city or by name */}
        <input type="text" name="searchInput" value={searchCity} onChange={getCityInput} placeholder="Search by City"></input>
        <input type="text" name="searchInput" value={searchName} onChange={getNameInput} placeholder="Search by Name"></input>
        <button>Search!</button>
      </form>
    </div>

    // <div class = "grocery-container">
    //     <table className = "m-table">
    //     <thead>
    //       <th onClick = {e => onSort(e, 'name')}> Name </th>
    //       <th onClick = {e => onSort(e, 'address')}>Address</th>
    //       <th onClick = {e => onSort(e, 'businessStatus')}>Business Status</th>
    //       <th onClick = {e => onSort(e, 'gMapURL')}>Google Maps Link</th>
    //       <th onClick = {e => onSort(e, 'hours')}>Hours</th>
    //     </thead>
    //     <tbody>
    //         {/* { data && <td>{data.name}</td> }
    //         { data && <td>{data.address}</td> }
    //         { data && <td>{data.businessStatus}</td> }
    //         { data && <td>{data.gMapURL}</td> }
    //         { data && <td>{data.openingHours}</td> } */}
            
    //         const drugstores = Information.map(data =>  {
              
    //           <td>{data.name}</td>
    //           <td>{data.address}</td>
    //           <td>{data.businessStatus}</td>
    //           <td>{data.gMapURL}</td>
    //           <td>{data.openingHours}</td>
              
    //         })
            
    //     </tbody>
    //   </table>
    //   <Map
    //       google={props.google}
    //       zoom={8}
    //       style={mapStyles}
    //       initialCenter={{ lat: 47.444, lng: -122.176}}
    //     />
    //   </div>
  );
};

// class Restaurant extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {data: [] };
//     this.onSort = this.onSort.bind(this)
//   }

//   componentDidMount() {
//     fetch("http://localhost:5000/api/City/1")
//       .then(function(response) {
//         return response.json();
//       })
//       .then(items => this.setState({data: items}));
//   }

//   onSort(event, sortKey) {
//     const data = this.state.data;
//     data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
//     this.setState({data})
//   }
//   render() {
//     var newdata = this.state.data;
//     return (
//       <div class = "drugstore-container">
//       <table className = "m-table">
//         <thead>
//           <th onClick = {e => this.onSort(e, 'name')}>Name</th>
//           <th onClick = {e => this.onSort(e, 'address')}>Address</th>
//           <th onClick = {e => this.onSort(e, 'phoneNumber')}>Phone Number</th>
//           <th onClick = {e => this.onSort(e, 'website')}>Website</th>
//           <th onClick = {e => this.onSort(e, 'hours')}>Hours</th>
//         </thead>
//         <tbody>
//           {newdata.map(function(hospital, index) {
//             return (
//               <tr key={index} data-item={hospital}>
//                 <td data-title="Name">{hospital.name}</td>
//                 <td data-title="Address">{hospital.address}</td>
//                 <td data-title="Phone Number">{hospital.phoneNumber}</td>
//                 <td data-title="Website">{hospital.website}</td>
//                 <td data-title="Hours">{hospital.hours}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <Map
//           google={this.props.google}
//           zoom={8}
//           style={mapStyles}
//           initialCenter={{ lat: 47.444, lng: -122.176}}
//         />
//       </div>
//     );
//   }
// }
GoogleApiWrapper({
  apiKey: 'AIzaSyAYVNrhNbNDCs08puZcbPtPfXXj1sH61x8'
})(Drugstore);
export default Drugstore;