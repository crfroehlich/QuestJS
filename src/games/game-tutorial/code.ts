function tmsg(s: any, params: any) {
  Quest.IO.msg(s, params || {}, { cssClass: 'tutorial', tag: 'p' });
}

const hint = {};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
hint.data = [
  { hint: 'Just type WAIT to get to the next stage.', name: 'waitAtStart' },
  { hint: 'Type NORTH to go into the kitchen.', name: 'northToKitchen' },
  { hint: 'Type NORTHEAST to go into the garden.', name: 'neToGarden', tutorial: 'Great, we can move around!|From here we can go back south to the lounge. Generally when you enter a room from one direction you will be able to go back that way, but not always.|As well as going north, south, east and west, you can also go along the diagonals, as well as up and down, and in and out. This room has a basement you can go DOWN to and a larder you can go IN. Try moving with the compass rose; note how the buttons change depending on the available exits.|The tutorial continues in the garden to the northeast (type NORTHEAST or just NE).' },
  { hint: 'Pick up the hat (GET HAT), and put it on (WEAR HAT).', name: 'getHat', tutorial: 'Let\'s interact with something!|There is a hat here. You know that because the description tells you, and also it is listed in the panel at the left. To get the hat, type GET HAT or TAKE HAT.' },
  { hint: 'Put the hat on (WEAR HAT).', name: 'wearHat', tutorial: "You will be picking up things a lot in text adventures. You should see the hat listed as held in the panel to the left now. Some games have limits on how much can be held, so we might only be able to pick up eight items, or whatever.|It is always worthwhile examining an object as it might give you a clue about what it is for. You can examine the hat by typing EXAMINE HAT, LOOK AT HAT or just X HAT. Or click on it in the panel, and select \"Examine\" from the menu.|Most commands in a text adventure will be of the form &lt;verb&gt; &lt;verb&gt;.|Hats can be worn, so let's put it on! You can type WEAR HAT or DON HAT or PUT HAT ON or PUT ON HAT as you prefer." },
  { hint: 'Type LOOK AT GRASS to progress.', name: 'xGrass', tutorial: "You look very fetching in that hat!|You can check what you are carrying at any time with the INVENTORY command - or just type INV or I.|You don't need to pick something up to look at it, and there may be things hidden in the location description that can be examined (or even picked up). The description for this room mentioned the grass, what happens if you examine that?" },
  { hint: 'Do SMELL or SMELL GRASS.', name: 'smell', tutorial: 'To be honest, you will come across things mentioned in descriptions that the author has not implemented, and the game will just tell you it does not know what you are talking about (like the cobwebs in the basement!), but in an ideal Quest.World.world you will be able to examine everything.|Sometimes you can SMELL or LISTEN. Can you smell the grass?' },
  { hint: 'Look at the box (X BOX).', name: 'xBox', tutorial: '' },
  { hint: 'Read the writing on the box (READ BOX)', name: 'readBox', tutorial: 'There is something written on the label, so we should try READ BOX (or READ LABEL; I think that will work in this game, but it can be worth trying alternatives when one noun fails).' },
  { hint: 'OPEN THE BOX and then GET THE CROWBAR.', name: 'openBox', tutorial: 'Okay, so that is kind of odd, but we will roll with it. Time to open the box. Hopefully by now you will have guessed you need to say OPEN BOX. On the off-chance that there is a crowbar in there, pick it up (was that a spoiler?).' },
  { hint: 'REMOVE THE HAT and then PUT IT IN THE BOX, then CLOSE BOX.', name: 'hatInBox', tutorial: 'I am guessing the Hat and Crowbar Company are expecting a hat back now, better put the hat in the box. Can you guess how?|The clue was in the question: PUT THE HAT IN THE BOX.|You will need to REMOVE the hat first. And once the hat is in there, close the box. Quest will understand IT to the last thing you referred to, so you could say REMOVE HAT and then PUT IT IN THE BOX.|You might want to see if anything happens if you close the box while it is empty first...' },
  { hint: 'CROWBAR THE SHED DOOR and then GO EAST.', name: 'crowbar', tutorial: "Cool... Wait, does that mean you're now naked? Let's assume not! So we have a crowbar, we can get into the shed.|Up to now we have been using commands that pretty much every game will understand, but games will usually have their own set of commands unique to them, as required by the plot. This game is no different.|One of the problems when playing - and when authoring - a text adventure is deciding how a command should be phrased (a problem known as \"guess the verb\"). Are we going to CROWBAR THE SHED or LEVER OPEN THE DOOR or what? Often it takes some experimenting, though sometimes the text will give you a hint - always worth trying any verb that is used in the text (at least you can be sure the author knows that word).|Often the generic USE will work, so is worth a try. See if you can get into that shed." },
  { hint: 'GET TORCH.', name: 'getTorch', tutorial: 'This room has a torch, but it is described in the room description as part of the scenery, so not as obvious as the hat. But you can still pick it up just the same. And if you then drop it again, you will see it is just an ordinary item (though that may not be the case in all games).|Incidentally, you can call it a flashlight if you prefer. Oh, and you need to be somewhere light to turn it on, so switch it on {i:before} going into the basement.' },
  { hint: 'TURN ON TORCH, then head to the basement (out, southwest, then down). If you are in the basement and it is dark, you will need to go back up, and then turn the torch on before coming back down.', name: 'torchOn', tutorial: 'Now it is calling it a flashlight? So anyway, we have a torch, we can now take a proper look in the basement (go down from the kitchen).|The torch can  be turned on and off, with TURN ON TORCH or SWITCH FLASHLIGHT OFF or whatever.' },
  { hint: 'SWITCH ON THE LIGHT, and then TURN OFF THE TORCH (in that order!).', name: 'turnOnLight', tutorial: 'Great, at last we can see down here. And it turns out there is a light switch, but we needed the torch to see the switch.|It is quite common for torch batteries to run out after so many turns, and then you have to re-charge it or find a battery. Hopefully that will not happen here, but it would be a good idea to save the battery just in case, so turn the light on, and turn off the torch.' },
  { hint: 'Try GET ALL to pick up everything.', name: 'getAll', tutorial: 'So we have managed to turn on a light!|A lot of adventure games are like this in that you need to do A, but to do that you need to do B, but you cannot do B without doing C first, and so on. And often - as here - you do not know what A even is.|There are a few things down here that we might want to grab. Most adventure games understand the word ALL, so we can just do GET ALL to pick up the lot.' },
  { hint: 'You cannot take the crates, but you might be able to MOVE CRATES.', name: 'moveCrates', tutorial: 'Great, you used ALL!|Note that ALL will not include items that are scenery, so not the cobwebs (which are actual objects now, honest - try TAKE COBWEBS), and there are some objected we could not pick up.|You also DROP ALL, WEAR ALL, etc. though some commands will not like it. You could also try DROP ALL BUT Quest.Templates.ROPE.|You might also want to try eating the apple or reading the newspaper.|When you are done, on with the plot! We cannot take the crates with us, but trying to do so was useful because the response gave us a clue as to what we can do - we can move them.' },
  { hint: 'Head WEST.', name: 'enterPassage', tutorial: 'Now we are getting somewhere!' },
  { hint: 'Type SAVE.', name: 'save', tutorial: "Not much in this room, so let's pause for a moment. It is a good idea to save occasionally whilst playing, just in case you die (not possible in this game) or lose the connection to the server (not an issue for Quest 6) or your PC crashes or you just have some else to do and want to return later. You really do not want to have to start from the beginning, so save your game.|Different systems have different ways to handle saving and loading (and some games may not support it at all), but a good start is to type SAVE." },
  { hint: 'Type SAVE TUTORIAL (or some other name).', name: 'saveGame', tutorial: 'So in Quest 6 SAVE just tells you how to save your game. You need to add a file name to actually save. Do that now! You can call it whatever you want; how about "tutorial"?' },
  { hint: 'Head WEST.', name: 'westRobot' },
  { hint: 'ASK THE ROBOT ABOUT THE LABORATORY.', name: 'robot', tutorial: 'The robot is a non-player character, or NPC. NPCs are common in adventure games, and may be implemented in various ways. At the simplest, the NPC will be part of the background, perhaps saying a few words to you, but not really interacting. But we can interact with the robot. We will start by talking to it.|There are two approaches to conversations. We will try TALK TO with another character. Here we will do ASK and TELL. Start by asking the robot about the laboratory.' },
  { hint: 'ASK THE ROBOT ABOUT THE LABORATORY.', name: '', tutorial: '' },
  { hint: 'ASK ROBOT ABOUT ZETA-PARTICLES.', name: '', tutorial: '' },
  { hint: 'Go WEST to the lift.', name: '', tutorial: '' },
  { hint: 'Try PRESS 3 to operate the lift.', name: 'press3', tutorial: 'The lift (or elevator) is a special location in that it moves. You probably already knew that! To get it to go, just press one of the buttons.' },
  { hint: 'Go back to the laboratory, and ASK ROBOT ABOUT LIFT.', name: 'askRLift', tutorial: 'Something is wrong... Perhaps we should ask the robot about it?' },
  { hint: 'ASK THE ROBOT ABOUT THE ZETA_REACTOR.', name: '', tutorial: '' },
  { hint: 'Ask the robot to open the door with ROBOT,OPEN DOOR, then head through it, N.', name: '', tutorial: '' },
  { hint: 'Head NORTH.', name: 'northToReactor', tutorial: 'Great, the robot could do it no trouble. Now we are on our way again.' },
  { hint: 'GET ROD.', name: 'getRod', tutorial: "It is quite common for a game to have a \"timed\" challenge - you have to complete it within a set number of turns (or even within an actual time limit). As this is a tutorial, you are perfectly safe, though you will get messages saying death is getting more imminent each turn (and will be negative once the time limit expires).|Hey, maybe we'll get some superpower from all that zeta-exposure! No, but seriously kids, zeta-particles are very dangerous, and to be avoided.|In Quest 6, a turn will not pass if you try a command that is not recognised or for meta-commands like HINT; that may not be the case in every game system.|It is a good idea to save before doing a timed challenge, by the way (we saved recently, so no need for us to save now).|Now, get that control rod!" },
  { hint: 'Go back SOUTH.', name: 'backToRobot', tutorial: "Well that's a bother! But there must be some way around. We need to use the lift, and to do that we need to get the reactor going. Given the author has gone to trouble to set this up, there must be some way to get the control rod.|We can get the robot to do it!|You will need to go back to the other room, get the robot to come here, then tell the robot to pick up the control rod." },
  { hint: 'Tell the robot to go north (ROBOT,N), then go NORTH yourself and tell the robot to get the rod (ROBOT,GET ROD).', name: 'rGoNorth', tutorial: 'You can tell the robot to do something by prefixing a normal command with either TELL ROBOT TO or just ROBOT and a comma. To have it go north, them, you could do TELL ROBOT TO GO NORTH or ROBOT,N.' },
  { hint: 'Tell the robot to get the rod (ROBOT,GET ROD).', name: 'rGetRod', tutorial: 'Great, now we can tell the robot to get the rod. By the way, Quest 6 is pretty good at guessing nouns, and often you only need to type a few letters, or even just one letter if there is nothing else here it might be confused with. Try R,GET R. Quest will realise the first R is a character, so will assume you mean robot, while the second R is something in the location that can be picked up.' },
  { hint: 'Tell the robot to put the rod i the reactor (ROBOT,PUT ROD IN REACT).', name: 'rRInR', tutorial: 'Now you need to tell the robot to put the rod in the reactor. Try R,PUT R IN R and see how it fares!' },
  { hint: 'Tell the robot to get the rod (ROBOT,GET ROD).', name: '', tutorial: '' },
  { hint: 'Tell the robot to put the rod in the reactor (ROBOT,PUT ROD IN REACTOR).', name: '', tutorial: '' },
  {
    hint() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
      if (Quest.World.w.me.loc === 'reactor_room') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Head SOUTH, then WEST, then once in the lift, PRESS 3.');
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
      else if (Quest.World.w.me.loc === 'laboratory' || Quest.World.w.me.loc === 'lounge') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Head WEST, then once in the lift, PRESS 3.');
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
      else if (Quest.World.w.me.loc === 'lift') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('PRESS 3.');
      } else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('Head to either the lounge or the laboratory, then go WEST, then once in the lift, PRESS 3.');
      }
    },
    name:     'useLift',
    tutorial: 'Now we are getting somewhere. At last the lift that we saw in the lounge right at the start is working, and we can use it to get to the top of the house.',
  },
  { hint: 'GO EAST.', name: 'eastOffice', tutorial: 'Hopefully when we exit the lift we will be somewhere new...' },
  { hint: 'Try to USE THE COMPUTER.', name: 'useComputer', tutorial: 'Great we must be nearly done! Just use the computer...' },
  { hint: 'TALK TO PROF.', name: 'talkProf', tutorial: "Bother! We need to shift the professor. You could tell the robot to do something and, being a robot, it would just do it. Professor Kleinscope will not. In fact, you cannot ASK or TELL him stuff either. To converse with the Professor, you need to TALK TO him. Let's see what happens..." },
  { hint: 'Wait until the professor goes, then try to USE COMPUTER again.', name: '', tutorial: '' },
  { hint: 'Look for the code for the computer. Try LOOK BEHIND PAINTING, then read what you find. Once you have the number, try to USE THE COMPUTER again.', name: 'findCode', tutorial: "Oh heck!|Just occasionally a game will ask you for some specific text, which it will understand to be different to a command. In this case it is wanting a specific six-digit number (by the way, that number was randomly generated when you started the game, so you cannot cheat by asking someone on the internet what it is).|But worry not! This guy is a professor, therefore he necessarily must be absent-minded, therefore he will have the number written down somewhere. We just need to find it.|By the way, this is a small example of a \"Babel fish puzzle\". The name comes from the Hitch-Hiker's Guide to the Galaxy, and is when you have a seemingly simple task, but there is an obstacle; each time you resolve one obstacle a new one is apparent." },
  { hint: 'You need to escape, and the only way out is through the window. What happens if you SMASH THE WINDOW?', name: 'smashWindow', tutorial: '' },
  { hint: 'You need to escape, and the only way out is through the window, but you need to wrap your hand in something first. How about that old newspaper (WRAP FIST IN NEWSPAPER)?', name: 'wrapFist', tutorial: '' },
  { hint: 'You need to escape, and the only way out is through the window. What happens if you SMASH THE WINDOW now your fist is wrapped in newspaper?', name: 'smashWindow2', tutorial: '' },
  { hint: 'You need to escape, and the only way out is through the broken window. What happens if you try OUT?', name: 'out', tutorial: '' },
  { hint: 'You need to escape, and the only way out is through the broken window, but it is a long way down and you will need to use the rope. To do that, TIE Quest.Templates.ROPE TO DESK, then THROW Quest.Templates.ROPE OUT WINDOW.', name: 'climbOut' },
  { hint: 'No hints, you have finished the game!', name: '', tutorial: '' },
];

