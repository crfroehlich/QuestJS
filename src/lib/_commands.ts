// A command has an arbitrary name, a regex or pattern, 
// and a script as a minimum.
// regex           A regex to match against
// objects         An array of matches in the regex (see wiki)
// script          This will be run on a successful match
// attName         If there is no script, then this attribute on the object will be used
// nothingForAll   If the player uses ALL and there is nothing there, use this error message
// noobjecterror   If the player specifies an object
// noTurnscripts   Set to true to prevent turnscripts firing even when this command is successful

"use strict";




const cmdDirections = []
for (let exit of lang.exit_list) {
  if (exit.type === 'nocmd') continue
  cmdDirections.push(exit.name)
  cmdDirections.push(exit.abbrev.toLowerCase())
  if (exit.alt) cmdDirections.push(exit.alt)
}



const commands = [
  // ----------------------------------
  // Single word commands
  
  // Cannot just set the script to helpScript as we need to allow the
  // author to change it in code.js, which is loaded after this.
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaHelp', {
    script:lang.helpScript,
  }),    
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaHint', {
    script:lang.hintScript,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaCredits', {
    script:lang.aboutScript,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaDarkMode', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleDarkMode' does not exist on type '... Remove this comment to see the full error message
    script:io.toggleDarkMode,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaNarrowMode', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleNarrowMode' does not exist on type... Remove this comment to see the full error message
    script:io.toggleNarrowMode,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaAutoScrollMode', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleAutoScrollMode' does not exist on ... Remove this comment to see the full error message
    script:io.toggleAutoScrollMode,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaPlainFontMode', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlainFontMode' does not exist on t... Remove this comment to see the full error message
    script:io.togglePlainFontMode,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaSilent', {
    script:function() {
      if (Quest.settings.silent) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.mode_silent_off)
        Quest.settings.silent = false
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.mode_silent_on)
        Quest.settings.silent = true
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
        ambient()
      }
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaWarnings', {
    script:lang.warningsScript,
  }),
  
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaSpoken', {
    script:function() {
      if (io.spoken) {
        io.spoken = false
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.spoken_off)
      }
      else {
        io.spoken = true
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.spoken_on)
      }
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaIntro', {
    script:function() {
      io.spoken = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
      if (typeof Quest.settings.intro === "string") {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(Quest.settings.intro)
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
        for (let el of Quest.settings.intro) msg(el)
      }
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaBrief', {
    script:function() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbosity' does not exist on type '{ per... Remove this comment to see the full error message
      Quest.settings.verbosity = world.BRIEF
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(lang.mode_brief)
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaTerse', {
    script:function() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbosity' does not exist on type '{ per... Remove this comment to see the full error message
      Quest.settings.verbosity = world.TERSE
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(lang.mode_terse)
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaVerbose', {
    script:function() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbosity' does not exist on type '{ per... Remove this comment to see the full error message
      Quest.settings.verbosity = world.VERBOSE
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(llang.mode_verbose)
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaTranscript', {
    script:lang.transcriptScript,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaTranscriptStart', {
    script:function() {
      if (saveLoad.transcript) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.transcript_already_on)
        return world.FAILED
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      saveLoad.transcriptClear()
      saveLoad.transcriptStart()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaTranscriptOn', {
    script:function() {
      if (saveLoad.transcript) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.transcript_already_on)
        return world.FAILED
      }
      saveLoad.transcriptStart()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaTranscriptOff', {
    script:function() {
      if (!saveLoad.transcript) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.transcript_already_off)
        return world.FAILED
      }
      saveLoad.transcriptEnd()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaTranscriptClear', {
    script:function() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      saveLoad.transcriptClear()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaTranscriptShow', {
    script:function() {
      saveLoad.transcriptShow()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaUserComment', {
    script:function(arr: any) {
      commentmsg("Comment: " + arr[0])
      return world.SUCCESS_NO_TURNSCRIPTS
    },
    objects:[
      {special:'text'},
    ]
  }),
  
  // ----------------------------------
  // File system commands
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaSave', {
    script:lang.saveLoadScript,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaSaveOverwriteGame', {
    script:function(arr: any) {
      saveLoad.saveGame(arr[0], true)
      return world.SUCCESS_NO_TURNSCRIPTS;
    },
    objects:[
      {special:'text'},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaSaveGame', {
    script:function(arr: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'localStorageDisabled' does not exist on ... Remove this comment to see the full error message
      if (Quest.settings.localStorageDisabled) {
        saveLoad.saveGameAsFile(arr[0])
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        saveLoad.saveGame(arr[0])
      }
      return world.SUCCESS_NO_TURNSCRIPTS;
    },
    objects:[
      {special:'text'},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaFileSaveGame', {
    script:function(arr: any) {
      saveLoad.saveGameAsFile(arr[0])
      return world.SUCCESS_NO_TURNSCRIPTS;
    },
    objects:[
      {special:'text'},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaLoad', {
    script:function(arr: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'localStorageDisabled' does not exist on ... Remove this comment to see the full error message
      if (Quest.settings.localStorageDisabled) {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.getElementById('fileDialog').click()
      }
      else {
        lang.saveLoadScript()
      }
      return world.SUCCESS_NO_TURNSCRIPTS
    },
    objects:[
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaLoadGame', {
    script:function(arr: any) {
      saveLoad.loadGameFromLS(arr[0])
      return world.SUCCESS_NO_TURNSCRIPTS
    },
    objects:[
      {special:'text'},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaFileLoadGame', {
    script:function(arr: any) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.getElementById('fileDialog').click()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
    objects:[
      {special:'text'},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaDir', {
    script:function() {
      saveLoad.dirGame()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaDeleteGame', {
    script:function(arr: any) {
      saveLoad.deleteGame(arr[0])
      return world.SUCCESS_NO_TURNSCRIPTS
    },
    objects:[
      {special:'text'},
    ]
  }),


  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaUndo', {
    script:function() {
      if (Quest.settings.maxUndo === 0) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.undo_disabled)
        return world.FAILED
      }
      if (world.gameState.length < 2) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(lang.undo_not_available)
        return world.FAILED
      }
      world.gameState.pop()
      const gameState = world.gameState[world.gameState.length - 1]
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(lang.undo_done)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      saveLoad.loadTheWorld(gameState)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      w[player.loc].description()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaAgain', {
    script:function() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'againOrOops' does not exist on type '{ n... Remove this comment to see the full error message
      return io.againOrOops(true)
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaOops', {
    script:function() {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'againOrOops' does not exist on type '{ n... Remove this comment to see the full error message
      return io.againOrOops(false)
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaRestart', {
    script:function() {
      askText(lang.restart_are_you_sure, function(result: any) {
        if (result.match(lang.yes_regex)) {
          location.reload()
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          metamsg(lang.restart_no)
        }
      });
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaPronouns', {
    script:function() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg('See the developer console (F12) for the current pronouns')
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
      console.log(parser.pronouns)
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaScore', {
    script:function() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      metamsg(lang.scores_not_implemented)
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MetaTopicsNote', {
    script:lang.topicsScript,
  }),


  
  // These are kind of meta-commands - perhaps free commands is a better term.
  // I see them as jogging the user's mind about the game world, rather than
  // doing something in the game world, so by default
  // no ttime passes.
  // Set Quest.settings.lookCountsAsTurn to true if you disagree!
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Look', {
    script:function() {
      currentLocation.description();
      return Quest.settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Exits', {
    script:function() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(lang.can_go, {char:player});
      return Quest.settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Inv', {
    script:function() {
      const listOfOjects = player.getContents(world.INVENTORY);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(lang.inventory_prefix + " " + formatList(listOfOjects, {article:INDEFINITE, lastJoiner:lang.list_and, modified:true, nothing:lang.list_nothing, loc:player.name}) + ".", {char:player});
      return Quest.settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Map', {
    script:function() {
      if (typeof showMap !== 'undefined') {
        showMap();
        return Quest.settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
      }
      else {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const zone = w[player.loc]
        if (!zone.zone) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          return failedmsg(lang.no_map);
        }
        else {
          const flag = zone.drawMap()
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (!flag) return failedmsg(lang.no_map);
          return world.SUCCESS_NO_TURNSCRIPTS
        }
      }
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Topics', {
    attName:"topics",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
      {scope:parser.isNpcAndHere},
    ],
    defmsg:lang.no_topics,
  }),



  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Wait', {
    script:function() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(lang.wait_msg);
      return world.SUCCESS;
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Smell', {
    script:function() {
      if (currentLocation.smell) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        printOrRun(player, currentLocation, "smell");
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg(lang.no_smell, {char:player});
      }
      return world.SUCCESS;
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Listen', {
    script:function() {
      if (currentLocation.listen) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        printOrRun(player, currentLocation, "listen");
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg(lang.no_listen, {char:player});
      }
      return world.SUCCESS;
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('PurchaseFromList', {
    script:function() {
      const l = [];
      for (let key in w) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isForSale' does not exist on type '{}'.
        if (parser.isForSale(w[key])) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const price = w[key].getBuyingPrice(player)
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const row = [sentenceCase(w[key].getName()), world.Money(price)]
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          row.push(price > player.money ? "-" : "{cmd:buy " + w[key].alias + ":" + buy + "}")
          l.push(row)
        }
      }
      if (l.length === 0) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return failedmsg(lang.nothing_for_sale);
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(current_money + ": " + world.Money(player.money));
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
      msgTable(l, buy_headings)
      return world.SUCCESS_NO_TURNSCRIPTS;
    },
  }),
  

  // Out of convenient order as it needs to be before TAKE
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('GetFluid', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      {special:'fluid'},
    ],
    score:5,
    script:function(objects: any) {
      log('here')
      const options = {char:player, fluid:objects[0]}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{}'.
      if (!util.findSource(options)) return failedmsg(lang.no_fluid_here, options)
      log('here')
      return failedmsg(lang.cannot_get_fluid, options)
    },
  }),


  
  // ----------------------------------
  // Verb-object commands
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Examine', {
    npcCmd:true,
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, multiple:true}
    ],
    defmsg:lang.default_examine,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('LookAt', {  // used for NPCs
    npcCmd:true,
    attName:'examine',
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresentOrMe' does not exist on type '{... Remove this comment to see the full error message
      {scope:parser.isPresentOrMe}
    ],
    defmsg:lang.default_examine,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('LookOut', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    rules:[cmdRules.isPresent],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent}
    ],
    attName:"lookout",
    defmsg:lang.cannot_look_out,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('LookBehind', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    rules:[cmdRules.isPresent],
    attName:"lookbehind",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent}
    ],
    defmsg:lang.nothing_there,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('LookUnder', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    rules:[cmdRules.isPresent],
    attName:"lookunder",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent}
    ],
    defmsg:lang.nothing_there,
  }),  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('LookThrough', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    rules:[cmdRules.isPresent],
    attName:"lookthrough",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent}
    ],
    defmsg:lang.nothing_there,
  }),  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('LookInside', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    rules:[cmdRules.isPresent],
    attName:"lookinside",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent}
    ],
    defmsg:lang.nothing_inside,
  }),  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Search', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    rules:[cmdRules.isPresent],
    attName:"search",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent}
    ],
    defmsg:lang.nothing_there,
  }),  

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Take', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHereAlready' does not exist on type '{... Remove this comment to see the full error message
    rules:[cmdRules.isHereAlready, cmdRules.testManipulate],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHereOrContained' does not exist on typ... Remove this comment to see the full error message
      {scope:parser.isHereOrContained, allScope:parser.isHereOrLocationContained, multiple:true},
    ],
    defmsg:lang.cannot_take,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Drop', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
    rules:[cmdRules.isHeldNotWorn, cmdRules.testManipulate],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    default:function(options: any) { falsemsg(options.item.isAtLoc(options.char) ? lang.cannot_drop : lang.not_carrying, options) },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Wear2', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
    rules:[cmdRules.isHeldNotWorn, cmdRules.isHeld, cmdRules.testManipulate],
    attName:"wear",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    default:function(options: any) { falsemsg(options.item.ensemble ? lang.cannot_wear_ensemble : lang.cannot_wear, options) },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Wear', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
    rules:[cmdRules.isHeldNotWorn, cmdRules.testManipulate],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    default:function(options: any) { falsemsg(options.item.ensemble ? lang.cannot_wear_ensemble : lang.cannot_wear, options) },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Remove', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
    rules:[cmdRules.isWorn, cmdRules.testManipulate],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
      {scope:parser.isWorn, multiple:true},
    ],
    default:function(options: any) { falsemsg(options.item.ensemble ? lang.cannot_wear_ensemble : lang.not_wearing, options) },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Remove2', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
    rules:[cmdRules.isWorn, cmdRules.testManipulate],
    attName:"remove",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
      {scope:parser.isWorn, multiple:true},
    ],
    default:function(options: any) { falsemsg(options.item.ensemble ? lang.cannot_wear_ensemble : lang.not_wearing, options) },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Read', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
    rules:[cmdRules.isPresent],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    defmsg:lang.cannot_read,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Purchase', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isForSale' does not exist on type '{}'.
      {scope:parser.isForSale},
    ],
    defmsg:lang.cannot_purchase_here,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Sell', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
    rules:[cmdRules.isHeldNotWorn, cmdRules.testManipulate],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    defmsg:lang.cannot_sell_here,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Smash', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresent],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    defmsg:lang.cannot_smash,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Turn', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere},
    ],
    defmsg:lang.cannot_turn,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('TurnLeft', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere},
    ],
    defmsg:lang.cannot_turn,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('TurnRight', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere},
    ],
    defmsg:lang.cannot_turn,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('SwitchOn', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    attName:"switchon",
    cmdCategory:"SwitchOn",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    defmsg:lang.cannot_switch_on,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('SwitchOn2', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    attName:"switchon",
    cmdCategory:"SwitchOn",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    defmsg:lang.cannot_switch_on,
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('SwitchOff2', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    attName:"switchoff",
    cmdCategory:"SwitchOff",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true, attName:"switchon"},
    ],
    defmsg:lang.cannot_switch_off,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('SwitchOff', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    attName:"switchoff",
    cmdCategory:"SwitchOff",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true, attName:"switchoff"},
    ],
    defmsg:lang.cannot_switch_off,
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Open', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, multiple:true, attName:"open"},
    ],
    defmsg:lang.cannot_open,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('OpenWith', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, multiple:true, attName:"open"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
    ],
    defmsg:lang.cannot_open_with,
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Close', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, multiple:true, attName:"close"},
    ],
    defmsg:lang.cannot_close,
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Lock', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, multiple:true, attName:"lock"},
    ],
    defmsg:lang.cannot_lock,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('LockWith', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName:"lock"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, attName:'key'},
    ],
    defmsg:lang.cannot_lock_with,
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Unlock', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, multiple:true, attName:"unlock"},
    ],
    defmsg:lang.cannot_unlock,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('UnlockWith', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName:"unlock"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, attName:'key'},
    ],
    defmsg:lang.cannot_unlock_with,
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Push', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    defmsg:lang.nothing_useful,
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Pull', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    defmsg:lang.nothing_useful,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Fill', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    defmsg:lang.cannot_fill,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Empty', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    defmsg:lang.cannot_empty,
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('SmellItem', {
    npcCmd:true,
    attName:"smell",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName:"smell"},
    ],
    defmsg:lang.cannot_smell,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('ListenToItem', {
    npcCmd:true,
    attName:"listen",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName:"listen"},
    ],
    defmsg:lang.cannot_listen,
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Eat', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
    rules:[cmdRules.isHeldNotWorn, cmdRules.testManipulate],
    objects:[
      {special:'text'},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true, attName:"ingest"},
    ],
    defmsg:lang.cannot_eat,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Drink', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      {special:'text'},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName:"ingest"},
    ],
    defmsg:lang.cannot_drink,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Ingest', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      {special:'text'},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName:"ingest"},
    ],
    defmsg:lang.cannot_ingest,
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Sit', {
    npcCmd:true,
    cmdCategory:"Posture",
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPosture' does not exist on type '{}'... Remove this comment to see the full error message
    rules:[cmdRules.testPosture],
    attName:"siton",
    objects:[],
    script:function() {
      const objs = scopeBy((el: any) => el.siton && el.isAtLoc(player.loc))
      log(objs)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (objs.length === 0) return failedmsg(lang.no_sit_object)
      return objs[0].siton({char:player, item:objs[0]}) ? world.SUCCESS : world.FAILED
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Recline', {
    npcCmd:true,
    cmdCategory:"Posture",
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPosture' does not exist on type '{}'... Remove this comment to see the full error message
    rules:[cmdRules.testPosture],
    attName:"reclineon",
    objects:[],
    script:function() {
      const objs = scopeBy((el: any) => el.reclineon && el.isAtLoc(player.loc))
      log(objs)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (objs.length === 0) return failedmsg(lang.no_recline_object)
      return objs[0].reclineon({char:player, item:objs[0]}) ? world.SUCCESS : world.FAILED
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('SitOn', {
    npcCmd:true,
    cmdCategory:"Posture",
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPosture' does not exist on type '{}'... Remove this comment to see the full error message
    rules:[cmdRules.testPosture, cmdRules.isHere],
    attName:"siton",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"assumePosture"},
    ],
    defmsg:lang.cannot_sit_on,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('StandOn', {
    npcCmd:true,
    cmdCategory:"Posture",
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPosture' does not exist on type '{}'... Remove this comment to see the full error message
    rules:[cmdRules.testPosture, cmdRules.isHere],
    attName:"standon",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"assumePosture"},
    ],
    defmsg:lang.cannot_stand_on,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('ReclineOn', {
    npcCmd:true,
    cmdCategory:"Posture",
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPosture' does not exist on type '{}'... Remove this comment to see the full error message
    rules:[cmdRules.testPosture, cmdRules.isHere],
    attName:"reclineon",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"assumePosture"},
    ],
    defmsg:lang.cannot_recline_on,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('GetOff', {
    npcCmd:true,
    cmdCategory:"Posture",
    score:5, // to give priority over TAKE
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPosture' does not exist on type '{}'... Remove this comment to see the full error message
    rules:[cmdRules.testPosture, cmdRules.isHere],
    attName:"getoff",
    // @ts-expect-error ts-migrate(1117) FIXME: An object literal cannot have multiple properties ... Remove this comment to see the full error message
    cmdCategory:"Posture",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"assumePosture"},
    ],
    defmsg:lang.already,
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Use', {
    npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresentOrContained],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    script:function(objects: any) {
      const obj = objects[0][0]
      const options = {char:player, item:obj, verb:'use'}
      
      // Use this to bypass the rules, say if the object could be in a strange place
      if (obj.useFunction) {
        const result = obj.useFunction(options)
        return result ? world.SUCCESS : world.FAILED
      }

      if (obj.use) {
        const result = this.processCommand(options)
        return result ? world.SUCCESS : world.FAILED
      }
      
      if (obj.useDefaultsTo) {
        const cmd = findCmd(obj.useDefaultsTo(player))
        if (cmd) {
          const result = cmd.processCommand(options);
          return result ? world.SUCCESS : world.FAILED
        }
        else {
          throw new Error("USE command defaulting to unknown command " + obj.useDefaultsTo())
        }
      }

      this.default({char:player, item:obj})
      return world.FAILED; 
    },
    defmsg:lang.cannot_use,
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('TalkTo', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
    rules:[cmdRules.canTalkTo],
    attName:"talkto",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
      {scope:parser.isNpcAndHere},
    ],
    defmsg:lang.cannot_talk_to,
  }),




  
  
  // ----------------------------------
  // Complex commands
  
  
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Say', {
    script:function(arr: any) {
      const l = [];
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (w[key].sayCanHear && w[key].sayCanHear(player, arr[0])) l.push(w[key]);
      }
      l.sort(function(a, b) { return (b.sayPriority + b.sayBonus) - (a.sayPriority + b.sayBonus); });
      if (l.length === 0) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(lang.say_no_one_here(player, arr[0], arr[1]));
        return world.SUCCESS;
      }
      
      const options = {char:player, text: sentenceCase(arr[1])}
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      if (Quest.settings.givePlayerSayMsg) msg(lang.say_something, options)
      for (let chr of l) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (chr.sayQuestion && w[chr.sayQuestion].sayResponse(chr, arr[1])) return world.SUCCESS;
        if (chr.sayResponse && chr.sayResponse(arr[1], arr[0])) return world.SUCCESS;
      }
      if (Quest.settings.givePlayerSayMsg) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg(lang.say_no_response, options);
      }
      else {      
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg(lang.say_no_response_full, options);
      }
      return world.SUCCESS;
    },
    objects:[
      {special:'text'},
      {special:'text'},
    ]
  }),
  
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Stand', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPosture' does not exist on type '{}'... Remove this comment to see the full error message
    rules:[cmdRules.testPosture],
    script:handleStandUp,
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcStand', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPosture' does not exist on type '{}'... Remove this comment to see the full error message
    rules:[cmdRules.testPosture],
    cmdCategory:"Posture",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
    ],
    script:handleStandUp,
  }),
  
  
  


  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Make', {
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
      {scope:parser.isUnconstructed, extendedScope:true},
    ],
    script:function(objects: any) {
      const obj = objects[0][0]
      return obj.build({char:player, item:obj}) ? world.SUCCESS : world.FAILED
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('MakeWith', {
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
      {scope:parser.isUnconstructed, extendedScope:true},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, multiple:true},
    ],
    script:function(objects: any) {
      const obj = objects[0][0]
      const options = {char:player, item:obj}
      if (!obj.testComponents(objects[1], options)) return world.FAILED
      return obj.build(options) ? world.SUCCESS : world.FAILED
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcMake', {
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
      {scope:parser.isUnconstructed},
    ],
    script:function(objects: any) {
      const npc = objects[0][0]
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift()
      const obj = objects[0][0]
      return obj.build({char:npc, item:obj}) ? world.SUCCESS : world.FAILED
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcMakeWith', {
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
      {scope:parser.isUnconstructed},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, multiple:true},
    ],
    script:function(objects: any) {
      const npc = objects[0][0]
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift()
      const obj = objects[0][0]
      const options = {char:npc, item:obj}
      if (!obj.testComponents(objects[1], options)) return world.FAILED
      return obj.build(options) ? world.SUCCESS : world.FAILED
    },
  }),

  

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('FillWith', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld},
      {special:'fluid'},
    ],
    script:function(objects: any) {
      return handleFillFromUnknown(player, objects[0][0], objects[1]);
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcFillWith', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Fill",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld},
      {special:'fluid'},
    ],
    script:function(objects: any) {
      const npc = objects[0][0]
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift()
      return handleFillFromUnknown(npc, objects[0][0], objects[1])
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('EmptyInto', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    script:function(objects: any) {
      return handleFillFromVessel(player, objects[0][0], objects[1][0], undefined);
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcEmptyInto', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Fill",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    script:function(objects: any) {
      const npc = objects[0][0]
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift()
      return handleFillFromVessel(npc, objects[0][0], objects[1][0], undefined)
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('EmptyFluidInto', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      {special:'fluid'},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    script:function(objects: any) {
      return handleEmptyFluidInto(player, objects[1][0], objects[0]);
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcEmptyFluidInto', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Fill",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      {special:'fluid'},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    script:function(objects: any) {
      const npc = objects[0][0]
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift()
      return handleEmptyFluidInto(npc, objects[1][0], objects[0])
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('PutFluidIn', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      {special:'fluid'},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName: "container"},
    ],
    script:function(objects: any) {
      return handleFillFromUnknown(player, objects[1][0], objects[0])
    },
  }),
  


  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('PutIn', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName: "container"},
    ],
    script:function(objects: any) {
      return handleInOutContainer(player, objects, "drop", handleSingleDropInContainer)
    },
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcPutIn', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Drop/in",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldByNpc' does not exist on type '{}'... Remove this comment to see the full error message
      {scope:parser.isHeldByNpc, multiple:true},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName: "container"},
    ],
    script:function(objects: any) {
      const npc = objects[0][0]
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift()
      return handleInOutContainer(npc, objects, "drop", handleSingleDropInContainer)
    },
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('TakeOut', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresent],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContained' does not exist on type '{}'... Remove this comment to see the full error message
      {scope:parser.isContained, multiple:true},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName: "container"},
    ],
    script:function(objects: any) {
      return handleInOutContainer(player, objects, "take", handleSingleTakeOutContainer)
    },
  }),
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcTakeOut', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Take",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContained' does not exist on type '{}'... Remove this comment to see the full error message
      {scope:parser.isContained, multiple:true},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName: "container"},
    ],
    script:function(objects: any) {
      const npc = objects[0][0]
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift()
      return handleInOutContainer(npc, objects, "take", handleSingleTakeOutContainer)
    },
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('GiveTo', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, multiple:true},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent, attName: "npc"},
    ],
    script:function(objects: any) {
      return handleGiveToNpc(player, objects)
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcGiveTo', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Give",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldByNpc' does not exist on type '{}'... Remove this comment to see the full error message
      {scope:parser.isHeldByNpc, multiple:true},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresentOrMe' does not exist on type '{... Remove this comment to see the full error message
      {scope:parser.isPresentOrMe, attName: "npc"},
    ],
    script:function(objects: any) {
      const npc = objects[0][0];
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift()
      return handleGiveToNpc(npc, objects)
    },
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Give', {
    antiRegexes:[lang.regex.GiveTo],
    matchItems:function(s: any) {
      if (!this._test(s)) return
      if (!this._testNot(s)) return
      
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
      parser.msg("---------------------------------------------------------");
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
      parser.msg("* Looking at candidate: " + this.name);
      
      // this is a temporary set of data used while we parser one input
      this.tmp.objectTexts = [],
      this.tmp.objects = [],
      this.tmp.score = this.score ? this.score : 10
      this.tmp.error = undefined
      
      let arr = this.tmp.regex.exec(s)
      arr.shift()  // first element is the whole match, so discard

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
      const scope = world.scope
      const npcs = scope.filter((el: any) => el.npc && el !== player)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromTokens' does not exist on type '{}'.
      const items = array.fromTokens(arr[0].split(' '), scope)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
      if (!items) return this.setError(parser.NO_OBJECT, lang.object_unknown_msg(arr[0]))
      
      // The first item could be the NPC to give it to,
      // and we want to pull that out.
      // Disambiguation makes this tricky...
      if (items[0].length === 1) {
        // No need to disambig, only one item matched
        if (items[0][0].npc) {
          this.tmp.objects[1] = items[0]
          items.shift()
          this.tmp.objects[0] = items
        }
        else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (npcs.length === 0) return this.setError(parser.NO_OBJECT, lang.object_unknown_msg(arr[0]))
          this.tmp.objects[1] = npcs
          this.tmp.objects[0] = items
        }
      }
      else {
        // At least two items matched
        // NPCs will take priority
        const npcList = items[0].filter((el: any) => el.npc)
        if (npcList.length === 0) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (npcs.length === 0) return this.setError(parser.NO_OBJECT, lang.no_receiver)
          this.tmp.objects[1] = npcs
          this.tmp.objects[0] = items
        }
        else if (npcList.length === 1) {
          this.tmp.objects[1] = [npcList[0]]
          items.shift()
          this.tmp.objects[0] = items
        }
        else {
          this.tmp.objects[1] = [npcList]
          items.shift()
          this.tmp.objects[0] = items
        }
      }
      
      // pre-disambig items in this.tmp.objects[0]
      for (let i = 0; i < this.tmp.objects[0].length; i++) {
        const el = this.tmp.objects[0][i]
        if (el.length === 1) {
          this.tmp.objects[0][i] = el[0]
        }
        else {
          const held = el.filter((el: any) => el.loc === player.name)
          if (held.length === 1) {
            this.tmp.objects[0][i] = held[0]
          }
          else if (held.length > 1) {
            this.tmp.objects[0][i] = held
          }
          // otherwise, stick we hat we have
        }
      }
      
      this.tmp.score = 10
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
      parser.msg("..Base score: " + this.tmp.score)
    },

    script:function(objects: any) {
      return handleGiveToNpc(player, objects)
    },
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcGive', {
    antiRegexes:lang.regex.NpcGiveTo,
    matchItems:function(s: any) {
      if (!this._test(s)) return
      if (!this._testNot(s)) return
      
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
      parser.msg("---------------------------------------------------------")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
      parser.msg("* Looking at candidate: " + this.name)
      
      // this is a temporary set of data used while we parse one input
      this.tmp.objectTexts = [],
      this.tmp.objects = [],
      this.tmp.score = this.score ? this.score : 10
      this.tmp.error = undefined
      
      let arr = this.tmp.regex.exec(s)
      arr.shift()  // first element is the whole match, so discard
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
      const scope = world.scope
      
      // Which NPC are we asking to do this?
      let char: any
      const charString = arr.shift()
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInList' does not exist on type '{}'.
      const possibleChars = parser.findInList(charString, scope, {})
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
      if (possibleChars.length === 0) return this.setError(parser.NO_OBJECT, lang.object_unknown_msg(charString))
      if (possibleChars.length === 1) {
        char = possibleChars[0]
      }
      else {
        const actualChars = possibleChars.filter((el: any) => (el.npc || el.player) && el !== char)
        if (possibleChars.length === 0) {
          char = possibleChars
        }
        else if (possibleChars.length === 1) {
          char = possibleChars[0]
        }
        else {
          char = possibleChars
        }
      }
      
      // npcs is a list of people we could be asking the character to give to
      const npcs = scope.filter((el: any) => (el.npc || el.player) && el !== char)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromTokens' does not exist on type '{}'.
      const items = array.fromTokens(arr[0].split(' '), scope)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
      if (!items) return this.setError(parser.NO_OBJECT, lang.object_unknown_msg(arr[0]))
      
      // The first item could be the NPC to give it to,
      // and we want to pull that out.
      // Disambiguation makes this tricky...
      if (items[0].length === 1) {
        // No need to disambig, only one item matched
        if (items[0][0].npc || items[0][0] === player) {
          this.tmp.objects[1] = items[0]
          items.shift()
          this.tmp.objects[0] = items
        }
        else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (npcs.length === 0) return this.setError(parser.NO_OBJECT, lang.object_unknown_msg(arr[0]))
          this.tmp.objects[1] = npcs
          this.tmp.objects[0] = items
        }
      }
      else {
        // At least two items matched
        // NPCs will take priority
        const npcList = items[0].filter((el: any) => el.npc || el.player)
        if (npcList.length === 0) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (npcs.length === 0) return this.setError(parser.NO_OBJECT, lang.no_receiver)
          this.tmp.objects[1] = npcs
          this.tmp.objects[0] = items
        }
        else if (npcList.length === 1) {
          this.tmp.objects[1] = [npcList[0]]
          items.shift()
          this.tmp.objects[0] = items
        }
        else {
          this.tmp.objects[1] = [npcList]
          items.shift()
          this.tmp.objects[0] = items
        }
      }
      
      // pre-disambig items in this.tmp.objects[0]
      for (let i = 0; i < this.tmp.objects[0].length; i++) {
        const el = this.tmp.objects[0][i]
        if (el.length === 1) {
          this.tmp.objects[0][i] = el[0]
        }
        else {
          const held = el.filter((el: any) => el.loc === char.name)
          if (held.length === 1) {
            this.tmp.objects[0][i] = held[0]
          }
          else if (held.length > 1) {
            this.tmp.objects[0][i] = held
          }
          // otherwise, stick we hat we have
        }
      }
      this.tmp.objects.unshift([char])
      
      this.tmp.score = 10
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
      parser.msg("..Base score: " + this.tmp.score)
    },

    script:function(objects: any) {
      const char = objects[0][0]
      objects.shift()
      return handleGiveToNpc(char, objects)
    },
  }),






  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('PushExit', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHere],
    cmdCategory:"Push",
    script:function(objects: any) {
      return handlePushExit(player, objects);
    },
    objects:[
      {special:'text'},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"shiftable"},
      {special:'text'},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcPushExit', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHere],
    cmdCategory:"Push",
    script:function(objects: any) {
      const npc = objects[0][0];
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift();
      return handlePushExit(npc, objects);
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      {special:'text'},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"shiftable"},
      {special:'text'},
    ]
  }),





  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('TieUp', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Tie",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, attName:"rope"},
    ],
    script:function(objects: any) {
      const rope = objects[0][0]
      if (!rope.rope) return failedmsg(lang.rope_not_attachable, {rope:rope})
      return rope.handleTieTo(player) 
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('TieTo', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Tie",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, attName:"rope"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"attachable"},
    ],
    script:function(objects: any) {
      const rope = objects[0][0]
      if (!rope.rope) return failedmsg(lang.rope_not_attachable, {rope:rope})
      return rope.handleTieTo(player, objects[1][0]) 
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcTieUp', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Tie",
    script:function(objects: any) {
      const npc = objects[0][0];
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift();
      const rope = objects[0][0]
      if (!rope.rope) return failedmsg(lang.rope_not_attachable, {rope:rope})
      return rope.handleTieTo(npc) 
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, attName:"rope"},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcTieTo', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isHeld],
    cmdCategory:"Tie",
    script:function(objects: any) {
      const npc = objects[0][0];
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift();
      const rope = objects[0][0]
      if (!rope.rope) return failedmsg(lang.rope_not_attachable, {rope:rope})
      return rope.handleTieTo(npc, objects[1][0]) 
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, attName:"rope"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"attachable"},
    ]
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('Untie', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresent],
    cmdCategory:"Untie",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"rope"},
    ],
    script:function(objects: any) {
      const rope = objects[0][0]
      if (!rope.rope) return failedmsg(lang.rope_not_attachable, {rope:rope})
      return rope.handleUntieFrom(player) 
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcUntie', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresent],
    cmdCategory:"Tie",
    script:function(objects: any) {
      const npc = objects[0][0];
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift();
      const rope = objects[0][0]
      if (!rope.rope) return failedmsg(lang.rope_not_attachable, {rope:rope})
      return rope.handleUntieFrom(npc) 
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      {scope:parser.isHeld, attName:"rope"},
    ]
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('UntieFrom', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresent],
    cmdCategory:"Untie",
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"rope"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"attachable"},
    ],
    script:function(objects: any) {
      const rope = objects[0][0]
      if (!rope.rope) return failedmsg(lang.rope_not_attachable, {rope:rope})
      return rope.handleUntieFrom(player, objects[1][0]) 
    },
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('NpcUntieFrom', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresent],
    cmdCategory:"Tie",
    script:function(objects: any) {
      const npc = objects[0][0];
      if (!npc.npc) return failedmsg(lang.not_npc, {char:player, item:npc})
      objects.shift();
      const rope = objects[0][0]
      if (!rope.rope) return failedmsg(lang.rope_not_attachable, {rope:rope})
      return rope.handleUntieFrom(npc, objects[1][0]) 
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"rope"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"attachable"},
    ]
  }),


  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('UseWith', {
    //npcCmd:true,
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
    rules:[cmdRules.testManipulate, cmdRules.isPresent],
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
      {scope:parser.isPresent},
    ],
    script:function(objects: any) {
      const obj = objects[0][0]
      const obj2 = objects[1][0]
      
      if (obj.useWith) {
        const result = obj.useWith(player, obj2)
        return result ? world.SUCCESS : world.FAILED
      }
      if (obj2.withUse) {
        const result = obj2.withUse(player, obj)
        return result ? world.SUCCESS : world.FAILED
      }
      
      if (obj.useWithDefaultsTo) {
        const cmd = findCmd(obj.useWithDefaultsTo())
        if (cmd) {
          const result = cmd.script(objects)
          return result ? world.SUCCESS : world.FAILED
        }
        else {
          throw new Error("USE command defaulting to unknown command " + obj.useWithDefaultsTo)
        }
      }
      if (obj2.withUseDefaultsTo) {
        const cmd = findCmd(obj2.withUseDefaultsTo())
        if (cmd) {
          const result = cmd.script(objects)
          return result ? world.SUCCESS : world.FAILED
        }
        else {
          throw new Error("USE command defaulting to unknown command " + obj2.withUseDefaultsTo)
        }
      }

      this.default({char:player, item:obj})
      return world.FAILED; 
    },
    defmsg:lang.cannot_use,
  }),
  





  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('FollowMe', {
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
    ],
    script:function(objects: any) {
      const obj = objects[0][0]
      const tpParams = {char:player, npc:obj}
      if (!obj.npc) return failedmsg(lang.cannot_follow, tpParams)
      if (!obj.getAgreement("Follow")) return world.FAILED
      return obj.startFollow() ? world.SUCCESS : world.FAILED
    },
  }),

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('WaitHere', {
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
    ],
    script:function(objects: any) {
      const obj = objects[0][0]
      const tpParams = {item:obj}
      if (!obj.npc) return falsemsg(lang.cannot_wait, tpParams)

      return obj.endFollow() ? world.SUCCESS : world.FAILED
    },
  }),
  

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('AskAbout', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
    rules:[cmdRules.canTalkTo],
    script:function(arr: any) {
      if (!player.testTalk()) return false
      if (!arr[0][0].askabout) return failedmsg(lang.cannot_ask_about, {char:player, item:arr[0][0], text:arr[2]})

      return arr[0][0].askabout(arr[2], arr[1]) ? world.SUCCESS : world.FAILED
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
      {scope:parser.isNpcAndHere},
      {special:'text'},
      {special:'text'},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('TellAbout', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
    rules:[cmdRules.canTalkTo],
    script:function(arr: any) {
      if (!player.testTalk()) return false
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'cannot_tell_about'.
      if (!arr[0][0].tellabout) return failedmsg(cannot_tell_about, {char:player, item:arr[0][0], text:arr[1]})

      return arr[0][0].tellabout(arr[2], arr[1]) ? world.SUCCESS : world.FAILED
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
      {scope:parser.isNpcAndHere},
      {special:'text'},
      {special:'text'},
    ]
  }),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  new Cmd('TalkAbout', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
    rules:[cmdRules.canTalkTo],
    //score:1, // to override TALK TO
    script:function(arr: any) {
      if (!player.testTalk()) return false
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'cannot_tell_about'.
      if (!arr[0][0].tellabout && !arr[0][0].askabout) return failedmsg(cannot_tell_about, {char:player, item:arr[0][0], text:arr[1]})

      return arr[0][0].talkabout(arr[2], arr[1]) ? world.SUCCESS : world.FAILED
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
      {scope:parser.isNpcAndHere},
      {special:'text'},
      {special:'text'},
    ]
  }),
  
]



