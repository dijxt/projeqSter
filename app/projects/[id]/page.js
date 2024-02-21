'use client';
import fetchProject from "@/lib/fetchProject";
import dotenv from "dotenv";
import { notFound } from "next/navigation";

dotenv.config();

export default function ProjetPage({ params: { id }}) {
    const found = fetchProject(parseInt(id));
    console.log(found);
    if (!found) notFound();

    const project = found;

    return (
        <div>
            <h1>{project.nom_projet}</h1>
            <p>{project.description}</p>
        </div>
    )
}