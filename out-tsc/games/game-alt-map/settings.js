Quest.Settings.settings.title = 'The City of Halmuth';
Quest.Settings.settings.author = 'The Pixie';
Quest.Settings.settings.version = '0.1';
Quest.Settings.settings.thanks = [];
Quest.Settings.settings.warnings = 'No warnings have been set for this game.';
Quest.Settings.settings.playMode = 'dev';
// Quest.Settings.settings.reportAllSvg = true
Quest.Settings.settings.symbolsForCompass = true;
Quest.Settings.settings.libraries.push('image-map');
Quest.Settings.settings.libraries.push('quest');
Quest.Settings.settings.tests = true;
Quest.Settings.settings.status = [
    function () {
        return `<td>Health points:</td><td>${Quest.World.player.hitpoints}</td>`;
    },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getDateTime' does not exist on type '{}'... Remove this comment to see the full error message
    function () {
        return `<td colspan="2">${Quest.Utilities.util.getDateTime()}</td>`;
    },
];
Quest.Settings.settings.roomTemplate = [
    '#{cap:{hereName}}',
    '{hereDesc}',
    '{npcStatus}',
    '{objectsHere:You can see {objects} here.}',
];
Quest.Settings.settings.mapAndImageCollapseAt = 1000;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapImages' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.mapImages = [
    {
        file: 'game-alt-map/map.png',
        height: 1000,
        name: 'Halmuth',
        width: 1000,
    },
    {
        file: 'game-alt-map/small_scale.png',
        height: 1000,
        name: 'Small scale',
        width: 1000,
    },
];
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapScrollSpeed' does not exist on type '... Remove this comment to see the full error message
Quest.Settings.settings.mapScrollSpeed = 1;
Quest.Settings.settings.mapStyle = {
    // ts-error-fixed ts-migrate(2322) FIXME: Type '{ right: string; top: string; width: string;... Remove this comment to see the full error message
    border: '3px black solid',
    height: '400px',
    right: '0',
    top: '0',
    width: '400px',
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapMarker' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.mapMarker = function (loc) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'polygon' does not exist on type '{ toggl... Remove this comment to see the full error message
    return map.polygon(loc, [
        [0, 0], [-5, -25], [-7, -20], [-18, -45], [-20, -40], [-25, -42], [-10, -18], [-15, -20],
    ], 'stroke:none;fill:black;pointer-events:none;opacity:0.5');
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapPointsOfInterest' does not exist on t... Remove this comment to see the full error message
Quest.Settings.settings.mapPointsOfInterest = [
    {
        fill: 'red', mapX: 100, mapY: 100, text: 'Here is one thing',
    },
    {
        fill: 'red', mapX: 200, mapY: 200, text: 'Here is another thing',
    },
    {
        fill: 'blue',
        isActive() {
            return true;
        },
        mapX: 300,
        mapY: 300,
        text: 'Here is something else',
    },
];
Quest.Settings.settings.dateTime = {
    data: [
        { name: 'second', number: 60 },
        { name: 'minute', number: 60 },
        { name: 'hour', number: 24 },
        { name: 'day', number: 235 },
        { name: 'year', number: 999999 },
    ],
    days: ['Day of the Moon', 'Day of the Song', 'Day of the Mother', 'Day of the Hearth', 'Day of the Fish', 'Day of the Father', 'Day of the Sun'],
    formats: {
        def: '%dayOfYear%, %year%, %hour%:%minute% %ampm%',
        time: '%hour%:%minute% %ampm%',
    },
    functions: {
        ampm(dict) {
            if (dict.minute === 0 && dict.hour === 0)
                return 'midnight';
            if (dict.minute === 0 && dict.hour === 12)
                return 'noon';
            return dict.hour < 12 ? 'am' : 'pm';
        },
        dayOfWeek(dict) {
            // ts-error-fixed ts-migrate(2551) FIXME: Property 'days' does not exist on type '{ year: st... Remove this comment to see the full error message
            return Quest.Settings.settings.dateTime.days[(dict.day + 365 * dict.year) % Quest.Settings.settings.dateTime.days.length];
        },
        dayOfYear(dict) {
            let { day } = dict;
            // ts-error-fixed ts-migrate(2551) FIXME: Property 'months' does not exist on type '{ year: ... Remove this comment to see the full error message
            for (const el of Quest.Settings.settings.dateTime.months) {
                if (el.n > day)
                    return `${day + 1} ${el.name}`;
                day -= el.n;
            }
            return 'failed';
        },
        hour(dict) {
            return dict.hour < 13 ? dict.hour : (dict.hour - 12);
        },
        minute(dict) {
            return dict.minute < 10 ? `0${dict.minute}` : dict.minute;
        },
        year(dict) {
            return dict.year + 1325;
        },
    },
    months: [
        { n: 25, name: 'Jansi' },
        { n: 24, name: 'Febsi' },
        { n: 27, name: 'Marisi' },
        { n: 23, name: 'Apris' },
        { n: 25, name: 'Mays' },
        { n: 24, name: 'Junsi' },
        { n: 20, name: 'Julesi' },
        { n: 23, name: 'Augustes' },
        { n: 24, name: 'Setvensi' },
    ],
    secondsPerTurn: 60,
    // ts-error-fixed ts-migrate(2322) FIXME: Type '{ startTime: number; secondsPerTurn: number;... Remove this comment to see the full error message
    startTime: 1000000000,
};
//# sourceMappingURL=settings.js.map