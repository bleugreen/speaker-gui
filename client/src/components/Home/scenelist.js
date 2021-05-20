import axios from "axios";
import { useEffect, useState } from "react";
import SceneListItem from "./scenelistitem";

const SceneList = ({active, setActive, setOpen, theme}) => {
    const [scenes, setScenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(loading){
            getScenes()
            setLoading(false);
        }
    });

    const getScenes = () => {
        axios.get('/api/scene/list')
        .then((response) =>{
            setScenes(response.data);
        })
    }

    let sceneList = []
    for (const s in scenes){
        sceneList.push(<SceneListItem theme={theme} key={s} sid={s} active={active} setActive={setActive} setOpen={setOpen}/>)
    }

    return <div>{sceneList}</div>
}

export default SceneList;