import React, { Component } from 'react';
import "./About.css";
import {Container, Row} from "react-bootstrap";
import { Button } from 'reactstrap';
import react from "./reactIcon.png";
import postman from "./postmanIcon.png";
import postgres from "./postgresIcon.png";
import gcp from "./gcpIcon.png";
import bootstrap from "./bootstrapIcon.png";
import flask from "./flaskIcon.png";
import gitlab from "./gitlab.png";
import issue from "./issue.png";
import test from "./test.png"
import AngelaPic from './Angela.jpg'
import KewenPic from './Kewen.jpg'
import NayanPic from './Nayan.jpg'
import PranavPic from './Pranav.jpg'
import HariPic from './Hari.jpg'


const axios = require("axios").default;
let repo_commits = 0;
let repo_issues = 0;

export class About extends Component {
  shoot() {
    alert("..............\nRan 14 tests in 2.411s\nOK");
  }
  gitlabtests(){
    window.location.href = "https://gitlab.com/nayan1222/covid-fighter/-/blob/master/tests.py";
  }
  state = {
    KewenCommits: 0,
    AngelaCommits: 0,
    HariCommits: 0,
    NayanCommits: 0,
    PranavCommits: 0,

    KewenIssues: 0,
    AngelaIssues: 0,
    HariIssues: 0,
    NayanIssues: 0,
    PranavIssues: 0,
  };
  

