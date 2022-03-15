"use strict"


// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'map'.
const map = {
  toggle: true,
  defaults: {
    mapScale: 1,
    mapOffsetX: 0,
    mapOffsetY: 0,
    mapTextColour: 'black',
    mapLabelColour: 'black',
    mapScrollSpeed: 1,
    mapPointsOfInterest: [],
    mapStyle: {
      right: '0',
      top: '200px',
      width: '400px',
      height: '400px',
      'background-color': 'black',
      border: '3px black solid',
    },
    mapMarker: function (loc: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'polygon' does not exist on type '{ toggl... Remove this comment to see the full error message
      return map.polygon(loc, [
        [0, 0], [-5, -25], [-7, -20], [-18, -45], [-20, -40], [-25, -42], [-10, -18], [-15, -20]
      ], 'stroke:none;fill:black;pointer-events:none;opacity:0.5')
    },
    mapDrawPointOfInterest: function (point: any) {
      let s = '<g>'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
      s += '<text x="' + (point.mapX / Quest.Settings.settings.mapScale + 18) + '" y="' + (point.mapY / Quest.Settings.settings.mapScale - 23) + '" fill="' + point.fill + '">'
      s += point.text + '</text>'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'polygon' does not exist on type '{ toggl... Remove this comment to see the full error message
      s += map.polygon({
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
        mapX: point.mapX / Quest.Settings.settings.mapScale,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
        mapY: point.mapY / Quest.Settings.settings.mapScale,
      }, [
        [0, 0], [5, -12], [7, -10], [18, -22], [20, -20], [25, -21], [10, -9], [15, -10]
      ], 'stroke:none;fill:black;pointer-events:none;opacity:0.5')
      s += '</g>'
      return s
    },
  }
}





// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultStyle' does not exist on type '{ ... Remove this comment to see the full error message
map.defaultStyle = { position: 'fixed', display: 'block' }
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ toggle: boolean; defaults: { m... Remove this comment to see the full error message
Quest.IO.io.modulesToUpdate.push(map)
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ toggle: boolean; defaults: { m... Remove this comment to see the full error message
Quest.IO.io.modulesToInit.push(map)

// @ts-expect-error ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ toggle: ... Remove this comment to see the full error message
map.init = function () {
  // First set up the HTML page
  // !!!!!!!
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  Object.assign(document.querySelector('#quest-map').style, map.defaultStyle, Quest.Settings.settings.mapStyle)
  //document.querySelector("<style>")
  //    .prop("type", "text/css")
  //    .innerHTML = ".map-text " + Quest.Utilities.util.dictionaryToCss(Quest.Settings.settings.mapLabelStyle, true)
  //    .appendTo("head")
  //document.querySelector('.map-text').style.color = 'red'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapHeight' does not exist on type '{ per... Remove this comment to see the full error message
  Quest.Settings.settings.mapHeight = parseInt(Quest.Settings.settings.mapStyle.height)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapWidth' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.mapWidth = parseInt(Quest.Settings.settings.mapStyle.width)

  // Set the default values for settings
  for (let key in map.defaults) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!settings[key]) settings[key] = map.defaults[key]
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'questMapDiv' does not exist on type '{ t... Remove this comment to see the full error message
  map.questMapDiv = document.getElementById("quest-map")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'questMapDiv' does not exist on type '{ t... Remove this comment to see the full error message
  map.questMapDiv.addEventListener("mouseup", map.mouseDoneEvent)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'questMapDiv' does not exist on type '{ t... Remove this comment to see the full error message
  map.questMapDiv.addEventListener("mouseleave", map.mouseDoneEvent)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'questMapDiv' does not exist on type '{ t... Remove this comment to see the full error message
  map.questMapDiv.addEventListener("wheel", function (e: any) {
    e.preventDefault()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
    Quest.Settings.settings.mapScale -= e.deltaY * -0.01 * Quest.Settings.settings.mapScale / 4;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
    Quest.Settings.settings.mapScale = Math.min(Math.max(.2, Quest.Settings.settings.mapScale), 2.5);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'redraw' does not exist on type '{ toggle... Remove this comment to see the full error message
    map.redraw()
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'questMapDiv' does not exist on type '{ t... Remove this comment to see the full error message
  map.questMapDiv.addEventListener("mousedown", function (e: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseX' does not exist on type '{ toggle... Remove this comment to see the full error message
    map.mouseX = e.offsetX
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseY' does not exist on type '{ toggle... Remove this comment to see the full error message
    map.mouseY = e.offsetY
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseMoving' does not exist on type '{ t... Remove this comment to see the full error message
    map.mouseMoving = true
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'questMapDiv' does not exist on type '{ t... Remove this comment to see the full error message
  map.questMapDiv.addEventListener("mousemove", function (e: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseMoving' does not exist on type '{ t... Remove this comment to see the full error message
    if (!map.mouseMoving) return
    //console.log('@' + (e.offsetX - map.mouseX) + ',' + (e.offsetY - map.mouseY))
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'redraw' does not exist on type '{ toggle... Remove this comment to see the full error message
    map.redraw(map.mouseX - e.offsetX, map.mouseY - e.offsetY)
  })
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseDoneEvent' does not exist on type '... Remove this comment to see the full error message
map.mouseDoneEvent = function (e: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseMoving' does not exist on type '{ t... Remove this comment to see the full error message
  if (!map.mouseMoving) return
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mouseMoving' does not exist on type '{ t... Remove this comment to see the full error message
  map.mouseMoving = false
  //console.log('#' + (e.offsetX - map.mouseX) + ',' + (e.offsetY - map.mouseY))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapOffsetX' does not exist on type '{ pe... Remove this comment to see the full error message
  Quest.Settings.settings.mapOffsetX += map.mouseX - e.offsetX
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapOffsetY' does not exist on type '{ pe... Remove this comment to see the full error message
  Quest.Settings.settings.mapOffsetY += map.mouseY - e.offsetY
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'redraw' does not exist on type '{ toggle... Remove this comment to see the full error message
  map.redraw()
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type '{ toggle... Remove this comment to see the full error message
map.update = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapOffsetX' does not exist on type '{ pe... Remove this comment to see the full error message
  Quest.Settings.settings.mapOffsetX = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapOffsetY' does not exist on type '{ pe... Remove this comment to see the full error message
  Quest.Settings.settings.mapOffsetY = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.Settings.settings.mapScale = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'redraw' does not exist on type '{ toggle... Remove this comment to see the full error message
  map.redraw()
}

// Draw the map
// It collects all the SVG in five lists, which are effectively layers.
// This means all the exits appear in one layer, all the labels in another
// and so labels are always on top of exits
// @ts-expect-error ts-migrate(2339) FIXME: Property 'redraw' does not exist on type '{ toggle... Remove this comment to see the full error message
map.redraw = function (offX: any, offY: any) {
  // grab the current room region and level. If the room is missing either, give up now!
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (Quest.World.w[Quest.World.player.loc].mapX) Quest.World.player.mapX = Quest.World.w[Quest.World.player.loc].mapX / Quest.Settings.settings.mapScale
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (Quest.World.w[Quest.World.player.loc].mapY) Quest.World.player.mapY = Quest.World.w[Quest.World.player.loc].mapY / Quest.Settings.settings.mapScale
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (Quest.World.w[Quest.World.player.loc].mapRegion) Quest.World.player.mapRegion = Quest.World.w[Quest.World.player.loc].mapRegion

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapImages' does not exist on type '{ per... Remove this comment to see the full error message
  if (!Quest.World.player.mapRegion) Quest.World.player.mapRegion = Quest.Settings.settings.mapImages[0].name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapImages' does not exist on type '{ per... Remove this comment to see the full error message
  const mapImage = Quest.Settings.settings.mapImages.find((el: any) => el.name === Quest.World.player.mapRegion)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!mapImage) return Quest.IO.errormsg("Failed to find a map region called '" + Quest.World.player.mapRegion + "'")

  const result = []
  result.push('<g id="map-top">')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
  result.push('<image width="' + (mapImage.width / Quest.Settings.settings.mapScale) + '" height="' + (mapImage.height / Quest.Settings.settings.mapScale) + '", x="0", y="0" href="' + mapImage.file + '"/>')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapMarker' does not exist on type '{ per... Remove this comment to see the full error message
  result.push(Quest.Settings.settings.mapMarker(Quest.World.player))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapPointsOfInterest' does not exist on t... Remove this comment to see the full error message
  for (let point of Quest.Settings.settings.mapPointsOfInterest) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapImages' does not exist on type '{ per... Remove this comment to see the full error message
    if (!point.mapRegion) point.mapRegion = Quest.Settings.settings.mapImages[0].name
    if (point.mapRegion !== Quest.World.player.mapRegion) continue
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawPointOfInterest' does not exist o... Remove this comment to see the full error message
    if (!point.isActive || point.isActive()) result.push(Quest.Settings.settings.mapDrawPointOfInterest(point))
  }
  result.push('</g>')

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapOffsetX' does not exist on type '{ pe... Remove this comment to see the full error message
  let offsetX = Quest.Settings.settings.mapOffsetX - Quest.Settings.settings.mapWidth / 2
  if (offX) offsetX += offX
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapOffsetY' does not exist on type '{ pe... Remove this comment to see the full error message
  let offsetY = Quest.Settings.settings.mapOffsetY - Quest.Settings.settings.mapHeight / 2
  if (offY) offsetY += offY

  // Centre the view on the player, and draw it
  const x = Quest.World.player.mapX + offsetX
  const y = Quest.World.player.mapY + offsetY
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapWidth' does not exist on type '{ perf... Remove this comment to see the full error message
  Quest.IO.draw(Quest.Settings.settings.mapWidth, Quest.Settings.settings.mapHeight, result, { destination: 'quest-map', x: x, y: y, background: 'black' })
}





// @ts-expect-error ts-migrate(2339) FIXME: Property 'polygon' does not exist on type '{ toggl... Remove this comment to see the full error message
map.polygon = function (room: any, points: any, attrs: any) { return map.polyany('polygon', room, points, attrs) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'polyline' does not exist on type '{ togg... Remove this comment to see the full error message
map.polyline = function (room: any, points: any, attrs: any) { return map.polyany('line', room, points, attrs) }

// @ts-expect-error ts-migrate(2339) FIXME: Property 'polyany' does not exist on type '{ toggl... Remove this comment to see the full error message
map.polyany = function (type: any, room: any, points: any, attrs: any) {
  let s = '<poly' + (type === 'line' ? 'line' : 'gon') + ' points="'
  s += points.map((el: any) => '' + (room.mapX + el[0]) + ',' + (room.mapY + el[1])).join(' ')
  s += '" '
  if (attrs) s += ' style="' + attrs + '"'
  s += '/>'
  //console.log(s)
  return s
}

Quest.Command.findCmd('Map').script = function () {
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
  Quest.IO.io.calcMargins()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg(Quest.lang.done_msg)
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS
}