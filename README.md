# Innovatie Hub — MVP

Werkende MVP van de **Innovatie Hub**, gebaseerd op het Figma-prototype van Gwenn (Digicampus). Eén plek om innovatiebudget-projecten binnen de digitale overheid te vinden, delen en volgen.

## Wat zit erin

- **Login & onboarding** — demo-login (elke invoer werkt), interesses kiezen
- **Home** — cirkeldiagram van alle projecten per NDS-thema, met filters op organisatie, projectfase en projectstatus; aanbevelingen op basis van interesses
- **Innovaties** — alle 48 projecten met zoeken, filteren, sorteren en raster-/lijstweergave
- **Projectdetail** — tabs: projectinformatie, probleem- & doelstelling, geleerde lessen, contactpersoon, bibliotheek, soortgelijke projecten
- **Mijn projecten** — eigen projecten per status, nieuw project aanmaken (met live "vergelijkbare projecten")
- **Netwerk** — personen zoeken op naam, organisatie, rol of expertise
- **Mijn account** — profiel en interesses beheren

Alles draait client-side (HTML/CSS/JavaScript, geen frameworks of build-stap). Aangemaakte projecten en interesses worden lokaal in de browser bewaard (localStorage).

## ⚠️ Voorbeelddata

Alle projecten, personen, e-mailadressen en telefoonnummers zijn **fictief**. De echte data van de innovatiebudget-projecten komt in [`js/data.js`](js/data.js):

1. Open `js/data.js`
2. Vervang de items in `PROJECTS` (structuur staat bovenaan het bestand gedocumenteerd)
3. Vervang de personen in `PEOPLE` en koppel ze via `contactId`
4. Klaar — geen build-stap nodig, herlaad de pagina

## Lokaal draaien

Open `index.html` in een browser, of start een simpele webserver:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Hosting

De site is volledig statisch en werkt overal:

- **GitHub Pages** — repo pushen, Pages aanzetten op de `main` branch, klaar
- **Hostnet** — de bestanden (index.html, css/, js/) via FTP/DirectAdmin naar een subdomein uploaden

## Structuur

```
index.html      — app-schil
css/style.css   — styling (Rijksoverheid-stijl, IBM Plex Sans)
js/data.js      — ALLE data (projecten, personen, thema's) → hier echte data invullen
js/app.js       — applicatielogica (routing, views, filters, grafiek)
```
