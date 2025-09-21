import { crudlService } from "../../services/crudl/index.js";
import { ADD_OBJECT, REMOVE_OBJECT, SET_OBJECTS, UPDATE_OBJECT } from "../reducers/crudl.reducer.js";
import { store } from "../store.js";


export const crudlAction = {
    load,
    get,
    remove,
    add,
    update
}


async function load(filterBy) {
    try {
        const objects = await crudlService.query(filterBy)
        store.dispatch({ type: SET_OBJECTS, objects })
    } catch (err) {
        console.log(err);
        throw err
    }

}
async function get(objectId) {
    try {
        const object = await crudlService.getById(objectId)
        return object
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function remove(objectId) {
    try {
        await crudlService.remove(objectId)
        store.dispatch({ type: REMOVE_OBJECT, objectId })
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function add(object) {
    try {
        const savedObject = await crudlService.save(object)
        store.dispatch({ type: ADD_OBJECT, object: savedObject })
        return savedObject._id
    } catch (err) {
        console.log(err);
        throw err
    }
}

async function update(object) {
    try {
        const savedObject = await crudlService.save(object)
        store.dispatch({ type: UPDATE_OBJECT, object: savedObject })
        return savedObject._id
    } catch (err) {
        console.log(err);
        throw err
    }
}