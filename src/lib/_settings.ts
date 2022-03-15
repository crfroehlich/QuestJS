namespace Quest {
  export namespace Settings {
    export type TGetVoid = (...params: any) => void;
    export type TGetString = (...params: any[]) => string;
    export type TGetBool = (...params: any[]) => boolean;
    export const noop: TGetVoid = () => { };

    export interface ICustomPaneFunctions {
      matches: any;
    }

    export interface IDateTime {
      year?: string;
      month?: string;
      day?: string;
      hour?: string;
      minute?: string;
      secondsPerTurn?: number;
      locale?: string;
      start?: Date;
    }

    export interface IInventoryPane {
      name?: string;
      alt?: string;
      test: TGetBool;
      getLoc: TGetString;
      hasContent?: boolean;
      noContent?: any;
    }

    interface IMapStyle {
      right?: string;
      top?: string;
      width?: string;
      height?: string;
      "background-color"?: string;
    }

    export interface IScriptDoc {
      location?: Location;
    }

    export interface IStatsDatum {
      name?: string;
      test: TGetBool;
    }


    export interface ISettings {
      afterEnter?: TGetVoid;
      afterFinish?: any[];
      afterTurn?: any[];
      author?: string;
      autoscroll?: boolean;
      beforeEnter?: TGetVoid;
      closeQuotation?: string;
      cmdEcho?: boolean;
      compassPane?: boolean;
      convertNumbersInParser?: boolean;
      cssFolder?: string;
      cursor?: string;
      customExits?: boolean;
      customLibraries?: any[];
      customPaneFunctions?: ICustomPaneFunctions;
      darkModeActive?: boolean;
      dateTime?: IDateTime;
      delayStart?: boolean;
      eventFunctions?: ICustomPaneFunctions;
      getDefaultRoomHeading: TGetString;
      failCountsAsTurn?: boolean;
      favicon?: string;
      files?: string[];
      fluids?: any[];
      folder?: string;
      funcForDisambigMenu?: string;
      funcForDynamicConv?: string;
      givePlayerAskTellMsg?: boolean;
      givePlayerSayMsg?: boolean;
      iconsFolder?: string;
      ifid?: string;
      imagesFolder?: string;
      inventoryPane?: IInventoryPane[];
      isHeldNotWorn?: TGetBool;
      isHere?: TGetBool;
      isWorn?: TGetBool;
      lang?: string;
      libraries?: string[];
      lookCountsAsTurn?: boolean;
      mapAndImageCollapseAt?: number;
      mapStyle?: IMapStyle;
      maxUndo?: number;
      mediaQuery?: ICustomPaneFunctions;
      moneyFormat?: string;
      narrowMode?: number;
      noAskTell?: string;
      noTalkTo?: string;
      npcReactionsAlways?: boolean;
      openQuotation?: string;
      panes?: string;
      panesCollapseAt?: number;
      performanceLogStartTime?: number;
      plainFontModeActive?: boolean;
      questVersion?: string;
      roomSetList?: ICustomPaneFunctions;
      roomTemplate?: string[];
      saveDisabled?: boolean;
      saveLoadExcludedAtts?: string[];
      scriptDoc?: IScriptDoc;
      scriptLoading?: string;
      scriptLoadLogging?: boolean;
      scriptToLoad?: any[];
      silent?: boolean;
      soundsFileExt?: string;
      soundsFolder?: string;
      startingDialogEnabled?: boolean;
      statsData?: IStatsDatum[];
      status?: TGetString[];
      statusPane?: string;
      statusWidthLeft?: number;
      statusWidthRight?: number;
      styleFile?: string;
      symbolsForCompass?: boolean;
      tests?: boolean;
      textEffectDelay?: number;
      textInput?: boolean;
      thanks?: any[];
      themes?: string[];
      timerInterval?: number;
      title?: string;
      turnsQuestionsLast?: number;
      verbosity?: number;
      version?: string;
      videosFolder?: string;
      walkthroughMenuResponses?: any[];
      warnings: string;
    }


    export class Settings implements ISettings {
      afterEnter?: TGetVoid;
      afterFinish: any[] = [];
      afterTurn: any[] = [];
      author?: string;
      autoscroll?: boolean;
      beforeEnter?: TGetVoid;
      closeQuotation?: string;
      cmdEcho?: boolean;
      compassPane?: boolean;
      convertNumbersInParser?: boolean;
      cssFolder?: string;
      cursor?: string;
      customExits?: boolean;
      customLibraries: any[] = [];
      customPaneFunctions?: ICustomPaneFunctions;
      darkModeActive?: boolean;
      dateTime?: IDateTime;
      delayStart?: boolean;
      eventFunctions?: ICustomPaneFunctions;
      failCountsAsTurn?: boolean;
      favicon?: string;
      files: string[] = [];
      fluids: any[] = [];
      folder?: string;
      funcForDisambigMenu?: string;
      funcForDynamicConv?: string;
      givePlayerAskTellMsg?: boolean;
      givePlayerSayMsg?: boolean;
      iconsFolder?: string;
      ifid?: string;
      imagesFolder?: string;
      inventoryPane: IInventoryPane[] = [
        { name: 'Items Held', alt: 'itemsHeld', test: this.isHeldNotWorn, getLoc: function () { return Quest.World.player.name; } },
        { name: 'Items Worn', alt: 'itemsWorn', test: this.isWorn, getLoc: function () { return Quest.World.player.name; } },
        { name: 'Items Here', alt: 'itemsHere', test: this.isHere, getLoc: function () { return Quest.World.player.loc; } },
      ];
      lang?: string;
      libraries: string[] = [];
      lookCountsAsTurn?: boolean;
      mapAndImageCollapseAt?: number;
      mapStyle?: IMapStyle;
      maxUndo: number = 1000;
      mediaQuery?: ICustomPaneFunctions;
      moneyFormat?: string;
      narrowMode?: number;
      noAskTell?: string;
      noTalkTo?: string;
      npcReactionsAlways?: boolean;
      openQuotation?: string;
      panes?: string;
      panesCollapseAt?: number;
      performanceLogStartTime?: number = performance.now();
      plainFontModeActive?: boolean;
      playMode: 'dev' | 'game' = 'game';
      questVersion?: string;
      roomSetList?: ICustomPaneFunctions;
      roomTemplate: string[] = [];
      saveDisabled?: boolean;
      saveLoadExcludedAtts: string[] = [];
      scriptDoc?: IScriptDoc;
      scriptLoading?: string;
      scriptLoadLogging?: boolean;
      scriptToLoad: any[] = [];
      silent?: boolean;
      soundsFileExt?: string;
      soundsFolder?: string;
      startingDialogEnabled?: boolean;
      statsData: IStatsDatum[] = [];
      status: TGetString[] = [];
      statusPane?: string;
      statusWidthLeft?: number;
      statusWidthRight?: number;
      styleFile?: string;
      symbolsForCompass?: boolean;
      tests?: boolean;
      textEffectDelay?: number;
      textInput?: boolean;
      thanks: any[] = [];
      themes: string[] = [];
      timerInterval?: number;
      title?: string;
      turnsQuestionsLast?: number;
      verbosity?: number;
      version?: string;
      videosFolder?: string;
      walkthroughMenuResponses: any[] = [];
      warnings: string = '';

      constructor(data: Partial<Settings>) {
        Object.assign(this, data);
      }

      add(data: Partial<Settings>) {
        Object.assign(this, data);
      }

      getDefaultRoomHeading(item: any) {
        return Quest.Utilities.sentenceCase(Quest.lang.addDefiniteArticle(item) + item.alias)
      }

      // Functions for the side panes lists
      isHeldNotWorn(item: any) {
        return item.isAtLoc(Quest.World.player.name, Quest.World.world.SIDE_PANE) && Quest.World.world.ifNotDark(item) && !item.getWorn();
      }
      isHere(item: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sceneryInSidePane' does not exist on typ... Remove this comment to see the full error message
        return item.isAtLoc(Quest.World.player.loc, this.sceneryInSidePane ? Quest.World.world.PARSER : Quest.World.world.SIDE_PANE) && Quest.World.world.ifNotDark(item);
      }
      isWorn(item: any) {
        return item.isAtLoc(Quest.World.player.name, Quest.World.world.SIDE_PANE) && Quest.World.world.ifNotDark(item) && item.getWorn();
      }

      // This is split out for Quest.IO.io.showInTab to use
      loadCssFiles(doc = document, path = '') {
        this.loadCssFile(this.cssFolder + 'default.css', doc, path)
        for (let file of this.themes) {
          this.loadCssFile(this.cssFolder + file + '.css', doc, path)
        }
        if (this.styleFile) {
          this.loadCssFile(this.folder + this.styleFile + '.css', doc, path)
        }
      }

      loadCssFile(filename: any, doc = document, path = '') {
        const link = document.createElement("link")
        link.href = path + filename
        link.type = "text/css"
        link.rel = "stylesheet"
        link.media = "screen,print"
        doc.head.appendChild(link)
      }

      loadFavicon() {
        if (!this.favicon) this.favicon = this.iconsFolder + 'favicon.png'
        const link = document.createElement('link')
        link.id = 'dynamic-favicon'
        link.rel = 'shortcut icon'
        link.href = this.favicon
        const oldLink = document.getElementById('dynamic-favicon')
        if (oldLink) document.head.removeChild(oldLink)
        document.head.appendChild(link)
      }

      loadScript(filename: any, doc = document) {
        if (doc) {
          this.scriptDoc = doc
        }
        this.scriptToLoad.push(filename)
        if (!this.scriptLoading) this.scriptOnLoad()
      }

      scriptOnLoad() {
        if (this.scriptLoading && this.scriptLoadLogging) console.log('Loaded ' + this.scriptLoading)
        if (!this.scriptToLoad || this.scriptToLoad.length === 0) {
          if (this.scriptLoadLogging) console.log('All script files loaded')
          this.performanceLog('Scripts loaded')

          // This is currently untested !!!!
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'soundFiles' does not exist on type '{ pe... Remove this comment to see the full error message
          if (this.soundFiles) {
            const main = document.querySelector('#main')
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'soundFiles' does not exist on type '{ pe... Remove this comment to see the full error message
            for (let el of this.soundFiles) {
              const audio = document.createElement('audio')
              // @ts-expect-error ts-migrate(2551) FIXME: Property 'seAttribute' does not exist on type 'HTM... Remove this comment to see the full error message
              audio.seAttribute('id', el)
              // @ts-expect-error ts-migrate(2551) FIXME: Property 'seAttribute' does not exist on type 'HTM... Remove this comment to see the full error message
              audio.seAttribute('src', this.soundsFolder + el + this.soundsFileExt)
              // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
              main.appendChild(audio)
            }
            this.performanceLog('Audio loaded')
          }

          Quest.World.world.init()
          this.performanceLog('World initiated')
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ nextid: ... Remove this comment to see the full error message
          Quest.IO.io.init()
          this.performanceLog('Quest.IO.io.init completed')
          return
        }
        this.scriptLoading = this.scriptToLoad?.shift()
        if (this.scriptLoadLogging) console.log('Loading ' + this.scriptLoading)
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const myScript = document.createElement("script")
        myScript.setAttribute("src", this.scriptLoading);
        myScript.onload = () => this.scriptOnLoad();
        myScript.onerror = () => {
          console.log("Failed to load file \"" + this.scriptLoading + "\".")
          console.log("Check the file and folder actually exist.")
        }
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        document.head.appendChild(myScript)
      }

      writeScript(folder: any) {
        this.folder = folder ? folder + '/' : ''
        this.performanceLog('Load CSS files')
        this.loadCssFiles()
        this.loadFavicon()
        this.performanceLog('Queue files')
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
        if (this.tests && this.playMode === 'dev') {
          this.loadScript('lib/test-lib.js')
          this.loadScript(this.folder + 'tests.js')
        }
        this.loadScript((folder ? 'lang/' : '') + this.lang + '.js')
        if (this.customExits) {
          this.loadScript(this.folder + this.customExits + '.js')
        }
        for (let file of this.libraries) {
          this.loadScript((folder ? 'lib/' : '') + file + '.js')
        }
        for (let lib of this.customLibraries) {
          for (let file of lib.files) {
            this.loadScript((folder ? lib.folder + '/' : '') + file + '.js')
          }
        }
        for (let file of this.files) {
          this.loadScript(this.folder + file + '.js')
        }
        this.performanceLog('Files queued')
      }

      performanceLogStart() {
        this.performanceLogStartTime = performance.now()
      }

      performanceLog(s: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'performanceLogging' does not exist on ty... Remove this comment to see the full error message
        if (!this.performanceLogging) return
        // @ts-expect-error ts-migrate(2550) FIXME: Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
        const dur = Math.round(performance.now() - this.performanceLogStartTime).toString().padStart(4)
        console.log(s.padEnd(32) + dur)
      }

      setUpDialog() {
        const diag = document.querySelector("#dialog")
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector("#dialog-title").innerHTML = this.startingDialogTitle
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector("#dialog-content").innerHTML = this.startingDialogHtml
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogButton' does not exist on ... Remove this comment to see the full error message
        if (this.startingDialogButton) document.querySelector("#dialog-button").innerHTML = this.startingDialogButton
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector("#dialog-button").addEventListener('click', () => {
          this.startingDialogEnabled = false
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
          Quest.IO.io.enable()
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogOnClick' does not exist on... Remove this comment to see the full error message
          this.startingDialogOnClick()
          Quest.World.world.begin()
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          if (this.textInput) { document.querySelector('#textbox').focus(); }
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.querySelector("#dialog").style.display = 'none'
        })

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
        Quest.IO.io.disable()
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        diag.show()
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        diag.style.display = 'block'
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        diag.style.width = this.startingDialogWidth + 'px'
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        diag.style.height = this.startingDialogHeight + 'px'
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        diag.style.top = '100px'
      }
    }

    export const settings: Settings = new Settings({
      performanceLogStartTime: performance.now(),
      // Files
      lang: "lang-en",      // Set to the language file of your choice
      customExits: false,      // Set to true to use custom exits, in exits.js
      files: ["code", "data"], // Additional files to load
      libraries: ["_file_saver", "_saveload", "_text", "_io", "_command", "_defaults", "_templates", "_world", "_npc", "_parser", "_commands"],  // util already loaded
      customLibraries: [],
      imagesFolder: 'assets/images/',
      iconsFolder: 'assets/icons/',
      soundsFolder: 'assets/audio/',
      videosFolder: 'assets/video/',
      cssFolder: 'assets/css/',
      themes: ['sans-serif'],
      soundsFileExt: '.mp3',

      // The side panes
      panes: 'left',           //Can be set to Left, Right or None (setting PANES to None will more than double the speed of your game!)
      panesCollapseAt: 700,
      compassPane: true,           // Set to true to have a compass Quest.World.world.
      symbolsForCompass: true,
      statusPane: "Status",    // Title of the panel; set to false to turn off
      statusWidthLeft: 120,    // How wide the left column is in the status pane
      statusWidthRight: 40,    // How wide the right column is in the status pane
      status: [() => ("<td>Health points:</td><td>" + Quest.World.player.hitpoints + "</td>")],
      customPaneFunctions: {},

      // Other UI settings
      textInput: true,         // Allow the player to type commands
      cursor: ">",             // The cursor, obviously
      cmdEcho: true,           // Commands are printed to the screen
      textEffectDelay: 25,
      roomTemplate: [
        "#{cap:{hereName}}",
        "{terse:{hereDesc}}",
        "{objectsHere:You can see {objects} here.}",
        "{exitsHere:You can go {exits}.}",
        "{ifNot:settings:playMode:play:{ifExists:Quest.World.currentLocation:todo:{class:todo:{show:Quest.World.currentLocation:todo}}}}",
      ],
      silent: false,
      walkthroughMenuResponses: [],
      startingDialogEnabled: false,
      darkModeActive: false,   // setting to true is a bad idea (use Quest.IO.io.toggleDarkMode)
      plainFontModeActive: false,   // setting to true is a bad idea (use Quest.IO.io.togglePlainFontMode)
      narrowMode: 0,
      mapAndImageCollapseAt: 1200,
      funcForDisambigMenu: 'showMenuWithNumbers',
      eventFunctions: {},
      timerInterval: 1000,  // For timer events, in milliseconds

      // Conversations settings
      noTalkTo: "TALK TO is not a feature in this game.",
      noAskTell: "ASK/TELL ABOUT is not a feature in this game.",
      npcReactionsAlways: false,
      turnsQuestionsLast: 5,
      givePlayerSayMsg: true,
      givePlayerAskTellMsg: true,
      funcForDynamicConv: 'showMenu',

      // Other game play settings
      failCountsAsTurn: false,
      lookCountsAsTurn: false,
      beforeEnter: noop,
      afterEnter: noop,

      // When save is disabled, objects can be created during game play
      saveDisabled: false,

      // Date and time settings
      dateTime: {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        secondsPerTurn: 60,
        locale: 'en-GB',
        start: new Date('February 14, 2019 09:43:00'),
      },

      // Other settings
      // The parser will convert "two" to 2" in player input (can slow down the game)
      convertNumbersInParser: true,
      tests: false,
      maxUndo: 10,
      moneyFormat: "$!",
      questVersion: '0.9',
      mapStyle: { right: '0', top: '200px', width: '300px', height: '300px', 'background-color': 'beige' },
      openQuotation: "'",
      closeQuotation: "'",
      fluids: [],
      afterTurn: [],
      afterFinish: [],
      roomSetList: {},
      saveLoadExcludedAtts: [
        "name", "ensembleMembers", "clonePrototype", "saveLoadExcludedAtts", "startTime",
        "verbFunctions", "pronouns", "nameModifierFunctions",
        "afterEnterIf", "askOptions", "tellOptions", "regex",
        "reactions", "receiveItems", "scopeStatus",
      ],

      statsData: [
        { name: 'Objects', test: function (o: any) { return true } },
        { name: 'Locations', test: function (o: any) { return o.room } },
        { name: 'Items', test: function (o: any) { return !o.room } },
        { name: 'Takeables', test: function (o: any) { return o.takeable } },
        { name: 'Scenery', test: function (o: any) { return o.scenery } },
        { name: 'NPCs', test: function (o: any) { return o.npc && !o.player } },
      ],

      performanceLog: noop,
      scriptLoading: undefined,
      scriptToLoad: [],
      scriptLoadLogging: false,
      scriptDoc: undefined,

    });
  }
}
