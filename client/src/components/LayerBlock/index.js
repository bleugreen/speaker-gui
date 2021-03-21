import { SettingOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';

import Mode from '../Mode';

const { Title } = Typography;

import './style.css';

function LayerBlock({id, active}){
    const [expanded, setExpanded] = useState(false);
    const [name, setName] = useState("Spec");

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const onSwitch = () => {
        console.log('cool');
    }

    const renderBody = () => {
        if(expanded){
            return (
                <div className="collapse-body">
                    <Mode mid="0" active={active} />
                </div>
            )
        }
        else{
            return
        }
    };

    return(
        <div className="collapse">
            <div className="collapse-head">
                <Row>
                    <Col span={18}>
                    <Title level={4}>{id}</Title>
                    </Col>
                    <Col span={6}>
                        <Switch defaultChecked onChange={onSwitch}/>
                        <Button type="text" size="large" onClick={handleExpand} style={{float:"right"}}>
                            <SettingOutlined/>
                        </Button>
                    </Col>
                </Row>
            </div>
            { renderBody() }

        </div>
    )
}
export default LayerBlock;