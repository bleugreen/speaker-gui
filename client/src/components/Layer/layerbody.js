import {  DeleteOutlined,  } from '@ant-design/icons';
import { Button, Col, Divider,  Row, Tooltip, Select,  Spin } from 'antd';
import {  useState } from 'react';
import Modal from 'antd/lib/modal/Modal';

import ColorBlock from '../Color';
import Panel from '../Panel';
import RenamableTitle from '../Renamable/title';
import ParameterGroup from '../ParameterGroup';

import './style.css';

function LayerBody({layer, notify, setters, expanded, handleExpand, onDelete}) {
    return(
        <Modal
            centered
            visible={expanded}  
            onCancel={handleExpand}
            width={1000}  
            footer={null}
        >
            <div >
                <RenamableTitle text={layer.name} onSubmit={setters.name}/>
                <Divider/> 
                <Panel header='Palette' expand={true} >
                    <ColorBlock 
                        palette={layer.colors}
                        setPalette={setters.palette}
                            notify={notify}
                    />
                </Panel>
                <Divider width="40%"/>
                <Panel header='General'>
                    <ParameterGroup pattern='general' layer={layer} setters={setters}/>
                    <ParameterGroup pattern={layer.pattern} layer={layer} setters={setters}/>
                </Panel>
            </div>
            <Divider/>
            <Tooltip title="Delete Layer" placement="left"><Button onClick={onDelete}><DeleteOutlined/></Button></Tooltip>
        </Modal>
    )
}
export default LayerBody;