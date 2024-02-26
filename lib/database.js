import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion : ', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});


