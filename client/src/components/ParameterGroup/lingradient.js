import { Slider } from "antd";
import Parameter from "../Layer/parameter";

const LinGradientParams = ({theme, layer, setters}) => {
    return(
        <div>
            <Parameter title="Direction">
                <Slider
                    max={360}
                    min={0}
                    step={1}
                    defaultValue={layer.angle || 90}
                    onAfterChange={setters.angle}
                    style={{minWidth:'100px'}}
                />
            </Parameter>
        </div>
    )

}
export default LinGradientParams;