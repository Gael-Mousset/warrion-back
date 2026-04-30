# Connexion Google — OAuth 2.0

La connexion Google utilise **OAuth 2.0** via **Passport.js** intégré à NestJS.

---

## Flux d'authentification

```
Utilisateur
    │
    ▼
GET /auth/google
    │  NestJS redirige vers Google
    ▼
Google Consent Screen
    │  L'utilisateur accepte
    ▼
GET /auth/google/callback?code=...
    │  NestJS échange le code contre un profil Google
    ▼
findOrCreateFromGoogle()
    │  Cherche ou crée l'user en base MongoDB
    ▼
Retourne l'user (+ JWT plus tard)
```

---

## Installation

```bash
npm install @nestjs/passport passport passport-google-oauth20
npm install -D @types/passport-google-oauth20
```

---

## Fichiers à créer

### 1. Google Strategy — `src/auth/google.strategy.ts`

```ts
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // profile contient : email, displayName, photos
    return await this.usersService.findOrCreateFromGoogle(profile);
  }
}
```

---

### 2. Routes — `src/auth/auth.controller.ts`

```ts
// Redirige vers Google
@Get('google')
@UseGuards(AuthGuard('google'))
googleLogin() {}

// Callback après acceptation Google
@Get('google/callback')
@UseGuards(AuthGuard('google'))
googleCallback(@Request() req) {
  return req.user; // user retourné par validate()
}
```

---

### 3. Méthode service — `src/users/users.service.ts`

```ts
async findOrCreateFromGoogle(profile: any): Promise<User> {
  const email = profile.emails[0].value;

  const existing = await this.findByEmail(email);
  if (existing) return existing;

  return await new this.userModel({
    email,
    name: profile.displayName,
    password: '', // pas de mot de passe pour les comptes Google
  }).save();
}
```

---

## Prérequis — Google Cloud Console

| Étape | Action |
|-------|--------|
| 1 | Aller sur [console.cloud.google.com](https://console.cloud.google.com) |
| 2 | Créer un projet → **APIs & Services** → **Credentials** |
| 3 | **Create Credentials** → **OAuth 2.0 Client ID** (type : Web application) |
| 4 | Ajouter `http://localhost:3000/auth/google/callback` dans **Authorized redirect URIs** |
| 5 | Copier le **Client ID** et **Client Secret** dans un fichier `.env` |

---

## Variables d'environnement — `.env`

```env
GOOGLE_CLIENT_ID=xxxxxxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxxxxxxxxxxxxx
```
