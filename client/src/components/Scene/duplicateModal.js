import { Button, Divider, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useRef, useState } from "react";

const DuplicateButton = ({theme, onDuplicate, margin, name}) => {
    const [visible, setVisible] = useState(false);
    const [dupName, setName] = useState(name + " copy")

    const inputRef = useRef(null);

    const buttonStyle = {
        marginLeft:margin,
        borderColor:theme.text2,
        color:theme.text2
    };
    const modalBodyStyle = {
        backgroundColor:theme.fg,
        color:theme.text,
        borderRadius:"20px"
    };

    const handleClick = () => {
        setVisible(true);

    }

    const onCancel = () => {
        setVisible(false);
        setName(name+" copy");
    }

    const onInputClick = () => {
        inputRef.current.focus({
            cursor: 'all',
          });
    }

    const onSubmit = () => {
        setVisible(false);
        onDuplicate(dupName);        
    }

    const onNameChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value)
    }


    return(
        <>
            <Modal
                centered
                visible={visible}
                onCancel={onCancel}
                footer={null}
                bodyStyle={modalBodyStyle}
                
            >
                <Input 
                    style={{marginTop:'20px'}}
                    defaultValue={dupName} 
                    value={dupName} 
                    onChange={onNameChange}
                    onPressEnter={onSubmit}
                    ref={inputRef}
                    onClick={onInputClick}
                
                />
                <Divider/>
                <Button style={{marginLeft:"50%"}}onClick={onSubmit}>Duplicate</Button>
                <Button style={{marginLeft:"10px"}}onClick={onCancel}>Cancel</Button>
            </Modal>
            <Button type="ghost" style={buttonStyle} onClick={handleClick}>Duplicate Scene</Button>
        </>
    )
}

export default DuplicateButton;