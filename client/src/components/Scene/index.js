import { Col, Collapse, Row, Menu, Space, Button, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import Mode from '../Mode';
import { Layout } from 'antd';
import axios from 'axios';

import './style.css';
import LayerList from './layerlist'
import Title from 'antd/lib/typography/Title';
import NewLayerModal from './newlayermodal';
const { Header, Content } = Layout;
const { Panel } = Collapse;
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable
} from 'react-reorder';

function Scene({sid, name, active}) {
  const [loading, setLoading] = useState(true);
  const [layers, setLayers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if(loading){
      init();
    }  
  });

  const init = () => {
   // get layers
   setLoading(false); 
   axios.get('/api/scene/layers', {
      params: { sid: sid }
    })
    .then( (response) => {
      console.log(response.data);
      setLayers(response.data);
      
    })
    .catch( (response) => {console.log(response)});
  }

  // const callback = key => {
  //   console.log(key);
  // }

  // const handleActive = (id) => {
  //   if(id !== active){
  //     console.log("active = "+id);
  //     setActive(id);
  //     axios.request({
  //       url: '/api/active',
  //       method: 'post',
  //       data: {
  //           id: id  
  //       }, 
  //     })
  //     .then(function (response) {
  //       //handle success
  //       console.log(response);
  //     })
  //     .catch(function (response) {
  //       //handle error
  //       console.log(response);
  //     });
  //   }
  // }

  // const getActive = () => {
  //   axios.get('/api/active', {})
  //   .then(function (response) {
  //       setActive(response.data);
  //       console.log("ActiveMode: "+response.data);
  //   }).catch(function (response) {
  //     //handle error
  //     console.log(response);
  //   });
  // }

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
      .then(function (response) {
      
      })
      .catch(function (response) { console.log(response) });
    })
    .catch(function (response) { console.log(response) });
    setModalVisible(false);
  }

  const onNewLayerClick = () => { setModalVisible(true) }
  const onNewLayerCancel = () => { setModalVisible(false) }

  const onReorder = (event, previousIndex, nextIndex) =>{
    setLayers( reorder(layers, previousIndex, nextIndex) );
};

  return (
    <div>
      <div>
        {/* <Title>General</Title> */}
        {/* GeneralBlock */}
      </div>
      <div>
        <Title>Layers</Title>
        <LayerList 
          sid={sid} 
          layers={layers} 
          notify={onNotify}
          onDeleteLayer={onDeleteLayer}
          setLayers={onReorder}
        />
        <Divider/>
        <Button type="default" size="large" onClick={onNewLayerClick}>New Layer</Button>
      </div>
      <div>
        {/* <Title>Star</Title> */}
        {/* Star Block */}
      </div>
      <NewLayerModal visible={modalVisible} onSubmit={onCreateLayer} onCancel={onNewLayerCancel} />
    </div>
  ) 
}

export default Scene;