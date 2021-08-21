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

  const renderScene = () => {
    if(open=='list'){
      return <SceneList theme={theme} setActive={(handleActive)} setOpen={setOpen} active={active} />
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

        
        
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor:theme.bg, }}>
            {renderScene()}
          </div>
  );
  
};

export default Home;