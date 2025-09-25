import { useEffect } from "react"
import { useSelector } from "react-redux"

// services
import { boardAction } from "../store/actions/board.actions.js"
import { BoardList } from "./board/BoardList"
import { NavLink } from "react-router-dom"

export function AsideMenu(props) {
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        load()
    }, [])

    async function load() {
        try {
            await boardAction.load()
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className="aside-menu">

            <NavLink to={'/board'} end>Home</NavLink>

            {boards?.length > 0 && < BoardList boards={boards} isMenuDisplay={true} />}
        </section>
    )
}