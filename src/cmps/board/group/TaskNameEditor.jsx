import { useState } from 'react'

export function TaskNameEditor({ name = '', onSave, placeholder }) {

    const [nameToEdit, setNameToEdit] = useState(name)
    const [isEditing, setIsEditing] = useState(false)

    function saveChanges() {
        setIsEditing(false)
        if (nameToEdit && nameToEdit !== name) {
            onSave(nameToEdit)
            if (placeholder) setNameToEdit('')
        } else if (!nameToEdit) {
            console.error(`Name can't be empty`)
            setNameToEdit(name)
        }
    }

    return (
        < >
            {isEditing
                ? <input
                    type="text"
                    name="task name"
                    id="task name"
                    className='task-name-input'
                    value={nameToEdit}
                    autoFocus
                    onChange={(ev) => setNameToEdit(ev.target.value)}
                    onBlur={() => saveChanges()}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") saveChanges()
                    }}
                    placeholder={placeholder ? "+ Add task" : ""}
                />
                : <span className="task-name" onClick={() => setIsEditing(true)}>
                    {placeholder && !nameToEdit ? placeholder : nameToEdit}
                </span>
            }
        </>
    )
}