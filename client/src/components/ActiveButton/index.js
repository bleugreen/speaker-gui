import { CaretRightFilled, PlayCircleOutlined, PlaySquareOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useEffect, useState } from "react";

import './style.css'

const ActiveButton = ({sid, active, setActive}) => {
    const [isActive, setIsActive] = useState(sid == active);
    useEffect(()=>{ setIsActive(sid == active)}, [active]);

    const handleClick = () => {
        const newSid = (sid != active) ? sid : -1;
        setActive(newSid);
        setIsActive(newSid == active);
    }

    const activeProps = {
        className: 'active',
        type:"primary",
        children:<CaretRightFilled/>
    };

    const inactiveProps = {
        className: 'inactive',
        type:"ghost",
        
    }

    const props = (isActive) ? activeProps : inactiveProps;
    const tooltipText = (isActive) ? "Active" : "Set Active"

    return <Tooltip title={tooltipText}><Button {...props} onClick={handleClick}><CaretRightFilled/></Button></Tooltip>
}
export default ActiveButton;