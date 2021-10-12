import React, {useState} from 'react';
import {
    Row,
    Col,
    Divider,
    Modal,
    Input,
    Button,
    message,
    Radio,
    Space
} from 'antd';

import 'antd/dist/antd.css';
import {DashboardTwoTone, PictureTwoTone, SlidersTwoTone} from '@ant-design/icons';

function NewLayerModal({visible, onSubmit, onCancel}) {
    const [nameInput,setName] = useState('New Layer');
    const [typeInput,setType] = useState('ambient')

    const handleOk = () => {
        if (nameInput.length < 1) {
            message.error("Please enter a name")
        } else {
            onSubmit(nameInput, typeInput);
            setName('');
        }
    };

    const handleCancel = () => {
        onCancel()
    };
    const handleChange = (e) => {
        setName(e.target.value)
    };
    const handleTypeChange = e => {
        setType(e.target.value)
    };

    return (
        <div>
            <Modal
                visible={visible}
                title="Create Layer"
                onOk={handleOk}
                onCancel={onCancel}
                footer={null}>
                <Row align="middle" justify="space-around">
                    <Space direction="vertical">
                        <Col span={24}>
                            <Input
                                placeholder={nameInput}
                                allowClear={true}
                                onChange={handleChange}
                                onPressEnter={handleOk}
                                maxLength={15}
                                minLength={2}
                                autoFocus={true}
                            />
                        </Col>
                        <Col span={24}>
                            <Radio.Group
                                value={typeInput}
                                onChange={handleTypeChange}
                                style={{ width: "100%" }}
                            >
                                <Radio.Button value="single"><DashboardTwoTone twoToneColor="green"/>
                                    Single</Radio.Button>
                                <Radio.Button value="spectrum"><SlidersTwoTone twoToneColor="red"/>
                                    Spectrum</Radio.Button>
                                <Radio.Button value="ambient"><PictureTwoTone twoToneColor="blue"/>
                                    Ambient</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Space>
                </Row>
                <Divider/>
                <div style={{textAlign: "right"}}
                >
                    <Button
                        key="back"
                        style={{marginRight: "5px"}}
                        onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button key="submit" type="primary" onClick={handleOk}>Save</Button>
                </div>

            </Modal>
        </div>
    )
}

export default NewLayerModal;