
# Mercatino Online - GitHub Pages

## Funzioni incluse

- Design elegante stile marketplace
- Ricerca prodotti
- Filtri per categoria
- Stato prodotto:
  - Disponibile
  - Prenotato
  - Venduto
- Pulsante WhatsApp
- Responsive mobile
- Aggiornamento automatico da Google Sheets

---

# PASSO 1 — Crea Google Sheet

Crea un Google Sheet con queste colonne:

| Nome | Prezzo | Descrizione | Categoria | Foto | Stato |
|---|---|---|---|---|---|

Esempio:

| Nintendo Switch | 180€ | Ottime condizioni | Elettronica | URL immagine | Disponibile |

---

# PASSO 2 — Carica immagini

Metodo consigliato:
- crea una cartella in Google Drive
- carica le immagini
- fai "Condividi > Chiunque abbia il link"

Poi usa il link diretto immagine nel foglio.

---

# PASSO 3 — Collegare Sheet.best

Vai su:
https://sheet.best

- collega il Google Sheet
- copia l'URL API JSON

Esempio:
https://sheet.best/api/sheets/XXXX

---

# PASSO 4 — Inserisci URL

Apri script.js

Sostituisci:

PASTE_YOUR_SHEETBEST_URL_HERE

con il tuo URL.

---

# PASSO 5 — Cambiare WhatsApp

Nel file index.html cambia:

https://wa.me/5210000000000

con il tuo numero.

Formato:
521 + numero messicano

Esempio:
5219981234567

---

# PASSO 6 — Pubblicare GRATIS

1. Crea account GitHub
2. Crea nuovo repository
3. Carica tutti i file
4. Vai in:
   Settings > Pages
5. Seleziona:
   Deploy from branch
6. Branch:
   main
7. Save

Il sito sarà online su:

https://TUONOME.github.io/NOME-REPOSITORY

---

# Upload drag-and-drop immagini

Per evitare procedure tecniche puoi usare:

https://postimages.org

- trascini la foto
- copi il direct link
- lo incolli nel foglio Google

Molto più veloce di Google Drive.

