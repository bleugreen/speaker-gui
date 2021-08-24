import { Col, Collapse, Row, Menu, Space, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

import SceneListItem from './scenelistitem'

import './style.css';


function SceneList({theme}){
    const [active, setActive] = useState('list');
    const [scenes, setScenes] = useState([]);
    const [loading, setLoading] = useState(true);

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
            setScenes([response.data]);
        })
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
        for (const s in scenes){
            sceneList.push(<SceneListItem theme={theme} key={s} sid={s} active={active} setActive={setActive} />)
        }
        return sceneList
    }

    if(loading) return <Spin/>;
    return (
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor:theme.bg, }}>
            {renderList()}
          </div>
    );


}
export default SceneList;