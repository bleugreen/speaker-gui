import { Col, Row, Space, Button, Divider, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Reorder, { reorder } from 'react-reorder';
import { RollbackOutlined } from '@ant-design/icons';

import './style.css';
import LayerList from './layerlist'
import Title from 'antd/lib/typography/Title';
import NewLayerModal from './newlayermodal';
import TagList from './taglist';
import DuplicateButton from './duplicateModal';
import ActiveButton from '../ActiveButton';
import RenamableTitle from '../Renamable/title';
import RenamableText from '../Renamable/text';


function Scene({theme}) {
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const [layers, setLayers] = useState([]);
  const [sceneParams, setScene] = useState({
    name: 'Default',
    desc: "Initial scene for testing",
    tags: 'Test,Util,Ambient'
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [active, setActive] = useState(-1);

  let { sid } = useParams();

  useEffect(() => {
    if(loading){
      init();
      setLoading(false);
    }  
  });

  const init = () => {
      axios.get('/api/scene', {
      params: { sid: sid }
      })
      .then( (response) => {
        console.log(response.data);
        setScene(response.data);
        setLayers(response.data.layers);
        axios.get('/api/scene/active')
        .then((response) => {
          console.log("active:"+(response.data==sid));
          setActive(response.data);
          setReady(true);
        })
        
      })
      .catch( (response) => {console.log(response)});
  }

  const onActive = (val) => {
    axios.request ({
      url: '/api/scene/active',
      method: 'post',
      data: {
        sid: val,
      }
    })
    .then(function (response) {
      console.log(response);
      setActive(val)
    })
    .catch(function (response) { console.log(response) });
  }

  const onDuplicate = (name) => {
    axios.get('/api/scene/duplicate', {params:{sid:sid}})
    .then((response)=>{
      console.log(response.data)
      const newSid = response.data;
      axios.request ({
        url: '/api/scene/field',
        method: 'post',
        data: {
          sid: newSid,
          field: 'name',  
          value: name
        }
      })
      .then(function (response) {})
      .catch(function (response) { console.log(response) });
    })
  }

  const onDelete = () => {
    if(sid != 0)
    {
      axios.request ({
        url: '/api/scene/',
        method: 'delete',
        data: {
          sid: sid,
        }
      })
      .then(function (response) {console.log(response)})
      .catch(function (response) { console.log(response) });
      if(active == sid){
        axios.request ({
          url: '/api/scene/active',
          method: 'post',
          data: {
            sid: -1,
          }
        })
        .then(function (response) {console.log(response)})
        .catch(function (response) { console.log(response) });
      }
    }
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

  const setField = (field, value) => {
    setScene({
      ...sceneParams,
      [field]: value
    });
    axios.request ({
      url: '/api/scene/field',
      method: 'post',
      data: {
        sid: sid,
        field: field,  
        value: value
      }
    })
    .then(function (response) {})
    .catch(function (response) { console.log(response) });

  }


  const onNewLayerClick = () => { setModalVisible(true) }
  const onNewLayerCancel = () => { setModalVisible(false) }
  
  const onSetName = (name) => { setField('name', name) }
  const onSetDesc = (desc) => { setField('desc', desc) }

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

  if(!ready){
    return <div></div>
  }

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor:theme.bg}}>
      <Link to="/list">
      <Button style={{position:'fixed', top:80, left:10}} type='ghost'>
        <RollbackOutlined/>
      </Button>
      </Link>
    <div style={{width:"90%", margin:'auto'}}>
      
      <Row>
        <Col sm={12} xs={24}> 
        <RenamableTitle theme={theme} text={sceneParams.name} onSubmit={onSetName}/>
         <RenamableText theme={theme} text={sceneParams.desc} onSubmit={onSetDesc}/>
          <TagList theme={theme} tags={sceneParams.tags.split(',')} setTags={(tags)=>{setField('tags',tags)}}/>
        </Col>
        <Col sm={12} xs={24}>
          
        </Col>
      </Row>
      <div >
        <Divider/>
        <Row justify="start" align="top">
          <Col sm={9} xs={8}>
            <Title  style={{fontFamily:"RecoletaMedium"}} level={2}>Layers</Title>
            
          </Col>
          <Col sm={{span:1, offset:9}} xs={{span:1, offset:12}}>
          
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
            <div style={{float:'right'}}>
            <ActiveButton theme={theme} sid={sid} active={active} setActive={onActive} />
            <Button type="ghost" style={{marginLeft:'10px',borderColor:theme.text2}}onClick={onNewLayerClick}>New Layer</Button>
            <DuplicateButton name={sceneParams.name} theme={theme} onDuplicate={onDuplicate} margin="10px"/>
            <Link to="/list"><Button type="ghost" style={{ marginLeft:'10px',borderColor:theme.text2}} onClick={onDelete}>Delete Scene</Button></Link>
            
            </div>
            
          </Col>
        </Row>
      </div>
      <div>
      </div>
      <NewLayerModal visible={modalVisible} onSubmit={onCreateLayer} onCancel={onNewLayerCancel} />
    </div>
    </div>
  ) 
}

export default Scene;