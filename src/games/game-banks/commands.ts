/*
Quest.Commands.commands.push(new Quest.Command.Cmd('Kick', {
  npcCmd:true,
  rules:[Quest.Command.cmdRules.isPresent],
  regex:/^(kick) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:Quest.Parser.parser.isPresent}
  ],
  default:function(item, char, options) {
    Quest.IO.msg("{pv:char:kick:true} {ob:item:the}, but nothing happens.", options);
    return false;
  },
}));

Quest.Commands.commands.push(new Quest.Command.Cmd('Move', {
  npcCmd:true,
  rules:[Quest.Command.cmdRules.isPresent],
  regex:/^(move) (.+)$/,
  objects:[
    {special:'ignore'},
    {scope:Quest.Parser.parser.isHere}
  ],
  default:function(item, char, options) {
    Quest.IO.msg("{pv:char:be:true} not something you can move.", options);
    return false;
  },
}));
*/

// kyle, in stasis

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Get in pod1', {
  attName: 'stasis',
  defmsg:  "That's not about to get in a stasis!",
  npcCmd:  true,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
  ],
  regex: /^(.+), ?(?:get in|go in|in) (?:stasis pod|stasis|pod)$/,
}));
// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Get in pod2', {
  attName: 'stasis',
  defmsg:  "That's not about to get in a stasis!",
  npcCmd:  true,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
  ],
  regex: /^(?:tell|ask|instruct) (.+) to (?:get in|go in|in) (?:stasis pod|stasis|pod)$/,
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Stop1', {
  attName: 'stopAgenda',
  defmsg:  "That's not doing anything!",
  npcCmd:  true,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
  ],
  regex: /^(.+), (?:stop|halt|forget it)$/,
}));
// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Stop2', {
  attName: 'stopAgenda',
  defmsg:  "That's not doing anything",
  npcCmd:  true,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
  ],
  regex: /^(?:tell|ask|instruct) (.+) to (?:stop|halt|forget it)$/,
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Launch', {
  defmsg:  "You can't launch that!",
  npcCmd:  true,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isInWorld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isInWorld },
  ],
  regex: /^(?:launch|deploy) (.+)$/,
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Revive', {
  defmsg:  "You can't revive that!",
  npcCmd:  true,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isInWorld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isInWorld },
  ],
  regex: /^(?:revive|wake|awaken) (.+)$/,
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Spray', {

  defmsg: "You can't spray that!",

  // npcCmd:true, // ???
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],

  regex: /^(?:spray) (.+)$/,
  rules: [
    function (cmd: any, char: any, item: any, multiple: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'spray_sealant' does not exist on type '{... Remove this comment to see the full error message
      if (Quest.World.w.spray_sealant.loc !== char.name) {
        return Quest.IO.falsemsg('{nv:char:do:true} not have the sealant spray.', { char });
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'spray' does not exist on type '{}'.
      if (Quest.World.w.spray.uses <= 0) {
        return Quest.IO.falsemsg('{nv:char:aim:true} the spray can at {nm:item}, but it is empty.', { char, item });
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'spray' does not exist on type '{}'.
      Quest.World.w.spray.uses--;
      return true;
    },
  ],
}));

Quest.Commands.commands.push(new Quest.Command.Cmd('Pressurise', {
  attName: 'pressure',
  defmsg:  'Not something you can pressurise.',
  objects: [
    { extendedScope: true, scope: isRoomScope },
  ],
  regex: /^(?:pressuri[sz]e|pres) (.+)$/,
  script(objects: any) {
    return handlePressurise(Quest.World.player, objects, true);
  },
}));

Quest.Commands.commands.push(new Quest.Command.Cmd('Depressurise', {
  attName: 'pressure',
  defmsg:  'Not something you can evacuate.',
  objects: [
    { extendedScope: true, scope: isRoomScope },
  ],
  regex: /^(?:depressuri[sz]e|evacuate|depres) (.+)$/,
  script(objects: any) {
    return handlePressurise(Quest.World.player, objects, false);
  },
}));

Quest.Commands.commands.push(new Quest.Command.Cmd('NpcPressurise1', {
  attName: 'pressure',
  objects: [
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
    { extendedScope: true, scope: isRoomScope },
  ],
  regex: /^(.+), ?(?:pressuri[sz]e|pres) (.+)$/,
  script(objects: any) {
    const npc         = objects[0][0];
    npc.actedThisTurn = true;
    if (!npc.npc) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(CMD_not_npc(npc));
      return Quest.World.world.FAILED;
    }
    objects.shift();
    return handlePressurise(npc, objects, true);
  },
}));

