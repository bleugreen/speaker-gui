import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Tag, Menu, Dropdown } from "antd";
import { CloseOutlined, DownOutlined } from "@ant-design/icons";

const SceneFilter = ({filter, setFilter}) => {
    const [taglist, setTaglist] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        if(loading){
            // get tags
            axios.get('/api/scene/tags')
            .then((response) => {
                setTaglist(response.data.split(','));
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
            <Col 
                xs={{span:7, offset:0}} 
                sm={{span:4, offset:1}} 
                md={{span:4, offset:2}} 
                lg={{span:4, offset:1}} 
                xl={{span:4, offset:1}}
            >
                <Dropdown overlay={menu} >
                    <p className="dropdownButton" onClick={e => e.preventDefault()}>
                        Filter <DownOutlined />
                    </p>
                </Dropdown>
            </Col>

            <Col span={10}>
            {
                filter.map((tag, index) => {
                    if(tag){
                    return(
                        <Tag key={tag} className="filterTag" closable={true}
                            onClose={(e)=>{handleTagClose(tag)}}
                            closeIcon={<CloseOutlined className="smallMarginLeft"/>}
                        >
                            {tag}
                        </Tag>
                    )}
                    else return
                })
            }
            </Col>
        </Row>
    )

}
export default SceneFilter;
