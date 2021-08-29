import { Space } from "antd"
import ColorDot from "../Color/colordot"

const ColorPreview = ({colors}) => {
    let colorRow = []
    colors.split(",").map(c => {
        colorRow.push(<ColorDot color={c} key={c}/> )
    });

    return(
        <Space style={{verticalAlign:"middle"}}>
            {colorRow.slice(0,3)}
        </Space>
    )
}

export default ColorPreview;