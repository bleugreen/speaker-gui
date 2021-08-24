import { useLocation, Link } from "react-router-dom";

function NavLink({to, theme, marginLeft, children}){
    let location = useLocation();
    let style = {
        color: theme.bg,
        marginLeft: marginLeft
    };

    if(location.pathname == to){
        style = {
            color: theme.headerText,
            fontWeight: 'bold',
            marginLeft: marginLeft
        }
    }

    return <Link to={to} style={style} >{children}</Link>
}

export default NavLink;