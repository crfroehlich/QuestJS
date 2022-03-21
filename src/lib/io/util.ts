/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { noop }              from 'lodash';
import { Quest }             from '../../types/quest';
import { getNodeByQuery } from '../../components/lib/dom';
import { log, error, trace } from '../logger';



// @DOC
// Output a standard message, but it makes the NEXT message appear on the same line as the current message. Note that the next message will not have its own params or cssClass.
export const OutputTextNoBr = (s: string, params: any = {}, cssClass = '') => {
  if (s.startsWith(' ')) {
    s = `&nbsp;${s.substring(1, s.length)}`;
  }
  if (s.endsWith(' ')) {
    s = `${s.substring(0, s.length - 1)}&nbsp;`;
  }
  msg(`@@OUTPUTTEXTNOBR@@${s}`, params, cssClass);
};


// @DOC
// Use like this:
//      showMenu('What is your favourite color?', ['Blue', 'Red', 'Yellow', 'Pink'], function(result) {
//        msg("You picked " + result + ".");
//      });
export const showMenu = (title: string, options: any = {}, fn = noop) => {
  const opts = {
    article: Quest.Utilities.DEFINITE,
    capital: true,
    noLinks: true,
  };
  input(title, options, noop, fn, (options: any) => {
    for (let i = 0; i < options.length; i += 1) {
      let s = `<a class="menu-option" onclick="menuResponse(${i})">`;
      s    += typeof options[i] === 'string'
        ? options[i]
        : Quest.lang.getName(options[i], opts);
      s    += '</a>';
      msg(s);
    }
  });
};

export const showMenuNumbersOnly = (title: string, options: any = {}, fn = noop) => {
  const opts = {
    article: Quest.Utilities.DEFINITE,
    capital: true,
    noLinks: true,
  };
  Quest.Parser.parser.overrideWith((s: any) => {
    menuResponse(s);
  });
  const disableTextFunction = (disabled: boolean) => {
    if (disabled) {
      disable(3);
      // add a keypress event handler to capture keypresses directly
      keydownFunction = (e: any) => {
        const n = parseInt(e.key, 10);
        if (!Number.isNaN(n) && n <= menuOptions.length && n !== 0) {
          Quest.Parser.parser.parse(`${n}`);
        }
        // stopping the typed character appearing in the text field is not easy...
        // stopPropagation and stopImmediatePropagation did not do it,
        // even though it seems to happen after this
        // so just delete it!
        setTimeout(() => {
          getNodeByQuery<HTMLInputElement>('textbox').value = '';
          getNodeByQuery<HTMLInputElement>('textbox').focus();
        }, 10);
      };
    } else {
      enable(5);
      // getNodeByQuery('textbox').prop('disabled', false)
      keydownFunction = noop;
    }
  };
  input(title, options, disableTextFunction, fn, (options: any) => {
    for (let i = 0; i < options.length; i += 1) {
      let s = `${i + 1
      }. <a class="menu-option" onclick="menuResponse(${i})">`;
      s    += typeof options[i] === 'string'
        ? options[i]
        : Quest.lang.getName(options[i], opts);
      s    += '</a>';
      msg(s);
    }
  });
};

export const showMenuWithNumbers = (title: string, options: any = {}, fn = noop) => {
  const opts = {
    article: Quest.Utilities.DEFINITE,
    capital: true,
    noLinks: true,
  };
  Quest.Parser.parser.overrideWith((s: any) => {
    menuResponse(s);
  });
  const disableTextFunction = (disabled: boolean) => {
    if (disabled) {
      disable(2);
    } else {
      enable();
      doNotSaveInput = false;
    }
  };
  const failFunction = (input: any) => {
    msg(`I do not understand: ${input}`);
    Quest.Utilities.runCmd(input);
    savedCommands.push(input);
  };
  doNotSaveInput     = true;
  input(
    title,
    options,
    disableTextFunction,
    fn,
    (options: any) => {
      for (let i = 0; i < options.length; i += 1) {
        let s = `${i + 1
        }. <a class="menu-option" onclick="menuResponse(${i})">`;
        s    += typeof options[i] === 'string'
          ? options[i]
          : Quest.lang.getName(options[i], opts);
        s    += '</a>';
        msg(s);
      }
    },
    failFunction,
  );
};

