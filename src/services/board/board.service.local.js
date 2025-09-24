import { storageService } from "../async-storage.service"
import { getRandomColor, getRandomIntInclusive, loadFromStorage, makeId, makeLorem, saveToStorage } from "../util.service"

export const boardService = {
    query,
    getById,
    remove,
    save,

    // group
    addGroup,
    updateGroup,
    removeGroup,

    // tasks
    addTask,
    updateTask,
    removeTask
}

const BOARD_KEY = 'BOARD_KEY'

_createBoardsArray()

async function query(filterBy = {}) {
    var boards = await storageService.query(BOARD_KEY)

    boards = boards.sort((b1, b2) => (b1.createdAt - b2.createdAt) * -1)

    return boards
}

async function getById(boardId) {
    return await storageService.get(BOARD_KEY, boardId)
}

async function remove(boardId) {
    return await storageService.remove(BOARD_KEY, boardId)
}

async function save(board) {
    if (board?._id) {
        return await storageService.put(BOARD_KEY, board)
    } else {
        const boardToSave = _getDefaultBoard(board)
        return await storageService.post(BOARD_KEY, boardToSave)
    }
}

// group

async function addGroup(boardId) {
    try {
        var board = await getById(boardId)
        if (!board) throw new Error(`borad ${boardId} not found`)

        const newGroup = _getEmptyGroup()

        board.groups.push(newGroup)

        return await save(board)
    } catch (err) {
        throw err
    }
}

async function updateGroup(groupToUpdate, boardId) {
    try {
        var board = await getById(boardId)
        if (!board) throw new Error(`borad ${boardId} not found`)

        board = {
            ...board,
            groups: board.groups.map(g => g.id === groupToUpdate.id ? { ...g, ...groupToUpdate } : g)
        }

        return await save(board)
    } catch (err) {
        throw err
    }
}

async function removeGroup(groupId, boardId) {
    try {
        var board = await getById(boardId)
        if (!board) throw new Error(`borad ${boardId} not found`)

        board = {
            ...board,
            groups: board.groups.filter(g => g.id !== groupId)
        }

        return await save(board)
    } catch (err) {
        throw err
    }
}


// task

async function addTask(taskName, boardId, groupId, method) {
    try {
        var board = await getById(boardId)
        if (!board) throw new Error(`borad ${boardId} not found`)

        const taskToSave = {
            id: makeId(),
            name: taskName,
        }

        const groupIdx = board.groups.findIndex(g => g.id === groupId)
        if (groupIdx === -1) throw new Error(`group ${groupId} not found`)

        if (method === 'unshift') {
            board.groups[groupIdx].items.unshift(taskToSave)
        } else {
            board.groups[groupIdx].items.push(taskToSave)
        }


        return await save(board)
    } catch (err) {
        throw err
    }
}

async function updateTask(taskToUpdate, boardId, groupId) {
    try {
        var board = await getById(boardId)
        if (!board) throw new Error(`borad ${boardId} not found`)

        board = {
            ...board,
            groups: board.groups.map(g => {
                if (g.id === groupId) {
                    return {
                        ...g,
                        items: g.items.map(i => i.id === taskToUpdate.id ? { ...i, ...taskToUpdate } : i)
                    }
                }
                return g
            })
        }
        return await save(board)
    } catch (err) {
        throw err
    }
}


async function removeTask(taskId, boardId, groupId) {
    try {
        var board = await getById(boardId)
        if (!board) throw new Error(`borad ${boardId} not found`)

        board = {
            ...board,
            groups: board.groups.map(g => {
                if (g.id === groupId) {
                    return {
                        ...g,
                        items: g.items.filter(i => i.id !== taskId)
                    }
                }
                return g
            })
        }
        return await save(board)
    } catch (err) {
        throw err
    }
}


// private func

function _createBoardsArray() {

    var boards = loadFromStorage(BOARD_KEY)
    if (!boards || !boards.length) {
        var boards = []
        for (let i = 0; i < 20; i++) {
            boards.push(_createBoard())
        }
        saveToStorage(BOARD_KEY, boards)
    }
}

