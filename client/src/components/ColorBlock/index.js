import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { message, Row, Col, Spin, Collapse, Typography, Space, Select, Button, Divider } from 'antd';
import {
    SaveOutlined, FileAddOutlined, DeleteOutlined, LockOutlined, LockTwoTone
  } from '@ant-design/icons';

import PalettePicker from '../PalettePicker';
import PaletteListItem from './paletteListItem';
import SaveModal from './savemodal';
import LayerBlock from '../LayerBlock';


const { Panel } = Collapse;
const { Text } = Typography; 

function ColorBlock({pid, active, setPid}){
    const [loading, setLoading] = useState(true);
    const [saveVisible, setSaveVisible] = useState(false);
    const [palette, setPalette] = useState({});
    const [savedPalettes, setSaved] = useState([]);

    

    useEffect(() =>{
        console.log(palette);
        if(loading){
            initColor();
            getPalettes();
        }
    });

    // Get palette associated with given pid
    const initColor = () => {
        getPalette(pid, function(res){
            let temp_palette = {
                pid: pid,
                name: res.data[0],
                locked: (res.data[1]=="true"),
                colors: res.data.slice(2),
                numcolors: res.data.length-1
            }
            console.log("Init palette: "+temp_palette.name);
            setPalette(temp_palette);
        })
    }

    const getPalettes = () => {
        setSaved([]);
        //console.log(savedPalettes.length);
        axios.get('/api/palette/list', {})
        .then(function (response) {
            //console.log(response.data);
            response.data.sort(function(a, b) {
                return (a < b) ? -1 : (a > b) ? 1 : 0;
            });
            response.data.map(p => {
                getPalette(p, function(res){
                    let temp_palette = {
                        pid: p,
                        name: res.data[0],
                        locked: (res.data[1]=="true"),
                        colors: res.data.slice(2),
                        numcolors: res.data.length-1
                    }
                    if(loading && p == palette.name){
                        setPalette(temp_palette);
                        //console.log('found prop palette');
                        setLoading(false);
                    }
                    setSaved(savedPalettes => [...savedPalettes, temp_palette])
                })
            })
            //console.log(response.data);
        }).catch(function (response) {
          //handle error
          console.log(response);
        });
        setLoading(false);
    }

    const saveNewPalette = (name) => {
        // send palette to db
        // refresh palette list
       
            //console.log(palette.colors);  
            axios.request ({
                url: '/api/palette/new',
                method: 'post',
                data: {
                    pid: pid,
                    name: name,
                    locked:false,  
                    colors: palette.colors,
                }, 
            })
            .then(function (response) {
                console.log("save: "+response.data);
                setPalette({
                    name:name,
                    locked:false,
                    colors: palette.colors,
                });
                setPid(response.data);
                updateSavedPalettes(response.data);
            })
            .catch(function (response) { console.log(response) });

    }

    const updatePalette = (index, color) => {
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
                    index: index+2,
                    color: color,
                }, 
            })
            .then(function (response) {
                console.log("save: "+response.data);
                updateSavedPalettes(pid);
            })
            .catch(function (response) { console.log(response) });
        }
    }

    const updateLocked = (locked) => {
        // send palette to db
        // refresh palette list
            console.log("update lock");
            //console.log(palette.colors);  
            axios.request ({
                url: '/api/palette/update',
                method: 'post',
                data: {
                    pid: pid,
                    index: 1,
                    color: locked,
                }, 
            })
            .then(function (response) {
                console.log("save: "+response.data);
                updateSavedPalettes(pid);
            })
            .catch(function (response) { console.log(response) });

    }

    const updateSavedPalettes = (id) => {
        console.log("update saved: "+id);
        getPalette(id, function(res){
            let temp_palette = {
                pid: id,
                name: res.data[0],
                locked: (res.data[1]=="true"),
                colors: res.data.slice(2),
                numcolors: res.data.length-2
            }
            const newSaved = savedPalettes.filter(p => p.pid != id);
            if(temp_palette.numcolors >0){
                newSaved.push(temp_palette);
            }
            newSaved.sort(function(a, b) {
                return (a.pid < b.pid) ? -1 : (a.pid > b.pid) ? 1 : 0;
            });
            setSaved(newSaved);
        });


    }

    const getPalette = (search, singleCallback) => {
        axios.get('/api/palette', {
            params: {
                pid: search,
            }
        })
        .then(function (response) {
            singleCallback(response);
            //console.log("got: "+response.data);
        }).catch(function (response) {
          //handle error
          console.log(response);
        });
    }

    const populateDropdown = () => {
        const paletteItems = [];
        for (const [index, value] of savedPalettes.entries()) {
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

    


    const onSaveAs = () => {
        // open modal that grabs name input
        setSaveVisible(true);
        //console.log(saveVisible);
    }

    const onSaveCancel = () => {
        setSaveVisible(false);
    }

    const saveAs = (name) => {
        setSaveVisible(false);
        saveNewPalette(name);
    }

    const onDelete = () => {
        
        // open modal that grabs name input
        if(palette.locked){
            message.error({
                content: 'Palette Locked',
                style: {
                    marginTop: '8vh',
                  },
            });
        }
        else{
            axios.get('/api/palette/del', {
                params: {
                    pid: pid,
                    name: palette.name,
                }
            })
            .then(function (response) {
                console.log("del: "+pid);
                updateSavedPalettes(pid);
                let it = 0;
                while(savedPalettes[it].pid == pid) it++;
                setPalette(savedPalettes[it]);
                setPid(savedPalettes[it].pid);
                //console.log(response.data);
            }).catch(function (response) {
                //handle error
                console.log(response);
            });
        }
        
    }

    const handleColorChange = (index, color) => {
        if(palette.locked){
            console.log('no no no');
        }
        else{
        // data.index, data.color
        // set mode.color+(index) to data.color
        let tempcolors = [...palette.colors];
        tempcolors[index] = color;
        setPalette({
            ...palette,
            colors: tempcolors
        });
    }
    };

    const handleColorComplete = (index, color) => {
        if(palette.locked){
            message.error({
                content: 'Palette Locked',
                style: {
                    marginTop: '8vh',
                  },
            });
        }
        else{
        // data.index, data.color
        // set mode.color+(index) to data.color
        let tempcolors = [...palette.colors];
        tempcolors[index] = color;
        
        setPalette({
            ...palette,
            colors: tempcolors
        });

        updatePalette(index,color);
    }
    };

    const handlePaletteChange = (data) => {
        console.log(data);
        savedPalettes.map(item => {
            if(data == item.pid){
                setPid(item.pid);
                setPalette(item);
            }
        })
    };

    const addColor = () => {
        if(palette.locked){
            message.error({
                content: 'Palette Locked',
                style: {
                    marginTop: '8vh',
                  },
            });
        }
        else{
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
                    //handle success
                    console.log(response);
                    setPalette({
                        pid: pid,
                        name:palette.name,
                        colors: [...palette.colors, palette.colors[0]],
                        numcolors: palette.colors.length
                    });
                    setPid(pid);
                    updateSavedPalettes(pid);
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        }
    }
    };

    const removeColor = () => {
        if(palette.locked){
            message.error({
                content: 'Palette Locked',
                style: {
                    marginTop: '8vh',
                  },
            });
        }
        else{
        if(palette.colors.length < 2){
            message.error("Cannot delete more colors")
        }
        else{
            axios.get('/api/palette/pop', {
                params: {
                    pid: pid,
                    name: palette.name,
                }
            })
            .then(function (response) {
                setPalette({...palette, colors:palette.colors.slice(0,-1)});
                setPid(pid);
                updateSavedPalettes(pid);
                //console.log(response.data);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        }
    }
    };

    const onLock = () => {
        updateLocked(!palette.locked);
        setPalette({
            ...palette,
            locked: !palette.locked,
        });
        console.log(palette.locked);
    }

    const renderLock = () => {
        if(palette.locked){
            return  <LockTwoTone style={{verticalAlign:'baseline'}}/>
        }
        else{
            return  <LockOutlined style={{verticalAlign:'baseline'}}/>
        }
    }

    const radioStyle = { display: 'block' };

    const radioButtonStyle = {
        height: '30px',
        lineHeight: '30px',
        width:"30%",
    };

    const rowStyle = { width:"100%" };



    function renderColorBlock(){
        if(!loading){
            return(
                <Space direction='vertical' style={rowStyle}>
                    <Row style={rowStyle}>
                        <Col span={24} >
                            <Space wrap={true}>
                                {populateDropdown()}
                                <Divider direction="vertical"/>
                                <Space wrap={false}>
                                    <Button type="default" onClick={onLock} >
                                        {/* <LockOutlined style={{verticalAlign:'baseline'}}/> */}
                                        {renderLock()}
                                    </Button>
                                    <Button type="default" onClick={onSaveAs} >
                                        <FileAddOutlined style={{verticalAlign:'baseline'}}/>
                                    </Button>
                                    <Button type="default" onClick={onDelete} >
                                        <DeleteOutlined style={{verticalAlign:'baseline'}}/> 
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
    );
}
export default ColorBlock;