import { GroupTitleEditor } from "./group/GroupTitleEditor.jsx"

export function Group({ group, saveGroupTitle }) {

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
            </div>
        </section>
    )
}