for (const s of ['In', 'Out', 'Up', 'Down', 'Through']) {
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('Go' + s + 'Item', {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
    objects:[{scope:parser.isHere, attName:"go" + s + "Direction"}],
    dirType:s,
    script:function(objects: any) {
      if (typeof objects[0][0]["go" + this.dirType + "Item"] === 'string') {
        return failedmsg(objects[0][0]["go" + this.dirType + "Item"], {char:player, item:objects[0][0]})
      }
      return currentLocation.goItem(objects[0][0], this.dirType) 
    },
  }))
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('NpcGo' + s + 'Item', {
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"npc"},
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
      {scope:parser.isHere, attName:"go" + s + "Direction"},
    ],
    dirType:s,
    script:function(objects: any) { 
      if (typeof objects[1][0]["go" + this.dirType + "Item"] === 'string') {
        return failedmsg(objects[1][0]["go" + this.dirType + "Item"], {char:objects[0][0], item:objects[1][0]})
      }
      return currentLocation.goItem(objects[1][0], this.dirType, objects[0][0]) 
    },
  }))
}



// DEBUG commands

// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
if (Quest.settings.playMode === 'dev') {
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugWalkThrough', {
    objects:[
      {special:'text'},
    ],
    script:function(objects: any) {
      if (typeof walkthroughs === "undefined") {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg("No walkthroughs set")
        return world.FAILED
      }
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const wt = walkthroughs[objects[0]]
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (wt === undefined) return failedmsg("No walkthrough found called " + objects[0])
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'walkthroughInProgress' does not exist on... Remove this comment to see the full error message
      Quest.settings.walkthroughInProgress = true
      for (let el of wt) {
        if (typeof el === "string") {
          runCmd(el)
        }
        else {
          Quest.settings.walkthroughMenuResponses = Array.isArray(el.menu) ? el.menu : [el.menu]
          runCmd(el.cmd)
          Quest.settings.walkthroughMenuResponses = []
        }
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'walkthroughInProgress' does not exist on... Remove this comment to see the full error message
      Quest.settings.walkthroughInProgress = false
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  })) 

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugInspect', {
    script:function(arr: any) {
      const item = arr[0][0];
      debugmsg("See the console for details on the object " + item.name + " (press F12 to world. the console)");
      console.log(item);
      return world.SUCCESS_NO_TURNSCRIPTS; 
    },
    objects:[
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isInWorld' does not exist on type '{}'.
      {scope:parser.isInWorld},
    ],
  }))

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugInspectByName', {
    script:function(arr: any) {
      const item_name = arr[0]
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!w[item_name]) {
        debugmsg("No object called " + item_name);
        return world.FAILED;
      }
       
      debugmsg("See the console for details on the object " + item_name + " (press F12 to world. the console)");
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      console.log(w[item_name]);
      return world.SUCCESS_NO_TURNSCRIPTS; 
    },
    objects:[
      {special:'text'},
    ],
  }))

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugTest', {
    script:function() {
      if (!Quest.settings.tests) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg('The TEST command is for unit testing during game development, and is not activated (F12 for more).')
        console.log('To activate testing in your game, set Quest.settings.tests to true. More details here: https://github.com/ThePix/QuestJS/wiki/Unit-testing')
        return world.SUCCESS_NO_TURNSCRIPTS;
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'runTests' does not exist on type '{}'.
      if (typeof test.runTests !== 'function') {
        console.log(test)
        return world.FAILED
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'runTests' does not exist on type '{}'.
      test.runTests();
      return world.SUCCESS_NO_TURNSCRIPTS;
    },
  }))

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugInspectCommand', {
    script:function(arr: any) {
      debugmsg ("Looking for " + arr[0]);
      for (let cmd of commands) {
        if (cmd.name.toLowerCase() === arr[0] || (cmd.cmdCategory && cmd.cmdCategory.toLowerCase() === arr[0])) {
          debugmsg("Name: " + cmd.name);
          for (let key in cmd) {
            if (cmd.hasOwnProperty(key)) {
               debugmsg("--" + key + ": " + cmd[key]);
            }
          }
        }
      }        
      return world.SUCCESS_NO_TURNSCRIPTS; 
    },
    objects:[
      {special:'text'},
    ],
  }))

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugListCommands', {
    script:function(arr: any) {
      let count = 0;
      for (let cmd of commands) {
        if (!cmd.name.match(/\d$/)) {
          let s = cmd.name + " (" + cmd.regex
          
          let altCmd
          let n = 2
          do {
            altCmd = commands.find(el => el.name === cmd.name + n)
            if (altCmd) s += " or " + altCmd.regex
            n++
          } while (altCmd)
          s += ")"
        
          const npcCmd = commands.find(el => el.name === "Npc" + cmd.name + "2")
          if (npcCmd) s += " - NPC too"
          debugmsg(s);
          count++;
        }
      }        
      debugmsg("... Found " + count + " commands.");
      return world.SUCCESS_NO_TURNSCRIPTS; 
    },
    objects:[
    ],
  }))

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugListCommands2', {
    script:function(arr: any) {
      let count = 0;
      for (let cmd of commands) {
        let s = cmd.name + " (" + cmd.regex + ")"
        debugmsg(s);
        count++;
      }        
      debugmsg("... Found " + count + " commands.");
      return world.SUCCESS_NO_TURNSCRIPTS; 
    },
    objects:[
    ],
  }))

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugParserToggle', {
    script:function(arr: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
      if (parser.debug) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
        parser.debug = false
        debugmsg ("Parser debugging messages are off.");
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
        parser.debug = true
        debugmsg ("Parser debugging messages are on.");
      }
      return world.SUCCESS_NO_TURNSCRIPTS; 
    },
    objects:[
    ],
  }))

  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugStats', {
    script:function(arr: any) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
      for (const el of Quest.settings.statsData) el.count = 0
      for (const key in w) {
        for (const el of Quest.settings.statsData) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const res = el.test(w[key])
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
          if (res === true) el.count++
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
          if (typeof res === 'number') el.count += res
        }
      }
      for (const el of Quest.settings.statsData) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
        debugmsg(el.name + ": " + el.count)
      }
      return world.SUCCESS_NO_TURNSCRIPTS; 
    },
    objects:[
    ],
  }))
  
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('DebugHighlight', {
    script:function(arr: any) {
      for (const el of document.querySelectorAll('.parser')) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.color = 'black'
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.backgroundColor = 'yellow'
      }
      for (const el of document.querySelectorAll('.error')) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.backgroundColor = 'yellow'
      }
      for (const el of document.querySelectorAll('.meta')) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.color = 'black'
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
        el.style.backgroundColor = '#8f8'
      }
      debugmsg ("Previous parser and error messages are now highlighted.");
      return world.SUCCESS_NO_TURNSCRIPTS; 
    },
    objects:[
    ],
  }))
  
  
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  commands.push(new Cmd('MetaTranscriptWalkthrough', {
    script:function() {
      saveLoad.transcriptWalk()
      return world.SUCCESS_NO_TURNSCRIPTS
    },
  }))
 
}







    
// Functions used by commands 
// (but not in the commands array)


