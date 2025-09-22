
const { DEV, VITE_LOCAL } = import.meta.env


import { boardService as local } from "./board.service.local.js"


const service = local
export const boardService = { ...service }