// @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
hint.now = function (name: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
  const n = hint.data.findIndex((el: any) => el.name === name);
  if (n === -1) throw `No hint found called ${name}`;
  if (n > Quest.World.player.hintCounter) {
    Quest.World.player.hintCounter = n;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
    if (hint.data[n].tutorial) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
      for (const s of hint.data[n].tutorial.split('|')) tmsg(s);
    }
  }
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
hint.before = function (name: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
  const n = hint.data.findIndex((el: any) => el.name === name);
  if (n === -1) throw `No hint found called ${name}`;
  return (n > Quest.World.player.hintCounter);
};

Quest.Command.findCmd('MetaHint').script = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
  if (typeof hint.data[Quest.World.player.hintCounter].hint === 'string') {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(hint.data[Quest.World.player.hintCounter].hint);
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
  else if (typeof hint.data[Quest.World.player.hintCounter].hint === 'function') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
    hint.data[Quest.World.player.hintCounter].hint();
  } else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
    console.log(hint.data[Quest.World.player.hintCounter].name);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{}'.
    console.log(`hint.data[Quest.World.player.hintCounter].hint is a ${typeof hint.data[Quest.World.player.hintCounter].hint}`);
  }
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

// eat, purchase/sell, switch on/off, unlock, look behind/under/etc, push/pull

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'walkthroug... Remove this comment to see the full error message
const walkthroughs = {
  a: [
    'z', 'hint',
    'z', 'hint',
    'z', 'hint',
    'n', 'hint',
    'ne', 'hint',
    'get hat', 'hint',
    'wear hat', 'hint',
    'x grass', 'hint',
    'smell', 'hint',
    'x box', 'hint',
    'read label', 'hint',
    'open box', 'hint',
    'get crowbar', 'hint',
    'remove hat', 'hint',
    'put it in box', 'hint',
    'close lid', 'hint',
    'crowbar shed', 'hint',
    'east', 'hint',
    'get torch', 'hint',
    'out', 'hint',
    'sw', 'hint',
    'turn on torch', 'hint',
    'down', 'hint',
    'turn on light', 'hint',
    'turn off torch', 'hint',
    'get all', 'hint',
    'move crates', 'hint',
    'w', 'hint',
    'save', 'hint',
    'save Tutorial ow', 'hint',
    'w', 'hint',
    'ask robot about the laboratory', 'hint',
    'topics for robot',
    'ask robot about zeta-particles', 'hint',
    'w', 'hint', /*
    "press 3", "hint",
    "e", "hint",
    "ask robot about lift", "hint",
    "ask robot about reactor", "hint",
    "ask robot to open door", "hint",
    "n", "hint",
    "get rod", "hint",
    "s", "hint",
    "robot,n", "hint",
    "n", "hint",
    "r,get r", "hint",
    "r,put r in r", "hint",
    "s", "hint",
    "w", "hint",
    "press 3", "hint",/*
    "e", "hint",
    "sit on chair", "hint",
    "look out window", "hint",
    "use computer", "hint",
    "talk to prof", "hint",
    "use computer",
    "z",
    "use computer",
    "000000", "hint",
    "look behind painting", "hint",
    "x post-it", "hint",
    "use computer",
    Quest.World.w.computer.code, "hint",
    "smash window", "hint",
    "wrap fist in newspaper",
    "wrap newspaper round hand",
    "hint",
    "open window", "hint",
    "use apple to smash window",
    "smash window with newspaper",
    "smash computer with crowbar",
    "smash window with crowbar",
    "smash window", "hint",
    "out", "hint",
    "x rope",
    "throw rope out window", "hint",/*
    "tie rope to computer", "hint",
    "tie rope to desk", "hint",
    "x rope",
    "throw rope out window", "hint",
    "out",
   /*  */
  ],
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('rope', (arr: any, params: any) => `<span style="font-family:Montserrat">${arr.join(':')}</span>`);

Quest.Command.findCmd('MetaSave').script = function () {
  Quest.lang.saveLoadScript();
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'before' does not exist on type '{}'.
  if (hint.before('saveGame')) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now('saveGame');
  }
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Crowbar', {
  defmsg:  "That's not something you can crowbar open.",
  objects: [
    { special: 'ignore' },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],
  regex: /^(crowbar|level) (.+)$/,
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Move', {
  defmsg: "{pv:item:'be:true} not something you can move.",

  npcCmd: true,

  objects: [
    { special: 'ignore' },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],

  regex: /^(move) (.+)$/,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('Tutorial', {
  objects: [
  ],
  regex: /^tutorial$/,
  script() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('body').toggleClass('hidden');
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(Quest.lang.done_msg);
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
  },
}));

