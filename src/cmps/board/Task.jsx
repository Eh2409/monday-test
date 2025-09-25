
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { StatusPicker } from "./group/StatusPicker.jsx"
import { TaskNameEditor } from "./group/TaskNameEditor.jsx"

export function Task({ item, onRemoveTask, setTaskToUpdate, labels, columns }) {

    const { attributes, listeners,
        setNodeRef, transform, transition } = useSortable({ id: item.id })


    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    return (
        <div className="table-row" ref={setNodeRef} {...attributes} style={style}>
            <div className="task-bar">
                <div className="remove-btn-wrapper">
                    <button className="remove-btn" onClick={() => onRemoveTask(item.id)}>
                        <span>X</span>
                    </button>
                </div>
                <div className="white-block"></div>
                <div className="color-bar"></div>
                <div className="cell name flex">
                    <TaskNameEditor name={item.name}
                        onSave={(taskName) => setTaskToUpdate(taskName, item, 'name')} />
                    <div {...listeners}>grab</div>
                </div>
            </div>

            {columns.map(col => {
                const value = item[col.id]
                if (col.id === 'status') {
                    return <div key={col.id} className="cell">
                        {DynamicCmp(col.id, value,
                            (newStatus) => setTaskToUpdate(newStatus, item, col.type),
                            labels
                        )}
                    </div>
                } else {
                    return <div key={col.id} className="cell">{value}</div>
                }

            })}

            < div className="cell full"></div>
        </div>
    )
}




export function DynamicCmp(type, value, onUpdate, labels) {
    switch (type) {
        case 'status':
            return <StatusPicker status={value} labels={labels} onUpdate={onUpdate} />
        default:
            return <p>UNKNOWN {type}</p>
    }
}

