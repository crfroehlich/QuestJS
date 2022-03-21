/* eslint-disable no-underscore-dangle */
import { Quest } from '../../types/quest';
import { log, warn } from '../logger';

export class Cmd {
  // Is this command a match at the most basic level (ignoring items, etc)
  // Also resets the command
  _test(s: any) {
    if (!Array.isArray(this.regexes)) {
      log(this); // it will crash in the next line!
    }
    for (const regex of this.regexes) {
      if (regex instanceof RegExp) {
        if (regex.test(s)) {
          this.tmp = { mod: {}, regex };
          return true;
        }
      }
      // else {
      //   if (regex.regex.test(s)) {
      //     this.tmp = { regex: regex.regex, mod: regex.mod }
      //     return true
      //   }
      // }
    }
    this.tmp = { score: Quest.Parser.parser.NO_MATCH };
    return false;
  }

  // A command can have an array of regexs, "antiRegexes" that will stop the command getting matched
  _testNot(s: any) {
    if (!Array.isArray(this.antiRegexes)) return true;
    for (const regex of this.antiRegexes) {
      if (regex instanceof RegExp) {
        if (regex.test(s)) {
          return false;
        }
      }
      // else {
      //   if (regex.regex.test(s)) {
      //     return false
      //   }
      // }
    }
    return true;
  }

  // tmp?: { regex: RegExp; mod: {}; };
  all = false;

  antiRegexes: RegExp[] = [];

  attName = '';

  default(options: any) {
    Quest.IO.falsemsg(this.defmsg, options);
  }

  error: any;

