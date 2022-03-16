// ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
const showMap = function () {
  return Quest.IO.failedmsg(Quest.lang.no_map);
};

Quest.Command.findCmd('MetaHint').script = function () {
// ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg(`Hints can be found on {link:this page:${folder}/hints.html}, in the form of InvisiClues, so you can avoid seeing spoilers you do want to see. The page will open in a new tab, so will not affect your playing of the game.`);
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
},

/*
  Quest.Command.findCmd('MetaHelp').script = function() {
    Quest.IO.metamsg("Enter commands to navigate the Quest.World.world. Use the compass directions, plus {colour:blue:UP}, {colour:blue:DOWN}, {colour:blue:IN}, {colour:blue:OUT} to move around. Use commands like {colour:blue:GET LETTER} and {colour:blue:DROP PEN} to pick things up and drop them. Use {colour:blue:INVENTORY} (or just {colour:blue:I}) to see what you are carrying.")
    Quest.IO.metamsg("It is often important to examine items; use {colour:blue:LOOK AT LETTER} or {colour:blue:EXAMINE BAG} or just {colour:blue:X HOUSE}. Look at descriptions carefully to see what items are there - sometimes it may not be obvious.")
    Quest.IO.metamsg("Should you encounter people, you can try commands like {colour:blue:TALK TO LARA} or {colour:blue:ASK KYLE ABOUT GARDEN}. You can also tell people to do something, by using the standard command, but with the person's name followed by a comma at the start, for example, {colour:blue:LARA, EAST} or {colour:blue:KYLE, GET HAT}. Also useful; {colour:blue:LARA, FOLLOW ME} and {colour:blue:KYLE, WAIT}. Of course, they will often decide not to...")
    Quest.IO.metamsg("For more details go to {link:this page:https://github.com/ThePix/QuestJS/wiki/How-To-Play-Interactive-Fiction}, which will open in a new tab.")
    Quest.IO.metamsg("If you are stuck, use {colour:blue:HINTS}.")
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS
  },
  */

// ts-error-fixed ts-migrate(2345) FIXME: Argument of type '{ name: string; alt: string; abb... Remove this comment to see the full error message
Quest.lang.exit_list.push({
  abbrev: 'Cl', alt: 'climb up', name: 'climb', niceDir: 'above', not_that_way: 'Nothing to climb here.', opp: 'down', type: 'vertical', x: 0, y: 0, z: 1,
});
// ts-error-fixed ts-migrate(2345) FIXME: Argument of type '{ name: string; alt: string; abb... Remove this comment to see the full error message
Quest.lang.exit_list.push({
  abbrev: 'CD', alt: 'climb down', name: 'climb_down', niceDir: 'below', not_that_way: 'Nothing to climb down here.', opp: 'climb', type: 'vertical', x: 0, y: 0, z: -1,
});
// ts-error-fixed ts-migrate(2345) FIXME: Argument of type '{ name: string; abbrev: string; ... Remove this comment to see the full error message
Quest.lang.exit_list.push({
  abbrev: 'Swim', name: 'swim', niceDir: 'above', not_that_way: 'Nothing to swim here.', opp: 'down', type: 'vertical', x: 0, y: 0, z: 1,
});

// I don't even know where to begin with that.

// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Touch');
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Play', { words: 'play in|play' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Kick');
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Tighten');
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Beat', { words: 'beat|flog' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Ride', { words: 'ride|mount' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Clean', { words: 'clean|brush|sweep' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Roll', { words: 'roll up|roll' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Shake', { ing: 'Shaking' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Flip', { ing: 'flipping' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Dig', { ing: 'digging' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Hug', { ing: 'Hugging', words: 'hug|embrace|cuddle' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('KnockOn', { defmsg: '{pv:item:be:true} not something Mandy can knock on.', words: 'knock on|knock up|knock|rap|rap on|tap|tap on' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Repair', { defmsg: '{pv:item:be:true} not broken.', words: 'fix|mend|repair|tighten' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('SetClock', { defmsg: true, words: 'set|reset|change' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('CallLift', { defmsg: true, words: 'call|summon' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('WindUp', { defmsg: "{pv:item:'be:true} not something you can wind up.", words: 'wind up|wind' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Kill', { defmsg: '{pv:item:be:true} is not something worth killing.', words: 'kill|slaughter|murder|attack' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('WaveAt', { defmsg: 'Mandy spends a few minutes waving at {nm:item:the}. Then wonders why she did.', words: 'wave at' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('Catch', { defmsg: 'Catching {nm:item:the} is not going to achieve much -- have you tried just taking it?' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerb' does not exist on type '{ re... Remove this comment to see the full error message
Quest.lang.createVerb('StareAt', { defmsg: 'Mandy stares at {nm:item:the} for a few minutes, not sure quite what she expects it to do.', words: 'stare at|stare' });

// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerbWith' does not exist on type '... Remove this comment to see the full error message
Quest.lang.createVerbWith('Open', { held: true });

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Rude', {
  objects: [],
  regex:   /^(?:fuck|shag|shit|crap|damn|wank|frig)/,
  script() {
    Quest.IO.parsermsg("Well, I <i>certainly</i> don't even know where to begin with <i>that</i>. Honestly, what were you thinking!");
    return Quest.World.world.FAILED;
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Xyzzy', {
  objects: [],
  regex:   /^(?:say |)xyzzy$/,
  script() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Mandy starts to hum "Story of life" while you try to work out what to do. Odd to think it is five years when that came out, she muses. She was just starting at Kyderbrook High, and she when she heard Marcy Dillons singing it, and found she was a fellow Directioner, they had become good friends.');
    return Quest.World.world.FAILED;
  },
}));
// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Dance', {
  objects: [],
  regex:   /^dance$/,
  script() {
    if (Quest.World.player.loc === 'stage') {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('Mandy dances across the stage for a few minutes, wondering what it would be like to be a professional dancer, watched by hundreds as you perform.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      if (Quest.World.w.clockwork_thespian.state > 0) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Not bad,' notes the clockwork thespian. 'Needs some practice, not to say some music of course, but I see the potential.'");
      }
      return Quest.World.world.SUCCESS;
    }
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Mandy starts to dance... Why is she dancing? It is like something -- or someone -- is controlling her! With a great effort of will power, she stops. She has to stand for a moment while she catches her breath. It was scary losing control of her body like that.');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    if (Quest.World.w.Patch.isHere()) Quest.IO.msg('Patch gives her a strange look.');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
    if (Quest.World.w.tiny_man.isHere()) Quest.IO.msg("'You're a rum 'un, and no mistake,' says the tiny man.");
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
    if (Quest.World.w.Winfield_Malewicz.isHere()) Quest.IO.msg("'The ways of young people were decidedly odd in my day,' says Malewicz. 'I see the situation has only deteriorated.'");
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    if (Quest.World.w.clockwork_thespian.isHere()) Quest.IO.msg("'Ah, the artistic soul,' muses the clockwork thespian.");

    return Quest.World.world.FAILED;
  },
}));
// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Sing', {
  objects: [
  ],
  regex: /^sing$/,
  script() {
    if (Quest.World.player.loc === 'stage') {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('Mandy looks around the stage thoughtfully. An ideal place to make her singing debut! She grabs an imaginary microphone, and starts singing {i:Give Me All Your Love}, tentatively at first, but then with gusto.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      if (Quest.World.w.clockwork_thespian.state > 0) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'I am not familiar with that work,' says the clockwork thespian. 'Is it supposed to sound like that?'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Of course!'");
      }
      return Quest.World.world.SUCCESS;
    }
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Mandy starts to sing "Steal my girl." She has not heard that for years, she muses, why did it pop into her head now?');

    return Quest.World.world.FAILED;
  },
}));
// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Act', {
  objects: [
  ],
  regex: /^act$/,
  script() {
    if (Quest.World.player.loc === 'stage') {
      let s = 'Ms Coulter says Shakespeare only really works on the stage, and here Mandy is standing on a stage. She takes out her book';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'shakespeare_book' does not exist on type... Remove this comment to see the full error message
      if (Quest.World.w.shakespeare_book.state === 0) {
        s         += '... Wait. This is not "Antony and Cleopatra". This is "Twelfth Night"! What has happened to "Antony and Cleopatra"? Ms Coulter will be furious. Then again, a book is a book.';
        this.state = 1;
      } else {
        s += ', now inexplicably \"Twelfth Night\".';
      }
      s += "|She starts to read... 'If music be the food of love, play on, Give me excess of it that, surfeiting, The appetite may sicken and so die.' She stops. 'Surfeiting the appetite? What the fuck does that mean?'";
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      if (Quest.World.w.clockwork_thespian.state > 0) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'It means Orsino wants to be rid for his appetite for love,' says the clockwork thespian, 'and he hopes music will allay it if he has a excess of it.'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Right...' Mandy quietly puts the book back in her bag.");
      }
      return Quest.World.world.SUCCESS;
    }
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Mandy has a sudden urge to act. She successfully resists it.');

    return Quest.World.world.FAILED;
  },
}));
// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Jump', {
  objects: [
  ],
  regexes: [
    /^jump$/,
    /^jump (?:off|from)(?: the catwalk| catwalk|)$/,
  ],
  script() {
    if (Quest.World.player.loc.startsWith('greenhouse_catwalk')) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('Mandy looks over the side of the catwalk, and has a sudden urge to jump down. She shudders. That would not end well.');
      return Quest.World.world.FAILED;
    }
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return Quest.IO.failedmsg('Mandy jumps into the air... and quickly returns to the ground. Had to be worth a try. It would be annoying to discover this was a dream and she could have just flown everywhere.');

    return Quest.World.world.FAILED;
  },
}));
// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Shout', {
  objects: [
  ],
  regex: /^(?:shout|yell|holler|cry out)$/,
  script() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'Hey!' shouts Mandy. 'Any one here?'");

    return Quest.World.world.FAILED;
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('ThrowAtPod', {
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],
  regexes: [
    /^(?:throw|lob|hurl) (.+) at (?:pods?|tree)$/,
    /^(?:hit|knock) (?:pods?|tree) with (.+)$/,
  ],
  responses: {
    boots:               'Mandy hurls the boots at the tree... Well, that general direction. They miss the tree altogether.',
    chamber_pot:         'Mandy hurls the chamber pot at the tree... Well, that general direction. It misses, falling with a huge clang.',
    floppy_hat:          'Mandy throws the floppy hat at the tree... it bounces off the pods, then tumbles gently to the ground.',
    glass_shard:         'Mandy lobs the glass shard at the pods on the tree. It bounces off one of them.',
    grating:             'Mandy the grating up at the pods on the tree... It misses, and comes cluttering to the ground.',
    large_key:           'Mandy lobs the key at the pods on the tree. It bounces off one of them.',
    letter:              'Mandy throws the letter at the tree... it gets about an arms length away, then flutters gently to the ground.',
    mad_science_journal: 'Mandy throws the journal at the tree... it gets about an arms length away, then flutters gently to the ground.',
    paper_funnel:        'Mandy throws the paper funnel at the tree... it gets about an arms length away, then flutters gently to the ground.',
    pen:                 'Mandy lobs her pen at the pods on the tree. It bounces off one of them.',
    secret_recipe:       'Mandy throws the sheet of paper at the tree... it gets about an arms length away, then flutters gently to the ground.',
    stuffed_crocodile:   'Mandy tries to throw the crocodile at the tree. Not the easiest thinhg to throw, she realises, as she misses the tree completely.',
    wooden_panel:        'A little worried her precious panel might be damaged, Mandy throws it up at the pods on the tree... It misses, and comes cluttering to the ground.',
  },
  script(objects: any) {
    // ts-error-fixed ts-migrate(2448) FIXME: Block-scoped variable 'obj' used before its declar... Remove this comment to see the full error message
    if (Quest.World.player.loc !== 'greenhouse_east' && Quest.World.player.loc !== 'greenhouse_catwalk_east') return Quest.IO.failedmsg('Mandy would have to be holding {nm:item:the} to do that.', { item: obj });

    const obj = objects[0][0];
    if (!obj.isHeld) return Quest.IO.failedmsg('Mandy would have to be holding {nm:item:the} to do that.', { item: obj });

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
    if (obj === Quest.World.w.mobile_phone) return Quest.IO.failedmsg('Mandy thinks about chucking her crappy phone at the pod, but if she does ever get out of here, she want a phone that is {i:not} smashed.');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'school_bag' does not exist on type '{}'.
    if (obj === Quest.World.w.school_bag) return Quest.IO.failedmsg('Mandy thinks about throwing her bag at the pod, but decides she should hang on to it.');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'hourglass' does not exist on type '{}'.
    if (obj === Quest.World.w.hourglass) return Quest.IO.failedmsg('Mandy thinks about throwing the hourglass at the pod... She has a feeling it might be important, and is unlikely to survive its arboreal journey.');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
    if (obj === Quest.World.w.china_doll) return Quest.IO.failedmsg('Mandy thinks about throwing the china doll at the pod... Somehow she cannot bring herself to do it - seeing her smash would be too awful');
    if (obj.size && obj.size > 5) return Quest.IO.failedmsg('Mandy thinks about hurling {nm:item:the} at the tree. Perhaps if {pv:item:was} not so big...', { item: obj });

    const s = this.responses[obj.name];
    if (!s) return Quest.IO.failedmsg('Mandy thinks about throwing {nm:item:the} at the pod, but decides she should hang on to {sb:item}.', { item: obj });

    Quest.World.player.throwAtPodTries++;
    obj.moveToFrom({ char: Quest.World.player, item: obj }, 'greenhouse_east');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return Quest.IO.failedmsg(`${s}{ifMoreThan:player:throwAtPodTries:2:She starts to wonder if chucking things at the pod is going to work. Perhaps she needs another idea.}`);
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('TurnWithOar', {
  attName: 'turn',
  defmsg:  'Touching {nm:item:the} is not going to achieve much.',
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'turn', scope: Quest.Parser.parser.isHere },
  ],
  regexes: [
    /^(?:turn|shift|rotate|move) (.+) (?:with|using) oar$/,
    /^use oar to (?:turn|shift|rotate|move) (.+)$/,
  ],
}));

