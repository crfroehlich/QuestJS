namespace Quest {
  export namespace Parser {

    // @DOC
    // ## Parser Functions
    //
    // Most of these are only for internal use! See here details of how it all works.
    // https://github.com/ThePix/QuestJS/wiki/The-Parser#technical-notes
    //
    // @UNDOC
    export const parser = {

      BAD_SPECIAL: -14,

      DISALLOWED_MULTIPLE: -16,

      NONE_FOR_ALL: -12,

      NO_MATCH: -100,

      NO_OBJECT: -13,

      abort() {
        if (parser.inputTexts.length === 0) return;
        Quest.IO.parsermsg(`Abandoning later commands: ${parser.inputTexts.join('; ')}`);
        parser.inputTexts = [];
      },

      currentCommand: '',

      debug: false,

      // Do it!
      execute() {
        parser.inspect();
        let inEndTurnFlag = false;
        try {
          // save objects for pronouns
          if (parser.currentCommand.tmp.objects.length > 0 && Array.isArray(parser.currentCommand.tmp.objects[0]) && !parser.currentCommand.all) {
            for (const obj of parser.currentCommand.tmp.objects[0]) {
              parser.pronouns[obj.parserPronouns ? obj.parserPronouns.objective : obj.pronouns.objective] = obj;
            }
          }
          Quest.Settings.settings.performanceLog('About to run command script');
          const outcome = parser.currentCommand.script(parser.currentCommand.tmp.objects);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
          if (outcome === undefined && Quest.Settings.settings.playMode === 'dev') log(`WARNING: ${parser.currentCommand.name} command did not return a result to indicate success or failure.`);
          inEndTurnFlag = true;
          Quest.Settings.settings.performanceLog('About to run Quest.World.world.endTurn');
          Quest.World.world.endTurn(outcome);
        } catch (err) {
          if (inEndTurnFlag) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.printError('Hit a coding error trying to process Quest.World.world.endTurn after that command.', err);
          } else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.printError(`Hit a coding error trying to process the command \`${parser.currentCommand.cmdString}'.`, err);
          }
        }
        Quest.Settings.settings.performanceLog('All done');
      },

      // This will return a dictionary, with these keys:
      // .inputString    the initial string
      // .cmdString      the sanitised string
      // .cmd            the matched command object
      // .objects        a list (of a list of a list), one member per capture group in the command regex
      // .objects[0]     a list (of a list), one member per object name given by the player for capture group 0
      // .objects[0][0]  a list of possible object matches for each object name given by the player for the
      //                      first object name in capture group 0
      findCommand(inputText: any) {
        // remove multiple Quest.Utilities.spaces, and any from the ends
        let cmdString = inputText.toLowerCase().trim().replace(/\s+/g, ' ');

        // convert numbers in words to digits
        if (Quest.Settings.settings.convertNumbersInParser) {
          cmdString = Quest.lang.convertNumbers(cmdString);
        }

        Quest.Settings.settings.performanceLog('Numbers converted');

        // We now want to match potential objects
        // This will help us narrow down the candidates (maybe)
        // matchedCandidates is an array of dictionaries,
        // each one containing a command and some matched objects if applicable
        // let error = Quest.lang.general_obj_error;
        let bestMatch;

        for (const el of Quest.Commands.commands) {
          // matchItemsToCmd will attempt to fit the objects, returns a dictionary if successful
          // or an error message otherwise. Could have more than one object,
          // either because multiple were specified or because it was ambiguous (or both)
          // We just keep the last error message as hopefully the most relevant.
          // NB: Inside function so cannot use 'this'
          el.matchItems(cmdString, inputText);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_MATCH' does not exist on type '{}'.
          if (el.tmp.score > parser.NO_MATCH) {
            if (!bestMatch || el.tmp.score > bestMatch.tmp.score) {
              parser.msg('Candidate accepted!');
              bestMatch = el;
            }
          }
        }
        Quest.Settings.settings.performanceLog('Best match found');

        if (!bestMatch) {
          return Quest.lang.not_known_msg;
        }

        bestMatch.tmp.string    = inputText;
        bestMatch.tmp.cmdString = cmdString;
        parser.msg(`This is the one:${bestMatch.name}`);
        return bestMatch;
      },

      // Tries to match an object to the given string
      // But if there are more than 1 with the same score, it returns them all
      // s is the string to match
      // list is an array of items to match again
      findInList(s: any, list: any, cmdParams: any) {
        let res   = [];
        let score = 0;
        let n;
        parser.msg(`-> Trying to match: ${s}`);
        for (const item of list) {
          // log(item)
          parser.msg(`-> Considering: ${item.name}`);
          n = this.scoreObjectMatch(s, item, cmdParams);
          if (n >= 0) parser.msg(`${item.name} scores ${n}`);
          if (n > score) {
            res   = [];
            score = n;
          }
          if (n >= score) {
            res.push(item);
          }
        }
        parser.msg(res.length > 1 ? `Cannot decide between: ${res.map((el) => el.name).join(', ')}` : (res.length === 1 ? `..Going with: ${res[0].name}` : 'Found no suitable objects'));
        return res;
      },

      // Tries to match objects to the given string
      // It will return a list of matching objects (to be disambiguated if more than 1),
      // plus the score, depending on which list the object(s) was found in
      // (if there are three lists, the score will be 3 if found in the first list, 2 in the second,
      // or 1 if in the third list).
      // If not found the score will be 0, and an empty array returned.
      findInScope(s: any, scopes: any, cmdParams: any) {
        parser.msg(`Now matching: ${s}`);
        // First handle IT etc.
        for (const key in Quest.lang.pronouns) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (s === Quest.lang.pronouns[key].objective && parser.pronouns[Quest.lang.pronouns[key].objective]) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
            return [[parser.pronouns[Quest.lang.pronouns[key].objective]], 1];
          }
        }

        for (let i = 0; i < scopes.length; i++) {
          parser.msg(`..Looking for a match for: ${s} (scope ${i + 1})`);
          const objList = this.findInList(s, scopes[i], cmdParams);
          if (objList.length > 0) {
            return [objList, scopes.length - i];
          }
        }
        return [[], 0];
      },

      // One scope for ALL (use allScope if available)
      getScope(cmdParams: any) {
        if (!cmdParams.scope) {
          console.log('WARNING: No scope (or scope not found) in command');
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
          return Quest.World.world.scope;
        }

        if (cmdParams.extendedScope) {
          return parser.scopeFromWorld(cmdParams.allScope ? cmdParams.allScope : cmdParams.scope);
        }
        return parser.scopeFromScope(cmdParams.allScope ? cmdParams.allScope : cmdParams.scope);
      },

      // Multiple scopes when not ALL
      getScopes(cmdParams: any) {
        const baseScope = cmdParams.extendedScope ? parser.scopeFromWorld(cmdParams.scope) : parser.scopeFromScope(cmdParams.scope);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
        return [baseScope, Quest.World.world.scope];
      },

      inputTexts: [],

      // For debugging only
      // Prints details about the parser.currentCommand so you can
      // see what the parser has made of the player's input
      inspect() {
        if (!parser.debug) return;

        let s = 'PARSER RESULT:<br/>';
        s    += `Input text: ${parser.currentCommand.string}<br/>`;
        s    += `Matched command: ${parser.currentCommand.name}<br/>`;
        s    += `Matched regex: ${parser.currentCommand.tmp.regex}<br/>`;
        s    += `Match score: ${parser.currentCommand.tmp.score}<br/>`;
        if (parser.currentCommand.all) {
          s += 'Player typed ALL<br/>';
        }
        s += `Objects/texts (${parser.currentCommand.tmp.objects.length}):` + '<br/>';
        for (const obj of parser.currentCommand.tmp.objects) {
          if (typeof obj === 'string') {
            s += `&nbsp;&nbsp;&nbsp;&nbsp;Text: ${obj}<br/>`;
          } else if (Array.isArray(obj)) {
            s += `&nbsp;&nbsp;&nbsp;&nbsp;Objects:${obj.map((el) => el.name).join(', ')}<br/>`;
          } else if (obj.name) {
            s += `&nbsp;&nbsp;&nbsp;&nbsp;Something called :${obj}<br/>`;
          } else {
            s += `&nbsp;&nbsp;&nbsp;&nbsp;Something else:${obj}<br/>`;
          }
        }
        Quest.IO.debugmsg(s);
      },

      
      isHeld(item: any) {
        return item.isAtLoc(Quest.World.player.name, Quest.World.world.PARSER) && Quest.World.world.ifNotDark(item);
      },

      
      
      
      // ... but not in a container