Quest.Commands.commands.push(new Quest.Command.Cmd('NpcPressurise2', {
  attName: 'pressure',
  objects: [
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
    { extendedScope: true, scope: isRoomScope },
  ],
  regex: /^(?:tell|ask|instruct) (.+) to (?:pressuri[sz]e|pres) (.+)$/,
  script(objects: any) {
    const npc         = objects[0][0];
    npc.actedThisTurn = true;
    if (!npc.npc) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(CMD_not_npc(npc));
      return Quest.World.world.FAILED;
    }
    objects.shift();
    return handlePressurise(npc, objects, true);
  },
}));
Quest.Commands.commands.push(new Quest.Command.Cmd('NpcDepressurise1', {
  attName: 'pressure',
  objects: [
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
    { extendedScope: true, scope: isRoomScope },
  ],
  regex: /^(.+), ?(?:depressuri[sz]e|evacuate|depres|evac) (.+)$/,
  script(objects: any) {
    const npc         = objects[0][0];
    npc.actedThisTurn = true;
    if (!npc.npc) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(CMD_not_npc(npc));
      return Quest.World.world.FAILED;
    }
    objects.shift();
    return handlePressurise(npc, objects, false);
  },
}));
Quest.Commands.commands.push(new Quest.Command.Cmd('NpcDepressurise2', {
  attName: 'pressure',
  objects: [
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
    { extendedScope: true, scope: isRoomScope },
  ],
  regex: /^(?:tell|ask|instruct) (.+) to (?:depressuri[sz]e|evacuate|depres) (.+)$/,
  script(objects: any) {
    const npc         = objects[0][0];
    npc.actedThisTurn = true;
    if (!npc.npc) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(CMD_not_npc(npc));
      return Quest.World.world.FAILED;
    }
    objects.shift();
    return handlePressurise(npc, objects, false);
  },
}));

function handlePressurise(char: any, objects: any, pressurise: any) {
  const baseRoom = objects[0][0];
  if (!baseRoom.room) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(`You can't ${pressurise || depressurise} that.`);
    return Quest.World.world.FAILED;
  }
  if (char === Quest.World.player) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg('You need to ask Xsansi to pressurise or depressurise any part of the ship.');
    return Quest.World.world.FAILED;
  }

  // I am counting these as successes as the player has successfully made the request, even if it was refused
  if (char.name !== 'Xsansi') {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    Quest.IO.msg("'{nm:char}, {if:pressurise:pressurise:depressurise} {nm:baseRoom:the},' you say.", { baseRoom, char, pressurise });
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'You need to ask Xsansi to pressurise or depressurise any part of the ship.'");
    return Quest.World.world.SUCCESS;
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  Quest.IO.msg("'Xsansi, {if:pressurise:pressurise:depressurise} {nm:baseRoom:the},' you say.", { baseRoom, pressurise });
  if (baseRoom.isSpace) {
    if (pressurise) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Scientists estimates the volume of space to be infinite. The ship does not have sufficient air to pressure space.'");
    } else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Space is already depressurised.'");
    }
    return Quest.World.world.SUCCESS;
  }

  const mainRoom = (typeof baseRoom.vacuum === 'string' ? Quest.World.w[baseRoom.vacuum] : baseRoom);
  if (mainRoom.vacuum !== pressurise) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(`'${Quest.Utilities.sentenceCase(Quest.lang.getName(mainRoom, { article: Quest.Utilities.DEFINITE }))} is already ${pressurise ? 'pressurised' : 'depressurised'}.`);
    return Quest.World.world.SUCCESS;
  }

  if (!Quest.World.w.Xsansi.pressureOverride && mainRoom.name !== 'airlock' && !pressurise) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'Safety interlocks prevent depressurising parts of the ship while the crew are active.'");
    return Quest.World.world.SUCCESS;
  }

  // !!! Note that this assumes crew members never go in the airlock
  if (mainRoom.name === 'airlock' && !pressurise && Quest.World.player.loc === 'airlock' && !Quest.World.w.your_spacesuit.worn) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'Safety interlocks prevent depressurising the airlock whilst personnel are inside it without spacesuits.'");
    return Quest.World.world.SUCCESS;
  }
  if (!pressurise) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(`'Evacuating ${Quest.lang.getName(mainRoom, { article: Quest.Utilities.DEFINITE })}... Room is now under vacuum.'`);
    mainRoom.vacuum = true;
    return Quest.World.world.SUCCESS;
  }
  if (mainRoom.leaks) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(`'Pressurising ${Quest.lang.getName(mainRoom, { article: Quest.Utilities.DEFINITE })}... Pressurisation failed.'`);
    return Quest.World.world.SUCCESS;
  }

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg(`'Pressurising ${Quest.lang.getName(mainRoom, { article: Quest.Utilities.DEFINITE })}... Room is now pressurised.'`);
  mainRoom.vacuum = false;
  return Quest.World.world.SUCCESS;
}