// Cannot handle multiple vessels
// want to transfer a fluid from a source to a sink

function handleFillFromUnknown(char: any, sink: any, fluid: any) {
  // fluid can be undefined
  const options = {fluid:fluid}
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{}'.
  if (!util.findSource(options)) return failedmsg(fluid ? lang.no_fluid_here : lang.no_fluid_here_at_all, options)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'source' does not exist on type '{ fluid:... Remove this comment to see the full error message
  if (options.source.vessel) return handleFillFromVessel(char, options.source, sink, options.fluid)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'source' does not exist on type '{ fluid:... Remove this comment to see the full error message
  return handleFillFromSource(char, options.source, sink, options.fluid)
}

function handleFillFromVessel(char: any, source: any, sink: any, fluid: any) {
  // fluid can be undefined
  if (!fluid) fluid = source.containedFluidName
  const options = {char:char, source:source, fluid:fluid, item:sink}
  
  if (!source.vessel) return failedmsg(lang.not_vessel, options)
  if (source.closed) return  failedmsg(lang.container_closed, options)
  if (!source.containedFluidName) return failedmsg(lang.already_empty, options)
  if (!sink.vessel && !sink.sink) return failedmsg(lang.not_sink, options)
  if (sink.vessel && sink.containedFluidName) return failedmsg(lang.already_full, options)
  if (!char.testManipulate(source, "fill")) return world.FAILED
  if (!char.getAgreement("Fill", source, sink, fluid)) return world.FAILED
  if (!source.isAtLoc(char.name)) return failedmsg(lang.not_carrying, options)
  if (source.containedFluidName !== fluid) return failedmsg(lang.no_fluid_here, options);
  return source.doEmpty(options) ? world.SUCCESS: world.FAILED;
}


