import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function fetchProjects() {
    const link = process.env.NEXT_PUBLIC_API_HOST + "/api/projet/lister";
    const response = await axios.get(link, {withCredentials: true});
    return response.data.projets;
}