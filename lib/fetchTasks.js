import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export default async function fetchProject(id_projet) {
    const link = process.env.NEXT_PUBLIC_API_HOST + "/api/projet/lister";
    const response = await axios.get(link, {withCredentials: true});
    const project = response.data.projets.find(project => project.id_projet === id_projet);
    console.log(project);
    return project;
}