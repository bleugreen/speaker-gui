import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import { Layout } from 'antd';

import colorTheme from './components/themes';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import PaletteManager from './components/PaletteManager';
import MidiManager from './components/MidiManager';
import SceneList from './components/SceneList';
import Scene from './components/Scene';

import 'antd/dist/antd.css'
import './App.css'
const theme = colorTheme();
const { Content } = Layout;


class App extends Component {
  render() {
    return (
      <Layout className="layout">
          <Navbar theme={theme}/>
          <Content className="content">
            <Switch>
              <Route path="/scene/:sid"><Scene theme={theme}/></Route>
              <Route exact path="/"><Redirect to="/list"/></Route>
              <Route path="/list"><SceneList/></Route>
              <Route path="/palettes" component={PaletteManager}/>
              <Route path="/midi" component={MidiManager}/>
              <Route path="/scene"><Redirect to="/list"/></Route>
              <Route path="*" component={NotFound}/>
            </Switch>
          </Content>
      </Layout> 
    )
  }
}

export default App;