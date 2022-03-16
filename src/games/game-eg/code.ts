// ts-error-fixed ts-migrate(2339) FIXME: Property 'create' does not exist on type '{ INITIA... Remove this comment to see the full error message
Quest.quest.create('A carrot for Buddy', [
  { text: 'Go find a carrot.' },
  { text: 'Give the carrot to Buddy.' },
]);

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('TestInput', {
  npcCmd: true,

  regex: /^inp/,
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  script() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('First some preamble...');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
    Quest.IO.showMenu('What colour?', [Quest.World.w.book, Quest.World.w.coin, Quest.World.w.Kyle, 'None of them'], (result: any) => {
      if (typeof result === 'string') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(`You picked ${result}.`);
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(`You picked ${Quest.lang.getName(result, { article: Quest.Utilities.DEFINITE })}.`);
      }
    });
    /*    Quest.IO.askText("What colour?", function(result) {
          Quest.IO.msg("You picked " + result + ".");
          Quest.IO.showYesNoMenu("Are you sure?", function(result) {
            Quest.IO.msg("You said " + result + ".")
          })
        }) */
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('TextReveal', {
  regex: /^reveal$/,
  script() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('More');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'unscrambleEffect' does not exist on type... Remove this comment to see the full error message
    Quest.IO.msg('The characters will appear randomly from dots.', {}, {
      action: 'effect',
      effect: Quest.IO.io.unscrambleEffect,
      pick() {
        return '.';
      },
      randomPlacing: true,
      tag:           'p',
    });
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    Quest.IO.wait();
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'typewriterEffect' does not exist on type... Remove this comment to see the full error message
    Quest.IO.msg('Or appears as though typed.', {}, { action: 'effect', effect: Quest.IO.io.typewriterEffect, tag: 'p' });
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'unscrambleEffect' does not exist on type... Remove this comment to see the full error message
    Quest.IO.msg('The real message is revealed!!', {}, {
      action:    'effect',
      effect:    Quest.IO.io.unscrambleEffect,
      incSpaces: true,
      pick(i: any) {
        return 'At first this message is shown'.charAt(i);
      },
      randomPlacing: true,
      tag:           'pre',
    });
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    Quest.IO.wait();
    Quest.IO.clearScreen();
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some more text.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    Quest.IO.wait(3, 'Wait three seconds...');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('... and done!');/**/
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Image', {
  regex: /^img$/,
  script() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some more text.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.picture('favicon.png');
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Audio', {
  regex: /^beep$/,
  script() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Can you hear this?');
    Quest.IO.sound('hrn06.wav');
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Alpha', {
  regex: /^alpha$/,
  script() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Greek: {encode:391:3AC:The quick brown fox jumped over the lazy dog}.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Cyrillic: {encode:402:431:The quick brown fox jumped over the lazy dog}.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Armenian {encode:531:561:The quick brown fox jumped over the lazy dog}.');

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Devanagari: {encode:904:904:The quick brown fox jumped over the lazy dog}.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Thai {encode:E01:E01:The quick brown fox jumped over the lazy dog}.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Tibetan {encode:F20:F20:The quick brown fox jumped over the lazy dog}.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Khmer {encode:1780:1780:The quick brown fox jumped over the lazy dog}.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Javan {encode:A985:A985:The quick brown fox jumped over the lazy dog}.');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg('Some text in Nko {encode:7C1:7C1:The quick brown fox jumped over the lazy dog}.');
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('DialogTest', {
  npcCmd:  true,
  objects: [
    { special: 'text' },
  ],
  regex: /^(?:dialog) (.*)$/,
  script(objects: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    const funcName = Quest.Parser.parser.currentCommand.tmp.string.replace(/dialog /i, '');
    console.log(`Testing dialog: ${funcName}`);
    const choices = ['red', 'yellow', 'blue'];
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    Quest.IO.io.menuFunctions[funcName]('Pick a colour?', choices, (result: any) => {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`You picked ${result}`);
    });
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('TextTest', {
  npcCmd:  true,
  objects: [
  ],
  regex: /^(?:text)$/,
  script(objects: any) {
    Quest.IO.askDiag('What colour?', (result: any) => {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`You picked ${result}.`);
    }, 'Go');
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
  },
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('EgKick', {
  defmsg: '{pv:char:kick:true} {ob:item}, but nothing happens.',

  npcCmd: true,

  objects: [
    { special: 'ignore' },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isPresent },
  ],

  regex: /^(kick) (.+)$/,
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('EgCharge', {
  defmsg: "{pv:item:'be:true} not something you can charge.",

  npcCmd: true,

  objects: [
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],

  regex: /^(?:charge|power) (.+)$/,
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isHeld],
}));

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('EgMove', {
  defmsg: "{pv:item:'be:true} not something you can move.",

  npcCmd: true,

  objects: [
    { special: 'ignore' },
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere },
  ],

  regex: /^(move) (.+)$/,
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
}));

Quest.Command.findCmd('MetaHint').script = function () {
// ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (Quest.World.w[Quest.World.player.loc].hint) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(Quest.World.w[Quest.World.player.loc].hint);
  } else {
    return Quest.lang.hintScript();
  }
};

const clues = [
  {
    clues: [
      'What is the lamp for?',
      'What happens if you rub the lamp?',
      'Rub the lamp, and ask the genie.',
    ],
    question: 'How do I get the hat?',
  },
  {
    clues: [
      'In the lounge, where you started.',
    ],
    question: 'Where is the bear?',
  },
];

// How to save???
Quest.Command.findCmd('MetaHint').script = function () {
  for (const clue of clues) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ questio... Remove this comment to see the full error message
    if (clue.count === undefined) clue.count = 0;
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(clue.question);
    for (let i = 0; i < clue.clues.length; i++) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ questio... Remove this comment to see the full error message
      if (i < clue.count) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg(clue.clues[i]);
      } else {
        // hidden!!!
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg(clue.clues[i]);
      }
    }
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('charger_state', () => {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
  if (Quest.World.w.charger_compartment.closed) {
    return 'The compartment is closed';
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
  const contents = Quest.World.w.charger_compartment.getContents(Quest.World.world.LOOK);
  if (contents.length === 0) {
    return 'The compartment is empty';
  }
  return `The compartment contains ${Quest.Utilities.formatList(contents, { article: Quest.Utilities.INDEFINITE })}`;
});

// ts-error-fixed ts-migrate(2339) FIXME: Property 'createVerbWith' does not exist on type '... Remove this comment to see the full error message
Quest.lang.createVerbWith('Slice', { held: true, ing: 'Slicing' });

/*
// This is not a properly written command, it is just to test the item order can be reversed.
Quest.Commands.commands.unshift(new Quest.Command.Cmd('SliceCarrot', {
  rules:[Quest.Command.cmdRules.isHeld],
  regexes:[/^use (.+) to slice (.+)$/, /^use (.+) slice (.+)$/, {regex:/slice (.+) with (.+)/, mod:{reverse:true}}],
  objects:[
    {scope:Quest.Parser.parser.isPresent},
    {scope:Quest.Parser.parser.isPresent},
  ],
  script:function(objects) {
    Quest.IO.msg("You slice {nm:ob1:the} with {nm:ob2:the}.", {ob1:objects[1][0], ob2:objects[0][0]})
    return Quest.World.world.SUCCESS
  },
  defmsg:"Not going to happen.",
})); */
