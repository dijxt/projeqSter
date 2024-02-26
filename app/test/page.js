'use client';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



function App() {
    const initialTasks = {
        'todo': ['Task 1', 'Task 2', 'Task 3'],
        'done': [],
      };
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tasks[source.droppableId]);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      setTasks({
        ...tasks,
        [source.droppableId]: items,
      });
    } else {
      const sourceItems = Array.from(tasks[source.droppableId]);
      const destinationItems = Array.from(tasks[destination.droppableId]);
      const [movedItem] = sourceItems.splice(source.index, 1);

      destinationItems.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-screen bg-gray-100">
        {Object.entries(tasks).map(([columnId, tasks]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex-1 p-4 space-y-2 bg-gray-200">
                <h2 className="text-xl font-bold">{columnId}</h2>
                {tasks.map((task, index) => (
                  <Draggable draggableId={task} index={index} key={task}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="p-2 bg-white rounded shadow">
                        {task}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default App;