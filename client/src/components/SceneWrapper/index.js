import {
    BrowserRouter as Router,
    Link,
    useParams
  } from "react-router-dom";

import Scene from "../Scene";

function SceneWrapper({theme}){
    let { sid } = useParams();
    
    return(
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor:theme.bg, }}>
        <Scene theme={theme} sid={sid} setActive={(e)=>{console.log(e+' set to active')}}/>
        </div>
    )

}
export default SceneWrapper;