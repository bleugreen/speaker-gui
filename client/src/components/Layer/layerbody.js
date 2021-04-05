
import { Col, Divider, Row, Select, Slider, Space, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import ColorBlock from '../Color';
import './style.css';

const { Option } = Select;

function LayerBody({layer, notify, setters}) {
    const [loading, setLoading] = useState(false);

    function formatter(value) {
        return `${value}%`;
      }

    if(!loading) {
        return(
            <div>
                <Row>
                    <Col span={6}>
                        <Title level={2}>{layer.name}</Title>    
                    </Col> 
                    <Divider/>  
                </Row>
                <Row justify="space-between">
                    <Col span={4}>
                        <Title level={4}>
                            General
                        </Title>
                    </Col>
                    
                    <Col span={18}>
                        
                        <Space align="center" style={{width:"100%"}}>
                        <Text >Opacity</Text>
                        <Slider 
                            tipFormatter={formatter} 
                            min={0} 
                            max={100}
                            defaultValue={layer.opacity} 
                            onAfterChange={setters.opacity}
                            style={{width:180}} />
                        </Space>
                        <Divider/>
                        <Space align="center">
                        <Text >Position</Text>
                        <Select 
                            defaultValue={layer.pos}
                            style={{ width: 120 }} 
                            onChange={setters.pos}
                        >
                            <Option value="center">Center</Option>
                            <Option value="sides">Sides</Option>
                            <Option value="left">Left</Option>
                            <Option value="right">Right</Option>
                            <Option value="full">Full</Option>
                        </Select>
                        </Space>
                        
                    </Col>
                    <Divider/>
                </Row>
                <Row justify="space-between">
                    <Col span={4}>
                        <Title level={4}>
                            Palette
                        </Title>
                    </Col>
                    <Col span={18}>
                        <ColorBlock 
                            pid={layer.pid}
                            setPid={setters.pid}
                        />
                    </Col>
                    <Divider/>
                </Row>
                <Row justify="space-between">
                    <Col span={4}>
                        <Title level={4}>
                            Pattern
                        </Title>
                    </Col>
                    <Col span={18}>
                        <Space align="center" style={{width:"100%"}}>
                            <Text>
                                Spacing
                            </Text>
                        </Space>
                    </Col>
                </Row>
            </div>
        )
    }
    else{
        return <Spin/>
    }
}
export default LayerBody;