import { Button } from "antd";
import { useState } from "react";
import './style.css';

const MyButton = ({onClick, children}) => {
    const [hover, setHover] = useState(false);
    const [click, setClick] = useState(false);

    let className = (hover) ? "btn btn-hover": "btn"
    className += (click) ? " btn-down" : " btn-up"
    return(
       <button className={className} 
       onMouseEnter={()=>{setHover(true)}} 
       onMouseLeave={()=>{setHover(false)}} 
       onMouseDownCapture={()=>{setClick(true)}}
       onMouseUpCapture={()=>{setClick(false)}}
       onClick={onClick}
       >
           {children}
       </button>
    )
}
export default MyButton;