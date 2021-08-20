import { ArrowUpOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Radio, Row, Tooltip, Select, Slider, Space, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import ColorBlock from '../Color';
import EyeButton from './eyeButton';
import GraphPicker from './graphpicker';
import PanelPicker from './panelpicker';
import Panel from '../Panel';
import './style.css';
import colorTheme from '../themes';


const { Option } = Select;

function LayerBody({layer, theme, notify, setters, expanded, handleExpand, onDelete}) {
    const [loading, setLoading] = useState(false);

    function formatter(value) {
        return `${value}%`;
      }

    const opacity = (
        <Row align='middle'>
            <Col sm={4} xs={7}>
                <Text >Opacity</Text>
            </Col>
            <Col sm={1}>
                <EyeButton visible={layer.visible} setVisible={setters.visible} theme={theme}/>
            </Col>
            <Col sm={9}>
                <Slider 
                    tipFormatter={formatter} 
                    min={0} 
                    max={100}
                    defaultValue={layer.opacity} 
                    onAfterChange={setters.opacity}
                    style={{width:180}} />
            </Col>
            
        </Row>
    );

    const layout = () => {
        if(layer.layout == 'left,right'){
            return(
                <Row align="middle" gutter={[16,24]}
                    
                >
                    <Col md={4} sm={5} xs={9}>
                        <Text >Speakers</Text>
                    </Col>
                    <Col sm={12} md={9}>
                        <Radio.Group
                            defaultValue={layer.layout}
                            onChange={setters.layout}
                            style={{minWidth:100}}
                        >
                            <Radio.Button value='left'>Left</Radio.Button>
                            <Radio.Button value='left,right'>Both</Radio.Button>
                            <Radio.Button value='right'>Right</Radio.Button>
                            
                        </Radio.Group>
                    </Col>
                    <Col sm={{span:3, offset:0}} xs={{span:9, offset:9}}>
                        <Select
                            defaultValue='repeat'
                            style={{minWidth:100}}
                            defaultValue={layer.tile}
                            onChange={setters.tile}
                        >
                            <Option key='repeat'>Repeat</Option>
                            <Option key='mirror'>Mirror</Option>
                        </Select>
                    </Col>
                </Row> 
            )}
        return (
            <Row align="middle">
                <Col sm={4} xs={9}>
                    <Text >Speakers</Text> 
                </Col>
                <Col sm={9} xs={15}>
                    <Radio.Group
                        defaultValue={layer.layout}
                        onChange={setters.layout}
                        style={{minWidth:180}}
                    >
                        <Radio.Button value='left'>Left</Radio.Button>
                        <Radio.Button value='left,right'>Both</Radio.Button>
                        <Radio.Button value='right'>Right</Radio.Button> 
                    </Radio.Group>
                </Col>
            </Row>
        )
    }

    const pattern = () => {
        if(layer.pattern == 'lingradient'){
            return(
                <Row align='middle'>
                    <Col sm={{span:4, offset:0}} xs={9}>
                        <Text>Direction</Text>
                    </Col>
                    <Col sm={9}>
                        <Radio.Group
                            defaultValue={layer.direction}
                            onChange={setters.direction}
                            style={{minWidth:180}}
                        >
                            <Radio.Button value='upleft'><ArrowUpOutlined rotate={-45}/></Radio.Button>
                            <Radio.Button value='up'><ArrowUpOutlined/></Radio.Button>
                            <Radio.Button value='upright'><ArrowUpOutlined rotate={45}/></Radio.Button><br/>
                            <Radio.Button value='left'><ArrowUpOutlined rotate={-90}/></Radio.Button>
                            <Radio.Button value='center' disabled={true}><SyncOutlined/></Radio.Button>
                            <Radio.Button value='right'><ArrowUpOutlined rotate={90}/></Radio.Button><br/>
                            <Radio.Button value='downleft'><ArrowUpOutlined rotate={-135}/></Radio.Button>
                            <Radio.Button value='down'><ArrowUpOutlined rotate={180}/></Radio.Button>
                            <Radio.Button value='downright'><ArrowUpOutlined rotate={135}/></Radio.Button>
                            
                        </Radio.Group>
                    </Col>
                </Row>

            )
        }
    }


    

            /* <Row>
                <Col sm={3}>
                </Col>
                <Col sm={12}>
                </Col>
            </Row> */
    
    if(!loading) {
        return(
            <Modal
                    centered
                    visible={expanded}  
                    onCancel={handleExpand}
                    width={1000}  
                    footer={null}
                    bodyStyle={{
                        backgroundColor:theme.fg,
                        color:theme.text,
                        borderRadius:"20px"
                    }}
                    style ={{
                        marginTop:"8%",
                        
                    }}
                >
            <div style={{
                backgroundColor:theme.fg
            }}>
                <Row >
                    <Col sm={24} xs={24}>
                        <Title style={{fontFamily:"recoleta-medium"}}>{layer.name}</Title>    
                        <Divider/> 
                    </Col> 
                    
                     
                </Row>
                <Panel
                    header='Palette'
                    expand={true}
                >
                    <ColorBlock 
                            palette={layer.colors}
                            setPalette={setters.palette}
                            notify={notify}
                        />
                </Panel>
                <Divider width="40%"/>
                <Panel

                    header='General'
                >
                    {opacity}
                        <Divider/>
                        {layout()}
                        <Divider/>
                        <Row align="middle" justify="start">
                            <Col sm={4} xs={9}>
                                <Text >Panels</Text>
                            </Col>
                            <Col sm={12}>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder="Please select"
                                    defaultValue={layer.pos}
                                    onChange={setters.pos}
                                    style={{minWidth:180, backgroundColor:theme.fg}}
                                    dropdownStyle={{color:theme.fg}}
                                >
                                    <Option key='left'>Left</Option>
                                    <Option key='right'>Right</Option>
                                    <Option key='center'>Center</Option>
                                </Select>
                            </Col>                  
                        </Row>
                        <Divider/>
                        <Row align="middle">
                            <Col sm={4} xs={9}>
                                <Text>Pattern</Text>
                            </Col>
                            <Col sm={9}>
                                <Select
                                    defaultValue={'lingradient'}
                                    onChange={setters.pattern}
                                >
                                    <Option key='lingradient'>Linear Gradient</Option>
                                    <Option key='radgradient'>Radial Gradient</Option>
                                    <Option key='rain'>Rain</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Divider/>
                        {pattern()}
                </Panel>
            </div>
            <Divider/>
                    <Tooltip title="Delete Layer" placement="left"><Button onClick={onDelete}><DeleteOutlined/></Button></Tooltip>
            </Modal>
        )
    }
    else{
        return <Spin/>
    }
}
export default LayerBody;