'use client';
import UserForm from '@/components/UserForm';
import dotenv from "dotenv";
import {useRouter} from "next/navigation";

dotenv.config();
export default function SignUpPage() {
  const link = process.env.NEXT_PUBLIC_API_HOST + "/api/compte/connexion";
  const router = useRouter();
  return (
      <UserForm type="Connexion" link={link} router={router} />
  )
}