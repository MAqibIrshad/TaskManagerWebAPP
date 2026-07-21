import TaskCard from "./TaskCard"
type Task = {
  id: number
  title: string
  completed: boolean
  category: {
    id: number
    name: string
  } | null
}
// interface Props {
//   tasks: Task[]
// //   onUpdate: (
// //     id: number,
// //     title:string,
// //     completed: boolean
// //   ) => void
//   onToggle:(
//     id: number,
//     completed:boolean
//   )=>void,
//   onDelete: (id: number) => void
// }

interface Props {
  tasks: Task[]
  onToggle: (
    id: number,
    completed: boolean
  ) => void
  onDelete: (id: number) => void
  onReorder: (taskIds: number[]) => void
}
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core"

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { useEffect, useState } from "react"

export default function TaskList({
  tasks,
  onToggle,
//   onUpdate,
  onDelete, onReorder
}: Props) {
  const [items, setItems] = useState(tasks)

useEffect(() => {
  setItems(tasks)
  
}, [tasks])


// function handleDragEnd(event: DragEndEvent) {
//   const { active, over } = event

//   if (!over || active.id === over.id) return

//   setItems((items) => {
//     const oldIndex = items.findIndex(
//       (item) => item.id === active.id
//     )

//     const newIndex = items.findIndex(
//       (item) => item.id === over.id
//     )

//     return arrayMove(items, oldIndex, newIndex)
//   })


  
// }
function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event

  if (!over || active.id === over.id) return

  const oldIndex = items.findIndex(
    (task) => task.id === active.id
  )

  const newIndex = items.findIndex(
    (task) => task.id === over.id
  )

  const reordered = arrayMove(
    items,
    oldIndex,
    newIndex
  )

  setItems(reordered)

  onReorder(
    reordered.map((task) => task.id)
  )
}



  return (
    <DndContext
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <SortableContext
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
      
    >
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
        //   onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
    </SortableContext>
    </DndContext>
  )
}