function handleFillFromSource(char: any, source: any, sink: any, fluid: any) {
  const options = {char:char, source:source, fluid:fluid, item:sink}
  
  if (!source.isSourceOf) return failedmsg(lang.not_source, options)
  if (source.closed) return  failedmsg(lang.container_closed, options)
  if (!sink.vessel) return failedmsg(lang.not_vessel, options)
  if (sink.containedFluidName) return failedmsg(lang.already_full, options)
  if (!char.testManipulate(sink, "fill")) return world.FAILED
  if (!char.getAgreement("Fill", source, sink, fluid)) return world.FAILED
  // if the source is the room itself, we assume it is here
  if (!source.room && !source.isAtLoc(char.loc)) return failedmsg(lang.not_here, options)
  if (!source.isSourceOf(fluid)) return failedmsg(lang.no_fluid_here, options)
  return sink.doFill(options) ? world.SUCCESS: world.FAILED;
}

function handleEmptyFluidInto(char: any, sink: any, fluid: any) {
  for (const key in w) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const o = w[key]
    if (o.vessel && o.containedFluidName === fluid && o.loc === char.name) {
      return handleFillFromVessel(char, o, sink, fluid)
    }
  }
  return failedmsg(lang.not_carrying_fluid, {char:char, fluid:fluid});
}





