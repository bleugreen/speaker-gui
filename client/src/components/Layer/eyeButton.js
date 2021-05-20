import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";


const EyeButton = ({visible, setVisible, theme}) => {
    if(visible){
        return <Tooltip title="Visible"><EyeOutlined onClick={setVisible} style={{fontSize:"16pt",verticalAlign:"middle", color:theme.blue}} /></Tooltip>
    }
    else{
        return <Tooltip title="Hidden"><EyeInvisibleOutlined onClick={setVisible} style={{fontSize:"16pt",verticalAlign:"middle", color:theme.red}}/></Tooltip>
    }
}
export default EyeButton;