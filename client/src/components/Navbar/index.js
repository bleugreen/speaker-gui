import { Col, Collapse, Row, Menu, Space, Spin, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

import Title from 'antd/lib/typography/Title';

const { Header, Content } = Layout;
const { Panel } = Collapse;


function Navbar({theme}) {
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState('list');
    const [open, setOpen] = useState('list');

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
            <Col md={6} sm={8} xs={0}>
              <Title level={2}style={{marginTop:'10px', color:theme.headerText, fontFamily:"RecoletaBold"}}>Cymatism</Title>
            </Col>
            <Col sm={0} xs={24}>
            <a href="/">
              <Title level={1}style={{marginTop:'10px', color:theme.headerText, fontFamily:"RecoletaBold", textAlign:'center'}}>Cymatism</Title>
              </a>
            </Col>
            <Col sm={16} xs={0}>
                    <a href="/" style={{marginLeft:'0px',color:theme.bg}}>Scenes</a>
                    <a href="/palettes" style={{marginLeft:'25px',color:theme.bg}}>Palettes</a>
                    <a href="/midi" style={{marginLeft:'25px',color:theme.bg}}>Midi Map</a>
            </Col>
          </Row>
        </Header>
    )
}

export default Navbar;