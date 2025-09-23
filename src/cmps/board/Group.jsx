import { useEffect, useState } from "react"
import { GroupTitleEditor } from "./group/GroupTitleEditor.jsx"
import { TaskNameEditor } from "./group/TaskNameEditor.jsx"

export function Group({ group, saveGroupTitle, onAddTask, onUpdateTaskName,
    onRemoveTask, onRemoveGroup, canRemoveGroup }) {

    const [columns, setColumns] = useState([])
    useEffect(() => {
        const columns = group.items[0]?.columnValues.map(col => col.id) || []
        setColumns(columns)
    }, [])

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
                    {columns.map(colId => (
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
                        {item.columnValues.map(col => (
                            <div key={col.id} className="cell">{col.value}</div>
                        ))}
                        <div className="cell full"></div>
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
        </section>
    )
}