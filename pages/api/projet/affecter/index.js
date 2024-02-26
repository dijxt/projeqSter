import { connection } from '@/lib/database';
import { parse } from 'cookie';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id_projet, id_salarie, droit } = req.body;

    const cookies = parse(req.headers.cookie || '');
    const id_salarie_request = cookies.id_salarie;

    if (!id_salarie_request) {
      res.status(401).json({ status: 'error', message: 'Non autorisé' });
      return;
    }

    connection.query('SELECT chef_de_projet FROM PROJET WHERE id_projet = ?', [id_projet], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        if (results.length > 0 && results[0].chef_de_projet == id_salarie_request) {
          connection.query('INSERT INTO AFFECTATION (id_projet, id_salarie, droit) VALUES (?, ?, ?)', [id_projet, id_salarie, droit], (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({ status: 'error', error });
            } else {
              res.status(200).json({ status: 'ok', message: 'Affectation réussie' });
            }
          });
        } else {
          res.status(403).json({ status: 'error', message: 'Seul le chef de projet peut affecter un salarié' });
        }
      }
    });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}