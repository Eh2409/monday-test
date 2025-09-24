import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

// services
import { boardAction } from "../store/actions/board.actions.js"

// cmps
import { BoardList } from "../cmps/board/BoardList.jsx"
import { Popup } from "../cmps/Popup.jsx"
import { BoardEdit } from "../cmps/board/BoardEdit.jsx"


export function BoardIndex() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isPopupOpen, setIsPopupOpen] = useState(false)

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

    function toggleIsPopupOpen() {
        setIsPopupOpen(!isPopupOpen)
    }
    function onClosePopup() {
        setIsPopupOpen(false)
    }

    return (
        <section className="board-index">

            <header className="board-index-header flex justify-between align-center">
                <button onClick={toggleIsPopupOpen}>Add Board</button>
            </header>

            {boards?.length > 0
                ? <BoardList boards={boards} />
                : <div>No board found</div>
            }

            <Popup
                header={<h2>Create board</h2>}
                onClosePopup={onClosePopup}
                isPopupOpen={isPopupOpen}>

                <BoardEdit
                    onClosePopup={onClosePopup}
                />

            </Popup>

        </section>
    )

}