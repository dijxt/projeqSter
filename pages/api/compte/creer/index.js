import connection from '@/lib/database';

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