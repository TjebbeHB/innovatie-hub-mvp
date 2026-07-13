# Innovatie Hub — MVP

Werkende MVP van de **Innovatie Hub**, gebaseerd op het Figma-prototype van Gwenn (Digicampus). Eén plek om trends, technologieën en innovatiebudget-projecten binnen de digitale overheid te vinden, delen en volgen — van maatschappelijke trend tot concreet project.

**Live demo:** https://tjebbehb.github.io/innovatie-hub-mvp/ — log in met willekeurige invoer (demo-login).

## Drie sporen

1. **Trends** — maatschappelijke en technologische trends, ingedeeld volgens de Trendroos uit de **Rijksbrede Trendverkenning** (15 sub-domeinen, 7 clusters). Per trend: wie heeft 'm op de radar, waarom, met welk resultaat, relevantie per sector en tijdspad. Organisaties kunnen zichzelf op de radar zetten en resultaten delen, zodat ze elkaar vinden en niet dubbel onderzoeken.
2. **Technologieën** — opkomende technologieën met volwassenheid (TRL), wie ze onderzoekt (exploraties met bronvermelding) en het **kompas**: welke houding elke organisatie inneemt (wel doen / nog niet / samen doen met / doorgaan op resultaten van). Overgenomen uit de [Exploratie Hub](https://github.com/jeroen-sparkone/exploratie-hub) van Digicampus.
3. **Projecten** — **alle 127 projecten die zijn uitgevoerd met het Innovatiebudget Digitale Overheid** (2019–2026), overgenomen van [digitaleoverheid.nl](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/innovatie/innovatiebudget/overzicht-innovatieprojecten/).

De sporen zijn gekoppeld: trend → technologieën → projecten.

## Wat zit erin

- **Login & onboarding** — demo-login (elke invoer werkt), interesses kiezen (Trendroos-domeinen)
- **Home** — Trendroos-wiel (trends per domein, met filters op tijdspad/sector) + cirkeldiagram van alle projecten per NDS-thema; aanbevelingen op basis van interesses
- **Trends** — zoeken/filteren op domein, tijdspad en sector; detail met sectorrelevantie, radar per organisatie, gedeelde resultaten en "zet op onze radar"
- **Technologieën** — zoeken/filteren/sorteren (o.a. op TRL); detail met kompas-overzicht en exploraties per organisatie incl. bron
- **Projecten** — alle 127 projecten met zoeken, filteren (thema, organisatie, fase, status, jaar, type organisatie), sorteren en raster-/lijstweergave; detailpagina's met tabs en link naar de bronpagina
- **Mijn projecten** — eigen projecten per status, nieuw project aanmaken (met live "vergelijkbare projecten")
- **Netwerk** — projectteams zoeken op organisatie of thema
- **Mijn account** — profiel en interesses beheren

Alles draait client-side (HTML/CSS/JavaScript, geen frameworks of build-stap). Eigen invoer (projecten, radar-vermeldingen, interesses) wordt lokaal in de browser bewaard (localStorage).

## Herkomst van de data

### Projecten ([`js/data.js`](js/data.js))

Op 03-07-2026 overgenomen van digitaleoverheid.nl.

**Rechtstreeks uit de bron, per project:**

| Veld | Betekenis |
|---|---|
| `title`, `kort`, `beschrijving` | titel, samenvatting en projectbeschrijving |
| `org` | regievoerder |
| `partners` | partnerorganisaties (letterlijke tekst uit de bron) |
| `typeOrganisatie` | Gemeente, Provincie, Rijksoverheid, Uitvoeringsorganisatie, Waterschap, … |
| `jaar` | jaar van toekenning innovatiebudget (2019–2026) |
| `plaats` | plaats van de regievoerder (waar gepubliceerd) |
| `bron` | URL van de projectpagina op digitaleoverheid.nl |

**Redactioneel afgeleid** (niet in de bron gepubliceerd, toegewezen op basis van de projectbeschrijving):

- `theme` — NDS-thema (Data, AI, Cloud, Digitale weerbaarheid, Digitaal vakmanschap, Burgergericht)
- `labels` — trefwoorden voor zoeken en aanbevelingen
- `status` — aanname: toekenningsjaar t/m 2024 = "Afgerond", 2025/2026 = "Lopend"
- `fase` — afgeleid uit trefwoorden in de beschrijving (pilot, proof of concept, opschalen, …)
- `gdi` — GDI-bouwblokken die letterlijk in de beschrijving voorkomen
- `context`, `probleem`, `doel`, `lessen` — redactionele duiding voor ambtenaren, gebaseerd op de projectbeschrijving en online broncontext
- aanvullende `files` — projectpagina, overzichtspagina, innovatiebudgetpagina en relevante contextbronnen

**Niet beschikbaar als letterlijk apart bronveld**: probleem- en doelstelling, geleerde lessen, start- en einddatum en persoonlijke contactgegevens. Probleem, doel en lessen zijn daarom redactioneel verrijkt; start- en einddatum blijven leeg wanneer die niet gepubliceerd zijn. Contact loopt via de bronpagina; het "Netwerk" toont generieke projectteams per regievoerder (geen persoonsgegevens).

### Trends & technologieën ([`js/trends-data.js`](js/trends-data.js))

- **Technologieën & exploraties** — representatief samengesteld op basis van openbare, gesourcede vindplaatsen (overgenomen uit de Exploratie Hub; per exploratie staat de bron-URL erbij).
- **Trends** — redactioneel samengesteld langs de Trendroos-domeinen; de radar-vermeldingen (wie heeft welke trend op de radar) zijn indicatief afgeleid uit de exploraties en projecten.

Geen build-stap: data aanpassen = bestand bewerken en pagina herladen.

## Lokaal draaien

```bash
npx http-server -p 8000        # of: python3 -m http.server 8000
# → http://localhost:8000
```

## Hosting

Volledig statisch:

- **GitHub Pages** — elke push naar `main` deployt automatisch
- **Hostnet** — de bestanden (index.html, css/, js/) via FTP/DirectAdmin naar een subdomein uploaden

## Structuur

```
index.html         — app-schil
css/style.css      — styling (Rijksoverheid-stijl, IBM Plex Sans)
js/data.js         — 127 innovatiebudget-projecten + projectteams
js/trends-data.js  — Trendroos-domeinen, trends, technologieën & exploraties
js/app.js          — applicatielogica (routing, views, filters, wiel & grafiek)
```
