# ProjeqSter

Application web de gestion de projets et de tâches, pour une PME, développée avec React et Next.js.
Nous pouvons créer un utilisateur et se connecter avec ses identifiants. L'utilisateur peut créer un projet, ajouter des tâches à ce projet, et affecter des salariés à ces projets. Les salariés peuvent se connecter et voir les projets qui leur sont affectées.
L'application est accessible [ici](https://projeq-ster.vercel.app) en version d'essai.

## Prérequis

- git (facultatif)
- Node.js (npm)
- MySQL (XAMPP)

## Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/dijxt/projeqSter.git
```

ou téléchargez le zip [ici](https://github.com/dijxt/projeqSter/archive/refs/heads/main.zip) et décompressez-le.

2. Installez les dépendances du projet :

Si vous n'avez pas installé Node.js, vous pouvez le faire [ici](https://nodejs.org/en/download/). Veuillez installer la version LTS la plus récente.

```bash
cd projeqSter
npm install
```

3. Installez XAMPP :

- [XAMPP](https://www.apachefriends.org/fr/download.html)

4. Créez une base de données MySQL pour le projet :

Lancez Apache et MySQL dans XAMPP, puis ouvrez phpMyAdmin dans votre navigateur à l'[adresse](http://localhost/phpmyadmin/).
Exécutez ce script SQL pour créer la base de données :

```sql
CREATE DATABASE projeqster_db;
```

5. Exécutez ce script SQL pour créer les tables nécessaires :

```sql
USE projeqster_db;
CREATE TABLE SALARIE(
    id_salarie INT AUTO_INCREMENT,
    nom_salarie TEXT,
    mot_de_passe TEXT,
    CONSTRAINT PK_SALARIE PRIMARY KEY(id_salarie),
    CONSTRAINT U_SALARIE UNIQUE(nom_salarie)
);

CREATE TABLE PROJET(
    id_projet INT AUTO_INCREMENT,
    nom_projet TEXT,
    description TEXT,
    chef_de_projet INT,
    CONSTRAINT PK_PROJET PRIMARY KEY(id_projet),
    CONSTRAINT FK_PROJET_SALARIE FOREIGN KEY (chef_de_projet) REFERENCES SALARIE(id_salarie)
);

CREATE TABLE TYPE_TACHE(
    id_type_tache INT,
    libelle_type_tache TEXT,
    CONSTRAINT PK_TYPE_TACHE PRIMARY KEY(id_type_tache)
);

INSERT INTO TYPE_TACHE VALUES(1, 'technique');
INSERT INTO TYPE_TACHE VALUES(2, 'fonctionnalité');

CREATE TABLE EFFORT(
    id_effort INT,
    libelle_effort INT,
    CONSTRAINT PK_EFFORT PRIMARY KEY(id_effort)
);

INSERT INTO EFFORT VALUES(1, 1);
INSERT INTO EFFORT VALUES(2, 2);
INSERT INTO EFFORT VALUES(3, 3);
INSERT INTO EFFORT VALUES(4, 5);
INSERT INTO EFFORT VALUES(5, 8);
INSERT INTO EFFORT VALUES(6, 13);

CREATE TABLE ETAT(
    id_etat INT,
    libelle_etat TEXT,
    CONSTRAINT PK_ETAT PRIMARY KEY(id_etat)
);

INSERT INTO ETAT VALUES(1, 'à faire');
INSERT INTO ETAT VALUES(2, 'en cours');
INSERT INTO ETAT VALUES(3, 'terminée');

CREATE TABLE TACHE(
    id_tache INT AUTO_INCREMENT,
    id_projet INT,
    titre TEXT,
    description TEXT,
    type_tache INT,
    effort INT,
    etat INT,
    CONSTRAINT PK_TACHE PRIMARY KEY(id_tache),
    CONSTRAINT FK_TACHE_TYPE_TACHE FOREIGN KEY (type_tache) REFERENCES TYPE_TACHE(id_type_tache),
    CONSTRAINT FK_TACHE_PROJET FOREIGN KEY (id_projet) REFERENCES PROJET(id_projet),
    CONSTRAINT FK_TACHE_EFFORT FOREIGN KEY (effort) REFERENCES EFFORT(id_effort),
    CONSTRAINT FK_TACHE_ETAT FOREIGN KEY (etat) REFERENCES ETAT(id_etat)
);

CREATE TABLE DROIT(
    id_droit INT,
    libelle_droit TEXT,
    CONSTRAINT PK_DROIT PRIMARY KEY(id_droit)
);

INSERT INTO DROIT VALUES(1, 'lecture seule');
INSERT INTO DROIT VALUES(2, 'lecture/écriture');

CREATE TABLE AFFECTATION(
    id_projet INT,
    id_salarie INT,
    droit INT,
    CONSTRAINT PK_AFFECTATION PRIMARY KEY(id_projet, id_salarie),
    CONSTRAINT FK_AFFECTATION_PROJET FOREIGN KEY (id_projet) REFERENCES PROJET(id_projet),
    CONSTRAINT FK_AFFECTATION_SALARIE FOREIGN KEY (id_salarie) REFERENCES SALARIE(id_salarie),
    CONSTRAINT FK_AFFECTATION_DROIT FOREIGN KEY (droit) REFERENCES DROIT(id_droit)
);

```

6. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement nécessaires. Par exemple :

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=projeqster_db

API_HOST=http://localhost:3000
NEXT_PUBLIC_API_HOST=${API_HOST}
```

## Démarrage du serveur de développement

Exécutez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## Déploiement de l'application

Pour la production, exécutez :

```bash
npm run build
npm run start
```
