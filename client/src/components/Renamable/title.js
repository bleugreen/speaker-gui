import Title from "antd/lib/typography/Title";
import { useState } from "react";
import RenameInput from "./input";

const RenamableTitle = ({theme, text, onSubmit}) => {
    const [inputVisible, setInputVisible] = useState(false);

    const handleSubmit = (val) => {
        setInputVisible(false);
        onSubmit(val)
    }

    const render = () => {
        if(inputVisible){
            return <RenameInput theme={theme} value={text} onSubmit={handleSubmit} />
        }
        else{
            return <Title>{text}</Title>
        }
    }

    return(
        <div onDoubleClick={()=>{setInputVisible(true)}}>
            {render()}
        </div>
    )
}

export default RenamableTitle;