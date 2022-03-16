import { settings } from './_settings';

export namespace Quest {
  export namespace IO {

    const { log } = console;

    // This is at the top of the file so authors know to ignore stack trace enties for lines 1 to 15 in _io.js
    export const printError = function (msg: any, err: any, suppressTrace: any) {
      console.error(`ERROR: ${msg}`);
      if (Quest.World.world.isCreated) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'print' does not exist on type '{ nextid:... Remove this comment to see the full error message
        io.print({ cssClass: 'error', tag: 'p', text: Quest.lang.error });
        Quest.SaveLoad.saveLoad.transcriptAppend({ cssClass: 'error', stack: err.stack, text: msg });
      }
      if (suppressTrace) return false;
      console.log('Look through the trace below to find the offending code. The first entry in the list may be "errormsg" in the file "_io.js", which is me so can be ignored. The next will the code that detected the error and called the "errormsg" message. You may need to look further down to find the root cause, especially for a text process issue.');
      console.log(err);
      return false;
    };

    if (settings.playMode !== 'dev') {
      window.onbeforeunload = function (event: any) {
        // event.returnValue = "Are you sure?";
      };
    }

    settings.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    settings.autoscroll = !settings.mediaQuery.matches;

    // ============  Output  =======================================

    // @DOC
    // ##Output functions
    //
    // The idea is that you can have them Quest.World.world. differently - or not at all -
    // so error messages can be Quest.World.world.ed in red, meta-data (help., etc)
    // is grey, and debug messages can be turned on and off as required.
    //
    // Note that not all use the text processor (so if there is an issue with
    // the text processor, we can use the others to report it). Also unit tests
    // capture output with msg and errormsg, but not debugmsg or headings.
    //
    // Should all be language neutral
    // @UNDOC

    /*
    tag   required
    action  required
    cssClass
    printBlank
    */

