import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Slider, Spin, Button, Space } from 'antd';

const { Title } = Typography;
import {
    PlusOutlined, MinusOutlined
  } from '@ant-design/icons';
import SwatchCircle from '../Swatch';


//import 'antd/dist/antd.css';
import './style.css';

// props:
//  id
//  color1
//  color2
//  color3


function PalettePicker(props) {
    const [loading, setLoading] = useState([true]);

    useEffect(() => {    
        if(loading){
            // Check to see if palette is loaded
            if (typeof(props.colors) !== 'undefined' && props.colors != null) {
                setLoading(false);
            }
        }
    }, [props.colors]);
  
    const handleColor = (index, color) => {
        props.onChange(index, color);
    }

    const renderSwatches = () => {
        let span = 0;
        let swatches = [];
        switch(props.colors.length) {
            case 2:
              span = 10;
              break;
            case 3:
              span = 7;
              break;
            case 4:
              span = 5;
              break;
            case 5:
                span = 4;
                break;
            default:
              span = 4
        }
        
        for (const [index, value] of props.colors.entries()) {
            swatches.push(<Col span={span} key={index}>
                <SwatchCircle onChange={handleColor} color={value} index={index}  />
            </Col>);

          }

        return swatches
    }

    if(loading){
        return (<Spin />)
    }
    else{
        return (
            <Row style={{margin:'auto'}}>
                {renderSwatches()}
                <Col span={2}>
                    <Space direction="vertical">
                        <Button 
                            shape="circle" 
                            icon={<PlusOutlined />} 
                            onClick={props.addColor}
                        /> 
                        <Button 
                            shape="circle" 
                            icon={<MinusOutlined />} 
                            onClick={props.removeColor}
                        />
                    </Space>
                    

                </Col>
            </Row>
        );
    }

}

export default PalettePicker;