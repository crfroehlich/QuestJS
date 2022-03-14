"use strict"

// This is at the top of the file so authors know to ignore stack trace enties for lines 1 to 15 in _io.js
const printError = function (msg: any, err: any, suppressTrace: any) {
  console.error("ERROR: " + msg)
  if (world.isCreated) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'print' does not exist on type '{ nextid:... Remove this comment to see the full error message
    io.print({ tag: 'p', cssClass: "error", text: Quest.lang.error })
    saveLoad.transcriptAppend({ cssClass: 'error', text: msg, stack: err.stack, })
  }
  if (suppressTrace) return false
  console.log('Look through the trace below to find the offending code. The first entry in the list may be "errormsg" in the file "_io.js", which is me so can be ignored. The next will the code that detected the error and called the "errormsg" message. You may need to look further down to find the root cause, especially for a text process issue.')
  console.log(err)
  return false;
}











// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
if (Quest.Settings.settings.playMode !== 'dev') {
  window.onbeforeunload = function (event: any) {
    event.returnValue = "Are you sure?";
  }
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'mediaQuery' does not exist on type '{ pe... Remove this comment to see the full error message
Quest.Settings.settings.mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
// @ts-expect-error ts-migrate(2339) FIXME: Property 'autoscroll' does not exist on type '{ pe... Remove this comment to see the full error message
Quest.Settings.settings.autoscroll = !Quest.Settings.settings.mediaQuery.matches





// ============  Output  =======================================


//@DOC
// ##Output functions
//
// The idea is that you can have them world. differently - or not at all -
// so error messages can be world.ed in red, meta-data (help., etc)
// is grey, and debug messages can be turned on and off as required.
//
// Note that not all use the text processor (so if there is an issue with
// the text processor, we can use the others to report it). Also unit tests
// capture output with msg and errormsg, but not debugmsg or headings.
//
// Should all be language neutral
//@UNDOC





/*
tag   required
action  required
cssClass
printBlank
*/




function _msg(s: any, params: any, options: any) {
  if (options.tag === undefined) options.tag = 'p'
  if (options.cssClass === undefined) options.cssClass = 'default-' + options.tag.toLowerCase();
  let processed = params ? processText(s, params).trim() : s.trim();
  if (processed === "" && !options.printBlank) return;

  for (let line of processed.split('|')) {
    for (const el in io.escapeCodes) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      line = line.replace(RegExp('@@@' + el + '@@@', 'ig'), io.escapeCodes[el])
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'convertDoubleDash' does not exist on typ... Remove this comment to see the full error message
    if (Quest.Settings.settings.convertDoubleDash && !Quest.Utilities.test.testing) line = line.replace(/ -- /g, ' &mdash; ')
    const data = {}
    Object.assign(data, options)  // need to do it this way as options may be same object
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{}'.
    data.text = line
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'action' does not exist on type '{}'.
    if (!data.action) data.action = 'output'

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
    if (Quest.Utilities.test.testing) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ignoreHTML' does not exist on type '{}'.
      if (test.ignoreHTML) line = line.replace(/(<([^>]+)>)/gi, '')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'fullOutputData' does not exist on type '... Remove this comment to see the full error message
      if (test.fullOutputData) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
        test.testOutput.push(data)
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
        test.testOutput.push(line)
      }
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'addToOutputQueue' does not exist on type... Remove this comment to see the full error message
      io.addToOutputQueue(data)
    }
  }
}


//@DOC
// Adds the given string to the print queue.
// This allows you to add any HTML you want to the output queue.
function rawPrint(s: any) {
  _msg(s, false, {})
}



//@DOC
// Output a standard message, as an HTML paragraph element (P).
// The string will first be passed through the text processor.
// Additional data can be put in the optional params dictionary.
// You can specify a CSS class to use.
// During unit testing, messages will be saved and tested
// If the string starts with a hash and no cssClass is given the line will be printed as a level 4 heading.
// A vertical bar will be taken as a line break. 
function msg(s: any, params: any, cssClass: any) {
  if (!params) params = {}
  if (typeof s !== 'string') {
    console.error("Trying to print with \"msg\", but got this instead of a string:")
    console.error(s)
    const err = new Error();
    log(err.stack)
    throw "Bad string for msg()"
  }

  if (/^#/.test(s) && !cssClass) {
    s = s.replace(/^#/, '')
    _msg(s, params, { cssClass: 'default-h default-h4', tag: 'h4' })
  }
  else {
    _msg(s, params, { cssClass: cssClass, tag: 'p' })
  }
}


//@DOC
// Output a standard message, as an HTML pre-formaed element (PRE).
// The string will first be passed through the text processor.
// Additional data can be put in the optional params dictionary.
// During unit testing, messages will be saved and tested
function msgPre(s: any, params: any, cssClass: any) {
  if (!params) params = {}
  if (typeof s !== 'string') {
    console.error("Trying to print with \"msgPre\", but got this instead of a string:")
    console.error(s)
    console.trace()
    throw "Bad string for msgPre()"
  }
  _msg(s, params, { cssClass: cssClass, tag: 'pre' })
}

//@DOC 
//Output a standard message, but it makes the NEXT message appear on the same line as the current message. Note that the next message will not have its own params or cssClass. 
function OutputTextNoBr(s: any, params: any, cssClass: any) {
  if (s.startsWith(' ')) {
    s = "&nbsp;" + s.substring(1, s.length);
  }
  if (s.endsWith(' ')) {
    s = s.substring(0, (s.length - 1)) + "&nbsp;"
  }
  msg("@@OUTPUTTEXTNOBR@@" + s, params, cssClass);
}
function msgBlankLine() {
  _msg('', false, { tag: 'p', printBlank: true })
}


//@DOC
// As `msg`, but handles an array of strings. Each string is put in its own HTML paragraph,
// and the set is put in an HTML division (DIV). The cssClass is applied to the division.
function msgDiv(arr: any, params: any, cssClass: any) {
  let s = ''
  for (let item of arr) {
    s += '  <p>' + item + "</p>\n"
  }
  _msg(s, params || {}, { cssClass: cssClass, tag: 'div' })
}



//@DOC
// As `msg`, but handles an array of strings in a list. Each string is put in its own HTML list item (LI),
// and the set is put in an HTML order list (OL) or unordered list (UL), depending on the value of `ordered`.
function msgList(arr: any, ordered: any, params: any, cssClass: any) {
  let s = ''
  for (let item of arr) {
    s += '  <li>' + item + "</li>\n"
  }
  _msg(s, params || {}, { cssClass: cssClass, tag: ordered ? 'ol' : 'ul' })
}



//@DOC
// As `msg`, but handles an array of arrays of strings in a list. This is laid out in an HTML table.
// If `headings` is present, this array of strings is used as the column headings.
function msgTable(arr: any, headings: any, params: any, cssClass: any) {
  let s = ''
  if (headings) {
    s += '  <tr>\n'
    for (let item of headings) {
      s += "    <th>" + item + "</th>\n"
    }
    s += '  </tr>\n'
  }
  for (let row of arr) {
    s += '  <tr>\n'
    for (let item of row) {
      s += "    <td>" + processText(item, params).trim() + "</td>\n"
    }
    s += "  </tr>\n"
  }
  _msg(s, params || {}, { cssClass: cssClass, tag: 'table' })
}



//@DOC
// As `msg`, but the string is presented as an HTML heading (H1 to H6).
// The level of the heading is determined by `level`, with 1 being the top, and 6 the bottom.
// Headings are ignored during unit testing.
function msgHeading(s: any, level: any, params: any) {
  _msg(s, params || {}, { tag: 'h' + level, cssClass: 'default-h default-h' + level })
}





//@DOC
// Output a picture, as an HTML image element (IMG).
// If width and height are omitted, the size of the image is used.
// If height is omitted, the height will be proportional to the given width.
// The file name should include the path. For a local image, that would probably be the images folder,
// but it could be the web address of an image hosted elsewhere.
function picture(filename: any, width: any, height: any) {
  const src = filename.includes('/') ? filename : Quest.Settings.settings.imagesFolder + filename
  _msg('', {}, { action: 'output', width: width, height: height, tag: 'img', src: src, printBlank: true })
}



function image(filename: any, width: any, height: any) {
  const src = filename.includes('/') ? filename : Quest.Settings.settings.imagesFolder + filename
  _msg('', {}, { action: 'output', width: width, height: height, tag: 'img', src: src, cssClass: 'centred', printBlank: true, destination: 'quest-image' })
}





//@DOC
// Plays a sound. The filename must include the extension, and the file should be in the folder specified by audioFolder (defaults to the game folder).
function sound(filename: any) {
  //console.log(Quest.Settings.settings.ssFolder)
  _msg('Your browser does not support the <code>audio</code> element.', {}, { action: 'sound', name: filename })
}
function ambient(filename: any, volume: any) {
  //console.log(Quest.Settings.settings.ssFolder)
  _msg('Your browser does not support the <code>audio</code> element.', {}, { action: 'ambient', name: filename, volume: volume })
}


//@DOC
// Plays a video. The filename must include the extension, and the file should be in the folder specified by audioFolder (defaults to the game folder).
// There are some issues about codecs and formats; use at your discretion.
function video(filename: any) {
  //console.log(Quest.Settings.settings.ssFolder)
  // @ts-expect-error ts-migrate(2551) FIXME: Property 'videoFolder' does not exist on type '{ p... Remove this comment to see the full error message
  _msg('Your browser does not support the <code>video</code> element.', {}, { action: 'output', autoplay: true, tag: 'video', src: Quest.Settings.settings.videoFolder + '/' + filename })
}


//@DOC
// Draw an image in the main window, embedded in the text.
// This uses SVG, which is a standard web drawing system.
// The first and second parameters are the width and height of the image.
// The third parameter is an array of strings, each element being an SVG primitive.
// The image will be added to the output queue in the same way text is.
function draw(width: any, height: any, data: any, options: any) {
  if (!options) options = {}
  //console.log(options)
  let s = '<svg width="' + width + '" height="' + height + '" viewBox="'
  s += options.x !== undefined ? ('' + options.x + ' ' + options.y) : '0 0'
  s += ' ' + width + ' ' + height + '" '
  if (options.background) s += 'style="background:' + options.background + '" '
  s += 'xmlns="http://www.w3.org/2000/svg">'
  s += data.join('') + '</svg>'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'reportAllSvg' does not exist on type '{ ... Remove this comment to see the full error message
  if (Quest.Settings.settings.reportAllSvg) console.log(s.replace(/></g, '>\n<'))
  if (options.destination) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#' + options.destination).innerHTML = s
  }
  else {
    rawPrint(s)
  }
}




