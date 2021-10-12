import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import useMeasure from 'react-use-measure';
import { useSpring, animated, } from 'react-spring'
import { Col, Divider, Row,  } from 'antd';
import { RightOutlined } from '@ant-design/icons';



function Panel({header, children, style, className, expand=false}){
    const [expanded, setExpanded] = useState(expand);
    const [ref, { height: viewHeight }] = useMeasure()

    const { height, opacity } = useSpring({
        from: { height: 50, opacity: 0 },
        to: {
            height: expanded ? viewHeight+90 : 50,
            opacity: expanded ? 1 : 0,
        },
        config:{ mass: 1.5, tension: 170, friction: 25 }
    
    });

    const angle = useSpring({
        from:{rotate:0},
        to: {rotate:expanded ? 90 : 0},
        config:{mass:1, tension:200, friction:15},
        
    });

    const handleClick = () => { if(!expanded){ setExpanded(true) } }
    const handleIconClick = () => {setExpanded(!expanded)}

    return(
        <animated.div className={className} style={{...style, height}} onClick={handleClick}>
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