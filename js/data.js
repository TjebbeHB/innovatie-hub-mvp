/* ============================================================
   Innovatie Hub — data
   ------------------------------------------------------------
   LET OP: dit is VOORBEELDDATA. Vervang de inhoud van
   PROJECTS en PEOPLE door echte projectdata om de MVP met
   echte innovatiebudget-projecten te vullen.

   Structuur van een project:
   {
     id:        unieke slug (string)
     title:     projectnaam
     org:       organisatie
     theme:     NDS-thema: "Data" | "AI" | "Cloud" |
                "Digitale weerbaarheid" | "Digitaal vakmanschap" |
                "Burgergericht"
     status:    "Lopend" | "Afgerond" | "Gestopt" | "On hold" | "Concept"
     fase:      "Idee" | "Proof of concept" | "Pilot" | "Implementatie" | "Opgeschaald"
     start:     startdatum "DD-MM-JJJJ"
     eind:      einddatum of "-"
     gepubliceerd / bijgewerkt: datums
     partners:  [organisaties]
     kort:      korte omschrijving (kaartje)
     beschrijving: lange projectbeschrijving (detailpagina)
     probleem:  probleemstelling
     doel:      doelstelling
     lessen:    [geleerde lessen]
     gdi:       [GDI-bouwblokken]
     labels:    [labels]
     contactId: verwijst naar PEOPLE.id
     files:     [{naam, type, grootte, datum, actie: "download"|"open"}]
     mine:      true = project van de ingelogde gebruiker
   }
   ============================================================ */

const THEMES = ["Data", "AI", "Cloud", "Digitale weerbaarheid", "Digitaal vakmanschap", "Burgergericht"];

const THEME_COLORS = {
  "Data": "#24439B",
  "AI": "#7C3AED",
  "Burgergericht": "#E01383",
  "Digitale weerbaarheid": "#F28A1F",
  "Digitaal vakmanschap": "#F7C325",
  "Cloud": "#0FB5D6"
};

const STATUS_COLORS = {
  "Lopend": "#22C55E",
  "Afgerond": "#3B82F6",
  "Gestopt": "#EF4444",
  "On hold": "#F59E0B",
  "Concept": "#9CA3AF"
};

const INTERESSES = [
  "AI", "Data", "Datadeling", "Data governance", "Algoritmes", "Responsible AI", "Cloud", "API's",
  "Digitale identiteit", "Interoperabiliteit", "Architectuur", "Open standaarden", "Cybersecurity", "Privacy", "Compliance",
  "Digitale weerbaarheid", "Toezicht", "Transparantie", "Burgergericht", "Toegankelijkheid", "Inclusie", "Dienstverlening",
  "Gebruikerservaring", "Procesinnovatie", "Automatisering", "Samenwerking", "Digitaal vakmanschap", "Verandermanagement",
  "Ketenpartners", "Autonomie", "Duurzaamheid", "Publieke waarden"
];

const GDI_BOUWBLOKKEN = [
  "PKI-overheid", "Digitoegankelijk", "Open Standaarden", "Diginetwerk", "NORA", "DigiD",
  "MijnOverheid", "BRP", "eHerkenning", "Digipoort", "Standaardplatform", "Haal Centraal"
];

const PEOPLE = [
  { id: "tdv", naam: "Thomas de Vries", rol: "Senior Innovatie Manager", org: "ICTU", afdeling: "I-Interim Rijk", expertise: ["Data", "API's", "Agile", "Open standaarden"], betrokkenBij: "AI-ethiek, Open Source strategie en Software Architectuur", email: "tvries@ictu.voorbeeld.nl", tel: "06 12 34 56 78", kleur: "#BFDBFE" },
  { id: "kj", naam: "Kim Jansen", rol: "Projectleider Privacy", org: "DUO", afdeling: "Privacy Office", expertise: ["Algoritmes", "Cybersecurity", "Privacy", "Compliance"], betrokkenBij: "Privacytoetsen en verantwoord datagebruik", email: "kjansen@duo.voorbeeld.nl", tel: "06 23 45 67 89", kleur: "#DDD6FE" },
  { id: "dl", naam: "Dante Luiten", rol: "Project Officer", org: "Gemeente Utrecht", afdeling: "Digitale Stad", expertise: ["Burgergericht", "AI", "Data", "Dienstverlening"], betrokkenBij: "Slimme dienstverlening en participatie", email: "d.luiten@utrecht.voorbeeld.nl", tel: "06 34 56 78 90", kleur: "#BBF7D0" },
  { id: "rs", naam: "Rebecca Simons", rol: "Beleidsmedewerker Digitalisering", org: "I&W", afdeling: "Directie Digitalisering", expertise: ["Compliance", "Open standaarden", "Beleidsinnovatie", "Transparantie"], betrokkenBij: "Digitale beleidsvorming en AI-verordening", email: "r.simons@ienw.voorbeeld.nl", tel: "06 45 67 89 01", kleur: "#FECACA" },
  { id: "bm", naam: "Briel Meeren", rol: "Coördinator Innovatie", org: "Logius", afdeling: "Innovatielab", expertise: ["Privacy", "Toegankelijkheid", "Digitale identiteit", "API's"], betrokkenBij: "Wallets, federatief inloggen en GDI-vernieuwing", email: "b.meeren@logius.voorbeeld.nl", tel: "06 56 78 90 12", kleur: "#FDE68A" },
  { id: "pvr", naam: "Pim van Ruis", rol: "Programmamanager Digitale Transformatie", org: "Geonovum", afdeling: "Programma's", expertise: ["Autonomie", "Transparantie", "Interoperabiliteit"], betrokkenBij: "Geo-standaarden en datavisualisatie", email: "p.vanruis@geonovum.voorbeeld.nl", tel: "06 67 89 01 23", kleur: "#BAE6FD" },
  { id: "tk", naam: "Timber Koopmans", rol: "Innovatiemanager", org: "Gemeente Amsterdam", afdeling: "CTO Office", expertise: ["Algoritmes", "Burgergericht", "Responsible AI"], betrokkenBij: "Algoritmeregister en verantwoorde AI", email: "t.koopmans@amsterdam.voorbeeld.nl", tel: "06 78 90 12 34", kleur: "#FBCFE8" },
  { id: "sh", naam: "Sam Hofman", rol: "Product Owner Overheidsdiensten", org: "Rijkswaterstaat", afdeling: "Datalab", expertise: ["Digitale identiteit", "API's", "Data"], betrokkenBij: "Sensordata en voorspellend onderhoud", email: "s.hofman@rws.voorbeeld.nl", tel: "06 89 01 23 45", kleur: "#A7F3D0" },
  { id: "gdz", naam: "Giel de Zomer", rol: "Scrum Master", org: "Kadaster", afdeling: "Agile Center", expertise: ["Compliance", "API's", "Data", "Agile"], betrokkenBij: "Objectenregistratie en teamcoaching", email: "g.dezomer@kadaster.voorbeeld.nl", tel: "06 90 12 34 56", kleur: "#C7D2FE" },
  { id: "sm", naam: "Sophie Molenaar", rol: "UX Researcher", org: "Gemeente Rotterdam", afdeling: "Dienstverlening", expertise: ["Gebruikerservaring", "Burgergericht", "Inclusie"], betrokkenBij: "Gebruikersonderzoek studentenwallet", email: "s.molenaar@rotterdam.voorbeeld.nl", tel: "06 11 22 33 44", kleur: "#FED7AA" },
  { id: "mvd", naam: "Mark van Dijk", rol: "Projectleider Digitale Post", org: "ICTU", afdeling: "Burgerdiensten", expertise: ["Burgergericht", "Procesinnovatie", "Service"], betrokkenBij: "Nabestaandendiensten en postdigitalisering", email: "m.vandijk@ictu.voorbeeld.nl", tel: "06 22 33 44 55", kleur: "#99F6E4" },
  { id: "jb", naam: "Julia Bakker", rol: "Data Scientist", org: "I&W", afdeling: "Datalab", expertise: ["AI", "Data", "Algoritmes", "NLP"], betrokkenBij: "Tekstanalyse van burgerreacties", email: "j.bakker@ienw.voorbeeld.nl", tel: "06 33 44 55 66", kleur: "#FDE68A" },
  { id: "ak", naam: "Anna Koster", rol: "Informatiebeveiliger", org: "Gemeente Nijmegen", afdeling: "CISO Office", expertise: ["Cybersecurity", "Privacy", "Digitale weerbaarheid"], betrokkenBij: "Veilig mailen en gegevensuitwisseling", email: "a.koster@nijmegen.voorbeeld.nl", tel: "06 44 55 66 77", kleur: "#E9D5FF" },
  { id: "pvg", naam: "Peter van Gelder", rol: "Productmanager Digitale Kanalen", org: "Kadaster", afdeling: "Klantcontact", expertise: ["AI", "Dienstverlening", "Toegankelijkheid"], betrokkenBij: "Chatbots en digitale assistenten", email: "p.vangelder@kadaster.voorbeeld.nl", tel: "06 55 66 77 88", kleur: "#BFDBFE" },
  { id: "th", naam: "Tom Hermans", rol: "Adviseur Digitale Overheid", org: "VNG", afdeling: "Realisatie", expertise: ["Burgergericht", "Ketenpartners", "Dienstverlening"], betrokkenBij: "Omgevingswet en gemeentelijke portalen", email: "t.hermans@vng.voorbeeld.nl", tel: "06 66 77 88 99", kleur: "#FECDD3" },
  { id: "lvdb", naam: "Lisa van de Berg", rol: "AI-specialist", org: "Gemeente Rotterdam", afdeling: "Innovatieteam", expertise: ["AI", "Automatisering", "Digitaal vakmanschap"], betrokkenBij: "AI-assistenten voor ambtenaren", email: "l.vandeberg@rotterdam.voorbeeld.nl", tel: "06 77 88 99 00", kleur: "#D9F99D" }
];

/* Standaard bibliotheekbestanden (voorbeeld) */
const DEFAULT_FILES = [
  { naam: "projectplan", type: "pdf", grootte: "2000 kB", datum: "31-8-2025", actie: "download" },
  { naam: "architectuurschets", type: "svg", grootte: "500 kB", datum: "02-09-2025", actie: "download" },
  { naam: "demo-omgeving", type: "link", grootte: "", datum: "01-09-2025", actie: "open" },
  { naam: "eindrapportage-fase-1", type: "pdf", grootte: "800 kB", datum: "03-09-2025", actie: "open" }
];

