"use strict";






// @ts-expect-error ts-migrate(2339) FIXME: Property 'create' does not exist on type '{ INITIA... Remove this comment to see the full error message
quest.create('A carrot for Buddy', [
  { text: 'Go find a carrot.' },
  { text: 'Give the carrot to Buddy.' },
])










// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('TestInput', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  regex: /^inp/,
  script: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("First some preamble...")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
    Quest.IO.showMenu("What colour?", [Quest.World.w.book, Quest.World.w.coin, Quest.World.w.Kyle, 'None of them'], function (result: any) {
      if (typeof result === 'string') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("You picked " + result + ".");
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("You picked " + Quest.lang.getName(result, { article: Quest.Utilities.DEFINITE }) + ".");
      }
    })
    /*    Quest.IO.askText("What colour?", function(result) {
          Quest.IO.msg("You picked " + result + ".");
          Quest.IO.showYesNoMenu("Are you sure?", function(result) {
            Quest.IO.msg("You said " + result + ".")
          })
        })*/
  }
}));



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('TextReveal', {
  regex: /^reveal$/,
  script: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("More")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'unscrambleEffect' does not exist on type... Remove this comment to see the full error message
    Quest.IO.msg("The characters will appear randomly from dots.", {}, { action: 'effect', tag: 'p', effect: Quest.IO.io.unscrambleEffect, randomPlacing: true, pick: function () { return '.' } })
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    Quest.IO.wait()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'typewriterEffect' does not exist on type... Remove this comment to see the full error message
    Quest.IO.msg("Or appears as though typed.", {}, { action: 'effect', tag: 'p', effect: Quest.IO.io.typewriterEffect })
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'unscrambleEffect' does not exist on type... Remove this comment to see the full error message
    Quest.IO.msg("The real message is revealed!!", {}, { action: 'effect', tag: 'pre', effect: Quest.IO.io.unscrambleEffect, randomPlacing: true, incSpaces: true, pick: function (i: any) { return 'At first this message is shown'.charAt(i) } })
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    Quest.IO.wait()
    Quest.IO.clearScreen()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some more text.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    Quest.IO.wait(3, "Wait three seconds...")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("... and done!")/**/
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Image', {
  regex: /^img$/,
  script: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some more text.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.picture('favicon.png')
  },
}));

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Audio', {
  regex: /^beep$/,
  script: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Can you hear this?")
    Quest.IO.sound('hrn06.wav')
  },
}));




// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Alpha', {
  regex: /^alpha$/,
  script: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Greek: {encode:391:3AC:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Cyrillic: {encode:402:431:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Armenian {encode:531:561:The quick brown fox jumped over the lazy dog}.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Devanagari: {encode:904:904:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Thai {encode:E01:E01:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Tibetan {encode:F20:F20:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Khmer {encode:1780:1780:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Javan {encode:A985:A985:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Some text in Nko {encode:7C1:7C1:The quick brown fox jumped over the lazy dog}.")
  },
}));




// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('DialogTest', {
  npcCmd: true,
  regex: /^(?:dialog) (.*)$/,
  objects: [
    { special: 'text' },
  ],
  script: function (objects: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    const funcName = Quest.Parser.parser.currentCommand.tmp.string.replace(/dialog /i, '')
    console.log("Testing dialog: " + funcName)
    const choices = ['red', 'yellow', 'blue']
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    Quest.IO.io.menuFunctions[funcName]('Pick a colour?', choices, function (result: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("You picked " + result)
    })
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS
  },
}))



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('TextTest', {
  npcCmd: true,
  regex: /^(?:text)$/,
  objects: [
  ],
  script: function (objects: any) {
    Quest.IO.askDiag("What colour?", function (result: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("You picked " + result + ".");
    }, "Go")
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS
  },
}))




// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('EgKick', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  regex: /^(kick) (.+)$/,
  objects: [
    { special: 'ignore' },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isPresent }
  ],
  defmsg: "{pv:char:kick:true} {ob:item}, but nothing happens.",
}));



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('EgCharge', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isHeld],
  regex: /^(?:charge|power) (.+)$/,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld }
  ],
  defmsg: "{pv:item:'be:true} not something you can charge.",
}))


// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('EgMove', {
  npcCmd: true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules: [Quest.Command.cmdRules.isPresent],
  regex: /^(move) (.+)$/,
  objects: [
    { special: 'ignore' },
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHere }
  ],
  defmsg: "{pv:item:'be:true} not something you can move.",
}));

Quest.Command.findCmd('MetaHint').script = function () {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (Quest.World.w[Quest.World.player.loc].hint) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(Quest.World.w[Quest.World.player.loc].hint);
  }
  else {
    return Quest.lang.hintScript()
  }
}



const clues = [
  {
    question: 'How do I get the hat?',
    clues: [
      'What is the lamp for?',
      'What happens if you rub the lamp?',
      'Rub the lamp, and ask the genie.',
    ],
  },
  {
    question: 'Where is the bear?',
    clues: [
      'In the lounge, where you started.',
    ],
  },
]


// How to save???
Quest.Command.findCmd('MetaHint').script = function () {
  for (let clue of clues) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ questio... Remove this comment to see the full error message
    if (clue.count === undefined) clue.count = 0
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(clue.question)
    for (let i = 0; i < clue.clues.length; i++) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ questio... Remove this comment to see the full error message
      if (i < clue.count) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg(clue.clues[i])
      }
      else {
        // hidden!!!
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg(clue.clues[i])
      }
    }
  }
}







// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective("charger_state", function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
  if (Quest.World.w.charger_compartment.closed) {
    return "The compartment is closed";
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
  const contents = Quest.World.w.charger_compartment.getContents(Quest.World.world.LOOK);
  if (contents.length === 0) {
    return "The compartment is empty";
  }
  return "The compartment contains " + Quest.Utilities.formatList(contents, { article: Quest.Utilities.INDEFINITE });
});



// @ts-expect-error ts-migrate(2339) FIXME: Property 'createVerbWith' does not exist on type '... Remove this comment to see the full error message
Quest.lang.createVerbWith("Slice", { held: true, ing: 'Slicing' })

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
}));*/