import { useEffect, useState } from "react";

export function StatusPicker({ status, onUpdate, labels = [] }) {

    const [statusToEdit, setStatusToEdit] = useState(status)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (statusToEdit !== status) {
            setStatusToEdit(status)
        }
    }, [status])


    function onChange(newStatus) {
        setIsEditing(false)
        // if (newStatus !== status) {
        //     setStatusToEdit(newStatus)
        //     onUpdate(newStatus)
        // }

        setStatusToEdit(newStatus)
        onUpdate(newStatus)
    }

    return (
        <div className="status-picker"
            style={{ backgroundColor: labels.find(l => l.title === statusToEdit)?.color || 'gray' }}
            onClick={() => setIsEditing(true)}>
            {isEditing
                ? <select
                    className="edit-mode"
                    name="status"
                    id="status"
                    value={statusToEdit}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={() => setIsEditing(false)}
                    autoFocus
                >

                    {labels.length > 0 && labels.map(l => {
                        return <option
                            style={{ backgroundColor: l.color }}
                            key={l.id}
                            value={l.title}
                        >{l.title}</option>
                    })}
                </select>
                : <span>
                    {statusToEdit}
                </span>
            }

        </div>
    )
}