//@DOC
// Just the same as msg, but adds the "failed" CSS class. This allows failed command responses to be differentiated.
// Returns the value FAILED, allowing commands to give a message and give up
//     if (notAllowed) return failedmsg("That is not allowed.")
function failedmsg(s: any, params: any) {
  _msg(s, params || {}, { cssClass: "default-p failed", tag: 'p' });
  return world.FAILED;
}



//@DOC
// Just the same as msg, but adds the "failed" CSS class. This allows failed command responses to be differentiated.
// Returns the value false, allowing commands to give a message and give up
//     if (notAllowed) return falsemsg("That is not allowed.")
function falsemsg(s: any, params: any) {
  _msg(s, params || {}, { cssClass: "default-p failed", tag: 'p' });
  return false;
}



//@DOC
// Output a meta-message - a message to inform the player about something outside the game world,
// such as hints and help messages.
// The string will first be passed through the text processor.
// Additional data can be put in the optional params dictionary.
// During unit testing, messages will be saved and tested
function metamsg(s: any, params: any) {
  _msg(s, params || {}, { cssClass: "meta", tag: 'p' });
}

//@DOC
// Output a message from the parser indicating the input text could not be parsed.
// During unit testing, messages will be saved and tested.
// Does not use the text processor.
function parsermsg(s: any) {
  _msg(s, false, { cssClass: "parser", tag: 'p' });
  return false;
}

//@DOC
// Output a message from the user
// Does not use the text processor.
function commentmsg(s: any) {
  _msg(s, false, { cssClass: "comment", tag: 'p' });
  return false;
}




//@DOC
// Output an error message.
// Use for when something has gone wrong, but not when the player types something odd -
// if you see this during play, there is a bug in your game (or my code!), it is not the player
// to blame.
//
// This bypasses the normal output system. It will not wait for other text to be output (for example
// after wait). During unit testing, error messages will be output to screen as they occur.
// It does not use the text processor.
function errormsg(s: any, suppressTrace: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
  if (test.errorOutput !== undefined) {
    // This is an expected error in a unit test
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
    test.errorOutput.push(s)
    return false
  }

  printError(s, new Error('error state caught by QuestJS runtime'), suppressTrace)

}





//@DOC
// Output a debug message.
// Debug messages are ignored if DEBUG is false.
// You should also consider using `console.log` when debugging; it gives a message in the console,
// and outputs objects and array far better.
//
// This bypasses the normal output system. It will not wait for other text to be output (for example
// after wait). During unit testing, error messages will be output to screen as they occur.
// It does not use the text processor.
function debugmsg(s: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.Settings.settings.playMode === 'dev' || Quest.Settings.settings.playMode === 'meta') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'print' does not exist on type '{ nextid:... Remove this comment to see the full error message
    io.print({ tag: 'pre', cssClass: "debug", text: s, id: io.nextid })
    io.nextid++
  }
}








//@DOC
// Adds a blank line to the output.
function blankLine() {
  rawPrint('&nbsp;')
}

//@DOC
// Adds a horizontal rule to the output.
function hr() {
  rawPrint('<hr/>')
}

//@DOC
// Clears the screen.
function clearScreen() {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'addToOutputQueue' does not exist on type... Remove this comment to see the full error message
  io.addToOutputQueue({ action: 'clear' })
}

//@DOC
// Stops outputting whilst waiting for the player to click.
function wait(delay: any, text: any, func: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  if (Quest.Utilities.test.testing || Quest.Settings.settings.walkthroughInProgress) return
  if (delay === undefined) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'addToOutputQueue' does not exist on type... Remove this comment to see the full error message
    io.addToOutputQueue({ action: 'wait', text: text, cssClass: 'continue', func: func })
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'addToOutputQueue' does not exist on type... Remove this comment to see the full error message
    io.addToOutputQueue({ action: 'delay', delay: delay, text: text, cssClass: 'continue', func: func })
  }
}



//@DOC
// Clears the screen.
function trigger(func: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'addToOutputQueue' does not exist on type... Remove this comment to see the full error message
  io.addToOutputQueue({ action: 'func', func: func })
}




//@DOC
// Use like this:
//      showMenu('What is your favourite color?', ['Blue', 'Red', 'Yellow', 'Pink'], function(result) {
//        msg("You picked " + result + ".");
//      });
function showMenu(title: any, options: any, fn: any) {
  const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
  io.input(title, options, false, fn, function (options: any) {
    for (let i = 0; i < options.length; i++) {
      let s = '<a class="menu-option" onclick="io.menuResponse(' + i + ')">';
      s += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts))
      s += '</a>';
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    }
  })
}



function showMenuNumbersOnly(title: any, options: any, fn: any) {
  const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
  parser.overrideWith(function (s: any) { io.menuResponse(s) })
  const disableTextFunction = function (disable: any) {
    if (disable) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
      io.disable(3)
      // add a keypress event handler to capture keypresses directly
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'keydownFunction' does not exist on type ... Remove this comment to see the full error message
      io.keydownFunction = function (e: any) {
        const n = parseInt(e.key)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
        if (!isNaN(n) && n <= io.menuOptions.length && n !== 0) parser.parse('' + n)
        // stopping the typed character appearing in the text field is not easy...
        // stopPropagation and stopImmediatePropagation did not do it,
        // even though it seems to happen after this
        // so just delete it!
        setTimeout(function () {
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#textbox').value = ''
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#textbox').focus()
        }, 10)
      }
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
      io.enable(5)
      //document.querySelector('#textbox').prop('disabled', false)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'keydownFunction' does not exist on type ... Remove this comment to see the full error message
      delete io.keydownFunction
    }
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
  io.input(title, options, disableTextFunction, fn, function (options: any) {
    for (let i = 0; i < options.length; i++) {
      let s = (i + 1) + '. <a class="menu-option" onclick="io.menuResponse(' + i + ')">';
      s += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts))
      s += '</a>';
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    }
  })
}


function showMenuWithNumbers(title: any, options: any, fn: any) {
  const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
  parser.overrideWith(function (s: any) { io.menuResponse(s) })
  const disableTextFunction = function (disable: any) {
    if (disable) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
      io.disable(2)
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
      io.enable()
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotSaveInput' does not exist on type '... Remove this comment to see the full error message
      io.doNotSaveInput = false
    }
  }
  const failFunction = function (input: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("I do not understand: " + input)
    Quest.Utilities.runCmd(input)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommands' does not exist on type '{... Remove this comment to see the full error message
    io.savedCommands.push(input)
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotSaveInput' does not exist on type '... Remove this comment to see the full error message
  io.doNotSaveInput = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
  io.input(title, options, disableTextFunction, fn, function (options: any) {
    for (let i = 0; i < options.length; i++) {
      let s = (i + 1) + '. <a class="menu-option" onclick="io.menuResponse(' + i + ')">';
      s += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts))
      s += '</a>';
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(s);
    }
  }, failFunction)
}




function showDropDown(title: any, options: any, fn: any) {
  const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
  io.input(title, options, false, fn, function (options: any) {
    let s = '<select id="menu-select" class="custom-select" style="width:400px;" ';
    s += 'onchange=\"io.menuResponse(io.getDropDownText(\'menu-select\'))\">';
    s += '<option value="-1">-- Select one --</option>';
    for (let i = 0; i < options.length; i++) {
      s += '<option value="' + (i + 1) + '">';
      s += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts))
      s += '</option>';
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(s + "</select>");
    //document.querySelector('#menu-select').selectmenu();
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#menu-select').focus();
  })
}


function showMenuDiag(title: any, options: any, fn: any, cssClass: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
  io.showMenuDiagTitle = title
  const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true }
  const disableTextFunction = function (disable: any) {
    if (disable) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
      io.disable(3)
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
      io.enable()
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
      if (!Quest.Utilities.test.testing) {
        const el = document.querySelector('#sidepane-menu')
        if (el) el.remove() // may not exist in walk-through
      }
    }
  }

  const displayFunction = function (options: any) {
    let s = '<div id="sidepane-menu"'
    if (cssClass) s += ' class="' + cssClass + '"'
    s += '>'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
    if (typeof io.showMenuDiagTitle === 'string') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
      s += '<p class="sidepane-menu-title">' + io.showMenuDiagTitle + '</p>'
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
      s += '<h4 class="sidepane-menu-title">' + io.showMenuDiagTitle.title + '</h4>'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
      s += '<p class="sidepane-menu-title">' + io.showMenuDiagTitle.text + '</p>'
    }
    for (let i = 0; i < options.length; i++) {
      s += '<p value="' + i + '" onclick="io.menuResponse(' + i + ')" class="sidepane-menu-option">'
      s += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts))
      s += '</p>';
    }
    s += '</div>'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('body').innerHTML += s
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
  io.input(false, options, disableTextFunction, fn, displayFunction)

  return world.SUCCESS_NO_TURNSCRIPTS
}



