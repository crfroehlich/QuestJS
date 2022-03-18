import { Quest } from '../types/quest';


const board = {};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{}'.
board.setup = function (settings: any) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  this.settings = settings;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  this.settings.cosAngle = Math.cos(this.settings.angle * Math.PI / 180);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  this.settings.sinAngle = Math.sin(this.settings.angle * Math.PI / 180);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  this.settings.rootTwo = Math.sqrt(2);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  this.settings.cellPoly = [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    [-this.settings.sinAngle * this.settings.cellSize, 0],
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    [0, -this.settings.cosAngle * this.settings.cellSize],
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    [this.settings.sinAngle * this.settings.cellSize, 0],
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    [0, this.settings.cosAngle * this.settings.cellSize],
  ];

  const newDiv          = document.createElement('div');
  newDiv.style.position = 'fixed';
  newDiv.style.bottom   = '0px';
  newDiv.style.left     = '200px';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  newDiv.style.width = `${this.settings.width}px`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  newDiv.style.height = `${this.settings.height}px`;
  newDiv.innerHTML    = 'This will be the board...';
  newDiv.setAttribute('id', 'board');
  document.body.insertBefore(newDiv, document.querySelector('#dialog'));
  // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#main').style.marginBottom = '420px';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'update' does not exist on type '{}'.
  this.update();
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'update' does not exist on type '{}'.
board.update = function () {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
  this.map = [];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'labels' does not exist on type '{}'.
  this.labels = [];

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
  this.map.push('<defs>');
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
  this.map.push('<linearGradient id="leftBaseGradient" gradientTransform="rotate(120)"><stop offset="0%"  stop-color="black" /><stop offset="30%" stop-color="white" /></linearGradient>');
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
  this.map.push('<linearGradient id="rightBaseGradient" gradientTransform="rotate(60)"><stop offset="45%"  stop-color="black" /><stop offset="80%" stop-color="white" /></linearGradient>');
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (this.settings.defs) this.map.push(this.settings.defs());
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
  this.map.push('</defs>');

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (this.settings.title) this.map.push(board.getTitle());

  // 0,0 is at the left, x increases towards the bottom, y to the top
  // 0,size is at the top; size,0 at the bottom; size,size at the right
  // Start at 0,size; then 0,size-1 and 1,size

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  for (let i = 0; i < this.settings.size; i++) {
    for (let j = 0; j < i; j++) {
      const x = j;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      const y = this.settings.size - i + j;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'handleCell' does not exist on type '{}'.
      board.handleCell(x, y);
    }
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  for (let i = this.settings.size; i <= (2 * this.settings.size); i++) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    for (let j = 0; j < (2 * this.settings.size - i); j++) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      const x = j + i - this.settings.size;
      const y = j;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'handleCell' does not exist on type '{}'.
      board.handleCell(x, y);
    }
  }

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (this.settings.baseHeight) this.map.push(board.getBase());
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (this.settings.compassPane) this.map.push(board.getCompass(this.settings.compass.x, this.settings.compass.y));
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (this.settings.switches) this.map.push(board.getSwitches());
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (this.settings.extras) this.map.push(this.settings.extras());
  // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#board').innerHTML = `<svg width="${this.settings.width}" height="${this.settings.height}" viewBox="0 0 ${this.settings.width} ${this.settings.height}" xmlns="http://www.w3.org/2000/svg">${this.map.join()}${this.labels.join()}</svg>`;
  return true;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'handleCell' does not exist on type '{}'.
