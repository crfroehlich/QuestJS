"use strict";

// Comment necessary for require in QEdit


const settings = {
  performanceLogStartTime:performance.now(),

  
  // Also title, author, thanks (option; array)
  
  // Files
  lang:"lang-en",      // Set to the language file of your choice
  customExits:false,      // Set to true to use custom exits, in exits.js
  files:["code", "data"], // Additional files to load
  libraries:["_file_saver", "_saveload", "_text", "_io", "_command", "_defaults", "_templates", "_world", "_npc", "_parser", "_commands"],  // util already loaded
  customLibraries:[],
  imagesFolder:'assets/images/',
  iconsFolder:'assets/icons/',
  soundsFolder:'assets/audio/',
  videosFolder:'assets/video/',
  cssFolder:'assets/css/',
  themes:['sans-serif'],
  soundsFileExt:'.mp3',
  

  // The side panes
  panes:'left',           //Can be set to Left, Right or None (setting PANES to None will more than double the speed of your game!)
  panesCollapseAt:700,
  compassPane:true,           // Set to true to have a compass world.
  symbolsForCompass:true,
  statusPane:"Status",    // Title of the panel; set to false to turn off
  statusWidthLeft:120,    // How wide the left column is in the status pane
  statusWidthRight:40,    // How wide the right column is in the status pane
  status:[
    function() { return "<td>Health points:</td><td>" + player.hitpoints + "</td>"; },
  ],
  customPaneFunctions:{},

  // Functions for the side panes lists
  isHeldNotWorn:function(item: any) {
    return item.isAtLoc(player.name, world.SIDE_PANE) && world.ifNotDark(item) && !item.getWorn();
  },
  isHere:function(item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'sceneryInSidePane' does not exist on typ... Remove this comment to see the full error message
    return item.isAtLoc(player.loc, settings.sceneryInSidePane ? world.PARSER : world.SIDE_PANE) && world.ifNotDark(item);
  },
  isWorn:function(item: any) {
    return item.isAtLoc(player.name, world.SIDE_PANE) && world.ifNotDark(item) && item.getWorn();
  },


  // Other UI settings
  textInput:true,         // Allow the player to type commands
  cursor:">",             // The cursor, obviously
  cmdEcho:true,           // Commands are printed to the screen
  textEffectDelay:25,
  roomTemplate:[
    "#{cap:{hereName}}",
    "{terse:{hereDesc}}",
    "{objectsHere:You can see {objects} here.}",
    "{exitsHere:You can go {exits}.}",
    "{ifNot:settings:playMode:play:{ifExists:currentLocation:todo:{class:todo:{show:currentLocation:todo}}}}",
  ],
  silent:false,
  walkthroughMenuResponses:[],
  startingDialogEnabled:false,
  darkModeActive:false,   // setting to true is a bad idea (use io.toggleDarkMode)
  plainFontModeActive:false,   // setting to true is a bad idea (use io.togglePlainFontMode)
  narrowMode:0,
  mapAndImageCollapseAt:1200,
  funcForDisambigMenu:'showMenuWithNumbers',
  eventFunctions:{},
  timerInterval:1000,  // For timer events, in milliseconds



  // Conversations settings
  noTalkTo:"TALK TO is not a feature in this game.",
  noAskTell:"ASK/TELL ABOUT is not a feature in this game.",
  npcReactionsAlways:false,
  turnsQuestionsLast:5,
  givePlayerSayMsg:true,
  givePlayerAskTellMsg:true,
  funcForDynamicConv:'showMenu',

  // Other game play settings
  failCountsAsTurn:false,
  lookCountsAsTurn:false,
  beforeEnter:function () {},
  afterEnter:function () {},

  // When save is disabled, objects can be created during game play
  saveDisabled:false,

  // Date and time settings
  dateTime:{
    year:"numeric",
    month:"short",
    day:"2-digit",
    hour:"2-digit",
    minute:"2-digit",
    secondsPerTurn:60,
    locale:'en-GB',
    start:new Date('February 14, 2019 09:43:00'),
  },


  // Other settings
  // The parser will convert "two" to 2" in player input (can slow down the game)
  convertNumbersInParser:true,
  tests:false,
  maxUndo:10,
  moneyFormat:"$!",
  questVersion:'0.9',
  mapStyle:{right:'0', top:'200px', width:'300px', height:'300px', 'background-color':'beige' },
  openQuotation:"'",
  closeQuotation:"'",
  fluids:[],
  getDefaultRoomHeading:function(item: any) { return sentenceCase(lang.addDefiniteArticle(item) + item.alias) },
  afterTurn:[],
  afterFinish:[],
  roomSetList:{},



  saveLoadExcludedAtts:[
    "name", "ensembleMembers", "clonePrototype", "saveLoadExcludedAtts",  "startTime",
    "verbFunctions", "pronouns", "nameModifierFunctions",
    "afterEnterIf", "askOptions", "tellOptions", "regex",
    "reactions", "receiveItems", "scopeStatus",
  ],




  statsData:[
    {name:'Objects', test:function(o: any) { return true }},
    {name:'Locations', test:function(o: any) { return o.room }},
    {name:'Items', test:function(o: any) { return !o.room }},
    {name:'Takeables', test:function(o: any) { return o.takeable }},
    {name:'Scenery', test:function(o: any) { return o.scenery }},
    {name:'NPCs', test:function(o: any) { return o.npc && !o.player }},
  ],

  performanceLog:function() { },

  // This is split out for io.showInTab to use
  loadCssFiles:function(doc = document, path = '') {
    settings.loadCssFile(settings.cssFolder + 'default.css', doc, path)
    for (let file of settings.themes) {
      settings.loadCssFile(settings.cssFolder + file + '.css', doc, path)
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
    if (settings.styleFile) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'folder' does not exist on type '{ perfor... Remove this comment to see the full error message
      settings.loadCssFile(settings.folder + settings.styleFile + '.css', doc, path)
    }
  },


  loadCssFile:function(filename: any, doc = document, path = '') {
    const link = document.createElement( "link" )
    link.href = path + filename
    link.type = "text/css"
    link.rel = "stylesheet"
    link.media = "screen,print"
    doc.head.appendChild(link)
  },
  
  loadFavicon:function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'favicon' does not exist on type '{ perfo... Remove this comment to see the full error message
    if (!settings.favicon) settings.favicon = settings.iconsFolder + 'favicon.png'
    const link = document.createElement('link')
    link.id = 'dynamic-favicon'
    link.rel = 'shortcut icon'
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'favicon' does not exist on type '{ perfo... Remove this comment to see the full error message
    link.href = settings.favicon
    const oldLink = document.getElementById('dynamic-favicon')
    if (oldLink) document.head.removeChild(oldLink)
    document.head.appendChild(link)
  },  

  scriptLoading:undefined,
  scriptToLoad:[],
  scriptLoadLogging:false,
  scriptDoc:undefined,
  
  loadScript:function(filename: any, doc = document) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Document' is not assignable to type 'undefin... Remove this comment to see the full error message
    settings.scriptDoc = doc
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
    settings.scriptToLoad.push(filename)
    if (!settings.scriptLoading) settings.scriptOnLoad()
  },
  
  scriptOnLoad:function() {
    if (settings.scriptLoading && settings.scriptLoadLogging) console.log('Loaded ' + settings.scriptLoading)
    if (settings.scriptToLoad.length === 0) {
      if (settings.scriptLoadLogging) console.log('All script files loaded')
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      settings.performanceLog('Scripts loaded')

      // This is currently untested !!!!
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'soundFiles' does not exist on type '{ pe... Remove this comment to see the full error message
      if (settings.soundFiles) {
        const main = document.querySelector('#main')
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'soundFiles' does not exist on type '{ pe... Remove this comment to see the full error message
        for (let el of settings.soundFiles) {
          const audio = document.createElement('audio')
          // @ts-expect-error ts-migrate(2551) FIXME: Property 'seAttribute' does not exist on type 'HTM... Remove this comment to see the full error message
          audio.seAttribute('id', el)
          // @ts-expect-error ts-migrate(2551) FIXME: Property 'seAttribute' does not exist on type 'HTM... Remove this comment to see the full error message
          audio.seAttribute('src',settings.soundsFolder + el + settings.soundsFileExt)
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          main.appendChild(audio)
        }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        settings.performanceLog('Audio loaded')
      }

      world.init()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      settings.performanceLog('World initiated')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ nextid: ... Remove this comment to see the full error message
      io.init()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      settings.performanceLog('io.init completed')
      return
    }
    settings.scriptLoading = settings.scriptToLoad.shift()
    if (settings.scriptLoadLogging) console.log('Loading ' + settings.scriptLoading)
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    const myScript = settings.scriptDoc.createElement("script")
    myScript.setAttribute("src", settings.scriptLoading)
    myScript.onload = settings.scriptOnLoad
    myScript.onerror = function() {
      console.log("Failed to load file \"" + settings.scriptLoading + "\".")
      console.log("Check the file and folder actually exist.")
    }
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    settings.scriptDoc.head.appendChild(myScript)
  },

  writeScript:function(folder: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'folder' does not exist on type '{ perfor... Remove this comment to see the full error message
    settings.folder = folder ? folder + '/' : ''
    
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    settings.performanceLog('Load CSS files')
    settings.loadCssFiles()
    settings.loadFavicon()
    
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    settings.performanceLog('Queue files')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (settings.tests && settings.playMode === 'dev') {
      settings.loadScript('lib/test-lib.js')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'folder' does not exist on type '{ perfor... Remove this comment to see the full error message
      settings.loadScript(settings.folder + 'tests.js')
    }
    settings.loadScript((folder ? 'lang/' : '' ) + settings.lang + '.js')
    if (settings.customExits) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'folder' does not exist on type '{ perfor... Remove this comment to see the full error message
      settings.loadScript(settings.folder + settings.customExits + '.js')
    }
    for (let file of settings.libraries) {
      settings.loadScript((folder ? 'lib/' : '' ) + file + '.js')
    }
    for (let lib of settings.customLibraries) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'files' does not exist on type 'never'.
      for (let file of lib.files) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'folder' does not exist on type 'never'.
        settings.loadScript((folder ? lib.folder + '/' : '') + file + '.js')
      }
    }
    for (let file of settings.files) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'folder' does not exist on type '{ perfor... Remove this comment to see the full error message
      settings.loadScript(settings.folder + file + '.js')
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    settings.performanceLog('Files queued')
  }
}



