import { Col, Collapse, Row, Menu, Space, Spin, Divider, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';
import {
    useLocation
  } from "react-router-dom";

import Title from 'antd/lib/typography/Title';
import NavLink from './navlink';

import "./style.css"

const { Header, Content } = Layout;


function Navbar({theme}) {
    const [loading, setLoading] = useState(true);
    const [connected, setConnected] = useState(false);
    const [running, setRunning] = useState(false);

    useEffect(()=>{
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
    }, [])


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

    const killPressed = () => {
        axios.request ({ url: '/api/util/end', method: 'post' })
          .then(function (response) {})
          .catch(function (response) { console.log(response) });
    }

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
          <Row justify="space-between" align="middle">
            <Col xl={4} lg={5} md={6} sm={8} xs={0}>
              <Title level={2}style={{textAlign:'left',marginTop:'10px', color:theme.headerText, fontFamily:"RecoletaBold"}}>Cymatism</Title>
            </Col>
            <Col sm={0} xs={14}>
            <a href="/">
              <Title level={1}style={{marginTop:'10px', color:theme.headerText, fontFamily:"RecoletaBold", textAlign:'center'}}>Cymatism</Title>
              </a>
            </Col>
            <Col sm={10} xs={0}>
                    <NavLink to="/list" theme={theme} marginLeft="0">Scenes</NavLink>
                    <NavLink to="/palettes" theme={theme} marginLeft="25px">Palettes</NavLink>
                    <NavLink to="/midi" theme={theme} marginLeft="25px">Midi Map</NavLink>
            </Col>
            <Col sm={3} xs={6}>
                <Button type='ghost' style={{color:theme.headerText}} onClick={killPressed}>Kill Lights</Button>
            </Col>
          </Row>
        </Header>
    )
}

export default Navbar;