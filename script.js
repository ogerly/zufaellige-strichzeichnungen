const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const svg = document.getElementById('mySVG');
const softnessInput = document.getElementById('softness');
const reloadButton = document.getElementById('reloadButton');
const exampleButton = document.getElementById('exampleButton');

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
  <line x1="${points[i].x}" y1="${points[i].y}" x2="${points[i + 1]}.x}" y2="${points[i + 1]}.y}" stroke="black" stroke-width="1" />
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
exampleButton.addEventListener('click', () => window.location.href = 'example.html');

updateDrawings();
