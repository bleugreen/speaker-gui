import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Modal, Input, Button, message } from 'antd';
const { Title, Text } = Typography;

import 'antd/dist/antd.css';

function SaveModal({name, visible, onSubmit, onCancel}) {
    const [nameInput, setName] = useState('');

    const handleCancel = () => {
        onCancel();
    };

    const handleOk = () => {
        if(nameInput.length < 1){
            message.error("Please enter a name");
        }
        else{
            onSubmit(nameInput);
            setName('');
        }
        
    };

    const handleChange = (e) => {
        //console.log(e.target.value);
        setName(e.target.value);
        
    }

    return (
      <div>
          <Modal
            visible={visible}
            title="Create Palette"
            onOk={handleOk}
            onCancel={onCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>Cancel</Button>,
              <Button key="submit" type="primary" onClick={handleOk}>Save</Button>
            ]}
          >
            <Input 
              placeholder={name}
              value={nameInput}
              onChange={handleChange}
              onPressEnter={handleOk}
              maxLength={15}
              minLength={2}
              autoFocus={true}
            />
          </Modal>
      </div>
    )
}

export default SaveModal;