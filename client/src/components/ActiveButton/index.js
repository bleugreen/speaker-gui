import { Button } from "antd";
import { useEffect, useState } from "react";

const ActiveButton = ({sid, theme, active, setActive}) => {
    const [isActive, setIsActive] = useState(sid == active);

    useEffect(()=>{
        setIsActive(sid == active)
    }, [active]);

    const handleClick = () => {
        setIsActive(!isActive);
        if(sid != active){
            setActive(sid)
        }
        else{
            setActive(-1);
        }
    }

    if(isActive){
        return <Button 
            type="primary" 
            onClick={handleClick} 
            style={{
                backgroundColor:theme.blue,
                color: theme.fg
            }}
        >
            Active
        </Button>
    }
    else{
        return <Button 
            type="default" 
            onClick={handleClick}
            style={{
                backgroundColor:theme.fg,
                borderColor:theme.blue,
                color: theme.blue
            }}
        >
            Set Active
        </Button>
    }
}
export default ActiveButton;