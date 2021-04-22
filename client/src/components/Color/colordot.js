import React from 'react';
import 'antd/dist/antd.css';
import { Tooltip } from 'antd';

// ColorDot returns small circle of given color for palette dropdown items
function ColorDot({color, size, text}) {
    const style = {
        width: '15px',
        height: '15px',
        borderRadius: '10px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        background: color,
    };
    if(size){
        style.width = size.toString()+"px";
        style.height = size.toString()+"px";
        style.borderRadius = (size/2).toString()+"px";
    }


    if(text){
        return (
            <Tooltip title={text}><div style={style} data-testid="dot" /></Tooltip>
        );
    }
    else{
        return (<div style={style} data-testid="dot" />)
    }
}

export default ColorDot;
