import React from 'react';
import 'antd/dist/antd.css';

function ColorDot(props) {
    const style = {
        width: '15px',
        height: '15px',
        borderRadius: '10px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        background: props.color,
    }

    console.log("dot: "+props.color)
    return (
        
        <div style={style} />
    );
}

export default ColorDot;
