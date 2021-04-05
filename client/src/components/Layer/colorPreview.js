import { Space } from "antd"
import ColorDot from "../Color/colordot"

const ColorPreview = ({colors}) => {
    let colorRow = []
    colors.map(c => {
        colorRow.push(<ColorDot color={c}/> )
    });

    return(
        <Space style={{verticalAlign:"middle"}}>
            {colorRow.slice(0,3)}
        </Space>
    )
}

export default ColorPreview;