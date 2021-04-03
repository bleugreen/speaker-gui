
import { Col, Divider, Row, Select, Slider, Spin } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useEffect, useState } from 'react';
import ColorBlock from '../Color';
import './style.css';

const { Option } = Select;

function LayerBody({lid, notify}) {
    const [loading, setLoading] = useState(false);

    const handlePosChange = (value) => {
        console.log(value);
    }

    function formatter(value) {
        return `${value}%`;
      }

    if(!loading) {
        return(
            <div>
                <Row>
                    <Col span={6}>
                        <Text>Position</Text>
                    </Col>
                    <Col span={12}>
                        <Select 
                            defaultValue="full" 
                            style={{ width: 120 }} 
                            onChange={handlePosChange}
                        >
                            <Option value="center">Center</Option>
                            <Option value="sides">Sides</Option>
                            <Option value="left">Left</Option>
                            <Option value="right">Right</Option>
                            <Option value="full">Full</Option>
                        </Select>
                    </Col>
                    <Divider/>
                </Row>
                <Row style>
                    <Col span={6}>
                        <Text >Opacity</Text>
                    </Col>
                    <Col span={12}>
                        <Slider tipFormatter={formatter} />
                    </Col>
                </Row>
            </div>
        )
    }
    else{
        return <Spin/>
    }
}
export default LayerBody;