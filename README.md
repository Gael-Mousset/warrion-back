# Warrion — API Backend

API REST du projet **Coffre-Fort Garanties**, construite avec NestJS et MongoDB.

## Stack technique

- NestJS 11 + TypeScript
- MongoDB + Mongoose
- class-validator (validation des DTOs)

## Prérequis

- Node.js 18+
- MongoDB en local sur `mongodb://localhost:27017`

## Démarrage

```bash
npm install
npm run start:dev
```

L'API tourne sur [http://localhost:3000](http://localhost:3000)

## Structure

```
src/
├── users/
│   ├── dto/            # CreateUserDTO
│   ├── interfaces/     # User (Document Mongoose)
│   ├── schemas/        # UserSchema
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.providers.ts
│   └── users.module.ts
├── warranties/
│   ├── dto/            # CreateWarrantyDTO
│   ├── interfaces/     # Warranty (Document Mongoose)
│   ├── schemas/        # WarrantySchema (ref → User)
│   ├── warranties.controller.ts
│   ├── warranties.service.ts
│   ├── warranties.providers.ts
│   └── warranties.module.ts
├── data/
│   ├── database.module.ts
│   └── database.providers.ts   # Connexion MongoDB
├── app.module.ts
└── main.ts
```

## Endpoints

### Users — `/users`

| Méthode | Route | Description |
|--------|-------|-------------|
| `GET` | `/users` | Lister tous les utilisateurs |
| `GET` | `/users/:id` | Récupérer un utilisateur |
| `POST` | `/users` | Créer un utilisateur |

**Body POST /users**
```json
{
  "email": "marie@coffre.fr",
  "name": "Marie Demo",
  "password": "demo123"
}
```

### Warranties — `/warranties`

| Méthode | Route | Description |
|--------|-------|-------------|
| `GET` | `/warranties` | Lister toutes les garanties (avec user populé) |
| `GET` | `/warranties/user/:userId` | Garanties d'un utilisateur |
| `GET` | `/warranties/:id` | Détail d'une garantie |
| `POST` | `/warranties` | Créer une garantie |
| `DELETE` | `/warranties/:id` | Supprimer une garantie |

**Body POST /warranties**
```json
{
  "userId": "<_id MongoDB du user>",
  "name": "iPhone 15 Pro",
  "category": "electronique",
  "purchaseDate": "2024-03-01",
  "warrantyDurationMonths": 24,
  "photoUrl": "https://...",
  "notes": "AppleCare+ inclus"
}
```

## Scripts

```bash
npm run start:dev    # Développement (hot reload)
npm run start:prod   # Production
npm run test         # Tests unitaires
npm run test:e2e     # Tests end-to-end
```
