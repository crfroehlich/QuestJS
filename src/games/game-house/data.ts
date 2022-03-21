import { QuestClass }             from '../../types/quest';
import { msg, falsemsg, metamsg, errormsg } from '../../lib/io';

export const init = (Quest: QuestClass) => {
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('player', Quest.Templates.PLAYER(), {
    alias:   'Mandy',
    examine: 'Mandy is just an ordinary 15 year old girl, with dark shoulder-length hair and a nose she feels is too big. {if:Quest.World.currentLocation:zone:external:She is wearing the uniform of Kyderbrook High School.:She is wearing a uniform, but not the one she put on this morning...}{if:floppy_hat:loc:player: She is also wearing a floppy hat.}',
    getSharp() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'glass_shard' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.glass_shard.loc === Quest.World.player.name) return Quest.World.w.glass_shard;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'crocodile_tooth' does not exist on type ... Remove this comment to see the full error message
      if (Quest.World.w.crocodile_tooth.loc === Quest.World.player.name) return Quest.World.w.crocodile_tooth;
      return null;
    },
    loc:            'highfield_lane',
    parserPriority: -50,
    pronouns:       Quest.lang.pronouns.female,
    receiveItems:   [
      {

        f() {
          // ts-error-fixed ts-migrate(2552) FIXME: Cannot find name 'options'. Did you mean 'Option'?
          options.item.loc = Quest.World.player.name;
          // ts-error-fixed ts-migrate(2552) FIXME: Cannot find name 'options'. Did you mean 'Option'?
          options.item.worn = false;
          // ts-error-fixed ts-migrate(2552) FIXME: Cannot find name 'options'. Did you mean 'Option'?
          options.char.animated = false;
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Give me the boots,' says Mandy.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg('{nv:char:look:true} at her in surprise, then sadness. Forlornly he sits on the floor, and slowly pulls off the boots, before handing them to Mandy. Mandy cannot look at his face without feeling guilty.', options);
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        item: Quest.World.w.boots,
      },
      {

        f(options: any) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg("'Give me {nm:item:the},' says Mandy.|{nv:char:look:true} at {nm:item:the} in his hand, then at Mandy. After a moment's deep thought, he hands her {ob:item}.", options);
          options.item.loc = Quest.World.player.name;
        },
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
        test(options: any) {
          return options.char === Quest.World.w.Patch;
        },
      },
      {
        f(options: any) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg('{multi}Done.', options);
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ test: ()... Remove this comment to see the full error message
          options.item.loc = this.name;
        },
        test() {
          return true;
        },
      },
    ],
    regex:         /^(me|myself|player|mandy|amanda|her)$/,
    silverSpotted: 0,
    talkto() {
      if (Quest.World.currentLocation.zone === 'external') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Can I really just go in that scary house?' Mandy asks herself.|'Of course I can!' she replies confidently.|'Yeah, well, it's not you doing it.'|'Well, obviously it is, because I'm you. You're talking to yourself, stupid!'|'Well, yes, I guess...'");
      } else if (Quest.World.currentLocation.zone === 'normality') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'So I did it, I escaped the scary house,' Mandy says herself.|'Of course you did!' she replies. 'I never had a doubt!'|'Well I did, and that means you did, because you are me.'|'Err...'|Mandy grins in triumph; at last she had won an argument with herself.");
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Will I ever escape this scary house?' Mandy asks herself.|'Of course you will!' she replies confidently. 'You just have to believe in yourself!'|'Don't give me that bullshit, you're as scared as I am.'|'Of course I'm scared - it's a scary house. But still sure we can get out of here.'|Mandy smiles uncertainly.");
      }
      return true;
    },
    throwAtPodTries: 0,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('school_bag', Quest.Templates.CONTAINER(), {
    drop:     'Mandy thinks she should hang on to her bag -- despite the faces of Harry, Niall, Liam,  Zayn and Louis plastered over it.',
    examine:  'Once more Mandy looks at her bag with disgust. She has had it since she was thirteen, when she had really been into One Direction. God, what has she been thinking? She has been asking her dad to get her a new one for like six months. It still has Zayn on it!',
    loc:      'player',
    synonyms: ['satchel'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('mobile_phone', SIZE_CHANGING(), {
    desc3:          "Mandy's phone is so small she could hardly see it.",
    desc4:          "Mandy's phone is now tiny.",
    desc5:          'Mandy looks at her phone. It is soooo old. It even has buttons!',
    desc6:          "Mandy's phone is now not only way out of date, but also too big to easily carry.",
    loc:            'school_bag',
    open:           'Mandy thinks about opening the phone and taking the battery out and then... Hmm, perhaps that is not such a good idea.',
    parserPriority: -20,
    switchon() {
      this.use();
    },
    synonyms: ['cell phone', 'buttons'],
    use() {
      if (this.size === 5) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("{once:Mandy looks at her phone. 'Shit.' No charge left. She only charged it last night... No, wait, she had found it on her bedroom floor this morning. 'Shit,' she says again.}{notOnce:Mandy looks at her phone, but it stubbornly refuses to have any change.}");
        return true;
      } if (this.size === 4) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks at her shrunken phone. Maybe it was a bit optimistic thinking it would now be charged, just because it is so much smaller.');
        return true;
      } if (this.size > 5) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Her stupid phone is now too big to use!');
        return false;
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Her stupid phone is now too small to use!');
      return false;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('pen', SIZE_CHANGING(), {
    desc4: "Mandy's pen is now tiny.",
    desc5: '{once:At the start of the week, Mandy had three black pens, two blue and one green. Now she only has this stupid green one. Where did they all go?}{notOnce:A stupid green pen.}',
    desc6: 'And now she has a {i:huge} stupid green pen.',
    loc:   'school_bag',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('shakespeare_book', {
    afterCarry() {
      if (this.zone !== Quest.World.currentLocation.zone) {
        this.zone = Quest.World.currentLocation.zone;
        this.setAlias(`copy of "${this.names[this.zone]}"`, { listAlias: this.names[this.zone] });
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
        if (Quest.World.w.uniform.wet > 0) Quest.World.w.uniform.wet--;
      }
    },
    alias: 'copy of "Antony and Cleopatra"',
    drop:  'Mandy definitely does not want to drop the book; Ms Coulter would be furious if she lost it!',
    examine() {
      if (this.state === 0 && this.listAlias === 'Antony and Cleopatra') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy glances at her copy of "Antony and Cleopatra". She really should get around to actually reading it some time, what with an exam on it in just a few weeks.');
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'lounge' does not exist on type '{}'.
      else if (Quest.World.currentLocation === Quest.World.w.lounge) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy looks at her book; hopefully it is \"Antony and Cleopatra\" again...|'Fuck.' The title on the front is \"All's Well That Ends Well\". 'Is that supposed to be funny?' she demands of the house. There is no reply, but as she looks at it, the book changes to \"Much Ado about Nothing\".|'Stupid house,' mutters Mandy.");
        this.setAlias('copy of "Much Ado about Nothing"', { listAlias: 'Much Ado about Nothing' });
      } else if (this.state === 0) {
        this.state = 1;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg('Mandy glances at her copy of "Antony and Cleopatra". Wait, this is not the same book! This is {nm:item:a}. What has happened to "Antony and Cleopatra"? Ms Coulter will be furious.', { item: this });
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg('Mandy looks at the book she now has. {nm:item:a:true}. She wonders if it would be any less boring than "Antony and Cleopatra". Probably not worth risking finding out.', { item: this });
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      if (Quest.World.w.clockwork_thespian.state > 1 && this.alias === 'copy of "Hamlet"') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Then she remembers the Clockwork Thespian. The soul of wit. Hamlet, act 2, scene 2. Quickly she thumbs through. Brevity! Brevity is the soul of wit.');
        this.state = 2;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
        Quest.World.w.clockwork_thespian.state = 101;
      }
    },
    listAlias:      'Antony and Cleopatra',
    loc:            'school_bag',
    names:          {},
    parserPriority: -5,

    read() {
      this.examine();
      return true;
    },

    saveLoadExcludedAtts: ['names'],

    state: 0,

    synonyms: ['shakespeare book'],

    take: 'Mandy definitely does not want to lose the book; Ms Coulter would be furious if she lost it! Best to leave it in the bag.',

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    testTake() {
      return falsemsg(this.take);
    },

    zone: 'external',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('folder', {
    loc:     'school_bag',
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('uniform', {
    alias: 'school uniform',
    examine() {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      let s = `Mandy is wearing ${this.uniforms[Quest.World.w[Quest.World.player.loc].zone]}.`;
      if (this.wet) s += ` It is ${this.wetWords[this.wet]}.`;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.Winfield_Malewicz.dead) s += " It is splatted with Winfield Malewicz's blood.";
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (Quest.World.w[Quest.World.player.loc].zone !== 'external' && !Quest.World.player.uniformnoted) {
        Quest.World.player.uniformnoted = true;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('That is definitely not the uniform of Kyderbrook High School that she was wearing when she entered the house!');
      }
    },
    getWorn() {
      return true;
    },
    loc: 'player',
    nameModifierFunction(list: any) {
      list.push('worn');
    },
    remove() {
      if (!this.removeFlag) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy gives you a hard stare. 'It is not that sort of game,' she says.|'Wait, are you breaking the fourth wall?' you ask her.|'Don't get pissy with me. I'm not the one asking a sixteen year old girl to undress. Now, I suggest we just move on, and pretend this never happened, okay?'"),
        this.removeFlag = true;
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy just shakes her head, looking very disappointed.');
      }
    },
    scenery:  true,
    uniforms: {
      battlefield: 'a red uniform, that looks disturbing like the military uniform of the dead soldiers',
      central:     'a deep red school uniform that does not look to bad',
      external:    'her grey and blue Kyderbrook High School uniform',
      flora:       'a green and purple school uniform that feels strangely comfortable, even if it looks appalling',
      gothic:      'a jet black uniform, that looks quite chic',
      medieval:    'a startling blue and red uniform that is especially uncomfortable',
      steampunk:   'a brown uniform, with gold-coloured trim',
      subterrenea: 'a dark green and yellow uniform that is just about on the cool side of nauseous',
      victorian:   'a rather dowdy grey school uniform that makes her look about fifty',
    },
    wet:      0,
    wetWords: ['dry', 'damp', 'damp', 'wet', 'soaking wet', 'dripping wet'],
  });

  //  ----------- GENERIC ITEMS ---------------------------

  const GENERIC = function () {
    return {
      examine() {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const room = Quest.World.w[Quest.World.player.loc];
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{ scenery... Remove this comment to see the full error message
        if (typeof room[`examine_${this.alias}`] === 'function') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{ scenery... Remove this comment to see the full error message
          room[`examine_${this.alias}`]();
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{ scenery... Remove this comment to see the full error message
        else if (typeof room[`examine_${this.alias}`] === 'string') {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(room[`examine_${this.alias}`]);
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(zones[room.zone][this.alias]);
        }
      },
      isLocatedAt(loc: any, situation: any) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const room = Quest.World.w[loc];
        if (!room.zone) return false;
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[`${loc}_${this.alias}`]) return false;
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (zones[room.zone][this.alias]) return true;
        return false;
      },
      parserPriority: -15,
      scenery:        true,
    };
  };

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('generic_wall', GENERIC(), {
    alias: 'walls',
    smash() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg("Mandy wonders about breaking the wall... They look well built, she thinks as she looks at one, then another and then the next, but what about that one? Got to be worth a try.|She looks right at you. 'So? What's going on? How do I get out of here?' She waits a moment for you to reply, then: 'Jesus, you're as clueless as I am.'");
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('generic_floor', GENERIC(), {
    alias:    'floor',
    synonyms: ['ground'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('generic_door', GENERIC(), {
    alias: 'door',
    close() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg('You do not need to open or close any any doors in the game. Just give a direction, like NORTH or IN, and Mandy will head that way, negotiating any doors on the way on her own.');
      return false;
    },
    open() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg('You do not need to open or close any any doors in the game. Just give a direction, like NORTH or IN, and Mandy will head that way, negotiating any doors on the way on her own.');
      return false;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('generic_ceiling', GENERIC(), {
    alias:    'ceiling',
    synonyms: ['roof', 'dome'],
    touch() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (Quest.World.currentLocation.name !== 'telescope_end') return falsemsg('Mandy tries to reach the ceiling, but it is too high.');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy reaches over and touches the curved roof of the observatory -- just because it was such a struggle to be able to do.');
      return true;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('generic_panelling', GENERIC(), {
    alias: 'panelling',
    examine() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'generic_panelling' does not exist on typ... Remove this comment to see the full error message
      if (!Quest.World.w.generic_panelling.examinedIn) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'generic_panelling' does not exist on typ... Remove this comment to see the full error message
        Quest.World.w.generic_panelling.examinedIn = Quest.World.currentLocation.name;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'wooden_panel' does not exist on type '{}... Remove this comment to see the full error message
        Quest.World.w.wooden_panel.loc = Quest.World.currentLocation.name;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy carefully examines the wood panelling, something that has been a long time fascination for her, ever since her parents first dragged her to a stately home. She can still remember the panelling in the drawing room of Pattersleigh House... But that was nine years ago. This is, to be honest, rather inferior. The wood is coarser, the contours rather poorly defined. And one panel is loose!');
      } else {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const room = Quest.World.w[Quest.World.w.hole_in_wall.loc];
        if (Quest.World.currentLocation !== room) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg('More panelling, just like in {nm:room:the}.', { room });
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'wooden_panel' does not exist on type '{}... Remove this comment to see the full error message
        else if (Quest.World.w.wooden_panel.scenery) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy carefully examines the wood panelling again, running her fingers over it. The wood may be course and the contours rather poorly defined, but it is still wonderful! And that one panel is still loose!');
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy carefully examines the wood panelling again, running her fingers over it. The wood may be course and the contours rather poorly defined, but it is still wonderful! She tries to ignore the hole where the panel is missing...');
        }
      }
    },
    isLocatedAt(loc: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!Quest.World.w[loc].zone) return false;
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return zones[Quest.World.w[loc].zone].panelling || Quest.World.w[loc].panelling;
    },
    synonyms: ['panels', 'paneling'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('wooden_panel', SIZE_CHANGING(), {
    afterMove() {
      if (!this.moveFlag) {
        this.moveFlag = true;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('There is now a hole in the wall, where the panel used to be.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'hole_in_wall' does not exist on type '{}... Remove this comment to see the full error message
        Quest.World.w.hole_in_wall.loc = Quest.World.player.loc;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'rods' does not exist on type '{}'.
        Quest.World.w.rods.loc = Quest.World.player.loc;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'brackets' does not exist on type '{}'.
        Quest.World.w.brackets.loc = Quest.World.player.loc;
      }
    },
    desc4:    'Mandy looks at the wall panel... {i:her} wall panel with pride. Admittedly, it is a rather small wall panel now, which is kind of disappointing.',
    desc5:    '{if:wooden_panel:scenery:Mandy looks at the loose panel thoughtfully. Would anyone notice if she just took it? Well, admittedly it would leave a large square patch of bare wall, so they probably would. But she had always wanted a wooden wall panel -- and not a stupid MDF one like her parents had tried to fob her off with.:Mandy looks at the wall panel... {i:her} wall panel with pride. It is a little over half a metre on each side, and almost certainly made of oak.}',
    desc6:    'Mandy looks at the wall panel... {i:her} wall panel with pride. And it is huge! How cool is that!',
    scenery:  true,
    synonyms: ['loose panel'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('hole_in_wall', {
    examine: 'There is a hole, a little over a metre square, in the wall, when a panel has been removed. The hole is not deep; only about the length of her hand, though it extends behind the panels to left and right. There are seven metal rods running across the back of it, and every now and again, one moves, jumping a few centimetres to the left or to the right.',
    scenery: true,
  });
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('rods', {
    examine: 'The rods that run behind the panels are circular in cross-section and look to be made of steel. There are supports on metal brackets.',
    scenery: true,
    synonym: ['mechanism'],
    take:    'She gives one of the rods a good tug, but it is not moving.{once:.. And then suddenly it does, jerking to the left, making her squeal in surprise. Maybe she should just leave it; it could be vital to... something?}',
  });
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('brackets', {
    examine: 'The brackets are aligned horizontally, and are almost as high as the panels. Each has ten protrusions for carrying a rod, though only the lower seven are used.',
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'hereDesc' does not exist on type '{}'.
  Quest.Text.text_processors.hereDesc = function (arr: any, params: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const room = Quest.World.w[Quest.World.player.loc];
    let s;
    if (typeof room.desc === 'string') {
      s = room.desc;
    } else if (typeof room.desc === 'function') {
      s = room.desc();
      if (s === undefined) {
        errormsg(`This room description is not set up properly. It has a 'desc' function that does not return a string. The room is "${room.name}".`, true);
        return '[Bad description]';
      }
    } else {
      return 'This is a room in dire need of a description.';
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'hole_in_wall' does not exist on type '{}... Remove this comment to see the full error message
    if (Quest.World.w.hole_in_wall.loc === Quest.World.currentLocation.name) {
      s += ' There is a panel missing in one wall; some kind of mechanism is visible.';
    }
    delete params.tpFirstTime;
    return Quest.Text.processText(s, params);
  };

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('generic_window', {
    alias: 'window',

    close() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (this.bricked_up) return falsemsg('It is already closed. And bricked up.');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg('It is already closed.');
    },

    // this will be the name of room where window is smashed
    examine() {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const { windowsface } = Quest.World.w[Quest.World.player.loc];
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'generic_window' does not exist on type '... Remove this comment to see the full error message
      if (Quest.World.w.generic_window.roomsmashed) {
        if (Quest.World.player.loc === this.roomsmashed || this.noted) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg('Mandy looks at the bricked-up window. No way is she getting out that way.');
        } else {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          msg('Mandy looks at the bricked-up window. No way is she getting out that way. Wait. The window she smashed is in {nm:room:the}. Why is this window bricked-up too?', { room: Quest.World.w[this.roomsmashed] });
          this.noted = true;
        }
      } else if (windowsface === 'north') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy looks out the window at the countryside; fields, trees, and there is her home, a barn conversion her parents purchased three years ago. But how could that be? No way is her home visible from this house; Highfield Lane twists around far too much for that.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`Mandy looks out the window at the countryside; fields, trees, and there is her home, a barn conversion her parents purchased three years ago. But how could that be? This window faces ${windowsface} and her home is to the north.`);
      }
    },

    isLocatedAt(loc: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return Quest.World.w[loc].windowsface !== undefined && Quest.World.w[loc].windowsface !== 'none';
    },

    open() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (this.bricked_up) return falsemsg('Mandy looks at the bricked up window. Doubtful that will open now.');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg('Mandy tries to open the window, but it is stuck hard. She is not going to be able to open that.');
    },
    repair() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!this.roomsmashed) return falsemsg('The windows are not broken.');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg('The windows are bricked up -- a bit late to worry about repairing them.');
    },
    roomsmashed: false,
    scenery:     true,
    smash() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (this.bricked_up) return falsemsg('Mandy considered breaking a window again... Of course, smashing a bricked-up window is not something she is likely to be able to do.');

      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("{i:Fuck this,} thinks Mandy. {i:I'm getting out of here.} A little gingerly despite her resolve, Mandy knocks on the glass. Nothing happens, so she hits it hard. Smash! It shatters into thousands of pieces.");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Beyond is only blackness. For one vertiginous moment she stares into the void...');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Then suddenly a figure appears on the other side of the window. Human in shape -- more or less -- but silver-grey, as though made of stone or maybe metal, it works with blinding speed, placing brick after brick to seal up the window.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'glass_shards' does not exist on type '{}... Remove this comment to see the full error message
      Quest.World.w.glass_shards.loc = Quest.World.player.loc;
      this.bricked_up                = true;
      this.roomsmashed               = Quest.World.player.loc;
    },
    synonyms: ['windows'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('glass_shards', {
    alias: 'shards of glass under the bricked-up window',
    examine() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('The shards are the remains of the window. Jagged pieces of glass, some as long as her arm, some almost too small to see. They seem to be reflecting the countryside outside the house somehow...');
    },
    parserPriority: -10,
    pronouns:       Quest.lang.pronouns.plural,
    take(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'glass_shard' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.glass_shard.loc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy has already taken one glass shard; she decides she does not want to risk cut fingers by taking any more.');
        return false;
      }
      if (!options.char.testManipulate(this, 'take')) return false;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy carefully picks up one of the shards of glass.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'glass_shard' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.glass_shard.moveToFrom(options, 'name', 'loc');
      return true;
    },
  });

  // want to limit to one
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('glass_shard', SIZE_CHANGING(), {
    alias: 'glass shard',
    desc4: 'The glass shard is so small she can hardly see it.',
    desc5: 'Mandy carefully looks at the shard of glass. Through it she can still see the countryside near her home. She turns it over, and there it is again, but from this side the view is reversed, as though seen through a mirror.',
    desc6: 'Mandy carefully looks at the large shard of glass. Through it she can still see the countryside near her home. She turns it over, and there it is again, but from this side the view is reversed, as though seen through a mirror.',
    desc7: 'Mandy carefully looks at the shard of glass, which is now bigger than the window it came from. Through it she can still see the countryside near her home. She turns it over, and there it is again, but from this side the view is reversed, as though seen through a mirror.',
    sharp: true,
    turn() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'glass_shard' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.glass_shard.loc !== 'controls') return falsemsg('Mandy turns the shard of glass, hoping it looks more pretty in a better light. It does not.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
      Quest.World.w.telescope.shardReversed = !Quest.World.w.telescope.shardReversed;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy turns the shard on the control panel so the back is now facing her.');
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
  Quest.World.createItem('paper_funnel', SIZE_CHANGING(), Quest.Templates.CONSTRUCTION(['secret_recipe']), {
    afterConstruction(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
      this.size = Quest.World.w.secret_recipe.size;
    },
    desc4: 'It is a tiny funnel, cunningly fashioned from a piece of tissue paper.',
    desc5: 'It is a funnel, cunningly fashioned from a piece of card.',
    desc6: 'It is a large funnel, cunningly fashioned from a piece of thick card.',
    testConstruction(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
      if (Quest.World.w.secret_recipe.size > 6) return falsemsg('The card is too stiff to do origami with.');
      return true;
    },
  });
};
