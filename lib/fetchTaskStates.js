import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function fetchTaskStates() {
    const link = `${process.env.NEXT_PUBLIC_API_HOST}/api/tache/attributs/etat`;
    const response = await axios.get(link);
    return response.data;
}