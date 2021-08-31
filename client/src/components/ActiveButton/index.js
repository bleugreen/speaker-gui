import { Button } from "antd";
import { useEffect, useState } from "react";

const ActiveButton = ({sid, theme, active, setActive}) => {
    const [isActive, setIsActive] = useState(sid == active);

    useEffect(()=>{
        setIsActive(sid == active)
    }, [active]);

    const handleClick = () => {
        const newSid = (sid != active) ? sid : -1;
        setActive(newSid);
        setIsActive(newSid == active);
    }

    const activeProps = {
        style:{
            backgroundColor:theme.blue,
            color: theme.fg
        },
        type:"primary",
        children:<p>Active</p>
    };

    const inactiveProps = {
        style:{
            backgroundColor:theme.fg,
            borderColor:theme.blue,
            color: theme.blue
        },
        type:"default",
        children:<p>Set Active</p>
    }

    const props = (isActive) ? activeProps : inactiveProps;

    return <Button {...props} onClick={handleClick}/>
}
export default ActiveButton;