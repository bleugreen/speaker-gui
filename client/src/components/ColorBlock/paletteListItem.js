import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Slider, Spin, Space } from 'antd';

const { Title, Text } = Typography;
import SwatchCircle from '../Swatch';


import 'antd/dist/antd.css';

// props:
//  name
//  color1
//  color2
//  color3


function PaletteListItem(props) {
    const color1 = {
        width: '15px',
        height: '15px',
        borderRadius: '10px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        background: props.color1,
    }

    const color2 = {
        width: '15px',
        height: '15px',
        borderRadius: '10px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        background: props.color2,
    }

    const color3 = {
        width: '15px',
        height: '15px',
        borderRadius: '10px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        background: props.color3,
    }

    return (
    <div>
        <Row gutter={[16, 24]}>
            <Col span={10}>
                <Text style={{textAlign:'left', display:'block'}}>{props.name}</Text>
            </Col>
            <Col className="gutter-row" span={1}>
                <Divider type="vertical"/>
            </Col>
            <Col className="gutter-row" span={10}>
                <Space size='small' style={{margin:'auto',width:'100%'}}>
                    <div style={color1} />
                    <div style={color2} />
                    <div style={color3} />
                </Space>
            </Col>
        </Row>

                
                
               

    </div>
    );
}

export default PaletteListItem;
