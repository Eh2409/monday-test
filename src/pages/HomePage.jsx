import { Link } from "react-router-dom";

export function HomePage(props) {
    return (
        <section className="home-page">

            <div className="welcome-board">
                <div className="wlcome-msg">One AI work platformfor <br /> any kind of work</div>
                <Link to={'/board'} className="btn start-btn">Get started</Link>
            </div>
        </section>
    )
}