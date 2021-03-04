import axios from 'axios';
import React, { Component } from 'react';
import {Row, Col, Typography, Divider, Slider } from 'antd';

const { Title } = Typography;

import 'antd/dist/antd.css';

class SpectrumForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      hash : 'spectrum', 
      hue_low: 0,
      hue_high: 100,
      saturation: 100,
      brightness: 80,
      label: 'wow',
      in_data: 808,
      isLoading: false,
    };

    this.onSliderChange = this.onSliderChange.bind(this);
    this.postHue = this.postHue.bind(this);
  }

  componentDidMount(){
    let hue_l = this.getVal('hue_low');
    this.setState({ label: hue_l });
  }

  onSliderChange = value => {
    this.postVal('hue_low',value[0]);
    this.postVal('hue_high',value[1]);
  }

  onSliderDone = value => {
    console.log('done: '+value);
  }

  postHue = value => {
      this.postVal('hue_low',value[0]);
      this.postVal('hue_high',value[1]);
      this.getVal('hue_low');
      this.setState({ label: this.state.in_data });
  }

  getVal(name){
    var self = this;
    this.setState({isLoading:false});
    axios.get('/mode', {
      params: {
        hash: self.state.hash,
        key: name
      }
    })
    .then(function (response) {
      self.setState({
          in_data: response.data
      });
    }).catch(function (response) {
      //handle error
      console.log(response);
    });
  }

  postVal(name, val){
    self = this
    axios.request ({
      url: '/mode',
      method: 'post',
      data: {
        hash: self.state.hash,
        key: name,  
        value: val,
      }, 
    })
      .then(function (response) {
        //handle success
        //console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  


  render() {
    if(this.state.isLoading){
      return <div></div>
    }



    return (
        <div>
        <Row>
        <Col span={24}>
            <Title level={2}>Spectrum</Title>
            <Divider/>
            <Slider range 
                defaultValue={[0, 50]} 
                max={100} 
                onAfterChange={this.postHue}
                onChange={this.onSliderChange}
            />
        </Col>
      </Row>
      <Row>
        <Col span={12}>Hue Low: {this.state.label}</Col>
        <Col span={12}>col-12</Col>
      </Row>
      <Row>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
        <Col span={8}>col-8</Col>
      </Row>
      </div>
    )
  }
}

export default SpectrumForm;