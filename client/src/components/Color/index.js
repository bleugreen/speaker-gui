import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { message, Row, Col, Spin, Collapse, Typography, Space, Select, Button, Divider, Tooltip } from 'antd';
import {
    SaveOutlined, FileAddOutlined, DeleteOutlined, LockOutlined, LockTwoTone, LockFilled, BarChartOutlined, LineChartOutlined, UnlockOutlined
  } from '@ant-design/icons';

import PalettePicker from './palettepicker';
import PaletteListItem from './paletteListItem';
import SaveModal from './savemodal';
import ReactTooltip from 'react-tooltip';


// setPid - called on palette change or palette create
// notify - called when 
function ColorBlock({palette="palette:20", setPalette}){
    const [loading, setLoading] = useState(true);
    const [saveVisible, setSaveVisible] = useState(false);
    const [colors, setColors] = useState({});
    const [savedPalettes, setSaved] = useState([]);
    const [savedName, setSavedName] = useState("Select Palette...");
    
    useEffect(() =>{
        if(loading){
            initColor();
        }
    });

/* ----------------------------------------
    Styles
---------------------------------------- */
    const rowStyle = { width:"100%", backgroundColor:'transparent', display:'block'};

/* ----------------------------------------
    Palette Operations
---------------------------------------- */
    // Get palette associated with given pid
    // Called on initial load
    const initColor = () => {
        setColors(palette.split(","));
        getPalettes();
        setLoading(false)
    }

    // Gets palette, returns through callback
    // Usage: getPalette(pid, (palette)=>{ //do stuff })
    const getPalette = (name, callback) => {
        axios.get('/api/palette', {
            params: { name: name }
        })
        .then( (response) => {callback(response.data)})
        .catch( (response) => {console.log(response)});
    }

    // Creates new palette with given name and current colors
    const saveNewPalette = (name) => {
        const newPalette = {
            name: name,
            colors: colors.toString(),
        };
        axios.request ({
            url: '/api/palette/save',
            method: 'post',
            data: newPalette, 
        })
        .then(function (response) {
            getPalettes();
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

/* ----------------------------------------
    Fields
---------------------------------------- */


/* ----------------------------------------
    Color List
---------------------------------------- */
    // Updates single color in palette
    const updateColor = (index, color) => {
        let tempPalette = [...colors];
        tempPalette[index] = color;
        setColors(tempPalette);
        setPalette(tempPalette.toString());
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

    

    // on dropdown select, set pid, find matching palette, and set palette
    const handlePaletteChange = (data) => {
        console.log(data);
        setSavedName(data);
        savedPalettes.map(item => {
            if(data == item.name){
                setColors(item.colors.split(","));
                setPalette(item.colors);
            }
        })
    }




/* ----------------------------------------
    Color Change Handling
---------------------------------------- */
    // update local palette on color change
    const handleColorChange = (index, color) => {
        let tempcolors = [...colors];
        tempcolors[index] = color;
        setColors(tempcolors);
    };

    // when change is complete, update saved palette
    const handleColorComplete = (index, color) => {
        let tempcolors = [...colors];
        tempcolors[index] = color;
        setColors(tempcolors);
        updateColor(index,color);
    };


    // push new color to current palette
    const addColor = () => {
        if(colors.length >= 7){
            message.error("Cannot add more colors")
        }
        else{
            const newPalette = [...colors, colors[0]]
            setColors(newPalette);
            console.log(newPalette);
            setPalette(newPalette.toString());
        }
    };

    // pop last color from current palette
    const removeColor = () => {
        if(colors.length < 2){
            message.error("Cannot delete more colors")
        }
        else{
            setPalette(colors.slice(0,-1).toString());
            setColors(colors.slice(0,-1));
        }
    };

/* ----------------------------------------
    Rendering
---------------------------------------- */
    // Builds dropdown of palette items from saved list
    const populateDropdown = () => {
        const paletteItems = [];
        for (const [index, value] of savedPalettes.entries()) {
            paletteItems.push(
                <Select.Option value={value.name} key={index} >
                    <PaletteListItem name={value.name} colors={value.colors.split(",")} />
                </Select.Option>
            );
          }
        return(
            <Select
                defaultValue={savedName}
                value={savedName}
                onChange={handlePaletteChange}
                size='large'
                style={{width:'250px'}}
                loading={loading}
            >
                {paletteItems}
            </Select>
        );
    }

    

    function renderColorBlock(){
        if(!loading){
            return(
                <Space direction='vertical' style={rowStyle}>
                    <ReactTooltip/>
                        <Space wrap={true} align="center" style={{marginBottom:'15px'}}>
                            {populateDropdown()}
                            <Space wrap={false}>
                                <Tooltip title="Create Palette" >
                                    <Button type="default" onClick={onSaveAs} >
                                        <FileAddOutlined  style={{verticalAlign:'baseline'}}/>
                                    </Button>
                                </Tooltip>
                                <Divider type="vertical"/>
                            </Space>
                        </Space>
                    <PalettePicker 
                        colors={colors}
                        locked={false}
                        onChange={handleColorChange}
                        onComplete={handleColorComplete}
                        addColor={addColor}
                        removeColor = {removeColor}
                        style={rowStyle}
                    />
                    <div style={{backgroundColor:'#fff'}}>
                    <SaveModal  style={{backgroundColor:'#fff'}} visible={saveVisible} name={palette.name} onSubmit={saveAs} onCancel={onSaveCancel}/>
                    </div>
                   
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