# Tutoriel Next.js et MySQL sur cPanel

Petit gestionnaire de tâches réalisé pour les tutoriels d’ODOIP TELECOM.

1. Copier `.env.example` vers `.env.local` et renseigner la base MySQL.
2. En local : `npm install`, puis `npm run dev`.
3. Sur cPanel : créer l’application dans « Setup Node.js App » (fichier de démarrage `server.js`), puis déployer avec « Git Version Control ».

Le fichier `.env.local` ne doit jamais être envoyé sur Git.
