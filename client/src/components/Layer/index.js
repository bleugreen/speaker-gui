import { DashboardOutlined, DashboardTwoTone, InteractionFilled, PictureOutlined, PictureTwoTone, SettingOutlined, SettingTwoTone, SlidersOutlined, SlidersTwoTone } from '@ant-design/icons';
import { Button, Col, Divider, Input, Row, Space, Spin, Typography } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';

import Mode from '../Mode';

const { Title, Text } = Typography;

import './style.css';
import ColorBlock from '../Color';
import ColorPreview from './colorPreview';
import LayerBody from './layerbody';


function Layer({sid, lid, expanded, onExpand, onDeleteLayer}){
    const [name, setName] = useState(lid);
    const [nameInput, setNameInput] = useState("");
    const [type, setType] = useState("spectrum");
    const [pid, setPid] = useState("0");
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [renaming, setRenaming] = useState(false);
    const [body, setBody] = useState("collapse-body-hide");

    useEffect(() =>{
        if(loading){
            init();
        }
        
        if(lid == expanded){
            setIsExpanded(true);
            setBody("collapse-body");
        }
        else{
            setIsExpanded(false);
            setBody("collapse-body-hide");
        }
    }, [expanded]);

    const init = () =>{
        
        axios.get('/api/layer/', {
            params: { lid: lid }
        })
        .then( (response) => {
            setName(response.data.name);
            setPid(response.data.pid);
            refreshColors(response.data.pid);
            setType(response.data.type);
            
            setLoading(false);
        })
        .catch( (response) => {console.log(response)});
    }
    
/* - - - - - - - - - - - - - - - - 
    Expand
- - - - - - - - - - - - - - - - */
    const handleExpand = () => {
        if(isExpanded && !renaming){
            onExpand(lid);
            setBody("collapse-body-hide");
            setIsExpanded(!isExpanded);
        }
    };

    const renderExpandButton = () => {
        if(isExpanded){ return  <SettingTwoTone /> }
        else{ return  <SettingOutlined/> }
    };

    const renderIcon = () => {
        switch(type){
            case "single":
                return <DashboardTwoTone twoToneColor="green" />
            case "spectrum":
                return <SlidersTwoTone twoToneColor="red" />
            case "ambient":
                return <PictureTwoTone twoToneColor="blue"/>
        }
    };

    const refreshColors = (pid) => {
        axios.get('/api/palette/colors', {
            params: {pid: pid}
        })
        .then((response) =>{
            setColors(response.data);
        })
    }

    const onPidChange = (pid) => {
        console.log("New Pid: "+pid);
        setPid(pid);
        refreshColors(pid);
        axios.request ({
            url: '/api/layer/pid',
            method: 'post',
            data: {
                lid: lid,
                pid: pid,
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
    }

    const onRename = () => {
        setRenaming(true);
    }
    const onRenameComplete = (e) => {
        console.log(e);
        setName(nameInput);
        axios.request ({
            url: '/api/layer/name',
            method: 'post',
            data: {
                lid: lid,
                name: nameInput,
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
        setRenaming(false);
    }

    const onDelete = () => {
        axios.delete('/api/layer/', {
            data: {
                lid:lid
            }
        })
        .then((response) => {
            axios.delete('/api/scene/layer', {
                data:{
                    lid:lid,
                    sid:sid
                }
            })
            .then((response) => {
                onDeleteLayer(lid);
            })
        })
        .catch((response) =>{ console.log(response) });
    }



    const renderTitle = () =>{
        if(renaming){
            return<Input
                placeholder={name}
                maxLength={20}
                value={nameInput}
                defaultValue={name}
                onChange={(e)=>{console.log(e);setNameInput(e.target.value)}}
                onPressEnter={onRenameComplete}
                autoFocus={true}
            />
        }
        else{
            return <Text style={{userSelect:"none"}}> {name}</Text>
        }
    }

    const titleStyle = { textAlign:"left" };
    if(!loading){
        return(
            <div className="collapse">
                <div className="collapse-head" onClick={handleExpand}>
                    <Row>
                        <Col span={6} style={titleStyle}>
                        <Title level={3}>{renderTitle()}</Title>
                        
                        </Col>
                        <Col span={6}>
                            <ColorPreview colors={colors}/>
                        </Col>
                        <Col span={12}>
                            {/* <Switch defaultChecked onChange={onSwitch}/> */}
                            {renderIcon()}
                            <Button type="text" size="large" style={{float:"right"}} onClick={() => {onExpand(lid)}}>
                                {renderExpandButton()}
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div className={body}>
                    <LayerBody setPosition={(pos)=>{console.log(pos)}} setOpacity={(opacity)=>{console.log(opacity)}}/>
                    <Divider/>
                    <ColorBlock 
                        pid={pid}
                        setPid={onPidChange}
                        notify={refreshColors}
                    />
                    <Divider/>
                    <Space size="large">
                        <Button size="large" onClick={onRename}>Rename</Button>
                        <Button size="large" onClick={onDelete}>Delete Layer</Button>
                    </Space>
                    
                </div>

            </div>
        )
    }
    else{
        return <Spin/>
    }
}
export default Layer;