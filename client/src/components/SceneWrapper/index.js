import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";

import Scene from "../Scene";

function SceneWrapper({theme}){
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    
    return(
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380, backgroundColor:theme.bg, }}>
        <Scene theme={theme} sid={query.get("sid")} setActive={(e)=>{console.log(e+' set to active')}}/>
        </div>
    )

}
export default SceneWrapper;