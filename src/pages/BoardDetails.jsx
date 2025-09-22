import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

// services
import { boardService } from '../services/board/board-index.js'

// cmps
import { Group } from '../cmps/board/Group.jsx'

export function BoardDetails(props) {
    const params = useParams()
    const { boardId } = params

    const [board, setBoard] = useState(null)

    useEffect(() => {
        if (boardId) {
            getBoard(boardId)
        }
    }, [])


    async function getBoard(boardId) {
        try {
            const board = await boardService.getById(boardId)
            setBoard(board)
        } catch (err) {
            console.log('err:', err)
        }
    }

    if (!board) return 'loading....'
    return (
        <div className="board-details">

            <header className='board-header'>
                <h2>{board.name}</h2>
            </header>

            {board.groups.map(group => (
                <Group key={group.id} group={group} />
            ))}
        </div>
    )

}

