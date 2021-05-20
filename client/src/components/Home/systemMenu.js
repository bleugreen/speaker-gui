import { ColumnWidthOutlined, EllipsisOutlined, MenuOutlined, PlayCircleOutlined, PoweroffOutlined, RedoOutlined, StopOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Space, Tooltip } from "antd"
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";

import ColorDot from "../Color/colordot"
import colorTheme from "../themes";

const { SubMenu } = Menu;

const SystemMenu = ({running, connected, layout, setLayout, reboot, shutdown, start, end, theme}) => {
    const [visible, setVisible] = useState(false);

    useEffect(()=>{
        console.log("connected: "+connected.toString());
    }, [connected]);
    useEffect(()=>{
        console.log("running: "+connected.toString());
    }, [running]);

    const onVisibleChange = (isVis) => {
        setVisible(isVis);f
    };

    const handleMenuClick = e => {
        if (e.key === 'start'){
            console.log("START");
        }
    }
    const renderMenuItems = () => {
        const menuItems = [];
        if(connected){
            menuItems.push(
                <Menu.Item key='reboot' icon={<RedoOutlined/>}>Reboot</Menu.Item>,
                <Menu.Item key='shutdown' icon={<PoweroffOutlined/>}>Shutdown</Menu.Item>
            );
            if(running){
                menuItems.push(
                    <Menu.Item key='end' icon={<StopOutlined/>}>End Lights</Menu.Item>
                );
            }
            else{
                menuItems.push(
                    <Menu.Item key='start' icon={<PlayCircleOutlined/>}>Start Lights</Menu.Item>
                );
            }
        }
        menuItems.push(
            <SubMenu
                key='layout'
                icon={<ColumnWidthOutlined/>}
                title='Speaker Layout'
                style={{
                    backgroundColor:theme.header,
                }}
            >
                <Menu.Item key='lr'>Left First</Menu.Item>
                <Menu.Item key='rl'>Right First</Menu.Item>
            </SubMenu>
        );

        return menuItems;
    }

    
    const renderDots = () => {
        const dots = [];
        if(connected){
            dots.push(<ColorDot key="connected" color={theme.green} text="Connected" size={18}/>)
        }
        else{
            dots.push(<ColorDot key="connected" color={theme.red} text="Not Connected" size={18}/>)
        }
        if(running){
            dots.push(<ColorDot key="running" color={theme.green} text="Running" size={18}/>)
        }
        else{
            dots.push(<ColorDot key="running" color={theme.red} text="Not Running" size={18}/>)
        }

        return dots;
    }

    const onSelect = e => {
        switch(e.key){
            case "start":
                start();
                break;
            case "end":
                end();
                break;
            case "reboot":
                reboot();
                break;
            case "shutdown":
                shutdown();
                break;
            case "rl":
                setLayout("rl")
                break;
            case "lr":
                setLayout("lr");
                break;
            
        }
    }

    const menu = (
        <Menu
           style={{
               backgroundColor:theme.header,
           }}
           mode="vertical"
           theme="dark"
           defaultSelectedKeys={[layout]}
           selectedKeys={[layout]}
           triggerSubMenuAction="hover"
           onClick={onSelect}
        >
            {renderMenuItems()}
        </Menu>
    );

    return(
        <Space align="center">
        {renderDots()}
        <Dropdown
            overlay={menu}
            placement="bottomRight"
            trigger={['hover']}
            overlayStyle={{ color:theme.red }}
        >
            <Button type="text" style={{color:"white",fontSize:"24px"}} shape="round"><MenuOutlined/></Button>
        </Dropdown>
        </Space>
    )
}

export default SystemMenu;