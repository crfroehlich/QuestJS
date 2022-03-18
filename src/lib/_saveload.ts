import { Quest } from '../types/quest';
// Should all be language neutral
/*
  The game state is saved as a name-value pair.
  The value is the game state, with each segment separated by an exclamation mark. The first four segments are the header, the rest are the body. The header consists of the title, version, comment and timestamp. Each segment of the body is an object in the game.
  An object is saved as its name followed by an equals sign followed by either "Object" or by "Clone:" and the name of the clone's prototype, followed by an equals sign, and then the data. Each datam is separated by a semi-colon. Each datum consists of the name, the type and the value, separated by colons.
  If a datum is an object, and has a name attribute, the name is saved as type qobject.
  If the datam is an array and the first element is a string, it is assumed that all the elements are strings, and it is saved as an Quest.Utilities.array. Other arrays are not saved.
  If the datam is a number, a string or true it is saved as such.
  Any other objects or values will not be saved.
  */

export const saveLoad = {

  // UTILs
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'hash' implicitly has an 'any' type.
  decode(hash, str) {
    if (str.length === 0) return false;
    const parts   = str.split(':');
    const key     = parts[0];
    const attType = parts[1];
    const s       = parts[2];

    if (attType === 'boolean') {
      hash[key] = (s === 'true');
    } else if (attType === 'number') {
      hash[key] = parseFloat(s);
    } else if (attType === 'string') {
      hash[key] = Quest.SaveLoad.saveLoad.decodeString(s);
    } else if (attType === 'array') {
      hash[key] = Quest.SaveLoad.saveLoad.decodeArray(s);
    } else if (attType === 'numberarray') {
      hash[key] = Quest.SaveLoad.saveLoad.decodeNumberArray(s);
    } else if (attType === 'emptyarray') {
      hash[key] = [];
    } else if (attType === 'emptystring') {
      hash[key] = '';
    } else if (attType === 'qobject') {
      // this will cause an issue if it points to a clone that has not been done yet !!!
      hash[key] = Quest.World.w[s];
    }

    return key;
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  decodeArray(s) {
    // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return s.split('~').map((el) => Quest.SaveLoad.saveLoad.decodeString(el));
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  decodeExit(s) {
    // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return s.split('~').map((el) => Quest.SaveLoad.saveLoad.decodeString(el));
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  decodeNumberArray(s) {
    // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return s.split('~').map((el) => parseFloat(el));
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  decodeString(s) {
    // if (typeof s !== 'string') {
    //  console.log("Expecting a string there, but found this instead (did you add an object to a list rather than its name?):")
    //  console.log(s)
    /// }
    for (const d of Quest.SaveLoad.saveLoad.replacements) {
      s = s.replace(new RegExp(`@@@${d.escaped}@@@`, 'g'), d.unescaped);
    }
    return s;
  },

  // Other functions
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  deleteGame(filename) {
    localStorage.removeItem(this.getName(filename));
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(Quest.lang.sl_deleted);
  },

  dirGame() {
    const arr0 = Quest.lang.sl_dir_headings.map((el) => `<th>${el}</th>`);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'saveComment' does not exist on type '{ p... Remove this comment to see the full error message
    if (!Quest.Settings.settings.saveComment) arr0.pop();
    let s = arr0.join('');
    for (const key in localStorage) {
      if (!key.startsWith('QJS:')) continue;
      const arr1 = key.split(':');
      const arr2 = localStorage[key].split('!');
      log(arr2.slice(1, 4));
      s += '<tr>';
      s += `<td>${arr1[2]}</td>`;
      s += `<td>${arr1[1]}</td>`;
      s += `<td>${arr2[1]}</td>`;
      s += `<td>${arr2[3]}</td>`;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'saveComment' does not exist on type '{ p... Remove this comment to see the full error message
      if (Quest.Settings.settings.saveComment) s += `<td>${arr2[2]}</td>`;
      s += '</tr>';
    }
    Quest.IO.msg(s, {}, { cssClass: 'meta', tag: 'table' });
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(Quest.lang.sl_dir_msg);
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
  encode(key, value) {
    if (value === 0) return `${key}:number:0;`;
    if (value === false) return `${key}:boolean:false;`;
    if (value === '') return `${key}:emptystring;`;
    if (!value) return '';
    const attType = typeof value;
    if (Array.isArray(value)) {
      try {
        if (value.length === 0) return `${key}:emptyarray;`;
        if (typeof value[0] === 'string') return `${key}:array:${Quest.SaveLoad.saveLoad.encodeArray(value)};`;
        if (typeof value[0] === 'number') return `${key}:numberarray:${Quest.SaveLoad.saveLoad.encodeNumberArray(value)};`;
        return '';
      } catch (error) {
        // Add the name of the attribute to the error message
        console.trace();
        log(value);
        throw `Error encountered with attribute "${key}": ${error}. More here: https://github.com/ThePix/QuestJS/wiki/Save-Load#save-errors`;
      }
    }
    if (value instanceof Quest.World.Exit) {
      return '';
    }
    if (attType === 'object') {
      if (value.name) return `${key}:qobject:${value.name};`;
      return '';
    }
    if (attType === 'string') {
      return `${key}:string:${Quest.SaveLoad.saveLoad.encodeString(value)};`;
    }
    return `${key}:${attType}:${value};`;
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'ary' implicitly has an 'any' type.
  encodeArray(ary) {
    // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return ary.map((el) => Quest.SaveLoad.saveLoad.encodeString(el)).join('~');
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'ary' implicitly has an 'any' type.
  encodeNumberArray(ary) {
    // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return ary.map((el) => {
      if (typeof el !== 'number') throw `Found type "${typeof el}" in array - should be only numbers.`;
      return el.toString();
    }).join('~');
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  encodeString(s) {
    for (const d of Quest.SaveLoad.saveLoad.replacements) {
      if (typeof s !== 'string') throw `Found type "${typeof s}" in array - should be only strings.`;
      s = s.replace(new RegExp(d.unescaped, 'g'), `@@@${d.escaped}@@@`);
    }
    return s;
  },

  getHeader(s: any) {
    const arr = s.split('!');
    return {
      comment: Quest.SaveLoad.saveLoad.decodeString(arr[2]), timestamp: arr[3], title: Quest.SaveLoad.saveLoad.decodeString(arr[0]), version: Quest.SaveLoad.saveLoad.decodeString(arr[1]),
    };
  },

  getName(filename: any) {
    return `QJS:${Quest.Settings.settings.title}:${filename}`;
  },

  getSaveBody() {
    const l = [Quest.Text.getSaveString(), Quest.World.game.getSaveString(), Quest.Utilities.util.getChangeListenersSaveString()];
    for (const key in Quest.World.w) {
      l.push(`${key}=${Quest.World.w[key].getSaveString()}`);
    }
    return l.join('!');
  },

  getSaveHeader(comment: any) {
    const currentdate = new Date();
    let s             = `${Quest.SaveLoad.saveLoad.encodeString(Quest.Settings.settings.title)}!`;
    s                += `${Quest.SaveLoad.saveLoad.encodeString(Quest.Settings.settings.version)}!`;
    s                += `${Quest.SaveLoad.saveLoad.encodeString(comment)}!`;
    s                += `${currentdate.toLocaleString()}!`;
    return s;
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  getSummary(filename) {
    const data = localStorage[this.getName(filename)];
    if (!data) return null;
    const arr = data.split('!');
    return arr.slice(1, 4);
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  loadGame(filename, contents) {
    if (!contents) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(Quest.lang.sl_file_not_found);
    } else if (!contents.startsWith(`${Quest.Settings.settings.title}!`)) {
      const encodedTitle = contents.substr(0, contents.indexOf('!'));
      Quest.IO.metamsg(Quest.lang.sl_bad_format, { title: Quest.SaveLoad.saveLoad.decodeString(encodedTitle) });
    } else {
      Quest.SaveLoad.saveLoad.loadTheWorld(contents, 4);
      Quest.IO.clearScreen();
      Quest.IO.metamsg(Quest.lang.sl_file_loaded, { filename });
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterLoad' does not exist on type '{ per... Remove this comment to see the full error message
      if (Quest.Settings.settings.afterLoad) Quest.Settings.settings.afterLoad(filename);
      Quest.World.currentLocation.description();
    }
  },

  // LOAD
  // This function will be attached to #fileDialog as its "onchange" event
  loadGameAsFile() {
    const fileInput = document.querySelector('#fileDialog');
    // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
    const fileIn = fileInput.files;

    const reader = new FileReader();
    reader.readAsText(fileIn[0]);
    reader.onload = function () {
      Quest.SaveLoad.saveLoad.loadGame(fileIn[0].name, reader.result);
      const el = document.querySelector('#fileDialogForm');
      // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.reset();
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  loadGameFromLS(filename) {
    // log(">" + filename + "<")
    const contents = localStorage.getItem(this.getName(filename));
    this.loadGame(filename, contents);
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  loadTheWorld(s, removeHeader) {
    const arr = s.split('!');
    if (removeHeader !== undefined) {
      arr.splice(0, removeHeader);
    }

    // Eliminate all clones
    for (const key in Quest.World.w) {
      if (Quest.World.w[key].clonePrototype) delete Quest.World.w[key];
    }

    Quest.Text.setLoadString(arr.shift());
    Quest.World.game.setLoadString(arr.shift());
    Quest.Utilities.util.setChangeListenersLoadString(arr.shift());
    for (const el of arr) {
      this.setLoadString(el);
    }
    Quest.World.world.update();
    Quest.IO.endTurnUI(true);
  },

  lsTest() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },

  replacements: [
    { escaped: 'cln', unescaped: ':' },
    { escaped: 'scln', unescaped: ';' },
    { escaped: 'exm', unescaped: '!' },
    { escaped: 'eqs', unescaped: '=' },
    { escaped: 'tld', unescaped: '~' },
  ],

  saveGame(filename: any, overwrite: any) {
    if (filename === undefined) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.errormsg(sl_no_filename);
      return false;
    }

    if (localStorage.getItem(this.getName(filename)) && !overwrite) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(Quest.lang.sl_already_exists);
      return;
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'saveComment' does not exist on type '{ p... Remove this comment to see the full error message
    const comment = Quest.Settings.settings.saveComment ? Quest.Settings.settings.saveComment() : '-';
    const s       = Quest.SaveLoad.saveLoad.saveTheWorld(comment);
    // console.log(s)
    localStorage.setItem(this.getName(filename), s);
    Quest.IO.metamsg(Quest.lang.sl_saved, { filename });
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterSave' does not exist on type '{ per... Remove this comment to see the full error message
    if (Quest.Settings.settings.afterSave) Quest.Settings.settings.afterSave(filename);
    return true;
  },

  saveGameAsFile(filename: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'saveComment' does not exist on type '{ p... Remove this comment to see the full error message
    const comment = Quest.Settings.settings.saveComment ? Quest.Settings.settings.saveComment() : '-';
    const s       = Quest.SaveLoad.saveLoad.saveTheWorld(comment);
    const myFile  = new File([s], `${filename}.q6save`, { type: 'text/plain;charset=utf-8' });
    Quest.FileSaver.saveAs(myFile);
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(`Your entry ${filename}.q6save should now download.`);
    return true;
  },

  saveTheWorld(comment: any) {
    return Quest.SaveLoad.saveLoad.getSaveHeader(comment) + Quest.SaveLoad.saveLoad.getSaveBody();
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'obj' implicitly has an 'any' type.
  setFromArray(obj, arr) {
    const keys = Object.keys(obj).filter((e) => !obj.saveLoadExclude(e));
    for (const el of keys) delete obj[el];
    for (const el of arr) Quest.SaveLoad.saveLoad.decode(obj, el);
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  setLoadString(s) {
    const parts = s.split('=');
    if (parts.length !== 3) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.errormsg(`Bad format in saved data (${s})`);
      return;
    }
    const name     = parts[0];
    const saveType = parts[1];
    const arr      = parts[2].split(';');

    if (saveType.startsWith('Clone')) {
      const clonePrototype = saveType.split(':')[1];
      if (!Quest.World.w[clonePrototype]) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg(`Cannot find prototype '${clonePrototype}'`);
        return;
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      const obj = Quest.World.cloneObject(Quest.World.w[clonePrototype]);
      this.setFromArray(obj, arr);
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.World.w[obj.name] = obj;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterLoadForTemplate' does not exist on ... Remove this comment to see the full error message
      obj.afterLoadForTemplate();
      return;
    }

    if (saveType === 'Object') {
      if (!Quest.World.w[name]) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg(`Cannot find object '${name}'`);
        return;
      }
      const obj = Quest.World.w[name];
      this.setFromArray(obj, arr);
      obj.afterLoadForTemplate();
      return;
    }

    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.errormsg(`Unknown save type for object '${name}' (${hash.saveType})`);
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  testExistsGame(filename) {
    const data = localStorage[this.getName(filename)];
    return data !== undefined;
  },

  // ------------------------------------------------------------------------------------------
  //    TRANSCRIPTS
  //
  // Here because it uses localStorage. That said, there are two independant systems, the second
  // records commands to create a walk-through, and is saved in an array, this.transcriptWalkthrough
  // because only the author should ever use it.

  transcript: false,
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  transcriptAppend(data) {
    if (!this.transcript) return;
    if (data.cssClass === 'menu') {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
      let previous = this.transcriptWalkthrough.pop();
      if (previous) {
        previous = previous.replace(/\,$/, '').trim();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
        this.transcriptWalkthrough.push(`    {cmd:${previous}, menu:${data.n}},`);
      }
    }
    this.transcriptWrite(`<p class="${data.cssClass}">${data.text}</p>`);
  },

  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  transcriptClear(data) {
    localStorage.removeItem(this.transcriptName);
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(Quest.lang.transcript_cleared);
  },

  transcriptEnd() {
    this.transcriptWrite(Quest.lang.transcriptEnd());
    this.transcript = false;
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(Quest.lang.transcript_off);
  },

  // Is there a transcript saved?
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  transcriptExists(data) {
    return localStorage.getItem(this.transcriptName) !== undefined;
  },

  // Set to true when recording
  transcriptName: `QJST:${Quest.Settings.settings.title}:transcript`,

  transcriptShow() {
    const s = localStorage.getItem(this.transcriptName);
    if (!s) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.metamsg(Quest.lang.transcript_none);
      return false;
    }

    let html = '';
    html    += '<div id="main"><div id="inner"><div id="output">';
    html    += Quest.lang.transcriptTitle();
    html    += s;
    html    += '</div></div></div>';
    Quest.IO.io.showInTab(html, `QuestJS Transcript: ${Quest.Settings.settings.title}`);
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(Quest.lang.done_msg);
  },

  transcriptStart() {
    this.transcript = true;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
    this.transcriptWalkthrough = [];
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    Quest.IO.metamsg(Quest.lang.transcript_on);
    this.transcriptWrite(Quest.lang.transcriptStart());
  },

  transcriptWalk() {
    let html = '';
    html    += '<div id="main"><div id="inner"><div id="output">';
    html    += '<br/><h2>Generated QuestJS Walk-through</h2><br/><br/>';
    html    += '<p>Copy-and-paste the code below into code.js. You can quickly run the walk-though with [Ctrl][Enter].</p>';
    html    += '<p>If you already have a walk-through, you will need to just copy-and-paste the right bit - probably all but the first and last lines, and insert just before the curly brace at the end. You may need to rename it too.</p>';
    html    += '<pre>\n\n\nconst walkthroughs = {\n  c:[\n';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
    html += this.transcriptWalkthrough.join('\n');
    html += '\n  ],\n}</pre>';
    html += '</div></div></div>';
    Quest.IO.io.showInTab(html, `QuestJS Transcript: ${Quest.Settings.settings.title}`);
  },

  // Used internally to write to the file, appending it to the existing text.
  // ts-error-fixed ts-migrate(7006) FIXME: Parameter 'html' implicitly has an 'any' type.
  transcriptWrite(html) {
    let s = localStorage.getItem(this.transcriptName);
    if (!s) s = '';
    s += `\n\n${html}`;
    localStorage.setItem(this.transcriptName, s);
  },
};

Quest.SaveLoad = {
  saveLoad,
};
