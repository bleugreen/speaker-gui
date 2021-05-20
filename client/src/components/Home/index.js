import { Col, Collapse, Row, Menu, Space, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import Mode from '../Mode';
import { Layout } from 'antd';
import axios from 'axios';

import './style.css';
import Scene from '../Scene';
import SystemMenu from './systemMenu';


import Title from 'antd/lib/typography/Title';
import SceneList from './scenelist';
import colorTheme from '../themes';
const { Header, Content } = Layout;
const { Panel } = Collapse;

function Home() {
  const [connected, setConnected] = useState(false);
  const [running, setRunning] = useState(false);
  const [layout, setLayout] = useState('lr');
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('list');
  const [open, setOpen] = useState('list');
  const [theme, setTheme] = useState(colorTheme('light'));

  useEffect(() => {
      if(loading){
        init();
        console.log(theme.red);
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

  const init = () => {
    // get connected
    axios.get('/api/util/connected', {})
    .then(function (response) {
      setConnected(response.data);
      axios.get('/api/util/running', {})
      .then(function (response) {
        setRunning(response.data);
        axios.get('/api/util/layout', {})
        .then(function (response) {
          setLayout(response.data);
          axios.get('/api/scene/active', {})
          .then(function (response) {
            setActive(response.data);
            setLoading(false);
          })
          
        })
        .catch(function (response) {console.log(response)});
      })
      .catch(function (response) {console.log(response)});
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }

  const onShutdown = () => {
    axios.request ({
      url: '/api/util/shutdown',
      method: 'post',
      data: { sid: 0 }
    })
    .then(function (response) {console.log(response)})
    .catch(function (response) { console.log(response) });
  }
  const onReboot = () => {
    axios.request ({
      url: '/api/util/reboot',
      method: 'post',
      data: { sid: 0 }
    })
    .then(function (response) {console.log(response)})
    .catch(function (response) { console.log(response) });
  }
  const onStart = () => {
    axios.request ({
      url: '/api/util/start',
      method: 'post',
      data: { sid: 0 }
    })
    .then(function (response) {console.log(response)})
    .catch(function (response) { console.log(response) });
  }
  const onEnd = () => {
    axios.request ({
      url: '/api/util/end',
      method: 'post',
      data: { sid: 0 }
    })
    .then(function (response) {console.log(response)})
    .catch(function (response) { console.log(response) });
  }

  const updateLayout = (data) => {
    setLayout(data);
    axios.request ({
      url: '/api/util/layout',
      method: 'post',
      data: { layout: data }
    })
    .then(function (response) {console.log(response)})
    .catch(function (response) { console.log(response) });
  }

  const renderScene = () => {
    if(open=='list'){
      return <SceneList theme={theme} setActive={handleActive} setOpen={setOpen} active={active} />
    }
    else{
      return <Scene theme={theme} sid={open} setActive={setOpen}/>
    }
  }

  const handleActive = (sid) => {
    setActive(sid);
    axios.request ({
      url: '/api/scene/active',
      method: 'post',
      data: { sid: sid }
    })
    .then(function (response) {console.log(response)})
    .catch(function (response) { console.log(response) });
  }

  if(loading) return <Spin/>;
  return (
      <Layout style={{height:"100%"}}>
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
            <Col sm={8} xs={14}>
              <Title level={2}style={{color:theme.headerText, fontFamily:"RecoletaBold"}}>Cymatism</Title>
            </Col>
            <Col sm={3} xs={6}>
              <SystemMenu 
                theme={theme}
                running={running} 
                connected={connected} 
                layout={layout} 
                setLayout={updateLayout} 
                start={onStart}
                end={onEnd}
                shutdown={onShutdown}
                reboot={onReboot}
                style={{marginLeft:"auto", textAlign:"right"}}
              />
            </Col>
          

          </Row>
          
        </Header>
        <Content className="site-layout" style={{ marginTop: 64, backgroundColor:theme.bg, height:"100%" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor:theme.bg, }}>
            {renderScene()}
          </div>
        </Content>
      </Layout>
  );
  
};

export default Home;