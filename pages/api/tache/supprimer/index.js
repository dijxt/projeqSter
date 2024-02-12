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
  if (req.method === 'DELETE') {
    const { id_tache } = req.body;

    const cookies = parse(req.headers.cookie || '');
    const id_salarie_request = cookies.id_salarie;

    if (!id_salarie_request) {
      res.status(401).json({ status: 'error', message: 'Non autorisé' });
      return;
    }

    connection.query('SELECT chef_de_projet FROM PROJET WHERE id_projet = (SELECT id_projet FROM TACHE WHERE id_tache = ?)', [id_tache], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        if (results.length > 0 && results[0].chef_de_projet == id_salarie_request) {
          connection.query('DELETE FROM TACHE WHERE id_tache = ?', [id_tache], (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({ status: 'error', error });
            } else {
              res.status(200).json({ status: 'ok', message: 'Suppression réussie' });
            }
          });
        } else {
          connection.query('SELECT droit FROM AFFECTATION WHERE id_projet = (SELECT id_projet FROM TACHE WHERE id_tache = ?) AND id_salarie = ?', [id_tache, id_salarie_request], (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({ status: 'error', error });
            } else {
              if (results.length > 0 && results[0].droit == 2) {
                connection.query('DELETE FROM TACHE WHERE id_tache = ?', [id_tache], (error, results) => {
                  if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error', error });
                  } else {
                    res.status(200).json({ status: 'ok', message: 'Suppression réussie' });
                  }
                });
              } else {
                res.status(403).json({ status: 'error', message: 'Seul le chef de projet ou les salariés avec les droits 2 peuvent supprimer le ticket' });
              }
            }
          });
        }
      }
    });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}