
Quest.Settings.settings.title = "The City of Halmuth"
Quest.Settings.settings.author = "The Pixie"
Quest.Settings.settings.version = "0.1"
Quest.Settings.settings.thanks = []
Quest.Settings.settings.warnings = "No warnings have been set for this game."
Quest.Settings.settings.playMode = "dev"
//Quest.Settings.settings.reportAllSvg = true
Quest.Settings.settings.symbolsForCompass = true

Quest.Settings.settings.libraries.push('image-map')
Quest.Settings.settings.libraries.push('quest')
Quest.Settings.settings.tests = true

Quest.Settings.settings.status = [
  function () { return '<td>Health points:</td><td>' + Quest.World.player.hitpoints + '</td>' },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDateTime' does not exist on type '{}'... Remove this comment to see the full error message
  function () { return '<td colspan="2">' + Quest.Utilities.util.getDateTime() + '</td>' },
]

Quest.Settings.settings.roomTemplate = [
  "#{cap:{hereName}}",
  "{hereDesc}",
  "{npcStatus}",
  "{objectsHere:You can see {objects} here.}",
]

Quest.Settings.settings.mapAndImageCollapseAt = 1000

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapImages' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.mapImages = [
  {
    name: 'Halmuth',
    file: 'game-alt-map/map.png',
    width: 1000,
    height: 1000,
  },
  {
    name: 'Small scale',
    file: 'game-alt-map/small_scale.png',
    width: 1000,
    height: 1000,
  },
]

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapScrollSpeed' does not exist on type '... Remove this comment to see the full error message
Quest.Settings.settings.mapScrollSpeed = 1
Quest.Settings.settings.mapStyle = {
  right: '0',
  top: '0',
  width: '400px',
  height: '400px',
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ right: string; top: string; width: string;... Remove this comment to see the full error message
  border: '3px black solid',
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapMarker' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.mapMarker = function (loc: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'polygon' does not exist on type '{ toggl... Remove this comment to see the full error message
  return map.polygon(loc, [
    [0, 0], [-5, -25], [-7, -20], [-18, -45], [-20, -40], [-25, -42], [-10, -18], [-15, -20]
  ], 'stroke:none;fill:black;pointer-events:none;opacity:0.5')
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'mapPointsOfInterest' does not exist on t... Remove this comment to see the full error message
Quest.Settings.settings.mapPointsOfInterest = [
  { mapX: 100, mapY: 100, fill: 'red', text: 'Here is one thing' },
  { mapX: 200, mapY: 200, fill: 'red', text: 'Here is another thing' },
  { mapX: 300, mapY: 300, fill: 'blue', text: 'Here is something else', isActive: function () { return true } },
]




Quest.Settings.settings.dateTime = {
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ startTime: number; secondsPerTurn: number;... Remove this comment to see the full error message
  startTime: 1000000000,
  secondsPerTurn: 60,
  data: [
    { name: 'second', number: 60 },
    { name: 'minute', number: 60 },
    { name: 'hour', number: 24 },
    { name: 'day', number: 235 },
    { name: 'year', number: 999999 },
  ],
  months: [
    { name: 'Jansi', n: 25 },
    { name: 'Febsi', n: 24 },
    { name: 'Marisi', n: 27 },
    { name: 'Apris', n: 23 },
    { name: 'Mays', n: 25 },
    { name: 'Junsi', n: 24 },
    { name: 'Julesi', n: 20 },
    { name: 'Augustes', n: 23 },
    { name: 'Setvensi', n: 24 },
  ],
  days: ['Day of the Moon', 'Day of the Song', 'Day of the Mother', 'Day of the Hearth', 'Day of the Fish', 'Day of the Father', 'Day of the Sun'],
  formats: {
    def: '%dayOfYear%, %year%, %hour%:%minute% %ampm%',
    time: '%hour%:%minute% %ampm%',
  },
  functions: {
    dayOfWeek: function (dict: any) {
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'days' does not exist on type '{ year: st... Remove this comment to see the full error message
      return Quest.Settings.settings.dateTime.days[(dict.day + 365 * dict.year) % Quest.Settings.settings.dateTime.days.length]
    },
    dayOfYear: function (dict: any) {
      let day = dict.day
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'months' does not exist on type '{ year: ... Remove this comment to see the full error message
      for (let el of Quest.Settings.settings.dateTime.months) {
        if (el.n > day) return (day + 1) + ' ' + el.name
        day -= el.n
      }
      return 'failed'
    },
    year: function (dict: any) { return dict.year + 1325 },
    hour: function (dict: any) { return dict.hour < 13 ? dict.hour : (dict.hour - 12) },
    minute: function (dict: any) { return dict.minute < 10 ? '0' + dict.minute : dict.minute },
    ampm: function (dict: any) {
      if (dict.minute === 0 && dict.hour === 0) return 'midnight'
      if (dict.minute === 0 && dict.hour === 12) return 'noon'
      return dict.hour < 12 ? 'am' : 'pm'
    },
  },
}
