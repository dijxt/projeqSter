import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

export default function handler(req, res) {
    if (req.method === 'GET') {
        connection.query('SELECT * FROM ETAT', (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'error', error });
            } else {
                res.status(200).json(results);
            }
        });
    } else {
        res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }
}