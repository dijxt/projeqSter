import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nom_salarie, mot_de_passe } = req.body;

    connection.query('INSERT INTO SALARIE (nom_salarie, mot_de_passe) VALUES (?, ?)', [nom_salarie, mot_de_passe], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        res.status(200).json({ status: 'ok', results });
      }
    });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}