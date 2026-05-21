# RecrutPlus

Plateforme web de recrutement en ligne (CFI-CIRAS) — Next.js 15.

## Développement local

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000

## Déploiement Vercel

Le code Next.js est à la **racine** du dépôt (`package.json`, `src/`, `next.config.ts`).

### Root Directory (réglage obligatoire)

Dans **Vercel → Project Settings → General → Root Directory** :

| Réglage | Résultat |
|--------|----------|
| **Vide** (recommandé) | Déploiement normal depuis la racine |
| **`recrutPlus`** | Pont automatique via `scripts/vercel-build-from-subdir.js` |

Dans **Build & Development Settings**, supprimez toute commande personnalisée du type `cd recrutPlus && …` — `vercel.json` gère déjà l’installation et le build.

Après modification : **Deployments → Redeploy** (cochez *Clear build cache*).

**Node.js** : 20.x à 24.x (voir `.nvmrc` : 22)
