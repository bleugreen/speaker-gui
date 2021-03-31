import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { message, Row, Col, Spin, Collapse, Typography, Space, Select, Button, Divider } from 'antd';
import {
    SaveOutlined, FileAddOutlined, DeleteOutlined, LockOutlined, LockTwoTone, LockFilled, BarChartOutlined, LineChartOutlined
  } from '@ant-design/icons';

import PalettePicker from './palettepicker';
import PaletteListItem from './paletteListItem';
import SaveModal from './savemodal';
import LayerBlock from '../Layer';

const { Panel } = Collapse;
const { Text } = Typography; 

// setPid - called on palette change or palette create
function ColorBlock({pid, active, setPid}){
    const [loading, setLoading] = useState(true);
    const [saveVisible, setSaveVisible] = useState(false);
    const [palette, setPalette] = useState({});
    const [savedPalettes, setSaved] = useState([]);
    
    useEffect(() =>{
        if(loading){
            initColor();
        }
    });

/* ----------------------------------------
    Styles
---------------------------------------- */
    const rowStyle = { width:"100%" };
    const radioStyle = { display: 'block' };
    const radioButtonStyle = {
        height: '30px',
        lineHeight: '30px',
        width:"30%",
    }; 

/* ----------------------------------------
    Palette Operations
---------------------------------------- */
    // Get palette associated with given pid
    // Called on initial load
    const initColor = () => {
        getPalette(pid, (res) => {
            let temp_palette = {
                pid: pid,
                name: res.name,
                locked: (res.locked === "true"),
                lerp: (res.lerp === "true"),
                colors: res.colors
            }
            console.log("Init palette: "+temp_palette.name);
            setPalette(temp_palette);
            getPalettes();
            setLoading(false);
        })
    }

    // Gets palette, returns through callback
    // Usage: getPalette(pid, (palette)=>{ //do stuff })
    const getPalette = (pid, callback) => {
        axios.get('/api/palette', {
            params: { pid: pid }
        })
        .then( (response) => {callback(response.data)})
        .catch( (response) => {console.log(response)});
    }

    // Creates new palette with given name and current colors
    const saveNewPalette = (name) => {
        const newPalette = {
            name: name,
            locked:false,
            lerp: true,  
            colors: palette.colors,
        };
        axios.request ({
            url: '/api/palette/new',
            method: 'post',
            data: newPalette, 
        })
        .then(function (response) {
            // update current palette
            setPalette(newPalette);
            // update current pid
            setPid(response.data);
            // add new palette to saved list
            updateSavedPalettes(response.data);
        })
        .catch((response) => { console.log(response) });

    }


/* ----------------------------------------
    Palette List
---------------------------------------- */
    // Gets list of all saved palettes
    // Saves to savedPalettes
    const getPalettes = () => {
        axios.get('/api/palette/list', {})
        .then( (response) => { setSaved(response.data) })
        .catch( (response) => { console.log(response) });
    }

    // Updates saved list on palette change
    // Only changes palette of given pid
    const updateSavedPalettes = (pid) => {
        console.log("update saved: "+pid);
        getPalette(pid, function(res){
            let temp_palette = {
                pid: pid,
                name: res.name,
                locked: (res.locked=="true"),
                lerp: (res.lerp=="true"),
                colors: res.colors,
            }
            const newSaved = savedPalettes.filter(p => p.pid != pid);
            newSaved.push(temp_palette);
            setSaved(newSaved);
        });
    }

/* ----------------------------------------
    Fields
---------------------------------------- */
    const updateLocked = (locked) => {
        axios.request ({
            url: '/api/palette/locked',
            method: 'post',
            data: {
                pid: pid,
                locked: locked,
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
    }

    const updateLerp = (lerp) => {
        axios.request ({
            url: '/api/palette/lerp',
            method: 'post',
            data: {
                pid: pid,
                lerp: lerp,
            }, 
        })
        .then((response) => {console.log(response)})
        .catch((response) =>{ console.log(response) });
    }

/* ----------------------------------------
    Color List
---------------------------------------- */
    // Updates single color in palette
    const updateColor = (index, color) => {
        if(!palette.locked){
        // send palette to db
        // refresh palette list
            console.log("update "+index);
            //console.log(palette.colors);  
            axios.request ({
                url: '/api/palette/update',
                method: 'post',
                data: {
                    pid: pid,
                    index: index,
                    color: color,
                }, 
            })
            .then(function (response) {
                console.log("save: "+response.data);
                updateSavedPalettes(pid);
            })
            .catch(response => {console.log(response)});
        }
    }

/* ----------------------------------------
    Button Handling
---------------------------------------- */
     // open modal that grabs name input
    const onSaveAs = () => { setSaveVisible(true) }

    // close modal
    const onSaveCancel = () => { setSaveVisible(false) }

    // On save, close modal and create palette
    const saveAs = (name) => {
        setSaveVisible(false);
        saveNewPalette(name);
    }

    const onDelete = () => {
        if(palette.locked){
            message.error({
                content: 'Palette Locked',
                style: { marginTop: '8vh'}
            });
        }
        else{
            axios.delete('/api/palette/', {
                params: {
                    pid: pid,
                    name: palette.name,
                }
            })
            .then(function (response) {
                //remove palette from saved list
                setSaved(savedPalettes.filter(p => p.pid != pid));
                // find new palette in list
                let it = 0;
                while(savedPalettes[it].pid == pid) it++;
                // set new palette
                setPalette(savedPalettes[it]);
                setPid(savedPalettes[it].pid);
            })
            .catch((response)=>{ console.log(response)});
        }
    }

    // on dropdown select, set pid, find matching palette, and set palette
    const handlePaletteChange = (data) => {
        console.log(data);
        setPid(data);
        savedPalettes.map(item => {
            if(data == item.pid){
                setPalette(item);
            }
        })
    }

    const onLock = () => {
        updateLocked(!palette.locked);
        setPalette({
            ...palette,
            locked: !palette.locked,
        });
    }

    const onLerp = () => {
        updateLerp(!palette.lerp);
        setPalette({
            ...palette,
            lerp: !palette.lerp,
        });
    }


/* ----------------------------------------
    Color Change Handling
---------------------------------------- */
    // update local palette on color change
    const handleColorChange = (index, color) => {
        let tempcolors = [...palette.colors];
        tempcolors[index] = color;
        setPalette({
            ...palette,
            colors: tempcolors
        });
    
    };

    // when change is complete, update saved palette
    const handleColorComplete = (index, color) => {
        let tempcolors = [...palette.colors];
        tempcolors[index] = color;
        setPalette({
            ...palette,
            colors: tempcolors
        });
        updateColor(index,color);
    };


    // push new color to current palette
    const addColor = () => {
        if(palette.colors.length >= 7){
            message.error("Cannot add more colors")
        }
        else{
            axios.request ({
                url: '/api/palette/push',
                method: 'post',
                data: {
                    pid: pid,
                    name: palette.name,  
                    color: palette.colors[0],
                }, 
            })
            .then(function (response) {
                setPalette({
                    ...palette,
                    colors: [...palette.colors, palette.colors[0]],
                });
                updateSavedPalettes(pid);
            })
            .catch(function (response) { console.log(response) });
        }
    };

    // pop last color from current palette
    const removeColor = () => {
        if(palette.colors.length < 2){
            message.error("Cannot delete more colors")
        }
        else{
            axios.delete('/api/palette/pop', {
                params: {
                    pid: pid,
                    name: palette.name,
                }
            })
            .then(function (response) {
                setPalette({...palette, colors:palette.colors.slice(0,-1)});
                updateSavedPalettes(pid);
            })
            .catch(function (response) { console.log(response) });
        }
    };

/* ----------------------------------------
    Rendering
---------------------------------------- */
    // Builds dropdown of palette items from saved list
    const populateDropdown = () => {
        const paletteItems = [];
        for (const [index, value] of savedPalettes.entries()) {
            console.log(value.colors);
            paletteItems.push(
                <Select.Option value={value.pid} key={index} >
                    <PaletteListItem name={value.name} colors={value.colors} />
                </Select.Option>
            );
          }
        return(
            <Select
                defaultValue={palette.name}
                value={palette.name}
                onChange={handlePaletteChange}
                size='large'
                style={{width:'250px'}}
                loading={loading}
            >
                {paletteItems}
            </Select>
        );
    }

    const renderLock = () => {
        if(palette.locked){
            return  <Space><LockTwoTone twoToneColor="red" /><Text>Locked</Text></Space>
        }
        else{
            return  <Space><LockOutlined /><Text>Unlocked</Text></Space>
        }
    }

    const renderLerp = () => {
        if(palette.lerp){
            return  <Space><LineChartOutlined/><Text>Interpolate</Text></Space>
        }
        else{
            return <Space><BarChartOutlined /><Text>Discrete</Text></Space>
        }
    }

    function renderColorBlock(){
        if(!loading){
            return(
                <Space direction='vertical' style={rowStyle}>
                    <Row style={rowStyle}>
                        <Col span={24} >
                            <Space wrap={true} align="center">
                                {populateDropdown()}
                                <Space wrap={false} align="center">
                                    <Button type="default" onClick={onSaveAs} >
                                        <FileAddOutlined style={{verticalAlign:'baseline'}}/>
                                    </Button>
                                    <Button type="default" onClick={onDelete} >
                                        <DeleteOutlined style={{verticalAlign:'baseline'}}/> 
                                    </Button>
                                </Space>
                                <Divider type="vertical"/>
                                <Space wrap={false}>
                                    <Button type="default" onClick={onLock} >
                                        {renderLock()}
                                    </Button>
                                    <Button type="default" onClick={onLerp} >
                                        {renderLerp()}
                                    </Button>
                                </Space>
                            </Space>
                        </Col>
                    </Row>
                    <PalettePicker 
                        colors={palette.colors}
                        locked={palette.locked}
                        onChange={handleColorChange}
                        onComplete={handleColorComplete}
                        addColor={addColor}
                        removeColor = {removeColor}
                        style={rowStyle}
                    />
                    
                    <SaveModal visible={saveVisible} name={palette.name} onSubmit={saveAs} onCancel={onSaveCancel}/>
                </Space>
            )
        }
        else{ return( <div><Spin /></div> ) }
    }

    return(
        renderColorBlock()
    )
}
export default ColorBlock;