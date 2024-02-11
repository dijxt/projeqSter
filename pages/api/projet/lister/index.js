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
  if (req.method === 'GET') {
    const cookies = parse(req.headers.cookie || '');
    const id_salarie = cookies.id_salarie;

    if (!id_salarie) {
      res.status(401).json({ status: 'error', message: 'Non autorisé' });
      return;
    }

    connection.query('SELECT * FROM PROJET WHERE chef_de_projet = ? OR id_projet IN (SELECT id_projet FROM AFFECTATION WHERE id_salarie = ?)', [id_salarie, id_salarie], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        res.status(200).json({ status: 'ok', projets: results });
      }
    });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}