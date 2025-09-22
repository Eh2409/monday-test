
import { makeId } from "../util.service.js"

const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from "./board.service.local.js"

function getEmptyTask(taskName, columnValues) {

    if (!columnValues || !columnValues.length) {
        columnValues = getEmptyColumnValues()
    }

    return {
        id: makeId(),
        name: taskName,
        columnValues: [...columnValues]
    }
}

function getEmptyColumnValues() {
    return [
        { id: 'owner', value: '', },
        { id: 'status', value: 'not started', color: 'gray' },
        { id: 'due date', value: '' }
    ]
}

const service = local
export const boardService = { ...service, getEmptyTask }