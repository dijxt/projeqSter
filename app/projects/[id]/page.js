// projects/[id].js
'use client';
import React, { useEffect, useState } from 'react';
import fetchProject from "@/lib/fetchProject";
import dotenv from "dotenv";
import { notFound } from "next/navigation";
import TaskColumn from "@/components/TaskColumn";
import fetchTasks from "@/lib/fetchTasks";
import TaskCreate from "@/components/TaskCreate";
import ProjectAffect from "@/components/ProjectAffect";


dotenv.config();
export default function ProjectPage({ params: { id }}) {
    const [project, setProject] = useState(null);
    const [todo, setTodo] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [done, setDone] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const found = await fetchProject(parseInt(id));
            console.log(found);
            if (!found) notFound();
            setProject(found);

            // fetch tasks
            const tasks = await fetchTasks(id);


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
        <div>
            <h1 className="mb-5 text-3xl font-bold text-center">{project.nom_projet}</h1>
            <p style={{ marginBottom: '100px' }} className="text-2xl text-center">{project.description}</p>



            



            <div
                className="task-board flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mx-auto mb-10">
                <TaskColumn status="À faire" tasks={todo}
                            className="border-r border-gray-200 md:border-b-0 p-4 shadow-md"/>
                <TaskColumn status="En cours" tasks={inProgress}
                            className="border-r border-gray-200 md:border-b-0 p-4 shadow-md"/>
                <TaskColumn status="Terminé" tasks={done} className="p-4 shadow-md"/>
            </div>

            <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center mx-auto block transform transition duration-500 ease-in-out hover:scale-105 mb-7"
                onClick={openModalCreateTask}
            >
                Nouvelle tâche
            </button>
            <TaskCreate
                modalIsOpen={modalIsOpenCreateTask}
                openModal={openModalCreateTask}
                closeModal={closeModalCreateTask}
                projectId={id}
            />

            <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center mx-auto block transform transition duration-500 ease-in-out hover:scale-105"
                onClick={openModalProjectAffect}
            >
                Affecter un salarié à ce projet
            </button>
            <ProjectAffect
                modalIsOpen={modalIsOpenProjectAffect}
                openModal={openModalProjectAffect}
                closeModal={closeModalProjectAffect}
                projectId={id}
            />
        </div>
    )
}