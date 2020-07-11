import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Grocery from "./Grocery";
import Restaurant from "./Restaurant";
import Healthcare from "./Healthcare";
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
	            <li><NavLink exact to="/Grocery">Grocery</NavLink></li>
	            <li><NavLink exact to="/Restaurant">Restaurant</NavLink></li>
	            <li><NavLink exact to="/Healthcare">Healthcare</NavLink></li>
	            <li><NavLink exact to="/About">About</NavLink></li>
	            <li><NavLink exact to="/Group3">Group3</NavLink></li>
	          </ul>
	          <div className="content">
				  <Route exact path="/" component={Home}/>
				  <Route path="/Grocery" exact component={Grocery}/>
				  <Route path="/Restaurant" exact component={Restaurant}/>
				  <Route path="/Healthcare" exact component={Healthcare}/>
				  <Route path="/Group3" exact component={Group3}/>
				</div>
	        </div>
	        
	    </HashRouter>



  
  

    );
  }
}
 
export default Main;