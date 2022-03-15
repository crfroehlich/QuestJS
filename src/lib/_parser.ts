"use strict";

//@DOC
// ## Parser Functions
//
// Most of these are only for internal use! See here details of how it all works.
// https://github.com/ThePix/QuestJS/wiki/The-Parser#technical-notes
//
//@UNDOC




const parser = {};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
parser.currentCommand;
// Stores the current values for it, him, etc.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
parser.pronouns = {}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'specialText' does not exist on type '{}'... Remove this comment to see the full error message
parser.specialText = {}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
parser.debug = false
// @ts-expect-error ts-migrate(2339) FIXME: Property 'BAD_SPECIAL' does not exist on type '{}'... Remove this comment to see the full error message
parser.BAD_SPECIAL = -14
// @ts-expect-error ts-migrate(2339) FIXME: Property 'DISALLOWED_MULTIPLE' does not exist on t... Remove this comment to see the full error message
parser.DISALLOWED_MULTIPLE = -16
// @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
parser.NO_OBJECT = -13
// @ts-expect-error ts-migrate(2339) FIXME: Property 'NONE_FOR_ALL' does not exist on type '{}... Remove this comment to see the full error message
parser.NONE_FOR_ALL = -12
// @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_MATCH' does not exist on type '{}'.
parser.NO_MATCH = -100


//@DOC
// The "parse" function should be sent either the text the player typed or null.
// If sent null it will continue to work with the current values in currentCommand.
// This allows us to keep trying to process a single command until all the
//  disambiguations have been resolved.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
parser.parse = function (inputText: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'startCommand' does not exist on type '{ ... Remove this comment to see the full error message
  Quest.IO.io.startCommand()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'performanceLogStart' does not exist on t... Remove this comment to see the full error message
  Quest.Settings.settings.performanceLogStart()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('Start command')

  // This allows the command system to be temporarily overriden,
  // say if the game asks a question
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'override' does not exist on type '{}'.
  if (parser.override) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg("Parser overriden");
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'override' does not exist on type '{}'.
    parser.override(inputText)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'override' does not exist on type '{}'.
    delete parser.override
    return
  }

  // Split into commands on full stop unless this is a user comment.
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputTexts' does not exist on type '{}'.
  parser.inputTexts = parser.keepTogether(inputText) ? [inputText] : inputText.split(Quest.lang.command_split_regex)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputTexts' does not exist on type '{}'.
  while (parser.inputTexts.length > 0) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputTexts' does not exist on type '{}'.
    const s = parser.inputTexts.shift()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.Settings.settings.performanceLog('Start "' + s + '"')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'parseSingle' does not exist on type '{}'... Remove this comment to see the full error message
    parser.parseSingle(s)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.Settings.settings.performanceLog('Done')
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'abort' does not exist on type '{}'.
parser.abort = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputTexts' does not exist on type '{}'.
  if (parser.inputTexts.length === 0) return
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputTexts' does not exist on type '{}'.
  Quest.IO.parsermsg("Abandoning later commands: " + parser.inputTexts.join('; '))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inputTexts' does not exist on type '{}'.
  parser.inputTexts = []
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'parseSingle' does not exist on type '{}'... Remove this comment to see the full error message
parser.parseSingle = function (inputText: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
  parser.msg("Input string: " + inputText);

  if (inputText) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'findCommand' does not exist on type '{}'... Remove this comment to see the full error message
    const res = parser.findCommand(inputText)
    if (typeof res === "string") {
      Quest.IO.parsermsg(res)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'abort' does not exist on type '{}'.
      parser.abort()
      world.endTurn(world.PARSER_FAILURE)
      return
    }
    if (res.tmp.score < 0) {
      Quest.IO.parsermsg(res.tmp.error)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'abort' does not exist on type '{}'.
      parser.abort()
      world.endTurn(world.PARSER_FAILURE)
      return
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    parser.currentCommand = res;
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('Command found')

  // Need to disambiguate, until each of the lowest level lists has exactly one member
  let needToDisAmbigFlag = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  for (let i = 0; i < parser.currentCommand.tmp.objects.length; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    if (!Array.isArray(parser.currentCommand.tmp.objects[i])) continue
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    for (let j = 0; j < parser.currentCommand.tmp.objects[i].length; j++) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
      if (parser.currentCommand.tmp.objects[i][j] instanceof Array) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
        if (parser.currentCommand.tmp.objects[i][j].length === 1) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
          parser.currentCommand.tmp.objects[i][j] = parser.currentCommand.tmp.objects[i][j][0];
        }
        else {
          needToDisAmbigFlag = true;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
          parser.currentCommand.tmp.disambiguate1 = i;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
          parser.currentCommand.tmp.disambiguate2 = j;
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const fn = Quest.IO.io.menuFunctions[Quest.Settings.settings.funcForDisambigMenu]
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
          fn(Quest.lang.disambig_msg, parser.currentCommand.tmp.objects[i][j], function (result: any) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
            parser.currentCommand.tmp.objects[parser.currentCommand.tmp.disambiguate1][parser.currentCommand.tmp.disambiguate2] = result
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'parseSingle' does not exist on type '{}'... Remove this comment to see the full error message
            parser.parseSingle(null)
          }, function (input: any) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
            parser.parse(input)
          });
        }
      }
    }
  }

  if (!needToDisAmbigFlag) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.Settings.settings.performanceLog('About to execute')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'execute' does not exist on type '{}'.
    parser.execute();
  }
};

