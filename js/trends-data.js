/* ============================================================
   Innovatie Hub — trends & technologieën
   ------------------------------------------------------------
   Dit bestand bevat het Trends- en Technologieën-spoor:

   - DOMAINS/CLUSTERS: de Trendroos uit de Rijksbrede
     Trendverkenning (mei 2026): 15 sub-domeinen in 7 clusters.
   - TECHNOLOGIEEN + EXPLORATIES: overgenomen uit de Exploratie
     Hub (github.com/jeroen-sparkone/exploratie-hub), gebaseerd
     op openbare, gesourcede vindplaatsen.
   - TRENDS: nieuw spoor — welke organisatie heeft welke trend
     op de radar/onderzocht, waarom, met welk resultaat; plus
     relevantie per sector en tijdspad. TRENDS-inhoud is
     REPRESENTATIEVE VOORBEELDDATA (redactioneel samengesteld),
     de radar-vermeldingen zijn indicatief.

   Koppelingen: TRENDS.technologieIds → TECHNOLOGIEEN.id,
   TRENDS.projectIds → PROJECTS.id (js/data.js).
   ============================================================ */

const DOMAINS = [
  "Demografie", "Gezondheid", "Geopolitiek", "Veiligheid", "Economie", "Arbeidsmarkt",
  "Technologie", "Kunstmatige intelligentie", "Kansengelijkheid", "Sociale cohesie",
  "Klimaat", "Energie", "Fysieke leefomgeving", "Rechtsstaat", "Democratie"
];

const DOMAIN_CLUSTERS = {
  "Demografie": "Demografie en gezondheid",
  "Gezondheid": "Demografie en gezondheid",
  "Geopolitiek": "Geopolitiek en veiligheid",
  "Veiligheid": "Geopolitiek en veiligheid",
  "Economie": "Economie en arbeidsmarkt",
  "Arbeidsmarkt": "Economie en arbeidsmarkt",
  "Technologie": "Technologie en kunstmatige intelligentie",
  "Kunstmatige intelligentie": "Technologie en kunstmatige intelligentie",
  "Kansengelijkheid": "Kansengelijkheid en sociale cohesie",
  "Sociale cohesie": "Kansengelijkheid en sociale cohesie",
  "Klimaat": "Klimaat, energie en fysieke leefomgeving",
  "Energie": "Klimaat, energie en fysieke leefomgeving",
  "Fysieke leefomgeving": "Klimaat, energie en fysieke leefomgeving",
  "Rechtsstaat": "Rechtsstaat en democratie",
  "Democratie": "Rechtsstaat en democratie"
};

const DOMAIN_COLORS = {
  "Demografie": "#1B3A6B", "Gezondheid": "#2978AD", "Geopolitiek": "#6FCF97",
  "Veiligheid": "#8A9A2A", "Economie": "#297D4E", "Arbeidsmarkt": "#1B5E3A",
  "Technologie": "#6B4226", "Kunstmatige intelligentie": "#F5C518",
  "Kansengelijkheid": "#F2A93B", "Sociale cohesie": "#E8730D", "Klimaat": "#D6412F",
  "Energie": "#F291B5", "Fysieke leefomgeving": "#C2186D", "Rechtsstaat": "#D6146E",
  "Democratie": "#3B1F6B"
};

/* Tekstkleur per domein voor voldoende contrast (WCAG AA) op DOMAIN_COLORS */
const DOMAIN_TEXT_COLORS = {
  "Demografie": "#fff", "Gezondheid": "#fff", "Geopolitiek": "#1a1f26",
  "Veiligheid": "#1a1f26", "Economie": "#fff", "Arbeidsmarkt": "#fff",
  "Technologie": "#fff", "Kunstmatige intelligentie": "#1a1f26",
  "Kansengelijkheid": "#1a1f26", "Sociale cohesie": "#1a1f26", "Klimaat": "#fff",
  "Energie": "#1a1f26", "Fysieke leefomgeving": "#fff", "Rechtsstaat": "#fff",
  "Democratie": "#fff"
};

/* Koppeling van de NDS-projectthema's (js/data.js) aan Trendroos-domeinen */
const THEME_TO_DOMAIN = {
  "AI": "Kunstmatige intelligentie",
  "Data": "Technologie",
  "Cloud": "Technologie",
  "Digitale weerbaarheid": "Veiligheid",
  "Digitaal vakmanschap": "Arbeidsmarkt",
  "Burgergericht": "Sociale cohesie"
};

/* Status van een exploratie (kleuren ≥4.5:1 op wit, WCAG AA) */
const EXPL_STATUS_COLORS = {
  "Onderzoekt": "#2F68C4",
  "Pilot": "#9F6607",
  "Opgeschaald": "#147638",
  "Gestopt": "#D73D3D",
  "Niet opgepakt": "#6D727A"
};

/* Kompas: houding van een organisatie t.o.v. een technologie */
const KOMPAS_LABELS = {
  wel: "Wel doen",
  nogniet: "Nog niet",
  pastniet: "Past niet bij ons",
  nietrelevant: "Niet relevant",
  samen: "Samen doen met",
  doorgaan: "Doorgaan op resultaten van"
};
const KOMPAS_COLORS = {
  wel: "#147638", nogniet: "#9F6607", pastniet: "#6D727A",
  nietrelevant: "#9CA3AF", samen: "#3730A3", doorgaan: "#7C3AED"
};
const KOMPAS_TEXT_COLORS = {
  wel: "#fff", nogniet: "#fff", pastniet: "#fff",
  nietrelevant: "#1a1f26", samen: "#fff", doorgaan: "#fff"
};

/* Radarpositie van een organisatie t.o.v. een trend */
const RADAR_POSITIES = ["Op de radar", "Onderzoekt", "Onderzocht", "Past toe"];
const RADAR_COLORS = {
  "Op de radar": "#6D727A",
  "Onderzoekt": "#2F68C4",
  "Onderzocht": "#147638",
  "Past toe": "#3730A3"
};

const TIJDSPAD_LABELS = ["Speelt nu", "2–5 jaar", "5–10 jaar"];
const TIJDSPAD_COLORS = { "Speelt nu": "#147638", "2–5 jaar": "#9F6607", "5–10 jaar": "#6D727A" };

const SECTOREN = ["Rijk", "Uitvoeringsorganisaties", "Gemeenten", "Provincies", "Waterschappen"];
const RELEVANTIE_COLORS = { "Hoog": "#147638", "Gemiddeld": "#9F6607", "Beperkt": "#6D727A" };

/* ============================================================
   TRENDS — nieuw spoor
   Structuur:
   {
     id, naam, domein (Trendroos-domein), tijdspad,
     beschrijving:      wat is de trend en waarom relevant
     sectorRelevantie:  { sector: "Hoog"|"Gemiddeld"|"Beperkt" }
     radar: [{ org, sector, positie, jaar, waarom, resultaat }]
              → resultaat gevuld = organisatie deelt resultaten
     technologieIds: [] → TECHNOLOGIEEN
     projectIds: []     → PROJECTS (js/data.js)
   }
   ============================================================ */

