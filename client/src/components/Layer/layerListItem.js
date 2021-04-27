import { DashboardTwoTone, EyeInvisibleOutlined, EyeOutlined, PictureTwoTone, SettingOutlined, SlidersTwoTone } from "@ant-design/icons";
import { Button, Col, Input, Row, Tooltip, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import useSelection from "antd/lib/table/hooks/useSelection";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import ColorPreview from "./colorPreview";

function LayerListItem({layer, setVisible, onExpand, onRename}) {
    const [nameField, setNameField] = useState(layer.name);
    const [renaming, setRenaming] = useState(false);


    useEffect(() => {
        console.log(layer.name);
    }, [layer.name, layer.colors]);

    const onRenameComplete = () => {
        onRename(nameField);
        setRenaming(false);
    }

    const renderTitle = () =>{
        if(renaming){
            return<Input
                placeholder={layer.name}
                maxLength={20}
                value={nameField}
                defaultValue={layer.name}
                onChange={(e)=>{setNameField(e.target.value)}}
                onPressEnter={onRenameComplete}
                autoFocus={true}
            />
        }
        else{
            return <Text onDoubleClick={()=>{setRenaming(true)}} style={{userSelect:"none"}}> {layer.name}</Text>
        }
    }


    const renderEye = () => {
        if(layer.visible){
            return <Tooltip title="Visible"><EyeOutlined onClick={setVisible} style={{fontSize:"16pt",verticalAlign:"middle"}} /></Tooltip>
        }
        else{
            return <Tooltip title="Hidden"><EyeInvisibleOutlined onClick={setVisible} style={{fontSize:"16pt",verticalAlign:"middle"}}/></Tooltip>
        }
    };

    const renderIcon = () => {
        switch(layer.type){
            case "single":
                return <Tooltip title="Single"><DashboardTwoTone style={{fontSize:"16pt",verticalAlign:"middle"}} twoToneColor="green" /></Tooltip>
            case "spectrum":
                return <Tooltip title="Spectrum"><SlidersTwoTone style={{fontSize:"16pt",verticalAlign:"middle"}} twoToneColor="red" /></Tooltip>
            case "ambient":
                return <Tooltip title="Ambient"><PictureTwoTone style={{fontSize:"16pt",verticalAlign:"middle"}} twoToneColor="blue"/></Tooltip>
        }
    };

    const titleStyle = { textAlign:"left" };

    return(
        <Row justify="space-between">
            <Col span={1} style={{ textAlign:"left", verticalAlign:"middle" }}>
                {renderEye()}
            </Col>
            <Col sm={10} xs={6} style={{ textAlign:"left", verticalAlign:"middle" }}>
                <Title level={4}>{renderTitle()}</Title>
            </Col>
            <Col sm={6} xs={0} style={{ verticalAlign:"bottom" }}>
                <ColorPreview colors={layer.colors}/>
            </Col>
            <Col sm={6} xs={8} style={{ verticalAlign:"middle" }}>
                {/* <Switch defaultChecked onChange={onSwitch}/> */}
                {renderIcon()}
                <Button type="text" size="large" style={{float:"right"}} onClick={onExpand}>
                    <SettingOutlined style={{fontSize:"14pt"}}/>
                </Button>
            </Col>                        
        </Row>
    )
}

export default LayerListItem;