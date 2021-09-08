import { useState } from "react";
import './style.css';

const MyButton = ({onClick, children}) => {
    const [hover, setHover] = useState(false);

    let className = (hover) ? "btn btn-hover": "btn"

    return(
       <button className={className} onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>{children}</button>
    )
}
export default MyButton;