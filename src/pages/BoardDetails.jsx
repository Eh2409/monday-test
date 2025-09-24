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
    const [prevBoard, setPrevBoard] = useState(null)

    console.log('board:', board)

    useEffect(() => {
        if (boardId) {
            getBoard(boardId)
        }
    }, [])

    useEffect(() => {
        if (prevBoard) {
            saveBoard()
        }
    }, [board])


    async function getBoard(boardId) {
        try {
            const board = await boardService.getById(boardId)
            setBoard(board)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function saveBoard() {
        try {
            await boardService.save(board)
        } catch (err) {
            console.log('err:', err)
            setBoard(prevBoard)
        }
    }

    // group

    async function onAddGroup() {
        setPrevBoard(board)
        try {
            const savedBord = await boardService.addGroup(board._id)
            setBoard(savedBord)
        } catch (err) {
            console.log('err:', err)
            setBoard(prevBoard)
        }
    }


    async function onUpdateGroup(groupToUpdate) {
        setPrevBoard(board)
        try {
            const savedBord = await boardService.updateGroup(groupToUpdate, board._id)
            setBoard(savedBord)
        } catch (err) {
            console.log('err:', err)
            setBoard(prevBoard)
        }
    }

    async function onRemoveGroup(groupId) {
        setPrevBoard(board)
        try {
            const savedBord = await boardService.removeGroup(groupId, board._id)
            setBoard(savedBord)
        } catch (err) {
            console.log('err:', err)
            setBoard(prevBoard)
        }
    }


    // task

    async function onAddTask(taskName, groupId, method) {
        setPrevBoard(board)
        try {
            const savedBord = await boardService.addTask(taskName, board._id, groupId, method)
            setBoard(savedBord)
        } catch (err) {
            console.log('err:', err)
            setBoard(prevBoard)
        }
    }

    async function onUpdateTask(taskToSave, groupId) {
        setPrevBoard(board)
        try {
            const savedBord = await boardService.updateTask(taskToSave, board._id, groupId)
            setBoard(savedBord)
        } catch (err) {
            console.log('err:', err)
            setBoard(prevBoard)
        }
    }

    async function onRemoveTask(groupId, itemId) {
        setPrevBoard(board)
        try {
            const savedBord = await boardService.removeTask(itemId, board._id, groupId)
            setBoard(savedBord)
        } catch (err) {
            console.log('err:', err)
            setBoard(prevBoard)
        }
    }


    if (!board) return 'loading....'
    return (
        <section className="board-details">

            <header className='board-header'>
                <h2>{board.name}</h2>
                <button
                    className='add-task'
                    onClick={() => onAddTask('New Item', board?.groups[0]?.id, 'unshift')}>
                    New Item
                </button>
            </header>


            {board.groups.map(group => (
                <Group
                    key={group.id}
                    group={group}
                    columns={board.columns}
                    labels={board.labels}
                    canRemoveGroup={board.groups?.length > 1}
                    // group funcs
                    onUpdateGroup={onUpdateGroup}
                    onRemoveGroup={onRemoveGroup}
                    // task funcs
                    onAddTask={onAddTask}
                    onRemoveTask={onRemoveTask}
                    onUpdateTask={onUpdateTask}
                />
            ))}

            <button onClick={onAddGroup}>+ Add New Group</button>
        </section>
    )

}
