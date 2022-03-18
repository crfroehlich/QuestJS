/* eslint-disable class-methods-use-this */
import {
  ISettings, IDateTime, IFileSaver, IInventoryPane, IMapStyle, IScriptDoc, IStatsDatum,
} from '../types/iquest';
import { Quest } from '../types/quest';

export class Settings implements ISettings {
  afterEnter?: any;

  afterFinish: any[] = [];

  afterTurn: any[] = [];

  author?: string;

  autoscroll?: boolean;

  beforeEnter?: any;

  closeQuotation?: string;

  cmdEcho?: boolean;

  compassPane?: boolean;

  convertNumbersInParser?: boolean;

  cssFolder?: string;

  cursor?: string;

  customExits?: boolean;

  customLibraries: any[] = [];

  customPaneFunctions?: IFileSaver;

  darkModeActive?: boolean;

  dateTime?: IDateTime;

  delayStart?: boolean;

  eventFunctions?: IFileSaver;

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
    {
      alt: 'itemsHeld',
      getLoc() {
        return Quest.World.player.name;
      },
      name: 'Items Held',
      test: this.isHeldNotWorn,
    },
    {
      alt: 'itemsWorn',
      getLoc() {
        return Quest.World.player.name;
      },
      name: 'Items Worn',
      test: this.isWorn,
    },
    {
      alt: 'itemsHere',
      getLoc() {
        return Quest.World.player.loc;
      },
      name: 'Items Here',
      test: this.isHere,
    },
  ];

  lang?: string;

  libraries: string[] = [];

  lookCountsAsTurn?: boolean;

  mapAndImageCollapseAt?: number;

  mapStyle?: IMapStyle;

  maxUndo = 1000;

  mediaQuery?: IFileSaver;

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

  roomSetList?: IFileSaver;

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

  status: any;

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

  warnings = '';

  sceneryInSidePane = '';

  [key: string]: any;

  constructor(data: Partial<Settings>) {
    Object.assign(this, data);
  }

  add(data: Partial<Settings>) {
    Object.assign(this, data);
  }

  getDefaultRoomHeading(item: any) {
    return Quest.Utilities.sentenceCase(Quest.lang.addDefiniteArticle(item) + item.alias);
  }

  // Functions for the side panes lists
  isHeldNotWorn(item: any) {
    return item.isAtLoc(Quest.World.player.name, Quest.World.world.SIDE_PANE) && Quest.World.world.ifNotDark(item) && !item.getWorn();
  }

  isHere(item: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'sceneryInSidePane' does not exist on typ... Remove this comment to see the full error message
    return item.isAtLoc(Quest.World.player.loc, this.sceneryInSidePane ? Quest.World.world.PARSER : Quest.World.world.SIDE_PANE) && Quest.World.world.ifNotDark(item);
  }

  isWorn(item: any) {
    return item.isAtLoc(Quest.World.player.name, Quest.World.world.SIDE_PANE) && Quest.World.world.ifNotDark(item) && item.getWorn();
  }

  // This is split out for Quest.IO.io.showInTab to use
  loadCssFiles(doc = document, path = '') {
    this.loadCssFile(`${this.cssFolder}default.css`, doc, path);
    for (const file of this.themes) {
      this.loadCssFile(`${this.cssFolder + file}.css`, doc, path);
    }
    if (this.styleFile) {
      this.loadCssFile(`${this.folder + this.styleFile}.css`, doc, path);
    }
  }

  loadCssFile(filename: any, doc = document, path = '') {
    const link = document.createElement('link');
    link.href  = path + filename;
    link.type  = 'text/css';
    link.rel   = 'stylesheet';
    link.media = 'screen,print';
    doc.head.appendChild(link);
  }

  loadFavicon() {
    if (!this.favicon) this.favicon = `${this.iconsFolder}favicon.png`;
    const link    = document.createElement('link');
    link.id       = 'dynamic-favicon';
    link.rel      = 'shortcut icon';
    link.href     = this.favicon;
    const oldLink = document.getElementById('dynamic-favicon');
    if (oldLink) document.head.removeChild(oldLink);
    document.head.appendChild(link);
  }

  loadScript(filename: any, doc = document) {
    if (doc) {
      this.scriptDoc = doc;
    }
    this.scriptToLoad.push(filename);
    if (!this.scriptLoading) this.scriptOnLoad();
  }

  scriptOnLoad() {
    if (this.scriptLoading && this.scriptLoadLogging) console.log(`Loaded ${this.scriptLoading}`);
    if (!this.scriptToLoad || this.scriptToLoad.length === 0) {
      if (this.scriptLoadLogging) console.log('All script files loaded');
      this.performanceLog('Scripts loaded');

      // This is currently untested !!!!
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'soundFiles' does not exist on type '{ pe... Remove this comment to see the full error message
      if (this.soundFiles) {
        const main = document.querySelector('#main');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'soundFiles' does not exist on type '{ pe... Remove this comment to see the full error message
        for (const el of this.soundFiles) {
          const audio = document.createElement('audio');
          // ts-error-fixed ts-migrate(2551) FIXME: Property 'seAttribute' does not exist on type 'HTM... Remove this comment to see the full error message
          audio.setAttribute('id', el);
          // ts-error-fixed ts-migrate(2551) FIXME: Property 'seAttribute' does not exist on type 'HTM... Remove this comment to see the full error message
          audio.setAttribute('src', this.soundsFolder + el + this.soundsFileExt);
          // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
          main.appendChild(audio);
        }
        this.performanceLog('Audio loaded');
      }

      Quest.World.world.init();
      this.performanceLog('World initiated');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ nextid: ... Remove this comment to see the full error message
      Quest.IO.io.init();
      this.performanceLog('Quest.IO.io.init completed');
      return;
    }
    this.scriptLoading = this.scriptToLoad?.shift();
    if (this.scriptLoadLogging) console.log(`Loading ${this.scriptLoading}`);
    // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const myScript = document.createElement('script');
    myScript.setAttribute('src', this.scriptLoading);
    myScript.onload  = () => this.scriptOnLoad();
    myScript.onerror = () => {
      console.log(`Failed to load file "${this.scriptLoading}".`);
      console.log('Check the file and folder actually exist.');
    };
    // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    document.head.appendChild(myScript);
  }

  writeScript(folder: any) {
    this.folder = folder ? `${folder}/` : '';
    this.performanceLog('Load CSS files');
    this.loadCssFiles();
    this.loadFavicon();
    this.performanceLog('Queue files');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (this.tests && this.playMode === 'dev') {
      this.loadScript('lib/test-lib.js');
      this.loadScript(`${this.folder}tests.js`);
    }
    this.loadScript(`${(folder ? 'lang/' : '') + this.lang}.js`);
    if (this.customExits) {
      this.loadScript(`${this.folder + this.customExits}.js`);
    }
    for (const file of this.libraries) {
      this.loadScript(`${(folder ? 'lib/' : '') + file}.js`);
    }
    for (const lib of this.customLibraries) {
      for (const file of lib.files) {
        this.loadScript(`${(folder ? `${lib.folder}/` : '') + file}.js`);
      }
    }
    for (const file of this.files) {
      this.loadScript(`${this.folder + file}.js`);
    }
    this.performanceLog('Files queued');
  }

  performanceLogStart() {
    this.performanceLogStartTime = performance.now();
  }

  performanceLog(s: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'performanceLogging' does not exist on ty... Remove this comment to see the full error message
    if (!this.performanceLogging) return;
    // ts-error-fixed ts-migrate(2550) FIXME: Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
    const dur = Math.round(performance.now() - this.performanceLogStartTime).toString().padStart(4);
    console.log(s.padEnd(32) + dur);
  }

  setUpDialog() {
    const diag = document.querySelector('#dialog') as HTMLDialogElement;
    if (!diag) return;

    const diagTitle = document.querySelector('#dialog-title') as HTMLElement;
    if (!diagTitle) return;
    diagTitle.innerHTML = this.startingDialogTitle;

    const diagContent = document.querySelector('#dialog-content') as HTMLElement;
    if (!diagContent) return;
    diagContent.innerHTML = this.startingDialogHtml;

    const diagButton = document.querySelector('#dialog-button') as HTMLElement;
    if (!diagButton) return;
    if (this.startingDialogButton) {
      diagButton.innerHTML = this.startingDialogButton;
    }

    diagButton.addEventListener('click', () => {
      this.startingDialogEnabled = false;
      Quest.IO.io.enable();
      this.startingDialogOnClick();
      Quest.World.world.begin();
      if (this.textInput) {
        const tb = document.querySelector('#textbox') as HTMLElement;
        tb.focus();
      }
      diag.style.display = 'none';
    });

    Quest.IO.io.disable();
    // diag.show();
    diag.style.display = 'block';
    diag.style.width   = `${this.startingDialogWidth}px`;
    diag.style.height  = `${this.startingDialogHeight}px`;
    diag.style.top     = '100px';
  }
}

