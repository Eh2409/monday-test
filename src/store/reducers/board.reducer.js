
export const SET_BOARDS = 'SET_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

const initialState = {
    boards: [],
}

export function boardReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_BOARDS:
            return { ...state, boards: cmd.boards }
        case REMOVE_BOARD:
            return {
                ...state,
                boards: state.boards.filter(b => b._id !== cmd.boardId)
            }
        case ADD_BOARD:
            return {
                ...state,
                boards: [cmd.board, ...state.boards]
            }
        case UPDATE_BOARD:
            return {
                ...state,
                boards: state.boards.map(b => b._id === cmd.board._id ? cmd.board : b)
            }

        default: return state
    }
}