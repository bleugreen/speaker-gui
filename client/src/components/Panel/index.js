import Title from 'antd/lib/typography/Title';
import React, { useState, useEffect, useRef} from 'react';
import useMeasure from 'react-use-measure';
import { useSpring, animated, config } from 'react-spring'
import { Col, Divider, Radio, Row, Select, Slider, Space, Spin } from 'antd';
import { ArrowRightOutlined, CaretRightOutlined, RightOutlined } from '@ant-design/icons';
import colorTheme from '../themes';


function Panel({header, children, style, expand=false}){
    const [expanded, setExpanded] = useState(expand);

    const divStyle = {
        backgroundColor:colorTheme().fg,
        borderRadius:"10px",
        stroke:"2px",
        color:colorTheme().text,
        width:"90%",
        marginLeft:"5%",
        padding:"15px",
        paddingBottom:"45px",
        marginBottom:"10px",
        overflow:"hidden",
        ...style
    };

    const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

    const angle = useSpring({
        from:{rotate:0},
        to: {rotate:expanded ? 90 : 0},
        config:{mass:1, tension:200, friction:15},
    });

    const [ref, { height: viewHeight }] = useMeasure()

    const { height, opacity } = useSpring({
        from: { height: 50, opacity: 0 },
        to: {
            height: expanded ? viewHeight+90 : 50,
            opacity: expanded ? 1 : 0,
        },
        config:{ mass: 1.5, tension: 150, friction: 25 }
    
    })

    
    const bodyHeight = useSpring({
        from: { height: 60 },
        to:{
            height: expanded ? 240 : 55,
        },
        onStart:()=>{setDone(false)}
    })

    const scale = useSpring({
        from:{scale: 0},
        to:{scale:expanded? 1:0}
    });


    const handleClick = () => {
        if(!expanded){
            setExpanded(true);
        }
    }

    const handleIconClick = () => {
        setExpanded(!expanded);
    }

    return(
            <animated.div   style={{...style, height}} onClick={handleClick}>
                <Row gutter={[24,0]} onClick={handleIconClick}>
                    <Col >
                    <animated.div style={angle}><RightOutlined style={{fontSize:24}}/></animated.div>
                    </Col>
                   <Col>
                    <Title level={4}>
                        {header}
                    </Title>
                   </Col>
                   
                </Row>
                <animated.div 
                    style={{opacity, minHeight:'200px',}}
                    ref={ref}
                >
                    <Divider/>
                    {children}
                </animated.div>
            </animated.div>      
        )
}
export default Panel;