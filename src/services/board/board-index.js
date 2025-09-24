const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from "./board.service.local.js"


// function getEmptyTask(taskName) {

//     return {
//         id: makeId(),
//         name: taskName
//     }

// }

function getEmptyBoard() {
    return {
        name: 'New Board',
        privacy: 'main',
        managingType: 'items',
    }
}

function getPrivacyValues() {
    return ['main', 'private', 'shareable',]
}

function getBoardManagingTypes() {
    return [
        "items",
        'budgets',
        'employees',
        "campaigns",
        "leads",
        "projects",
        "creatives",
        "clients",
        "tasks",
    ]
}


const service = local
export const boardService = { ...service, getEmptyBoard, getPrivacyValues, getBoardManagingTypes }