board.handleCell = function (x: any, y: any) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'getCoord' does not exist on type '{}'.
  const [x2, y2] = board.getCoord(x, y);

  let s = '<polygon points="';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  for (const el of this.settings.cellPoly) {
    s += `${x2 + el[0]},${y2 + el[1]} `;
  }
  s += '" ';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += board.settings.cellBorder ? board.settings.cellBorder(x, y) : 'stroke="none"';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += ` fill="${this.settings.getColourAt(x, y)}"/>`;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (typeof this.settings.getLeftBorder === 'function') {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    const leftBorder = this.settings.getLeftBorder(x, y);
    if (leftBorder) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      s += `<line x1="${x2 + this.settings.cellPoly[0][0]}" y1="${y2 + this.settings.cellPoly[0][1]}" `;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      s += `x2="${x2 + this.settings.cellPoly[3][0]}" y2="${y2 + this.settings.cellPoly[3][1]}" ${leftBorder}/>`;
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    const rightBorder = this.settings.getRightBorder(x, y);
    if (rightBorder) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      s += `<line x1="${x2 + this.settings.cellPoly[2][0]}" y1="${y2 + this.settings.cellPoly[2][1]}" `;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      s += `x2="${x2 + this.settings.cellPoly[3][0]}" y2="${y2 + this.settings.cellPoly[3][1]}" ${rightBorder}/>`;
    }
  }

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  for (const el of this.settings.getFeaturesAt(x, y)) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    const feature = this.settings.features[el];
    if (feature === undefined) {
      console.log(`WARNING: Failed to find a feature called "${el}" when drawing board`);
      continue;
    }
    if (feature.script) {
      if (feature.layer) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[feature.layer].push(feature.script(x2, y2, x, y));
      } else {
        s += feature.script(x2, y2, x, y);
      }
    } else if (feature.text) {
      let s = `<text x="${x2}" y="${y2 + (feature.y ? feature.y : 0)}" style="text-anchor:middle;`;
      if (feature.style) s += feature.style;
      s += '" ';
      if (feature.colour) s += `fill="${feature.colour}"`;
      s += `>${feature.text}</text>`;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'labels' does not exist on type '{}'.
      this.labels.push(s);
    } else if (feature.file) {
      let x3 = x2 - feature.width / 2;
      if (feature.x) x3 += feature.x;
      let y3 = y2 - feature.height;
      if (feature.y) y3 += feature.y;
      s += `<image href="${settings.imagesFolder}${feature.file}" `;
      s += `width="${feature.width}" height="${feature.height}" `;
      s += `x="${x3}" y="${y3}"/>`;
    } else if (feature.flatFile) {
      const x3 = x2 - feature.width / 2 + 18;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      const y3 = y2 - feature.height + 30.5 - 0.26 * this.settings.cellSize;
      s       += `<image href="${settings.imagesFolder}${feature.flatFile}" `;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      s += `width="${Math.round(this.settings.cellSize * this.settings.rootTwo)}"`;
      s += ` x="${x3}" y="${y3}" transform-origin="`;
      s += `${x3}px ${y3}px" transform="scale(1, `;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
      s += `${this.settings.cosAngle / this.settings.sinAngle}) rotate(45)"/>`;
    }
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'map' does not exist on type '{}'.
  this.map.push(s);
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'getTitle' does not exist on type '{}'.
board.getTitle = function () {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  const x = this.settings.titleX || 10;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  const y = this.settings.titleY || (this.settings.height / 4);
  let s   = `<text x="${x}" y="${y}`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (this.settings.titleStyle) s += `" style="${this.settings.titleStyle}`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `">${this.settings.title}</text>`;
  return s;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'getCompass' does not exist on type '{}'.
board.getCompass = function (x: any, y: any) {
  let s = `<image href="${settings.imagesFolder}compass45.png" width="160" height="159" x="`;
  s    += `${x}" y="${y}`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `" transform="scale(1, ${this.settings.cosAngle / this.settings.sinAngle})" transform-origin="`;
  s += `${x}px ${y}px"/>`;
  return s;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'getSwitches' does not exist on type '{}'... Remove this comment to see the full error message
board.getSwitches = function () {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  const x = this.settings.switchesPos.x || 800;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  const y = this.settings.switchesPos.y || 100;
  let s   = '';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  if (this.settings.switchesWidth) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    s += `<rect x="${x}" y="${y}" width="${this.settings.switchesWidth}" height="`;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    s += `${this.settings.switches.length * 18 + 14}" fill="#eee" stroke="black"/>`;
  }
  let offset = 0;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  for (const el of this.settings.switches) {
    s += `<circle cx="${x + 14}" cy="${y + 15 + offset}" r="8" fill="`;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
    s      += `${this.settings[el.att] ? el.on : el.off}" stroke="black" onclick="`;
    s      += el.customFunction ? el.customFunction : `board.toggle('${el.att}')`;
    s      += '"/>';
    s      += `<text x="${x + 26}" y="${y + 20 + offset}" fill="black">${el.text}</text>`;
    offset += 20;
  }
  return s;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'getBase' does not exist on type '{}'.
board.getBase = function () {
  let s = '<polygon points="';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.offsetX + this.settings.cellPoly[0][0]},`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.height / 2 + this.settings.offsetY} `;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.offsetX + this.settings.sinAngle * this.settings.size * this.settings.cellSize + this.settings.cellPoly[0][0]},`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.height / 2 + this.settings.offsetY + this.settings.cosAngle * this.settings.size * this.settings.cellSize} `;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.offsetX + this.settings.sinAngle * this.settings.size * this.settings.cellSize + this.settings.cellPoly[0][0]},`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.height / 2 + this.settings.offsetY + this.settings.cosAngle * this.settings.size * this.settings.cellSize + this.settings.baseHeight} `;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.offsetX + this.settings.cellPoly[0][0]},`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.height / 2 + this.settings.offsetY + this.settings.baseHeight} `;
  s += '" stroke="none" fill="url(\'#leftBaseGradient\')"/>';

  s += '<polygon points="';
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.offsetX + this.settings.sinAngle * this.settings.size * this.settings.cellSize * 2 + this.settings.cellPoly[0][0]},`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.height / 2 + this.settings.offsetY} `;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.offsetX + this.settings.sinAngle * this.settings.size * this.settings.cellSize + this.settings.cellPoly[0][0]},`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.height / 2 + this.settings.offsetY + this.settings.cosAngle * this.settings.size * this.settings.cellSize} `;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.offsetX + this.settings.sinAngle * this.settings.size * this.settings.cellSize + this.settings.cellPoly[0][0]},`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.height / 2 + this.settings.offsetY + this.settings.cosAngle * this.settings.size * this.settings.cellSize + this.settings.baseHeight} `;

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.offsetX + this.settings.sinAngle * this.settings.size * this.settings.cellSize * 2 + this.settings.cellPoly[0][0]},`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  s += `${this.settings.height / 2 + this.settings.offsetY + this.settings.baseHeight} `;
  s += '" stroke="none" fill="url(\'#rightBaseGradient\')"/>';

  return s;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'getCoord' does not exist on type '{}'.
board.getCoord = function (x: any, y: any) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  const x2 = this.settings.cellSize * (x + y) * this.settings.sinAngle + this.settings.offsetX;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  const y2 = this.settings.height / 2 + this.settings.cellSize * (x - y) * this.settings.cosAngle + this.settings.offsetY;
  return [x2, y2];
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'toggle' does not exist on type '{}'.
board.toggle = function (att: any) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'settings' does not exist on type '{}'.
  board.settings[att] = !board.settings[att];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'update' does not exist on type '{}'.
  board.update();
};
