'use client';
import Project from '@/components/Project';
import dotenv from "dotenv";
import fetchProjects from "@/lib/fetchProjects";
import {useEffect, useState} from "react";
import fetchUsers from "@/lib/fetchUsers";

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

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-10 text-center">Projects</h1>
            {projectsData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {projectsData.map(project => (
                        <Project key={project.id} project={project} users={users} />
                    ))}
                </div>
            ) : (
                <p className="text-black-500 text-center">Vous n'avez aucun projet</p>
            )}
        </div>
    );
}