function showYesNoMenu(title: any, fn: any) {
  showMenu(title, Quest.lang.yesNo, fn)
}

function showYesNoMenuWithNumbers(title: any, fn: any) {
  showMenuWithNumbers(title, Quest.lang.yesNo, fn)
}

function showYesNoDropDown(title: any, fn: any) {
  showDropDown(title, Quest.lang.yesNo, fn)
}



function askText(title: any, fn: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
  io.menuFn = fn
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg(title)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
  io.disable(2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
  parser.overrideWith(function (result: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
    io.enable()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommands' does not exist on type '{... Remove this comment to see the full error message
    io.savedCommands.pop()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommandsPos' does not exist on type... Remove this comment to see the full error message
    if (io.savedCommandsPos > io.savedCommands.length) io.savedCommandsPos = io.savedCommands.length
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
    io.menuFn(result)
  })
}

function showDiag(title: any, text: any, submitButton: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (!submitButton) return errormsg("Trying to use showDiag with no button")
  askDiag({ title: title, text: text, width: 800, height: 600 }, null, submitButton)
}



function askDiag(title: any, fn: any, submitButton: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
  io.menuFn = fn
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
  io.showMenuDiagTitle = title
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagSubmit' does not exist on ty... Remove this comment to see the full error message
  io.showMenuDiagSubmit = submitButton
  const disableTextFunction = function (disable: any) {
    if (disable) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
      io.disable(3)
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
      io.enable()
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#sidepane-text').remove()
    }
  }

  const displayFunction = function () {
    let s = '<div id="sidepane-menu"'
    if (title.width) s += ' style="width:' + title.width + 'px;top:100px;"'
    s += '>'

    if (typeof title === 'string') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
      s += '<p class="sidepane-menu-title">' + io.showMenuDiagTitle + '</p>'
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
      s += '<h4 class="sidepane-menu-title">' + io.showMenuDiagTitle.title + '</h4>'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
      s += '<p class="sidepane-menu-title">' + io.showMenuDiagTitle.text + '</p>'
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
    if (io.menuFn) s += '<input type="text" id="text-dialog" class="sidepane-menu-option">'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagSubmit' does not exist on ty... Remove this comment to see the full error message
    if (io.showMenuDiagSubmit) {
      s += '<div id="dialog-footer" style="text-align:right"><hr>'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'showMenuDiagSubmit' does not exist on ty... Remove this comment to see the full error message
      s += '<input type="button" onclick="io.textResponse()" value="' + io.showMenuDiagSubmit + '" class="sidepane-menu-button"></div>'
    }
    s += '</div>'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('body').innerHTML += s


    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
    if (io.menuFn) {
      const el = document.getElementById("text-dialog")
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
          event.preventDefault();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'textResponse' does not exist on type '{ ... Remove this comment to see the full error message
          io.textResponse()
        }
      })
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.focus()
    }
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
  io.input(false, [], disableTextFunction, fn, displayFunction)

  return world.SUCCESS_NO_TURNSCRIPTS
}






