'use client';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useRouter } from "next/navigation";
import fetchTaskStates from "@/lib/fetchTaskStates";
import fetchTaskEfforts from "@/lib/fetchTaskEfforts";
import fetchTaskTypes from "@/lib/fetchTaskTypes";

export default function TaskCreate({ modalIsOpen, closeModal, projectId }) {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [taskType, setTaskType] = useState('');
    const [taskState, setTaskState] = useState('');
    const [taskEffort, setTaskEffort] = useState('');


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

            setTaskState(states[0].id_etat);
            setTaskEffort(efforts[0].id_effort);
            setTaskType(types[0].id_type_tache);
        };

        fetchTaskAttributes();
    }, []);



    const handleTaskTitleChange = (e) => {
        setTaskTitle(e.target.value);
    };

    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const handleTaskTypeChange = (e) => {
        setTaskType(e.target.value);
    }

    const handleTaskStateChange = (e) => {
        setTaskState(e.target.value);
    }

    const handleTaskEffortChange = (e) => {
        setTaskEffort(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!taskTitle || !taskDescription ) {
            alert("Le titre et la description ne peuvent pas être vides.");
            return;
        }

        const taskData = {
            id_projet: projectId,
            titre: taskTitle,
            description: taskDescription,
            type_tache: taskType,
            effort: taskEffort,
            etat: taskState
        };


        try {
            console.log(taskData)
            const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/api/tache/creer', taskData);

            if (response.data.status === 'ok') {

                setSuccessMessage('Tâche créée avec succès !');

            } else {
                setErrorMessage('Erreur lors de la création de la tâche');
            }
        } catch (error) {
            setErrorMessage('Erreur lors de la création de la tâche');
        }
        finally {
            setTimeout(() => {
                location.reload();
                closeModal();
            }, 2000);

        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="New Task"
            style={{
                content: {
                    width: '50%',
                    height: '60%',
                    margin: 'auto',
                },
            }}
        >
            <h2 className="text-2xl font-bold mb-4">Nouvelle Tâche</h2>
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
                    Créer la tâche
                </button>
                {successMessage && (
                    <p className="mt-2 text-green-600">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="mt-2 text-red-600">{errorMessage}</p>
                )}
            </form>
        </Modal>

    );
}


