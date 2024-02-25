
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import fetchTaskStates from "@/lib/fetchTaskStates";
import fetchTaskEfforts from "@/lib/fetchTaskEfforts";
import fetchTaskTypes from "@/lib/fetchTaskTypes";
import axios from 'axios';
import fetchTasks from "@/lib/fetchTasks";

export default function TaskColumn({ status, tasks }) {
    const [taskStates, setTaskStates] = useState([]);
    const [taskEfforts, setTaskEfforts] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);

    useEffect(() => {
        const fetchTaskAttributes = async () => {
            const states = await fetchTaskStates();
            const efforts = await fetchTaskEfforts();
            const types = await fetchTaskTypes();

            setTaskStates(states);
            setTaskEfforts(efforts);
            setTaskTypes(types);

        };

        fetchTaskAttributes();
    }, []);

    const onDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }

        const taskId = result.draggableId;
        const newState = result.destination.droppableId;

        try {
            const response = await axios.put('/api/tasks', {
                id_tache: taskId,
                etat: newState
            });

            if (response.status === 200) {
                console.log('Task state updated successfully');
            } else {
                console.error('Failed to update task state');
            }
        } catch (error) {
            console.error('Failed to update task state', error);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">{status}</h2>
            <div className="border rounded shadow-md w-80">
                <div className="border p-2">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="tasks">
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {tasks.map((task, index) => (
                                        <Draggable key={task.id_tache} draggableId={task.id_tache.toString()} index={index}>

                                            {(provided, snapshot) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="task mb-4 p-4 border rounded shadow">
                                                        <h3 className="text-xl font-semibold">Titre : {task.titre}</h3>
                                                        <p className="text-sm mb-2">Description : {task.description}</p>
                                                        <p className="text-xs text-gray-500">Effort de la tâche : {(taskEfforts.find(effort => effort.id_effort === task.effort) || {}).libelle_effort}</p>
                                                        <p className="text-xs text-gray-500">Type de tâche : {(taskTypes.find(type => type.id_type_tache === task.type_tache) || {}).libelle_type_tache}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
}
