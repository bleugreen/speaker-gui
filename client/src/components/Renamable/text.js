import Text from "antd/lib/typography/Text";
import { useState } from "react";
import RenameInput from "./input";

const RenamableText = ({theme, text, onSubmit}) => {
    const [inputVisible, setInputVisible] = useState(false);

    const handleSubmit = (val) => {
        setInputVisible(false);
        onSubmit(val)
    }

    const render = () => {
        if(inputVisible){
            return <RenameInput theme={theme} value={text} size="medium" onSubmit={handleSubmit} />
        }
        else{
            return <Text>{text}</Text>
        }
    }

    return(
        <div onDoubleClick={()=>{setInputVisible(true)}}>
            {render()}
        </div>
    )
}

export default RenamableText;