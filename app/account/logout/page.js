'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
      // Appel à votre API pour déconnecter l'utilisateur
      const logoutUser = async () => {
        await axios.post('/api/compte/deconnexion');
        router.push('/account/login'); 
      };
  
      logoutUser();
    }, [router]);
  
    return (
      <div>
        <p>Déconnexion en cours...</p>
      </div>
    );
}