    function _msg(s: any, params: any, options: any) {
      if (options.tag === undefined) options.tag = 'p';
      if (options.cssClass === undefined) options.cssClass = `default-${options.tag.toLowerCase()}`;
      const processed = params ? Quest.Text.processText(s, params).trim() : s.trim();
      if (processed === '' && !options.printBlank) return;

      for (let line of processed.split('|')) {
        for (const el in io.escapeCodes) {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          line = line.replace(RegExp(`@@@${el}@@@`, 'ig'), io.escapeCodes[el]);
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'convertDoubleDash' does not exist on typ... Remove this comment to see the full error message
        if (settings.convertDoubleDash && !Quest.Utilities.test.testing) line = line.replace(/ -- /g, ' &mdash; ');
        const data = {};
        Object.assign(data, options);  // need to do it this way as options may be same object
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'text' does not exist on type '{}'.
        data.text = line;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'action' does not exist on type '{}'.
        if (!data.action) data.action = 'output';

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
        if (Quest.Utilities.test.testing) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'ignoreHTML' does not exist on type '{}'.
          if (test.ignoreHTML) line = line.replace(/(<([^>]+)>)/gi, '');
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'fullOutputData' does not exist on type '... Remove this comment to see the full error message
          if (test.fullOutputData) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
            test.testOutput.push(data);
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
            test.testOutput.push(line);
          }
        } else {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'addToOutputQueue' does not exist on type... Remove this comment to see the full error message
          io.addToOutputQueue(data);
        }
      }
    }

    // @DOC
    // Adds the given string to the print queue.
    // This allows you to add any HTML you want to the output queue.
    function rawPrint(s: any) {
      _msg(s, false, {});
    }

    // @DOC
    // Output a standard message, as an HTML paragraph element (P).
    // The string will first be passed through the text processor.
    // Additional data can be put in the optional params dictionary.
    // You can specify a CSS class to use.
    // During unit testing, messages will be saved and tested
    // If the string starts with a hash and no cssClass is given the line will be printed as a level 4 heading.
    // A vertical bar will be taken as a line break.
    export function msg(s: any, params: any, cssClass: any) {
      if (!params) params = {};
      if (typeof s !== 'string') {
        console.error('Trying to print with "msg", but got this instead of a string:');
        console.error(s);
        const err = new Error();
        log(err.stack);
        throw 'Bad string for msg()';
      }

      if (/^#/.test(s) && !cssClass) {
        s = s.replace(/^#/, '');
        _msg(s, params, { cssClass: 'default-h default-h4', tag: 'h4' });
      } else {
        _msg(s, params, { cssClass, tag: 'p' });
      }
    }

    // @DOC
    // Output a standard message, as an HTML pre-formaed element (PRE).
    // The string will first be passed through the text processor.
    // Additional data can be put in the optional params dictionary.
    // During unit testing, messages will be saved and tested
    export function msgPre(s: any, params: any, cssClass: any) {
      if (!params) params = {};
      if (typeof s !== 'string') {
        console.error('Trying to print with "msgPre", but got this instead of a string:');
        console.error(s);
        console.trace();
        throw 'Bad string for msgPre()';
      }
      _msg(s, params, { cssClass, tag: 'pre' });
    }

    // @DOC
    // Output a standard message, but it makes the NEXT message appear on the same line as the current message. Note that the next message will not have its own params or cssClass.
    function OutputTextNoBr(s: any, params: any, cssClass: any) {
      if (s.startsWith(' ')) {
        s = `&nbsp;${s.substring(1, s.length)}`;
      }
      if (s.endsWith(' ')) {
        s = `${s.substring(0, (s.length - 1))}&nbsp;`;
      }
      msg(`@@OUTPUTTEXTNOBR@@${s}`, params, cssClass);
    }

    function msgBlankLine() {
      _msg('', false, { printBlank: true, tag: 'p' });
    }

    // @DOC
    // As `msg`, but handles an array of strings. Each string is put in its own HTML paragraph,
    // and the set is put in an HTML division (DIV). The cssClass is applied to the division.
    export function msgDiv(arr: any, params: any, cssClass: any) {
      let s = '';
      for (const item of arr) {
        s += `  <p>${item}</p>\n`;
      }
      _msg(s, params || {}, { cssClass, tag: 'div' });
    }

    // @DOC
    // As `msg`, but handles an array of strings in a list. Each string is put in its own HTML list item (LI),
    // and the set is put in an HTML order list (OL) or unordered list (UL), depending on the value of `ordered`.
    function msgList(arr: any, ordered: any, params: any, cssClass: any) {
      let s = '';
      for (const item of arr) {
        s += `  <li>${item}</li>\n`;
      }
      _msg(s, params || {}, { cssClass, tag: ordered ? 'ol' : 'ul' });
    }

    // @DOC
    // As `msg`, but handles an array of arrays of strings in a list. This is laid out in an HTML table.
    // If `headings` is present, this array of strings is used as the column headings.
    export function msgTable(arr: any, headings: any, params: any, cssClass: any) {
      let s = '';
      if (headings) {
        s += '  <tr>\n';
        for (const item of headings) {
          s += `    <th>${item}</th>\n`;
        }
        s += '  </tr>\n';
      }
      for (const row of arr) {
        s += '  <tr>\n';
        for (const item of row) {
          s += `    <td>${Quest.Text.processText(item, params).trim()}</td>\n`;
        }
        s += '  </tr>\n';
      }
      _msg(s, params || {}, { cssClass, tag: 'table' });
    }

    // @DOC
    // As `msg`, but the string is presented as an HTML heading (H1 to H6).
    // The level of the heading is determined by `level`, with 1 being the top, and 6 the bottom.
    // Headings are ignored during unit testing.
    function msgHeading(s: any, level: any, params: any) {
      _msg(s, params || {}, { cssClass: `default-h default-h${level}`, tag: `h${level}` });
    }

    // @DOC
    // Output a picture, as an HTML image element (IMG).
    // If width and height are omitted, the size of the image is used.
    // If height is omitted, the height will be proportional to the given width.
    // The file name should include the path. For a local image, that would probably be the images folder,
    // but it could be the web address of an image hosted elsewhere.
    export function picture(filename: any, width: any, height: any) {
      const src = filename.includes('/') ? filename : settings.imagesFolder + filename;
      _msg('', {}, {
        action: 'output', height, printBlank: true, src, tag: 'img', width,
      });
    }

    function image(filename: any, width: any, height: any) {
      const src = filename.includes('/') ? filename : settings.imagesFolder + filename;
      _msg('', {}, {
        action: 'output', cssClass: 'centred', destination: 'quest-image', height, printBlank: true, src, tag: 'img', width,
      });
    }

    // @DOC
    // Plays a sound. The filename must include the extension, and the file should be in the folder specified by audioFolder (defaults to the game folder).
    export function sound(filename: any) {
      // console.log(settings.ssFolder)
      _msg('Your browser does not support the <code>audio</code> element.', {}, { action: 'sound', name: filename });
    }

    export function ambient(filename: any, volume: any) {
      // console.log(settings.ssFolder)
      _msg('Your browser does not support the <code>audio</code> element.', {}, { action: 'ambient', name: filename, volume });
    }

    // @DOC
    // Plays a video. The filename must include the extension, and the file should be in the folder specified by audioFolder (defaults to the game folder).
    // There are some issues about codecs and formats; use at your discretion.
    function video(filename: any) {
      // console.log(settings.ssFolder)
      // ts-error-fixed ts-migrate(2551) FIXME: Property 'videoFolder' does not exist on type '{ p... Remove this comment to see the full error message
      _msg('Your browser does not support the <code>video</code> element.', {}, {
        action: 'output', autoplay: true, src: `${settings.videoFolder}/${filename}`, tag: 'video',
      });
    }

    // @DOC
    // Draw an image in the main window, embedded in the text.
    // This uses SVG, which is a standard web drawing system.
    // The first and second parameters are the width and height of the image.
    // The third parameter is an array of strings, each element being an SVG primitive.
    // The image will be added to the output queue in the same way text is.
    export function draw(width: any, height: any, data: any, options: any) {
      if (!options) options = {};
      // console.log(options)
      let s = `<svg width="${width}" height="${height}" viewBox="`;
      s    += options.x !== undefined ? (`${options.x} ${options.y}`) : '0 0';
      s    += ` ${width} ${height}" `;
      if (options.background) s += `style="background:${options.background}" `;
      s += 'xmlns="http://www.w3.org/2000/svg">';
      s += `${data.join('')}</svg>`;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'reportAllSvg' does not exist on type '{ ... Remove this comment to see the full error message
      if (settings.reportAllSvg) console.log(s.replace(/></g, '>\n<'));
      if (options.destination) {
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector(`#${options.destination}`).innerHTML = s;
      } else {
        rawPrint(s);
      }
    }

    // @DOC
    // Just the same as msg, but adds the "failed" CSS class. This allows failed command responses to be differentiated.
    // Returns the value FAILED, allowing commands to give a message and give up
    //     if (notAllowed) return failedmsg("That is not allowed.")
    export function failedmsg(s: any, params: any) {
      _msg(s, params || {}, { cssClass: 'default-p failed', tag: 'p' });
      return Quest.World.world.FAILED;
    }

    // @DOC
    // Just the same as msg, but adds the "failed" CSS class. This allows failed command responses to be differentiated.
    // Returns the value false, allowing commands to give a message and give up
    //     if (notAllowed) return falsemsg("That is not allowed.")
    export function falsemsg(s: any, params: any) {
      _msg(s, params || {}, { cssClass: 'default-p failed', tag: 'p' });
      return false;
    }

    // @DOC
    // Output a meta-message - a message to inform the player about something outside the game Quest.World.world,
    // such as hints and help messages.
    // The string will first be passed through the text processor.
    // Additional data can be put in the optional params dictionary.
    // During unit testing, messages will be saved and tested
    export function metamsg(s: any, params: any) {
      _msg(s, params || {}, { cssClass: 'meta', tag: 'p' });
    }

    // @DOC
    // Output a message from the parser indicating the input text could not be parsed.
    // During unit testing, messages will be saved and tested.
    // Does not use the text processor.
    export function parsermsg(s: any) {
      _msg(s, false, { cssClass: 'parser', tag: 'p' });
      return false;
    }

    // @DOC
    // Output a message from the user
    // Does not use the text processor.
    export function commentmsg(s: any) {
      _msg(s, false, { cssClass: 'comment', tag: 'p' });
      return false;
    }

    // @DOC
    // Output an error message.
    // Use for when something has gone wrong, but not when the player types something odd -
    // if you see this during play, there is a bug in your game (or my code!), it is not the player
    // to blame.
    //
    // This bypasses the normal output system. It will not wait for other text to be output (for example
    // after wait). During unit testing, error messages will be output to screen as they occur.
    // It does not use the text processor.
    export function errormsg(s: any, suppressTrace: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
      if (test.errorOutput !== undefined) {
        // This is an expected error in a unit test
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'errorOutput' does not exist on type '{}'... Remove this comment to see the full error message
        test.errorOutput.push(s);
        return false;
      }

      printError(s, new Error('error state caught by QuestJS runtime'), suppressTrace);
    }

    // @DOC
    // Output a debug message.
    // Debug messages are ignored if DEBUG is false.
    // You should also consider using `console.log` when debugging; it gives a message in the console,
    // and outputs objects and array far better.
    //
    // This bypasses the normal output system. It will not wait for other text to be output (for example
    // after wait). During unit testing, error messages will be output to screen as they occur.
    // It does not use the text processor.
    export function debugmsg(s: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
      if (settings.playMode === 'dev' || settings.playMode === 'meta') {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'print' does not exist on type '{ nextid:... Remove this comment to see the full error message
        io.print({
          cssClass: 'debug', id: io.nextid, tag: 'pre', text: s,
        });
        io.nextid++;
      }
    }

    // @DOC
    // Adds a blank line to the output.
    export function blankLine() {
      rawPrint('&nbsp;');
    }

    // @DOC
    // Adds a horizontal rule to the output.
    export function hr() {
      rawPrint('<hr/>');
    }

    // @DOC
    // Clears the screen.
    export function clearScreen() {
      io.addToOutputQueue({ action: 'clear' });
    }

    // @DOC
    // Stops outputting whilst waiting for the player to click.
    export function wait(delay: any, text: any, func: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
      if (Quest.Utilities.test.testing || settings.walkthroughInProgress) return;
      if (delay === undefined) {
        io.addToOutputQueue({
          action: 'wait', cssClass: 'continue', func, text,
        });
      } else {
        io.addToOutputQueue({
          action: 'delay', cssClass: 'continue', delay, func, text,
        });
      }
    }

    // @DOC
    // Clears the screen.
    function trigger(func: any) {
      io.addToOutputQueue({ action: 'func', func });
    }

    // @DOC
    // Use like this:
    //      showMenu('What is your favourite color?', ['Blue', 'Red', 'Yellow', 'Pink'], function(result) {
    //        msg("You picked " + result + ".");
    //      });
    export function showMenu(title: any, options: any, fn: any) {
      const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true };
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
      io.input(title, options, false, fn, (options: any) => {
        for (let i = 0; i < options.length; i++) {
          let s = `<a class="menu-option" onclick="io.menuResponse(${i})">`;
          s    += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts));
          s    += '</a>';
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(s);
        }
      });
    }

    function showMenuNumbersOnly(title: any, options: any, fn: any) {
      const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true };
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
      Quest.Parser.parser.overrideWith((s: any) => {
        io.menuResponse(s);
      });
      const disableTextFunction = function (disable: any) {
        if (disable) {
          io.disable(3);
          // add a keypress event handler to capture keypresses directly
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'keydownFunction' does not exist on type ... Remove this comment to see the full error message
          io.keydownFunction = function (e: any) {
            const n = parseInt(e.key);
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
            if (!isNaN(n) && n <= io.menuOptions.length && n !== 0) Quest.Parser.parser.parse(`${n}`);
            // stopping the typed character appearing in the text field is not easy...
            // stopPropagation and stopImmediatePropagation did not do it,
            // even though it seems to happen after this
            // so just delete it!
            setTimeout(() => {
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              document.querySelector('#textbox').value = '';
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              document.querySelector('#textbox').focus();
            }, 10);
          };
        } else {
          io.enable(5);
          // document.querySelector('#textbox').prop('disabled', false)
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'keydownFunction' does not exist on type ... Remove this comment to see the full error message
          delete io.keydownFunction;
        }
      };
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
      io.input(title, options, disableTextFunction, fn, (options: any) => {
        for (let i = 0; i < options.length; i++) {
          let s = `${i + 1}. <a class="menu-option" onclick="io.menuResponse(${i})">`;
          s    += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts));
          s    += '</a>';
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(s);
        }
      });
    }

    function showMenuWithNumbers(title: any, options: any, fn: any) {
      const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true };
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
      Quest.Parser.parser.overrideWith((s: any) => {
        io.menuResponse(s);
      });
      const disableTextFunction = function (disable: any) {
        if (disable) {
          io.disable(2);
        } else {
          io.enable();
          io.doNotSaveInput = false;
        }
      };
      const failFunction = function (input: any) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`I do not understand: ${input}`);
        Quest.Utilities.runCmd(input);
        io.savedCommands.push(input);
      };
      io.doNotSaveInput  = true;
      io.input(title, options, disableTextFunction, fn, (options: any) => {
        for (let i = 0; i < options.length; i++) {
          let s = `${i + 1}. <a class="menu-option" onclick="io.menuResponse(${i})">`;
          s    += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts));
          s    += '</a>';
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg(s);
        }
      }, failFunction);
    }

    function showDropDown(title: any, options: any, fn: any) {
      const opts = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true };
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
      io.input(title, options, false, fn, (options: any) => {
        let s = '<select id="menu-select" class="custom-select" style="width:400px;" ';
        s    += 'onchange=\"io.menuResponse(io.getDropDownText(\'menu-select\'))\">';
        s    += '<option value="-1">-- Select one --</option>';
        for (let i = 0; i < options.length; i++) {
          s += `<option value="${i + 1}">`;
          s += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts));
          s += '</option>';
        }
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(`${s}</select>`);
        // document.querySelector('#menu-select').selectmenu();
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#menu-select').focus();
      });
    }

    export function showMenuDiag(title: any, options: any, fn: any, cssClass: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
      io.showMenuDiagTitle      = title;
      const opts                = { article: Quest.Utilities.DEFINITE, capital: true, noLinks: true };
      const disableTextFunction = function (disable: any) {
        if (disable) {
          io.disable(3);
        } else {
          io.enable();
          if (!Quest.Utilities.test.testing) {
            const el = document.querySelector('#sidepane-menu');
            if (el) el.remove(); // may not exist in walk-through
          }
        }
      };

      const displayFunction = function (options: any) {
        let s = '<div id="sidepane-menu"';
        if (cssClass) s += ` class="${cssClass}"`;
        s += '>';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
        if (typeof io.showMenuDiagTitle === 'string') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
          s += `<p class="sidepane-menu-title">${io.showMenuDiagTitle}</p>`;
        } else {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
          s += `<h4 class="sidepane-menu-title">${io.showMenuDiagTitle.title}</h4>`;
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
          s += `<p class="sidepane-menu-title">${io.showMenuDiagTitle.text}</p>`;
        }
        for (let i = 0; i < options.length; i++) {
          s += `<p value="${i}" onclick="io.menuResponse(${i})" class="sidepane-menu-option">`;
          s += (typeof options[i] === 'string' ? options[i] : Quest.lang.getName(options[i], opts));
          s += '</p>';
        }
        s += '</div>';
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('body').innerHTML += s;
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
      io.input(false, options, disableTextFunction, fn, displayFunction);

      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    }

    export function showYesNoMenu(title: any, fn: any) {
      showMenu(title, Quest.lang.yesNo, fn);
    }

    function showYesNoMenuWithNumbers(title: any, fn: any) {
      showMenuWithNumbers(title, Quest.lang.yesNo, fn);
    }

    function showYesNoDropDown(title: any, fn: any) {
      showDropDown(title, Quest.lang.yesNo, fn);
    }

    export function askText(title: any, fn: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
      io.menuFn = fn;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(title);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
      io.disable(2);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
      Quest.Parser.parser.overrideWith((result: any) => {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
        io.enable();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'savedCommands' does not exist on type '{... Remove this comment to see the full error message
        io.savedCommands.pop();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'savedCommandsPos' does not exist on type... Remove this comment to see the full error message
        if (io.savedCommandsPos > io.savedCommands.length) io.savedCommandsPos = io.savedCommands.length;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
        io.menuFn(result);
      });
    }

    export function showDiag(title: any, text: any, submitButton: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!submitButton) return errormsg('Trying to use showDiag with no button');
      askDiag({
        height: 600, text, title, width: 800,
      }, null, submitButton);
    }

    export function askDiag(title: any, fn: any, submitButton: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
      io.menuFn = fn;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
      io.showMenuDiagTitle = title;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagSubmit' does not exist on ty... Remove this comment to see the full error message
      io.showMenuDiagSubmit     = submitButton;
      const disableTextFunction = function (disable: any) {
        if (disable) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
          io.disable(3);
        } else {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
          io.enable();
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#sidepane-text').remove();
        }
      };

      const displayFunction = function () {
        let s = '<div id="sidepane-menu"';
        if (title.width) s += ` style="width:${title.width}px;top:100px;"`;
        s += '>';

        if (typeof title === 'string') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
          s += `<p class="sidepane-menu-title">${io.showMenuDiagTitle}</p>`;
        } else {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
          s += `<h4 class="sidepane-menu-title">${io.showMenuDiagTitle.title}</h4>`;
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagTitle' does not exist on typ... Remove this comment to see the full error message
          s += `<p class="sidepane-menu-title">${io.showMenuDiagTitle.text}</p>`;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
        if (io.menuFn) s += '<input type="text" id="text-dialog" class="sidepane-menu-option">';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagSubmit' does not exist on ty... Remove this comment to see the full error message
        if (io.showMenuDiagSubmit) {
          s += '<div id="dialog-footer" style="text-align:right"><hr>';
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'showMenuDiagSubmit' does not exist on ty... Remove this comment to see the full error message
          s += `<input type="button" onclick="io.textResponse()" value="${io.showMenuDiagSubmit}" class="sidepane-menu-button"></div>`;
        }
        s += '</div>';
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('body').innerHTML += s;

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
        if (io.menuFn) {
          const el = document.getElementById('text-dialog');
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          el.addEventListener('keydown', (event) => {
            if (event.keyCode === 13) {
              event.preventDefault();
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'textResponse' does not exist on type '{ ... Remove this comment to see the full error message
              io.textResponse();
            }
          });
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          el.focus();
        }
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'input' does not exist on type '{ nextid:... Remove this comment to see the full error message
      io.input(false, [], disableTextFunction, fn, displayFunction);

      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    }

    // This should be called after each turn to ensure we are at the end of the page and the text box has the focus
    export function endTurnUI(update: any) {
      if (settings.panes !== 'none' && update) {
        // set the Quest.lang.exit_list
        for (const exit of Quest.lang.exit_list) {
          const el = document.querySelector(`#exit-${exit.name}`);
          if (!el) continue;
          if (Quest.World.currentLocation.hasExit(exit.name, { excludeScenery: true }) || exit.type === 'nocmd') {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
            el.style.display = 'block';
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
            el.style.display = 'none';
          }
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateStatus' does not exist on type '{ ... Remove this comment to see the full error message
        io.updateStatus();
      }
      for (const o of io.modulesToUpdate) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'update' does not exist on type 'never'.
        o.update(update);
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateUIItems' does not exist on type '{... Remove this comment to see the full error message
      io.updateUIItems();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
      if (settings.updateCustomUI) settings.updateCustomUI();

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
      io.scrollToEnd;
      // give focus to command bar
      // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
      if (settings.textInput) {
        document.querySelector('#textbox').focus();
      }
    }

    export function createAdditionalPane(position: any, title: any, id: any, func: any) {
      const el = document.querySelector('#panes');

      const div = document.createElement('div');
      div.classList.add('pane-div');
      div.innerHTML = `<h4 class="side-pane-heading">${title}</h4><div id="${id}">${func()}</div>`;
      // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.insertBefore(div, el.children[position]);
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      settings.customPaneFunctions[id] = func;
    }

    // ============  Hidden from creators!  =======================================
    export const io = {

      addClassForClass(oldClass: any, newClass: any) {
        const collection = document.getElementsByClassName(oldClass);
        for (const el of collection) el.classList.add(newClass);
      },

      addToOutputQueue(data: any) {
        data.id = io.nextid;
        io.outputQueue.push(data);
        io.nextid++;
        io.outputFromQueue();
      },

      allowedHtmlAttrs: ['width', 'height', 'onclick', 'src', 'autoplay'],

      calcMargins() {
        // How much space do we need for images and map?
        let mapImageWidth = 0;
        if (typeof map !== 'undefined') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'hideMap' does not exist on type '{ perfo... Remove this comment to see the full error message
          if (!settings.hideMap) mapImageWidth = settings.mapWidth;
        }
        if (typeof imagePane !== 'undefined') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'hideImagePane' does not exist on type '{... Remove this comment to see the full error message
          if (!settings.hideImagePane && settings.imageWidth > mapImageWidth) mapImageWidth = settings.imageWidth;
        }
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#main').style.marginLeft = '40px';
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#main').style.marginRight = '40px';

        // Do we show the side panes?
        if (settings.panes !== 'none') {
          const margin = settings.panes === 'left' ? 'margin-left' : 'margin-right';
          if (io.resizePanesListener.matches) { // If media query matches
            // hide sidepane
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#main').style[margin] = `${io.mainGutter}px`;
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#panes').style.display = 'none';
          } else {
            // show sidepane
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#main').style[margin] = `${io.panesWidth + io.mainGutter}px`;
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#panes').style.display = 'block';
          }
        }

        // Note: As of Jan/22 this takes account of settings.hideMap - but not of whether
        // the image should be hidden
        let margin = settings.panes === 'right' ? 'margin-left' : 'margin-right';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapImageSide' does not exist on type '{ ... Remove this comment to see the full error message
        if (settings.mapImageSide) margin = settings.mapImageSide === 'left' ? 'margin-left' : 'margin-right';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'resizeMapImageListener' does not exist o... Remove this comment to see the full error message
        if (io.resizeMapImageListener.matches || settings.hideMap) { // If media query matches
          // hide image
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#main').style[margin] = `${io.mainGutter}px`;
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#quest-image').style.display = 'none';
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#quest-map').style.display = 'none';
        } else {
          // show image
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#main').style[margin] = `${mapImageWidth + io.mainGutter}px`;
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#quest-image').style.display = 'block';
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#quest-map').style.display = 'block';
        }
      },

      // Add the item to the DIV named htmlDiv
// The item will be given verbs from its attName attribute
appendItem(item: any, htmlDiv: any, loc: any, isSubItem: any, highlight: any) {
        const el = document.querySelector(`#${htmlDiv}`);
// ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        io.currentItemList.push(item.name);

// ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        el.innerHTML += io.getItemHtml(item, loc, isSubItem, highlight);

        if (item.container && !item.closed) {
          if (typeof item.getContents !== 'function') {
            console.log('item flagged as container but no getContents function:');
            console.log(item);
          }
          const l = item.getContents(Quest.World.world.SIDE_PANE);
          for (const el of l) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'appendItem' does not exist on type '{ ne... Remove this comment to see the full error message
            io.appendItem(el, htmlDiv, item.name, true);
          }
        }
      },



clickExit(dir: any) {
        if (io.disableLevel) return;
        const failed = false;
        Quest.Utilities.runCmd(dir);
      },



      clickItem(itemName: any) {
        if (io.disableLevel) return;
        // duplicated items would toggle twice
        const uniq = [...new Set(io.currentItemList)];
        for (const item of uniq) {
          for (const el of document.querySelectorAll(`.${item}-actions`)) {
            if (item === itemName) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
              el.style.display = el.style.display === 'none' ? 'block' : 'none';
            } else {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
              el.style.display = 'none';
            }
          }
        }
      },

      clickItemAction(itemName: any, action: any) {
        if (io.disableLevel) return;
// ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const item = Quest.World.w[itemName];
        const cmd  = action.includes('%') ? action.replace('%', item.alias) : `${action} ${item.alias}`;
        Quest.Utilities.runCmd(cmd);
      },


      cmdlink(command: any, str: any) {
        return `<a class="cmd-link" onclick="Quest.Utilities.runCmd('${command}')">${str}</a>`;
      },


// Creates the panes on the left or right
// Should only be called once, when the page is first built
createPanes() {
        if (!['right', 'left', 'none'].includes(settings.panes)) {
          console.error(`ERROR: Your settings.panes value is "${settings.panes}". It must be one of "right", "left" or "none" (all lower-case). It is probably set in the file setiings.js.`);
          return;
        }

// ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#input').innerHTML = `<span id="cursor">${settings.cursor}</span><input type="text" name="textbox" id="textbox" />`;
// ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (!settings.textInput) document.querySelector('#input').style.display = 'none';

        if (settings.panes === 'none') return;

        let html = '';

        if (settings.compassPane) {
          html += '<div class="pane-div">';
          html += '<table id="compass-table">';
          for (let i = 0; i < 3; i++) {
            html += '<tr>';
            html += io.writeExit(0 + 5 * i);
            html += io.writeExit(1 + 5 * i);
            html += io.writeExit(2 + 5 * i);
            html += '<td></td>';
            html += io.writeExit(3 + 5 * i);
            html += io.writeExit(4 + 5 * i);
            html += '</tr>';
          }
          html += '</table>';
          html += '</div>';
        }

        if (settings.statusPane) {
          html += '<div class="pane-div">';
          html += `<h4 class="side-pane-heading">${settings.statusPane}</h4>`;
          html += '<table id="status-pane">';
          html += '</table>';
          html += '</div>';
        }

        if (settings.inventoryPane) {
          for (const inv of settings.inventoryPane) {
            html += '<div class="pane-div">';
            html += `<h4 class="side-pane-heading">${inv.name}</h4>`;
            html += `<div class="item-list" id="${inv.alt}">`;
            html += '</div>';
            html += '</div>';
          }
        }

        html += '<div class="pane-div-finished">';
        html += Quest.lang.game_over_html;
        html += '</div>';
        html += '</div>';

        const el     = document.createElement('div');
        el.innerHTML = html;
        el.setAttribute('id', 'panes');
        el.classList.add('side-panes');
        el.classList.add(`side-panes-${settings.panes}`);
        el.classList.add('panes-narrow');

        const referenceNode = document.querySelector('#main');
// ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);

// ts-error-fixed ts-migrate(2339) FIXME: Property 'panesWidth' does not exist on type '{ ne... Remove this comment to see the full error message
        io.panesWidth = document.querySelector('.side-panes').clientWidth;

// ts-error-fixed ts-migrate(2339) FIXME: Property 'customUI' does not exist on type '{ perf... Remove this comment to see the full error message
        if (settings.customUI) settings.customUI();
      },



// A list of names for items currently Quest.World.world. in the inventory panes
currentItemList: [],

      disable(level: any) {
        // log('disable ' + level + ' (' + io.disableLevel + ')')
        if (!level) level = 1;
        if (level <= io.disableLevel) return;
        io.disableLevel = level;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (level !== 2) document.querySelector('#input').style.display = 'none';
        io.setCssByClass('compass-button .dark-body', 'color', '#808080');
        io.setCssByClass('item', 'color', '#808080');
        io.setCssByClass('item-action', 'color', '#808080');
      },

      // 0: not disabled at all
      // 1: disable until output is done
      // 2: awaiting special input, eg from menu, including text
      // 3: awaiting special input, eg from menu, excluding text
      disableLevel: 0,

      doNotSaveInput: false,

      enable(level: any) {
        // log('enable ' + level + ' (' + io.disableLevel + ')')
        if (!level) level = 1;
        if (!io.disableLevel || level > io.disableLevel) return;
        io.disableLevel = 0;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#input').style.display = 'block';
        if (settings.panes !== 'none') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
          io.setCssByClass('compass-button .dark-body', 'color', io.textColour);
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
          io.setCssByClass('item', 'color', io.textColour);
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'setCssByClass' does not exist on type '{... Remove this comment to see the full error message
          io.setCssByClass('item-action', 'color', io.textColour);
        }
      },

      escapeCodes: {
        colon:   ':',
        hash:    '#',
        lcurly:  '{',
        lsquare: '[',
        rcurly:  '}',
        rsquare: ']',
        vert:    '|',
      },

      forceOutputFromQueue() {
        io.outputSuspended = false;
        io.outputFromQueue();
      },

      // Gets the command with the given name
      getCommand(name: any) {
        return Quest.Commands.commands.find((el) => el.name === name);
      },

      getItemHtml(item: any, loc: any, isSubItem: any, highlight: any) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (typeof item.getVerbs !== 'function') return errormsg(`Item with bad getVerbs: ${item.name}`);
        const verbList = item.getVerbs(loc);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (verbList === undefined) {
          errormsg(`No verbs for ${item.name}`); console.log(item);
        }

        let s = `<div id="${item.name}-item"><p class="item${isSubItem ? ' sub-item' : ''}${highlight ? ` highlight-item${highlight}` : ''}" onclick="io.clickItem('${item.name}')">${io.getIcon(item)}${item.getListAlias(loc)}</p></div>`;
        for (let verb of verbList) {
          if (typeof verb === 'string') verb = { action: verb, name: verb };
          s += `<div class="${item.name}-actions item-action`;
          if (verb.style) s += ` ${verb.style}`;
          s += `" onclick="io.clickItemAction('${item.name}', '${verb.action}')">`;
          s += verb.name;
          s += '</div>';
        }
        return s;
      },

      // Called from scriptOnLoad in _settings.js, if there are no more scripts to load
      init() {
        settings.performanceLog('Start io.onload');
        io.createPanes();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
        if (settings.playMode === 'play') {
          window.oncontextmenu = function () {
            return false;
          };
        }
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#fileDialog').onchange = Quest.SaveLoad.saveLoad.loadGameAsFile;

        document.addEventListener('keydown', (event) => {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'keydownFunction' does not exist on type ... Remove this comment to see the full error message
          if (io.keydownFunction) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'keydownFunction' does not exist on type ... Remove this comment to see the full error message
            io.keydownFunction(event);
            // cancel?
            return;
          }
          const keycode = (event.keyCode ? event.keyCode : event.which);
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'customKeyResponses' does not exist on ty... Remove this comment to see the full error message
          if (settings.customKeyResponses) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'customKeyResponses' does not exist on ty... Remove this comment to see the full error message
            if (settings.customKeyResponses(keycode, event)) return false;
          }
          for (const exit of Quest.lang.exit_list) {
            if (exit.key && exit.key === keycode) {
              io.msgInputText(exit.name);
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
              Quest.Parser.parser.parse(exit.name);
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              document.querySelector('#textbox').value = '';
              event.stopPropagation();
              event.preventDefault();
              return false;
            }
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
          if (keycode == 123 && settings.playMode === 'play') return false;
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
          if (event.ctrlKey && event.shiftKey && keycode == 73 && settings.playMode === 'play') return false;
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
          if (event.ctrlKey && event.shiftKey && keycode == 74 && settings.playMode === 'play') return false;

          if (keycode === 13) {
            // enter
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
            if (event.ctrlKey && (settings.playMode === 'dev' || settings.playMode === 'beta')) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
              Quest.Parser.parser.parse('script show');
            } else {
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              const s = document.querySelector('#textbox').value;
              io.msgInputText(s);
              if (s) {
                if (io.savedCommands[io.savedCommands.length - 1] !== s && !io.doNotSaveInput) {
                  io.savedCommands.push(s);
                }
                io.savedCommandsPos = io.savedCommands.length;
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
                Quest.Parser.parser.parse(s);
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'doNotEraseLastCommand' does not exist on... Remove this comment to see the full error message
                if (io.doNotEraseLastCommand) {
                  // ts-error-fixed ts-migrate(2339) FIXME: Property 'doNotEraseLastCommand' does not exist on... Remove this comment to see the full error message
                  io.doNotEraseLastCommand = false;
                } else {
                  // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
                  document.querySelector('#textbox').value = '';
                }
              }
            }
          }
          if (keycode === 38) {
            // up arrow
            io.savedCommandsPos -= 1;
            if (io.savedCommandsPos < 0) {
              io.savedCommandsPos = 0;
            }
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#textbox').value = io.savedCommands[io.savedCommandsPos];
            // Get cursor to end of text
            const el = document.querySelector('#textbox');
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            if (el.setSelectionRange) {
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              setTimeout(() => {
                el.setSelectionRange(9999, 9999);
              }, 0);
            }
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            else if (typeof el.selectionStart === 'number') {
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              el.selectionStart = el.selectionEnd = el.value.length;
            }
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            else if (typeof el.createTextRange !== 'undefined') {
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              el.focus();
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              const range = el.createTextRange();
              range.collapse(false);
              range.select();
            }
          }
          if (keycode === 40) {
            // down arrow
            io.savedCommandsPos += 1;
            if (io.savedCommandsPos >= io.savedCommands.length) {
              io.savedCommandsPos = io.savedCommands.length - 1;
            }
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#textbox').value = io.savedCommands[io.savedCommandsPos];
          }
          if (keycode === 27) {
            // ESC
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#textbox').value = '';
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
          if (keycode === 96 && (settings.playMode === 'dev' || settings.playMode === 'beta')) {
            if (event.ctrlKey && event.altKey) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
              Quest.Parser.parser.parse('wt b');
            } else if (event.altKey) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
              Quest.Parser.parser.parse('wt a');
            } else if (event.ctrlKey) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
              Quest.Parser.parser.parse('wt c');
            } else {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
              Quest.Parser.parser.parse('test');
            }
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            setTimeout(() => {
              document.querySelector('#textbox').value = '';
            }, 1);
          }
          if (keycode === 90 && event.ctrlKey) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
            Quest.Parser.parser.parse('undo');
          }
        });
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'textColour' does not exist on type '{ ne... Remove this comment to see the full error message
        if (settings.panes !== 'none') io.textColour = document.querySelector('.side-panes').style.color;
        /* if (settings.soundFiles) {
          const main = document.querySelector('#main')
          for (let el of settings.soundFiles) {
            main.innerHTML += '<audio id="' + el + '" src="' + settings.soundsFolder + el + settings.soundsFileExt + '"/>'
          }
        } */
        settings.performanceLog('UI built');
        endTurnUI(true);
        settings.performanceLog('endTurnUI completed');

        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (document.querySelector('#loading')) document.querySelector('#loading').remove();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'suppressTitle' does not exist on type '{... Remove this comment to see the full error message
        if (!settings.suppressTitle) msgHeading(settings.title, 2);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'subtitle' does not exist on type '{ perf... Remove this comment to see the full error message
        if (settings.subtitle) msgHeading(settings.subtitle, 3);
        io.setTitleAndInit(settings.title);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
        if (settings.playMode === 'beta') Quest.lang.betaTestIntro();
        settings.performanceLog('Title/intro printed');

        if (settings.startingDialogEnabled) {
          settings.setUpDialog();
          setTimeout(() => {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogInit' does not exist on ty... Remove this comment to see the full error message
            if (settings.startingDialogInit) settings.startingDialogInit();
          }, 10);
        } else {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogAlt' does not exist on typ... Remove this comment to see the full error message
          if (settings.startingDialogAlt) settings.startingDialogAlt();
          settings.delayStart = false;
          Quest.World.world.begin();
        }
        settings.performanceLog('End io.onload');
      },


      dialogShowing: false,

      // This is used by the various menu functions (not showMenuDiag).
