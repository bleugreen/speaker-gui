import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Slider, Spin } from 'antd';

const { Title } = Typography;
import SwatchCircle from '../Swatch';


import 'antd/dist/antd.css';
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
            // Check to see if palette is saved
            setLoading(false);
        }
        console.log(props.color2+" picker update");
        
    }, [props.color1, props.color2, props.color3]);
  
    const handleColor = (index, color) => {
        props.onChange(index, color);
    }

    function renderPalettePicker()  {
        if(loading){
            return (<Spin />)
        }
        else{
            return (
                <Row style={{margin:'auto'}}>
                    <Col span={8}>
                        <SwatchCircle onChange={handleColor} color={props.color1} index={1} />
                    </Col>
                    <Col span={8}>
                        <SwatchCircle onChange={handleColor} color={props.color2} index={2} />
                    </Col>
                    <Col span={8}>
                        <SwatchCircle onChange={handleColor} color={props.color3} index={3} />
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