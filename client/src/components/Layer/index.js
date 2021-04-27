import { DashboardOutlined, DashboardTwoTone, DeleteOutlined, InteractionFilled, PictureOutlined, PictureTwoTone, SettingOutlined, SettingTwoTone, SlidersOutlined, SlidersTwoTone } from '@ant-design/icons';
import { Button, Col, Divider, Input, Row, Space, Spin, Tooltip, Typography } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import ReactTooltip from 'react-tooltip';

import Mode from '../Mode';

const { Title, Text } = Typography;

import './style.css';
import ColorBlock from '../Color';
import ColorPreview from './colorPreview';
import LayerBody from './layerbody';
import LayerListItem from './layerListItem';
import Modal from 'antd/lib/modal/Modal';


function Layer({sid, lid, onExpand, onDeleteLayer}){
    const [isExpanded, setIsExpanded] = useState(false);
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
        visible:true
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
                sid:layer.sid,
                lid:layer.lid,
                pos:response.data.pos.toString().split(","),
                visible: (response.data.visible=='true'),
                colors:[],
                loading:false
            };
            console.log(initLayer);
            setLayer(initLayer);
            getColors(response.data.pid);
        })
        .catch( (response) => {console.log(response)});
    }
    
/* - - - - - - - - - - - - - - - - 
    Expand
- - - - - - - - - - - - - - - - */
    const handleExpand = () => {
        onExpand(layer.lid);
        setIsExpanded(!isExpanded);
    };


    const getColors = (pid) => {
        axios.get('/api/palette/colors', {
            params: {pid: pid}
        })
        .then((response) =>{
            setLayer((layer)=>({
                ...layer,
                colors:response.data
            }));
        })
    }

    const notify = (field, value) => {
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
        getColors(pid);
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

    const onRename = () => {
        setRenaming(true);
    }
    const onRenameComplete = (name) => {
        setLayer({
            ...layer,
            name:name
        });
        axios.request ({
            url: '/api/layer/name',
            method: 'post',
            data: {
                lid: layer.lid,
                name: name,
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
        setRenaming(false);
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

    const setOpacity = (opacity) => {
        setLayer({...layer, opacity:opacity});
        axios.request ({
            url: '/api/layer/opacity',
            method: 'post',
            data: {
                lid: layer.lid,
                opacity: opacity,
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
    }

    const setPos = (pos) => {
        setLayer({...layer, pos:pos});
        axios.request ({
            url: '/api/layer/pos',
            method: 'post',
            data: {
                lid: layer.lid,
                pos: pos.toString(),
            }, 
        })
        .then((response) => {console.log(response)})
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
        pos: setPos,
        opacity: setOpacity,
        pid: setPid,
        pos: setPos,
        layout: (e)=>{setField('layout', e.target.value)},
        pattern: (pat)=>{setField('pattern', pat)},
        direction: (e)=>{setField('direction', e.target.value)},
        tile: (t)=>{setField('tile', t)}  
    };


    const titleStyle = { textAlign:"left" };
    if(layer.loading) return <Spin/>
    return(
        <div className="collapse">
            <ReactTooltip/>
            <div className="collapse-head">   
                {/* listitem title type colors onExpand onRename */}
                <LayerListItem 
                    layer={layer} 
                    onExpand={handleExpand} 
                    onRename={onRenameComplete} 
                    renaming={renaming}
                    setVisible={setVisible}
                />
            </div>
                <Modal
                    centered
                    visible={isExpanded}  
                    onOk={handleExpand}
                    onCancel={handleExpand}
                    width={1000}  
                    footer={[
                        <Tooltip title="Delete Layer" placement="left"><Button onClick={onDelete}><DeleteOutlined/></Button></Tooltip>
                    ]}
                >
                    <LayerBody layer={layer} setters={setters} notify={notify}/>
                </Modal>
        </div>
    )
    

}
export default Layer;