import { Link, NavLink } from "react-router-dom";

export function AppHeader(props) {
    return (
        <header className="app-haeder flex justify-between align-center">
            <Link to=""> <div className="main-logo">Monday test</div></Link>
            <nav className="main-app-nav">
                <NavLink to="">Home</NavLink>
                <NavLink to="/board">Boards</NavLink>
            </nav>
        </header>
    )
}