function handleInOutContainer(char: any, objects: any, verb: any, func: any) {
  let success = false;
  const container = objects[1][0];
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  const options = {char:char, container:container, verb:verb, multiple:objects[0].length > 1 || parser.currentCommand.all}
  
  if (container.handleInOutContainer) return container.handleInOutContainer(options, objects[0])
  
  if (!container.container) return failedmsg(lang.not_container, options)
  if (container.closed) {
    if (container.containerAutoOpen) {
      if (!container.open({char:char, item:container})) return false
    }
    else if (!container.containerIgnoreClosed) {
      return failedmsg(lang.container_closed, options)
    }
  }

  for (const obj of objects[0]) {
    if (!char.testManipulate(obj, verb)) return world.FAILED
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ char: a... Remove this comment to see the full error message
    options.count = obj.countable ? obj.extractNumber() : undefined
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type '{ char: an... Remove this comment to see the full error message
    options.item = obj
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ char: a... Remove this comment to see the full error message
    if (options.count) options[obj.name + '_count'] = options.count  // for the text processor
    const flag = func(char, container, obj, options)
    success = success || flag
  }
  if (success) char.pause();
  return success ? world.SUCCESS : world.FAILED;
}

function handleSingleDropInContainer(char: any, container: any, obj: any, options: any) {
  options.fromLoc = char.name
  options.toLoc = container.name
  if (!char.getAgreement("Drop/in", obj, container)) return
  if (!container.testForRecursion(char, obj)) return false
  if (obj.testDrop && !obj.testDrop(options)) return false
  if (!obj.msgDropIn) return falsemsg(lang.cannot_drop, options)
  if (container.testDropIn && !container.testDropIn(options)) return false
  if (!obj.isAtLoc(char.name)) return failedmsg(lang.not_carrying, {char:char, item:obj})
  if (obj.getTakeDropCount) obj.getTakeDropCount(options, char.name)

  if (typeof obj.msgDropIn === 'function') {
    obj.msgDropIn(options)
  }
  else {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(obj.msgDropIn, options)
  }
  obj.moveToFrom(options)
  return true;
}

