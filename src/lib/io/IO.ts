/* eslint-disable sonarjs/cognitive-complexity */
import { noop }                                   from 'lodash';
import { Quest, QuestClass }                      from '../../types/quest';
import {
  getNodeById, getNodeByQuery, getNodesByQuery,
} from '../../components/lib/dom';
import { log, error, trace } from '../logger';
import { IoState }           from './IoState';
import {
  allowedHtmlAttrs, escapeCodes, MARGIN_LEFT,
  MARGIN_RIGHT, QUEST_IMAGE, SIDE_PANES,
  STATUS_PANE,
  THeading, TPrintData,
} from './types';
import {
  ICharacter, IItem, ITextParams, TItemState,
} from '../../types/text';
import { IExitList }       from '../../types/iquest';
import { IoLib }           from './lib';
import { DEFINITE, WORLD } from '../../types/enums';

export class IO extends IoState {
  constructor(data: Partial<IO> = {}, quest: QuestClass = Quest) {
    super(data, quest);
  }

  ambient(filename: string, volume: number) {
    // log(this.settings.ssFolder)
    return this.#msg(
      'Your browser does not support the <code>audio</code> element.',
      {},
      { action: 'ambient', name: filename, volume },
    );
  }

  // @DOC
  // Clears the screen.
  clearScreen() {
    this.#addToOutputQueue({ action: 'clear' });
  }

  // @DOC
  // Output a message from the user
  // Does not use the text processor.
  commentmsg(s: string) {
    this.#msg(s, {}, { cssClass: 'comment', tag: 'p' });
    return false;
  }

  // @DOC
  // Output a debug message.
  // Debug messages are ignored if DEBUG is false.
  // You should also consider using `` when debugging; it gives a message in the console,
  // and outputs objects and array far better.
  //
  // This bypasses the normal output system. It will not wait for other text to be output (for example
  // after wait). During unit testing, error messages will be output to screen as they occur.
  // It does not use the text processor.
  debugmsg(s: string) {
    if (this.settings.playMode === 'dev' || this.settings.playMode === 'meta') {
      this.print({
        cssClass: 'debug',
        id:       this.nextid,
        tag:      'pre',
        text:     s,
      });
      this.nextid += 1;
    }
  }

  // @DOC
  // Draw an image in the main window, embedded in the text.
  // This uses SVG, which is a standard web drawing system.
  // The first and second parameters are the width and height of the image.
  // The third parameter is an array of strings, each element being an SVG primitive.
  // The image will be added to the output queue in the same way text is.
  draw(width: number, height: number, data: string[] = [], options: IExitList = {}) {
    // log(options)
    let s = `<svg width="${width}" height="${height}" viewBox="`;
    s    += options.x !== undefined ? `${options.x} ${options.y}` : '0 0';
    s    += ` ${width} ${height}" `;
    if (options.background) {
      s += `style="background:${options.background}" `;
    }
    s += 'xmlns="http://www.w3.org/2000/svg">';
    s += `${data.join('')}</svg>`;
    if (this.settings.reportAllSvg) {
      log(s.replace(/></g, '>\n<'));
    }
    if (options.destination) {
      getNodeByQuery(`${options.destination}`).innerHTML = s;
    } else {
      this.rawPrint(s);
    }
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
  errormsg(s: string, suppressTrace = false): boolean {
    if (this.test.errorOutput !== undefined) {
      // This is an expected error in a unit test
      this.test.errorOutput.push(s);
      return false;
    }

    return this.printError(
      s,
      new Error('error state caught by QuestJS runtime'),
      suppressTrace,
    );
  }

  // @DOC
  // Just the same as msg, but adds the "failed" CSS class. This allows failed command responses to be differentiated.
  // Returns the value FAILED, allowing commands to give a message and give up
  //     if (notAllowed) return failedmsg("That is not allowed.")
  failedmsg(s: string, params: ITextParams = {}) {
    this.#msg(s, params, { cssClass: 'default-p failed', tag: 'p' });
    return WORLD.FAILED;
  }

  // @DOC
  // Just the same as msg, but adds the "failed" CSS class. This allows failed command responses to be differentiated.
  // Returns the value false, allowing commands to give a message and give up
  //     if (notAllowed) return falsemsg("That is not allowed.")
  falsemsg(s: string, params: ITextParams = {}) {
    this.#msg(s, params || {}, { cssClass: 'default-p failed', tag: 'p' });
    return false;
  }

  // @DOC
  // Adds a horizontal rule to the output.
  hr() {
    this.rawPrint('<hr/>');
  }

  image(filename: string, width: number, height: number) {
    const src = filename.includes('/')
      ? filename
      : this.settings.imagesFolder + filename;
    return this.#msg(
      '',
      {},
      {
        action:      'output',
        cssClass:    'centred',
        destination: QUEST_IMAGE,
        height,
        printBlank:  true,
        src,
        tag:         'img',
        width,
      },
    );
  }

  // Called from scriptOnLoad in _settings.js, if there are no more scripts to load
  init() {
    this.settings.performanceLog('Start onload');
    this.#createPanes();
    if (this.settings.playMode === 'play') {
      window.oncontextmenu = () => false;
    }
    getNodeByQuery('fileDialog').onchange = this.saveLoad.loadGameAsFile;

    document.addEventListener('keydown', (event) => {
      if (this.keydownFunction) {
        this.keydownFunction(event);
        // cancel?
        return;
      }
      let keycode: string;
      if (event.key !== undefined) {
        keycode = event.key;
      } else if (event.keyCode !== undefined) {
        keycode = `${event.keyCode ? event.keyCode : event.which}`;
      }
      if (this.settings.customKeyResponses
        && (this.settings.customKeyResponses(keycode, event))) {
        return;
      }
      for (const exit of this.lang.exit_list) {
        if (exit.key && exit.key === keycode) {
          this.#msgInputText(exit.name);
          this.parser.parse(exit.name);
          getNodeByQuery<HTMLInputElement>('textbox').value = '';
          event.stopPropagation();
          event.preventDefault();
          return;
        }
      }
      if (keycode === '123' && this.settings.playMode === 'play') {
        return;
      }
      if (
        event.ctrlKey
        && event.shiftKey
        && keycode === '73'
        && this.settings.playMode === 'play'
      ) {
        return;
      }
      if (
        event.ctrlKey
        && event.shiftKey
        && keycode === '74'
        && this.settings.playMode === 'play'
      ) {
        return;
      }
      const tb = getNodeByQuery<HTMLTextAreaElement>('textbox');
      if (keycode === '13') {
        // enter
        if (
          event.ctrlKey
          && (this.settings.playMode === 'dev' || this.settings.playMode === 'beta')
        ) {
          this.parser.parse('script show');
        } else {
          const s = tb.value;
          this.#msgInputText(s);
          if (s) {
            if (
              this.savedCommands[this.savedCommands.length - 1] !== s
              && !this.doNotSaveInput
            ) {
              this.savedCommands.push(s);
            }
            this.savedCommandsPos = this.savedCommands.length;
            this.parser.parse(s);
            if (this.doNotEraseLastCommand) {
              this.doNotEraseLastCommand = false;
            } else {
              tb.value = '';
            }
          }
        }
      }
      if (keycode === '38') {
        // up arrow
        this.savedCommandsPos -= 1;
        if (this.savedCommandsPos < 0) {
          this.savedCommandsPos = 0;
        }
        tb.value = this.savedCommands[this.savedCommandsPos];
        if (tb.setSelectionRange) {
          setTimeout(() => {
            tb.setSelectionRange(9999, 9999);
          }, 0);
        } else if (typeof tb.selectionStart === 'number') {
          tb.selectionStart = tb.selectionEnd - tb.value.length;
        } else if (typeof (tb as any).createTextRange !== 'undefined') {
          tb.focus();
          const range = (tb as any).createTextRange();
          range.collapse(false);
          range.select();
        }
      }
      if (keycode === '40') {
        // down arrow
        this.savedCommandsPos += 1;
        if (this.savedCommandsPos >= this.savedCommands.length) {
          this.savedCommandsPos = this.savedCommands.length - 1;
        }
        tb.value = this.savedCommands[this.savedCommandsPos];
      }
      if (keycode === '27') {
        // ESC
        tb.value = '';
      }
      if (
        keycode === '96'
        && (this.settings.playMode === 'dev' || this.settings.playMode === 'beta')
      ) {
        if (event.ctrlKey && event.altKey) {
          this.parser.parse('wt b');
        } else if (event.altKey) {
          this.parser.parse('wt a');
        } else if (event.ctrlKey) {
          this.parser.parse('wt c');
        } else {
          this.parser.parse('test');
        }
        setTimeout(() => {
          tb.value = '';
        }, 1);
      }
      if (keycode === '90' && event.ctrlKey) {
        this.parser.parse('undo');
      }
    });
    if (this.settings.panes !== 'none') {
      this.textColour = getNodeByQuery(SIDE_PANES, '.', false).style.color;
    }
    /* if (this.settings.soundFiles) {
      const main = getNodeByQuery('main')
      for (let el of this.settings.soundFiles) {
        main.innerHTML += '<audio id="' + el + '" src="' + this.settings.soundsFolder + el + this.settings.soundsFileExt + '"/>'
      }
    } */
    this.settings.performanceLog('UI built');
    this.#endTurnUI(true);
    this.settings.performanceLog('endTurnUI completed');

    if (getNodeByQuery('loading')) {
      getNodeByQuery('loading').remove();
    }
    if (!this.settings.suppressTitle) {
      this.#msgHeading(this.settings.title, 2);
    }
    if (this.settings.subtitle) {
      this.#msgHeading(this.settings.subtitle, 3);
    }
    this.#setTitleAndInit(this.settings.title);
    if (this.settings.playMode === 'beta') {
      this.lang.betaTestIntro();
    }
    this.settings.performanceLog('Title/intro printed');

    if (this.settings.startingDialogEnabled) {
      this.settings.setUpDialog();
      setTimeout(() => {
        if (this.settings.startingDialogInit) {
          this.settings.startingDialogInit();
        }
      }, 10);
    } else {
      if (this.settings.startingDialogAlt) {
        this.settings.startingDialogAlt();
      }
      this.settings.delayStart = false;
      this.world.begin();
    }
    this.settings.performanceLog('End onload');
  }

  // @DOC
  // Output a meta-message - a message to inform the player about something outside the game Quest.World.world,
  // such as hints and help messages.
  // The string will first be passed through the text processor.
  // Additional data can be put in the optional params dictionary.
  // During unit testing, messages will be saved and tested
  metamsg(s: string, params: ITextParams = {}) {
    this.#msg(s, params, { cssClass: 'meta', tag: 'p' });
  }

  // @DOC
  // Output a standard message, as an HTML paragraph element (P).
  // The string will first be passed through the text processor.
  // Additional data can be put in the optional params dictionary.
  // You can specify a CSS class to use.
  // During unit testing, messages will be saved and tested
  // If the string starts with a hash and no cssClass is given the line will be printed as a level 4 heading.
  // A vertical bar will be taken as a line break.
  msg(s: string, params: ITextParams = {}, cssClass = '') {
    if (typeof s !== 'string') {
      error('Trying to print with "msg", but got this instead of a string:');
      error(s);
      const err = new Error();
      log(err.stack);
      throw new Error('Bad string for msg()');
    }

    if (/^#/.test(s) && !cssClass) {
      const ms = s.replace(/^#/, '');
      return this.#msg(ms, params, { cssClass: 'default-h default-h4', tag: 'h4' });
    }
    return this.#msg(s, params, { cssClass, tag: 'p' });
  }

  // @DOC
  // As `msg`, but handles an array of strings. Each string is put in its own HTML paragraph,
  // and the set is put in an HTML division (DIV). The cssClass is applied to the division.
  msgDiv(arr: string[], params: ITextParams = {}, cssClass = '') {
    let s = '';
    for (const item of arr) {
      s += `  <p>${item}</p>\n`;
    }
    return this.#msg(s, params, { cssClass, tag: 'div' });
  }

  // @DOC
  // Output a message from the parser indicating the input text could not be parsed.
  // During unit testing, messages will be saved and tested.
  // Does not use the text processor.
  parsermsg(s: string) {
    this.#msg(s, {}, { cssClass: 'parser', tag: 'p' });
    return false;
  }

  // @DOC
  // Output a picture, as an HTML image element (IMG).
  // If width and height are omitted, the size of the image is used.
  // If height is omitted, the height will be proportional to the given width.
  // The file name should include the path. For a local image, that would probably be the images folder,
  // but it could be the web address of an image hosted elsewhere.
  picture(filename: string, width: number, height: number) {
    const src = filename.includes('/')
      ? filename
      : this.settings.imagesFolder + filename;
    return this.#msg(
      '',
      {},
      {
        action:     'output',
        height,
        printBlank: true,
        src,
        tag:        'img',
        width,
      },
    );
  }

  print(inp: TPrintData | string): string {
    const data: TPrintData = (typeof inp === 'string') ? { html: inp } : inp;
    let html               = data.html || data.text || '';
    let keepSL: boolean;
    let slID: string;

    if (!html && this.sameLine === false) {
      html = `<${data.tag} id="n${data.id}"`;
      if (data.cssClass) html += ` class="${data.cssClass}"`;
      for (const s of allowedHtmlAttrs) {
        if (data[s]) {
          html += ` ${s}="${data[s]}"`;
        }
      }
      html += `>${data.text}</${data.tag}>`;
    }
    if (data.destination) {
      const d     = getNodeByQuery(data.destination, false);
      d.innerHTML = html;
    } else {
      keepSL = html.indexOf('@@OUTPUTTEXTNOBR@@') > -1;
      slID   = `n${data.id - 1}`;
      if (keepSL === true) {
        html = html.replace('@@OUTPUTTEXTNOBR@@', '');
      }
      if (this.sameLine === true) {
        const last      = getNodeById(slID);
        last.innerHTML += html;
        this.sameLine   = false;
      } else {
        const o      = getNodeByQuery('output', false);
        o.innerHTML += html;
      }
      this.sameLine = keepSL;
    }
    return html;
  }

  // This is at the top of the file so authors know to ignore stack trace enties for lines 1 to 15 in _io.js
  printError(msg: string, err: Error = new Error(), suppressTrace = false): boolean {
    error(`ERROR: ${msg}`);
    if (this.world.isCreated) {
      this.print({ cssClass: 'error', tag: 'p', text: this.lang.error });
      this.saveLoad.transcriptAppend({
        cssClass: 'error',
        stack:    err.stack,
        text:     msg,
      });
    }
    if (suppressTrace) {
      return false;
    }
    const errMsg = ['Look through the trace below to find the offending code.'];
    errMsg.push('The first entry in the list may be "errormsg" in the file "_io.js", which is me so can be ignored.');
    errMsg.push('The next will the code that detected the error and called the "errormsg" message.');
    errMsg.push('You may need to look further down to find the root cause, especially for a text process issue.');
    log(errMsg.join(' '));
    log(err);
    return false;
  }

  // @DOC
  // Adds the given string to the print queue.
  // This allows you to add any HTML you want to the output queue.
  rawPrint(s: string) {
    return this.#msg(s);
  }

  // @DOC
  // Plays a sound. The filename must include the extension, and the file should be in the folder specified by audioFolder (defaults to the game folder).
  sound(filename: string) {
  // log(this.settings.ssFolder)
    return this.#msg(
      'Your browser does not support the <code>audio</code> element.',
      {},
      { action: 'sound', name: filename },
    );
  }

  // @DOC
  // Plays a video. The filename must include the extension, and the file should be in the folder specified by audioFolder (defaults to the game folder).
  // There are some issues about codecs and formats; use at your discretion.
  video(filename: string) {
    // log(this.settings.ssFolder)
    return this.#msg(
      'Your browser does not support the <code>video</code> element.',
      {},
      {
        action:   'output',
        autoplay: true,
        src:      `${this.settings.videoFolder}/${filename}`,
        tag:      'video',
      },
    );
  }

  // @DOC
  // Stops outputting whilst waiting for the player to click.
  wait(delay: number, text: string, func = noop) {
    if (this.test.testing || this.settings.walkthroughInProgress) {
      return;
    }
    if (delay === undefined) {
      this.#addToOutputQueue({
        action:   'wait',
        cssClass: 'continue',
        func,
        text,
      });
    } else {
      this.#addToOutputQueue({
        action:   'delay',
        cssClass: 'continue',
        delay,
        func,
        text,
      });
    }
  }

  // Add the item to the DIV named htmlDiv
  // The item will be given verbs from its attName attribute
  #appendItem(
    item: IItem,
    htmlDiv: TItemState | string,
    loc: string,
    isSubItem = false,
    highlight = false,
  ) {
    const el = getNodeByQuery(`${htmlDiv}`);
    this.currentItemList.push(item.name);

    el.innerHTML += this.#getItemHtml(item, loc, isSubItem, highlight);

    if (item.container && !item.closed) {
      if (typeof item.getContents !== 'function') {
        log('item flagged as container but no getContents function:');
        log(item);
      }
      const contents = item.getContents(this.world.SIDE_PANE);
      for (const c of contents) {
        this.#appendItem(c, htmlDiv, item.name, true);
      }
    }
  }

  #addToOutputQueue(data: TPrintData) {
    data.id = this.nextid;
    this.outputQueue.push(data);
    this.nextid += 1;
    this.#outputFromQueue();
  }

  // @DOC
  // Adds a blank line to the output.
  #blankLine() {
    this.rawPrint('&nbsp;');
  }

  #calcMargins() {
    // How much space do we need for images and map?
    let mapImageWidth = 0;
    if (typeof globalThis.map !== 'undefined' && (!this.settings.hideMap)) {
      mapImageWidth = this.settings.mapWidth;
    }
    if (typeof globalThis.imagePane !== 'undefined'
      && (!this.settings.hideImagePane && this.settings.imageWidth > mapImageWidth)) {
      mapImageWidth = this.settings.imageWidth;
    }
    const main = getNodeByQuery('main');
    if (!main) {
      return;
    }
    main.style.marginLeft  = '40px';
    main.style.marginRight = '40px';
    // Do we show the side panes?
    if (this.settings.panes !== 'none') {
      const margin = this.settings.panes === 'left' ? MARGIN_LEFT : MARGIN_RIGHT;
      const panes  = getNodeByQuery('panes');
      if (this.#resizePanesListener.matches) {
        // If media query matches
        // hide sidepane
        main.style[margin]  = `${this.mainGutter}px`;
        panes.style.display = 'none';
      } else {
        // show sidepane
        main.style[margin]  = `${this.panesWidth + this.mainGutter}px`;
        panes.style.display = 'block';
      }
    }

    // Note: As of Jan/22 this takes account of this.settings.hideMap - but not of whether
    // the image should be hidden
    let margin = this.settings.panes === 'right' ? MARGIN_LEFT : MARGIN_RIGHT;
    if (this.settings.mapImageSide) {
      margin = this.settings.mapImageSide === 'left' ? MARGIN_LEFT : MARGIN_RIGHT;
    }
    if (this.#resizeMapImageListener.matches || this.settings.hideMap) {
      // If media query matches
      // hide image
      main.style[margin]                        = `${this.mainGutter}px`;
      getNodeByQuery(QUEST_IMAGE).style.display = 'none';
      getNodeByQuery('quest-map').style.display = 'none';
    } else {
      // show image
      main.style[margin]                        = `${mapImageWidth + this.mainGutter}px`;
      getNodeByQuery(QUEST_IMAGE).style.display = 'block';
      getNodeByQuery('quest-map').style.display = 'block';
    }
  }

  #clickItem(itemName = '') {
    if (this.disableLevel) {
      return;
    }
    // duplicated items would toggle twice
    const uniq = [...new Set(this.currentItemList)];
    for (const item of uniq) {
      for (const el of getNodesByQuery(`${item}-actions`)) {
        if (item === itemName) {
          el.style.display = el.style.display === 'none' ? 'block' : 'none';
        } else {
          el.style.display = 'none';
        }
      }
    }
  }

  // Creates the panes on the left or right
  // Should only be called once, when the page is first built
  #createPanes() {
    if (!['right', 'left', 'none'].includes(this.settings.panes)) {
      error(
        `ERROR: Your settings.panes value is "${this.settings.panes}". It must be one of "right", "left" or "none" (all lower-case). It is probably set in the file setiings.js.`,
      );
      return;
    }

    getNodeByQuery('input')
      .innerHTML = `<span id="cursor">${this.settings.cursor}</span><input type="text" name="textbox" id="textbox" />`;
    if (!this.settings.textInput) {
      getNodeByQuery('input').style.display = 'none';
    }

    if (this.settings.panes === 'none') {
      return;
    }

    let html = '';

    if (this.settings.compassPane) {
      html += '<div class="pane-div">';
      html += '<table id="compass-table">';
      for (let i = 0; i < 3; i += 1) {
        html += '<tr>';
        html += this.#writeExit(0 + 5 * i);
        html += this.#writeExit(1 + 5 * i);
        html += this.#writeExit(2 + 5 * i);
        html += '<td></td>';
        html += this.#writeExit(3 + 5 * i);
        html += this.#writeExit(4 + 5 * i);
        html += '</tr>';
      }
      html += '</table>';
      html += '</div>';
    }

    if (this.settings.statusPane) {
      html += '<div class="pane-div">';
      html += `<h4 class="side-pane-heading">${this.settings.statusPane}</h4>`;
      html += '<table id="status-pane">';
      html += '</table>';
      html += '</div>';
    }

    if (this.settings.inventoryPane) {
      for (const inv of this.settings.inventoryPane) {
        html += '<div class="pane-div">';
        html += `<h4 class="side-pane-heading">${inv.name}</h4>`;
        html += `<div class="item-list" id="${inv.alt}">`;
        html += '</div>';
        html += '</div>';
      }
    }

    html += '<div class="pane-div-finished">';
    html += this.lang.game_over_html;
    html += '</div>';
    html += '</div>';

    const el     = document.createElement('div');
    el.innerHTML = html;
    el.setAttribute('id', 'panes');
    el.classList.add(SIDE_PANES);
    el.classList.add(`side-panes-${this.settings.panes}`);
    el.classList.add('panes-narrow');

    const referenceNode = getNodeByQuery('main');
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);

    this.panesWidth = getNodeByQuery(SIDE_PANES, '.', false).clientWidth;

    if (this.settings.customUI) {
      this.settings.customUI();
    }
  }

  #enable(level = 1) {
    if (!this.disableLevel || level > this.disableLevel) {
      return;
    }
    this.disableLevel                     = 0;
    getNodeByQuery('input').style.display = 'block';
    if (this.settings.panes !== 'none') {
      this.#setCssByClass('compass-button .dark-body', 'color', this.textColour);
      this.#setCssByClass('item', 'color', this.textColour);
      this.#setCssByClass('item-action', 'color', this.textColour);
    }
  }

  // This should be called after each turn to ensure we are at the end of the page and the text box has the focus
  #endTurnUI(update: boolean) {
    if (this.settings.panes !== 'none' && update) {
      // set the this.lang.exit_list
      for (const exit of this.lang.exit_list) {
        const el = getNodeByQuery(`exit-${exit.name}`);
        if (!el) {
          // eslint-disable-next-line no-continue
          continue;
        }
        if (
          Quest.World.currentLocation.hasExit(exit.name, {
            excludeScenery: true,
          })
          || exit.type === 'nocmd'
        ) {
          el.style.display = 'block';
        } else {
          el.style.display = 'none';
        }
      }
      this.#updateStatus();
    }
    for (const o of this.modulesToUpdate) {
      o.update(update);
    }
    this.#updateUIItems();
    if (this.settings.updateCustomUI) {
      this.settings.updateCustomUI();
    }

    this.#scrollToEnd();
    // give focus to command bar
    if (this.settings.textInput) {
      const tb = getNodeByQuery('textbox');
      tb?.focus();
    }
  }

  #getIcon(item: IItem) {
    if (!this.settings.iconsFolder) {
      return '';
    }
    if (!item.icon) {
      return '';
    }
    if (item.icon() === '') {
      return '';
    }
    const mode = this.settings.darkModeActive ? 'l_' : 'd_';
    return `<img src="${this.settings.iconsFolder}${mode}${item.icon()}.png" />`;
  }

  #getItemHtml(item: IItem, loc: string, isSubItem: boolean, highlight = false) {
    if (typeof item.getVerbs !== 'function') {
      return this.errormsg(`Item with bad getVerbs: ${item.name}`);
    }
    const verbList = item.getVerbs(loc);
    if (verbList === undefined) {
      this.errormsg(`No verbs for ${item.name}`);
      // TODO: what was this?
      // item;
    }

    const hl   = highlight ? ` highlight-item${highlight}` : '';
    const si   = isSubItem ? ' sub-item' : '';
    const la   = item.getListAlias(loc);
    const icon = this.#getIcon(item);
    let s      = `<div id="${item.name}-item"><p class="item${si}${hl}"`;
    s         += `onclick="clickItem('${item.name}')">${icon}${la}</p></div>`;
    for (const v of verbList) {
      const verb = (typeof v === 'string') ? { action: v, name: v } : v;
      s         += `<div class="${item.name}-actions item-action`;
      if (verb.style) {
        s += ` ${verb.style}`;
      }
      s += `" onclick="clickItemAction('${item.name}', '${verb.action}')">`;
      s += verb.name;
      s += '</div>';
    }
    return s;
  }

  #disable(level = 1) {
    // log('disable ' + level + ' (' + disableLevel + ')')
    if (level <= this.disableLevel) {
      return;
    }
    this.disableLevel = level;
    if (level !== 2) {
      getNodeByQuery('input').style.display = 'none';
    }
    this.#setCssByClass('compass-button .dark-body', 'color', '#808080');
    this.#setCssByClass('item', 'color', '#808080');
    this.#setCssByClass('item-action', 'color', '#808080');
  }

  #msg(s: string, params: ITextParams = {}, o: TPrintData = {}) {
    const options: TPrintData = { tag: 'p', ...o };
    if (!options.cssClass) {
      options.cssClass = `default-${options.tag.toLowerCase()}`;
    }
    const processed = params
      ? this.text.processText(s, params).trim()
      : s.trim();
    if (processed === '' && !options.printBlank) {
      return;
    }
    for (let line of processed.split('|')) {
      for (const el of Object.values(escapeCodes)) {
        line = line.replace(RegExp(`@@@${el}@@@`, 'ig'), escapeCodes[el]);
      }
      if (this.settings.convertDoubleDash && !this.test.testing) {
        line = line.replace(/ {2}-= 1 /g, ' &mdash; ');
      }
      const data: TPrintData = { ...options };
      data.text              = line;
      if (!data.action) {
        data.action = 'output';
      }

      if (this.test.testing) {
        const { test } = this;
        if (test.ignoreHTML) {
          line = line.replace(/(<([^>]+)>)/gi, '');
        }
        if (test.fullOutputData) {
          test.testOutput.push(data);
        } else {
          test.testOutput.push(line);
        }
      } else {
        this.#addToOutputQueue(data);
      }
    }
  }

  #msgBlankLine() {
    return this.#msg('', {}, { printBlank: true, tag: 'p' });
  }

  // @DOC
  // As `msg`, but the string is presented as an HTML heading (H1 to H6).
  // The level of the heading is determined by `level`, with 1 being the top, and 6 the bottom.
  // Headings are ignored during unit testing.
  #msgHeading(s: string, level: THeading, params: ITextParams = {}) {
    this.#msg(s, params || {}, {
      cssClass: `default-h default-h${level}`,
      tag:      `h${level}`,
    });
  }

  #msgInputText(s: string) {
    if (this.saveLoad.transcript) {
      this.saveLoad.transcriptWalkthrough.push(`    "${s}",`);
    }
    if (!this.settings.cmdEcho || s === '') {
      return;
    }
    getNodeByQuery('output').innerHTML += `<p id="n${this.nextid}" class="input-text">&gt; ${s}</p>`;
    this.nextid                        += 1;
    this.#speak(s, true);
  }

  // @DOC
  // As `msg`, but handles an array of strings in a list. Each string is put in its own HTML list item (LI),
  // and the set is put in an HTML order list (OL) or unordered list (UL), depending on the value of `ordered`.
  #msgList(arr: string[], ordered: boolean, params: ITextParams = {}, cssClass = '') {
    let s = '';
    for (const item of arr) {
      s += `  <li>${item}</li>\n`;
    }
    return this.#msg(s, params || {}, { cssClass, tag: ordered ? 'ol' : 'ul' });
  }

  // @DOC
  // Output a standard message, as an HTML pre-formaed element (PRE).
  // The string will first be passed through the text processor.
  // Additional data can be put in the optional params dictionary.
  // During unit testing, messages will be saved and tested
  #msgPre(s: string, params: ITextParams = {}, cssClass = '') {
    if (typeof s !== 'string') {
      error('Trying to print with "msgPre", but got this instead of a string:');
      error(s);
      trace();
      throw new Error('Bad string for msgPre()');
    }
    return this.#msg(s, params, { cssClass, tag: 'pre' });
  }

  // @DOC
  // As `msg`, but handles an array of arrays of strings in a list. This is laid out in an HTML table.
  // If `headings` is present, this array of strings is used as the column headings.
  #msgTable(arr: string[], headings: string[] = [], params: ITextParams = {}, cssClass = '') {
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
        s += `    <td>${this.text.processText(item, params).trim()}</td>\n`;
      }
      s += '  </tr>\n';
    }
    return this.#msg(s, params, { cssClass, tag: 'table' });
  }

  #outputFromQueue() {
    if (this.outputSuspended) {
      return;
    }
    if (this.outputQueue.length === 0 && (!this.disableTextFunction)) {
      this.#enable();
      return;
    }

    // if (this.settings.textInput) getNodeByQuery('input').style.display = 'block'
    const data: TPrintData = this.outputQueue.shift();
    if (data?.action === 'wait') {
      this.#disable();
      this.outputSuspended = true;
      // if (this.settings.textInput) getNodeByQuery('input').style.display = 'none'
      data.tag     = 'p';
      data.onclick = 'unpause()';
      if (!data.text) {
        data.text = this.lang.click_to_continue;
      }
      this.print(data);
    }
    if (data?.action === 'delay') {
      this.#disable();
      this.outputSuspended = true;
      if (data.text) {
        data.tag = 'p';
        this.print(data);
      }
      setTimeout(this.#unpause, data.delay * 1000);
    }
    if (data?.action === 'output') {
      const html = this.print(data);
      this.#speak(data.text);
      this.saveLoad.transcriptAppend(data);
      this.#outputFromQueue();
    }
    if (data?.action === 'func' && (data.func())) {
      this.#outputFromQueue();
    }
    if (data?.action === 'effect') {
      this.#disable();
      // need a way to handle spoken and transcript here
      data.effect(data);
    }
    if (data?.action === 'clear') {
      getNodeByQuery('output').textContent = '';
      this.#outputFromQueue();
    }
    if (data?.action === 'sound' && (!this.settings.silent)) {
      const el       = getNodeById<HTMLAudioElement>(data.name);
      el.currentTime = 0;
      el.play();
    }
    if (data?.action === 'ambient') {
      for (const el of document.getElementsByTagName('audio')) {
        el.pause();
      }
      if (!this.settings.silent && data.name) {
        const el       = getNodeById<HTMLAudioElement>(data.name);
        el.currentTime = 0;
        el.loop        = true;
        el.play();
        if (data.volume) {
          el.volume = data.volume / 10;
        }
      }
    }
    this.#scrollToEnd();
    if (this.settings.textInput) {
      getNodeByQuery('textbox').focus();
    }
  }

  get #resizeMapImageListener() {
    return window.matchMedia(
      `(max-width: ${this.settings.mapAndImageCollapseAt}px)`,
    );
  }

  get #resizePanesListener() {
    return window.matchMedia(
      `(max-width: ${this.settings.panesCollapseAt}px)`,
    );
  }

  #scrollToEnd() {
    if (this.settings.autoscroll) {
      window.scrollTo(0, getNodeById('main').scrollHeight);
    }
  }

  #setCssByClass(name: string, prop = 'color', val = this.textColour) {
    for (const el of getNodesByQuery(`${name}`)) {
      el.style[prop] = val;
    }
  }

  #setTitleAndInit(s: string) {
    document.title = s;
    for (const o of this.modulesToInit) {
      o.init();
    }
    this.#calcMargins();
  }

  #speak(str: string, altVoice = false) {
    if (!this.spoken) return;
    if (!this.voice) {
      this.voice = this.synth.getVoices()
        .find((el) => /UK/.test(el.name) && /Female/.test(el.name));
      if (!this.voice) {
        [this.voice] = this.synth.getVoices();
      }
    }
    if (!this.voice2) {
      this.voice2 = this.synth
        .getVoices()
        .find((el) => /UK/.test(el.name) && /Male/.test(el.name));
      if (!this.voice2) {
        [this.voice2] = this.synth.getVoices();
      }
    }
    const utterEvent  = (event: SpeechSynthesisEvent) => {
      noop(event);
      // log('SpeechSynthesisUtterance.onend');
      // error('SpeechSynthesisUtterance.onerror: ' + event.name);
    };
    const utterThis   = new SpeechSynthesisUtterance(str);
    utterThis.onend   = utterEvent;
    utterThis.onerror = utterEvent;
    utterThis.voice   = altVoice ? this.voice2 : this.voice;
    // I think these can vary from 0 to 2
    utterThis.pitch = 1;
    utterThis.rate  = 1;
    this.synth.speak(utterThis);
  }

  // @DOC
  // Clears the screen.
  #trigger(func = noop) {
    this.#addToOutputQueue({ action: 'func', func });
  }

  #unpause() {
    getNodeByQuery('continue').remove();
    this.outputSuspended = false;
    this.#outputFromQueue();
    if (this.settings.textInput) {
      getNodeByQuery('textbox').focus();
    }
  }

  #updateStatus() {
    if (this.settings.statusPane) {
      getNodeByQuery(STATUS_PANE).textContent = '';
      for (const st of this.settings.status) {
        if (typeof st === 'string') {
          if (this.player[st] !== undefined) {
            const wl                               = this.settings.statusWidthLeft;
            const wr                               = this.settings.statusWidthRight;
            let s                                  = `<tr><td width="${wl}">${this.util.sentenceCase(st)}</td>`;
            s                                     += `<td width="${wr}">${this.player[st]}</td></tr>`;
            getNodeByQuery(STATUS_PANE).innerHTML += s;
          }
        } else if (typeof st === 'function') {
          getNodeByQuery(STATUS_PANE).innerHTML += `<tr>${st()}</tr>`;
        }
      }
    }

    if (this.settings.toolbar) {
      // TODO: return and figure out where this is supposed to be used
      // new IoToolbar().createToolbar();
    }
  }

  #updateUIItems() {
    if (this.settings.panes === 'none' || !this.settings.inventoryPane) {
      return;
    }
    for (const inv of this.settings.inventoryPane) {
      getNodeByQuery(`${inv.alt}`).textContent = '';
      inv.hasContent                           = false;
    }

    this.currentItemList = [];
    for (const item of Object.values(this.w)) {
      for (const inv of this.settings.inventoryPane) {
        const loc = inv.getLoc ? inv.getLoc() : null;
        if (inv.test(item) && !item.inventorySkip) {
          this.#appendItem(
            item,
            inv.alt,
            loc,
            false,
            inv.highlight ? inv.highlight(item) : false,
          );
          inv.hasContent = true;
        }
      }
    }
    if (this.settings.additionalInv) {
      this.settings.additionalInv();
    }
    for (const inv of this.settings.inventoryPane) {
      if (!inv.hasContent && inv.noContent) {
        const s = this.text.processText(inv.noContent);
        document.querySelector(
          `#${inv.alt}`,
        ).innerHTML = `<div class="item-nothing">${s}</div>`;
      }
    }
    for (const key of Object.keys(this.settings.customPaneFunctions)) {
      const el = getNodeByQuery(`${key}`);
      if (!el) {
        return;
      }
      const html   = this.settings.customPaneFunctions[key]();
      el.innerHTML = html;
    }
    this.#clickItem();
  }

  #writeExit(n: number) {
    let html = `<td class="compass-button" title="${this.lang.exit_list[n].name}">`;
    html    += `<span class="compass-button" id="exit-${this.lang.exit_list[n].name}`;
    html    += `" onclick="clickExit('${this.lang.exit_list[n].name}')">`;
    html    += this.settings.symbolsForCompass
      ? IoLib.displayIconsCompass(this.lang.exit_list[n])
      : this.lang.exit_list[n].abbrev;
    html    += '</span></td>';
    return html;
  }
}