input(title: any, options: any, disableTextFunction: any, reactFunction: any, displayFunction: any, failFunction: any) {
        // Store the values so we can use them later in io.menuResponse
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuStartId' does not exist on type '{ n... Remove this comment to see the full error message
        io.menuStartId = io.nextid;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
        io.menuFn = reactFunction;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFailFn' does not exist on type '{ ne... Remove this comment to see the full error message
        io.menuFailFn = failFunction;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
        io.menuOptions = options;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
        io.disableTextFunction = disableTextFunction || function (disable: any) {
          if (disable) io.disable(3);
          if (!disable) io.enable();
        };

        // Skip if unit-testing
        if (Quest.Utilities.test.testing) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
          if (test.menuResponseNumber === undefined) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
            debugmsg(`Error when testing menu (possibly due to disambiguation?), test.menuResponseNumber = ${test.menuResponseNumber}`);
          } else {
            let n;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
            if (Array.isArray(test.menuResponseNumber)) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
              n = test.menuResponseNumber.shift();
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
              if (test.menuResponseNumber.length === 0) {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
                delete test.menuResponseNumber;
              }
            } else {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
              n = test.menuResponseNumber;
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuResponseNumber' does not exist on ty... Remove this comment to see the full error message
              delete test.menuResponseNumber;
            }
            // Sort out the menuResponseNumber before hand in case the response also
            // uses it - we want it done before that
            io.menuResponse(n);
          }
          return;
        }

        // Skip if walk-through
        if (settings.walkthroughMenuResponses.length > 0) {
          const response = settings.walkthroughMenuResponses.shift();
          io.menuResponse(response);
          return;
        }

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
        io.disableTextFunction(true);
        if (title) msg(title, {}, 'menu-title');
        displayFunction(options);
      },

      mainGutter: 20,

      finish() {
        io.finished        = true;
        settings.textInput = false;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#input').style.display = 'none';
        if (settings.panes !== 'none') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
          for (const el of document.querySelectorAll('.pane-div')) el.style.display = 'none';
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('.pane-div-finished').style.display = 'block';
        }
        for (const el of settings.afterFinish) el();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'finishMetaComment' does not exist on typ... Remove this comment to see the full error message
        if (settings.finishMetaComment) metamsg(settings.finishMetaComment);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        if (Quest.SaveLoad.saveLoad.transcriptExists()) metamsg(Quest.lang.transcript_finish);
      },

      menuFunctions: {
        showDropDown,
        showMenu,
        showMenuDiag,
        showMenuNumbersOnly,
        showMenuWithNumbers,
      },

      copyTextToClipboard(text: any) {
        // from: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
        const textArea = document.createElement('textarea');
        // Place in top-left corner of screen regardless of scroll position.
        textArea.style.position = 'fixed';
        // ts-error-fixed ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        textArea.style.top = 0;
        // ts-error-fixed ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        textArea.style.left = 0;

        // Styling just in case it gets displayed to make is as unobstrusive as possible
        textArea.style.width  = '2em';
        textArea.style.height = '2em';
        // ts-error-fixed ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'string'.
        textArea.style.padding    = 0;
        textArea.style.border     = 'none';
        textArea.style.outline    = 'none';
        textArea.style.boxShadow  = 'none';
        textArea.style.background = 'transparent';

        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          const successful = document.execCommand('copy');
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          metamsg(`Copying text command was ${successful ? 'successful' : 'unsuccessful'}`);
        } catch (err) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          metamsg('Oops, unable to copy');
        }

        document.body.removeChild(textArea);
      },

      menuResponse(n: any) {
        const input = n;
        if (typeof n === 'string' && n.match(/^\d+$/)) n = parseInt(n) - 1;
        if (typeof n === 'string') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
          n = io.menuOptions.findIndex((el: any) => (typeof el === 'string' ? el.includes(n) : el.alias.includes(n)));
        }

        // stop disabling input
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
        io.disableTextFunction(false);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'disableTextFunction' does not exist on t... Remove this comment to see the full error message
        delete io.disableTextFunction;

        // stop overriding the parser
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'overrideWith' does not exist on type '{}... Remove this comment to see the full error message
        Quest.Parser.parser.overrideWith();

        // remove choices from screen
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuStartId' does not exist on type '{ n... Remove this comment to see the full error message
        for (let i = io.menuStartId; i < io.nextid; i++) document.querySelector(`#n${i}`).remove();

        // handle bad number
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
        if (n === undefined || n >= io.menuOptions[n] || n === -1) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFailFn' does not exist on type '{ ne... Remove this comment to see the full error message
          io.menuFailFn(input);
        }

        // handle good number
        else {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuOptions' does not exist on type '{ n... Remove this comment to see the full error message
          Quest.SaveLoad.saveLoad.transcriptAppend({ cssClass: 'menu', n, text: (io.menuOptions[n].alias ? io.menuOptions[n].alias : io.menuOptions[n]) });
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
          io.menuFn(io.menuOptions[n]);
        }
        endTurnUI(true);
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (settings.textInput) document.querySelector('#textbox').focus();
      },

      modulesToInit: [],

      againOrOops(isAgain: any) {
        if (io.savedCommands.length === 0) {
// ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          metamsg(Quest.lang.again_not_available);
          return Quest.World.world.FAILED;
        }
        io.savedCommands.pop(); // do not save AGAIN/OOPS
        if (isAgain) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'parse' does not exist on type '{}'.
          Quest.Parser.parser.parse(io.savedCommands[io.savedCommands.length - 1]);
        } else {
// ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#textbox').value = io.savedCommands[io.savedCommands.length - 1];
// ts-error-fixed ts-migrate(2339) FIXME: Property 'doNotEraseLastCommand' does not exist on... Remove this comment to see the full error message
          io.doNotEraseLastCommand = true;
        }
        return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      },

      modulesToUpdate: [],

      getIcon(item: any) {
// ts-error-fixed ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
        if (settings.iconsFolder === false) return '';
        if (!item.icon) return '';
        if (item.icon() === '') return '';
        return `<img src="${settings.iconsFolder}${settings.darkModeActive ? 'l_' : 'd_'}${item.icon()}.png" />`;
      },


