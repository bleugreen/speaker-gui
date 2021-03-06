import axios from 'axios';
import React, { useState } from 'react';
import {Row, Col, Typography, Divider, Slider } from 'antd';

const { Title } = Typography;

import 'antd/dist/antd.css';
import './style.css';

function SpectrumForm() {
  const [hash, setHash] = useState(['spectrum']);
  const [hue_low, setHueLow] = useState([0]);
  const [hue_high, setHueHigh] = useState([100]);
  const [saturation, setSaturation] = useState([100]);
  const [brightness, setBrightness] = useState([80]);
  



  


    return (
        <div>
        <Row>
        <Col span={24}>
            <Title level={2}>Spectrum</Title>
            <Divider/>
            
        </Col>
      </Row>
      <Row>
        <Col span={18}><Slider range 
                defaultValue={[0, 50]} 
                max={100} 
                /></Col>
        <Col span={6}>Hue Width</Col>
        <Col span={24}><Divider/></Col>
      </Row>
      <Row>
        <Col span={18}><Slider range 
                defaultValue={[90]} 
                max={100} 
                /></Col>
        <Col span={6}>Saturation</Col>
        <Col span={24}><Divider/></Col>
      </Row>
      <Row>
        <Col span={18}><Slider range 
                defaultValue={[70]} 
                max={100} 
                /></Col>
        <Col span={6}>Brightness</Col>
        <Col span={24}><Divider/></Col>
      </Row>
      </div>
    );
}

export default SpectrumForm;