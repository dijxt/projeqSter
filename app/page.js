'use client';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const id_salarie = Cookies.get('id_salarie');

    if (id_salarie) {
      router.push('/projects');
    } else {
      router.push('/account/signin');
    }
  }, []);

  return null;
}