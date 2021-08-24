import Text from "antd/lib/typography/Text";
import { Col, Divider, Row } from 'antd';

const Parameter = ({title, children}) => {
    return(
        <div>
            <Row align="middle">
                <Col sm={4} xs={9}>
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