// This should be called after each turn to ensure we are at the end of the page and the text box has the focus
function endTurnUI(update: any) {
  if (Quest.Settings.settings.panes !== 'none' && update) {
    // set the Quest.lang.exit_list
    for (let exit of Quest.lang.exit_list) {
      const el = document.querySelector('#exit-' + exit.name)
      if (!el) continue
      if (currentLocation.hasExit(exit.name, { excludeScenery: true }) || exit.type === 'nocmd') {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.display = 'block'
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.display = 'none'
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateStatus' does not exist on type '{ ... Remove this comment to see the full error message
    io.updateStatus()
  }
  for (let o of io.modulesToUpdate) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'update' does not exist on type 'never'.
    o.update(update)
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateUIItems' does not exist on type '{... Remove this comment to see the full error message
  io.updateUIItems()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
  if (Quest.Settings.settings.updateCustomUI) Quest.Settings.settings.updateCustomUI()

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
  io.scrollToEnd
  // give focus to command bar
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (Quest.Settings.settings.textInput) { document.querySelector('#textbox').focus(); }
}



function createAdditionalPane(position: any, title: any, id: any, func: any) {
  const el = document.querySelector("#panes")

  const div = document.createElement('div');
  div.classList.add("pane-div");
  div.innerHTML = '<h4 class="side-pane-heading">' + title + '</h4><div id="' + id + '">' + func() + '</div>'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  el.insertBefore(div, el.children[position])
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  Quest.Settings.settings.customPaneFunctions[id] = func
}








// ============  Hidden from creators!  =======================================




const io = {

  // Each line that is output is given an id, n plus an id number.
  nextid: 0,
  // A list of names for items currently world. in the inventory panes
  currentItemList: [],

  modulesToUpdate: [],
  modulesToInit: [],
  spoken: false,
  //False for normal function, true if things should be printed to the same paragraph 
  otnb: false,
  sameLine: false,
  slID: "output",


  escapeCodes: {
    colon: ':',
    lcurly: '{',
    rcurly: '}',
    lsquare: '[',
    rsquare: ']',
    vert: '|',
    hash: '#',
  },

  menuFunctions: {
    showMenu: showMenu,
    showDropDown: showDropDown,
    showMenuNumbersOnly: showMenuNumbersOnly,
    showMenuWithNumbers: showMenuWithNumbers,
    showMenuDiag: showMenuDiag,
  },

  showInTab: function (html: any, title = "Quest JS Tab") {
    const path = location.protocol + '//' + location.pathname.replace('index.html', '')
    const tab = window.open('about:blank', '_blank')
    if (!tab) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(Quest.lang.new_tab_failed)
      return false
    }

    Quest.Settings.settings.loadCssFiles(tab.document, path)

    const myScript = tab.document.createElement("script")
    myScript.setAttribute("src", path + 'lib/_transcript.js')
    tab.document.head.appendChild(myScript)
    tab.document.body.innerHTML = html
    tab.document.title = title
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'favicon' does not exist on type '{ perfo... Remove this comment to see the full error message
    tab.document.head.setAttribute('data-favicon', Quest.Settings.settings.favicon)
    tab.document.head.setAttribute('data-path', path)

    const link = tab.document.createElement('link')
    link.id = 'dynamic-favicon'
    link.rel = 'shortcut icon'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'favicon' does not exist on type '{ perfo... Remove this comment to see the full error message
    link.href = path + Quest.Settings.settings.favicon
    tab.document.head.appendChild(link)
  },

}





// This is used by the various menu functions (not showMenuDiag).
// @ts-expect-error ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
io.input = function (title: any, options: any, disableTextFunction: any, reactFunction: any, displayFunction: any, failFunction: any) {
  // Store the values so we can use them later in io.menuResponse
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuStartId' does not exist on type '{ n... Remove this comment to see the full error message
  io.menuStartId = io.nextid;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
  io.menuFn = reactFunction;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFailFn' does not exist on type '{ ne... Remove this comment to see the full error message
  io.menuFailFn = failFunction;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
  io.menuOptions = options;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
  io.disableTextFunction = disableTextFunction ? disableTextFunction : function (disable: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
    if (disable) io.disable(3)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
    if (!disable) io.enable()
  }

  // Skip if unit-testing
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  if (Quest.Utilities.test.testing) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
    if (test.menuResponseNumber === undefined) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
      debugmsg("Error when testing menu (possibly due to disambiguation?), test.menuResponseNumber = " + test.menuResponseNumber)
    }
    else {
      let n
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
      if (Array.isArray(test.menuResponseNumber)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
        n = test.menuResponseNumber.shift()
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
        if (test.menuResponseNumber.length === 0) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
          delete test.menuResponseNumber
        }
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
        n = test.menuResponseNumber
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
        delete test.menuResponseNumber
      }
      // Sort out the menuResponseNumber before hand in case the response also
      // uses it - we want it done before that
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponse' does not exist on type '{ ... Remove this comment to see the full error message
      io.menuResponse(n)
    }
    return;
  }

  // Skip if walk-through
  if (Quest.Settings.settings.walkthroughMenuResponses.length > 0) {
    const response = Quest.Settings.settings.walkthroughMenuResponses.shift()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponse' does not exist on type '{ ... Remove this comment to see the full error message
    io.menuResponse(response);
    return;
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
  io.disableTextFunction(true)
  if (title) msg(title, {}, 'menu-title');
  displayFunction(options)
}







// The output system is quite complicated...
// https://github.com/ThePix/QuestJS/wiki/The-Output-Queue

// @ts-expect-error ts-migrate(2339) FIXME: Property 'outputQueue' does not exist on type '{ n... Remove this comment to see the full error message
io.outputQueue = []
// @ts-expect-error ts-migrate(2339) FIXME: Property 'outputSuspended' does not exist on type ... Remove this comment to see the full error message
io.outputSuspended = false


// Stops the current pause immediately (no effect if not paused)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'unpause' does not exist on type '{ nexti... Remove this comment to see the full error message
io.unpause = function () {
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('.continue').remove()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputSuspended' does not exist on type ... Remove this comment to see the full error message
  io.outputSuspended = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputFromQueue' does not exist on type ... Remove this comment to see the full error message
  io.outputFromQueue()
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (Quest.Settings.settings.textInput) document.querySelector('#textbox').focus();
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addToOutputQueue' does not exist on type... Remove this comment to see the full error message
io.addToOutputQueue = function (data: any) {
  data.id = io.nextid
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputQueue' does not exist on type '{ n... Remove this comment to see the full error message
  io.outputQueue.push(data)
  io.nextid++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputFromQueue' does not exist on type ... Remove this comment to see the full error message
  io.outputFromQueue()
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'forceOutputFromQueue' does not exist on ... Remove this comment to see the full error message
io.forceOutputFromQueue = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputSuspended' does not exist on type ... Remove this comment to see the full error message
  io.outputSuspended = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputFromQueue' does not exist on type ... Remove this comment to see the full error message
  io.outputFromQueue()
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'outputFromQueue' does not exist on type ... Remove this comment to see the full error message
io.outputFromQueue = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputSuspended' does not exist on type ... Remove this comment to see the full error message
  if (io.outputSuspended) return
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputQueue' does not exist on type '{ n... Remove this comment to see the full error message
  if (io.outputQueue.length === 0) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
    if (!io.disableTextFunction) io.enable()
    return
  }

  //if (Quest.Settings.settings.textInput) document.querySelector('#input').style.display = 'block'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputQueue' does not exist on type '{ n... Remove this comment to see the full error message
  const data = io.outputQueue.shift()
  if (data.action === 'wait') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
    io.disable()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputSuspended' does not exist on type ... Remove this comment to see the full error message
    io.outputSuspended = true
    //if (Quest.Settings.settings.textInput) document.querySelector('#input').style.display = 'none'
    data.tag = 'p'
    data.onclick = "io.unpause()"
    if (!data.text) data.text = Quest.lang.click_to_continue
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'print' does not exist on type '{ nextid:... Remove this comment to see the full error message
    io.print(data)
  }
  if (data.action === 'delay') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
    io.disable()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputSuspended' does not exist on type ... Remove this comment to see the full error message
    io.outputSuspended = true
    if (data.text) {
      data.tag = 'p'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'print' does not exist on type '{ nextid:... Remove this comment to see the full error message
      io.print(data)
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'unpause' does not exist on type '{ nexti... Remove this comment to see the full error message
    setTimeout(io.unpause, data.delay * 1000)
  }
  if (data.action === 'output') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'print' does not exist on type '{ nextid:... Remove this comment to see the full error message
    const html = io.print(data)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'speak' does not exist on type '{ nextid:... Remove this comment to see the full error message
    io.speak(data.text);
    saveLoad.transcriptAppend(data);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputFromQueue' does not exist on type ... Remove this comment to see the full error message
    io.outputFromQueue()
  }
  if (data.action === 'func') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputFromQueue' does not exist on type ... Remove this comment to see the full error message
    if (data.func()) io.outputFromQueue()
  }
  if (data.action === 'effect') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
    io.disable()
    // need a way to handle spoken and transcript here
    data.effect(data)
  }
  if (data.action === 'clear') {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#output').textContent = "";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputFromQueue' does not exist on type ... Remove this comment to see the full error message
    io.outputFromQueue()
  }
  if (data.action === 'sound') {
    if (!Quest.Settings.settings.silent) {
      const el = document.getElementById(data.name)
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.currentTime = 0
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.play()
    }
  }
  if (data.action === 'ambient') {
    for (let el of document.getElementsByTagName('audio')) el.pause()
    if (!Quest.Settings.settings.silent && data.name) {
      const el = document.getElementById(data.name)
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.currentTime = 0
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.loop = true
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.play()
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      if (data.volume) el.volume = data.volume / 10
    }
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
  io.scrollToEnd()
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (Quest.Settings.settings.textInput) document.querySelector('#textbox').focus()
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'allowedHtmlAttrs' does not exist on type... Remove this comment to see the full error message
io.allowedHtmlAttrs = ['width', 'height', 'onclick', 'src', 'autoplay']

// @ts-expect-error ts-migrate(2339) FIXME: Property 'print' does not exist on type '{ nextid:... Remove this comment to see the full error message
io.print = function (data: any) {
  let html
  let keepSL
  let slID
  if (typeof data === 'string') {
    html = data
  }

  if (data.html) {
    html = data.html
  }
  else if (io.sameLine == false) {
    html = '<' + data.tag + ' id="n' + data.id + '"'
    if (data.cssClass) html += ' class="' + data.cssClass + '"'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'allowedHtmlAttrs' does not exist on type... Remove this comment to see the full error message
    for (let s of io.allowedHtmlAttrs) if (data[s]) html += ' ' + s + '="' + data[s] + '"'
    html += '>' + data.text + "</" + data.tag + '>'
  }
  else {
    html = data.text
  }
  if (data.destination) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector("#" + data.destination).innerHTML = html
  }
  else {

    let keepSL = (html.indexOf("@@OUTPUTTEXTNOBR@@") > -1)
    let slID = "n" + (data.id - 1)
    if (keepSL == true) {
      html = html.replace("@@OUTPUTTEXTNOBR@@", "");
    }
    if (io.sameLine == true) {
      let last = document.getElementById(slID)
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      last.innerHTML = last.innerHTML + html
      io.sameLine = false
    }
    else {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector("#output").innerHTML += html
    }
    io.sameLine = keepSL;

  }
  return html
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'typewriterEffect' does not exist on type... Remove this comment to see the full error message
io.typewriterEffect = function (data: any) {
  if (!data.position) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector("#output").innerHTML += '<' + data.tag + ' id="n' + data.id + '" class=\"typewriter\"></' + data.tag + '>'
    data.position = 0
    data.text = processText(data.text, data.params)
  }
  const el = document.querySelector('#n' + data.id)
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  el.innerHTML = data.text.slice(0, data.position) + "<span class=\"typewriter-active\">" + data.text.slice(data.position, data.position + 1) + "</span>"
  data.position++
  if (data.position <= data.text.length) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputQueue' does not exist on type '{ n... Remove this comment to see the full error message
    io.outputQueue.unshift(data)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputSuspended' does not exist on type ... Remove this comment to see the full error message
    io.outputSuspended = true
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'forceOutputFromQueue' does not exist on ... Remove this comment to see the full error message
  setTimeout(io.forceOutputFromQueue, Quest.Settings.settings.textEffectDelay)
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'unscrambleEffect' does not exist on type... Remove this comment to see the full error message
io.unscrambleEffect = function (data: any) {
  // Set up the system
  if (!data.count) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector("#output").innerHTML += '<' + data.tag + ' id="n' + data.id + '" class="typewriter"></' + data.tag + '>'
    data.count = 0
    data.text = processText(data.text, data.params)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'unscamblePick' does not exist on type '{... Remove this comment to see the full error message
    if (!data.pick) data.pick = io.unscamblePick
    data.mask = ''
    data.scrambled = ''
    for (let i = 0; i < data.text.length; i++) {
      if (data.text.charAt(i) === ' ' && !data.incSpaces) {
        data.scrambled += ' '
        data.mask += ' '
      }
      else {
        data.scrambled += data.pick(i)
        data.mask += 'x'
        data.count++
      }
    }
  }

  if (data.randomPlacing) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
    let pos = Quest.Random.rndm.int(0, data.count - 1)
    let newMask = ''
    for (let i = 0; i < data.mask.length; i++) {
      if (data.mask.charAt(i) === ' ') {
        newMask += ' '
      }
      else if (pos === 0) {
        newMask += ' '
        pos--
      }
      else {
        newMask += 'x'
        pos--
      }
    }
    data.mask = newMask
  }
  else {
    data.mask = data.mask.replace('x', ' ')
  }
  data.count--
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector("#n" + data.id).innerHTML = io.unscambleScramble(data)
  if (data.count > 0) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputQueue' does not exist on type '{ n... Remove this comment to see the full error message
    io.outputQueue.unshift(data)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'outputSuspended' does not exist on type ... Remove this comment to see the full error message
    io.outputSuspended = true
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'forceOutputFromQueue' does not exist on ... Remove this comment to see the full error message
  setTimeout(io.forceOutputFromQueue, Quest.Settings.settings.textEffectDelay)
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'unscamblePick' does not exist on type '{... Remove this comment to see the full error message
io.unscamblePick = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
  let c = String.fromCharCode(Quest.Random.rndm.int(33, 125))
  return c === '<' ? '~' : c
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'unscambleScramble' does not exist on typ... Remove this comment to see the full error message
io.unscambleScramble = function (data: any) {
  let s = ''
  for (let i = 0; i < data.text.length; i++) {
    s += (data.mask.charAt(i) === ' ' ? data.text.charAt(i) : data.pick(i))
  }
  return s
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'cmdlink' does not exist on type '{ nexti... Remove this comment to see the full error message
io.cmdlink = function (command: any, str: any) {
  return `<a class="cmd-link" onclick="Quest.Utilities.runCmd('${command}')">${str}</a>`;
}








// @ts-expect-error ts-migrate(2339) FIXME: Property 'setTitleAndInit' does not exist on type ... Remove this comment to see the full error message
io.setTitleAndInit = function (s: any) {
  document.title = s
  for (let o of io.modulesToInit) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'init' does not exist on type 'never'.
    o.init()
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'calcMargins' does not exist on type '{ n... Remove this comment to see the full error message
  io.calcMargins()
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'calcMargins' does not exist on type '{ n... Remove this comment to see the full error message
io.calcMargins = function () {
  //How much space do we need for images and map?
  let mapImageWidth = 0
  if (typeof map !== 'undefined') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideMap' does not exist on type '{ perfo... Remove this comment to see the full error message
    if (!Quest.Settings.settings.hideMap) mapImageWidth = Quest.Settings.settings.mapWidth
  }
  if (typeof imagePane !== 'undefined') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideImagePane' does not exist on type '{... Remove this comment to see the full error message
    if (!Quest.Settings.settings.hideImagePane && Quest.Settings.settings.imageWidth > mapImageWidth) mapImageWidth = Quest.Settings.settings.imageWidth
  }
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#main').style.marginLeft = '40px'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#main').style.marginRight = '40px'

  // Do we show the side panes?
  if (Quest.Settings.settings.panes !== 'none') {
    const margin = Quest.Settings.settings.panes === 'left' ? 'margin-left' : 'margin-right'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'resizePanesListener' does not exist on t... Remove this comment to see the full error message
    if (io.resizePanesListener.matches) { // If media query matches
      // hide sidepane
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#main').style[margin] = (io.mainGutter) + 'px'
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#panes').style.display = 'none'
    } else {
      // show sidepane
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#main').style[margin] = (io.panesWidth + io.mainGutter) + 'px'
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#panes').style.display = 'block'
    }
  }

  // Note: As of Jan/22 this takes account of Quest.Settings.settings.hideMap - but not of whether
  // the image should be hidden
  let margin = Quest.Settings.settings.panes === 'right' ? 'margin-left' : 'margin-right'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mapImageSide' does not exist on type '{ ... Remove this comment to see the full error message
  if (Quest.Settings.settings.mapImageSide) margin = Quest.Settings.settings.mapImageSide === 'left' ? 'margin-left' : 'margin-right'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'resizeMapImageListener' does not exist o... Remove this comment to see the full error message
  if (io.resizeMapImageListener.matches || Quest.Settings.settings.hideMap) { // If media query matches
    // hide image
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#main').style[margin] = io.mainGutter + 'px'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#quest-image').style.display = 'none'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#quest-map').style.display = 'none'
  } else {
    // show image
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#main').style[margin] = (mapImageWidth + io.mainGutter) + 'px'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#quest-image').style.display = 'block'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#quest-map').style.display = 'block'
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'mainGutter' does not exist on type '{ ne... Remove this comment to see the full error message
io.mainGutter = 20
// @ts-expect-error ts-migrate(2339) FIXME: Property 'panesWidth' does not exist on type '{ ne... Remove this comment to see the full error message
io.panesWidth = 160
// @ts-expect-error ts-migrate(2339) FIXME: Property 'resizePanesListener' does not exist on t... Remove this comment to see the full error message
io.resizePanesListener = window.matchMedia('(max-width: ' + Quest.Settings.settings.panesCollapseAt + 'px)')
// @ts-expect-error ts-migrate(2339) FIXME: Property 'resizeMapImageListener' does not exist o... Remove this comment to see the full error message
io.resizeMapImageListener = window.matchMedia('(max-width: ' + Quest.Settings.settings.mapAndImageCollapseAt + 'px)')
// @ts-expect-error ts-migrate(2339) FIXME: Property 'resizePanesListener' does not exist on t... Remove this comment to see the full error message
io.resizePanesListener.addListener(io.calcMargins) // Attach listener function on state changes
// @ts-expect-error ts-migrate(2339) FIXME: Property 'resizeMapImageListener' does not exist o... Remove this comment to see the full error message
io.resizeMapImageListener.addListener(io.calcMargins) // Attach listener function on state changes




// 0: not disabled at all
// 1: disable until output is done
// 2: awaiting special input, eg from menu, including text
// 3: awaiting special input, eg from menu, excluding text
// @ts-expect-error ts-migrate(2339) FIXME: Property 'disableLevel' does not exist on type '{ ... Remove this comment to see the full error message
io.disableLevel = 0

// @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
io.disable = function (level: any) {
  //log('disable ' + level + ' (' + io.disableLevel + ')')
  if (!level) level = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableLevel' does not exist on type '{ ... Remove this comment to see the full error message
  if (level <= io.disableLevel) return
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableLevel' does not exist on type '{ ... Remove this comment to see the full error message
  io.disableLevel = level
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (level !== 2) document.querySelector('#input').style.display = 'none'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
  io.setCssByClass('compass-button .dark-body', 'color', '#808080')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
  io.setCssByClass('item', 'color', '#808080')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
  io.setCssByClass('item-action', 'color', '#808080')
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
io.enable = function (level: any) {
  //log('enable ' + level + ' (' + io.disableLevel + ')')
  if (!level) level = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableLevel' does not exist on type '{ ... Remove this comment to see the full error message
  if (!io.disableLevel || level > io.disableLevel) return
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableLevel' does not exist on type '{ ... Remove this comment to see the full error message
  io.disableLevel = 0
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#input').style.display = 'block'
  if (Quest.Settings.settings.panes !== 'none') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
    io.setCssByClass('compass-button .dark-body', 'color', io.textColour)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
    io.setCssByClass('item', 'color', io.textColour)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
    io.setCssByClass('item-action', 'color', io.textColour)
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'startCommand' does not exist on type '{ ... Remove this comment to see the full error message
io.startCommand = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'addClassForClass' does not exist on type... Remove this comment to see the full error message
  io.addClassForClass("default-p", 'old-text')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'addClassForClass' does not exist on type... Remove this comment to see the full error message
  io.addClassForClass("default-h", 'old-text')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'addClassForClass' does not exist on type... Remove this comment to see the full error message
  io.addClassForClass("meta", 'old-text')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'addClassForClass' does not exist on type... Remove this comment to see the full error message
  io.addClassForClass("parser", 'old-text')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'addClassForClass' does not exist on type... Remove this comment to see the full error message
  io.addClassForClass("error", 'old-text')
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'addClassForClass' does not exist on type... Remove this comment to see the full error message
io.addClassForClass = function (oldClass: any, newClass: any) {
  const collection = document.getElementsByClassName(oldClass)
  for (const el of collection) el.classList.add(newClass)
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'updateUIItems' does not exist on type '{... Remove this comment to see the full error message
io.updateUIItems = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
  if (Quest.Settings.settings.panes === 'none' || !Quest.Settings.settings.inventoryPane) { return; }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
  for (let inv of Quest.Settings.settings.inventoryPane) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#' + inv.alt).textContent = ""
    inv.hasContent = false
  }

  io.currentItemList = [];
  for (let key in w) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const item = w[key];
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
    for (let inv of Quest.Settings.settings.inventoryPane) {
      const loc = inv.getLoc ? inv.getLoc() : null
      if (inv.test(item) && !item.inventorySkip) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'appendItem' does not exist on type '{ ne... Remove this comment to see the full error message
        io.appendItem(item, inv.alt, loc, false, inv.highlight ? inv.highlight(item) : 0);
        inv.hasContent = true
      }
    }
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'additionalInv' does not exist on type '{... Remove this comment to see the full error message
  if (Quest.Settings.settings.additionalInv) Quest.Settings.settings.additionalInv()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
  for (let inv of Quest.Settings.settings.inventoryPane) {
    if (!inv.hasContent && inv.noContent) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      const s = processText(inv.noContent)
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#' + inv.alt).innerHTML = '<div class="item-nothing">' + s + '</div>'
    }
  }
  for (const key in Quest.Settings.settings.customPaneFunctions) {
    const el = document.querySelector('#' + key)
    if (!el) return
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    let html = Quest.Settings.settings.customPaneFunctions[key]()
    el.innerHTML = html
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'clickItem' does not exist on type '{ nex... Remove this comment to see the full error message
  io.clickItem('');
};


// @ts-expect-error ts-migrate(2339) FIXME: Property 'updateStatus' does not exist on type '{ ... Remove this comment to see the full error message
io.updateStatus = function () {
  if (Quest.Settings.settings.statusPane) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector("#status-pane").textContent = "";
    for (let st of Quest.Settings.settings.status) {
      if (typeof st === "string") {
        if (player[st] !== undefined) {
          let s = '<tr><td width="' + Quest.Settings.settings.statusWidthLeft + '">' + Quest.Utilities.sentenceCase(st) + "</td>";
          s += '<td width="' + Quest.Settings.settings.statusWidthRight + '">' + player[st] + "</td></tr>";
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector("#status-pane").innerHTML += s
        }
      }
      else if (typeof st === "function") {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector("#status-pane").innerHTML += "<tr>" + st() + "</tr>"
      }
    }
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'toolbar' does not exist on type '{ perfo... Remove this comment to see the full error message
  if (Quest.Settings.settings.toolbar) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'createToolbar' does not exist on type '{... Remove this comment to see the full error message
    io.createToolbar()
  }

}





// @ts-expect-error ts-migrate(2339) FIXME: Property 'menuResponse' does not exist on type '{ ... Remove this comment to see the full error message
io.menuResponse = function (n: any) {
  let input = n
  if (typeof n === 'string' && n.match(/^\d+$/)) n = parseInt(n) - 1
  if (typeof n === 'string') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
    n = io.menuOptions.findIndex((el: any) => typeof el === 'string' ? el.includes(n) : el.alias.includes(n))
  }

  // stop disabling input
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
  io.disableTextFunction(false)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
  delete io.disableTextFunction

  // stop overriding the parser
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
  parser.overrideWith()

  // remove choices from screen
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuStartId' does not exist on type '{ n... Remove this comment to see the full error message
  for (let i = io.menuStartId; i < io.nextid; i++) document.querySelector('#n' + i).remove()

  // handle bad number
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
  if (n === undefined || n >= io.menuOptions[n] || n === -1) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFailFn' does not exist on type '{ ne... Remove this comment to see the full error message
    io.menuFailFn(input)
  }

  // handle good number
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
    saveLoad.transcriptAppend({ cssClass: 'menu', text: (io.menuOptions[n].alias ? io.menuOptions[n].alias : io.menuOptions[n]), n: n });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
    io.menuFn(io.menuOptions[n]);
  }
  endTurnUI(true);
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (Quest.Settings.settings.textInput) document.querySelector('#textbox').focus()
};



// @ts-expect-error ts-migrate(2339) FIXME: Property 'textResponse' does not exist on type '{ ... Remove this comment to see the full error message
io.textResponse = function (s: any) {
  if (s === undefined) {
    const el = document.querySelector('#text-dialog')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Element'.
    if (el) s = el.value
  }
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#sidepane-menu').remove()

  // stop disabling input
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
  io.enable()

  saveLoad.transcriptAppend({ cssClass: 'menu', text: s })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
  if (io.menuFn) io.menuFn(s);
  endTurnUI(true);
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (Quest.Settings.settings.textInput) document.querySelector('#textbox').focus()
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'clickExit' does not exist on type '{ nex... Remove this comment to see the full error message
io.clickExit = function (dir: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableLevel' does not exist on type '{ ... Remove this comment to see the full error message
  if (io.disableLevel) return
  let failed = false
  Quest.Utilities.runCmd(dir)
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'clickItem' does not exist on type '{ nex... Remove this comment to see the full error message
io.clickItem = function (itemName: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableLevel' does not exist on type '{ ... Remove this comment to see the full error message
  if (io.disableLevel) return;
  // duplicated items would toggle twice
  const uniq = [...new Set(io.currentItemList)];
  for (let item of uniq) {
    for (const el of document.querySelectorAll('.' + item + '-actions')) {
      if (item === itemName) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.display = el.style.display === 'none' ? 'block' : 'none'
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.display = 'none'
      }
    }
  }
};


// @ts-expect-error ts-migrate(2339) FIXME: Property 'clickItemAction' does not exist on type ... Remove this comment to see the full error message
io.clickItemAction = function (itemName: any, action: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disableLevel' does not exist on type '{ ... Remove this comment to see the full error message
  if (io.disableLevel) return
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const item = w[itemName];
  const cmd = action.includes('%') ? action.replace('%', item.alias) : action + ' ' + item.alias
  Quest.Utilities.runCmd(cmd)
}


// Add the item to the DIV named htmlDiv
// The item will be given verbs from its attName attribute
// @ts-expect-error ts-migrate(2339) FIXME: Property 'appendItem' does not exist on type '{ ne... Remove this comment to see the full error message
io.appendItem = function (item: any, htmlDiv: any, loc: any, isSubItem: any, highlight: any) {
  const el = document.querySelector('#' + htmlDiv)
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
  io.currentItemList.push(item.name)

  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  el.innerHTML += io.getItemHtml(item, loc, isSubItem, highlight)

  if (item.container && !item.closed) {
    if (typeof item.getContents !== 'function') {
      console.log("item flagged as container but no getContents function:");
      console.log(item);
    }
    const l = item.getContents(world.SIDE_PANE);
    for (let el of l) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'appendItem' does not exist on type '{ ne... Remove this comment to see the full error message
      io.appendItem(el, htmlDiv, item.name, true);
    }
  }
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'getItemHtml' does not exist on type '{ n... Remove this comment to see the full error message
io.getItemHtml = function (item: any, loc: any, isSubItem: any, highlight: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (typeof item.getVerbs !== 'function') return errormsg("Item with bad getVerbs: " + item.name)
  const verbList = item.getVerbs(loc)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (verbList === undefined) { errormsg("No verbs for " + item.name); console.log(item); }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getIcon' does not exist on type '{ nexti... Remove this comment to see the full error message
  let s = '<div id="' + item.name + '-item"><p class="item' + (isSubItem ? ' sub-item' : '') + (highlight ? ' highlight-item' + highlight : '') + '" onclick="io.clickItem(\'' + item.name + '\')">' + io.getIcon(item) + item.getListAlias(loc) + "</p></div>"
  for (let verb of verbList) {
    if (typeof verb === 'string') verb = { name: verb, action: verb }
    s += '<div class="' + item.name + '-actions item-action'
    if (verb.style) s += ' ' + verb.style
    s += '" onclick="io.clickItemAction(\'' + item.name + '\', \'' + verb.action + '\')">';
    s += verb.name;
    s += '</div>';
  }
  return s
}

// Creates the panes on the left or right
// Should only be called once, when the page is first built
// @ts-expect-error ts-migrate(2339) FIXME: Property 'createPanes' does not exist on type '{ n... Remove this comment to see the full error message
io.createPanes = function () {
  if (!['right', 'left', 'none'].includes(Quest.Settings.settings.panes)) {
    console.error('ERROR: Your Quest.Settings.settings.panes value is "' + Quest.Settings.settings.panes + '". It must be one of "right", "left" or "none" (all lower-case). It is probably set in the file setiings.js.')
    return
  }

  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#input').innerHTML = '<span id="cursor">' + Quest.Settings.settings.cursor + '</span><input type="text" name="textbox" id="textbox" />'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (!Quest.Settings.settings.textInput) document.querySelector('#input').style.display = 'none'

  if (Quest.Settings.settings.panes === 'none') return

  let html = ''

  if (Quest.Settings.settings.compassPane) {
    html += '<div class="pane-div">'
    html += '<table id="compass-table">'
    for (let i = 0; i < 3; i++) {
      html += '<tr>'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'writeExit' does not exist on type '{ nex... Remove this comment to see the full error message
      html += io.writeExit(0 + 5 * i)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'writeExit' does not exist on type '{ nex... Remove this comment to see the full error message
      html += io.writeExit(1 + 5 * i)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'writeExit' does not exist on type '{ nex... Remove this comment to see the full error message
      html += io.writeExit(2 + 5 * i)
      html += '<td></td>'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'writeExit' does not exist on type '{ nex... Remove this comment to see the full error message
      html += io.writeExit(3 + 5 * i);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'writeExit' does not exist on type '{ nex... Remove this comment to see the full error message
      html += io.writeExit(4 + 5 * i);
      html += '</tr>'
    }
    html += '</table>'
    html += '</div>'
  }

  if (Quest.Settings.settings.statusPane) {
    html += '<div class="pane-div">'
    html += '<h4 class="side-pane-heading">' + Quest.Settings.settings.statusPane + '</h4>'
    html += '<table id="status-pane">'
    html += '</table>'
    html += '</div>'
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
  if (Quest.Settings.settings.inventoryPane) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
    for (let inv of Quest.Settings.settings.inventoryPane) {
      html += '<div class="pane-div">'
      html += '<h4 class="side-pane-heading">' + inv.name + '</h4>'
      html += '<div class="item-list" id="' + inv.alt + '">'
      html += '</div>'
      html += '</div>'
    }
  }

  html += '<div class="pane-div-finished">'
  html += Quest.lang.game_over_html
  html += '</div>'
  html += '</div>'

  const el = document.createElement("div")
  el.innerHTML = html
  el.setAttribute("id", "panes")
  el.classList.add('side-panes')
  el.classList.add('side-panes-' + Quest.Settings.settings.panes)
  el.classList.add('panes-narrow')

  const referenceNode = document.querySelector('#main')
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling)



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'panesWidth' does not exist on type '{ ne... Remove this comment to see the full error message
  io.panesWidth = document.querySelector('.side-panes').clientWidth

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'customUI' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.Settings.settings.customUI) Quest.Settings.settings.customUI();
};


// @ts-expect-error ts-migrate(2339) FIXME: Property 'writeExit' does not exist on type '{ nex... Remove this comment to see the full error message
io.writeExit = function (n: any) {
  let html = '<td class="compass-button" title="' + Quest.lang.exit_list[n].name + '">'
  html += '<span class="compass-button" id="exit-' + Quest.lang.exit_list[n].name
  html += '" onclick="io.clickExit(\'' + Quest.lang.exit_list[n].name + '\')">'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'displayIconsCompass' does not exist on t... Remove this comment to see the full error message
  html += Quest.Settings.settings.symbolsForCompass ? io.displayIconsCompass(Quest.lang.exit_list[n]) : Quest.lang.exit_list[n].abbrev
  html += '</span></td>'
  return html
};



// Gets the command with the given name
// @ts-expect-error ts-migrate(2339) FIXME: Property 'getCommand' does not exist on type '{ ne... Remove this comment to see the full error message
io.getCommand = function (name: any) {
  const found = Quest.Commands.commands.find(function (el) {
    return el.name === name;
  });
  return found;
};


// @ts-expect-error ts-migrate(2339) FIXME: Property 'msgInputText' does not exist on type '{ ... Remove this comment to see the full error message
io.msgInputText = function (s: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
  if (saveLoad.transcript) saveLoad.transcriptWalkthrough.push('    "' + s + '",')
  if (!Quest.Settings.settings.cmdEcho || s === '') return
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector("#output").innerHTML += '<p id="n' + io.nextid + '" class="input-text">&gt; ' + s + "</p>"
  io.nextid++
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'speak' does not exist on type '{ nextid:... Remove this comment to see the full error message
  io.speak(s, true)
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommands' does not exist on type '{... Remove this comment to see the full error message
io.savedCommands = ['help'];
// @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommandsPos' does not exist on type... Remove this comment to see the full error message
io.savedCommandsPos = 0;


// Called from scriptOnLoad in _settings.js, if there are no more scripts to load
// @ts-expect-error ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ nextid: ... Remove this comment to see the full error message
io.init = function () {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('Start io.onload')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'createPanes' does not exist on type '{ n... Remove this comment to see the full error message
  io.createPanes()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.Settings.settings.playMode === 'play') window.oncontextmenu = function () { return false }
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector("#fileDialog").onchange = saveLoad.loadGameAsFile

  document.addEventListener('keydown', function (event) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'keydownFunction' does not exist on type ... Remove this comment to see the full error message
    if (io.keydownFunction) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'keydownFunction' does not exist on type ... Remove this comment to see the full error message
      io.keydownFunction(event)
      // cancel?
      return
    }
    const keycode = (event.keyCode ? event.keyCode : event.which)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'customKeyResponses' does not exist on ty... Remove this comment to see the full error message
    if (Quest.Settings.settings.customKeyResponses) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'customKeyResponses' does not exist on ty... Remove this comment to see the full error message
      if (Quest.Settings.settings.customKeyResponses(keycode, event)) return false
    }
    for (let exit of Quest.lang.exit_list) {
      if (exit.key && exit.key === keycode) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgInputText' does not exist on type '{ ... Remove this comment to see the full error message
        io.msgInputText(exit.name);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
        parser.parse(exit.name);
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#textbox').value = ''
        event.stopPropagation();
        event.preventDefault();
        return false;
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (keycode == 123 && Quest.Settings.settings.playMode === 'play') return false
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (event.ctrlKey && event.shiftKey && keycode == 73 && Quest.Settings.settings.playMode === 'play') return false
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (event.ctrlKey && event.shiftKey && keycode == 74 && Quest.Settings.settings.playMode === 'play') return false

    if (keycode === 13) {
      // enter
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
      if (event.ctrlKey && (Quest.Settings.settings.playMode === 'dev' || Quest.Settings.settings.playMode === 'beta')) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
        parser.parse("script show")
      }
      else {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        const s = document.querySelector('#textbox').value;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgInputText' does not exist on type '{ ... Remove this comment to see the full error message
        io.msgInputText(s);
        if (s) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommands' does not exist on type '{... Remove this comment to see the full error message
          if (io.savedCommands[io.savedCommands.length - 1] !== s && !io.doNotSaveInput) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommands' does not exist on type '{... Remove this comment to see the full error message
            io.savedCommands.push(s)
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommandsPos' does not exist on type... Remove this comment to see the full error message
          io.savedCommandsPos = io.savedCommands.length;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
          parser.parse(s);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotEraseLastCommand' does not exist on... Remove this comment to see the full error message
          if (io.doNotEraseLastCommand) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotEraseLastCommand' does not exist on... Remove this comment to see the full error message
            io.doNotEraseLastCommand = false
          }
          else {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#textbox').value = ''
          }
        }
      }
    }
    if (keycode === 38) {
      // up arrow
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommandsPos' does not exist on type... Remove this comment to see the full error message
      io.savedCommandsPos -= 1;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommandsPos' does not exist on type... Remove this comment to see the full error message
      if (io.savedCommandsPos < 0) { io.savedCommandsPos = 0; }
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#textbox').value = io.savedCommands[io.savedCommandsPos]
      // Get cursor to end of text
      const el = document.querySelector('#textbox')
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      if (el.setSelectionRange) {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        setTimeout(function () { el.setSelectionRange(9999, 9999); }, 0);
      }
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      else if (typeof el.selectionStart == "number") {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        el.selectionStart = el.selectionEnd = el.value.length;
      }
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      else if (typeof el.createTextRange != "undefined") {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        el.focus();
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
      }
    }
    if (keycode === 40) {
      // down arrow
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommandsPos' does not exist on type... Remove this comment to see the full error message
      io.savedCommandsPos += 1;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommandsPos' does not exist on type... Remove this comment to see the full error message
      if (io.savedCommandsPos >= io.savedCommands.length) { io.savedCommandsPos = io.savedCommands.length - 1; }
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#textbox').value = io.savedCommands[io.savedCommandsPos]
    }
    if (keycode === 27) {
      // ESC
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#textbox').value = ''
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (keycode === 96 && (Quest.Settings.settings.playMode === 'dev' || Quest.Settings.settings.playMode === 'beta')) {
      if (event.ctrlKey && event.altKey) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
        parser.parse("wt b")
      }
      else if (event.altKey) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
        parser.parse("wt a")
      }
      else if (event.ctrlKey) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
        parser.parse("wt c")
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
        parser.parse("test")
      }
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      setTimeout(function () { document.querySelector('#textbox').value = '' }, 1);
    }
    if (keycode === 90 && event.ctrlKey) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
      parser.parse("undo")
    }
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'textColour' does not exist on type '{ ne... Remove this comment to see the full error message
  if (Quest.Settings.settings.panes !== 'none') io.textColour = document.querySelector(".side-panes").style.color
  /*if (Quest.Settings.settings.soundFiles) {
    const main = document.querySelector('#main')
    for (let el of Quest.Settings.settings.soundFiles) {
      main.innerHTML += '<audio id="' + el + '" src="' + Quest.Settings.settings.soundsFolder + el + Quest.Settings.settings.soundsFileExt + '"/>'
    }
  }*/
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('UI built')
  endTurnUI(true)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('endTurnUI completed')

  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (document.querySelector('#loading')) document.querySelector('#loading').remove()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'suppressTitle' does not exist on type '{... Remove this comment to see the full error message
  if (!Quest.Settings.settings.suppressTitle) msgHeading(Quest.Settings.settings.title, 2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'subtitle' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.Settings.settings.subtitle) msgHeading(Quest.Settings.settings.subtitle, 3)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'setTitleAndInit' does not exist on type ... Remove this comment to see the full error message
  io.setTitleAndInit(Quest.Settings.settings.title)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.Settings.settings.playMode === 'beta') Quest.lang.betaTestIntro()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('Title/intro printed')

  if (Quest.Settings.settings.startingDialogEnabled) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setUpDialog' does not exist on type '{ p... Remove this comment to see the full error message
    Quest.Settings.settings.setUpDialog()
    setTimeout(function () {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogInit' does not exist on ty... Remove this comment to see the full error message
      if (Quest.Settings.settings.startingDialogInit) Quest.Settings.settings.startingDialogInit()
    }, 10)
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogAlt' does not exist on typ... Remove this comment to see the full error message
    if (Quest.Settings.settings.startingDialogAlt) Quest.Settings.settings.startingDialogAlt()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'delayStart' does not exist on type '{ pe... Remove this comment to see the full error message
    Quest.Settings.settings.delayStart = false
    world.begin()
  }
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
  Quest.Settings.settings.performanceLog('End io.onload')
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'synth' does not exist on type '{ nextid:... Remove this comment to see the full error message
io.synth = window.speechSynthesis;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'voice' does not exist on type '{ nextid:... Remove this comment to see the full error message
io.voice = null;
// @ts-expect-error ts-migrate(2339) FIXME: Property 'voice2' does not exist on type '{ nextid... Remove this comment to see the full error message
io.voice2 = null;

// @ts-expect-error ts-migrate(2339) FIXME: Property 'speak' does not exist on type '{ nextid:... Remove this comment to see the full error message
io.speak = function (str: any, altVoice: any) {
  if (!io.spoken) return
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'voice' does not exist on type '{ nextid:... Remove this comment to see the full error message
  if (!io.voice) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'voice' does not exist on type '{ nextid:... Remove this comment to see the full error message
    io.voice = io.synth.getVoices().find(function (el: any) {
      return /UK/.test(el.name) && /Female/.test(el.name);
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'voice' does not exist on type '{ nextid:... Remove this comment to see the full error message
    if (!io.voice) io.voice = io.synth.getVoices()[0];
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'voice2' does not exist on type '{ nextid... Remove this comment to see the full error message
  if (!io.voice2) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'voice2' does not exist on type '{ nextid... Remove this comment to see the full error message
    io.voice2 = io.synth.getVoices().find(function (el: any) {
      return /UK/.test(el.name) && /Male/.test(el.name);
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'voice2' does not exist on type '{ nextid... Remove this comment to see the full error message
    if (!io.voice2) io.voice2 = io.synth.getVoices()[0];
  }

  const utterThis = new SpeechSynthesisUtterance(str);
  utterThis.onend = function (event) {
    //console.log('SpeechSynthesisUtterance.onend');
  }
  utterThis.onerror = function (event) {
    //console.error('SpeechSynthesisUtterance.onerror: ' + event.name);
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'voice2' does not exist on type '{ nextid... Remove this comment to see the full error message
  utterThis.voice = altVoice ? io.voice2 : io.voice;
  // I think these can vary from 0 to 2
  utterThis.pitch = 1;
  utterThis.rate = 1;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'synth' does not exist on type '{ nextid:... Remove this comment to see the full error message
  io.synth.speak(utterThis);
};


// @ts-expect-error ts-migrate(2339) FIXME: Property 'dialogShowing' does not exist on type '{... Remove this comment to see the full error message
io.dialogShowing = false;
//@DOC
// Appends an HTML DIV, with the given title and content,
// and shows it as a dialog. Used by the transcript
// (and really only useful for displaying data).
// @ts-expect-error ts-migrate(2339) FIXME: Property 'showHtml' does not exist on type '{ next... Remove this comment to see the full error message
io.showHtml = function (title: any, html: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'dialogShowing' does not exist on type '{... Remove this comment to see the full error message
  if (io.dialogShowing) return false;
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('body').innerHTML += '<div id="showHtml" title="' + title + '">' + html + '</div>'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'dialogShowing' does not exist on type '{... Remove this comment to see the full error message
  io.dialogShowing = true;
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector("#showHtml").dialog({
    width: 860,
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    close: function () { document.querySelector("#showHtml").remove(); io.dialogShowing = false; },
  });
  return true;
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'finish' does not exist on type '{ nextid... Remove this comment to see the full error message
io.finish = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'finished' does not exist on type '{ next... Remove this comment to see the full error message
  io.finished = true
  Quest.Settings.settings.textInput = false
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('#input').style.display = 'none'
  if (Quest.Settings.settings.panes !== 'none') {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
    for (const el of document.querySelectorAll('.pane-div')) el.style.display = 'none'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('.pane-div-finished').style.display = 'block'
  }
  // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
  for (const el of Quest.Settings.settings.afterFinish) el()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'finishMetaComment' does not exist on typ... Remove this comment to see the full error message
  if (Quest.Settings.settings.finishMetaComment) metamsg(Quest.Settings.settings.finishMetaComment)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  if (saveLoad.transcriptExists()) metamsg(Quest.lang.transcript_finish)
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleDarkMode' does not exist on type '... Remove this comment to see the full error message
io.toggleDarkMode = function () {
  Quest.Settings.settings.darkModeActive = !Quest.Settings.settings.darkModeActive
  if (Quest.Settings.settings.darkModeActive) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('body').classList.add("dark-body")
  }
  else {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('body').classList.remove("dark-body")
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterDarkToggle' does not exist on type ... Remove this comment to see the full error message
  if (Quest.Settings.settings.afterDarkToggle) Quest.Settings.settings.afterDarkToggle()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'textColour' does not exist on type '{ ne... Remove this comment to see the full error message
  if (Quest.Settings.settings.panes !== 'none') io.textColour = document.querySelector(".side-panes").style.color
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  metamsg(Quest.lang.done_msg)
  return world.SUCCESS_NO_TURNSCRIPTS
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleAutoScrollMode' does not exist on ... Remove this comment to see the full error message
io.toggleAutoScrollMode = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'autoscroll' does not exist on type '{ pe... Remove this comment to see the full error message
  Quest.Settings.settings.autoscroll = !Quest.Settings.settings.autoscroll
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterAutoScrollToggle' does not exist on... Remove this comment to see the full error message
  if (Quest.Settings.settings.afterAutoScrollToggle) Quest.Settings.settings.afterAutoScrollToggle()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  metamsg(Quest.lang.done_msg)
  return world.SUCCESS_NO_TURNSCRIPTS
}




// @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleNarrowMode' does not exist on type... Remove this comment to see the full error message
io.toggleNarrowMode = function () {
  Quest.Settings.settings.narrowMode = (Quest.Settings.settings.narrowMode + 1) % 3
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('body').classList.remove("narrow-body")
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector('body').classList.remove("very-narrow-body")
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (Quest.Settings.settings.narrowMode === 1) document.querySelector('body').classList.add("narrow-body")
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  if (Quest.Settings.settings.narrowMode === 2) document.querySelector('body').classList.add("very-narrow-body")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterNarrowChange' does not exist on typ... Remove this comment to see the full error message
  if (Quest.Settings.settings.afterNarrowChange) Quest.Settings.settings.afterNarrowChange()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  metamsg(Quest.lang.done_msg)
  return world.SUCCESS_NO_TURNSCRIPTS
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlainFontMode' does not exist on t... Remove this comment to see the full error message
io.togglePlainFontMode = function () {
  Quest.Settings.settings.plainFontModeActive = !Quest.Settings.settings.plainFontModeActive
  if (Quest.Settings.settings.plainFontModeActive) {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('body').classList.add("plain-font-body")
  }
  else {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('body').classList.remove("plain-font-body")
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterPlainFontToggle' does not exist on ... Remove this comment to see the full error message
  if (Quest.Settings.settings.afterPlainFontToggle) Quest.Settings.settings.afterPlainFontToggle()
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  metamsg(Quest.lang.done_msg)
  return world.SUCCESS_NO_TURNSCRIPTS
}



// If the element starts off displayed, you will probably needs to explicitly set display to block for it
// otherwise this will assume it is not
// @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleDisplay' does not exist on type '{... Remove this comment to see the full error message
io.toggleDisplay = function (el: any) {
  if (typeof el === 'string') el = document.querySelector(el)
  el.style.display = el.style.display === 'block' ? 'none' : 'block'
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'copyTextToClipboard' does not exist on t... Remove this comment to see the full error message
io.copyTextToClipboard = function (text: any) {
  // from: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  const textArea = document.createElement("textarea")
  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
  textArea.style.top = 0;
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
  textArea.style.left = 0;

  // Styling just in case it gets displayed to make is as unobstrusive as possible
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';

  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg('Copying text command was ' + (successful ? 'successful' : 'unsuccessful'));
  } catch (err) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'getIcon' does not exist on type '{ nexti... Remove this comment to see the full error message
io.getIcon = function (item: any) {
  // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
  if (Quest.Settings.settings.iconsFolder === false) return ''
  if (!item.icon) return ''
  if (item.icon() === '') return ''
  return '<img src="' + Quest.Settings.settings.iconsFolder + (Quest.Settings.settings.darkModeActive ? 'l_' : 'd_') + item.icon() + '.png" />'
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'againOrOops' does not exist on type '{ n... Remove this comment to see the full error message
io.againOrOops = function (isAgain: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommands' does not exist on type '{... Remove this comment to see the full error message
  if (io.savedCommands.length === 0) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(Quest.lang.again_not_available)
    return world.FAILED
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedCommands' does not exist on type '{... Remove this comment to see the full error message
  io.savedCommands.pop() // do not save AGAIN/OOPS
  if (isAgain) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
    parser.parse(io.savedCommands[io.savedCommands.length - 1])
  }
  else {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector('#textbox').value = io.savedCommands[io.savedCommands.length - 1]
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotEraseLastCommand' does not exist on... Remove this comment to see the full error message
    io.doNotEraseLastCommand = true
  }
  return world.SUCCESS_NO_TURNSCRIPTS;
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
io.setCssByClass = function (name: any, prop: any, val: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
  for (const el of document.querySelectorAll('.' + name)) el.style[prop] = val
}



// Display Icons for compas
// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayIconsCompass' does not exist on t... Remove this comment to see the full error message
io.displayIconsCompass = function (exit: any) {
  const datatransform = exit.rotate ? ' style="transform: rotate(40deg)"' : ''
  return '<i class="fas ' + exit.symbol + '"' + datatransform + '></i>';
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
io.scrollToEnd = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'autoscroll' does not exist on type '{ pe... Remove this comment to see the full error message
  if (Quest.Settings.settings.autoscroll) window.scrollTo(0, document.getElementById('main').scrollHeight);
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'getDropDownText' does not exist on type ... Remove this comment to see the full error message
io.getDropDownText = function (name: any) {
  const el = document.querySelector('#' + name)
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  const val = el.options[el.selectedIndex].text
  return val
}


// Create Toolbar
// @ts-expect-error ts-migrate(2339) FIXME: Property 'createToolbar' does not exist on type '{... Remove this comment to see the full error message
io.createToolbar = function () {
  let el = document.querySelector("#toolbar")
  if (!el) {
    const div = document.createElement('div')
    div.setAttribute("id", "toolbar")
    //div.classList.add('button')
    div.classList.add('toolbar')
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector("body").insertBefore(div, document.querySelector("#main"))
    el = document.querySelector("#toolbar")
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector("#main").style.paddingTop = '30px'
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector("#panes").style.top = '36px'
  }

  let html = "";
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getToolbarHTML' does not exist on type '... Remove this comment to see the full error message
  html += '<div class="left">' + io.getToolbarHTML(Quest.Settings.settings.toolbar[0]) + '</div>'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getToolbarHTML' does not exist on type '... Remove this comment to see the full error message
  html += '<div class="middle">' + io.getToolbarHTML(Quest.Settings.settings.toolbar[1]) + '</div>'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getToolbarHTML' does not exist on type '... Remove this comment to see the full error message
  html += '<div class="right">' + io.getToolbarHTML(Quest.Settings.settings.toolbar[2]) + '</div>'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  el.innerHTML = html
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'getToolbarHTML' does not exist on type '... Remove this comment to see the full error message
io.getToolbarHTML = function (data = {}) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'room' does not exist on type '{}'.
  if (data.room) return Quest.Utilities.sentenceCase(Quest.lang.getName(w[player.loc], { article: Quest.Utilities.DEFINITE }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  if (data.title) return '<b><i>' + Quest.Settings.settings.title + '</i></b>'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type '{}'.
  if (data.content) return data.content()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'buttons' does not exist on type '{}'.
  if (data.buttons) {
    let s = ''
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'buttons' does not exist on type '{}'.
    for (let el of data.buttons) {
      const js = el.cmd ? "Quest.Utilities.runCmd('" + el.cmd + "')" : el.onclick
      s += ` <a class="link" onclick="${js}"><i class="fas ${el.icon}" title="${el.title}"></i></a>`;
    }
    return s
  }
  return ''
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'focus' does not exist on type '{ nextid:... Remove this comment to see the full error message
io.focus = function (el: any) {
  if (typeof el === 'string') el = document.querySelector('#' + el)
  if (el !== document.activeElement) el.focus()
}