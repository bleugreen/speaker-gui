import { Input } from "antd";
import Title from "antd/lib/typography/Title";
import { useEffect, useRef, useState } from "react"

function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}

const RenameInput = ({theme, value, onCancel, onSubmit, size='large'}) => {
    const [input, setInput] = useState(value);
    const inputRef = useRef(null);
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

    useEffect(()=>{
        if(!isComponentVisible){
            handleSubmit();
        }
    })

    const onClick = (e) => {
        inputRef.current.focus({
            cursor: 'all',
        });
        setIsComponentVisible(true);
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = () => {
        console.log('submit: '+input);
        onSubmit(input);
    }

    return(
    <div ref={ref}>
        <Input 
            onClick={onClick} 
            ref={inputRef} 
            size={size} 
            defaultValue={input} 
            value={input} 
            onChange={handleChange} 
            onPressEnter={handleSubmit}
        />
    </div>
    )
}

export default RenameInput;