  // We want to see if this command is a good match to the string
  // This will involve trying to matching objects, according to the
  // values in the command
  //
  // The results go in an attribute, tmp, that should have alreadsy been set by test,
  // and is a dictionary containing:
  //
  // objectTexts - the matched object names from the player input
  // objects - the matched objects (lists of lists ready to be disabiguated)
  // score - a rating of how good the match is
  // error - a string to report why it failed, if it did!
  //
  // objects will be an array for each object role (so PUT HAT IN BOX is two),
  // of arrays for each object listed (so GET HAT, TEAPOT AND GUN is three),
  // of possible object matches (so GET HAT is four if there are four hats in the room)
  //
  // score is a rating for how well this command matches, based on the score attribute
  // of the command itself (defaults to 10); if zero or less, this is an error
  //
  // If this does give an error, it is only reported if no command is a success
  //
  // The parameter mod allows us to change how this is done, eg if the nouns are reversed
  // and will have been set in test
  matchItems(s: any): boolean {
    if (!this._test(s)) return;
    if (!this._testNot(s)) return;

    Quest.Parser.parser.msg(
      '---------------------------------------------------------',
    );
    Quest.Parser.parser.msg(`* Looking at candidate: ${this.name}`);

    // this is a temporary set of data used while we parser one input
    this.tmp = this.tmp || {};
    (this.tmp.objectTexts = []),
      (this.tmp.objects = []),
      (this.tmp.score = this.score ? this.score : 10);
    this.tmp.error = undefined;

    // Array of item positions corresponding to capture groups in the regex
    let arr = this.tmp.regex.exec(s);
    arr.shift(); // first element is the whole match, so discard
    if (this.tmp.mod.reverse) {
      arr = arr.reverse();
    }
    if (this.tmp.mod.func) {
      arr = this.tmp.mod.func(arr);
    }

    Quest.Parser.parser.msg(`..Base score: ${this.tmp.score}`);

    // eslint-disable-next-line no-unreachable-loop
    for (let i = 0; i < arr.length; i += 1) {
      const cmdParams = this.objects[i];
      if (!cmdParams) {
        Quest.IO.errormsg(
          `The command "${this.name}" seems to have an error. It has more capture groups than there are elements in the 'objects' attribute.`,
          true,
        );
        return false;
      }
      if (arr[i] === undefined) {
        Quest.IO.errormsg(
          `The command "${this.name}" seems to have an error. It has captured undefined. This is probably an issue with the command's regular expression.`,
          true,
        );
        return false;
      }
      let score = 0;
      this.tmp.objectTexts.push(arr[i]);

      if (cmdParams.special) {
        // this capture group has been flagged to be special
        const specialError = Quest.Parser.parser.specialText[
          cmdParams.special
        ].error(arr[i], cmdParams);
        if (specialError) {
          this.setError(Quest.Parser.parser.BAD_SPECIAL, specialError);
        }
        const special = Quest.Parser.parser.specialText[cmdParams.special].exec(
          arr[i],
          cmdParams,
        );
        if (special !== false) this.tmp.objects.push(special);
        score = 1;
        if (special.name) {
          Quest.Parser.parser.msg(
            `-> special match object found: ${special.name}`,
          );
        } else {
          Quest.Parser.parser.msg(`-> special match found: ${special}`);
        }
      } else if (
        Quest.lang.all_regex.test(arr[i]) ||
        Quest.lang.all_exclude_regex.test(arr[i])
      ) {
        // Handle ALL and ALL BUT
        this.tmp.all = true;
        if (!cmdParams.multiple) {
          this.setError(
            Quest.Parser.parser.DISALLOWED_MULTIPLE,
            Quest.lang.no_multiples_msg,
          );
        }
        if (!cmdParams.scope) {
          log(`WARNING: Command without scope - ${this.name}`);
        }

        let scope = Quest.Parser.parser.getScope(cmdParams);
        const exclude = [Quest.World.player];

        // anything flagged as scenery should be excluded
        for (const item of scope) {
          if (item.scenery || item.excludeFromAll) exclude.push(item);
        }

        if (Quest.lang.all_exclude_regex.test(arr[i])) {
          // if this is ALL BUT we need to remove some things from the list
          // excludes must be in isVisible
          // if it is ambiguous or not recognised it does not get added to the list
          const s = arr[i].replace(Quest.lang.all_exclude_regex, '').trim();
          const objectNames = s
            .split(Quest.lang.joiner_regex)
            .map((el: any) => el.trim());
          for (const s in objectNames) {
            const items = Quest.Parser.parser.findInList(
              s,
              Quest.World.world.scope,
            );
            if (items.length === 1) exclude.push(items[0]);
          }
        }
        scope = scope.filter((el: any) => !exclude.includes(el));
        if (scope.length > 1 && !cmdParams.multiple) {
          this.setError(
            Quest.Parser.parser.DISALLOWED_MULTIPLE,
            Quest.lang.no_multiples_msg,
          );
        }
        if (scope.length === 0) {
          this.setError(
            Quest.Parser.parser.NONE_FOR_ALL,
            this.nothingForAll ? this.nothingForAll : Quest.lang.nothing_msg,
          );
        }
        score = 2;
        this.tmp.objects.push(scope.map((el: any) => [el]));
      } else {
        if (!cmdParams.scope) {
          warn(
            'No scope found in command. This may be because the scope specified does not exist; check the spelling. The command in question is:',
          );
          log(this);
          Quest.Parser.parser.msg('ERROR: No scope');
          return false;
        }
        const scope = Quest.Parser.parser.getScopes(cmdParams);
        Quest.Parser.parser.matchToNames(arr[i], scope, cmdParams, this.tmp);
        if (this.tmp.score === Quest.Parser.parser.NO_OBJECT) {
          this.tmp.error = this.noobjecterror(this.tmp.error_s, i);
          if (this.objects.length > 1) {
            this.tmp.score += 10;
          }
          Quest.Parser.parser.msg(
            `Result score is (no object): ${this.tmp.score}`,
          );
          return false;
        }
      }
      Quest.Parser.parser.msg(`...Adding to the score: ${score}`);
      Quest.Parser.parser.msg(`Result score is: ${this.tmp.score}`);
      this.tmp.score += score;
      return true;
    }
  }

  mod: any;

  name: string;

  noobjecterror(s: any) {
    return Quest.lang.object_unknown_msg(s);
  }

  noTurnscripts?: boolean;

  objects: any[] = [];

  objectTexts?: any[];

  processCommand(options: any) {
    for (const rule of this.rules) {
      if (typeof rule !== 'function') {
        Quest.IO.errormsg(
          `Failed to process command '${this.name}' as one of its rules is not a function.`,
        );
        log(this);
        log(rule);
      }
      if (!rule(this, options)) return false;
    }
    let result = Quest.Utilities.printOrRun(
      options.char,
      options.item,
      this.attName,
      options,
    );
    if (
      typeof result !== 'boolean' &&
      result !== Quest.World.world.SUCCESS_NO_TURNSCRIPTS
    ) {
      // Assume the author wants to return true from the verb
      result = true;
    }
    return result;
  }

