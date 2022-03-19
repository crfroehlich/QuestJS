import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('me', Quest.Templates.PLAYER(), {
    examine: 'Just a regular guy.',
    hitpoints: 100,
    loc: 'street_of_the_gods',
    regex: /^(me|myself|player)$/,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('street_of_the_gods', {
    desc: 'The street rises to north up to the High Temple, and drops south to the market square. It is lined with stone-built buildings reaching three or even four storeys into the sky, with towers, turrets and spires reaching even higher. Grandest of all is the temple itself, standing on a platform that raises it high above the rest of the city, accessed via a wide flight of steps, but you also see the Museum of Curios to the west and the House of Elil to the southeast, with the condensers of the Aether and Flux Company behind it.{timeOfDayComment}',

    mapX: 400,

    mapY: 450,

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('high_temple'),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('market_square'),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('museum_of_curios'),
    // mapRegion:'Halmuth',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('market_square', {
    desc: 'The market square is the centre of the city, and is teeming with people. {timeOfDayComment} In the southeast corner you see the magnificent entrance of Estalia Manor.|In the centre of the square, a golden statue of Stratos and Geo embracing while looking north to the Great Temple stands on a stone plinth; their presence blesses all who pass through.',

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('wheat_road'),

    mapX: 390,

    mapY: 535,

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('street_of_the_gods'),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('merchants_street'),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    southeast: new Quest.World.Exit('estalia_manor'),

    timeStatus: [
      { t: 'The market is quiet at this time of night.', to: 7 },
      { t: 'Market stall owners are setting out their wares for the day.', to: 8 },
      { t: 'The market is full of people looking, buying and selling; there are dozens of stalls, selling everything from mushrooms to marquetry, from songbirds to shawls.', to: 13 },
      { t: 'The market is quieter in the heat of the afternoon.', to: 16 },
      { t: 'The market stalls are being packed away.', to: 17 },
      { t: 'The market stalls are closed, but a few people are still wondering through the square.', to: 25 },
    ],
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('western_way_halmuth'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('street_preacher', Quest.NPC.NPC(false), {
    loc: 'market_square',
    locationStatus() {
      return 'A preacher is standing on an old crate, telling people about woe and doom that will befall them soon; most of the crowd are happy to ignore him.';
    },
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('wheat_road', {
    desc: "The east side of Halmuth is the poorer side of the city. The tenement blocks on either are run down. Many have small shops or workshops on the ground floor, offering cheap goods of variable quality. Thandros' Arms and Armour to the northwest and Madame Rel's Little Shop of Wonders to the south catch your eye; the brothel to the southeast certainly does not! The upper floors are fronted by balconies, that are often bedecked with flowers or banners. To the northeast, on the corner of Tuppenny Lane, you see the gates of the Aether and Flux Company; towering over the wall are the condensers, focal towers and retorts.",

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('granite_bridge'),

    mapRegion: 'Halmuth',

    mapX: 666,

    mapY: 532,

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    northwest: new Quest.World.Exit('madame_rels', { testExit: Quest.Utilities.util.openingTimes }),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('quayside_east'),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('market_square'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('madame_rels', {
    alias: "Madame Rel's Little Shop of Wonders",
    desc: '.',
    properNoun: true,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    southeast: new Quest.World.Exit('wheat_road'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('merchants_street', {
    desc: "Merchant's Street slopes steeply down from the market place in the north to the quayside to the south. It takes it name from the many high-class shops that line it on both sides, many selling imported goods. Renfikk's Alchemical Emporium to the northeast catches your eye, on the corner with a narrow backstreet. A covered walkway spans the backstreet connecting the shop to Ulgat's Fine Goods to the southeast.",

    mapX: 385,

    mapY: 650,

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('market_square'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('quayside_west'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('quayside_west', {
    desc: "A three-story inn, The Leviathon, dominates the west end of the quayside, on the corner with Merchants' Street. Beyond it, you can see a couple of warehouses. Some fishing boats are moored to the quay.",

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('quayside'),

    mapX: 380,

    mapY: 770,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('merchants_street'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('quayside', {
    desc: 'The Quayside is boring, the author really needs to put stuff in it.',

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('quayside_east'),

    mapX: 550,

    mapY: 763,

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('wharf'),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('quayside_west'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('quayside_east', {
    desc: 'Warehouses line the east end of the quayside, storing goods inbound and outbound by ship. Most are in a state of disrepair. Some fishing boats are tied up on the quayside. A narrow road heads upwards and northwards to the Wheat Road; to the east you can see a boatyard.',

    mapX: 720,

    mapY: 750,

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('wheat_road'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('quayside'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('wharf', {
    desc: 'The wharf is a sturdy structure, built of dark wood, projecting out from the quay some two hundred feet. Ships are moored on either side, and dockworks hurry to unload and then load them as fast as they can.',

    mapX: 560,

    mapY: 900,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('quayside'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('western_way_halmuth', {
    desc: 'This is the start of the Western Way that connects Halmuth to Ogarath. To the east of you is the market square, the actual start of the road, and to the west the city gates. To the northeast, the tall building is the back of the Museum of Curios, whilst the pillared building to the south is the House of Leetos.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('market_square'),

    mapRegion: 'Halmuth',

    mapX: 250,

    mapY: 535,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('western_way_1'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('museum_of_curios', {
    desc: 'The museum is boring, the author really needs to put stuff in it.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('street_of_the_gods'),

    mapX: 300,

    mapY: 480,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    up: new Quest.World.Exit('museum_of_curios_upstairs'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('museum_of_curios_upstairs', {
    desc: 'The upper level of the museum is boring, the author really needs to put stuff in it.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    down: new Quest.World.Exit('museum_of_curios'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('high_temple', {
    desc: 'The High Temple is boring, the author really needs to put stuff in it.',

    mapX: 414,

    mapY: 306,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('street_of_the_gods'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('leviathon', {
    desc: 'The Leviathon is boring, the author really needs to put stuff in it.',

    mapX: 300,

    mapY: 706,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    southeast: new Quest.World.Exit('quayside_west'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('estalia_manor', {
    desc: 'Estalia Manor is boring, the author really needs to put stuff in it.',

    mapX: 755,

    mapY: 477,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    northwest: new Quest.World.Exit('market_square'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('western_way_1', {
    desc: 'The Western Way is boring, the author really needs to put stuff in it. To the east is the city of Halbuth',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('western_way_halmuth'),

    mapRegion: 'Small scale',

    mapX: 706,

    mapY: 641,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('western_way_2'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('western_way_2', {
    desc: 'The Western Way is boring, the author really needs to put stuff in it. To the east is the city of Halbuth',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('western_way_1'),

    mapRegion: 'Small scale',

    mapX: 572,

    mapY: 659,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('western_way_3'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('western_way_3', {
    desc: 'The Western Way is boring, the author really needs to put stuff in it. To the east is the city of Halbuth',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('western_way_2'),

    mapRegion: 'Small scale',
    // west:new Quest.World.Exit('western_way_1'),
    mapX: 461,
    mapY: 646,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('granite_bridge', {
    desc: 'The Granite Bridge is boring, the author really needs to put stuff in it. To the east is the city of Halbuth',

    mapRegion: 'Small scale',

    mapX: 774,

    mapY: 617,
    // east:new Quest.World.Exit('western_way_2'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('wheat_road'),
  });
}
