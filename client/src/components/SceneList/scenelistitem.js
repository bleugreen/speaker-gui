import { CloseOutlined, CloseSquareOutlined, EllipsisOutlined, RightOutlined } from "@ant-design/icons"
import { Button, Col, Row, Space, Switch } from "antd"
import Title from "antd/lib/typography/Title"
import Text from "antd/lib/typography/Text"
import { useEffect, useState } from "react"
import axios from "axios"
import colorTheme from "../themes"
import { useLocation, Link } from "react-router-dom";
import ActiveButton from "../ActiveButton"

const SceneListItem = ({sid, active, setActive, theme, filter, name, tags}) => {
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [visible, setVisible] = useState(true);



    const itemStyle = {
        backgroundColor: theme.fg,
        color: theme.text,
        transition: "all 0.3s, visibility 0.3s, display 0.5s",
        
        cursor: "pointer", 
        lineHeight: 1.5715,
        borderRadius: "20px",
        marginBottom:"10px",
    }

        return (
            <Col xl={7} lg={10} md={{span:20}} sm={{span:22}} xs={23} style={itemStyle}>
                    <div style={{padding: "4% 4% 2% 4%",width:'100%', marginBottom:"0px", }}>
                        <Title align="left" style={{ color:theme.text}}>{name}</Title>
                    </div>
                    <div style={{textAlign:'right',padding: "0% 3% 4% 0%",}}>
                    
                    
                        <ActiveButton sid={sid} theme={theme} active={active} setActive={setActive}/>
                    
                    
                        <Link to={"/scene/"+sid}><Button type="ghost" style={{marginLeft:'10px'}}><EllipsisOutlined/></Button></Link>
                    </div>
            </Col>
            )


    
}
export default SceneListItem;