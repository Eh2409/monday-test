import { useNavigate } from "react-router-dom"

export function BoardList({ boards }) {
    const navigate = useNavigate()

    return (
        <ul className="board-list">
            {boards.map(b => {
                return <li key={b._id} className="board-item" onClick={() => navigate(`/board/${b._id}`)}>
                    <img src="/images/board-img.svg" alt="board-img" />
                    <div>{b.name}</div>
                </li>
            })}
        </ul>)
}
