# Inleiding

In dit project ga je een eenvoudig login-systeem bouwen met behulp van de volgende technologieën:

### Technologieën

* **Database:** [BetterSqlite 3](https://github.com/WiseLibs/better-sqlite3)
* **Backend:** [Express.js](https://www.npmjs.com/package/express) (JavaScript, SQL)
* **Frontend:** HTML en CSS

Daarnaast gebruiken we **Node.js**. Bekijk deze video voor een korte uitleg over wat Node.js is:
[Wat is Node.js? - YouTube](https://www.youtube.com/watch?v=akzvd9XQX4U&ab_channel=RusiruGunaratne)

## Benodigdheden

Zorg dat je de volgende software op je computer hebt geïnstalleerd:

### Code Editor

Bijvoorbeeld Visual Studio Code:
[Download Visual Studio Code](https://code.visualstudio.com/)

### Node.js

Installeer de **LTS-versie**:
[Download Node.js](https://nodejs.org/en)

#### Voor Mac-gebruikers

Als je Homebrew hebt, kun je Node.js installeren via de terminal:

```sh
brew install node
```

#### Test de installatie

Controleer of Node.js goed is geïnstalleerd met:

```sh
node -v
```

Als je een versie zoals `v20...` ziet, is alles goed gegaan 🥳

## Voorbereiding

De volledige code is al geschreven. De front- en de backend zijn opgesplitst in twee folders dus hier hoef je in principe niets aan te doen. Als je denkt dat je het beter kunt. Doe je best! 😉

>Zorg dus dat als je de backend server wilt starten je altijd eerst naar de 'Backend' folder navigeert voordat je commando's uitvoert!

## Stappenplan

### Stap 1: De benodigde 'dependencies' installeren in het project

1. Open Visual Studio Code.
2. Navigeer in de terminal naar de map `Backend`:

```sh
cd Backend
```

3. Installeer de benodigde Node-pakketten:

```sh
npm install
```

> *NPM staat voor Node Package Manager. Hiermee installeren we de dependencies voor dit project.*

Als dit gelukt is, zie je in de `Backend`-map een nieuwe map genaamd `node_modules`.

### Stap 2: Live Server

Download de plugin `Live Server` plugin, klik op de extensions tab en zoek hierop:
```
ritwickdey.LiveServer
```
Download de extensie
<hr>

Klik met de rechtermuisknop op het `index.html` bestand in de `Frontend`-map, klik vervolgens in het [contextmenu](https://en.wikipedia.org/wiki/Context_menu) op de optie `Open with Live Server`. 

Je kunt ook rechtsonderin VS-Code op de `Go Live` knop drukken. 

Navigeer naar:
http://127.0.0.1:5500/Frontend/index.html

### Stap 3: Expirimenteer!

Bekijk de `migrate.js` en `server.js` bestanden in de `Backend` folder. Hierin staat de logica voor de backend.

