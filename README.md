# RecrutPlus

Plateforme web d'automatisation des recrutements en ligne (CFI-CIRAS).

## Développement local

```bash
cd recrutPlus
npm install
npm run dev
```

## Déploiement Vercel

Le dépôt Git contient le projet Next.js dans le dossier **`recrutPlus/`** (pas à la racine).

### Option A — Recommandée (paramètres projet)

Dans **Vercel → Project Settings → General → Root Directory**, définir :

```
recrutPlus
```

Puis redéployer. Aucune commande personnalisée n'est nécessaire.

### Option B — Racine du dépôt

Un fichier `vercel.json` à la racine du dépôt redirige déjà les commandes vers `recrutPlus/`.

### Node.js

- Version supportée : **20.x à 24.x** (`.nvmrc` : 22)
- Vercel utilise par défaut Node 24 depuis fin 2025 ; le script `prebuild` l'accepte.
