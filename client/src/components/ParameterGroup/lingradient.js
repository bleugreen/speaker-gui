import { Slider } from "antd";
import Parameter from "./parameter";

const LinGradientParams = ({layer, setters}) => {
    return(
        <div>
            <Parameter title="Direction">
                <Slider
                    max={360}
                    min={0}
                    step={1}
                    defaultValue={layer.angle || 90}
                    onAfterChange={setters.angle}
                
                />
            </Parameter>
        </div>
    )

}
export default LinGradientParams;