import { Link, NavLink } from "react-router-dom";

export function AppHeader(props) {
    return (
        <header className="app-haeder flex justify-between align-center">
            <Link to=""> <h1>Monday test</h1></Link>
            <nav className="main-app-nav">
                <NavLink to="">Home</NavLink>
                <NavLink to="/board">Boards</NavLink>
            </nav>
        </header>
    )
}