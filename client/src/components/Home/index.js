import axios from 'axios';
import React, { Component } from 'react';
import SpectrumForm from '../Spectrum/spectrumform';

import './style.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode : 'none', 
      textfield: 'void',
      isLoading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.getMode()
  }

  getMode(){
    var self = this;
    this.setState({isLoading:true});
    axios.get('/mode', {
      params: {
        hash: 'spectrum',
        key: 'mode'
      }
    })
    .then(function (response) {
      console.log(response);
      self.setState({
        mode: response.data,
        isLoading: false,
      });
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }

  handleChange(event) {    
    console.log(this.state.textfield);
    this.setState({textfield: event.target.value});  
  }
  handleSubmit(event) {
    self = this
    axios.request ({
      url: '/mode',
      method: 'post',
      data: {
        hash: 'spectrum',
        key: 'mode',  
        value: self.state.textfield,
      }, 
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    this.getMode();
    event.preventDefault();
  }

  render() {
    if(this.state.isLoading){
      return <div></div>
    }

    return (
      <div>
        <h1>{this.state.mode}</h1>
        <form onSubmit={this.handleSubmit}> 
          <label for="width">{this.state.textfield} </label><br/>
          <input type="text" value={this.state.textfield} onChange={this.handleChange} /><br/>
          <input type="submit" value="Send"/><br/>
        </form>

        <SpectrumForm/>
      </div>
    )
  }
}

export default Home;