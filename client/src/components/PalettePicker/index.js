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
    const handleComplete = (index, color) => {
        props.onComplete(index, color);
    }

    const renderSwatches = () => {
        let span = 0;
        let swatches = [];
        span = (90/props.colors.length)+"%";
        
        for (const [index, value] of props.colors.entries()) {
            swatches.push(<div style={{width:span}}key={index}>
                <SwatchCircle onChange={handleColor} onComplete={handleComplete} color={value} index={index}  />
            </div>);

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
                <div style={{width:"10%"}}>
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
                    

                </div>
            </Row>
        );
    }

}

export default PalettePicker;