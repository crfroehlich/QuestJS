import { QuestClass } from '../../types/quest';
import { msg, falsemsg }        from '../../lib/io';

export const init = (Quest: QuestClass) => {
  register('observatory', {
    book:    'Comedy of Errors',
    ceiling: 'The ceiling is domed.',
    floor:   'The floor is wood.',
    listen:  'Mandy can hear nothing.',
    smell:   'The room smells slightly of oil.',
    uniform: 'a curious white dress that buttons at the front; more like a lab coat really',
    walls:   'The walls are all painted white.',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('observatory', {
    afterEnter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
      if (Quest.World.w.uniform.wet === 4) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
        Quest.World.w.uniform.wet = 3;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('She is dripping water on to the floor.');
      }
    },

    desc: 'The room is dominated, filled even, by a telescope and its supporting mechanism, which is not difficult, as the room is not big. There are some controls on the wall, and the only exit is the stairs she has just come up.{if telescope.roofOpen: A section of roof is open on the west side of the dome.}{if:spike:alias:mangled metal: There is a black line along the floor marking where the wire had been before the lightning strike.}',

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    down: new Quest.World.Exit('great_gallery'),

    examine_ceiling() {
      let s = 'The observatory is a domed roof, perhaps made of wood, painted an off-white colour.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.roofOpen) {
        s += ' There is a vertical slot open in the roof through which someone using the telescope could observe the stars.';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (Quest.World.w.telescope.azimuth !== 6) {
          s += ' All Mandy can see through the slot is a dark and threatening sky.';
        } else if (Quest.World.player.loc === 'observatory') {
          s += ' All Mandy can see through the slot is a dark and threatening sky and the top of a weather vane.';
        } else {
          s += ' All Mandy can see through the slot is a dark and threatening sky and a weather vane on a nearby roof.';
        }
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    up: new Quest.World.Exit('observatory_up', { alsoDir: ['climb'], msg: 'She clambers up the telescope.' }),

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('slot', {
    examine() {
      let s = '';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.roofOpen) {
        s += ' There is a vertical slot open in the roof through which someone using the telescope could observe the stars.';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (Quest.World.w.telescope.azimuth !== 6) {
          s += ' All Mandy can see through the slot is a dark and threatening sky.';
        } else if (Quest.World.player.loc === 'observatory') {
          s += ' All Mandy can see through the slot is a dark and threatening sky and the top of a weather vane.';
        } else {
          s += ' All Mandy can see through the slot is a dark and threatening sky and a weather vane on a nearby roof.';
        }
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },
    isLocatedAt(loc: any) {
      return ['observatory', 'observatory_up', 'telescope_end'].includes(loc);
    },
    scenery:  true,
    synonyms: ['opening'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('telescope', {
    alias:     'telescope',
    altitude:  5,
    altitudes: [
      'horizontal',
      'nearly horizontal',
      'slightly raised',
      'somewhat raised',
      'diagonal',
      'raised up',
      'raised high',
      'nearly vertical',
    ],
    azimuth:          1,
    azimuthAsDegrees: 45,
    azimuths:         ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'],
    climbverb(options: any) {
      return Quest.World.currentLocation.up.use(options.char);
    },
    examine() {
      let s = 'The telescope itself is about four metres long. It is held in place by a complicated mechanism, involving cogs and gears, and the whole thing is made of brass, giving it a strange beauty.{if:observatory_up:visited:0: Mandy wonders idly if she could climb up it.}';
      s    += ` It is currently ${this.altitudes[this.altitude]},`;
      s    += ` and pointing ${this.azimuths[this.azimuth]}ward.`;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },
    goUpDirection: 'up',
    loc:           'observatory',
    lookin() {
      return this.use();
    },
    lookthrough() {
      return this.use();
    },
    roofOpen:      false,
    scenery:       true,
    shardReversed: false,
    shardTime:     7,
    shardViews:    [
      'There is just blackness. Is this before she was born?',
      "This is a view in a hospital; her mother is in a bed, clearly in pain.{once: Mandy cannot remember her mother being in hospital, when was this? Then she notices the huge belly. This is Mandy's birth!} She watches in fascination as her mother silently screams with each push, as the baby Mandy emerges into the Quest.World.world.{once: Mandy revises her plan to have a large family...}",
      'A room... The lounge in her house, she realises, and the toddler -- stood, holding on to the chair -- must be her aged about one. The little girl lets go of the chair, takes two hesitant steps, then falls to ground. But undeterred, she crawls back to the chair, uses it to stand, and takes a few more steps.',
      "There she is again, in a school playground. That is back in primary school; she is playing with Holly. As she watches, Holly pushes the younger Mandy, who stumbles back, falling over someone's bag. The Mandy in the image starts crying silently; she broke her arm then Mandy recalls.{once: And Holly always claimed she never touched her. 'The bitch pushed me,' says Mandy indignantly.}",
      'Again Mandy can see her house, but it is a little different to before; most of the trees are smaller, but there is another one there now. Again, someone emerges from the house; herself, but aged eleven. Her mother follows her out of he door, to wave her off. This was her first day at Kyderbrook.',
      'A playground, and four girls too old to play there now. Herself, with Marcy, Neesha and Amy. That was March 25th, last year - the day Zayn announced he was leaving One Direction, and they were crying of each others shoulders. Strange it had felt like such a big deal.',
      'She can see her house, and as she watches, someone emerges from it. It is herself! She is wearing her school uniform, and carrying her One Direction bag. As Mandy watches, the Mandy in the image turns and locks the door, before walking away, presumably to school.',
      'She can see herself, looking through the telescope.{once: She shakes her foot, and can see her left foot shake through the telescope. This is the present.}',
      "Where's this? The sports hall at school, but set out with desks. Exam day! A shudder goes through her. There is future-Mandy, staring at the paper, looking dumbfounded. It is English literature, she can even see the question. \"Discuss loyalty and betrayal with respect to the character Enobarbus\". 'Jesus, no wonder I look so lost,' mutter Mandy. But wait... If that is going to be on the paper, she can look it up before the exam.|Future Mandy smiles, and starts writing, while this Mandy carefully memorises the rest of the paper.",
      'The sports hall again, another exam. She can see herself, working hard. This is biology, and the paper has a lot about the cell cycle; another section is on evolution. Again, Mandy carefully memorises the questions.|{i:Is this cheating?} she wonders. Perhaps the important point is that future-Mandy clear knows her stuff, and to avoid time-loops, she will have to use this information whether she likes it or not. She grins to herself.',
      'Another exam. This is French, and the exam questions revolve around a scenario in a restaurant.',
      "A playground; she looks different, a little more self-assured, and her hair is much shorter. Every thing seems a little fuzzy too. She is with a guy; not someone she recognises, but future-Mandy clearly likes him; they are holding hands. He turns to look at her, and gives her a kiss. Mandy's first kiss! ",
      'A car, rammed full of luggage; this is fuzzy too, more than the playground. Mandy and her father step out of the car, and walk to a nearby building. "Longfenton Halls of Residence" it calls itself.{once: Is this a university? Her first day, perhaps.}',
      'Much more fuzzy now; she can see a woman, she guesses herself, but it is hard to tell, in a smart skirt and jacket. Her first day at work, Mandy thinks for a moment, but no, future-Mandy is telling everyone else what to do.{once: What sort of business is this? Does she own it? It is too fuzzy to see.}',
      'It is all too fuzzy to see anything now.{once: Perhaps the future is not set in stone, and this has yet to be decided.}',
    ],
    synonyms: ['mechanism'],
    use() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'glass_shard' does not exist on type '{}'... Remove this comment to see the full error message
      if (this.azimuth === 4 && this.altitude === 0 && Quest.World.w.glass_shard.loc === 'controls') {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'glass_shard' does not exist on type '{}'... Remove this comment to see the full error message
        if (Quest.World.w.glass_shard.size === 7) {
          this.shardTime += (this.shardReversed ? 1 : -1);
          this.shardTime  = Math.min(Math.max(this.shardTime, 0), this.shardViews.length - 1);
          if (this.shardTime === 8) Quest.World.player.easterEgg = true;
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy looks though the eyepiece at the side of the base of the telescope, now it is pointed directly at the glass shard... ');
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(this.shardViews[this.shardTime]);
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy looks though the eyepiece at the side of the base of the telescope, hoping to see the glass shard through it... But all she can see is {if:telescope:roofOpen:the sky:the dome of the roof}. She would need the telescope to go even lower. Or have a bigger shard.');
        }
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      else if (Quest.World.w.telescope.roofOpen) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks though the eyepiece at the side of the base of the telescope. For a moment, all she can see is the reflection of her eyelashes, but she opens her eye wide, and can see... clouds. And they look pretty much the same as they do without a telescope.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks though the eyepiece at the side of the base of the telescope, but all she can see is a uniform off-white. Exactly the same colour as the ceiling...');
      }
      return true;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('controls', Quest.Templates.SURFACE(), {
    alias:    'controls',
    examine:  'The controls consist of two wheels, one on the left, one on the right, and a lever, all set into a slim box, all in brass, fixed to the wall on the south side of the room.',
    loc:      'observatory',
    scenery:  true,
    synonyms: ['panel', 'slim box'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('left_wheel', {

    alias: 'left wheel',

    doTurn(inc: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      Quest.World.w.telescope.azimuth += inc;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.azimuth >= Quest.World.w.telescope.azimuths.length) Quest.World.w.telescope.azimuth = 0;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.azimuth < 0) Quest.World.w.telescope.azimuth = Quest.World.w.telescope.azimuths.length - 1;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      Quest.World.w.telescope.azimuthAsDegrees = Quest.World.w.telescope.azimuth * 45 + (Quest.World.w.telescope.azimuths[Quest.World.w.telescope.azimuth].length % 5 + 1);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg('{if:params:inc:-1:With a grunt of effort, }Mandy turns the left wheel a full rotation {if:params:inc:-1:anti-}clockwise{if:params:inc:-1: -- it is hard work! As:, and as} she does the entire telescope, and the mechanism holding it, {if:params:inc:-1:rotates, with a painful grinding noise:smoothly rotates}. At the same time, the ceiling also turns{if:telescope:roofOpen:{if:telescope:azimuth:6:, and she can just see the roof of the great hall through the slot}}.', { inc });
      return true;
    },

    examine: 'The left wheel is about seven centimetres across, and made of brass. There is a set of numbers on dials, like a gas meter, just above the wheel, showing {show:telescope:azimuthAsDegrees}.',
    // azimuth
    loc:     'observatory',
    scenery: true,
    turn:    'Mandy looks at the wheel, wondering if she wants to turn the left wheel left or turn it right...',
    turnleft() {
      return this.doTurn(-1);
    },
    turnright() {
      return this.doTurn(1);
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('right_wheel', {

    alias: 'right wheel',

    examine: 'The right wheel is about seven centimetres across, and made of brass. There is a set of numbers on dials, like a gas meter, just above the wheel, showing {show:telescope:altitude}0.',
    // altitude
    loc:     'observatory',
    scenery: true,
    turn:    'Mandy looks at the wheel, wondering if she wants to turn the right wheel left or turn it right...',
    turnleft() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.altitude === 0) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy tries to move the right wheel anti-clockwise, but it will not turn any more.');
        return false;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      Quest.World.w.telescope.altitude--;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy turns the right wheel a full rotation anti-clockwise, and as she does the telescope lowers.');
      return true;
    },
    turnright() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.altitude === Quest.World.w.telescope.altitudes.length - 1) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy tries to move the right wheel clockwise, but it will not turn any more.');
        return false;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      Quest.World.w.telescope.altitude++;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy turns the right wheel a full rotation clockwise, and as she does the telescope rises.');
      return true;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('lever', {
    examine: 'A small brass level, currently in the {if:telescope:roofOpen:down}{ifNot:telescope:roofOpen:up} position.',
    flip(options: any) {
      return this.push(options);
    },
    loc: 'observatory',
    pull(options: any) {
      return this.push(options);
    },
    push(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
      const verb = Quest.Parser.parser.currentCommand.name.toLowerCase();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.roofOpen) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg(`{nv:char:${verb}:true} the lever up, and the slot in the ceiling slides closed.`, options);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        Quest.World.w.telescope.roofOpen = false;
      } else {
        if (!this.used) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg(`{nv:char:${verb}:true} the lever down, and a huge slot in the ceiling opens up, directly in front of the telescope, allowing anyone using the telescope to actually see the sky.{if:telescope:azimuth:6: She can just see the roof of the great hall from here.}|{nv:char:glance:true} outside; the sky looks threatening. It had been quite nice before she entered the house.`, options);
          this.used = true;
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg(`{nv:char:${verb}:true} the lever down, and the huge slot in the ceiling opens up.{if:telescope:azimuth:6: She can just see the roof of the great hall from here.}`, options);
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        Quest.World.w.telescope.roofOpen = true;
      }
      return true;
    },
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('observatory_up', {
    afterDropIn(item: any) {
      item.loc = 'observatory';
    },
    afterEnter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
      if (Quest.World.w.uniform.wet === 5) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
        Quest.World.w.uniform.wet = 4;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('At least she is out of the rain now!');
      }
    },
    alias: 'up on the telescope',
    desc() {
      return 'Mandy clings to the top of the mechanism that supports the telescope. From here she can... Not do a lot. The domed roof is too far to touch, and the eyepiece of the telescope is back on the ground.{ifLessThan:telescope:altitude:5: She could perhaps edge {select:telescope:azimuths:azimuth} along the telescope itself.}';
    },
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    down: new Quest.World.Exit('observatory', { alsoDir: ['climb_down'] }),

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'observatory' does not exist on type '{}'... Remove this comment to see the full error message
    examine_ceiling() {
      Quest.World.w.observatory.examine_ceiling();
    },

    headingAlias: 'The Observatory (On The Telescope)',

    noFollow: true,

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('telescope_while_on_it', {
    alias: 'telescope',

    climbdownverb(options: any) {
      return Quest.World.currentLocation.down.use(options.char);
    },

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
    examine() {
      Quest.World.w.telescope.examine();
    },

    goDownDirection: 'down',

    loc: 'observatory_up',

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    lookthrough() {
      return falsemsg('She cannot look though the telescope while climbing on it.');
    },

    scenery: true,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    use() {
      return falsemsg('She cannot use the telescope while climbing on it.');
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('roof_from_telescrope', {
    alias:   'roof',
    examine: 'Through the open slot in the domed roof, Mandy can see the peaked roof of the Great Hall, and on it a weather vane. {ifMoreThan:telescope:altitude:4:If the telescope was lower, she might be able to reach the roof:She wonders if she could go west along the telescope, and get onto the roof}.',
    isLocatedAt(loc: any) {
      if (loc !== 'observatory_up') return false;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (!Quest.World.w.telescope.roofOpen) return false;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.azimuth !== 6) return false;
      return true;
    },
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('telescope_end', {
    alias: 'end of the telescope',
    desc() {
      let s = 'Mandy sits -- somewhat precariously -- straddling the telescope.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      if (Quest.World.w.telescope.roofOpen) {
        s += ' The open slot in the ceiling is just in front of her, and beyond that,';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (Quest.World.w.telescope.azimuth === 6) {
          s += ' she can see the roof of the great hall. It looks close enough she might be able to head west, climbing across.';
        } else {
          s += ' the open sky -- and a long drop down.';
        }
      } else {
        s += ' From here she could touch the ceiling, if she really want to.';
      }
      return s;
    },
    headingAlias: 'The Observatory (End Of The Telescope)',
    noFollow:     true,
    windowsface:  'none',
  });

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
  for (const dir of Quest.World.w.telescope.azimuths) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'observatory_up' does not exist on type '... Remove this comment to see the full error message
    Quest.World.w.observatory_up[dir] = new Quest.World.Exit('telescope_end', {
      isHidden() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        return (this.dir !== Quest.World.w.telescope.azimuths[Quest.World.w.telescope.azimuth]);
      },
      msg: 'Mandy cautiously edges along the telescope to the very end.',
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (this.dir !== Quest.World.w.telescope.azimuths[Quest.World.w.telescope.azimuth]) return falsemsg(Quest.lang.not_that_way, { char, dir: this.dir });
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (Quest.World.w.telescope.altitude > 4) return falsemsg('Mandy looks at the end of the telescope; if it were not so steep and smooth, she could edge along it{if:telescope:azimuth:6:, and perhaps get out onto the roof to the west}.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, this);
      },
    });
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope_end' does not exist on type '{... Remove this comment to see the full error message
    Quest.World.w.telescope_end[dir] = new Quest.World.Exit('observatory_up', {
      isHidden() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (this.dir === Quest.World.w.telescope.azimuths[Quest.World.w.telescope.azimuth]) return false;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (Quest.World.w.telescope.roofOpen && this.dir === 'west' && Quest.World.w.telescope.azimuth === 6) return false;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        return (this.dir !== Quest.World.w.telescope.azimuths[(Quest.World.w.telescope.azimuth + 4) % 8]);
      },
      msg: 'Mandy cautiously edges back along the telescope to where it is supported, and clings to the mechanism, feeling decidedly safer.',
      simpleUse(char: any) {
        // if we are here, altitude must be okay
        // catch early for special message
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (!Quest.World.w.telescope.roofOpen && this.dir === Quest.World.w.telescope.azimuths[Quest.World.w.telescope.azimuth]) return falsemsg('Mandy looks at the slot in the ceiling, just beyond the end of the telescope. If that were open, she might be able to get out through it, she muses.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (Quest.World.w.telescope.roofOpen && this.dir !== 'west' && this.dir === Quest.World.w.telescope.azimuths[Quest.World.w.telescope.azimuth]) return falsemsg('Mandy considers for a moment a leap of faith from the end of the telescope, out through the slot in the ceiling... No, not a good idea.');

        if (this.isHidden()) return falsemsg(Quest.lang.not_that_way, { char, dir: this.dir });
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
        if (this.dir === Quest.World.w.telescope.azimuths[(Quest.World.w.telescope.azimuth + 4) % 8]) return Quest.Utilities.util.defaultSimpleExitUse(char, this);

        // should only be west, with telescope pointing west by this point
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, new Quest.World.Exit('roof_location_east', { dir: this.dir, msg: 'Mandy reaches over to the opening in the roof. She climbs through, and for a moment is balanced precariously on the bottom of the slot, before she jumps onto the adjacent roof, heart pounding in her chest.', origin: this.origin }));
      },
    });
  }

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('roof_seen_from_telescope', {
    alias:   'roof',
    examine: 'The roof of the great hall can be seen though the slot in the roof. It has a definite gothic vibe going on, with pointy bits at either end -- the further one sporting a weather vane --  and an ornate metal ridge between them.',

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
    isLocatedAt(loc: any) {
      return loc === 'telescope_end' && Quest.World.w.telescope.roofOpen;
    },

    scenery: true,
  });

  register('roof', {
    book:    'The Tempest',
    ceiling: 'The ceiling is the clouds... No, seriously, there is no ceiling here.',
    floor:   'There is no floor, just the roof of the Great Hall.',
    listen:  'Mandy can hear the wind howling around her.',
    smell:   'The air is certainly fresh up here!',
    uniform: 'a midnight blue uniform that is actually not that bad',
    walls:   'There are no walls here.',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('roof_location_east', {
    afterEnter() {
      if (Quest.World.w.wire.isAtLoc(Quest.World.player) && Quest.World.w.sky.state < 3) {
        Quest.World.w.sky.state = 3;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Suddenly the rain starts. 'Shit,' she screams at the sky, as she is quickly soaked to the skin. It was supposed to be sunny today!");
        Quest.World.w.uniform.wet = 5;
      }
      if (Quest.World.w.wire.tiedTo2 === 'spike' && Quest.World.w.sky.state < 6) {
        Quest.World.w.sky.state = 6;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Is the rain getting worse? She did not think that was possible.');
      }
    },
    alias: 'east end of the roof',
    desc:  'Mandy is standing -- rather nervously -- on the apex of a roof{once:. She is far above the ground. Not just scary far but also does-not-make-sense far above the ground. It is a two-story house! Then again, she is pretty sure number 23 does not have an observatory at the back.|As she looks harder, she realises she cannot see the Ash Tree Estate, instead there are only fields. Perhaps no bad thing, she thinks, but then she notices that there is no modern housing at all. This is what the town would have looked like before the war. Possibly before the first Quest.World.world war.|:, far above the ground. }As for the roof itself, it is slate, with a rusty iron decorative ridge to which Mandy is clinging. There is a weather vane at one end{ifIs:wire:tiedTo2:spike:, with wire wrapped round the letter E}.',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    east:  new Quest.World.Exit('telescope_end', { msg: 'Mandy nervously jumps back on to the sill of the opening in the observatory roof. After a moment to catch her breath, she reaches across, to grab the telescope, and straddle the end of it.' }),

    headingAlias: 'On A High Roof',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    testDropIn() {
      return falsemsg('It occurs to Mandy that anything she drops here will fall down the roof, and will be lost forever.');
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('roof', {
    examine:  'The roof is slate, and slopes down to the north and south. Many of the slates have mould growing on them, or are chipped or crooked, suggesting the roof has not been repaired for a long time. Then again, this is the first roof Mandy has seen so close-up -- maybe this is normal. ',
    loc:      'roof_location_east',
    scenery:  true,
    synonyms: ['ridge', 'tiles', 'slates', 'mold', 'ridge tiles'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('spike', {
    alias:      'weather vane',
    attachable: true,
    examine() {
      if (this.alias === 'mangled metal') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The weather vane is a twisted lump of black metal. Two rods stick out, with "N" and "W" of them, the only hint of what it used to be.');
        return;
      }
      let s = 'The weather vane is made of black metal. Above the traditional compass points, a flat raven, sat on an arrow, swings round with each gust of wind.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      if (Quest.World.w.wire.tiedTo2 === this.name) {
        s += ' A metal wire is attached to the letter E.';
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },
    loc:      'roof_location_east',
    scenery:  true,
    synonyms: ['weather vane', 'raven', 'weathervane'],
  });

  /*
   2  start
   3  roof east with wire, starts to rain
   4  roof west with wire, lightning
   5  wire tied on (but could later get untied)
   6  roof east, wire tied on

  20  all done, clear skies
  */

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('sky', {
    examine() {
      switch (this.state) {
        case 20:
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('The sky is blue, with the odd fluffy cloud.');
          break;
        case 2:
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('The dark clouds threatened rain at any moment.');
          break;
        default:
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('The sky is looking thundery; rain is pouring hard.');
          break;
      }
    },
    isLocatedAt(loc: any) {
      return loc.startsWith('roof_location');
    },
    scenery: true,
    state:   2,
  });
};
