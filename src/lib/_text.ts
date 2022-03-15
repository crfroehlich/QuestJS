"use strict";


//@DOC
// ## The Text Processor Function
//@UNDOC



//@DOC
// Returns a string in which all the text processor directives have been resolved, using the optionasl parameters.
// More details [here(https://github.com/ThePix/QuestJS/wiki/The-Text-Processor).
function processText(str: any, params: any) {
  if (params === undefined) {
    params = { tpNoParamsPassed: true };
  }
  if (typeof str !== "string") {
    str = "" + str;
  }
  params.tpOriginalString = str;
  if (params.count) params.item_count = params.count
  //log(params)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
  if (tp.usedStrings.includes(str)) {
    params.tpFirstTime = false;
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
    tp.usedStrings.push(str);
    params.tpFirstTime = true;
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'processText' does not exist on type '{ t... Remove this comment to see the full error message
  return tp.processText(str, params);
}



// Most of the text processors are set up in text.js; these are the language specific ones.
const tp = {
  text_processors: {},
  setLoadString: function (s: any) {
    const parts = s.split("=");
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (parts.length !== 2) return Quest.IO.errormsg("Bad format in saved data (" + s + ")")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (parts[0] !== "TPUsedStrings") return Quest.IO.errormsg("Expected TP to be first")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
    tp.usedStrings = Quest.SaveLoad.saveLoad.decodeArray(parts[1])
  },
  // @ts-expect-error ts-migrate(7023) FIXME: 'getSaveString' implicitly has return type 'any' b... Remove this comment to see the full error message
  getSaveString: function () {
    // @ts-expect-error ts-migrate(7022) FIXME: 's' implicitly has type 'any' because it does not ... Remove this comment to see the full error message
    let s = "TPUsedStrings=" + Quest.SaveLoad.saveLoad.encodeArray(tp.usedStrings);
    return s;
  },
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'usedStrings' does not exist on type '{ t... Remove this comment to see the full error message
tp.usedStrings = [];

// @ts-expect-error ts-migrate(2339) FIXME: Property 'colours' does not exist on type '{ text_... Remove this comment to see the full error message
tp.colours = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']



// Use this to add you custom text processor
// Should take a string array as a parameter (the input text,
// excluding the curly braces, name and colon),
// and return a string.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
tp.addDirective = function (name: any, fn: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  tp.text_processors[name] = fn;
};



// @ts-expect-error ts-migrate(2339) FIXME: Property 'comparisons' does not exist on type '{ t... Remove this comment to see the full error message
tp.comparisons = {
  '=': 'if',
  '==': 'if',
  '!=': 'ifNot',
  '!==': 'ifNot',
  '<>': 'ifNot',
  '<': 'ifLessThan',
  '>': 'ifMoreThan',
  '<=': 'ifLessThanOrEqual',
  '>=': 'ifMoreThanOrEqual',
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'processText' does not exist on type '{ t... Remove this comment to see the full error message
tp.processText = function (str: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'findFirstToken' does not exist on type '... Remove this comment to see the full error message
  const s = tp.findFirstToken(str);
  if (s) {
    let arr = s.split(":");
    let left = arr.shift();
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof tp.text_processors[left] !== "function") {
      if (left.startsWith('if ')) {
        const data = /if (not |)(\w+)\.(\w+) *([<>=!]{0,3}) *(.*)/.exec(left)
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (data[4] === '') {
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          arr.unshift(data[3])
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          arr.unshift(data[2])
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          left = data[1] === 'not ' ? 'ifNot' : 'if'
        }
        else {
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          arr.unshift(data[5])
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          arr.unshift(data[3])
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          arr.unshift(data[2])
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'comparisons' does not exist on type '{ t... Remove this comment to see the full error message
          left = tp.comparisons[data[4]]
        }
      }
      else if (left.match(/^(not)?here /)) {
        const ary = left.split(' ')
        ary.shift()
        left = left.startsWith('here') ? 'ifHere' : 'ifNotHere'
        for (const el of ary.reverse()) arr.unshift(el)
      }
      else if (left === "player") {
        arr.unshift(player.name);
        left = "show";
      }
      else if (left === "currentLocation") {
        arr.unshift(currentLocation.name);
        left = "show";
      }
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      else if (w[left]) {
        arr.unshift(left);
        left = "show";
      }
      else if (arr.length === 0) {
        arr = left.split(".");
        left = "show";
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg("Attempting to use unknown text processor directive '" + left + "' (" + params.tpOriginalString + ")");
        return str;
      }
    }
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    str = str.replace("{" + s + "}", tp.text_processors[left](arr, params));
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'processText' does not exist on type '{ t... Remove this comment to see the full error message
    str = tp.processText(str, params);
  }
  return str
};

// Find the first token. This is the first to end, so
// we get nested.
// @ts-expect-error ts-migrate(2339) FIXME: Property 'findFirstToken' does not exist on type '... Remove this comment to see the full error message
tp.findFirstToken = function (s: any) {
  const end = s.indexOf("}");
  if (end === -1) { return false; }
  const start = s.lastIndexOf("{", end);
  if (start === -1) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.errormsg("Failed to find starting curly brace in text processor (<i>" + s + "</i>)");
    return false;
  }
  return s.substring(start + 1, end);
};



// @ts-expect-error ts-migrate(2339) FIXME: Property 'i' does not exist on type '{}'.
tp.text_processors.i = function (arr: any, params: any) { return "<i>" + arr.join(":") + "</i>"; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'b' does not exist on type '{}'.
tp.text_processors.b = function (arr: any, params: any) { return "<b>" + arr.join(":") + "</b>"; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'u' does not exist on type '{}'.
tp.text_processors.u = function (arr: any, params: any) { return "<u>" + arr.join(":") + "</u>"; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 's' does not exist on type '{}'.
tp.text_processors.s = function (arr: any, params: any) { return "<strike>" + arr.join(":") + "</strike>"; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'code' does not exist on type '{}'.
tp.text_processors.code = function (arr: any, params: any) { return "<code>" + arr.join(":") + "</code>"; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'sup' does not exist on type '{}'.
tp.text_processors.sup = function (arr: any, params: any) { return "<sup>" + arr.join(":") + "</sup>"; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'sub' does not exist on type '{}'.
tp.text_processors.sub = function (arr: any, params: any) { return "<sub>" + arr.join(":") + "</sub>"; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'huge' does not exist on type '{}'.
tp.text_processors.huge = function (arr: any, params: any) { return '<span style="font-size:2em">' + arr.join(":") + '</span>'; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'big' does not exist on type '{}'.
tp.text_processors.big = function (arr: any, params: any) { return '<span style="font-size:1.5em">' + arr.join(":") + '</span>'; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'small' does not exist on type '{}'.
tp.text_processors.small = function (arr: any, params: any) { return '<span style="font-size:0.8em">' + arr.join(":") + '</span>'; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'tiny' does not exist on type '{}'.
tp.text_processors.tiny = function (arr: any, params: any) { return '<span style="font-size:0.6em">' + arr.join(":") + '</span>'; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'smallcaps' does not exist on type '{}'.
tp.text_processors.smallcaps = function (arr: any, params: any) { return '<span style="font-variant:small-caps">' + arr.join(":") + '</span>'; };
// @ts-expect-error ts-migrate(2339) FIXME: Property 'cap' does not exist on type '{}'.
tp.text_processors.cap = function (arr: any, params: any) {
  return Quest.Utilities.sentenceCase(arr.join(":"))
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
tp.text_processors.title = function (arr: any, params: any) {
  return Quest.Utilities.titleCase(arr.join(":"))
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'upper' does not exist on type '{}'.
tp.text_processors.upper = function (arr: any, params: any) {
  return arr.join(":").toUpperCase()
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'lower' does not exist on type '{}'.
tp.text_processors.lower = function (arr: any, params: any) {
  return arr.join(":").toLowerCase()
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'rainbow' does not exist on type '{}'.
tp.text_processors.rainbow = function (arr: any, params: any) {
  const s = arr.pop()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'colours' does not exist on type '{ text_... Remove this comment to see the full error message
  const colours = arr.length === 0 ? tp.colours : arr
  let result = ''
  for (let i = 0; i < s.length; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
    result += '<span style="color:' + random.fromArray(colours) + '">' + s.charAt(i) + '</span>'
  }
  return result
};



// @ts-expect-error ts-migrate(2339) FIXME: Property '_charSwap' does not exist on type '{ tex... Remove this comment to see the full error message
tp._charSwap = function (c: any, upper: any, lower: any) {
  if (c.match(/[A-Z]/)) return String.fromCharCode(c.charCodeAt(0) - 'A'.charCodeAt(0) + upper)
  if (c.match(/[a-z]/)) return String.fromCharCode(c.charCodeAt(0) - 'a'.charCodeAt(0) + lower)
  return c
}

// Try 391:3AC for Greek, 402:431 for Cyrillic, 904:904 for Devanagari
// @ts-expect-error ts-migrate(2339) FIXME: Property 'encode' does not exist on type '{}'.
tp.text_processors.encode = function (arr: any, params: any) {
  const upper = parseInt(arr.shift(), 16)
  const lower = parseInt(arr.shift(), 16)
  const s = arr.shift()
  let result = ''
  for (let i = 0; i < s.length; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property '_charSwap' does not exist on type '{ tex... Remove this comment to see the full error message
    result += tp._charSwap(s.charAt(i), upper, lower)
  }
  return result
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'rainbow' does not exist on type '{}'.
tp.text_processors.rainbow = function (arr: any, params: any) {
  const s = arr.pop()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'colours' does not exist on type '{ text_... Remove this comment to see the full error message
  const colours = arr.length === 0 ? tp.colours : arr
  let result = ''
  for (let i = 0; i < s.length; i++) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
    result += '<span style="color:' + random.fromArray(colours) + '">' + s.charAt(i) + '</span>'
  }
  return result
};



// @ts-expect-error ts-migrate(2339) FIXME: Property 'blur' does not exist on type '{}'.
tp.text_processors.blur = function (arr: any, params: any) {
  const n = arr.shift();
  return '<span style="color:transparent;text-shadow: 0 0 ' + n + 'px rgba(0,0,0,1);">' + arr.join(":") + "</span>";
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'font' does not exist on type '{}'.
tp.text_processors.font = function (arr: any, params: any) {
  const f = arr.shift();
  return '<span style="font-family:' + f + '">' + arr.join(":") + "</span>";
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'class' does not exist on type '{}'.
tp.text_processors.class = function (arr: any, params: any) {
  const c = arr.shift()
  return '<span class="' + c + '">' + arr.join(":") + '</span>'
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'colour' does not exist on type '{}'.
tp.text_processors.colour = function (arr: any, params: any) {
  const c = arr.shift();
  return '<span style="color:' + c + '">' + arr.join(":") + "</span>";
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'color' does not exist on type '{}'.
tp.text_processors.color = tp.text_processors.colour;

// @ts-expect-error ts-migrate(2339) FIXME: Property 'back' does not exist on type '{}'.
tp.text_processors.back = function (arr: any, params: any) {
  const c = arr.shift();
  return '<span style="background-color:' + c + '">' + arr.join(":") + "</span>";
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'dialogue' does not exist on type '{}'.
tp.text_processors.dialogue = function (arr: any, params: any) {
  let prefix = "<span";
  const style = arr.shift()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (arr.length < 1) Quest.IO.errormsg("Failed to find enough parts in text processor 'dialog' (" + params.tpOriginalString + ")")

  if (style.startsWith('.')) {
    prefix += ' class="' + style.replace('.', '') + '"'
  }
  else if (params[style]) {
    prefix += ' style="' + params[style].dialogueStyle + '"'
  }
  else {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (arr.length < 2) Quest.IO.errormsg("Failed to find enough parts in text processor 'dialog' without a class (" + params.tpOriginalString + ")")
    const colour = arr.shift()
    prefix += ' style="'
    if (style.includes('i')) prefix += "font-style:italic;"
    if (style.includes('b')) prefix += "font-weight:bold;"
    if (style.includes('u')) prefix += "text-decoration:underline;"
    if (colour != "") {
      prefix += "color:" + colour
    }
    prefix += '"'
  }
  prefix += '>'
  return prefix + Quest.Settings.settings.openQuotation + arr.join() + Quest.Settings.settings.closeQuotation + "</span>"
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'random' does not exist on type '{}'.
tp.text_processors.random = function (arr: any, params: any) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'select' does not exist on type '{}'.
tp.text_processors.select = function (arr: any, params: any) { return tp.select(arr, params, 'none') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'selectNone' does not exist on type '{}'.
tp.text_processors.selectNone = function (arr: any, params: any) { return tp.select(arr, params, 'none') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'selectWrap' does not exist on type '{}'.
tp.text_processors.selectWrap = function (arr: any, params: any) { return tp.select(arr, params, 'wrap') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'selectStart' does not exist on type '{}'... Remove this comment to see the full error message
tp.text_processors.selectStart = function (arr: any, params: any) { return tp.select(arr, params, 'start') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'selectEnd' does not exist on type '{}'.
tp.text_processors.selectEnd = function (arr: any, params: any) { return tp.select(arr, params, 'end') }

// @ts-expect-error ts-migrate(2339) FIXME: Property 'select' does not exist on type '{ text_p... Remove this comment to see the full error message
tp.select = function (arr: any, params: any, opt: any) {
  let name = arr.shift()
  if (name.match(/\./)) {
    const ary = name.split('.')
    name = ary[0]
    arr.unshift(ary[1])
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const o = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!o) Quest.IO.errormsg('Failed to find an object called "' + name + '" in text processor select.')
  const l = o[arr[0]]
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (l === undefined) Quest.IO.errormsg('Failed to find an attribute called "' + arr[0] + '" for "' + name + '" in text processor "select" directive.')
  if (Array.isArray(l)) {
    const n = o[arr[1]]
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!l) Quest.IO.errormsg('Failed to find a secondary attribute called "' + arr[1] + '" for "' + name + '" in text processor "select" directive.')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type '{}'.
    return Quest.Utilities.array.value(l, n, opt)
  }
  if (typeof l === 'number') {
    arr.shift()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type '{}'.
    return Quest.Utilities.array.value(arr, l, opt)
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.errormsg('Failed to do anything with the attribute called "' + arr[1] + '" for "' + name + '" in text processor select - neither an array or an integer.')
};



// @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
tp._findObject = function (name: any, params: any, arr: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (params && params[name]) return typeof params[name] === 'string' ? w[params[name]] : params[name]
  if (name === "player") return player
  if (name === "currentLocation") return currentLocation
  if (name === "settings") return Quest.Settings.settings
  if (name === "params") return params
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (w[name]) return w[name]
  const ary = name.split('.')
  if (ary.length === 1) return undefined
  if (ary.length > 2) {
    console.log("The text process cannot handle attributes of attributes, so failed to deal with: " + name)
    console.log(ary)
    return undefined
  }
  arr.unshift(ary[1])
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return w[ary[0]]
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'multi' does not exist on type '{}'.
tp.text_processors.multi = function (arr: any, params: any) {
  if (!params.multiple) return ''
  return Quest.Utilities.sentenceCase(params.item.alias) + ": "
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type '{}'.
tp.text_processors.show = function (arr: any, params: any) {
  let name = arr.shift()
  if (params[name] !== undefined) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getWhatever' does not exist on type '{ t... Remove this comment to see the full error message
    if (typeof params[name] === 'object') return tp.getWhatever(params[name][arr[0]], params, params[name])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getWhatever' does not exist on type '{ t... Remove this comment to see the full error message
    return tp.getWhatever(params[name], params)
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'show' (" + params.tpOriginalString + ")")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getWhatever' does not exist on type '{ t... Remove this comment to see the full error message
  return tp.getWhatever(obj[arr[0]], params, obj)
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'object' does not exist on type '{}'.
tp.text_processors.object = tp.text_processors.show

// @ts-expect-error ts-migrate(2339) FIXME: Property 'getWhatever' does not exist on type '{ t... Remove this comment to see the full error message
tp.getWhatever = function (val: any, params: any, obj: any) {
  if (val === false) return Quest.lang.tp_false
  if (val === true) return Quest.lang.tp_true
  if (val === undefined) return ''
  if (typeof val === 'string') return val
  if (typeof val === 'number') return val.toString()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (typeof val !== 'function') return Quest.IO.errormsg("Got a value of a type I was not expecting in show: " + (typeof val))
  const func = val.bind(obj)
  return func(params)
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'contents' does not exist on type '{}'.
tp.text_processors.contents = function (arr: any, params: any) {
  let name = arr.shift()
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = typeof params[name] === 'object' ? params[name] : tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'contents' (" + params.tpOriginalString + ")")
  return Quest.Utilities.formatList(obj.getContents(world.LOOK), { article: Quest.Utilities.INDEFINITE, sep: arr[0], lastJoiner: arr[1], nothing: arr[2] })
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'rndalt' does not exist on type '{}'.
tp.text_processors.rndalt = function (arr: any, params: any) {
  let name = arr.shift()
  if (params[name]) {
    if (typeof params[name] === 'string') return params[name]
    if (typeof params[name] === 'number') return params[name].toString()
    if (arr.length > 0) return params[name][arr[0]]
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'show' (" + params.tpOriginalString + ")")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  if (obj.alt) return random.fromArray(obj.alt)
  return obj.alias
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'number' does not exist on type '{}'.
tp.text_processors.number = function (arr: any, params: any) {
  let name = arr.shift()
  if (name.match(/^\d+$/)) return Quest.lang.toWords(parseInt(name))
  if (typeof params[name] === 'number') return Quest.lang.toWords(params[name])
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'number' (" + params.tpOriginalString + ")")
  if (typeof obj[arr[0]] === 'number') return Quest.lang.toWords(obj[arr[0]])
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  return Quest.IO.errormsg("Failed to find a number for object '" + name + "' in text processor (" + params.tpOriginalString + ")")
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'ordinal' does not exist on type '{}'.
tp.text_processors.ordinal = function (arr: any, params: any) {
  let name = arr.shift()
  if (name.match(/^\d+$/)) return Quest.lang.toOrdinal(parseInt(name))
  if (typeof params[name] === 'number') return Quest.lang.toOrdinal(params[name])
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'number' (" + params.tpOriginalString + ")")
  if (typeof obj[arr[0]] === 'number') return Quest.lang.toOrdinal(obj[arr[0]])
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  return Quest.IO.errormsg("Failed to find a number for object '" + name + "' in text processor (" + params.tpOriginalString + ")")
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'money' does not exist on type '{}'.
tp.text_processors.money = function (arr: any, params: any) {
  let name = arr.shift()
  if (name.match(/^\d+$/)) return Quest.Utilities.displayMoney(parseInt(name))
  if (typeof params[name] === 'number') return Quest.Utilities.displayMoney(params[name])
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'money' (" + params.tpOriginalString + ")")
  if (obj.loc === player.name && obj.getSellingPrice) {
    return Quest.Utilities.displayMoney(obj.getSellingPrice(player))
  }
  if (obj.loc === player.name && obj.getBuyingPrice) {
    return Quest.Utilities.displayMoney(obj.getBuyingPrice(player))
  }
  if (obj.getPrice) {
    return Quest.Utilities.displayMoney(obj.getPrice())
  }
  if (obj.price) {
    return Quest.Utilities.displayMoney(obj.price)
  }
  if (obj.money) {
    return Quest.Utilities.displayMoney(obj.money)
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  return Quest.IO.errormsg("Failed to find a price for object '" + name + "' in text processor (" + params.tpOriginalString + ")")
};
// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
tp.text_processors['$'] = tp.text_processors.money


// @ts-expect-error ts-migrate(2339) FIXME: Property 'dateTime' does not exist on type '{}'.
tp.text_processors.dateTime = function (arr: any, params: any) {
  const options = { format: arr[0] }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'is' does not exist on type '{ format: an... Remove this comment to see the full error message
  if (!isNaN(arr[1])) options.is = parseInt(arr[1])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'add' does not exist on type '{ format: a... Remove this comment to see the full error message
  if (!isNaN(arr[2])) options.add = parseInt(arr[2])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDateTime' does not exist on type '{}'... Remove this comment to see the full error message
  return Quest.Utilities.util.getDateTime(options)
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'transitDest' does not exist on type '{}'... Remove this comment to see the full error message
tp.text_processors.transitDest = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const transit = arr[0] ? w[arr[0]] : w[player.loc]
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!transit.transitDoorDir) return Quest.IO.errormsg("Trying to use the 'transitDest' text process directive when the player is not in a transit location (" + params.tpOriginalString + ").")
  if (transit.currentButtonName) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const button = w[transit.currentButtonName]
    if (button.title) return button.title
  }
  const destName = transit[transit.transitDoorDir].name
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return Quest.lang.getName(w[destName], { capital: true })
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'img' does not exist on type '{}'.
tp.text_processors.img = function (arr: any, params: any) {
  const src = arr[0].includes('/') ? arr[0] : Quest.Settings.settings.imagesFolder + arr[0]
  return '<img src="' + src + '" title="' + arr[1] + '" alt="' + arr[2] + '"/>';
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '{ text_pro... Remove this comment to see the full error message
tp.once = function (params: any, s1: any, s2: any) {
  if (params.tpFirstTime && s1) return s1
  if (!params.tpFirstTime && s2) return s2
  return ''
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type '{}'.
tp.text_processors.once = function (arr: any, params: any) { return tp.once(params, arr[0], arr[1]) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'first' does not exist on type '{}'.
tp.text_processors.first = tp.text_processors.once
// @ts-expect-error ts-migrate(2339) FIXME: Property 'notOnce' does not exist on type '{}'.
tp.text_processors.notOnce = function (arr: any, params: any) { return tp.once(params, arr[1], arr[0]) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'notfirst' does not exist on type '{}'.
tp.text_processors.notfirst = tp.text_processors.notOnce


// @ts-expect-error ts-migrate(2339) FIXME: Property 'cmd' does not exist on type '{}'.
tp.text_processors.cmd = function (arr: any, params: any) {
  if (arr.length === 1) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cmdlink' does not exist on type '{ nexti... Remove this comment to see the full error message
    return Quest.IO.io.cmdlink(arr[0], arr[0])
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cmdlink' does not exist on type '{ nexti... Remove this comment to see the full error message
    return Quest.IO.io.cmdlink(arr[0], arr[1])
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'command' does not exist on type '{}'.
tp.text_processors.command = function (arr: any, params: any) {
  if (arr.length === 1) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cmdlink' does not exist on type '{ nexti... Remove this comment to see the full error message
    return Quest.IO.io.cmdlink(arr[0], arr[0]);
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'cmdlink' does not exist on type '{ nexti... Remove this comment to see the full error message
    return Quest.IO.io.cmdlink(arr[0], arr[1]);
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'exit' does not exist on type '{}'.
tp.text_processors.exit = tp.text_processors.command
// @ts-expect-error ts-migrate(2339) FIXME: Property 'page' does not exist on type '{}'.
tp.text_processors.page = tp.text_processors.command


// @ts-expect-error ts-migrate(2339) FIXME: Property 'hour' does not exist on type '{}'.
tp.text_processors.hour = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDateTimeDict' does not exist on type ... Remove this comment to see the full error message
  const hour = Quest.Utilities.util.getDateTimeDict().hour
  if (hour < arr[0]) return ''
  if (hour >= arr[1]) return ''
  return arr[2]
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'link' does not exist on type '{}'.
tp.text_processors.link = function (arr: any, params: any) {
  let s1 = arr.shift()
  let s2 = arr.join(':')
  return '<a href=\"' + s2 + '\" target="_blank">' + s1 + '</a>'
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'popup' does not exist on type '{}'.
tp.text_processors.popup = function (arr: any, params: any) {
  let s1 = arr.shift()
  let s2 = arr.join(':')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
  let id = s1.replace(/[^a-zA-Z_]/, '') + random.int(0, 999999999)
  const html = '<div id=\"' + id + '\" class=\"popup\" onclick=\"Quest.IO.io.toggleDisplay(\'' + id + '\')"><p>' + s2 + '</p></div>'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#main').innerHTML += html
  return '<span class=\"popup-link\" onclick=\"Quest.IO.io.toggleDisplay(\'#' + id + '\')">' + s1 + '</span>'
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'roomSet' does not exist on type '{}'.
tp.text_processors.roomSet = function (arr: any, params: any) {
  const n = currentLocation.roomSetOrder - 1
  return n < arr.length ? arr[n] : ''
}




//-----------  CONDITIONALS  --------------------

// @ts-expect-error ts-migrate(2339) FIXME: Property 'if' does not exist on type '{}'.
tp.text_processors.if = function (arr: any, params: any) { return tp.handleIf(arr, params, false) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifNot' does not exist on type '{}'.
tp.text_processors.ifNot = function (arr: any, params: any) { return tp.handleIf(arr, params, true) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleIf' does not exist on type '{ text... Remove this comment to see the full error message
tp.handleIf = function (arr: any, params: any, reverse: any) {
  let name = arr.shift(), flag

  if (typeof params[name] === 'boolean') return (params[name] ? arr[0] : (arr[1] ? arr[1] : ""))

  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'if/ifNot' (" + params.tpOriginalString + ")")
  name = arr.shift();
  let attValue = typeof obj[name] === 'function' ? obj[name](params) : obj[name]
  if (typeof attValue === 'object') attValue = attValue.name
  if (attValue === undefined) attValue = false
  if (typeof attValue === "boolean") {
    flag = attValue
  }
  else {
    let value = arr.shift()
    if (typeof attValue === "number") {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (isNaN(value)) return Quest.IO.errormsg("Trying to compare a numeric attribute, '" + name + "' with a string (" + params.tpOriginalString + ").")
      value = parseInt(value)
    }
    flag = (attValue === value)
  }
  if (reverse) flag = !flag
  return (flag ? arr[0] : (arr[1] ? arr[1] : ""))
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifIs' does not exist on type '{}'.
tp.text_processors.ifIs = function (arr: any, params: any) { return tp.handleIfIs(arr, params, false) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifNotIs' does not exist on type '{}'.
tp.text_processors.ifNotIs = function (arr: any, params: any) { return tp.handleIfIs(arr, params, true) }

// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleIfIs' does not exist on type '{ te... Remove this comment to see the full error message
tp.handleIfIs = function (arr: any, params: any, reverse: any) {
  let name = arr.shift(), flag;
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'if/ifNot' (" + params.tpOriginalString + ")")
  name = arr.shift();
  let attValue = typeof obj[name] === 'function' ? obj[name](params) : obj[name]
  if (typeof attValue === 'object') attValue = attValue.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'guessMyType' does not exist on type '{}'... Remove this comment to see the full error message
  const value = Quest.Utilities.util.guessMyType(arr.shift())
  flag = (attValue === value)
  if (reverse) flag = !flag
  return (flag ? arr[0] : (arr[1] ? arr[1] : ""))
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifExists' does not exist on type '{}'.
tp.text_processors.ifExists = function (arr: any, params: any) { return tp.handleIfExists(arr, params, false) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifNotExists' does not exist on type '{}'... Remove this comment to see the full error message
tp.text_processors.ifNotExists = function (arr: any, params: any) { return tp.handleIfExists(arr, params, true) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleIfExists' does not exist on type '... Remove this comment to see the full error message
tp.handleIfExists = function (arr: any, params: any, reverse: any) {
  let name = arr.shift(), flag
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'if/ifNotExists' (" + params.tpOriginalString + ")")
  name = arr.shift()
  flag = obj[name] !== undefined
  if (reverse) flag = !flag
  return (flag ? arr[0] : (arr[1] ? arr[1] : ""))
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifLessThan' does not exist on type '{}'.
tp.text_processors.ifLessThan = function (arr: any, params: any) { return tp.handleIfLessMoreThan(arr, params, false, false) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifMoreThan' does not exist on type '{}'.
tp.text_processors.ifMoreThan = function (arr: any, params: any) { return tp.handleIfLessMoreThan(arr, params, true, false) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifLessThanOrEqual' does not exist on typ... Remove this comment to see the full error message
tp.text_processors.ifLessThanOrEqual = function (arr: any, params: any) { return tp.handleIfLessMoreThan(arr, params, false, true) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifMoreThanOrEqual' does not exist on typ... Remove this comment to see the full error message
tp.text_processors.ifMoreThanOrEqual = function (arr: any, params: any) { return tp.handleIfLessMoreThan(arr, params, true, true) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleIfLessMoreThan' does not exist on ... Remove this comment to see the full error message
tp.handleIfLessMoreThan = function (arr: any, params: any, moreThan: any, orEqual: any) {
  let name = arr.shift(), flag
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'ifLessMoreThan' (" + params.tpOriginalString + ")")
  name = arr.shift()
  let attValue = typeof obj[name] === 'function' ? obj[name](params) : obj[name]
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (typeof attValue !== "number") return Quest.IO.errormsg("Trying to use ifLessThan with a non-numeric (or nonexistent) attribute, '" + name + "' (" + params.tpOriginalString + ").")
  let value = arr.shift()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (isNaN(value)) return Quest.IO.errormsg("Trying to compare a numeric attribute, '" + name + "' with a string (" + params.tpOriginalString + ").")
  value = parseInt(value)
  flag = moreThan ? (orEqual ? (attValue >= value) : (attValue > value)) : (orEqual ? (attValue <= value) : (attValue < value))
  return (flag ? arr[0] : (arr[1] ? arr[1] : ""))
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifHere' does not exist on type '{}'.
tp.text_processors.ifHere = function (arr: any, params: any) { return tp.handleIfHere(arr, params, false, 'loc') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifNotHere' does not exist on type '{}'.
tp.text_processors.ifNotHere = function (arr: any, params: any) { return tp.handleIfHere(arr, params, true, 'loc') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifHeld' does not exist on type '{}'.
tp.text_processors.ifHeld = function (arr: any, params: any) { return tp.handleIfHere(arr, params, false, 'name') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifNotHeld' does not exist on type '{}'.
tp.text_processors.ifNotHeld = function (arr: any, params: any) { return tp.handleIfHere(arr, params, true, 'name') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleIfHere' does not exist on type '{ ... Remove this comment to see the full error message
tp.handleIfHere = function (arr: any, params: any, reverse: any, locAtt: any) {
  const name = arr.shift();
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'ifHere' (" + params.tpOriginalString + ")")
  let flag = obj.isAtLoc(player[locAtt], world.ALL)
  if (reverse) flag = !flag
  return (flag ? arr[0] : (arr[1] ? arr[1] : ""))
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifPlayer' does not exist on type '{}'.
tp.text_processors.ifPlayer = function (arr: any, params: any) { return tp.handleIfPlayer(arr, params, false) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifNotPlayer' does not exist on type '{}'... Remove this comment to see the full error message
tp.text_processors.ifNotPlayer = function (arr: any, params: any) { return tp.handleIfPlayer(arr, params, true) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handleIfPlayer' does not exist on type '... Remove this comment to see the full error message
tp.handleIfPlayer = function (arr: any, params: any, reverse: any) {
  let name = arr.shift(), flag
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const obj = tp._findObject(name, params, arr)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!obj) return Quest.IO.errormsg("Failed to find object '" + name + "' in text processor 'if/ifNotPlayer' (" + params.tpOriginalString + ")")
  flag = obj === player
  if (reverse) flag = !flag
  return (flag ? arr[0] : (arr[1] ? arr[1] : ""))
}














//---------------  SUPPORT  FOR  ROOM  TEMPLATES  ------------------------------------

// @ts-expect-error ts-migrate(2339) FIXME: Property 'terse' does not exist on type '{}'.
tp.text_processors.terse = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbosity' does not exist on type '{ per... Remove this comment to see the full error message
  if ((Quest.Settings.settings.verbosity === world.TERSE && currentLocation.visited === 0) || Quest.Settings.settings.verbosity === world.VERBOSE) {
    return Quest.Utilities.sentenceCase(arr.join(":"))
  }
  else {
    return ''
  }
}



// Need to do some hackery here...
// It is assumed this is only used in the room template, and therefore should be safe
// The issue is that the text for every room is {hereDesc}, so the "once" directive
// would only work the first time. In the econd room, {hereDesc} has already been done, so once fails.
// The hack then is to pre-process the room text in here
// @ts-expect-error ts-migrate(2339) FIXME: Property 'hereDesc' does not exist on type '{}'.
tp.text_processors.hereDesc = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const room = w[player.loc];
  let s
  if (typeof room.desc === 'string') {
    s = room.desc
  }
  else if (typeof room.desc === 'function') {
    s = room.desc()
    if (s === undefined) {
      Quest.IO.errormsg("This room description is not set up properly. It has a 'desc' function that does not return a string. The room is \"" + room.name + "\".", true)
      return "[Bad description]"
    }
  }
  else {
    return "This is a room in dire need of a description."
  }
  delete params.tpFirstTime
  return processText(s, params)
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'hereName' does not exist on type '{}'.
tp.text_processors.hereName = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const room = w[player.loc]
  return room.headingAlias
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'objectsHere' does not exist on type '{}'... Remove this comment to see the full error message
tp.text_processors.objectsHere = function (arr: any, params: any) {
  const listOfOjects = Quest.Utilities.scopeHereListed();
  return listOfOjects.length === 0 ? "" : arr.join(":");
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'exitsHere' does not exist on type '{}'.
tp.text_processors.exitsHere = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const list = w[player.loc].getExitDirs()
  return list.length === 0 ? "" : arr.join(":");
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'objects' does not exist on type '{}'.
tp.text_processors.objects = function (arr: any, params: any) {
  const listOfOjects = Quest.Utilities.scopeHereListed();
  return Quest.Utilities.formatList(listOfOjects, { article: Quest.Utilities.INDEFINITE, lastJoiner: Quest.lang.list_and, modified: true, nothing: Quest.lang.list_nothing, loc: player.loc });
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'exits' does not exist on type '{}'.
tp.text_processors.exits = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const list = w[player.loc].getExitDirs()
  return Quest.Utilities.formatList(list, { lastJoiner: Quest.lang.list_or, nothing: Quest.lang.list_nowhere });
}




//----------------  PARAMS  AND  NEUTRAL  LANGUAGE  SUPPORT  ---------------------------
// Then {nv:char:try} to get





/*
The name functions could readily be expanded. You can add further parameters and Quest will then grab those and pass them to Quest.lang.getName. Thus, if we have this:

Quest.IO.msg("You see {nm:item:the:false:x_count}.", {item:w.terror_cat, x_count:4})

Then the options passed to Quest.lang.getName will include x_count set to 4.
*/

// {function:character:article:capitalise}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'nm' does not exist on type '{}'.
tp.text_processors.nm = function (arr: any, params: any) { return tp.nameFunction(arr, params, false) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'nms' does not exist on type '{}'.
tp.text_processors.nms = function (arr: any, params: any) { return tp.nameFunction(arr, params, true) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'nameFunction' does not exist on type '{ ... Remove this comment to see the full error message
tp.nameFunction = function (arr: any, params: any, isPossessive: any) {

  const name = arr.shift()
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const subject = tp._findObject(name, params, arr)
  if (!subject) return false;
  const options = { possessive: isPossessive };
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'article' does not exist on type '{ posse... Remove this comment to see the full error message
  if (arr[0] === 'the') options.article = Quest.Utilities.DEFINITE
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'article' does not exist on type '{ posse... Remove this comment to see the full error message
  if (arr[0] === 'a') options.article = Quest.Utilities.INDEFINITE
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'article' does not exist on type '{ posse... Remove this comment to see the full error message
  if (arr[0] === 'count') options.article = Quest.Utilities.COUNT
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (params[subject.name + '_count']) options[subject.name + '_count'] = params[subject.name + '_count']
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (params[name + '_count']) options[subject.name + '_count'] = params[name + '_count']
  let n = 2
  while (arr[n]) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    options[arr[n]] = params[arr[n]]
    n++
  }
  return arr[1] === 'true' ? Quest.Utilities.sentenceCase(Quest.lang.getName(subject, options)) : Quest.lang.getName(subject, options);
}


// {function:character:verb:capitalise}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'nv' does not exist on type '{}'.
tp.text_processors.nv = function (arr: any, params: any) { return tp.conjugations(Quest.lang.nounVerb, arr, params) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'pv' does not exist on type '{}'.
tp.text_processors.pv = function (arr: any, params: any) { return tp.conjugations(Quest.lang.pronounVerb, arr, params) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'vn' does not exist on type '{}'.
tp.text_processors.vn = function (arr: any, params: any) { return tp.conjugations(Quest.lang.verbNoun, arr, params) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'vp' does not exist on type '{}'.
tp.text_processors.vp = function (arr: any, params: any) { return tp.conjugations(Quest.lang.verbPronoun, arr, params) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'cj' does not exist on type '{}'.
tp.text_processors.cj = function (arr: any, params: any) { return tp.conjugations(Quest.lang.conjugate, arr, params) }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'conjugations' does not exist on type '{ ... Remove this comment to see the full error message
tp.conjugations = function (func: any, arr: any, params: any) {
  const name = arr.shift()
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const subject = tp._findObject(name, params, arr)
  if (!subject) return false
  const options = { capitalise: arr[1] === 'true' }
  let n = 2
  while (arr[n]) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    options[arr[n]] = params[arr[n]]
    n++
  }
  return func(subject, arr[0], options)
}


// {function:item:capitalise}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
tp.handlePronouns = function (arr: any, params: any, pronoun: any) {
  const name = arr.shift()
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const subject = tp._findObject(name, params, arr)
  if (!subject) return false;
  return arr[0] === 'true' ? Quest.Utilities.sentenceCase(subject.pronouns[pronoun]) : subject.pronouns[pronoun];
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'pa' does not exist on type '{}'.
tp.text_processors.pa = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
  return tp.handlePronouns(arr, params, "poss_adj");
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ob' does not exist on type '{}'.
tp.text_processors.ob = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
  return tp.handlePronouns(arr, params, "objective");
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'sb' does not exist on type '{}'.
tp.text_processors.sb = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
  return tp.handlePronouns(arr, params, "subjective");
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ps' does not exist on type '{}'.
tp.text_processors.ps = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
  return tp.handlePronouns(arr, params, "possessive");
};
// @ts-expect-error ts-migrate(2339) FIXME: Property 'rf' does not exist on type '{}'.
tp.text_processors.rf = function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'handlePronouns' does not exist on type '... Remove this comment to see the full error message
  return tp.handlePronouns(arr, params, "reflexive");
};


// {pa2:chr1:chr2}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'pa2' does not exist on type '{}'.
tp.text_processors.pa2 = function (arr: any, params: any) {
  const name1 = arr.shift()
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const chr1 = tp._findObject(name1, params, arr)
  if (!chr1) return false;
  const name2 = arr.shift()
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const chr2 = tp._findObject(name2, params, arr)
  if (!chr2) return false;

  if (chr1.pronouns === chr2.pronouns && chr1 !== chr2) {
    const opt = { article: Quest.Utilities.DEFINITE, possessive: true };
    return arr[0] === 'true' ? Quest.Utilities.sentenceCase(Quest.lang.getName(chr1, opt)) : Quest.lang.getName(chr1, opt)
  }

  return arr[0] === 'true' ? Quest.Utilities.sentenceCase(chr1.pronouns.poss_adj) : chr1.pronouns.poss_adj;
};

// {pa3:chr1:chr2}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'pa3' does not exist on type '{}'.
tp.text_processors.pa3 = function (arr: any, params: any) {
  const name1 = arr.shift()
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const chr1 = tp._findObject(name1, params, arr)
  if (!chr1) return false;
  const name2 = arr.shift()
  // @ts-expect-error ts-migrate(2339) FIXME: Property '_findObject' does not exist on type '{ t... Remove this comment to see the full error message
  const chr2 = tp._findObject(name2, params, arr)
  if (!chr2) return false;

  if (chr1 !== chr2) {
    const opt = { article: Quest.Utilities.DEFINITE, possessive: true };
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'subject'.
    return arr[0] === 'true' ? Quest.Utilities.sentenceCase(Quest.lang.getName(subject, opt)) : Quest.lang.getName(subject, opt);
  }

  return arr[0] === 'true' ? Quest.Utilities.sentenceCase(chr1.pronouns.poss_adj) : chr1.pronouns.poss_adj;
};
