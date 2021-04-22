
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

    const opacity = (
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
    );

    const layout = () => {
        if(layer.layout == "both"){
            return(
                <Space align="center" style={{width:"100%"}}>
                    <Text >Speakers</Text>                        
                    <Select
                        placeholder="Please select"
                        defaultValue={layer.layout}
                        onChange={setters.layout}
                        style={{minWidth:180}}
                    >
                        <Option key='left'>Left</Option>
                        <Option key='right'>Right</Option>
                        <Option key='both'>Both</Option>
                    </Select>
                </Space>
            )
        }
        return (
            <Space align="center" style={{width:"100%"}}>
            <Text >Speakers</Text>                        
            <Select
                placeholder="Please select"
                defaultValue={layer.layout}
                onChange={setters.layout}
                style={{minWidth:180}}
            >
                <Option key='left'>Left</Option>
                <Option key='right'>Right</Option>
                <Option key='both'>Both</Option>
            </Select>
        </Space>)
    }


    
    if(!loading) {
        return(
            <div>
                <Row>
                    <Col sm={6} xs={24}>
                        <Title level={2}>{layer.name}</Title>    
                    </Col> 
                    <Divider/>  
                </Row>
                <Row justify="space-between">
                    <Col sm={4} xs={0}>
                        <Title level={4}>
                            General
                        </Title>
                    </Col>
                    
                    <Col sm={18} xs={24}>
                        
                        {opacity}
                        <Divider/>
                        {layout()}
                        <Divider/>
                        <Space align="center" style={{width:"100%"}}>
                        <Text >Panels</Text>                        
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Please select"
                            defaultValue={layer.pos}
                            onChange={setters.pos}
                            style={{minWidth:180}}
                        >
                            <Option key='left'>Left</Option>
                            <Option key='right'>Right</Option>
                            <Option key='center'>Center</Option>
                        </Select>
                        </Space>
                        <Divider/>
                        <Space align="center">
                        {/* <Text >Position</Text>
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
                        </Select> */}
                        </Space>
                        
                    </Col>
                    <Divider/>
                </Row>
                <Row justify="space-between">
                    <Col sm={4} xs={0}>
                        <Title level={4}>
                            Palette
                        </Title>
                    </Col>
                    <Col sm={18} xs={24}>
                        <ColorBlock 
                            pid={layer.pid}
                            setPid={setters.pid}
                            notify={notify}
                        />
                    </Col>
                    <Divider/>
                </Row>
                <Row justify="space-between">
                    <Col sm={4} xs={0}>
                        <Title level={4}>
                            Pattern
                        </Title>
                    </Col>
                    <Col sm={18} xs={24}>
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