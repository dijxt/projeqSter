import UserForm from '@/components/UserForm';
import dotenv from "dotenv";

dotenv.config();
export default function SignUpPage() {
    const link = process.env.API_HOST + "/api/compte/creer"
    return (
        <UserForm type="Inscription" link={link} />
    )
}