/*
Quest.Commands.commands.unshift(new Quest.Command.Cmd('OpenWith', {
  regexes:[
    /^(?:open|remove|get) (.+) (?:with|using) (.+)$/,
    {regex:/^use (.+) to (?:open|remove|get) (.+)$/, mod:{reverse:true}},
  ],
  objects:[
    {scope:Quest.Parser.parser.isHere, items:['grating']},
    {scope:Quest.Parser.parser.isHeld},
  ],
  script(objects) {
    if (objects[0][0] === Quest.World.w.grating) return Quest.World.w.grating.openWith(objects[1][0]) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED
    if (objects[0][0].name.startsWith('tamarind_pod')) return objects[0][0].openWith(objects[1][0]) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED
    return Quest.IO.falsemsg("That is not something Mandy can open like that.")
  }
})) */

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('GrindUnderHeel', {
  attName: 'grind',
  defmsg:  'Grinding {nm:item:the} is not going to achieve much.',
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],
  regexes: [
    /^(?:grind) (.+?) (?:under|into) (?:heel|your heel|foot|your foot|ground|the ground)$/,
    /^(?:grind) (.+?)$/,
  ],
}));

const helpStrs1 = ['help', 'lift', 'boost'];
const helpStrs2 = ['help *climb', 'give *leg up', 'give *boost'];
let helpStr     = `${helpStrs1.join('|')}|${helpStrs1.join(' me|')} me|${helpStrs1.join(' mandy|')} mandy`;
for (const s of helpStrs2) {
  helpStr += `|${s.replace('*', '')}`;
  helpStr += `|${s.replace('*', 'me ')}`;
  helpStr += `|${s.replace('*', 'mandy ')}`;
}

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('NpcHelp', {
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
  ],
  regexes: [
    new RegExp(`^(.+), ?(?:${helpStr})$`),
    new RegExp(`^(?:tell|ask|instruct) (.+) to (?:${helpStr})$`),
  ],
  script(objects: any) {
    const obj = objects[0][0];
    if (!obj.npc) return Quest.IO.falsemsg("'Give me a hand, here,' says Mandy to {nm:item:the}. {pv:item:do:true} not do anything.", { item: obj });
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    if (obj !== Quest.World.w.Patch) return Quest.IO.falsemsg("'Give me a hand, here,' says Mandy to {nm:item:the}.|'What do you think I can do?' {pv:item:say:true}. Mandy shrugs, not sure herself.", { item: obj });

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'Give me a hand, here,' says Mandy to Patch. He looks at her in confusion.");
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
    if (Quest.World.currentLocation.name === 'greenhouse_east' || (Quest.World.currentLocation.name === 'greenhouse_west' && Quest.World.w.grown_tamarind_tree.growthTime > 8))
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    {
      Quest.IO.msg('Okay, so he is not so bright, but if she was more specific... She cannot just climb up him, but what if he was hugging the tree? Could she then climb the tree?');
    }
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Plant', {
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],
  regexes: [
    /^(?:plant|bury) (.+) in (?:earth|ground|soil|bare earth|bare ground)$/,
    /^(?:plant|bury) (.+)$/,
  ],
  script(objects: any) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (Quest.World.player.loc !== 'greenhouse_west') return Quest.IO.failedmsg('There is no where for Mandy to plant anything here.');
    const obj = objects[0][0];
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (obj.name.startsWith('tamarind_pod_prototype')) return Quest.IO.failedmsg('Mandy thinks about burying the pod, but she is pretty sure her dad would take the seeds out first, and plant them, rather than the pods.');
    if (obj !== Quest.World.w.tamarind_seed) return Quest.IO.failedmsg("{pv:item:'be:true} not something Mandy really wants to bury.", { item: obj });

    objects.push([Quest.World.w.bare_earth]);
    return handleInOutContainer(Quest.World.player, objects, 'drop', handleSingleDropInContainer);
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Shift', {
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],
  regex: /^(?:shift|move) (.+)$/,
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    const obj      = objects[0][0];
    const tpParams = { char: Quest.World.player, item: obj };

    if (!obj.shiftable && obj.takeable) return Quest.IO.failedmsg(Quest.lang.take_not_push, tpParams);
    if (!obj.shiftable) return Quest.IO.failedmsg(Quest.lang.cannot_push, tpParams);

    return obj.shift() ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Invert', {
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { attName: 'turn', scope: Quest.Parser.parser.isPresent },
  ],
  regexes: [
    /^(?:invert|turn over) (.+)$/,
    /^turn (.+) over$/,
  ],
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    const obj = objects[0][0];
    if (!obj.turn) return Quest.IO.failedmsg('Mandy thinks about turning {nm:item:the} upside-down, but decides it is fine the way it is.', { item: obj });
    return obj.turn() ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('BurstBalloon', {

  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],

  regexes: [
    /^use (.+) to (?:burst|break|cut|puncture|pierce|stab|pop) (.+)$/,
    { mod: { reverse: true }, regex: /(?:burst|break|cut|puncture|pierce|stab|pop) (.+) (?:with|using) (.+)/ },
  ],
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isHeld],
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!objects[0][0].sharp) return Quest.IO.failedmsg("Mandy's not going to pierce anything with that!");
    if (objects[1][0].name.startsWith('tamarind_pod_prototype')) return objects[1][0].open(false, Quest.World.player);
    // any other objects that are cuttable???
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'yellow_balloon' does not exist on type '... Remove this comment to see the full error message
    if (objects[1][0] === Quest.World.w.yellow_balloon) return Quest.World.w.yellow_balloon.burst() ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;

    return Quest.IO.failedmsg('Mandy takes a few stabs at {nm:item:the} with {nm:item2:the}, but does not achieve anything', { item: objects[1][0], item2: objects[0][0] });
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('BurstBalloonOnly', {
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { attName: 'burst', scope: Quest.Parser.parser.isPresent },
  ],
  regex: /^(?:burst|break|cut|puncture|pierce|stab|pop) (.+?)$/,
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    const obj = objects[0][0];
    // if (obj.name.startsWith('tamarind_pod_prototype')) return obj.open() ? Quest.World.world.SUCCESS: Quest.World.world.FAILED
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'yellow_balloon' does not exist on type '... Remove this comment to see the full error message
    if (obj === Quest.World.w.yellow_balloon) return Quest.World.w.yellow_balloon.burst() ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
    if (obj.smash) return objects[0][0].smash({ char: Quest.World.player, item: obj }) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;

    return Quest.IO.failedmsg('Mandy takes a few stabs at {nm:item:the}, but does not achieve anything', { item: obj });
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('WakeUp', {
  objects: [
  ],
  regex: /^(?:wake|wake up|awaken)$/,
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return Quest.IO.failedmsg('This must be a dream, thinks Mandy. Like Alice in Wonderland, she will wake up in a shower of playing cards or something; she cannot quite remember how that ended. She pinches herself, but nothing happens, other than a painful sensation in her arm. Damn.');
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Fly', {
  objects: [
  ],
  regex: /^(?:try to fly|fly)$/,
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return Quest.IO.failedmsg('Mandy jumps into the air... and quickly returns to the ground. Had to be worth a try. It would be annoying to discover this was a dream and she could have just flown everywhere.');
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('ConfrontFears', {
  objects: [
  ],
  regex: /^confront (?:her |your |my |)fears?$/,
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    if (Quest.World.currentLocation.zone === 'external') {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('{i:Right,} thinks Mandy, {i:I can do this. All I have to do is go in the house, and hand over the letter.} She looks at the house again, trying to convince herself it is not laughing at her.');
    } else if (Quest.World.currentLocation.name === 'lounge') {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('{i:I did it,} thinks Mandy, {i:I confronted my fears, and solved a mystery over a century old.}.');
    } else {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('Mandy takes a deep calming breath. She must not let the horror of this place get to her. It is not even {i:that} horrid, if she is honest. It is not like it is full of spiders or even werewolves. It is not even that dirty.');
    }
    return Quest.World.world.SUCCESS;
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('PhoneAFriend', {
  objects: [
  ],
  regex: /^(?:phone|call) (?:someone|a friend|friend|police|cops|parents|her parents)$/,
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
    Quest.World.w.mobile_phone.use();
    return Quest.World.world.FAILED;
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('PutUnder', {
  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { items: ['chamber_pot'], scope: Quest.Parser.parser.isHeld },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { items: ['leaking_pipe', 'tamarind_tree_from_ground'], scope: Quest.Parser.parser.isPresent },
  ],

  regex: /^(?:put|place|drop) (.+) (?:under|beneath|below) (.+)$/,
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
  rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
  script(objects) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'leaking_pipe' does not exist on type '{}... Remove this comment to see the full error message
    if (objects[1][0] === Quest.World.w.leaking_pipe) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (objects[0][0] !== Quest.World.w.chamber_pot) return Quest.IO.falsemsg('Mandy thinks about putting {nm:item:the} under the leak... Then again, {pv:item:will} just get wet, so maybe not such a good idea.', { item: objects[0][0] });
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.chamber_pot.containedFluidName) return Quest.IO.falsemsg(`The chamber pot is already full of ${Quest.World.w.chamber_pot.containedFluidName} - there is not much point using it to catch drips.`);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('Mandy puts the chamber pot under the leaking pipe, when it will catch the drips.|Drip... drip... drip... It will take a while before the pot is full!');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.loc = Quest.World.player.loc;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.underLeakState = 1;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.underLeak = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.flipped = false;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.scenery = true;
      return Quest.World.world.SUCCESS;
    }

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'tamarind_tree_from_ground' does not exis... Remove this comment to see the full error message
    if (objects[1][0] === Quest.World.w.tamarind_tree_from_ground) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (objects[0][0] !== Quest.World.w.chamber_pot) return Quest.IO.falsemsg('Mandy thinks about putting {nm:item:the} under the tamarind tree... but decides that is not going to achieve anything.', { item: objects[0][0] });
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('Mandy puts the chamber pot under the tamarind tree - hopefully any falling pods will end up in there.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.loc = Quest.World.player.loc;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.underTree = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.flipped = false;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.scenery = true;
      return Quest.World.world.SUCCESS;
    }
    return Quest.IO.falsemsg('Putting stuff under {nm:item:the} is not going to achieve anything.', { item: objects[1][0] });
  },
}));

Quest.Command.findCmd('Smell').script = function () {
  if (Quest.World.currentLocation.smell) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    Quest.Utilities.printOrRun(Quest.World.player, Quest.World.currentLocation, 'smell');
  } else {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(zones[Quest.World.currentLocation.zone].smell);
  }
  return Quest.World.world.SUCCESS;
};

Quest.Command.findCmd('Listen').script = function () {
  if (Quest.World.currentLocation.listen) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    Quest.Utilities.printOrRun(Quest.World.player, Quest.World.currentLocation, 'listen');
  } else {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(zones[Quest.World.currentLocation.zone].listen);
  }
  return Quest.World.world.SUCCESS;
};

