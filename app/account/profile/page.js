 'use client';
import { useEffect, useState } from "react";
 import fetchUsers from "@/lib/fetchUser";


 export default function Profile() {
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const user = await fetchUsers();
            setUserId(user.id_salarie);
            setName(user.nom_salarie);
        };

        fetchData();
    }
    , []);

    return (
        <div className="h-screen min-h-screen bg-cover bg-center flex flex-col items-center justify-center" style={{ 
            backgroundImage: "url('/assets/fond_ecran3.jpg')",
        }}>
            <div className="border-2 border-gray-300 p-6 rounded-md shadow-lg bg-white">
                <h3 className="text-base font-semibold leading-7 text-gray-900 text-center mb-4">Mon Profil </h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 text-center mb-4">Informations personnelles</p>
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Identifiant</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userId} </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Nom</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{name}</dd>
                    </div>
                    
                </dl>
            </div>
        </div>
    )
 }