import GeneralParams from "./general";
import LinGradientParams from "./lingradient";
import RainParams from "./rain";
import TwinkleParams from "./twinkle";

const ParameterGroup = ({pattern, layer, setters}) => {
    switch(pattern){
        case 'rain':
            return <RainParams layer={layer} setters={setters}/>
        case 'lingradient':
            return <LinGradientParams layer={layer} setters={setters}/>
        case 'general':
            return <GeneralParams layer={layer} setters={setters}/>
        case 'twinkle':
            return <TwinkleParams layer={layer} setters={setters}/>
        default:
            return <div></div>
    }
}
export default ParameterGroup;


// ----------- example parameter group -----------------------
// import { Slider } from "antd";
// import Parameter from "../Layer/parameter";

// const ExampleParams = ({theme, layer, setters}) => {
//     return(
//         <div>
//             <Parameter title="title">
//                 <Slider
//                     max={100}
//                     min={0}
//                     step={1}
//                     defaultValue={layer.flex || 50}
//                     onAfterChange={setters.flex}
//                     style={{minWidth:'100px'}}
//                 />
//             </Parameter>
//         </div>
//     )

// }
// export default RainParams;