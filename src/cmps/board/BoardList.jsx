export function BoardList({ boards }) {

    return (
        <ul className="board-list">
            {boards.map(b => {
                return <li key={b._id} className="board-item">
                    <img src="/images/board-img.svg" alt="board-img" />
                    <div>{b.name}</div>
                </li>
            })}
        </ul>)
}