  regex: any;

  regexes?: RegExp[];

  rules: any[] = [];

  score: any;

  // This is the default script for commands
  // Assumes objects is:
  // optionally the verb, a string
  // an array of objects - each object will have the attribute indicated by attName called
  // optionally an array of one object
  script(objects: any) {
    let success = false;
    let suppressEndturn = false;
    let verb;
    if (typeof objects[0] === 'string') verb = objects.shift();
    let secondItem;
    if (objects.length > 1) secondItem = objects[1][0];
    const multiple =
      objects[0] &&
      (objects[0].length > 1 || Quest.Parser.parser.currentCommand.all);
    if (objects[0].length === 0) {
      Quest.IO.metamsg(Quest.lang.nothing_msg);
      return Quest.World.world.FAILED;
    }
    for (let i = 0; i < objects[0].length; i++) {
      const options = {
        char: Quest.World.player,
        item: objects[0][i],
        multiple,
        secondItem,
        verb,
      };
      const obj = objects[0][i];
      if (!obj[`${this.attName}_count`]) obj[`${this.attName}_count`] = 0;
      if (!obj[this.attName]) {
        this.default(options);
      } else {
        const result = this.processCommand(options);
        if (result === Quest.World.world.SUCCESS_NO_TURNSCRIPTS) {
          suppressEndturn = true;
          obj[`${this.attName}_count`] += 1;
          success = true;
        }
      }
    }
    if (success) {
      return this.noTurnscripts || suppressEndturn
        ? Quest.World.world.SUCCESS_NO_TURNSCRIPTS
        : Quest.World.world.SUCCESS;
    }

    return Quest.World.world.FAILED;
  }

  // This is the second script for commands
  // Assumes a verb and two objects; the verb may or may not be the first object
  scriptWith(objects: any) {
    let success = false;
    let suppressEndturn = false;
    let verb;
    if (objects.length > 2) verb = objects.shift();
    const multiple =
      objects[0] &&
      (objects[0].length > 1 || Quest.Parser.parser.currentCommand.all);
    if (objects[0].length === 0) {
      Quest.IO.metamsg(Quest.lang.nothing_msg);
      return Quest.World.world.FAILED;
    }
    for (let i = 0; i < objects[0].length; i += 1) {
      const options = {
        char: Quest.World.player,
        item: objects[0][i],
        multiple,
        verb,
        with: objects[1][0],
      };
      if (!objects[0][i][this.attName]) {
        this.default(options);
      } else {
        let result = this.processCommand(options);
        if (result === Quest.World.world.SUCCESS_NO_TURNSCRIPTS) {
          suppressEndturn = true;
          result = true;
        }
        success = result || success;
      }
    }
    if (success) {
      return this.noTurnscripts || suppressEndturn
        ? Quest.World.world.SUCCESS_NO_TURNSCRIPTS
        : Quest.World.world.SUCCESS;
    }

    return Quest.World.world.FAILED;
  }

  // If this has multiple parts the error probably takes priority
  // GET STUFF -> assume item
  // FILL JUG WITH WATER -> assume fluid
  setError(score: any, msg: any) {
    this.tmp = this.tmp || {};
    this.tmp.error = msg;
    this.tmp.score = score;
    if (this.objects.length > 1) {
      this.tmp.score += 10;
    }
    Quest.Parser.parser.msg(`Match failed: ${this.tmp.score} (${msg})`);
  }

  tmp?: Partial<Cmd> = {};

  withScript: any;

  [key: string]: any;

  constructor(name: string, hash: any) {
    this.name = name;
    Object.assign(this, hash);

    this.attName = this.attName ? this.attName : this.name.toLowerCase();
    for (const key in this.objects) {
      if (!this.objects[key].attName) {
        this.objects[key].attName = this.attName;
      }
    }
    if (!this.regex && !this.regexes) {
      this.regexes = Array.isArray(Quest.lang.regex[this.name])
        ? Quest.lang.regex[this.name]
        : [Quest.lang.regex[this.name]];
    }
    if (this.withScript) this.script = this.scriptWith;
  }
}
