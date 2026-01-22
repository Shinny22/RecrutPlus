# Recrut-Plus Front (CFI-Recrute)

Front-end Next.js pour la plateforme CFI-Recrute. L’objectif est de proposer un site vitrine avec parcours de candidature complet : découverte des offres, inscription/connexion et dépôt de dossier.

## Stack technique
- Next.js 15 (App Router), React 19
- Tailwind CSS v4 + utilitaires globaux (`globals.css`)
- Framer Motion pour les transitions
- Axios et `fetch` pour les appels API
- `react-hook-form` pour les formulaires dynamiques
- Icônes Lucide & Heroicons, Keen Slider pour les carrousels

## Architecture & organisation
```
src/
  app/
    page.tsx                 # Landing composée de sections marketing
    Offres/page.tsx          # Liste des campagnes + formulaire de candidature
    Consulter/page.tsx       # Vue tableau de bord/profil (WIP)
    components/              # Blocs réutilisables
    globals.css              # Design tokens Tailwind et classes utilitaires
    layout.tsx               # Layout racine + fonts
  lib/utils.ts               # Helpers génériques (ex: cn)
  components/ui/             # Primitives UI (button, card)
public/images                # Assets marketing et placeholders
```

### Logique clé par composant
- `NavBar.tsx`  
  - Stocke l’état utilisateur dans `localStorage` (`candidat`, `access`, `refresh`).  
  - Gère menus desktop/mobile, ouverture modales Login/Register et déconnexion (reset localStorage + redirect).
- `RegisterForm.tsx`  
  - Wizard en 4 étapes avec Framer Motion.  
  - Collecte données personnelles + uploads (`photo`, `diplome`).  
  - Envoi `FormData` vers `http://localhost:8000/register/`. Bloque le scroll et masque la nav pendant l’inscription.
- `ApplyForm.tsx`  
  - Formulaire multi-étapes `react-hook-form` pour postuler à une campagne.  
  - Envoi `FormData` vers `http://localhost:8000/postuler/`. Attache `cv`, diplômes et infos perso.
- `Offres/page.tsx`  
  - Récupère les campagnes via `http://127.0.0.1:8000/api/campagnes/`.  
  - Affiche les cartes d’offre, état (Ouvert/Fermé) et ouvre `ApplyForm` sur sélection.
- `SideBar.tsx`  
  - Navigation latérale pour l’espace candidat, souligne la route active (`usePathname`).
- `layout.tsx` / `globals.css`  
  - Charge les polices Geist, définit variables de thème, classes utilitaires (`nav-link`, `modal`, etc.).

## Parcours utilisateur
1) Visiteur arrive sur `/` (Hero, sections marketing, témoignages, CTA, contact).  
2) Navbar propose inscription/connexion modales.  
3) Page `/Offres` : fetch des campagnes, affichage et bouton “Postuler”.  
4) `ApplyForm` envoie le dossier avec fichiers (CV, diplôme).  
5) `RegisterForm` permet de créer un compte candidat avec upload photo/diplôme.  
6) Une fois connecté, la navbar montre Dashboard/Mes candidatures, menu profil et logout.

## API & données
- Endpoints utilisés en dur :
  - `POST http://localhost:8000/register/` (inscription)
  - `POST http://localhost:8000/postuler/` (dossier de candidature)
  - `GET  http://127.0.0.1:8000/api/campagnes/` (liste des campagnes)
- Tokens & profil sont conservés côté navigateur (`localStorage`), aucune gestion de refresh automatisée pour l’instant.

## Lancement du projet
```bash
cd recrut-plus
npm install
npm run dev
```
L’application tourne sur `http://localhost:3000` (Turbopack par défaut).  
Commande supplémentaire : `npm run lint`.

## Personnalisation / évolutions rapides
- Centraliser l’URL d’API dans une variable d’environnement (ex: `NEXT_PUBLIC_API_BASE`) puis l’utiliser dans `NavBar`, `RegisterForm`, `ApplyForm`, `Offres/page`.
- Ajouter une stratégie de gestion de session (refresh token, middleware `app/middleware.ts` déjà préparé/commenté).
- Sécuriser les validations côté client (`react-hook-form` + schémas) et messages d’erreur UI.
- Compléter l’espace candidat (`Consulter/page.tsx`, `CandidatDash`, `ProfilCard`, `ProfileForm`) en se basant sur les mêmes primitives UI.

## Design système
- Tailwind v4 + tokens définis dans `globals.css`.
- Classes utilitaires récurrentes : `input`, `nav-link`, `dropdown-item`, `mobile-link`, `modal`, `modal-box`.
- Composants UI bas niveau dans `src/components/ui` pour standardiser boutons et cartes.
