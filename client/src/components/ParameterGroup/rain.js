import { Slider } from "antd";
import Parameter from "../Layer/parameter";

const RainParams = ({theme, layer, setters}) => {
    return(
        <div>
            <Parameter title="Flexibility">
                <Slider
                    max={100}
                    min={0}
                    step={1}
                    defaultValue={layer.flex || 50}
                    onAfterChange={setters.flex}
                    style={{minWidth:'100px'}}
                />
            </Parameter>
            <Parameter title="Max Drops">
                <Slider
                    max={500}
                    min={0}
                    step={1}
                    defaultValue={layer.numdrops || 50}
                    onAfterChange={setters.numdrops}
                    style={{minWidth:'100px'}}
                />
            </Parameter>
            <Parameter title="Spawn Chance">
                <Slider
                    max={100}
                    min={0}
                    step={1}
                    defaultValue={layer.spawn || 50}
                    onAfterChange={setters.spawn}
                    style={{minWidth:'100px'}}
                />
            </Parameter>
            <Parameter title="Length">
                <Slider
                    max={15}
                    min={0.1}
                    step={0.1}
                    defaultValue={layer.l0 || 50}
                    onAfterChange={setters.l0}
                    style={{minWidth:'100px'}}
                />
            </Parameter>
            <Parameter title="Velocity">
                <Slider
                    max={100}
                    min={-100}
                    step={1}
                    defaultValue={layer.v0 || 50}
                    onAfterChange={setters.v0}
                    style={{minWidth:'100px'}}
                />
            </Parameter>
            <Parameter title="Acceleration">
                <Slider
                    max={100}
                    min={-100}
                    step={0.1}
                    defaultValue={layer.a || 0.05}
                    onAfterChange={setters.a}
                    style={{minWidth:'100px'}}
                />
            </Parameter>
            <Parameter title="Speed">
                <Slider
                    max={100}
                    min={0.1}
                    step={0.1}
                    defaultValue={layer.time || 0.05}
                    onAfterChange={setters.time}
                    style={{minWidth:'100px'}}
                />
            </Parameter>
        </div>
    )
    
}
export default RainParams;