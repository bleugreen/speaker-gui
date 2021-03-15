import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Slider, Spin, Space } from 'antd';

const { Title, Text } = Typography;
import ColorDot from './colordot';


import 'antd/dist/antd.css';
import './style.css';

// props:
//  name
//  colors


function PaletteListItem(props) {
    const renderDots = () => {
        //console.log("list item: "+props.colors);
        return (props.colors.map( colorIt => {
           <ColorDot color={colorIt} />
        }));
    }

    const dots = [];
    for (const [index, value] of props.colors.entries()) {
        dots.push(<ColorDot color={value} key={index} />)
      }

    return (
    <div>
        <Row gutter={[16, 24]}>
            <Col span={8}>
                <Text style={{textAlign:'left', display:'block'}}>{props.name}</Text>
            </Col>
            <Col className="gutter-row" span={1}>
                <Divider type="vertical"/>
            </Col>
            <Col className="gutter-row" span={10}>
                <Space size='small' style={{margin:'auto',width:'100%'}}>
                    {dots}
                </Space>
            </Col>
        </Row>

                
                
               

    </div>
    );
}

export default PaletteListItem;