//settings.scriptLoadLogging = true
// @ts-expect-error ts-migrate(2339) FIXME: Property 'performanceLogStart' does not exist on t... Remove this comment to see the full error message
settings.performanceLogStart = function() {
  settings.performanceLogStartTime = performance.now()
}
// @ts-expect-error ts-migrate(2322) FIXME: Type '(s: any) => void' is not assignable to type ... Remove this comment to see the full error message
settings.performanceLog = function(s: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'performanceLogging' does not exist on ty... Remove this comment to see the full error message
  if (!settings.performanceLogging) return
  // @ts-expect-error ts-migrate(2550) FIXME: Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
  const dur = Math.round(performance.now() - settings.performanceLogStartTime).toString().padStart(4)
  console.log(s.padEnd(32) + dur)
}






// These two functions use values in settings, so have to be set later
// @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
settings.inventoryPane = [
  {name:'Items Held', alt:'itemsHeld', test:settings.isHeldNotWorn, getLoc:function() { return player.name; } },
  {name:'Items Worn', alt:'itemsWorn', test:settings.isWorn, getLoc:function() { return player.name; } },
  {name:'Items Here', alt:'itemsHere', test:settings.isHere, getLoc:function() { return player.loc; } },
]

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setUpDialog' does not exist on type '{ p... Remove this comment to see the full error message
settings.setUpDialog = function() {
  const diag = document.querySelector("#dialog")
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector("#dialog-title").innerHTML = settings.startingDialogTitle
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector("#dialog-content").innerHTML = settings.startingDialogHtml
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogButton' does not exist on ... Remove this comment to see the full error message
  if (settings.startingDialogButton) document.querySelector("#dialog-button").innerHTML = settings.startingDialogButton
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  document.querySelector("#dialog-button").addEventListener('click', function() {
    settings.startingDialogEnabled = false
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'enable' does not exist on type '{ nextid... Remove this comment to see the full error message
    io.enable()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogOnClick' does not exist on... Remove this comment to see the full error message
    settings.startingDialogOnClick()
    world.begin()
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    if (settings.textInput) { document.querySelector('#textbox').focus(); }
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    document.querySelector("#dialog").style.display = 'none'
  })

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'disable' does not exist on type '{ nexti... Remove this comment to see the full error message
  io.disable()
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  diag.show()
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  diag.style.display = 'block'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  diag.style.width = settings.startingDialogWidth + 'px'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  diag.style.height = settings.startingDialogHeight + 'px'
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  diag.style.top = '100px'
}



// Used by the editor
try { util; }
catch (e) {
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
  module.exports = { settings:settings }
}

