'use client';
import React, { useEffect, useState } from 'react';
import Projects from '@/components/Projet'; 
import dotenv from "dotenv";
import axios from 'axios'; 


dotenv.config();

export default function ProjectList() {

    const [projectsData, setProjectsData] = useState([]);
    const link = process.env.API_HOST + "/api/projet/lister";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(link);
                const data = response.data.projets;
                console.log(response.data.projets);
                setProjectsData(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }
        fetchData();
    }, []);
    

    return (
        <Projects data={projectsData} />
    );
}
