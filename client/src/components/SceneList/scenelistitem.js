import { CloseOutlined, CloseSquareOutlined, RightOutlined } from "@ant-design/icons"
import { Button, Col, Row, Space, Switch } from "antd"
import Title from "antd/lib/typography/Title"
import Text from "antd/lib/typography/Text"
import { useEffect, useState } from "react"
import axios from "axios"
import colorTheme from "../themes"
import { useLocation, Link } from "react-router-dom";
import ActiveButton from "../ActiveButton"

const SceneListItem = ({sid, active, setActive, theme, filter}) => {
    const [name, setName] = useState(sid);
    const [loading, setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [params, setParams] = useState({
        name:"",
        desc:"",
        tags:""
    });

    useEffect(()=>{
        if(loading){
            setLoading(false);
            axios.get('/api/scene/params', {
                params: { sid: sid }
                })
            .then(function(response){
                setParams(response.data);
                console.log(response.data)
                setReady(true);
            })
            .catch(function(response){console.log(response)})
        }
    }, [active, filter])

    const checkFilter = () => {
        let result = true;
        for(const i in filter){
            result = result && params.tags.includes(filter[i]);
        }
        return result
    }

    const itemStyle = {
        backgroundColor: theme.fg,
        color: theme.text,
        transition: "all 0.3s, visibility 0s",
        padding: "5%",
        cursor: "pointer", 
        lineHeight: 1.5715,
        borderRadius: "20px",
        marginBottom:"10px"
    }
    if(ready){
        return checkFilter() &&(
            <Col xl={7} lg={10} md={{span:20}} sm={{span:22}} xs={23} style={itemStyle}>
                    <div style={{width:'100%', marginBottom:"20px"}}>
                        <Title align="left" style={{margin:0, color:theme.text}}>{params.name}</Title>
                        <Text>{params.desc}</Text>
                    </div>
                    <div style={{textAlign:'right'}}>
                    
                    
                        <ActiveButton sid={sid} theme={theme} active={active} setActive={setActive}/>
                    
                    
                        <Link to={"/scene/"+sid}><Button style={{marginLeft:'10px'}}><RightOutlined/></Button></Link>
                    </div>
            </Col>
            )
    }
    else return <div style={itemStyle}></div>
    
}
export default SceneListItem;