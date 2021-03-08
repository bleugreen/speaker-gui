import { Col, Collapse, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import React, { Component } from 'react';
import { SketchPicker } from 'react-color'

import SpectrumForm from '../Spectrum/spectrumform';
import Palette from '../PalettePicker';

import './style.css';
import ColorBlock from '../ColorBlock';

const { Panel } = Collapse;

function Home() {
  
  const callback = key => {
    console.log(key);
  }

  return (
      <div>        
        
        <Collapse
          defaultActiveKey={['1']}
          onChange={callback}
          bordered={true}
        >
          <Panel
            header="Color"
            key="1"

            >
            <ColorBlock 
              id="default"
              type="palette"
              palette="default"
            />
          </Panel>
        </Collapse>
      </div>
  );
  
};

export default Home;