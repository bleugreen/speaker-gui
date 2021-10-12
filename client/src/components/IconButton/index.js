import { Button, Tooltip } from "antd";
import { useState } from "react";

import './style.css';

const IconButton = ({onClick, children, tooltip, className}) => {
    const [hover, setHover] = useState(false);
    const [click, setClick] = useState(false);
    let btnClass = className ? className: "btn-default";
    const h = (hover) ? "btn-hover": ""
    const c = (click) ? " btn-down " : " btn-up "
    return(
        <button className={btnClass +" "+ c +" "+h+" btn"} 
            onMouseEnter={()=>{setHover(true)}} 
            onMouseLeave={()=>{setHover(false)}} 
            onMouseDownCapture={()=>{setClick(true)}}
            onMouseUpCapture={()=>{setClick(false)}}
            onClick={onClick}
        >
            {(tooltip) ? <Tooltip title={tooltip}>{children}</Tooltip> : children}
        </button>
    )
}
export default IconButton;