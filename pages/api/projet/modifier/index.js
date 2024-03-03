import { connection } from '@/lib/database';
import { parse } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { id_projet, nom_projet, description } = req.body;

        const cookies = parse(req.headers.cookie || '');
        const id_salarie_request = cookies.id_salarie;

        if (!id_salarie_request) {
            res.status(401).json({ status: 'error', message: 'Non autorisé' });
            return;
        }

        connection.query('UPDATE PROJET SET nom_projet = ?, description = ? WHERE id_projet = ? AND chef_de_projet = ?', [nom_projet, description, id_projet, id_salarie_request], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'error', error });
            } else {
                res.status(200).json({ status: 'ok', message: 'Mise à jour réussie' });
            }
        });
    } else {
        res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }
}