function handleSingleTakeOutContainer(char: any, container: any, obj: any, options: any) {
  options.toLoc = char.name
  options.fromLoc = container.name
  if (!char.getAgreement("Take", obj)) return false
  if (!obj.isAtLoc(container.name)) return failedmsg(lang.not_inside, {container:container, item:obj})
  if (obj.getTakeDropCount) obj.getTakeDropCount(options, container.name)
  if (obj.testTake && !obj.testTake(options)) return false
  if (container.testTakeOut && !container.testTakeOut(options)) return false

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  msg(obj.msgTakeOut, options)
  obj.moveToFrom(options)
  return true
}



function handleGiveToNpc(char: any, objects: any) {
  let success = false;
  const npc = objects[1][0];
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
  const multiple = objects[0].length > 1 || parser.currentCommand.all;
  if (!npc.npc && npc !== player) return failedmsg(lang.not_npc_for_give, {char:char, item:npc})
  if (!npc.handleGiveTo) log(npc)
    
  for (const obj of objects[0]) {
    const flag = npc.handleGiveTo({char:char, npc:npc, multiple:multiple, item:obj, toLoc:npc.name, fromLoc:char.name})
    success = success || flag
  }
  // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
  if (success === world.SUCCESS) char.pause();
  return success ? world.SUCCESS : world.FAILED;
}






