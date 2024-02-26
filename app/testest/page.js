'use client';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = [
  { id: 'task-1', content: 'Tâche 1' },
  { id: 'task-2', content: 'Tâche 2' },
  { id: 'task-3', content: 'Tâche 3' },
];

const TaskList = ({ tasks }) => {
  return tasks.map((task, index) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="bg-gray-200 p-4 mb-2 rounded-md"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  ));
};

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, movedTask);

    setTasks(newTasks);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex">
          <Droppable droppableId="todo" className="w-1/3">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2 className="text-lg font-semibold mb-4">À faire</h2>
                <TaskList tasks={tasks.filter(task => task.id.startsWith('task-1'))} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="inProgress" className="w-1/3">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2 className="text-lg font-semibold mb-4">En cours</h2>
                <TaskList tasks={tasks.filter(task => task.id.startsWith('task-2'))} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="done" className="w-1/3">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h2 className="text-lg font-semibold mb-4">Terminé</h2>
                <TaskList tasks={tasks.filter(task => task.id.startsWith('task-3'))} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
