import { Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import React, { Component } from 'react';
import { SketchPicker } from 'react-color'

import SpectrumForm from '../Spectrum/spectrumform';
import SwatchCircle from '../Swatch';

import './style.css';

function Home() {
  
  return (
      <div>
        
        <SpectrumForm/>
        <Row>
          <Col span={8}>
          <SwatchCircle/>
          </Col>
          <Col span={8}>
          <SwatchCircle/>
          </Col>
          <Col span={8}>
          <SwatchCircle/>
          </Col>
        </Row>
      </div>
  );
  
};

export default Home;