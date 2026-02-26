# MangaInsight - Frontend

Frontend Angular/React pour l'application MangaInsight, qui consomme l'API NestJS du backend.

## Installation

```bash
npm install
```

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du dossier frontend :

```
REACT_APP_API_URL=http://localhost:8000
```

Ou si vous utilisez Angular, modifiez `src/environments/environment.ts` :

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
};
```

## Démarrage

Assurez-vous que le backend NestJS est en cours d'exécution sur le port 8000 :

```bash
# Dans le dossier backend-nest
npm run start
```

Puis lancez le frontend :

```bash
# Dans le dossier frontend
npm start
```

L'application sera disponible sur `http://localhost:4200` (Angular) ou `http://localhost:3000` (React).

## Communication avec le backend

Le frontend utilise l'API du serveur NestJS pour :

- Récupérer les données d'anime depuis MyAnimeList
- Consulter le cache local des animés
- Effectuer des recherches et filtres

Tous les appels API sont pointés sur `http://localhost:8000` (ou la valeur définie dans `.env`).

## Développement

```bash
npm run dev      # Mode développement avec hot-reload
npm run build    # Build de production
npm run test     # Lancer les tests
```

## Notes

- Le backend doit être configuré avec votre clé MyAnimeList (`MAL_CLIENT_ID` dans le `.env` du backend)
- CORS est activé sur le backend pour permettre les requêtes du frontend
- En production, mettez à jour `apiUrl` dans `environment.prod.ts` pour pointer sur votre serveur déployé