isHeldNotWorn (item: any) {
        return item.isAtLoc(Quest.World.player.name, Quest.World.world.PARSER) && Quest.World.world.ifNotDark(item) && !item.getWorn();
      },
      
      


isHeldByNpc(item: any) {
        const npcs = parser.scopeFromScope(parser.isReachable).filter((el: any) => el.npc);
        for (const npc of npcs) {
          if (item.isAtLoc(npc.name, Quest.World.world.PARSER)) return true;
        }
        return false;
      },
      
      
// This set is used in the objects attribute of commands
// The "is" functions are for looking at a specific place
// Anywhere in the Quest.World.world
isInWorld(item: any) {
        return true;
      },
      
      // Held or here, but not in a container
      isPresent: function (item: any) {
        return parser.isHere(item) || parser.isHeld(item);
      },
      
      isNpcOrHere(item: any) {
        return (item.isAtLoc(Quest.World.player.loc, Quest.World.world.PARSER) && Quest.World.world.ifNotDark(item)) || item.npc || item.player;
      },

      
isHere(item: any) {
        return item.isAtLoc(Quest.World.player.loc, Quest.World.world.PARSER) && Quest.World.world.ifNotDark(item);
      },
      
      // Override to skip quotes in aliases
itemSetup(item: any) {
        item.parserOptionsSet    = true;
        item.parserItemName      = item.alias.toLowerCase();
        item.parserItemNameParts = Quest.Utilities.array.combos(item.parserItemName.split(' '));
        if (item.pattern) {
          if (!item.regex) item.regex = new RegExp(`^(${item.pattern})$`);
          if (!item.synonyms) item.synonyms = item.pattern.split('|');
        }
        if (item.synonyms) {
          if (!Array.isArray(item.synonyms)) throw `Expected "synonyms" to be an array for ${item.name}`;
          item.synonyms.forEach((el: any) => {
            if (el.includes(' ')) {
              item.parserItemNameParts = item.parserItemNameParts.concat(el.split(' '));
            }
          });
        }
      },
      
      // parser.isInside = function(item, options) {
      //  return item.isAtLoc(options.container.name, Quest.World.world.PARSER) && Quest.World.world.ifNotDark(item);
      // }
      // parser.isRoom = function(item) {
      //  return item.room;
      // }
      // Is in a container that is reachable
      isContained(item: any) {
        const containers = parser.scopeFromScope(parser.isReachable).filter((el: any) => el.container);
        for (const container of containers) {
          if (container.closed) continue;
          if (item.isAtLoc(container.name, Quest.World.world.PARSER)) return true;
        }
        return false;
      },

      // Stores the current values for it, him, etc.
      pronouns: {},

      isForSale(item: any) {
        return item.isForSale && item.isForSale(Quest.World.player.loc) && Quest.World.world.ifNotDark(item);
      },

      keepTogether(s: any) {
        return Quest.lang.regex.MetaUserComment.test(s);
      },

      // In this location, or in a container (used by TAKE)
      isHereOrContained(item: any) {
        if (parser.isHere(item)) return true;
        if (parser.isContained(item)) return true;
        return false;
      },

      override: (_p) => { },






      // In this location, or in a container not held by the player (used by TAKE ALL)
      isHereOrLocationContained(item: any) {
        if (parser.isHere(item)) return true;
        if (parser.isLocationContained(item)) return true;
        return false;
      },
      
      




