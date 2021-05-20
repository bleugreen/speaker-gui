const Panel = ({index, type, active, theme, setPanel}) => {
    let color = theme.text2;
    let stroke = theme.text2;
    let fillOpacity = "20%";


    const handleClick = () => {
        if(active){
            setPanel(index, false);
        }
        else{
            setPanel(index, true);
        }
    }

    let style = {
        width:'90%',
        height: '80%', 
        margin:'auto'
    }

    let centerStyle = {
        width:'90%'
    }

    if(active){
        color = theme.blue;
        fillOpacity = "40%";
    }

    if(type == 'left'){
        return(
            <svg style = {style} 
                xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 130 200"
                stroke={stroke}
                strokeWidth="5px"
                fill={color}
                onClick = {handleClick}
                fillOpacity={fillOpacity}
            >
            <path class="cls-1" d="M111.62,190.6a7.76,7.76,0,0,1-1.43-.13L22.08,174.81C11.47,172.93,2.5,160.35,2.5,147.35V17.68C2.5,8.46,6.93,2.5,13.77,2.5a15.86,15.86,0,0,1,6.8,1.7l88.1,42.13c7.27,3.47,13.18,14.89,13.18,25.45v103a20.54,20.54,0,0,1-3.19,11.67,8.68,8.68,0,0,1-7,4.12Z"/>
            {/* <path d="M13.77,5a13.38,13.38,0,0,1,5.72,1.46l88.1,42.12c6.38,3.05,11.76,13.67,11.76,23.2v103c0,7.45-3.39,13.29-7.73,13.29a5.61,5.61,0,0,1-1-.09L22.52,172.35C13,170.66,5,159.21,5,147.35V17.68C5,11.55,7.31,5,13.77,5m0-5C5.79,0,0,6.66,0,17.68V147.35c0,14.4,9.89,27.83,21.64,29.92l88.11,15.66a10.08,10.08,0,0,0,1.87.17c7.26,0,12.73-7.74,12.73-18.29v-103c0-11.45-6.43-23.8-14.6-27.71L21.64,2A18.29,18.29,0,0,0,13.77,0Z"/> */}
            </svg>
        )
    }

    if(type == 'right'){
        
        style={...style, transform:"scale(-1, 1)"}
        
        return(
            <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 130 200"
                style = {style}
                stroke={stroke}
                strokeWidth="5px"
                fill={color}
                onClick = {handleClick}
                fillOpacity={fillOpacity}
            >
            <path class="cls-1" d="M111.62,190.6a7.76,7.76,0,0,1-1.43-.13L22.08,174.81C11.47,172.93,2.5,160.35,2.5,147.35V17.68C2.5,8.46,6.93,2.5,13.77,2.5a15.86,15.86,0,0,1,6.8,1.7l88.1,42.13c7.27,3.47,13.18,14.89,13.18,25.45v103a20.54,20.54,0,0,1-3.19,11.67,8.68,8.68,0,0,1-7,4.12Z"/>
            {/* <path d="M13.77,5a13.38,13.38,0,0,1,5.72,1.46l88.1,42.12c6.38,3.05,11.76,13.67,11.76,23.2v103c0,7.45-3.39,13.29-7.73,13.29a5.61,5.61,0,0,1-1-.09L22.52,172.35C13,170.66,5,159.21,5,147.35V17.68C5,11.55,7.31,5,13.77,5m0-5C5.79,0,0,6.66,0,17.68V147.35c0,14.4,9.89,27.83,21.64,29.92l88.11,15.66a10.08,10.08,0,0,0,1.87.17c7.26,0,12.73-7.74,12.73-18.29v-103c0-11.45-6.43-23.8-14.6-27.71L21.64,2A18.29,18.29,0,0,0,13.77,0Z"/> */}
            </svg>
        )
    }

    if(type == 'center'){
        style = {...style, marginTop:"10%"}
        
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -3 214 160"
            style = {style}
            stroke={stroke}
            strokeWidth="5px"
            fill={color}
            onClick = {handleClick}
            fillOpacity={fillOpacity}
        >
            <rect class="cls-1" x="2.5" y="2.5" width="205" height="145" rx="22.96"/>
            {/* <path d="M184.54,5A20.49,20.49,0,0,1,205,25.46v99.08A20.49,20.49,0,0,1,184.54,145H25.46A20.49,20.49,0,0,1,5,124.54V25.46A20.49,20.49,0,0,1,25.46,5H184.54m0-5H25.46A25.46,25.46,0,0,0,0,25.46v99.08A25.46,25.46,0,0,0,25.46,150H184.54A25.46,25.46,0,0,0,210,124.54V25.46A25.46,25.46,0,0,0,184.54,0Z"/> */}
        </svg>
    }

}

export default Panel