namespace Quest {
  export namespace Text {

    // @DOC
    // ## The Text Processor Function
    // @UNDOC

    // @DOC
    // Returns a string in which all the text processor directives have been resolved, using the optionasl parameters.
    // More details [here(https://github.com/ThePix/QuestJS/wiki/The-Text-Processor).
    export function processText(str: any, params: any) {
      if (params === undefined) {
        params = { tpNoParamsPassed: true };
      }
      if (typeof str !== 'string') {
        str = `${str}`;
      }
      params.tpOriginalString = str;
      if (params.count) params.item_count = params.count;
      // log(params)
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
      if (usedStrings.includes(str)) {
        params.tpFirstTime = false;
      } else {
        usedStrings.push(str);
        params.tpFirstTime = true;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'processText' does not exist on type '{ t... Remove this comment to see the full error message
      return processTextTp(str, params);
    }

    // Most of the text processors are set up in text.js; these are the language specific ones.
    export const setLoadString = function (s: any) {
      const parts = s.split('=');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (parts.length !== 2) return Quest.IO.errormsg(`Bad format in saved data (${s})`);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (parts[0] !== 'TPUsedStrings') return Quest.IO.errormsg('Expected TP to be first');
      usedStrings.length = 0;
      for (const p of Quest.SaveLoad.saveLoad.decodeArray(parts[1])) {
        usedStrings.push(p);
      }
    };

    export const getSaveString = function () {
      // ts-error-fixed ts-migrate(7022) FIXME: 's' implicitly has type 'any' because it does not ... Remove this comment to see the full error message
      return `TPUsedStrings=${Quest.SaveLoad.saveLoad.encodeArray(usedStrings)}`;
    };

    export const usedStrings: string[] = [];
    export const colours = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

    // Use this to add you custom text processor
    // Should take a string array as a parameter (the input text,
    // excluding the curly braces, name and colon),
    // and return a string.
    export const addDirective = function (name: any, fn: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      text_processors[name] = fn;
    };

    const comparisons = {
      '!=':  'ifNot',
      '!==': 'ifNot',
      '<':   'ifLessThan',
      '<=':  'ifLessThanOrEqual',
      '<>':  'ifNot',
      '=':   'if',
      '==':  'if',
      '>':   'ifMoreThan',
      '>=':  'ifMoreThanOrEqual',
    };

    const processTextTp = function (str: any, params: any) {
      const s = findFirstToken(str);
      if (s) {
        let arr  = s.split(':');
        let left = arr.shift();
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (typeof text_processors[left] !== 'function') {
          if (left.startsWith('if ')) {
            const data = /if (not |)(\w+)\.(\w+) *([<>=!]{0,3}) *(.*)/.exec(left);
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            if (data[4] === '') {
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              arr.unshift(data[3]);
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              arr.unshift(data[2]);
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              left = data[1] === 'not ' ? 'ifNot' : 'if';
            } else {
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              arr.unshift(data[5]);
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              arr.unshift(data[3]);
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              arr.unshift(data[2]);
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'comparisons' does not exist on type '{ t... Remove this comment to see the full error message
              left = comparisons[data[4]];
            }
          } else if (left.match(/^(not)?here /)) {
            const ary = left.split(' ');
            ary.shift();
            left = left.startsWith('here') ? 'ifHere' : 'ifNotHere';
            for (const el of ary.reverse()) arr.unshift(el);
          } else if (left === 'player') {
            arr.unshift(Quest.World.player.name);
            left = 'show';
          } else if (left === 'Quest.World.currentLocation') {
            arr.unshift(Quest.World.currentLocation.name);
            left = 'show';
          }
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          else if (Quest.World.w[left]) {
            arr.unshift(left);
            left = 'show';
          } else if (arr.length === 0) {
            arr  = left.split('.');
            left = 'show';
          } else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.errormsg(`Attempting to use unknown text processor directive '${left}' (${params.tpOriginalString})`);
            return str;
          }
        }
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        str = str.replace(`{${s}}`, text_processors[left](arr, params));
        str = processTextTp(str, params);
      }
      return str;
    };

    // Find the first token. This is the first to end, so
    // we get nested.
    const findFirstToken = function (s: any) {
      const end = s.indexOf('}');
      if (end === -1) {
        return false;
      }
      const start = s.lastIndexOf('{', end);
      if (start === -1) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg(`Failed to find starting curly brace in text processor (<i>${s}</i>)`);
        return false;
      }
      return s.substring(start + 1, end);
    };