// Is in a container that is reachable, not held by player
isLocationContained(item: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeFromScope' does not exist on type '... Remove this comment to see the full error message
        const containers = parser.scopeFromScope(parser.isReachable).filter((el: any) => el.container);
        for (const container of containers) {
          if (container.closed) continue;
          if (container.isUltimatelyHeldBy(Quest.World.player)) continue;
          if (item.isAtLoc(container.name, Quest.World.world.PARSER)) return true;
        }
        return false;
      },

      
      // @DOC
// The "parse" function should be sent either the text the player typed or null.
// If sent null it will continue to work with the current values in currentCommand.
// This allows us to keep trying to process a single command until all the
//  disambiguations have been resolved.
parse: function (inputText: any) {
        Quest.IO.io.startCommand();
        Quest.Settings.settings.performanceLogStart();
        Quest.Settings.settings.performanceLog('Start command');

        // This allows the command system to be temporarily overriden,
        // say if the game asks a question
        if (parser.override) {
          parser.msg('Parser overriden');
          parser.override(inputText);
          delete parser.override;
          return;
        }

        parser.inputTexts = parser.keepTogether(inputText) ? [inputText] : inputText.split(Quest.lang.command_split_regex);

        while (parser.inputTexts.length > 0) {
          const s = parser.inputTexts.shift();
          Quest.Settings.settings.performanceLog(`Start "${s}"`);
          parser.parseSingle(s);
          Quest.Settings.settings.performanceLog('Done');
        }
      },

      isNpcAndHere(item: any) {
        return Quest.World.player.onPhoneTo === item.name || (item.isAtLoc(Quest.World.player.loc, Quest.World.world.PARSER) && (item.npc || item.player));
      },

      
      
      
      
      
      parseSingle(inputText: any) {
        parser.msg(`Input string: ${inputText}`);

        if (inputText) {
          const res = parser.findCommand(inputText);
          if (typeof res === 'string') {
            Quest.IO.parsermsg(res);
            parser.abort();
            Quest.World.world.endTurn(Quest.World.world.PARSER_FAILURE);
            return;
          }
          if (res.tmp.score < 0) {
            Quest.IO.parsermsg(res.tmp.error);

            parser.abort();
            Quest.World.world.endTurn(Quest.World.world.PARSER_FAILURE);
            return;
          }
          parser.currentCommand = res;
        }
        Quest.Settings.settings.performanceLog('Command found');

        // Need to disambiguate, until each of the lowest level lists has exactly one member
        let needToDisAmbigFlag = false;
        for (let i = 0; i < parser.currentCommand.tmp.objects.length; i++) {
          if (!Array.isArray(parser.currentCommand.tmp.objects[i])) continue;
          for (let j = 0; j < parser.currentCommand.tmp.objects[i].length; j++) {
            if (parser.currentCommand.tmp.objects[i][j] instanceof Array) {
              if (parser.currentCommand.tmp.objects[i][j].length === 1) {
                parser.currentCommand.tmp.objects[i][j] = parser.currentCommand.tmp.objects[i][j][0];
              } else {
                needToDisAmbigFlag                      = true;
                parser.currentCommand.tmp.disambiguate1 = i;
                parser.currentCommand.tmp.disambiguate2 = j;
                const fn                                = Quest.IO.io.menuFunctions[Quest.Settings.settings.funcForDisambigMenu];
                fn(Quest.lang.disambig_msg, parser.currentCommand.tmp.objects[i][j], (result: any) => {
                  parser.currentCommand.tmp.objects[parser.currentCommand.tmp.disambiguate1][parser.currentCommand.tmp.disambiguate2] = result;
                  parser.parseSingle(null);
                }, (input: any) => {
                  parser.parse(input);
                });
              }
            }
          }
        }

        if (!needToDisAmbigFlag) {
          Quest.Settings.settings.performanceLog('About to execute');
          parser.execute();
        }
      },

      




