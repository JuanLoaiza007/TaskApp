import React, { Component } from "react";

class Navigation extends Component {
  render () {
    const { appName, showenVersion, tasksCount, logo} = this.props;

    return(
      <nav className="navbar navbar-dark bg-dark">
        <h4 className='text-white me-auto'>
          {appName + " v"+ showenVersion}          
        </h4> 
        <p className="text-white m-2">Cantidad: </p>
        <span className='badge rounded-pill bg-light text-dark'>
          {tasksCount}
        </span>
        <img src={logo} className="App-logo" alt="logo" />
      </nav> 
    );
  }
}

export default Navigation;