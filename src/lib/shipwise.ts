import { Quest } from '../types/quest';

Quest.lang.exit_list = [
  {
    abbrev: 'FP', key: 103, name: 'forward-port', niceDir: 'forward-port', opp: 'aft-starboard', rotate: 45, symbol: 'fa-arrow-left', type: 'compass', x: -1, y: 1, z: 0,
  },
  {
    abbrev: 'F', key: 104, name: 'forward', niceDir: 'forward', opp: 'aft', symbol: 'fa-arrow-up', type: 'compass', x: 0, y: 1, z: 0,
  },
  {
    abbrev: 'FS', key: 105, name: 'forward-starboard', niceDir: 'forward-starboard', opp: 'aft-port', rotate: 45, symbol: 'fa-arrow-up', type: 'compass', x: 1, y: 1, z: 0,
  },
  // ts-error-fixed ts-migrate(2322) FIXME: Type '{ name: string; abbrev: string; alt: string;... Remove this comment to see the full error message
  {
    abbrev: 'In', alt: 'enter', name: 'in', niceDir: 'inside', opp: 'out', symbol: 'fa-sign-in-alt', type: 'inout',
  },
  {
    abbrev: 'U', key: 107, name: 'up', niceDir: 'above', opp: 'down', symbol: 'fa-arrow-up', type: 'vertical', x: 0, y: 0, z: 1,
  },

  {
    abbrev: 'P', key: 100, name: 'port', niceDir: 'port', opp: 'starboard', symbol: 'fa-arrow-left', type: 'compass', x: -1, y: 0, z: 0,
  },
  {
    abbrev: 'Lk', key: 101, name: 'Look', symbol: 'fa-eye', type: 'nocmd',
  },
  {
    abbrev: 'S', key: 102, name: 'starboard', niceDir: 'starboard', opp: 'port', symbol: 'fa-arrow-right', type: 'compass', x: 1, y: 0, z: 0,
  },
  // ts-error-fixed ts-migrate(2322) FIXME: Type '{ name: string; abbrev: string; alt: string;... Remove this comment to see the full error message
  {
    abbrev: 'Out', alt: 'exit|o', name: 'out', niceDir: 'outside', opp: 'in', symbol: 'fa-sign-out-alt', type: 'inout',
  },
  {
    abbrev: 'Dn', alt: 'd', key: 109, name: 'down', niceDir: 'below', opp: 'up', symbol: 'fa-arrow-down', type: 'vertical', x: 0, y: 0, z: -1,
  },

  {
    abbrev: 'AF', key: 97, name: 'aft-port', niceDir: 'aft-port', opp: 'forward-starboard', rotate: 45, symbol: 'fa-arrow-down', type: 'compass', x: -1, y: -1, z: 0,
  },
  {
    abbrev: 'A', key: 98, name: 'aft', niceDir: 'aft', opp: 'forward', symbol: 'fa-arrow-down', type: 'compass', x: 0, y: -1, z: 0,
  },
  {
    abbrev: 'AS', key: 99, name: 'aft-starboard', niceDir: 'aft-starboard', opp: 'forward-port', rotate: 45, symbol: 'fa-arrow-right', type: 'compass', x: 1, y: -1, z: 0,
  },
  {
    abbrev: 'Z', key: 110, name: 'Wait', symbol: 'fa-clock', type: 'nocmd',
  },
  {
    abbrev: '?', name: 'Help', symbol: 'fa-info', type: 'nocmd',
  },
];