// Used by examine, so the player can X ME, even if something called metalhead is here.
isPresentOrMe: function (item: any) {
        return parser.isHere(item) || parser.isHeld(item) || item === Quest.World.player;
      },

      
      // @DOC
// You can use this to bypass the parser altogether, for the next input the player types.
// Instead, the given function will be used, sent the text the player typed.
//
// Used by askQuestion in Quest.IO.io.
overrideWith: function (fn: any) {
        parser.override = fn;
      },

      // Anywhere in the Quest.World.world
isReachable(item: any) {
        return item.scopeStatus.canReach && Quest.World.world.ifNotDark(item);
      },

      
      
      
      
matchToNames(s: any, scopes: any, cmdParams: any, res: any) {
        // Within this item position, break the substring into each item section
        // For PUT HAT, CUP IN BOX, the first will be ['hat', 'cup']
        const objectNames = s.split(Quest.lang.joiner_regex).map((el: any) => el.trim());

        const objectWordList: any = []; let
          score = 0;
        for (const s of objectNames) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'matchToName' does not exist on type '{}'... Remove this comment to see the full error message
          const n = parser.matchToName(Quest.lang.article_filter_regex.exec(s)[1], scopes, cmdParams, objectWordList);
          if (n < 0) {
            res.score   = n;
            res.error_s = s;
            return;
          }
          if (n > score) score = n;
        }

        if (objectWordList.length > 1 && !cmdParams.multiple) {
          res.error = Quest.lang.no_multiples_msg;
          res.score = parser.DISALLOWED_MULTIPLE;
          return;
        }

        res.objects.push(objectWordList);
        res.score += score;
      },
      
      


