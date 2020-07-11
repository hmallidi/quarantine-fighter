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
	          </ul>
	          <div className="content">
				  <Route exact path="/" component={Home}/>
				  <Route path="/city" exact component={City}/>
				  <Route path="/drugstore" exact component={Drugstore}/>
				  <Route path="/hospital" exact component={Hospital}/>
				  <Route path="/About" exact component={About}/>
				</div>
	        </div>
	        
	    </HashRouter>



  
  

    );
  }
}
 
export default Main;