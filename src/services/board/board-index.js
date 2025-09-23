
import { makeId } from "../util.service.js"

const { DEV, VITE_LOCAL } = import.meta.env

import { boardService as local } from "./board.service.local.js"

function getEmptyTask(taskName) {

    return {
        id: makeId(),
        name: taskName
    }

}

const service = local
export const boardService = { ...service, getEmptyTask }