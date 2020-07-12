import React, { Component } from "react";
import {Link } from "react-router-dom";
 
class UnitTests extends Component {
  render() {
    return (
      <main>
      <div>
      <h1>Result of Executing Unit Tests</h1>
      <p className="lead">
      .........

      ----------------------------------------------------------------------

      Ran 9 tests in 1.086s

      OK
      </p>
      </div>
     
    </main>
  
    );
  }
}
 
export default UnitTests;