//@DOC
// You can use this to bypass the parser altogether, for the next input the player types.
// Instead, the given function will be used, sent the text the player typed.
//
// Used by askQuestion in Quest.IO.io.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
parser.overrideWith = function (fn: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'override' does not exist on type '{}'.
  parser.override = fn
}


// Do it!
// @ts-expect-error ts-migrate(2339) FIXME: Property 'execute' does not exist on type '{}'.
parser.execute = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inspect' does not exist on type '{}'.
  parser.inspect();
  let inEndTurnFlag = false
  try {
    // save objects for pronouns
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    if (parser.currentCommand.tmp.objects.length > 0 && Array.isArray(parser.currentCommand.tmp.objects[0]) && !parser.currentCommand.all) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
      for (let obj of parser.currentCommand.tmp.objects[0]) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
        parser.pronouns[obj.parserPronouns ? obj.parserPronouns.objective : obj.pronouns.objective] = obj
      }
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.Settings.settings.performanceLog('About to run command script')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    const outcome = parser.currentCommand.script(parser.currentCommand.tmp.objects)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (outcome === undefined && Quest.Settings.settings.playMode === 'dev') log("WARNING: " + parser.currentCommand.name + " command did not return a result to indicate success or failure.")
    inEndTurnFlag = true
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.Settings.settings.performanceLog('About to run world.endTurn')
    world.endTurn(outcome)
  } catch (err) {
    if (inEndTurnFlag) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.printError("Hit a coding error trying to process world.endTurn after that command.", err)
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.printError("Hit a coding error trying to process the command `" + parser.currentCommand.cmdString + "'.", err)
    }
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('All done')
};


// This will return a dictionary, with these keys:
// .inputString    the initial string
// .cmdString      the sanitised string
// .cmd            the matched command object
// .objects        a list (of a list of a list), one member per capture group in the command regex
// .objects[0]     a list (of a list), one member per object name given by the player for capture group 0
// .objects[0][0]  a list of possible object matches for each object name given by the player for the
//                      first object name in capture group 0
// @ts-expect-error ts-migrate(2339) FIXME: Property 'findCommand' does not exist on type '{}'... Remove this comment to see the full error message
parser.findCommand = function (inputText: any) {

  // remove multiple Quest.Utilities.spaces, and any from the ends
  let cmdString = inputText.toLowerCase().trim().replace(/\s+/g, ' ');

  // convert numbers in words to digits
  if (Quest.Settings.settings.convertNumbersInParser) {
    cmdString = Quest.lang.convertNumbers(cmdString);
  }

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('Numbers converted')


  // We now want to match potential objects
  // This will help us narrow down the candidates (maybe)
  // matchedCandidates is an array of dictionaries,
  // each one containing a command and some matched objects if applicable
  //let error = Quest.lang.general_obj_error;
  let bestMatch

  for (const el of Quest.Commands.commands) {
    // matchItemsToCmd will attempt to fit the objects, returns a dictionary if successful
    // or an error message otherwise. Could have more than one object,
    // either because multiple were specified or because it was ambiguous (or both)
    // We just keep the last error message as hopefully the most relevant.
    // NB: Inside function so cannot use 'this'
    el.matchItems(cmdString, inputText)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_MATCH' does not exist on type '{}'.
    if (el.tmp.score > parser.NO_MATCH) {
      if (!bestMatch || el.tmp.score > bestMatch.tmp.score) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
        parser.msg("Candidate accepted!");
        bestMatch = el
      }
    }
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('Best match found')

  if (!bestMatch) {
    return Quest.lang.not_known_msg;
  }

  bestMatch.tmp.string = inputText;
  bestMatch.tmp.cmdString = cmdString;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
  parser.msg("This is the one:" + bestMatch.name);
  return bestMatch;
};






