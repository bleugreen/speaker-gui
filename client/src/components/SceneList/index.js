import { Col, Collapse, Row, Menu, Space, Spin, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

import SceneListItem from './scenelistitem'

import './style.css';


function SceneList({theme}){
    const [active, setActive] = useState(-1);
    const [scenes, setScenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        if(loading){
            getActive();
            getScenes();
            setLoading(false);
        }
    }, []);

    const getActive = () => {
        axios.get('/api/scene/active')
        .then((response) =>{
            setActive(response.data);
        })
    }

    const getScenes = () => {
        axios.get('/api/scene/list')
        .then((response) =>{
            console.log(response.data)
            const data = response.data;
            if(data.length > 1) setScenes(response.data.split(","));
            else setScenes([response.data]);
        })
    }

    const onNewScene = () => {
        axios.get('/api/scene/duplicate', {params:{sid:'default'}})
        .then((response)=>{
          console.log(response.data)
          const newSid = response.data;
          setScenes([...scenes, newSid]);
        })
        .catch(function (response) { console.log(response) });
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

    const renderList = () => {
        let sceneList = []
        for (const i in scenes){
            console.log('pushing: '+scenes[i])
            sceneList.push(
                <SceneListItem 
                    theme={theme} 
                    key={scenes[i]} 
                    sid={scenes[i]} 
                    active={active} 
                    setActive={handleActive} 
                    filter={filter}
                />
            )
        }
        return sceneList
    }

    if(loading) return <Spin/>;
    return (
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor:theme.bg, }}>
            <Row gutter={[16,16]} align="middle" justify="space-around">
            {renderList()}
            </Row>
            
            <Button onClick={onNewScene}>New Scene</Button>
          </div>
    );


}
export default SceneList;