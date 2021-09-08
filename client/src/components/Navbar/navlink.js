import { useLocation, Link } from "react-router-dom";

function NavLink({to, marginLeft, children}){
    let location = useLocation();

    let className = (location.pathname == to) ? "activeLink" : "inactiveLink"

    return <Link to={to} className={className} style={{marginLeft:marginLeft}} >{children}</Link>
}

export default NavLink;