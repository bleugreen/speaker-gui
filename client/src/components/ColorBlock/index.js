import axios from 'axios';
import { message, Row, Col, Spin, Collapse, Radio, Typography, Space, Select, Button, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import {
    SaveOutlined, FileAddOutlined, DeleteOutlined
  } from '@ant-design/icons';

import PalettePicker from '../PalettePicker';
import PaletteListItem from './paletteListItem';
import SaveModal from './savemodal';
axios.defaults.port = 5000;

const { Panel } = Collapse;
const { Text } = Typography; 

function ColorBlock(props){
// props: id, type, 

    const [id, setId] = useState(props.id);
    const [type, setType] = useState(props.type);
    const [loading, setLoading] = useState(true);
    const [saveVisible, setSaveVisible] = useState(false);
    const [paletteName, setPaletteName] = useState(props.palette);
    const [palette, setPalette] = useState({
        name: props.palette,
    });
    const [savedPalettes, setSaved] = useState([]);
    

    useEffect(() =>{
        if(loading){getPalettes();}
    });

    const getPalettes = () => {
        setSaved([]);
        //console.log(savedPalettes.length);
        axios.get('/api/palette/list', {})
        .then(function (response) {
            //console.log(response.data);
            response.data.sort(function(a, b) {
                var textA = a.toUpperCase();
                var textB = b.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            response.data.map(p => {
                getPalette(p, function(res){
                    let temp_palette = {
                        name: res.data[0],
                        colors: res.data.slice(1),
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

    const getPalette = (search, singleCallback) => {
        axios.get('/api/palette', {
            params: {
                name: search,
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

    const savePalette = (name, url) => {
        // send palette to db
        // refresh palette list
        if(name == 'default'){
            message.error({
                content: 'Cannot overwrite default palette',
                style: {
                    marginTop: '8vh',
                  },
            });
        }
        else{          
            //console.log(palette.colors);  
            axios.request ({
                url: url,
                method: 'post',
                data: {
                    name: name,  
                    colors: palette.colors,
                    numcolors: palette.colors.length
                }, 
            })
                .then(function (response) {
                    //handle success
                    //console.log(response);
                    setPalette({
                        name:name,
                        colors: palette.colors,
                        numcolors: palette.colors.length
                    });
                    getPalettes();
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });
        }
    }

    const populateDropdown = () => {
        const paletteItems = [];
        savedPalettes.map(item => {
            paletteItems.push(
                
            );
        });
        for (const [index, value] of savedPalettes.entries()) {
            paletteItems.push(<Select.Option 
                value={value.name} 
                key={index}
            >
                <PaletteListItem name={value.name} colors={value.colors} />
            </Select.Option>);

          }
        return(
            <Select
                defaultValue="default"
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

    

    const onSave = () => {
        savePalette(palette.name, '/api/palette/update');
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
        savePalette(name, '/api/palette/new');
    }

    const onDelete = () => {
        // open modal that grabs name input
        if(palette.name == 'default'){
            message.error({
                content: 'Cannot delete default palette',
                style: {
                    marginTop: '8vh',
                  },
            });
        }
        else{
            axios.get('/api/palette/del', {
                params: {
                    name: palette.name,
                }
            })
            .then(function (response) {
                getPalettes();
                setPalette(savedPalettes[0]);
                //console.log(response.data);
            }).catch(function (response) {
                //handle error
                console.log(response);
            });
        }
        
    }

    const handleColorChange = (index, color) => {
        // data.index, data.color
        // set mode.color+(index) to data.color
        let tempcolors = [...palette.colors];
        tempcolors[index] = color;
        
        setPalette({
            ...palette,
            colors: tempcolors
        });
        

    };

    const handlePaletteChange = (data) => {
        savedPalettes.map(item => {
            if(data == item.name){
                setPalette(item);
            }
        })
    };

    const handleRadioChange = (data) => {
        setType(data.target.value);
        
    };

    const addColor = () => {
        if(palette.colors.length >= 5){
            message.error("Cannot add more colors")
        }
        else{
            axios.request ({
                url: '/api/palette/push',
                method: 'post',
                data: {
                    name: palette.name,  
                    color: palette.colors[0],
                }, 
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    setPalette({
                        name:palette.name,
                        colors: [...palette.colors, palette.colors[0]],
                        numcolors: palette.colors.length
                    });
                    getPalettes();
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });
        }
    };

    const removeColor = () => {
        if(palette.colors.length < 3){
            message.error("Cannot delete more colors")
        }
        else{
            axios.get('/api/palette/pop', {
                params: {
                    name: palette.name,
                }
            })
            .then(function (response) {
                setPalette({...palette, colors:palette.colors.slice(0,-1)
                });

                getPalettes();
                //console.log(response.data);
            }).catch(function (response) {
            //handle error
            console.log(response);
            });
        }
    };

    const radioStyle = {
        display: 'block',
    };

    const radioButtonStyle = {
        height: '30px',
        lineHeight: '30px',
        width:"30%",
    };

    const rowStyle = {
        width:"100%",
    };

    function renderColorBlock(){
        
        if(!loading){
            if(type == "palette"){
                return(
                    //To separate:
                    //  take with: rowStyle 
                    //  props: 
                    
                    <Space direction='vertical' style={rowStyle}>
                        <Row style={rowStyle}>
                            <Col span={24}>
                                <Radio.Group 
                                    onChange={handleRadioChange} 
                                    defaultValue={type}
                                    optionType='button'
                                    buttonStyle="solid"
                                    style={radioStyle}
                                >
                                    <Radio.Button style={radioButtonStyle} value="palette">
                                    Palette
                                    </Radio.Button>
                                    <Radio.Button style={radioButtonStyle} value="range" disabled={true}>
                                    HCL
                                    </Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row style={rowStyle}>
                            <Col span={24} >
                                <Space wrap={true}>
                                    {populateDropdown()}
                                    <Divider direction="vertical"/>
                                    <Space wrap={false}>
                                        <Button
                                            type="default"
                                            onClick={onSave}
                                        >
                                            <SaveOutlined style={{verticalAlign:'baseline'}}/>
                                        </Button>
                                        <Button
                                            type="default"
                                            onClick={onSaveAs}
                                        >
                                            <FileAddOutlined style={{verticalAlign:'baseline'}}/>
                                        </Button>
                                        <Button
                                            type="default"
                                            onClick={onDelete}
                                        >
                                            <DeleteOutlined style={{verticalAlign:'baseline'}}/> 
                                        </Button>
                                    </Space>
                                </Space>
                            </Col>
                        </Row>
                        <PalettePicker 
                            colors={palette.colors}
                            onChange={handleColorChange}
                            addColor={addColor}
                            removeColor = {removeColor}
                            style={rowStyle}
                        />
                        <SaveModal visible={saveVisible} name={palette.name} onSubmit={saveAs} onCancel={onSaveCancel}/>
                    </Space>
                )
            }
        }
        else{
            return(
                <div>
                    <Spin />
                </div>
            )
        }

    }

    return(
        renderColorBlock()
    );


}
export default ColorBlock;