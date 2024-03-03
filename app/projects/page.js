'use client';
import Project from '@/components/Project';
import dotenv from "dotenv";
import fetchProjects from "@/lib/fetchProjects";
import {useEffect, useState} from "react";
import fetchUsers from "@/lib/fetchUsers";
import ProjectCreate from "@/components/ProjectCreate";

dotenv.config();

export default function ProjectList() {
    const [projectsData, setProjectsData] = useState([]);
    const [users, setUsers] = useState([]);

    async function fetchData() {
        const users = await fetchUsers();
        setUsers(users);

        const projects = await fetchProjects();
        setProjectsData([...projectsData, ...projects]);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
        }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="Fond min-h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ 
            backgroundImage: "url('/assets/fond_ecran2.jpg')",
        }}>
            <div className="p-2 bg-gray-100 min-h-screen bg-opacity-90">
                <h1 className="text-4xl font-bold text-center mt-5 mb-3">Les projets</h1>
                {projectsData.length > 0 ? (
                    <div className="py-2 sm:py-10">
                        <div className="mx-auto max-w-7xl px-3 lg:px-8">
                            <div className="mx-auto mt-1 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-2 sm:mt-5 sm:pt-5 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {projectsData.map(project => (
                                    <Project key={project.id} project={project} users={users} />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-black-500 text-center">Vous n'avez aucun projet</p>
                )}
        
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center mx-auto block transform transition duration-500 ease-in-out hover:scale-105"
                    onClick={openModal}
                >
                    Nouveau projet
                </button>
                <ProjectCreate
                    modalIsOpen={modalIsOpen}
                    openModal={openModal}
                    closeModal={closeModal}
                />
            </div>
        </div>
        
        
    );
}