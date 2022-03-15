namespace Quest {
  export namespace Commands {

    // A command has an arbitrary name, a regex or pattern, 
    // and a script as a minimum.
    // regex           A regex to match against
    // objects         An array of matches in the regex (see wiki)
    // script          This will be run on a successful match
    // attName         If there is no script, then this attribute on the object will be used
    // nothingForAll   If the player uses ALL and there is nothing there, use this error message
    // noobjecterror   If the player specifies an object
    // noTurnscripts   Set to true to prevent turnscripts firing even when this command is successful


    const cmdDirections = []
    for (let exit of Quest.lang.exit_list) {
      if (exit.type === 'nocmd') continue
      cmdDirections.push(exit.name)
      cmdDirections.push(exit.abbrev.toLowerCase())
      if (exit.alt) cmdDirections.push(exit.alt)
    }

    export const commands = [
      // ----------------------------------
      // Single word commands

      // Cannot just set the script to helpScript as we need to allow the
      // author to change it in code.js, which is loaded after this.
      
      new Quest.Command.Cmd('MetaHelp', {
        script: Quest.lang.helpScript,
      }),
      
      new Quest.Command.Cmd('MetaHint', {
        script: Quest.lang.hintScript,
      }),
      
      new Quest.Command.Cmd('MetaCredits', {
        script: Quest.lang.aboutScript,
      }),
      
      new Quest.Command.Cmd('MetaDarkMode', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleDarkMode' does not exist on type '... Remove this comment to see the full error message
        script: Quest.IO.io.toggleDarkMode,
      }),
      
      new Quest.Command.Cmd('MetaNarrowMode', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleNarrowMode' does not exist on type... Remove this comment to see the full error message
        script: Quest.IO.io.toggleNarrowMode,
      }),
      
      new Quest.Command.Cmd('MetaAutoScrollMode', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'toggleAutoScrollMode' does not exist on ... Remove this comment to see the full error message
        script: Quest.IO.io.toggleAutoScrollMode,
      }),
      
      new Quest.Command.Cmd('MetaPlainFontMode', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'togglePlainFontMode' does not exist on t... Remove this comment to see the full error message
        script: Quest.IO.io.togglePlainFontMode,
      }),
      
      new Quest.Command.Cmd('MetaSilent', {
        script: function () {
          if (Quest.Settings.settings.silent) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.mode_silent_off)
            Quest.Settings.settings.silent = false
          }
          else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.mode_silent_on)
            Quest.Settings.settings.silent = true
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
            Quest.IO.ambient()
          }
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaWarnings', {
        script: Quest.lang.warningsScript,
      }),


      
      new Quest.Command.Cmd('MetaSpoken', {
        script: function () {
          if (Quest.IO.io.spoken) {
            Quest.IO.io.spoken = false
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.spoken_off)
          }
          else {
            Quest.IO.io.spoken = true
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.spoken_on)
          }
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaIntro', {
        script: function () {
          Quest.IO.io.spoken = true;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
          if (typeof Quest.Settings.settings.intro === "string") {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(Quest.Settings.settings.intro)
          }
          else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
            for (let el of Quest.Settings.settings.intro) Quest.IO.msg(el)
          }
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaBrief', {
        script: function () {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbosity' does not exist on type '{ per... Remove this comment to see the full error message
          Quest.Settings.settings.verbosity = world.BRIEF
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.mode_brief)
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaTerse', {
        script: function () {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbosity' does not exist on type '{ per... Remove this comment to see the full error message
          Quest.Settings.settings.verbosity = world.TERSE
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.mode_terse)
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaVerbose', {
        script: function () {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbosity' does not exist on type '{ per... Remove this comment to see the full error message
          Quest.Settings.settings.verbosity = world.VERBOSE
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(llang.mode_verbose)
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),

      
      new Quest.Command.Cmd('MetaTranscript', {
        script: Quest.lang.transcriptScript,
      }),
      
      new Quest.Command.Cmd('MetaTranscriptStart', {
        script: function () {
          if (saveLoad.transcript) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.transcript_already_on)
            return world.FAILED
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
          saveLoad.transcriptClear()
          saveLoad.transcriptStart()
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaTranscriptOn', {
        script: function () {
          if (saveLoad.transcript) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.transcript_already_on)
            return world.FAILED
          }
          saveLoad.transcriptStart()
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaTranscriptOff', {
        script: function () {
          if (!saveLoad.transcript) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.transcript_already_off)
            return world.FAILED
          }
          saveLoad.transcriptEnd()
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaTranscriptClear', {
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
          saveLoad.transcriptClear()
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaTranscriptShow', {
        script: function () {
          saveLoad.transcriptShow()
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaUserComment', {
        script: function (arr: any) {
          Quest.IO.commentmsg("Comment: " + arr[0])
          return world.SUCCESS_NO_TURNSCRIPTS
        },
        objects: [
          { special: 'text' },
        ]
      }),

      // ----------------------------------
      // File system commands
      
      new Quest.Command.Cmd('MetaSave', {
        script: Quest.lang.saveLoadScript,
      }),
      
      new Quest.Command.Cmd('MetaSaveOverwriteGame', {
        script: function (arr: any) {
          saveLoad.saveGame(arr[0], true)
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
          { special: 'text' },
        ]
      }),
      
      new Quest.Command.Cmd('MetaSaveGame', {
        script: function (arr: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'localStorageDisabled' does not exist on ... Remove this comment to see the full error message
          if (Quest.Settings.settings.localStorageDisabled) {
            saveLoad.saveGameAsFile(arr[0])
          }
          else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            saveLoad.saveGame(arr[0])
          }
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
          { special: 'text' },
        ]
      }),
      
      new Quest.Command.Cmd('MetaFileSaveGame', {
        script: function (arr: any) {
          saveLoad.saveGameAsFile(arr[0])
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
          { special: 'text' },
        ]
      }),
      
      new Quest.Command.Cmd('MetaLoad', {
        script: function (arr: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'localStorageDisabled' does not exist on ... Remove this comment to see the full error message
          if (Quest.Settings.settings.localStorageDisabled) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.getElementById('fileDialog').click()
          }
          else {
            Quest.lang.saveLoadScript()
          }
          return world.SUCCESS_NO_TURNSCRIPTS
        },
        objects: [
        ]
      }),
      
      new Quest.Command.Cmd('MetaLoadGame', {
        script: function (arr: any) {
          saveLoad.loadGameFromLS(arr[0])
          return world.SUCCESS_NO_TURNSCRIPTS
        },
        objects: [
          { special: 'text' },
        ]
      }),
      
      new Quest.Command.Cmd('MetaFileLoadGame', {
        script: function (arr: any) {
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.getElementById('fileDialog').click()
          return world.SUCCESS_NO_TURNSCRIPTS
        },
        objects: [
          { special: 'text' },
        ]
      }),
      
      new Quest.Command.Cmd('MetaDir', {
        script: function () {
          saveLoad.dirGame()
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaDeleteGame', {
        script: function (arr: any) {
          saveLoad.deleteGame(arr[0])
          return world.SUCCESS_NO_TURNSCRIPTS
        },
        objects: [
          { special: 'text' },
        ]
      }),


      
      new Quest.Command.Cmd('MetaUndo', {
        script: function () {
          if (Quest.Settings.settings.maxUndo === 0) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.undo_disabled)
            return world.FAILED
          }
          if (world.gameState.length < 2) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.undo_not_available)
            return world.FAILED
          }
          world.gameState.pop()
          const gameState = world.gameState[world.gameState.length - 1]
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.undo_done)
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          saveLoad.loadTheWorld(gameState)
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          w[player.loc].description()
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaAgain', {
        script: function () {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'againOrOops' does not exist on type '{ n... Remove this comment to see the full error message
          return Quest.IO.io.againOrOops(true)
        },
      }),
      
      new Quest.Command.Cmd('MetaOops', {
        script: function () {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'againOrOops' does not exist on type '{ n... Remove this comment to see the full error message
          return Quest.IO.io.againOrOops(false)
        },
      }),
      
      new Quest.Command.Cmd('MetaRestart', {
        script: function () {
          Quest.IO.askText(Quest.lang.restart_are_you_sure, function (result: any) {
            if (result.match(Quest.lang.yes_regex)) {
              location.reload()
            }
            else {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              Quest.IO.metamsg(Quest.lang.restart_no)
            }
          });
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }),
      
      new Quest.Command.Cmd('MetaPronouns', {
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg('See the developer console (F12) for the current pronouns')
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
          console.log(parser.pronouns)
        },
      }),
      
      new Quest.Command.Cmd('MetaScore', {
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.scores_not_implemented)
        },
      }),
      
      new Quest.Command.Cmd('MetaTopicsNote', {
        script: Quest.lang.topicsScript,
      }),



      // These are kind of meta-commands - perhaps free commands is a better term.
      // I see them as jogging the user's mind about the game world, rather than
      // doing something in the game world, so by default
      // no ttime passes.
      // Set Quest.Settings.settings.lookCountsAsTurn to true if you disagree!
      
      new Quest.Command.Cmd('Look', {
        script: function () {
          currentLocation.description();
          return Quest.Settings.settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),
      
      new Quest.Command.Cmd('Exits', {
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.can_go, { char: player });
          return Quest.Settings.settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),
      
      new Quest.Command.Cmd('Inv', {
        script: function () {
          const listOfOjects = player.getContents(world.INVENTORY);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.inventory_prefix + " " + Quest.Utilities.formatList(listOfOjects, { article: Quest.Utilities.INDEFINITE, lastJoiner: Quest.lang.list_and, modified: true, nothing: Quest.lang.list_nothing, loc: player.name }) + ".", { char: player });
          return Quest.Settings.settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),
      
      new Quest.Command.Cmd('Map', {
        script: function () {
          if (typeof showMap !== 'undefined') {
            showMap();
            return Quest.Settings.settings.lookCountsAsTurn ? world.SUCCESS : world.SUCCESS_NO_TURNSCRIPTS;
          }
          else {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const zone = w[player.loc]
            if (!zone.zone) {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              return Quest.IO.failedmsg(Quest.lang.no_map);
            }
            else {
              const flag = zone.drawMap()
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              if (!flag) return Quest.IO.failedmsg(Quest.lang.no_map);
              return world.SUCCESS_NO_TURNSCRIPTS
            }
          }
        },
      }),
      
      new Quest.Command.Cmd('Topics', {
        attName: "topics",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: parser.isNpcAndHere },
        ],
        defmsg: Quest.lang.no_topics,
      }),



      
      new Quest.Command.Cmd('Wait', {
        script: function () {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg(Quest.lang.wait_msg);
          return world.SUCCESS;
        },
      }),
      
      new Quest.Command.Cmd('Smell', {
        script: function () {
          if (currentLocation.smell) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
            Quest.Utilities.printOrRun(player, currentLocation, "smell");
          }
          else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.no_smell, { char: player });
          }
          return world.SUCCESS;
        },
      }),
      
      new Quest.Command.Cmd('Listen', {
        script: function () {
          if (currentLocation.listen) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
            Quest.Utilities.printOrRun(player, currentLocation, "listen");
          }
          else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.no_listen, { char: player });
          }
          return world.SUCCESS;
        },
      }),
      
      new Quest.Command.Cmd('PurchaseFromList', {
        script: function () {
          const l = [];
          for (let key in w) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isForSale' does not exist on type '{}'.
            if (parser.isForSale(w[key])) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              const price = w[key].getBuyingPrice(player)
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              const row = [Quest.Utilities.sentenceCase(w[key].getName()), world.Money(price)]
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              row.push(price > player.money ? "-" : "{cmd:buy " + w[key].alias + ":" + buy + "}")
              l.push(row)
            }
          }
          if (l.length === 0) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            return Quest.IO.failedmsg(Quest.lang.nothing_for_sale);
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg(current_money + ": " + world.Money(player.money));
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
          Quest.IO.msgTable(l, buy_headings)
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),


      // Out of convenient order as it needs to be before TAKE
      
      new Quest.Command.Cmd('GetFluid', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          { special: 'fluid' },
        ],
        score: 5,
        script: function (objects: any) {
          console.log('here')
          const options = { char: player, fluid: objects[0] }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{}'.
          if (!Quest.Utilities.util.findSource(options)) return Quest.IO.failedmsg(Quest.lang.no_fluid_here, options)
          console.log('here')
          return Quest.IO.failedmsg(Quest.lang.cannot_get_fluid, options)
        },
      }),



      // ----------------------------------
      // Verb-object commands
      
      new Quest.Command.Cmd('Examine', {
        npcCmd: true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, multiple: true }
        ],
        defmsg: Quest.lang.default_examine,
      }),
      
      new Quest.Command.Cmd('LookAt', {  // used for NPCs
        npcCmd: true,
        attName: 'examine',
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresentOrMe' does not exist on type '{... Remove this comment to see the full error message
          { scope: parser.isPresentOrMe }
        ],
        defmsg: Quest.lang.default_examine,
      }),
      
      new Quest.Command.Cmd('LookOut', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent }
        ],
        attName: "lookout",
        defmsg: Quest.lang.cannot_look_out,
      }),
      
      new Quest.Command.Cmd('LookBehind', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
        attName: "lookbehind",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent }
        ],
        defmsg: Quest.lang.nothing_there,
      }),
      
      new Quest.Command.Cmd('LookUnder', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
        attName: "lookunder",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent }
        ],
        defmsg: Quest.lang.nothing_there,
      }),
      
      new Quest.Command.Cmd('LookThrough', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
        attName: "lookthrough",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent }
        ],
        defmsg: Quest.lang.nothing_there,
      }),
      
      new Quest.Command.Cmd('LookInside', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
        attName: "lookinside",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent }
        ],
        defmsg: Quest.lang.nothing_inside,
      }),
      
      new Quest.Command.Cmd('Search', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
        attName: "search",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent }
        ],
        defmsg: Quest.lang.nothing_there,
      }),

      
      new Quest.Command.Cmd('Take', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHereAlready' does not exist on type '{... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.isHereAlready, Quest.Command.cmdRules.testManipulate],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHereOrContained' does not exist on typ... Remove this comment to see the full error message
          { scope: parser.isHereOrContained, allScope: parser.isHereOrLocationContained, multiple: true },
        ],
        defmsg: Quest.lang.cannot_take,
      }),
      
      new Quest.Command.Cmd('Drop', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.testManipulate],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        default: function (options: any) { falsemsg(options.item.isAtLoc(options.char) ? Quest.lang.cannot_drop : Quest.lang.not_carrying, options) },
      }),
      
      new Quest.Command.Cmd('Wear2', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.isHeld, Quest.Command.cmdRules.testManipulate],
        attName: "wear",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        default: function (options: any) { falsemsg(options.item.ensemble ? Quest.lang.cannot_wear_ensemble : Quest.lang.cannot_wear, options) },
      }),
      
      new Quest.Command.Cmd('Wear', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.testManipulate],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        default: function (options: any) { falsemsg(options.item.ensemble ? Quest.lang.cannot_wear_ensemble : Quest.lang.cannot_wear, options) },
      }),
      
      new Quest.Command.Cmd('Remove', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isWorn, Quest.Command.cmdRules.testManipulate],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
          { scope: parser.isWorn, multiple: true },
        ],
        default: function (options: any) { falsemsg(options.item.ensemble ? Quest.lang.cannot_wear_ensemble : Quest.lang.not_wearing, options) },
      }),
      
      new Quest.Command.Cmd('Remove2', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isWorn, Quest.Command.cmdRules.testManipulate],
        attName: "remove",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
          { scope: parser.isWorn, multiple: true },
        ],
        default: function (options: any) { falsemsg(options.item.ensemble ? Quest.lang.cannot_wear_ensemble : Quest.lang.not_wearing, options) },
      }),
      
      new Quest.Command.Cmd('Read', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        defmsg: Quest.lang.cannot_read,
      }),
      
      new Quest.Command.Cmd('Purchase', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isForSale' does not exist on type '{}'.
          { scope: parser.isForSale },
        ],
        defmsg: Quest.lang.cannot_purchase_here,
      }),
      
      new Quest.Command.Cmd('Sell', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.testManipulate],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        defmsg: Quest.lang.cannot_sell_here,
      }),
      
      new Quest.Command.Cmd('Smash', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        defmsg: Quest.lang.cannot_smash,
      }),
      
      new Quest.Command.Cmd('Turn', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere },
        ],
        defmsg: Quest.lang.cannot_turn,
      }),
      
      new Quest.Command.Cmd('TurnLeft', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere },
        ],
        defmsg: Quest.lang.cannot_turn,
      }),
      
      new Quest.Command.Cmd('TurnRight', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere },
        ],
        defmsg: Quest.lang.cannot_turn,
      }),
      
      new Quest.Command.Cmd('SwitchOn', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        attName: "switchon",
        cmdCategory: "SwitchOn",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        defmsg: Quest.lang.cannot_switch_on,
      }),
      
      new Quest.Command.Cmd('SwitchOn2', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        attName: "switchon",
        cmdCategory: "SwitchOn",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        defmsg: Quest.lang.cannot_switch_on,
      }),

      
      new Quest.Command.Cmd('SwitchOff2', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        attName: "switchoff",
        cmdCategory: "SwitchOff",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true, attName: "switchon" },
        ],
        defmsg: Quest.lang.cannot_switch_off,
      }),
      
      new Quest.Command.Cmd('SwitchOff', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        attName: "switchoff",
        cmdCategory: "SwitchOff",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true, attName: "switchoff" },
        ],
        defmsg: Quest.lang.cannot_switch_off,
      }),

      
      new Quest.Command.Cmd('Open', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, multiple: true, attName: "open" },
        ],
        defmsg: Quest.lang.cannot_open,
      }),
      
      new Quest.Command.Cmd('OpenWith', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, multiple: true, attName: "open" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
        ],
        defmsg: Quest.lang.cannot_open_with,
      }),

      
      new Quest.Command.Cmd('Close', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, multiple: true, attName: "close" },
        ],
        defmsg: Quest.lang.cannot_close,
      }),

      
      new Quest.Command.Cmd('Lock', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, multiple: true, attName: "lock" },
        ],
        defmsg: Quest.lang.cannot_lock,
      }),
      
      new Quest.Command.Cmd('LockWith', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "lock" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, attName: 'key' },
        ],
        defmsg: Quest.lang.cannot_lock_with,
      }),

      
      new Quest.Command.Cmd('Unlock', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, multiple: true, attName: "unlock" },
        ],
        defmsg: Quest.lang.cannot_unlock,
      }),
      
      new Quest.Command.Cmd('UnlockWith', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "unlock" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, attName: 'key' },
        ],
        defmsg: Quest.lang.cannot_unlock_with,
      }),

      
      new Quest.Command.Cmd('Push', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        defmsg: Quest.lang.nothing_useful,
      }),

      
      new Quest.Command.Cmd('Pull', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        defmsg: Quest.lang.nothing_useful,
      }),
      
      new Quest.Command.Cmd('Fill', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        defmsg: Quest.lang.cannot_fill,
      }),
      
      new Quest.Command.Cmd('Empty', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        defmsg: Quest.lang.cannot_empty,
      }),

      
      new Quest.Command.Cmd('SmellItem', {
        npcCmd: true,
        attName: "smell",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "smell" },
        ],
        defmsg: Quest.lang.cannot_smell,
      }),
      
      new Quest.Command.Cmd('ListenToItem', {
        npcCmd: true,
        attName: "listen",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "listen" },
        ],
        defmsg: Quest.lang.cannot_listen,
      }),

      
      new Quest.Command.Cmd('Eat', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldNotWorn' does not exist on type '{... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.testManipulate],
        objects: [
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true, attName: "ingest" },
        ],
        defmsg: Quest.lang.cannot_eat,
      }),
      
      new Quest.Command.Cmd('Drink', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "ingest" },
        ],
        defmsg: Quest.lang.cannot_drink,
      }),
      
      new Quest.Command.Cmd('Ingest', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "ingest" },
        ],
        defmsg: Quest.lang.cannot_ingest,
      }),

      
      new Quest.Command.Cmd('Sit', {
        npcCmd: true,
        cmdCategory: "Posture",
        
        rules: [Quest.Command.cmdRules.testPosture],
        attName: "siton",
        objects: [],
        script: function () {
          const objs = Quest.Utilities.scopeBy((el: any) => el.siton && el.isAtLoc(player.loc))
          console.log(objs)
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (objs.length === 0) return Quest.IO.failedmsg(Quest.lang.no_sit_object)
          return objs[0].siton({ char: player, item: objs[0] }) ? world.SUCCESS : world.FAILED
        },
      }),
      
      new Quest.Command.Cmd('Recline', {
        npcCmd: true,
        cmdCategory: "Posture",
        
        rules: [Quest.Command.cmdRules.testPosture],
        attName: "reclineon",
        objects: [],
        script: function () {
          const objs = Quest.Utilities.scopeBy((el: any) => el.reclineon && el.isAtLoc(player.loc))
          console.log(objs)
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (objs.length === 0) return Quest.IO.failedmsg(Quest.lang.no_recline_object)
          return objs[0].reclineon({ char: player, item: objs[0] }) ? world.SUCCESS : world.FAILED
        },
      }),
      
      new Quest.Command.Cmd('SitOn', {
        npcCmd: true,
        cmdCategory: "Posture",
        
        rules: [Quest.Command.cmdRules.testPosture, Quest.Command.cmdRules.isHere],
        attName: "siton",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "assumePosture" },
        ],
        defmsg: Quest.lang.cannot_sit_on,
      }),
      
      new Quest.Command.Cmd('StandOn', {
        npcCmd: true,
        cmdCategory: "Posture",
        
        rules: [Quest.Command.cmdRules.testPosture, Quest.Command.cmdRules.isHere],
        attName: "standon",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "assumePosture" },
        ],
        defmsg: Quest.lang.cannot_stand_on,
      }),
      
      new Quest.Command.Cmd('ReclineOn', {
        npcCmd: true,
        cmdCategory: "Posture",
        rules: [Quest.Command.cmdRules.testPosture, Quest.Command.cmdRules.isHere],
        attName: "reclineon",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "assumePosture" },
        ],
        defmsg: Quest.lang.cannot_recline_on,
      }),
      
      new Quest.Command.Cmd('GetOff', {
        npcCmd: true,
        cmdCategory: "Posture",
        score: 5, // to give priority over TAKE
        rules: [Quest.Command.cmdRules.testPosture, Quest.Command.cmdRules.isHere],
        attName: "getoff",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "assumePosture" },
        ],
        defmsg: Quest.lang.already,
      }),

      new Quest.Command.Cmd('Use', {
        npcCmd: true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        script: function (objects: any) {
          const obj = objects[0][0]
          const options = { char: player, item: obj, verb: 'use' }

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
            const cmd = Quest.Command.findCmd(obj.useDefaultsTo(player))
            if (cmd) {
              const result = cmd.processCommand(options);
              return result ? world.SUCCESS : world.FAILED
            }
            else {
              throw new Error("USE command defaulting to unknown command " + obj.useDefaultsTo())
            }
          }

          this.default({ char: player, item: obj })
          return world.FAILED;
        },
        defmsg: Quest.lang.cannot_use,
      }),

      
      new Quest.Command.Cmd('TalkTo', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.canTalkTo],
        attName: "talkto",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: parser.isNpcAndHere },
        ],
        defmsg: Quest.lang.cannot_talk_to,
      }),






      // ----------------------------------
      // Complex commands



      
      new Quest.Command.Cmd('Say', {
        script: function (arr: any) {
          const l = [];
          for (let key in w) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (w[key].sayCanHear && w[key].sayCanHear(player, arr[0])) l.push(w[key]);
          }
          l.sort(function (a, b) { return (b.sayPriority + b.sayBonus) - (a.sayPriority + b.sayBonus); });
          if (l.length === 0) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(Quest.lang.say_no_one_here(player, arr[0], arr[1]));
            return world.SUCCESS;
          }

          const options = { char: player, text: Quest.Utilities.sentenceCase(arr[1]) }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          if (Quest.Settings.settings.givePlayerSayMsg) Quest.IO.msg(Quest.lang.say_something, options)
          for (let chr of l) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (chr.sayQuestion && w[chr.sayQuestion].sayResponse(chr, arr[1])) return world.SUCCESS;
            if (chr.sayResponse && chr.sayResponse(arr[1], arr[0])) return world.SUCCESS;
          }
          if (Quest.Settings.settings.givePlayerSayMsg) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.say_no_response, options);
          }
          else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.say_no_response_full, options);
          }
          return world.SUCCESS;
        },
        objects: [
          { special: 'text' },
          { special: 'text' },
        ]
      }),

      new Quest.Command.Cmd('Stand', {
        rules: [Quest.Command.cmdRules.testPosture],
        script: handleStandUp,
      }),

      new Quest.Command.Cmd('NpcStand', {
        rules: [Quest.Command.cmdRules.testPosture],
        cmdCategory: "Posture",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
        ],
        script: handleStandUp,
      }),

      new Quest.Command.Cmd('Make', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
          { scope: parser.isUnconstructed, extendedScope: true },
        ],
        script: function (objects: any) {
          const obj = objects[0][0]
          return obj.build({ char: player, item: obj }) ? world.SUCCESS : world.FAILED
        },
      }),
      
      new Quest.Command.Cmd('MakeWith', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
          { scope: parser.isUnconstructed, extendedScope: true },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, multiple: true },
        ],
        script: function (objects: any) {
          const obj = objects[0][0]
          const options = { char: player, item: obj }
          if (!obj.testComponents(objects[1], options)) return world.FAILED
          return obj.build(options) ? world.SUCCESS : world.FAILED
        },
      }),
      
      new Quest.Command.Cmd('NpcMake', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
          { scope: parser.isUnconstructed },
        ],
        script: function (objects: any) {
          const npc = objects[0][0]
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift()
          const obj = objects[0][0]
          return obj.build({ char: npc, item: obj }) ? world.SUCCESS : world.FAILED
        },
      }),
      
      new Quest.Command.Cmd('NpcMakeWith', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
          { scope: parser.isUnconstructed },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, multiple: true },
        ],
        script: function (objects: any) {
          const npc = objects[0][0]
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift()
          const obj = objects[0][0]
          const options = { char: npc, item: obj }
          if (!obj.testComponents(objects[1], options)) return world.FAILED
          return obj.build(options) ? world.SUCCESS : world.FAILED
        },
      }),

      new Quest.Command.Cmd('FillWith', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld },
          { special: 'fluid' },
        ],
        script: function (objects: any) {
          return handleFillFromUnknown(player, objects[0][0], objects[1]);
        },
      }),
      
      new Quest.Command.Cmd('NpcFillWith', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Fill",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld },
          { special: 'fluid' },
        ],
        script: function (objects: any) {
          const npc = objects[0][0]
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift()
          return handleFillFromUnknown(npc, objects[0][0], objects[1])
        },
      }),
      
      new Quest.Command.Cmd('EmptyInto', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        script: function (objects: any) {
          return handleFillFromVessel(player, objects[0][0], objects[1][0], undefined);
        },
      }),
      
      new Quest.Command.Cmd('NpcEmptyInto', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Fill",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        script: function (objects: any) {
          const npc = objects[0][0]
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift()
          return handleFillFromVessel(npc, objects[0][0], objects[1][0], undefined)
        },
      }),
      
      new Quest.Command.Cmd('EmptyFluidInto', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          { special: 'fluid' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        script: function (objects: any) {
          return handleEmptyFluidInto(player, objects[1][0], objects[0]);
        },
      }),
      
      new Quest.Command.Cmd('NpcEmptyFluidInto', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Fill",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          { special: 'fluid' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        script: function (objects: any) {
          const npc = objects[0][0]
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift()
          return handleEmptyFluidInto(npc, objects[1][0], objects[0])
        },
      }),
      
      new Quest.Command.Cmd('PutFluidIn', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          { special: 'fluid' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "container" },
        ],
        script: function (objects: any) {
          return handleFillFromUnknown(player, objects[1][0], objects[0])
        },
      }),

      new Quest.Command.Cmd('PutIn', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "container" },
        ],
        script: function (objects: any) {
          return handleInOutContainer(player, objects, "drop", handleSingleDropInContainer)
        },
      }),

      new Quest.Command.Cmd('NpcPutIn', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Drop/in",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldByNpc' does not exist on type '{}'... Remove this comment to see the full error message
          { scope: parser.isHeldByNpc, multiple: true },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "container" },
        ],
        script: function (objects: any) {
          const npc = objects[0][0]
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift()
          return handleInOutContainer(npc, objects, "drop", handleSingleDropInContainer)
        },
      }),

      new Quest.Command.Cmd('TakeOut', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContained' does not exist on type '{}'... Remove this comment to see the full error message
          { scope: parser.isContained, multiple: true },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "container" },
        ],
        script: function (objects: any) {
          return handleInOutContainer(player, objects, "take", handleSingleTakeOutContainer)
        },
      }),

      new Quest.Command.Cmd('NpcTakeOut', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Take",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContained' does not exist on type '{}'... Remove this comment to see the full error message
          { scope: parser.isContained, multiple: true },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "container" },
        ],
        script: function (objects: any) {
          const npc = objects[0][0]
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift()
          return handleInOutContainer(npc, objects, "take", handleSingleTakeOutContainer)
        },
      }),

      new Quest.Command.Cmd('GiveTo', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, multiple: true },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent, attName: "npc" },
        ],
        script: function (objects: any) {
          return handleGiveToNpc(player, objects)
        },
      }),
      
      new Quest.Command.Cmd('NpcGiveTo', {
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Give",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldByNpc' does not exist on type '{}'... Remove this comment to see the full error message
          { scope: parser.isHeldByNpc, multiple: true },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresentOrMe' does not exist on type '{... Remove this comment to see the full error message
          { scope: parser.isPresentOrMe, attName: "npc" },
        ],
        script: function (objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift()
          return handleGiveToNpc(npc, objects)
        },
      }),

      
      new Quest.Command.Cmd('Give', {
        antiRegexes: [Quest.lang.regex.GiveTo],
        matchItems: function (s: any) {
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
          const items = Quest.Utilities.array.fromTokens(arr[0].split(' '), scope)
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (!items) return this.setError(parser.NO_OBJECT, Quest.lang.object_unknown_msg(arr[0]))

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
              if (npcs.length === 0) return this.setError(parser.NO_OBJECT, Quest.lang.object_unknown_msg(arr[0]))
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
              if (npcs.length === 0) return this.setError(parser.NO_OBJECT, Quest.lang.no_receiver)
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

        script: function (objects: any) {
          return handleGiveToNpc(player, objects)
        },
      }),

      
      new Quest.Command.Cmd('NpcGive', {
        antiRegexes: Quest.lang.regex.NpcGiveTo,
        matchItems: function (s: any) {
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
          if (possibleChars.length === 0) return this.setError(parser.NO_OBJECT, Quest.lang.object_unknown_msg(charString))
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
          const items = Quest.Utilities.array.fromTokens(arr[0].split(' '), scope)
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (!items) return this.setError(parser.NO_OBJECT, Quest.lang.object_unknown_msg(arr[0]))

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
              if (npcs.length === 0) return this.setError(parser.NO_OBJECT, Quest.lang.object_unknown_msg(arr[0]))
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
              if (npcs.length === 0) return this.setError(parser.NO_OBJECT, Quest.lang.no_receiver)
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

        script: function (objects: any) {
          const char = objects[0][0]
          objects.shift()
          return handleGiveToNpc(char, objects)
        },
      }),






      
      new Quest.Command.Cmd('PushExit', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHere],
        cmdCategory: "Push",
        script: function (objects: any) {
          return handlePushExit(player, objects);
        },
        objects: [
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "shiftable" },
          { special: 'text' },
        ]
      }),
      
      new Quest.Command.Cmd('NpcPushExit', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHere],
        cmdCategory: "Push",
        script: function (objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift();
          return handlePushExit(npc, objects);
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "shiftable" },
          { special: 'text' },
        ]
      }),





      
      new Quest.Command.Cmd('TieUp', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Tie",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, attName: "rope" },
        ],
        script: function (objects: any) {
          const rope = objects[0][0]
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope: rope })
          return rope.handleTieTo(player)
        },
      }),
      
      new Quest.Command.Cmd('TieTo', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Tie",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, attName: "rope" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "attachable" },
        ],
        script: function (objects: any) {
          const rope = objects[0][0]
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope: rope })
          return rope.handleTieTo(player, objects[1][0])
        },
      }),
      
      new Quest.Command.Cmd('NpcTieUp', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Tie",
        script: function (objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift();
          const rope = objects[0][0]
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope: rope })
          return rope.handleTieTo(npc)
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, attName: "rope" },
        ]
      }),
      
      new Quest.Command.Cmd('NpcTieTo', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        cmdCategory: "Tie",
        script: function (objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift();
          const rope = objects[0][0]
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope: rope })
          return rope.handleTieTo(npc, objects[1][0])
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, attName: "rope" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "attachable" },
        ]
      }),

      
      new Quest.Command.Cmd('Untie', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        cmdCategory: "Untie",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "rope" },
        ],
        script: function (objects: any) {
          const rope = objects[0][0]
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope: rope })
          return rope.handleUntieFrom(player)
        },
      }),
      
      new Quest.Command.Cmd('NpcUntie', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        cmdCategory: "Tie",
        script: function (objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift();
          const rope = objects[0][0]
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope: rope })
          return rope.handleUntieFrom(npc)
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: parser.isHeld, attName: "rope" },
        ]
      }),

      
      new Quest.Command.Cmd('UntieFrom', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        cmdCategory: "Untie",
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "rope" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "attachable" },
        ],
        script: function (objects: any) {
          const rope = objects[0][0]
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope: rope })
          return rope.handleUntieFrom(player, objects[1][0])
        },
      }),
      
      new Quest.Command.Cmd('NpcUntieFrom', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        cmdCategory: "Tie",
        script: function (objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc })
          objects.shift();
          const rope = objects[0][0]
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope: rope })
          return rope.handleUntieFrom(npc, objects[1][0])
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "rope" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "attachable" },
        ]
      }),


      
      new Quest.Command.Cmd('UseWith', {
        //npcCmd:true,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testManipulate' does not exist on type '... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: parser.isPresent },
        ],
        script: function (objects: any) {
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
            const cmd = Quest.Command.findCmd(obj.useWithDefaultsTo())
            if (cmd) {
              const result = cmd.script(objects)
              return result ? world.SUCCESS : world.FAILED
            }
            else {
              throw new Error("USE command defaulting to unknown command " + obj.useWithDefaultsTo)
            }
          }
          if (obj2.withUseDefaultsTo) {
            const cmd = Quest.Command.findCmd(obj2.withUseDefaultsTo())
            if (cmd) {
              const result = cmd.script(objects)
              return result ? world.SUCCESS : world.FAILED
            }
            else {
              throw new Error("USE command defaulting to unknown command " + obj2.withUseDefaultsTo)
            }
          }

          this.default({ char: player, item: obj })
          return world.FAILED;
        },
        defmsg: Quest.lang.cannot_use,
      }),






      
      new Quest.Command.Cmd('FollowMe', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
        ],
        script: function (objects: any) {
          const obj = objects[0][0]
          const tpParams = { char: player, npc: obj }
          if (!obj.npc) return Quest.IO.failedmsg(Quest.lang.cannot_follow, tpParams)
          if (!obj.getAgreement("Follow")) return world.FAILED
          return obj.startFollow() ? world.SUCCESS : world.FAILED
        },
      }),

      
      new Quest.Command.Cmd('WaitHere', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
        ],
        script: function (objects: any) {
          const obj = objects[0][0]
          const tpParams = { item: obj }
          if (!obj.npc) return falsemsg(Quest.lang.cannot_wait, tpParams)

          return obj.endFollow() ? world.SUCCESS : world.FAILED
        },
      }),


      
      new Quest.Command.Cmd('AskAbout', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.canTalkTo],
        script: function (arr: any) {
          if (!player.testTalk()) return false
          if (!arr[0][0].askabout) return Quest.IO.failedmsg(Quest.lang.cannot_ask_about, { char: player, item: arr[0][0], text: arr[2] })

          return arr[0][0].askabout(arr[2], arr[1]) ? world.SUCCESS : world.FAILED
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: parser.isNpcAndHere },
          { special: 'text' },
          { special: 'text' },
        ]
      }),
      
      new Quest.Command.Cmd('TellAbout', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.canTalkTo],
        script: function (arr: any) {
          if (!player.testTalk()) return false
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'cannot_tell_about'.
          if (!arr[0][0].tellabout) return Quest.IO.failedmsg(cannot_tell_about, { char: player, item: arr[0][0], text: arr[1] })

          return arr[0][0].tellabout(arr[2], arr[1]) ? world.SUCCESS : world.FAILED
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: parser.isNpcAndHere },
          { special: 'text' },
          { special: 'text' },
        ]
      }),
      
      new Quest.Command.Cmd('TalkAbout', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.canTalkTo],
        //score:1, // to override TALK TO
        script: function (arr: any) {
          if (!player.testTalk()) return false
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'cannot_tell_about'.
          if (!arr[0][0].tellabout && !arr[0][0].askabout) return Quest.IO.failedmsg(cannot_tell_about, { char: player, item: arr[0][0], text: arr[1] })

          return arr[0][0].talkabout(arr[2], arr[1]) ? world.SUCCESS : world.FAILED
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: parser.isNpcAndHere },
          { special: 'text' },
          { special: 'text' },
        ]
      }),

    ]



    for (const s of ['In', 'Out', 'Up', 'Down', 'Through']) {
      
      commands.push(new Quest.Command.Cmd('Go' + s + 'Item', {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
        objects: [{ scope: parser.isHere, attName: "go" + s + "Direction" }],
        dirType: s,
        script: function (objects: any) {
          if (typeof objects[0][0]["go" + this.dirType + "Item"] === 'string') {
            return Quest.IO.failedmsg(objects[0][0]["go" + this.dirType + "Item"], { char: player, item: objects[0][0] })
          }
          return currentLocation.goItem(objects[0][0], this.dirType)
        },
      }))
      
      commands.push(new Quest.Command.Cmd('NpcGo' + s + 'Item', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "npc" },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: parser.isHere, attName: "go" + s + "Direction" },
        ],
        dirType: s,
        script: function (objects: any) {
          if (typeof objects[1][0]["go" + this.dirType + "Item"] === 'string') {
            return Quest.IO.failedmsg(objects[1][0]["go" + this.dirType + "Item"], { char: objects[0][0], item: objects[1][0] })
          }
          return currentLocation.goItem(objects[1][0], this.dirType, objects[0][0])
        },
      }))
    }



    // DEBUG commands

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (Quest.Settings.settings.playMode === 'dev') {
      
      commands.push(new Quest.Command.Cmd('DebugWalkThrough', {
        objects: [
          { special: 'text' },
        ],
        script: function (objects: any) {
          if (typeof walkthroughs === "undefined") {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg("No walkthroughs set")
            return world.FAILED
          }
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const wt = walkthroughs[objects[0]]
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (wt === undefined) return Quest.IO.failedmsg("No walkthrough found called " + objects[0])
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'walkthroughInProgress' does not exist on... Remove this comment to see the full error message
          Quest.Settings.settings.walkthroughInProgress = true
          for (let el of wt) {
            if (typeof el === "string") {
              Quest.Utilities.runCmd(el)
            }
            else {
              Quest.Settings.settings.walkthroughMenuResponses = Array.isArray(el.menu) ? el.menu : [el.menu]
              Quest.Utilities.runCmd(el.cmd)
              Quest.Settings.settings.walkthroughMenuResponses = []
            }
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'walkthroughInProgress' does not exist on... Remove this comment to see the full error message
          Quest.Settings.settings.walkthroughInProgress = false
          return world.SUCCESS_NO_TURNSCRIPTS
        },
      }))

      
      commands.push(new Quest.Command.Cmd('DebugInspect', {
        script: function (arr: any) {
          const item = arr[0][0];
          Quest.IO.debugmsg("See the console for details on the object " + item.name + " (press F12 to world. the console)");
          console.log(item);
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isInWorld' does not exist on type '{}'.
          { scope: parser.isInWorld },
        ],
      }))

      
      commands.push(new Quest.Command.Cmd('DebugInspectByName', {
        script: function (arr: any) {
          const item_name = arr[0]
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!w[item_name]) {
            Quest.IO.debugmsg("No object called " + item_name);
            return world.FAILED;
          }

          Quest.IO.debugmsg("See the console for details on the object " + item_name + " (press F12 to world. the console)");
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          console.log(w[item_name]);
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
          { special: 'text' },
        ],
      }))

      
      commands.push(new Quest.Command.Cmd('DebugTest', {
        script: function () {
          if (!Quest.Settings.settings.tests) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg('The TEST command is for unit testing during game development, and is not activated (F12 for more).')
            console.log('To activate testing in your game, set Quest.Settings.settings.tests to true. More details here: https://github.com/ThePix/QuestJS/wiki/Unit-testing')
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

      
      commands.push(new Quest.Command.Cmd('DebugInspectCommand', {
        script: function (arr: any) {
          Quest.IO.debugmsg("Looking for " + arr[0]);
          for (let cmd of commands) {
            if (cmd.name.toLowerCase() === arr[0] || (cmd.cmdCategory && cmd.cmdCategory.toLowerCase() === arr[0])) {
              Quest.IO.debugmsg("Name: " + cmd.name);
              for (let key in cmd) {
                if (cmd.hasOwnProperty(key)) {
                  Quest.IO.debugmsg("--" + key + ": " + cmd[key]);
                }
              }
            }
          }
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
          { special: 'text' },
        ],
      }))

      
      commands.push(new Quest.Command.Cmd('DebugListCommands', {
        script: function (arr: any) {
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
              Quest.IO.debugmsg(s);
              count++;
            }
          }
          Quest.IO.debugmsg("... Found " + count + " commands.");
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
        ],
      }))

      
      commands.push(new Quest.Command.Cmd('DebugListCommands2', {
        script: function (arr: any) {
          let count = 0;
          for (let cmd of commands) {
            let s = cmd.name + " (" + cmd.regex + ")"
            Quest.IO.debugmsg(s);
            count++;
          }
          Quest.IO.debugmsg("... Found " + count + " commands.");
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
        ],
      }))

      
      commands.push(new Quest.Command.Cmd('DebugParserToggle', {
        script: function (arr: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
          if (parser.debug) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
            parser.debug = false
            Quest.IO.debugmsg("Parser debugging messages are off.");
          }
          else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
            parser.debug = true
            Quest.IO.debugmsg("Parser debugging messages are on.");
          }
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
        ],
      }))

      
      commands.push(new Quest.Command.Cmd('DebugStats', {
        script: function (arr: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
          for (const el of Quest.Settings.settings.statsData) el.count = 0
          for (const key in w) {
            for (const el of Quest.Settings.settings.statsData) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              const res = el.test(w[key])
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
              if (res === true) el.count++
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
              if (typeof res === 'number') el.count += res
            }
          }
          for (const el of Quest.Settings.settings.statsData) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
            Quest.IO.debugmsg(el.name + ": " + el.count)
          }
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
        ],
      }))


      
      commands.push(new Quest.Command.Cmd('DebugHighlight', {
        script: function (arr: any) {
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
          Quest.IO.debugmsg("Previous parser and error messages are now highlighted.");
          return world.SUCCESS_NO_TURNSCRIPTS;
        },
        objects: [
        ],
      }))


      
      commands.push(new Quest.Command.Cmd('MetaTranscriptWalkthrough', {
        script: function () {
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
      const options = { fluid: fluid }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{}'.
      if (!Quest.Utilities.util.findSource(options)) return Quest.IO.failedmsg(fluid ? Quest.lang.no_fluid_here : Quest.lang.no_fluid_here_at_all, options)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'source' does not exist on type '{ fluid:... Remove this comment to see the full error message
      if (options.source.vessel) return handleFillFromVessel(char, options.source, sink, options.fluid)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'source' does not exist on type '{ fluid:... Remove this comment to see the full error message
      return handleFillFromSource(char, options.source, sink, options.fluid)
    }

    function handleFillFromVessel(char: any, source: any, sink: any, fluid: any) {
      // fluid can be undefined
      if (!fluid) fluid = source.containedFluidName
      const options = { char: char, source: source, fluid: fluid, item: sink }

      if (!source.vessel) return Quest.IO.failedmsg(Quest.lang.not_vessel, options)
      if (source.closed) return Quest.IO.failedmsg(Quest.lang.container_closed, options)
      if (!source.containedFluidName) return Quest.IO.failedmsg(Quest.lang.already_empty, options)
      if (!sink.vessel && !sink.sink) return Quest.IO.failedmsg(Quest.lang.not_sink, options)
      if (sink.vessel && sink.containedFluidName) return Quest.IO.failedmsg(Quest.lang.already_full, options)
      if (!char.testManipulate(source, "fill")) return world.FAILED
      if (!char.getAgreement("Fill", source, sink, fluid)) return world.FAILED
      if (!source.isAtLoc(char.name)) return Quest.IO.failedmsg(Quest.lang.not_carrying, options)
      if (source.containedFluidName !== fluid) return Quest.IO.failedmsg(Quest.lang.no_fluid_here, options);
      return source.doEmpty(options) ? world.SUCCESS : world.FAILED;
    }

    function handleFillFromSource(char: any, source: any, sink: any, fluid: any) {
      const options = { char: char, source: source, fluid: fluid, item: sink }

      if (!source.isSourceOf) return Quest.IO.failedmsg(Quest.lang.not_source, options)
      if (source.closed) return Quest.IO.failedmsg(Quest.lang.container_closed, options)
      if (!sink.vessel) return Quest.IO.failedmsg(Quest.lang.not_vessel, options)
      if (sink.containedFluidName) return Quest.IO.failedmsg(Quest.lang.already_full, options)
      if (!char.testManipulate(sink, "fill")) return world.FAILED
      if (!char.getAgreement("Fill", source, sink, fluid)) return world.FAILED
      // if the source is the room itself, we assume it is here
      if (!source.room && !source.isAtLoc(char.loc)) return Quest.IO.failedmsg(Quest.lang.not_here, options)
      if (!source.isSourceOf(fluid)) return Quest.IO.failedmsg(Quest.lang.no_fluid_here, options)
      return sink.doFill(options) ? world.SUCCESS : world.FAILED;
    }

    function handleEmptyFluidInto(char: any, sink: any, fluid: any) {
      for (const key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const o = w[key]
        if (o.vessel && o.containedFluidName === fluid && o.loc === char.name) {
          return handleFillFromVessel(char, o, sink, fluid)
        }
      }
      return Quest.IO.failedmsg(Quest.lang.not_carrying_fluid, { char: char, fluid: fluid });
    }

    export function handleInOutContainer(char: any, objects: any, verb: any, func: any) {
      let success = false;
      const container = objects[1][0];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
      const options = { char: char, container: container, verb: verb, multiple: objects[0].length > 1 || parser.currentCommand.all }

      if (container.handleInOutContainer) return container.handleInOutContainer(options, objects[0])

      if (!container.container) return Quest.IO.failedmsg(Quest.lang.not_container, options)
      if (container.closed) {
        if (container.containerAutoOpen) {
          if (!container.open({ char: char, item: container })) return false
        }
        else if (!container.containerIgnoreClosed) {
          return Quest.IO.failedmsg(Quest.lang.container_closed, options)
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

    export function handleSingleDropInContainer(char: any, container: any, obj: any, options: any) {
      options.fromLoc = char.name
      options.toLoc = container.name
      if (!char.getAgreement("Drop/in", obj, container)) return
      if (!container.testForRecursion(char, obj)) return false
      if (obj.testDrop && !obj.testDrop(options)) return false
      if (!obj.msgDropIn) return falsemsg(Quest.lang.cannot_drop, options)
      if (container.testDropIn && !container.testDropIn(options)) return false
      if (!obj.isAtLoc(char.name)) return Quest.IO.failedmsg(Quest.lang.not_carrying, { char: char, item: obj })
      if (obj.getTakeDropCount) obj.getTakeDropCount(options, char.name)

      if (typeof obj.msgDropIn === 'function') {
        obj.msgDropIn(options)
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(obj.msgDropIn, options)
      }
      obj.moveToFrom(options)
      return true;
    }

    function handleSingleTakeOutContainer(char: any, container: any, obj: any, options: any) {
      options.toLoc = char.name
      options.fromLoc = container.name
      if (!char.getAgreement("Take", obj)) return false
      if (!obj.isAtLoc(container.name)) return Quest.IO.failedmsg(Quest.lang.not_inside, { container: container, item: obj })
      if (obj.getTakeDropCount) obj.getTakeDropCount(options, container.name)
      if (obj.testTake && !obj.testTake(options)) return false
      if (container.testTakeOut && !container.testTakeOut(options)) return false

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(obj.msgTakeOut, options)
      obj.moveToFrom(options)
      return true
    }

    function handleGiveToNpc(char: any, objects: any) {
      let success = false;
      const npc = objects[1][0];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
      const multiple = objects[0].length > 1 || parser.currentCommand.all;
      if (!npc.npc && npc !== player) return Quest.IO.failedmsg(Quest.lang.not_npc_for_give, { char: char, item: npc })
      if (!npc.handleGiveTo) log(npc)

      for (const obj of objects[0]) {
        const flag = npc.handleGiveTo({ char: char, npc: npc, multiple: multiple, item: obj, toLoc: npc.name, fromLoc: char.name })
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
          Quest.IO.failedmsg(Quest.lang.not_npc, { char: player, item: npc });
          return world.FAILED;
        }
        if (!npc.posture) {
          Quest.IO.failedmsg(Quest.lang.already, { item: npc });
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
        Quest.IO.msg(Quest.lang.stop_posture(char))
        char.pause();
        return world.SUCCESS;
      }
    }

    // we know the char can manipulate, we know the obj is here and not held
    function handlePushExit(char: any, objects: any) {
      const verb = objects[0]
      const obj = objects[1][0];
      const dir = Quest.Utilities.getDir(objects[2]);
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const room = w[char.loc]
      const tpParams = { char: char, item: obj, dir: dir }

      if (!obj.shiftable && obj.takeable) return Quest.IO.failedmsg(Quest.lang.take_not_push, tpParams)
      if (!obj.shiftable) return Quest.IO.failedmsg(Quest.lang.cannot_push, tpParams)
      if (!room[dir] || room[dir].isHidden()) return Quest.IO.failedmsg(Quest.lang.not_that_way, tpParams)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (room[dir].isLocked()) return Quest.IO.failedmsg(Quest.lang.locked_exit(char, room[dir]))
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (typeof room[dir].noShiftingMsg === "function") return Quest.IO.failedmsg(room[dir].noShiftingMsg(char, item))
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (typeof room[dir].noShiftingMsg === "string") return Quest.IO.failedmsg(room[dir].noShiftingMsg)
      if (!char.getAgreement("Push", obj, dir)) return false

      if (typeof obj.shift === "function") {
        const res = obj.shift(char, dir, verb);
        return res ? world.SUCCESS : world.FAILED;
      }

      // by default, objects cannot be pushed up
      if (dir === "up") {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(Quest.lang.cannot_push_up, tpParams);
        return world.FAILED;
      }

      // not using moveToFrom; if there are 
      const dest = room[dir].name;
      obj.moveToFrom({ char: char, toLoc: dest, item: obj });
      char.loc = dest;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'dest' does not exist on type '{ char: an... Remove this comment to see the full error message
      tpParams.dest = w[dest]
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(Quest.lang.push_exit_successful, tpParams);
      return world.SUCCESS;
    }

  }
}