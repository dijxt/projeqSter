import {connection} from '@/lib/database';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nom_salarie, mot_de_passe } = req.body;

    connection.query('INSERT INTO SALARIE (nom_salarie, mot_de_passe) VALUES (?, ?)', [nom_salarie, mot_de_passe], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ status: 'error', error });
      } else {
        const cookie = serialize('id_salarie', String(results.insertId), {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 3600*10,
          path: '/',
        });
        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ status: 'ok', results });
      }
    });
  } else {
    res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }
}