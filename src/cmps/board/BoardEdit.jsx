import { useState } from "react"
import { boardService } from "../../services/board/board-index.js"
import { useNavigate } from "react-router-dom"


export function BoardEdit(props) {

    const navigate = useNavigate()

    const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())

    function handleChange({ target }) {
        var { value, name } = target

        setBoardToEdit(prev => ({ ...prev, [name]: value }))
    }

    async function onSave(ev) {
        ev.preventDefault()

        if (!boardToEdit.name) boardToEdit.name = 'New board'
        if (!boardToEdit.managingType) boardToEdit.managingType = 'items'

        try {
            const board = await boardService.save(boardToEdit)
            navigate(`/board/${board._id}`)
        } catch (err) {
            console.log('err:', err)
            setBoard(prevBoard)
        }
    }

    function privacyMsg(type) {
        switch (type) {
            case 'main':
                return 'Visible to everyone in your account'
            case 'private':
                return 'For working privately - alone or with selected team members.'
            case 'shareable':
                return 'For working privately with guests outside your account.'
            default:
                return ''
        }
    }

    return (
        <section className="board-edit">
            <form onSubmit={onSave}>

                <label htmlFor="name">Board name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={boardToEdit.name}
                    onChange={handleChange}
                    className="name-input"
                />

                <div>Privacy</div>
                <ul className="flex">
                    {boardService.getPrivacyValues().map(val => {
                        return <li key={val} className="flex align-center">
                            <input
                                type="radio"
                                id={val}
                                name="privacy"
                                value={val} checked={boardToEdit.privacy === val}
                                onChange={handleChange}
                            />
                            <label htmlFor={val}>{val}</label>
                        </li>
                    })}
                </ul>

                <div>{privacyMsg(boardToEdit.privacy)}</div>

                <hr />

                <div>Select what you're managing in this board</div>
                <ul className="managing-type-list">
                    {boardService.getBoardManagingTypes().map(val => {
                        return <li key={val} className="flex align-center">
                            <input
                                type="radio"
                                id={val}
                                name="managingType"
                                value={val}
                                checked={boardToEdit.managingType === val}
                                onChange={handleChange}
                            />
                            <label htmlFor={val}>{val}</label>
                        </li>
                    })}
                    <li key="custom" className="flex align-center">
                        <label htmlFor="custom" className="flex">
                            <input
                                type="radio"
                                id="custom"
                                name="managingType"
                                value="custom"
                                checked={!boardService.getBoardManagingTypes().includes(boardToEdit.managingType)}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="inputType"
                                id="inputType"
                                placeholder="Custom"
                                onFocus={(ev) => setBoardToEdit(prev => ({ ...prev, managingType: ev.target.value }))}
                                onChange={(ev) => setBoardToEdit(prev => ({ ...prev, managingType: ev.target.value }))}
                            />
                        </label>
                    </li>
                </ul>

                <div className="actions">
                    <button type="button">Cancel</button>
                    <button type="submit" className="create-baord-btn">Create Board</button>
                </div>
            </form>
        </section>
    )
}