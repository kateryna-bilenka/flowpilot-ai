# Start of Life Prozess (Entwurf)

**Status:** Entwurf zur Abstimmung · **Owner:** Produktmanagement · **Stand:** 02.10.2026

> Schema einfügen: `REA_Card_Start_of_Life_Schema.png`

## Ziel

Ein einheitlicher Weg für neue Produkte: von der Idee bis zum Regelbetrieb. Jeder weiß, wer wann entscheidet, welche Unterlagen nötig sind und wann ein Produkt verkauft werden darf.

REA Card stellt weder Hardware noch Software her. Wir wählen aus, beschaffen, integrieren in unsere Infrastruktur, testen mit Kunden und vermarkten. Der Ablauf ist für alle Produkte gleich. Nur die Prüfung in Phase 4 unterscheidet sich nach Produkttyp.

## Ablauf

| Phase | Inhalt | Ergebnis | Verantwortlich | Gate danach |
|---|---|---|---|---|
| 0 Impuls | Idee aus GL, Vertrieb, PM, Hotline, Kundenumfragen, Hersteller, Regulatorik | Idee eingereicht | Ideengeber, PM | – |
| 1 Produktsteckbrief | Ziel, Erwartung, mögliches Endprodukt, Bedarf, Produkttyp | Steckbrief in Confluence | PM | G1 |
| 2 Business Case | Markt, EK/VK/Marge, Aufwand, Risiken | Antrag an GL | PM | G2 (GL) |
| 3 Beschaffung | Lieferantenauswahl und EK-Preischeck (RC Einkauf) oder Direktvertrag, Bestellung, Artikel in Infor und KGV | Vertrag, Testgeräte, Artikel | Einkauf, PM | – |
| 4 Prüfung nach Produkttyp | Hardware, Software oder Zahlungslösung (siehe unten) | Produkt läuft bei uns, Pflichten geklärt | PM, Technik | G3 |
| 5 Prototyp | 1–3, intern oder bei vertrauten Kunden | Technisch funktionsfähig | PM, Technik | G4 |
| 6 Produkttest | mehr als 10, Hotline und andere Abteilungen eingebunden | Funktioniert beim Kunden | PM, Vertrieb | G5 |
| 7 Pilotierung | mehr als 30, eigene Verträge | Unsere Prozesse funktionieren | PM, Vertrieb, Hotline | G6 (GL) |
| 8 MP | Markteinführung: Produktblatt, Preisliste, Schulung, Marketing | Produkt frei verkäuflich | PM, Marketing, Vertrieb | – |
| 9 Regelbetrieb | Review nach 3 und 12 Monaten, Übergabe an End of Life Prozess | – | PM | – |

## Phase 4: Prüfung nach Produkttyp

- **Hardware:** Ausstattung und Lieferumfang, Zulassungen (CE, PCI PTS, DK), ElektroG/WEEE und VerpackG, Anbindung an Netzbetrieb, TMS und Kasse (ZVT/O.P.I.), Lager, Ersatzteile, RMA.
- **Software:** Leistungsumfang, Lizenzmodell, Cloud oder lokal, DSGVO/AVV, KassenSichV/TSE, Schnittstellen, Updates, Support 1st/2nd Level.
- **Zahlungslösung:** Leistungsumfang, Rollenmodell (wer ist Vertragspartner des Händlers), ZAG/BaFin, KYC, PCI DSS, Kartensysteme, Preismodell, Onboarding, Chargebacks.
- **Bundle** (z.B. Kasse + Terminal): beide Prüfungen plus Test des Zusammenspiels.

## Vier Stufen bis zum Markt

| Stufe | Anzahl | Beteiligt | Vertrag | Unterlagen |
|---|---|---|---|---|
| Prototyp | 1–3 | PM, Technik | keiner / Absprache | Herstellerproduktblatt (intern) |
| Produkttest | mehr als 10 | mehr Vertrieb, Hotline, andere Abteilungen | Testvereinbarung | Herstellerproduktblatt, Preisliste Produkttest |
| Pilotierung | mehr als 30 | Vertrieb, geschulte Hotline, Technik | eigene Verträge | REA Pilotproduktblatt, Preisliste Pilotphase |
| MP | offen | alle | Standardverträge | REA Produktblatt, offizielle Preisliste |

## Gates

| Gate | Wann | Entscheidet | Mögliche Ergebnisse |
|---|---|---|---|
| G1 | nach Steckbrief | PM | Go / Parken / Nein |
| G2 | nach Business Case | Geschäftsleitung | Freigabe / Überarbeiten / Abgelehnt |
| G3 | nach Prüfung Phase 4 | PM, Technik | Go / Stopp |
| G4 | nach Prototyp | PM | Go / Nachbessern / Stopp |
| G5 | nach Produkttest | PM | Go / Nachbessern / Stopp |
| G6 | nach Pilotierung | Geschäftsleitung | Go / Pilot verlängern / Stopp |

## Offene Fragen

1. **MP:** Wofür steht MP genau, Markteinführung oder Marktprodukt?
2. **Mengen:** Beziehen sich 1–3, mehr als 10 und mehr als 30 auf Kunden oder auf Geräte bzw. Lizenzen?
3. **Dauer:** Wie lange dauert jede Stufe mindestens bzw. höchstens?
4. **Bestellung:** Erst nach G2, oder darf PM kleine Testmengen bis zu einem Betrag selbst bestellen?
5. **Stammdaten:** Ab welcher Stufe wird der Artikel in Infor und KGV angelegt? Mit Status „Test“?
6. **Entscheider:** Entscheidet an G1, G3, G4 und G5 nur PM oder ein Gremium aus PM, Vertrieb und Technik?
7. **Zahlungslösungen:** Welche Rolle übernimmt REA Card selbst, und wo arbeiten wir mit Partnern?
8. **Schnellspur:** Welche Produkte dürfen Phasen überspringen, z.B. Zubehör oder ein neues Modell eines bekannten Herstellers?
9. **Status:** Wo sehen alle, welches Produkt in welcher Phase ist?
10. **Beispiel:** Welches Produkt testen wir den Prozess als Erstes? (Notiz: Cloud → Kiosk System)
