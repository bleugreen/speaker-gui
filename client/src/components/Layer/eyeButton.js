import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";


const EyeButton = ({visible, setVisible, theme}) => {
    const visibleIcon = <Tooltip title="Visible"><EyeOutlined onClick={setVisible} style={{fontSize:"16pt",verticalAlign:"middle", color:theme.blue}} /></Tooltip>
    const hiddenIcon = <Tooltip title="Hidden"><EyeInvisibleOutlined onClick={setVisible} style={{fontSize:"16pt",verticalAlign:"middle", color:theme.red}}/></Tooltip>
    
    return visible ? visibleIcon : hiddenIcon;
}
export default EyeButton;