export const showDropDown = (title: string, options: any = {}, fn = noop) => {
  const opts = {
    article: Quest.Utilities.DEFINITE,
    capital: true,
    noLinks: true,
  };
  input(title, options, noop, fn, (options: any) => {
    let s = '<select id="menu-select" class="custom-select" style="width:400px;" ';
    s    += 'onchange="menuResponse(getDropDownText(\'menu-select\'))">';
    s    += '<option value="-1"> -= 1 Select one  -= 1</option>';
    for (let i = 0; i < options.length; i += 1) {
      s += `<option value="${i + 1}">`;
      s
        += typeof options[i] === 'string'
          ? options[i]
          : Quest.lang.getName(options[i], opts);
      s += '</option>';
    }
    msg(`${s}</select>`);
    // getNodeByQuery('menu-select').selectmenu();
    getNodeByQuery('menu-select').focus();
  });
};

export function showMenuDiag(title: string, options: any = {}, fn = noop, cssClass = '') {
  showMenuDiagTitle         = { title };
  const opts                = {
    article: Quest.Utilities.DEFINITE,
    capital: true,
    noLinks: true,
  };
  const disableTextFunction = (disabled: boolean) => {
    if (disabled) {
      disable(3);
    } else {
      enable();
      if (!Quest.Utilities.test.testing) {
        const el = getNodeByQuery('sidepane-menu');
        if (el) el.remove(); // may not exist in walk-through
      }
    }
  };

  const displayFunction = (options: any) => {
    let s = '<div id="sidepane-menu"';
    if (cssClass) s += ` class="${cssClass}"`;
    s += '>';
    if (typeof showMenuDiagTitle === 'string') {
      s += `<p class="sidepane-menu-title">${showMenuDiagTitle}</p>`;
    } else {
      s += `<h4 class="sidepane-menu-title">${showMenuDiagTitle.title}</h4>`;
      s += `<p class="sidepane-menu-title">${showMenuDiagTitle.text}</p>`;
    }
    for (let i = 0; i < options.length; i += 1) {
      s += `<p value="${i}" onclick="menuResponse(${i})" class="sidepane-menu-option">`;
      s
        += typeof options[i] === 'string'
          ? options[i]
          : Quest.lang.getName(options[i], opts);
      s += '</p>';
    }
    s                                    += '</div>';
    getNodeByQuery('body', '').innerHTML += s;
  };

  input('false', options, disableTextFunction, fn, displayFunction);

  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
}

export const showYesNoMenu = (title: string, fn = noop) => {
  showMenu(title, Quest.lang.yesNo, fn);
};

export const showYesNoMenuWithNumbers = (title: string, fn = noop) => {
  showMenuWithNumbers(title, Quest.lang.yesNo, fn);
};

export const showYesNoDropDown = (title: string, fn = noop) => {
  showDropDown(title, Quest.lang.yesNo, fn);
};

export const askText = (title: string, fn = noop) => {
  menuFn = fn;
  msg(title);
  disable(2);
  Quest.Parser.parser.overrideWith((result: any) => {
    enable();
    savedCommands.pop();
    if (savedCommandsPos > savedCommands.length) {
      savedCommandsPos = savedCommands.length;
    }
    menuFn(result);
  });
};

export const showDiag = (title: string, text: string, submitButton: HTMLElement) => {
  if (!submitButton) {
    return errormsg('Trying to use showDiag with no button');
  }
  return askDiag(
    {
      height: 600,
      text,
      title,
      width:  800,
    },
    noop,
    submitButton,
  );
};

