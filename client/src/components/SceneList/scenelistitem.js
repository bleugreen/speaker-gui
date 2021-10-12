import { Link } from "react-router-dom";
import { Col, Space } from "antd"
import Title from "antd/lib/typography/Title"
import { EllipsisOutlined } from "@ant-design/icons"

import ActiveButton from "../ActiveButton"


import IconButton from "../IconButton";


const SceneListItem = ({sid, active, setActive, filter, name, tags, addToFilter}) => {
    const handleTagClick = (e) => { addToFilter(e.target.innerText) }

    return (
        <Col className="sceneItem" xl={7} lg={11} md={11} sm={24} xs={24}>
            <div className="sceneItemTop">
                <Title align="left">{name}</Title>
                <Space className="scrollable">
                {
                    tags.map((tag, index)=>{
                        const colorStyle = (filter.includes(tag)) ? "tagMatch" : "tagNoMatch"
                        return tag && <p 
                        key={tag} 
                        className={"tag "+colorStyle}
                        onClick={handleTagClick}>{tag}</p>
                    })
                }
                </Space>
            </div>
            <div className="sceneItemBottom">
                <ActiveButton sid={sid} active={active} setActive={setActive}/>
                <Link to={"/scene/"+sid}>
                    <IconButton className="detailsButton">
                        <EllipsisOutlined/>
                    </IconButton>
                </Link>
            </div>
        </Col>
    )
}
export default SceneListItem;