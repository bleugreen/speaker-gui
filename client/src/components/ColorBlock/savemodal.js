import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Row, Col, Typography, Divider, Modal, Input, Button, message } from 'antd';

const { Title, Text } = Typography;
import SwatchCircle from '../Swatch';


import 'antd/dist/antd.css';


// props:
//  name
//  onSubmit


function SaveModal(props) {
    const [visible, setVisible] = useState(props.visible);
    const [nameInput, setName] = useState('');

    const handleCancel = () => {
        props.onCancel();
    };

    const handleOk = () => {
        if(nameInput.length < 1){
            message.error("Please enter a name");
        }
        else{
            props.onSubmit(nameInput);
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
          visible={props.visible}
          title="Save New Palette"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Save
            </Button>
          ]}
        >
          <Input 
            placeholder={props.name}
            value={nameInput}
            onChange={handleChange}
            onPressEnter={handleOk}
            maxLength={15}
            minLength={2}
            autoFocus={true}


          />
        </Modal>
    </div>
    );
}

export default SaveModal;