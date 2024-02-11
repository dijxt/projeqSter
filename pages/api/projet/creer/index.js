import mysql from 'mysql';
import dotenv from 'dotenv';
import { parse } from 'cookie';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nom_projet, description } = req.body;

    const cookies = parse(req.headers.cookie || '');
    const chef_de_projet = cookies.id_salarie;

    if (!chef_de_projet) {
      res.status(401).json({ status: 'error', message: 'Non autorisé' });
      return;
    }

    connection.query('INSERT INTO PROJET (nom_projet, description, chef_de_projet) VALUES (?, ?, ?)', [nom_projet, description, chef_de_projet], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        res.status(200).json({ status: 'ok', message: 'Projet créé avec succès' });
      }
    });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}