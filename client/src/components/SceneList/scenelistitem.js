import { CloseOutlined, CloseSquareOutlined, RightOutlined } from "@ant-design/icons"
import { Button, Col, Row, Switch } from "antd"
import Title from "antd/lib/typography/Title"
import Text from "antd/lib/typography/Text"
import { useEffect, useState } from "react"
import axios from "axios"
import colorTheme from "../themes"
import { useLocation, Link } from "react-router-dom";

const SceneListItem = ({sid, active, setActive, theme}) => {
    const [name, setName] = useState(sid);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(loading){
            axios.get('/api/scene/name', {
                params: { sid: sid }
                })
            .then(function(response){
                setName(response.data);
                setLoading(false);
            })
        }
    })

    const itemStyle = {
        backgroundColor: theme.fg,
        color: theme.text,
        transition: "all 0.3s, visibility 0s",
        padding: "5%",
        cursor: "pointer", 
        lineHeight: 1.5715,
        borderRadius: "20px"
    }
    
    return (
    <div style={itemStyle}>
        <Row align="middle">
            <Col sm={6}>
                <Title align="left" style={{margin:0, color:theme.text}}>{name}</Title>
            </Col>
            {/* <Col sm={3}>
                <Switch
                    defaultChecked={active==sid}
                    checkedChildren="Active"
                    unCheckedChildren={<CloseOutlined/>}
                    onChange={handleActive}
                />
            </Col> */}
            <Col sm={3}>
                <Link to={"/scene/"+sid}><Button><RightOutlined/></Button></Link>
            </Col>
        </Row>
    </div>
    )
}
export default SceneListItem;