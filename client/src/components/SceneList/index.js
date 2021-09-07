import { Col, Collapse, Row, Menu, Space, Spin, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

import SceneListItem from './scenelistitem'

import './style.css';
import SceneFilter from './scenefilter';
import { ConsoleSqlOutlined } from '@ant-design/icons';


function SceneList({theme}){
    const [active, setActive] = useState(-1);
    const [scenes, setScenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        if(loading){
            getActive();
            getScenes();
            setLoading(false);
        }
    }, [scenes]);

    const getActive = () => {
        axios.get('/api/scene/active')
        .then((response) =>{
            setActive(response.data);
        })
    }

    const getScenes = () => {
        axios.get('/api/scene/list')
        .then((response) =>{
            
            const data = response.data;
            let sidList = [];
            if(data.length > 1) sidList = response.data.split(",");
            else sidList = [response.data];

            let reqs = []
            for (const i in sidList){
                reqs.push(axios.get('/api/scene/params', {params: {sid: sidList[i]}}))
                
            }
            axios.all(reqs)
                .then(axios.spread((...responses) =>{
                    let sceneList = []; 
                    for(const i in responses){
                         const scene = {
                             sid: sidList[i],
                             name:responses[i].data.name,
                             tags:responses[i].data.tags,
                         }
                         sceneList.push(scene);
                     }
                     setScenes(sceneList);
                     setReady(true)
                }))
            

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


    if(!ready) return <Spin/>
    return ready && (
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor:theme.bg, }}>
            <SceneFilter theme={theme} filter={filter} setFilter={setFilter}/>
            <Row gutter={[16,16]} align="middle" justify="space-around">
            {scenes.map((scene)=>{
                let filterCheck = true
                for(const i in filter){
                    filterCheck = filterCheck && scene.tags.includes(filter[i]);
                }
                if(filterCheck) return <SceneListItem sid={scene.sid} key={scene.sid} theme={theme} active={active} name={scene.name} setActive={handleActive}/>
                else return
            })
            }
            </Row>
            
            <Button onClick={onNewScene}>New Scene</Button>
          </div>
    );  
    


}
export default SceneList;