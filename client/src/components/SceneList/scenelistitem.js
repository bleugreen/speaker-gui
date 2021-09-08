import { Link } from "react-router-dom";
import { Button, Col, Space, Tag } from "antd"
import Title from "antd/lib/typography/Title"
import { EllipsisOutlined } from "@ant-design/icons"

import ActiveButton from "../ActiveButton"
import './style.css';

const SceneListItem = ({sid, active, setActive, filter, name, tags, addToFilter}) => {
    const handleTagClick = (e) => { addToFilter(e.target.innerText) }

    return (
        <Col className="sceneItem" xl={7} lg={10} md={20} sm={22} xs={23}>
            <div className="sceneItemTop">
                <Title align="left">{name}</Title>
                <Space>
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
                    <Button type="ghost" className="detailsButton">
                        <EllipsisOutlined/>
                    </Button>
                </Link>
            </div>
        </Col>
    )
}
export default SceneListItem;