import { connection } from '@/lib/database';
import { parse } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id_projet, titre, description, type_tache, effort, etat } = req.body;

    const cookies = parse(req.headers.cookie || '');
    const id_salarie = cookies.id_salarie;

    if (!id_salarie) {
      res.status(401).json({ status: 'error', message: 'Non autorisé' });
      return;
    }

    connection.query('SELECT chef_de_projet FROM PROJET WHERE id_projet = ? AND chef_de_projet = ?', [id_projet, id_salarie], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        if (results.length > 0) {
          connection.query('INSERT INTO TACHE (id_projet, titre, description, type_tache, effort, etat) VALUES (?, ?, ?, ?, ?, ?)', [id_projet, titre, description, type_tache, effort, etat], (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({ status: 'error', error });
            } else {
              res.status(200).json({ status: 'ok', message: 'Tâche créée avec succès' });
            }
          });
        } else {
          connection.query('SELECT droit FROM AFFECTATION WHERE id_projet = ? AND id_salarie = ? AND droit = 2', [id_projet, id_salarie], (error, results) => {
            if (error) {
              console.log(error);
              res.status(500).json({ status: 'error', error });
            } else {
              if (results.length > 0) {
                connection.query('INSERT INTO TACHE (id_projet, titre, description, type_tache, effort, etat) VALUES (?, ?, ?, ?, ?, ?)', [id_projet, titre, description, type_tache, effort, etat], (error, results) => {
                  if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error', error });
                  } else {
                    res.status(200).json({ status: 'ok', message: 'Tâche créée avec succès' });
                  }
                });
              } else {
                res.status(403).json({ status: 'error', message: 'Seul le chef de projet ou les salariés ayant les droits en lecture écriture peuvent créer une tâche' });
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