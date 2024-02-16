import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
export default async function fetchUsers() {
    const link = process.env.NEXT_PUBLIC_API_HOST + "/api/compte/lister";
    const response = await axios.get(link);
    return response.data.salaries;
}