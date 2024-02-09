import mysql from 'mysql';
import dotenv from 'dotenv';
import { serialize } from 'cookie';

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

    connection.query('SELECT * FROM SALARIE WHERE nom_salarie = ? AND mot_de_passe = ?', [nom_salarie, mot_de_passe], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        if (results.length > 0) {
          const cookie = serialize('id_salarie', String(results[0].id_salarie), {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 3600, // 1 heure
            path: '/',
          });
          res.setHeader('Set-Cookie', cookie);
          res.status(200).json({ status: 'ok', message: 'Connexion réussie' });
        } else {
          res.status(401).json({ status: 'error', message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }
      }
    });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}