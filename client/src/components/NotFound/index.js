import React, { Component } from 'react';
import './style.css';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 style={{textAlign:'center', marginTop:'20px'}}>
          404 <small>Not Found :(</small>
        </h1>
      </div>
    )
  }
}

export default NotFound;