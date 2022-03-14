"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.settings.title = "Quest 6 Map Demo"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.settings.author = "The Pixie"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.settings.version = "0.1"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.settings.thanks = []
// @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.settings.warnings = "No warnings applicable to this game."
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.settings.playMode = "dev"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'reportAllSvg' does not exist on type '{ ... Remove this comment to see the full error message
Quest.settings.reportAllSvg = true

Quest.settings.libraries.push('node-map')
Quest.settings.mapAndImageCollapseAt = 1000
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapShowNotVisited' does not exist on typ... Remove this comment to see the full error message
Quest.settings.mapShowNotVisited = true
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapCellSize' does not exist on type '{ p... Remove this comment to see the full error message
Quest.settings.mapCellSize = 32
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.settings.mapScale = 50
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawLabels' does not exist on type '{... Remove this comment to see the full error message
Quest.settings.mapDrawLabels = true
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelStyle' does not exist on type '{... Remove this comment to see the full error message
Quest.settings.mapLabelStyle = {'font-size':'8pt', 'font-weight':'bold'}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelColour' does not exist on type '... Remove this comment to see the full error message
Quest.settings.mapLabelColour = 'blue'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelRotate' does not exist on type '... Remove this comment to see the full error message
Quest.settings.mapLabelRotate = -20
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelOffset' does not exist on type '... Remove this comment to see the full error message
Quest.settings.mapLabelOffset = -5
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ right: string; top: string; width: string;... Remove this comment to see the full error message
Quest.settings.mapStyle = {right:'0', top:'200px', width:'400px', height:'400px', 'background-color':'#ddd', border:'3px black solid', 'background-image':'url(game-map/paper.jpg)' }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapClick' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.settings.mapClick = function(name: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  metamsg("You clicked on " + w[name].alias)
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapAutomapFrom' does not exist on type '... Remove this comment to see the full error message
Quest.settings.mapAutomapFrom = ['street_middle', 'glade']
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapMarker' does not exist on type '{ per... Remove this comment to see the full error message
Quest.settings.mapMarker = function(loc: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'polygon' does not exist on type '{ toggl... Remove this comment to see the full error message
  return map.polygon(loc, [
    [0,0], [-5,-25], [-7, -20], [-18, -45], [-20, -40], [-25, -42], [-10, -18], [-15, -20]
  ], 'stroke:none;fill:black;pointer-events:none;opacity:0.3')
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapExtras' does not exist on type '{ per... Remove this comment to see the full error message
Quest.settings.mapExtras = function() {
  const result = []
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const room = w[player.loc]
  /*for (let o of [w.Robot, w.Lara, w.Kyle]) {
    if (w[o.loc].mapZ !== room.mapZ || w[o.loc].mapRegion !== room.mapRegion) continue
    result.push(o.mapDrawBase())
  }*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'polygon' does not exist on type '{ toggl... Remove this comment to see the full error message
  result.push(map.polygon(room, [
    [150, 100],
    [147, 117],
    [130, 120],
    [147, 123],
    [150, 160],
    [153, 123],
    [170, 120],
    [153, 117],
  ], 'stroke:black;fill:yellow;'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{ toggle: ... Remove this comment to see the full error message
  result.push(map.text(room, 'N', [150, 100], 'fill:black;font-size:14pt'))
  return result
}