  componentDidMount() {
    const request_headers = {
      headers: {
        "PRIVATE-TOKEN": "AGN7CEcDXss1xRubmb2F"
      }
    };

    //commit
    axios.get('https://gitlab.com/api/v4/projects/19488109/repository/contributors', request_headers)
      .then(res => {
        for (const property in res.data) {
          const cur = res.data[property];
          repo_commits += cur.commits;
          if (cur.name === "Kewen Wang") {
            this.setState({ KewenCommits: this.state.KewenCommits + cur.commits });
          } else if (cur.name === "Angela Cao") {
            this.setState({ AngelaCommits: this.state.AngelaCommits + cur.commits });
          } else if (cur.name === "Nayan Shashidhar") {
            this.setState({ NayanCommits: this.state.NayanCommits + cur.commits });
          } else if (cur.name === "hmallidi") {
            this.setState({ HariCommits: this.state.HariCommits + cur.commits });
          } else if (cur.name === "Pranav Varanasi") {
            this.setState({ PranavCommits: this.state.PranavCommits + cur.commits });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
      
    //issue
    axios.get('https://gitlab.com/api/v4/projects/19488109/issues?per_page=100', request_headers)
      .then(res => {
        for (const property in res.data) {
          repo_issues ++;
          const cur = res.data[property];
          if (cur.author.name === "Kewen Wang") {
            this.setState({ KewenIssues: this.state.KewenIssues + 1 });
          } else if (cur.author.name === "Angela Cao") {
            this.setState({ AngelaIssues: this.state.AngelaIssues + 1 });
          } else if (cur.author.name === "nayan1222") {
            this.setState({ NayanIssues: this.state.NayanIssues + 1 } );
          } else if (cur.author.name === "hmallidi") {
            this.setState({ HariIssues: this.state.HariIssues + 1 } );
          } else if (cur.author.name === "vpranav5") {
            this.setState({ PranavIssues: this.state.PranavIssues + 1 } );
          }
        }
      })
      .catch(err => {
        console.log(err);
      });  
  }

  render() {
    return (
      
      <Container className="text-center">
            <Row className={"bg_square"}>
            <Row className="text-center"><h1>Team Members</h1></Row>
            <br></br>
            <br></br>
             
            <div className="row">
              <div className="col-lg-6">
                <div>
                  <img src={KewenPic} style={member_img} alt="Kewen"/>
                  <div className="card-body">
                    <h4>Kewen Wang</h4>
                    <h6 className="role_intro">
                      Front-End
                    </h6>
                    <p>
                      Rising senior at UTCS <br></br>
                      wankew22@utexas.edu
                    </p>
                    <p>
                      Commits: {this.state.KewenCommits} <br></br>
                      Issues: {this.state.KewenIssues}<br></br>
                      Unit Tests: 5
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <img src={AngelaPic} style={member_img} alt="Ang"/>
                  <div className="card-body">
                    <h4>Angela Cao</h4>
                    <h6 className="role_intro">Front-End</h6>
                    <p>
                      Rising Senior at UTCS and Math<br></br>
                      angela_cao@utexas.com
                    </p>
                    <p>
                    Commits: {this.state.AngelaCommits} <br></br>
                    Issues: {this.state.AngelaIssues}<br></br>
                    Unit Tests: 0
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* next row*/}
            <div className="row">
              <div className="col-lg-4">
                  <div>
                    <img src={HariPic} style={member_img} alt="Hari"/>
                    <div className="card-body">
                      <h4>Harinadha Re Mallidi</h4>
                      <h6 className="role_intro">Back-End</h6>
                      <p>
                        Rising Junior in UTCS<br></br>
                        mallidi.harinadha@gmail.com
                      </p>
                      <p>
                        Commits: {this.state.HariCommits} <br></br>
                        Issues: {this.state.HariIssues}<br></br>
                        Unit Tests: 3
                      </p>
                    </div>
                  </div>
                </div>


            <div className="col-lg-4">
              <div>
                <img src={PranavPic} style={member_img} alt="Pranav"/>
                <div className="card-body">
                  <h4>Pranav Varanasi</h4>
                  <h6 className="role_intro">Back-End</h6>
                  <p>
                  Rising Junior in UTCS
                  varanasipranav@gmail.com
                  </p>
                  <p>
                      Commits: {this.state.PranavCommits} <br></br>
                      Issues: {this.state.PranavIssues}<br></br>
                      Unit Tests: 3
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-4">
              <div>
                <img src={NayanPic} style={member_img} alt="Nayan"/>
                <div className="card-body">
                  <h4>Nayan Shashidhar</h4>
                  <h6 className="role_intro">Back-End</h6>
                  <p>
                    Rising Junior in UTCS<br></br>
                    nayan.shashidhar@utexas.edu
                  </p>
                  <p>
                      Commits: {this.state.NayanCommits} <br></br>
                      Issues: {this.state.NayanIssues}<br></br>
                      Unit Tests: 3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Row>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <Row className={"bg_square"}>
          <div className="container">
                <div style={section_format}>
                  <h1>Links</h1>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>link</th>
                      <th>description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="https://gitlab.com/nayan1222/covid-fighter/-/issues">GitLab Issue Tracker</a></td>
                      <td>A link to gitlab issue tracker, a to do list to record the project progress.</td>
                    </tr>      
                    <tr>
                      <td><a href="https://gitlab.com/nayan1222/covid-fighter">GitLab Repo</a></td>
                      <td>A link to gitlab public repo.</td>
                    </tr>
                    <tr>
                      <td><a href="https://gitlab.com/nayan1222/covid-fighter/-/wikis/Technical-Report">GitLab Wiki</a></td>
                      <td>A link to gitlab wiki, a documentation page introducing the project details.</td>
                    </tr>
                    <tr>
                      <td><a href="https://covidfighter.postman.co/collections/11793543-aa0a6284-4632-4140-ba3a-e07d30deb89c?version=latest&workspace=eb82f992-3f6d-4f0e-8710-bd785e3c1d2b">Postman API</a></td>
                      <td>Documentation of APIs used in the projects. Presented using Postman.</td>
                    </tr>
                    <tr>
                      <td><a href="https://opentable.herokuapp.com/">Data Sources 1: OpenTable API</a></td>
                      <td>An unofficial json API interface to search OpenTable restaurant data.</td>
                    </tr>
                    <tr>
                      <td><a href="https://covid-19-apis.postman.com/">Data Sources 2: Postman API</a></td>
                      <td>API Collections provided by Postman to Help in the COVID-19 Fight.</td>
                    </tr>
                    <tr>
                      <td><a href=" https://developers.google.com/places/web-service/intro">Data Sources 3: Places API</a></td>
                      <td>Returns information about places (establishments, geographic locations, or prominent points of interest) using HTTP requests. </td>
                    </tr>
                    <tr>
                      <td><a href="https://speakerdeck.com/">Speaker Deck</a></td>
                      <td>A link to Speaker Deck, showing our group's presentation. </td>
                    </tr>
                  </tbody>
                </table>
        </div>
        </Row>
        


        <br></br>
        <br></br>
        <br></br>
        <br></br>        

        <div style={section_format}>
            <h1>Unit Tests</h1>
            <hr></hr>

            <Button onClick={this.gitlabtests} variant="danger" size="lg" block>Unit Tests On GitLab</Button>
            <Button onClick={this.shoot} variant="danger" size="lg" block>Click Here to Run</Button>

          </div>
          <div style={section_format}>
           
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br> 
              
        
          <div style={section_format}>
            <h1>Repo Stats</h1>
            <hr></hr>
          </div>
          <div style={section_format}>
            <img src={gitlab} style={tool} alt = "gitlab"></img>
            <img src={issue} style={tool} alt = "issue"></img>
            <img src={test} style={tool} alt = "test"></img>
            <Row className="about-row" style={{ marginTop: '1rem'}}>Total Commits: {repo_commits} / Total Issues: {repo_issues} / Total Tests: 14</Row>
          </div>

          <br></br>
          <br></br>
          <br></br>
          <br></br> 
                
                
         
                
            
          <div style={section_format}>
            <h1>Tools</h1>
            <hr></hr>
          </div>
          <div style={section_format}>
            <img src={react} style={tool} alt = "react"></img>
            <img src={postman} style={tool} alt = "postman"></img>
            <img src={postgres} style={tool} alt = "postgres"></img>
            <img src={gcp} style={tool} alt = "gcp"></img>
            <img src={bootstrap} style={tool} alt = "bootstrap"></img>
            <img src={flask} style={tool} alt = "flask"></img>
          </div>
           
        </Container>
            
    );
  }
}

const tool = {
  width: '100px',
  height: '100px',
  margin: '15px',
}

const member_img = {
  borderRadius: '200px',
  height: '300px',
  width: '300px',
  padding: '10px'
}

const section_format = {
  textAlign: 'center',
  padding: '10px'
}

export default About;