const wrapScript = function (obj1: any, obj2: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'old_newspaper' does not exist on type '{... Remove this comment to see the full error message
  if (obj2 !== Quest.World.w.old_newspaper) return Quest.IO.failedmsg('You cannot wrap that round anything.');
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fist' does not exist on type '{}'.
  if (obj1 !== Quest.World.w.fist) return Quest.IO.failedmsg("You don't think that will achieve anything.");
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (obj2.fist_wrapped) return Quest.IO.failedmsg('It already is.');
  obj2.fist_wrapped = true;
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg('You carefully wrap the old newspaper around your fist.');
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
  hint.now('smashWindow2');
  return Quest.World.world.SUCCESS;
};

const unwrapScript = function (obj1: any, obj2: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'old_newspaper' does not exist on type '{... Remove this comment to see the full error message
  if (obj2 !== Quest.World.w.old_newspaper) return Quest.IO.failedmsg('They are not wrapped together.');
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fist' does not exist on type '{}'.
  if (obj1 !== Quest.World.w.fist) return Quest.IO.failedmsg('They are not wrapped together.');
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj2.fist_wrapped) return Quest.IO.failedmsg('They are not wrapped together.');
  obj2.fist_wrapped = false;
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg('You carefully unwrap the old newspaper from around your fist.');
  return Quest.World.world.SUCCESS;
};

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Wrap1', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],
  // wrap fist in newspaper
  regex: /^(?:wrap|cover) (.+) (?:with|in) (.+)$/,
  script(objects: any) {
    wrapScript(objects[0][0], objects[1][0]);
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Wrap2', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],
  // wrap newspaper round fist
  regex: /^(?:wrap) (.+) (?:round|around) (.+)$/,
  script(objects: any) {
    wrapScript(objects[1][0], objects[0][0]);
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Unwrap1', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],
  // unwrap fist
  regex: /^(?:unwrap|uncover) (.+)$/,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'old_newspaper' does not exist on type '{... Remove this comment to see the full error message
  script(objects: any) {
    unwrapScript(objects[0][0], Quest.World.w.old_newspaper);
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Unwrap2', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],
  // take newspaper off fist
  regex: /^(?:take|remove) (.+) (?:off|from) (.+)$/,
  script(objects: any) {
    unwrapScript(objects[1][0], objects[0][0]);
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('ThrowThrough', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'throwThrough', scope: Quest.Parser.parser.isHere },
  ],
  // throw rope out window
  regex: /^(?:throw|chuck|hurl|toss|pitch|lob|heave) (.+) (?:out of|out|through) (.+)$/,
  script(objects: any) {
    const item = objects[0][0];
    const dest = objects[1][0];
    if (!dest.isThrowThroughable) return Quest.IO.failedmsg("You can't chuck stuff through {nm:dest:the}.", { dest });
    if (!dest.isThrowThroughable(item)) return Quest.World.world.FAILED;
    if (!item.isAtLoc('me')) return Quest.IO.failedmsg('You are not holding {nm:item:the}.', { item });
    dest.throwThrough(item);
    return Quest.World.world.SUCCESS;
  },
}));

