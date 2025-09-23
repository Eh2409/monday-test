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


    function saveGroupTitle(dataToSave, groupId) {
        const { title, color } = dataToSave

        setPrevBoard(board)
        setBoard(prev => ({
            ...prev,
            groups: prev.groups.map(g => {
                if (g.id === groupId) {
                    return { ...g, title: title, color: color }
                }
                return g
            })
        }))
    }

    function onAddTask(taskName, groupId) {
        const group = board.groups.find(g => g.id === groupId)
        if (!group) return console.log(`group ${groupId} not found`)

        var columnValues = []
        if (group.items.length > 0 && group.items[0].columnValues.length) {
            const itemColumnValues = structuredClone(group.items[0].columnValues)
            columnValues = itemColumnValues.map(cv => {
                if (cv.id === 'status') {
                    cv.value = 'not started'
                    cv.color = 'gray'
                } else {
                    cv.value = ''
                }
                return cv
            })
        }

        const newTask = boardService.getEmptyTask(taskName, columnValues)
        setPrevBoard(board)
        setBoard(prev => ({
            ...prev,
            groups: prev.groups.map(g => {
                if (g.id === groupId) {
                    return { ...g, items: [...g.items, newTask] }
                }
                return g
            })
        }))
    }

    function onUpdateTaskName(taskName, groupId, itemId) {
        setPrevBoard(board)
        setBoard(prev => ({
            ...prev,
            groups: prev.groups.map(g => {
                if (g.id === groupId) {
                    return {
                        ...g, items: g.items.map(item => {
                            if (item.id === itemId) {
                                return { ...item, name: taskName }
                            }
                            return item
                        })
                    }
                }
                return g
            })
        }))
    }


    function onRemoveTask(groupId, itemId) {
        setPrevBoard(board)
        setBoard(prev => ({
            ...prev,
            groups: prev.groups.map(g => {
                if (g.id === groupId) {
                    return { ...g, items: g.items.filter(i => i.id !== itemId) }
                }
                return g
            })
        }))
    }


    if (!board) return 'loading....'
    return (
        <div className="board-details">

            <header className='board-header'>
                <h2>{board.name}</h2>
            </header>

            {board.groups.map(group => (
                <Group
                    key={group.id}
                    group={group}
                    saveGroupTitle={saveGroupTitle}
                    onAddTask={onAddTask}
                    onUpdateTaskName={onUpdateTaskName}
                    onRemoveTask={onRemoveTask}
                />
            ))}
        </div>
    )

}

