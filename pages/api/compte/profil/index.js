import { connection } from '@/lib/database';
import { parse } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'GET') {

    const cookies = parse(req.headers.cookie || '');
    const salarie = cookies.id_salarie;

    connection.query('SELECT id_salarie, nom_salarie FROM SALARIE WHERE id_salarie = ?', [salarie], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        if (results.length === 0) {
          res.status(200).json(0);
        }
        res.status(200).json(results[0]);
      }
    });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}