const PROJECTS = [
  /* ---------- AI (6) ---------- */
  {
    id: "tina-transcriptie", title: "TINA Transcriptie", org: "ICTU", theme: "AI",
    status: "Lopend", fase: "Proof of concept", start: "01-09-2025", eind: "-", gepubliceerd: "15-10-2025", bijgewerkt: "12-05-2026",
    partners: ["Gemeente Leeuwarden", "Gemeente Montferland", "AI.Co.nl", "ICTU"],
    kort: "Gesprekken uittypen kost ambtenaren veel tijd en commerciële software is niet altijd veilig. Het project TINA lost dit op. Het is een veilige AI-tool die spraak automatisch omzet in tekst binnen de eigen overheid.",
    beschrijving: "TINA is een open source AI-tool die gesprekken binnen de overheid automatisch omzet in tekst. Denk aan keukentafelgesprekken, vergaderingen en hoorzittingen. Dit bespaart tijd en zorgt voor betere verslaglegging. In plaats van commerciële tools, die vaak data buiten Europa verwerken, draait TINA lokaal en blijft alle informatie binnen de overheid. De tool ondersteunt Nederlands, Fries en is geschikt voor transcriptie van dialecten. In dit project wordt TINA doorontwikkeld van proof of concept naar een bruikbaar product voor de praktijk.",
    probleem: "De overheid kampt met een hoge werkdruk en een tekort aan personeel, terwijl de hoeveelheid administratieve verslaglegging toeneemt. Ambtenaren zijn urenlang bezig met het transcriberen van gesprekken, wat ten koste gaat van de tijd voor de burger. Daarnaast mogen huidige marktgedreven AI-oplossingen vaak niet gebruikt worden vanwege soevereiniteits- en privacyrisico's.",
    doel: "Het doel is het realiseren van een 'Minimal Viable Product' (MVP) van TINA dat breed inzetbaar is binnen de publieke sector. We streven naar een nauwkeurigheid van minimaal 90% bij het transcriberen van verschillende Nederlandse accenten. Daarnaast moet het platform volledig open source beschikbaar worden gesteld, zodat andere overheidslagen de techniek kosteloos kunnen overnemen en verbeteren.",
    lessen: [
      "Tijdens de eerste fase bleek dat de kwaliteit van de microfoons in vergaderruimtes een grotere impact had op de AI-prestaties dan het algoritme zelf.",
      "Ook is gebleken dat gebruikers behoefte hebben aan een 'human-in-the-loop' interface waarbij ze de tekst makkelijk kunnen corrigeren."
    ],
    gdi: ["PKI-overheid", "Digitoegankelijk", "Open Standaarden", "Diginetwerk", "NORA"],
    labels: ["AI", "Efficiëntie", "Transparantie", "Experimenteel"],
    contactId: "tdv", files: DEFAULT_FILES
  },
  {
    id: "consultation-ai", title: "ConsultationAI", org: "I&W", theme: "AI",
    status: "Afgerond", fase: "Pilot", start: "01-03-2025", eind: "01-04-2026", gepubliceerd: "12-03-2025", bijgewerkt: "02-04-2026",
    partners: ["ICTU", "Ministerie van BZK"],
    kort: "Bij grote plannen komen vaak reacties van burgers binnen die handmatig gelezen moeten worden. ConsultationAI versnelt dit proces. Het is een platform dat met software helpt om dit snel te analyseren.",
    beschrijving: "ConsultationAI analyseert duizenden burgerreacties op internetconsultaties met behulp van taalmodellen. Het platform clustert reacties op onderwerp, vat de belangrijkste standpunten samen en toont hoeveel reacties elk standpunt ondersteunen. Beleidsmedewerkers houden altijd de eindregie: elke samenvatting verwijst terug naar de oorspronkelijke reacties.",
    probleem: "Internetconsultaties leveren soms tienduizenden reacties op. Het handmatig lezen en verwerken hiervan kost maanden, waardoor de besluitvorming vertraagt en reacties onvoldoende worden meegewogen.",
    doel: "Een werkende pilot waarmee de doorlooptijd van consultatieanalyses met 70% wordt verkort, terwijl de kwaliteit en herleidbaarheid van de analyse behouden blijft.",
    lessen: [
      "Clustering op onderwerp werkt goed, maar sentimentanalyse op beleidsreacties bleek onbetrouwbaar en is uit scope gehaald.",
      "Transparantie over AI-gebruik richting indieners van reacties is essentieel voor draagvlak."
    ],
    gdi: ["Open Standaarden", "NORA", "Digipoort"],
    labels: ["Efficiëntie", "Transparantie", "Beleidsinnovatie"],
    contactId: "jb", files: DEFAULT_FILES
  },
  {
    id: "chatten-met-overheid", title: "Chatten met Overheid", org: "Kadaster", theme: "AI",
    status: "Lopend", fase: "Pilot", start: "15-01-2026", eind: "-", gepubliceerd: "20-01-2026", bijgewerkt: "28-06-2026",
    partners: ["Logius", "Gemeente Den Haag"], mine: true,
    kort: "Inwoners hebben vragen, maar vinden het antwoord niet altijd in lange teksten op websites. Dit project bouwt een chat. Het is een digitale assistent die vragen beantwoordt op basis van overheidsdata.",
    beschrijving: "Chatten met Overheid is een digitale assistent die vragen van inwoners beantwoordt op basis van gevalideerde overheidsbronnen. De assistent geeft altijd een bronvermelding en verwijst bij twijfel door naar een medewerker. De pilot draait op de website van het Kadaster voor vragen over erfgrenzen en woningwaarde.",
    probleem: "Inwoners verdwalen in lange informatiepagina's en bellen daardoor vaak met het klantcontactcentrum, terwijl het antwoord online beschikbaar is.",
    doel: "Een betrouwbare chatassistent die 60% van de veelgestelde vragen correct beantwoordt met bronvermelding, en aantoonbaar het aantal telefonische vragen verlaagt.",
    lessen: [
      "Antwoorden zonder bronvermelding worden door gebruikers gewantrouwd; de bronlink verhoogde het vertrouwen aanzienlijk.",
      "Een duidelijke escalatieroute naar een mens blijkt onmisbaar."
    ],
    gdi: ["Digitoegankelijk", "Open Standaarden", "Haal Centraal"],
    labels: ["Burgers", "AI", "Toegankelijkheid", "Service"],
    contactId: "pvg", files: DEFAULT_FILES
  },
  {
    id: "ai-coworker", title: "AI CoWorker", org: "Gemeente Rotterdam", theme: "AI",
    status: "Lopend", fase: "Proof of concept", start: "01-02-2026", eind: "-", gepubliceerd: "10-02-2026", bijgewerkt: "25-06-2026",
    partners: ["VNG", "Gemeente Eindhoven"], mine: true,
    kort: "Ambtenaren zijn veel tijd kwijt aan herhalende administratie. Het project AI CoWorker onderzoekt hulp. Het bekijkt hoe digitale assistenten taken kunnen overnemen zodat er meer tijd is voor burgers.",
    beschrijving: "AI CoWorker onderzoekt hoe AI-assistenten ambtenaren kunnen ondersteunen bij administratieve taken zoals het samenvatten van dossiers, het opstellen van conceptbrieven en het invullen van formulieren. Het project toetst per taak of AI-inzet verantwoord, veilig en werkbaar is.",
    probleem: "Ambtenaren besteden een groot deel van hun tijd aan herhalende administratieve taken, terwijl de personeelstekorten oplopen en de dienstverlening onder druk staat.",
    doel: "Inzicht in welke administratieve taken verantwoord door AI ondersteund kunnen worden, met een werkende proof of concept voor de drie meest kansrijke taken.",
    lessen: [
      "Medewerkers accepteren AI-hulp sneller wanneer zij zelf de eindcontrole houden over elke output.",
      "Kleine, afgebakende taken leveren meer op dan één brede assistent."
    ],
    gdi: ["NORA", "Standaardplatform"],
    labels: ["Intern", "AI", "Procesinnovatie", "Efficiëntie"],
    contactId: "lvdb", files: DEFAULT_FILES
  },
  {
    id: "begrotingsbot", title: "Begrotingsbot", org: "Gemeente Utrecht", theme: "AI",
    status: "On hold", fase: "Idee", start: "01-11-2025", eind: "-", gepubliceerd: "05-11-2025", bijgewerkt: "01-03-2026",
    partners: ["CBS"], mine: true,
    kort: "Gemeentebegrotingen zijn voor inwoners moeilijk te doorgronden. De Begrotingsbot maakt ze toegankelijk. Inwoners stellen gewone vragen en krijgen begrijpelijke antwoorden over de cijfers.",
    beschrijving: "De Begrotingsbot maakt gemeentelijke begrotingen doorzoekbaar via natuurlijke taal. Inwoners en raadsleden kunnen vragen stellen als 'hoeveel geeft de gemeente uit aan groenonderhoud?' en krijgen een begrijpelijk antwoord met verwijzing naar de brontabel.",
    probleem: "Begrotingsstukken zijn honderden pagina's lang en voor de meeste inwoners en zelfs raadsleden lastig te doorgronden, wat de democratische controle bemoeilijkt.",
    doel: "Een prototype waarmee inwoners in gewone taal vragen kunnen stellen over de gemeentebegroting, ter versterking van transparantie en participatie.",
    lessen: [
      "Het project staat on hold in afwachting van de gemeentelijke AI-verordening en beschikbare capaciteit."
    ],
    gdi: ["Open Standaarden", "Digitoegankelijk"],
    labels: ["Transparantie", "Burgers", "Experimenteel"],
    contactId: "dl", files: DEFAULT_FILES
  },
  {
    id: "meldkamer-triage-ai", title: "Meldkamer Triage AI", org: "Politie", theme: "AI",
    status: "Lopend", fase: "Pilot", start: "01-04-2026", eind: "-", gepubliceerd: "10-04-2026", bijgewerkt: "20-06-2026",
    partners: ["Ministerie van J&V"],
    kort: "Meldkamers ontvangen meer meldingen dan centralisten kunnen verwerken. Dit project onderzoekt slimme triage. AI helpt meldingen te prioriteren zodat spoedgevallen sneller hulp krijgen.",
    beschrijving: "Dit project onderzoekt hoe AI meldkamercentralisten kan ondersteunen bij het prioriteren van niet-spoedeisende meldingen. De AI doet een voorstel; de centralist beslist altijd. Het project besteedt uitgebreid aandacht aan bias-toetsing en menselijke controle.",
    probleem: "Meldkamers kampen met piekbelasting waardoor niet-spoedeisende meldingen lang blijven liggen en spoedgevallen soms laat worden herkend.",
    doel: "Een verantwoorde pilot die aantoont of AI-ondersteunde triage de gemiddelde afhandeltijd verkort zonder fout-negatieven bij spoedmeldingen.",
    lessen: [
      "De AI mag nooit zelfstandig afschalen; elk voorstel vereist menselijke bevestiging.",
      "Uitlegbaarheid van het triagevoorstel is voor centralisten belangrijker dan snelheid."
    ],
    gdi: ["NORA", "Diginetwerk"],
    labels: ["Responsible AI", "Veiligheid", "Experimenteel"],
    contactId: "tk", files: DEFAULT_FILES
  },

  /* ---------- Burgergericht (4) ---------- */
  {
    id: "postontzorger", title: "Postontzorger", org: "ICTU", theme: "Burgergericht",
    status: "Lopend", fase: "Proof of concept", start: "01-10-2025", eind: "-", gepubliceerd: "20-10-2025", bijgewerkt: "15-06-2026",
    partners: ["Ministerie van BZK", "Gemeente Amsterdam"],
    kort: "Na een overlijden krijgt de familie vaak een grote berg ingewikkelde post van de overheid. Het project Postontzorger helpt hierbij. Het digitaliseert de post en vertaalt het naar duidelijke acties in een kluis.",
    beschrijving: "De Postontzorger helpt nabestaanden bij het afhandelen van overheidspost na een overlijden. Brieven worden gescand, automatisch geduid en vertaald naar concrete acties met deadlines in een persoonlijke, beveiligde kluis. Nabestaanden zien in één oogopslag wat er moet gebeuren, wat al is afgehandeld en waar ze hulp kunnen krijgen.",
    probleem: "Nabestaanden ontvangen in een emotionele periode tientallen brieven van verschillende overheidsorganisaties, vol jargon en met verschillende deadlines. Hierdoor worden termijnen gemist en ontstaan er schulden of stress.",
    doel: "Een proof of concept waarmee nabestaanden overheidspost digitaal kunnen laten duiden en omzetten in een duidelijk actieoverzicht, getest met 50 huishoudens.",
    lessen: [
      "De doelgroep wil naast digitaal ook telefonisch geholpen kunnen worden; het één sluit het ander niet uit.",
      "Samenwerking met uitvoeringsorganisaties is cruciaal om brieven aan de bron al begrijpelijker te maken."
    ],
    gdi: ["MijnOverheid", "DigiD", "BRP", "Digitoegankelijk"],
    labels: ["Burgers", "Privacy", "Opschalen", "Toegankelijkheid"],
    contactId: "mvd", files: DEFAULT_FILES
  },
  {
    id: "mijn-omgeving-owc", title: "Mijn Omgeving OWC", org: "VNG", theme: "Burgergericht",
    status: "Lopend", fase: "Implementatie", start: "01-06-2025", eind: "-", gepubliceerd: "15-06-2025", bijgewerkt: "20-06-2026",
    partners: ["Gemeente Rotterdam", "Gemeente Groningen"], mine: true,
    kort: "Veel gemeenten bouwen hun eigen online portaal, wat duur en inefficiënt is. Het project OWC helpt hierbij. Het is een portaal dat de gemeente kan gebruiken om bewoners hun eigen zaken te laten regelen.",
    beschrijving: "Mijn Omgeving OWC (Open Webconcept) is een herbruikbaar burgerportaal dat gemeenten gezamenlijk ontwikkelen en delen als open source software. Inwoners kunnen er hun zaken, aanvragen en afspraken inzien en regelen. Elke deelnemende gemeente bespaart ontwikkelkosten en profiteert van elkaars verbeteringen.",
    probleem: "Tientallen gemeenten ontwikkelen los van elkaar vergelijkbare burgerportalen. Dat is duur, traag en leidt tot grote kwaliteitsverschillen in digitale dienstverlening.",
    doel: "Een gezamenlijk open source burgerportaal dat door minimaal tien gemeenten in productie wordt gebruikt, met een gedeelde roadmap en beheerorganisatie.",
    lessen: [
      "Gezamenlijk beheer vraagt om duidelijke afspraken over wie welke features financiert.",
      "Een gedeeld ontwerpsysteem (NL Design System) versnelt de samenwerking aanzienlijk."
    ],
    gdi: ["DigiD", "MijnOverheid", "Open Standaarden", "Digitoegankelijk"],
    labels: ["Burgers", "Service", "Opschalen", "Toegankelijkheid"],
    contactId: "th", files: DEFAULT_FILES
  },
  {
    id: "levensgebeurtenissen-loket", title: "Loket Levensgebeurtenissen", org: "Ministerie van BZK", theme: "Burgergericht",
    status: "Lopend", fase: "Pilot", start: "01-03-2026", eind: "-", gepubliceerd: "10-03-2026", bijgewerkt: "22-06-2026",
    partners: ["SVB", "UWV", "Belastingdienst"],
    kort: "Bij een scheiding of verhuizing moeten burgers bij veel loketten apart iets regelen. Dit project bundelt dat. Eén digitaal loket begeleidt mensen stap voor stap door de hele levensgebeurtenis.",
    beschrijving: "Het Loket Levensgebeurtenissen begeleidt burgers stap voor stap door gebeurtenissen zoals scheiden, verhuizen of werkloos worden. Het loket toont per situatie welke regelzaken er zijn bij welke organisaties, wat de volgorde is en wat al geregeld is.",
    probleem: "Burgers moeten bij een levensgebeurtenis zelf uitzoeken welke overheidsorganisaties iets van hen nodig hebben, met gemiste regelingen en fouten als gevolg.",
    doel: "Een pilotloket voor de levensgebeurtenis 'scheiden' dat aantoonbaar het aantal gemiste regelzaken vermindert.",
    lessen: [
      "De klantreis verschilt sterk per situatie; maatwerk in de volgorde van stappen is noodzakelijk."
    ],
    gdi: ["MijnOverheid", "DigiD", "BRP"],
    labels: ["Burgers", "Dienstverlening", "Ketenpartners"],
    contactId: "dl", files: DEFAULT_FILES
  },
  {
    id: "signalen-sociaal-domein", title: "Vroegsignalering Sociaal Domein", org: "Gemeente Eindhoven", theme: "Burgergericht",
    status: "Gestopt", fase: "Proof of concept", start: "01-05-2025", eind: "01-02-2026", gepubliceerd: "10-05-2025", bijgewerkt: "01-02-2026",
    partners: ["Divosa"],
    kort: "Inwoners met beginnende schulden komen vaak te laat in beeld. Dit project onderzocht vroegsignalering. Door signalen te bundelen kon de gemeente eerder passende hulp aanbieden.",
    beschrijving: "Dit project onderzocht of het bundelen van betaalachterstandssignalen (huur, energie, zorgverzekering) gemeenten helpt om inwoners met beginnende schulden eerder hulp te bieden. Het project is gestopt na de proof of concept.",
    probleem: "Inwoners met schulden melden zich gemiddeld pas na vijf jaar bij schuldhulpverlening, wanneer de problemen al groot zijn.",
    doel: "Toetsen of vroegsignalering op basis van gebundelde signalen leidt tot eerdere en effectievere hulpverlening.",
    lessen: [
      "De juridische grondslag voor het delen van signalen bleek onvoldoende; het project is gestopt in afwachting van nieuwe wetgeving.",
      "Huisbezoeken naar aanleiding van signalen werden door inwoners als betuttelend ervaren wanneer de aanleiding niet duidelijk werd uitgelegd."
    ],
    gdi: ["BRP", "NORA"],
    labels: ["Burgers", "Privacy", "Inclusie"],
    contactId: "sm", files: DEFAULT_FILES
  },

  /* ---------- Data (18) ---------- */
  {
    id: "hallostudent", title: "HalloStudent", org: "Gemeente Rotterdam", theme: "Data",
    status: "Lopend", fase: "Pilot", start: "01-09-2025", eind: "-", gepubliceerd: "01-10-2025", bijgewerkt: "18-06-2026",
    partners: ["DUO", "Hogeschool Rotterdam"],
    kort: "Studenten moeten vaak met fysieke pas bewijzen wie ze zijn voor kortingen. Het project HalloStudent maakt dit makkelijker. Het is een digitale wallet waarmee studenten veilig hun status kunnen delen.",
    beschrijving: "HalloStudent is een digitale wallet waarmee studenten hun studentstatus kunnen aantonen zonder onnodige persoonsgegevens te delen. Op basis van verifieerbare credentials bewijst de student alleen 'ik ben student', zonder naam of geboortedatum prijs te geven. De pilot draait bij Rotterdamse studentenvoorzieningen.",
    probleem: "Studenten moeten voor kortingen en voorzieningen steeds hun volledige identiteitsbewijs of studentenpas tonen, waarbij meer gegevens worden gedeeld dan nodig.",
    doel: "Een werkende wallet-pilot met minimaal 500 studenten en vijf aangesloten voorzieningen, gebaseerd op open standaarden voor verifieerbare credentials.",
    lessen: [
      "Acceptatie bij winkeliers vraagt om een supersimpele controle-app; de techniek achter credentials interesseert hen niet.",
      "Studenten waarderen vooral dat ze geen fysieke pas meer kunnen vergeten."
    ],
    gdi: ["DigiD", "Open Standaarden", "eHerkenning"],
    labels: ["Burgers", "Service", "Inclusiviteit", "Procesinnovatie"],
    contactId: "sm", files: DEFAULT_FILES
  },
  {
    id: "ibro-objecten", title: "IBRO Objecten", org: "Gemeente Rotterdam", theme: "Data",
    status: "Afgerond", fase: "Implementatie", start: "01-01-2025", eind: "01-05-2026", gepubliceerd: "15-01-2025", bijgewerkt: "01-05-2026",
    partners: ["Kadaster", "Geonovum"], mine: true,
    kort: "Gegevens over objecten in de stad staan verspreid over losse registraties. IBRO brengt ze samen. Eén samenhangende objectenregistratie geeft de stad actueel inzicht in de buitenruimte.",
    beschrijving: "IBRO Objecten koppelt gemeentelijke registraties van objecten in de buitenruimte (lantaarnpalen, bomen, riolering) aan de landelijke basisregistraties. Hierdoor ontstaat één actueel en samenhangend beeld van de stad, als voorbereiding op de landelijke Samenhangende Objectenregistratie.",
    probleem: "Objectgegevens staan versnipperd over tientallen systemen met eigen definities, waardoor beheerafdelingen met verouderde of tegenstrijdige informatie werken.",
    doel: "Eén gekoppelde objectenregistratie voor de buitenruimte van Rotterdam, aangesloten op landelijke standaarden.",
    lessen: [
      "Het harmoniseren van definities kostte meer tijd dan de technische koppeling zelf.",
      "Vroegtijdige betrokkenheid van beheerafdelingen voorkomt dat de registratie na oplevering veroudert."
    ],
    gdi: ["Haal Centraal", "Open Standaarden", "NORA"],
    labels: ["Data", "Ketenpartners", "Efficiëntie"],
    contactId: "gdz", files: DEFAULT_FILES
  },
  {
    id: "federatief-datastelsel", title: "Federatief Datastelsel", org: "CBS", theme: "Data",
    status: "Lopend", fase: "Pilot", start: "01-02-2025", eind: "-", gepubliceerd: "15-02-2025", bijgewerkt: "10-06-2026",
    partners: ["ICTU", "Ministerie van BZK", "Logius"],
    kort: "Overheden kopiëren data vaak naar elkaar, met fouten en verouderde gegevens als gevolg. Dit project pakt dat aan. Data blijft bij de bron en wordt via afspraken veilig gedeeld.",
    beschrijving: "Het Federatief Datastelsel maakt het mogelijk dat overheidsorganisaties data bij de bron laten staan en via gestandaardiseerde afspraken en API's delen. Dit voorkomt kopieën, verkleint privacyrisico's en zorgt dat iedereen met actuele gegevens werkt.",
    probleem: "Overheden wisselen data uit door bestanden te kopiëren. Kopieën verouderen, bevatten fouten en vergroten het risico op datalekken.",
    doel: "Werkende afspraken en techniek waarmee drie overheidsorganisaties in een pilot data bij de bron delen volgens het federatieve model.",
    lessen: [
      "Bestuurlijke afspraken over dataverantwoordelijkheid zijn complexer dan de technische realisatie.",
      "Een gezamenlijke begrippenlijst voorkomt veel misverstanden tussen ketenpartners."
    ],
    gdi: ["Diginetwerk", "Haal Centraal", "NORA", "Open Standaarden"],
    labels: ["Data", "Datadeling", "Ketenpartners", "Privacy"],
    contactId: "tdv", files: DEFAULT_FILES
  },
  {
    id: "regie-op-gegevens", title: "Regie op Gegevens", org: "Ministerie van BZK", theme: "Data",
    status: "Lopend", fase: "Proof of concept", start: "01-01-2026", eind: "-", gepubliceerd: "10-01-2026", bijgewerkt: "15-06-2026",
    partners: ["Logius", "RvIG"],
    kort: "Burgers weten niet welke gegevens de overheid over hen deelt. Dit project geeft regie terug. Inwoners zien welke gegevens gedeeld worden en kunnen daar zelf toestemming voor geven.",
    beschrijving: "Regie op Gegevens ontwikkelt een inzage- en toestemmingsvoorziening waarmee burgers kunnen zien welke overheidsorganisaties hun gegevens gebruiken en waarvoor. Bij niet-wettelijke uitwisselingen kan de burger zelf toestemming geven of intrekken.",
    probleem: "Burgers hebben geen zicht op welke gegevens de overheid over hen deelt en kunnen daar geen invloed op uitoefenen, wat het vertrouwen in de digitale overheid schaadt.",
    doel: "Een proof of concept waarin burgers voor twee gegevensstromen inzage krijgen en toestemming kunnen beheren.",
    lessen: [
      "Begrijpelijke taal over gegevensstromen is minstens zo belangrijk als de techniek."
    ],
    gdi: ["MijnOverheid", "DigiD", "BRP"],
    labels: ["Privacy", "Transparantie", "Burgers"],
    contactId: "bm", files: DEFAULT_FILES
  },
  {
    id: "sensordata-platform", title: "Sensordata Platform Wegen", org: "Rijkswaterstaat", theme: "Data",
    status: "Lopend", fase: "Implementatie", start: "01-04-2025", eind: "-", gepubliceerd: "10-04-2025", bijgewerkt: "20-06-2026",
    partners: ["Provincie Zuid-Holland"],
    kort: "Wegonderhoud gebeurt nu op vaste momenten, ook als het niet nodig is. Sensoren veranderen dat. Realtime data voorspelt slijtage zodat onderhoud precies op tijd gebeurt.",
    beschrijving: "Het Sensordata Platform verzamelt data van sensoren in wegdek en kunstwerken en voorspelt met modellen wanneer onderhoud nodig is. Zo verschuift onderhoud van vaste intervallen naar voorspelbaar maatwerk, wat kosten en files bespaart.",
    probleem: "Periodiek onderhoud aan wegen gebeurt op vaste intervallen: soms te vroeg (verspilling), soms te laat (schade en onveiligheid).",
    doel: "Voorspellend onderhoud voor 200 kilometer rijksweg met aantoonbaar minder onnodige onderhoudsmomenten.",
    lessen: [
      "De kwaliteit van oudere sensoren wisselt sterk; datavalidatie aan de poort is onmisbaar.",
      "Beheerders vertrouwen voorspellingen pas na een periode van parallel draaien met de oude planning."
    ],
    gdi: ["NORA", "Open Standaarden"],
    labels: ["Data", "Efficiëntie", "Duurzaamheid"],
    contactId: "sh", files: DEFAULT_FILES
  },
  {
    id: "woo-publicatieplatform", title: "Woo Publicatieplatform", org: "KOOP", theme: "Data",
    status: "Lopend", fase: "Implementatie", start: "01-03-2025", eind: "-", gepubliceerd: "15-03-2025", bijgewerkt: "12-06-2026",
    partners: ["Ministerie van BZK"],
    kort: "Overheidsdocumenten actief openbaar maken is voor veel organisaties nog handwerk. Dit platform automatiseert dat. Documenten worden vindbaar en doorzoekbaar gepubliceerd.",
    beschrijving: "Het Woo Publicatieplatform helpt overheidsorganisaties om documenten die onder de Wet open overheid vallen geautomatiseerd, vindbaar en geanonimiseerd te publiceren. Het platform bevat hulpmiddelen voor anonimisering en metadatering.",
    probleem: "Actieve openbaarmaking onder de Woo is arbeidsintensief handwerk, waardoor organisaties achterlopen op hun publicatieverplichtingen.",
    doel: "Een platform waarmee aangesloten organisaties Woo-documenten binnen twee weken na besluit publiceren.",
    lessen: [
      "Automatische anonimisering vereist altijd een menselijke eindcontrole.",
      "Goede metadata bij de bron scheelt veel werk achteraf."
    ],
    gdi: ["Open Standaarden", "Digitoegankelijk", "PKI-overheid"],
    labels: ["Transparantie", "Data", "Compliance"],
    contactId: "rs", files: DEFAULT_FILES
  },
  {
    id: "energiearmoede-monitor", title: "Monitor Energiearmoede", org: "CBS", theme: "Data",
    status: "Afgerond", fase: "Opgeschaald", start: "01-01-2025", eind: "01-01-2026", gepubliceerd: "10-01-2025", bijgewerkt: "01-01-2026",
    partners: ["TNO", "Gemeente Groningen"],
    kort: "Gemeenten wisten niet precies waar energiearmoede speelt. Deze monitor brengt dat in beeld. Wijkdata helpt gemeenten om hulp gericht aan te bieden.",
    beschrijving: "De Monitor Energiearmoede combineert CBS-microdata over inkomens, energieverbruik en woningkwaliteit tot een wijkgerichte kaart van energiearmoede. Gemeenten gebruiken de monitor om isolatiesubsidies en hulp gericht in te zetten.",
    probleem: "Zonder betrouwbare wijkdata zetten gemeenten energiehulp generiek in, waardoor de huishoudens die het hardst hulp nodig hebben niet altijd bereikt worden.",
    doel: "Een landelijk dekkende, jaarlijks geactualiseerde monitor op wijkniveau, beschikbaar voor alle gemeenten.",
    lessen: [
      "Privacybescherming vereist aggregatie; op huishoudniveau publiceren is niet mogelijk en ook niet nodig voor gericht beleid."
    ],
    gdi: ["NORA", "Open Standaarden"],
    labels: ["Data", "Inclusie", "Duurzaamheid"],
    contactId: "jb", files: DEFAULT_FILES
  },
  {
    id: "haal-centraal-brp", title: "Haal Centraal BRP Bevragen", org: "RvIG", theme: "Data",
    status: "Lopend", fase: "Opgeschaald", start: "01-01-2025", eind: "-", gepubliceerd: "05-01-2025", bijgewerkt: "18-06-2026",
    partners: ["VNG", "Gemeenten"],
    kort: "Organisaties kopiëren persoonsgegevens uit de BRP naar eigen systemen. Deze API voorkomt dat. Gegevens worden rechtstreeks en actueel bij de bron opgevraagd.",
    beschrijving: "Haal Centraal BRP Bevragen is een moderne REST-API waarmee overheidsorganisaties persoonsgegevens rechtstreeks bij de Basisregistratie Personen opvragen, in plaats van eigen kopieën bij te houden. Dit verkleint privacyrisico's en verbetert de actualiteit.",
    probleem: "Honderden organisaties houden eigen kopieën van BRP-gegevens bij, met verouderde gegevens en onnodige privacyrisico's tot gevolg.",
    doel: "Brede adoptie van bevragen-bij-de-bron: 100 aangesloten organisaties die hun lokale kopieën uitfaseren.",
    lessen: [
      "Aansluiten is voor kleine organisaties pas haalbaar met goede referentie-implementaties en documentatie."
    ],
    gdi: ["Haal Centraal", "BRP", "Diginetwerk", "PKI-overheid"],
    labels: ["Data", "API's", "Privacy", "Opschalen"],
    contactId: "tdv", files: DEFAULT_FILES
  },
  {
    id: "zaakgericht-datadelen", title: "Zaakgericht Datadelen Omgevingswet", org: "VNG", theme: "Data",
    status: "Lopend", fase: "Pilot", start: "01-05-2025", eind: "-", gepubliceerd: "15-05-2025", bijgewerkt: "10-06-2026",
    partners: ["Gemeenten", "Omgevingsdiensten"],
    kort: "Bij vergunningen werken gemeente en omgevingsdienst in gescheiden systemen. Dit project verbindt ze. Zaakinformatie stroomt automatisch mee in de keten.",
    beschrijving: "Dit project realiseert gestandaardiseerde uitwisseling van zaakinformatie tussen gemeenten en omgevingsdiensten bij vergunningverlening onder de Omgevingswet, op basis van de ZGW-API's.",
    probleem: "Zaakinformatie wordt tussen ketenpartners per mail en telefoon uitgewisseld, met vertraging en fouten in vergunningsprocedures als gevolg.",
    doel: "Automatische zaakuitwisseling tussen tien gemeenten en hun omgevingsdiensten via ZGW-API's.",
    lessen: [
      "Verschillen in zaaktypecatalogi tussen organisaties zijn de grootste hobbel; standaardisatie vooraf loont."
    ],
    gdi: ["Open Standaarden", "Diginetwerk", "NORA"],
    labels: ["Ketenpartners", "API's", "Procesinnovatie"],
    contactId: "th", files: DEFAULT_FILES
  },
  {
    id: "datalab-jeugdzorg", title: "Datalab Wachttijden Jeugdzorg", org: "Gemeente Utrecht", theme: "Data",
    status: "Lopend", fase: "Proof of concept", start: "01-02-2026", eind: "-", gepubliceerd: "15-02-2026", bijgewerkt: "20-06-2026",
    partners: ["Jeugdzorgaanbieders regio Utrecht"],
    kort: "Wachttijden in de jeugdzorg zijn slecht inzichtelijk. Dit datalab verandert dat. Gezamenlijke data toont knelpunten zodat gericht bijgestuurd kan worden.",
    beschrijving: "In dit datalab delen gemeente en jeugdzorgaanbieders geanonimiseerde wachttijddata om knelpunten in de instroom en doorstroom zichtbaar te maken. Het dashboard ondersteunt gezamenlijke stuurgesprekken.",
    probleem: "Niemand heeft regionaal overzicht van wachttijden in de jeugdzorg, waardoor bijsturing op onderbuikgevoel gebeurt.",
    doel: "Een gedeeld wachttijdendashboard voor de regio dat maandelijks wordt geactualiseerd en aantoonbaar gebruikt wordt in stuurgesprekken.",
    lessen: [
      "Definitieverschillen ('wat telt als wachttijd?') moesten eerst geharmoniseerd worden."
    ],
    gdi: ["NORA"],
    labels: ["Data", "Datadeling", "Samenwerking"],
    contactId: "dl", files: DEFAULT_FILES
  },
  {
    id: "open-data-portaal", title: "Open Data Portaal 2.0", org: "Gemeente Amsterdam", theme: "Data",
    status: "Afgerond", fase: "Implementatie", start: "01-01-2025", eind: "01-03-2026", gepubliceerd: "15-01-2025", bijgewerkt: "01-03-2026",
    partners: ["Datateam Amsterdam"],
    kort: "Open datasets waren moeilijk vindbaar en vaak verouderd. Het vernieuwde portaal lost dit op. Actuele datasets met goede metadata zijn nu voor iedereen bruikbaar.",
    beschrijving: "Het vernieuwde open data portaal publiceert gemeentelijke datasets met gestandaardiseerde metadata, automatische actualisatie vanuit bronsystemen en gebruiksstatistieken. Ontwikkelaars en onderzoekers vinden sneller de juiste data.",
    probleem: "Datasets op het oude portaal waren handmatig geüpload, vaak verouderd en slecht gedocumenteerd, waardoor hergebruik laag bleef.",
    doel: "Een portaal met geautomatiseerde publicatie waarbij 80% van de datasets maximaal een maand oud is.",
    lessen: [
      "Automatische koppelingen met bronsystemen zijn de enige duurzame manier om data actueel te houden."
    ],
    gdi: ["Open Standaarden", "Digitoegankelijk"],
    labels: ["Data", "Transparantie", "Open standaarden"],
    contactId: "tk", files: DEFAULT_FILES
  },
  {
    id: "geo-tweelingstad", title: "Digitale Tweelingstad", org: "Geonovum", theme: "Data",
    status: "Lopend", fase: "Pilot", start: "01-06-2025", eind: "-", gepubliceerd: "20-06-2025", bijgewerkt: "15-06-2026",
    partners: ["Gemeente Den Haag", "TU Delft"],
    kort: "Ruimtelijke plannen zijn op papier lastig te beoordelen. De digitale tweeling helpt. Een 3D-stadsmodel laat effecten van plannen vooraf zien.",
    beschrijving: "De Digitale Tweelingstad is een 3D-model van de stad waarin ruimtelijke plannen gesimuleerd kunnen worden: schaduwwerking, geluid, waterafvoer en verkeer. Beleidsmakers en bewoners beoordelen plannen zo op feiten in plaats van artist impressions.",
    probleem: "Effecten van ruimtelijke ingrepen worden pas na realisatie echt duidelijk, met dure aanpassingen en maatschappelijke weerstand tot gevolg.",
    doel: "Een 3D-stadsmodel waarin drie geplande gebiedsontwikkelingen met bewoners zijn doorgerekend en besproken.",
    lessen: [
      "Bewoners begrijpen 3D-simulaties veel beter dan plankaarten; participatie verbetert aantoonbaar."
    ],
    gdi: ["Open Standaarden", "NORA"],
    labels: ["Data", "Transparantie", "Burgers"],
    contactId: "pvr", files: DEFAULT_FILES
  },
  {
    id: "ketenmonitor-strafrecht", title: "Ketenmonitor Strafrecht", org: "Justid", theme: "Data",
    status: "Lopend", fase: "Implementatie", start: "01-02-2025", eind: "-", gepubliceerd: "10-02-2025", bijgewerkt: "05-06-2026",
    partners: ["OM", "Rechtspraak", "CJIB"],
    kort: "Strafzaken lopen vertraging op zonder dat de keten ziet waar het knelt. De ketenmonitor toont dit. Doorlooptijden per schakel maken gerichte verbetering mogelijk.",
    beschrijving: "De Ketenmonitor Strafrecht koppelt geanonimiseerde doorlooptijddata van politie, OM, rechtspraak en CJIB, zodat ketenpartners zien waar zaken vertragen en gezamenlijk kunnen verbeteren.",
    probleem: "Elke organisatie in de strafrechtketen kent alleen de eigen doorlooptijden, waardoor ketenbrede knelpunten onzichtbaar blijven.",
    doel: "Een maandelijks geactualiseerde ketenmonitor die door alle vier de ketenpartners wordt gebruikt in de gezamenlijke stuurcyclus.",
    lessen: [
      "Het koppelen van zaaknummers over organisatiegrenzen heen bleek de grootste technische uitdaging."
    ],
    gdi: ["Diginetwerk", "NORA", "PKI-overheid"],
    labels: ["Ketenpartners", "Data", "Efficiëntie"],
    contactId: "kj", files: DEFAULT_FILES
  },
  {
    id: "subsidieregister", title: "Landelijk Subsidieregister", org: "Ministerie van Financiën", theme: "Data",
    status: "Lopend", fase: "Proof of concept", start: "01-04-2026", eind: "-", gepubliceerd: "15-04-2026", bijgewerkt: "25-06-2026",
    partners: ["RVO", "Belastingdienst"],
    kort: "Subsidiegegevens staan verspreid en zijn moeilijk vergelijkbaar. Dit register bundelt ze. Eén doorzoekbaar overzicht toont wie welke subsidie ontvangt.",
    beschrijving: "Het Landelijk Subsidieregister bundelt subsidieverstrekkingen van rijksorganisaties in één doorzoekbaar, openbaar register met gestandaardiseerde gegevens per verstrekking.",
    probleem: "Subsidiegegevens zijn verspreid over jaarverslagen en losse registers, waardoor stapeling en misbruik lastig te detecteren zijn en verantwoording versnipperd is.",
    doel: "Een proof of concept met de subsidiedata van drie departementen in één register, inclusief openbare zoekfunctie.",
    lessen: [
      "Verschillen in registratiepraktijk tussen departementen vragen om een gezamenlijke gegevensstandaard als eerste stap."
    ],
    gdi: ["Open Standaarden", "Digipoort"],
    labels: ["Transparantie", "Data", "Compliance"],
    contactId: "rs", files: DEFAULT_FILES
  },
  {
    id: "afvalstromen-inzicht", title: "Inzicht in Afvalstromen", org: "Gemeente Groningen", theme: "Data",
    status: "Afgerond", fase: "Pilot", start: "01-03-2025", eind: "01-12-2025", gepubliceerd: "10-03-2025", bijgewerkt: "01-12-2025",
    partners: ["Afvalbeheer Noord"],
    kort: "Afvalinzameling reed vaste routes, ook langs lege containers. Sensoren veranderen dat. Vulgraaddata maakt routes korter en schoner.",
    beschrijving: "Sensoren in ondergrondse containers meten de vulgraad. Een planningsalgoritme berekent dagelijks optimale inzamelroutes. De pilot verminderde het aantal ritten met 22%.",
    probleem: "Vaste inzamelroutes betekenen onnodige ritten langs halfvolle containers én overvolle containers die te laat geleegd worden.",
    doel: "Dynamische routeplanning op basis van vulgraaddata met minimaal 15% minder ritten.",
    lessen: [
      "Sensoren in vochtige containers vielen vaker uit dan verwacht; robuuste hardware is het halve werk."
    ],
    gdi: ["NORA"],
    labels: ["Data", "Duurzaamheid", "Efficiëntie"],
    contactId: "sh", files: DEFAULT_FILES
  },
  {
    id: "onderwijsdata-dashboard", title: "Onderwijsdata in Beeld", org: "DUO", theme: "Data",
    status: "Lopend", fase: "Implementatie", start: "01-01-2026", eind: "-", gepubliceerd: "15-01-2026", bijgewerkt: "10-06-2026",
    partners: ["Ministerie van OCW"],
    kort: "Schoolbesturen vragen los van elkaar dezelfde cijfers op bij DUO. Dit dashboard voorkomt dat. Actuele onderwijsdata is nu zelf te raadplegen.",
    beschrijving: "Onderwijsdata in Beeld is een selfservice-dashboard waarin schoolbesturen en gemeenten actuele cijfers over leerlingenaantallen, bekostiging en verzuim kunnen raadplegen, met exportmogelijkheden en API-toegang.",
    probleem: "Informatieverzoeken aan DUO nemen jaarlijks toe; besturen wachten weken op cijfers die feitelijk al beschikbaar zijn.",
    doel: "Zelfservice-toegang tot de tien meest gevraagde datasets, met halvering van het aantal individuele informatieverzoeken.",
    lessen: [
      "Gebruikers willen naast kant-en-klare dashboards ook ruwe data via een API kunnen afnemen."
    ],
    gdi: ["Open Standaarden", "eHerkenning"],
    labels: ["Data", "Service", "Efficiëntie"],
    contactId: "kj", files: DEFAULT_FILES
  },
  {
    id: "waterkwaliteit-realtime", title: "Realtime Waterkwaliteit", org: "RIVM", theme: "Data",
    status: "Lopend", fase: "Pilot", start: "01-05-2026", eind: "-", gepubliceerd: "20-05-2026", bijgewerkt: "28-06-2026",
    partners: ["Waterschappen", "Rijkswaterstaat"],
    kort: "Zwemwaterkwaliteit wordt nu wekelijks handmatig gemeten. Sensoren maken dit realtime. Zwemmers en beheerders zien direct of het water veilig is.",
    beschrijving: "Dit project plaatst sensoren op zwemwaterlocaties die continu waterkwaliteit meten. Een open dataportaal en publiekskaart tonen realtime of zwemwater veilig is, met automatische waarschuwingen bij overschrijdingen.",
    probleem: "Wekelijkse handmatige metingen betekenen dat verontreinigingen dagenlang onopgemerkt blijven en zwemadviezen achterlopen op de werkelijkheid.",
    doel: "Realtime monitoring op 25 zwemlocaties met een publiek toegankelijke kaart en open API.",
    lessen: [
      "Communicatie over meetonzekerheid is belangrijk: één afwijkende meting is nog geen verontreiniging."
    ],
    gdi: ["Open Standaarden", "NORA"],
    labels: ["Data", "Burgers", "Duurzaamheid"],
    contactId: "pvr", files: DEFAULT_FILES
  },
  {
    id: "woningdata-corporaties", title: "Datadeling Woningcorporaties", org: "Ministerie van VRO", theme: "Data",
    status: "On hold", fase: "Idee", start: "01-03-2026", eind: "-", gepubliceerd: "10-03-2026", bijgewerkt: "01-06-2026",
    partners: ["Aedes", "Woningcorporaties"],
    kort: "Woningzoekenden vullen bij elke corporatie opnieuw gegevens in. Dit project onderzoekt delen. Eén profiel zou inschrijven bij alle corporaties mogelijk maken.",
    beschrijving: "Verkenning naar een gedeeld inschrijfprofiel voor woningzoekenden, waarmee gegevens eenmalig worden vastgelegd en met toestemming gedeeld worden met woningcorporaties in meerdere regio's.",
    probleem: "Woningzoekenden beheren inschrijvingen bij tientallen corporaties met elk hun eigen portaal, gegevens en verlengingsregels.",
    doel: "Een haalbaarheidsonderzoek naar één gedeeld inschrijfprofiel, inclusief juridische en technische randvoorwaarden.",
    lessen: [
      "Het project wacht op landelijke besluitvorming over de inrichting van woonruimteverdeling."
    ],
    gdi: ["DigiD", "MijnOverheid"],
    labels: ["Burgers", "Datadeling", "Service"],
    contactId: "bm", files: DEFAULT_FILES
  },

  /* ---------- Digitale weerbaarheid (8) ---------- */
  {
    id: "vim-veilig-mailen", title: "VIM Veilig Mailen", org: "Gemeente Nijmegen", theme: "Digitale weerbaarheid",
    status: "Lopend", fase: "Implementatie", start: "01-11-2025", eind: "-", gepubliceerd: "15-11-2025", bijgewerkt: "22-06-2026",
    partners: ["IBD", "VNG"], mine: true,
    kort: "Het sturen van gevoelige informatie via e-mail is niet veilig genoeg voor de overheid. Het project VIM biedt een oplossing. Het is een tool waarmee ambtenaren en burgers veilig documenten kunnen uitwisselen.",
    beschrijving: "VIM (Veilige Informatie-uitwisseling via Mail) zorgt dat medewerkers gevoelige documenten versleuteld kunnen delen met burgers en ketenpartners, zonder dat de ontvanger speciale software nodig heeft. De oplossing voldoet aan de NTA 7516-norm.",
    probleem: "Medewerkers mailen gevoelige gegevens onversleuteld of wijken uit naar schaduw-IT zoals privé-clouddiensten, met datalekken tot gevolg.",
    doel: "Organisatiebrede uitrol van veilig mailen waarbij 95% van de gevoelige uitwisselingen via het beveiligde kanaal loopt.",
    lessen: [
      "Gebruiksgemak bepaalt de adoptie: elke extra klik leidt tot omzeilgedrag.",
      "Duidelijke afspraken over wat 'gevoelig' is voorkomen zowel onder- als overgebruik."
    ],
    gdi: ["PKI-overheid", "Diginetwerk", "NORA"],
    labels: ["Intern", "Privacy", "Weerbaarheid", "Technisch"],
    contactId: "ak", files: DEFAULT_FILES
  },
  {
    id: "doriath-vault", title: "Doriath Vault", org: "Digilab", theme: "Digitale weerbaarheid",
    status: "Gestopt", fase: "Proof of concept", start: "01-06-2025", eind: "01-03-2026", gepubliceerd: "15-06-2025", bijgewerkt: "01-03-2026",
    partners: ["Logius"], mine: true,
    kort: "Geheimen zoals wachtwoorden en sleutels zwerven soms door systemen. Doriath Vault centraliseert dit. Eén kluis beheert alle geheimen van applicaties veilig.",
    beschrijving: "Doriath Vault was een proof of concept voor centraal geheimenbeheer (secrets management) voor overheidsapplicaties: API-sleutels, certificaten en wachtwoorden in één beheerde kluis met automatische rotatie.",
    probleem: "Applicatiegeheimen staan verspreid in configuratiebestanden en code-repositories, wat een groot beveiligingsrisico vormt.",
    doel: "Aantonen dat centraal geheimenbeheer met automatische rotatie werkbaar is voor drie bestaande applicaties.",
    lessen: [
      "De proof of concept slaagde technisch, maar het beheer bleek beter belegd bij een bestaande landelijke voorziening; het project is daarom gestopt.",
      "Automatische rotatie vereist dat applicaties hier vanaf het begin op ontworpen zijn."
    ],
    gdi: ["PKI-overheid", "Standaardplatform"],
    labels: ["Technisch", "Weerbaarheid", "Intern"],
    contactId: "bm", files: DEFAULT_FILES
  },
  {
    id: "phishing-simulatie", title: "Phishing Weerbaarheidsprogramma", org: "Belastingdienst", theme: "Digitale weerbaarheid",
    status: "Lopend", fase: "Opgeschaald", start: "01-01-2025", eind: "-", gepubliceerd: "10-01-2025", bijgewerkt: "15-06-2026",
    partners: ["NCSC"],
    kort: "Phishing blijft de grootste ingang voor aanvallers. Dit programma traint medewerkers. Realistische oefeningen maken de organisatie aantoonbaar weerbaarder.",
    beschrijving: "Het Phishing Weerbaarheidsprogramma combineert periodieke phishing-simulaties met gerichte microtrainingen. Medewerkers die klikken krijgen direct lesmateriaal; teams zien geanonimiseerde voortgang.",
    probleem: "Ondanks technische maatregelen blijft phishing succesvol doordat medewerkers kwaadaardige mails onvoldoende herkennen.",
    doel: "Het klikpercentage op phishing-simulaties structureel onder de 5% brengen en het meldpercentage boven de 60%.",
    lessen: [
      "Melden belonen werkt beter dan klikken bestraffen.",
      "Simulaties moeten variëren in moeilijkheid; te makkelijke oefeningen creëren schijnveiligheid."
    ],
    gdi: ["NORA"],
    labels: ["Weerbaarheid", "Intern", "Digitaal vakmanschap"],
    contactId: "ak", files: DEFAULT_FILES
  },
  {
    id: "soc-gemeenten", title: "Gezamenlijk SOC Gemeenten", org: "IBD", theme: "Digitale weerbaarheid",
    status: "Lopend", fase: "Pilot", start: "01-09-2025", eind: "-", gepubliceerd: "20-09-2025", bijgewerkt: "20-06-2026",
    partners: ["VNG", "Vijf pilotgemeenten"],
    kort: "Kleine gemeenten kunnen geen eigen security-team betalen. Dit project bundelt krachten. Eén gezamenlijk centrum bewaakt de systemen van meerdere gemeenten.",
    beschrijving: "Vijf gemeenten delen in deze pilot één Security Operations Center dat 24/7 hun netwerken monitort, dreigingen detecteert en incidentrespons coördineert. De pilot onderzoekt het kostenmodel voor landelijke opschaling.",
    probleem: "Individuele gemeenten missen de schaal en het budget voor continue securitymonitoring, terwijl aanvallen op gemeenten toenemen.",
    doel: "Een werkend gedeeld SOC voor vijf gemeenten met een gevalideerd kostenmodel voor opschaling naar vijftig gemeenten.",
    lessen: [
      "Uniformering van logging bij deelnemende gemeenten is een voorwaarde om centraal te kunnen detecteren."
    ],
    gdi: ["Diginetwerk", "NORA"],
    labels: ["Weerbaarheid", "Samenwerking", "Opschalen"],
    contactId: "ak", files: DEFAULT_FILES
  },
  {
    id: "quantum-veilige-crypto", title: "Quantum-veilige Cryptografie", org: "AIVD", theme: "Digitale weerbaarheid",
    status: "Lopend", fase: "Proof of concept", start: "01-02-2026", eind: "-", gepubliceerd: "15-02-2026", bijgewerkt: "10-06-2026",
    partners: ["TNO", "CWI"],
    kort: "Quantumcomputers kunnen huidige versleuteling straks breken. Dit project bereidt de overheid voor. Systemen migreren stapsgewijs naar quantum-veilige algoritmen.",
    beschrijving: "Dit project inventariseert welke overheidssystemen kwetsbaar zijn voor toekomstige quantumaanvallen en test migratiepaden naar post-quantum cryptografie op twee representatieve systemen.",
    probleem: "Versleutelde overheidsdata die nu wordt onderschept, kan over enkele jaren met quantumcomputers alsnog ontsleuteld worden ('harvest now, decrypt later').",
    doel: "Een migratiedraaiboek voor post-quantum cryptografie, getoetst op twee productiesystemen.",
    lessen: [
      "Crypto-agility (makkelijk kunnen wisselen van algoritme) blijkt belangrijker dan de keuze voor één specifiek algoritme."
    ],
    gdi: ["PKI-overheid", "NORA"],
    labels: ["Technisch", "Weerbaarheid", "Experimenteel"],
    contactId: "kj", files: DEFAULT_FILES
  },
  {
    id: "ddos-schild", title: "Nationaal DDoS-schild", org: "NBIP", theme: "Digitale weerbaarheid",
    status: "Afgerond", fase: "Opgeschaald", start: "01-01-2025", eind: "01-04-2026", gepubliceerd: "10-01-2025", bijgewerkt: "01-04-2026",
    partners: ["NCSC", "Internetproviders"],
    kort: "DDoS-aanvallen leggen overheidswebsites plat. Het schild beschermt gezamenlijk. Aanvalsverkeer wordt gedeeld gefilterd voordat het organisaties raakt.",
    beschrijving: "Het Nationaal DDoS-schild is een gezamenlijke wasstraat die aanvalsverkeer filtert voor aangesloten overheidsorganisaties. Deelnemers delen aanvalskenmerken zodat het schild steeds sneller reageert.",
    probleem: "Individuele organisaties zijn niet opgewassen tegen grootschalige DDoS-aanvallen, met uitval van digitale dienstverlening als gevolg.",
    doel: "Aansluiting van 75 overheidsorganisaties met een gemiddelde mitigatietijd onder de vijf minuten.",
    lessen: [
      "Het delen van aanvalskenmerken tussen deelnemers versnelt de detectie voor iedereen."
    ],
    gdi: ["Diginetwerk", "NORA"],
    labels: ["Weerbaarheid", "Samenwerking", "Opschalen"],
    contactId: "ak", files: DEFAULT_FILES
  },
  {
    id: "red-teaming-programma", title: "Ethisch Hacken Programma", org: "Ministerie van BZK", theme: "Digitale weerbaarheid",
    status: "Lopend", fase: "Implementatie", start: "01-03-2025", eind: "-", gepubliceerd: "15-03-2025", bijgewerkt: "18-06-2026",
    partners: ["NCSC", "Rijksorganisaties"],
    kort: "Kwetsbaarheden worden vaak pas na incidenten ontdekt. Dit programma test proactief. Ethische hackers zoeken zwakke plekken vóór kwaadwillenden dat doen.",
    beschrijving: "Het Ethisch Hacken Programma organiseert gecoördineerde red team-oefeningen bij rijksorganisaties. Bevindingen worden vertrouwelijk gedeeld via een gestandaardiseerd format zodat andere organisaties dezelfde zwakke plekken kunnen dichten.",
    probleem: "Overheidsorganisaties kennen hun eigen zwakke plekken onvoldoende en leren te weinig van elkaars kwetsbaarheden.",
    doel: "Jaarlijkse red team-oefeningen bij twintig rijksorganisaties met gedeelde, geanonimiseerde lessen.",
    lessen: [
      "De grootste winst zit in het delen van bevindingen: 60% van de kwetsbaarheden kwam bij meerdere organisaties voor."
    ],
    gdi: ["NORA", "PKI-overheid"],
    labels: ["Weerbaarheid", "Samenwerking", "Toezicht"],
    contactId: "kj", files: DEFAULT_FILES
  },
  {
    id: "veilige-videoconferencing", title: "Soevereine Videoconferencing", org: "SSC-ICT", theme: "Digitale weerbaarheid",
    status: "Lopend", fase: "Pilot", start: "01-01-2026", eind: "-", gepubliceerd: "20-01-2026", bijgewerkt: "25-06-2026",
    partners: ["Ministerie van BZK", "Defensie"],
    kort: "Vertrouwelijke overleggen lopen via buitenlandse clouddiensten. Dit project biedt een alternatief. Een eigen videodienst houdt gevoelige gesprekken binnen de overheid.",
    beschrijving: "Dit project realiseert een videoconferencingdienst op eigen overheidsinfrastructuur, gebaseerd op open source software, voor vertrouwelijke overleggen tot en met rubricering departementaal vertrouwelijk.",
    probleem: "Vertrouwelijke overheidsoverleggen lopen via commerciële clouddiensten waarvan de datastromen buiten Nederlandse jurisdictie vallen.",
    doel: "Een gecertificeerde videodienst voor vertrouwelijke overleggen, in pilot bij twee departementen.",
    lessen: [
      "Gebruikers vergelijken de ervaring onvermijdelijk met commerciële diensten; kwaliteit van beeld en geluid is doorslaggevend voor acceptatie."
    ],
    gdi: ["Diginetwerk", "PKI-overheid", "Standaardplatform"],
    labels: ["Autonomie", "Weerbaarheid", "Intern"],
    contactId: "tdv", files: DEFAULT_FILES
  },

  /* ---------- Digitaal vakmanschap (6) ---------- */
  {
    id: "rovis-visualisatie", title: "ROvis Visualisatie", org: "RIVM", theme: "Digitaal vakmanschap",
    status: "Afgerond", fase: "Pilot", start: "01-04-2025", eind: "01-06-2026", gepubliceerd: "15-04-2025", bijgewerkt: "01-06-2026",
    partners: ["Universiteit Utrecht"], mine: true,
    kort: "Onderzoeksdata van het RIVM is voor beleidsmakers vaak te technisch. ROvis vertaalt dit. Interactieve visualisaties maken cijfers begrijpelijk voor iedereen.",
    beschrijving: "ROvis is een visualisatieplatform waarmee RIVM-onderzoekers zonder programmeerkennis interactieve datavisualisaties maken voor beleidsmakers en publiek. Het platform bevat toegankelijke standaardgrafieken die voldoen aan de digitoegankelijkheidseisen.",
    probleem: "Onderzoeksresultaten bereiken beleidsmakers als dikke rapporten met statische tabellen, waardoor inzichten onderbenut blijven.",
    doel: "Een visualisatieplatform waarmee onderzoekers zelfstandig toegankelijke, interactieve visualisaties publiceren.",
    lessen: [
      "Een beperkte set goede standaardgrafieken werkt beter dan onbeperkte vrijheid.",
      "Digitoegankelijkheid moet in de standaardcomponenten zitten, niet achteraf toegevoegd worden."
    ],
    gdi: ["Digitoegankelijk", "Open Standaarden"],
    labels: ["Data", "Digitaal vakmanschap", "Transparantie"],
    contactId: "pvr", files: DEFAULT_FILES
  },
  {
    id: "i-vakmanschap-academie", title: "Rijksacademie voor Digitalisering", org: "Ministerie van BZK", theme: "Digitaal vakmanschap",
    status: "Lopend", fase: "Opgeschaald", start: "01-01-2025", eind: "-", gepubliceerd: "10-01-2025", bijgewerkt: "20-06-2026",
    partners: ["Rijksorganisaties"],
    kort: "Digitale kennis van ambtenaren blijft achter bij de praktijk. De academie verandert dat. Praktijkgerichte leerpaden maken de hele rijksdienst digitaal vaardiger.",
    beschrijving: "De Rijksacademie voor Digitalisering biedt leerpaden over data, AI, informatiebeveiliging en digitale dienstverlening voor alle rijksambtenaren, van basisbewustzijn tot specialistische verdieping.",
    probleem: "Digitalisering raakt elk beleidsterrein, maar veel ambtenaren missen de basiskennis om digitale kansen en risico's te herkennen.",
    doel: "Jaarlijks 10.000 afgeronde leerpaden en een aantoonbare stijging van digitale basiskennis binnen de rijksdienst.",
    lessen: [
      "Korte praktijkgerichte modules worden veel vaker afgerond dan lange cursussen.",
      "Leidinggevenden meenemen is essentieel: zij bepalen of medewerkers leertijd krijgen."
    ],
    gdi: ["NORA"],
    labels: ["Digitaal vakmanschap", "Intern", "Opschalen"],
    contactId: "rs", files: DEFAULT_FILES
  },
  {
    id: "low-code-gilde", title: "Low-code Gilde", org: "UWV", theme: "Digitaal vakmanschap",
    status: "Lopend", fase: "Implementatie", start: "01-06-2025", eind: "-", gepubliceerd: "20-06-2025", bijgewerkt: "15-06-2026",
    partners: ["SVB", "Belastingdienst"],
    kort: "Uitvoeringsorganisaties bouwen los van elkaar low-code oplossingen. Het gilde bundelt kennis. Gedeelde richtlijnen voorkomen wildgroei en herhaalfouten.",
    beschrijving: "Het Low-code Gilde is een interorganisationele kennisgemeenschap die richtlijnen, herbruikbare componenten en governance-afspraken ontwikkelt voor verantwoord low-code gebruik binnen uitvoeringsorganisaties.",
    probleem: "Low-code platforms maken snelle ontwikkeling mogelijk, maar zonder kaders ontstaat wildgroei aan onbeheerbare applicaties.",
    doel: "Gedeelde richtlijnen en een componentenbibliotheek die door drie uitvoeringsorganisaties actief worden gebruikt.",
    lessen: [
      "Citizen developers hebben vooral behoefte aan duidelijkheid over wat wél mag, niet aan lange verbodslijsten."
    ],
    gdi: ["Standaardplatform", "NORA"],
    labels: ["Digitaal vakmanschap", "Samenwerking", "Intern"],
    contactId: "gdz", files: DEFAULT_FILES
  },
  {
    id: "open-source-werkplaats", title: "Open Source Werkplaats", org: "Gemeente Amsterdam", theme: "Digitaal vakmanschap",
    status: "Lopend", fase: "Pilot", start: "01-10-2025", eind: "-", gepubliceerd: "15-10-2025", bijgewerkt: "22-06-2026",
    partners: ["Code for NL", "VNG"],
    kort: "Overheden willen open source werken maar missen praktijkervaring. De werkplaats helpt. Teams leren publiceren, hergebruiken en samenwerken aan code.",
    beschrijving: "De Open Source Werkplaats begeleidt overheidsteams bij het openbaar maken van broncode en het hergebruiken van elkaars software. Teams doorlopen een leertraject van licentiekeuze tot communitybeheer.",
    probleem: "Het kabinetsbeleid is 'open source, tenzij', maar teams weten niet hoe ze code verantwoord publiceren en beheren.",
    doel: "Vijftien teams begeleid naar hun eerste open source publicatie, met een herbruikbaar draaiboek.",
    lessen: [
      "De juridische vragen (licenties, aansprakelijkheid) blijken in de praktijk kleiner dan teams vooraf denken."
    ],
    gdi: ["Open Standaarden", "NORA"],
    labels: ["Digitaal vakmanschap", "Transparantie", "Samenwerking"],
    contactId: "tk", files: DEFAULT_FILES
  },
  {
    id: "designsystem-nl", title: "NL Design System Adoptie", org: "Logius", theme: "Digitaal vakmanschap",
    status: "Lopend", fase: "Opgeschaald", start: "01-01-2025", eind: "-", gepubliceerd: "05-01-2025", bijgewerkt: "25-06-2026",
    partners: ["Gemeenten", "VNG", "Rijksorganisaties"],
    kort: "Elke overheidssite bouwt dezelfde knoppen en formulieren opnieuw. Het NL Design System voorkomt dit. Gedeelde componenten maken sites sneller, toegankelijker en herkenbaarder.",
    beschrijving: "Dit programma versnelt de adoptie van het NL Design System: een gezamenlijke bibliotheek van toegankelijke, geteste componenten voor overheidswebsites. Organisaties dragen componenten bij en nemen ze van elkaar over.",
    probleem: "Overheidsorganisaties ontwikkelen ieder hun eigen webcomponenten, met hoge kosten en wisselende toegankelijkheid tot gevolg.",
    doel: "Vijftig organisaties die actief componenten uit het design system gebruiken in productie.",
    lessen: [
      "Het 'estafettemodel' — waarbij organisaties componenten van elkaar overnemen en verbeteren — werkt beter dan centrale ontwikkeling."
    ],
    gdi: ["Digitoegankelijk", "Open Standaarden"],
    labels: ["Toegankelijkheid", "Digitaal vakmanschap", "Opschalen"],
    contactId: "bm", files: DEFAULT_FILES
  },
  {
    id: "dataethiek-tafels", title: "Data-ethiek Tafels", org: "Gemeente Den Haag", theme: "Digitaal vakmanschap",
    status: "Afgerond", fase: "Pilot", start: "01-02-2025", eind: "01-02-2026", gepubliceerd: "15-02-2025", bijgewerkt: "01-02-2026",
    partners: ["Universiteit Leiden"],
    kort: "Ethische vragen bij datatoepassingen bleven vaak onbesproken. De ethiektafels veranderen dat. Multidisciplinaire sessies toetsen projecten op publieke waarden.",
    beschrijving: "Data-ethiek Tafels zijn gestructureerde sessies waarin projectteams hun datatoepassing bespreken met ethici, juristen, inwoners en domeinexperts. De uitkomsten worden vastgelegd en openbaar gemaakt.",
    probleem: "Ethische afwegingen bij datatoepassingen werden impliciet of niet gemaakt, met maatschappelijke incidenten en verlies van vertrouwen als risico.",
    doel: "Een beproefde methodiek voor ethische toetsing die standaard onderdeel wordt van gemeentelijke dataprojecten.",
    lessen: [
      "Deelname van inwoners aan de tafel leverde de meest onverwachte en waardevolle inzichten op.",
      "De methodiek werkt alleen als de tafel vroeg in het project plaatsvindt, niet als sluitstuk."
    ],
    gdi: ["NORA"],
    labels: ["Publieke waarden", "Digitaal vakmanschap", "Transparantie"],
    contactId: "dl", files: DEFAULT_FILES
  },

  /* ---------- Cloud (6) ---------- */
  {
    id: "overheidscloud-iaas", title: "Soevereine Overheidscloud", org: "SSC-ICT", theme: "Cloud",
    status: "Lopend", fase: "Implementatie", start: "01-01-2025", eind: "-", gepubliceerd: "10-01-2025", bijgewerkt: "20-06-2026",
    partners: ["Ministerie van BZK", "Defensie"],
    kort: "Gevoelige werklasten kunnen niet zomaar naar buitenlandse clouds. Dit project bouwt een alternatief. Een eigen overheidscloud biedt veilige, soevereine infrastructuur.",
    beschrijving: "De Soevereine Overheidscloud biedt rijksorganisaties infrastructuur- en platformdiensten onder volledige Nederlandse jurisdictie, voor werklasten die niet naar publieke cloudproviders kunnen.",
    probleem: "Voor gevoelige werklasten ontbreekt een volwaardig cloudalternatief onder Nederlandse jurisdictie, waardoor organisaties op verouderde eigen datacenters blijven draaien.",
    doel: "Een productierijpe overheidscloud waarop tien rijksorganisaties gevoelige werklasten draaien.",
    lessen: [
      "De dienstencatalogus moet vergelijkbaar aanvoelen met publieke clouds, anders wijken teams uit.",
      "Zelfbediening en automatisering bepalen de snelheid van adoptie."
    ],
    gdi: ["Standaardplatform", "Diginetwerk", "PKI-overheid"],
    labels: ["Autonomie", "Technisch", "Opschalen"],
    contactId: "tdv", files: DEFAULT_FILES
  },
  {
    id: "cloud-exit-draaiboek", title: "Cloud Exit-strategie", org: "Ministerie van BZK", theme: "Cloud",
    status: "Lopend", fase: "Proof of concept", start: "01-03-2026", eind: "-", gepubliceerd: "15-03-2026", bijgewerkt: "20-06-2026",
    partners: ["SSC-ICT", "Belastingdienst"],
    kort: "Overheden zijn afhankelijk van enkele grote cloudproviders. Dit project test uitwijk. Een beproefd draaiboek maakt overstappen tussen clouds realistisch.",
    beschrijving: "Dit project ontwikkelt en test exit-draaiboeken voor cloudwerklasten: wat is er nodig om een applicatie binnen afzienbare tijd van de ene cloud naar de andere of naar eigen infrastructuur te verhuizen?",
    probleem: "Cloudcontracten kennen exit-bepalingen op papier, maar in de praktijk is migreren nooit getest en dreigt vendor lock-in.",
    doel: "Beproefde exit-draaiboeken voor drie representatieve applicatietypen, inclusief werkelijke migratie-oefening.",
    lessen: [
      "Data-egress-kosten en propriëtaire diensten zijn de grootste lock-in factoren; open standaarden bij de bouw beperken dit."
    ],
    gdi: ["Open Standaarden", "NORA"],
    labels: ["Autonomie", "Technisch", "Compliance"],
    contactId: "gdz", files: DEFAULT_FILES
  },
  {
    id: "gemeentelijke-cloudwerkplek", title: "Gemeentelijke Cloudwerkplek", org: "Gemeente Groningen", theme: "Cloud",
    status: "Afgerond", fase: "Implementatie", start: "01-02-2025", eind: "01-04-2026", gepubliceerd: "10-02-2025", bijgewerkt: "01-04-2026",
    partners: ["VNG"],
    kort: "Fysieke werkplekken beperkten hybride werken. De cloudwerkplek lost dit op. Medewerkers werken veilig vanaf elk apparaat, overal.",
    beschrijving: "De Gemeentelijke Cloudwerkplek vervangt de traditionele kantoorwerkplek door een veilige, apparaatonafhankelijke cloudomgeving met moderne samenwerktools en zero-trust beveiliging.",
    probleem: "De verouderde werkplekinfrastructuur beperkte hybride werken en vergde veel beheer, terwijl de beveiliging afhing van het kantoornetwerk.",
    doel: "Migratie van 3.500 medewerkers naar een veilige cloudwerkplek met aantoonbaar hogere medewerkerstevredenheid.",
    lessen: [
      "De menselijke kant (adoptie, training) kostte meer inspanning dan de technische migratie."
    ],
    gdi: ["Standaardplatform", "NORA"],
    labels: ["Intern", "Efficiëntie", "Technisch"],
    contactId: "ak", files: DEFAULT_FILES
  },
  {
    id: "api-gateway-gdi", title: "Centrale API Gateway", org: "Logius", theme: "Cloud",
    status: "Lopend", fase: "Pilot", start: "01-04-2026", eind: "-", gepubliceerd: "20-04-2026", bijgewerkt: "28-06-2026",
    partners: ["Kadaster", "KVK"],
    kort: "Elke organisatie regelt API-toegang op eigen wijze. De centrale gateway standaardiseert dit. Eén voorziening regelt veilige toegang tot overheids-API's.",
    beschrijving: "De Centrale API Gateway biedt één punt voor authenticatie, autorisatie en monitoring van overheids-API's, gebaseerd op het Kennisplatform API's en de NL GOV API-standaarden.",
    probleem: "Afnemers van overheids-API's moeten per organisatie andere toegangsprocedures en beveiligingseisen doorlopen, wat datadeling vertraagt.",
    doel: "Een gateway-pilot waarop drie organisaties hun API's ontsluiten met uniforme toegang voor afnemers.",
    lessen: [
      "Uniforme toegang versnelt vooral kleinere afnemers, die eerder afhaakten op complexe aansluitprocedures."
    ],
    gdi: ["Diginetwerk", "PKI-overheid", "Open Standaarden", "Haal Centraal"],
    labels: ["API's", "Technisch", "Ketenpartners"],
    contactId: "bm", files: DEFAULT_FILES
  },
  {
    id: "duurzaam-datacenter", title: "Duurzame Datacenters Rijk", org: "Rijksvastgoedbedrijf", theme: "Cloud",
    status: "Lopend", fase: "Implementatie", start: "01-01-2026", eind: "-", gepubliceerd: "15-01-2026", bijgewerkt: "22-06-2026",
    partners: ["SSC-ICT"],
    kort: "Datacenters van het Rijk verbruiken veel energie. Dit project verduurzaamt ze. Restwarmte wordt hergebruikt en het energieverbruik daalt.",
    beschrijving: "Dit project verduurzaamt de rijksdatacenters: restwarmte gaat naar stadsverwarming, servers draaien op groene stroom en werklasten worden geconsolideerd op energiezuinige infrastructuur.",
    probleem: "Rijksdatacenters verbruiken veel energie en restwarmte verdwijnt ongebruikt, terwijl het Rijk een voorbeeldrol heeft in de energietransitie.",
    doel: "30% lager energieverbruik en aansluiting van twee datacenters op stadsverwarmingsnetten.",
    lessen: [
      "Consolidatie van onderbenutte servers leverde de snelste winst; hergebruik van restwarmte vergt lange samenwerkingstrajecten met warmtebedrijven."
    ],
    gdi: ["Standaardplatform"],
    labels: ["Duurzaamheid", "Technisch", "Efficiëntie"],
    contactId: "sh", files: DEFAULT_FILES
  },
  {
    id: "container-platform-rijk", title: "Rijksbreed Containerplatform", org: "Belastingdienst", theme: "Cloud",
    status: "Lopend", fase: "Opgeschaald", start: "01-01-2025", eind: "-", gepubliceerd: "05-01-2025", bijgewerkt: "18-06-2026",
    partners: ["SSC-ICT", "DUO"],
    kort: "Applicatieteams wachten weken op infrastructuur. Het containerplatform versnelt dit. Teams zetten applicaties binnen minuten veilig live.",
    beschrijving: "Het Rijksbreed Containerplatform biedt applicatieteams een gestandaardiseerde, beveiligde omgeving om applicaties in containers te draaien, met ingebouwde compliance en automatische schaalbaarheid.",
    probleem: "Applicatieteams besteden veel tijd aan infrastructuur en beveiligingsconfiguratie, met wisselende kwaliteit en trage releases als resultaat.",
    doel: "Een platform waarop 200 applicaties draaien met ingebouwde compliance en releases binnen een dag.",
    lessen: [
      "Een intern ontwikkelaarsportaal met golden paths verlaagt de leercurve aanzienlijk.",
      "Platformteams moeten hun gebruikers als klanten behandelen, inclusief documentatie en support."
    ],
    gdi: ["Standaardplatform", "NORA", "PKI-overheid"],
    labels: ["Technisch", "Efficiëntie", "Opschalen"],
    contactId: "gdz", files: DEFAULT_FILES
  }
];

/* Profiel van de ingelogde gebruiker (voorbeeld) */
const USER = {
  naam: "Gwenn van Kampen",
  voornaam: "Gwenn",
  initialen: "GK",
  org: "Digicampus",
  rol: "Stagiaire",
  afdeling: "UX/UI Design",
  expertise: "UX design, co-creatie, gebruikerstesten",
  email: "gk@voorbeeld.nl",
  tel: "06 12 34 56 78",
  linkedin: "Gwenn van Kampen",
  interesses: ["Data", "Datadeling", "Privacy", "Transparantie", "Burgergericht", "Gebruikerservaring", "Samenwerking"]
};
