
import { useEffect, useState } from "react";
import fetchTaskStates from "@/lib/fetchTaskStates";
import fetchTaskEfforts from "@/lib/fetchTaskEfforts";
import fetchTaskTypes from "@/lib/fetchTaskTypes";
import TaskEdit from "@/components/TaskEdit";
import axios from "axios";

export default function TaskColumn({ status, tasks, rights }) {
    const [taskStates, setTaskStates] = useState([]);
    const [taskEfforts, setTaskEfforts] = useState([]);
    const [taskTypes, setTaskTypes] = useState([]);
    const [currentTaskEdit, setCurrentTaskEdit] = useState({id_tache: 0, titre: '', description: '', type_tache: 0, effort: 0, etat: 0});

    const handleDeleteTask = async (id) => {
        axios.delete(`/api/tache/supprimer`, { data: { id_tache: id } })
        location.reload();
    }

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

   
        const [modalIsOpenEditTask, setIsOpenEditTask] = useState(false);

        function openModalEditTask(task) {
            setCurrentTaskEdit(task);
            setIsOpenEditTask(true);
        }
    
        function closeModalEditTask() {
    
            setIsOpenEditTask(false);
        }

    return (
        <div className="flex flex-col items-center ">
            <h2 className="text-2xl font-bold mb-4 ">{status}</h2>
            <div className="border rounded shadow-md w-80  ">
                <div className="border p-2 bg-slate-400 bg-opacity-75">
                    {tasks.map((task) => (
                        <div className="task mb-4 p-4 border rounded shadow bg-white">
                            <h3 className="text-xl font-semibold">Titre : {task.titre}</h3>
                            <p className="text-sm mb-2">Description : {task.description}</p>
                            <p className="text-xs text-gray-500">Effort de la tâche : {(taskEfforts.find(effort => effort.id_effort === task.effort) || {}).libelle_effort}</p>
                            <p className="text-xs text-gray-500">Type de tâche : {(taskTypes.find(type => type.id_type_tache === task.type_tache) || {}).libelle_type_tache}</p>
                            <div className="flex justify-end items-center">
                                {(rights === 3 || rights === 2) && (
                                    <div className="flex space-x-2">
                                        <button onClick={() => openModalEditTask(task)} className="text-blue-500 hover:text-blue-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            </svg>
                                        </button>
                                        <button onClick={() => handleDeleteTask(task.id_tache)} className="text-red-500 hover:text-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3-3m0 0l3 3m-3-3v14a2 2 0 002 2h8a2 2 0 002-2V6m-2 0H5m14 0a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>  
                    ))}
                </div>
            </div>
            <TaskEdit modalIsOpen={modalIsOpenEditTask} closeModal={closeModalEditTask} task={currentTaskEdit}/>
        </div>
    );
}
