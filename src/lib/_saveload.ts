"use strict";

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


const saveLoad = {

  getName: function (filename: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
    return "QJS:" + Quest.Settings.settings.title + ":" + filename
  },

  saveGame: function (filename: any, overwrite: any) {
    if (filename === undefined) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      errormsg(sl_no_filename);
      return false;
    }

    if (localStorage.getItem(this.getName(filename)) && !overwrite) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(Quest.lang.sl_already_exists)
      return
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveComment' does not exist on type '{ p... Remove this comment to see the full error message
    const comment = Quest.Settings.settings.saveComment ? Quest.Settings.settings.saveComment() : "-"
    const s = saveLoad.saveTheWorld(comment);
    //console.log(s)
    localStorage.setItem(this.getName(filename), s);
    metamsg(Quest.lang.sl_saved, { filename: filename });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSave' does not exist on type '{ per... Remove this comment to see the full error message
    if (Quest.Settings.settings.afterSave) Quest.Settings.settings.afterSave(filename)
    return true;
  },

  saveGameAsFile: function (filename: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveComment' does not exist on type '{ p... Remove this comment to see the full error message
    const comment = Quest.Settings.settings.saveComment ? Quest.Settings.settings.saveComment() : "-"
    const s = saveLoad.saveTheWorld(comment)
    const myFile = new File([s], filename + ".q6save", { type: "text/plain;charset=utf-8" })
    saveAs(myFile)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Your entry " + filename + ".q6save should now download.")
    return true
  },

  saveTheWorld: function (comment: any) {
    return saveLoad.getSaveHeader(comment) + saveLoad.getSaveBody();
  },

  getHeader: function (s: any) {
    const arr = s.split("!");
    return { title: saveLoad.decodeString(arr[0]), version: saveLoad.decodeString(arr[1]), comment: saveLoad.decodeString(arr[2]), timestamp: arr[3] };
  },

  getSaveHeader: function (comment: any) {
    const currentdate = new Date();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
    let s = saveLoad.encodeString(Quest.Settings.settings.title) + "!";
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
    s += saveLoad.encodeString(Quest.Settings.settings.version) + "!";
    s += saveLoad.encodeString(comment) + "!";
    s += currentdate.toLocaleString() + "!";
    return s;
  },

  getSaveBody: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getChangeListenersSaveString' does not e... Remove this comment to see the full error message
    const l = [tp.getSaveString(), game.getSaveString(), Quest.Utilities.util.getChangeListenersSaveString()]
    for (let key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      l.push(key + "=" + w[key].getSaveString())
    }
    return l.join("!")
  },





  // LOAD

  // This function will be attached to #fileDialog as its "onchange" event
  loadGameAsFile: function () {
    const fileInput = document.querySelector("#fileDialog")
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const fileIn = fileInput.files

    const reader = new FileReader()
    reader.readAsText(fileIn[0])
    reader.onload = function () {
      saveLoad.loadGame(fileIn[0].name, reader.result)
      const el = document.querySelector("#fileDialogForm")
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      el.reset()
    }
    reader.onerror = function () {
      console.log(reader.error)
    }
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  loadGameFromLS: function (filename) {
    //log(">" + filename + "<")
    const contents = localStorage.getItem(this.getName(filename));
    this.loadGame(filename, contents)
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  loadGame: function (filename, contents) {
    if (!contents) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(Quest.lang.sl_file_not_found);
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
    else if (!contents.startsWith(Quest.Settings.settings.title + '!')) {
      const encodedTitle = contents.substr(0, contents.indexOf('!'));
      metamsg(Quest.lang.sl_bad_format, { title: saveLoad.decodeString(encodedTitle) })
    }
    else {
      saveLoad.loadTheWorld(contents, 4)
      clearScreen()
      metamsg(Quest.lang.sl_file_loaded, { filename: filename })
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLoad' does not exist on type '{ per... Remove this comment to see the full error message
      if (Quest.Settings.settings.afterLoad) Quest.Settings.settings.afterLoad(filename)
      currentLocation.description()
    }
  },



  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  loadTheWorld: function (s, removeHeader) {
    const arr = s.split("!");
    if (removeHeader !== undefined) {
      arr.splice(0, removeHeader);
    }

    // Eliminate all clones
    for (let key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (w[key].clonePrototype) delete w[key]
    }

    tp.setLoadString(arr.shift())
    game.setLoadString(arr.shift())
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setChangeListenersLoadString' does not e... Remove this comment to see the full error message
    Quest.Utilities.util.setChangeListenersLoadString(arr.shift())
    for (let el of arr) {
      this.setLoadString(el);
    }
    world.update()
    endTurnUI(true)
  },



  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  setLoadString: function (s) {
    const parts = s.split("=");
    if (parts.length !== 3) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      errormsg("Bad format in saved data (" + s + ")");
      return;
    }
    const name = parts[0];
    const saveType = parts[1]
    const arr = parts[2].split(";");

    if (saveType.startsWith("Clone")) {
      const clonePrototype = saveType.split(":")[1];
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!w[clonePrototype]) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        errormsg("Cannot find prototype '" + clonePrototype + "'");
        return;
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      const obj = cloneObject(w[clonePrototype]);
      this.setFromArray(obj, arr);
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      w[obj.name] = obj;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLoadForTemplate' does not exist on ... Remove this comment to see the full error message
      obj.afterLoadForTemplate();
      return
    }

    if (saveType === "Object") {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!w[name]) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        errormsg("Cannot find object '" + name + "'");
        return;
      }
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const obj = w[name];
      this.setFromArray(obj, arr);
      obj.afterLoadForTemplate();
      return
    }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    errormsg("Unknown save type for object '" + name + "' (" + hash.saveType + ")");
  },





  // UTILs  

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'hash' implicitly has an 'any' type.
  decode: function (hash, str) {
    if (str.length === 0) return false
    const parts = str.split(":")
    const key = parts[0]
    const attType = parts[1]
    const s = parts[2]

    if (attType === "boolean") {
      hash[key] = (s === "true")
    }

    else if (attType === "number") {
      hash[key] = parseFloat(s)
    }

    else if (attType === "string") {
      hash[key] = saveLoad.decodeString(s)
    }

    else if (attType === "array") {
      hash[key] = saveLoad.decodeArray(s)
    }

    else if (attType === "numberarray") {
      hash[key] = saveLoad.decodeNumberArray(s)
    }

    else if (attType === "emptyarray") {
      hash[key] = []
    }

    else if (attType === "emptystring") {
      hash[key] = ''
    }

    else if (attType === "qobject") {
      // this will cause an issue if it points to a clone that has not been done yet !!!
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      hash[key] = w[s]
    }

    return key
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'key' implicitly has an 'any' type.
  encode: function (key, value) {
    if (value === 0) return key + ":number:0;"
    if (value === false) return key + ":boolean:false;"
    if (value === '') return key + ":emptystring;"
    if (!value) return ''
    let attType = typeof value;
    if (Array.isArray(value)) {
      try {
        if (value.length === 0) return key + ":emptyarray;";
        if (typeof value[0] === 'string') return key + ":array:" + saveLoad.encodeArray(value) + ";";
        if (typeof value[0] === 'number') return key + ":numberarray:" + saveLoad.encodeNumberArray(value) + ";";
        return '';
      } catch (error) {
        // Add the name of the attribute to the error message
        console.trace()
        log(value)
        throw "Error encountered with attribute \"" + key + "\": " + error + ". More here: https://github.com/ThePix/QuestJS/wiki/Save-Load#save-errors"
      }
    }
    if (value instanceof Exit) {
      return '';
    }
    if (attType === "object") {
      if (value.name) return key + ":qobject:" + value.name + ";";
      return '';
    }
    if (attType === "string") {
      return key + ":string:" + saveLoad.encodeString(value) + ";";
    }
    return key + ":" + attType + ":" + value + ";";
  },


  replacements: [
    { unescaped: ':', escaped: 'cln' },
    { unescaped: ';', escaped: 'scln' },
    { unescaped: '!', escaped: 'exm' },
    { unescaped: '=', escaped: 'eqs' },
    { unescaped: '~', escaped: 'tld' },
  ],


  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  encodeString: function (s) {
    for (let d of saveLoad.replacements) {
      if (typeof s !== 'string') throw "Found type \"" + (typeof s) + "\" in array - should be only strings."
      s = s.replace(new RegExp(d.unescaped, "g"), "@@@" + d.escaped + "@@@");
    }
    return s;
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  decodeString: function (s) {
    //if (typeof s !== 'string') {
    //  console.log("Expecting a string there, but found this instead (did you add an object to a list rather than its name?):")
    //  console.log(s)
    ///}
    for (let d of saveLoad.replacements) {
      s = s.replace(new RegExp("@@@" + d.escaped + "@@@", "g"), d.unescaped);
    }
    return s;
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ary' implicitly has an 'any' type.
  encodeArray: function (ary) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return ary.map(el => saveLoad.encodeString(el)).join('~');
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  decodeArray: function (s) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return s.split('~').map(el => saveLoad.decodeString(el));
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ary' implicitly has an 'any' type.
  encodeNumberArray: function (ary) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return ary.map(el => {
      if (typeof el !== 'number') throw "Found type \"" + (typeof el) + "\" in array - should be only numbers."
      return el.toString()
    }).join('~');
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  decodeNumberArray: function (s) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return s.split('~').map(el => parseFloat(el));
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 's' implicitly has an 'any' type.
  decodeExit: function (s) {
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'el' implicitly has an 'any' type.
    return s.split('~').map(el => saveLoad.decodeString(el));
  },


  lsTest: function () {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },




  // Other functions

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  deleteGame: function (filename) {
    localStorage.removeItem(this.getName(filename));
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(Quest.lang.sl_deleted);
  },

  dirGame: function () {
    const arr0 = Quest.lang.sl_dir_headings.map(el => '<th>' + el + '</th>')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveComment' does not exist on type '{ p... Remove this comment to see the full error message
    if (!Quest.Settings.settings.saveComment) arr0.pop()
    let s = arr0.join('')
    for (let key in localStorage) {
      if (!key.startsWith('QJS:')) continue
      const arr1 = key.split(':')
      const arr2 = localStorage[key].split('!')
      log(arr2.slice(1, 4))
      s += "<tr>"
      s += "<td>" + arr1[2] + "</td>"
      s += "<td>" + arr1[1] + "</td>"
      s += "<td>" + arr2[1] + "</td>"
      s += "<td>" + arr2[3] + "</td>"
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'saveComment' does not exist on type '{ p... Remove this comment to see the full error message
      if (Quest.Settings.settings.saveComment) s += "<td>" + arr2[2] + "</td>"
      s += "</tr>"
    }
    _msg(s, {}, { cssClass: "meta", tag: 'table' })
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(Quest.lang.sl_dir_msg)
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  testExistsGame: function (filename) {
    const data = localStorage[this.getName(filename)]
    return data !== undefined
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'filename' implicitly has an 'any' type.
  getSummary: function (filename) {
    const data = localStorage[this.getName(filename)]
    if (!data) return null
    const arr = data.split('!')
    return arr.slice(1, 4)
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'obj' implicitly has an 'any' type.
  setFromArray: function (obj, arr) {
    const keys = Object.keys(obj).filter(e => !obj.saveLoadExclude(e))
    for (let el of keys) delete obj[el]
    for (let el of arr) saveLoad.decode(obj, el)
  },



  // ------------------------------------------------------------------------------------------
  //    TRANSCRIPTS
  //
  // Here because it uses localStorage. That said, there are two independant systems, the second
  // records commands to create a walk-through, and is saved in an array, this.transcriptWalkthrough
  // because only the author should ever use it. 

  transcript: false,  // Set to true when recording
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
  transcriptName: "QJST:" + Quest.Settings.settings.title + ":transcript",

  transcriptStart: function () {
    this.transcript = true
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
    this.transcriptWalkthrough = []
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(Quest.lang.transcript_on)
    this.transcriptWrite(Quest.lang.transcriptStart())
  },

  transcriptEnd: function () {
    this.transcriptWrite(Quest.lang.transcriptEnd())
    this.transcript = false
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(Quest.lang.transcript_off)
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  transcriptAppend: function (data) {
    if (!this.transcript) return
    if (data.cssClass === 'menu') {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
      let previous = this.transcriptWalkthrough.pop()
      if (previous) {
        previous = previous.replace(/\,$/, '').trim()
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
        this.transcriptWalkthrough.push('    {cmd:' + previous + ', menu:' + data.n + '},')
      }
    }
    this.transcriptWrite('<p class="' + data.cssClass + '">' + data.text + '</p>')
  },

  // Used internally to write to the file, appending it to the existing text.
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'html' implicitly has an 'any' type.
  transcriptWrite: function (html) {
    let s = localStorage.getItem(this.transcriptName)
    if (!s) s = ''
    s += '\n\n' + html
    localStorage.setItem(this.transcriptName, s)
  },

  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  transcriptClear: function (data) {
    localStorage.removeItem(this.transcriptName)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(Quest.lang.transcript_cleared)
  },

  // Is there a transcript saved?
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'data' implicitly has an 'any' type.
  transcriptExists: function (data) {
    return localStorage.getItem(this.transcriptName) !== undefined
  },

  transcriptShow: function () {
    const s = localStorage.getItem(this.transcriptName)
    if (!s) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(Quest.lang.transcript_none)
      return false
    }

    let html = ''
    html += '<div id="main"><div id="inner"><div id="output">'
    html += Quest.lang.transcriptTitle()
    html += s
    html += '</div></div></div>'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
    io.showInTab(html, 'QuestJS Transcript: ' + Quest.Settings.settings.title)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    metamsg(Quest.lang.done_msg)
  },

  transcriptWalk: function () {
    let html = ''
    html += '<div id="main"><div id="inner"><div id="output">'
    html += '<br/><h2>Generated QuestJS Walk-through</h2><br/><br/>'
    html += '<p>Copy-and-paste the code below into code.js. You can quickly run the walk-though with [Ctrl][Enter].</p>'
    html += '<p>If you already have a walk-through, you will need to just copy-and-paste the right bit - probably all but the first and last lines, and insert just before the curly brace at the end. You may need to rename it too.</p>'
    html += '<pre>\n\n\nconst walkthroughs = {\n  c:[\n'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'transcriptWalkthrough' does not exist on... Remove this comment to see the full error message
    html += this.transcriptWalkthrough.join('\n')
    html += '\n  ],\n}</pre>'
    html += '</div></div></div>'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
    io.showInTab(html, 'QuestJS Transcript: ' + Quest.Settings.settings.title)
  },
}