msgInputText(s: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
        if (Quest.SaveLoad.saveLoad.transcript) Quest.SaveLoad.saveLoad.transcriptWalkthrough.push(`    "${s}",`);
        if (!settings.cmdEcho || s === '') return;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#output').innerHTML += `<p id="n${io.nextid}" class="input-text">&gt; ${s}</p>`;
        io.nextid++;
        io.speak(s, true);
      },

      // Each line that is output is given an id, n plus an id number.
      nextid: 0,


      // Display Icons for compas
displayIconsCompass(exit: any) {
        const datatransform = exit.rotate ? ' style="transform: rotate(40deg)"' : '';
        return `<i class="fas ${exit.symbol}"${datatransform}></i>`;
      },


// False for normal function, true if things should be printed to the same paragraph
otnb: false,

      // Create Toolbar
createToolbar() {
        let el = document.querySelector('#toolbar');
        if (!el) {
          const div = document.createElement('div');
          div.setAttribute('id', 'toolbar');
          // div.classList.add('button')
          div.classList.add('toolbar');
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('body').insertBefore(div, document.querySelector('#main'));
          el = document.querySelector('#toolbar');
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#main').style.paddingTop = '30px';
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#panes').style.top = '36px';
        }

        let html = '';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getToolbarHTML' does not exist on type '... Remove this comment to see the full error message
        html += `<div class="left">${io.getToolbarHTML(settings.toolbar[0])}</div>`;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getToolbarHTML' does not exist on type '... Remove this comment to see the full error message
        html += `<div class="middle">${io.getToolbarHTML(settings.toolbar[1])}</div>`;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getToolbarHTML' does not exist on type '... Remove this comment to see the full error message
        html += `<div class="right">${io.getToolbarHTML(settings.toolbar[2])}</div>`;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        el.innerHTML = html;
      },




