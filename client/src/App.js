import React, { Component } from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';

import Home from './components/Home';
import Header from './components/Header';
import NotFound from './components/NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <Home />
    )
  }
}

export default App;