Quest.Commands.commands.push(new Quest.Command.Cmd('Approach', {
  objects: [
    { scope: 'isShip' },
  ],
  regex: /^approach (.+)$/,
  script(objects: any) {
    if (!objects[0][0].isShip) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('The APPROACH command is for piloting the ship to a specific destination; a satellite or vessel for example.');
      return Quest.World.world.FAILED;
    }
    if (Quest.World.player.loc !== 'flightdeck') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('You need to be on the flight-deck to pilot the ship.');
      return Quest.World.world.FAILED;
    }
    if (Quest.World.w.alienShip.status === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('There is no ship detected.');
      return Quest.World.world.FAILED;
    }
    if (Quest.World.w.alienShip.status > 1) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The {i:Joseph Banks} is already adjacent to the unidentified vessel.'");
      return Quest.World.world.FAILED;
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('You sit at the controls, and unlock the console. You type the co-ordinates into the system, and feel a noticeable pull as the ship accelerates to the target. At the half way point, the ship swings around, so the rockets are firing towards the target, slowing the ship down, so it comes to a stop, relative to the other ship.');
    Quest.World.w.alienShip.status = 2;
    return Quest.World.world.SUCCESS;
  },
}));

Quest.Commands.commands.push(new Quest.Command.Cmd('Scan', {
  objects: [
    { scope: 'isShip' },
  ],
  regex: /^scan (.+)$/,
  script(objects: any) {
    if (!objects[0][0].isShip) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('The SCAN command is for scanning a target nearby in space, having approached it; a satellite or vessel for example.');
      return Quest.World.world.FAILED;
    }
    if (Quest.World.player.loc !== 'flightdeck') {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('You need to be on the flight-deck to scan the ship.');
      return Quest.World.world.FAILED;
    }
    if (Quest.World.w.alienShip.status === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('There is no ship detected.');
      return Quest.World.world.FAILED;
    }
    if (Quest.World.w.alienShip.status === 1) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('The source of the radio signal is too far away to be properly scanned.');
      return Quest.World.world.FAILED;
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Sat at the controls, you initiate a scan of the unknown ship...');
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('While you await the results, you look at the image on the screen. It is not big, less than half the length of the Joseph Banks, and a dull grey colour. It is all curves, without a straight edge anywhere, but it nevertheless looks lumpy rather than sleek. There is no obvious propulsion system, but you can see what might be an opening. There are no marking as far as you can see, and  no obvious weapons.');
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('The results of the scan appear on the screen. Unsurprisingly, the ship is not in the database. An XDR scan of the hull indicates it is made of an unknown intermetallic alloy of aluminium, nickel and arsenic.');
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('A look at the infrared camera shows the ship is radiating low level thermal energy, especially from the aft area (relative to the Joseph Banks). The radio signal is emanating from a point lower port forward section.');
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('There are no other electromagnetic emissions detected, and no significant magnetic, electrical or gravity fields detected.');
    Quest.World.w.alienShip.status = 2;
    return Quest.World.world.SUCCESS;
  },
}));

function isShip(item: any) {
  return item.isShip;
}

