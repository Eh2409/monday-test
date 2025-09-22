import { useState, useEffect, useRef } from 'react'

export function GroupTitleEditor({ title, color, onSave }) {

    const [titleToEdit, setTitleToEdit] = useState(title)
    const [colorToEdit, setColorToEdit] = useState(color)
    const [isEditing, setIsEditing] = useState(false)

    const editorRef = useRef()

    useEffect(() => {
        if (titleToEdit !== title) {
            setTitleToEdit(title)
        }
    }, [title])

    useEffect(() => {
        if (colorToEdit !== color) {
            setTitleToEdit(color)
        }
    }, [color])

    useEffect(() => {
        if (isEditing) addEventListener('mousedown', handleClickOutside)

        return (() => {
            removeEventListener('mousedown', handleClickOutside)
        })
    }, [isEditing, titleToEdit, colorToEdit]);


    function handleClickOutside({ target }) {
        if (editorRef.current && !editorRef.current.contains(target)) {
            saveChanges()
        }
    }

    function saveChanges() {
        setIsEditing(false)
        if (titleToEdit !== title || colorToEdit !== color) {
            onSave({ title: titleToEdit, color: colorToEdit })
        }
    }

    return (
        <h3 className="group-title-editor" style={{ color: colorToEdit }} ref={editorRef}>
            {isEditing
                ? <div className='active-editor'>
                    <input
                        type="color"
                        name="color"
                        id="color"
                        value={colorToEdit}
                        onChange={(ev) => setColorToEdit(ev.target.value)}
                    />
                    <input
                        style={{ color: 'inherit' }}
                        type="text"
                        name="title"
                        id="title"
                        value={titleToEdit}
                        onChange={(ev) => setTitleToEdit(ev.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") saveChanges()
                        }}
                    />
                </div>
                : <span onClick={() => setIsEditing(true)}>{titleToEdit}</span>
            }

        </h3>
    )
}