import { DashboardOutlined, PictureOutlined, SettingOutlined, SettingTwoTone, SlidersOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';

import Mode from '../Mode';

const { Title } = Typography;

import './style.css';

{/* <PictureOutlined/>
<SlidersOutlined/>
<DashboardOutlined/> */}

function LayerBlock({id, active, expanded, onExpand}){
    const [name, setName] = useState("Spec");
    const [isExpanded, setIsExpanded] = useState(false);
    const [body, setBody] = useState("collapse-body-hide");

    useEffect(() =>{
        if(id == expanded){
            setIsExpanded(true);
            setBody("collapse-body");
        }
        else{
            setIsExpanded(false);
            setBody("collapse-body-hide");
        }
    }, [expanded]);
    
    
    const handleExpand = () => {
        
        if(isExpanded){
            onExpand(id);
            setBody("collapse-body-hide");
            setIsExpanded(!isExpanded);
        }

        
    };

    const onSwitch = () => {
        console.log('cool');
    }


    const renderExpandButton = () => {
        if(isExpanded){
           return  <SettingTwoTone />
        }
        else{
           return  <SettingOutlined/>
        }
    };

    return(
        <div className="collapse">
            <div className="collapse-head" onClick={handleExpand}>
                <Row>
                    <Col span={18}>
                    <Title level={4}>{id}</Title>
                    </Col>
                    <Col span={6}>
                        {/* <Switch defaultChecked onChange={onSwitch}/> */}
                        <Button type="text" size="large" style={{float:"right"}} onClick={() => {onExpand(id)}}>
                            {renderExpandButton()}
                        </Button>
                    </Col>
                </Row>
            </div>
            <div className={body}>
                    <Mode mid="0" active={active} />
            </div>

        </div>
    )
}
export default LayerBlock;