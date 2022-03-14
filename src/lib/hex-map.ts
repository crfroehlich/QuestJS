"use strict"





function createHex(x: any, y: any, data: any) {
  const name = map.coordToCellName(x, y)
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (w[name]) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapReportRepeats' does not exist on type... Remove this comment to see the full error message
    if (Quest.Settings.settings.mapReportRepeats) log('Already got a ' + name)
    return null
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  const o = createRoom(name, data)

  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  o.mapX = x
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  o.mapY = y

  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  o.getExit = function (dir: any) {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (this[dir]) return this[dir]
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!map.vectors[dir]) return null
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const x = this.mapX + map.vectors[dir][0]
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const y = this.mapY + map.vectors[dir][1]
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    log(map.vectors[dir])
    log(map.coordToCellName(x, y))
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    return new Exit(map.coordToCellName(x, y), { origin: this, dir: dir })
  }

  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  o.hasExit = function (dir: any, options: any) {
    if (options === undefined) options = {};
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (!this[dir]) return this.hasHexExit(dir, options);
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (options.excludeAlsoDir && this[dir].isAlsoDir) return false;
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (options.excludeLocked && this[dir].isLocked()) return false;
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (options.excludeScenery && this[dir].scenery) return false;
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    return !this[dir].isHidden();
  }

  // can change later to limit... or allow authotr to
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  o.hasHexExit = function (dir: any, options: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!map.vectors[dir]) return false
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (this[dir + 'Prohibited']) return false
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const x = this.mapX + map.vectors[dir][0]
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const y = this.mapY + map.vectors[dir][1]
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (w[map.coordToCellName(x, y)]) return true
    return false
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDefaultAlias' does not exist on type ... Remove this comment to see the full error message
  if (Quest.Settings.settings.mapDefaultAlias && !data.alias) Quest.Settings.settings.mapDefaultAlias(o)

  return o
}


