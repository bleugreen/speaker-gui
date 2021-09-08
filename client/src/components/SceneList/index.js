import { Row, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SceneListItem from './scenelistitem'
import SceneFilter from './scenefilter';

import './style.css';
import MyButton from './buttonTest';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

function SceneList(){
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
        axios.get('/api/scene/paramlist')
        .then((response) =>{
            console.log(response.data);
            let sceneList = [];
            for(const[index, value] of response.data.entries()){
                const scene = {
                    sid:value.sid,
                    name:value.name,
                    tags:value.tags.split(",")
                }
                sceneList.push(scene);
            }
            setScenes(sceneList);
            setReady(true);
            // const data = response.data;
            // let sidList = [];
            // if(data.length > 1) sidList = response.data.split(",");
            // else sidList = [response.data];

            // let reqs = []
            // for (const i in sidList){
            //     reqs.push(axios.get('/api/scene/params', {params: {sid: sidList[i]}}))
                
            // }
            // axios.all(reqs)
            //     .then(axios.spread((...responses) =>{
            //         let sceneList = []; 
            //         for(const i in responses){
            //              const scene = {
            //                  sid: sidList[i],
            //                  name:responses[i].data.name,
            //                  tags:responses[i].data.tags.split(","),
            //              }
            //              sceneList.push(scene);
            //          }
            //          setScenes(sceneList);
            //          setReady(true)
            //     }))
            

        })
    }

    const history = useHistory();


    const onNewScene = () => {
        axios.get('/api/scene/duplicate', {params:{sid:'default'}})
        .then((response)=>{
          console.log(response.data)
          const newSid = response.data;
          history.push('/scene/'+newSid)
        //   getScenes()
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

    const addToFilter = (tag) => {
        if(filter.includes(tag)){
            setFilter(filter.filter(t => t!=tag));
        }
        else{
            setFilter([...filter, tag]);
        }
        
    }


    
    return  (
          <div className="background">
            <SceneFilter 
                filter={filter}
                setFilter={setFilter}
                onNewScene={onNewScene}
            />
            <Row 
                gutter={[16,16]} 
                align="middle" 
                justify="space-around"
            >
                {
                    scenes.map((scene)=>{
                        let filterCheck = true
                        for(const i in filter){ filterCheck = filterCheck && scene.tags.includes(filter[i]) }
                        if(filterCheck && ready) {
                            return <SceneListItem 
                                        sid={scene.sid} 
                                        key={scene.sid} 
                                        active={active} 
                                        filter={filter} 
                                        name={scene.name} 
                                        tags={scene.tags} 
                                        setActive={handleActive}
                                        addToFilter={addToFilter}
                                    />
                        
                        }
                        else return
                    })
                }
            </Row>
            <MyButton><PlusOutlined/></MyButton>
            <Button onClick={onNewScene}>New Scene</Button>
          </div>
    );  
    


}
export default SceneList;