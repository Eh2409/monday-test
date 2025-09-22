import { useEffect } from "react"
import { useSelector } from "react-redux"

// services
import { boardAction } from "../store/actions/board.actions.js"
// cmps
import { BoardList } from "../cmps/board/BoardList.jsx"


export function BoardIndex() {
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
        <section>
            <header className="flex justify-between align-center">
            </header>
            {boards?.length > 0
                ? <BoardList boards={boards} />
                : <div>No board found</div>
            }

        </section>
    )

}