import { Quest } from "../../types/quest";

const stars = {

  add(data: any) {
    // ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    this.data.push(data);
    const locs = [];

    for (const el of data.locations) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      encyclopedia[el.alias] = `In the [[${data.alias}]] system.|${el.desc}`;
      locs.push(el.alias);
    }
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    encyclopedia[data.alias] = `A type ${data.type} star in the ${data.sector} sector.|Significant locations include: [[${locs.join(']], [[')}]]`;
  },

  arriveAtSector() {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    Quest.World.w.ship.arrivedAtSector = true;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    Quest.World.w.ship.currentSystem = 'cyrennis';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    Quest.World.w.ship.datetime += 9 * 24 + 3;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    Quest.World.w.ship.currentLocation = 'starbase';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    Quest.World.w.ship.onView = 'nagoshima';

    Quest.World.player.mission_assemble_crew = 1001;
    Quest.World.player.mission_sector_7_iota = 1001;
    missions.init();
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    stars.draw();
  },

  data: [],

  draw(name: any) {
    const system = this.getSystem(name);
    const svg    = [];
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    if (Quest.World.w.ship.showStarMap) {
      for (const el of stars.data) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'x' does not exist on type 'never'.
        if (!el.x) continue;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'sector' does not exist on type 'never'.
        if (el.sector !== system.sector) continue;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'x' does not exist on type 'never'.
        svg.push(`<circle cx="${el.x}" cy="${el.y}" r="${el.size / 4}" fill="${el.colour}" stroke="none"/>`);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'x' does not exist on type 'never'.
        svg.push(`<text class="map-text" x="${el.x - 3}" y="${el.y - 5}" fill="white">${el.alias}</text>`);
      }
      svg.push(`<text class="map-text" x="0" y="12" fill="silver">Sector ${system.sector}</text>`);
    } else {
      svg.push(`<circle cx="200" cy="200" r="${system.size}" fill="${system.colour}" stroke="white"/>`);
      for (const el of system.locations) {
        svg.push(`<ellipse cx="200" cy="200" rx="${el.radius}" ry="${el.radius / 2}" fill="none" stroke="silver"/>`);
        const x = 200 + Math.sin(el.angle * Math.PI / 180) * el.radius;
        const y = 200 + Math.cos(el.angle * Math.PI / 180) * el.radius / 2;
        svg.push(`<circle cx="${x}" cy="${y}" r="3" fill="grey" stroke="white"/>`);
        svg.push(`<text class="map-text" x="${x - 3}" y="${y - 5}" fill="white">${el.alias}</text>`);
      }
      svg.push(`<text class="map-text" x="0" y="12" fill="silver">${system.system ? system.system : `${system.alias} system`}</text>`);
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    if (Quest.World.w.ship.arrivedAtSector) svg.push(`<text class="map-text" x="353" y="12" fill="silver" onclick="stars.toggleStarMap(${Quest.World.w.ship.showStarMap})">Toggle</text>`);
    svg.push('<text class="map-text" x="0" y="398" fill="silver">Quicksilver Starmaps</text>');
    svg.push('<text class="map-text" x="313" y="398" fill="silver">Not to scale</text>');
    Quest.IO.draw(400, 400, svg, { destination: 'quest-image' });
  },
  // track ship location with Quest.World.currentLocation, and work out the system from that
  getLocation(name: any) {
    return this.getSystemOrLocation(true, name);
  },
  getLocationNames() {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    const system = stars.getSystem(Quest.World.w.ship.currentSystem);
    return system.locations.map((el: any) => el.alias);
  },
  getStarNames() {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'alias' does not exist on type 'never'.
    return stars.data.map((el) => el.alias);
  },
  getSystem(name: any) {
    return this.getSystemOrLocation(false, name);
  },
  getSystemOrLocation(isLocation: any, name: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    if (name === undefined) name = Quest.World.w.ship.Quest.World.currentLocation;
    for (const el of this.data) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'locations' does not exist on type 'never... Remove this comment to see the full error message
      for (const el2 of el.locations) {
        if (el2.name === name) return isLocation ? el2 : el;
      }
    }
    log(`ERROR: Failed to find ${isLocation ? 'location' : 'system'} with name ${name}`);
  },
  toggleStarMap(flag: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    Quest.World.w.ship.showStarMap = !flag;
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    this.draw();
  },

};

/*
Star attributes
name           string              required  Single word identifier
alias          string              required  Title
system         string              optional  Title of the system
start          Boolean             optional  If true, this mission is there from arrival
colour         string (colour)     required  HTML colour for drawing the star
size           number              required  Size of the star on the map (Sol is 8)
type           string              required  The spectral classification
locations      array of stars      required  The planets and other locations in the system

Location attributes
name           string              required  Single word identifier
alias          string              required  Title
desc           string              required  Description for encyclopedia
radius         number              required  Major radius of the orbit (Earth is 180)
angle          number              required  Place on the orbit in degrees; zero is at the bottom, and it goes anti-clockwise

Planet classification

G Gas giant; predominantly hydrogen atmosphere
L Less than habitable; atmosphere is only just breathable (implies life is present to generate oxygen) (Mercury, Pluto, the asteroids are all L)
M Habitable; atmosphere is breathable (implies life is present to generate oxygen) (Earth is M)
N Little or no atmosphere; less than 0.01 atm (before terraforming, Mars was borderline N)
R Reducing; a significant atmosphere that is more than 1% carbon dioxide (before terraforming, Venus was R)
P Toxic; a significant atmosphere containing components toxic to humans

D Desert Quest.World.world; less than 5% of the surface is water
F Frozen, surface water is frozen, even at the equator
W Water Quest.World.world; less than 5% of the surface is land

C Colonised
T Undergoing terraforming
X Indigenous population, pre-space
Y Indigenous population, space capable
Z Planet believed to have had an Indigenous population

*/
stars.add({
  alias:     'Sol',
  colour:    'yellow',
  locations: [
    {
      alias:  'Stardock 83',
      angle:  200,
      desc:   'One of numerous star docks in the solar system, 83 is in Earth orbit at L4.',
      name:   'stardock',
      radius: 180,
    },
    {
      alias:  'Earth',
      angle:  130,
      desc:   'The cradle of mankind.',
      name:   'earth',
      radius: 180,
    },
    {
      alias:  'Venus',
      angle:  0,
      desc:   'Terraforming has turned Venus into a tropical paradise.',
      name:   'venus',
      radius: 90,
    },
    {
      alias:  'Mars',
      angle:  20,
      desc:   'Limited terraforming to support an industrial planet.',
      name:   'mars',
      radius: 280,
    },
  ],
  name:   'sol',
  sector: '1 Alpha',
  size:   8,
  start:  true,
  system: 'Solar system',
  type:   'G2',
});

stars.add({
  alias:     'Cyrennis Minima',
  colour:    'red',
  locations: [
    {
      alias:  'Starbase 142',
      angle:  220,
      desc:   'Starbase 142 is a type 7-gamma base, with limited facilities. It is currently under the command of Commander Nagoshima.|For historical reasons, Starbase 142 is in orbit around Cyrennis Minima, a star with no habitable planets. When it was established, all of the planets in the sector were independant and none wanted a Starbase in their sky. Although the political situation has changed significantly, Starbase 142 has remained in the same position.',
      name:   'starbase',
      radius: 140,
    },
  ],
  name:   'cyrennis',
  sector: '7 Iota',
  size:   12,
  start:  true,
  type:   'M2',
  x:      200,
  y:      200,
});
