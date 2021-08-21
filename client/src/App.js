import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router';
import { Col, Collapse, Row, Menu, Space, Spin } from 'antd';
import { Layout } from 'antd';

import Home from './components/Home';

import './App.css';

import Title from 'antd/lib/typography/Title';
import colorTheme from './components/themes';
import Navbar from './components/Navbar';
const { Header, Content } = Layout;
import SceneList from './components/Home/scenelist';
import NotFound from './components/NotFound';
import PaletteManager from './components/PaletteManager';
import MidiManager from './components/MidiManager';
import SceneWrapper from './components/SceneWrapper';

const theme = colorTheme();



class App extends Component {
  render() {
    return (
      <Router>   
        <Layout style={{height:"100%"}}>
          <Navbar theme={theme}/>
          <Content className="site-layout" style={{ marginTop: 64, backgroundColor:theme.bg, height:"100%" }}>
            
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/palettes">
                <PaletteManager/>
              </Route>
              <Route path="/midi">
                <MidiManager/>
              </Route>
              <Route path="/scene">
                <SceneWrapper theme={theme}/>
              </Route>
              <Route path="*">
                <NotFound/>
              </Route>
            </Switch>

          </Content>
        </Layout>  
      </Router>
    )
  }
}

export default App;