const TRENDS = [
  {
    id: "vergrijzing-dienstverlening",
    naam: "Vergrijzing verandert de vraag naar dienstverlening",
    domein: "Demografie", tijdspad: "Speelt nu",
    beschrijving: "Nederland telt in 2030 ruim een kwart 65-plussers. De vraag naar levensgebeurtenis-diensten (pensioen, zorg, overlijden) groeit, terwijl de beroepsbevolking — ook binnen de overheid — krimpt. Dienstverlening moet met minder mensen méér en persoonlijker leveren.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Beperkt", "Waterschappen": "Beperkt" },
    radar: [
      { org: "SVB", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2025", waarom: "Sterk stijgend AOW-volume met krimpend personeelsbestand; verkent proactieve dienstverlening rond pensionering.", resultaat: "" },
      { org: "ICTU", sector: "Uitvoeringsorganisaties", positie: "Onderzocht", jaar: "2025", waarom: "Nabestaanden verdrinken in overheidspost; verkende digitale ontzorging rond overlijden.", resultaat: "Innovatiebudget-project 'Een overheidsbericht voor nabestaanden': één begrijpelijk bericht in plaats van losse brieven per organisatie (zie gekoppeld project)." },
      { org: "Gemeente Rotterdam", sector: "Gemeenten", positie: "Op de radar", jaar: "2026", waarom: "Wijkgerichte vergrijzingscijfers vragen om herontwerp van het loketaanbod.", resultaat: "" }
    ],
    technologieIds: ["generatieve-ai-overheidsdienstverlening"],
    projectIds: ["een-overheidsbericht-voor-nabestaanden", "verbeteren-samenwerking-tussen-overheden-voor-familiaire-bewindvoerders", "gebruiksvriendelijk-vrijwillig-machtigen-van-familieleden-mantelzorgers-en-buddys"]
  },
  {
    id: "preventieve-gezondheidszorg-data",
    naam: "Zorg verschuift van behandelen naar voorkomen — met data",
    domein: "Gezondheid", tijdspad: "2–5 jaar",
    beschrijving: "Oplopende zorgkosten en personeelstekorten dwingen tot preventie. Dat vraagt om het verantwoord combineren van gezondheids- en omgevingsdata over organisatiegrenzen heen, zonder de privacy van burgers te schaden.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Gemiddeld", "Gemeenten": "Hoog", "Provincies": "Beperkt", "Waterschappen": "Beperkt" },
    radar: [
      { org: "Ministerie van VWS", sector: "Rijk", positie: "Onderzoekt", jaar: "2025", waarom: "Programma's rond databeschikbaarheid voor preventie en AI in de zorg.", resultaat: "" },
      { org: "TNO", sector: "Uitvoeringsorganisaties", positie: "Onderzocht", jaar: "2023", waarom: "Wilde aantonen dat voorspellende modellen mogelijk zijn zonder centralisatie van gezondheidsdata.", resultaat: "Federated diabetes-voorspelmodel presteert vrijwel gelijk aan centraal getraind model (Lifelines-cohort, 167.000 personen)." },
      { org: "Gemeente Utrecht", sector: "Gemeenten", positie: "Onderzoekt", jaar: "2026", waarom: "Wachttijden jeugdzorg alleen regionaal op te lossen met gedeelde data.", resultaat: "" }
    ],
    technologieIds: ["federated-learning-privacyvriendelijke-data-analyse"],
    projectIds: ["brede-welvaartscan", "van-arm-naar-beter", "huishoudboekje-en-virtueel-inkomstenloket"]
  },
  {
    id: "digitale-soevereiniteit",
    naam: "Digitale soevereiniteit wordt randvoorwaarde",
    domein: "Geopolitiek", tijdspad: "Speelt nu",
    beschrijving: "Geopolitieke spanningen maken afhankelijkheid van niet-Europese clouddiensten en software een strategisch risico. Overheden heroverwegen waar hun data en werklasten draaien en eisen aantoonbare exit-opties.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Gemiddeld", "Provincies": "Gemiddeld", "Waterschappen": "Gemiddeld" },
    radar: [
      { org: "SSC-ICT", sector: "Rijk", positie: "Past toe", jaar: "2025", waarom: "Gevoelige werklasten van het Rijk vragen infrastructuur onder Nederlandse jurisdictie.", resultaat: "Soevereine overheidscloud in implementatie; eerste rijksorganisaties draaien er gevoelige werklasten op." },
      { org: "Ministerie van BZK", sector: "Rijk", positie: "Onderzoekt", jaar: "2026", waarom: "Exit-bepalingen in cloudcontracten zijn nooit in de praktijk getest.", resultaat: "" },
      { org: "Gemeente Nijmegen", sector: "Gemeenten", positie: "Op de radar", jaar: "2026", waarom: "Herbeoordeling van cloudleveranciers bij contractverlenging.", resultaat: "" },
      { org: "UWV", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2025", waarom: "Verkent Europese AI-alternatieven (Mistral) naast Amerikaanse aanbieders.", resultaat: "" }
    ],
    technologieIds: [],
    projectIds: ["titaan", "opencatalogi", "open-source-mapping-assistant"]
  },
  {
    id: "quantumdreiging-cyberaanvallen",
    naam: "Quantumdreiging en professionalisering van cyberaanvallen",
    domein: "Veiligheid", tijdspad: "2–5 jaar",
    beschrijving: "Statelijke actoren onderscheppen nu al versleutelde data om die later met quantumcomputers te ontsleutelen ('harvest now, decrypt later'). Tegelijk professionaliseren ransomware-groepen. Migratie naar quantumveilige cryptografie en gedeelde detectie worden urgent.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Gemiddeld", "Waterschappen": "Gemiddeld" },
    radar: [
      { org: "AIVD", sector: "Rijk", positie: "Onderzocht", jaar: "2024", waarom: "Langdurig vertrouwelijke staatsinformatie is nu al doelwit.", resultaat: "Handboek quantumveilige cryptografie (2e editie, met CWI en TNO) plus adviestool PQChoiceAssistant — vrij beschikbaar voor alle organisaties." },
      { org: "NCSC", sector: "Rijk", positie: "Onderzocht", jaar: "2026", waarom: "CISO's hebben een concreet migratiestappenplan nodig.", resultaat: "Handreiking 'Maak je organisatie quantumveilig', samen met AIVD." },
      { org: "IBD", sector: "Gemeenten", positie: "Onderzoekt", jaar: "2025", waarom: "Gemeenten missen de schaal voor eigen 24/7-securitymonitoring.", resultaat: "" },
      { org: "Belastingdienst", sector: "Uitvoeringsorganisaties", positie: "Past toe", jaar: "2025", waarom: "Phishing blijft de grootste ingang; structureel weerbaarheidsprogramma.", resultaat: "Klikpercentage structureel onder de 5%; melden belonen werkt beter dan klikken bestraffen." }
    ],
    technologieIds: ["post-quantum-cryptografie"],
    projectIds: ["cyberweerbaar-maken-mkb", "zicht-op-ondermijning-ondermijningsradar", "datapro112"]
  },
  {
    id: "databeschikbaarheid-economie",
    naam: "Beleid vraagt om actuele, deelbare data",
    domein: "Economie", tijdspad: "Speelt nu",
    beschrijving: "Economische schokken vragen om snel, gericht beleid — en dus om actuele data die organisaties veilig kunnen delen. Kopieergedrag maakt plaats voor bevragen bij de bron; synthetische data maakt onderzoek mogelijk waar privacy dat eerder blokkeerde.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Gemiddeld", "Provincies": "Gemiddeld", "Waterschappen": "Beperkt" },
    radar: [
      { org: "CBS", sector: "Rijk", positie: "Onderzocht", jaar: "2023", waarom: "Microdata is te gevoelig om te delen; synthetische varianten kunnen dat gat vullen.", resultaat: "Proof of concept synthetisch Algemeen Bedrijvenregister: bruikbaar voor software-testen, disclosure-risico vergt vervolgonderzoek." },
      { org: "DUO", sector: "Uitvoeringsorganisaties", positie: "Past toe", jaar: "2023", waarom: "Onderzoeksverzoeken sneller afhandelen zonder persoonsgegevens te delen.", resultaat: "Synthetische onderwijsdata-producten in productie; verzoeken van onderzoekers worden aantoonbaar sneller afgehandeld." },
      { org: "Justid", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2023", waarom: "Geïnspireerd door DUO: synthetische data voor testen en ontwikkelen.", resultaat: "" }
    ],
    technologieIds: ["synthetic-data-beleidsonderzoek"],
    projectIds: ["data-spaces-voor-ruimtelijke-data", "bronconnect", "eenmalige-mutatieopsporing-meervoudig-gebruik", "kadaster-open-api-feature"]
  },
  {
    id: "personeelstekorten-slimmer-werken",
    naam: "Structurele personeelstekorten dwingen tot slimmer werken",
    domein: "Arbeidsmarkt", tijdspad: "Speelt nu",
    beschrijving: "De overheid concurreert op een krappe arbeidsmarkt en vergrijst sneller dan de markt. Repetitief werk automatiseren, kennis vastleggen en medewerkers digitaal vaardiger maken is geen efficiencywens meer maar continuïteitseis.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Gemiddeld", "Waterschappen": "Gemiddeld" },
    radar: [
      { org: "ICTU", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2025", waarom: "Transcriberen kost ambtenaren uren per week; veilige spraak-naar-tekst kan dat wegnemen.", resultaat: "" },
      { org: "Gemeente Rotterdam", sector: "Gemeenten", positie: "Onderzoekt", jaar: "2026", waarom: "Verkent per taak of AI-assistentie verantwoord en werkbaar is.", resultaat: "" },
      { org: "Nationale Politie", sector: "Rijk", positie: "Past toe", jaar: "2021", waarom: "Schaars opleidingspersoneel; VR maakt training schaalbaar en meetbaar.", resultaat: "360°-VR-training tegen etnisch profileren aantoonbaar effectiever dan 2D-variant (Universiteit Twente); vast onderdeel van het opleidingsaanbod." },
      { org: "Ministerie van BZK", sector: "Rijk", positie: "Past toe", jaar: "2025", waarom: "Digitale basiskennis is voorwaarde om digitale kansen en risico's te herkennen.", resultaat: "Rijksacademie voor Digitalisering: 10.000 afgeronde leerpaden per jaar." }
    ],
    technologieIds: ["extended-reality-training-simulatie", "generatieve-ai-overheidsdienstverlening"],
    projectIds: ["tina-betrouwbare-transcriptie-voor-publieke-organisaties", "leer-van-bezwaar", "anonimiseren-met-llm", "de-slimme-krabbelaar"]
  },
  {
    id: "software-ketens-afhankelijkheid",
    naam: "Alles wordt software — en ketens worden kwetsbaarder",
    domein: "Technologie", tijdspad: "Speelt nu",
    beschrijving: "Dienstverlening leunt op lange digitale ketens van API's, platforms en leveranciers. Eén zwakke schakel raakt de hele keten. Standaardisatie, hergebruik en inzicht in ketenafhankelijkheden worden bepalend voor betrouwbaarheid.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Gemiddeld", "Waterschappen": "Gemiddeld" },
    radar: [
      { org: "Logius", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2026", waarom: "Afnemers haken af op verschillende toegangsprocedures per API; uniformering versnelt datadeling.", resultaat: "" },
      { org: "Belastingdienst", sector: "Uitvoeringsorganisaties", positie: "Past toe", jaar: "2025", waarom: "Applicatieteams verloren te veel tijd aan infrastructuur.", resultaat: "Rijksbreed containerplatform met 200 applicaties; releases binnen een dag, compliance ingebouwd." },
      { org: "Kadaster", sector: "Uitvoeringsorganisaties", positie: "Onderzocht", jaar: "2020", waarom: "Sensoren in de openbare ruimte hebben een gedeeld register nodig.", resultaat: "SensRNet: gedistribueerd sensorenregister met o.a. VNG en vijf gemeenten, MVP opgeleverd." }
    ],
    technologieIds: ["blockchain-dlt-registers-identiteit", "sensornetwerken-iot-omgevingsmonitoring"],
    projectIds: ["doorontwikkeling-nl-design-system", "opencatalogi", "zgw-api-gebruiken-bij-data-migraties", "ketentestdorp"]
  },
  {
    id: "generatieve-ai-kenniswerk",
    naam: "Generatieve AI verandert kenniswerk in de overheid",
    domein: "Kunstmatige intelligentie", tijdspad: "Speelt nu",
    beschrijving: "Taalmodellen kunnen samenvatten, herschrijven en beantwoorden — de kern van veel beleids- en uitvoeringswerk. De vraag is niet óf maar hoe: veilig, uitlegbaar, met de mens in de lus, en zonder data naar ongecontroleerde diensten te laten weglekken.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Gemiddeld", "Waterschappen": "Gemiddeld" },
    radar: [
      { org: "Gemeente Amsterdam", sector: "Gemeenten", positie: "Onderzoekt", jaar: "2025", waarom: "Bezwaarafhandeling verzuipt in volume; AI-samenvattingen geven juristen tijd terug.", resultaat: "" },
      { org: "Gemeente Goes", sector: "Gemeenten", positie: "Past toe", jaar: "2024", waarom: "Chatbot beantwoordde vragen te vaak fout; generatieve AI verhoogt de trefkans.", resultaat: "Chatbot 'Guus': nauwkeurigheid van ~40% naar doelstelling ≥70%; data wordt na 30 dagen vernietigd." },
      { org: "Gemeente Eindhoven", sector: "Gemeenten", positie: "Onderzocht", jaar: "2025", waarom: "Medewerkers gebruikten openbare AI-diensten met persoonsgegevens.", resultaat: "Datalek gemeld bij AP; openbare AI-sites geblokkeerd, AI-gedragscode vastgesteld — belangrijke les voor iedere organisatie." },
      { org: "Belastingdienst", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2025", waarom: "Dialoogondersteuning kan BelastingTelefoon-medewerkers helpen.", resultaat: "" },
      { org: "I&W", sector: "Rijk", positie: "Onderzocht", jaar: "2026", waarom: "Consultaties leveren tienduizenden reacties op die handmatig niet te verwerken zijn.", resultaat: "ConsultationAI-pilot: doorlooptijd analyse −70% met behoud van herleidbaarheid; sentimentanalyse bleek onbetrouwbaar en is geschrapt." }
    ],
    technologieIds: ["generatieve-ai-overheidsdienstverlening"],
    projectIds: ["tina-betrouwbare-transcriptie-voor-publieke-organisaties", "wetgpt", "virtuele-assistent-gem", "leer-van-bezwaar", "keuzehulp-taalmodel-linnaeus"]
  },
  {
    id: "uitlegbare-algoritmen",
    naam: "Uitlegbaarheid wordt de norm voor algoritmen",
    domein: "Kansengelijkheid", tijdspad: "Speelt nu",
    beschrijving: "Na de toeslagenaffaire en met de AI-verordening is uitlegbaarheid geen nice-to-have meer: elk impactvol algoritme moet te verantwoorden zijn richting burger, toezichthouder en rechter. Registers, audits en ethische toetsing worden standaardpraktijk.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Gemiddeld", "Waterschappen": "Beperkt" },
    radar: [
      { org: "Belastingdienst", sector: "Uitvoeringsorganisaties", positie: "Past toe", jaar: "2023", waarom: "Verzuimalgoritmen moeten volledig uitlegbaar zijn.", resultaat: "Niet-zelflerende OBV-algoritmen gepubliceerd in het algoritmeregister; besluiten blijven bij medewerkers." },
      { org: "SVB", sector: "Uitvoeringsorganisaties", positie: "Onderzocht", jaar: "2025", waarom: "Voorspellend samenwoonmodel getoetst op verantwoord gebruik.", resultaat: "Model SWAN nooit in productie genomen en stopgezet — bewuste keuze, gedocumenteerd in het algoritmeregister." },
      { org: "Gemeente Utrecht", sector: "Gemeenten", positie: "Onderzocht", jaar: "2025", waarom: "Rekenkamer toetste de praktijk rond 45 impactvolle algoritmes.", resultaat: "Richtlijnen bleken niet consequent toegepast; alle aanbevelingen unaniem aangenomen door de raad." },
      { org: "Gemeente Den Haag", sector: "Gemeenten", positie: "Past toe", jaar: "2025", waarom: "Ethische toetsing structureel inbedden in dataprojecten.", resultaat: "Data-ethiek Tafels beproefd; deelname van inwoners leverde de waardevolste inzichten." }
    ],
    technologieIds: ["uitlegbare-ai-besluitondersteuning"],
    projectIds: ["ai-validatie", "transparantieapp", "calculemus-flint", "impact-met-ai"]
  },
  {
    id: "vertrouwen-transparantie",
    naam: "Dalend vertrouwen vraagt om radicale transparantie",
    domein: "Sociale cohesie", tijdspad: "Speelt nu",
    beschrijving: "Het vertrouwen in instituties staat onder druk. Overheden die laten zien wat ze doen, waarom en met welk geld — in begrijpelijke taal — bouwen aantoonbaar meer vertrouwen op. Openbaarheid verschuift van verplichting naar strategie.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Gemiddeld", "Gemeenten": "Hoog", "Provincies": "Gemiddeld", "Waterschappen": "Gemiddeld" },
    radar: [
      { org: "KOOP", sector: "Rijk", positie: "Past toe", jaar: "2025", waarom: "Woo-verplichtingen zijn handmatig niet bij te houden.", resultaat: "Publicatieplatform met geautomatiseerde anonimisering en metadatering; menselijke eindcontrole blijft nodig." },
      { org: "Gemeente Utrecht", sector: "Gemeenten", positie: "Op de radar", jaar: "2025", waarom: "Begroting is voor inwoners en raadsleden ondoorgrondelijk.", resultaat: "" },
      { org: "Gemeente Amsterdam", sector: "Gemeenten", positie: "Onderzocht", jaar: "2026", waarom: "Verouderde open data remde hergebruik.", resultaat: "Open Data Portaal 2.0: geautomatiseerde publicatie, 80% van de datasets maximaal een maand oud." }
    ],
    technologieIds: [],
    projectIds: ["woo-publicatie-voorziening", "federatieve-zoekvraag-voor-het-woo-platform", "open-poen", "nederland-begroot"]
  },
  {
    id: "klimaatadaptatie-omgevingsdata",
    naam: "Klimaatadaptatie vraagt om realtime omgevingsdata",
    domein: "Klimaat", tijdspad: "Speelt nu",
    beschrijving: "Hitte, droogte en wateroverlast worden frequenter. Sturen op klimaatadaptatie kan alleen met fijnmazige, actuele metingen van lucht, water en bodem — vaak samen met inwoners verzameld (citizen science).",
    sectorRelevantie: { "Rijk": "Gemiddeld", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Hoog", "Waterschappen": "Hoog" },
    radar: [
      { org: "RIVM", sector: "Rijk", positie: "Past toe", jaar: "2016", waarom: "Officiële meetnetten zijn te grofmazig voor lokaal beleid.", resultaat: "Samen Meten: ~4.000 sensoren, >7 miljard metingen, fijnstofsensoren in 9 van de 10 gemeenten." },
      { org: "Provincie Utrecht", sector: "Provincies", positie: "Past toe", jaar: "2018", waarom: "Mobiele metingen vullen vaste meetpunten aan.", resultaat: "Snuffelfiets: 550+ vrijwilligers, >20 miljoen metingen per jaar, data via open dashboards." },
      { org: "Provincie Zuid-Holland", sector: "Provincies", positie: "Past toe", jaar: "2019", waarom: "Burgerinitiatieven professionaliseren met provinciale ondersteuning.", resultaat: "Netwerk van lokale meetinitiatieven, voortbouwend op RIVM-methodiek." },
      { org: "Waterschap Limburg", sector: "Waterschappen", positie: "Past toe", jaar: "2021", waarom: "Extremer weer vraagt 24/7 zicht op het zuiveringssysteem.", resultaat: "Digital twin van 17 zuiveringen en 149 gemalen operationeel; storingen worden vroegtijdig gedetecteerd." }
    ],
    technologieIds: ["sensornetwerken-iot-omgevingsmonitoring", "digital-twins-infrastructuur-waterbeheer"],
    projectIds: ["voorspellen-veilig-zwemwater", "zwemwater-alert", "via-datagedreven-burger-wetenschap-naar-duurzame-mobiliteit-en-betere-luchtkwaliteit", "duinen-en-kwelders"]
  },
  {
    id: "netcongestie-energietransitie",
    naam: "Netcongestie remt bouwen en verduurzamen",
    domein: "Energie", tijdspad: "Speelt nu",
    beschrijving: "Het elektriciteitsnet zit op steeds meer plekken vol. Nieuwbouw, laadinfra en elektrificatie lopen vertraging op. Slim sturen op lokaal verbruik en opwek (smart grids, energiebudgetten per gebied) wordt onderdeel van ruimtelijk beleid.",
    sectorRelevantie: { "Rijk": "Gemiddeld", "Uitvoeringsorganisaties": "Beperkt", "Gemeenten": "Hoog", "Provincies": "Hoog", "Waterschappen": "Gemiddeld" },
    radar: [
      { org: "Gemeente Utrecht", sector: "Gemeenten", positie: "Past toe", jaar: "2025", waarom: "Laadinfrastructuur slim inzetten op momenten van zonne-overschot.", resultaat: "300e Smart Solar Charging-laadpaal; doel 1.000 laadpunten met 10.000 zonnepanelen." },
      { org: "Gemeente Arnhem", sector: "Gemeenten", positie: "Onderzoekt", jaar: "2025", waarom: "7.000 nieuwe woningen bouwen binnen een vast energiebudget (Buurtbudget-pilot met Alliander).", resultaat: "" },
      { org: "Gemeente Zwolle", sector: "Gemeenten", positie: "Onderzocht", jaar: "2016", waarom: "Testte flexibele tarieven en thuisbatterijen (JEM 2.0).", resultaat: "Financiële prikkel bleek onvoldoende motivator; batterij-inzet kon pieken ook verergeren — waardevolle negatieve les." }
    ],
    technologieIds: ["slimme-energienetten-smart-grids"],
    projectIds: ["energy-sharing-blockchain"]
  },
  {
    id: "ruimtelijke-puzzel-digitaal",
    naam: "De ruimtelijke puzzel wordt digitaal gelegd",
    domein: "Fysieke leefomgeving", tijdspad: "2–5 jaar",
    beschrijving: "Woningbouw, energie, natuur en water strijden om dezelfde vierkante meters. Digital twins en 3D-stadsmodellen maken effecten van keuzes vooraf zichtbaar — voor professionals én bewoners — en versnellen besluitvorming.",
    sectorRelevantie: { "Rijk": "Gemiddeld", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Hoog", "Waterschappen": "Hoog" },
    radar: [
      { org: "Rijkswaterstaat", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2021", waarom: "Roadmap: in 2030 alle assets als realtime digital twin.", resultaat: "" },
      { org: "Gemeente Amsterdam", sector: "Gemeenten", positie: "Onderzocht", jaar: "2022", waarom: "Samen met Utrecht één herbruikbaar 3D-model voor alle gemeenten.", resultaat: "Netherlands 3D open source opgeleverd; kosteloos herbruikbaar volgens Common Ground-principes." },
      { org: "Gemeente Rotterdam", sector: "Gemeenten", positie: "Past toe", jaar: "2025", waarom: "Digital twin als kern van het Open Urban Platform ('Citiverse').", resultaat: "Stedelijke systemen (mobiliteit, energie, water) werken geïntegreerd samen in plaats van als losse pilots." },
      { org: "Provincie Zeeland", sector: "Provincies", positie: "Onderzoekt", jaar: "2024", waarom: "Grensoverschrijdende ruimtelijke opgaven met Vlaamse partners.", resultaat: "" }
    ],
    technologieIds: ["digital-twins-infrastructuur-waterbeheer"],
    projectIds: ["digital-twins", "dynamic-digital-twin-voor-riolering", "gezonde-gebiedsontwikkeling-in-een-digital-twin", "innovatieve-algoritmes-voor-3d-modellen-in-de-3dbag"]
  },
  {
    id: "regulering-digitale-systemen",
    naam: "Regulering van digitale systemen stapelt zich op",
    domein: "Rechtsstaat", tijdspad: "Speelt nu",
    beschrijving: "AI-verordening, Woo, Digitoegankelijkheid, NIS2: de juridische lat voor digitale overheidssystemen gaat omhoog. Compliance wordt een ontwerpvraag — wie het pas achteraf regelt, bouwt technische en juridische schuld op.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Hoog", "Waterschappen": "Hoog" },
    radar: [
      { org: "Ministerie van J&V", sector: "Rijk", positie: "Onderzocht", jaar: "2019", waarom: "Juridische implicaties van blockchain voor registers verkend (WODC).", resultaat: "Conclusie: verantwoord blockchain-gebruik kan niet zonder het recht; ethisch en juridisch verantwoord ontwerp is noodzaak." },
      { org: "Justid", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2025", waarom: "Ketenbrede doorlooptijden zichtbaar maken binnen juridische kaders.", resultaat: "" },
      { org: "I&W", sector: "Rijk", positie: "Op de radar", jaar: "2026", waarom: "AI-verordening raakt lopende AI-toepassingen in beleid.", resultaat: "" }
    ],
    technologieIds: ["blockchain-dlt-registers-identiteit", "uitlegbare-ai-besluitondersteuning"],
    projectIds: ["calculemus-flint", "wetwijzer-bedrijven", "woo-publicatie-voorziening"]
  },
  {
    id: "digitale-participatie-desinformatie",
    naam: "Digitale participatie groeit — desinformatie ook",
    domein: "Democratie", tijdspad: "2–5 jaar",
    beschrijving: "Burgers verwachten digitaal mee te kunnen praten over plannen en budgetten. Tegelijk ondermijnt AI-gegenereerde desinformatie het publieke debat. Overheden moeten participatie opschalen én de informatiepositie van burgers beschermen.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Gemiddeld", "Gemeenten": "Hoog", "Provincies": "Gemiddeld", "Waterschappen": "Beperkt" },
    radar: [
      { org: "I&W", sector: "Rijk", positie: "Onderzocht", jaar: "2026", waarom: "Meer reacties per consultatie serieus verwerken zonder maandenlange doorlooptijd.", resultaat: "ConsultationAI: analyse 70% sneller; transparantie over AI-gebruik richting indieners bleek essentieel voor draagvlak." },
      { org: "Gemeente Den Haag", sector: "Gemeenten", positie: "Onderzoekt", jaar: "2025", waarom: "3D-simulaties maken participatie over gebiedsontwikkeling concreet.", resultaat: "" },
      { org: "Gemeente Utrecht", sector: "Gemeenten", positie: "Op de radar", jaar: "2025", waarom: "Begrotingsparticipatie via natuurlijke taal (Begrotingsbot, on hold).", resultaat: "" }
    ],
    technologieIds: ["generatieve-ai-overheidsdienstverlening"],
    projectIds: ["deliberatieve-digitale-democratie-in-nederland", "lokaal-digitaal-stemmen", "openstad", "nederland-begroot"]
  },
  {
    id: "arbeidsmigratie-inclusie",
    naam: "Diversere samenleving stelt hogere eisen aan inclusieve dienstverlening",
    domein: "Kansengelijkheid", tijdspad: "2–5 jaar",
    beschrijving: "Meertaligheid, wisselende digitale vaardigheden en 2,5 miljoen laaggeletterden: dienstverlening die alleen voor de digitaal vaardige meerderheid werkt, sluit groepen uit. Inclusief ontwerp en meertalige AI worden onderscheidend.",
    sectorRelevantie: { "Rijk": "Hoog", "Uitvoeringsorganisaties": "Hoog", "Gemeenten": "Hoog", "Provincies": "Beperkt", "Waterschappen": "Beperkt" },
    radar: [
      { org: "ICTU", sector: "Uitvoeringsorganisaties", positie: "Onderzoekt", jaar: "2025", waarom: "TINA ondersteunt naast Nederlands ook Fries en dialecten — taalinclusie bij de bron.", resultaat: "" },
      { org: "Logius", sector: "Uitvoeringsorganisaties", positie: "Past toe", jaar: "2025", waarom: "Toegankelijke componenten voor iedereen, één keer goed bouwen.", resultaat: "NL Design System: 50 organisaties gebruiken gedeelde, toegankelijke componenten in productie." },
      { org: "Gemeente Rotterdam", sector: "Gemeenten", positie: "Onderzocht", jaar: "2025", waarom: "Studenten zonder fysieke pas veilig hun status laten aantonen.", resultaat: "HalloStudent-wallet in pilot met 500 studenten; eenvoud voor winkeliers bleek de sleutel." }
    ],
    technologieIds: ["generatieve-ai-overheidsdienstverlening"],
    projectIds: ["toegankelijk-klantcontact", "freewheelen-de-toegankelijke-routeplanner", "digitale-toegankelijkheidscheck-voor-pdf-documenten", "wallet-studenten-caribisch-gebied"]
  }
];

/* ============================================================
   TECHNOLOGIEEN + EXPLORATIES
   Overgenomen uit de Exploratie Hub (gesourcede vindplaatsen)
   ============================================================ */

const TECHNOLOGIEEN = [
  {
    id: "generatieve-ai-overheidsdienstverlening",
    naam: "Generatieve AI in overheidsdienstverlening",
    domein: "Kunstmatige intelligentie",
    korteBeschrijving: "Inzet van large language models en chatbots (ChatGPT, Copilot, Mistral Le Chat) om overheidsdienstverlening en interne werkprocessen te ondersteunen, van bezwaarafhandeling tot burgerchatbots.",
    trl: 5,
    labels: ["chatbot", "large language models", "dienstverlening", "privacy"]
  },
  {
    id: "digital-twins-infrastructuur-waterbeheer",
    naam: "Digital twins voor infrastructuur en waterbeheer",
    domein: "Fysieke leefomgeving",
    korteBeschrijving: "Virtuele, continu bijgewerkte representaties van fysieke infrastructuur en watersystemen, gebruikt voor beheer, onderhoud en ruimtelijke besluitvorming.",
    trl: 6,
    labels: ["digital twin", "waterbeheer", "3D-model", "smart city"]
  },
  {
    id: "post-quantum-cryptografie",
    naam: "Post-quantum cryptografie",
    domein: "Veiligheid",
    korteBeschrijving: "Overstap naar cryptografische algoritmen die bestand zijn tegen aanvallen door toekomstige quantumcomputers, ter bescherming van langdurig vertrouwelijke overheidsinformatie.",
    trl: 4,
    labels: ["cryptografie", "quantumcomputer", "cybersecurity", "AIVD"]
  },
  {
    id: "federated-learning-privacyvriendelijke-data-analyse",
    naam: "Federated learning voor privacyvriendelijke data-analyse",
    domein: "Gezondheid",
    korteBeschrijving: "Machine learning-technieken waarbij modellen worden getraind op gedistribueerde data zonder dat ruwe, herleidbare gezondheidsgegevens de bronlocatie verlaten.",
    trl: 4,
    labels: ["federated learning", "privacy", "gezondheidsdata", "AVG"]
  },
  {
    id: "blockchain-dlt-registers-identiteit",
    naam: "Blockchain/DLT voor registers en identiteit",
    domein: "Rechtsstaat",
    korteBeschrijving: "Gebruik van blockchain en distributed ledger technology voor het beheren van publieke registers (zoals sensorenregisters en landregistratie) en voor digitale identiteitssystemen.",
    trl: 5,
    labels: ["blockchain", "DLT", "digitale identiteit", "register"]
  },
  {
    id: "synthetic-data-beleidsonderzoek",
    naam: "Synthetic data voor beleidsonderzoek",
    domein: "Economie",
    korteBeschrijving: "Kunstmatig gegenereerde datasets die statistische patronen van echte (persoons)data nabootsen, gebruikt om privacyvriendelijk onderzoek, software-testen en beleidsanalyse mogelijk te maken.",
    trl: 6,
    labels: ["synthetische data", "privacy", "microdata", "AVG"]
  },
  {
    id: "extended-reality-training-simulatie",
    naam: "Extended reality (VR/AR) voor training en simulatie",
    domein: "Arbeidsmarkt",
    korteBeschrijving: "Inzet van virtual reality en augmented reality om medewerkers in veiligheids- en handhavingsberoepen te trainen in scenario's die in de praktijk moeilijk, gevaarlijk of kostbaar zijn om te oefenen.",
    trl: 6,
    labels: ["virtual reality", "augmented reality", "training", "veiligheid"]
  },
  {
    id: "slimme-energienetten-smart-grids",
    naam: "Slimme energienetten (smart grids)",
    domein: "Energie",
    korteBeschrijving: "Digitale technologie, sensoren en flexibele tariefstructuren die vraag en aanbod van elektriciteit lokaal beter op elkaar afstemmen, mede om netcongestie te beperken.",
    trl: 6,
    labels: ["smart grid", "netcongestie", "energietransitie", "flexibiliteit"]
  },
  {
    id: "sensornetwerken-iot-omgevingsmonitoring",
    naam: "Sensornetwerken/IoT voor omgevingsmonitoring",
    domein: "Klimaat",
    korteBeschrijving: "Netwerken van sensoren, vaak gecombineerd met burgerwetenschap, die luchtkwaliteit, water en geluid meten en via nationale dataportalen zoals RIVM Samen Meten ontsluiten.",
    trl: 7,
    labels: ["IoT", "citizen science", "luchtkwaliteit", "LoRaWAN"]
  },
  {
    id: "uitlegbare-ai-besluitondersteuning",
    naam: "Uitlegbare AI (explainable AI) voor besluitondersteuning",
    domein: "Kansengelijkheid",
    korteBeschrijving: "AI- en algoritmesystemen die zo zijn ontworpen dat hun besluitvormingslogica te achterhalen en te verantwoorden is, met nadruk op het voorkomen van discriminatie na de toeslagenaffaire.",
    trl: 5,
    labels: ["algoritmeregister", "discriminatie", "transparantie", "toeslagenaffaire"]
  }
];

const EXPLORATIES = [
  { id: "genai-amsterdam-bezwaarschriften", technologieId: "generatieve-ai-overheidsdienstverlening", org: "Gemeente Amsterdam", typeOrganisatie: "Gemeente", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "Amsterdam zet generatieve AI in combinatie met spraak-naar-tekst in om bezwaarschriften automatisch te transcriberen en samen te vatten, zodat juridisch medewerkers meer tijd overhouden voor persoonlijk contact met indieners. De pilot is gefinancierd via het rijksbrede programma Werk aan Uitvoering (WaU) en loopt tot medio 2025.", uitkomst: "", bron: "https://www.gemeente.nu/bedrijfsvoering/pilots-met-generatieve-ai-leveren-inzichten-op-voor-alle-gemeenten/", team: "Juridische afdeling / bezwaar en beroep" },
  { id: "genai-breda-copilot", technologieId: "generatieve-ai-overheidsdienstverlening", org: "Gemeente Breda", typeOrganisatie: "Gemeente", status: "Pilot", kompas: { positie: "doorgaan", gekoppeldeOrgs: ["Gemeente Goes"] }, jaar: "2025", samenvatting: "Breda test een jaar lang Microsoft Copilot als digitale assistent voor medewerkers, gericht op documentcreatie, gegevensanalyse en communicatie. Doel is te onderzoeken of generatieve AI het werk efficiënter, effectiever en leuker maakt.", uitkomst: "", bron: "https://www.gemeente.nu/bedrijfsvoering/pilots-met-generatieve-ai-leveren-inzichten-op-voor-alle-gemeenten/", team: "Bedrijfsvoering / interne dienstverlening" },
  { id: "genai-eindhoven-datalek", technologieId: "generatieve-ai-overheidsdienstverlening", org: "Gemeente Eindhoven", typeOrganisatie: "Gemeente", status: "Gestopt", kompas: { positie: "pastniet", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "Medewerkers stuurden op grote schaal bestanden met persoonsgegevens naar openbare AI-websites zoals ChatGPT. Het datalek is op 23 oktober 2025 gemeld bij de Autoriteit Persoonsgegevens.", uitkomst: "Openbare AI-websites zijn direct geblokkeerd voor medewerkers, die vanaf 23 oktober alleen nog Copilot chat binnen de beveiligde gemeente-omgeving mogen gebruiken. Op 18 november 2025 is een AI-gedragscode vastgesteld en is monitoring van dataverkeer naar externe websites aangescherpt.", bron: "https://www.eindhoven.nl/persberichten/datalek-openbare-ai-in-eindhoven-0", team: "Informatiebeveiliging en privacy" },
  { id: "genai-goes-chatbot-guus", technologieId: "generatieve-ai-overheidsdienstverlening", org: "Gemeente Goes", typeOrganisatie: "Gemeente", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2024", samenvatting: "Goes claimt de eerste Nederlandse gemeente te zijn met een OpenAI-ondersteunde chatbot, 'Guus', op de gemeentelijke website. OpenAI krijgt toegang tot een beperkt aantal webpagina's om vragen van inwoners te beantwoorden.", uitkomst: "De nieuwe AI-versie verbeterde de nauwkeurigheid van beantwoorde vragen aanzienlijk (doelstelling minimaal 70%, tegenover circa 40% bij de oude chatbot); verzonden informatie naar OpenAI wordt na dertig dagen vernietigd.", bron: "https://www.agconnect.nl/maatschappij/overheid/primeur-aldus-goes-eerste-met-openai-ondersteunde-chatbot", team: "Digitale dienstverlening / communicatie" },
  { id: "genai-uwv-mistral-le-chat", technologieId: "generatieve-ai-overheidsdienstverlening", org: "UWV", typeOrganisatie: "Uitvoeringsorganisatie", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "Het Kernteam AI van UWV stelt voor om Mistral Le Chat, een Europese generatieve AI-chattoepassing, tijdelijk beschikbaar te stellen aan medewerkers binnen de moderne werkplek, als pilot binnen een tijdelijk kader van 2 juni tot en met 31 december 2025.", uitkomst: "", bron: "https://www.uwv.nl/assets-kai/files/70de44cc-c872-449b-b869-f789c4723c9d/25-216-beslisnotitie-update-gen-ai.pdf", team: "Kernteam AI / moderne werkplek" },
  { id: "genai-belastingdienst-belastingtelefoon", technologieId: "generatieve-ai-overheidsdienstverlening", org: "Belastingdienst", typeOrganisatie: "Rijksoverheid", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "In een bestuurlijk standpunt van 1 september 2025 wordt de inzet van generatieve AI voor dialoogondersteuning bij de BelastingTelefoon onderzocht en geadviseerd, gericht op het ondersteunen van medewerkers bij het beantwoorden van vragen van burgers.", uitkomst: "", bron: "https://www.eerstekamer.nl/overig/20251113/bijlage_7_bestuurlijk_standpunt/meta", team: "DF&A en KI&S (Klantinteractie & Services)" },
  { id: "digitaltwin-rijkswaterstaat-roadmap", technologieId: "digital-twins-infrastructuur-waterbeheer", org: "Rijkswaterstaat", typeOrganisatie: "Uitvoeringsorganisatie", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2021", samenvatting: "Rijkswaterstaat werkt aan een Roadmap Digital Twins met als doel dat in 2030 alle assets (wegen, vaarwegen, bruggen, sluizen, watersystemen) als realtime digital twin verbonden zijn met interne en externe databronnen en modellen.", uitkomst: "De roadmap identificeert als belangrijkste uitdagingen het ontwikkelen van een eenduidige visie en strategie, het opbouwen van interne kennis, het integreren van diverse databronnen en het toegankelijk maken van visualisaties op alle organisatieniveaus.", bron: "https://rwsinnoveert.nl/focuspunten/data-iv/digital-twins/", team: "Data en informatievoorziening" },
  { id: "digitaltwin-waterschap-limburg", technologieId: "digital-twins-infrastructuur-waterbeheer", org: "Waterschap Limburg", typeOrganisatie: "Waterschap", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2021", samenvatting: "Waterschap Limburg heeft een digital twin ontwikkeld van zijn volledige afvalwaterzuiveringssysteem: 17 zuiveringsinstallaties en 149 rioolgemalen, gecombineerd met een Big Data Platform en machine-learning-toepassing Aquasuite.", uitkomst: "Sinds september 2021 zijn de Aquasuite-applicatie en het Big Data Platform volledig operationeel voor alle 149 gemalen, waarmee 24/7 monitoring en vroegtijdige detectie van storingen mogelijk is.", bron: "https://www.waterschaplimburg.nl/uwbuurt/afvalwaterzuivering/innovatie/digital-twin/", team: "Assetmanagement en innovatie" },
  { id: "digitaltwin-amsterdam-utrecht-netherlands3d", technologieId: "digital-twins-infrastructuur-waterbeheer", org: "Gemeente Amsterdam en Gemeente Utrecht", typeOrganisatie: "Gemeente", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2022", samenvatting: "Amsterdam en Utrecht hebben samen een digitaal 3D-model (Local Digital Twin, onderdeel van Netherlands 3D) opgeleverd waarmee thema's als woningbouw en mobiliteit inzichtelijk worden gemaakt, en dat kosteloos door alle Nederlandse gemeenten en overheden gebruikt kan worden.", uitkomst: "Het platform is open source beschikbaar via GitHub en fungeert als landelijk herbruikbaar referentieplatform; nieuw ontwikkelde code moet volgens de Common Ground-principes weer worden teruggegeven aan de community.", bron: "https://vng.nl/praktijkvoorbeelden/digital-twin-voor-alle-gemeenten", team: "Ruimtelijke ordening en geo-informatie" },
  { id: "digitaltwin-rotterdam-citiverse", technologieId: "digital-twins-infrastructuur-waterbeheer", org: "Gemeente Rotterdam", typeOrganisatie: "Gemeente", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "Rotterdam ontwikkelt binnen een bredere 'Citiverse'-visie een Open Urban Platform (OUP) met een digital twin als kern: een 3D-model van de stad dat real-time data integreert, in publiek-private samenwerking.", uitkomst: "Het platform functioneert als gedeeld ecosysteem waarin de output van de ene applicatie als databron dient voor een andere, waardoor stedelijke systemen (mobiliteit, energie, water) geïntegreerd samenwerken in plaats van als losse pilots.", bron: "https://www.rsm.nl/discovery/2025/reimagining-the-digital-city/", team: "Digitale stad / stedelijke ontwikkeling" },
  { id: "digitaltwin-zeeland-nspd", technologieId: "digital-twins-infrastructuur-waterbeheer", org: "Provincie Zeeland", typeOrganisatie: "Provincie", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2024", samenvatting: "Zeeland zet digital twins in om beter grensoverschrijdend te kunnen samenwerken aan ruimtelijke opgaven in het Noordzeekanaal- en Schelde-gebied (NSPD), samen met het ministerie van Infrastructuur en Waterstaat, Vlaamse overheden, havenbedrijven en gemeenten.", uitkomst: "", bron: "https://www.zeeland.nl/over-ons/digitale-agenda/projecten/digital-twins", team: "Digitale agenda / ruimtelijke ontwikkeling" },
  { id: "pqc-aivd-handboek", technologieId: "post-quantum-cryptografie", org: "AIVD", typeOrganisatie: "Rijksoverheid", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2024", samenvatting: "AIVD publiceerde op 3 december 2024, samen met CWI en TNO, een vernieuwde tweede editie van het handboek voor de overstap naar quantumveilige cryptografie, inclusief de nieuwe adviestool PQChoiceAssistant.", uitkomst: "Het handboek biedt concreet advies voor het vinden van cryptografische componenten, het beoordelen van quantumrisico's en het inrichten van cryptografische wendbaarheid, gebaseerd op praktijkervaring sinds de eerste editie uit 2023.", bron: "https://www.aivd.nl/actueel/nieuws/2024/12/03/aivd-cwi-en-tno-publiceren-vernieuwd-handboek-voor-quantumveilige-cryptografie", team: "Cryptografie en kennisontwikkeling" },
  { id: "pqc-bz-jenv-quantumnetwerk", technologieId: "post-quantum-cryptografie", org: "Ministerie van Buitenlandse Zaken en Ministerie van Justitie en Veiligheid", typeOrganisatie: "Rijksoverheid", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "Beide ministeries testen samen met Quantum Delta NL, Q*Bird, RINIS, Sogeti en Eurofiber een operationeel quantumnetwerk waarin quantum key distribution (QKD) en post-quantum cryptografie complementair worden ingezet, inclusief een 25 kilometer lang quantumnetwerk tussen Den Haag en Delft.", uitkomst: "Tijdens het pre-NATO Summit-event 'Securing the Future' is een live demonstratie gegeven van het werkende quantumveilige netwerk; opschaling naar alle communicatiekanalen van de ministeries vergt nog verdere investeringen en besluitvorming.", bron: "https://www.government.nl/latest/news/2025/07/17/quantum-computers", team: "ICT-organisatie / cybersecurity" },
  { id: "pqc-ncsc-handreiking", technologieId: "post-quantum-cryptografie", org: "Nationaal Cyber Security Centrum (NCSC)", typeOrganisatie: "Rijksoverheid", status: "Onderzoekt", kompas: { positie: "samen", gekoppeldeOrgs: ["AIVD"] }, jaar: "2026", samenvatting: "NCSC publiceerde samen met AIVD de handreiking 'Maak je organisatie quantumveilig', gericht op CIO's, CTO's en CISO's in overheid, bedrijfsleven en kennisinstellingen, met concrete stappen voor risico-inventarisatie en migratieplanning.", uitkomst: "", bron: "https://www.ncsc.nl/quantumveilige-cryptografie/maak-je-organisatie-quantumveilig", team: "Nationaal Cyber Security Centrum" },
  { id: "pqc-bzk-informatieset", technologieId: "post-quantum-cryptografie", org: "Ministerie van Binnenlandse Zaken en Koninkrijksrelaties", typeOrganisatie: "Rijksoverheid", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "BZK publiceerde op 11 februari 2025 een informatieset quantumveilige cryptografie, gericht op softwareleveranciers en hun opdrachtgevers, met uitleg over de noodzaak van voorbereiding en praktische implementatietips.", uitkomst: "", bron: "https://www.digitaleoverheid.nl/nieuws/informatieset-quantumveilige-cryptografie/", team: "Quantumveilige Cryptografie Rijk (QvC Rijk)" },
  { id: "federated-vws-databeschikbaarheid", technologieId: "federated-learning-privacyvriendelijke-data-analyse", org: "Ministerie van Volksgezondheid, Welzijn en Sport", typeOrganisatie: "Rijksoverheid", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2020", samenvatting: "VWS gaf Capgemini Invent opdracht om te inventariseren welke initiatieven en constructies in Nederland bestaan om gezondheidsdata breder beschikbaar te maken voor AI, waaronder decentrale, privacyvriendelijke infrastructuren zoals de Personal Health Train.", uitkomst: "Het rapport concludeert dat er geen gebrek is aan gezondheidsdata, maar wel aan toegankelijke gezondheidsdata; van de bestaande dataconstructies wordt 70% publiek gefinancierd.", bron: "https://www.datavoorgezondheid.nl/documenten/2020/11/04/resultaten-onderzoek-databeschikbaarheid-voor-ai-de-zorg", team: "Programma Waardevolle AI voor gezondheid" },
  { id: "federated-tno-lifelines-diabetes", technologieId: "federated-learning-privacyvriendelijke-data-analyse", org: "TNO", typeOrganisatie: "Uitvoeringsorganisatie", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2023", samenvatting: "TNO ontwikkelde samen met cohortstudie Lifelines een federated logistiek-regressiemodel om het ontstaan van type 2-diabetes te voorspellen bij kinderen van twee tot elf jaar, op basis van data van 167.000 mensen in Nederland, zonder centralisatie van ruwe data.", uitkomst: "Het federated model presteert vrijwel net zo goed als een centraal getraind model; de resultaten worden als veelbelovend beschouwd en rechtvaardigen verder onderzoek.", bron: "https://www.tno.nl/en/technology-science/technologies/federated-learning/", team: "Data science en gezondheidsonderzoek" },
  { id: "blockchain-zuidhorn-kindpakket", technologieId: "blockchain-dlt-registers-identiteit", org: "Gemeente Zuidhorn", typeOrganisatie: "Gemeente", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2017", samenvatting: "Zuidhorn voert het Kindpakket, een voorziening van 300 euro per jaar voor kinderen uit gezinnen met een laag inkomen, uit via blockchain-technologie. Ontvangers besteden hun tegoed met een code bij lokale ondernemers, die rechtstreeks worden uitbetaald zonder tussenkomst van de gemeente.", uitkomst: "Ongeveer 150 kinderen in Zuidhorn maakten gebruik van de regeling; het aantal deelnemende ondernemers groeide van 3 naar 12. De buurgemeenten Grootegast, Leek en Marum kondigden aan zich in 2018 aan te sluiten.", bron: "https://www.welkominzuidhorn.nl/actueel/actueel-zuidhorn/zuidhorn-voert-kindpakket-uit-met-blockchain-technologie", team: "Sociaal domein / minimaregelingen" },
  { id: "blockchain-groningen-stadjerspas", technologieId: "blockchain-dlt-registers-identiteit", org: "Gemeente Groningen", typeOrganisatie: "Gemeente", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2019", samenvatting: "Binnen het Europese BLING-project (Blockchain in Government) onderzoekt Groningen de impact van blockchain-technologie voor de organisatie, burgers en het mkb. Een concreet resultaat is de Stadjerspas, een blockchain-gebaseerde voorziening voor inwoners met een laag inkomen.", uitkomst: "", bron: "https://northsearegion.eu/bling/interviews/interview-2-the-groninger-stadjerspas/index.html", team: "Sociaal domein / minimaregelingen" },
  { id: "blockchain-kadaster-sensrnet", technologieId: "blockchain-dlt-registers-identiteit", org: "Kadaster", typeOrganisatie: "Uitvoeringsorganisatie", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2020", samenvatting: "Kadaster leidt de ontwikkeling van SensRNet, een gedistribueerd sensorenregister dat inzicht geeft in waar sensoren in de openbare ruimte staan, welke data zij verzamelen en wie eigenaar is. Partners zijn BrabantStad, de gemeenten Apeldoorn, Nijmegen, Zwolle, Utrecht en Rotterdam, VNG en het ministerie van BZK.", uitkomst: "Een minimal viable product van het register werd voor begin 2021 gepland; het project bouwt voort op een eerdere landelijke pilot voor een sensorenregister uit 2018.", bron: "https://labs.kadaster.nl/innovatie/sensrnet/sens_r_net/", team: "Kadaster Labs / innovatie" },
  { id: "blockchain-jenv-wodc-onderzoek", technologieId: "blockchain-dlt-registers-identiteit", org: "Ministerie van Justitie en Veiligheid", typeOrganisatie: "Rijksoverheid", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2019", samenvatting: "Het WODC, het onderzoeksinstituut van het ministerie, liet door Tilburg University het verkennend onderzoek 'Blockchain en het recht' uitvoeren naar de juridische implicaties van blockchain voor privaatrecht, gegevensbeschermingsrecht en bestuursrecht, inclusief vier door de overheid geïnitieerde use-cases.", uitkomst: "Het rapport concludeert dat verantwoord gebruik van blockchain niet zonder het recht kan; het kabinet onderstreept in zijn reactie de noodzaak van een ethisch en juridisch verantwoord ontwerp van informatiesystemen.", bron: "https://repository.wodc.nl/bitstream/handle/20.500.12832/2336/2815_volledige_tekst_tcm28-403042.pdf?sequence=2&isAllowed=y", team: "WODC / Wetenschappelijk Onderzoek- en Documentatiecentrum" },
  { id: "syntheticdata-cbs-poc-syntho", technologieId: "synthetic-data-beleidsonderzoek", org: "Centraal Bureau voor de Statistiek", typeOrganisatie: "Rijksoverheid", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2023", samenvatting: "CBS voerde een proof of concept uit met de software van het Nederlandse bedrijf Syntho om een deel van het Algemeen Bedrijvenregister (ABR) synthetisch na te bootsen, en beoordeelde daarbij de analytische waarde en het disclosure-risico van de resulterende dataset.", uitkomst: "Het team slaagde erin een bruikbare synthetische testdataset te maken; de aanbeveling is om deze primair in te zetten voor interne software-testing in de statistiekproductie, met de constatering dat verder onderzoek naar disclosure-risico nodig is.", bron: "https://www.cbs.nl/nl-nl/over-ons/onderzoek-en-innovatie/project/wat-is-synthetische-data-", team: "Onderzoek en innovatie" },
  { id: "syntheticdata-duo-onderwijsregisters", technologieId: "synthetic-data-beleidsonderzoek", org: "Dienst Uitvoering Onderwijs (DUO)", typeOrganisatie: "Uitvoeringsorganisatie", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2023", samenvatting: "DUO biedt synthetische tabulaire data-producten aan, gebaseerd op onderwijsregisters (demografische gegevens, instellingsinformatie, eindtoetsen en examens), die onherkenbaar en niet herleidbaar zijn tot individuele leerlingen.", uitkomst: "Doordat de data niet herleidbaar is tot personen, kunnen verzoeken van onderzoekers sneller worden afgehandeld dan bij origineel, persoonsgebonden onderzoeksdata.", bron: "https://duo.nl/open_onderwijsdata/synthetische-data.jsp", team: "Open onderwijsdata" },
  { id: "syntheticdata-justid-innovatieweek", technologieId: "synthetic-data-beleidsonderzoek", org: "Justitiële Informatiedienst (Justid)", typeOrganisatie: "Uitvoeringsorganisatie", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2023", samenvatting: "Geïnspireerd door DUO's ervaring verkende Justid tijdens een innovatieweek de toepassing van synthetische data voor twee doelen: testen en ontwikkelen van software, en onderzoek. Het team koos ervoor zich eerst te richten op gebruik door eigen ontwikkelaars en testers.", uitkomst: "Het voorstel voor synthetische data won de prijs voor beste technische innovatie tijdens de innovatieweek.", bron: "https://www.justid.nl/actueel/nieuws/2023/05/26/je-kunt-heel-veel-informatie-uit-enkel-synthetische-data-halen", team: "Innovatie en datawetenschap" },
  { id: "xr-politie-etnisch-profileren", technologieId: "extended-reality-training-simulatie", org: "Nationale Politie", typeOrganisatie: "Rijksoverheid", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2021", samenvatting: "Met SAOP-subsidie ontwikkelde de Nationale Politie tussen 2019 en 2021 een 360°-VR-training om etnisch profileren tegen te gaan; politiefunctionarissen ervaren via VR-headsets realistisch gefilmde scenario's die reflectie oproepen op eigen handelen.", uitkomst: "Onderzoek van Universiteit Twente toont aan dat de 360°-VR-training meer bijdraagt aan kennis en houding rond etnisch profileren dan een vergelijkbare 2D-versie via smartphone, en de training wordt inmiddels groepsgewijs ingezet als vast onderdeel van het opleidingsaanbod.", bron: "https://www.websitevoordepolitie.nl/content/uploads/2021/11/BOING-DE-VRIES-De-inzet-van-VR-bij-het-tegengaan-van-etnisch-profileren-7.pdf", team: "Politieonderwijs en diversiteit" },
  { id: "xr-politieacademie-vr-falcon", technologieId: "extended-reality-training-simulatie", org: "Politieacademie", typeOrganisatie: "Rijksoverheid", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2026", samenvatting: "De Politieacademie ontwikkelde 'VR Falcon', een VR-escaperoom waarin politiecollega's digitale sporen leren herkennen, onderzoeken en veiligstellen, gebouwd naar aanleiding van een vraag vanuit de eenheden Midden- en Oost-Nederland.", uitkomst: "De training wordt vanaf 1 februari getest door studenten in het basispolitieonderwijs (BPO); bij positieve resultaten volgt besluitvorming door het Curriculum Team over structurele opname in het onderwijs.", bron: "https://www.politieacademie.nl/over-ons/nieuws/nieuwste-training-vr-falcon-is-de-samensmelting-van-onderwijs-met-de-praktijk", team: "Basispolitieonderwijs" },
  { id: "xr-landmacht-marsroute-simulatie", technologieId: "extended-reality-training-simulatie", org: "Koninklijke Landmacht", typeOrganisatie: "Rijksoverheid", status: "Onderzoekt", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2021", samenvatting: "Het Commando Landstrijdkrachten (CLAS) ontwikkelt de 'Marsroute O&T en Simulatie', een routekaart met als doel dat in de toekomst 50% van opleidingen en trainingen met simulatie (waaronder VR) wordt ondersteund, richting 2035.", uitkomst: "", bron: "https://magazines.defensie.nl/landmacht/2021/03/10_cde-virtual-reality", team: "Concept Development & Experimentation (CD&E)" },
  { id: "xr-nipv-buurtbatterijen", technologieId: "extended-reality-training-simulatie", org: "Nederlands Instituut Publieke Veiligheid (NIPV)", typeOrganisatie: "Uitvoeringsorganisatie", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "NIPV ontwikkelde samen met meerdere veiligheidsregio's een VR-simulatie om te oefenen met brand bij buurtbatterijen, een relatief nieuwe risicovorm binnen de energietransitie.", uitkomst: "De VR-simulatie is opgeleverd als trainingstool en beschikbaar voor inzet in meerdere veiligheidsregio's.", bron: "https://nipv.nl/nieuws/oplevering-vr-simulatie-buurtbatterijen/", team: "Opleiden, trainen en oefenen" },
  { id: "xr-rotterdam-preventie-met-gezag", technologieId: "extended-reality-training-simulatie", org: "Gemeente Rotterdam", typeOrganisatie: "Gemeente", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2024", samenvatting: "Binnen het programma 'Preventie met Gezag' laat Rotterdam jongeren via een VR-bril in het CoCo-project (Cocaïne Collectors) bijna levensecht de risico's en gevolgen van drugscriminaliteit ervaren, om instroom in criminaliteit te voorkomen.", uitkomst: "", bron: "https://www.rotterdam.nl/preventie-met-gezag", team: "Jeugd en veiligheid" },
  { id: "smartgrid-heerhugowaard-energiekoplopers", technologieId: "slimme-energienetten-smart-grids", org: "Gemeente Heerhugowaard", typeOrganisatie: "Gemeente", status: "Gestopt", kompas: { positie: "pastniet", gekoppeldeOrgs: [] }, jaar: "2015", samenvatting: "In de wijk Stad van de Zon, met een hoge dichtheid aan zonnepanelen, testten Alliander, Essent, IBM, ICT en NRG031 met circa 200 huishoudens hoe warmtepompen, elektrische boilers en zonneschakelaars automatisch aan- en uitschakelen om vraag en aanbod van elektriciteit lokaal te balanceren.", uitkomst: "Deelnemers ontvingen een financiële vergoeding van ongeveer 100 euro per jaar voor het leveren van flexibiliteit; de pilot identificeerde duidelijke pieken in zonneopwekking overdag en verbruik 's avonds. Een vervolgproject met meerdere energieleveranciers is niet zichtbaar doorgezet in latere bronnen.", bron: "https://www.change.inc/mobiliteit/smart-grid-is-het-gouden-onderdeel-in-de-stad-van-de-toekomst-15163", team: "Duurzaamheid en energietransitie" },
  { id: "smartgrid-zwolle-jem2", technologieId: "slimme-energienetten-smart-grids", org: "Gemeente Zwolle", typeOrganisatie: "Gemeente", status: "Gestopt", kompas: { positie: "pastniet", gekoppeldeOrgs: [] }, jaar: "2016", samenvatting: "In de Zwolse Muziekwijk testte netbeheerder Enexis met huishoudens flexibele energietarieven en automatische aansturing van thuisbatterijen en warmtepompen (JEM 2.0, vervolg op het eerdere IPIN-project Jouw Energie Moment), met 93 deelnemers waarvan 39 met een speciaal geïnstalleerde batterij.", uitkomst: "De focus op financieel voordeel bleek niet voor iedereen een prikkel om actief mee te doen; geautomatiseerde batterij-inzet kon pieken zowel voorkomen als verergeren. De onderzoekers concludeerden dat op basis van de verzamelde data lastig een duidelijke conclusie te trekken was of dit businessmodel werkt.", bron: "https://www.enexisgroep.nl/nieuws/jouw-energie-moment-20-jem-20-trekt-conclusies-over-flexibele-tarieven/", team: "Duurzaamheid en energietransitie" },
  { id: "smartgrid-zuidholland-sterkopstroom", technologieId: "slimme-energienetten-smart-grids", org: "Provincie Zuid-Holland", typeOrganisatie: "Provincie", status: "Gestopt", kompas: { positie: "pastniet", gekoppeldeOrgs: [] }, jaar: "2024", samenvatting: "Met steun van de provincie testte energiecoöperatie Sterk op Stroom in de Haagse Vruchtenbuurt een lokaal slim energiesysteem, waarbij ongeveer honderd huishoudens slimme-metergegevens deelden om lokale energie-uitwisseling te ontwikkelen.", uitkomst: "De coöperatie concludeerde dat het op korte termijn realiseren van een vervolgpilot niet haalbaar was: subsidies voor innovatie vereisten harde cofinanciering, en gemeente noch netbeheerder toonden bereidheid om een opgeschaalde pilot mede te financieren.", bron: "https://sterkopstroom.nl/afronding-experiment-smart-grid-provincie-zuid-holland-2/", team: "Energietransitie en duurzaamheid" },
  { id: "smartgrid-utrecht-smart-solar-charging", technologieId: "slimme-energienetten-smart-grids", org: "Gemeente Utrecht", typeOrganisatie: "Gemeente", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "Utrecht heeft de 300e Smart Solar Charging-laadpaal in gebruik genomen: laadpalen die elektrische voertuigen opladen met wind- en zonne-energie, op het beste moment voor netbeheerder, klimaat en autorijder, via het FLEET-project met flexibele nettarieven.", uitkomst: "De regio streeft naar uitbreiding tot 1.000 laadpunten met 10.000 aangesloten zonnepanelen.", bron: "https://solarmagazine.nl/nieuws-zonne-energie/i22804/gemeente-utrecht-neemt-300e-smart-solar-charging-laadpaal-in-gebruik", team: "Mobiliteit en duurzaamheid" },
  { id: "smartgrid-arnhem-buurtbudget", technologieId: "slimme-energienetten-smart-grids", org: "Gemeente Arnhem", typeOrganisatie: "Gemeente", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "In Rijnpark, de grootste stedelijke ontwikkellocatie van Arnhem met circa 7.000 nieuwe woningen, startten de gemeente en netbeheerder Alliander het 'Buurtbudget': het eerste pilotgebied in Nederland waar flexibel bouwen en ontwikkelen mogelijk wordt binnen een vooraf vastgesteld energiebudget om netcongestie te voorkomen.", uitkomst: "Op 18 juni 2025 is een intentieovereenkomst getekend tussen gemeente en Alliander; de opgedane kennis wordt actief gedeeld met andere gemeenten en ontwikkelgebieden om landelijke opschaling mogelijk te maken.", bron: "https://www.alliander.com/nl/nieuws/buurtbudget-in-nieuwbouwwijk-arnhem-moet-netcongestie-slim-oplossen/", team: "Ruimtelijke ontwikkeling en energie" },
  { id: "iot-rivm-samenmeten", technologieId: "sensornetwerken-iot-omgevingsmonitoring", org: "RIVM", typeOrganisatie: "Rijksoverheid", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2016", samenvatting: "Het RIVM-programma Samen Meten ondersteunt burgerwetenschap rond lucht-, water- en geluidmetingen sinds 2016, met een dataportaal waarin metingen van burgers, gemeenten, provincies en kennisinstellingen worden samengebracht.", uitkomst: "Na acht jaar telt het netwerk circa 4.000 sensoren en meer dan 7 miljard metingen (5 miljard luchtkwaliteit, 2 miljard geluid); in ongeveer 9 van de 10 Nederlandse gemeenten hangen inmiddels fijnstofsensoren die op het portaal zijn aangesloten.", bron: "https://samenmeten.rivm.nl", team: "Programma Samen Meten" },
  { id: "iot-rijkswaterstaat-sluizen", technologieId: "sensornetwerken-iot-omgevingsmonitoring", org: "Rijkswaterstaat", typeOrganisatie: "Uitvoeringsorganisatie", status: "Pilot", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2018", samenvatting: "Rijkswaterstaat koppelde in februari 2018 tien sluizen aan een realtime sensornetwerk dat waterpeil, watertemperatuur, windsnelheid, windrichting, scheepssnelheden en operationele data zoals motortemperaturen en storingen monitort.", uitkomst: "De data-analyse is gericht op predictive maintenance, zodat Rijkswaterstaat voorspellingen kan doen en mankementen kan voorkomen voordat ze daadwerkelijk optreden.", bron: "https://www.computable.nl/2018/02/13/rijkswaterstaat-koppelt-10-sluizen-aan-sensornetwerk/", team: "Assetmanagement en bediening" },
  { id: "iot-rotterdam-luchtclub", technologieId: "sensornetwerken-iot-omgevingsmonitoring", org: "Gemeente Rotterdam", typeOrganisatie: "Gemeente", status: "Gestopt", kompas: { positie: "pastniet", gekoppeldeOrgs: [] }, jaar: "2023", samenvatting: "In april 2021 startte Rotterdam 'De Luchtclub', een burgersensornetwerk voor luchtkwaliteit verspreid over de 14 stadsgebieden, als aanvulling op het officiële DCMR-meetnet. De gemeente was initiator, DCMR en RIVM voerden de data-analyse uit.", uitkomst: "Op 20 november 2023 presenteerde De Luchtclub de voorlopige resultaten van 27 maanden meten; de gemeente trok zich als officiële projectleider terug, met het aanbod deelnemers te blijven ondersteunen als zij zelfstandig doorgaan.", bron: "https://www.samenmeten.nl/initiatieven/luchtclub-rotterdam", team: "Milieu en duurzaamheid" },
  { id: "iot-utrecht-snuffelfiets", technologieId: "sensornetwerken-iot-omgevingsmonitoring", org: "Provincie Utrecht", typeOrganisatie: "Provincie", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2018", samenvatting: "Sinds 2018 fietsen vrijwilligers en scholieren in de provincie Utrecht met een sensor aan hun fiets die fijnstof (PM2.5) en temperatuur meet, waarmee een mobiel netwerk van luchtkwaliteitsmetingen ontstaat.", uitkomst: "Ruim 550 inwoners van de provincie hebben als vrijwilliger meegedaan; in 2020 alleen al leverde het netwerk meer dan 20 miljoen metingen op, gedeeld via dashboards zoals knowyourair.net en het RIVM Samen Meten-portaal.", bron: "https://samenmetenutrecht.nl/project/snuffelfiets/", team: "Milieu en gezonde leefomgeving" },
  { id: "iot-zuidholland-samenmeten", technologieId: "sensornetwerken-iot-omgevingsmonitoring", org: "Provincie Zuid-Holland", typeOrganisatie: "Provincie", status: "Opgeschaald", kompas: { positie: "doorgaan", gekoppeldeOrgs: ["RIVM"] }, jaar: "2019", samenvatting: "Sinds 2019 ondersteunt de provincie Zuid-Holland burgerinitiatieven bij het zelf meten van luchtkwaliteit, met meetapparatuur, een platform en bijeenkomsten, in samenwerking met RIVM en de milieudiensten. Deelnemende gemeenten zijn onder meer Delft, Gouda en Rotterdam.", uitkomst: "Het programma functioneert als netwerk waarin lokale initiatieven van elkaar leren; de meettechniek ontwikkelde zich van de RIVM-paddenstoel via grijze kastjes naar de nu gangbare SDS011-fijnstofsensor.", bron: "http://www.samenmeten.nl/initiatieven/samen-luchtkwaliteit-meten-in-zuid-holland", team: "Milieu en gezonde leefomgeving" },
  { id: "xai-belastingdienst-obv", technologieId: "uitlegbare-ai-besluitondersteuning", org: "Belastingdienst", typeOrganisatie: "Rijksoverheid", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2023", samenvatting: "De Belastingdienst gebruikt twee gekoppelde, niet-zelflerende algoritmes (OBVP en OBVA) om aangifteverzuim bij de omzetbelasting tegen te gaan: OBVP maakt een statistische inschatting van de kans op verzuim en genereert signalen, OBVA behandelt herhaald verzuim met oplopende maatregelen.", uitkomst: "Beide algoritmes genereren behandelsignalen die medewerkers beoordelen voordat zij contact opnemen met ondernemingen; besluiten met impact blijven altijd bij medewerkers, en het systeem wordt periodiek handmatig herijkt in plaats van automatisch te leren.", bron: "https://over-ons.belastingdienst.nl/onderwerpen/omgaan-met-gegevens/algoritmeregister/omzetbelasting-verzuimpreventie-en-verzuimaanpak-obv/", team: "Klant Interactie & Services" },
  { id: "xai-svb-samenwoonmodel", technologieId: "uitlegbare-ai-besluitondersteuning", org: "Sociale Verzekeringsbank (SVB)", typeOrganisatie: "Uitvoeringsorganisatie", status: "Gestopt", kompas: { positie: "pastniet", gekoppeldeOrgs: [] }, jaar: "2025", samenvatting: "De SVB ontwikkelde een voorspellend model (SWAN) om in te schatten hoe groot de kans is dat iemand die volgens de basisregistratie alleen woont, in werkelijkheid toch samenwoont, relevant voor onder meer AOW-toeslagen.", uitkomst: "Volgens het algoritmeregister is dit model uitsluitend gebruikt om ervaring op te doen en is het nooit in productie genomen; de ontwikkeling is stopgezet.", bron: "https://algoritmes.overheid.nl/nl/organisatie/zb000143/sociale-verzekeringsbank", team: "Data science en modelontwikkeling" },
  { id: "xai-svb-preventie-handhaving", technologieId: "uitlegbare-ai-besluitondersteuning", org: "Sociale Verzekeringsbank (SVB)", typeOrganisatie: "Uitvoeringsorganisatie", status: "Opgeschaald", kompas: { positie: "wel", gekoppeldeOrgs: [] }, jaar: "2024", samenvatting: "De SVB gebruikt een algoritme om risicoprofielen te maken ten behoeve van gericht onderzoek door de afdeling Preventie & Handhaving; burgers die in een risicoprofiel vallen kunnen worden geselecteerd voor controle door een medewerker.", uitkomst: "De uiteindelijke selectie en beoordeling blijft bij een medewerker (human-in-the-loop); in een reactie aan de Eerste Kamer benadrukt de SVB dat zorgvuldige omgang met gegevens en het voorkomen van directe en indirecte discriminatie essentieel is.", bron: "https://algoritmes.overheid.nl/nl/organisatie/zb000143/sociale-verzekeringsbank", team: "Preventie & Handhaving" },
  { id: "xai-utrecht-rekenkamer-algoritmes", technologieId: "uitlegbare-ai-besluitondersteuning", org: "Gemeente Utrecht", typeOrganisatie: "Gemeente", status: "Onderzoekt", kompas: { positie: "doorgaan", gekoppeldeOrgs: ["Sociale Verzekeringsbank (SVB)"] }, jaar: "2025", samenvatting: "De Rekenkamer Utrecht onderzocht hoe de gemeente in de praktijk omgaat met haar 45 impactvolle algoritmes en welk beleid daarvoor is geformuleerd, met specifieke aandacht voor uitlegbaarheid, transparantie en risicobeheersing.", uitkomst: "De rekenkamer concludeert dat interne richtlijnen voor verantwoord en uitlegbaar algoritmegebruik niet consequent worden toegepast, dat risico's onvoldoende worden gemonitord en dat de gemeenteraad slechts op hoofdlijnen wordt geïnformeerd. Alle aanbevelingen zijn op 27 maart 2025 unaniem door de gemeenteraad aangenomen.", bron: "https://www.utrecht.nl/fileadmin/uploads/documenten/7.extern/Rekenkamer/20251202_Rekenkamerrapport_Verantwoord_omgaan_met_algoritmes.pdf", team: "Rekenkamer Utrecht" },
  { id: "xai-denhaag-geluiddetectie", technologieId: "uitlegbare-ai-besluitondersteuning", org: "Gemeente Den Haag", typeOrganisatie: "Gemeente", status: "Gestopt", kompas: { positie: "pastniet", gekoppeldeOrgs: [] }, jaar: "2024", samenvatting: "Den Haag registreerde in het algoritmeregister twee geluidsherkenningsalgoritmes die op basis van spectrogrammen detecteren welk type geluid gemeten wordt, bedoeld voor een globaal beeld van geluidsbronnen in de stad.", uitkomst: "Beide algoritmes staan in het algoritmeregister vermeld met de status 'Buiten gebruik'.", bron: "https://algoritmes.overheid.nl/nl/organisatie/gm0518/gemeente-den-haag", team: "Data en analyse" }
];
