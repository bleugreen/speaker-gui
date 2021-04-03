import { Space } from "antd"
import ColorDot from "../Color/colordot"

const ColorPreview = ({colors}) => {
    let colorRow = []
    colors.map(c => {
        colorRow.push(<ColorDot color={c}/> )
    });

    return(
        <Space>
            {colorRow}
        </Space>
    )
}

export default ColorPreview;