// @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToNames' does not exist on type '{}... Remove this comment to see the full error message
parser.matchToNames = function (s: any, scopes: any, cmdParams: any, res: any) {
  // Within this item position, break the substring into each item section
  // For PUT HAT, CUP IN BOX, the first will be ['hat', 'cup']
  const objectNames = s.split(Quest.lang.joiner_regex).map(function (el: any) { return el.trim() })

  let objectWordList: any = [], score = 0
  for (let s of objectNames) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToName' does not exist on type '{}'... Remove this comment to see the full error message
    const n = parser.matchToName(Quest.lang.article_filter_regex.exec(s)[1], scopes, cmdParams, objectWordList)
    if (n < 0) {
      res.score = n
      res.error_s = s
      return
    }
    if (n > score) score = n
  }

  if (objectWordList.length > 1 && !cmdParams.multiple) {
    res.error = Quest.lang.no_multiples_msg;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'DISALLOWED_MULTIPLE' does not exist on t... Remove this comment to see the full error message
    res.score = parser.DISALLOWED_MULTIPLE;
    return
  }

  res.objects.push(objectWordList)
  res.score += score;
  return
}




// Want to match items from scopes to this string fragment s
// matches will go in objectWordList and matches, the score is returned
// objectWordList is a list of lists of objects and corresponds to an item name typed by the user
// @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToName' does not exist on type '{}'... Remove this comment to see the full error message
parser.matchToName = function (s: any, scopes: any, cmdParams: any, objectWordList: any) {
  // objDisambigList is a list of objects that are in the given scope(s) and match the string fragment
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInScope' does not exist on type '{}'... Remove this comment to see the full error message
  let [objDisambigList, n] = this.findInScope(s, scopes, cmdParams)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
  if (n === 0) return parser.NO_OBJECT

  // So create a new list that will contain objects in objDisambigList not already in objectWordList
  // This can happen for an object like "Ham and cheese sandwich", which will be split up
  // as "ham" and "cheese sandwich"
  const objDisambigList2 = []
  // Go though objDisambigList
  for (const el of objDisambigList) {
    let flag = false
    for (const el1 of objectWordList) {
      for (const el2 of el1) {
        if (el2.name === el.name) flag = true
      }
    }
    if (flag) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
      parser.msg("..Skipping duplicate: " + el.name)
    }
    else {
      objDisambigList2.push(el)
    }
  }
  if (objDisambigList2.length > 0) objectWordList.push(objDisambigList2)
  return n

}


// Tries to match objects to the given string
// It will return a list of matching objects (to be disambiguated if more than 1),
// plus the score, depending on which list the object(s) was found in
// (if there are three lists, the score will be 3 if found in the first list, 2 in the second,
// or 1 if in the third list).
// If not found the score will be 0, and an empty array returned.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'findInScope' does not exist on type '{}'... Remove this comment to see the full error message
parser.findInScope = function (s: any, scopes: any, cmdParams: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
  parser.msg("Now matching: " + s)
  // First handle IT etc.
  for (const key in Quest.lang.pronouns) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (s === Quest.lang.pronouns[key].objective && parser.pronouns[Quest.lang.pronouns[key].objective]) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
      return [[parser.pronouns[Quest.lang.pronouns[key].objective]], 1];
    }
  }

  for (let i = 0; i < scopes.length; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg("..Looking for a match for: " + s + " (scope " + (i + 1) + ")")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInList' does not exist on type '{}'.
    const objList = this.findInList(s, scopes[i], cmdParams);
    if (objList.length > 0) {
      return [objList, scopes.length - i];
    }
  }
  return [[], 0];
};