// ts-error-fixed ts-migrate(7006) FIXME: Parameter 'objects' implicitly has an 'any' type.
Quest.Command.findCmd('Say').script = function (objects) {
  const text = objects[1];
  if (Quest.World.currentLocation.name === 'theatre_stage') {
    if (text.match(/\bto be\b/)) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'To be or not to be,' says Mandy in a grand voice. She always wanted to be an actor... Well, not enough to take drama at school, but she liked the idea of being one. It was a shame she could not remember any more of the quote. Something about a question?");
    } else if (text.match(/\bbrevity\b/)) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      if (Quest.World.w.clockwork_thespian.state === 101) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
        Quest.World.w.clockwork_thespian.brevity();
        return Quest.World.world.SUCCESS;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      if (Quest.World.w.clockwork_thespian.state > 101) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'It's brevity,' says Mandy triumphantly. 'The answer to your riddle is \"Brevity\"!'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Indeed it is, but I'm afraid I cannot help you every time you say the word.'");
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      if (Quest.World.w.clockwork_thespian.state < 101 && Quest.World.w.clockwork_thespian.state > 0) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy mutters under her breath.');
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'What was that?' asks the clockwork thespian.");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Oh, nothing, just thinking to myself.' {i:I really need to find that book,} she thinks, {i:and solve his stupid riddle for myself.}");
      }
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (Quest.World.w.clockwork_thespian.state > 0) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}' out loud.`);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Is that from a play?' asks the clockwork thespian. 'I am not immediately familiar with it, but have at it, darling, have at it!'");
    } else {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}' out loud, then wonders why she is talking to herself.`);
    }
    return Quest.World.world.FAILED;
  }

  if (Quest.World.currentLocation.name === 'nursery') {
    if (text.match(/hello|hi/)) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}.'|'Alright?' says the tiny man in reply. She wonders if she should ask the man about something if she wants to get anywhere.`);
    } else {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}.' The tiny man looks at her in confusion. She wonders if she should ask the man about something if she wants to get anywhere.`);
    }
    return Quest.World.world.FAILED;
  }

  if (Quest.World.currentLocation.name === 'steam_control_room') {
    if (text.match(/hello|hi/)) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}.'|'Hello to you, miss' says Dr Malewicz. She wonders if she should ask him about something if she wants to get anywhere.`);
    } else {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}.'|'I'm not sure I follow,' says Dr Malewicz. She wonders if she should ask him about something if she wants to get anywhere.`);
    }
    return Quest.World.world.FAILED;
  }

  if (Quest.World.currentLocation.name === 'weird_room') {
    if (text.match(/\b(one|1|1d)\b/)) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.Winfield_Malewicz.songlist.length === 0) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("Mandy thinks about what makes her special. Then looks at her bag. Her {i:One Direction} bag. 'One Direction?' she says, tentatively.");
      } else {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
        const uniq = [...new Set(Quest.World.w.Winfield_Malewicz.songlist)];
        let s      = 'Mandy thinks about what makes her special. Then looks at her bag. Her {i:One Direction} bag. And then there were some of the things Dr Malewicz had said, like ';
        s         += Quest.Utilities.formatList(uniq.map((el) => `{class:riddle:${el}}`), { lastJoiner: 'and' });
        s         += ". Had he been channelling the answer in some way?|'One Direction?' she says, tentatively.";
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(s);
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The scornful face of the man-house darkens in anger for a moment, before he collapses before her eyes in a shower of tiny bricks. For a moment nothing happens, but then the bricks start swirling around, rebuilding the figure. 'Oh, God, not again,' mutters Mandy. But the man-house thing looks different. He is no longer laughing at her.");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'{smallcaps:Thank you,}' he says, even as he slowly fades away. '{smallcaps:You saved me. I must apologise for my earlier behaviour; I was not quite myself.}'");
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.Winfield_Malewicz.loc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'What..?' says Mandy, feeling utterly bewildered...");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
        Quest.World.w.Winfield_Malewicz.loc = 'lounge';
      }
      Quest.World.player.loc = 'lounge';
      Quest.World.world.update();
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      Quest.World.world.enterRoom();
      return Quest.World.world.SUCCESS;
    }
    if (text.match(/north|south|east|west/)) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}.'|'{smallcaps:Wrong!}' says the house, gleefully.`);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.Winfield_Malewicz.compassTried && Quest.World.w.Winfield_Malewicz.loc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'You think I somehow forgot that one?' says Dr Malewicz testily.");
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      else if (Quest.World.w.Winfield_Malewicz.nonCompassTried && Quest.World.w.Winfield_Malewicz.loc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Yes, and I've tried all the compass directions too,' says Dr Malewicz.");
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      else if (Quest.World.w.Winfield_Malewicz.loc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Yes, yes, I've tried all the compass directions,' says Dr Malewicz. 'It's nothing as obvious as that I'm afraid.'");
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      Quest.World.w.Winfield_Malewicz.compassTried = true;
    } else if (text.match(/in|out|up|down|exit|enter|left|right|forward|back/)) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}.'|'{smallcaps:Wrong!}' says the house, gleefully.`);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.Winfield_Malewicz.nonCompassTried && Quest.World.w.Winfield_Malewicz.loc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'You think I somehow forgot that one?' says Dr Malewicz testily.");
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      else if (Quest.World.w.Winfield_Malewicz.compassTried && Quest.World.w.Winfield_Malewicz.loc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Yes, and I've tried all the non-compass directions too,' says Dr Malewicz.");
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      else if (Quest.World.w.Winfield_Malewicz.loc) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Yes, yes, I've tried all the up-and-down, and in-and-out directions,' says Dr Malewicz. 'It's nothing as obvious as that I'm afraid.'");
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      Quest.World.w.Winfield_Malewicz.nonCompassTried = true;
    } else {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`Mandy says '${text}.'|'{smallcaps:Wrong!}' says the house, gleefully.`);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      if (Quest.World.w.Winfield_Malewicz.loc) Quest.IO.msg("'I'm not sure I follow your reasoning,' says Dr Malewicz. 'Is that a direction?'");
    }
    return Quest.World.world.SUCCESS;
  }

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
  if (Quest.World.w.Patch.loc === Quest.World.player.loc) {
    if (text.match(/hello|hi/)) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(`Mandy says '${text}.' {nv:npc:nod:true} at her. Clearly he is not much of a conversationalist; she might do better to tell him to do something useful.`, { npc: Quest.World.w.Patch });
    } else {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(`Mandy says '${text}.' {nv:npc:look:true} at her in confusion. Clearly he is not much of a conversationalist; she might do better to tell him to do something useful.`, { npc: Quest.World.w.Patch });
    }
    return Quest.World.world.FAILED;
  }

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg(`Mandy says '${text}' out loud, then wonders why she is talking to herself.`);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
  if (Quest.World.w.tiny_man.isHere()) Quest.IO.msg("'You're a rum 'un, and no mistake,' says the tiny man.");
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
  if (Quest.World.w.Winfield_Malewicz.isHere()) Quest.IO.msg("'The ways of young people were decidedly odd in my day,' says Malewicz. 'I see the situation has only deteriorated.'");
  return Quest.World.world.FAILED;
};