outputFromQueue() {
        if (io.outputSuspended) return;
        if (io.outputQueue.length === 0) {
          if (!io.disableTextFunction) io.enable();
          return;
        }

        // if (settings.textInput) document.querySelector('#input').style.display = 'block'
        const data = io.outputQueue.shift();
        if (data?.action === 'wait') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
          io.disable();
          io.outputSuspended = true;
          // if (settings.textInput) document.querySelector('#input').style.display = 'none'
          data.tag     = 'p';
          data.onclick = 'io.unpause()';
          if (!data.text) data.text = Quest.lang.click_to_continue;
          io.print(data);
        }
        if (data?.action === 'delay') {
          io.disable();
          io.outputSuspended = true;
          if (data.text) {
            data.tag = 'p';
            io.print(data);
          }
          setTimeout(io.unpause, data.delay * 1000);
        }
        if (data?.action === 'output') {
          const html = io.print(data);
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'speak' does not exist on type '{ nextid:... Remove this comment to see the full error message
          io.speak(data.text);
          Quest.SaveLoad.saveLoad.transcriptAppend(data);
          io.outputFromQueue();
        }
        if (data?.action === 'func') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'outputFromQueue' does not exist on type ... Remove this comment to see the full error message
          if (data.func()) io.outputFromQueue();
        }
        if (data?.action === 'effect') {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
          io.disable();
          // need a way to handle spoken and transcript here
          data.effect(data);
        }
        if (data?.action === 'clear') {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#output').textContent = '';
          io.outputFromQueue();
        }
        if (data?.action === 'sound') {
          if (!settings.silent) {
            const el = document.getElementById(data.name);
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            el.currentTime = 0;
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            el.play();
          }
        }
        if (data?.action === 'ambient') {
          for (const el of document.getElementsByTagName('audio')) el.pause();
          if (!settings.silent && data.name) {
            const el = document.getElementById(data.name);
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            el.currentTime = 0;
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            el.loop = true;
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            el.play();
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            if (data.volume) el.volume = data.volume / 10;
          }
        }
        io.scrollToEnd();
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (settings.textInput) document.querySelector('#textbox').focus();
      },

      // The output system is quite complicated...
      // https://github.com/ThePix/QuestJS/wiki/The-Output-Queue
      outputQueue: [],

      focus(el: any) {
        if (typeof el === 'string') el = document.querySelector(`#${el}`);
        if (el !== document.activeElement) el.focus();
      },

      outputSuspended: false,

      getDropDownText(name: any) {
        const el = document.querySelector(`#${name}`);
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        return el.options[el.selectedIndex].text;
      },

      panesWidth: 160,

      getToolbarHTML(data = {}) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'room' does not exist on type '{}'.
        if (data.room) return Quest.Utilities.sentenceCase(Quest.lang.getName(Quest.World.w[Quest.World.player.loc], { article: Quest.Utilities.DEFINITE }));
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
        if (data.title) return `<b><i>${settings.title}</i></b>`;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'content' does not exist on type '{}'.
        if (data.content) return data.content();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'buttons' does not exist on type '{}'.
        if (data.buttons) {
          let s = '';
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'buttons' does not exist on type '{}'.
          for (const el of data.buttons) {
            const js = el.cmd ? `Quest.Utilities.runCmd('${el.cmd}')` : el.onclick;
            s       += ` <a class="link" onclick="${js}"><i class="fas ${el.icon}" title="${el.title}"></i></a>`;
          }
          return s;
        }
        return '';
      },

      print(data: any) {
        let html;
        let keepSL;
        let slID;
        if (typeof data === 'string') {
          html = data;
        }

        if (data.html) {
          html = data.html;
        } else if (io.sameLine == false) {
          html = `<${data.tag} id="n${data.id}"`;
          if (data.cssClass) html += ` class="${data.cssClass}"`;
          for (const s of io.allowedHtmlAttrs) if (data[s]) html += ` ${s}="${data[s]}"`;
          html += `>${data.text}</${data.tag}>`;
        } else {
          html = data.text;
        }
        if (data.destination) {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector(`#${data.destination}`).innerHTML = html;
        } else {
          const keepSL = (html.indexOf('@@OUTPUTTEXTNOBR@@') > -1);
          const slID   = `n${data.id - 1}`;
          if (keepSL == true) {
            html = html.replace('@@OUTPUTTEXTNOBR@@', '');
          }
          if (io.sameLine == true) {
            const last = document.getElementById(slID);
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            last.innerHTML += html;
            io.sameLine     = false;
          } else {
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector('#output').innerHTML += html;
          }
          io.sameLine = keepSL;
        }
        return html;
      },

      resizeMapImageListener: window.matchMedia(`(max-width: ${settings.mapAndImageCollapseAt}px)`),

      resizePanesListener: window.matchMedia(`(max-width: ${settings.panesCollapseAt}px)`),

      sameLine: false,

      savedCommands: ['help'],

      savedCommandsPos: 0,

      scrollToEnd() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'autoscroll' does not exist on type '{ pe... Remove this comment to see the full error message
        if (settings.autoscroll) window.scrollTo(0, document.getElementById('main').scrollHeight);
      },

      spoken: false,

      setCssByClass(name: any, prop: any, val: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        for (const el of document.querySelectorAll(`.${name}`)) el.style[prop] = val;
      },

      setTitleAndInit(s: any) {
        document.title = s;
        for (const o of io.modulesToInit) {
          o.init();
        }
        io.calcMargins();
      },

      slID: 'output',

      // @DOC
