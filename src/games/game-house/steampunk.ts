import { QuestClass } from '../../types/quest';
import { msg, falsemsg }        from '../../lib/io';

export const init = (Quest: QuestClass) => {
  register('steampunk', {
    book:    'Love\'s Labour\'s Lost',
    ceiling: 'The ceiling is white, with simple decorations along each edge.',
    door:    'The door is wood; panelled and unpainted.',
    floor:   'The floor is wooden, and well-polished.',
    listen:  'Mandy can hear a quiet humming and rhythmic pounding of distant machinery.',
    smell:   'The house smells old and musty, like it never gets any fresh air at all.',
    uniform: 'a brown uniform, with gold-coloured trim',
    walls:   'The walls are all panelled in wood.',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createRoom('steam_hall', Quest.Templates.ROOM_SET('steam hall'), {

    desc: "This large room is dominated by a huge engine, turning a giant flywheel from two cylinders connected to beams way over Mandy's head. Every second or so there is a puff of steam from a piston, making the room very hot and humid. There is a gallery above, and numerous pipes of different sizes going everywhere, but especially heading down a corridor to the west. The doorway east {if:greenhouse_west:visited:0:looks like it might head outside - Mandy can see plants out there:heads to the greenhouse}. There is a smaller door to the southeast.",

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('greenhouse_west'),

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    in: new Quest.World.Exit('lift', {
      alsoDir: ['southeast'],
      msg:     'She steps into the lift.',
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'lift' does not exist on type '{}'.
        if (Quest.World.w.lift.getTransitDestLocation() !== this.origin) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
          return Quest.Utilities.util.defaultSimpleExitUse(char, new Quest.World.Exit('lift_shaft', { dir: this.dir, msg: 'She heads through the doorway.', origin: this.origin }));
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, this);
      },
    }),

    scenery: [
      {
        alias:   'gallery',
        examine: "The gallery above Mandy's head runs around three sides of the hall. Made of metal, and very solid-looking.",
      },
      {
        alias:   'pistons',
        examine: 'There are two huge pistons, inside the two huge cylinders, pounding in and out.',
      },
      {
        alias:   'pipes',
        examine: 'The pipes are all brass; some as thin as her fingers, some big enough to crawl through - if there was a way into them. And they were not full of steam.',
      },
      {
        alias:   'engine',
        examine: 'Each of the two huge cylinders pushes out the piston lifting the beam above it, then gasps out a puff of steam as the piston drops again.',
      },
      {
        alias:   ['flywheel', 'fly wheel'],
        examine: 'The flywheel is arranged vertically and is taller than Mandy; it is spinning furiously, but does not seem to be achieving anything. Why is it not connected to a generator or something?',
      },
      {
        alias:   'beams',
        examine: 'Each beam is connected to a piston on one side and the flywheel on the other. As the piston goes up and down, the beam rocks up and down.',
      },
      {
        alias:   'cylinders',
        examine: 'The two steam cylinders are almost as tall as Mandy, standing upright on the ground. Each has an impressive array of tubes attached - though not enough to account for all the pipework in the room.',
      },
    ],

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('steam_corridor'),

    windowsface: 'south',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('lift_fake_lower', {
    alias: 'lift',
    calllift() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy frowns, unable to see any way to call the lift.');
    },
    examine:       'Mandy feels there should be a lift here, not just an empty shaft.',
    goInDirection: 'in',
    isLocatedAt(loc: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'lift' does not exist on type '{}'.
      return loc === this.loc && Quest.World.w.lift.getTransitDestLocation() !== this.loc;
    },
    loc:      'steam_hall',
    scenery:  true,
    synonyms: ['elevator', 'controls', 'buttons', 'shaft'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('lift_shaft', {
    desc() {
      let s = '{once:A small room, with a strangely high roof. Looking up, Mandy realises she:Mandy} is standing at the bottom of a lift shaft. ';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'lift' does not exist on type '{}'.
      s += Quest.World.w.lift.getTransitDestLocation() === Quest.World.w.upper_steam_hall
        ? 'The lift itself must be the ceiling of the room, on the floor above.'
        : 'The lift itself is way over her head; she can see another doorway above the one she came through that must be the floor above.';
      s += ' There are rails on both side walls, with a rack between them, presumably for a pinion to engage.';
      if (!this.liftNoted) {
        s             += '|It occurs to Mandy that if the lift is up there, someone must have ridden up in it, and he is likely still there. That is where she needs to get to! She just has to work out how...';
        this.liftNoted = true;
      }
      return `${s} The only way out is back northwest.`;
    },

    liftNoted: false,

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    out: new Quest.World.Exit('steam_hall', { alsoDir: ['west', 'northwest'] }),

    scenery: [
      { alias: ['racks', 'teeth'], examine: 'The rack is a long metal rail, with teeth -- effectively a cogwheel laid out flat. It is bolted to the wall.' },
      { alias: ['rails'], examine: 'There are two rails either side of each rack, bolted to the wall.' },
      { alias: ['cogs', 'pinions'], examine: 'The pinion is presumably in the mechanism on the lift itself, and so not visible from here.' },
    ],

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    up: new Quest.World.Exit('_', { msg: 'If she was only Peter Parker, she could get up there.{once: There must be lots of spiders, if she can only work out which is radioactive. And get it to bite her. Yeah, maybe not such a great idea, she decides.}', use: Quest.Utilities.util.cannotUse }),

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('lift_shaft_item', {
    alias:         'lift shaft',
    goInDirection: 'up',
    loc:           'lift_shaft',
    scenery:       true,
    synonyms:      ['elevator shaft'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('steam_corridor', {
    afterEnter() {
      if (this.tmp) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(this.tmp);
        delete this.tmp;
      }
    },
    alias: 'a corridor',

    beforeEnter(exit: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.chamber_pot.underLeakState > 4) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        if (Quest.World.w.chamber_pot.underLeakState < 10) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'steam_corridor_duct' does not exist on t... Remove this comment to see the full error message
          if (exit.origin !== Quest.World.w.steam_corridor_duct) {
            this.tmp = 'Mandy notices a silver person half way down the corridor. He - or it maybe - kicks over the chamber pot, spilling the water on the floor. Before Mandy can react, the jerk runs off ';
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'steam_hall' does not exist on type '{}'.
            this.tmp += `${exit.origin === Quest.World.w.steam_hall ? 'west' : 'east'}, down the other end of the corridor.`;
          }
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        Quest.World.w.chamber_pot.underLeakState = 0;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        Quest.World.w.chamber_pot.underLeak = false;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        Quest.World.w.chamber_pot.flipped = true;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'steam_corridor_duct' does not exist on t... Remove this comment to see the full error message
      if (exit.origin === Quest.World.w.steam_corridor_duct && Quest.World.w.Silver.active) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Silver' does not exist on type '{}'.
        Quest.World.w.Silver.agenda = ['wait', 'run:agendaFlee'];
      }
    },

    desc: "The corridor runs from east to west, with three windows along the north side. Various brass pipes run the length of the south wall, while others turn abruptly to dive into the wall above a {if:grating:scenery:grating:vent} in the wall. All seem to converge at the east end of the corridor, above the doorway there. Water is dripping from one of the larger pipes, high up on the south side{if:chamber_pot:underLeak:, into a chamber pot}{if:chamber_pot:flipped:. There is an upturned chamber pot near where the water is dripping}.{if:Silver:active:|There is a silver humanoid here, looking very startled at Mandy's sudden appearance!}",

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('steam_hall'),

    properNoun: true,

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('steam_corridor_duct', {
      alsoDir: ['in'],
      msg:     'Following a fine tradition of Hollywood movies, Mandy climbs into the vent. What can possibly go wrong?',
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'grating' does not exist on type '{}'.
        if (Quest.World.w.grating.scenery) return falsemsg('It works in Hollywood... Mandy gives the grating a good pull... It is stuck solid. No way is she getting into the vents without something sharp and strong to prise the grating off the wall.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, this);
      },
    }),

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    west: new Quest.World.Exit('brass_dining_room', {
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
        if (Quest.World.w.brass_dining_room.blocked()) return falsemsg('Mandy starts heading west, but the dining room is now so full of mannequins, she cannot get into it.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, this);
      },
    }),

    windowsface: 'north',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('pipes', {
    examine:  'The pipes are brass, and polished to a shine, though as she looks more closely Mandy can see the more hidden bits are not so well cared for. Some are too hot to touch, others feel very cold.',
    loc:      'steam_corridor',
    pronouns: Quest.lang.pronouns.plural,
    scenery:  true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('vent', {
    examine:  '{if:grating:scenery:The vent behind the grating looks dark:The vent is about half a metre wide and a little higher. There are pipes running through it at the top. It is too dark to see far into it}.',
    loc:      'steam_corridor',
    pronouns: Quest.lang.pronouns.plural,
    scenery:  true,
    synonyms: ['duct'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('grating', Quest.Templates.TAKEABLE(), {
    afterMove(options: any) {
      this.msgTake = Quest.lang.take_successful;
    },
    examine: 'The grating is metal and about half a metre square{if:grating:scenery:, and fitted over a duct in the south wall of the corridor. It feels a bit warm: and somewhat bent out of shape}.',
    loc:     'steam_corridor',
    open(options: any) {
      return this.take(options);
    },
    openwith(options: any) {
      const item = options.secondItem;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'crocodile_tooth' does not exist on type ... Remove this comment to see the full error message
      if (item !== Quest.World.w.crocodile_tooth) return falsemsg('Mandy wonders if she could open the grating with {nm:item:the}. She shakes her head - no, that will not work.', { item });
      return this.take(options);
    },
    scenery:  true,
    synonyms: ['grate'],
    testTake(options: any) {
      if (!this.scenery) return true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
      if (options.char === Quest.World.w.Patch) {
        this.msgTake = "'Patch, see if you can get that grating off there,' says Mandy.|Patch gives her a curious glance, but then kneels in front of the grating, and gives it a good pull, yanking it away from the wall. He proudly holds the grating as he stands up.";
        return true;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'crocodile_tooth' does not exist on type ... Remove this comment to see the full error message
      if (Quest.World.w.crocodile_tooth.loc === Quest.World.player.name && Quest.World.w.crocodile_tooth.size > 5) {
        this.msgTake = "Mandy jams the enlarged crocodile tooth into the small gap between the grating and the wall, then gives it a wiggle. The grating moves slight. She jams the tooth in further, and gives it another wriggle. Then moves it to another position, and does the same. Slowly but surely the grating is levered away from the wall, until at last it clatters to the floor. 'Yes!' says Mandy triumphantly, as she picks it up.";
        return true;
      }

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'crocodile_tooth' does not exist on type ... Remove this comment to see the full error message
      if (Quest.World.w.crocodile_tooth.loc === Quest.World.player.name) return falsemsg('Mandy looks at the crocodile tooth. If that was bigger, she might be able to use it to lever the grating off the wall.');

      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg('Mandy gives the grating a good pull, but it is not moving. If she was stronger... or had something to use as a lever...');
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('leaking_pipe', {
    examine:        'Mandy follows the descending column of drips up to a join somewhat above her head, where two wide pipes meet. Water is seeping from between the flanges.',
    loc:            'steam_corridor',
    parserPriority: -10,
    repair:         '{i:If I had a spanner,} thinks Mandy, {i:I could fix that leak... if it were the right size... and I could reach that high... and I were strong enough... and I could see any point to doing so...}',
    scenery:        true,
    synonyms:       ['flanges', 'water', 'drips'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('steam_corridor_duct', {
    afterEnter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.chamber_pot.underLeak) {
        log('here');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Silver' does not exist on type '{}'.
        delete Quest.World.w.Silver.agendaWaitCounter;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Silver' does not exist on type '{}'.
        Quest.World.w.Silver.agenda = Quest.World.w.Patch.loc === 'steam_corridor' ? ['wait:4', 'run:agendaPatch'] : ['wait:2', 'run:agendaArrive', 'run:agendaUpendPot', 'run:agendaLeave'];
      }
    },
    alias:    'vent duct',
    desc:     "Mandy is in a duct way just slightly wider than she is. It is dark, and unpleasantly warm. To the north is the steam corridor, to the south only a few metres away, two very solid bars prevent further access.{once: {i:Hollywood, you've let me down!} she thinks to herself. {i:All I've done is great a place to hide while watching water drip...}}",
    noFollow: true,
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north:    new Quest.World.Exit('steam_corridor', {
      alsoDir: ['out'],
      msg:     '{if:Silver:active:Mandy quickly scrambles out of the duct:Mandy climbs out of the vent, and brushes off her hands on her skirt}.',
    }),

    properNoun: true,

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('Silver', Quest.NPC.NPC(), {
    active: false,
    agendaArrive() {
      log('here');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'steam_corridor_duct' does not exist on t... Remove this comment to see the full error message
      if (Quest.World.currentLocation === Quest.World.w.steam_corridor_duct && Quest.World.w.chamber_pot.underLeak) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('From the duct, Mandy watches as a silver figure cautiously edges down the corridor from the dining room.');
        this.loc    = 'steam_corridor';
        this.active = true;
      }
    },
    agendaFlee() {
      if (!this.active) return;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'steam_corridor_duct' does not exist on t... Remove this comment to see the full error message
      if (Quest.World.currentLocation === Quest.World.w.steam_corridor_duct || Quest.World.currentLocation === Quest.World.w.steam_corridor) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The Silver dashes off, towards the dining room.');
      }
      this.active = false;
    },
    agendaLeave() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'steam_corridor_duct' does not exist on t... Remove this comment to see the full error message
      if (Quest.World.currentLocation === Quest.World.w.steam_corridor_duct && Quest.World.w.chamber_pot.flipped) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The Silver walks off, towards the dining room.');
        this.active = false;
      }
    },
    agendaPatch() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'steam_corridor_duct' does not exist on t... Remove this comment to see the full error message
      if (Quest.World.currentLocation === Quest.World.w.steam_corridor_duct) msg('There is no sign of a Silver; Mandy wonders if Patch is scaring them off.');
    },
    agendaUpendPot() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'steam_corridor_duct' does not exist on t... Remove this comment to see the full error message
      if (Quest.World.currentLocation === Quest.World.w.steam_corridor_duct && Quest.World.w.chamber_pot.underLeak) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The Silver in the corridor kicks the chamber pot over, spilling the small amount of water on the floor.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        Quest.World.w.chamber_pot.underLeak = false;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        Quest.World.w.chamber_pot.flipped = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        Quest.World.w.chamber_pot.underLeakState = 0;
      }
    },
    catch(options: any) {
      return this.take(options);
    },
    consultable: false,
    examine:     "The figure is human-shaped, but not human, Mandy realises. It's skin is silver, it has clothes or hair, but also no sexual characteristics. It looks to be slightly shorter than her.",
    isLocatedAt(loc: any) {
      return this.active && (loc === 'steam_corridor_duct' || loc === 'steam_corridor');
    },
    parserPriority: 10,
    pronouns:       Quest.lang.pronouns.thirdperson,
    scenery:        true,
    synonyms:       ['silver man', 'silver humanoid', 'silver figure'],
    take() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
      Quest.World.w.brass_dining_room.mannequinCount = 0;
      this.active                                    = false;
      const s                                        = "|'Got you,' she yells triumphantly.Its skin feels disturbingly cold; soft like flesh, and yet somehow still hard like metal.|The silver twitches, trying to free itself, but Mandy has got both hands on it now. 'You're not going anywhere,' she says.|Suddenly it is gone and she is holding fresh air. 'Fuck!'";
      if (Quest.World.player.loc !== 'steam_corridor') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`Mandy quickly pulls herself out of the vent, and throws herself at the Silver, wildly trying to grab it. The creature looks up, startled, and looks left and right, perhaps trying to decide which way to run. That moment of indecision gives Mandy the opportunity to grab its ankle.${s}`);
        Quest.World.player.loc = 'steam_corridor';
        Quest.World.world.update();
        // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        Quest.World.world.enterRoom(new Quest.World.Exit('steam_corridor', { dir: 'north', origin: Quest.World.w.steam_corridor_duct }));
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`Mandy makes a grab for the Silver, tackling it rugby-style, and knocking it to the ground.${s}`);
      }
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createRoom('upper_steam_hall', Quest.Templates.ROOM_SET('steam hall'), {
    afterEnter() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      if (this.silverSighting[this.visited % 20]) msg(this.silverSighting[this.visited % 20]);
    },

    desc: 'This is a catwalk that overlooks the main steam hall, perhaps to give maintenance access to the upper parts of the great engine. Built of very solid metal, it hugs the north, east and west walls of the hall, and is about level with the beams that are pounding up and down on top of the engine in the centre of the hall. From here, she could go in the lift to get to the upper or lower levels, or head north or east.',

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('greenhouse_catwalk_west'),

    headingAlias: 'The Steam Hall (Upper)',

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    in: new Quest.World.Exit('lift', {
      alsoDir: ['southeast'],
      msg:     'She steps into the lift.',
      simpleUse(char: any) {
        if (Quest.World.w.lift.getTransitDestLocation() !== this.origin) {
          if (char === Quest.World.player) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg('Mandy is about to step through the doorway, when she realises there is nothing there! This is, she guesses a lift shaft, minus the lift.');
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            msg('Mandy is about to send {nm:char:the} through the doorway, when she realises there is nothing there! This is, she guesses a lift shaft, minus the lift.', { char });
          }
          if (!Quest.World.w.lift_shaft.liftNoted) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg('It occurs to Mandy that if the lift is up there, someone must have ridden up in it, and he is likely still there. That is where she needs to get to! She just has to work out how...');
            Quest.World.w.lift_shaft.liftNoted = true;
          }

          return false;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, this);
      },
    }),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('gallery_south'),

    scenery: [
      {
        alias:   'pipes',
        examine: 'The pipes are all brass; some as thin as her fingers, some big enough to crawl through - if there was a way into them. And they were not full of steam.',
      },
      {
        alias:   'engine',
        examine: 'Each of the two huge cylinders pushes out the piston lifting the beam above it, then gasps out a puff of steam as the piston drops again.',
      },
      {
        alias:   ['flywheel', 'fly wheel'],
        examine: 'The flywheel is arranged vertically and is taller than Mandy; it is spinning furiously, but does not seem to be achieving anything. Why is it not connected to a generator or something?',
      },
      {
        alias:   'pistons',
        examine: 'There are two huge pistons, inside the two huge cylinders, pounding in and out.',
      },
      {
        alias:   'beams',
        examine: 'The beams are approximately level with Mandy; each is connected to a piston on one side and the flywheel on the other, down below. As the piston goes up and down, the beam rocks up and down.',
      },
      {
        alias:   'cylinders',
        examine: 'Mandy looks down on the two steam cylinders, watching the pistons go up and down.',
      },
    ],
    silverSighting: {
      12: 'Mandy can see another silver figure on the floor below. It looks up at Mandy, before dashing off into the greenhouse.',
      16: 'There is a silver figure stood at the lift shaft. Mandy tries to edge close, but it hears her, and runs off.',
      19: 'Another of those silver figures skitters across the lower floor of the steam hall has Mandy enters the upper hall.',
      6:  'Mandy sees a silver figure, staring at the lift shaft. It looks at Mandy, then jumps down the lift shaft. A monent later she sees it running out the other side of the steam hall on the lower level.',
    },
    windowsface: 'north',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('lift_fake_upper', {
    alias: 'lift',

    calllift() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy frowns, unable to see any way to call the lift.');
    },

    // climb:'Mandy looks at the liftshaft - could she climb it? Doubtful. And there is the matter of the lift blocking the shaft.',
    examine: 'Mandy feels there should be a lift here, not just an empty shaft.',

    goInDirection: 'in',

    isLocatedAt(loc: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'lift' does not exist on type '{}'.
      return loc === this.loc && Quest.World.w.lift.getTransitDestLocation() !== this.loc;
    },

    loc:      'upper_steam_hall',
    scenery:  true,
    synonyms: ['elevator', 'controls', 'buttons', 'liftshaft', 'shaft'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createRoom('lift', Quest.Templates.TRANSIT('out'), {
    desc: 'The lift is little more than a platform on vertical rails{once:, the proper exit from which is to the northwest, into the control room above the steam hall. Now inside it, :. }Mandy can see three buttons on a plinth, connected to the mechanism; a motor of some sorts at the back of the lift that turns cogs - or rather pinions - on a rack on each side.{once: That would mean the weight of the lift is held on just one tooth of each pinion; hmm, perhaps best not to think about that too much.} It is currently at {transitDest:lift}. The only exit is northwest.',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    out:  new Quest.World.Exit('steam_control_room', { alsoDir: ['west', 'northwest'] }),

    scenery: [
      {
        alias:   ['motor', 'engine'],
        examine: 'The lift motor is about the size of a large suitcase; a mass of cogs and gears that is slowly leaking oil.',
      },
      {
        alias:   'oil',
        examine: 'The oil is black and looks disgusting. She not going anywhere near that.',
      },
      {
        alias:          'lift',
        examine:        'The lift is a metal platform that runs on two vertical rails.',
        goOutDirection: 'out',
      },
      {
        alias:   ['buttons', 'plinth'],
        examine: 'There are three buttons, arranged vertically on a plinth, one for each floor: Steam Hall, Upper Steam Hall and Control Room.',
        push:    'Mandy wonders which button to press...',
      },
      { alias: ['racks', 'teeth'], examine: 'The rack is a long metal rail, with teeth -- effectively a cogwheel laid out flat. It is bolted to the wall.' },
      { alias: ['cogs', 'pinions'], examine: 'The pinion is presumably in the mechanism, and sadly not visible from here.' },
    ],
    testTransit(player: any, options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
      if (Quest.World.w.Patch.loc !== this.name) return true;
      if (this[this.transitDoorDir].name === 'steam_control_room') return true;
      if (this[this.transitDoorDir].name === 'upper_steam_hall' && options.button.transitDest !== 'steam_control_room') return true;
      if (this[this.transitDoorDir].name === 'steam_hall' && options.button.transitDest === 'steam_hall') return true;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg('Mandy presses the button for "{show:item:title}". The motor shudders and groans, and the lift shakes for a few moments, without actually getting anywhere, before the motor gives up, and falls silent.{once: Mandy looks at Patch, and wonders how much he weighs...}', { item: options.button });
      return false;
    },
    windowsface: 'none',
  });
  const liftDests     = ['steam_hall', 'upper_steam_hall', 'steam_control_room'];
  const liftDestNames = ['Steam Hall', 'Upper Steam Hall', 'Control Room'];
  const seeFromFloras = ['at the bottom', 'in the middle', 'at the top'];
  for (let i = liftDests.length - 1; i >= 0; i--) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
    Quest.World.createItem(`button_${i + 1}`, Quest.Templates.TRANSIT_BUTTON('lift'), {
      alias:              `Button: ${i + 1} (${liftDestNames[i]})`,
      examine:            `A button with the number ${i + 1} on it.`,
      parserPriority:     15,
      scenery:            true,
      seeFromFlora:       seeFromFloras[i],
      title:              `Floor ${i + 1}: ${liftDestNames[i]}`,
      transitAlreadyHere: `Mandy presses the button marked ${i + 1}; nothing happens. Perhaps the lift is already there?`,
      transitDest:        liftDests[i],
      transitGoToDest:    `Mandy presses the button marked ${i + 1}; the motor on the floor of the lift comes to life. A few moments later she is at the ${liftDestNames[i]} floor.`,
    });
  }

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('steam_control_room', {
    afterEnter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.Winfield_Malewicz.loc === undefined || Quest.World.w.Winfield_Malewicz.loc === this.name || Quest.World.w.Winfield_Malewicz.dead) return;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.Winfield_Malewicz.loc === 'weird_room') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Dr Malewicz follows Mandy out of the strange room. '{random:I hate that place:Always gives me the willies going in there:Loathsome man}', he says.");
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Dr Malewicz follows Mandy into the control room.');
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      Quest.World.w.Winfield_Malewicz.loc = this.name;
    },

    afterFirstEnter() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Good day, miss,' says the man. 'I'm Malewicz; Dr Winfield Malewicz. It's such a delight to actually meet someone after all this time.' This is the guy the letter is for, Mandy realises.");
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      Quest.World.w.Winfield_Malewicz.loc = 'steam_control_room';
    },

    alias: 'control room',

    desc: 'The control room is a masterpiece in wood and brass. Every surface is wood, and every piece of wood is littered with brass switches, knobs and dials. There is a rather grand chair in the middle of it all{if:Winfield_Malewicz:loc:steam_control_room:, with an old man sitting on it}. A doorway to the southeast goes back to the lift, while a strange pool of darkness might be another exit to the north.{if:invite:scenery: There is a wedding invitation on the desk.}',

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    in: new Quest.World.Exit('lift', {
      alsoDir: ['southeast'],
      msg:     'She steps into the lift.',
    }),

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north: new Quest.World.Exit('weird_room', { msg: 'A little nervous, Mandy steps into the pool of darkness...' }),

    scenery: [
      { alias: 'chair', examine: 'The chair at first glance looks like a golden throne, but Mandy realises it is brass, which is not quite so impressive. It does have red padding on it, though.' },
      { alias: ['wood', 'surface'], examine: "The wood looks to be walnut to Mandy's eye." },
    ],
    smell:       '{ifMoreThan:steampunk_controls:count:4:The room smells of burning wood.:There is a slight smell of lubricating oil.}',
    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('steampunk_controls', {
    alias:   'controls',
    count:   0,
    examine: 'There is a myriad of knobs, switches and dials, with no obvious pattern.{ifMoreThan:steampunk_controls:count:4: There is smoke coming from the panel.}',
    flip(options: any) {
      this.interact(options, 'flip');
    },
    interact(options: any, verb: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (!Quest.World.w.Winfield_Malewicz.dead) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`Mandy reaches out to ${verb} one of the controls. 'Please don't touch any of them,' says Dr Malewicz.{once: 'They are all carefully set to maintain the balance of the house.'}`);
        return false;
      }
      this.count++;
      if (this.count === 5) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`Mandy ${verb}s one of the controls at Quest.Random.rndm. There is a grinding noise from below it, and smoke starts to gently waft up from behind it. It does not smell good.`);
      } else if (this.count > 5) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`Mandy ${verb}s one of the controls at Quest.Random.rndm. Smoke continues to fill the room.`);
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`Mandy ${verb}s one of the controls at Quest.Random.rndm. Nothing happens.`);
      }
      return true;
    },
    loc:      'steam_control_room',
    pronouns: Quest.lang.pronouns.plural,
    pull(options: any) {
      this.interact(options, 'pull');
    },
    push(options: any) {
      this.interact(options, 'push');
    },
    synonyms: ['knobs', 'dials', 'switches'],
    turn(options: any) {
      this.interact(options, 'turn');
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('Winfield_Malewicz_corpse', {
    alias:    'Winfield Malewicz\'s corpse',
    examine:  'After all the corpses on the beach, Mandy should be used to bodies, but knowing this one is dead at her hand gives it a fresh horror. She decides she would rather not look at it.',
    synonyms: ['man', 'body', 'corpse'],
    take:     "The thought of picking up Malewicz's corpse makes Mandy feel sick. And she really does not want more blood on her.",
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('bloody_brick', SIZE_CHANGING(), {
    desc4: 'The bloody brick is a very small house brick, with "London Brick Company" stamped into it, and covered in the blood of Dr Malewicz.{once: It occurs to Mandy that the murder weapon will be easier to dispose of now...}',
    desc5: 'The bloody brick - or murder weapon - is an ordinary house brick, with "London Brick Company" stamped into it, and covered in the blood of Dr Malewicz.',
    desc6: 'The bloody brick - or murder weapon - is a huge house brick, with "London Brick Company" stamped into it, and covered in a disturbing amount of blood.',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('Winfield_Malewicz', Quest.NPC.NPC(), {
    askOptions: [
      {
        name: 'Himself',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Who exactly are you?' says Mandy.|'I'm Dr Winfield Malewicz, inventor and natural philosopher.' He pauses, and Mandy wonders if he has more to say. 'I was born in Coventry - my parents came from Poland many years ago - and studied at Cambridge University, and I have been studying the very nature of space and time. I read a very promising thesis by a promising student of Prof. Alfred Kleiner, and that led to me to certain experiments that, in hindsight, were a little ill-advised. But might I ask who you are?");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I'm Amanda Kettleton, but everyone calls me Mandy. I was just passing the house... and I kind of got trapped here.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'{class:riddle:Story of my life!} This was my house once,' he says. 'I built the analytical machine you see before you. Now, well, I think it belongs to itself now. You can talk to it, you know.' He indicates the doorway to the north. 'Only thing that keeps me sane, oh the {class:riddle:midnight memories} we've shared.' Mandy is not entirely convinced it has kept him sane.");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('Midnight memories');
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('Story of my life');
        },
        test(p: any) {
          return p.text.match(/himself|who he|doctor|winfield|malewicz|man/) || (p.text.match(/he is/) && p.text2 === 'who');
        },
      },
      {
        name: 'What happened',
        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
          if (Quest.World.currentLocation !== Quest.World.w.lounge) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'What... happened?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'It came alive. The house, that is. My fault really. I suppose there really are things that man should not mess with.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Bullshit. What about iPods and Facebook and XBox; where would they be if mankind took that attitude?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'I... have no idea what you are talking about.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'No, you don't, which is kind the point really. So just tell me what happened.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'It got sick. The silvers, I don't know where they came from, but they infected it like a virus. They wanted to infect other houses, {class:riddle:more than this} one.");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.whatHappenedAsked = true;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.songlist.push('More than this');
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          else if (Quest.World.w.Winfield_Malewicz.whatHappenedAsked) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'And again, what happened?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'I must confess I am not entirely certain. It is as though there were two minds at work; the evil house being dominant, but the good house that we briefly saw was good and trying to help us. It was the good house that posed the riddle, knowing the answer would end it all, and somehow tricked the evil house into asking it.'");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            if (!Quest.World.w.Winfield_Malewicz.riddleExplained) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
              Quest.World.w.Winfield_Malewicz.riddleExplained = true;
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'And the answer?'");
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'Obvious in hindsight' say Dr Malewicz, 'Pass through time and space in one direction,  in a linear, orderly manner. But why you?'");
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("Mandy shrugged. 'I was into a boy-band called One Direction.'");
            }
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'What... happened?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'It came alive. The house, that is. My fault really. I suppose there really are things that man should not mess with.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Bullshit. What about iPods and Facebook and XBox; where would they be if mankind took that attitude?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("He looks at Mandy in confusion for a moment, before continuing. 'I must confess I am not entirely certain, but it appears there were two minds at work; the evil house being dominant, but the good house that we briefly saw was good and trying to help us. It was the good house that posed the riddle, knowing the answer would end it all, and somehow tricked the evil house into asking it.'");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            if (!Quest.World.w.Winfield_Malewicz.riddleExplained) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
              Quest.World.w.Winfield_Malewicz.riddleExplained = true;
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'And the answer?'");
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'Obvious in hindsight' say Dr Malewicz, 'Pass through time and space in one direction,  in a linear, orderly manner. But why you?'");
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("Mandy shrugged. 'I was into a boy-band called One Direction.'");
            }
          }
        },
        test(p: any) {
          return p.text.match(/what happened|house/) || (p.text.match(/happen/) && p.text2 === 'what');
        },
      },
      {
        name: 'Patch',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What's the deal with Patch?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Patch?' Dr Malewicz looks confused.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'The corpse you were trying to animate with lightning.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I can assure that that is nothing to do with {i:me}. Yes, I had seen it, and I would {class:riddle:happily} destroy it if I thought I could. As though lightning can animate a body; quite the reverse in fact! It tends to be fatal.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('Happily');
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
          if (Quest.World.w.Patch.loc === Quest.World.w.Winfield_Malewicz.loc) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'He is literally standing right here.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'What? Oh. Oh, yes, I see. Well I suppose that puts it in a slightly different light.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'You hadn't noticed him?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Of course I had, but a gentleman does not ask about that sort of thing. Or not in my day. I dare say these things have changed.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Right...'");
          }
        },
        test(p: any) {
          return p.text.match(/patch/);
        },
      },
      {
        name: 'Song Titles',

        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So how did you know those One D song titles?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I'm not sure what you're talking about.'");
          let s = "'You were dropping me clues. ";
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          s += Quest.Utilities.formatList(Quest.World.w.Winfield_Malewicz.songlist.map((el: any) => `{i:${el}}`), { lastJoiner: 'and' });
          s += ". They're all One Direction song titles.'";
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(s);
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I still don't know what you are talk about.'");
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
        test(p: any) {
          return p.text.match(/song/) && Quest.World.currentLocation === Quest.World.w.lounge && Quest.World.w.Winfield_Malewicz.songlist.length > 2;
        },
      },
      {
        name: 'Riddle',

        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
          if (Quest.World.currentLocation !== Quest.World.w.lounge) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'It keeps asking the same question. What direction?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'I'm sorry, I can't help you. I would {class:riddle:happily} do so if I could, but I rather think it's {class:riddle:gotta be you}, you see. You have to solve this {class:riddle:one thing}.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'But I don't know what to do!'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Well, you have to do it, {class:riddle:one way or another}. Otherwise {class:riddle:you and I} are here for a very long time.'");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.songlist.push('One way or another');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.songlist.push('You and I');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.songlist.push('Gotta be you');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.songlist.push('One thing');
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          else if (!Quest.World.w.Winfield_Malewicz.riddleExplained) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.riddleExplained = true;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'So the riddle... Why was \"one\" the answer again?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Obvious in hindsight' say Dr Malewicz, 'Pass through time and space in one direction,  in a linear, orderly manner. But surely you knew that? You were the one who got it right.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("Mandy shrugged. 'I was into a boy-band called One Direction.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'So the riddle... I mean, why?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'It is rather strange,' admits Dr Malewicz. 'It is as though the house's subconscious ws working to help us. I would love to do some more investigations...'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'If you could wait until I am well away, that would be great.'");
          }
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'weird_room' does not exist on type '{}'.
        test(p: any) {
          return p.text.match(/riddle|question/) && Quest.World.w.weird_room.visited > 0;
        },
      },
      {
        name: 'How long here',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'How long have you been here?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'A long time. It feels like several years, but I suspect considerably longer have passed on the outside. Your mode of dress looks quite alien to me, for {class:riddle:one thing}; the colours are garnish, the thread I cannot guess at. {class:riddle:More than this}, your hemline is, well, it would be considered scandalous in 1911. And yet I suppose they are common in your time?'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
          if (Quest.World.currentLocation !== Quest.World.w.lounge) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("Mandy glanced down at her uniform, now inexplicably red and hot pink. 'I was wearing grey and navy when I entered the house. But yeah, its 2016.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("Mandy glanced down at her uniform, now back to its usual colours. 'Yeah, its 2016.'");
          }
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Over a hundred years...'");

          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('One thing');
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('More than this');
        },
        test(p: any) {
          return p.text.match(/what happened/) || (p.text.match(/long/) && p.text.match(/here/) && p.text2 === 'how');
        },
      },
      {
        name: 'Escape',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Is there no way out?'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
          if (Quest.World.currentLocation === Quest.World.w.lounge) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("Dr Malewicz frowns. 'I was rather assuming we had solved it. Just step outside the door.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'None. The walls might as well be made of {class:riddle:steel, my girl}.'");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.songlist.push('Steal my girl');
          }
        },
        test(p: any) {
          return p.text.match(/escape|way out|get out/);
        },
      },
      {
        name: 'Silvers',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What are the silver figures I keep seeing?'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
          if (Quest.World.currentLocation !== Quest.World.w.lounge) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Entities from another dimension. I think they slipped through when the house... changed. They're worse after dark - the {class:riddle:night changes} things around here; they'll try to {class:riddle:drag me down} to their lair. So far, I have managed to repel them. That is why I hide in the control room. With the lift up here, they can't reach me. It was peaceful until that strange room appeared and the house started to taunt me.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Entities from another dimension. I think they slipped through when the house... changed. They were worse after dark. That was why I took to hiding in the control room. With the lift up there, they couldn't reach me. It was peaceful until that strange room appeared and the house started to taunt me.'");
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('Night changes');
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('Drag me down');
        },
        test(p: any) {
          return p.text.match(/silver/);
        },
      },
      {
        name: 'Einstein',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So, er, you know Einstein?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What makes you say that?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Er...' She does not want him to know she read the invite. 'This seems like the sort of stuff he would be into.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'You're familiar with his work? I always suspected his research would go down in {class:riddle:history}.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Sure. Relativity and... that... stuff.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('History');
        },
        test(p: any) {
          return p.text.match(/(einstein|albert)/);
        },
      },
      {
        name: 'Wedding Invitation',

        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Is that an invitation to Einstein's wedding?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'As it happens, yes. Not that it's any of your business.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So you are friends with Einstein. Wow.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I suppose I've missed it by now.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'By about a century!'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.songlist.push('History');
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'invite' does not exist on type '{}'.
        test(p: any) {
          return p.text.match(/(elsa|wedding|invitation)/) && Quest.World.w.invite.hasBeenRead;
        },
      },
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So where do you go to the toilet?' asks Mandy.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I beg your pardon?' He looks slightly aghast at the question.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Where do you go to the toilet?' asks Mandy. 'I've been all over this stupid house, and never seen a toilet.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, er, well I see. Well, as it happens, I've not had to use a toilet since all this happened.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'For over a century? Isn't that a bit odd?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I've been trapped in a three bedroom house with a theatre and a castle inside for over a hundred years. I'm afraid \"a bit odd\" doesn't really cover it.'");
        },
        // toilets
        test(p: any) {
          return p.text.match(/toilet|piss|wee/);
        },
      },
      {
        name: 'Relativity',

        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I guess you know all about relativity?' She had to admit she had not paid that much attention in physics, but she was fairly sure that had not been on the syllabus.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I'm not exactly an expert. I'm what you might call a practical scientist, rather than theoretical. I'm afraid some of the maths is beyond me.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, God, yes!' says Mandy with feeling. If even Dr Malewicz struggles with maths, she does not feel so bad about doing so too.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'The basic principle is that if you are on a train and it is a perfectly smooth ride, there is no way to tell if you are moving or stationary without looking outside, and therefore it is equally valid to say the train is stationary and the Quest.World.world is moving as it is to say the train is moving.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'That's all there is too it?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Well, that's the starting point.'");
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'invite' does not exist on type '{}'.
        test(p: any) {
          return p.text.match(/relativity/) && Quest.World.w.invite.hasBeenRead;
        },
      },
      {
        name: 'family',

        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I saw all those paintings, are they your family?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Paintings?'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall_scenery_portraits' does not e... Remove this comment to see the full error message
          if (Quest.World.w.front_hall_scenery_portraits.examine_count) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'In the front hall, there are five. Old guy in uniform, old lady, woman, two other guys.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'There's a painting I saw of a family; a man and woman, three kids.'");
          }
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, yes. Well, as you surmise, they are indeed my family. My father and mother, and my older brother and sister.");
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'gallery_south_scenery_portraits' does no... Remove this comment to see the full error message
        test(p: any) {
          return p.text.match(/family/) && (Quest.World.w.gallery_south_scenery_portraits.examine_count || Quest.World.w.front_hall_scenery_portraits.examine_count);
        },
      },
      {

        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What was your father like?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'A fine man! I always had a lot of respect for him. He brought my mother to England in 1863, when the uprising failed, then joined the British army to provide for her. He eventually became a captain.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'gallery_scenery_portraits' does not exis... Remove this comment to see the full error message
          if (Quest.World.w.gallery_scenery_portraits) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'So the man on the white stallion was him?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Oh yes! Though I think the white stallion might be artist licence.'");
          }
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So did he fight a battle on a beach? Against soldiers in blue? And was that his horse that died?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("He fought in a lot of battles, but yes, I do seem to remember him telling me about his horse dying under him while he was defending a beach against some incursion. I'm afraid the details have escaped me.'");
        },
        // father
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'gallery_south_scenery_portraits' does no... Remove this comment to see the full error message
        test(p: any) {
          return p.text.match(/father/) && (Quest.World.w.gallery_south_scenery_portraits.examine_count || Quest.World.w.front_hall_scenery_portraits.examine_count);
        },
      },
      {

        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What was your mother like?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'A very loving woman! It cannot have been easy for her when she came to England, not knowing anyone, hardly speaking the language, and my father away so much.'");
        },
        // mother
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'gallery_south_scenery_portraits' does no... Remove this comment to see the full error message
        test(p: any) {
          return p.text.match(/mother/) && (Quest.World.w.gallery_south_scenery_portraits.examine_count || Quest.World.w.front_hall_scenery_portraits.examine_count);
        },
      },
      {

        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What was your sister like?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Dorothea... Though we were born in England, our parents were Polish, which to me is a source of pride, but she always seemed rather ashamed of the fact. '");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall_scenery_younglady' does not e... Remove this comment to see the full error message
          if (Quest.World.w.front_hall_scenery_younglady.examine_count) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("Mandy thought about the painting of the blonde woman in the hall. 'Is that why she bleached her hair?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'What? Oh, well, yes, I suppose it was.'");
          }
        },
        // sister
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'gallery_south_scenery_portraits' does no... Remove this comment to see the full error message
        test(p: any) {
          return p.text.match(/sister/) && (Quest.World.w.gallery_south_scenery_portraits.examine_count || Quest.World.w.front_hall_scenery_portraits.examine_count);
        },
      },
      {

        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What was your brother like?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'A bit of a rogue, if I'm honest. Cecil always had a way with the women - quite the opposite to me - and delighted in leading them astray. And vice versa. He rather fancied himself as a thespian, but was never very successful, I'm afraid.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.askedAboutBrother = true;
        },
        // brother
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'gallery_south_scenery_portraits' does no... Remove this comment to see the full error message
        test(p: any) {
          return p.text.match(/brother|cecil/) && (Quest.World.w.gallery_south_scenery_portraits.examine_count || Quest.World.w.front_hall_scenery_portraits.examine_count);
        },
      },
      { // clockwork thespian, before
        name: 'Clockwork thespian',

        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          Quest.World.w.Winfield_Malewicz.askedAboutClockworkThespianBefore = true;
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What's the deal with the clockwork thespian?'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          if (!Quest.World.w.Winfield_Malewicz.askedAboutBrother) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Cecil... My brother. Rather fancied himself as an actor, but he could never get a part! Then the house sucked him... I tried to keep him wound up for months, but then I decided it was more of a mercy to just let him sleep, I'm afraid.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'That's Cecil... I tried to keep him wound up for months, but then I decided it was more of a mercy to just let him sleep, I'm afraid.'");
          }
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Mandy thinks back to her conversations with him. 'Wait, he said the \"Night Changes\", another One Direction song. And \"Perfect\". That was how he was getting me out of the house, clues to the riddle, not an excursion to a battlefield!'");
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
        test(p: any) {
          return p.text.match(/thespian|actor/) && Quest.World.currentLocation === Quest.World.w.lounge;
        },
      },
      {
        script() {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
          if (Quest.World.w.Winfield_Malewicz.askedAboutClockworkThespianBefore) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'So again, what's the deal with the clockwork thespian?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Cecil? I hope he is returned to normal. I'm not sure quite how this works; he could be elsewhere in the house, or in a theatre somewhere? It is quite a mess, but at least it feels like a mess I can resolve!'");
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            if (!Quest.World.w.Winfield_Malewicz.askedAboutBrother) {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'Cecil... My brother. Rather fancied himself as an actor, but he could never get a part! Then the house sucked him... I tried to keep him wound up for months, but then I decided it was more of a mercy to just let him sleep, I'm afraid.'");
            } else {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'That's Cecil... I tried to keep him wound up for months, but then I decided it was more of a mercy to just let him sleep, I'm afraid.'");
            }
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("Mandy thinks back to her conversations with him. 'Wait, he said the \"Night Changes\", another One Direction song. And \"Perfect\". That was how he was getting me out of the house, clues to the riddle, not an excursion to a battlefield!'");
          }
        },
        // clockwork thespian, after
        test(p: any) {
          return p.text.match(/thespian|actor/);
        },
      },
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Who's the tiny man?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, yes, Big Bert,' says Dr Malewicz. 'The house's twisted sense of humour, I suppose. He came here delivering coal not long after it happened, the house got him. Sometimes I think it's a mercy he cannot remember just how long it's been. Later his wife came looking for him, and it got here too, but I'm not sure what happened to her.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Did she become the china doll?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, goodness, I hope not. That's even more disturbing.'");
        },
        // tiny man
        test(p: any) {
          return p.text.match(/bert|tiny man/);
        },
      },
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Who's with that yellow balloon?' asks Mandy. 'It seems to rest the room.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Yes, a fascinating phenomenon,' says Dr Malewicz. 'Unfortunately whenever I tried to study it I forgot where I was every few seconds.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'You could just keep it off the ground.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What? No, no, that would upset the conditions. Einstein proposed that a huge mass would bend time, I wondered if the balloon was mocking him - something with negligible mass distorting time.'");
        },
        // balloon
        test(p: any) {
          return p.text.match(/balloon/);
        },
      },
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Why is it so hard to use the lift?' asks Mandy.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'It's actually quite simple - there is a button corresponding to each floor.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Right... But not much help when you're on a diufferent floor.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, I see what you mean. well that is deliberate. I removed the controls so the Silvers could not call the lift while I'm up here.'");
        },
        // lift
        test(p: any) {
          return p.text.match(/lift|elevator/);
        },
      },
      {
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What's with the freaky hourglass?' asks Mandy.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, a little project of mine. The greenhouse is so delightful I have developed an interest in botany. But I'm afraid I lack patience, and so used the hourglass. It's just an ordinary hourglass - the clever stuff is in the pedestal and buried in the ground. But each time I used it, the hourglass lost some sand. I fixed a tap, hoping to be able to fill it, but never found any sand.'");
        },
        // hourglass
        test(p: any) {
          return p.text.match(/hourglass/);
        },
      },
      {
        msg: "'What's the deal with the mannequins in the dining room?'|'I'm not sure,' admits Dr Malewicz. 'I think they are connected to the Silvers, possibly acting as a gateway from their dimension to this. Sometimes there are so many it's impossible to get in the dining room, and that seems to be when they are most active. Other times there are just a couple sat at the table.'",

        name: 'Mannequins',
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
        test(p: any) {
          return p.text.match(/mannequin/) && Quest.World.w.brass_dining_room.visited > 2;
        },
      },
      {
        script(p: any) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(`Mandy asks Dr Malewicz about ${p.text}.`);
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I'm sorry my dear,' he replies, 'I have no idea what you're talking about. Is there some other topic you'd like to discuss?'");
        },
      },
    ],
    endFollow() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("'Wait here,' says Mandy to {nm:npc:the}.", { npc: this });
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg("'I wasn't going anywhere!'");
    },
    examine: 'Dr Malewicz is a slim man, perhaps a little below average height, with a friendly smile. He might be about forty, and, unaccountably, his hair is very neat, and not at all what Mandy expects from a mad scientist. He is wearing a tweed jacket, with a burgundy tie.',
    kill() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
      if (Quest.World.currentLocation === Quest.World.w.lounge) return falsemsg('Why would Mandy want to kill Dr Malewicz now?');

      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy feels a sudden urge to kill Dr Malewicz. The brick in her hand will do nicely... She edges round the back of him, then brings the brick down hard on the back of his head. He crumples to the floor.');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy looks at the body, then the brick. Both are covered in blood. 'Oh fuck,' she shrieks, 'what have I done?'");
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'weird_room' does not exist on type '{}'.
      if (Quest.World.currentLocation === Quest.World.w.weird_room) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'{smallcaps:You've killed him,}' says the house-man. '{smallcaps:Good job too. For over a century I've had to suffer his company. God, it boring. It's so dull! Constantly whining. I'm sure it'll be much for fun, just you and me.}'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy looks at the brick again. Where had that come from? 'You made me do it,' she accuses the house-man.");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'{smallcaps:No! I will admit to putting the brick in your hand, but you chose to do that. And now you get to live with the consequences. Look on the bright side - at least you do get to live with the consequences, unlike Malewicz.}'");
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('After a while her heart rate returns to something like normal. She looks at the brick again. Where did that come from? She did not have that before.');
        this.deathToBeNoted = true;
      }
      delete this.loc;
      this.dead = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz_corpse' does not exist... Remove this comment to see the full error message
      Quest.World.w.Winfield_Malewicz_corpse.loc = Quest.World.currentLocation.name;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'bloody_brick' does not exist on type '{}... Remove this comment to see the full error message
      Quest.World.w.bloody_brick.loc = Quest.World.player.name;
    },
    parserPriority: 10,
    receiveItems:   [
      {

        f(options: any) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Mandy gives the letter to Dr Malewicz 'This is for you; it was in the street.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'A letter?' He turns it over, inspecting the address. 'It is for me! This is most unusual.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I know, right? Who sends letters nowadays?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Malewicz proceeds to open the envelope, and eagerly pulls out the letter. 'A wedding invitation! How delightful!' He thinks for a moment. 'What's the date?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Thirteenth of May.... Er, 2016.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Oh, it seems I have missed it then. And the centenary of it too, if it comes to that. How disappointing.' He throws the envelope away, but puts the invitation on the desk. 'He was married back in 1903, but I was aware it was not a happy marriage. His new wife is, I think, his cousin. I hope they'll be happy. Or were happy, I suppose should say.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
          delete Quest.World.w.letter.loc;
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'invite' does not exist on type '{}'.
          Quest.World.w.invite.loc = 'steam_control_room';
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'invite' does not exist on type '{}'.
          Quest.World.w.invite.scenery = true;
          return true;
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
        item: Quest.World.w.letter,
      },
    ],
    receiveItemsFailMsg: "Mandy offer {nm:item:the} to Dr Malewicz, who looks at it with disdain. 'what's that for?' he asks.",
    songlist:            [],
    startFollow() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("'Follow me,' says Mandy to {nm:npc:the}.", { npc: this });
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg("'I doubt the house will let me. It has kept me here a very long time.'");
    },
    synonyms: ['old man', 'doctor', 'dr'],
    talkto() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy wonders what {i:topics} she could {i:ask Dr Malewicz about}...');
      return false;
    },
    tellOptions: [
      {
        script(p: any) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
          if (Quest.World.currentLocation === Quest.World.w.lounge) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'It's kind of a shame, in a way,' muses Mandy. 'If it wasn't so fuck... messed up, it would be a great place to live. Its own theatre, the greenhouse, so many rooms. Any time you want to go to the beach, just turn a chess piece. I'm assuming no corpses on the beach, of course, and no shifting a dead horse to get back.'");
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'This house is seriously fucked up,' Mandy says to Dr Malewicz. He says nothing, and Mandy realises he is probably surprised at her choice of words. 'I mean screwed... er, messed up.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("Yes, well, I agree it is {i:messed} up.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'I mean, what house has a steam engine ad a theatre in it and an observatory at the back, and its got way to many rooms for its size.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'Yes, had noticed that.'");
          }
        },
        test(p: any) {
          return p.text.match(/house/);
        },
      },
      {
        script(p: any) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
          if (Quest.World.w.Patch.isHere()) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("'So it turns out I animated this monstrous amalgam of human body parts,' says Mandy, indicated Patch. 'He doesn't say much, but it's kind of sweet - in a grotesque way.'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg("Dr Malewicz looks Patch up and down. 'Is it house trained?'");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
            if (Quest.World.w.chamber_pot.loc === Quest.World.player.name) {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'Y...' She thinks. 'I don't know. I'm not sure he even eats. But now you mention it, I've been round this house about fifteen times, and have to find a toilet.' Apart from the chamber pot in her hand. 'Ewww.' She quickly drops it.");
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
              Quest.World.w.chamber_pot.loc = Quest.World.player.loc;
            } else {
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
              msg("'Y...' She thinks. 'I don't know. I'm not sure he even eats. But now you mention it, I've been round this house about fifteen times, and have yet to find a toilet.' Apart from the chamber pot in her hand. 'Ewww.'");
            }
          }
        },
        test(p: any) {
          return p.text.match(/patch/);
        },
      },
      {
        script(p: any) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Mandy starts to tell the Dr Malewicz about Einstein, but wonders what she actually knows about the guy. There was that relativity thing. Did ho do anything else? Something about God not playing dice? Or is that an urban myth? 'He was dead famous, anyway,' she says, lamely.");
        },
        test(p: any) {
          return p.text.match(/einstein/);
        },
      },
      {
        script(p: any) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(`Mandy starts to tell Dr Malewicz about ${p.text} but he does not seem interested.`);
        },
        test(p: any) {
          return true;
        },
      },
    ],
  });

  /*

  Quest.World.createItem("wm_1911", Quest.NPC.TOPIC(false), {
    loc:"Winfield_Malewicz",
    alias:"You have been here since 1911?",
    script:function() {
      msg("'You have been here since 1911?'");
      msg("'The King is due to have his Delhi Durbar in a few weeks.'");
      msg("'Er, which king is that?'");
      msg("'George V. I suppose he is just {class:riddle:history} to you. Who's king now?'");
      msg("'Queen. Queen Elizabeth II.'");
      msg("'A queen? Jolly good. England became great under Queen Victoria.'");

      Quest.World.w.Winfield_Malewicz.songlist.push("History")
    },
  })
  */

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('invite', {
    alias:   'Wedding Invitation',
    examine: 'The wedding invitation is printed in black, on off-white card, with very ornate handwriting. Mandy wonders if she dares to read it...',
    read() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy tries to casually read the invitation without appearing to..."My very good friend and his companion are cordially invited to the wedding of Albert Einstein to Elsa Löwenthal, on the Second of June, 1919, at the Oranienbergerstrasse Synagogue in Berlin." Wait, {i:the} Albert Einstein?');
      this.hasBeenRead = true;
    },
    synonyms: ['invite', 'letter'],
  });
};
