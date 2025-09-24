import { GroupTitleEditor } from "./group/GroupTitleEditor.jsx"
import { StatusPicker } from "./group/StatusPicker.jsx"
import { TaskNameEditor } from "./group/TaskNameEditor.jsx"

export function Group({ group, columns, saveGroupTitle, onAddTask, onUpdateTaskName,
    onRemoveTask, onRemoveGroup, canRemoveGroup, labels, onUpdateTask }) {

    var columnsTitles = columns.map(col => col.title) || []

    function setTaskToUpdate(newVal, item, valType) {
        const itemCopy = structuredClone(item)
        itemCopy[valType] = newVal
        onUpdateTask(itemCopy, group.id)
    }

    return (
        <section className="group" style={{ '--before-columns': group.color }}>

            <div className="group-header">
                <div className="group-title">

                    <button className="remove-btn"
                        disabled={!canRemoveGroup}
                        onClick={() => onRemoveGroup(group.id)}>
                        <span>X</span>
                    </button>

                    <GroupTitleEditor
                        title={group.title}
                        color={group.color}
                        onSave={((dataToSave) => saveGroupTitle(dataToSave, group.id))}
                    />
                </div>

                <div className="table-row table-header">
                    <div className="task-bar">
                        <div className="color-bar"></div>
                        <div className="cell name">Task</div>
                    </div>
                    {columnsTitles.map(colId => (
                        <div key={colId} className="cell">{colId}</div>
                    ))}
                    <div className="cell full"></div>
                </div>

            </div>


            <div className="group-table">
                {group.items.map(item => (
                    <div key={item.id} className="table-row">
                        <div className="remove-btn" onClick={() => onRemoveTask(group.id, item.id)}>
                            <span>X</span>
                        </div>
                        <div className="task-bar">
                            <div className="color-bar"></div>
                            <div className="cell name">
                                <TaskNameEditor name={item.name}
                                    onSave={(taskName) => onUpdateTaskName(taskName, group.id, item.id)} />
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
                ))}

                <div className="table-row">
                    <div className="task-bar">
                        <div className="color-bar"></div>
                        <div className="cell add-task full">
                            <TaskNameEditor placeholder={"+ Add task"} onSave={(taskName) => onAddTask(taskName, group.id)} />
                        </div>
                    </div>
                    <div className="full-line"></div>
                </div>
            </div>
        </section >
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
