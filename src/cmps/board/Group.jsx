
// dnd
import { closestCorners, DndContext } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// cmps
import { GroupTitleEditor } from "./group/GroupTitleEditor.jsx"
import { StatusPicker } from "./group/StatusPicker.jsx"
import { TaskNameEditor } from "./group/TaskNameEditor.jsx"
import { Task } from "./Task.jsx"

export function Group({
    id,
    group,
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

    const { attributes, listeners,
        setNodeRef, transform, transition, isDragging } = useSortable({ id })


    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    var columnsTitles = columns.map(col => col.title) || []

    function setTaskToUpdate(newVal, item, valType) {
        const itemCopy = structuredClone(item)
        itemCopy[valType] = newVal
        onUpdateTask(itemCopy, group.id)
    }

    function setGroupToUpdate(newVals, group) {
        const updatedGroup = { ...group, ...newVals }
        onUpdateGroup(updatedGroup)
    }


    function getTaskIdx(taskId) {
        const taskIdx = group?.items.findIndex(i => i.id === taskId)
        return taskIdx
    }

    function handleDragEndTask(ev) {
        const { active, over } = ev
        if (!over) return
        if (active.id === over.id) return

        const originalPos = getTaskIdx(active.id)
        const newPos = getTaskIdx(over.id)

        const tasksCopy = structuredClone(group?.items)
        const newTaskesOrder = arrayMove(tasksCopy, originalPos, newPos)

        updateTaskOrder(group.id, newTaskesOrder)
    }


    return (
        <section className={`group  ${isDragging ? 'dragging' : ''}`}
            style={{ '--before-columns': group.color, ...style }}
            key={group.id}
            ref={setNodeRef}
            {...attributes}
        >

            <div className="group-header">

                <div className="group-title-wrapper flex">
                    <div className="group-title">
                        <div className="remove-btn-wrapper">
                            <button className="remove-btn"
                                disabled={!canRemoveGroup}
                                onClick={() => onRemoveGroup(group.id)}>
                                <span>X</span>
                            </button>
                        </div>

                        <GroupTitleEditor
                            title={group.title}
                            color={group.color}
                            onSave={((newVals) => setGroupToUpdate(newVals, group))}
                        />

                        <div className="group-grab" {...listeners}>grap</div>
                    </div>
                </div>

                <div className="table-row table-header">
                    <div className="task-bar">
                        <div className="white-block"></div>
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

                <DndContext onDragEnd={handleDragEndTask} collisionDetection={closestCorners}
                    strategy={verticalListSortingStrategy}>
                    <SortableContext items={group?.items} >
                        {group.items.map(item => (
                            <Task
                                key={item.id}
                                item={item}
                                onRemoveTask={(itemId) => onRemoveTask(group.id, itemId)}
                                setTaskToUpdate={setTaskToUpdate}
                                labels={labels}
                                columns={columns}
                            />
                        ))}
                    </SortableContext>
                </DndContext>

                <div className="table-row">
                    <div className="task-bar">
                        <div className="white-block"></div>
                        <div className="color-bar"></div>
                        <div className="cell add-task full">
                            <TaskNameEditor placeholder={"+ Add task"} onSave={(taskName) => onAddTask(taskName, group.id)} />
                        </div>
                    </div>
                    <div className="cell full-line"></div>
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
