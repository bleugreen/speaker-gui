import { Col, Collapse, Row, Menu, Space, Button, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import Mode from '../Mode';
import { Layout } from 'antd';
import axios from 'axios';

import './style.css';
import LayerList from './layerlist'
import Panel from '../Panel'
import Title from 'antd/lib/typography/Title';
import NewLayerModal from './newlayermodal';
const { Header, Content } = Layout;

import Reorder, {
  reorder
} from 'react-reorder';
import { PlusCircleOutlined, PlusSquareFilled, PlusSquareOutlined, RollbackOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

function Scene({sid, theme, active, setActive}) {
  const [loading, setLoading] = useState(true);
  const [layers, setLayers] = useState([]);
  const [sceneParams, setScene] = useState({
    name: 'Default',
    desc: "Initial scene for testing",
    tags: 'Test,Util,Ambient'
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if(loading){
      init();
    }  
  });

  const init = () => {
   // get layers
   setLoading(false); 
    axios.get('/api/scene', {
    params: { sid: sid }
    })
    .then( (response) => {
    console.log(response.data);
    //setScene(response.data);

    })
    .catch( (response) => {console.log(response)});
   axios.get('/api/scene/layers', {
      params: { sid: sid }
    })
    .then( (response) => {
      console.log(response.data);
      setLayers(response.data);
      
    })
    .catch( (response) => {console.log(response)});
  }

  

  const onNotify = (msg) => {
    if(sid == active){
      // publish active {msg}
    }
  }

  const onDeleteLayer = (lid) => {
    setLayers(layers.filter(l => l != lid));
  }

  const onCreateLayer = (name, type) => {
    const index = layers.length;
    //create layer
    axios.request ({
      url: '/api/layer/new',
      method: 'post',
      data: {
        name: name,
        type: type
      }
    })
    .then(function (response) {
      // add layer to scene
      setLayers([...layers, response.data]);
      axios.request ({
        url: '/api/scene/layer',
        method: 'post',
        data: {
          sid: sid,
          index: index,  
          lid: response.data
        }
      })
      .then(function (response) {})
      .catch(function (response) { console.log(response) });
    })
    .catch(function (response) { console.log(response) });
    setModalVisible(false);
  }

  const onNewLayerClick = () => { setModalVisible(true) }
  const onNewLayerCancel = () => { setModalVisible(false) }

  const onReorder = (event, previousIndex, nextIndex) =>{
    setLayers( reorder(layers, previousIndex, nextIndex) );
    axios.request ({
      url: '/api/scene/reorder',
      method: 'post',
      data: {
        sid: sid,
        layers: reorder(layers, previousIndex, nextIndex)
      }
    })
    .then(function (response) {console.log(response)})
    .catch(function (response) { console.log(response) });
  };

  return (
    <div>
      <Button
        style={{position:'fixed', top:80, left:10}}
        type='ghost'
        href="/"
      >
        <RollbackOutlined/>
      </Button>
    <div style={{width:"90%", margin:'auto'}}>
      
      <Row>
        <Col sm={12} xs={24}> 
          <Title style={{fontFamily:"RecoletaMedium"}}>{sceneParams.name}</Title>
          <Text>{sceneParams.desc}</Text>
        </Col>
        <Col sm={12} xs={24}>
          
        </Col>
      </Row>
      <div>
        <Divider/>
        <Row justify="start" align="top">
          <Col sm={9} xs={8}>
            <Title style={{fontFamily:"RecoletaMedium"}} level={2}>Layers</Title>
            
          </Col>
          <Col sm={{span:1, offset:9}} xs={{span:1, offset:12}}>
          <Button type="ghost" onClick={onNewLayerClick}>New</Button>
          </Col>
          
        </Row>
        
        
        <Row justify="start">
          <Col sm={24} xs={24}>
          <LayerList 
              sid={sid} 
              theme={theme}
              layers={layers} 
              notify={onNotify}
              onDeleteLayer={onDeleteLayer}
              setLayers={onReorder}
            />

            
            <Divider/>
            
          </Col>
        </Row>
        
        
        
      </div>
      <div>
      
        {/* <Title>Star</Title> */}
        {/* Star Block */}
      </div>
      <NewLayerModal visible={modalVisible} onSubmit={onCreateLayer} onCancel={onNewLayerCancel} />
    </div>
    </div>
  ) 
}

export default Scene;