// Appends an HTML DIV, with the given title and content,
// and shows it as a dialog. Used by the transcript
// (and really only useful for displaying data).
showHtml(title: any, html: any) {
        if (io.dialogShowing) return false;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('body').innerHTML += `<div id="showHtml" title="${title}">${html}</div>`;
        io.dialogShowing                          = true;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#showHtml').dialog({
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          close() {
            document.querySelector('#showHtml').remove(); io.dialogShowing = false;
          },

          width: 860,
        });
        return true;
      },





      showInTab(html: any, title = 'Quest JS Tab') {
        const path = `${location.protocol}//${location.pathname.replace('index.html', '')}`;
        const tab  = window.open('about:blank', '_blank');
        if (!tab) {
// ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          metamsg(Quest.lang.new_tab_failed);
          return false;
        }

        settings.loadCssFiles(tab.document, path);

        const myScript = tab.document.createElement('script');
        myScript.setAttribute('src', `${path}lib/_transcript.js`);
        tab.document.head.appendChild(myScript);
        tab.document.body.innerHTML = html;
        tab.document.title          = title;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'favicon' does not exist on type '{ perfo... Remove this comment to see the full error message
        tab.document.head.setAttribute('data-favicon', settings.favicon);
        tab.document.head.setAttribute('data-path', path);

        const link = tab.document.createElement('link');
        link.id    = 'dynamic-favicon';
        link.rel   = 'shortcut icon';
        link.href  = path + settings.favicon;
        tab.document.head.appendChild(link);
      },

      speak(str: any, altVoice: any) {
        if (!io.spoken) return;
        if (!io.voice) {
          io.voice = io.synth.getVoices().find((el: any) => /UK/.test(el.name) && /Female/.test(el.name));
          if (!io.voice) io.voice = io.synth.getVoices()[0];
        }
        if (!io.voice2) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'voice2' does not exist on type '{ nextid... Remove this comment to see the full error message
          io.voice2 = io.synth.getVoices().find((el: any) => /UK/.test(el.name) && /Male/.test(el.name));
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'voice2' does not exist on type '{ nextid... Remove this comment to see the full error message
          if (!io.voice2) io.voice2 = io.synth.getVoices()[0];
        }

        const utterThis   = new SpeechSynthesisUtterance(str);
        utterThis.onend   = function (event) {
          // console.log('SpeechSynthesisUtterance.onend');
        };
        utterThis.onerror = function (event) {
          // console.error('SpeechSynthesisUtterance.onerror: ' + event.name);
        };
        utterThis.voice   = altVoice ? io.voice2 : io.voice;
        // I think these can vary from 0 to 2
        utterThis.pitch = 1;
        utterThis.rate  = 1;
        io.synth.speak(utterThis);
      },

      startCommand() {
        io.addClassForClass('default-p', 'old-text');
        io.addClassForClass('default-h', 'old-text');
        io.addClassForClass('meta', 'old-text');
        io.addClassForClass('parser', 'old-text');
        io.addClassForClass('error', 'old-text');
      },


