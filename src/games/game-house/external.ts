import { QuestClass } from '../../types/quest';
import { msg, failedmsg, falsemsg }        from '../../lib/io';

export const init = (Quest: QuestClass) => {
  register('external', {
    book:    'Antony and Cleopatra',
    listen:  'Mandy can hear birds in the trees, and the vague sound of traffic coming from the town.',
    smell:   'The smell of the countryside mingled with the smell of the town -- mature and car fumes -- but so faint it is only now that Mandy thinks about it that she notices them.',
    uniform: 'her grey and blue Kyderbrook High School uniform',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('highfield_lane', {
    beforeFirstEnter() {
    },
    desc() {
      let s = 'Mandy is standing, feeling a little anxious, on the pavement outside The House, which stands in a neatly kept garden to the east. The road continues north, through the countryside, towards home, and then onwards to Hedlington, while southward, Highfield Lane makes its way back into town.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
      if (Quest.World.w.letter.scenery) s += '|She can see a letter lying on the ground.';
      return s;
    },
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    east: new Quest.World.Exit('garden_location', {
      alsoDir: ['in'],
      msg() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
        if (Quest.World.w.letter.loc === Quest.World.player.name) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('With the letter is her hand, Mandy nervously steps though the garden gate...');
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Not quite sure why she is doing so, Mandy nervously steps though the garden gate...');
        }
      },
    }),

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north: new Quest.World.Exit('_', { msg: 'The road ahead looks inviting, and she thinks of home. And yet... And yet she feels there is something she has to do.', use: Quest.Utilities.util.cannotUse }),

    properNoun: true,

    scenery: [
      {
        alias:   'other houses',
        examine: 'The other houses on the street look just like number 23. Just... not evil.',
      },
      {
        alias:   'road',
        examine: 'The road is tarmacked with pavements either side -- like pretty much every road in Westleigh. It slopes upwards to the north, and has numerous cars parked on either side.',
      },
      {
        alias:   'cars',
        examine: 'There are various cars parked on either side of the road, from a small blue Volkswagen Polo to a massive black Nissan Navara.',
      },
      {
        alias:   'blue Volkswagen Polo',
        examine: 'The Volkswagen Polo is blue; the registration indicates it is two years old, and from Yorkshire.',
      },
      {
        alias:   'black Nissan Navara',
        examine: 'The Nissan Navara is black and in serious need of a wash; the registration number indicates it is five years old, and local to the county.',
      },
      {
        alias:   'pavement',
        examine: 'The pavement is set with flagstones. At one time -- not so many years ago -- Mandy would would studiously avoid the cracks between the flags. She is too old for that now, of course.',
      },
      {
        alias:         ['door'],
        examine:       'From the road, all Mandy can really see of the door is that it is green and has a funny little window above it.',
        goInItem:      'Mandy would need to be a little closer to the door to go though it. Dare she do that?',
        goThroughItem: 'Mandy would need to be a little closer to the door to go though it. Dare she do that?',
        knockon:       'Mandy would need to be a little closer to the door to knock on it. Dare she do that?',
        open:          'Mandy would need to be a little closer to the door to open it. Dare she do that?',
      },
      {
        alias:   ['windows'],
        examine: 'The house has four windows that look nothing like eyes, and yet...',
      },
      {
        alias:   ['garden'],
        examine: 'Mandy can see a path curving through the lawn, leading to the door.',
      },
    ],
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('_', { msg: 'Mandy looks back down the road she has just walked up. No point going that way.', use: Quest.Utilities.util.cannotUse }),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('house_from_road', {
    examine:       'Mandy can never decide what is so sinister about the house. It is two storeys high, a door in the centre of the lower floor, with bay windows either side, typical of many middle-class houses built around the turn of the last century.',
    goInDirection: 'east',
    loc:           'highfield_lane',
    scenery:       true,
    synonyms:      ['house', '23'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('letter', Quest.Templates.TAKEABLE(), {
    alias: 'letter',

    drop: 'Mandy decides she will hang on to the letter.',

    examine() {
      if (this.scenery) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The letter is face-down; Mandy would have to pick it up to see the address.');
      } else if (Quest.World.currentLocation.zone === 'external') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy turns the letter over. It is addressed to "Dr Winfield Malewicz, 23 Highfield Lane, Westleigh". {i:That must be who lives in The House,} she thinks. Perhaps she should deliver it. She feels a little terrified at the prospect, but that is ridiculous -- it is only a house. Mrs Kennedy is always saying you should confront your fears head-on in Personal Development lessons.');
      } else if (this.addressread) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks at the address on the letter again:  "Dr Winfield Malewicz, 23 Highfield Lane, Westleigh".');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy turns the letter over. It is addressed to "Dr Winfield Malewicz, 23 Highfield Lane, Westleigh". {i:That must be who lives in The House,} she thinks.');
      }
      this.addressread = true;
    },

    giveLetter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'winfield_malovich' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.player.loc === Quest.World.w.winfield_malovich.loc) {
        if (Quest.World.player.loc === 'lounge') {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy takes the letter from her bag, and hands it to the old man.');
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Winfield looks confused. 'This is for Amanda Kettleton.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What? That's me!' She takes the letter back, and looks at the address. It is indeed addressed to her, but at 23 Highfield Lane. She opens it. \"Thank You\" is all it said, in large, scrawling handwriting.");
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'This letter's for you,' said Mandy, offing Winfield the letter she had picked up outside the house.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Keep it for now,' he said. 'If there's {class:riddle:one thing} I hate {class:riddle:more than this} its {class:riddle:little things} distracting us from the big picture.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('{i:What is he talking about,} wonders Mandy.');
        }
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy considers giving the letter, but perhaps she should keep it in case she came across this Winfield Malewicz guy.');
      }
    },
    // cannot get dropped in size change rooms
    loc:  'highfield_lane',
    open: 'Mandy wonders what the letter contains, but it is addressed to someone else; she cannot open it herself!',
    read() {
      this.examine();
    },
    scenery: true,
  });
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
  Quest.Parser.parser.pronouns = { it: Quest.World.w.letter };

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('garden_location', {
    alias: 'front garden',
    desc() {
      let s = 'The garden is simple, but well maintained. A gravel path curves from the road, to the west, to The House, to the east. On either side, the lawn is lush and well-trimmed. The garden is bordered by a hedge to the north and south. To the west there are rose bushes either side of the gateway, though Mandy has never seen them flower. Short sections of fencing prevent access to the back of the house.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
      if (!Quest.World.w.letter.scenery) {
        s += ' The door to the house is open. ';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_door' does not exist on type '{}'.
        s        += Quest.World.w.front_door.checked ? 'Mandy is sure it was closed when she looked before.' : 'Had it been open when she first looked? Mandy cannot remember.';
        s        += ' Her heart is starting to pound. She cannot decide if this is a good idea or not.';
        this.flag = true;
      }
      return s;
    },

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    east: new Quest.World.Exit('front_hall', {
      alsoDir: ['in'],
      msg:     "Heart beating furiously, Mandy steps slowly through the open door. 'Anyone home?' she calls. After a moment's hesitation, she steps further inside, and calls again...",
      use(char: any, dir: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
        if (Quest.World.w.letter.scenery) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy looks at the door to the house. Can she really just walk in? She tries the handle -- it is locked. So, no, she cannot just walk in.');
          return false;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultExitUse' does not exist on type '... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultExitUse(char, this);
      },
    }),

    scenery: [
      {
        alias:   ['roses', 'rose bushes'],
        examine: "The only reason Mandy knows they are roses is that they are prickly. They are no flowers on them. Her grandmother has some, and they have the same prickles -- a bit like a sharkfin. Unlike these, her grandmother's rose blossomed every year.",
        pick:    'If there was a flower on any of the rose bushes, Mandy would pick it, and put it in her hair, but she cannot see a single one.',
        smell:   'Mandy smells the rose bushes, but cannot smell much. There are no flowers, so no surprise there, but disappointing nonetheless.',
        take:    'If there was a flower on any of the rose bushes, Mandy would pick it, and put it in her hair, but she cannot see a single one.',
      },
      {
        alias:   'gravel path',
        examine: 'The gravel path curved gently to the right, then back to the left up to the front door.',
      },
      {
        alias:   'grass',
        examine: 'The grass is green, and proverbially boring to watch grow.',
      },
      {
        alias:       'transom',
        examine:     'The transom is a low, but wide window in a half-oval shape, above the door. The glass is dirty, but it is too high up to see through anyway.',
        lookthrough: 'The transom is too high to see through.',
      },
      {
        alias:   'hedge',
        examine: 'The hedge is privet, and almost as tall as Mandy.',
      },
      {
        alias:    'fence',
        examine:  'Mandy wonders if she could climb the fence to get round the back; she decides not.',
        goUpItem: 'Mandy wonders if she could climb the fence to get round the back; she decides not.',
      },
      {
        alias:   ['portraits', 'pictures', 'paintings'],
        examine: 'Mandy peers through the door; she can see there are five paintings on the far wall; they look like portraits, but it is too dark to seem them properly.',
      },
      {
        alias:   ['garden'],
        examine: 'Mandy examines the garden more carefully. She studies the gravel path curves from the road, to the west, to The House, to the east. On either side, the lush and well-trimmed lawn is also carefully looked at.',
      },
      {
        alias:   ['lawn', 'grass'],
        examine: "The grass is a uniform four to five centimetres high, and has none of the dandelions and clover that seem to fill her father's lawn.",
      },
    ],
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    west: new Quest.World.Exit('highfield_lane', { alsoDir: ['out'] }),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('front_door', Quest.Templates.CONTAINER(), {
    checked: false,
    examine() {
      let s = 'The door is tall, and made of panelled wood painted green, set into a white doorframe with a transom above.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
      if (!Quest.World.w.letter.scenery) {
        s += ' It stands open, inviting...';
      } else {
        this.checked = true;
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },
    goThroughDirection: 'east',
    knockon() {
      if (this.knocked) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy knocks on the door again, but still no signs of life in the house.');
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
      else if (!Quest.World.w.letter.scenery) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy knocks gingerly on the open door, not sure she really wants to disturb anyone. Then again, a bit harder, but still no reply.');
        this.knocked = true;
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy knocks gingerly on the open door, not sure she really wants to disturb anyone. Then again, a bit harder, but still no reply.');
        this.knocked = true;
        this.checked = true;
      }
      return Quest.World.world.SUCCESS;
    },
    loc: 'garden_location',
    lookinside() {
      return this.lookthrough();
    },
    lookthrough() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
      if (!Quest.World.w.letter.scenery) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks through the open door, into the house. It is dark, but she can see a hallway with a tiled floor and wood panelled walls; are there painting on the far wall? ');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy spends a few moments trying to look through a solid door. If she was eight foot tall she might be able to see through the small window above it, but not otherwise.');
      }
      return Quest.World.world.SUCCESS;
    },
    open() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
      if (!Quest.World.w.letter.scenery) return failedmsg('It already is. ');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy tries the door, but it is locked.');
      this.checked = true;
      return Quest.World.world.SUCCESS;
    },
    scenery: true,
    testDropIn(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'letter' does not exist on type '{}'.
      if (options.item !== Quest.World.w.letter) return falsemsg('It is a door, not a suitcase...');

      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg('Mandy looks for a letter box she can just post the letter through, and be done with it. No letter box.');
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('windows', {
    examine: 'The windows look old-fashioned, sash-opening. The window frames are painted white; the paint looks old and it peeling off in places.',
    loc:     'garden_location',
    lookinside() {
      return this.lookthrough();
    },
    lookthrough() {
      if (!this.flag) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy tries to look through one of the windows, but it is too dark to see anything. After a moment's thought about getting caught spying on people, she puts her face right up to the glass, and shades her face with her hands. It is still difficult to make much out, but there is a figure in there, silvery-grey against the general darkness. He or she looks towards Mandy, then darts off. She gets the feeling whoever it is is more worried about getting caught than she is.");
        this.flag = true;
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy tries another window, but it is too dark to make out anything besides vague impressions of furniture.');
      }
      return Quest.World.world.SUCCESS;
    },
    open:    'Mandy tries to open a window, but none of the budge; looks like the door is the only way.',
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('house_from_garden', {
    examine:       'From the garden, Mandy has a better view of the house. Well, {i:better} might not be the right word, she considers, but certainly more. The windows are old-fashioned, with white-painted wood surrounds. The bricks are a reddish-brown. The door is green, with the numerals 2 and 3 in steel in the dead centre of it, and a transom above it.',
    goInDirection: 'east',
    loc:           'garden_location',
    scenery:       true,
    synonyms:      ['house', '23'],
  });
};
