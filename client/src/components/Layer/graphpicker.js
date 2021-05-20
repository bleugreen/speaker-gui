import { AlignCenterOutlined, AlignLeftOutlined, ColumnHeightOutlined, ColumnWidthOutlined, EnterOutlined, RotateRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Space, Switch, Tooltip } from "antd";
import Text from "antd/lib/typography/Text";
import GraphIcon from "./icon/graph";

const GraphPicker = ({theme, start, direction, align, mirrorx, mirrory, setters}) => {
    /*
        start = bottom, top, left, right
        direction = left, right, up, down
        align = base, center
    */

    const handleRotate = () => {
        console.log('current dir: '+direction)
        switch(start){
            case 'bottom':
                setters.start('left');
                break;
            case 'top':
                setters.start('right');
                break;
            case 'left':
                setters.start('top');
                break;
            case 'right':
                setters.start('bottom');
                break;
        }
        switch(direction){
            case 'right':
                setters.graphdir('down');
                break;
            case 'down':
                setters.graphdir('left');
                break;
            case 'left':
                setters.graphdir('up');
                break;
            case 'up':
                setters.graphdir('right');
                break;
        }
    }

    const handleAlign = () => {
        if(align == 'center'){ setters.align('base') }
        else{ setters.align('center') }
    }

    const handleFlipH = () => {
        if(start == 'bottom' || start == 'top'){
            if(direction == 'left'){ setters.graphdir('right') }
            else{ setters.graphdir('left') }
        }
        else{
            if(start == 'left'){ setters.start('right') }
            else{ setters.start('left') }
        }
    }

    const handleFlipV = () => {
        if(direction == 'left' || direction == 'right'){
            if(start == 'top'){ setters.start('bottom') }
            else{ setters.start('top') }
        }
        else{
            if(direction == 'up'){ setters.graphdir('down') }
            else{ setters.graphdir('up') }
        }
    }

    const alignIcon = () => {
        if(align == 'base'){
            return <AlignCenterOutlined rotate={-90}/>
        }
        else{
            return <AlignLeftOutlined rotate={-90}/>
        }
    }

    return(
        <Row align="middle" gutter={[16,24]}>
        
        <Col md={4} sm={5} xs={24}>
            <Text >Graph Layout</Text>
        </Col>
       
        <Col sm={12} md={8} xs={24}>
            <Row gutter={[16, 16]} align="middle" justify="center">
            <Col span={24}>
                <Row justify="center" align='top'>
                    <GraphIcon  start={start} direction={direction} align={align} mirrorx={mirrorx} mirrory={mirrory} theme={theme}/><br/><br/>
                </Row>
            </Col>
            <Col span={6}>
                <Tooltip title='Rotate' placement='bottom' >
                    <Button onClick={handleRotate}>
                        <RotateRightOutlined/>
                    </Button>
                </Tooltip>
            </Col>
            <Col span={6}>
                <Tooltip title='Align' placement='bottom'>
                    <Button onClick={handleAlign}>
                        {alignIcon()}
                    </Button>
                </Tooltip>
            </Col>
            <Col span={6}>
                <Tooltip title='Flip Horizontal' placement='bottom'>
                    <Button onClick={handleFlipH}>
                        <ColumnWidthOutlined/>
                    </Button>
                </Tooltip>
            </Col>
            <Col span={6}>
                <Tooltip title='Flip Vertical' placement='bottom'>
                    <Button onClick={handleFlipV}>
                        <ColumnHeightOutlined/>
                    </Button>
                </Tooltip>
            </Col>
            <Col sm={10} xs={8}>
                <Switch defaultChecked={mirrorx} onChange={setters.mirrorx} checkedChildren="Mirror X" unCheckedChildren="Mirror X"/>
            </Col>
            <Col sm={10} xs={8}>
                <Switch defaultChecked={mirrory} onChange={setters.mirrory} checkedChildren="Mirror Y" unCheckedChildren="Mirror Y"/>
            </Col>
            </Row>
        </Col>
        <Col sm={12} md={6}>
        </Col>
        </Row>
    )

}

export default GraphPicker; 