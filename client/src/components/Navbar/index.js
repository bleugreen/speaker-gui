import { Col, Collapse, Row, Menu, Space, Spin, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    useLocation
  } from "react-router-dom";

import Title from 'antd/lib/typography/Title';

const { Header, Content } = Layout;
const { Panel } = Collapse;


function Navbar({theme}) {
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState('list');
    const [open, setOpen] = useState('list');

    let location = useLocation();
    const inactiveStyle = {
        color:theme.bg
    }
    const activeStyle = {
        color:theme.headerText,
        fontWeight:"bold"
    }

    const renderLinks = () => {
        let listStyle = inactiveStyle;
        if(location.pathname == '/list') listStyle = activeStyle;

        let paletteStyle = {...inactiveStyle, marginLeft:'25px'};
        if(location.pathname == '/palettes') paletteStyle = {...activeStyle, marginLeft:'25px'};

        let midiStyle = {...inactiveStyle, marginLeft:'25px'};
        if(location.pathname == '/midi') midiStyle = {...activeStyle, marginLeft:'25px'};
        
        return(
        <Col sm={16} xs={0}>
                    <a href="/" style={listStyle}>Scenes</a>
                    <a href="/palettes" style={paletteStyle}>Palettes</a>
                    <a href="/midi" style={midiStyle}>Midi Map</a>
        </Col>
        )
    }

    useEffect(() => {
        if(loading){
          setLoading(false);
        }
          
        // SSE - keeps track of whether pi is connected / running
        let eventSource = new EventSource("http://localhost:3000/api/util/stream")
        eventSource.onmessage = e => {
          var msg = e.data.split(":");
          if(msg.length > 0){
            console.log(msg);
            if(msg[0] == "connected"){
              setConnected(msg[1]=="true");
            }
            if(msg[0] == "running"){
              console.log(msg[1]=="true");
              setRunning(msg[1]=="true");
            }
          }
          
        }
    }, []);

    return(
        <Header 
          style={{ 
            position: 'fixed', 
            zIndex: 1, 
            width: '100%', 
            textAlign:"left",
            backgroundColor:theme.header
          }}
        >
          <Row justify="start" align="middle">
            <Col xl={4} lg={5} md={6} sm={8} xs={0}>
              <Title level={2}style={{marginTop:'10px', color:theme.headerText, fontFamily:"RecoletaBold"}}>Cymatism</Title>
            </Col>
            <Col sm={0} xs={24}>
            <a href="/">
              <Title level={1}style={{marginTop:'10px', color:theme.headerText, fontFamily:"RecoletaBold", textAlign:'center'}}>Cymatism</Title>
              </a>
            </Col>
            {renderLinks()}
          </Row>
        </Header>
    )
}

export default Navbar;