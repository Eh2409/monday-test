
export const SET_OBJECTS = 'SET_OBJECTS'
export const REMOVE_OBJECT = 'REMOVE_OBJECT'
export const ADD_OBJECT = 'ADD_OBJECT'
export const UPDATE_OBJECT = 'UPDATE_OBJECT'

const initialState = {
    objects: [],
}

export function crudlReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_OBJECTS:
            return { ...state, objects: cmd.objects }
        case REMOVE_OBJECT:
            return {
                ...state,
                objects: state.objects.filter(o => o._id !== cmd.objectId)
            }
        case ADD_OBJECT:
            return {
                ...state,
                objects: [cmd.object, ...state.objects]
            }
        case UPDATE_OBJECT:
            return {
                ...state,
                objects: state.objects.map(o => o._id === cmd.object._id ? cmd.object : o)
            }

        default: return state
    }
}