const smashWithScript = function (item: any, dest: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'office_window' does not exist on type '{... Remove this comment to see the full error message
  if (dest !== Quest.World.w.office_window) return Quest.IO.failedmsg("That's not something you can smash.");
  if (!item.isAtLoc('me')) return Quest.IO.failedmsg('You are not holding {nm:item:the}.', { item });
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'office_window' does not exist on type '{... Remove this comment to see the full error message
  if (Quest.World.w.office_window.smashed) return Quest.IO.falsemsg('The window is already smashed.');

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'crowbar' does not exist on type '{}'.
  if (item === Quest.World.w.crowbar) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('You strike the window with the crowbar, breaking the glass. You take a moment to knock away the remaining jagged shards in the frame.');
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Professor_Kleinscope' does not exist on ... Remove this comment to see the full error message
    if (Quest.World.w.Professor_Kleinscope.isHere()) Quest.IO.msg('Strangely, Professor Kleinscope does not seem to notice.');
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'office_window' does not exist on type '{... Remove this comment to see the full error message
    Quest.World.w.office_window.smashed = true;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'now' does not exist on type '{}'.
    hint.now('out');
    return Quest.World.world.SUCCESS;
  }

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  Quest.IO.msg("You can't smash the window using {nm:item:the}.", { item });
  return Quest.World.world.FAILED;
};

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('SmashWith', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'throwThrough', scope: Quest.Parser.parser.isHere },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],
  // throw rope out window
  regex: /^(?:smash|break|destroy) (.+) (?:with|using) (.+)$/,
  script(objects: any) {
    return smashWithScript(objects[1][0], objects[0][0]);
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('UseToSmash', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'throwThrough', scope: Quest.Parser.parser.isHere },
  ],
  // throw rope out window
  regex: /^(?:use|using) (.+?) (?:to |)(?:smash|break|destroy) (.+)$/,
  script(objects: any) {
    return smashWithScript(objects[0][0], objects[1][0]);
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Attack', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],
  // throw rope out window
  regex: /^(?:attack|kick|punch|hit|strike|kill) (.+?)$/,
  script(objects: any) {
    if (objects[0][0].npc) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('You just need to get the data, not beat anyone up!');
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
      if (!Quest.World.w.me.killFlag) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        tmsg('You will find most games will not let you attack the characters, and those that do will probably have combat as a large part of the game. That said, it is a good idea to try these things, you never know quite what will happen.');
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
        Quest.World.w.me.killFlag = true;
      }
    } else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("That's not going to achieve anything.");
    }
    return Quest.World.world.FAILED;
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('TieUp', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],
  // throw rope out window
  regex: /^(?:tie up|tie|bind) (.+?)$/,
  script(objects: any) {
    const tpParams = { item: objects[0][0] };
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rope' does not exist on type '{}'.
    if (!Quest.World.w.rope.isAtLoc(Quest.World.player)) {
      return Quest.IO.failedmsg('What were you thinking you could tie {ob:item} up with it exactly?', tpParams);
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'robot' does not exist on type '{}'.
    if (objects[0][0] === Quest.World.w.robot) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'I am not into the kinky stuff,' says the robot. Despite its metallic face, you still feel it is looking at you with disapproval.");
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Professor_Kleinscope' does not exist on ... Remove this comment to see the full error message
    else if (objects[0][0] === Quest.World.w.Professor_Kleinscope) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'I don;t have time for that sort of thing now,' says the Professor irritably. He looks at yoi thoughtfully. 'Though maybe later...'");
    } else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("That's not going to achieve anything.");
    }
    return Quest.World.world.FAILED;
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('RudeCommand', {

  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],
  // throw rope out window
  regex: /^(?:fuck|facefuck|face-fuck|face fuck|bugger|shag|suck|suck off|assfuck|ass-fuck|ass fuck|rape|ass-rape|ass rape) (.+?)$/,
  script(objects: any) {
    Quest.IO.parsermsg(Quest.lang.not_known_msg);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'me' does not exist on type '{}'.
    if (!Quest.World.w.me.rudeCmdFlag) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg('You had to go there...');
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      tmsg('There are games that cater to... well, people like you, but this is NOT one of them.');
    }
    return Quest.World.world.FAILED;
  },
}));

// use cx to smash y
// robot smash x

/*
Quest.Commands.commands.unshift(new Quest.Command.Cmd('ThrowAt', {
  // throw computer at window
  regex:/^(?:wrap|cover) (.+) (?:with|in) (.+)$/,
  objects:[
    {scope:Quest.Parser.parser.isHeld},
    {scope:Quest.Parser.parser.isHeld},
  ],
  script:function(objects) { wrapScript(objects[0][0], objects[1][0]) },
}));
*/