// Is a Quest.Templates.CONSTRUCTION and has no location
isUnconstructed(item: any) {
        if (!item.loc && item.construction) return true;
        return false;
      },

      
      // Want to match items from scopes to this string fragment s
// matches will go in objectWordList and matches, the score is returned
// objectWordList is a list of lists of objects and corresponds to an item name typed by the user
matchToName: function (s: any, scopes: any, cmdParams: any, objectWordList: any) {
        // objDisambigList is a list of objects that are in the given scope(s) and match the string fragment
        const [objDisambigList, n] = this.findInScope(s, scopes, cmdParams);
        if (n === 0) return parser.NO_OBJECT;

        // So create a new list that will contain objects in objDisambigList not already in objectWordList
        // This can happen for an object like "Ham and cheese sandwich", which will be split up
        // as "ham" and "cheese sandwich"
        const objDisambigList2 = [];
        // Go though objDisambigList
        for (const el of objDisambigList) {
          let flag = false;
          for (const el1 of objectWordList) {
            for (const el2 of el1) {
              if (el2.name === el.name) flag = true;
            }
          }
          if (flag) {
            parser.msg(`..Skipping duplicate: ${el.name}`);
          } else {
            objDisambigList2.push(el);
          }
        }
        if (objDisambigList2.length > 0) objectWordList.push(objDisambigList2);
        return n;
      },

      // Anywhere in the location (used by the parser for the fallback)
      isVisible(item: any) {
        return item.scopeStatus.visible && Quest.World.world.ifNotDark(item);
      },
      
      msg(...ary: any[]) {
        if (parser.debug) {
          for (const s of ary) Quest.IO.debugmsg(`P&gt; ${s}`);
        }
      },

      isWorn(item: any) {
        return item.isAtLoc(Quest.World.player.name, Quest.World.world.PARSER) && Quest.World.world.ifNotDark(item) && item.getWorn();
      },

      scoreObjectMatch(s: any, item: any, cmdParams: any) {
        if (!item.parserOptionsSet) parser.itemSetup(item);
        const itemName = item.alias.toLowerCase();
        let res        = -1;
        if (cmdParams.items && cmdParams.items.includes(item.name)) {
          // does this pay any attention to what the player typed????
          parser.msg('The command specifically mentions this item, so highest priority, score 100');
          res = 100;
        } else if (s === item.parserItemName) {
          parser.msg('The player has used the exact alias, score 60');
          res = 60;
        } else if (item.regex && item.regex.test(s)) {
          parser.msg('The player has used the exact string allowed in the regex, score 55');
          parser.msg(`${item.regex}`);
          parser.msg(`>${s}<`);
          res = 55;
        } else if (item.parserItemNameParts && item.parserItemNameParts.some((el: any) => el === s)) {
          parser.msg('The player has matched a complete word, but not the full phrase, score 50');
          res = 50;
        } else if (item.parserItemName.startsWith(s)) {
          parser.msg('the player has used a string that matches the start of the alias, score length + 15');
          res = s.length + 15;
        } else if (item.synonyms && item.synonyms.some((el: any) => el.startsWith(s))) {
          parser.msg('the player has used a string that matches the start of an alt name, score length + 10');
          res = s.length + 10;
        } else if (item.parserItemNameParts && item.parserItemNameParts.some((el: any) => el.startsWith(s))) {
          parser.msg('the player has used a string that matches the start of an alt name, score length');
          res = s.length;
        } else {
          return -1;
        }

        if (item[cmdParams.attName]) {
          parser.msg(`bonus 20 as item has attribute ${cmdParams.attName}`);
          res += 20;
        }
        if (item.parserPriority) {
          parser.msg(`item.parserPriority is ${item.parserPriority}`);
          res += item.parserPriority;
        }

        // note what we matched against in case a command wants to use it later
        // This is a little risky as at this point it is only a suggestion,
        // but I cannot think of a situation where it would fail.
        // Used by Quest.Templates.COUNTABLE
        item.cmdMatch = s;
        return res;
      },

      isWornByNpc(item: any) {
        const npcs = parser.scopeFromScope(parser.isReachable).filter((el: any) => el.npc);
        for (const npc of npcs) {
          if (item.isAtLoc(npc.name, Quest.World.world.PARSER) && item.getWorn()) return true;
        }
        return false;
      },

      scopeFromScope(fn: any, options: any) {
        const list = [];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
        for (const o of Quest.World.world.scope) {
          if (fn(o, options)) {
            list.push(o);
          }
        }
        return list;
      },

      specialText: {
        fluid: {
          error(text: any) {
            if (Quest.Settings.settings.fluids.includes(text)) return false;
            return Quest.Text.processText(Quest.lang.not_a_fluid_here, { text });
          },
          exec(text: any) {
            return text;
          },
        },
        ignore: {
          error(text: any) {
            return false;
          },
          exec(text: any) {
            return false;
          },
        },
        number: {
          error(text: any) {
            if (text.match(/^\d+$/)) return false;
            if (Quest.lang.numberUnits.includes(text)) return false;
            return true;
          },
          exec(text: any) {
            if (text.match(/^\d+$/)) return parseInt(text);
            return Quest.lang.numberUnits.indexOf(text);
          },
        },
        text: {
          error(text: any) {
            return false;
          },
          exec(text: any) {
            return text;
          },
        },
      },

      scopeFromWorld(fn: any, options: any) {
        const list = [];
        for (const key in Quest.World.w) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (fn(Quest.World.w[key], options)) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            list.push(Quest.World.w[key]);
          }
        }
        return list;
      },

      // parser.debug = true

    };
  }
}
