# RecrutPlus

Plateforme web de recrutement en ligne (CFI-CIRAS) — Next.js 15.

## Développement local

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000

## Déploiement Vercel

Le projet Next.js est à la **racine du dépôt** (`package.json`, `next.config.ts`, `src/`).

Dans Vercel → **Project Settings → General → Root Directory**, laissez le champ **vide** (ou `.`).

Ne pas utiliser `recrutPlus` ni `recrut-plus` comme Root Directory.

**Node.js** : 20.x à 24.x (voir `.nvmrc` : 22)
