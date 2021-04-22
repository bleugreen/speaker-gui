import { Col, Collapse, Row, Menu, Space, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import Mode from '../Mode';
import { Layout } from 'antd';
import axios from 'axios';

import './style.css';
import Scene from '../Scene';
import SystemMenu from './systemMenu';


import Title from 'antd/lib/typography/Title';
const { Header, Content } = Layout;
const { Panel } = Collapse;

function Home() {
  const [connected, setConnected] = useState(false);
  const [running, setRunning] = useState(false);
  const [layout, setLayout] = useState('lr');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      if(loading){
        init();
      }
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
          setLoading(false);
        })
        .catch(function (response) {console.log(response)});
      })
      .catch(function (response) {console.log(response)});
    }).catch(function (response) {
      //handle error
      console.log(response);
    });

    // get running

    // get layout


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

  const meta = {
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  };
  if(loading) return <Spin/>;
  return (
      <Layout>
        <Header 
          style={{ 
            position: 'fixed', 
            zIndex: 1, 
            width: '100%', 
            textAlign:"left" 
          }}
        >
          <Row justify="space-between" align="middle">
            <Col sm={8} xs={14}>
              <Title level={2}style={{color:"white", fontFamily:"RecoletaBold"}}>Cymatism</Title>
            </Col>
            <Col sm={3} xs={6}>
              <SystemMenu 
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
        <Content theme="dark" className="site-layout" style={{ marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
            <Scene sid="0" />
          </div>
        </Content>
      </Layout>
  );
  
};

export default Home;