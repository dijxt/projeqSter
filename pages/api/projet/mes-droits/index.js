import { connection } from '@/lib/database';
import { parse } from 'cookie';

export default function handler(req, res) {
    if (req.method === 'GET') {

        const cookies = parse(req.headers.cookie || '');
        const salarie = cookies.id_salarie;
        const { id_projet } = req.query;

        connection.query('SELECT chef_de_projet FROM PROJET WHERE id_projet = ? AND chef_de_projet = ?', [id_projet, salarie], (error, results) => {
            if (error) {
                res.status(500).json({ status: 'error', message: 'Internal Server Error' });
            } else if (results.length > 0) {
                res.status(200).json(3);
            } else {
                connection.query('SELECT droit FROM AFFECTATION WHERE id_salarie = ? AND id_projet = ?', [salarie, id_projet], (error, results) => {
                    if (error) {
                        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
                    } else if (results.length === 0) {
                        res.status(404).json({ status: 'error', message: 'No rights found for this employee on this project' });
                    } else {
                        res.status(200).json(parseInt(results[0].droit));
                    }
                });
            }
        });
    } else {
        res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }
}