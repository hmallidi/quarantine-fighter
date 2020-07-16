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
import {Link } from "react-router-dom";

function Group3(props){
  const [trackData, setTrackData] = useState();
  const [artistData, setArtistData] = useState();
  const [albumData, setAlbumData] = useState();

  const updateTrackData = (result) => {
    console.log(result);
    console.log(result.data);

    for (var index = 0; index < result.data.length; index++) {
          result.data[index].track_image_url =  <img src={result.data[index].track_image_url} alt="Track Image" width="100" height="100"/>
          for(var i = 0; i < result.data[index].track_artists.length; i++){
            result.data[index].track_artists[i] = <li> {result.data[index].track_artists[i]} </li>
          }
     }

    setTrackData(result.data);
  }

  const updateAlbumData = (result) => {
    console.log(result);
    console.log(result.data);

    for (var index = 0; index < result.data.length; index++) {
          result.data[index].album_image_url =  <img src={result.data[index].album_image_url} alt="Album Image" width="100" height="100"/>
          for(var i = 0; i < result.data[index].album_tracks.length; i++){
            result.data[index].album_tracks[i] = <li> {result.data[index].album_tracks[i]} </li>
          }

          for(var i = 0; i < result.data[index].album_genres.length; i++){
            result.data[index].album_genres[i] = <li> {result.data[index].album_genres[i]} </li>
          }

          for(var i = 0; i < result.data[index].album_artists.length; i++){
            result.data[index].album_artists[i] = <li> {result.data[index].album_artists[i]} </li>
          }
     }

    setAlbumData(result.data);
  }

  const updateArtistData = (result) => {
    console.log(result);
    console.log(result.data);

    for (var index = 0; index < result.data.length; index++) {
          result.data[index].artist_image_url =  <img src={result.data[index].artist_image_url} alt="Artist Image" width="100" height="100"/>
          result.data[index].artist_spotify_url =  <a href={result.data[index].artist_spotify_url} > Open This Artist's Spotify Link </a>

          for(var i = 0; i < result.data[index].artist_genres.length; i++){
            result.data[index].artist_genres[i] = <li> {result.data[index].artist_genres[i]} </li>
          }

          for(var i = 0; i < result.data[index].artist_albums.length; i++){
            result.data[index].artist_albums[i] = <li> {result.data[index].artist_albums[i]} </li>
          }
     }

    setArtistData(result.data);
  }

  useEffect(()=> {
    axios.get("/Group3/track").then((result) => {

      console.log(result);
      console.log(result.data);

      updateTrackData(result);
    });

    axios.get("/Group3/artist").then((result) => {

      console.log(result);
      console.log(result.data);

      updateArtistData(result);
    });

    axios.get("/Group3/album").then((result) => {

      console.log(result);
      console.log(result.data);

      updateAlbumData(result);
    });


}, []  )

  const artists = {
    columns: [
      {
        label: 'Name',
        field: 'artist_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Spotify Link',
        field: 'artist_spotify_url',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Genres',
        field: 'artist_genres',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Albums',
        field: 'artist_albums',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Image',
        field: 'artist_image_url',
        sort: 'asc',
        width: 270
      }
    ],
    rows: artistData
  };
  
  const albums = {
    columns: [
      {
        label: 'Album Name',
        field: 'album_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Genres',
        field: 'album_genres',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Tracks',
        field: 'album_tracks',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Artists',
        field: 'album_artists',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Image',
        field: 'album_image_url',
        sort: 'asc',
        width: 150
      }
    ],
    rows: albumData
  };
  
  const tracks = {
    columns: [
      {
        label: 'Track Name',
        field: 'track_name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Duration',
        field: 'track_duration',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Album',
        field: 'album_name',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Artists',
        field: 'track_artists',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Track Image',
        field: 'track_image_url',
        sort: 'asc',
        width: 100
      }
    ],
    rows: trackData
  };

  return (
    <main>
      <div>
        <h1>Exercising Group 3 API</h1>
        <br></br>
        <br></br>

        <center>
          <h2>Track List</h2>
        </center>

        <br></br>
        <MDBDataTable
          striped
          bordered
          small
          data={tracks}
        />

        <br></br>
        <br></br>
        
        <center>
          <h2>Artist List</h2>
        </center>

        <br></br>

        <MDBDataTable
          striped
          bordered
          small
          entriesOptions={[1, 2, 5]}
          entries={2}
          data={artists}
        />
        
        <br></br>
        <br></br>
        
        <center>
          <h2>Album List</h2>
        </center>

        <br></br>

        <MDBDataTable
          striped
          bordered
          small
          entriesOptions={[1, 2, 5]}
          entries={2}
          data={albums}
        />
        </div>
    </main>

  );
}
 
export default Group3;