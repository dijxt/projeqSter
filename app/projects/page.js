'use client';
import Project from '@/components/Project';
import dotenv from "dotenv";
import fetchProjects from "@/lib/fetchProjects";
import {useEffect, useState} from "react";
import fetchUsers from "@/lib/fetchUsers";
import Modal from "react-modal";

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
    

    const projects = [
        {
          id: 1,
          title: 'Projet 1',
          href: '#',
          description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
          date: 'Mercredi 21 février 2024',
          author: {
            name: 'Chef de projet',
          },
        },
        {
            id: 2,
            title: 'Projet 2',
            href: '#',
            description:
              'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
            date: 'Mercredi 21 février 2024',
            author: {
              name: 'Chef de projet',
            },
          },
          {
            id: 3,
          title: 'Projet 3',
          href: '#',
          description:
            'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
          date: 'Mercredi 21 février 2024',
          author: {
            name: 'Chef de projet',
            },
          },
      ]
    
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center">Les projets</h1>
            {projectsData.length > 0 ? (
                 <div className="py-24 sm:py-32">
                 <div className="mx-auto max-w-7xl px-6 lg:px-8">
                     <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                         
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
    className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center mx-auto block transform transition duration-500 ease-in-out hover:scale-105"
    onClick={openModal}
>
    New Project
</button>

            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {projects.map((project) => (
                            <article key={project.id} className="flex max-w-xl flex-col items-start justify-between border border-gray-300 p-4 rounded-lg">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time dateTime={project.datetime} className="text-gray-500">
                                        {project.date}
                                    </time>
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={project.href}>
                                            <span className="absolute inset-0" />
                                            {project.title}
                                        </a>
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{project.description}</p>
                                </div>
                                <div className="relative mt-8 flex items-center gap-x-4">
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            <span className="absolute inset-0" />
                                            {project.author.name}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
               
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="New Project"
        style={{
            content: {
                width: '50%',
                height: '50%',
                margin: 'auto',
            },
        }}
    >
        <h2 className="text-2xl font-bold mb-4">Nouveau Projet</h2>
        <form>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div>
                    <label htmlFor="project-title" className="block text-sm font-medium leading-6 text-gray-900">
                        Titre du projet
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="project-title"
                            id="project-title"
                            autoComplete="off"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="project-description" className="block text-sm font-medium leading-6 text-gray-900">
                        Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            name="project-description"
                            id="project-description"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Créer le projet
            </button>
        </form>
    </Modal>
            
            </div>
        </div>
    );
}