export const askDiag = (title: TDiagText, fn: any, submitButton: HTMLElement) => {
  menuFn                    = fn;
  showMenuDiagTitle         = title;
  showMenuDiagSubmit        = submitButton;
  const disableTextFunction = (disabled: boolean) => {
    if (disabled) {
      disable(3);
    } else {
      enable();
      getNodeByQuery('sidepane-text').remove();
    }
  };

  const displayFunction = () => {
    let s = '<div id="sidepane-menu"';
    if (title.width) s += ` style="width:${title.width}px;top:100px;"`;
    s += '>';

    if (typeof title === 'string') {
      s += `<p class="sidepane-menu-title">${showMenuDiagTitle}</p>`;
    } else {
      s += `<h4 class="sidepane-menu-title">${showMenuDiagTitle.title}</h4>`;
      s += `<p class="sidepane-menu-title">${showMenuDiagTitle.text}</p>`;
    }
    if (menuFn) {
      s += '<input type="text" id="text-dialog" class="sidepane-menu-option">';
    }
    if (showMenuDiagSubmit) {
      s += '<div id="dialog-footer" style="text-align:right"><hr>';
      s += `<input type="button" onclick="textResponse()" value="${showMenuDiagSubmit}" class="sidepane-menu-button"></div>`;
    }
    s                                    += '</div>';
    getNodeByQuery('body', '').innerHTML += s;

    if (menuFn) {
      const el = getNodeById('text-dialog');
      el.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          textResponse();
        }
      });
      el.focus();
    }
  };

  input('false', [], disableTextFunction, fn, displayFunction);

  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

export const createAdditionalPane = (
  position: any,
  title: string,
  id: any,
  func = noop,
) => {
  const el = getNodeByQuery('panes');

  const div = document.createElement('div');
  div.classList.add('pane-div');
  div.innerHTML = `<h4 class="side-pane-heading">${title}</h4><div id="${id}">${func()}</div>`;
  el.insertBefore(div, el.children[position]);
  Quest.Settings.settings.customPaneFunctions[id] = func;
};

// ============  Hidden from creators!  =======================================

export const addClassForClass = (oldClass: string, newClass: string) => {
  const collection = document.getElementsByClassName(oldClass);
  for (const el of collection) {
    el.classList.add(newClass);
  }
};

export const addToOutputQueue = (data: any) => {
  data.id = nextid;
  outputQueue.push(data);
  nextid += 1;
  outputFromQueue();
};

