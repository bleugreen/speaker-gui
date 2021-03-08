import { Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import React, { Component } from 'react';
import { SketchPicker } from 'react-color'

import SpectrumForm from '../Spectrum/spectrumform';
import Palette from '../Palette';

import './style.css';

function Home() {
  
  return (
      <div>        
        <Palette 
          numColors={3} 
          id={'default'} 
          color1={{
            r:150,
            g:0,
            b:255,
          }}/>
      </div>
  );
  
};

export default Home;