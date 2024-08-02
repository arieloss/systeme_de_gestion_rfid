```markdown
# Système de Gestion RFID

Ce projet est un système de gestion de cartes RFID utilisant FastAPI pour le backend, une base de données SQLite pour le stockage des données, et Tailwind CSS pour le style de l'interface utilisateur.

## Installation

1. Clonez ce dépôt :

```bash
git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo
```

2. Créez un environnement virtuel et activez-le :

Sur Windows :
```bash
python -m venv venv
venv\Scripts\activate
```

Sur macOS/Linux :
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Installez les dépendances :

```bash
pip install -r requirements.txt
```

## Utilisation

1. Démarrez le serveur FastAPI avec Uvicorn :

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Cette commande permet de démarrer le serveur en écoutant sur toutes les interfaces réseau (`0.0.0.0`), ce qui rend le serveur accessible à partir de n'importe quel appareil sur le même réseau local.

2. Trouvez l'adresse IP locale de votre ordinateur :

Sur Windows, ouvrez une invite de commande et tapez :

```bash
ipconfig
```

Cherchez l'adresse IPv4 de l'adaptateur réseau connecté.

Sur macOS ou Linux, ouvrez un terminal et tapez :

```bash
ifconfig
```

Cherchez l'adresse IP associée à l'interface réseau connectée (souvent `eth0` ou `wlan0`).

3. Accédez à l'application à partir de votre appareil Android :

Ouvrez un navigateur sur votre appareil Android et entrez l'adresse IP locale de votre ordinateur suivie du port, par exemple :

```
http://192.168.1.10:8000
```

Remplacez `192.168.1.10` par l'adresse IP locale de votre ordinateur.

## Exemple de Structure du Projet

```
votre-repo/
│
├── main.py                # Point d'entrée de l'application FastAPI
├── templates/
│   └── index.html         # Page HTML principale
├── static/
│   ├── styles.css         # Fichier CSS pour le style
│   └── script.js          # Script JavaScript pour la logique frontend
├── rfid_data.db           # Base de données SQLite
├── README.md              # Ce fichier
└── requirements.txt       # Liste des dépendances Python
```

## Fonctionnalités

- **Ajout de cartes RFID** : Ajoutez de nouvelles cartes RFID avec des informations supplémentaires via un formulaire.
- **Recherche de cartes RFID** : Recherchez des cartes RFID par ID et affichez leurs informations.
- **Liste des cartes RFID** : Affichez une liste de toutes les cartes RFID enregistrées dans la base de données.

## Dépendances

- [FastAPI](https://fastapi.tiangolo.com/)
- [Uvicorn](https://www.uvicorn.org/)
- [SQLite](https://www.sqlite.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
```

Ce fichier `README.md` contient toutes les informations nécessaires pour installer, utiliser, et comprendre la structure de votre projet.
