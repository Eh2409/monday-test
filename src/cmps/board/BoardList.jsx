import { useNavigate, useLocation } from "react-router-dom"

export function BoardList({ boards, isMenuDisplay = false }) {
    const navigate = useNavigate()

    const location = useLocation()

    var boardId = location.pathname.split('/').pop()


    return (
        <ul className={`board-list ${isMenuDisplay ? "menu-display" : ""}`}>
            {boards.map(b => {
                return <li key={b._id}
                    className={`board-item ${boardId === b._id ? "active" : ""}`}
                    onClick={() => navigate(`/board/${b._id}`)}>
                    {!isMenuDisplay && <img src="./images/board-img.svg" alt="board-img" />}
                    <div>{b.name}</div>
                </li>
            })}
        </ul>)
}
