const gridContainer = document.getElementById('gridContainer');
const clusterCountSelect = document.getElementById('clusterCount');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function drawRandomStarsSVG(count, softness) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  const points = [];
  for (let i = 0; i < count; i++) {
    points.push({ x: getRandomInt(100), y: getRandomInt(100) });
  }

  points.forEach(point => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", point.x);
    circle.setAttribute("cy", point.y);
    circle.setAttribute("r", 2);
    circle.setAttribute("fill", "black");
    svg.appendChild(circle);
  });

  for (let i = 0; i < points.length - 1; i++) {
    if (Math.random() * 100 < softness) {
      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", points[i].x);
      line.setAttribute("y1", points[i].y);
      line.setAttribute("x2", points[i + 1].x);
      line.setAttribute("y2", points[i + 1].y);
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-width", 1);
      svg.appendChild(line);
    }
  }

  return new XMLSerializer().serializeToString(svg);
}

function generateChessBoard(size) {
  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    
    const svgString = drawRandomStarsSVG(10, 30);
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
    cell.style.backgroundImage = `url('${svgDataUrl}')`;
    cell.style.backgroundSize = 'cover';
    
    gridContainer.appendChild(cell);
  }
}

function updateChessBoard() {
  const clusterCount = parseInt(clusterCountSelect.value, 10);
  const gridSize = Math.ceil(Math.sqrt(clusterCount));
  generateChessBoard(gridSize);
}

clusterCountSelect.addEventListener('change', updateChessBoard);

// Initial rendering
updateChessBoard();
