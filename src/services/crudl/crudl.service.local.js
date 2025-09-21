import { storageService } from "../async-storage.service"
import { loadFromStorage, makeId, makeLorem, saveToStorage } from "../util.service"

export const crudlService = {
    query,
    getById,
    remove,
    save
}

const CRUDL_KEY = 'CRUDL_KEY'

_createObjectArray()

async function query(filterBy = {}) {
    var objects = await storageService.query(CRUDL_KEY)

    objects = objects.sort((o1, o2) => (o1.createdAt - o2.createdAt) * -1)

    return objects
}

async function getById(objectId) {
    return await storageService.get(CRUDL_KEY, objectId)
}

async function remove(objectId) {
    return await storageService.remove(CRUDL_KEY, objectId)
}

async function save(object) {

    if (object?._id) {
        return await storageService.put(CRUDL_KEY, object)
    } else {
        object.createdAt = Date.now()
        return await storageService.post(CRUDL_KEY, object)
    }
}


// private func

function _createObjectArray() {

    var objects = loadFromStorage(CRUDL_KEY)
    if (!objects || !objects.length) {
        var objects = []
        for (let i = 0; i < 20; i++) {
            objects.push(_createObject())
        }
        saveToStorage(CRUDL_KEY, objects)
    }
}

function _createObject() {
    return {
        _id: makeId(),
        name: makeLorem(1),
        createdAt: Date.now(),
        description: makeLorem(20)
    }
}