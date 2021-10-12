import { CaretRightFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import IconButton from "../IconButton";

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
    };

    const inactiveProps = {
        className: 'inactive',
        
    }

    const className = (isActive) ? 'active' : 'inactive'

    const props = (isActive) ? activeProps : inactiveProps;
    const tooltipText = (isActive) ? "Active" : "Set Active"

    return <IconButton tooltip={tooltipText} className={className} onClick={handleClick}><CaretRightFilled/></IconButton>
}
export default ActiveButton;