// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('bridge', {
  desc:  'This is the the brains of the Star Quest; this is where everything across the rest of the ship is controlled. In the centre is the command chair, surrounded by the workstations for each of the bridge officers. At the front, the view screen gives a panoramic view  of {if:ship:arrivedAtSector:space:the inside of the stardock}.',
  dests: [
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('quarters'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('crew_lounge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('med_bay'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('science_labs'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('engineering'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('shuttle_bay'),
  ],
  headingAlias: 'Bridge',
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('quarters', {
  desc:  'This is the the brains of the Star Quest; this is where everything across the rest of the ship is controlled. In the centre is the command chair, surrounded by the workstations for each of the bridge officers. At the front, the view screen gives a panoramic view  of {if:ship:arrivedAtSector:space:the inside of the stardock}.',
  dests: [
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('bridge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('crew_lounge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('med_bay'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('science_labs'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('engineering'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('shuttle_bay'),
  ],
  headingAlias: "Captain's Quarters",
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('crew_lounge', {
  desc:  'This is where the crew relax. And eat and drink.',
  dests: [
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('bridge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('quarters'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('med_bay'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('science_labs'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('engineering'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('shuttle_bay'),
  ],
  headingAlias: 'Crew Lounge',
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('med_bay', {
  desc:  'Any medical situation is handled here. There are four beds, all equipped with a bio-scanner.',
  dests: [
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('bridge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('quarters'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('crew_lounge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('science_labs'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('engineering'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('shuttle_bay'),
  ],
  headingAlias: 'Medical Bay',
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('science_labs', {
  desc:  'While data from the external scanners can be analysed from the bridge, sometimes more detail is required - and that involves getting an item to the labs.',
  dests: [
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('bridge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('quarters'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('crew_lounge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('med_bay'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('engineering'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('shuttle_bay'),
  ],
  headingAlias: 'Science Labs',
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('engineering', {
  desc:  "Engineering is dominated by the flux torus, which is the engine the moves the ship through hyperspace. Inside the doughnut-shaped device, the Q-flux is maintained at incredible high temperatures, and contained within EM-fields. However, that is all hidden away behind the alulead shielding.|All the ship's power is also taken from the flux torus.",
  dests: [
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('bridge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('quarters'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('crew_lounge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('med_bay'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('science_labs'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('shuttle_bay'),
  ],
  headingAlias: 'Engineering',
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('shuttle_bay', {
  desc:  'The ship has two shuttle craft, each capable of holding six persons. There is an additional bay to allow shuttles from other ships.',
  dests: [
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('bridge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('quarters'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('crew_lounge'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('med_bay'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('science_labs'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Quest.World.Exit('engineering'),
  ],
  headingAlias: 'Shuttle Hanger',
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('stars_mainscreen', {
  alias: 'Forward view',
  examine() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('On the mainscreen you see a field of stars, and familiar constellations you can see from earth, though brighter and more constant and so many more of them.');
  },
  isAtLoc(loc: any, situation: any) {
    return situation === Quest.World.world.PARSER && loc === 'bridge';
  },
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('ship', {
  afterLoad() {
    if (Quest.World.w.ship.arrivedAtSector) {
      // load missions
    }
  },
  alert:           0,
  alerts:          ['grey', 'Yellow', 'Orange', 'Red'],
  // currentSystem:'sol',
  currentLocation: 'stardock',

  dateTime: 0,

  getAlert() {
    const c = this.alerts[this.alert];
    return this.alert ? `<span style="border:black 1px solid;background-color:${c};">&nbsp;${c}&nbsp;</span>` : '-';
  },

  getDateTime(add: any) {
    let n = (854 * 360 + 63) * 24 + 5;
    if (add) {
      if (typeof add === 'string') add = parseInt(add);
      n += add;
    } else {
      n += this.dateTime;
    }
    return `${Math.floor(n / 24 / 360)}.${Math.floor(n / 24) % 360}.${n % 24}`;
  },

  getShields() {
    if (this.shields <= 0) return '<b>Failed</b>';
    if (this.shields === 101) return '<i>Off</i>';
    return `${this.shields}%`;
  },

  hullIntegrity: 100,

  onView: 'stars_mainscreen',

  shields:     101,
  showStarMap: false,
});
