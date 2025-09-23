import { storageService } from "../async-storage.service"
import { loadFromStorage, makeId, makeLorem, saveToStorage } from "../util.service"

export const boardService = {
    query,
    getById,
    remove,
    save
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
        board.createdAt = Date.now()
        return await storageService.post(BOARD_KEY, board)
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
    return {
        _id: makeId(),
        name: makeLorem(1),
        createdAt: Date.now(),
        state: '',
        columns: [
            { id: 'owner', title: 'owner', type: 'owner' },
            { id: 'status', title: 'status', type: 'status' },
            { id: 'date', title: 'date', title: 'due date' }
        ],
        groups: [
            {
                id: makeId(),
                title: makeLorem(3),
                color: '#000000',
                items: [
                    {
                        id: makeId(),
                        name: makeLorem(3),
                        status: 'Working on it',
                        owner: 'eliad',
                        date: '2025-09-22'
                    },
                    {
                        id: makeId(),
                        name: makeLorem(3),
                        status: 'Working on it',
                        owner: 'eliad',
                        date: '2025-09-22'
                    }
                ]
            },
        ]
    }
}