function handleStandUp(objects: any) {
  let char
  if (objects.length === 0) {
    char = player
  }
  else {
    const npc = objects[0][0]
    if (!npc.npc) {
      failedmsg(lang.not_npc, {char:player, item:npc});
      return world.FAILED; 
    }
    if (!npc.posture) {
      failedmsg(lang.already, {item:npc});
      return world.FAILED;
    }
    if (!npc.getAgreement("Posture", "stand")) {
      // The getAgreement should give the response
      return world.FAILED;
    }
    char = npc
  }  
  
  if (!char.testPosture()) {
    return world.FAILED;
  }
  if (char.posture) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(lang.stop_posture(char))
    char.pause();
    return world.SUCCESS;
  }  
}

// we know the char can manipulate, we know the obj is here and not held
function handlePushExit(char: any, objects: any) {
  const verb = objects[0]
  const obj = objects[1][0];
  const dir = getDir(objects[2]);
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const room = w[char.loc]
  const tpParams = {char:char, item:obj, dir:dir}
  
  if (!obj.shiftable && obj.takeable) return failedmsg(lang.take_not_push, tpParams)
  if (!obj.shiftable) return failedmsg(lang.cannot_push, tpParams)
  if (!room[dir] || room[dir].isHidden()) return failedmsg(lang.not_that_way, tpParams)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (room[dir].isLocked()) return failedmsg(lang.locked_exit(char, room[dir]))
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (typeof room[dir].noShiftingMsg === "function") return failedmsg(room[dir].noShiftingMsg(char, item))
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (typeof room[dir].noShiftingMsg === "string") return failedmsg(room[dir].noShiftingMsg)
  if (!char.getAgreement("Push", obj, dir)) return false
  
  if (typeof obj.shift === "function") {
    const res = obj.shift(char, dir, verb);
    return res ? world.SUCCESS : world.FAILED;
  }
  
  // by default, objects cannot be pushed up
  if (dir === "up") {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(lang.cannot_push_up, tpParams);
    return world.FAILED;
  }
  
  // not using moveToFrom; if there are 
  const dest = room[dir].name;
  obj.moveToFrom({char:char, toLoc:dest, item:obj});
  char.loc = dest;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'dest' does not exist on type '{ char: an... Remove this comment to see the full error message
  tpParams.dest = w[dest]
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  msg(lang.push_exit_successful, tpParams);
  return world.SUCCESS;
}