// Tries to match an object to the given string
// But if there are more than 1 with the same score, it returns them all
// s is the string to match
// list is an array of items to match again
// @ts-expect-error ts-migrate(2339) FIXME: Property 'findInList' does not exist on type '{}'.
parser.findInList = function (s: any, list: any, cmdParams: any) {
  let res = [];
  let score = 0;
  let n;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
  parser.msg("-> Trying to match: " + s)
  for (let item of list) {
    //log(item)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg("-> Considering: " + item.name)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scoreObjectMatch' does not exist on type... Remove this comment to see the full error message
    n = this.scoreObjectMatch(s, item, cmdParams);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    if (n >= 0) parser.msg(item.name + " scores " + n)
    if (n > score) {
      res = [];
      score = n;
    }
    if (n >= score) {
      res.push(item);
    }
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
  parser.msg(res.length > 1 ? "Cannot decide between: " + res.map(el => el.name).join(", ") : (res.length === 1 ? "..Going with: " + res[0].name : "Found no suitable objects"))
  return res
}



// Override to skip quotes in aliases
// @ts-expect-error ts-migrate(2339) FIXME: Property 'itemSetup' does not exist on type '{}'.
parser.itemSetup = function (item: any) {
  item.parserOptionsSet = true;
  item.parserItemName = item.alias.toLowerCase();
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'combos' does not exist on type '{}'.
  item.parserItemNameParts = Quest.Utilities.array.combos(item.parserItemName.split(' '))
  if (item.pattern) {
    if (!item.regex) item.regex = new RegExp("^(" + item.pattern + ")$")
    if (!item.synonyms) item.synonyms = item.pattern.split('|');
  }
  if (item.synonyms) {
    if (!Array.isArray(item.synonyms)) throw 'Expected "synonyms" to be an array for ' + item.name
    item.synonyms.forEach(function (el: any) {
      if (el.includes(' ')) {
        item.parserItemNameParts = item.parserItemNameParts.concat(el.split(' '))
      }
    })
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'scoreObjectMatch' does not exist on type... Remove this comment to see the full error message
parser.scoreObjectMatch = function (s: any, item: any, cmdParams: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemSetup' does not exist on type '{}'.
  if (!item.parserOptionsSet) parser.itemSetup(item)
  const itemName = item.alias.toLowerCase();
  let res = -1;
  if (cmdParams.items && cmdParams.items.includes(item.name)) {
    // does this pay any attention to what the player typed????
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('The command specifically mentions this item, so highest priority, score 100')
    res = 100;
  }
  else if (s === item.parserItemName) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('The player has used the exact alias, score 60')
    res = 60;
  }
  else if (item.regex && item.regex.test(s)) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('The player has used the exact string allowed in the regex, score 55')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('' + item.regex)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('>' + s + '<')
    res = 55;
  }
  else if (item.parserItemNameParts && item.parserItemNameParts.some(function (el: any) { return el === s })) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('The player has matched a complete word, but not the full phrase, score 50')
    res = 50;
  }
  else if (item.parserItemName.startsWith(s)) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('the player has used a string that matches the start of the alias, score length + 15')
    res = s.length + 15;
  }
  else if (item.synonyms && item.synonyms.some(function (el: any) { return el.startsWith(s) })) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('the player has used a string that matches the start of an alt name, score length + 10')
    res = s.length + 10;
  }
  else if (item.parserItemNameParts && item.parserItemNameParts.some(function (el: any) { return el.startsWith(s) })) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('the player has used a string that matches the start of an alt name, score length')
    res = s.length;
  }
  else {
    return -1;
  }

  if (item[cmdParams.attName]) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('bonus 20 as item has attribute ' + cmdParams.attName)
    res += 20;
  }
  if (item.parserPriority) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
    parser.msg('item.parserPriority is ' + item.parserPriority)
    res += item.parserPriority;
  }


  // note what we matched against in case a command wants to use it later
  // This is a little risky as at this point it is only a suggestion,
  // but I cannot think of a situation where it would fail.
  // Used by COUNTABLE
  item.cmdMatch = s;
  return res;
};













