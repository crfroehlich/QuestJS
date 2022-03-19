import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('player', Quest.Templates.PLAYER(), {
    crewSummary: '',
    loc: 'bridge',
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    missionStart_assemble_crew: Quest.World.w.ship.dateTime,

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    missionStart_sector_7_iota: Quest.World.w.ship.dateTime,

    mission_assemble_crew: 1,

    mission_sector_7_iota: 1,
  });

  // Your boss
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('nagoshima', Quest.NPC.NPC(true), {
    alias: 'Commander Nagoshima',

    convTopics: [
      {
        alias: 'Mission?',
        msg: "'I imagine you have some specific missions you need us for,' you say to the commander.|'Indeed! Quite a few in fact; as I say, we have been sorely lacking in available ships. You should already have them on your PAGE.'",
        name: 'nagoshima_missions',
        nowShow: ['nagoshima_brakk', 'nagoshima_backwater', 'nagoshima_other_militrary'],
        showTopic: true,
      },
      {
        alias: 'Why are you assigned to such a backwater?',
        msg: "'This is quite the backwater. What did you do to get this posting?' you ask the commander.|'Hah! Yes, I've had a run in or two with the top brass. But I'd have to know you better before I say anything about that. Still it's not so bad here. Sometimes I can almost convince myself it more of a comfy retirement.'",
        name: 'nagoshima_backwater',
        nowHide: ['nagoshima_cushy'],
      },
      {
        alias: 'Seems a cushy assignment for you',
        msg: "'This is nice quiet sector. How did you get such a cushy assignment?' you ask the commander.|'I wish. The Union has virtually no miliary presence here at all, and half the planets are not even in the union. It has its quiet days, but when things get rough, they get very rough, and there is precious little I can do.'",
        name: 'nagoshima_cushy',
        nowHide: ['nagoshima_backwater'],
      },
      {
        alias: 'Other fleet forces in the sector?',
        msg: "'What other fleet forces are in the sector?' you ask the commander.|'We have a few shuttles and courier ships, but that is about it. The only weaponry worth a damn in on this starbase. We have agents on a few planets, but even they are spread too thin.'",
        name: 'nagoshima_other_militrary',
      },
      {
        alias: 'Mission?',
        msg: "'Any problems with the Brakk?' you ask the commander.|'Just some odd rumours; nothing confirmed. We're not far from the border, but I guess there's not much to interest them here.'",
        name: 'nagoshima_brakk',
      },
    ],

    examine: 'Despite her striking black hair, which she wears in a neat bun, you would judge Commander Nagoshima to be in her fifties. You find yourself warming to her smile.',
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    isAtLoc(loc: any, situation: any) {
      return situation === Quest.World.world.PARSER && Quest.World.w.ship.onView === this.name;
    },
    properNoun: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('yeoman', Quest.NPC.NPC(true), {
    alias: 'Yeoman Rand',
    convTopics: [
      {
        alias: 'Are you settling in okay?',
        name: 'yeoman_settling_in',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Are you settling in okay?' you ask Yeoman Rand.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Yes, {sir}. It's much bigger than the ships I'm used to, but I'm finding my way around.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Well, I'm not used to commanding anything this big. We'll both have to get used to it.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Yes {sir}.'");
        },
        showTopic: true,
      },
      {
        alias: 'Which space academy did you go to?',
        name: 'yeoman_academy',
        nowShow: ['yeoman_dewar_pun'],
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'What academy did you graduate from?' you ask Yeoman Rand.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Nairobi, Earth, {sir}.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Must've been hot.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'They do have air con there... But outside, yes, it could be very hot.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'I'm a Mars alumni myself. I wanted to get out into space as soon as possible, and that seemed like the first step.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Oh, I was born on Dewar III. I suppose I did it in reverse. I wanted to go to the centre of it all - Earth.'");
        },
        showTopic: true,
      },
      {
        alias: 'Is it always the same temperature of Dewar III?',
        name: 'yeoman_dewar_pun',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'So is it always the same temperature of Dewar III?' you ask with a smile, recalling that James Dewar invented the vacuum flask.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("She signs. 'Hilarius, sir. In fact the region where I was raised was notable for its extremes of temperature.'");
        },
      },
      {
        // showTopic:true,
        alias: "Call me ma'am",

        name: 'yeoman_call_me_maam',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'I prefer ma'am to sir,' you tell the yeoman.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'As you wish, ma'am.'");
          Quest.World.player.callmemaam = true;
        },
      },
    ],
    examine: 'Yeoman Rand arrived at Starbase One on the same shuttle as you, and you conversed with her a little on the journey; this is her first assignment to a star ship. She is above average height for a woman, with cropped blonde hair, and is dressed smartly in the fleet uniform.',
    loc: 'bridge',
    properNoun: true,
  });

  const CANDIDATE = function (female: any) {
    const res = Quest.NPC.NPC(female);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'candidate' does not exist on type '{ can... Remove this comment to see the full error message
    res.candidate = true;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'properNoun' does not exist on type '{ ca... Remove this comment to see the full error message
    res.properNoun = true;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'dutiesDiag' does not exist on type '{ ca... Remove this comment to see the full error message
    res.dutiesDiag = function () {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
      Quest.Settings.settings.startingDialogHtml = `<p>Name: <i>${this.alias}</i></p>`;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
      Quest.Settings.settings.startingDialogHtml += `<p>Species: <i>${this.species}</i></p>`;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
      Quest.Settings.settings.startingDialogHtml += `<p>Comments: <i>${this.cv}</i></p>`;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
      Quest.Settings.settings.startingDialogHtml += `<input type="hidden" name="name" id="diag-name" value="${this.name}"/>`;
      for (const role of roster.data) {
        const npc = roster.getOfficer(role.name);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        if (!Quest.World.w.ship.arrivedAtSector) {
          if (npc === this) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
            Quest.Settings.settings.startingDialogHtml += `<p><input type="checkbox" name="${role.name}" id="diag-${role.name}" checked="yes"/> ${role.alias}</p>`;
          } else if (npc) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
            Quest.Settings.settings.startingDialogHtml += `<p><input type="checkbox" checked="yes" disabled="yes"/> ${role.alias}: <i>${npc.alias}</i></p>`;
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
            Quest.Settings.settings.startingDialogHtml += `<p><input type="checkbox" name="${role.name}" id="diag-${role.name}"/> ${role.alias}</p>`;
          }
        } else if (npc === this) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHtml' does not exist on ty... Remove this comment to see the full error message
          Quest.Settings.settings.startingDialogHtml += `<p>Assigned as: ${role.alias}</p>`;
        }
      }

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'dialogType' does not exist on type '{ pe... Remove this comment to see the full error message
      Quest.Settings.settings.dialogType = 'crew roster';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'setUpDialog' does not exist on type '{ p... Remove this comment to see the full error message
      Quest.Settings.settings.setUpDialog();
    };
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'entering' does not exist on type '{ canR... Remove this comment to see the full error message
    if (!res.entering) res.entering = '{nm:char} enters the bridge.';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'leaving' does not exist on type '{ canRe... Remove this comment to see the full error message
    if (!res.leaving) res.leaving = '{nm:char} leaves the bridge.';
    return res;
  };

  const getCrew = function () { };

  const getCandidates = function () {
    return Quest.Utilities.scopeBy((o: any) => o.candidate).sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return (nameA < nameB ? -1 : 1);
    });
  };

  const belongsToHelm = function (loc: any) {
    log(loc);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    return Quest.World.w.ship.helm && loc === Quest.World.w.ship.helm;
  };

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('sharraaa', CANDIDATE(false), {
    alias: 'Sharraaa',
    alreadyHere: 'Sharraaa slumps a little in his bucket. For a moment, you wonder what is wrong, then realise you are already here.',
    altName: 'the Salis',
    ayeaye: 'He raises a pseudopod to indicate assent.',
    cv: 'For an amorphous blob, Sharraaa shows a remarkable aptitude in a number of areas, though the absence of a mouth can present communications problems in some roles.',
    dissent: 'Sharraaa raises two  pseudopods, indicating his disapproval.',
    engineering: '6',
    examine: 'Sharraaa is a pink, and somewhat translucent, blob. He is sat in bucket from which he raises a pseudopod as the need arises.',
    firstFlight: "{role:helm:altName:true} punches in the coordinates.|'Engage!'|The SS Star Quest gently eases out of star-dock, into open space, then, with a stomach-churning lurch, accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination at speeds hard to properly understand unless you are a navigator.",
    formalName: 'Shu Sharraaa',
    going: 'Sharraaa morphs over the controls, rapidly setting the destination, and a moment later the ship starts to move. There is that stomach-clenching lurch as it hits warp speed...',
    incredulous: 'Sharraaa slumps in surprise.',
    navigation: '6',
    scared: 'Sharraaa goes perfectly still.',
    science: '7',
    species: 'Salis',
    summary: 'Jack-of-all-trades amorphous blob.',
    thoughtful: 'Sharraaa quivers in thought.',
    weapons: '5',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('farrington_moss', CANDIDATE(false), {
    alias: 'Farrington Moss',
    alreadyHere: "'{Sir}, we're already here.'",
    altName: 'he',
    ayeaye: "'{Sir}! Yes, {sir}!'",
    cv: 'Farrington Moss has been in the space navy for 17 years, after joining as an enlisted officer from the academy on Mars with a rating of 86. His last position was Helmsman on the Andromeda, though he is keen to be considered as Armsman Officer. For the love of God, do not ask him about ???.',
    dissent: "'Is that wise, {sir}?'",
    engineering: '4',
    examine: 'Farrington is a well-muscled man, with cropped hair that almost looks painted on. His uniform is crisply smart and he seems to be constantly standing at attention, even when in his seat.',
    firstFlight: "He deftly punches in the coordinates. 'Ready to go, Sir.'|'Engage!'|The SS Star Quest gently eases out of star-dock, into open space, then smoothly accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination at speeds hard to properly understand unless you are a navigator.",
    formalName: 'Mister Moss',
    going: 'Farrington punches in the co-ordinates, and engages the engages, smoothly accelerating to warp speed.',
    incredulous: "'What the deuce?' exclaimed Farrington.",
    navigation: '8',
    scared: "'Holy crap,' exclaimed Farrington.",
    science: '1',
    species: 'human',
    summary: 'Excellent helmsman; wants to move into weapon.',
    thoughtful: 'Farrington looks thoughtful for a moment.',
    weapons: '5',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('lashirr_hrong', CANDIDATE(true), {
    alias: 'Lashirr Hrong',
    alreadyHere: "Lashirr starts to type in the co-ordinates, then pauses, humming thoughtfully. 'Captain, I believe we're already here.'",
    altName: 'the Girr-Girr',
    ayeaye: "'Of course, captain.'",
    cv: 'Lashirr is a Girr-Girr, but nevertheless has an excellent background in science. Her piloting skills are limited.',
    engineering: '5',
    examine: 'Like most  Girr-Girr, Lashirr is tall and gangling. The sensory nodules covering her yellowy-green skin do serve to fill out her uniform, but in a manner that looks rather odd to the human eye.',
    firstFlight: "{role:helm:altName:true} slowly punches in the coordinates. 'Ready to...No wait.' Some more typing. 'I better just check that... Yes, I think that's right.'|'Engage!'|The SS Star Quest eases out of star-dock with a couple of bumps, into open space, then, then, with a stomach-turning lurch, accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination and speeds hard to properly understand unless you are a navigator. And in {role:helm:alias}'s case, not even then.",
    formalName: 'Ms Hrong',
    going: "After some thoughtful humming, Lashirr starts to tentatively punch in the co-ordinates. '{random:I think that's right:Hopefully should be it:I... yes, that {i:should} be right:Yes... No... wait, I can do this. That... might be right},' she says. There is an abrupt lurch, and the ship is moving. Suddenly it hits light speed, and you can taste your lunch again.\"",
    incredulous: "'That's odd,' Lashirr notes.",
    navigation: '1',
    scared: "'That's a concern,' Lashirr observes.",
    science: '8',
    species: 'Girr-Girr',
    summary: 'A Girr-Girr, who nevertheless is an excellent science officer.',
    thoughtful: 'Lashirr hums tunelessly as she considers.',
    weapons: '2',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('dakota_north', CANDIDATE(true), {
    alias: 'Dakota North',
    alreadyHere: "'With respect, {sir}, I think we are already here.'",
    altName: 'she',
    ayeaye: "'Yes {sir}!'",
    cv: 'Dakota North is very much a professional soldier, joining as a marine and working her way up the ranks. Her weapon skills are second to none.',
    dissent: "'With respect, is that wise, {sir}?'",
    engineering: '4',
    examine: 'Dakota is a tall, slim woman, with blonde hair in a neat ponytail. She has a stern look and eyes of steel.',
    firstFlight: "{role:helm:altName:true} slowly punches in the coordinates. 'Ready to go, Sir.'|'Engage!'|The SS Star Quest gently eases out of star-dock, into open space, then, then, with a stomach-turning lurch, accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination and speeds hard to properly understand unless you are a navigator.",
    formalName: 'Ms North',
    going: 'Dakota punches in the co-ordinates, and engages the engages, smoothly accelerating to warp speed.',
    incredulous: 'Dakota frowns for a moment.',
    navigation: '5',
    scared: 'Dakota frowns for a moment.',
    science: '3',
    species: 'human',
    summary: 'Excellent track record as an armsman.',
    thoughtful: 'Dakota frowns for a moment.',
    weapons: '9',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('river_severn', CANDIDATE(true), {
    alias: 'River Severn',
    alreadyHere: "'We're already here,' says River with a smirk.",
    altName: 'River',
    ayeaye: "'No problem.'",
    convTopics: [
      {
        alias: 'Incident at MIT',
        name: 'river_incident_mit',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Your record mentions an \"incident\" while you were at MIT.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Too dreadful to mention!' she says, with a straight face. Then she smiles. 'No, it was just some wild parties that got seriously out of control. Good times... But the university starting saying the damage had to be paid for, so I had to get a proper job. Bummer. I mean, no offense, but when do you guys smile?'");
        },
        showTopic: true,
      },
    ],
    cv: 'River Severn gained a Ph.D. in biology from MIT and was on track to be one of their youngest professors, until an undisclosed incident caused her to rethink her career. She joined the fleet, and her knowledge of biology, and indeed all science, has been of great value, though she does have issues with insubordination.',
    dissent: "'No way!'",
    engineering: '6',
    examine: 'River is a petite woman, whose long, flowing, blue hair indicates a casual regard for the regulations, to say nothing of the unfastened button on her collar and the bangles and earrings.',
    firstFlight: "{role:helm:altName:true} slowly punches in the coordinates. 'Ready to go, Sir.'|'Engage!'|The SS Star Quest gently eases out of star-dock, into open space, then, then, with a stomach-turning lurch, accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination and speeds hard to properly understand unless you are a navigator.",
    formalName: 'Ms Severn',
    going: "'Let's see...' River types in the coordinates. 'Hold on tight, boys and girls,' she says as she engages the engines. The Star Quest starts to accelerate, hitting warp speed with an unpleasant lurch.",
    incredulous: "'Like,wow...' exclaims River.",
    navigation: '5',
    scared: "'Oh, shit,' exclaims River.",
    science: '10',
    species: 'human',
    summary: 'While great at science, she has issues with authority.',
    thoughtful: 'River goes into a trance for a moment, deep in meditation.',
    weapons: '1',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('milton_keynes', CANDIDATE(false), {
    alias: 'Milton Keynes',
    alreadyHere: "'That's where we're already at, {sir}.'",
    altName: 'he',
    ayeaye: "'Aye aye, {sir}.'",
    convTopics: [
      {
        alias: 'Religion',
        name: 'milton_religion',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'I hear you're a religious man, Milton.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Indeed, {sir}. Janus, the bifold godhead, the One True Religion.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Er, remind me...'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'The twin gods, Yinus and Yango, that rules our lives. Yinus the goddess who controls all that is moving, the flowing river of time, the entropy of the universe. Yango the god, controlling all that is static, the foundations of the Quest.World.world, the energy of the universe. I'll give you one of my pamphlets; it explains how the whole of creation is set out in the Book of the All, written by the prophet.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Yeah, I'll read it... later. I guess.'");
        },
        showTopic: true,
      },
    ],
    cv: 'Milton Keynes is an excellent engineer, though his religious convictions can occasionally be an issue',
    dissent: "'That's not a good idea, {sir}.'",
    engineering: '9',
    examine: 'A thick-set man, shorted than average, with hands like shovels, Milton looks like he could pummel the engines into submission if necessary.',
    firstFlight: "{role:helm:altName:true} slowly punches in the coordinates. 'Ready to go, Sir.'|'Engage!'|The SS Star Quest gently eases out of star-dock, into open space, then, then, with a stomach-turning lurch, accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination and speeds hard to properly understand unless you are a navigator.",
    formalName: 'Mr Keynes',
    going: 'Milton types in the co-ordinates. He says a prayer under his breathe, then engages the engines. You feel your stomach heave as the ship goes to warp speed.{first: It seems his gods are not powerful enough to ensure a smooth journey...}',
    incredulous: "'By the gods!' says Milton.",
    navigation: '3',
    scared: "'God's preserve us,' says Milton.",
    science: '4',
    species: 'human',
    summary: 'One of the best engineers in the fleet.',
    thoughtful: "A look of concentration appears on Milton's face.",
    weapons: '4',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('norton_canes', CANDIDATE(false), {
    alias: 'Norton Canes',
    alreadyHere: "'We're 'ere already, guv.'",
    altName: 'he',
    ayeaye: "'Alright, guv.'",
    convTopics: [
      {
        alias: 'Storm of Fury',
        name: 'norton_storm_of_fury',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'So you served on the Storm of Fury?' you ask Norton.");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'That's right, guv, under Captain Mallet. Good ship that Storm of Fury, bigger than this one, that's for sure.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'And you resigned?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Yeah... All a bit awkward really. There was these... mistakes in the inventory. Seemed best all around if I just walked away from it.'");
        },
        showTopic: true,
      },
      {
        alias: 'Demonic Trout',
        name: 'norton_demonic_trout',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'You were on the Demonic Trout?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Yeah, gov. Right tug it was. Maximum warp two point three if you was lucky.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'And you resigned from it?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Couldn't get off it quick enough. First sign of trouble, I was out of there.'");
        },
        showTopic: true,
      },
      {
        alias: 'Marking irregularies',
        name: 'marking_irregularies',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'I heard there were marking irregularities when you graduated.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Stone me, that story gets round fast, gov. I don't know much about it really, but there was a right brouhaha. Well, I suppose it's only to be expected. You work 'ard for years, then some joker goes and... I was right dischuffed. We all was.'");
        },
        showTopic: true,
      },
    ],
    cv: "Controversy seems to have dogged Norton Canes throughout his career, though it must be emphasized that nothing was ever proven in any of the cases. His graduation from Nairobi academy was questioned after irregularities in the marking came to light, and he resigned his post on the Storm of Fury and later the Demonic Trout when the ships' accounts were audited. Despite all this there is no doubt that he is a capable office in any role, especially that of armsman.",
    dissent: "'Not sure about that, guv.'",
    engineering: '4',
    examine: 'Norton is a slender man, with a thin mustache, and raven black hair in a ponytail. Though his uniform is buttoned and polished, it still looks messy on him, and there is a distinctly seedy look about him.',
    firstFlight: "{role:helm:altName:true} punches in the coordinates. 'Ready to go, Sir.'|'Engage!'|The SS Star Quest gently eases out of star-dock, into open space, then, then, with a stomach-turning lurch, accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination and speeds hard to properly understand unless you are a navigator.",
    formalName: 'Mr Canes',
    going: "'Right you are, gov.' Norton punches in the coordinates, ",
    incredulous: "'Stone the crows.'",
    navigation: '6',
    scared: "'Fuck!'",
    science: '3',
    species: 'human',
    summary: 'Good at helm and weapons, but some irregularities in his record.',
    thoughtful: 'Norton looks pensive.',
    weapons: '7',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('info', CANDIDATE(false), {
    alias: 'Info',
    alreadyHere: "Beep. Beep. Beep. 'Current location.' Beep. Beep. Beep.",
    altName: 'the robot',
    ayeaye: "'Affirmative.'",
    cv: 'Info is an experimental prototype, the mark 4 version in his line. As yet, the Admiralty cannot fully endorse Info as an officer, but firmware upgrades are frequent, and with each one Info becomes better equipped to deal with any situation.',
    dissent: "'Negative.'",
    engineering: '3',
    examine: 'Info is a sophisticated robot; a cylinder on crawler trackers, standing a little over average height for a man, from which six arms can extend, each suited to a different task. He has a flashing orange light on the top; a health and safety requirement.',
    firstFlight: "{role:helm:altName:true} slowly punches in the coordinates. 'Ready to...No wait.' Some more typing. 'I better just check that... Yes, I think that's right.'|'Engage!'|The SS Star Quest eases out of star-dock with a couple of bumps, into open space, then, then, with a stomach-turning lurch, accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination and speeds hard to properly understand unless you are a navigator. And in {role:helm:alias}'s case, not even then.",
    formalName: 'Info',
    going: 'Beep. Beep. Beep. The robot extends a metal arm, and methodically punches in the required coordinated. Beep. With a jerk, the Star Quest starts to move, then a jolt to the {random:left:right}, and a lurch. The jump to warp speed leaves you clutching your stomach.',
    incredulous: 'Beep-beep.',
    navigation: '1',
    scared: 'Beep.',
    science: '1',
    species: 'robot',
    summary: 'Experimental android.',
    thoughtful: 'Beep. Beep. Beep. Beep. Beep.',
    weapons: '4',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('restrel_juazz', CANDIDATE(true), {
    alias: 'Restrel Juazz',
    alreadyHere: "'We're already here,' says Restral pointedly.",
    altName: 'the Chal',
    ayeaye: "'Yes {sir}.'",
    convTopics: [
      {
        alias: 'Peace treaty',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'What's your take on the peace treaty, Restrel?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'I just hope it lasts, {sir}. I know many Chal are concerned; how can we have peace with such blood-thirsty people? Many are worried it is a ploy to learn our secrets, steal our technology.'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'What about you?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'I... know it's a possibility, but I think we have to at least make the effort to make this work.'");
        },
        showTopic: true,
      },
      {
        alias: 'Earth technology',
        script() {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'How are you coping with earth technology, Restrel?'");
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg("'Okay, I think. To be honest, the hardest part was the language. The science is more a question of perspective and the engineering is - well, just fascinating.'");
        },
        showTopic: true,
      },
    ],
    cv: 'As part of the on-going peace process, officers from the fleet have exchanged places with Chal officers so we can better understand each other. Restrel Juazz has recently become available; this would be her first assignment on an Admiralty ship. Kr Juazz comes highly commended in all areas, but it is worth bearing in mind that she will be unfamiliar with our vessels.',
    dissent: "'I can't do that, {sir}.'",
    engineering: '3',
    examine: 'The Chal are perhaps the most human-like of all the alien races mankind has discovered, and Restrel is very obviously a female. Her skin is smooth, green with a hint of blue, her hair a deep blue. She is a little shorter than you, but not by much.',
    firstFlight: "{role:helm:altName:true} slowly punches in the coordinates. 'Ready to go, Sir.'|'Engage!'|The SS Star Quest gently eases out of star-dock, into open space, then, then, with a stomach-turning lurch, accelerates to warp speed. The stars on the viewscreen become thin red lines as the ship heads to its destination and speeds hard to properly understand unless you are a navigator.",
    formalName: 'Kr Juazz',
    going: "Restrel types in the coordinates. '{random:Your input systems leave a lot to be desired:Most inefficient:How can anyone use such an awkward system}.' She engages the engines, and the Star Quest accelerates to warp speed with a stomach-churning lurch. {random:You need more efficient momentum dampers:Do you not have phase-shift suppressors:The engines require shimming:Clearly an imbalance in the injector system; they should be serviced}.'",
    navigation: '4',
    scared: 'She narrows eyes.',
    science: '9',
    species: 'Chal',
    summary: 'Excellent science officer; on exchange with Chal fleet.',
    thoughtful: 'She tilts her head as she thinks.',
    weapons: '5',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('helmsman_go_to_7iota', Quest.NPC.TOPIC(true), {
    alias: 'Lay in a course for 7 Iota',
    belongsTo: belongsToHelm,
    nowShow: ['helmsman_go_to_star', 'helmsman_go_to_location'],
    script() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Lay in a course for sector 7 Iota,' you say to {role:helm:formalName}, 'warp factor 4.'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`{role:helm:ayeaye} ${roster.getOfficer('helm').firstFlight}`);
      Quest.IO.hr();
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("Nine days later you arrive at Star Base 142. Yeoman Rand walks on to the bridge. 'Sir, we have a communication from the Star Base.'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Main screen, yeoman.'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Yes Sir.'");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("A woman's face appears on the screen, Commander Nagoshima you assume, noting the rank of her uniform. 'Welcome to the ass-end of the galaxy, Captain' she says with a smile. 'It's good to have a ship around that can actually do something. I've sent over the mission briefs; they should be on your PAGE.'");
      stars.arriveAtSector();
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('helmsman_go_to_star', Quest.NPC.TOPIC(false), {
    alias: 'Lay in a course for star...',
    belongsTo: belongsToHelm,
    hideAfter: false,
    script() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      Quest.IO.showMenuDiag('Which star system?', stars.getStarNames(), (result: any) => {
        log(result);
        if (result === Quest.lang.never_mind) return;
        const system = stars.getSystem(result);
        log(system);
      });
      return Quest.World.world.SUCCESS;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('helmsman_go_to_location', Quest.NPC.TOPIC(false), {
    alias: 'Lay in a course for location in this system...',
    belongsTo: belongsToHelm,
    hideAfter: false,
    script() {
      const l = [];
      // for (const star og
    },
  });
}