function _createBoard() {

    const labels = [
        { id: 'l101', title: 'Done', color: '#23cf51' },
        { id: 'l102', title: 'Working on it', color: '#f0c816' },
        { id: 'l103', title: 'Stuck', color: '#f03e16' },
    ]

    return {
        _id: makeId(),
        name: makeLorem(1),
        createdAt: Date.now(),
        privacy: 'main',
        managingType: 'items',
        state: '',
        labels: [
            {
                id: 'l101',
                title: 'Done',
                color: '#23cf51',
            },
            {
                id: 'l102',
                title: 'Working on it',
                color: '#f0c816',
            },
            {
                id: 'l103',
                title: 'Stuck',
                color: '#f03e16',
            },
        ],
        columns: [
            { id: 'owner', title: 'owner', type: 'owner' },
            { id: 'status', title: 'status', type: 'status' },
            { id: 'date', title: 'date', title: 'due date' }
        ],
        groups: [
            {
                id: makeId(),
                title: makeLorem(3),
                color: getRandomColor(),
                items: [
                    {
                        id: makeId(),
                        name: makeLorem(3),
                        status: labels[getRandomIntInclusive(0, labels.length - 1)].title,
                        owner: 'eliad',
                        date: '2025-09-22'
                    },
                    {
                        id: makeId(),
                        name: makeLorem(3),
                        status: labels[getRandomIntInclusive(0, labels.length - 1)].title,
                        owner: 'eliad',
                        date: '2025-09-22'
                    }
                ]
            },
            {
                id: makeId(),
                title: makeLorem(3),
                color: getRandomColor(),
                items: [
                    {
                        id: makeId(),
                        name: makeLorem(3),
                        status: labels[getRandomIntInclusive(0, labels.length - 1)].title,
                        owner: 'eliad',
                        date: '2025-09-22'
                    },
                    {
                        id: makeId(),
                        name: makeLorem(3),
                        status: labels[getRandomIntInclusive(0, labels.length - 1)].title,
                        owner: 'eliad',
                        date: '2025-09-22'
                    }
                ]
            }
        ]
    }
}


function _getEmptyGroup() {
    return {
        id: makeId(),
        title: 'New Group',
        color: getRandomColor(),
        items: []
    }
}


function _getDefaultBoard({ name = 'New Board', privacy = 'main', managingType = 'items' }) {
    const labels = [
        { id: 'l101', title: 'Done', color: '#23cf51' },
        { id: 'l102', title: 'Working on it', color: '#f0c816' },
        { id: 'l103', title: 'Stuck', color: '#f03e16' },
    ]

    return {
        _id: makeId(),
        name,
        createdAt: Date.now(),
        privacy,
        managingType,
        state: '',
        labels: [
            {
                id: 'l101',
                title: 'Done',
                color: '#23cf51',
            },
            {
                id: 'l102',
                title: 'Working on it',
                color: '#f0c816',
            },
            {
                id: 'l103',
                title: 'Stuck',
                color: '#f03e16',
            },
        ],
        columns: [
            { id: 'owner', title: 'owner', type: 'owner' },
            { id: 'status', title: 'status', type: 'status' },
            { id: 'date', title: 'date', title: 'due date' }
        ],
        groups: [
            {
                id: makeId(),
                title: 'New Group',
                color: getRandomColor(),
                items: [
                    {
                        id: makeId(),
                        name: 'Item 1',
                        status: labels[getRandomIntInclusive(0, labels.length - 1)].title,
                        owner: '',
                        date: Date.now()
                    },
                    {
                        id: makeId(),
                        name: 'Item 2',
                        status: labels[getRandomIntInclusive(0, labels.length - 1)].title,
                        owner: '',
                        date: Date.now()
                    },
                    {
                        id: makeId(),
                        name: 'Item 3',
                        status: labels[getRandomIntInclusive(0, labels.length - 1)].title,
                        owner: '',
                        date: Date.now()
                    }
                ]
            },
            {
                id: makeId(),
                title: 'New Group',
                color: getRandomColor(),
                items: [
                    {
                        id: makeId(),
                        name: 'Item 4',
                        status: '',
                        owner: '',
                        date: Date.now()
                    },
                    {
                        id: makeId(),
                        name: 'Item 5',
                        status: '',
                        owner: '',
                        date: Date.now()
                    }
                ]
            }
        ]
    }
}