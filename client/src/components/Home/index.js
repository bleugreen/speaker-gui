import { Col, Collapse, Row, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import Mode from '../Mode';
import { Layout } from 'antd';
import axios from 'axios';

import './style.css';
import LayerList from './layerlist'
const { Header, Content } = Layout;
const { Panel } = Collapse;

function Home() {
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(loading){
      getActive();
      setLoading(false);
    }  
  });

  const callback = key => {
    console.log(key);
  }

  const handleActive = (id) => {
    if(id !== active){
      console.log("active = "+id);
      setActive(id);
      axios.request({
        url: '/api/active',
        method: 'post',
        data: {
            id: id  
        }, 
      })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    }
  }

  const getActive = () => {
    axios.get('/api/active', {})
    .then(function (response) {
        setActive(response.data);
        console.log("ActiveMode: "+response.data);
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }

  const modelist = () => {
    if(!loading){
      return (
        <div>
          <Mode mid="0" active={active} setActive={handleActive}/>
        </div>
      )
    }
  }

  return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item>
              Cymatism
            </Menu.Item>

          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <LayerList />
          </div>
        </Content>
      </Layout>
  );
  
};

export default Home;