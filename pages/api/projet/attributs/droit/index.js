import { connection } from '@/lib/database';


export default function handler(req, res) {
    if (req.method === 'GET') {
        connection.query('SELECT * FROM DROIT', (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'error', error });
            } else {
                res.status(200).json(results);
            }
        });
    } else {
        res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }
}