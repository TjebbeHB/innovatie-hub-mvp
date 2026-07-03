# Innovatie Hub — MVP (echte projectdata)

Werkende MVP van de **Innovatie Hub**, gebaseerd op het Figma-prototype van Gwenn (Digicampus). Eén plek om innovatiebudget-projecten binnen de digitale overheid te vinden, delen en volgen.

Deze branch (`echte-projectdata`) bevat **alle 127 projecten die zijn uitgevoerd met het Innovatiebudget Digitale Overheid** (2019–2026), overgenomen van [digitaleoverheid.nl](https://www.digitaleoverheid.nl/overzicht-van-alle-onderwerpen/innovatie/innovatiebudget/overzicht-innovatieprojecten/).

## Wat zit erin

- **Login & onboarding** — demo-login (elke invoer werkt), interesses kiezen
- **Home** — cirkeldiagram van alle projecten per NDS-thema, met filters op organisatie, projectfase en projectstatus; aanbevelingen op basis van interesses
- **Innovaties** — alle 127 projecten met zoeken, filteren (thema, organisatie, fase, status, jaar, type organisatie), sorteren en raster-/lijstweergave
- **Projectdetail** — tabs: projectinformatie, probleem- & doelstelling, geleerde lessen, contact, bibliotheek (met link naar de bronpagina), soortgelijke projecten
- **Mijn projecten** — eigen projecten per status, nieuw project aanmaken (met live "vergelijkbare projecten")
- **Netwerk** — projectteams zoeken op organisatie of thema
- **Mijn account** — profiel en interesses beheren

Alles draait client-side (HTML/CSS/JavaScript, geen frameworks of build-stap). Aangemaakte projecten en interesses worden lokaal in de browser bewaard (localStorage).

## Herkomst van de data

De data in [`js/data.js`](js/data.js) is op 03-07-2026 overgenomen van digitaleoverheid.nl.

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

**Niet beschikbaar in de bron** (leeg gelaten, met nette fallback in de app): probleem- en doelstelling als aparte velden, geleerde lessen, start- en einddatum, persoonlijke contactgegevens. Contact loopt via de bronpagina; het "Netwerk" toont generieke projectteams per regievoerder (geen persoonsgegevens).

## Lokaal draaien

Open `index.html` in een browser, of start een simpele webserver:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Hosting

De site is volledig statisch en werkt overal:

- **GitHub Pages** — repo pushen, Pages aanzetten, klaar
- **Hostnet** — de bestanden (index.html, css/, js/) via FTP/DirectAdmin naar een subdomein uploaden

## Structuur

```
index.html      — app-schil
css/style.css   — styling (Rijksoverheid-stijl, IBM Plex Sans)
js/data.js      — ALLE data (127 innovatiebudget-projecten + projectteams)
js/app.js       — applicatielogica (routing, views, filters, grafiek)
```
