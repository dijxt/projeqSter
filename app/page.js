'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import fetchUser from "@/lib/fetchUser";

export default function Home() {
  const router = useRouter();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser();
      setUserId(user.id_salarie);
      
      // faire une pause de 2 secondes
      await new Promise(r => setTimeout(r, 2000));
  
      if (userId) {
        router.push('/projects');
      } else {
        router.push('/account/signin');
      }
    }

    fetchData();

  }, []);

  return null;
}