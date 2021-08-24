import React, { Component } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Redirect, Route } from 'react-router';
import { Col, Collapse, Row, Menu, Space, Spin } from 'antd';
import { Layout } from 'antd';



import './App.css';

import Title from 'antd/lib/typography/Title';
import colorTheme from './components/themes';
import Navbar from './components/Navbar';
const { Header, Content } = Layout;
import NotFound from './components/NotFound';
import PaletteManager from './components/PaletteManager';
import MidiManager from './components/MidiManager';
import SceneWrapper from './components/SceneWrapper';
import SceneList from './components/SceneList';
import Scene from './components/Scene';

const theme = colorTheme();



class App extends Component {
  render() {
    return (

      <Layout style={{height:"100%"}}>
          <Navbar theme={theme}/>
         
        
          <Content className="site-layout" style={{ marginTop: 64, backgroundColor:theme.bg, height:"100%" }}>
            
            <Switch>
              <Route path="/scene/:sid">
                <Scene theme={theme}/>
              </Route>

              <Route exact path="/">
                <Redirect to="/list"/>
              </Route>

              <Route path="/list">
                <SceneList theme={theme} />
              </Route>
                
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