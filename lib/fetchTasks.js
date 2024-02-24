import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function fetchTasks(id_projet) {
    const link = `${process.env.NEXT_PUBLIC_API_HOST}/api/tache/lister?id_projet=${id_projet}`;
    const response = await axios.get(link);
    return response.data.tasks;
}