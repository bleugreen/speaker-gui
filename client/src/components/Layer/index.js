import { DashboardOutlined, DashboardTwoTone, DeleteOutlined, InteractionFilled, PictureOutlined, PictureTwoTone, SettingOutlined, SettingTwoTone, SlidersOutlined, SlidersTwoTone } from '@ant-design/icons';
import { Button, Col, Divider, Input, Row, Space, Spin, Tooltip, Typography } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import ReactTooltip from 'react-tooltip';


const { Title, Text } = Typography;

import './style.css';
import ColorBlock from '../Color';
import ColorPreview from './colorPreview';
import LayerBody from './layerbody';
import LayerListItem from './layerListItem';
import Modal from 'antd/lib/modal/Modal';
import GraphIcon from './icon/graph';

function Layer({sid, lid, theme, onDeleteLayer}){
    const [isExpanded, setExpanded] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const [body, setBody] = useState("collapse-body-hide");
    const [layer, setLayer] = useState({
        sid:sid,
        lid:lid,
        name:"",
        type:"",
        pid:"0",
        layout:"both",
        colors:[],
        loading:true,
        visible:true,
        graphdir: 'up',
        start: 'left',
        align: 'base',
        mirrorx: false,
        mirrory: false

    })

    useEffect(() =>{
        if(layer.loading){
            init();
        }
    });

    const init = () =>{
        
        axios.get('/api/layer/', {
            params: { lid: lid }
        })
        .then( (response) => {
            const initLayer = {
                ...response.data,
                pos:response.data.pos.toString().split(","),
                visible: (response.data.visible=='true'),
                colors:response.data.colors.toString(),
                loading:false
            };
            console.log(initLayer);
            setLayer({...layer, ...initLayer});
            //getColors(response.data.pid);
        })
        .catch( (response) => {console.log(response)});
    }

    const handleExpand = () => {
        setExpanded(!isExpanded);
    };


    const getColors = (pid) => {
        axios.get('/api/palette/', {
            params: {name: pid}
        })
        .then((response) =>{
            console.log(response.data)
            const colorlist = response.data.split(",")
            // setLayer({
            //     ...layer,
            //     colors: colorlist
            // })
        })
    }

    const notify = (field, value) => {
        // if(field == 'pid'){
        //     getColors(value);
        // }
        axios.request ({
            url: '/api/layer/notify',
            method: 'post',
            data: {
                lid: layer.lid,
                field: field,
                value: value
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
    }

    const setPid = (pid) => {
        console.log("New Pid: "+pid);
        setLayer({
            ...layer,
            pid:pid
        });
        
        axios.request ({
            url: '/api/layer/pid',
            method: 'post',
            data: {
                lid: layer.lid,
                pid: pid,
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
    }


    const onDelete = () => {
        axios.delete('/api/layer/', { data: { lid:layer.lid }})
        .then((response) => {
            axios.delete('/api/scene/layer', {
                data:{ lid:layer.lid, sid:layer.sid }
            })
            .then((response) => { onDeleteLayer(layer.lid)})
            .catch((response) =>{ console.log(response) });
        })
        .catch((response) =>{ console.log(response) });
    }

    const setVisible = () => {
        const newVis = !layer.visible;
        setLayer((layer)=>({...layer, visible:newVis}));
        axios.request ({
            url: '/api/layer/field',
            method: 'post',
            data: {
                lid: layer.lid,
                field: 'visible',
                value: newVis
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
    }



    const setField = (field, value) => {
        setLayer((layer)=>({...layer,[field]:value}));
        axios.request ({
            url: '/api/layer/field',
            method: 'post',
            data: {
                lid: layer.lid,
                field: field,
                value: value
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
    }
    const setters = {
        opacity: (t)=>{setField('opacity', t)},
        pid: setPid,
        pos: (t)=>{setField('pos', t)},
        layout: (e)=>{setField('layout', e.target.value)},
        tile: (t)=>{setField('tile', t)},
        palette: (p)=>{setField('colors',p)},
        name: (n)=>{setField('name',n)},
        
        pattern: (pat)=>{setField('pattern', pat)},
        direction: (e)=>{setField('direction', e.target.value)},
        
        start: (s)=>{setField('start', s)},
        align: (a)=>{setField('align', a)},
        graphdir: (a)=>{setField('graphdir', a)},
        mirrorx: (m)=>{setField('mirrorx', m)},
        mirrory: (m)=>{setField('mirrory', m)},
        visible: () => {setVisible()},

        flex: (t)=>{setField('flex', t)},
        v0: (t)=>{setField('v0', t)},
        l0: (t)=>{setField('l0', t)},
        a: (t)=>{setField('a', t)},
        numdrops: (t)=>{setField('numdrops', t)},
        spawn: (t)=>{setField('spawn', t)},
        time: (t)=>{setField('time', t)},
        angle: (t)=>{setField('angle', t)},
        size: (t)=>{setField('size', t)},
        
    };


    const titleStyle = { textAlign:"left" };
    if(layer.loading) return <Spin/>
    return(
        <div >
            <ReactTooltip/>
  
                {/* listitem title type colors onExpand onRename */}
                <LayerListItem 
                    layer={layer} 
                    onExpand={handleExpand} 
                    setVisible={setVisible}
                    theme={theme}
                />
                <LayerBody 
                    theme={theme} 
                    layer={layer} 
                    setters={setters} 
                    notify={notify}
                    expanded={isExpanded}
                    handleExpand={handleExpand}
                    onDelete={onDelete}
                />
        </div>
    )  
    

}
export default Layer;