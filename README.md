
# Zufällige Strichzeichnungen


### Projektstruktur
```
.
├── index.html
├── styles.css
├── script.js
├── cors_server.py
├── README.md

```

![Bildschirmfoto vom 2024-08-07 12-08-17](https://github.com/user-attachments/assets/7dd5fd24-870d-4949-92a8-30ab84238729)


 
### Demo: https://codepen.io/ogerly/pen/xxorNbr


Dieses Projekt generiert zufällige Strichzeichnungen, die an Sternbilder erinnern, und bietet Kontrollelemente, um die "Weichheit" der Zeichnungen anzupassen und die Zeichnungen neu zu laden.

## Inhaltsverzeichnis
- [Demo](#demo)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Struktur](#struktur)
- [Kontrollen](#kontrollen)
- [Lizenz](#lizenz)

## Demo
Eine Live-Demo dieses Projekts findest du hier: [Live Demo](#)

## Installation
1. Klone dieses Repository:
   ```sh
   git clone https://github.com/dein-benutzername/zufaellige-strichzeichnungen.git
   ```
2. Navigiere in das Projektverzeichnis:
   ```sh
   cd zufaellige-strichzeichnungen
   ```
3. Öffne die `index.html` Datei in deinem bevorzugten Webbrowser.

## Verwendung
- **Weichheit anpassen**: Verwende den Schieberegler, um die "Weichheit" der Zeichnungen anzupassen, was die Wahrscheinlichkeit der Verbindungen zwischen den Punkten steuert.
- **Neu laden**: Klicke auf den "Neu laden" Button, um die Zeichnungen mit den aktuellen Einstellungen neu zu generieren.

## Struktur
- `index.html`: Haupt-HTML-Datei, die die Struktur der Seite definiert.
- `styles.css`: CSS-Datei für das Styling der Seite.
- `script.js`: JavaScript-Datei, die die Logik zur Generierung der Zeichnungen und der Kontrollelemente enthält.

## Kontrollen
- **Weichheit**: Ein Schieberegler, um die Wahrscheinlichkeit der Verbindungen zwischen den Punkten zu steuern.
- **Neu laden**: Ein Button, um die Zeichnungen neu zu generieren.

## Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe die [LICENSE](LICENSE) Datei für Details.
```

### Dateien
**index.html**:
```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zufällige Strichzeichnungen</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Zufällige Strichzeichnungen</h1>
    <div class="controls">
      <label for="softness">Weichheit:</label>
      <input type="range" id="softness" name="softness" min="0" max="100" value="30">
      <button id="reloadButton">Neu laden</button>
    </div>
    <div class="drawing-container">
      <div>
        <h2>Canvas</h2>
        <canvas id="myCanvas" width="250" height="250"></canvas>
        <pre id="canvasCode"></pre>
      </div>
      <div>
        <h2>SVG</h2>
        <svg id="mySVG" width="250" height="250"></svg>
        <pre id="svgCode"></pre>
      </div>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>
```

**styles.css**:
```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.controls {
  margin-bottom: 20px;
}
.drawing-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 800px;
}
canvas, svg {
  border: 1px solid black;
  margin: 20px;
  width: 250px;
  height: 250px;
}
pre {
  background: #f4f4f4;
  padding: 10px;
  border: 1px solid #ccc;
  width: calc(100% - 40px);
  max-width: 760px;
  overflow: auto;
}
```

**script.js**:
```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const svg = document.getElementById('mySVG');
const softnessInput = document.getElementById('softness');
const reloadButton = document.getElementById('reloadButton');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function drawRandomStarsCanvas(count, softness) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const points = [];
  let canvasCode = `
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function drawRandomStarsCanvas(count, softness) {
  const points = [];
  
  for (let i = 0; i < count; i++) {
    points.push({ x: getRandomInt(canvas.width), y: getRandomInt(canvas.height) });
  }

  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2, true);
    ctx.fillStyle = 'black';
    ctx.fill();
  });

  for (let i = 0; i < points.length - 1; i++) {
    if (Math.random() * 100 < softness) {
      ctx.beginPath();
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

drawRandomStarsCanvas(${count}, ${softness});
  `;

  for (let i = 0; i < count; i++) {
    points.push({ x: getRandomInt(canvas.width), y: getRandomInt(canvas.height) });
  }

  points.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2, true);
    ctx.fillStyle = 'black';
    ctx.fill();
  });

  for (let i = 0; i < points.length - 1; i++) {
    if (Math.random() * 100 < softness) {
      ctx.beginPath();
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  document.getElementById('canvasCode').textContent = canvasCode;
}

function drawRandomStarsSVG(count, softness) {
  while (svg.firstChild) {
    svg.removeChild(svg.firstChild);
  }
  const points = [];
  let svgCode = `
<svg id="mySVG" width="250" height="250">
`;

  for (let i = 0; i < count; i++) {
    points.push({ x: getRandomInt(svg.width.baseVal.value), y: getRandomInt(svg.height.baseVal.value) });
  }

  points.forEach(point => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', point.x);
    circle.setAttribute('cy', point.y);
    circle.setAttribute('r', 2);
    circle.setAttribute('fill', 'black');
    svg.appendChild(circle);
    svgCode += `
  <circle cx="${point.x}" cy="${point.y}" r="2" fill="black" />
`;
  });

  for (let i = 0; i < points.length - 1; i++) {
    if (Math.random() * 100 < softness) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', points[i].x);
      line.setAttribute('y1', points[i].y);
      line.setAttribute('x2', points[i + 1].x);
      line.setAttribute('y2', points[i + 1].y);
      line.setAttribute('stroke', 'black');
      line.setAttribute('stroke-width', 1);
      svg.appendChild(line);
      svgCode += `
  <line x1="${points[i].x}" y1="${points[i].y}" x2="${points[i + 1].x}" y2="${points[i + 1].y}" stroke="black" stroke-width="1" />
`;
    }
  }

  svgCode += `
</svg>
  `;
  document.getElementById('svgCode').textContent = svgCode;
}

function updateDrawings() {
  const softness = parseInt(softnessInput.value, 10);
  drawRandomStarsCanvas(10, softness);
  drawRandomStarsSVG(10, softness);
}

softnessInput.addEventListener('input', updateDrawings);
reloadButton.addEventListener('click', updateDrawings);

updateDrawings();
```
 

 
 
## Cross-Origin Resource Sharing (CORS) Server

Um das Projekt lokal zu testen und sicherzustellen, dass keine CORS-Probleme auftreten, wird ein einfacher Python-Server (`cors_server.py`) bereitgestellt. Dieser Server fügt die notwendigen CORS-Header hinzu, um den Zugriff von verschiedenen Quellen zu ermöglichen.

### Starten des CORS-Servers

1. Stelle sicher, dass Python installiert ist (Python 3 empfohlen).
2. Navigiere in das Projektverzeichnis.
3. Starte den Server mit folgendem Befehl:
   ```sh
   python3 cors_server.py
   ```
4. Der Server wird auf `http://localhost:8000` laufen.

Der `cors_server.py` ist im Projekt enthalten, um sicherzustellen, dass die HTML-Dateien problemlos von einem lokalen Server geladen werden können, ohne dass CORS-Probleme auftreten. Dies ist besonders nützlich, wenn das Projekt auf verschiedene Domains oder Subdomains verteilt wird.
 
