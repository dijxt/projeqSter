'use client';
import React, { useState } from 'react';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();
const ProjectCreationPage = () => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const projectData = {
      nom_projet: projectName,
      description: projectDescription
    };

    const router = useRouter();

    try {
      
      const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/api/projet/creer', projectData);
      
      if (response.data.status === 'ok') {
        
        console.log('Projet créé avec succès !');
        
      } else {
        
        console.error('Erreur lors de la création du projet:', response.data.message);
      }
    } catch (error) {
      
      console.error('Erreur lors de la requête:', error);
    }
  };

  return (
    <div>
      <h1>Création d'un projet</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nom_projet">Nom du projet:</label>
        <input
          type="text"
          id="nom_projet"
          value={projectName}
          onChange={handleProjectNameChange}
        />

        <label htmlFor="description">Description du projet:</label>
        <textarea
          id="description"
          value={projectDescription}
          onChange={handleProjectDescriptionChange}
        ></textarea>

        <input type="submit" value="Créer" />
      </form>
    </div>
  );
};

export default ProjectCreationPage;
