// ProjectCreate.js
'use client';
import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

export default function ProjectCreate ({ modalIsOpen, closeModal })
{
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleProjectNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleProjectDescriptionChange = (e) => {
    setProjectDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que le titre et la description ne sont pas vides
    if (!projectName || !projectDescription) {
      alert("Le titre et la description ne peuvent pas être vides.");
      return;
    }

    const projectData = {
      nom_projet: projectName,
      description: projectDescription
    };


    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/api/projet/creer', projectData);

      if (response.data.status === 'ok') {

        setSuccessMessage('Projet crée avec succès !');

      } else {
        setErrorMessage('Erreur lors de la création du projet');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la création du projet');
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
        <form onSubmit={handleSubmit}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium leading-6 text-gray-900">
                Titre du projet
              </label>
              <div className="mt-2">
                <input
                    type="text"
                    name="projectName"
                    id="projectName"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleProjectNameChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="projectDescription" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
              <textarea
                  name="projectDescription"
                  id="projectDescription"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleProjectDescriptionChange}
              />
              </div>
            </div>
          </div>
          <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Créer le projet
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


