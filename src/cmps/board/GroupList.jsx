import { Group } from "./Group.jsx"

export function GroupList({
    groups,
    columns,
    labels,
    canRemoveGroup,
    // group funcs
    onUpdateGroup,
    onRemoveGroup,
    // task funcs
    onAddTask,
    onRemoveTask,
    onUpdateTask,
    updateTaskOrder,
}) {

    return (
        <section className="group-list">
            {groups.map(group => (
                <Group
                    key={group.id}
                    id={group.id}
                    group={group}
                    columns={columns}
                    labels={labels}
                    canRemoveGroup={canRemoveGroup}
                    // group funcs
                    onUpdateGroup={onUpdateGroup}
                    onRemoveGroup={onRemoveGroup}
                    // task funcs
                    onAddTask={onAddTask}
                    onRemoveTask={onRemoveTask}
                    onUpdateTask={onUpdateTask}
                    updateTaskOrder={updateTaskOrder}
                />
            ))}
        </section>
    )
}

