"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
settings.title = "The City of Halmuth"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.author = "The Pixie"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
settings.version = "0.1"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.thanks = []
// @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
settings.warnings = "No warnings have been set for this game."
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
settings.playMode = "dev"
//settings.reportAllSvg = true
settings.symbolsForCompass = true

settings.libraries.push('hex-map')
settings.tests = true

settings.status = [
  function() { return '<td>Health points:</td><td>' + player.hitpoints + '</td>' },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDateTime' does not exist on type '{}'... Remove this comment to see the full error message
  function() { return '<td colspan="2">' + util.getDateTime() + '</td>' },
]

settings.roomTemplate = [
  "#{cap:{hereName}}",
  "{hereDesc}",
  "{objectsHere:You can see {objects} here.}",
]

settings.mapAndImageCollapseAt = 1000



settings.mapStyle = {
  right:'0',
  top:'0',
  width:'500px',
  height:'500px',
  //width:'100px',
  //height:'100px',
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ right: string; top: string; width: string;... Remove this comment to see the full error message
  border:'3px black solid',
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDefaultAlias' does not exist on type ... Remove this comment to see the full error message
settings.mapDefaultAlias = function(o: any) {
  o.setAlias('Hex-grid ' + o.mapX + ', ' + o.mapY )
  o.headingAlias = o.alias
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapClick' does not exist on type '{ perf... Remove this comment to see the full error message
settings.mapClick = function(x: any, y: any) {
  log(x + ',' + y)
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDrawLabels' does not exist on type '{... Remove this comment to see the full error message
settings.mapDrawLabels = true
//settings.mapLabelColour = 'blue'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelOffset' does not exist on type '... Remove this comment to see the full error message
settings.mapLabelOffset = -8
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapLabelRotate' does not exist on type '... Remove this comment to see the full error message
settings.mapLabelRotate = -10

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapXOffset1' does not exist on type '{ p... Remove this comment to see the full error message
settings.mapXOffset1 = 8
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapXOffset2' does not exist on type '{ p... Remove this comment to see the full error message
settings.mapXOffset2 = 16
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapYOffset' does not exist on type '{ pe... Remove this comment to see the full error message
settings.mapYOffset = 14
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapHexStroke' does not exist on type '{ ... Remove this comment to see the full error message
settings.mapHexStroke = '#fff'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapHexStrokeWidth' does not exist on typ... Remove this comment to see the full error message
settings.mapHexStrokeWidth = 4
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapDefaultColour' does not exist on type... Remove this comment to see the full error message
settings.mapDefaultColour = 'deepskyblue'
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapRiverColour' does not exist on type '... Remove this comment to see the full error message
settings.mapRiverColour = 'dodgerblue'


// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapReportRepeats' does not exist on type... Remove this comment to see the full error message
settings.mapReportRepeats = true

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapBiomes' does not exist on type '{ per... Remove this comment to see the full error message
settings.mapBiomes = {
  G:{name:'grassland', colour:'palegreen',},
  S:{name:'savanna', colour:'yellowgreen',},
  D:{name:'deciduous forest', colour:'olivedrab',},
  C:{name:'coniferous forest', colour:'darkgreen',},
  R:{name:'rain forest', colour:'olive',},
  M:{name:'marsh', colour:'teal',},
  // @ts-expect-error ts-migrate(1117) FIXME: An object literal cannot have multiple properties ... Remove this comment to see the full error message
  C:{name:'chaparral', colour:'burlywood',},
  H:{name:'heath', colour:'sandybrown',},

  s:{name:'sea', colour:'powderblue',},
  m:{name:'mountains', colour:'darkgrey',},
  l:{name:'lavafield', colour:'orange',},
  d:{name:'desert', colour:'khaki',},
  t:{name:'tundra', colour:'blanchedalmond',},
  a:{name:'artic', colour:'white',},
  r:{name:'reef', colour:'pink',},
}


