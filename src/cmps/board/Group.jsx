import { GroupTitleEditor } from "./group/GroupTitleEditor.jsx"
import { TaskNameEditor } from "./group/TaskNameEditor.jsx"

export function Group({ group, saveGroupTitle, onAddTask }) {

    const columns = group.items[0]?.columnValues.map(col => col.id) || []

    return (
        <section className="group" style={{ '--before-columns': group.color }}>

            <div className="group-header">
                <GroupTitleEditor
                    title={group.title}
                    color={group.color}
                    onSave={((dataToSave) => saveGroupTitle(dataToSave, group.id))}
                />
            </div>
            <div className="group-table">
                <div className="table-row table-header">
                    <div className="cell name">Task</div>
                    {columns.map(colId => (
                        <div key={colId} className="cell">{colId}</div>
                    ))}
                </div>

                {group.items.map(item => (
                    <div key={item.id} className="table-row">
                        <div className="cell">{item.name}</div>
                        {item.columnValues.map(col => (
                            <div key={col.id} className="cell">{col.value}</div>
                        ))}
                    </div>
                ))}

                <div className="table-row">
                    <div className="cell add-task">
                        <TaskNameEditor placeholder={"+ Add task"} onSave={(taskName) => onAddTask(taskName, group.id)} />
                    </div>
                </div>
            </div>
        </section>
    )
}