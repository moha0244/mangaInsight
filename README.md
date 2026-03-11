# MangaInsight

Plateforme d'analyse et d'exploration de données animés/manga avec dashboard interactif.

## Aperçu du Projet

MangaInsight est une application web full-stack qui permet de :

- Récupérer et analyser les données d'animes depuis MyAnimeList
- Visualiser des statistiques et tendances via des dashboards interactifs
- Explorer et rechercher des animés avec filtres avancés
- Consulter un cache local pour des performances optimales

## Architecture Technique

### Backend (NestJS/TypeScript)

- **Framework** : NestJS avec TypeScript
- **Base de données** : PostgreSQL avec SQLModel (pas encore utilisé)
- **API** : RESTful avec validation Pydantic
- **Cache** : Fichier JSON local (`anime_cache.json`)
- **Scheduler** : Tâches planifiées toutes les 15 minutes
- **Authentification** : JWT tokens

### Frontend (Angular)

- **Framework** : Angular 21 avec TypeScript
- **UI** : Composants modernes avec ApexCharts pour les graphiques
- **Build Tool** : Angular CLI
- **Tests** : Vitest + jsdom

### Infrastructure

- **Containerisation** : Docker Compose
- **Reverse Proxy** : Traefik avec HTTPS automatique
- **Database Admin** : Adminer
- **Monitoring** : Health checks intégrés

## Prérequis

- Node.js 18+ et npm
- Docker et Docker Compose
- PostgreSQL (si exécution locale sans Docker)
- Clé API MyAnimeList (MAL_CLIENT_ID)

## Installation

### 1. Cloner le Repository

```bash
git clone <repository-url>
cd mangaInsight
```

### 2. Configuration des Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

````env
# MyAnimeList API
MAL_CLIENT_ID="votre_clé_api_mal"

**Génération des clés secrètes :**

```bash
# Pour SECRET_KEY
python -c "import secrets; print(secrets.token_urlsafe(32))"
````

### 3. Installation des Dépendances

```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

## 🏃‍♂️ Démarrage Rapide

### Option 1: Docker Compose (Recommandé)

```bash
# Démarrer tous les services
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

L'application sera accessible :

- **Frontend** : http://dashboard.votredomaine.com
- **API Backend** : http://api.votredomaine.com

### Option 2: Développement Local

#### Backend (NestJS)

```bash
cd backend
npm run start:dev
```

Le backend démarre sur `http://localhost:8000`

#### Frontend (Angular)

```bash
cd frontend
npm start
```

Le frontend démarre sur `http://localhost:4200`

### Option 3: Scripts NPM

Depuis la racine :

```bash
# Démarrer le frontend uniquement
npm run dev

# Linter
npm run lint

# Tests
npm run test
```

## 🔧 Utilisation

### 1. Première Connexion

1. Accédez au dashboard : `http://localhost:4200` (développement) ou `http://dashboard.votredomaine.com` (production)
2. Connectez-vous avec le compte superutilisateur :
   - Email : `admin@example.com` (ou votre FIRST_SUPERUSER)
   - Mot de passe : celui défini dans `FIRST_SUPERUSER_PASSWORD`

### 2. Exploration des Données

Le scheduler récupère automatiquement les données d'animes toutes les 15 minutes. Vous pouvez :

- **Dashboard Principal** : Vue d'ensemble des statistiques
- **Recherche** : Filtrer par titre, genre, score, etc.
- **Détails** : Informations complètes sur chaque anime
- **Analytics** : Graphiques et tendances

### 3. API Endpoints

L'API expose les endpoints principaux :

```bash
# Health check
GET /api/v1/utils/health-check/

# Liste des animes (avec pagination)
GET /api/animes?page=1&limit=20

# Recherche d'animes
GET /api/animes/search?q=naruto

# Statistiques
GET /api/animes/stats

# Détails d'un anime
GET /api/animes/{id}
```

## Développement

### Backend

```bash
cd backend

# Développement avec hot-reload
npm run start:dev

# Build pour production
npm run build

# Linter
npm run lint

# Tests
npm run test
```

Le backend NestJS expose une API RESTful sur le port 8000 avec :

- Authentification JWT
- Validation des données
- Cache local des données MyAnimeList
- Scheduler pour la récupération automatique

### Frontend

```bash
cd frontend

# Développement avec hot-reload
npm start

# Build pour production
npm run build

# Watch mode
npm run watch

# Tests
npm run test
```

Le frontend Angular offre :

- Dashboard responsive avec Material Design
- Graphiques interactifs (ApexCharts)
- Recherche et filtrage avancés
- Mode sombre/clair

## Docker & Production

### Configuration Production

1. **Domaine et SSL** :
   - Configurez `DOMAIN` dans votre `.env`
   - Traefik génère automatiquement des certificats SSL avec Let's Encrypt

2. **Services Docker** :

   ```bash
   # Démarrer tous les services
   docker-compose up -d

   # Vérifier l'état
   docker-compose ps

   # Logs d'un service
   docker-compose logs -f backend
   ```

3. **Mise à jour** :

   ```bash
   # Pull des nouvelles images
   docker-compose pull

   # Redémarrer avec les nouvelles images
   docker-compose up -d --force-recreate
   ```

### Services Disponibles

- **Frontend** : Dashboard Angular
- **Backend** : API NestJS
- **Database** : PostgreSQL
- **Adminer** : Interface de gestion BDD
- **Traefik** : Reverse proxy avec SSL

## Monitoring & Logs

### Health Checks

- Backend : `GET /api/v1/utils/health-check/`
- Database : Vérification automatique via Docker

### Logs

```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Sécurité

- **Authentification** : Tokens JWT avec expiration
- **CORS** : Configuration restrictive en production
- **Environment Variables** : Secrets non versionnés
- **HTTPS** : SSL/TLS automatique en production
- **Database** : Mot de passe fort et accès limité

## Dépannage

### Problèmes Communs

1. **Port déjà utilisé** :

   ```bash
   # Vérifier les ports
   netstat -tulpn | grep :8000

   # Tuer le processus
   kill -9 <PID>
   ```

2. **Problèmes de cache** :

   ```bash
   # Vider le cache backend
   rm backend/data/anime_cache.json

   # Redémarrer le backend
   docker-compose restart backend
   ```

3. **Database connection** :
   ```bash
   # Vérifier la connexion BDD
   docker-compose exec db psql -U $POSTGRES_USER -d $POSTGRES_DB
   ```

### Support

- **Documentation Backend** : [backend/README.md](./backend/README.md)
- **Documentation Frontend** : [frontend/README.md](./frontend/README.md)
- **Guide Déploiement** : [deployment.md](./deployment.md)
- **Développement** : [development.md](./development.md)

## Notes de Version

Consultez [release-notes.md](./release-notes.md) pour les dernières mises à jour et fonctionnalités.

## Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](./LICENSE) pour les détails.

---

**MangaInsight** - Votre plateforme d'analyse d'animes et manga 🎌✨
