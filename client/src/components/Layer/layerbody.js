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
import Parameter from './parameter';
import RenamableTitle from '../Renamable/title';
import ParameterGroup from '../ParameterGroup';


const { Option } = Select;

function LayerBody({layer, theme, notify, setters, expanded, handleExpand, onDelete}) {
    const [loading, setLoading] = useState(false);
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
                        borderRadius:"20%",
                        
                    }}
                >
            <div style={{
                backgroundColor:theme.fg
            }}>
                <Row >
                    <Col sm={24} xs={24}>   
                        <RenamableTitle theme={theme} text={layer.name} onSubmit={setters.name}/>
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
                    <ParameterGroup theme={theme} pattern='general' layer={layer} setters={setters}/>
                    <ParameterGroup theme={theme} pattern={layer.pattern} layer={layer} setters={setters}/>
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