
const { DEV, VITE_LOCAL } = import.meta.env


import { crudlService as local } from "./crudl.service.local.js"


function getEmptyObject() {
    return {
        name: '',
        description: '',
    }
}

const service = local
export const crudlService = { getEmptyObject, ...service }