import { CloseOutlined, DownOutlined } from "@ant-design/icons";
import { Col, Row, Tag, Input, Menu, Dropdown, Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const SceneFilter = ({theme, filter, setFilter}) => {
    const [taglist, setTaglist] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        if(loading){
            // get tags
            axios.get('/api/scene/tags')
            .then((response) => {
                const saved = response.data.split(',');
                setTaglist(saved);

            })
            .catch( (response) => {console.log(response)});
            setLoading(false)
        }
    });

    const handleMenuClick = (e) => {
        const newTag = e.key;
        setFilter([...filter, newTag]);
    }

    const handleTagClose = (closedTag) => {
        let newTags = filter.filter(t=> t != closedTag);
        console.log('tags after delete: '+newTags);
        setFilter(newTags)
    }


    const menu = (
        <Menu onClick={handleMenuClick}>
            {
                taglist.map((tag) => {
                    if(!filter.includes(tag)) return <Menu.Item key={tag}>{tag}</Menu.Item>
                    else return
                })
            }
        </Menu>
    );
    if(loading) return <div></div>

    return(
        <Row gutter={[16,16]} align="start" justify="start">
            <Col xs={{span:7, offset:0}} sm={{span:5, offset:1}} md={{span:4, offset:2}} lg={{span:4, offset:1}} xl={{span:4, offset:1}}>
            <Dropdown overlay={menu} >
            <p style={{backgroundColor:theme.fg, padding:"5%", borderRadius:"8px",color:theme.text2, cursor:"pointer"}} onClick={e => e.preventDefault()}>
            Filter <DownOutlined />
            </p>
                </Dropdown>
            </Col>
            <Col span={10}>
            {
                filter.map((tag, index) => {
                    if(tag){
                    return(
                        <Tag key={tag}
                            closable={true}
                            onClose={(e)=>{handleTagClose(tag)}}
                            style={{backgroundColor:theme.fg, color:theme.text2, padding:"2%", borderRadius:"8px", marginLeft:"10px", marginBottom:"10px"}}
                            closeIcon={<CloseOutlined id={tag}  style={{color:theme.text2}}/>}
                            
                        >
                            {tag}
                        </Tag>
                    )}
                })
            }
            </Col>

        </Row>
    )

}
export default SceneFilter;