synth: window.speechSynthesis,

      // Stops the current pause immediately (no effect if not paused)
unpause: function () {
// ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('.continue').remove();
        io.outputSuspended = false;
        io.outputFromQueue();
// ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (settings.textInput) document.querySelector('#textbox').focus();
      },

      textResponse(s: any) {
        if (s === undefined) {
          const el = document.querySelector('#text-dialog');
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'value' does not exist on type 'Element'.
          if (el) s = el.value;
        }
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#sidepane-menu').remove();

        // stop disabling input
        io.enable();

        Quest.SaveLoad.saveLoad.transcriptAppend({ cssClass: 'menu', text: s });
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'menuFn' does not exist on type '{ nextid... Remove this comment to see the full error message
        if (io.menuFn) io.menuFn(s);
        endTurnUI(true);
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (settings.textInput) document.querySelector('#textbox').focus();
      },

      typewriterEffect(data: any) {
        if (!data.position) {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#output').innerHTML += `<${data.tag} id="n${data.id}" class=\"typewriter\"></${data.tag}>`;
          data.position                                = 0;
          data.text                                    = Quest.Text.processText(data.text, data.params);
        }
        const el = document.querySelector(`#n${data.id}`);
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        el.innerHTML = `${data.text.slice(0, data.position)}<span class="typewriter-active">${data.text.slice(data.position, data.position + 1)}</span>`;
        data.position++;
        if (data.position <= data.text.length) {
          io.outputQueue.unshift(data);
          io.outputSuspended = true;
        }
        setTimeout(io.forceOutputFromQueue, settings.textEffectDelay);
      },

      toggleAutoScrollMode() {
        settings.autoscroll = !settings.autoscroll;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterAutoScrollToggle' does not exist on... Remove this comment to see the full error message
        if (settings.afterAutoScrollToggle) settings.afterAutoScrollToggle();
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(Quest.lang.done_msg);
        return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      },

      unscamblePick() {
        const c = String.fromCharCode(Quest.Random.rndm.int(33, 125));
        return c === '<' ? '~' : c;
      },

      toggleDarkMode() {
        settings.darkModeActive = !settings.darkModeActive;
        if (settings.darkModeActive) {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('body').classList.add('dark-body');
        } else {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('body').classList.remove('dark-body');
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterDarkToggle' does not exist on type ... Remove this comment to see the full error message
        if (settings.afterDarkToggle) settings.afterDarkToggle();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'textColour' does not exist on type '{ ne... Remove this comment to see the full error message
        if (settings.panes !== 'none') io.textColour = document.querySelector('.side-panes').style.color;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(Quest.lang.done_msg);
        return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      },

      unscrambleEffect(data: any) {
        // Set up the system
        if (!data.count) {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#output').innerHTML += `<${data.tag} id="n${data.id}" class="typewriter"></${data.tag}>`;
          data.count                                   = 0;
          data.text                                    = Quest.Text.processText(data.text, data.params);
          if (!data.pick) data.pick = io.unscamblePick;
          data.mask      = '';
          data.scrambled = '';
          for (let i = 0; i < data.text.length; i++) {
            if (data.text.charAt(i) === ' ' && !data.incSpaces) {
              data.scrambled += ' ';
              data.mask      += ' ';
            } else {
              data.scrambled += data.pick(i);
              data.mask      += 'x';
              data.count++;
            }
          }
        }

        if (data.randomPlacing) {
          let pos     = Quest.Random.rndm.int(0, data.count - 1);
          let newMask = '';
          for (let i = 0; i < data.mask.length; i++) {
            if (data.mask.charAt(i) === ' ') {
              newMask += ' ';
            } else if (pos === 0) {
              newMask += ' ';
              pos--;
            } else {
              newMask += 'x';
              pos--;
            }
          }
          data.mask = newMask;
        } else {
          data.mask = data.mask.replace('x', ' ');
        }
        data.count--;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector(`#n${data.id}`).innerHTML = io.unscambleScramble(data);
        if (data.count > 0) {
          io.outputQueue.unshift(data);
          io.outputSuspended = true;
        }
        setTimeout(io.forceOutputFromQueue, settings.textEffectDelay);
      },

      // If the element starts off displayed, you will probably needs to explicitly set display to block for it
      // otherwise this will assume it is not
      toggleDisplay(el: any) {
        if (typeof el === 'string') el = document.querySelector(el);
        el.style.display = el.style.display === 'block' ? 'none' : 'block';
      },

      toggleNarrowMode() {
        settings.narrowMode = (settings.narrowMode + 1) % 3;
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('body').classList.remove('narrow-body');
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('body').classList.remove('very-narrow-body');
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (settings.narrowMode === 1) document.querySelector('body').classList.add('narrow-body');
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        if (settings.narrowMode === 2) document.querySelector('body').classList.add('very-narrow-body');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterNarrowChange' does not exist on typ... Remove this comment to see the full error message
        if (settings.afterNarrowChange) settings.afterNarrowChange();
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(Quest.lang.done_msg);
        return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      },

      unscambleScramble(data: any) {
        let s = '';
        for (let i = 0; i < data.text.length; i++) {
          s += (data.mask.charAt(i) === ' ' ? data.text.charAt(i) : data.pick(i));
        }
        return s;
      },

      togglePlainFontMode() {
        settings.plainFontModeActive = !settings.plainFontModeActive;
        if (settings.plainFontModeActive) {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('body').classList.add('plain-font-body');
        } else {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('body').classList.remove('plain-font-body');
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterPlainFontToggle' does not exist on ... Remove this comment to see the full error message
        if (settings.afterPlainFontToggle) settings.afterPlainFontToggle();
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(Quest.lang.done_msg);
        return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      },

      updateStatus() {
        if (settings.statusPane) {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector('#status-pane').textContent = '';
          for (const st of settings.status) {
            if (typeof st === 'string') {
              if (Quest.World.player[st] !== undefined) {
                let s = `<tr><td width="${settings.statusWidthLeft}">${Quest.Utilities.sentenceCase(st)}</td>`;
                s    += `<td width="${settings.statusWidthRight}">${Quest.World.player[st]}</td></tr>`;
                // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
                document.querySelector('#status-pane').innerHTML += s;
              }
            } else if (typeof st === 'function') {
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              document.querySelector('#status-pane').innerHTML += `<tr>${st()}</tr>`;
            }
          }
        }

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'toolbar' does not exist on type '{ perfo... Remove this comment to see the full error message
        if (settings.toolbar) {
          io.createToolbar();
        }
      },

      updateUIItems() {
        if (settings.panes === 'none' || !settings.inventoryPane) {
          return;
        }
        for (const inv of settings.inventoryPane) {
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector(`#${inv.alt}`).textContent = '';
          inv.hasContent                                    = false;
        }

        io.currentItemList = [];
        for (const key in Quest.World.w) {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const item = Quest.World.w[key];
          for (const inv of settings.inventoryPane) {
            const loc = inv.getLoc ? inv.getLoc() : null;
            if (inv.test(item) && !item.inventorySkip) {
              // ts-error-fixed ts-migrate(2339) FIXME: Property 'appendItem' does not exist on type '{ ne... Remove this comment to see the full error message
              io.appendItem(item, inv.alt, loc, false, inv.highlight ? inv.highlight(item) : 0);
              inv.hasContent = true;
            }
          }
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'additionalInv' does not exist on type '{... Remove this comment to see the full error message
        if (settings.additionalInv) settings.additionalInv();
        for (const inv of settings.inventoryPane) {
          if (!inv.hasContent && inv.noContent) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            const s = Quest.Text.processText(inv.noContent);
            // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.querySelector(`#${inv.alt}`).innerHTML = `<div class="item-nothing">${s}</div>`;
          }
        }
        for (const key in settings.customPaneFunctions) {
          const el = document.querySelector(`#${key}`);
          if (!el) return;
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const html   = settings.customPaneFunctions[key]();
          el.innerHTML = html;
        }
        io.clickItem('');
      },

      voice: null,

      voice2: null,

      writeExit(n: any) {
        let html = `<td class="compass-button" title="${Quest.lang.exit_list[n].name}">`;
        html    += `<span class="compass-button" id="exit-${Quest.lang.exit_list[n].name}`;
        html    += `" onclick="io.clickExit('${Quest.lang.exit_list[n].name}')">`;
        html    += settings.symbolsForCompass ? io.displayIconsCompass(Quest.lang.exit_list[n]) : Quest.lang.exit_list[n].abbrev;
        html    += '</span></td>';
        return html;
      },
    };
  }
}
