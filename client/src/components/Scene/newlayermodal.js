import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Modal, Input, Button, message, Radio, Space } from 'antd';
const { Title, Text } = Typography;

import 'antd/dist/antd.css';
import { DashboardTwoTone, PictureTwoTone, SlidersTwoTone } from '@ant-design/icons';

function NewLayerModal({visible, onSubmit, onCancel}) {
    const [nameInput, setName] = useState('New Layer');
    const [typeInput, setType] = useState('ambient')

    const handleCancel = () => {
        onCancel();
    };

    const handleOk = () => {
        if(nameInput.length < 1){
            message.error("Please enter a name");
        }
        else{
            onSubmit(nameInput, typeInput);
            setName('');
        }
        
    };

    const handleChange = (e) => {
        //console.log(e.target.value);
        setName(e.target.value);
    }

    const handleTypeChange = e => {
        setType(e.target.value);
      };

    return (
      <div>
          <Modal
            visible={visible}
            title="Create Layer"
            onOk={handleOk}
            onCancel={onCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>Cancel</Button>,
              <Button key="submit" type="primary" onClick={handleOk}>Save</Button>
            ]}
          >
            <Space direction="vertical">
            <Input 
              placeholder={nameInput}
              allowClear={true}
              onChange={handleChange}
              onPressEnter={handleOk}
              maxLength={15}
              minLength={2}
              autoFocus={true}
            />
            <Radio.Group value={typeInput} onChange={handleTypeChange}>
                <Radio.Button value="single"><DashboardTwoTone twoToneColor="green" />  Single</Radio.Button>
                <Radio.Button value="spectrum"><SlidersTwoTone twoToneColor="red" />  Spectrum</Radio.Button>
                <Radio.Button value="ambient"><PictureTwoTone twoToneColor="blue"/>  Ambient</Radio.Button>
            </Radio.Group>
            </Space>
          </Modal>
      </div>
    )
}

export default NewLayerModal;