// For debugging only
// Prints details about the parser.currentCommand so you can
// see what the parser has made of the player's input
// @ts-expect-error ts-migrate(2339) FIXME: Property 'inspect' does not exist on type '{}'.
parser.inspect = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
  if (!parser.debug) return;

  let s = "PARSER RESULT:<br/>";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  s += "Input text: " + parser.currentCommand.string + "<br/>";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  s += "Matched command: " + parser.currentCommand.name + "<br/>";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  s += "Matched regex: " + parser.currentCommand.tmp.regex + "<br/>";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  s += "Match score: " + parser.currentCommand.tmp.score + "<br/>";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  if (parser.currentCommand.all) { s += "Player typed ALL<br/>"; }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  s += "Objects/texts (" + parser.currentCommand.tmp.objects.length + "):" + "<br/>";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  for (let obj of parser.currentCommand.tmp.objects) {
    if (typeof obj === "string") {
      s += "&nbsp;&nbsp;&nbsp;&nbsp;Text: " + obj + "<br/>";
    }
    else if (Array.isArray(obj)) {
      s += "&nbsp;&nbsp;&nbsp;&nbsp;Objects:" + obj.map(function (el) { return el.name; }).join(", ") + "<br/>";
    }
    else if (obj.name) {
      s += "&nbsp;&nbsp;&nbsp;&nbsp;Something called :" + obj + "<br/>";
    }
    else {
      s += "&nbsp;&nbsp;&nbsp;&nbsp;Something else:" + obj + "<br/>";
    }
  }
  Quest.IO.debugmsg(s);
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'specialText' does not exist on type '{}'... Remove this comment to see the full error message
parser.specialText.ignore = {
  error: function (text: any) {
    return false
  },
  exec: function (text: any) {
    return false
  },
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'specialText' does not exist on type '{}'... Remove this comment to see the full error message
parser.specialText.text = {
  error: function (text: any) {
    return false
  },
  exec: function (text: any) {
    return text
  },
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'specialText' does not exist on type '{}'... Remove this comment to see the full error message
parser.specialText.fluid = {
  error: function (text: any) {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    if (Quest.Settings.settings.fluids.includes(text)) return false
    return processText(Quest.lang.not_a_fluid_here, { text: text })
  },
  exec: function (text: any) {
    return text
  },
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'specialText' does not exist on type '{}'... Remove this comment to see the full error message
parser.specialText.number = {
  error: function (text: any) {
    if (text.match(/^\d+$/)) return false
    if (Quest.lang.numberUnits.includes(text)) return false
    return true
  },
  exec: function (text: any) {
    if (text.match(/^\d+$/)) return parseInt(text)
    return Quest.lang.numberUnits.indexOf(text)
  },
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
parser.msg = function (...ary: any[]) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
  if (parser.debug) {
    for (let s of ary) Quest.IO.debugmsg("P&gt; " + s)
  }
}

// One scope for ALL (use allScope if available)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'getScope' does not exist on type '{}'.
parser.getScope = function (cmdParams: any) {
  if (!cmdParams.scope) {
    console.log("WARNING: No scope (or scope not found) in command")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
    return world.scope
  }

  if (cmdParams.extendedScope) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromWorld' does not exist on type '... Remove this comment to see the full error message
    return parser.scopeFromWorld(cmdParams.allScope ? cmdParams.allScope : cmdParams.scope)
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromScope' does not exist on type '... Remove this comment to see the full error message
  return parser.scopeFromScope(cmdParams.allScope ? cmdParams.allScope : cmdParams.scope)
}

// Multiple scopes when not ALL
// @ts-expect-error ts-migrate(2339) FIXME: Property 'getScopes' does not exist on type '{}'.
parser.getScopes = function (cmdParams: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromWorld' does not exist on type '... Remove this comment to see the full error message
  const baseScope = cmdParams.extendedScope ? parser.scopeFromWorld(cmdParams.scope) : parser.scopeFromScope(cmdParams.scope)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
  const scopes = [baseScope, world.scope]
  return scopes
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromScope' does not exist on type '... Remove this comment to see the full error message
parser.scopeFromScope = function (fn: any, options: any) {
  const list = [];
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
  for (const o of world.scope) {
    if (fn(o, options)) {
      list.push(o);
    }
  }
  return list;
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromWorld' does not exist on type '... Remove this comment to see the full error message
parser.scopeFromWorld = function (fn: any, options: any) {
  const list = [];
  for (const key in w) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (fn(w[key], options)) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      list.push(w[key]);
    }
  }
  return list;
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'keepTogether' does not exist on type '{}... Remove this comment to see the full error message
parser.keepTogether = function (s: any) {
  return Quest.lang.regex.MetaUserComment.test(s)
}


// This set is used in the objects attribute of commands
// The "is" functions are for looking at a specific place

// Anywhere in the world
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isInWorld' does not exist on type '{}'.
parser.isInWorld = function (item: any) {
  return true;
}
// Anywhere in the world
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isReachable' does not exist on type '{}'... Remove this comment to see the full error message
parser.isReachable = function (item: any) {
  return item.scopeStatus.canReach && world.ifNotDark(item);
}
// Anywhere in the location (used by the parser for the fallback)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isVisible' does not exist on type '{}'.
parser.isVisible = function (item: any) {
  return item.scopeStatus.visible && world.ifNotDark(item);
}
// Held or here, but not in a container
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
parser.isPresent = function (item: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
  return parser.isHere(item) || parser.isHeld(item);
}
// Used by examine, so the player can X ME, even if something called metalhead is here.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresentOrMe' does not exist on type '{... Remove this comment to see the full error message
parser.isPresentOrMe = function (item: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
  return parser.isHere(item) || parser.isHeld(item) || item === player;
}
// ... but not in a container
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
parser.isHeldNotWorn = function (item: any) {
  return item.isAtLoc(player.name, world.PARSER) && world.ifNotDark(item) && !item.getWorn();
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
parser.isHeld = function (item: any) {
  return item.isAtLoc(player.name, world.PARSER) && world.ifNotDark(item);
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldByNpc' does not exist on type '{}'... Remove this comment to see the full error message
parser.isHeldByNpc = function (item: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromScope' does not exist on type '... Remove this comment to see the full error message
  const npcs = parser.scopeFromScope(parser.isReachable).filter((el: any) => el.npc);
  for (let npc of npcs) {
    if (item.isAtLoc(npc.name, world.PARSER)) return true;
  }
  return false;
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
parser.isWorn = function (item: any) {
  return item.isAtLoc(player.name, world.PARSER) && world.ifNotDark(item) && item.getWorn();
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isWornByNpc' does not exist on type '{}'... Remove this comment to see the full error message
parser.isWornByNpc = function (item: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromScope' does not exist on type '... Remove this comment to see the full error message
  const npcs = parser.scopeFromScope(parser.isReachable).filter((el: any) => el.npc);
  for (let npc of npcs) {
    if (item.isAtLoc(npc.name, world.PARSER) && item.getWorn()) return true;
  }
  return false;
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcOrHere' does not exist on type '{}'... Remove this comment to see the full error message
parser.isNpcOrHere = function (item: any) {
  return (item.isAtLoc(player.loc, world.PARSER) && world.ifNotDark(item)) || item.npc || item.player;
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
parser.isNpcAndHere = function (item: any) {
  return player.onPhoneTo === item.name || (item.isAtLoc(player.loc, world.PARSER) && (item.npc || item.player))
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
parser.isHere = function (item: any) {
  return item.isAtLoc(player.loc, world.PARSER) && world.ifNotDark(item);
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'isForSale' does not exist on type '{}'.
parser.isForSale = function (item: any) {
  return item.isForSale && item.isForSale(player.loc) && world.ifNotDark(item);
}

//parser.isInside = function(item, options) {
//  return item.isAtLoc(options.container.name, world.PARSER) && world.ifNotDark(item);
//}

//parser.isRoom = function(item) {
//  return item.room;
//}

// Is in a container that is reachable
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isContained' does not exist on type '{}'... Remove this comment to see the full error message
parser.isContained = function (item: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromScope' does not exist on type '... Remove this comment to see the full error message
  const containers = parser.scopeFromScope(parser.isReachable).filter((el: any) => el.container);
  for (let container of containers) {
    if (container.closed) continue;
    if (item.isAtLoc(container.name, world.PARSER)) return true;
  }
  return false;
}
// Is in a container that is reachable, not held by player
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isLocationContained' does not exist on t... Remove this comment to see the full error message
parser.isLocationContained = function (item: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromScope' does not exist on type '... Remove this comment to see the full error message
  const containers = parser.scopeFromScope(parser.isReachable).filter((el: any) => el.container)
  for (let container of containers) {
    if (container.closed) continue
    if (container.isUltimatelyHeldBy(player)) continue
    if (item.isAtLoc(container.name, world.PARSER)) return true
  }
  return false;
}
// In this location, or in a container (used by TAKE)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isHereOrContained' does not exist on typ... Remove this comment to see the full error message
parser.isHereOrContained = function (item: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
  if (parser.isHere(item)) return true;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContained' does not exist on type '{}'... Remove this comment to see the full error message
  if (parser.isContained(item)) return true;
  return false;
}
// In this location, or in a container not held by the player (used by TAKE ALL)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isHereOrLocationContained' does not exis... Remove this comment to see the full error message
parser.isHereOrLocationContained = function (item: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
  if (parser.isHere(item)) return true;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLocationContained' does not exist on t... Remove this comment to see the full error message
  if (parser.isLocationContained(item)) return true;
  return false;
}
// Is a CONSTRUCTION and has no location 
// @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
parser.isUnconstructed = function (item: any) {
  if (!item.loc && item.construction) return true
  return false;
}

//parser.debug = true