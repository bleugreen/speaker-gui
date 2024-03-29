import { Slider } from "antd";
import Parameter from "./parameter";

const TwinkleParams = ({layer, setters}) => {
    return(
        <div>
        <Parameter title="Flexibility">
            <Slider
                max={100}
                min={0}
                step={1}
                defaultValue={layer.flex || 50}
                onAfterChange={setters.flex}
               
            />
        </Parameter>
        <Parameter title="Max Twinkles">
            <Slider
                max={500}
                min={0}
                step={1}
                defaultValue={layer.numdrops || 50}
                onAfterChange={setters.numdrops}
                
            />
        </Parameter>
        <Parameter title="Spawn Chance">
            <Slider
                max={100}
                min={0}
                step={1}
                defaultValue={layer.spawn || 50}
                onAfterChange={setters.spawn}
              
            />
        </Parameter>
        <Parameter title="Lifespan">
            <Slider
                max={15}
                min={0.1}
                step={0.1}
                defaultValue={layer.l0 || 50}
                onAfterChange={setters.l0}
               
            />
        </Parameter>
        <Parameter title="Size">
            <Slider
                max={15}
                min={0.1}
                step={0.1}
                defaultValue={layer.size || 50}
                onAfterChange={setters.size}
             
            />
        </Parameter>
        <Parameter title="Speed">
            <Slider
                max={100}
                min={0.1}
                step={0.1}
                defaultValue={layer.time || 0.05}
                onAfterChange={setters.time}
              
            />
        </Parameter>
    </div>
    )

}
export default TwinkleParams;