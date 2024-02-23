'use client';
import React, { useEffect, useState } from 'react';
import fetchProject from "@/lib/fetchProject";
import dotenv from "dotenv";
import { notFound } from "next/navigation";
import TaskColumn from "@/components/TaskColumn";

dotenv.config();



export default function ProjectPage({ params: { id }}) {
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const found = await fetchProject(parseInt(id));
            console.log(found);
            if (!found) notFound();
            setProject(found);

            // fetch tasks
            const todo = [];
            const inProgress = [];
            const done = [];
        };

        fetchData();
    }, [id]);

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{project.nom_projet}</h1>
            <p>{project.description}</p>
            <div className="task-board">
                <TaskColumn status="À faire" tasks={project.tasks} />
                <TaskColumn status="En cours" tasks={project.tasks} />
                <TaskColumn status="Terminé" tasks={project.tasks} />
            </div>
        </div>
    )
}