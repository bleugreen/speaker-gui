import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";

const { Tag, Input, Menu, Dropdown } = require("antd")

const TagList = ({theme, tags, setTags}) => {
    const [inputVisible, setInputVisible]= useState(false)
    const [tagMenuVisible, setTagMenuVisible] = useState(false);
    const [savedTags, setSavedTags] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        if(loading){
            // get tags
            axios.get('/api/scene/tags')
            .then((response) => {
                const saved = response.data.split(',');
                setSavedTags(saved);

            })
            .catch( (response) => {console.log(response)});
            setLoading(false)
        }
    });

    const saveTag = (tag) => {
        if(!savedTags.includes(tag)){
            axios.request ({
                url: '/api/scene/tags',
                method: 'post',
                data: {
                  tag: tag,
                }
              })
              .then(function (response) {})
              .catch(function (response) { console.log(response) });

        }
    }
    
    const handleMenuClick = (e) => {
        console.log(e)
        if(e.key == 'newtag'){
            setInputVisible(true);
            closeMenu()
        }
        else{
            if(!tags.includes(e.key)){
                setTags([...tags, e.key].toString());
            }
        }
        
    }
    const menu = (
        <Menu onClick={handleMenuClick}>
            {
                savedTags.map((tag) => {
                    if(!tags.includes(tag)) return <Menu.Item key={tag}>{tag}</Menu.Item>
                    else return
                })
            }
            <Menu.Item key='newtag' style={{textAlign:'center'}}><PlusOutlined/></Menu.Item>
        </Menu>
    )
    
    
    // const buildList

    const handleTagMenu = (e) => {
        e.preventDefault();
        if(tagMenuVisible){
            setTagMenuVisible(false);
        }
        else{
            setTagMenuVisible(true);
            e.stopPropagation();
            document.addEventListener("click", closeMenu);
        }
    }

    const closeMenu = () => {
        console.log('close called')
        setTagMenuVisible(false);
        document.removeEventListener('click', closeMenu);
    }

    const handleTagClose = (e) => {
        const deletedTag = e.target.parentElement.id || e.target.id
        let newTags = tags.filter(t=> t != deletedTag);
        console.log(newTags.toString());
        setTags(newTags.toString());
    }

    const handleNewTag = (e) => {
        console.log(e.target.value);
        if(!tags.includes(e.target.value)){
            setTags([...tags, e.target.value].toString());
        }

        if(!savedTags.includes(e.target.value)){
            setSavedTags([...savedTags, e.target.value]);
            saveTag(e.target.value);
        }
        setInputVisible(false);
    }

    const addTag = () =>{
        if(inputVisible){
            return(
                <Input
                    style={{width: '78px',
                        marginRight: '8px',
                        verticalAlign: 'top'}}
                    size='small'
                    onPressEnter={handleNewTag}
                    autoFocus={true}
                />

            )
        }
        else{
            return(
                <Tag style={{ backgroundColor:theme.fg, color:theme.fg}} >
                    <Dropdown overlay={menu} trigger={[]} visible={tagMenuVisible}>
                        <PlusOutlined style={{color:theme.text2}} onClick={handleTagMenu} />
                    </Dropdown>
                </Tag>
            )
        }
    }

    return(
       <div style={{marginTop:'10px'}}>
            {
                tags.map((tag, index) => {
                    if(tag){
                    return(
                        <Tag key={tag}
                            closable={true}
                            style={{backgroundColor:theme.fg, color:theme.text2, }}
                            closeIcon={<CloseOutlined id={tag} onClick={handleTagClose} style={{color:theme.text2}}/>}
                            
                        >
                            {tag}
                        </Tag>
                    )}
                })
            }
            { addTag() }
       </div>
    )
}
export default TagList;