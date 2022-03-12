"use strict";






// @ts-expect-error ts-migrate(2339) FIXME: Property 'create' does not exist on type '{ INITIA... Remove this comment to see the full error message
quest.create('A carrot for Buddy', [
  {text:'Go find a carrot.'},
  {text:'Give the carrot to Buddy.'},
])










// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(new Cmd('TestInput', {
  npcCmd:true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules:[cmdRules.isPresent],
  regex:/^inp/,
  script:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("First some preamble...")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
    showMenu("What colour?", [w.book, w.coin, w.Kyle, 'None of them'], function(result: any) {
      if (typeof result === 'string') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("You picked " + result + ".");
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("You picked " + lang.getName(result, {article:DEFINITE}) + ".");
      }
    })
/*    askText("What colour?", function(result) {
      msg("You picked " + result + ".");
      showYesNoMenu("Are you sure?", function(result) {
        msg("You said " + result + ".")
      })
    })*/
  }
}));



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(  new Cmd('TextReveal', {
  regex:/^reveal$/,
  script:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("More")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'unscrambleEffect' does not exist on type... Remove this comment to see the full error message
    _msg("The characters will appear randomly from dots.", {}, {action:'effect', tag:'p', effect:io.unscrambleEffect, randomPlacing:true, pick:function() {return '.' }})
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    wait()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'typewriterEffect' does not exist on type... Remove this comment to see the full error message
    _msg("Or appears as though typed.", {}, {action:'effect', tag:'p', effect:io.typewriterEffect})
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'unscrambleEffect' does not exist on type... Remove this comment to see the full error message
    _msg("The real message is revealed!!", {}, {action:'effect', tag:'pre', effect:io.unscrambleEffect, randomPlacing:true, incSpaces:true, pick:function(i: any) {return 'At first this message is shown'.charAt(i) }})
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
    wait()
    clearScreen()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some more text.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    wait(3, "Wait three seconds...")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("... and done!")/**/
  },
}));
  
// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(  new Cmd('Image', {
  regex:/^img$/,
  script:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some more text.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    picture('favicon.png')
  },
}));
  
// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(  new Cmd('Audio', {
  regex:/^beep$/,
  script:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Can you hear this?")
    sound('hrn06.wav')
  },
}));
  



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(  new Cmd('Alpha', {
  regex:/^alpha$/,
  script:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Greek: {encode:391:3AC:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Cyrillic: {encode:402:431:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Armenian {encode:531:561:The quick brown fox jumped over the lazy dog}.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Devanagari: {encode:904:904:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Thai {encode:E01:E01:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Tibetan {encode:F20:F20:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Khmer {encode:1780:1780:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Javan {encode:A985:A985:The quick brown fox jumped over the lazy dog}.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Some text in Nko {encode:7C1:7C1:The quick brown fox jumped over the lazy dog}.")
  },
}));




// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(new Cmd('DialogTest', {
  npcCmd:true,
  regex:/^(?:dialog) (.*)$/,
  objects:[
    {special:'text'},
  ],
  script:function(objects: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    const funcName = parser.currentCommand.tmp.string.replace(/dialog /i, '')
    console.log("Testing dialog: " + funcName)
    const choices = ['red', 'yellow', 'blue']
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    io.menuFunctions[funcName]('Pick a colour?', choices, function(result: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You picked " + result)
    })
    return world.SUCCESS_NO_TURNSCRIPTS
  },
}))



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(new Cmd('TextTest', {
  npcCmd:true,
  regex:/^(?:text)$/,
  objects:[
  ],
  script:function(objects: any) {
    askDiag("What colour?", function(result: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You picked " + result + ".");
    }, "Go")
    return world.SUCCESS_NO_TURNSCRIPTS
  },
}))




// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(new Cmd('EgKick', {
  npcCmd:true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules:[cmdRules.isPresent],
  regex:/^(kick) (.+)$/,
  objects:[
    {special:'ignore'},
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    {scope:parser.isPresent}
  ],
  defmsg:"{pv:char:kick:true} {ob:item}, but nothing happens.",
}));



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(new Cmd('EgCharge', {
  npcCmd:true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
  rules:[cmdRules.isHeld],
  regex:/^(?:charge|power) (.+)$/,
  objects:[
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    {scope:parser.isHeld}
  ],
  defmsg:"{pv:item:'be:true} not something you can charge.",
}))


// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(new Cmd('EgMove', {
  npcCmd:true,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
  rules:[cmdRules.isPresent],
  regex:/^(move) (.+)$/,
  objects:[
    {special:'ignore'},
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    {scope:parser.isHere}
  ],
  defmsg:"{pv:item:'be:true} not something you can move.",
}));

findCmd('MetaHint').script = function() {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (w[player.loc].hint) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(w[player.loc].hint);
  }
  else {
    return lang.hintScript()
  }
}
  


const clues = [
  {
    question:'How do I get the hat?',
    clues: [
      'What is the lamp for?',
      'What happens if you rub the lamp?',
      'Rub the lamp, and ask the genie.',
    ],
  },
  {
    question:'Where is the bear?',
    clues: [
      'In the lounge, where you started.',
    ],
  },
]


// How to save???
findCmd('MetaHint').script = function() {
  for (let clue of clues) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ questio... Remove this comment to see the full error message
    if (clue.count === undefined) clue.count = 0
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(clue.question)
    for (let i = 0; i < clue.clues.length; i++) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ questio... Remove this comment to see the full error message
      if (i < clue.count) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(clue.clues[i])
      }
      else {
        // hidden!!!
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(clue.clues[i])
      }
    }
  }
}
 






// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
tp.addDirective("charger_state", function(){
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
  if (w.charger_compartment.closed) {
    return "The compartment is closed";
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
  const contents = w.charger_compartment.getContents(world.LOOK);
  if (contents.length === 0) {
    return "The compartment is empty";
  }
  return "The compartment contains " + formatList(contents, {article:INDEFINITE});
});



// @ts-expect-error ts-migrate(2339) FIXME: Property 'createVerbWith' does not exist on type '... Remove this comment to see the full error message
lang.createVerbWith("Slice", {held:true, ing:'Slicing'})

/*
// This is not a properly written command, it is just to test the item order can be reversed.
commands.unshift(new Cmd('SliceCarrot', {
  rules:[cmdRules.isHeld],
  regexes:[/^use (.+) to slice (.+)$/, /^use (.+) slice (.+)$/, {regex:/slice (.+) with (.+)/, mod:{reverse:true}}],
  objects:[
    {scope:parser.isPresent},
    {scope:parser.isPresent},
  ],
  script:function(objects) {
    msg("You slice {nm:ob1:the} with {nm:ob2:the}.", {ob1:objects[1][0], ob2:objects[0][0]})
    return world.SUCCESS
  },
  defmsg:"Not going to happen.",
}));*/