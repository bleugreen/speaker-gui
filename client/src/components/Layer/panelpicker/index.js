import { Row, Col } from "antd";
import { useState } from "react";
import Panel from "./panel";

const PanelPicker = ({layer, setters, theme}) => {
    const [active, setActive] = useState(false);

    const setPanel = (index, state) => {
        setActive(state);
    }
    
    return(
        <div>
        <Row justify="center" style={{textAlign:'center'}}>
            <Col span={5}>
                <Panel index={0} active={active} type='left' theme={theme} setPanel={setPanel} />
            </Col>
            <Col span={7}>
                <Panel index={0} active={active} type='center' theme={theme} setPanel={setPanel} />
            </Col>
            <Col span={5}>
                <Panel index={0} active={active} type='right' theme={theme} setPanel={setPanel} />
            </Col>
        </Row>
        <Row justify="center" style={{textAlign:'center'}}>
        <Col span={5}>
            <Panel index={0} active={active} type='left' theme={theme} setPanel={setPanel} />
        </Col>
        <Col span={7}>
            <Panel index={0} active={active} type='center' theme={theme} setPanel={setPanel} />
        </Col>
        <Col span={5}>
            <Panel index={0} active={active} type='right' theme={theme} setPanel={setPanel} />
        </Col>
    </Row>
    <Row justify="center" style={{textAlign:'center'}}>
    <Col span={5}>
        <Panel index={0} active={active} type='left' theme={theme} setPanel={setPanel} />
    </Col>
    <Col span={7}>
        <Panel index={0} active={active} type='center' theme={theme} setPanel={setPanel} />
    </Col>
    <Col span={5}>
        <Panel index={0} active={active} type='right' theme={theme} setPanel={setPanel} />
    </Col>
</Row>
</div>
    )
}

export default PanelPicker;