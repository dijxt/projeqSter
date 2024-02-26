import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import fetchTaskStates from "@/lib/fetchTaskStates";
import fetchTaskEfforts from "@/lib/fetchTaskEfforts";
import fetchTaskTypes from "@/lib/fetchTaskTypes";

export default function TaskEdit({ modalIsOpen, closeModal, task }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [taskType, setTaskType] = useState('');
    const [taskState, setTaskState] = useState('');
    const [taskEffort, setTaskEffort] = useState('');

    // The task attributes lists
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

            setTaskTitle(task.titre);
            setTaskDescription(task.description);
            setTaskType(task.type_tache);
            setTaskState(task.etat);
            setTaskEffort(task.effort);
        };

        fetchTaskAttributes();
    }, [task]);

    const handleTaskTitleChange = (e) => {
        setTaskTitle(e.target.value);
    };

    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const handleTaskTypeChange = (e) => {
        setTaskType(e.target.value);
    };

    const handleTaskStateChange = (e) => {
        setTaskState(e.target.value);
    };

    const handleTaskEffortChange = (e) => {
        setTaskEffort(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Vérifier que le titre et la description ne sont pas vides
        if (!taskTitle || !taskDescription) {
            alert("Le titre et la description ne peuvent pas être vides.");
            return;
        }

        const taskData = {
            id_tache: task.id_tache,
            titre: taskTitle,
            description: taskDescription,
            type_tache: taskType,
            effort: taskEffort,
            etat: taskState
        };

        try {
            const response = await axios.put(process.env.NEXT_PUBLIC_API_HOST + '/api/tache/modifier', taskData);

            if (response.data.status === 'ok') {
                // Afficher un message de succès
                setSuccessMessage('Tâche modifiée avec succès !');
                // Fermer le modal après un délai
                setTimeout(() => {
                    location.reload();
                    closeModal();
                }, 3000);
            } else {
                console.error('Erreur lors de la modification de la tâche:', response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Edit Task"
            style={{
                content: {
                    width: '50%',
                    height: '50%',
                    margin: 'auto',
                },
            }}
        >
            <h2 className="text-2xl font-bold mb-4">Modifier la Tâche</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                    <div>
                        <label htmlFor="taskTitle" className="block text-sm font-medium leading-6 text-gray-900">
                            Titre de la tâche
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="taskTitle"
                                id="taskTitle"
                                autoComplete="off"
                                className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={taskTitle}
                                onChange={handleTaskTitleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="taskDescription" className="block text-sm font-medium leading-6 text-gray-900">
                            Description

                        </label>
                        <div className="mt-2">
                        <textarea
                            name="taskDescription"
                            id="taskDescription"
                            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={taskDescription}
                            onChange={handleTaskDescriptionChange}

                           
                        />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="taskType" className="block text-sm font-medium leading-6 text-gray-900">Type de
                            tâche</label>
                        <select
                            id="taskType"
                            name="taskType"
                            className="mt-2 block w-full py-1.5 pl-2 pr-8 border-0 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={taskType}
                            onChange={handleTaskTypeChange}
                        >
                            {taskTypes.map(type => (
                                <option key={type.id_type_tache} value={type.id_type_tache}>
                                    {type.libelle_type_tache}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="taskState" className="block text-sm font-medium leading-6 text-gray-900">
                            État de la tâche
                        </label>
                        <select
                            id="taskState"
                            name="taskState"
                            className="mt-2 block w-full py-1.5 pl-2 pr-8 border-0 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={taskState}
                            onChange={handleTaskStateChange}
                        >
                            {taskStates.map(state => (
                                <option key={state.id_etat} value={state.id_etat}>
                                    {state.libelle_etat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="taskEffort" className="block text-sm font-medium leading-6 text-gray-900">
                            Effort de la tâche
                        </label>
                        <select
                            id="taskEffort"
                            name="taskEffort"
                            className="mt-2 block w-full py-1.5 pl-2 pr-8 border-0 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={taskEffort}
                            onChange={handleTaskEffortChange}
                        >
                            {taskEfforts.map(effort => (
                                <option key={effort.id_effort} value={effort.id_effort}>
                                    {effort.libelle_effort}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <button type="submit"
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Modifier la tâche
                </button>
                {successMessage && (
                    <p className="mt-2 text-green-600">{successMessage}</p>
                )}
            </form>
        </Modal>
    );
}
