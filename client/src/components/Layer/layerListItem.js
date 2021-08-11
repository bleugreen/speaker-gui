import { DashboardTwoTone, EyeInvisibleOutlined, EyeOutlined, PictureTwoTone, SettingOutlined, SlidersTwoTone } from "@ant-design/icons";
import { Button, Col, Input, Row, Tooltip, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import useSelection from "antd/lib/table/hooks/useSelection";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import ColorPreview from "./colorPreview";
import EyeButton from "./eyeButton";
import colorTheme from "../themes";

function LayerListItem({layer, setVisible, theme, onExpand, onRename}) {
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
            return <Text style={{userSelect:"none"}}> {layer.name}</Text>
        }
    }

    const renderIcon = () => {
        switch(layer.type){
            case "single":
                return <Tooltip title="Single"><DashboardTwoTone style={{fontSize:"16pt",verticalAlign:"middle"}} twoToneColor={theme.green} /></Tooltip>
            case "spectrum":
                return <Tooltip title="Spectrum"><SlidersTwoTone style={{fontSize:"16pt",verticalAlign:"middle"}} twoToneColor={theme.red} /></Tooltip>
            case "ambient":
                return <Tooltip title="Ambient"><PictureTwoTone style={{fontSize:"16pt",verticalAlign:"middle"}} twoToneColor={theme.blue}/></Tooltip>
        }
    };

    const titleStyle = { textAlign:"left" };
    const itemStyle = {
        backgroundColor: theme.fg,
        color: theme.text,
        transition: "all 0.3s, visibility 0s",
        padding: "3%",
        cursor: "pointer", 
        lineHeight: 2,
        borderRadius: "20px",
        marginBottom:"10px"
    }

    return(
        <div style={itemStyle} >
        <Row align="top" justify="start">
            <Col sm={2} xs={3} style={{ textAlign:"left", verticalAlign:"middle" }}>
                <EyeButton visible={layer.visible} setVisible={setVisible} theme={theme}/>
            </Col>
            <Col sm={{span:5}} xs={12} style={{ textAlign:"left", verticalAlign:"middle" }}>
                <Title level={4}>{layer.name}</Title>
            </Col>
            <Col sm={{span:2, offset:10}} xs={1} >
            {renderIcon()}
            </Col>
            <Col sm={4} xs={0} >
                <ColorPreview colors={layer.colors}/>
            </Col>
            <Col sm={1} xs={8} style={{ verticalAlign:"middle" }}>
                {/* <Switch defaultChecked onChange={onSwitch}/> */}
                
                <Button type="text" size="large" style={{float:"right"}} onClick={onExpand}>
                    <SettingOutlined style={{fontSize:"14pt"}}/>
                </Button>
            </Col>                        
        </Row>
        </div>
    )
}

export default LayerListItem;