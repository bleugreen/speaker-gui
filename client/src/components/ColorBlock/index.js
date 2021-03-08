import axios from 'axios';
import { message, Row, Col, Spin, Collapse, Radio, Typography, Space, Select, Button, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import {
    SaveOutlined, FileAddOutlined, DeleteOutlined
  } from '@ant-design/icons';

  

import PalettePicker from '../PalettePicker';
import PaletteListItem from './paletteListItem';
import Modal from 'antd/lib/modal/Modal';
import SaveModal from './savemodal';

const { Panel } = Collapse;
const { Text } = Typography; 

function ColorBlock(props){
// props: id, type, 
// type=0: color1, color2, color3, name
// type=1: hueL, hueH, sat, lum, name
    const [id, setId] = useState(props.id);
    const [type, setType] = useState(props.type);
    const [loading, setLoading] = useState(true);
    const [saveVisible, setSaveVisible] = useState(false);
    const [paletteName, setPaletteName] = useState(props.palette);
    const [palette, setPalette] = useState({
        name: props.palette,
    });
    const [savedPalettes, setSaved] = useState([])

    useEffect(() =>{
        if(loading){
            getPalettes();
        }
    });

    const getPalettes = () => {
        setSaved([]);
        console.log(savedPalettes.length);
        axios.get('/palette/list', {})
        .then(function (response) {
            response.data.map(p => {
                getPalette(p, function(res){
                    let temp_palette = {
                        name: res.data.name,
                        color1: res.data.color1,
                        color2: res.data.color2,
                        color3: res.data.color3,
                    }
                    if(loading && p == palette.name){
                        setPalette(temp_palette);
                        console.log('found prop palette');
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
        axios.get('/palette', {
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

    const populateDropdown = () => {
        const paletteItems = [];
        savedPalettes.map(item => {
            paletteItems.push(
                <Select.Option 
                    value={item.name} 
                    key={item.name}
                >
                    <PaletteListItem name={item.name} color1={item.color1} color2={item.color2} color3={item.color3} />
                </Select.Option>
            );
        });
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

    const savePalette = (name) => {
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
            axios.request ({
                url: '/palette',
                method: 'post',
                data: {
                    name: name,  
                    color1: palette.color1,
                    color2: palette.color2,
                    color3: palette.color3,
                }, 
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    setPalette({
                        ...palette,
                        name:name
                    });
                    getPalettes();
                })
                .catch(function (response) {
                //handle error
                console.log(response);
                });
        }
    }

    const onSave = () => {
        savePalette(palette.name);
    }
    const onSaveAs = () => {
        // open modal that grabs name input
        setSaveVisible(true);
        console.log(saveVisible);
    }

    const onSaveCancel = () => {
        setSaveVisible(false);
    }

    const saveAs = (name) => {
        setSaveVisible(false);
        savePalette(name);
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
            axios.get('/palette/del', {
                params: {
                    name: palette.name,
                }
            })
            .then(function (response) {
                setPalette({
                    ...palette,
                    name:'default'
                });
                getPalettes();
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
        setPalette({
            ...palette,
            ["color"+index]: color
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

    const radioStyle = {
        display: 'block',
    };

    const radioButtonStyle = {
        height: '30px',
        lineHeight: '30px',
        width:"50%",
    };

    const rowStyle = {
        width:"100%",
    };

    function renderColorBlock(){
        
        if(!loading){
            if(type == "palette"){
                return(
                        <Space direction='vertical' style={rowStyle}>
                        <SaveModal visible={saveVisible} name={palette.name} onSubmit={saveAs} onCancel={onSaveCancel}/>
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
                                    Range
                                    </Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                        
                        <PalettePicker 
                            color1={palette.color1}
                            color2={palette.color2}
                            color3={palette.color3}
                            onChange={handleColorChange}
                            style={rowStyle}
                        />
                            
                        <Row style={rowStyle}>
                            
                            <Col span={24} style={{display:'block',alignSelf: 'flex-end', alignItems:"flex-end"}} >

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