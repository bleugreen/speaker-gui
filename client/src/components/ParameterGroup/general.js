import { Select, Slider, Space } from "antd";
import EyeButton from "../Layer/eyeButton";
import Parameter from "../Layer/parameter";

const GeneralParams = ({theme, layer, setters}) => {
    function formatter(value) {
        return `${value}%`;
    }
    
    return(
        <div>
            <Parameter title="Opacity">
                <Space>
                    <EyeButton visible={layer.visible} setVisible={setters.visible} theme={theme}/>
                    <Slider 
                            tipFormatter={formatter} 
                            min={0} 
                            max={100}
                            defaultValue={layer.opacity} 
                            onAfterChange={setters.opacity}
                            style={{marginLeft:'15px', minWidth:100}} 
                    />
                </Space>
            </Parameter>
            <Parameter title="Pattern">
                <Select
                    defaultValue={layer.pattern}
                    onChange={setters.pattern}
                >
                    <Option key='lingradient'>Linear Gradient</Option>
                    <Option key='radgradient'>Radial Gradient</Option>
                    <Option key='rain'>Rain</Option>
                    <Option key='twinkle'>Twinkle</Option>
                </Select>
            </Parameter>
        </div>
    )

}
export default GeneralParams;