Quest.Commands.commands.push(new Quest.Command.Cmd('ProbeStatus', {
  regex: /^probes?$/,
  script() {
    const arr = getProbes();
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(`Found ${arr.length} probes`);
    for (const probe of arr) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg('------------------');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(`Probe:${probe.alias}`);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(`Status:${probe.status}`);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(`launchCounter:${probe.launchCounter}`);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(`probeType:${probe.probeType}`);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(`planetNumber:${probe.planetNumber}`);
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg('------------------');
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(`Geology:${currentPlanet().geology}`);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(`Biology:${currentPlanet().biology}`);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(`Radio:${currentPlanet().coms}`);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(`Satellite:${currentPlanet().satellite}`);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(`Active:${currentPlanet().eventIsActive()}`);
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('MapUpdate', {
  regex: /^map?$/,
  script() {
    updateMap();
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg('Done');
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
  },
}));

Quest.Command.findCmd('MetaHelp').script = function () {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('Help is available on a number of topics...');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('Do {color:red:HELP GENERAL} or {color:red:? GEN} for general instructions on playing parser games');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('{b:Commands to help you play this game:}');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('Do {color:red:HELP GAME} for suggestions on what to actually do. You could also try {color:red:HELP NPC} for how to interacting with other characters, {color:red:HELP PROBE} to learn about deploying probes, and {color:red:HELP STASIS} for more on stasis pods (and hence travel to the next planet). You might want to try {color:red:HELP VACUUM} to discover how to handle the cold vacuum of space of {color:red:HELP SEALANT} for how to use the spray sealant.');
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'alienShip' does not exist on type '{}'.
  if (Quest.World.w.alienShip.status > 0) Quest.IO.metamsg('You could also do {color:red:HELP DOCKING}.');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('{b:Meta-information about the game:}');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('Do {color:red:HELP UNIVERSE} for some notes about the universe the game is set in, {color:red:HELP SYSTEM} to read about the game system, and {color:red:HELP CREDITS} for credits.');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('NOTE: You can use {color:red:?} as a shorthand for {color:red:HELP}');
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('HelpSubject', {
  objects: [
    { special: 'text' },
  ],
  regex: /^(?:\?|help) (.*)$/,
  script(objects: any) {
    for (const el of this.topics) {
      if (objects[0].match(el.regex)) {
        el.script();
        return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      }
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(`Sorry, no help topic found that matches "${objects[0]}"`);
    return Quest.World.world.FAILED;
  },
  topics: [
    {
      regex: /^gen.*$/,
      script() {
        Quest.lang.helpScript();
      },
    },
    {
      regex: /^(credits?|about)$/,
      script() {
        Quest.lang.aboutScript();
      },
    },
    {
      regex: /^game$/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('At each planet, you need to assess how many bio-probes and how many geo-probes to launch. Do {color:red:HELP PROBES} for details on that. You can {color:red:ASK AI ABOUT SHIP} to find how many of each probe is left.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('You have five planets to visit, before returning to Earth. Return to the stasis pod to go back into stasis. Xsansi will then navigate the ship to the next destination.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('As the captain, the welfare of the crew is important, so {color:red:ASK KYLE ABOUT HIS HEALTH}, etc.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('You can talk to Xsansi anywhere on the ship (and can just call her "ai"). Do {color:red:ASK AI ABOUT CREW} to find out where the crew are. Do {color:red:ASK AI ABOUT KYLE}, for example, for more specific information; the last crew mate yoiu asked about will appear in blue on the map, helping you find him or her (until you meet, where the room will turn green for one turn).');
      },
    },
    {
      regex: /^npcs?$/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Interacting with NPCs:}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('You can ask an NPC to do something by using the same command you would use to have yourself do something, but prefixed with {color:red:[name],} (note the comma) or {color:red:TELL [name] TO}.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg(Quest.Settings.settings.noTalkTo);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Use the {color:red:TOPICS} command for some suggested topics. There are rather more for ASK than TELL, as you might expect.');
      },
    },
    {
      regex: /^probes?$/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Using probes:}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Kyle will automatically deploy a satellite on arrival at a new planet, but you need to tell your crew to deploy probes for the surface. Wait for Xsansi to announce that the satellite is in orbit, then {color:red:ASK XSANSI ABOUT PLANET}. You can then assess what probes you want to deploy.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('For a bio-probe, talk to Ostap, for a geo-probe, talk to Aada. They will then walk to the probe hanger, and launch the probe. You can tell them to launch several at once (eg {color:red:OSTAP, LAUNCH 3 PROBES}), but remember, you only have sixteen of each for all five planets.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Once a probe has been launched, it is on its own; you cannot control it.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('After a probe has landed, it will send data back to the ship, for your crew to analyse. If the data has value, your bonus will automatically increase. The first probe on a planet might get you two or three bonuses, but the third may not get you any and by the tenth, it is not going to find anything new. Ask the crew about the planet once the probes have explored it. You may decide you want to launch more.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('After thirty turns a probe will have got everything it can - and usually much sooner. Why not get to know your crew while you wait?');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Note that probe success is predetermined; if a probe is lost, it will be lost every time you reload your game.');
      },
    },
    {
      regex: /^stasis$/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Stasis:}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Once you are in stasis, years will pass whilst the ship navigates to the next star system, so this is how to move the story forward to the next planet to survey.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('To go into stasis, climb into your pod, and close the lid.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('You can tell a crew member to go to stasis at any time (eg {color:red:AADA, GET IN STASIS POD} or just {color:red:HA, IN POD}). Once in stasis they cannot be revived until the ship arrives at the next destination, so make sure they have done everything they need to first. Crew members will automatically go into stasis anyway once you do.');
      },
    },
    {
      regex: /^(vacuum|d?e?pressur|evacuat)/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Vacuum:}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Each section of the ship can be pressurised or depressurised by Xsansi, just ask {color:red:XSANSI, PRESSURIZE THE CARGO BAY} or {color:red:AI, DEPRESSURISE ENGINEERING}. You can use {color:red:PRES} and {color:red:DEPRES} as shortcuts too. Note that safety overrides may prevent Xsansi from complying. You will be unable to depressurise any room other than the airlock whilst the crew are out of stasis, and you will be unable to depressurise the airlock whilst you are in it unless you have a spacesuit on.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('You will not be able to move from one area to another if one is pressurised and the other is not.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('To find out what areas are pressurised, {color:red: ASK XSANSI ABOUT WHERE IS PRESSURISED} or {color:red:ASK AI ABOUT VACUUM}.');
      },
    },
    {
      regex: /^seal/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Sealant Spray:}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('The sealant spray can be used to temporarily fix leaks in the hull, just go to a room with a leak, and {color:red:SPRAY LEAK}. Once the leak is sealed, the room can be re-pressurised, and the engineer can put in a more permanent solution.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('The can has five charges. If you waste them spraying other things... you could be in trouble.');
      },
    },
    {
      regex: /^dock/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:Docking:}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('From the flight-deck, you can get closer to another ship, either to get a better look or to dock with it; {color:red:XSANSI, APPROACH SHUTTLE} or {color:red:AI, APPROACH SHIP}. Obviously there must be an vessel around.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Once adjacent, you can scan it or dock with it; {color:red:XSANSI, DOCK WITH SHUTTLE} or {color:red:AI, SCAN SHIP}.');
      },
    },
    {
      regex: /^universe$/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:The game Quest.World.world:}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('I originally {i:tried} to go hard science fiction; these are real stars the ship visits! However, I have assumed artificial gravity, which is required to orientate the game (once you have down, you have port, up and starboard).');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg("I am also assuming people can be held in stasis, and presumably this is like freezing time (cf Niven's stasis field, in his \"Known Space\" series). I need that to preserve the food so the crew have something to eat 80 years after leaving Earth.");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Also, probes are {i:fast}! It just takes a few turns to travel from orbit to the planet surface, which has to be at least 100 miles, and likely considerably more. They work fast on the planet too. It is a game; we need stuff to happened quickly to keep players interested. So maybe not so hard science fiction after all.');
      },
    },
    {
      regex: /^system$/,
      script() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('{b:The Game System:}');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('This game was written for Quest 6, which means it is running entirely in JavaScript in your browser. Compared to Quest 5 (which I am also familiar with) this means that you do not need to download any software to run it, and there is no annoying lag while you wait for a server to respond. Compared to Inform... well, it allows authors to directly access a modern programming language (though the point of Inform 7, of course, is to keep the programming language at bay).');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Quest 6 is a complete system, implementing all the standards of a parser game, including the usual compass directions by default! Containers, surfaces, countables, wearables, openables, furniture, components and switchable are all built in, as well as NPCs, who hopefully are acting with some semblance of realism.');
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('For more information, including a tutorial on how to create your own game, see {link:here:https://github.com/ThePix/QuestJS/wiki}. As yet there is no editor, but I hope there will be one day.');
      },
    },
  ],
}));
