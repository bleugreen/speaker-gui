import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Slider, Spin, Button, Space } from 'antd';

const { Title } = Typography;
import {
    PlusOutlined, MinusOutlined
  } from '@ant-design/icons';
import SwatchCircle from './swatch';


//import 'antd/dist/antd.css';
import './style.css';
// 
function PalettePicker({colors, locked, onChange, onComplete, addColor, removeColor}) {
    const [loading, setLoading] = useState([true]);

    useEffect(() => {    
        if(loading){
            // Check to see if palette is loaded
            if (typeof(colors) !== 'undefined' && colors != null) {
                setLoading(false);
            }
        }
    }, [colors, locked]);
  
    const handleColor = (index, color) => {
        console.log("getting change");
        onChange(index, color);
    }
    const handleComplete = (index, color) => {
        onComplete(index, color);
    }

    const renderSwatches = () => {
        let span = 0;
        let swatches = [];
        if(locked){
            span = (100/colors.length)+"%";
        }
        else{
            span = (90/colors.length)+"%";
        }
        
        for (const [index, value] of colors.entries()) {
            swatches.push(<div style={{width:span}}key={index}>
                <SwatchCircle onChange={handleColor} onComplete={handleComplete} color={value} index={index} locked={locked}  />
            </div>);

          }

        return swatches
    }

    const renderButtons = () => {
        if(locked){
            return <div></div>
        }
        else{
            return(
                <div style={{width:"10%"}}>
                    <Space direction="vertical">
                        <Button 
                            shape="circle" 
                            icon={<PlusOutlined />} 
                            onClick={addColor}
                        /> 
                        <Button 
                            shape="circle" 
                            icon={<MinusOutlined />} 
                            onClick={removeColor}
                        />
                    </Space>
                    

                </div>
            )
        }
    }

    if(loading){
        return (<Spin />)
    }
    else{
        return (
            <Row style={{margin:'auto'}}>
                {renderSwatches()}
                {renderButtons()}
            </Row>
        );
    }

}

export default PalettePicker;