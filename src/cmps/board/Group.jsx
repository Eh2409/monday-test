export function Group({ group }) {

    const columns = group.items[0]?.columnValues.map(col => col.id) || []

    return (
        <section className="group">

            <div className="group-header">
                <h3>{group.title}</h3>
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
                        <div className="cell name">{item.name}</div>
                        {item.columnValues.map(col => (
                            <div key={col.id} className="cell">{col.value}</div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}