export const settings: Settings = new Settings({

  afterEnter: () => { },

  afterFinish: [],

  afterTurn: [],

  beforeEnter: () => { },

  closeQuotation: "'",

  // The cursor, obviously
  cmdEcho: true,

  compassPane: true,

  // Other settings
  // The parser will convert "two" to 2" in player input (can slow down the game)
  convertNumbersInParser: true,

  cssFolder: 'assets/css/',

  // Allow the player to type commands
  cursor: '>',

  // Set to the language file of your choice
  customExits: false,

  // util already loaded
  customLibraries: [],

  customPaneFunctions: {},

  darkModeActive: false,

  // Date and time settings
  dateTime: {
    day:            '2-digit',
    hour:           '2-digit',
    locale:         'en-GB',
    minute:         '2-digit',
    month:          'short',
    secondsPerTurn: 60,
    start:          new Date('February 14, 2019 09:43:00'),
    year:           '2-digit',
  },

  eventFunctions: {},

  // Other game play settings
  failCountsAsTurn: false,

  // Set to true to use custom exits, in exits.js
  files: ['code', 'data'],

  fluids: [],

  funcForDisambigMenu: 'showMenuWithNumbers',

  funcForDynamicConv: 'showMenu',

  givePlayerAskTellMsg: true,

  givePlayerSayMsg: true,

  iconsFolder: 'assets/icons/',

  imagesFolder: 'assets/images/',

  // Files
  lang: 'lang-en',

  // Additional files to load
  libraries: [], // ['_file_saver', '_saveload', '_text', '_io', '_command', '_defaults', '_templates', '_world', '_npc', '_parser', '_commands'],

  lookCountsAsTurn: false,

  mapAndImageCollapseAt: 1200,

  mapStyle: {
    'background-color': 'beige', height: '300px', right: '0', top: '200px', width: '300px',
  },

  maxUndo: 10,

  moneyFormat: '$!',

  // setting to true is a bad idea (use Quest.IO.io.togglePlainFontMode)
  narrowMode: 0,

  noAskTell: 'ASK/TELL ABOUT is not a feature in this game.',

  // For timer events, in milliseconds
  // Conversations settings
  noTalkTo: 'TALK TO is not a feature in this game.',

  npcReactionsAlways: false,

  openQuotation: "'",

  // The side panes
  panes: 'left',

  // Can be set to Left, Right or None (setting PANES to None will more than double the speed of your game!)
  panesCollapseAt: 700,

  performanceLog: () => { },

  performanceLogStartTime: performance.now(),

  // setting to true is a bad idea (use Quest.IO.io.toggleDarkMode)
  plainFontModeActive: false,

  questVersion: '0.9',

  roomSetList: {},

  roomTemplate: [
    '#{cap:{hereName}}',
    '{terse:{hereDesc}}',
    '{objectsHere:You can see {objects} here.}',
    '{exitsHere:You can go {exits}.}',
    '{ifNot:settings:playMode:play:{ifExists:Quest.World.currentLocation:todo:{class:todo:{show:Quest.World.currentLocation:todo}}}}',
  ],

  // When save is disabled, objects can be created during game play
  saveDisabled: false,

  saveLoadExcludedAtts: [
    'name', 'ensembleMembers', 'clonePrototype', 'saveLoadExcludedAtts', 'startTime',
    'verbFunctions', 'pronouns', 'nameModifierFunctions',
    'afterEnterIf', 'askOptions', 'tellOptions', 'regex',
    'reactions', 'receiveItems', 'scopeStatus',
  ],

  scriptDoc: undefined,

  scriptLoadLogging: false,

  scriptLoading: undefined,

  scriptToLoad: [],

  silent: false,

  soundsFileExt: '.mp3',

  soundsFolder: 'assets/audio/',

  startingDialogEnabled: false,

  statsData: [
    {
      name: 'Objects',
      test: (o: any) => true,
    },
    {
      name: 'Locations',
      test(o: any) {
        return o.room;
      },
    },
    {
      name: 'Items',
      test(o: any) {
        return !o.room;
      },
    },
    {
      name: 'Takeables',
      test(o: any) {
        return o.takeable;
      },
    },
    {
      name: 'Scenery',
      test(o: any) {
        return o.scenery;
      },
    },
    {
      name: 'NPCs',
      test(o: any) {
        return o.npc && !o.player;
      },
    },
  ],

  // How wide the right column is in the status pane
  status: [() => (`<td>Health points:</td><td>${Quest.World.player.hitpoints}</td>`)],

  statusPane: 'Status',

  // Title of the panel; set to false to turn off
  statusWidthLeft: 120,

  // How wide the left column is in the status pane
  statusWidthRight: 40,

  // Set to true to have a compass Quest.World.world.
  symbolsForCompass: true,

  tests: false,

  // Commands are printed to the screen
  textEffectDelay: 25,

  // Other UI settings
  textInput: true,

  themes: ['sans-serif'],

  timerInterval:            1000,
  turnsQuestionsLast:       5,
  videosFolder:             'assets/video/',
  walkthroughMenuResponses: [],

});

Quest.Settings = {
  Settings,
  settings,
};
