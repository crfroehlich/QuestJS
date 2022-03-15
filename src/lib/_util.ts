namespace Quest {
  export namespace Utilities {
    // ============  Utilities  =================================

    // Should all be language neutral
    export const INDEFINITE = 1
    export const DEFINITE = 2
    export const COUNT = 3
    export const NULL_FUNC = function () { }

    export const test = {
      testing: false,
    };

    // If we try to do anything fancy with log we get this line number not the calling line
    export const log = console.log
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    const debuglog = (s: any) => { if (Quest.Settings.settings.playMode === 'dev' || Quest.Settings.settings.playMode === 'beta') { log(s) } }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
    const parserlog = (s: any) => { if (Quest.Parser.parser.debug) { log(s) } }

    //@DOC
    // Runs the given string as though the player typed it, including recording it in the output
    export function runCmd(cmd: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgInputText' does not exist on type '{ ... Remove this comment to see the full error message
      Quest.IO.io.msgInputText(cmd)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
      Quest.Parser.parser.parse(cmd)
    }

    export function doOnce(o: any, s: any) {
      if (s === undefined) s = 'unspecifiedDoOnceFlag'
      if (o[s]) return false
      o[s] = true
      return true
    }

    //@DOC
    // If the given attribute is a string it is printed, if it is a
    // function it is called. Otherwise an error is generated.
    // If options.multiple is true, the object name is prefixed.
    export function printOrRun(char: any, item: any, attname: any, options: any) {
      if (options === undefined) options = {};

      if (typeof item[attname] === "string") {
        // The attribute is a string
        let s = item[attname]
        if (item[attname + 'Addendum']) s += item[attname + 'Addendum'](char)
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(s, { char: char, item: item });
        return true;
      }
      else if (typeof item[attname] === "function") {
        // The attribute is a function
        const res = item[attname](options);
        return res;
      }
      else {
        const s = "Unsupported type for printOrRun (" + attname + " is a " + (typeof item[attname]) + ")."
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg(s + " F12 for more.")
        throw new Error(s)
      }
    }

    export function verbify(s: any) { return s.toLowerCase().replace(/[^a-zA-Z0-9_]/g, ''); }

    // ============  String Utilities  =======================================
    //@DOC
    // ## String Functions
    //@UNDOC

    //@DOC
    // Returns the string with the first letter capitalised
    export function sentenceCase(str: any) {
      if (str.length === 0) return ''
      return str.replace(str[0], str[0].toUpperCase())
    }

    //@DOC
    // Returns the string with the first letter of each word capitalised
    export function titleCase(str: any) {
      return str.toLowerCase().split(' ').map((el: any) => el.replace(el[0], el[0].toUpperCase())).join(' ');
    }


    //@DOC
    // Returns a string with the given number of hard spaces. Browsers collapse multiple white spaces to just show
    // one, so you need to use hard spaces (NBSPs) if you want several together.
    export function spaces(n: any) {
      return "&nbsp;".repeat(n)
    }

    //@DOC
    // If multiple is true, returns the item name, otherwise nothing. This is useful in commands that handle
    // multiple objects, as you can have this at the start of the response string. For example, if the player does GET BALL,
    // the response might be "Done". If she does GET ALL, then the response for the ball needs to be "Ball: Done".
    // In the command, you can have `Quest.IO.msg("Done"), and it is sorted.
    function prefix(item: any, options: any) {
      if (!options.multiple) { return ""; }
      return sentenceCase(item.alias) + ": ";
    }

    //@DOC
    // Creates a string from an array. If the array element is a string, that is used, if it is an item, `Quest.lang.getName` is used (and passed the `options`). Items are sorted alphabetically, based on the "name" attribute.
    //
    // Options:
    //
    // * article:    Quest.DEFINITE (for "the") or Quest.INDEFINITE (for "a"), defaults to none (see `Quest.lang.getName`)
    // * sep:        separator (defaults to comma)
    // * lastJoiner: separator for last two items (just separator if not provided); you should not include any spaces
    // * modified:   item aliases modified (see `Quest.lang.getName`) (defaults to false)
    // * nothing:    return this if the list is empty (defaults to empty string)
    // * count:      if this is a number, the name will be prefixed by that (instead of the article)
    // * doNotSort   if true the list is not sorted
    // * separateEnsembles:  if true, ensembles are listed as the separate items
    //
    // For example:
    //
    // ```
    // formatList(listOfOjects, {article:Quest.INDEFINITE, lastJoiner:"and"})
    // -> "a hat, Mary and some boots"
    //
    // formatList(list, {lastJoiner:"or", nothing:"nowhere");
    // -> north, east or up
    // ```
    //
    export function formatList(itemArray: any, options: any) {
      if (options === undefined) { options = {}; }

      if (itemArray.length === 0) {
        return options.nothing ? options.nothing : "";
      }

      if (!options.sep) options.sep = ","


      if (!options.separateEnsembles) {
        const toRemove = [];
        const toAdd: any = [];
        for (let item of itemArray) {
          if (item.ensembleMaster && item.ensembleMaster.isAllTogether()) {
            toRemove.push(item);
            if (!toAdd.includes(item.ensembleMaster)) toAdd.push(item.ensembleMaster);
          }
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'subtract' does not exist on type '{}'.
        itemArray = array.subtract(itemArray, toRemove);
        itemArray = itemArray.concat(toAdd);
      }

      // sort the list alphabetically on name
      if (!options.doNotSort) {
        itemArray.sort(function (a: any, b: any) {
          if (a.name) a = a.name;
          if (b.name) b = b.name;
          return a.localeCompare(b)
        });
      }

      const l = itemArray.map((el: any) => {
        //if (el === undefined) return "[undefined]";
        return typeof el === "string" ? el : Quest.lang.getName(el, options)
      })


      let s = "";
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'oxfordComma' does not exist on type '{ p... Remove this comment to see the full error message
      if (Quest.Settings.settings.oxfordComma && l.length === 2 && options.lastJoiner) return l[0] + ' ' + options.lastJoiner + ' ' + l[1]
      do {
        s += l.shift()
        if (l.length === 1 && options.lastJoiner) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'oxfordComma' does not exist on type '{ p... Remove this comment to see the full error message
          if (Quest.Settings.settings.oxfordComma) s += options.sep
          s += ' ' + options.lastJoiner + ' '
        } else if (l.length > 0) s += options.sep + ' '
      } while (l.length > 0);

      return s;
    }

    //@DOC
    // Lists the properties of the given object; useful for debugging only.
    // To inspect an object use JSON.stringify(obj)
    function listProperties(obj: any) {
      return Object.keys(obj).join(", ");
    }

    const arabic = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const roman = "M;CM;D;CD;C;XC;L;XL;X;IX;V;IV;I".split(";");

    //@DOC
    // Returns the given number as a string in Roman numerals. 
    export function toRoman(number: any) {
      if (typeof number !== "number") {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg("toRoman can only handle numbers");
        return number;
      }

      let result = "";
      //var a, r;
      for (let i = 0; i < 13; i++) {
        while (number >= arabic[i]) {
          result = result + roman[i];
          number = number - arabic[i];
        }
      }
      return result;
    }

    //@DOC
    // Returns the given number as a string formatted as money. The formatting is defined by Quest.Settings.settings.moneyFormat.
    export function displayMoney(n: any) {
      if (typeof Quest.Settings.settings.moneyFormat === "undefined") {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg("No format for money set (set Quest.Settings.settings.moneyFormat in Quest.Settings.settings.js).");
        return "" + n;
      }
      const ary = Quest.Settings.settings.moneyFormat.split("!");
      if (ary.length === 2) {
        return Quest.Settings.settings.moneyFormat.replace("!", "" + n);
      }
      else if (ary.length === 3) {
        const negative = (n < 0)
        n = Math.abs(n);
        let options = ary[1]
        const showsign = options.startsWith("+")
        if (showsign) {
          options = options.substring(1);
        }
        let number = displayNumber(n, options)
        if (negative) {
          number = "-" + number;
        }
        else if (n !== 0 && showsign) {
          number = "+" + number;
        }
        return (ary[0] + number + ary[2]);
      }
      else if (ary.length === 4) {
        const options = n < 0 ? ary[2] : ary[1];
        return ary[0] + displayNumber(n, options) + ary[3];
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg("Quest.Settings.settings.moneyFormat in Quest.Settings.settings.js expected to have either 1, 2 or 3 exclamation marks.")
        return "" + n;
      }
    }

    //@DOC
    // Returns the given number as a string formatted as per the control string.
    // The control string is made up of five parts.
    // The first is a sequence of characters that are not digits that will be added to the start of the string, and is optional.
    // The second is a sequence of digits and it the number of characters left of the decimal point; this is padded with zeros to make it longer.
    // The third is a single non-digit character; the decimal marker.
    // The fourth is a sequence of digits and it the number of characters right of the decimal point; this is padded with zeros to make it longer.
    // The fifth is a sequence of characters that are not digits that will be added to the end of the string, and is optional.
    export function displayNumber(n: any, control: any) {
      n = Math.abs(n);  // must be positive
      const regex = /^(\D*)(\d+)(\D)(\d*)(\D*)$/;
      if (!regex.test(control)) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg("Unexpected format in displayNumber (" + control + "). Should be a number, followed by a single character separator, followed by a number.");
        return "" + n;
      }
      const options = regex.exec(control);
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      const places = parseInt(options[4]);                      // eg 2
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      let padding = parseInt(options[2]);             // eg 3
      if (places > 0) {
        // We want a decimal point, so the padding, the total length, needs that plus the places
        padding = padding + 1 + places;               // eg 6
      }
      const factor = Math.pow(10, places)            // eg 100
      const base = (n / factor).toFixed(places);      // eg "12.34"
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      const decimal = base.replace(".", options[3])   // eg "12,34"
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      return (options[1] + decimal.padStart(padding, "0") + options[5])   // eg "(012,34)"
    }

    //@DOC
    // Converts the string to the standard direction name, so "down", "dn" and "d" will all return "down".
    // Uses the EXITS array, so language neutral.
    export function getDir(s: any) {
      for (let exit of Quest.lang.exit_list) {
        if (exit.type === 'nocmd') continue;
        if (exit.name === s) return exit.name;
        if (exit.abbrev.toLowerCase() === s) return exit.name;
        if (new RegExp("^(" + exit.alt + ")$").test(s)) return exit.name;
      }
      return false;
    }

    // ============  Array Utilities  =======================================
    //@DOC
    // ## Array (List) Functions
    //@UNDOC
    export const array = {

      //@DOC
      // Returns a new array, derived by subtracting each element in b from the array a.
      // If b is not an array, then b itself will be removed.
      // Unit tested.
      subtract: function (a: any, b: any) {
        if (!Array.isArray(b)) b = [b]
        const res = []
        for (let i = 0; i < a.length; i++) {
          if (!b.includes(a[i])) res.push(a[i]);
        }
        return res;
      },

      //@DOC
      // Returns true if the arrays a and b are equal. They are equal if both are arrays, they have the same length,
      // and each element in order is the same.
      // Assumes a is an array, but not b.
      // Unit tested
      compare: function (a: any, b: any) {
        if (!Array.isArray(b)) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (b[i] !== a[i]) return false;
        }
        return true;
      },

      //@DOC
      // Returns true if each element in a matches the elements in b, but not necessarily in the same order
      // (assumes each element is unique; repeated elements may give spurious results).
      // Assumes a is an array, but not b.
      // Unit tested
      compareUnordered: function (a: any, b: any) {
        if (!Array.isArray(b)) return false;
        if (a.length !== b.length) return false;
        for (let el of a) {
          if (!b.includes(el)) return false;
        }
        return true;
      },

      //@DOC
      // Removes the element el from the array, ary.
      // Unlike array.subtract, no new array is created; the original array is modified, and nothing is returned.
      remove: function (ary: any, el: any) {
        let index = ary.indexOf(el)
        if (index !== -1) {
          ary.splice(index, 1)
        }
      },

      //@DOC
      // Returns a new array containing all the elements that are in both the given arrays.
      // Assumes no duplicates in the arrays
      intersection: function (ary1: any, ary2: any) {
        return ary1.filter(function (x: any) {
          // checking second array contains the element "x"
          if (ary2.indexOf(x) != -1)
            return true;
          else
            return false;
        });
      },

      //@DOC
      // Returns a new array based on ary, but including only those objects for which the attribute attName is equal to value.
      // To filter for objects that do not have the attribute you can filter for the value undefined.
      filterByAttribute: function (ary: any, attName: any, value: any) {
        return ary.filter((el: any) => el[attName] === value);
      },

      //@DOC
      // Returns the next element after el from the array, ary.
      // If el is present more than once, it goes with the first.
      // If el is the last element, and circular is true it return the fist element and false otherwise.
      next: function (ary: any, el: any, circular: any) {
        let index = ary.indexOf(el) + 1
        if (index === 0) return false
        if (index === ary.length) return circular ? ary[0] : false
        return ary[index]
      },

      //@DOC
      // Returns the next element after el from the array, ary, for which the attribute, att, is true.
      // If el is present more than once, it goes with the first.
      // If el is the last element, and circular is true it return the fist element and false otherwise.
      nextFlagged: function (ary: any, el: any, att: any, circular: any) {
        let o = el
        let count = ary.length
        while (o && !o[att] && count > 0) {
          o = array.next(ary, o, circular)
          count = count - 1
        }
        if (!o || !o[att]) return false
        return (o)
      },

      //@DOC
      // Returns a copy of the given array. Members of the array are not cloned.
      clone: function (ary: any, options: any) {
        if (!options) options = {}
        let newary = options.compress ? [...new Set(ary)] : [...ary]
        if (options.value) newary = newary.map(el => el[options.value])
        if (options.function) newary = newary.map(el => el[options.function]())
        if (options.attribute) newary = newary.map(el => typeof el[options.attribute] === 'function' ? el[options.attribute]() : el[options.attribute])
        return options.reverse ? newary.reverse() : newary
      },

      //@DOC
      // Returns true if any member of the array matches the string.
      // It is a match if the element is also a string and they are the same or
      // if the elem,ent is a regex and the pattern matches
      hasMatch: function (ary: any, s: any) {
        for (let e of ary) {
          if (typeof e === 'string' && e === s) return true
          if (e instanceof RegExp && s.match(e)) return true
        }
        return false
      },

      //@DOC
      // Returns an array of combinations based on the given array
      // Combinations have between one and three elements from the original array
      // and will be in the original order.
      // Each combination is a string with the elements separated with a space.
      // Used by the parser (in case it seems obscure and pointless!)
      combos: function (ary: any, sep = ' ') {
        const res = []
        for (let i = 0; i < ary.length; i++) {
          res.push(ary[i])
          for (let j = i + 1; j < ary.length; j++) {
            res.push(ary[i] + sep + ary[j])
            for (let k = j + 1; k < ary.length; k++) {
              res.push(ary[i] + sep + ary[j] + sep + ary[k])
            }
          }
        }
        return res
      },

      fromTokens: function (ary: any, scope: any, cmdParams: any) {
        const items = []
        while (ary.length > 0) {
          const res = array.oneFromTokens(ary, scope, cmdParams)
          if (!res) return null
          items.push(res)
        }
        return items
      },

      oneFromTokens: function (ary: any, scope: any, cmdParams = {}) {
        for (let i = ary.length; i > 0; i--) {
          const s = ary.slice(0, i).join(' ')
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInList' does not exist on type '{}'.
          const items = Quest.Parser.parser.findInList(s, scope, cmdParams)
          if (items.length > 0) {
            for (let j = 0; j < i; j++) ary.shift()
            return items
          }
        }
        return null
      },

      value: function (ary: any, index: any, opt: any) {
        if (index >= ary.length || index < 0) {
          if (opt === 'none') return ''
          if (opt === 'wrap') return ary[index % ary.length]
          if (opt === 'end') return ary[ary.length - 1]
          if (opt === 'start') return ary[0]
        }
        return ary[index]
      },
    };

    // ============  Scope Utilities  =======================================

    //@DOC
    // ## Scope Functions
    //@UNDOC

    //@DOC
    // Returns an array of objects the player can currently reach and see.
    export function scopeReachable() {
      const list = [];
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (w[key].scopeStatus.canReach && world.ifNotDark(w[key])) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          list.push(w[key]);
        }
      }
      return list;
    }

    //@DOC
    // Returns an array of objects held by the given character.
    export function scopeHeldBy(chr = player, situation = world.PARSER) {
      return chr.getContents(situation)
    }

    //@DOC
    // Returns an array of objects at the player's location that can be seen.
    export function scopeHereListed() {
      const list = [];
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const o = w[key]
        if (!o.player && o.isAtLoc(player.loc, world.LOOK) && world.ifNotDark(o)) {
          list.push(o);
        }
      }
      return list;
    }

    //@DOC
    // Returns an array of objects at the player's location that can be seen.
    export function scopeHereParser() {
      const list = [];
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const o = w[key]
        if (!o.player && o.isAtLoc(player.loc, world.PARSER)) {
          list.push(o);
        }
      }
      return list;
    }


    //@DOC
    // Returns an array of NPCs at the player's location (excludes those flagged as scenery).
    function scopeNpcHere(ignoreDark: any) {
      const list = [];
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const o = w[key]
        if (o.isAtLoc(player.loc, world.LOOK) && o.npc && (world.ifNotDark(o) || ignoreDark)) {
          list.push(o);
        }
      }
      return list;
    }


    //@DOC
    // Returns an array of NPCs at the player's location (includes those flagged as scenery).
    export function scopeAllNpcHere(ignoreDark: any) {
      const list = [];
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const o = w[key]
        if (o.isAtLoc(player.loc, world.PARSER) && o.npc && (world.ifNotDark(o) || ignoreDark)) {
          list.push(o);
        }
      }
      return list;
    }


    //@DOC
    // Returns an array of objects for which the given function returns true.
    function scopeBy(func: any) {
      const list = [];
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (func(w[key])) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          list.push(w[key]);
        }
      }
      return list;
    }


    export const util = {
      getContents: function (situation: any) {
        const list = [];
        for (let key in w) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (w[key].isAtLoc(this.name, situation)) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            list.push(w[key]);
          }
        }
        return list;
      },

      // Is this container already inside the given object, and hence
      // putting the object in the container will destroy the universe
      testForRecursion: function (char: any, item: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
        let contName = this.name;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        while (w[contName]) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (w[contName].loc === item.name) return falsemsg(Quest.lang.container_recursion, { char: char, container: this, item: item })
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          contName = w[contName].loc
        }
        return true;
      },

      nameModifierFunctionForContainer: function (o: any, list: any) {
        //console.log("here")
        const contents = o.getContents(world.LOOK);
        //console.log(contents)
        if (contents.length > 0 && (!o.closed || o.transparent)) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          list.push(Quest.lang.contentsForData[o.contentsType].prefix + o.listContents(world.LOOK) + Quest.lang.contentsForData[o.contentsType].suffix)
        }
        //console.log(list)
      },

      //@DOC
      // Returns the given number, num, but restricted to lie
      // between min and max; i.e., if number is less than min,
      // then min will be returned instead.
      clamp: function (num: any, min: any, max: any) {
        return num <= min ? min : (num >= max ? max : num)
      },

      registerTimerFunction: function (eventName: any, func: any) {
        if (world.isCreated && !Quest.Settings.settings.saveDisabled) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg("Attempting to use registerEvent after set up.")
          return
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        Quest.Settings.settings.eventFunctions[eventName] = func;
      },

      registerTimerEvent: function (eventName: any, triggerTime: any, interval: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!Quest.Settings.settings.eventFunctions[eventName]) Quest.IO.errormsg("A timer is trying to call event '" + eventName + "' but no such function is registered.")
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        game.timerEventNames.push(eventName)
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        game.timerEventTriggerTimes.push(triggerTime)
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        game.timerEventIntervals.push(interval ? interval : -1)
      },

      findTopic: function (alias: any, char: any, n = 1) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (w[alias]) return w[alias]
        for (const key in w) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const o = w[key]
          if (o.conversationTopic && (!char || o.belongsTo(char.name)) && o.alias === alias) {
            n--
            if (n === 0) return o
          }
        }
        if (char) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg("Trying to find topic " + n + " called \"" + alias + "\" for " + char.name + " and came up empty-handed!")
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg("Trying to find topic " + n + " called \"" + alias + "\" for anyone and came up empty-handed!")
        }
      },

      changeListeners: [],

      // This is used in world.endTurn, before turn events are run, and after too (just once if no turn events). Also after timer events if one fired
      handleChangeListeners: function () {
        for (let el of util.changeListeners) {
          if (el.test(el.object, el.object[el.attName], el.oldValue, el.attName)) {
            el.func(el.object, el.object[el.attName], el.oldValue, el.attName)
          }
          el.oldValue = el.object[el.attName]
        }
      },

      defaultChangeListenerTest: function (object: any, currentValue: any, oldValue: any, attName: any) {
        return currentValue !== oldValue
      },

      addChangeListener: function (object: any, attName: any, func: any, test = util.defaultChangeListenerTest) {
        if (world.isCreated && !Quest.Settings.settings.saveDisabled) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg("Attempting to use addChangeListener after set up.")
          return
        }
        util.changeListeners.push({ object: object, attName: attName, func: func, test: test, oldValue: object[attName] })
      },

      getChangeListenersSaveString: function () {
        if (util.changeListeners.length === 0) return "NoChangeListeners"
        const strings = util.changeListeners.map((el: any) => el.oldValue.toString())
        const s = "ChangeListenersUsedStrings=" + Quest.SaveLoad.saveLoad.encodeArray(strings);
        return s;
      },

      setChangeListenersLoadString: function (s: any) {
        if (s === "NoChangeListeners") return
        const parts = s.split("=");
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (parts.length !== 2) return Quest.IO.errormsg("Bad format in saved data (" + s + ")")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (parts[0] !== "ChangeListenersUsedStrings") return Quest.IO.errormsg("Expected ChangeListenersUsedStrings to be first")
        const strings = Quest.SaveLoad.saveLoad.decodeArray(parts[1])
        for (let i = 0; i < strings.length; i++) {
          util.changeListeners[i].oldValue = strings[i].match(/^\d+$/) ? parseInt(strings[i]) : strings[i]
        }
      },

      findResponse: function (params: any, list: any) {
        for (let item of list) {
          if (item.test && !item.test(params)) continue
          if (item.responses) return util.findResponse(params, item.responses)
          return item
        }
        return false
      },

      addResponse: function (route: any, data: any, list: any) {
        util.addResponseToList(route, data, list)
      },

      addResponseToList: function (route: any, data: any, list: any) {
        const sublist = util.getResponseSubList(route, list)
        sublist.unshift(data)
      },

      getResponseSubList: function (route: any, list: any) {
        const s = route.shift()
        if (s) {
          const sublist = list.find((el: any) => el.name === s)
          if (!sublist) throw "Failed to add sub-list with " + s
          return util.getResponseSubList(route, sublist.responses)
        }
        else {
          return list
        }
      },

      verifyResponses: function (list: any, level: any) {
        //  console.log(list)
        if (level === undefined) level = 1
        if (list[list.length - 1].test) {
          console.log("WARNING: Last entry at depth " + level + " has a test condition:")
          console.log(list)
        }
        for (let item of list) {
          if (item.responses) {
            //console.log(item.name)
            if (item.responses.length === 0) {
              console.log("Zero responses at depth " + level + " for: " + item.name)
            }
            else {
              util.verifyResponses(item.responses, level + 1)
            }
          }
        }
      },


      // This should be assigned to an object, and then used from there
      listContents: function (situation: any, modified = true) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{}'... Remove this comment to see the full error message
        return formatList(this.getContents(situation), { article: Quest.INDEFINITE, lastJoiner: Quest.lang.list_and, modified: modified, nothing: Quest.lang.list_nothing, loc: this.name })
      },



      //@DOC
      // Returns the number of the internal the given number falls in
      // For example, if intervals
      // Unit tested.
      getByInterval: function (intervals: any, n: any) {
        let count = 0
        while (count < intervals.length) {
          if (n < intervals[count]) return count
          n -= intervals[count]
          count++
        }
        return false
      },




      guessMyType: function (value: any) {
        if (value.match(/^\d+$/)) value = parseInt(value)
        if (value === 'true') value = true
        if (value === 'false') value = false
        if (value === 'undefined') value = undefined
        return value
      },




      //@DOC
      // Returns a string formatted in CSS from the given dictionary.
      // If includeCurlyBraces is true, you get curly braces too.
      dictionaryToCss: function (d: any, includeCurlyBraces: any) {
        const ary = []
        for (let key in d) ary.push(key + ':' + d[key])
        return includeCurlyBraces ? '{' + ary.join(';') + '}' : ary.join(';')
      },


      getNameModifiers: function (item: any, options: any) {
        if (!options.modified) return ''
        const list: any = []
        for (let f of item.nameModifierFunctions) f(item, list, options)
        if (item.nameModifierFunction) item.nameModifierFunction(list, options)
        if (list.length === 0) return ''
        if (options.noBrackets) return ' ' + list.join('; ')
        return ' (' + list.join('; ') + ')'
      },

      //@DOC
      // Returns the game time as a string. The game time is game.elapsedTime seconds after game.startTime.
      getDateTime: function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'formats' does not exist on type '{ year:... Remove this comment to see the full error message
        if (!Quest.Settings.settings.dateTime.formats) {
          const time = new Date(game.elapsedTime * 1000 + game.startTime.getTime())
          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ year: string; month: string; d... Remove this comment to see the full error message
          return time.toLocaleString(Quest.Settings.settings.dateTime.locale, Quest.Settings.settings.dateTime)
        }
        return util.getCustomDateTime(options)
      },

      getDateTimeDict: function (options: any) {
        if (!options) options = {}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'formats' does not exist on type '{ year:... Remove this comment to see the full error message
        return Quest.Settings.settings.dateTime.formats ? util.getCustomDateTimeDict(options) : util.getStdDateTimeDict(options)
      },

      getStdDateTimeDict: function (options: any) {
        const dict = {}
        let timeInSeconds = game.elapsedTime
        if (options.add) timeInSeconds += options.add
        const time = new Date(timeInSeconds * 1000 + game.startTime.getTime())
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'second' does not exist on type '{}'.
        dict.second = time.getSeconds()
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'minute' does not exist on type '{}'.
        dict.minute = time.getMinutes()
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hour' does not exist on type '{}'.
        dict.hour = time.getHours()
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'date' does not exist on type '{}'.
        dict.date = time.getDate()
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'weekday' does not exist on type '{}'.
        dict.weekday = time.toLocaleString('default', { weekday: 'long' })
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'month' does not exist on type '{}'.
        dict.month = time.toLocaleString('default', { month: 'long' })
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'year' does not exist on type '{}'.
        dict.year = time.getFullYear()

        return dict
      },

      getCustomDateTimeDict: function (options: any) {
        const dict = {}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'startTime' does not exist on type '{ yea... Remove this comment to see the full error message
        let time = Quest.Settings.settings.dateTime.startTime + game.elapsedTime
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'startTime' does not exist on type '{ yea... Remove this comment to see the full error message
        if (options.is) time = Quest.Settings.settings.dateTime.startTime + options.is
        if (options.add) time += options.add
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type '{ year: st... Remove this comment to see the full error message
        for (let el of Quest.Settings.settings.dateTime.data) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          dict[el.name] = time % el.number
          time = Math.floor(time / el.number)
        }
        return dict
      },

      getCustomDateTime: function (options: any) {
        if (!options) options = {}
        const dict = util.getCustomDateTimeDict(options)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'formats' does not exist on type '{ year:... Remove this comment to see the full error message
        let s = options.format ? Quest.Settings.settings.dateTime.formats[options.format] : Quest.Settings.settings.dateTime.formats.def
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'functions' does not exist on type '{ yea... Remove this comment to see the full error message
        for (let key in Quest.Settings.settings.dateTime.functions) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'functions' does not exist on type '{ yea... Remove this comment to see the full error message
          s = s.replace('%' + key + '%', Quest.Settings.settings.dateTime.functions[key](dict))
        }
        return s
      },

      seconds: function (seconds: any, minutes = 0, hours = 0, days = 0) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'convertSeconds' does not exist on type '... Remove this comment to see the full error message
        if (Quest.Settings.settings.dateTime.convertSeconds) return Quest.Settings.settings.dateTime.convertSeconds(seconds, minutes, hours, days)
        return ((((days * 24) + hours) * 60) + minutes) * 60 + seconds
      },

      elapsed: function (seconds: any, minutes = 0, hours = 0, days = 0) {
        return util.seconds(seconds, minutes, hours, days) >= game.elapsedTime
      },

      isAfter: function (timeString: any) {
        if (typeof timeString === 'number') return game.elapsedTime > timeString

        if (timeString.match(/^\d\d\d\d$/)) {
          // This is a 24h clock time, so a daily
          const dict = util.getDateTimeDict()

          const hour = parseInt(timeString.substring(0, 2))
          const minute = parseInt(timeString.substring(2, 4))
          if (hour < dict.hour) return true
          if (hour > dict.hour) return false
          return (minute < dict.minute)
        }

        const nowTime = new Date(game.elapsedTime * 1000 + game.startTime.getTime())
        const targetTime = Date.parse(timeString)
        // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'Date' and... Remove this comment to see the full error message
        if (targetTime) return nowTime > targetTime
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.errormsg("Failed to parse date-time string: " + timeString)
      },


      changePOV: function (char: any, pronouns: any) {
        if (typeof char === 'string') {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!w[char]) return Quest.IO.errormsg("Failed to change POV, no object called '" + char + "'")
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          char = w[char]
        }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        else if (!char) Quest.IO.errormsg("Failed to change POV, char not defined.")

        if (player) {
          player.player = false
          player.pronouns = player.npcPronouns
          player.regex = new RegExp('^(' + (char.npcAlias ? char.npcAlias : char.alias) + ')$')
        }
        char.player = true
        char.npcPronouns = char.pronouns
        char.pronouns = pronouns ? pronouns : Quest.lang.pronouns.secondperson
        char.regex = new RegExp('^(me|myself|player|' + (char.npcAlias ? char.npcAlias : char.alias) + ')$')
        player = char
        player = char
        world.update()
      },

      getObj: function (name: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!name) return Quest.IO.errormsg("Trying to find an object in util.getObj, but name is " + name)
        if (typeof name === 'string') {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const room = w[name]
          if (room === undefined) throw new Error("Failed to find room: " + name + ".")
          return room
        }
        else {
          if (name.name === undefined) {
            throw "Not sure what to do with this room: " + name + " (a " + (typeof name) + ")."
          }
          return name
        }
      },



      findUniqueName: function (s: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!w[s]) {
          return (s);
        }
        else {
          const res = /(\d+)$/.exec(s);
          if (!res) {
            return util.findUniqueName(s + "0");
          }
          const n = parseInt(res[0]) + 1;
          return util.findUniqueName(s.replace(/(\d+)$/, "" + n));
        }
      },


      findSource: function (options: any) {
        const fluids = options.fluid ? [options.fluid] : Quest.Settings.settings.fluids
        const chr = options.char ? options.char : player

        // Is character a source?
        if (chr.isSourceOf) {
          for (const s of fluids) {
            if (chr.isSourceOf(s)) {
              options.source = chr
              options.fluid = s
              return true
            }
          }
        }

        // Is the room a source?
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (w[chr.loc].isSourceOf) {
          for (const s of fluids) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (w[chr.loc].isSourceOf(s)) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              options.source = w[chr.loc]
              options.fluid = s
              return true
            }
          }
        }

        // Is there some other source?
        const items = scopeReachable()
        for (const s of fluids) {
          for (let obj of items) {
            if (obj.isSourceOf && obj.isSourceOf(s)) {
              options.source = obj
              options.fluid = s
              return true
            }
            if (obj.containedFluidName && obj.containedFluidName === s) {
              options.source = obj
              options.fluid = s
              return true
            }
          }
        }
        return false
      },



      multiIsUltimatelyHeldBy: function (obj: any, objNames: any) {
        for (const objName of objNames) {
          if (!objName) continue
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          let o = w[objName]
          if (o === obj) return true
          while (o.loc) {
            if (o.loc === obj.name) return true
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            o = w[o.loc]
          }
        }
        return false
      },

      testAttribute: function (o: any, attName: any) {
        if (typeof o[attName] === 'function') {
          return o[attName]()
        }
        else {
          return o[attName]
        }
      },

      getLoc: function (options: any, loc: any, name: any) {
        if (!loc) return
        if (typeof loc === 'object') {
          options[name] = loc.name
        }
        else if (loc === 'char' || loc === 'name') {
          options[name] = options.char.name
        }
        else if (loc === 'loc' && options.container) {
          options[name] = options.container.name
        }
        else if (loc === 'loc' && options.holder) {
          options[name] = options.holder.name
        }
        else if (loc === 'loc') {
          options[name] = options.char.loc
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        else if (w[loc]) {
          options[name] = loc
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg("Unexpected location in util.setToFrom/util.getLoc: " + loc)
        }
      },


      setToFrom: function (options: any, toLoc: any, fromLoc: any) {
        util.getLoc(options, toLoc, "toLoc")
        util.getLoc(options, fromLoc, "fromLoc")
        return options
      },

      defaultExitUse: function (char: any, exit: any) {
        if (!exit) exit = this
        if (char.testMove && !char.testMove(exit)) return false
        if (exit.isLocked()) {
          return falsemsg(exit.lockedmsg ? exit.lockedmsg : Quest.lang.locked_exit, { char: char, exit: exit })
        }
        if (exit.testExit && !exit.testExit(char, exit)) return false
        for (const el of char.getCarrying()) {
          if (el.testCarry && !el.testCarry({ char: char, item: el, exit: exit })) return false
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'simpleUse' does not exist on type '{}'.
        return this.simpleUse ? this.simpleUse(char) : util.defaultSimpleExitUse(char, exit)
      },



      defaultSimpleExitUse: function (char: any, exit: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (exit.name === '_') return Quest.IO.errormsg("Trying to move character to location \"_\" from room " + exit.origin.name + ". This is probably a bug, as \"_\" is used to flag a destination that cannot be reached.")
        if (exit === undefined) exit = this

        char.Quest.IO.msg(Quest.lang.stop_posture(char))
        char.movingMsg(exit)
        char.moveChar(exit)
        return true
      },


      // Helper function for exits.
      // You must set "door" and can optionally set "doorName" in the exit attributes
      useWithDoor: function (char: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const obj = w[this.door];
        if (obj === undefined) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg("Not found an object called '" + this.door + "'. Any exit that uses the 'util.useWithDoor' function must also set a 'door' attribute.");
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doorName' does not exist on type '{}'.
        const tpParams = { char: char, doorName: this.doorName ? this.doorName : "door" }
        if (!obj.closed) {
          char.moveChar(this)
          return true
        }
        if (!obj.locked) {
          obj.closed = false
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.open_and_enter, tpParams)
          char.moveChar(this)
          return true
        }
        if (obj.testKeys(char)) {
          obj.closed = false
          obj.locked = false
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.unlock_and_enter, tpParams)
          char.moveChar(this)
          return true
        }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(Quest.lang.try_but_locked, tpParams)
        return false
      },


      // Helper function for exits.
      // You can optionally set "msg" in the exit attributes
      cannotUse: function (char: any, dir: any) {
        const tpParams = { char: char }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msg ? this.msg : Quest.lang.try_but_locked, tpParams)
        return false
      },
    };

    // ============  Response Utilities  =======================================

    //@DOC
    // ## The Respond Function
    //@UNDOC

    //@DOC
    // Searchs the given list for a suitable response, according to the given params, and runs that response.
    // This is a big topic, see [here](https://github.com/ThePix/QuestJS/wiki/The-respond-function) for more.
    export function respond(params: any, list: any, func: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'responseDebug' does not exist on type '{... Remove this comment to see the full error message
      if (Quest.Settings.settings.responseDebug) log(params)
      const response = util.findResponse(params, list)
      if (!response) {
        if (func) func(params)
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg("Failed to find a response. ASK/TELL or some other system using the respond function was given a list of options that did not have a default. Below the stack trace, you should see the parameters sent and the list of responses. The last response should have no test function (or a test function that always returns true).")
        console.log(params)
        console.log(list)
        return false
      }
      //console.log(params)
      if (response.script) response.script.bind(params.char)(params)
      if (response.msg) {
        if (params.char) {
          params.char.Quest.IO.msg(response.msg, params)
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(response.msg, params)
        }
      }
      if (!response.script && !response.msg && !response.failed) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg("No script or msg for response")
        console.log(response)
      }
      if (func) func(params, response)
      return !response.failed
    }

    export function getResponseList(params: any, list: any, result: any) {
      if (!result) result = []
      for (let item of list) {
        if (item.name) {
          params.text = item.name.toLowerCase()
          //console.log("check item: " + item.name)
          if (item.test) {
            if (!result.includes(item) && item.test(params)) result.push(item)
          }
          else {
            if (!result.includes(item)) result.push(item)
          }
          //console.log("item is good: " + item.name)
        }
        if (item.responses) result = getResponseList(params, item.responses, result)
        //console.log("done")
      }
      return result
    }
  }
}