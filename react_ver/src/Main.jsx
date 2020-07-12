import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import City from "./City";
import Drugstore from "./Drugstore";
import Hospital from "./Hospital";
import About from "./About";
import Group3 from "./Group3";
 
class Main extends Component {
  render() {
    return (
    	<HashRouter>
	        <div>
	        <h1>COVID	FIGHTER</h1>
	          <ul className="header">
	            <li><NavLink exact to="/">Home</NavLink></li>
	            <li><NavLink exact to="/city">City</NavLink></li>
	            <li><NavLink exact to="/drugstore">Drugstore</NavLink></li>
	            <li><NavLink exact to="/hospital">Hospital</NavLink></li>
	            <li><NavLink exact to="/About">About</NavLink></li>
	            <li><NavLink exact to="/Group3">Group3</NavLink></li>
	          </ul>
	          <div className="content">
				  <Route exact path="/" component={Home}/>
				  <Route exact path="/city" exact component={City}/>
				  <Route exact path="/drugstore" exact component={Drugstore}/>
				  <Route exact path="/hospital" exact component={Hospital}/>
				  <Route exact path="/About" exact component={About}/>
				  <Route exact path="/Group3" exact component={Group3}/>
				</div>
	        </div>
	        
	    </HashRouter>



  
  

    );
  }
}
 
export default Main;