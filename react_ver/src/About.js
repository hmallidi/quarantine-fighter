import React, { Component } from 'react';
import "./About.css";
import { Card, ListGroup, ListGroupItem, Container, Row, Col, Image, Button } from "react-bootstrap";
import reactIcon from "./reactIcon.png";
import postmanIcon from "./postmanIcon.png";
import postgresIcon from "./postgresIcon.png";
import gcpIcon from "./gcpIcon.png";
import bootstrapIcon from "./bootstrapIcon.png";
import flaskIcon from "./flaskIcon.png";
import gitlab from "./gitlab.png";
import issue from "./issue.png";
import test from "./test.png"


const Kewen = {
  name:"Kewen",
  role: "Front-End",
  email:"wankew22@utexas.edu"
};
const Angela = {
  name: "Angela",
  role: "Front-End",
  email:"angela_cao@utexas.com"
};
const Nayan = {
  name: "Nayan",
  role: "Back-End",
  email:"nayan.shashidhar@utexas.edu"
};
const vpranav5 = {
  name: "Pranav",
  role: "Back-End",
  email:"varanasipranav@gmail.com"
};
const hmallidi = {
  name: "Hari",
  role: "Back-End",
  email:"mallidi.harinadha@gmail.com"
};


class About extends Component {
    state = {
        members: [],
        issues: []
    }

    componentDidMount() {
        fetch('https://gitlab.com/api/v4/projects/19488109/repository/contributors',
            {
                headers: {
                    'Private-Token': 'AGN7CEcDXss1xRubmb2F',
                }
            }
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({ members: data })
                console.log(this.state.members)
            })
           

        fetch('https://gitlab.com/api/v4/projects/19488109/issues?per_page=100',
            {
                headers: {
                    'Private-Token': 'AGN7CEcDXss1xRubmb2F',
                }
            }
        )
            .then(res => res.json())
            .then((data) => {
                this.setState({ issues: data })
                console.log(this.state.issues)
            })
            
    }

    abc = () => {
        for (let i = 0; i < this.state.members.length; i++) {
            let member = this.state.members[i];
            if (member.email === "wankew22@kewens-mbp.lan"){
                    this.state.members.splice(i, 1);
                    i = 0;
            }

        }
        return this.state.members.map(member => {
            let firstName = member.name.split(" ")[0];
            return (
                <Col lg={4} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
                    <p style={{ width: '85%' }}>
                        <Card className="text-center">
                            {/* <Card.Img className="cardpic rounded" variant="top" src={images[(member.name + ".jpg")]} /> */}
                            <Card.Body>
                                <Card.Title>{eval(firstName).name}</Card.Title>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>
                                        <div>
                                            {eval(firstName).role}
                                            <br></br>
                                            {eval(firstName).email}
                                        </div>
                                        
                                        </ListGroupItem>
                                        
                                    <ListGroupItem>
                                        <Row className="about-row" style={{ marginTop: '1rem'}}>Commits: </Row>
                                        <Row className="about-row" style={{ marginTop: '1rem'}}>Issues: </Row>
                                        <Row className="about-row" style={{ marginTop: '1rem'}}>Tests: </Row> 
                                    </ListGroupItem>
                                </ListGroup>
                         
                            </Card.Body>
                        </Card>
                    </p>
                </Col>
            );
        }
        )
    };

    render() {
        return (
            // <React.Fragment>
            <Container className="text-center" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Row className={"aboutMissionCard"}>
                    <Row className="text-center"><h1>Team Members</h1></Row>
                    <br></br>
                    <br></br>
                    <Row className="about text-center">
                        {
                            this.abc()
                        }
                    </Row>
                </Row>
                <br></br>
                <br></br>

                <Row className={"aboutMissionCard"}>
                    <br></br>
        <div class="container">
        
                <div style={aboutTop}>
                  <h1>Links</h1>
                </div>
          <table class="table">
            <thead>
              <tr>
                <th>link</th>
                <th>description</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class><a href="https://gitlab.com/nayan1222/covid-fighter/-/issues">GitLab Issue Tracker</a></td>
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
                <td><a href="https://covidfighter.postman.co/collections/11793543-0fe85034-5526-46f4-9eda-9faf385f0baa?version=latest&workspace=eb82f992-3f6d-4f0e-8710-bd785e3c1d2b">Postman API</a></td>
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
                <td><a href=" https://gitlab.com/nayan1222/covid-fighter/-/blob/master/tests.py">Unit Tests</a></td>
                <td>A link to unit tests on gitlab, testing our database. </td>
              </tr>
            </tbody>
          </table>
        </div>
        </Row>
        



                

            
                    <Row className="repostats" >
                        <div style={aboutStats}>
                          <div style={aboutTop}>
                            <h1>Repo Stats</h1>
                          </div>
                          <div style={aboutDown}>
                            <img src={gitlab} style={srcImg}></img>
                            <img src={issue} style={srcImg}></img>
                            <img src={test} style={srcImg}></img>
                            <Row className="about-row" style={{ marginTop: '1rem'}}>Total Commits: 187 / Total Issues: 43 / Total Tests: 0</Row>
                          </div>
                        </div> 
                    </Row>
      
                
         
                
              <div style={aboutStats}>
                <div style={aboutTop}>
                  <h1>Tools</h1>
                </div>
                <div style={aboutDown}>
                  <img src={reactIcon} style={srcImg}></img>
                  <img src={postmanIcon} style={srcImg}></img>
                  <img src={postgresIcon} style={srcImg}></img>
                  <img src={gcpIcon} style={srcImg}></img>
                  <img src={bootstrapIcon} style={srcImg}></img>
                  <img src={flaskIcon} style={srcImg}></img>
                </div>
              </div> 

   

             

            </Container>

        );
    }
}
const srcImg = {
  width: '100px',
  height: '100px',
  margin: '10px'
  
}

const aboutStats = {
  color: 'white',
  display: 'inline-block',
  margin: '30px',
  borderRadius: '3px'

}

const aboutTop = {
  textAlign: 'center',
  borderBottom: 'solid rgb(53, 53, 53)',
  borderWidth: '1px',
  borderRadius: '3px',
  padding: '10px'
}

const aboutDown = {
  margin: '10px',
  textAlign: 'center',
  padding: '10px'
}



export default About;

