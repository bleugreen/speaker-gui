import React from 'react';
import 'antd/dist/antd.css';

// ColorDot returns small circle of given color for palette dropdown items
function ColorDot({color}) {
    const style = {
        width: '15px',
        height: '15px',
        borderRadius: '10px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        background: color,
    }

    return (
        <div style={style} data-testid="dot" />
    );
}

export default ColorDot;
