'use client';
import { useEffect, useState } from 'react';
import fetchProject from "@/lib/fetchProject";
import fetchUserRights from "@/lib/fetchUserRights";
import dotenv from "dotenv";
import { notFound } from "next/navigation";
import TaskColumn from "@/components/TaskColumn";
import fetchTasks from "@/lib/fetchTasks";
import TaskCreate from "@/components/TaskCreate";
import ProjectAffect from "@/components/ProjectAffect";
import ProjectEdit from "@/components/ProjectEdit";
import { FaPencilAlt } from "react-icons/fa";

dotenv.config();
export default function ProjectPage({ params: { id }}) {
    const [project, setProject] = useState(null);
    const [todo, setTodo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);
    const [myRights, setMyRights] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const found = await fetchProject(parseInt(id));
            console.log(found);
            if (!found) notFound();
            setProject(found);

            // fetch tasks
            const tasks = await fetchTasks(id);
            const rights = await fetchUserRights(id);

            console.log(rights);

            setMyRights(rights);

            setTodo([]);
            setInProgress([]);
            setDone([]);
            tasks.forEach(task => {
                if (task.etat === 1) {
                    setTodo(prevTodo => [...prevTodo, task]);
                } else if (task.etat === 2) {
                    setInProgress(prevInProgress => [...prevInProgress, task]);
                } else {
                    setDone(prevDone => [...prevDone, task]);
                }
            });
        };

        fetchData();
    }, [id]);


    const [modalIsOpenEditProject, setIsOpenEditProject] = useState(false);

    function openModalEditProject() {
        setIsOpenEditProject(true);
    }

    function closeModalEditProject() {
        setIsOpenEditProject(false);
    }

    const [modalIsOpenCreateTask, setIsOpenCreateTask] = useState(false);

    function openModalCreateTask() {
        setIsOpenCreateTask(true);
    }

    function closeModalCreateTask() {
        setIsOpenCreateTask(false);
    }

    const [modalIsOpenProjectAffect, setIsOpenProjectAffect] = useState(false);

    function openModalProjectAffect() {

        setIsOpenProjectAffect(true);
    }

    function closeModalProjectAffect() {

        setIsOpenProjectAffect(false);
    }

    if (!project) {
        return <div>Loading...</div>;
    }

    return (

        <div className="Fond min-h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{backgroundImage: "url('/assets/fond_ecran.jpg')" }}>
            {myRights === 3 && (
                <div className="text-white bg-blue-700 px-4 py-2 mb-4 rounded-md">
                    Vous êtes chef de projet sur ce projet.
                </div>
            )}
            {myRights === 2 && (
                <div className="text-white bg-green-700 px-4 py-2 mb-4 rounded-md">
                    Vous avez des droits de lecture et écriture sur ce projet.
                </div>
            )}
            {myRights === 1 && (
                <div className="text-white bg-yellow-700 px-4 py-2 mb-4 rounded-md">
                    Vous avez des droits seulement de lecture sur ce projet.
                </div>
            )}

            <div
                className="text-center mb-10 bg-white p-2 rounded-lg shadow-lg border border-gray-500 max-w-md mx-auto">
                <h1 className="text-3xl font-bold uppercase text-gray-900 mb-4">{project.nom_projet}</h1>
                <p className="text-lg text-gray-700">{project.description}</p>

                <div className="flex justify-center mt-4">
                    {(myRights === 3) && (
                        <button onClick={() => openModalEditProject(project)}
                                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                            <FaPencilAlt className="w-4 h-4"/>
                        </button>
                    )}
                </div>
            </div>

            <div
                className="task-board flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mx-auto mb-10">
                <TaskColumn status="À faire" tasks={todo} rights={myRights}
                            className="border-r border-gray-200 md:border-b-0 p-4 shadow-md bg-white text-white"/>
                <TaskColumn status="En cours" tasks={inProgress} rights={myRights}
                            className="border-r border-gray-200 md:border-b-0 p-4 shadow-md bg-white text-white"/>
                <TaskColumn status="Terminé" tasks={done} rights={myRights}
                            className="p-4 shadow-md bg-white text-white"/>
            </div>

            <div className="flex justify-center space-x-4">
                {(myRights === 3 || myRights === 2) && (
                    <button
                        className="bg-gray bg-opacity-75 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center transform transition duration-500 ease-in-out hover:scale-105"
                        onClick={openModalCreateTask}
                    >
                        Nouvelle tâche
                    </button>
                )}
                {myRights === 3 && (
                    <button
                        className="bg-gray bg-opacity-75 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center transform transition duration-500 ease-in-out hover:scale-105"
                        onClick={openModalProjectAffect}
                    >
                        Affecter un salarié à ce projet
                    </button>
                )}
            </div>


            <ProjectEdit
                modalIsOpen={modalIsOpenEditProject}
                openModal={openModalEditProject}
                closeModal={closeModalEditProject}
                project={project}
            />


            <TaskCreate
                modalIsOpen={modalIsOpenCreateTask}
                openModal={openModalCreateTask}
                closeModal={closeModalCreateTask}
                projectId={id}
            />

            <ProjectAffect
                modalIsOpen={modalIsOpenProjectAffect}
                openModal={openModalProjectAffect}
                closeModal={closeModalProjectAffect}
                projectId={id}
            />
        </div>


    )
}