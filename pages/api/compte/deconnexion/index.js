import { serialize } from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const cookie = serialize('id_salarie', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 0,
        path: '/',
        });
        res.setHeader('Set-Cookie', cookie);
        res.status(200).json({ status: 'ok', message: 'Déconnexion réussie' });
    } else {
        res.status(405).json({ status: 'error', message: 'Method not allowed' });
    }
}