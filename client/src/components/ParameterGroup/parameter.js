import Text from "antd/lib/typography/Text";
import { Col, Divider, Row } from 'antd';

import './style.css'

const Parameter = ({title, children}) => {
    return(
        <div className="parameter" >
            <Row align="middle" gutter={[16,16]}>
                <Col sm={4} xs={0} style={{textAlign:'right'}}>
                    <Text>{title}</Text>
                </Col>
                <Col sm={0} xs={9} style={{textAlign:'left'}}>
                    <Text>{title}</Text>
                </Col>
                <Col sm={{span:12, offset:1}} xs={24}>
                    {children}
                </Col>
            </Row>
            <Divider/>
        </div>
    )
}
export default Parameter;