import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Slider, Spin } from 'antd';

const { Title } = Typography;
import SwatchCircle from '../Swatch';


import 'antd/dist/antd.css';
import './style.css';

// props:
//  id
//  numColors
//  color1
//  color2
//  color3


function PalettePicker(props) {
    const [numColors, setNumColors] = useState([props.numColors]);
    const [loading, setLoading] = useState([true]);
    var [color1, setColor1] = useState(['#ff0000']);
    var [color2, setColor2] = useState(['#00ff00']);
    var [color3, setColor3] = useState(['#0000ff']);

    useEffect(() => {    
        if(loading){
            // Check to see if palette is saved
            setLoading(false);
        }
        
    });
  
    const handleColor = (index, color) => {
        console.log("Received: "+index+" = "+color);
        if(index == 1){
            setColor1(color);
        }
        if(index == 2){
            setColor2(color);
        }
        if(index == 3){
            setColor3(color);
        }
    }

    function renderPalettePicker()  {
        if(loading){
            return (<Spin />)
        }
        if(numColors == 3){
            return (
                <Row>
                    <Col span={8}>
                        <SwatchCircle onChange={handleColor} color={color1[0]} index={1} />
                    </Col>
                    <Col span={8}>
                        <SwatchCircle onChange={handleColor} color={color2[0]} index={2} />
                    </Col>
                    <Col span={8}>
                        <SwatchCircle onChange={handleColor} color={color3[0]} index={3} />
                    </Col>
                </Row>
            );
        }
    }

  


    return (
    <div>
        {renderPalettePicker()}
    </div>
    );
}

export default PalettePicker;