function createBiome(x: any, y: any, biomeChar: any, data = {}) {
  if (biomeChar === ' ') return null
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapBiomes' does not exist on type '{ per... Remove this comment to see the full error message
  if (!Quest.Settings.settings.mapBiomes[biomeChar]) {
    log("No biome for " + biomeChar)
    return null
  }
  const o = createHex(x, y, data)
  if (!o) return null
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'biome' does not exist on type '{ name: a... Remove this comment to see the full error message
  o.biome = Quest.Settings.settings.mapBiomes[biomeChar]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getHexColour' does not exist on type '{ ... Remove this comment to see the full error message
  o.getHexColour = function () { return this.biome.colour }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'desc' does not exist on type '{ name: an... Remove this comment to see the full error message
  if (!o.desc) o.desc = o.biome.name
  return o
}


// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'map'.
const map = {
  toggle: true,
  defaults: {
    mapTextColour: 'black',
    mapLabelOffset: 15,
    mapLabelColour: 'black',
    mapHexStroke: 'grey',
    mapDefaultColour: 'lightgrey',
    mapHexStrokeWidth: 4,
    mapRiverColour: 'dodgerblue',
    allowRoaming: false,
    mapScrolling: true,
    mapXOffset1: 12,
    mapXOffset2: 25,
    mapYOffset: 20,
    mapClick: function (x: any, y: any) { },
  },
  coordToCellName: function (x: any, y: any) { return 'hex_' + map.numberToString(x) + '_' + map.numberToString(y) },
  numberToString: function (n: any) { return n < 0 ? 'm' + (-n) : '' + n },
  stringToNumber: function (s: any) { return s.startsWith('m') ? -parseInt(s.substring(1)) : parseInt(s) },
  cellNameToCoord: function (s: any) {
    if (!s) return null
    if (typeof s !== 'string') s = s.name
    const md = s.match(/hex_([m0-9]+)_([m0-9]+)/)
    if (!md) return null
    return [
      map.stringToNumber(md[1]),
      map.stringToNumber(md[2]),
    ]
  },
  vectors: {
    north: [0, 1],
    northeast: [1, 0],
    southeast: [1, -1],
    south: [0, -1],
    southwest: [-1, 0],
    northwest: [-1, 1],
  },
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultStyle' does not exist on type '{ ... Remove this comment to see the full error message
map.defaultStyle = { position: 'fixed', display: 'block' }  // !!!!!!!!!!!!!!

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ toggle: boolean; defaults: { m... Remove this comment to see the full error message
io.modulesToUpdate.push(map)
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ toggle: boolean; defaults: { m... Remove this comment to see the full error message
io.modulesToInit.push(map)






// @ts-expect-error ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ toggle: ... Remove this comment to see the full error message
map.init = function () {
  // Set the default values for settings
  for (let key in map.defaults) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!settings[key]) settings[key] = map.defaults[key]
  }

  // Set up the HTML page
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  Object.assign(document.querySelector('#quest-map').style, map.defaultStyle, Quest.Settings.settings.mapStyle)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapHeight' does not exist on type '{ per... Remove this comment to see the full error message
  Quest.Settings.settings.mapHeight = parseInt(Quest.Settings.settings.mapStyle.height)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapWidth' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.mapWidth = parseInt(Quest.Settings.settings.mapStyle.width)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'xFactor' does not exist on type '{ toggl... Remove this comment to see the full error message
  map.xFactor = Quest.Settings.settings.mapXOffset1 + Quest.Settings.settings.mapXOffset2
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'yFactor' does not exist on type '{ toggl... Remove this comment to see the full error message
  map.yFactor = Quest.Settings.settings.mapYOffset * 2



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'layers' does not exist on type '{ toggle... Remove this comment to see the full error message
  map.layers = [
    // rooms on this level
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapBorderColour' does not exist on type ... Remove this comment to see the full error message
    { name: 'base', attrs: 'stroke="' + Quest.Settings.settings.mapBorderColour + '" stroke-width="1" fill="' + Quest.Settings.settings.mapLocationColour + '"' },
    // borders
    { name: 'borders', attrs: '' },
    // symbols (anything the author might want to add)
    { name: 'symbols', attrs: '' },
    // labels
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelColour' does not exist on type '... Remove this comment to see the full error message
    { name: 'labels', attrs: 'pointer-events="none" fill="' + Quest.Settings.settings.mapLabelColour + '" text-anchor="middle"' },
  ]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type '{ toggle... Remove this comment to see the full error message
  map.update()
}



// Draw the map
// It collects all the SVG in five lists, which are effectively layers.
// This means all the hexs appear in one layer, all the labels in another
// @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type '{ toggle... Remove this comment to see the full error message
map.update = function () {
  // check we are ready to draw the map
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'layers' does not exist on type '{ toggle... Remove this comment to see the full error message
  if (!map.layers) return

  // grab the current room x and y position as an array
  // or give up if not that sort of location

  const playerCoord = map.cellNameToCoord(currentLocation)
  if (!playerCoord) return



  // Stuff gets put in any of several layers, which will be displayed in this order
  const lists = {}
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'layers' does not exist on type '{ toggle... Remove this comment to see the full error message
  for (let el of map.layers) lists[el.name] = ['', '<g id="' + el.name + '-layer" ' + el.attrs + '>']

  // set up some values; these are all in hex units
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScrolling' does not exist on type '{ ... Remove this comment to see the full error message
  const mapXOffset = Quest.Settings.settings.mapScrolling ? -playerCoord[0] : 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScrolling' does not exist on type '{ ... Remove this comment to see the full error message
  const mapYOffset = Quest.Settings.settings.mapScrolling ? -playerCoord[1] : 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapXOffset1' does not exist on type '{ p... Remove this comment to see the full error message
  const hexWidth = Math.floor(parseInt(Quest.Settings.settings.mapStyle.width) / (Quest.Settings.settings.mapXOffset1 + Quest.Settings.settings.mapXOffset2) + 1)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapYOffset' does not exist on type '{ pe... Remove this comment to see the full error message
  const hexHeight = Math.floor(parseInt(Quest.Settings.settings.mapStyle.height) / Quest.Settings.settings.mapYOffset / 2 + hexWidth / 2 + 1)
  const hexStartX = Math.floor(-hexWidth / 2 - mapXOffset)
  const hexStartY = Math.floor(-hexHeight / 2 - mapYOffset)

  // Loop through every cell
  for (let x = hexStartX; x <= hexStartX + hexWidth; x++) {
    for (let y = hexStartY * 2; y <= hexStartY + hexHeight; y++) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const cell = w[map.coordToCellName(x, y)] || {}   // get data for cell or default
      // We loop over all cells in a parallelogram because the x axis is rising,
      // but can ignore the top and bottom ones
      if (y + x / 2 > hexStartY + hexHeight + 1) continue
      if (y + x / 2 < hexStartY - 1) continue
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDraw' does not exist on type '{ toggl... Remove this comment to see the full error message
      map.mapDraw(lists, cell, x, y)
    }
  }

  // Add it all together
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDefs' does not exist on type '{ perfo... Remove this comment to see the full error message
  const result = Quest.Settings.settings.mapDefs ? Quest.Settings.settings.mapDefs() : []
  for (let key in lists) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    for (let el of lists[key]) result.push(el)
    result.push('</g>')
  }
  // Author can add extras to go over the top
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapExtras' does not exist on type '{ per... Remove this comment to see the full error message
  if (Quest.Settings.settings.mapExtras) result.push(...Quest.Settings.settings.mapExtras())
  // Add the player position marker
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapMarker' does not exist on type '{ per... Remove this comment to see the full error message
  result.push(Quest.Settings.settings.mapMarker ? Quest.Settings.settings.mapMarker(w[player.loc]) : map.marker())
  log(result)

  // The image will be draweing using these coordinates (in pixels)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapWidth' does not exist on type '{ perf... Remove this comment to see the full error message
  const x = -Quest.Settings.settings.mapWidth / 2 - mapXOffset * map.xFactor
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapHeight' does not exist on type '{ per... Remove this comment to see the full error message
  const y = -Quest.Settings.settings.mapHeight / 2 - (-mapYOffset - mapXOffset / 2) * map.yFactor
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapWidth' does not exist on type '{ perf... Remove this comment to see the full error message
  draw(Quest.Settings.settings.mapWidth, Quest.Settings.settings.mapHeight, result, { destination: 'quest-map', x: x, y: y })
}

// Points aroud the hexagon, starting from ten o'clock, and going clockwise
// last point is repeated to make borders easier
// @ts-expect-error ts-migrate(2339) FIXME: Property 'hexPoints' does not exist on type '{ tog... Remove this comment to see the full error message
map.hexPoints = [
  [-1, 0, -1],
  [1, 0, -1],
  [0, 1, 0],
  [1, 0, 1],
  [-1, 0, 1],
  [0, -1, 0],
  [-1, 0, -1],
]


// The default draw function for a room
// Puts the various bits in the appropriate lists

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDraw' does not exist on type '{ toggl... Remove this comment to see the full error message
map.mapDraw = function (lists: any, cell: any, x_: any, y_: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'yFactor' does not exist on type '{ toggl... Remove this comment to see the full error message
  const y = (-y_ - x_ / 2) * map.yFactor
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'xFactor' does not exist on type '{ toggl... Remove this comment to see the full error message
  const x = x_ * map.xFactor


  let s = '<polygon points="'
  for (let i = 0; i < 6; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapXOffset1' does not exist on type '{ p... Remove this comment to see the full error message
    s += (x + Quest.Settings.settings.mapXOffset1 * map.hexPoints[i][0] + Quest.Settings.settings.mapXOffset2 * map.hexPoints[i][1]) + ',' + (y + Quest.Settings.settings.mapYOffset * map.hexPoints[i][2]) + ' '
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapHexStroke' does not exist on type '{ ... Remove this comment to see the full error message
  s += '" onclick="Quest.Settings.settings.mapClick(' + x_ + ', ' + y_ + ')" stroke="' + Quest.Settings.settings.mapHexStroke + '" fill="'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDefaultColour' does not exist on type... Remove this comment to see the full error message
  s += cell.getHexColour ? cell.getHexColour() : Quest.Settings.settings.mapDefaultColour
  s += '"/>'
  //console.log(s)
  lists.base.push(s)

  for (let i = 0; i < 6; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawBorder' does not exist on type '{... Remove this comment to see the full error message
    map.mapDrawBorder(lists, cell, x, y, i)
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawLabel' does not exist on type '{ ... Remove this comment to see the full error message
  map.mapDrawLabel(lists, cell, x, y)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawSymbol' does not exist on type '{... Remove this comment to see the full error message
  map.mapDrawSymbol(lists, cell, x, y)
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawBorder' does not exist on type '{... Remove this comment to see the full error message
map.mapDrawBorder = function (lists: any, cell: any, x: any, y: any, side: any) {
  if (!cell['getHexBorder' + side]) return
  const style = cell['getHexBorder' + side](side)
  if (!style) return
  let s = '<line x1="'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapXOffset1' does not exist on type '{ p... Remove this comment to see the full error message
  s += (x + Quest.Settings.settings.mapXOffset1 * map.hexPoints[side][0] + Quest.Settings.settings.mapXOffset2 * map.hexPoints[side][1])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapYOffset' does not exist on type '{ pe... Remove this comment to see the full error message
  s += '" y1="' + (y + Quest.Settings.settings.mapYOffset * map.hexPoints[side][2])
  s += '" x2="'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapXOffset1' does not exist on type '{ p... Remove this comment to see the full error message
  s += (x + Quest.Settings.settings.mapXOffset1 * map.hexPoints[side + 1][0] + Quest.Settings.settings.mapXOffset2 * map.hexPoints[side + 1][1])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapYOffset' does not exist on type '{ pe... Remove this comment to see the full error message
  s += '" y2="' + (y + Quest.Settings.settings.mapYOffset * map.hexPoints[side + 1][2])
  if (typeof style === 'string') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapHexStrokeWidth' does not exist on typ... Remove this comment to see the full error message
    s += '" stroke="' + style + '" stroke-width="' + Quest.Settings.settings.mapHexStrokeWidth + 'px'
  }
  else {
    for (const key in style) {
      s += '" ' + key + '="' + style[key]
    }
  }
  s += '"/>'
  lists.borders.push(s)
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawLabel' does not exist on type '{ ... Remove this comment to see the full error message
map.mapDrawLabel = function (lists: any, cell: any, x: any, y: any) {
  if (!cell.getHexLabel) return
  const label = cell.getHexLabel()
  if (!label) return

  let s = '<text class="map-text" x="'
  s += x
  s += '" y="'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelOffset' does not exist on type '... Remove this comment to see the full error message
  s += (y - Quest.Settings.settings.mapLabelOffset)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelRotate' does not exist on type '... Remove this comment to see the full error message
  if (Quest.Settings.settings.mapLabelRotate) s += '" transform="rotate(' + Quest.Settings.settings.mapLabelRotate + ',' + x + ',' + (y - Quest.Settings.settings.mapLabelOffset) + ')'
  s += '" pointer-events="none">'
  s += label
  s += '</text>'
  lists.labels.push(s)
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawSymbol' does not exist on type '{... Remove this comment to see the full error message
map.mapDrawSymbol = function (lists: any, cell: any, x: any, y: any) {
  if (!cell.getHexSymbol) return
  const symbol = cell.getHexSymbol()
  if (!symbol) return

  const offset = cell.getHexSymbolOffset ? cell.getHexSymbolOffset() : [0, 0]
  let s = '<image class="map-image" x="'
  s += (x + offset[0])
  s += '" y="'
  s += (y + offset[1])
  s += '" href="'
  s += symbol
  s += '" pointer-events="none"/>'
  lists.symbols.push(s)
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'marker' does not exist on type '{ toggle... Remove this comment to see the full error message
map.marker = function () {
  const coord = map.cellNameToCoord(currentLocation)
  if (!coord) return
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'yFactor' does not exist on type '{ toggl... Remove this comment to see the full error message
  const y = (-coord[1] - coord[0] / 2) * map.yFactor
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'xFactor' does not exist on type '{ toggl... Remove this comment to see the full error message
  const x = coord[0] * map.xFactor
  let s = '<circle cx="'
  s += x
  s += '" cy="'
  s += y
  s += '" r="5" stroke="black" fill="blue" pointer-events="none"/>'
  return s
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river = function (x: any, y: any, ...data: any[]) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'border' does not exist on type '{ toggle... Remove this comment to see the full error message
  map.border(x, y, Quest.Settings.settings.mapRiverColour, ...data)
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'border' does not exist on type '{ toggle... Remove this comment to see the full error message
map.border = function (x: any, y: any, colour: any, ...data: any[]) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const hex = w[map.coordToCellName(x, y)]
  if (!hex) {
    log('Failed to add river to ' + map.coordToCellName(x, y))
    return
  }
  log(hex.name)
  for (const index in data) {
    if (!data[index]) continue
    hex['hexBorderWidth' + index] = data[index]
    hex['hexBorderColour' + index] = colour
    hex['getHexBorder' + index] = function (side: any) {
      return {
        stroke: this['hexBorderColour' + side],
        'stroke-width': this['hexBorderWidth' + side],
        'stroke-linecap': "round",
      }
    }
  }
  log(hex)
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'generate' does not exist on type '{ togg... Remove this comment to see the full error message
map.generate = function (x: any, y: any, data: any) {
  let row = y
  let col
  for (const s of data) {
    row--
    col = x
    for (const c of s) {
      col++

      createBiome(col, row, c)
    }
  }
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
if (Quest.Settings.settings.playMode === 'dev') {
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.unshift(new Cmd('DebugMap', {
    regex: /^debug map$/,
    objects: [
    ],
    script: function () {
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (w[key].mapZ == undefined) continue
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(w[key].name + ': ' + w[key].mapX + ', ' + w[key].mapY + ', ' + w[key].mapZ + ' Region=' + w[key].mapRegion)
      }
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }))
}



findCmd('Map').script = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideMap' does not exist on type '{ perfo... Remove this comment to see the full error message
  if (Quest.Settings.settings.hideMap) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#quest-map').style.display = 'block'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideMap' does not exist on type '{ perfo... Remove this comment to see the full error message
    delete Quest.Settings.settings.hideMap
  }
  else {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#quest-map').style.display = 'none'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideMap' does not exist on type '{ perfo... Remove this comment to see the full error message
    Quest.Settings.settings.hideMap = true
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'calcMargins' does not exist on type '{ n... Remove this comment to see the full error message
  io.calcMargins()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg(Quest.lang.done_msg)
  return world.SUCCESS_NO_TURNSCRIPTS
}