    const i         = function (arr: any, params: any) {
      return `<i>${arr.join(':')}</i>`;
    };
    const b         = function (arr: any, params: any) {
      return `<b>${arr.join(':')}</b>`;
    };
    const u         = function (arr: any, params: any) {
      return `<u>${arr.join(':')}</u>`;
    };
    const s         = function (arr: any, params: any) {
      return `<strike>${arr.join(':')}</strike>`;
    };
    const code      = function (arr: any, params: any) {
      return `<code>${arr.join(':')}</code>`;
    };
    const sup       = function (arr: any, params: any) {
      return `<sup>${arr.join(':')}</sup>`;
    };
    const sub       = function (arr: any, params: any) {
      return `<sub>${arr.join(':')}</sub>`;
    };
    const huge      = function (arr: any, params: any) {
      return `<span style="font-size:2em">${arr.join(':')}</span>`;
    };
    const big       = function (arr: any, params: any) {
      return `<span style="font-size:1.5em">${arr.join(':')}</span>`;
    };
    const small     = function (arr: any, params: any) {
      return `<span style="font-size:0.8em">${arr.join(':')}</span>`;
    };
    const tiny      = function (arr: any, params: any) {
      return `<span style="font-size:0.6em">${arr.join(':')}</span>`;
    };
    const smallcaps = function (arr: any, params: any) {
      return `<span style="font-variant:small-caps">${arr.join(':')}</span>`;
    };
    const cap       = function (arr: any, params: any) {
      return Quest.Utilities.sentenceCase(arr.join(':'));
    };
    const title     = function (arr: any, params: any) {
      return Quest.Utilities.titleCase(arr.join(':'));
    };
    const upper     = function (arr: any, params: any) {
      return arr.join(':').toUpperCase();
    };
    const lower     = function (arr: any, params: any) {
      return arr.join(':').toLowerCase();
    };
    const rainbow   = function (arr: any, params: any) {
      const s = arr.pop();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'colours' does not exist on type '{ text_... Remove this comment to see the full error message
      const colours = arr.length === 0 ? colours : arr;
      let result    = '';
      for (let i = 0; i < s.length; i++) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
        result += `<span style="color:${random.fromArray(colours)}">${s.charAt(i)}</span>`;
      }
      return result;
    };

    const _charSwap = function (c: any, upper: any, lower: any) {
      if (c.match(/[A-Z]/)) return String.fromCharCode(c.charCodeAt(0) - 'A'.charCodeAt(0) + upper);
      if (c.match(/[a-z]/)) return String.fromCharCode(c.charCodeAt(0) - 'a'.charCodeAt(0) + lower);
      return c;
    };

    // Try 391:3AC for Greek, 402:431 for Cyrillic, 904:904 for Devanagari
    const encode = function (arr: any, params: any) {
      const upper = parseInt(arr.shift(), 16);
      const lower = parseInt(arr.shift(), 16);
      const s     = arr.shift();
      let result  = '';
      for (let i = 0; i < s.length; i++) {
        result += _charSwap(s.charAt(i), upper, lower);
      }
      return result;
    };

    const blur = function (arr: any, params: any) {
      const n = arr.shift();
      return `<span style="color:transparent;text-shadow: 0 0 ${n}px rgba(0,0,0,1);">${arr.join(':')}</span>`;
    };

    const font = function (arr: any, params: any) {
      const f = arr.shift();
      return `<span style="font-family:${f}">${arr.join(':')}</span>`;
    };

    const klass = function (arr: any, params: any) {
      const c = arr.shift();
      return `<span class="${c}">${arr.join(':')}</span>`;
    };
    const colour = function (arr: any, params: any) {
      const c = arr.shift();
      return `<span style="color:${c}">${arr.join(':')}</span>`;
    };

    const color = colour;

    const back = function (arr: any, params: any) {
      const c = arr.shift();
      return `<span style="background-color:${c}">${arr.join(':')}</span>`;
    };

    const dialogue = function (arr: any, params: any) {
      let prefix  = '<span';
      const style = arr.shift();
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (arr.length < 1) Quest.IO.errormsg(`Failed to find enough parts in text processor 'dialog' (${params.tpOriginalString})`);

      if (style.startsWith('.')) {
        prefix += ` class="${style.replace('.', '')}"`;
      } else if (params[style]) {
        prefix += ` style="${params[style].dialogueStyle}"`;
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (arr.length < 2) Quest.IO.errormsg(`Failed to find enough parts in text processor 'dialog' without a class (${params.tpOriginalString})`);
        const colour = arr.shift();
        prefix      += ' style="';
        if (style.includes('i')) prefix += 'font-style:italic;';
        if (style.includes('b')) prefix += 'font-weight:bold;';
        if (style.includes('u')) prefix += 'text-decoration:underline;';
        if (colour != '') {
          prefix += `color:${colour}`;
        }
        prefix += '"';
      }
      prefix += '>';
      return `${prefix + Quest.Settings.settings.openQuotation + arr.join() + Quest.Settings.settings.closeQuotation}</span>`;
    };

    const random = function (arr: any, params: any) {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const selectNone  = function (arr: any, params: any) {
      return select(arr, params, 'none');
    };
    const selectWrap  = function (arr: any, params: any) {
      return select(arr, params, 'wrap');
    };
    const selectStart = function (arr: any, params: any) {
      return select(arr, params, 'start');
    };
    const selectEnd   = function (arr: any, params: any) {
      return select(arr, params, 'end');
    };

    const select = function (arr: any, params: any, opt: any) {
      let name = arr.shift();
      if (name.match(/\./)) {
        const ary = name.split('.');
        name      = ary[0];
        arr.unshift(ary[1]);
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
      const o = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!o) Quest.IO.errormsg(`Failed to find an object called "${name}" in text processor select.`);
      const l = o[arr[0]];
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (l === undefined) Quest.IO.errormsg(`Failed to find an attribute called "${arr[0]}" for "${name}" in text processor "select" directive.`);
      if (Array.isArray(l)) {
        const n = o[arr[1]];
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!l) Quest.IO.errormsg(`Failed to find a secondary attribute called "${arr[1]}" for "${name}" in text processor "select" directive.`);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'value' does not exist on type '{}'.
        return Quest.Utilities.array.value(l, n, opt);
      }
      if (typeof l === 'number') {
        arr.shift();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'value' does not exist on type '{}'.
        return Quest.Utilities.array.value(arr, l, opt);
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.errormsg(`Failed to do anything with the attribute called "${arr[1]}" for "${name}" in text processor select - neither an array or an integer.`);
    };

    const _findObject = function (name: any, params: any, arr: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (params && params[name]) return typeof params[name] === 'string' ? Quest.World.w[params[name]] : params[name];
      if (name === 'player') return Quest.World.player;
      if (name === 'Quest.World.currentLocation') return Quest.World.currentLocation;
      if (name === 'settings') return Quest.Settings.settings;
      if (name === 'params') return params;
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (Quest.World.w[name]) return Quest.World.w[name];
      const ary = name.split('.');
      if (ary.length === 1) return undefined;
      if (ary.length > 2) {
        console.log(`The text process cannot handle attributes of attributes, so failed to deal with: ${name}`);
        console.log(ary);
        return undefined;
      }
      arr.unshift(ary[1]);
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return Quest.World.w[ary[0]];
    };

    const multi = function (arr: any, params: any) {
      if (!params.multiple) return '';
      return `${Quest.Utilities.sentenceCase(params.item.alias)}: `;
    };

    const show = function (arr: any, params: any) {
      const name = arr.shift();
      if (params[name] !== undefined) {
        if (typeof params[name] === 'object') return getWhatever(params[name][arr[0]], params, params[name]);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getWhatever' does not exist on type '{ t... Remove this comment to see the full error message
        return getWhatever(params[name], params);
      }
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'show' (${params.tpOriginalString})`);
      return getWhatever(obj[arr[0]], params, obj);
    };

    const object = show;

    const getWhatever = function (val: any, params: any, obj: any) {
      if (val === false) return Quest.lang.tp_false;
      if (val === true) return Quest.lang.tp_true;
      if (val === undefined) return '';
      if (typeof val === 'string') return val;
      if (typeof val === 'number') return val.toString();
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (typeof val !== 'function') return Quest.IO.errormsg(`Got a value of a type I was not expecting in show: ${typeof val}`);
      const func = val.bind(obj);
      return func(params);
    };

    const contents = function (arr: any, params: any) {
      const name = arr.shift();
      const obj  = typeof params[name] === 'object' ? params[name] : _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'contents' (${params.tpOriginalString})`);
      return Quest.Utilities.formatList(obj.getContents(Quest.World.world.LOOK), {
        article: Quest.Utilities.INDEFINITE, lastJoiner: arr[1], nothing: arr[2], sep: arr[0],
      });
    };

    const rndalt = function (arr: any, params: any) {
      const name = arr.shift();
      if (params[name]) {
        if (typeof params[name] === 'string') return params[name];
        if (typeof params[name] === 'number') return params[name].toString();
        if (arr.length > 0) return params[name][arr[0]];
      }
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'show' (${params.tpOriginalString})`);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
      if (obj.alt) return random.fromArray(obj.alt);
      return obj.alias;
    };

    const number = function (arr: any, params: any) {
      const name = arr.shift();
      if (name.match(/^\d+$/)) return Quest.lang.toWords(parseInt(name));
      if (typeof params[name] === 'number') return Quest.lang.toWords(params[name]);
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'number' (${params.tpOriginalString})`);
      if (typeof obj[arr[0]] === 'number') return Quest.lang.toWords(obj[arr[0]]);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return Quest.IO.errormsg(`Failed to find a number for object '${name}' in text processor (${params.tpOriginalString})`);
    };

    const ordinal = function (arr: any, params: any) {
      const name = arr.shift();
      if (name.match(/^\d+$/)) return Quest.lang.toOrdinal(parseInt(name));
      if (typeof params[name] === 'number') return Quest.lang.toOrdinal(params[name]);
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'number' (${params.tpOriginalString})`);
      if (typeof obj[arr[0]] === 'number') return Quest.lang.toOrdinal(obj[arr[0]]);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return Quest.IO.errormsg(`Failed to find a number for object '${name}' in text processor (${params.tpOriginalString})`);
    };

    const money = function (arr: any, params: any) {
      const name = arr.shift();
      if (name.match(/^\d+$/)) return Quest.Utilities.displayMoney(parseInt(name));
      if (typeof params[name] === 'number') return Quest.Utilities.displayMoney(params[name]);
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'money' (${params.tpOriginalString})`);
      if (obj.loc === Quest.World.player.name && obj.getSellingPrice) {
        return Quest.Utilities.displayMoney(obj.getSellingPrice(Quest.World.player));
      }
      if (obj.loc === Quest.World.player.name && obj.getBuyingPrice) {
        return Quest.Utilities.displayMoney(obj.getBuyingPrice(Quest.World.player));
      }
      if (obj.getPrice) {
        return Quest.Utilities.displayMoney(obj.getPrice());
      }
      if (obj.price) {
        return Quest.Utilities.displayMoney(obj.price);
      }
      if (obj.money) {
        return Quest.Utilities.displayMoney(obj.money);
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return Quest.IO.errormsg(`Failed to find a price for object '${name}' in text processor (${params.tpOriginalString})`);
    };

    const dateTime = function (arr: any, params: any) {
      const options = { format: arr[0] };
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'is' does not exist on type '{ format: an... Remove this comment to see the full error message
      if (!isNaN(arr[1])) options.is = parseInt(arr[1]);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'add' does not exist on type '{ format: a... Remove this comment to see the full error message
      if (!isNaN(arr[2])) options.add = parseInt(arr[2]);
      return Quest.Utilities.util.getDateTime(options);
    };

    const transitDest = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const transit = arr[0] ? Quest.World.w[arr[0]] : Quest.World.w[Quest.World.player.loc];
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!transit.transitDoorDir) return Quest.IO.errormsg(`Trying to use the 'transitDest' text process directive when the player is not in a transit location (${params.tpOriginalString}).`);
      if (transit.currentButtonName) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const button = Quest.World.w[transit.currentButtonName];
        if (button.title) return button.title;
      }
      const destName = transit[transit.transitDoorDir].name;
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      return Quest.lang.getName(Quest.World.w[destName], { capital: true });
    };

    const img = function (arr: any, params: any) {
      const src = arr[0].includes('/') ? arr[0] : Quest.Settings.settings.imagesFolder + arr[0];
      return `<img src="${src}" title="${arr[1]}" alt="${arr[2]}"/>`;
    };

    const once = function (params: any, s1: any, s2: any) {
      if (params.tpFirstTime && s1) return s1;
      if (!params.tpFirstTime && s2) return s2;
      return '';
    };

    const notOnce  = function (arr: any, params: any) {
      return once(params, arr[1], arr[0]);
    };
    const notfirst = notOnce;

    const cmd = function (arr: any, params: any) {
      if (arr.length === 1) {
        return Quest.IO.io.cmdlink(arr[0], arr[0]);
      }

      return Quest.IO.io.cmdlink(arr[0], arr[1]);
    };

    const command = function (arr: any, params: any) {
      if (arr.length === 1) {
        return Quest.IO.io.cmdlink(arr[0], arr[0]);
      }

      return Quest.IO.io.cmdlink(arr[0], arr[1]);
    };

    const exit = command;
    const page = command;
    const hour = function (arr: any, params: any) {
      const { hour } = Quest.Utilities.util.getDateTimeDict();
      if (hour < arr[0]) return '';
      if (hour >= arr[1]) return '';
      return arr[2];
    };
    const link = function (arr: any, params: any) {
      const s1 = arr.shift();
      const s2 = arr.join(':');
      return `<a href=\"${s2}\" target="_blank">${s1}</a>`;
    };

    const popup = function (arr: any, params: any) {
      const s1 = arr.shift();
      const s2 = arr.join(':');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
      const id   = s1.replace(/[^a-zA-Z_]/, '') + random.int(0, 999999999);
      const html = `<div id=\"${id}\" class=\"popup\" onclick=\"Quest.IO.io.toggleDisplay('${id}')"><p>${s2}</p></div>`;
      // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#main').innerHTML += html;
      return `<span class=\"popup-link\" onclick=\"Quest.IO.io.toggleDisplay('#${id}')">${s1}</span>`;
    };

    const roomSet = function (arr: any, params: any) {
      const n = Quest.World.currentLocation.roomSetOrder - 1;
      return n < arr.length ? arr[n] : '';
    };

    // -----------  CONDITIONALS  --------------------
    const iif      = function (arr: any, params: any) {
      return handleIf(arr, params, false);
    };
    const ifNot    = function (arr: any, params: any) {
      return handleIf(arr, params, true);
    };
    const handleIf = function (arr: any, params: any, reverse: any) {
      let name = arr.shift(); let
        flag;

      if (typeof params[name] === 'boolean') return (params[name] ? arr[0] : (arr[1] ? arr[1] : ''));

      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'if/ifNot' (${params.tpOriginalString})`);
      name         = arr.shift();
      let attValue = typeof obj[name] === 'function' ? obj[name](params) : obj[name];
      if (typeof attValue === 'object') attValue = attValue.name;
      if (attValue === undefined) attValue = false;
      if (typeof attValue === 'boolean') {
        flag = attValue;
      } else {
        let value = arr.shift();
        if (typeof attValue === 'number') {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (isNaN(value)) return Quest.IO.errormsg(`Trying to compare a numeric attribute, '${name}' with a string (${params.tpOriginalString}).`);
          value = parseInt(value);
        }
        flag = (attValue === value);
      }
      if (reverse) flag = !flag;
      return (flag ? arr[0] : (arr[1] ? arr[1] : ''));
    };

    const ifIs       = function (arr: any, params: any) {
      return handleIfIs(arr, params, false);
    };
    const ifNotIs    = function (arr: any, params: any) {
      return handleIfIs(arr, params, true);
    };
    const handleIfIs = function (arr: any, params: any, reverse: any) {
      let name = arr.shift(); let
        flag;
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'if/ifNot' (${params.tpOriginalString})`);
      name         = arr.shift();
      let attValue = typeof obj[name] === 'function' ? obj[name](params) : obj[name];
      if (typeof attValue === 'object') attValue = attValue.name;
      const value = Quest.Utilities.util.guessMyType(arr.shift());
      flag        = (attValue === value);
      if (reverse) flag = !flag;
      return (flag ? arr[0] : (arr[1] ? arr[1] : ''));
    };

    const ifExists       = function (arr: any, params: any) {
      return handleIfExists(arr, params, false);
    };
    const ifNotExists    = function (arr: any, params: any) {
      return handleIfExists(arr, params, true);
    };
    const handleIfExists = function (arr: any, params: any, reverse: any) {
      let name = arr.shift(); let
        flag;
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'if/ifNotExists' (${params.tpOriginalString})`);
      name = arr.shift();
      flag = obj[name] !== undefined;
      if (reverse) flag = !flag;
      return (flag ? arr[0] : (arr[1] ? arr[1] : ''));
    };

    const ifLessThan           = function (arr: any, params: any) {
      return handleIfLessMoreThan(arr, params, false, false);
    };
    const ifMoreThan           = function (arr: any, params: any) {
      return handleIfLessMoreThan(arr, params, true, false);
    };
    const ifLessThanOrEqual    = function (arr: any, params: any) {
      return handleIfLessMoreThan(arr, params, false, true);
    };
    const ifMoreThanOrEqual    = function (arr: any, params: any) {
      return handleIfLessMoreThan(arr, params, true, true);
    };
    const handleIfLessMoreThan = function (arr: any, params: any, moreThan: any, orEqual: any) {
      let name = arr.shift(); let
        flag;
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'ifLessMoreThan' (${params.tpOriginalString})`);
      name           = arr.shift();
      const attValue = typeof obj[name] === 'function' ? obj[name](params) : obj[name];
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (typeof attValue !== 'number') return Quest.IO.errormsg(`Trying to use ifLessThan with a non-numeric (or nonexistent) attribute, '${name}' (${params.tpOriginalString}).`);
      let value = arr.shift();
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (isNaN(value)) return Quest.IO.errormsg(`Trying to compare a numeric attribute, '${name}' with a string (${params.tpOriginalString}).`);
      value = parseInt(value);
      flag  = moreThan ? (orEqual ? (attValue >= value) : (attValue > value)) : (orEqual ? (attValue <= value) : (attValue < value));
      return (flag ? arr[0] : (arr[1] ? arr[1] : ''));
    };

    const ifHere       = function (arr: any, params: any) {
      return handleIfHere(arr, params, false, 'loc');
    };
    const ifNotHere    = function (arr: any, params: any) {
      return handleIfHere(arr, params, true, 'loc');
    };
    const ifHeld       = function (arr: any, params: any) {
      return handleIfHere(arr, params, false, 'name');
    };
    const ifNotHeld    = function (arr: any, params: any) {
      return handleIfHere(arr, params, true, 'name');
    };
    const handleIfHere = function (arr: any, params: any, reverse: any, locAtt: any) {
      const name = arr.shift();
      const obj  = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'ifHere' (${params.tpOriginalString})`);
      let flag = obj.isAtLoc(Quest.World.player[locAtt], Quest.World.world.ALL);
      if (reverse) flag = !flag;
      return (flag ? arr[0] : (arr[1] ? arr[1] : ''));
    };

    const ifPlayer       = function (arr: any, params: any) {
      return handleIfPlayer(arr, params, false);
    };
    const ifNotPlayer    = function (arr: any, params: any) {
      return handleIfPlayer(arr, params, true);
    };
    const handleIfPlayer = function (arr: any, params: any, reverse: any) {
      const name = arr.shift(); let
        flag;
      const obj = _findObject(name, params, arr);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!obj) return Quest.IO.errormsg(`Failed to find object '${name}' in text processor 'if/ifNotPlayer' (${params.tpOriginalString})`);
      flag = obj === Quest.World.player;
      if (reverse) flag = !flag;
      return (flag ? arr[0] : (arr[1] ? arr[1] : ''));
    };

    // ---------------  SUPPORT  FOR  ROOM  TEMPLATES  ------------------------------------

    const terse = function (arr: any, params: any) {
      if ((Quest.Settings.settings.verbosity === Quest.World.world.TERSE && Quest.World.currentLocation.visited === 0) || Quest.Settings.settings.verbosity === Quest.World.world.VERBOSE) {
        return Quest.Utilities.sentenceCase(arr.join(':'));
      }

      return '';
    };

    // Need to do some hackery here...
    // It is assumed this is only used in the room template, and therefore should be safe
    // The issue is that the text for every room is {hereDesc}, so the "once" directive
    // would only work the first time. In the econd room, {hereDesc} has already been done, so once fails.
    // The hack then is to pre-process the room text in here
    const hereDesc = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const room = Quest.World.w[Quest.World.player.loc];
      let s;
      if (typeof room.desc === 'string') {
        s = room.desc;
      } else if (typeof room.desc === 'function') {
        s = room.desc();
        if (s === undefined) {
          Quest.IO.errormsg(`This room description is not set up properly. It has a 'desc' function that does not return a string. The room is "${room.name}".`, true);
          return '[Bad description]';
        }
      } else {
        return 'This is a room in dire need of a description.';
      }
      delete params.tpFirstTime;
      return processText(s, params);
    };

    const hereName = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const room = Quest.World.w[Quest.World.player.loc];
      return room.headingAlias;
    };

    const objectsHere = function (arr: any, params: any) {
      const listOfOjects = Quest.Utilities.scopeHereListed();
      return listOfOjects.length === 0 ? '' : arr.join(':');
    };

    const exitsHere = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const list = Quest.World.w[Quest.World.player.loc].getExitDirs();
      return list.length === 0 ? '' : arr.join(':');
    };

    const objects = function (arr: any, params: any) {
      const listOfOjects = Quest.Utilities.scopeHereListed();
      return Quest.Utilities.formatList(listOfOjects, {
        article: Quest.Utilities.INDEFINITE, lastJoiner: Quest.lang.list_and, loc: Quest.World.player.loc, modified: true, nothing: Quest.lang.list_nothing,
      });
    };

    const exits = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const list = Quest.World.w[Quest.World.player.loc].getExitDirs();
      return Quest.Utilities.formatList(list, { lastJoiner: Quest.lang.list_or, nothing: Quest.lang.list_nowhere });
    };

    // ----------------  PARAMS  AND  NEUTRAL  LANGUAGE  SUPPORT  ---------------------------
    // Then {nv:char:try} to get

    /*
    The name functions could readily be expanded. You can add further parameters and Quest will then grab those and pass them to Quest.lang.getName. Thus, if we have this:

    Quest.IO.msg("You see {nm:item:the:false:x_count}.", {item:Quest.World.w.terror_cat, x_count:4})

    Then the options passed to Quest.lang.getName will include x_count set to 4.
    */

    // {function:character:article:capitalise}
    const nm  = function (arr: any, params: any) {
      return nameFunction(arr, params, false);
    };
    const nms = function (arr: any, params: any) {
      return nameFunction(arr, params, true);
    };

    const nameFunction = function (arr: any, params: any, isPossessive: any) {
      const name    = arr.shift();
      const subject = _findObject(name, params, arr);
      if (!subject) return false;
      const options = { possessive: isPossessive };
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'article' does not exist on type '{ posse... Remove this comment to see the full error message
      if (arr[0] === 'the') options.article = Quest.Utilities.DEFINITE;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'article' does not exist on type '{ posse... Remove this comment to see the full error message
      if (arr[0] === 'a') options.article = Quest.Utilities.INDEFINITE;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'article' does not exist on type '{ posse... Remove this comment to see the full error message
      if (arr[0] === 'count') options.article = Quest.Utilities.COUNT;
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (params[`${subject.name}_count`]) options[`${subject.name}_count`] = params[`${subject.name}_count`];
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (params[`${name}_count`]) options[`${subject.name}_count`] = params[`${name}_count`];
      let n = 2;
      while (arr[n]) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        options[arr[n]] = params[arr[n]];
        n++;
      }
      return arr[1] === 'true' ? Quest.Utilities.sentenceCase(Quest.lang.getName(subject, options)) : Quest.lang.getName(subject, options);
    };

    // {function:character:verb:capitalise}
    const nv = function (arr: any, params: any) {
      return conjugations(Quest.lang.nounVerb, arr, params);
    };
    const pv = function (arr: any, params: any) {
      return conjugations(Quest.lang.pronounVerb, arr, params);
    };
    const vn = function (arr: any, params: any) {
      return conjugations(Quest.lang.verbNoun, arr, params);
    };
    const vp = function (arr: any, params: any) {
      return conjugations(Quest.lang.verbPronoun, arr, params);
    };
    const cj = function (arr: any, params: any) {
      return conjugations(Quest.lang.conjugate, arr, params);
    };

    const conjugations = function (func: any, arr: any, params: any) {
      const name = arr.shift();
      // ts-error-fixed ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
      const subject = _findObject(name, params, arr);
      if (!subject) return false;
      const options = { capitalise: arr[1] === 'true' };
      let n         = 2;
      while (arr[n]) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        options[arr[n]] = params[arr[n]];
        n++;
      }
      return func(subject, arr[0], options);
    };

    // {function:item:capitalise}
    const handlePronouns = function (arr: any, params: any, pronoun: any) {
      const name = arr.shift();
      // ts-error-fixed ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
      const subject = _findObject(name, params, arr);
      if (!subject) return false;
      return arr[0] === 'true' ? Quest.Utilities.sentenceCase(subject.pronouns[pronoun]) : subject.pronouns[pronoun];
    };

    const pa = function (arr: any, params: any) {
      return handlePronouns(arr, params, 'poss_adj');
    };

    const ob = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
      return handlePronouns(arr, params, 'objective');
    };

    const sb = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
      return handlePronouns(arr, params, 'subjective');
    };

    const ps = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
      return handlePronouns(arr, params, 'possessive');
    };

    const rf = function (arr: any, params: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
      return handlePronouns(arr, params, 'reflexive');
    };

    // {pa2:chr1:chr2}
    const pa2 = function (arr: any, params: any) {
      const name1 = arr.shift();
      // ts-error-fixed ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
      const chr1 = _findObject(name1, params, arr);
      if (!chr1) return false;
      const name2 = arr.shift();
      // ts-error-fixed ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
      const chr2 = _findObject(name2, params, arr);
      if (!chr2) return false;

      if (chr1.pronouns === chr2.pronouns && chr1 !== chr2) {
        const opt = { article: Quest.Utilities.DEFINITE, possessive: true };
        return arr[0] === 'true' ? Quest.Utilities.sentenceCase(Quest.lang.getName(chr1, opt)) : Quest.lang.getName(chr1, opt);
      }

      return arr[0] === 'true' ? Quest.Utilities.sentenceCase(chr1.pronouns.poss_adj) : chr1.pronouns.poss_adj;
    };

    // {pa3:chr1:chr2}
    const pa3 = function (arr: any, params: any) {
      const name1 = arr.shift();
      // ts-error-fixed ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
      const chr1 = _findObject(name1, params, arr);
      if (!chr1) return false;
      const name2 = arr.shift();
      // ts-error-fixed ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
      const chr2 = _findObject(name2, params, arr);
      if (!chr2) return false;

      if (chr1 !== chr2) {
        const opt = { article: Quest.Utilities.DEFINITE, possessive: true };
        // ts-error-fixed ts-migrate(2304) FIXME: Cannot find name 'subject'.
        return arr[0] === 'true' ? Quest.Utilities.sentenceCase(Quest.lang.getName(subject, opt)) : Quest.lang.getName(subject, opt);
      }

      return arr[0] === 'true' ? Quest.Utilities.sentenceCase(chr1.pronouns.poss_adj) : chr1.pronouns.poss_adj;
    };

    export const text_processors = {
      b,
      big,
      $:  money,
      code,
      cmd,
      command,
      encode,
      exit,
      contents,
      first(arr: any, params: any) {
        return once(params, arr[0], arr[1]);
      },
      dateTime,
      handleIfExists,
      hour,
      huge,
      cap,
      i,
      if: iif,
      ifExists,
      ifHeld,
      ifHere,
      ifIs,
      ifLessThan,
      ifLessThanOrEqual,
      ifMoreThan,
      ifMoreThanOrEqual,
      ifNot,
      ifNotExists,
      ifNotHeld,
      ifNotHere,
      ifNotIs,
      font,
      ifNotPlayer,
      color,
      ifPlayer,
      img,
      klass,
      link,
      lower,
      dialogue,
      money,
      back,
      multi,
      colour,
      terse,
      number,
      nv,
      ob,
      cj,
      object,
      nm,
      once(arr: any, params: any) {
        return once(params, arr[0], arr[1]);
      },
      exits,
      ordinal,
      exitsHere,
      sup,
      hereName,
      hereDesc,
      pa2,
      blur,
      sub,
      nms,
      pa3,
      notfirst,
      page,
      objects,
      popup,
      objectsHere,
      roomSet,
      pa,
      ps,
      pv,
      rainbow,
      show,
      random,
      rf,
      rndalt,
      s,
      sb,
      select(arr: any, params: any) {
        return select(arr, params, 'none');
      },
      selectEnd,
      selectNone,
      selectStart,
      selectWrap,
      small,
      smallcaps,
      tiny,
      title,
      transitDest,
      u,
      upper,
      vn,
      vp,
    };
  }
}
