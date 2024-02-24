// ProjectAffect.js
'use client';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import fetchUsers from '@/lib/fetchUsers';
import fetchRights from '@/lib/fetchRights';

export default function ProjectAffect({ modalIsOpen, openModal, closeModal, projectId }) {
    const [users, setUsers] = useState([]);
    const [rights, setRights] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRightId, setSelectedRightId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchProjectAffectData = async () => {
            const fetchedUsers = await fetchUsers();
            const fetchedRights = await fetchRights();

            setUsers(fetchedUsers);
            setRights(fetchedRights);

            setSelectedRightId(fetchedRights[0].id_droit);
            setSelectedUserId(fetchedUsers[0].id_salarie);
        };



        fetchProjectAffectData();
    }, []);

    const handleUserChange = (e) => {
        setSelectedUserId(e.target.value);
    };

    const handleRightChange = (e) => {
        setSelectedRightId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const affectationData = {
            id_projet: projectId,
            id_salarie: selectedUserId,
            droit: selectedRightId
        };

        // Vérifier que l'utilisateur et les droits sont sélectionnés
        if (!selectedUserId || !selectedRightId) {
            alert("Veuillez sélectionner un utilisateur et des droits.");
            return;
        }

        try {
            const response = await axios.post(process.env.NEXT_PUBLIC_API_HOST + '/api/projet/affecter', affectationData);

            if (response.data.status === 'ok') {
                // Afficher un message de succès
                setSuccessMessage('Utilisateur affecté au projet avec succès !');
                // Fermer le modal après un délai
                setTimeout(() => {
                    location.reload();
                    closeModal();
                }, 3000);
            } else {
                console.error('Erreur lors de l\'affectation de l\'utilisateur au projet:', response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Project Affect"
            style={{
                content: {
                    width: '50%',
                    height: '50%',
                    margin: 'auto',
                },
            }}
        >
            <h2 className="text-2xl font-bold mb-4">Affecter un utilisateur au projet</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                    <div>
                        <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                            Utilisateur
                        </label>
                        <select
                            id="user"
                            name="user"
                            className="mt-2 block w-full py-1.5 pl-2 pr-8 border-0 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleUserChange}

                        >
                            {users.map(user => (
                                <option key={user.id_salarie} value={user.id_salarie}>
                                    {user.nom_salarie}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="right" className="block text-sm font-medium leading-6 text-gray-900">
                            Droits
                        </label>
                        <select
                            id="right"
                            name="right"
                            className="mt-2 block w-full py-1.5 pl-2 pr-8 border-0 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleRightChange}

                        >
                            {rights.map(right => (
                                <option key={right.id_droit} value={right.id_droit}>
                                    {right.libelle_droit}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Affecter
                </button>
                {successMessage && (
                    <p className="mt-2 text-green-600">{successMessage}</p>
                )}
            </form>
        </Modal>
    );
}
