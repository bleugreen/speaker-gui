import axios from "axios";
import {useEffect, useState} from "react";
import {Col, Row, Menu, Dropdown} from "antd";
import {CloseOutlined, DownOutlined, PlusOutlined} from "@ant-design/icons";

import './style.css';
import IconButton from "../IconButton";

const SceneFilter = ({filter, setFilter, onNewScene}) => {
    const [taglist,setTaglist] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            axios
                .get('/api/scene/tags')
                .then((response) => {
                    setTaglist(response.data.split(','));
                })
                .catch((response) => {
                    console.log(response)
                });
            setLoading(false)
        }
    });

    const handleMenuClick = (e) => {
        if (e.key) 
            setFilter([
                ...filter,
                e.key
            ]);
        }
    
    const handleTagClose = (closedTag) => {
        let newTags = filter.filter(t => t != closedTag);
        setFilter(newTags)
    }

    const menu = (
        <Menu onClick={handleMenuClick}>
            {taglist.map((tag) => {
                if (!filter.includes(tag)) 
                    return <Menu.Item key={tag}>{tag}</Menu.Item>
                else 
                    return
            })
}
        </Menu>
    );

    if (loading) 
        return <div></div>
    else 
        return (
            <Row gutter={[0, 0]} align="start" justify="space-between">
                <Col xs={6} sm={4} lg={3}>
                    <Dropdown overlay={menu}>
                        <p
                            className="dropdownButton"
                            onClick={e => e.preventDefault()}
                            onDoubleClick={() => {
                            setFilter([])
                        }}>
                            Filter
                            <DownOutlined className="smallMarginLeft"/>
                        </p>
                    </Dropdown>
                </Col>

                <Col xs={16} sm={14} lg={17}>
                    <div className="scrollable filterTagBox">
                        {filter.map((tag, index) => {
                            if (tag) {
                                return (
                                    <div key={tag} className="tag tagMatch smallMarginLeft">
                                        {tag}
                                        <CloseOutlined
                                            size="small"
                                            className="smallMarginLeft"
                                            onClick={() => {
                                            handleTagClose(tag)
                                        }}/>
                                    </div>
                                )
                            } else 
                                return
                        })
}
                    </div>
                </Col>
                <Col
                    xs={0}
                    sm={6}
                    md={5}
                    lg={4}
                    style={{
                    textAlign: 'right'
                }}>
                    <IconButton onClick={onNewScene}><PlusOutlined/>
                        New Scene</IconButton>
                </Col>
                <Col
                    xs={2}
                    sm={0}
                    style={{
                    textAlign: 'right'
                }}>
                    <IconButton tooltip="New Scene" onClick={onNewScene}><PlusOutlined/></IconButton>
                </Col>
            </Row>
        )
}
export default SceneFilter;