export const againOrOops = (isAgain = false) => {
  if (savedCommands.length === 0) {
    metamsg(Quest.lang.again_not_available);
    return Quest.World.world.FAILED;
  }
  savedCommands.pop(); // do not save AGAIN/OOPS
  if (isAgain) {
    Quest.Parser.parser.parse(savedCommands[savedCommands.length - 1]);
  } else {
    const tb = getNodeByQuery('textbox') as HTMLInputElement;
    if (tb) {
      tb.value = savedCommands[savedCommands.length - 1];
      doNotEraseLastCommand = true;
    }
  }
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

export const clickExit = (dir: any) => {
  if (disableLevel) return;
  // const failed = false;
  Quest.Utilities.runCmd(dir);
};


export const clickItemAction = (itemName: string, action: string) => {
  if (disableLevel) return;

  const item = Quest.World.w[itemName];
  const cmd  = action.includes('%')
    ? action.replace('%', item.alias)
    : `${action} ${item.alias}`;
  Quest.Utilities.runCmd(cmd);
};

export const cmdlink = (command: string, str: string) => `<a class="cmd-link" onclick="Quest.Utilities.runCmd('${command}')">${str}</a>`;

export const copyTextToClipboard = (text: string) => {
  // from: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  const textArea = document.createElement('textarea') as HTMLTextAreaElement;
  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top      = '0';
  textArea.style.left     = '0';

  // Styling just in case it gets displayed to make is as unobstrusive as possible
  textArea.style.width      = '2em';
  textArea.style.height     = '2em';
  textArea.style.padding    = '0';
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
    metamsg(
      `Copying text command was ${successful ? 'successful' : 'unsuccessful'
      }`,
    );
  } catch (err) {
    metamsg('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
};


export const disable = (level = 1) => {
  // log('disable ' + level + ' (' + disableLevel + ')')
  if (!level) {
    level = 1;
  }
  if (level <= disableLevel) {
    return;
  }
  disableLevel = level;
  if (level !== 2) {
    getNodeByQuery('input').style.display = 'none';
  }
  setCssByClass('compass-button .dark-body', 'color', '#808080');
  setCssByClass('item', 'color', '#808080');
  setCssByClass('item-action', 'color', '#808080');
};

// Display Icons for compas
export const displayIconsCompass = (exit: { rotate: boolean, symbol: string }) => {
  const datatransform = exit.rotate
    ? ' style="transform: rotate(40deg)"'
    : '';
  return `<i class="fas ${exit.symbol}"${datatransform}></i>`;
};

export const enable = (level = 1) => {
  if (!disableLevel || level > disableLevel) {
    return;
  }
  disableLevel                          = 0;
  getNodeByQuery('input').style.display = 'block';
  if (Quest.Settings.settings.panes !== 'none') {
    setCssByClass('compass-button .dark-body', 'color', textColour);
    setCssByClass('item', 'color', textColour);
    setCssByClass('item-action', 'color', textColour);
  }
};

export const finish = () => {
  finished                              = true;
  Quest.Settings.settings.textInput     = false;
  getNodeByQuery('input').style.display = 'none';
  if (Quest.Settings.settings.panes !== 'none') {
    for (const el of getNodesByQuery('pane-div')) {
      el.style.display = 'none';
    }
    getNodeByQuery('pane-div-finished', '.').style.display = 'block';
  }
  for (const el of Quest.Settings.settings.afterFinish) {
    el();
  }
  if (Quest.Settings.settings.finishMetaComment) {
    metamsg(Quest.Settings.settings.finishMetaComment);
  }
  if (Quest.SaveLoad.saveLoad.transcriptExists()) {
    metamsg(Quest.lang.transcript_finish);
  }
};

export const focus = (el: string | HTMLElement) => {
  const e: HTMLElement = (typeof el === 'string') ? getNodeByQuery(`${el}`) : el;
  if (e !== document.activeElement) {
    e.focus();
  }
};

export const forceOutputFromQueue = () => {
  outputSuspended = false;
  outputFromQueue();
};

// Gets the command with the given name
export const getCommand = (name: string) => Quest.Commands.commands.find((el) => el.name === name);

export const getDropDownText = (name: string) => {
  const el = getNodeByQuery(`${name}`) as HTMLSelectElement;
  return el.options[el.selectedIndex].text;
};

// This is used by the various menu functions (not showMenuDiag).
export const input = (
  title: string,
  options: any = {},
  disableTextFunction = noop,
  reactFunction = noop,
  displayFunction = noop,
  failFunction = noop,
) => {
  // Store the values so we can use them later in menuResponse
  menuStartId         = nextid;
  menuFn              = reactFunction;
  menuFailFn          = failFunction;
  menuOptions         = options;
  disableTextFunction = disableTextFunction
    || function (disable: any) {
      if (disable) {
        disable(3);
      }
      if (!disable) {
        enable();
      }
    };

  // Skip if unit-testing
  if (Quest.Utilities.test.testing) {
    if (Quest.Utilities.test.menuResponseNumber === undefined) {
      debugmsg(
        `Error when testing menu (possibly due to disambiguation?), test.menuResponseNumber = ${test.menuResponseNumber}`,
      );
    } else {
      let n;
      if (Array.isArray(Quest.Utilities.test.menuResponseNumber)) {
        n = Quest.Utilities.menuResponseNumber.shift();
        if (Quest.Utilities.test.menuResponseNumber.length === 0) {
          delete Quest.Utilities.test.menuResponseNumber;
        }
      } else {
        n = Quest.Utilities.test.menuResponseNumber;
        delete Quest.Utilities.test.menuResponseNumber;
      }
      // Sort out the menuResponseNumber before hand in case the response also
      // uses it - we want it done before that
      menuResponse(n);
    }
    return;
  }

  // Skip if walk-through
  if (Quest.Settings.settings.walkthroughMenuResponses.length > 0) {
    const response = Quest.Settings.settings.walkthroughMenuResponses.shift();
    menuResponse(response);
    return;
  }

  disableTextFunction(true);
  if (title) {
    msg(title, {}, 'menu-title');
  }
  displayFunction(options);
};

export const menuResponse = (n: any) => {
  const input = n;
  if (typeof n === 'string' && n.match(/^\d+$/)) {
    n = parseInt(n, 10) - 1;
  }
  if (typeof n === 'string') {
    n = menuOptions.findIndex((el: any) =>
      (typeof el === 'string' ? el.includes(n) : el.alias.includes(n)));
  }

  // stop overriding the parser
  Quest.Parser.parser.overrideWith();

  // remove choices from screen
  for (let i = menuStartId; i < nextid; i += 1) {
    getNodeByQuery(`n${i}`).remove();
  }

  // handle bad number
  if (n === undefined || n >= menuOptions[n] || n === -1) {
    menuFailFn(input);
  }

  // handle good number
  else {
    Quest.SaveLoad.saveLoad.transcriptAppend({
      cssClass: 'menu',
      n,
      text:     menuOptions[n].alias
        ? menuOptions[n].alias
        : menuOptions[n],
    });
    menuFn(menuOptions[n]);
  }
  endTurnUI(true);
  if (Quest.Settings.settings.textInput) {
    getNodeByQuery('textbox').focus();
  }
};

export const outputFromQueue = () => {
  if (outputSuspended) {
    return;
  }
  if (outputQueue.length === 0) {
    if (!disableTextFunction) {
      enable();
    }
    return;
  }

  // if (Quest.Settings.settings.textInput) getNodeByQuery('input').style.display = 'block'
  const data = outputQueue.shift();
  if (data?.action === 'wait') {
    disable();
    outputSuspended = true;
    // if (Quest.Settings.settings.textInput) getNodeByQuery('input').style.display = 'none'
    data.tag     = 'p';
    data.onclick = 'unpause()';
    if (!data.text) data.text = Quest.lang.click_to_continue;
    print(data);
  }
  if (data?.action === 'delay') {
    disable();
    outputSuspended = true;
    if (data.text) {
      data.tag = 'p';
      print(data);
    }
    setTimeout(unpause, data.delay * 1000);
  }
  if (data?.action === 'output') {
    const html = print(data);
    speak(data.text);
    Quest.SaveLoad.saveLoad.transcriptAppend(data);
    outputFromQueue();
  }
  if (data?.action === 'func') {
    if (data.func()) {
      outputFromQueue();
    }
  }
  if (data?.action === 'effect') {
    disable();
    // need a way to handle spoken and transcript here
    data.effect(data);
  }
  if (data?.action === 'clear') {
    getNodeByQuery('output').textContent = '';
    outputFromQueue();
  }
  if (data?.action === 'sound') {
    if (!Quest.Settings.settings.silent) {
      const el = getNodeById(data.name) as HTMLAudioElement;
      el.currentTime = 0;
      el.play();
    }
  }
  if (data?.action === 'ambient') {
    for (const el of document.getElementsByTagName('audio')) {
      el.pause();
    }
    if (!Quest.Settings.settings.silent && data.name) {
      const el = getNodeById(data.name) as HTMLAudioElement;
      el.currentTime = 0;
      el.loop = true;
      el.play();
      if (data.volume) {
        el.volume = data.volume / 10;
      }
    }
  }
  scrollToEnd();
  if (Quest.Settings.settings.textInput) {
    getNodeByQuery('textbox').focus();
  }
};

export const scrollToEnd = () => {
  if (Quest.Settings.settings.autoscroll) {
    window.scrollTo(0, getNodeById('main').scrollHeight);
  }
};

export const setCssByClass = (name: string, prop: string, val: string) => {
  for (const el of getNodesByQuery(`${name}`)) {
    el.style[prop] = val;
  }
};

// @DOC
// Appends an HTML DIV, with the given title and content,
// and shows it as a dialog. Used by the transcript
// (and really only useful for displaying data).
export const showHtml = (title: string, html: string) => {
  if (dialogShowing) return false;
  document.querySelector(
    'body',
  ).innerHTML += `<div id="showHtml" title="${title}">${html}</div>`;
  dialogShowing = true;
  getNodeByQuery('showHtml').dialog({
    close() {
      getNodeByQuery('showHtml').remove();
      dialogShowing = false;
    },

    width: 860,
  });
  return true;
};

export const showInTab = (html: any, title = 'Quest JS Tab') => {
  const path = `${globalThis.location.protocol}//${globalThis.location.pathname.replace(
    'index.html',
    '',
  )}`;
  const tab  = window.open('about:blank', '_blank');
  if (!tab) {
    metamsg(Quest.lang.new_tab_failed);
    return false;
  }

  Quest.Settings.settings.loadCssFiles(tab.document, path);

  const myScript = tab.document.createElement('script');
  myScript.setAttribute('src', `${path}lib/_transcript.js`);
  tab.document.head.appendChild(myScript);
  tab.document.body.innerHTML = html;
  tab.document.title          = title;
  tab.document.head.setAttribute('data-favicon', Quest.Settings.settings.favicon);
  tab.document.head.setAttribute('data-path', path);

  const link = tab.document.createElement('link');
  link.id    = 'dynamic-favicon';
  link.rel   = 'shortcut icon';
  link.href  = path + Quest.Settings.settings.favicon;
  tab.document.head.appendChild(link);
};

const slID = 'output';

export const startCommand = () => {
  addClassForClass('default-p', 'old-text');
  addClassForClass('default-h', 'old-text');
  addClassForClass('meta', 'old-text');
  addClassForClass('parser', 'old-text');
  addClassForClass('error', 'old-text');
};

export const textResponse = (s = '') => {
  if (!s) {
    const el = getNodeByQuery<HTMLInputElement>('text-dialog');
    s        = el.value;
  }
  getNodeByQuery('sidepane-menu').remove();

  // stop disabling input
  enable();

  Quest.SaveLoad.saveLoad.transcriptAppend({ cssClass: 'menu', text: s });
  if (menuFn) menuFn(s);
  endTurnUI(true);
  if (Quest.Settings.settings.textInput) getNodeByQuery('textbox').focus();
};

export const toggleAutoScrollMode = () => {
  Quest.Settings.settings.autoscroll = !Quest.Settings.settings.autoscroll;
  if (Quest.Settings.settings.afterAutoScrollToggle) {
    Quest.Settings.settings.afterAutoScrollToggle();
  }
  metamsg(Quest.lang.done_msg);
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

export const toggleDarkMode = () => {
  Quest.Settings.settings.darkModeActive = !Quest.Settings.settings.darkModeActive;
  if (Quest.Settings.settings.darkModeActive) {
    document.body.classList.add('dark-body');
  } else {
    document.body.classList.remove('dark-body');
  }
  if (Quest.Settings.settings.afterDarkToggle) {
    Quest.Settings.settings.afterDarkToggle();
  }
  if (Quest.Settings.settings.panes !== 'none') {
    textColour = getNodeByQuery('side-panes', '.').style.color;
  }
  metamsg(Quest.lang.done_msg);
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

// If the element starts off displayed, you will probably needs to explicitly set display to block for it
// otherwise this will assume it is not
export const toggleDisplay = (el: string | HTMLElement) => {
  const e         = (typeof el === 'string') ? getNodeByQuery(el) : el;
  e.style.display = e.style.display === 'block' ? 'none' : 'block';
};

export const toggleNarrowMode = () => {
  Quest.Settings.settings.narrowMode = (Quest.Settings.settings.narrowMode + 1) % 3;
  document.body.classList.remove('narrow-body');
  document.body.classList.remove('very-narrow-body');
  if (Quest.Settings.settings.narrowMode === 1) {
    document.body.classList.add('narrow-body');
  }
  if (Quest.Settings.settings.narrowMode === 2) {
    document.body.classList.add('very-narrow-body');
  }
  if (Quest.Settings.settings.afterNarrowChange) {
    Quest.Settings.settings.afterNarrowChange();
  }
  metamsg(Quest.lang.done_msg);
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

export const togglePlainFontMode = () => {
  Quest.Settings.settings.plainFontModeActive = !Quest.Settings.settings.plainFontModeActive;
  if (Quest.Settings.settings.plainFontModeActive) {
    document.body.classList.add('plain-font-body');
  } else {
    document.body.classList.remove('plain-font-body');
  }
  if (Quest.Settings.settings.afterPlainFontToggle) {
    Quest.Settings.settings.afterPlainFontToggle();
  }
  metamsg(Quest.lang.done_msg);
  return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};

export const typewriterEffect = (data: any) => {
  if (!data.position) {
    getNodeByQuery('output').innerHTML += `<${data.tag} id="n${data.id}" class=\"typewriter\"></${data.tag}>`;
    data.position                       = 0;
    data.text                           = Quest.Text.processText(data.text, data.params);
  }
  const el       = getNodeByQuery(`n${data.id}`);
  el.innerHTML   = `${data.text.slice(
    0,
    data.position,
  )}<span class="typewriter-active">${data.text.slice(
    data.position,
    data.position + 1,
  )}</span>`;
  data.position += 1;
  if (data.position <= data.text.length) {
    outputQueue.unshift(data);
    outputSuspended = true;
  }
  setTimeout(forceOutputFromQueue, Quest.Settings.settings.textEffectDelay);
};

// Stops the current pause immediately (no effect if not paused)
export const unpause = () => {
  document.querySelector('.continue').remove();
  outputSuspended = false;
  outputFromQueue();
  if (Quest.Settings.settings.textInput) getNodeByQuery('textbox').focus();
};

export const unscamblePick = () => {
  const c = String.fromCharCode(Quest.Random.rndm.int(33, 125));
  return c === '<' ? '~' : c;
};

export const unscambleScramble = (data: any) => {
  let s = '';
  for (let i = 0; i < data.text.length; i += 1) {
    s += data.mask.charAt(i) === ' ' ? data.text.charAt(i) : data.pick(i);
  }
  return s;
};

export const unscrambleEffect = (data: any) => {
  // Set up the system
  if (!data.count) {
    getNodeByQuery('output').innerHTML += `<${data.tag} id="n${data.id}" class="typewriter"></${data.tag}>`;
    data.count                          = 0;
    data.text                           = Quest.Text.processText(data.text, data.params);
    if (!data.pick) data.pick = unscamblePick;
    data.mask      = '';
    data.scrambled = '';
    for (let i = 0; i < data.text.length; i += 1) {
      if (data.text.charAt(i) === ' ' && !data.incSpaces) {
        data.scrambled += ' ';
        data.mask      += ' ';
      } else {
        data.scrambled += data.pick(i);
        data.mask      += 'x';
        data.count     += 1;
      }
    }
  }

  if (data.randomPlacing) {
    let pos     = Quest.Random.rndm.int(0, data.count - 1);
    let newMask = '';
    for (let i = 0; i < data.mask.length; i += 1) {
      if (data.mask.charAt(i) === ' ') {
        newMask += ' ';
      } else if (pos === 0) {
        newMask += ' ';
        pos     -= 1;
      } else {
        newMask += 'x';
        pos     -= 1;
      }
    }
    data.mask = newMask;
  } else {
    data.mask = data.mask.replace('x', ' ');
  }
  data.count                             -= 1;
  getNodeByQuery(`n${data.id}`).innerHTML = unscambleScramble(data);
  if (data.count > 0) {
    outputQueue.unshift(data);
    outputSuspended = true;
  }
  setTimeout(forceOutputFromQueue, Quest.Settings.settings.textEffectDelay);
};
