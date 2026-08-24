# Deploy naar Vercel (met wachtwoordbeveiliging)

Deze site is een statische Vite-build met een **Edge Middleware** die alles
achter een wachtwoord zet (HTTP Basic Auth). Werkt gratis op het Vercel
Hobby-plan — je hoeft geen betaald Pro-plan te nemen voor de bekende
"Password Protection".

## Eenmalig: deployen

1. Installeer de Vercel CLI (indien nog niet):
   ```bash
   npm i -g vercel
   ```
2. Log in (opent je browser):
   ```bash
   vercel login
   ```
3. Vanuit deze projectmap, deploy:
   ```bash
   vercel
   ```
   Vercel detecteert Vite automatisch (build: `npm run build`, output: `dist`).
   Volg de prompts (nieuw project → enter voor de defaults).

4. Productie-deploy (de deelbare link):
   ```bash
   vercel --prod
   ```

## Het wachtwoord instellen

- **Standaard wachtwoord:** `lumen-preview` (staat als fallback in `middleware.ts`).
- **Eigen wachtwoord (aanbevolen):** zet een env var in Vercel:
  ```bash
  vercel env add SITE_PASSWORD
  ```
  Kies "Production" (en evt. Preview), typ je wachtwoord, en deploy opnieuw
  met `vercel --prod`. Of doe het via het Vercel-dashboard:
  **Project → Settings → Environment Variables → `SITE_PASSWORD`**.

## Delen

Deel gewoon de productie-URL. Wie hem opent krijgt een inlogprompt:
- **Gebruikersnaam:** maakt niet uit (laat leeg of typ iets)
- **Wachtwoord:** wat je hierboven hebt ingesteld

## Let op — assets zijn zwaar

De hero-video is ~53 MB en enkele afbeeldingen zijn 1–4 MB. Voor een vlotte
laadtijd (en binnen Vercel's limieten) is het aan te raden om vóór productie:
- de hero-video te comprimeren naar ~3–5 MB (bv. H.264 1080p) of naar WebM;
- de PNG's te comprimeren of naar WebP/AVIF om te zetten.
