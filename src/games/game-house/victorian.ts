import { QuestClass } from '../../types/quest';
import { msg, falsemsg }        from '../../lib/io';

export const init = (Quest: QuestClass) => {
  /*
  The biggest zone?

  */

  register('victorian', {
    book:      'Othello',
    ceiling:   'The ceiling is white, with simple decorations along each side.',
    door:      'The door is wood; panelled and unpainted.',
    floor:     'The floor is wooden, and well-polished.',
    listen:    'Mandy listens, but can hear nothing. It is eerily quiet...',
    panelling: true,
    smell:     'There is a faint musty smell, with just a hint of polish.',
    uniform:   'a rather dowdy grey school uniform that makes her look about fifty',
    walls:     'The walls are all panelled in wood.',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('front_hall', {
    afterFirstEnter() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('The door slams shut, making Mandy jump.');
    },
    alias: 'hall',
    desc() {
      return 'The hall is bigger than Mandy expected. Quite an impressive room, really. There are doors to the north and south, while the east wall is adorned with a number of paintings. The walls are panelled with dark wood; the floor is tiled in a {if:front_hall_floor:state:2:simple back and white check:geometric design that is vaguely unnerving}.';
    },
    exitState: 0,
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north:     new Quest.World.Exit('brass_dining_room', {
      use(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
        if (Quest.World.w.front_hall.exitState < 2) Quest.World.w.front_hall.exitState = 1;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultExitUse' does not exist on type '... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultExitUse(char, this);
      },
    }),

    scenery: [
      {
        alias:      ['portraits', 'pictures', 'paintings'],
        examine:    'There are five paintings on the back wall, all portraits. To the left, a plump gentleman in military attire. Next to him, an elderly lady in a blue dress. The central portrait is a youngish man in academic mortar and gown. Next to him, another lady, perhaps in her thirties, and on the far right, a rather dapper young man in a burgundy suit.',
        lookbehind: 'Mandy looks behind each of the paintings. There is no safe hidden there; it seems modern media lied to her.',
      },
      {
        alias:   ['plump gentleman', 'military man', 'sword'],
        examine: 'Mandy looks closer at the far left painting. The guy looks to be about sixty, with an impressive moustache and quite the paunch. He is wearing a red uniform covered in metals, and is brandishing a sword. Mandy has a feeling the uniform is that of the British army in the nineteenth century.',
      },
      {
        alias:   ['elderly lady', 'elderly woman', 'dress'],
        examine: "Mandy looks closer at the middle left painting. The woman depicted is around sixty, she guesses, but would have been quite pretty when she was younger, with flowing black hair, and a friendly smile. The blue dress is clearly more for a younger woman, but to Mandy's eye she just about gets away with it. She wonders whether that is the skill of the artist. ",
      },
      {
        alias:   ['young academic man', 'scroll', 'mortar board', 'certificate'],
        examine: 'Mandy looks closer at the middle painting. This man has medium brown hair and a chubby face. He is wearing a black suit, with a red academic gown over the top, and a mortar board on his head. He has a scroll - presumably his degree certificate - in his hand.',
      },
      {
        alias:   ['young lady', 'young woman', 'thirties'],
        examine: 'Mandy looks closer at the middle right painting. The woman in the painting is around thirty, and has blonde hair arranged in a bun. She is wearing a severe black dress. As far as Mandy can see she is doing her best to look fifty. Or maybe she is fifty, and the artist has painted her looking younger.',
      },
      {
        alias:   ['dapper young man', 'burgundy suit'],
        examine: 'Mandy looks closer at the far right painting. This man has almost black hair, is wearing a burgundy suit, with a black shirt and a blue tie. She wonders when it might have been painted; the colours suggest maybe the seventies or later, but it is the same artistic style as the others, which look nineteenth century.',
      },
    ],

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('gallery', {
      use(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
        if (Quest.World.w.front_hall.exitState < 2) Quest.World.w.front_hall.exitState = 2;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultExitUse' does not exist on type '... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultExitUse(char, this);
      },
    }),

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    west: new Quest.World.Exit('_', { alsoDir: ['out'], msg: 'Mandy tries to go back outside, but that way is now mysteriously locked. It looks like she will have to head further into the house. It is strange, but now she is trapped inside the house, she does not feel so scared.', use: Quest.Utilities.util.cannotUse }),

    windowsface: 'west',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('inside_door', {
    alias:   'door',
    examine: 'Mandy tries the door; it is definitely locked shut.',
    loc:     'front_hall',
    open:    'Mandy tries the door; it is definitely locked shut.',
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('front_hall_floor', {
    alias: 'floor',
    examine() {
      if (this.state === 0) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The design on the floor is like one of those pictures her father likes; if you stare at them in just the right way a three-dimensional image emerges. Mandy is not sure why, but she really does not want to see what the image in the floor might be. She shudders involuntarily.');
      } else if (this.state === 1) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy gingerly looks at the design on the floor again... It has gone! It is just a simple black and white check. How can that be?');
        this.state = 2;
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The floor is tiled, a simple black and white check design.');
      }
    },
    loc:     'front_hall',
    scenery: true,
    stareat() {
      if (this.state === 0) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Pull yourself together,' Mandy says to herself 'It's just a floor, for Christ's sake.' She stares at it, but nothing happens. She tries slowly walking round the peculiar design, whilst staring at it, but nothing.|Wait, her father always says to stare {i:beyond} it. She stands staring at an imaginary point about a metre below the floor...|Suddenly the image pops into view -- a huge mouth, like a snake's or dragon's -- wide open, and about to snap shut around her. She shrieks as she jumps back in shock, and as suddenly as it appears, the giant mouth disappears. As her pounding heart slows, she quickly looks round, thankful no one was around to witness that.");
        this.state = 1;
      } else if (this.state === 1) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy gingerly looks at the design on the floor again... It has gone! It is just a simple black and white check. How can that be?');
        this.state = 2;
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy stares at the black and white checks on the floor, but nothing happens. Not even when she stares at an imaginary point about a metre below the floor.');
      }
    },
    state:    0,
    synonyms: ['image', 'design'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('brass_dining_room', {
    afterFirstEnter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
      if (!Quest.World.w.front_hall.notedasweird) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("{i:That's weird,} thinks Mandy, {i:where could the door to the west go?} The front garden must be the other side of the door, but there was no door visible there from the garden, just a window. ");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
        Quest.World.w.front_hall.notedasweird = true;
      }
    },
    alias: 'dining room',
    beforeEnter() {
      this.mannequinCount++;
    },
    blocked() {
      if (this.mannequinCount < 15) return false;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (Quest.World.w.large_key.loc === 'clock') return false;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
      if (Quest.World.w.wire.locs.includes('brass_dining_room')) return false;
      for (const key in Quest.World.w) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[key].loc === 'brass_dining_room' && !Quest.World.w[key].scenery) return false;
      }
      return true;
    },
    colours: [
      'russet and lilac',
      'russet and lilac',
      'russet, lilac and plum',
      'russet, lilac and plum',
      'russet, lilac, plum and burgundy',
      'russet, lilac, plum and burgundy',
      'russet, lilac, plum, burgundy and cerise',
      'russet, lilac, plum, burgundy and cerise',
      'russet, lilac, plum, burgundy, cerise and olive',
      'russet, lilac, plum, burgundy, cerise and olive',
      'russet, lilac, plum, burgundy, cerise, olive and lavender',
      'russet, lilac, plum, burgundy, cerise, olive and lavender',
      'russet, lilac, plum, burgundy, cerise, olive, lavender and salmon pink',
      'russet, lilac, plum, burgundy, cerise, olive, lavender and salmon pink',
      'russet, lilac, plum, burgundy, cerise, olive, lavender, salmon pink and fawn',
    ],

    desc() {
      let s = '';
      if (!this.seenMannequins) {
        s                   = "'What? Sorry, I thought...' Mandy starts to apologise to the people sat at the table, before realising none are moving - they are just mannequins. Creepy!|";
        this.seenMannequins = true;
      }
      s += "This room is dominated by an elegant, dark wood table, well-polished, with brass legs shaped like a lion's, and laid out with eight dinner settings. Eight chairs, in matching style, surround it. At the table, ";
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(' ');
      if (this.mannequinCount > 0) {
        if (this.mannequinCount === 1) {
          s += 'A single mannequin is sat at the table.';
        } else if (this.mannequinCount < 9) {
          s += `${Quest.lang.toWords(this.mannequinCount)} mannequins are sitting, dressed up in clothes and wigs.`;
        } else if (this.mannequinCount === 9) {
          s += 'eight mannequins are sitting, dressed up in clothes and wigs; a ninth is standing behind one of the chairs.';
        } else {
          s += `eight mannequins are sitting, dressed up in clothes and wigs; ${Quest.lang.toWords(this.mannequinCount - 8)} more are standing as though waiting to take their place.`;
        }
        if (this.mannequinCount > 12) s += ' It is getting crowded in here!';
      }
      s += ' The north wall has a window, with dark wood cabinets on either side, and there is a grand marble fireplace directly opposite the window, with a large clock on the mantelpiece. There are doors to the east, south and west.';
      if (this.mannequinCount === 0 && !this.mannequinsNoted) {
        this.mannequinsNoted = true;
        s                   += '|The absence of mannequins makes the room much more pleasant!';
      }
      return s;
    },

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('steam_corridor'),

    mannequinCount: 4,

    scenery: [
      {
        alias:   ['mantel', 'grate', 'mantelpiece', 'chimney piece', 'fireplace'],
        examine: 'The fireplace is of a classical style, with two columns either side that are very similar to the museum in the market square; Mandy can vaguely remember being told the museum is Victorian, so perhaps the fireplace is that old too. She cannot imagine it is actually from ancient Greece! There is a large, old-fashioned clock on the mantelpiece.',
      },
      {
        alias:   'cabinets',
        examine: 'The two cabinets are identical. Made of dark wood, with two ornate doors at the front, they stand on four stubby legs.',
        open:    'The doors do not open -- though there is no sign of a keyhole.',
      },
      {
        alias:   'table',
        examine: 'The table top is made of the same dark wood as the chairs. The legs are rather ornate, and shaped like the legs of a lion; the brass is not as clean as you might hope for a dining room table.',
      },
      {
        alias:   'legs',
        examine: 'The table legs are rather ornate, and shaped like the legs of a lion; the brass is not as clean as you might hope for a dining room table.',
      },
      {
        alias:   ['dresses', 'clothes'],
        examine: 'The dresses on the mannequins are a variety of colours; Mandy can see {selectEnd:brass_dining_room:colours:visited}.',
        take:    'Mandy tries to take some of the clothing from a mannequin, but it seems to be very firmly fixed.',
      },
      {
        alias:   ['suits', 'trousers', 'shirts', 'bowties', 'bow ties'],
        examine: 'The suits on the mannequins all the same; black trousers, jackets and bow ties; with a white dress shirt.',
        take:    'Mandy tries to take some of the clothing from a mannequin, but it seems to be very firmly fixed.',
      },
      {
        alias:   'wigs',
        examine: 'The wigs are a mix of raven black and platinum blonde; the male wigs represent very neat, short haircuts, the female wigs are more varied, with considerably longer hair.',
        take:    'Mandy thinks about taking a wig from a mannequin... Does she really want to be carrying one if them around? What if it is made from human hair... from someone who has been dead for a hundred years?',
      },
      {
        alias:   ['settings', 'plates', 'napkins', 'cutlery', 'spoons', 'knives', 'forks', 'knife'],
        examine: 'Each table setting consists of a large white plate, with three knives to the right, three forks to the left, and a fork and spoon above. A red napkin folded into something resembling the Sydney Opera House is on each plate.',
        take:    'Mandy puts her hands out to swipe a table setting, wondering if it is solid silver, when a chill goes down her spine. Are the mannequins suddenly looking at her? She withdraws her hand, and they definitely turn their heads, no longer looking at her. She reaches out again, and gets the chills again, as they turn to look at her. She decides she does not need a table setting after all.',
      },
    ],

    seenMannequins: false,

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('gallery', {
      use(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
        if (Quest.World.w.front_hall.exitState === 1) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Mandy walks south... {i:Wait, this isn't the hall,} she thinks to herself. She is positive this is the doorway she came through before, so why is she not in the hall?");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
          Quest.World.w.front_hall.exitState = 5;
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy heads south.');
        }
        char.moveChar(this);
        return true;
      },
    }),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('great_gallery'),

    windowsface: 'north',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('mannequins', {
    examine: 'Mandy looks closer at the mannequins. Their skin is a speckled grey that feels cool to the touch, and sounds like wood when knocked. Their faces are only half formed; slight depression to suggest eyes, a vague nose, but no mouth. Some are dressed as men, some as women though there is no indication of gender other than that. The female ones are wearing long dresses, the male ones are in black suits; they all look like extras from {i:Downton Abbey} -- apart from the grey complexions.|{once:Did that one just turn its head? Mandy looks again, maybe not.:They are not moving at the moment...}',
    loc:     'brass_dining_room',
    scenery: true,
    smash() {
      if (!this.smashed) {
        this.smashed = true;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks at the mannequins - the perfect opponents in a fight; they cannot fight back.|She swings a punch at one dressed in a suit, knocking its head off in a most satisfying way. It looks even more creepy with its head lying on the table in front of it...|A movement behind her makes Mandy look round, so see two people entering the dining room... Are they people? There are silver all over, including their faces. Mandy backs away as they rush towards her, one casually knocking her aside, sending her slamming into the wall.|As she warily gets to her feet, she watches as they reattach the head, their arms a blur of speed. And they they leave the room, as fast as they entered it.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy contemplates smashing another mannequin. She rubs her sore ribs where the silver hit her, and decides not to.');
      }
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('clock', Quest.Templates.CONTAINER(false), {
    alias: 'clock',
    dowindup() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (Quest.World.w.large_key.size < 5) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return falsemsg('Mandy looks at the hole in the back of the inanimate figure; a square peg. Like it would fit the key she has -- only much much bigger.');
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (Quest.World.w.large_key.size > 5) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return falsemsg('Mandy looks at the hole in the back of the inanimate figure; a square peg. Like it would fit the key she has -- if not {i:that} big.');
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy puts the key in the clock, and gives it a couple of turns. It continues to tick...');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (Quest.World.w.large_key.loc === this.name) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('She decides to hang on to the key.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
        Quest.World.w.large_key.loc = Quest.World.player.name;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
        Quest.World.w.large_key.scenery = false;
      }
      return true;
    },
    examine() {
      let s     = 'This is a large, old-fashioned clock. A dark wood case houses the ticking mechanism. Roman numerals run round the clock face, ';
      let extra = '';
      if (this.setTimeCount === 1) extra = ' What the fuck? She just set it to four o\'clock!';
      if (this.setTimeCount > 2 && this.setTimeCount % 2 === 1) extra = ' Again!';
      if (typeof this.lookturn === 'number') {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'turn' does not exist on type '{ turnCoun... Remove this comment to see the full error message
        if (this.lookturn > (Quest.World.game.turn - 10)) {
          s += `which indicate the time is now twenty past nine.${extra}`;
        } else {
          s += `which indicate the time is still twenty past nine.${extra} It is ticking, so has clearly not stopped; why is the time not changing?`;
        }
      } else {
        s += `which indicate the time is now twenty past nine.${extra} That is so wrong, Mandy cannot decide if it is slow or fast.`;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'turn' does not exist on type '{ turnCoun... Remove this comment to see the full error message
        this.lookturn = Quest.World.game.turn;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (Quest.World.w.large_key.isAtLoc(this.name)) {
        s += ' She can see the key for winding the clock up is in the side of the clock.';
      }
      if (this.setTimeCount % 2 === 1) this.setTimeCount++;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },
    loc:          'brass_dining_room',
    scenery:      true,
    setTimeCount: 0,
    setclock() {
      if (this.setTimeCount < 2) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy decides to set the clock. She is not sure quite what the time is, but it has to be around four o'clock, she guesses. Ten minutes out is better than five hours. She fiddles at the back, finding the control, and sets the hands to five to four.");
        this.setTimeCount = 1;
      } else if (this.setTimeCount === 2) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy notices the clock says twenty past nine. 'I thought I set that.' She fiddles at the back, finding the control, and sets the hands to five to four.");
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy decides to set the clock {i:again}. She fiddles at the back, finding the control, and sets the hands to five to four.');
      }
      if (this.setTimeCount % 2 === 0) this.setTimeCount++;
    },
    synonyms: ['time'],
    testDropIn(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (options.item !== Quest.World.w.large_key) return falsemsg('That is not something you can put in a clock.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (Quest.World.w.large_key.size > 5) return falsemsg('The key is too large for the clock.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (Quest.World.w.large_key.size < 5) return falsemsg('The key is too small for the clock.');
      return true;
    },
    windup() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (Quest.World.w.large_key.loc === Quest.World.player.name || Quest.World.w.large_key.loc === this.name) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'clock' does not exist on type '{}'.
        return Quest.World.w.clock.dowindup();
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg('Mandy has nothing to wind the clock up with.');
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('large_key', SIZE_CHANGING(), {
    alias:   'clock key',
    desc4:   'The key is tiny.',
    desc5:   'This key is about an inch across, and would be for turning a mechanism with a square peg.',
    desc6:   'This key is about a foot across, and would be for turning a mechanism with a square peg. A big square peg.',
    desc7:   'The key is huge.',
    loc:     'clock',
    scenery: true,
    turn(options: any) {
      return this.useFunction(options);
    },
    useFunction(options: any) {
      if (Quest.World.player.loc === 'theatre_stage') {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
        Quest.World.w.clockwork_thespian.dowindup();
      } else if (Quest.World.player.loc === 'brass_dining_room') {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'clock' does not exist on type '{}'.
        Quest.World.w.clock.dowindup();
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return falsemsg('Mandy wonders what she could use the clock key for. Besides winding up the clock, that is.');
      }
      return true;
    },
    useWith(char: any, obj: any) {
      if (obj.dowindup) {
        return obj.dowindup();
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg('Mandy wonders what she could use the clock key for. Besides winding up the clock, that is.');
    },
    windup(options: any) {
      return this.useFunction(options);
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('dining_room_chair', Quest.Templates.FURNITURE({ sit: true }), {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    afterPostureOn() {
      msg('It is nice to get the weight off her feet for a moment!');
    },

    alias: 'chair',

    examine: 'The chair is made of dark wood, with a high back and a padded seat.',

    loc: 'brass_dining_room',

    scenery: true,

    synonym: ['chairs'],

    testPostureOn() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.brass_dining_room.mannequinCount > 7) return falsemsg('Mandy looks at the chairs; all are occupied by mannequins, preventing her from sitting on any of them.');
      return true;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createRoom('gallery', Quest.Templates.ROOM_SET('gallery'), {
    afterFirstEnter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
      if (!Quest.World.w.front_hall.notedasweird) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("{i:That's weird,} thinks Mandy, {i:where could the door to the west go?} The front garden must be the other side of the door, but there was no door visible there from the garden, just a window. And this room is so long, surely the far end must be in number 21!");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
        Quest.World.w.front_hall.notedasweird = true;
      }
    },
    alias: 'north end of the gallery',
    desc:  '{roomSet:Mandy is standing at the north end of a long and rather gloomy corridor -- at least this end has a couple of windows, the southern end looks even darker. There are paintings on the east wall.:The north end of the gallery is much like the south, if a little lighter with the window; again there are paintings along the east wall.}  Doors lead north and east. A small table with a chess board set in it stands against the west wall, under the window.',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    east:  new Quest.World.Exit('_', {
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'room_big' does not exist on type '{}'.
        if (!Quest.World.w.room_big.accessedFrom) Quest.World.w.room_big.accessedFrom = 'gallery_south';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'room_big' does not exist on type '{}'.
        const dest = Quest.World.w.room_big.accessedFrom === 'gallery' ? Quest.World.w.room_big : Quest.World.w.room_small;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, new Quest.World.Exit(dest, { dir: this.dir, origin: this.origin }));
      },
    }),

    headingAlias: 'The Gallery (North)',

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north: new Quest.World.Exit('brass_dining_room', {
      use(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
        if (Quest.World.w.brass_dining_room.blocked()) return falsemsg('Mandy starts heading north, but the dining room is now so full of mannequins, she cannot get into it.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
        if (Quest.World.w.front_hall.exitState === 2) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("Mandy walks north... {i:Wait, this isn't the hall,} she thinks to herself. She is positive this is the doorway she came through before, so why is she not in the hall?");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'front_hall' does not exist on type '{}'.
          Quest.World.w.front_hall.exitState = 5;
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy heads north.');
        }
        char.moveChar(this);
        return true;
      },
    }),

    scenery: [
      {
        alias:   ['portraits', 'pictures', 'paintings'],
        examine: "The paintings are all oil on canvas, and to Mandy's inexpert eye the same style, though they vary in subject matter. Several are portraits, but there is a Greek temple and a rather beautiful sunset. The biggest painting, opposite the chess set, is of a cavalry man in red uniform, astride a great white stallion, sabre in hand. All around him are infantry soldiers in blue -- presumably the enemy.",
      },
      {
        alias:   ['sunset'],
        examine: 'The painting of the sunset is a riot of colour, and really quite striking; it would benefit from better lighting.',
      },
      {
        alias:   ['stallion'],
        examine: "The great white stallion is great and white. And a stallion. Some girls are really in to horses, but it was never Mandy's thing.",
      },
      {
        alias:   ['sabre'],
        examine: 'The sable is long and curved.',
      },
      {
        alias:   ['greek temple'],
        examine: 'The Greek temple in the painting is little more than a circle of pillars on a base, with a roof. It is sat on a hill, and surrounded by trees.',
      },
      {
        alias:   ['cavalry man'],
        examine: 'The man on the horse is wearing a red uniform and is brandishing a sabre. He has a broad chest, raven black hair and a rather small moustache.{ifMoreThan:battlefield:visited:0: Mandy realises the uniforms are the same as the dead soldiers on the beach were wearing.}',
      },
      {
        alias:   ['chess set', 'chess board', 'chessboard', 'table'],
        examine: "The chess board is set into the small table, sixty four squares of ivory and mahogany, in a circular top. The board is in mid-game, and half a dozen pieces have already been taken, mostly white's. Mandy tries to pick up one of the pawns, and finds she cannot -- it seems to be glued to the table. She tries a couple more pieces -- they all seem very solidly in place, even the ones that have been taken.",
        play:    'Mandy thinks about playing chess... but there is no one to play against. And the pieces seem to be glued down.',
      },
      {
        alias:   ['game'],
        examine: "Mandy looks more closely at the game in progress. Though white has lost more pieces, black's king looks exposed, and might be about to lose.",
      },
    ],

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('gallery_south', { msg: 'Mandy heads to the other end of the gallery; the floorboards squeak under her feet.' }),

    windowsface: 'west',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('chess_pieces', {
    alias:          'chess pieces',
    examine:        'The chess pieces are all wooden and exquisitely carved. The queen looks like a warrior woman in armour, the pawns hold pikes. White pieces seem to be carved from ivory, whilst black are wooden, but they are otherwise identical.',
    loc:            'gallery',
    parserPriority: -10,
    scenery:        true,
    synonyms:       ['king', 'queen', 'rook', 'castle', 'bishop', 'pawn'],
    take() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('The chess pieces seem glued in place; she cannot shift them.');
      this.gluedDownNoted = true;
    },
    turn() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy tries to turn a few of the chess pieces, but none of them moved at all.');
      this.gluedDownNoted = true;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('white_knight', {
    alias: 'white knight',
    examine() {
      if (this.active) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks at the white knight. She had not spotted there is only one before, perhaps that is why white is losing. She is not that clear on the game.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(Quest.World.w.chess_pieces.examine);
      }
    },
    loc:      'gallery',
    scenery:  true,
    synonyms: ['horse'],
    turn() {
      if (this.active) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
        if (Quest.World.w.Patch.leaderName) Quest.World.w.Patch.setLeader();
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy gives the white knight a twist -- and suddenly the room is changing around her...');
        Quest.World.player.loc = 'battlefield';
        Quest.World.world.update();
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        Quest.World.world.enterRoom();
      } else {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chess_pieces' does not exist on type '{}... Remove this comment to see the full error message
        Quest.World.w.chess_pieces.turn;
      }
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createRoom('gallery_south', Quest.Templates.ROOM_SET('gallery'), {
    afterEnter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'beach' does not exist on type '{}'.
      if (!this.silverFlag1 && Quest.World.w.beach.visited > 0) {
        this.silverFlag1 = true;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('A sudden movement at the other end of the gallery catches her eye. A figure, all in silver, looks at her, before disappearing through the door at the far end.');
        Quest.World.player.silverSpotted++;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'hourglass' does not exist on type '{}'.
      if (this.silverFlag1 && !this.silverFlag2 && Quest.World.w.hourglass.fillState === 5) {
        this.silverFlag2 = true;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('She notices a silver figure at the other end of the gallery, studying the chessboard. She remembers seeing one there before. This one seems unaware of her, she thinks. Then it glances her way, and suddenly dashes for the door to the dining room.');
        Quest.World.player.silverSpotted++;
      }
    },
    alias: 'south end of the gallery',

    desc: '{roomSet:Mandy is standing at the south end of a long and rather gloomy corridor -- though the far end looks a little lighter; there is at least a window at that end. There are paintings on the east wall.:The south end of the gallery is much like the north, if a little darker without the windows; again there are paintings along the east wall.} {once: Why would anyone hang paintings where it is so dark?} The wooden panelling on the walls has warped, and shows sign of damp. There are doors to the south, east and west.',

    // ts-error-fixed ts-migrate(1117) FIXME: An object literal cannot have multiple properties ... Remove this comment to see the full error message
    east: new Quest.World.Exit('_', {
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'room_big' does not exist on type '{}'.
        if (!Quest.World.w.room_big.accessedFrom) Quest.World.w.room_big.accessedFrom = 'gallery';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'room_big' does not exist on type '{}'.
        const dest = Quest.World.w.room_big.accessedFrom === 'gallery' ? Quest.World.w.room_small : Quest.World.w.room_big;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, new Quest.World.Exit(dest, { dir: this.dir, origin: this.origin }));
      },
    }),

    examine_walls: 'The walls are panelled with dark wood, but some patches are discoloured, and the wood has warped.',

    headingAlias: 'The Gallery (South)',

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north: new Quest.World.Exit('gallery', { msg: 'The floorboards squeak beneath her, as she heads to the north end.' }),

    scenery: [
      {
        alias:      ['portraits', 'pictures', 'paintings'],
        examine:    'The most striking of the paintings is a family portrait, which must be about life size, despite the subjects being painted full length. Mandy can see a father, in suit and top hat, and a mother, together with three young children.',
        lookbehind: 'Mandy looks behind each of the paintings. There is no safe hidden there; it seems modern media lied to her.',
      },
      {
        alias:   ['father'],
        examine: 'The man Mandy guesses is the father has very black hair, and a moustache. He is wearing a dark grey suit.',
      },
      {
        alias:   ['mother'],
        examine: 'The woman is quite attractive with long, flowing black hair. She is wearing a dark red dress with a very full skirt; probably Victorian, thinks Mandy, though there is something exotic about her that makes her look perhaps eastern European.',
      },
      {
        alias:   ['young children', 'girl', 'boys'],
        examine: 'There are three children in the painting; two boys and an older girl. The girl is maybe twelve, and wearing a blue Gingham dress; her dark hair is in two plaits. The boys, who might be eight and ten, are in dark grey suits; the younger looks a little chubby.',
      },
    ],

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('upper_steam_hall'),

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('theatre'),

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('room_big', {
    alias: 'drawing room',
    beforeEnter() {
      for (const key in Quest.World.w) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const item = Quest.World.w[key];
        if (item.size_changing && ['room_small', 'drawing_room_south', 'drawing_room_north'].includes(item.loc)) {
          item.shrink();
          item.oldLoc = item.loc;
          item.loc    = 'room_big';
        }
      }
    },
    desc() {
      let s = 'The drawing room is rather well appointed with wood panelling on the walls, and an ornate ceiling. A fireplace to the east has portraits on either side, and above it a painting of a battle.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'mahogany_cabinet' does not exist on type... Remove this comment to see the full error message
      if (Quest.World.w.mahogany_cabinet.moved) {
        s += ' The mahogany bureau has been pulled out from the north wall. There is a thick rug on the floor.';
      } else {
        s += ' There is a mahogany bureau on the north wall and a thick rug on the floor.';
      }
      s += ' The only way out is the door to the west.';
      return s;
    },
    noFollow: true,
    roll:     'Mandy wonders if she could roll up the rug, and carry it that way. Does she really want to be lugging the thing around everywhere? Maybe not.',
    scenery:  [
      {
        alias:   'fireplace',
        examine: 'The fireplace is dark metal with ornate scrolling, and decorated with tiles with a floral design down either side.',
      },
      {
        alias:   'rug',
        examine: 'The rug is not quite as big as the room, a really thick pile that Mandy almost feels bad walking on. There is a geometric design around the outside, and that could be the signs of the zodiac in the middle.',
      },
      {
        alias:   ['signs', 'zodiac'],
        examine: 'In the centre of the rug there is a depiction of something like a clock face - though without hands - with each sign of the zodiac instead of numbers. She sees Leo - her sign - at the nine o\'clock position.',
      },
      {
        alias:   ['leo', 'lion'],
        examine: 'Mandy looks closer at her star sign; Leo is depicted as the stylised head of a lion.',
      },
      {
        alias:   ['aries', 'ram', 'taurus', 'bull', 'gemini', 'twins', 'cancer', 'crab', 'virgo	maiden', 'libra	scales', 'scorpio	scorpion', 'sagittarius	archer', 'centaur', 'capricorn', 'goat', 'aquarius	water-bearer', 'pisces', 'fish'],
        examine: 'Mandy glances at the other signs, but without paying much attention. Like all Leo\'s, she knows it is all nonsense.',
      },
      {
        alias:   ['geometric design'],
        examine: 'Mandy studies the design around the outside of the rug... Perhaps there is a message encoded there? After fifteen minutes she decides there is not.',
      },
      {
        alias:   ['skirting board'],
        examine: 'The skirting board looks to go all round the room, as is the nature of skirting boards everywhere.',
      },
      {
        alias:   'tiles',
        examine: 'There are three tiles on each side of the grate. All six have the floral design -- red elongated flowers, knobbly brown pods and bright green leaves composed of well over a dozen long, slim leaflets.{once: A tamarind plant, Mandy realises.}',
      },
      {
        alias:   'romans',
        examine: 'The Roman soldiers are wearing bronze armour and red tunics... Mandy has a feeling they should be wearing iron, so maybe they are not Romans. Or the artist got it wrong.',
      },
      {
        alias:   'opponents',
        examine: 'The other combatants are wearing animal skins, and fighting with spears. They have blue paint on their faces, which is a curious fashion choice, but maybe that was the look back then.',
      },
      {
        alias:   'surface',
        examine: 'The surface of the bureau is smooth and polished.',
      },
      {
        alias:   'back',
        examine: 'The back of the bureau is wood, but has been carved to resemble a castle wall.',
      },
      {
        alias:   'towers',
        examine: 'The fake towers on either side of the bureau are wood; each has two drawers.',
      },
      {
        alias:   'crenelations',
        examine: 'The crenelation on the fake towers and the back of the bureau are carved from wood. The edge has been picked out in gilt.',
      },
    ],

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    west: new Quest.World.Exit('_', {
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'room_big' does not exist on type '{}'.
        const dest = Quest.World.w.room_big.accessedFrom === 'gallery' ? Quest.World.w.gallery : Quest.World.w.gallery_south;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, new Quest.World.Exit(dest, { dir: this.dir, origin: this.origin }));
      },
    }),

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('mahogany_cabinet', Quest.Templates.OPENABLE(true), {
    alias: 'mahogany bureau',
    examine() {
      let s = 'The mahogany bureau looks like it came straight out of "Antiques Roadshow". {if:mahogany_cabinet:closed:It has a single door that is lifted up to close it.:The door at the front is pulled down to form a surface to write on, and reveals a curious section at the back with two small drawers on the left and another two on the right, decorated to resemble the towers of a castle with crenelation along the top, and extending across the back of the bureau.}';
      if (this.moved) {
        s += ' It is standing a little way from the wall and Mandy can just see a hole in the wall behind it a few inches wide.';
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },
    loc: 'room_big',
    lookbehind() {
      if (this.moved) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy can see a hole in the wall behind the bureau a few inches wide, just over the skirting board, surrounded by cracks, as though someone has smashed it with a sledge hammer.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The bureau is too close to the wall to see behind it; she would have to shift it to see.');
      }
    },
    pull() {
      return this.push();
    },
    push() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (this.moved) return falsemsg("Mandy looks at the bureau. 'No, not shifting that thing again.'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Not sure if she should be moving furniture in someone else's house, Mandy grabs a hold of the bureau, and heaves it away from the wall, revealing a hole in the wall, a few inches high, just above the skirting board.");
      this.moved = true;
      return Quest.World.world.SUCCESS;
    },
    scenery: true,
    shift() {
      return this.push();
    },
    shiftable: true,
    synonyms:  ['mahogany cabinet', 'desk'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('cabinet_drawer', {
    alias: 'drawers',

    examine: 'The drawers are small, perhaps used for keeping pens in.',

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mahogany_cabinet' does not exist on type... Remove this comment to see the full error message
    isLocatedAt(loc: any) {
      return loc === 'room_big' && !Quest.World.w.mahogany_cabinet.closed;
    },
    open:    'Mandy tries a drawer, only to find it is locked. Odd that there is no keyhole.',
    scenery: true,
    synonym: ['left drawer', 'right drawer'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('cabinet_hole', {
    alias: 'hole',

    examine: 'With the bureau pulled out, Mandy can now see the hole in the wall; it is about the size of her hand, just above the skirting board. The cracks in the wall suggest it was the result of an impact.',
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mahogany_cabinet' does not exist on type... Remove this comment to see the full error message
    isLocatedAt(loc: any) {
      return loc === 'room_big' && Quest.World.w.mahogany_cabinet.moved;
    },
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('portraits_big', {
    examine(options: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('There are two portraits of girls, one about eight years old, the other maybe twelve. They look alike, perhaps sisters. The other painting is of a great battle in ancient times. The armoured soldiers look like they might be Roman, and have shields and short swords, whilst their opponents have long swords and axes, but no armour. The Romans seem to be winning.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'portraits_west' does not exist on type '... Remove this comment to see the full error message
      if (Quest.World.w.portraits_west.flag && Quest.World.w.portraits_north.flag && Quest.World.w.portraits_south.flag) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('She realises these are the same three pictures she saw in the drawing room -- just not as big. In fact, everything in this room is identical to that room, just in here it is normal size.');
      }
    },
    flag:     false,
    loc:      'room_big',
    scenery:  true,
    synonyms: ['portraits', 'pictures', 'paintings'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('room_small', {
    alias: 'giant drawing room',
    beforeEnter() {
      for (const key in Quest.World.w) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const item = Quest.World.w[key];
        if (item.size_changing && item.loc === 'room_big') {
          item.grow();
          item.loc = item.oldLoc ? item.oldLoc : 'room_small';
        }
      }
    },
    desc:         "This is a drawing room of immense size. Perhaps a hundred metres above her, Mandy can see the ornate ceiling. The walls, panelled in wood, stretch an even greater distance crossways. Huge paintings, way above Mandy's head, hang from the wall, above and either side of an enormous fireplace. In the centre of the room is a thick rug, about the size of a football pitch. The pile is so great, it would stop Mandy going across it. She can, however go round the sides, to the northeast or southeast. The door to the west looks very much out of place, being normal height in such a huge wall.",
    headingAlias: 'The Drawing Room (Giant)',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    in:           new Quest.World.Exit('boots_room', {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
      isHidden() {
        return Quest.World.w.boots.loc !== 'room_small' || Quest.World.w.boots.size < 6;
      },
      msg: 'Mandy crawls inside the left boot.',
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (Quest.World.w.boots.loc !== 'room_small' || Quest.World.w.boots.size < 6) return falsemsg(Quest.lang.not_that_way, { char, dir: this.dir });
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, this);
      },
    }),

    noFollow: true,

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    northeast: new Quest.World.Exit('drawing_room_north'),

    scenery: [
      {
        alias:   'mess',
        examine: 'Mandy studies that third painting again, and realises that there is a real picture. It looks like a battle, with swords and shields. Now she can see it, she wonders how she could not before.',
      },
      {
        alias:   'fireplace',
        examine: 'The enormous fireplace is dark metal with ornate scrolling, and decorated with tiles with a floral design down either side.',
      },
      {
        alias:   'rug',
        examine: 'The rug is so big it is more like a corn field, the tufts standing so tall they come up to her chest, and too thick to get through. She can tell there is a design on it, but she cannot tell what from this angle.',
      },
      {
        alias:   'design',
        examine: 'Mandy ties again to see the design on the rug; she definitely cannot tell what it is from this angle.',
      },
      {
        alias:   'scrolling',
        examine: 'The scrolling on the fireplace is all curves and flourishes.',
      },
      {
        alias:   ['skirting board'],
        examine: 'The skirting board looks to go all round the room, as is the nature of skirting boards everywhere. It is about a metre high, which is less common.',
      },
    ],

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    southeast: new Quest.World.Exit('drawing_room_south'),

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    west: new Quest.World.Exit('_', {
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'room_big' does not exist on type '{}'.
        const dest = Quest.World.w.room_big.accessedFrom === 'gallery' ? Quest.World.w.gallery_south : Quest.World.w.gallery;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, new Quest.World.Exit(dest, { dir: this.dir, origin: this.origin }));
      },
    }),

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('portraits_west', {
    examine(options: any) {
      options.item.flag = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'portraits_west' does not exist on type '... Remove this comment to see the full error message
      if (Quest.World.w.portraits_west.flag && Quest.World.w.portraits_north.flag && Quest.World.w.portraits_south.flag) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks at the three paintings. Having looked from three angles, she can see that there are two portraits of girls, one about eight years old, the other maybe twelve. They look alike, perhaps sisters. The other painting is of a great battle in ancient times. The armoured soldiers look like they might be Roman, and have shields and short swords, whilst their opponents have long swords and axes, but no armour. The Romans seem to be winning.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'room_big' does not exist on type '{}'.
        if (Quest.World.w.room_big.visited > 0) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('She realises these are the same three pictures she saw in the drawing room -- just much, much big. In fact, everything in this room is identical to that room, just in here it is giant size.');
        }
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks at the three paintings; two look to be portraits, the other is just a confusing mess. It is hard to see them properly from so far away, and a bad angle.');
      }
    },
    flag:     false,
    loc:      'room_small',
    scenery:  true,
    synonyms: ['portraits', 'pictures', 'paintings'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('portraits_south', {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'portraits_west' does not exist on type '... Remove this comment to see the full error message
    examine(options: any) {
      return Quest.World.w.portraits_west.examine(options);
    },

    flag: false,

    loc: 'drawing_room_south',

    scenery: true,

    synonyms: ['portraits', 'pictures', 'paintings'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('portraits_north', {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'portraits_west' does not exist on type '... Remove this comment to see the full error message
    examine(options: any) {
      return Quest.World.w.portraits_west.examine(options);
    },

    flag: false,

    loc: 'drawing_room_north',

    scenery: true,

    synonyms: ['portraits', 'pictures', 'paintings'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('drawing_room_south', {
    alias:        'south side of the giant drawing room',
    desc:         'Mandy is standing in a narrow strip between the wall to the south and the rug-forest to the north. The south side of the giant room is notable for how dusty it is -- and how big the particles of dust are; about the size of marbles. Probably the way she can go from here is back northwest.',
    headingAlias: 'The Drawing Room (Giant, South)',

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    northwest: new Quest.World.Exit('room_small'),

    scenery: [
      {
        alias:   'mess',
        examine: 'Mandy studies that third painting again, and realises that there is a real picture. It looks like a battle, with swords and shields. Now she can see it, she wonders how she could not before.',
      },
      {
        alias:   'fireplace',
        examine: 'The enormous fireplace is dark metal with ornate scrolling, and decorated with tiles with a floral design down either side.',
      },
      {
        alias:   'dust',
        clean:   "Someone really needs to dust this place,' think Mandy. Somone other than her, obviously.",
        examine: 'Conscious that dust is about ninety percent dead skin, Mandy decides not to study it too closely.',
        take:    'She can\'t take it.|Well, okay, she {i:could}, but she is not about to.',
      },
      {
        alias:   'rug',
        examine: 'The rug is so big it is more like a corn field, the tufts standing so tall they come up to her chest, and too thick to get through. She can tell there is a design on it, but she cannot tell what from this angle.',
      },
      {
        alias:   'design',
        examine: 'Mandy ties again to see the design on the rug; she definitely cannot tell what it is from this angle.',
      },
      {
        alias:   'scrolling',
        examine: 'The scrolling on the fireplace is all curves and flourishes.',
      },
      {
        alias:   ['skirting board'],
        examine: 'The skirting board looks to go all round the room, as is the nature of skirting boards everywhere. It is about a metre high, which is less common.',
      },
    ],
    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('drawing_room_north', {
    alias: 'north side of the giant drawing room',
    desc() {
      let s = 'Mandy stands on a narrow strip of wooden floor, between the colossal wall to the north, and the forest-like carpet to the south. To the east, the rug is flush against the wall, so that is not an option, but she can head southwest, back to the door.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'mahogany_cabinet' does not exist on type... Remove this comment to see the full error message
      if (Quest.World.w.mahogany_cabinet.moved) {
        s += ' Above her towers a huge mahogany bureau, standing some way out from the wall. Behind it, to the north, is a large hole in the otherwise perfect wall.';
      } else {
        s += ' Above her towers a huge mahogany bureau, standing against the wall. There are cracks in the wall behind it, just above the skirting board.';
      }
      return s;
    },
    headingAlias: 'The Drawing Room (Giant, North)',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north:        new Quest.World.Exit('secret_room', {

      alsoDir: ['in'],
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'mahogany_cabinet' does not exist on type... Remove this comment to see the full error message
      isHidden() {
        return !Quest.World.w.mahogany_cabinet.moved;
      },
      simpleUse(char: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mahogany_cabinet' does not exist on type... Remove this comment to see the full error message
        if (!Quest.World.w.mahogany_cabinet.moved) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('No way can Mandy get between the wall and the giant bureau to go that way.');
          return false;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
        return Quest.Utilities.util.defaultSimpleExitUse(char, this);
      },
    }),

    scenery: [
      {
        alias:   'mess',
        examine: 'Mandy studies that third painting again, and realises that there is a real picture. It looks like a battle, with swords and shields. Now she can see it, she wonders how she could not before.',
      },
      {
        alias:   'fireplace',
        examine: 'The enormous fireplace is dark metal with ornate scrolling, and decorated with tiles with a floral design down either side.',
      },
      {
        alias:   'rug',
        examine: 'The rug is so big it is more like a corn field, the tufts standing so tall they come up to her chest, and too thick to get through. She can tell there is a design on it, but she cannot tell what from this angle.',
      },
      {
        alias:   'design',
        examine: 'Mandy ties again to see the design on the rug; she definitely cannot tell what it is from this angle.',
      },
      {
        alias:   'scrolling',
        examine: 'The scrolling on the fireplace is all curves and flourishes.',
      },
      {
        alias:   ['skirting board'],
        examine: 'The skirting board looks to go all round the room, as is the nature of skirting boards everywhere. It is about a metre high, which is less common.',
      },
    ],

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    southwest: new Quest.World.Exit('room_small'),

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('cracks_in_the_wall', {
    examine() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'mahogany_cabinet' does not exist on type... Remove this comment to see the full error message
      if (Quest.World.w.mahogany_cabinet.moved) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The cracks in the wall surround a hole big enough to climb through.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Looking up behind the giant bureau, Mandy can see that the cracks lead to a hole in the wall -- probably large enough to climb though, if not for the bureau.');
      }
    },
    goInDirection: 'north',
    loc:           'drawing_room_north',
    scenery:       true,
    synonyms:      ['hole'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('huge_cabinet', {
    alias: 'huge bureau',
    examine() {
      let s = 'The mahogany bureau towers over Mandy; it has to be higher than the science block at Kyderbrook High. {if:mahogany_cabinet:closed:Its doors are closed:It has two doors that are open, through it is hard to see what is beyond them from this angle -- it looks strangely like a castle}.';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'mahogany_cabinet' does not exist on type... Remove this comment to see the full error message
      if (Quest.World.w.mahogany_cabinet.moved) {
        s += ' It is standing a little way from the wall -- like about 10 foot -- and Mandy can see a hole in the wall behind it.';
      } else {
        s += ' Is there something behind the bureau?';
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },
    goUpItem: 'Mandy wonders if she could climb up the giant bureau. The ornate legs look easy enough, but above them, the cabinet itself would be impossible. She decides that is not an option.',
    loc:      'drawing_room_north',
    lookbehind() {
      if (this.moved) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy can just see a hole in the wall behind it a few inches wide, just over the skirting board.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('There are cracks in the wall behind the bureau, and looking closer, Mandy can see there is actually a hole there. Probably big enough to crawl through if the bureau was not there.');
      }
    },
    open: 'Mandy wonders what sort of crane she would need to open the bureau.',
    pull() {
      return this.push();
    },
    push() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg("Mandy looks at the bureau. The one that is higher than the science block at Kyderbrook High. 'That's not going to budge.'");
    },
    scenery: true,
    shift() {
      return this.push();
    },
    synonyms: ['drawers', 'cabinet'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('secret_room', {
    desc:         'After the opulence of the other rooms, this one is decidedly bare -- but at least it is of reasonable proportions. More or less square, the walls are white, or had been at one time. The floor and ceiling are wood.{if:boots:scenery: The only feature of note is a large pair of boots in one corner.}',
    headingAlias: 'A Secret Room',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south:        new Quest.World.Exit('drawing_room_north', { alsoDir: ['out'] }),

    windowsface: 'none',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('boots', SIZE_CHANGING(), {
    afterSizeChange() {
      this.goInDirection = this.size === this.maxsize ? 'in' : undefined;
    },
    alias: 'pair of boots',
    desc4: 'The boots are tiny, suitable for a doll maybe.',
    desc5: 'The boots are big, like a size fifteen or something, Mandy reckons. Her dad has big feet, but not like these.',
    doRepair() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
      if (Quest.World.w.boots.loc === Quest.World.player.name) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Could you mend some boots?' Mandy shows him the boots.");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (Quest.World.w.boots.size > 4) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Are you kidding me? They're enormous! 'Ow can I get a needle through leather that thick?'");
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I should think so. Toss 'em over here, and I'll 'ave a go.'");
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
          Quest.World.w.tiny_man.state = 1;
        }
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
      else if (Quest.World.w.boots.loc === 'tiny_man') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'How are you doing with those boots?'|'Nearly done,' he says, not looking up.");
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Could you mend boots?' Mandy asks.|He shrugs. 'I guess.'");
      }
    },
    enteritem() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
      if (Quest.World.w.boots.size < 6) return falsemsg('The boots are too small for Mandy to get inside.');
      return Quest.Utilities.util.defaultSimpleExitUse(Quest.World.player, Quest.World.w.room_small.in);
    },
    examine() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
      if (Quest.World.w.boots.rejectedForStone) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        Quest.World.w.boots.rejectedForStone = false;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy tips up the left boot, hoping something will fall out -- no such luck. She puts her hand inside it, hoping to feel something. There {i:is} something there, she can just touch it with her fingertips. Something thin, stuck right up in the toe. Try as she might, however, she cannot get her hand in far enough to get a grip on it, whatever it is, to pull it out.');
        return true;
      }
      if (this.size === this.minsize) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg('{nv:item:be:true} too tiny to see properly!', { item: this });
      } else if (this.size === this.maxsize) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The boots are so huge she could probably get inside them! Certainly too big to pick up.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(this[`desc${this.size}`] + (this.mended ? ' They look in good condition, now they have been mended.' : ' The toe of the right boot is coming away from the sole.'));
      }
      return true;
    },

    loc: 'secret_room',

    mended: false,

    parserPronouns: Quest.lang.pronouns.plural,

    repair(options: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (this.mended) return falsemsg('Mandy looks at the boots -- they are probably as mended as they will ever be.');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (options.char === Quest.World.player) return falsemsg('Mandy looks at the boots. If she had some suitable materials, she could fix them. And the the right tools, of course. And some clue about what to do. Hmm, maybe she should find someone else to do it.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
      if (options.char !== Quest.World.w.tiny_man) falsemsg('Mandy wonders if she could ask {nm:char:the} to fix the boots. She decides there is no points.');

      this.doRepair();
      return true;
    },

    scenery: true,

    smell: "Mandy gives the boots a cautious sniff. 'Oh, God!' she exclaims. Not good...",
    // desc3:"The boots are almost too small to see.",
    wear() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(`The boots are too ${this.size > 4 ? 'big' : 'small'} for Mandy, and she is not entirely sure she wants to put her feet in smelly old boots anyway!`);
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('boots_toe', Quest.Templates.COMPONENT('boots'), {
    alias:   'toe of boot',
    examine: 'The toe of the boot has come away from the sole completely.',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('boots_room', {

    afterFirstEnter() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
      Quest.World.w.secret_recipe.size = 6;
    },

    alias: 'inside a boot',

    desc: 'The interior of the boot is no more pleasant than the exterior; just darker.{if:secret_recipe:scenery: It looks like there is a huge sheet of thick card, folded into two, wedged in the toe.}',

    headingAlias: 'Inside a left boot',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    out:          new Quest.World.Exit('room_small', { msg: 'Mandy climbs out of the giant boot, thankful to be out of there.' }),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('boots_from_inside', {
    alias: 'boot',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    examine() {
      msg(Quest.World.w.boots_room.desc);
    },

    goOutDirection: 'out',

    loc:     'boots_room',
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('secret_recipe', SIZE_CHANGING(), {
    alias:  'piece of paper',
    alias3: 'tiny sheet of paper',
    alias4: 'sheet of paper',
    alias5: 'sheet of card',
    alias6: 'huge sheet of card',
    desc3:  'A tiny sheet of folded paper, with writing on one side.',
    desc4:  'This sheet of paper has boon folded in two, and has writing on the inside.',
    desc5:  'A large sheet of thick card, folded in two; Mandy can see writing on one side.',
    desc6:  'A huge sheet of thick card, folded in two; Mandy can see giant writing on one side.',
    grow() {
      this.size++;
      this.setAlias(this[`alias${this.size}`]);
    },
    loc:            'boots_room',
    parserPriority: -10,
    read() {
      // ts-error-fixed ts-migrate(2552) FIXME: Cannot find name 'falsemag'. Did you mean 'falsems... Remove this comment to see the full error message
      if (this.size < 5) return falsemag('The writing is too small to read.');
      let s = '';
      if (this.size === 6) {
        s += 'Mandy opens up the huge sheet of card, and reads the giant letters...';
      } else {
        s += 'Mandy opens up the sheet of paper, and reads the text...';
      }
      s               += '"Notes on the Hourglass of Temporal Hastening. The power of the hourglass can be channelled through a specially prepared conduit -- to wit, the pedestal -- into a suitable medium. Once the hourglass has stopped, the organism maintains its state, but only while the hourglass remains in place -- once the hourglass is removed, the organism very quickly withers and dies. This is a severe limitation to its practical utility, and needs to be resolved. I have resolved not to use it on a living creature until then."';
      this.hasBeenRead = true;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    },
    scenery: true,

    shrink() {
      this.size--;
      this.setAlias(this[`alias${this.size}`]);
    },

    synonyms: ['huge sheet of card', 'tiny sheet of paper', 'notes'],

  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('victorian_floor', {
    alias:   'floor',
    examine: 'The floor is wooden, and well-polished.',
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('victorian_walls', {
    alias:   'wall',
    examine: 'The walls are all panelled in wood.',
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('victorian_ceiling', {
    alias: 'ceiling',
    examine() {
      if (Quest.World.player.standson === null) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('The ceiling is white, with simple decorations along each side.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg('The ceiling turns out to be no more interesting from up here. Mandy wonders why she bothered standing on the {nm:item}.', { item: Quest.World.w[Quest.World.player.standson] });
      }
    },
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('floor', {
    alias:   'Floor',
    examine: 'Mandy is not quite sure what it is about the tiles. They does not depict a demon or murder or anything really; they just has a strange effect on her eyes that is... disturbing.',
    scenery: true,
  });
};
