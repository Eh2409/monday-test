import { boardService } from "../../services/board/board-index.js";
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UPDATE_BOARD } from "../reducers/board.reducer.js";
import { store } from "../store.js";


export const boardAction = {
    load,
    remove,
    save,
}


async function load(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log(err);
        throw err
    }

}

async function remove(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch({ type: REMOVE_BOARD, boardId })
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function save(board) {
    const method = board?._id ? 'update' : 'add'
    try {
        const savedBoard = await boardService.save(board)

        if (method === 'update') {
            store.dispatch({ type: UPDATE_BOARD, board: savedBoard })
        } else {
            store.dispatch({ type: ADD_BOARD, board: savedBoard })
        }

        return savedBoard._id
    } catch (err) {
        console.log(err);
        throw err
    }
}
