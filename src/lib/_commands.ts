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

    const cmdDirections = [];
    for (const exit of Quest.lang.exit_list) {
      if (exit.type === 'nocmd') continue;
      cmdDirections.push(exit.name);
      cmdDirections.push(exit.abbrev.toLowerCase());
      if (exit.alt) cmdDirections.push(exit.alt);
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
        script() {
          if (Quest.Settings.settings.silent) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.mode_silent_off);
            Quest.Settings.settings.silent = false;
          } else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.mode_silent_on);
            Quest.Settings.settings.silent = true;
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
            Quest.IO.ambient();
          }
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaWarnings', {
        script: Quest.lang.warningsScript,
      }),

      new Quest.Command.Cmd('MetaSpoken', {
        script() {
          if (Quest.IO.io.spoken) {
            Quest.IO.io.spoken = false;
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.spoken_off);
          } else {
            Quest.IO.io.spoken = true;
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.spoken_on);
          }
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaIntro', {
        script() {
          Quest.IO.io.spoken = true;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
          if (typeof Quest.Settings.settings.intro === 'string') {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(Quest.Settings.settings.intro);
          } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
            for (const el of Quest.Settings.settings.intro) Quest.IO.msg(el);
          }
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaBrief', {
        script() {
          Quest.Settings.settings.verbosity = Quest.World.world.BRIEF;
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.mode_brief);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaTerse', {
        script() {
          Quest.Settings.settings.verbosity = Quest.World.world.TERSE;
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.mode_terse);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaVerbose', {
        script() {
          Quest.Settings.settings.verbosity = Quest.World.world.VERBOSE;
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(llang.mode_verbose);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaTranscript', {
        script: Quest.lang.transcriptScript,
      }),

      new Quest.Command.Cmd('MetaTranscriptStart', {
        script() {
          if (Quest.SaveLoad.saveLoad.transcript) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.transcript_already_on);
            return Quest.World.world.FAILED;
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
          Quest.SaveLoad.saveLoad.transcriptClear();
          Quest.SaveLoad.saveLoad.transcriptStart();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaTranscriptOn', {
        script() {
          if (Quest.SaveLoad.saveLoad.transcript) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.transcript_already_on);
            return Quest.World.world.FAILED;
          }
          Quest.SaveLoad.saveLoad.transcriptStart();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaTranscriptOff', {
        script() {
          if (!Quest.SaveLoad.saveLoad.transcript) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.transcript_already_off);
            return Quest.World.world.FAILED;
          }
          Quest.SaveLoad.saveLoad.transcriptEnd();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaTranscriptClear', {
        script() {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
          Quest.SaveLoad.saveLoad.transcriptClear();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaTranscriptShow', {
        script() {
          Quest.SaveLoad.saveLoad.transcriptShow();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaUserComment', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          Quest.IO.commentmsg(`Comment: ${arr[0]}`);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      // ----------------------------------
      // File system commands

      new Quest.Command.Cmd('MetaSave', {
        script: Quest.lang.saveLoadScript,
      }),

      new Quest.Command.Cmd('MetaSaveOverwriteGame', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          Quest.SaveLoad.saveLoad.saveGame(arr[0], true);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaSaveGame', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'localStorageDisabled' does not exist on ... Remove this comment to see the full error message
          if (Quest.Settings.settings.localStorageDisabled) {
            Quest.SaveLoad.saveLoad.saveGameAsFile(arr[0]);
          } else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.SaveLoad.saveLoad.saveGame(arr[0]);
          }
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaFileSaveGame', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          Quest.SaveLoad.saveLoad.saveGameAsFile(arr[0]);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaLoad', {
        objects: [
        ],
        script(arr: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'localStorageDisabled' does not exist on ... Remove this comment to see the full error message
          if (Quest.Settings.settings.localStorageDisabled) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            document.getElementById('fileDialog').click();
          } else {
            Quest.lang.saveLoadScript();
          }
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaLoadGame', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          Quest.SaveLoad.saveLoad.loadGameFromLS(arr[0]);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaFileLoadGame', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          document.getElementById('fileDialog').click();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaDir', {
        script() {
          Quest.SaveLoad.saveLoad.dirGame();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaDeleteGame', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          Quest.SaveLoad.saveLoad.deleteGame(arr[0]);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaUndo', {
        script() {
          if (Quest.Settings.settings.maxUndo === 0) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.undo_disabled);
            return Quest.World.world.FAILED;
          }
          if (Quest.World.world.gameState.length < 2) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(Quest.lang.undo_not_available);
            return Quest.World.world.FAILED;
          }
          Quest.World.world.gameState.pop();
          const gameState = Quest.World.world.gameState[Quest.World.world.gameState.length - 1];
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.undo_done);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.SaveLoad.saveLoad.loadTheWorld(gameState);
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          Quest.World.w[Quest.World.player.loc].description();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaAgain', {
        script() {
          return Quest.IO.io.againOrOops(true);
        },
      }),

      new Quest.Command.Cmd('MetaOops', {
        script() {
          return Quest.IO.io.againOrOops(false);
        },
      }),

      new Quest.Command.Cmd('MetaRestart', {
        script() {
          Quest.IO.askText(Quest.lang.restart_are_you_sure, (result: any) => {
            if (result.match(Quest.lang.yes_regex)) {
              location.reload();
            } else {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              Quest.IO.metamsg(Quest.lang.restart_no);
            }
          });
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('MetaPronouns', {
        script() {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg('See the developer console (F12) for the current pronouns');
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
          console.log(Quest.Parser.parser.pronouns);
        },
      }),

      new Quest.Command.Cmd('MetaScore', {
        script() {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.scores_not_implemented);
        },
      }),

      new Quest.Command.Cmd('MetaTopicsNote', {
        script: Quest.lang.topicsScript,
      }),

      // These are kind of meta-commands - perhaps free commands is a better term.
      // I see them as jogging the user's mind about the game Quest.World.world, rather than
      // doing something in the game Quest.World.world, so by default
      // no ttime passes.
      // Set Quest.Settings.settings.lookCountsAsTurn to true if you disagree!

      new Quest.Command.Cmd('Look', {
        script() {
          Quest.World.currentLocation.description();
          return Quest.Settings.settings.lookCountsAsTurn ? Quest.World.world.SUCCESS : Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('Exits', {
        script() {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.can_go, { char: Quest.World.player });
          return Quest.Settings.settings.lookCountsAsTurn ? Quest.World.world.SUCCESS : Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('Inv', {
        script() {
          const listOfOjects = Quest.World.player.getContents(Quest.World.world.INVENTORY);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(`${Quest.lang.inventory_prefix} ${Quest.Utilities.formatList(listOfOjects, {
            article: Quest.Utilities.INDEFINITE, lastJoiner: Quest.lang.list_and, loc: Quest.World.player.name, modified: true, nothing: Quest.lang.list_nothing,
          })}.`, { char: Quest.World.player });
          return Quest.Settings.settings.lookCountsAsTurn ? Quest.World.world.SUCCESS : Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('Map', {
        script() {
          if (typeof showMap !== 'undefined') {
            showMap();
            return Quest.Settings.settings.lookCountsAsTurn ? Quest.World.world.SUCCESS : Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
          }
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const zone = Quest.World.w[Quest.World.player.loc];
          if (!zone.zone) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            return Quest.IO.failedmsg(Quest.lang.no_map);
          }
          const flag = zone.drawMap();
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (!flag) return Quest.IO.failedmsg(Quest.lang.no_map);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      new Quest.Command.Cmd('Topics', {
        attName: 'topics',
        defmsg:  Quest.lang.no_topics,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: Quest.Parser.parser.isNpcAndHere },
        ],
      }),

      new Quest.Command.Cmd('Wait', {
        script() {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg(Quest.lang.wait_msg);
          return Quest.World.world.SUCCESS;
        },
      }),

      new Quest.Command.Cmd('Smell', {
        script() {
          if (Quest.World.currentLocation.smell) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
            Quest.Utilities.printOrRun(Quest.World.player, Quest.World.currentLocation, 'smell');
          } else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.no_smell, { char: Quest.World.player });
          }
          return Quest.World.world.SUCCESS;
        },
      }),

      new Quest.Command.Cmd('Listen', {
        script() {
          if (Quest.World.currentLocation.listen) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
            Quest.Utilities.printOrRun(Quest.World.player, Quest.World.currentLocation, 'listen');
          } else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.no_listen, { char: Quest.World.player });
          }
          return Quest.World.world.SUCCESS;
        },
      }),

      new Quest.Command.Cmd('PurchaseFromList', {
        script() {
          const l = [];
          for (const key in w) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isForSale' does not exist on type '{}'.
            if (Quest.Parser.parser.isForSale(Quest.World.w[key])) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              const price = Quest.World.w[key].getBuyingPrice(Quest.World.player);
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              const row = [Quest.Utilities.sentenceCase(Quest.World.w[key].getName()), Quest.World.world.Money(price)];
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              row.push(price > Quest.World.player.money ? '-' : `{cmd:buy ${Quest.World.w[key].alias}:${buy}}`);
              l.push(row);
            }
          }
          if (l.length === 0) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            return Quest.IO.failedmsg(Quest.lang.nothing_for_sale);
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          Quest.IO.msg(`${current_money}: ${Quest.World.world.Money(Quest.World.player.money)}`);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
          Quest.IO.msgTable(l, buy_headings);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }),

      // Out of convenient order as it needs to be before TAKE

      new Quest.Command.Cmd('GetFluid', {

        objects: [
          { special: 'fluid' },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        score: 5,
        script(objects: any) {
          console.log('here');
          const options = { char: Quest.World.player, fluid: objects[0] };
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{}'.
          if (!Quest.Utilities.util.findSource(options)) return Quest.IO.failedmsg(Quest.lang.no_fluid_here, options);
          console.log('here');
          return Quest.IO.failedmsg(Quest.lang.cannot_get_fluid, options);
        },
      }),

      // ----------------------------------
      // Verb-object commands

      new Quest.Command.Cmd('Examine', {
        defmsg:  Quest.lang.default_examine,
        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isPresent },
        ],
      }),

      new Quest.Command.Cmd('LookAt', {
        attName: 'examine',

        defmsg:  Quest.lang.default_examine,
        // used for NPCs
        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresentOrMe' does not exist on type '{... Remove this comment to see the full error message
          { scope: Quest.Parser.parser.isPresentOrMe },
        ],
      }),

      new Quest.Command.Cmd('LookOut', {
        attName: 'lookout',

        defmsg: Quest.lang.cannot_look_out,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
      }),

      new Quest.Command.Cmd('LookBehind', {
        attName: 'lookbehind',

        defmsg: Quest.lang.nothing_there,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
      }),

      new Quest.Command.Cmd('LookUnder', {
        attName: 'lookunder',

        defmsg: Quest.lang.nothing_there,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
      }),

      new Quest.Command.Cmd('LookThrough', {
        attName: 'lookthrough',

        defmsg: Quest.lang.nothing_there,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
      }),

      new Quest.Command.Cmd('LookInside', {
        attName: 'lookinside',

        defmsg: Quest.lang.nothing_inside,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
      }),

      new Quest.Command.Cmd('Search', {
        attName: 'search',

        defmsg: Quest.lang.nothing_there,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
      }),

      new Quest.Command.Cmd('Take', {
        defmsg: Quest.lang.cannot_take,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHereOrContained' does not exist on typ... Remove this comment to see the full error message
          { allScope: Quest.Parser.parser.isHereOrLocationContained, multiple: true, scope: Quest.Parser.parser.isHereOrContained },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHereAlready' does not exist on type '{... Remove this comment to see the full error message
        rules: [Quest.Command.cmdRules.isHereAlready, Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Drop', {
        default(options: any) {
          Quest.IO.falsemsg(options.item.isAtLoc(options.char) ? Quest.lang.cannot_drop : Quest.lang.not_carrying, options);
        },

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Wear2', {
        attName: 'wear',

        default(options: any) {
          Quest.IO.falsemsg(options.item.ensemble ? Quest.lang.cannot_wear_ensemble : Quest.lang.cannot_wear, options);
        },
        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.isHeld, Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Wear', {
        default(options: any) {
          Quest.IO.falsemsg(options.item.ensemble ? Quest.lang.cannot_wear_ensemble : Quest.lang.cannot_wear, options);
        },

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Remove', {
        default(options: any) {
          Quest.IO.falsemsg(options.item.ensemble ? Quest.lang.cannot_wear_ensemble : Quest.lang.not_wearing, options);
        },

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isWorn },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isWorn, Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Remove2', {
        attName: 'remove',

        default(options: any) {
          Quest.IO.falsemsg(options.item.ensemble ? Quest.lang.cannot_wear_ensemble : Quest.lang.not_wearing, options);
        },

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isWorn },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isWorn' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isWorn, Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Read', {
        defmsg: Quest.lang.cannot_read,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.isPresent],
      }),

      new Quest.Command.Cmd('Purchase', {
        defmsg: Quest.lang.cannot_purchase_here,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isForSale' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isForSale },
        ],
        rules: [Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Sell', {
        defmsg: Quest.lang.cannot_sell_here,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Smash', {
        defmsg: Quest.lang.cannot_smash,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
      }),

      new Quest.Command.Cmd('Turn', {
        defmsg: Quest.lang.cannot_turn,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('TurnLeft', {
        defmsg: Quest.lang.cannot_turn,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('TurnRight', {
        defmsg: Quest.lang.cannot_turn,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('SwitchOn', {
        attName: 'switchon',

        cmdCategory: 'SwitchOn',
        defmsg:      Quest.lang.cannot_switch_on,
        npcCmd:      true,
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('SwitchOn2', {
        attName: 'switchon',

        cmdCategory: 'SwitchOn',
        defmsg:      Quest.lang.cannot_switch_on,
        npcCmd:      true,
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('SwitchOff2', {
        attName: 'switchoff',

        cmdCategory: 'SwitchOff',
        defmsg:      Quest.lang.cannot_switch_off,
        npcCmd:      true,
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'switchon', multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('SwitchOff', {
        attName: 'switchoff',

        cmdCategory: 'SwitchOff',
        defmsg:      Quest.lang.cannot_switch_off,
        npcCmd:      true,
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'switchoff', multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('Open', {
        defmsg: Quest.lang.cannot_open,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'open', multiple: true, scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('OpenWith', {

        defmsg:  Quest.lang.cannot_open_with,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'open', multiple: true, scope: Quest.Parser.parser.isPresent },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('Close', {
        defmsg: Quest.lang.cannot_close,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'close', multiple: true, scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('Lock', {
        defmsg: Quest.lang.cannot_lock,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'lock', multiple: true, scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('LockWith', {

        defmsg:  Quest.lang.cannot_lock_with,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'lock', scope: Quest.Parser.parser.isPresent },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'key', scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('Unlock', {
        defmsg: Quest.lang.cannot_unlock,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'unlock', multiple: true, scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('UnlockWith', {

        defmsg:  Quest.lang.cannot_unlock_with,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'unlock', scope: Quest.Parser.parser.isPresent },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'key', scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('Push', {
        defmsg: Quest.lang.nothing_useful,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('Pull', {
        defmsg: Quest.lang.nothing_useful,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
      }),

      new Quest.Command.Cmd('Fill', {
        defmsg: Quest.lang.cannot_fill,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Empty', {
        defmsg: Quest.lang.cannot_empty,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
      }),

      new Quest.Command.Cmd('SmellItem', {
        attName: 'smell',
        defmsg:  Quest.lang.cannot_smell,
        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'smell', scope: Quest.Parser.parser.isPresent },
        ],
      }),

      new Quest.Command.Cmd('ListenToItem', {
        attName: 'listen',
        defmsg:  Quest.lang.cannot_listen,
        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'listen', scope: Quest.Parser.parser.isPresent },
        ],
      }),

      new Quest.Command.Cmd('Eat', {
        defmsg: Quest.lang.cannot_eat,

        npcCmd:  true,
        objects: [
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'ingest', multiple: true, scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.isHeldNotWorn, Quest.Command.cmdRules.testManipulate],
      }),

      new Quest.Command.Cmd('Drink', {
        defmsg: Quest.lang.cannot_drink,

        npcCmd:  true,
        objects: [
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'ingest', scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
      }),

      new Quest.Command.Cmd('Ingest', {
        defmsg:  Quest.lang.cannot_ingest,
        npcCmd:  true,
        objects: [
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'ingest', scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
      }),

      new Quest.Command.Cmd('Sit', {
        attName:     'siton',
        cmdCategory: 'Posture',

        npcCmd:  true,
        objects: [],
        rules:   [Quest.Command.cmdRules.testPosture],
        script() {
          const objs = Quest.Utilities.scopeBy((el: any) => el.siton && el.isAtLoc(Quest.World.player.loc));
          console.log(objs);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (objs.length === 0) return Quest.IO.failedmsg(Quest.lang.no_sit_object);
          return objs[0].siton({ char: Quest.World.player, item: objs[0] }) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('Recline', {
        attName:     'reclineon',
        cmdCategory: 'Posture',

        npcCmd:  true,
        objects: [],
        rules:   [Quest.Command.cmdRules.testPosture],
        script() {
          const objs = Quest.Utilities.scopeBy((el: any) => el.reclineon && el.isAtLoc(Quest.World.player.loc));
          console.log(objs);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (objs.length === 0) return Quest.IO.failedmsg(Quest.lang.no_recline_object);
          return objs[0].reclineon({ char: Quest.World.player, item: objs[0] }) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('SitOn', {
        attName:     'siton',
        cmdCategory: 'Posture',

        defmsg:  Quest.lang.cannot_sit_on,
        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'assumePosture', scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testPosture, Quest.Command.cmdRules.isHere],
      }),

      new Quest.Command.Cmd('StandOn', {
        attName:     'standon',
        cmdCategory: 'Posture',

        defmsg:  Quest.lang.cannot_stand_on,
        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'assumePosture', scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testPosture, Quest.Command.cmdRules.isHere],
      }),

      new Quest.Command.Cmd('ReclineOn', {
        attName:     'reclineon',
        cmdCategory: 'Posture',
        defmsg:      Quest.lang.cannot_recline_on,
        npcCmd:      true,
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'assumePosture', scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testPosture, Quest.Command.cmdRules.isHere],
      }),

      new Quest.Command.Cmd('GetOff', {
        attName:     'getoff',
        cmdCategory: 'Posture',

        defmsg: Quest.lang.already,

        npcCmd: true,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'assumePosture', scope: Quest.Parser.parser.isHere },
        ],
        // to give priority over TAKE
        rules: [Quest.Command.cmdRules.testPosture, Quest.Command.cmdRules.isHere],
        score: 5,
      }),

      new Quest.Command.Cmd('Use', {
        defmsg: Quest.lang.cannot_use,

        npcCmd:  true,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresentOrContained],
        script(objects: any) {
          const obj     = objects[0][0];
          const options = { char: Quest.World.player, item: obj, verb: 'use' };

          // Use this to bypass the rules, say if the object could be in a strange place
          if (obj.useFunction) {
            const result = obj.useFunction(options);
            return result ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
          }

          if (obj.use) {
            const result = this.processCommand(options);
            return result ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
          }

          if (obj.useDefaultsTo) {
            const cmd = Quest.Command.findCmd(obj.useDefaultsTo(Quest.World.player));
            if (cmd) {
              const result = cmd.processCommand(options);
              return result ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
            }
            throw new Error(`USE command defaulting to unknown command ${obj.useDefaultsTo()}`);
          }

          this.default({ char: Quest.World.player, item: obj });
          return Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('TalkTo', {

        attName: 'talkto',

        defmsg: Quest.lang.cannot_talk_to,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: Quest.Parser.parser.isNpcAndHere },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.canTalkTo],
      }),

      // ----------------------------------
      // Complex commands

      new Quest.Command.Cmd('Say', {
        objects: [
          { special: 'text' },
          { special: 'text' },
        ],
        script(arr: any) {
          const l = [];
          for (const key in w) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (Quest.World.w[key].sayCanHear && Quest.World.w[key].sayCanHear(Quest.World.player, arr[0])) l.push(Quest.World.w[key]);
          }
          l.sort((a, b) => (b.sayPriority + b.sayBonus) - (a.sayPriority + b.sayBonus));
          if (l.length === 0) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(Quest.lang.say_no_one_here(Quest.World.player, arr[0], arr[1]));
            return Quest.World.world.SUCCESS;
          }

          const options = { char: Quest.World.player, text: Quest.Utilities.sentenceCase(arr[1]) };
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          if (Quest.Settings.settings.givePlayerSayMsg) Quest.IO.msg(Quest.lang.say_something, options);
          for (const chr of l) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (chr.sayQuestion && Quest.World.w[chr.sayQuestion].sayResponse(chr, arr[1])) return Quest.World.world.SUCCESS;
            if (chr.sayResponse && chr.sayResponse(arr[1], arr[0])) return Quest.World.world.SUCCESS;
          }
          if (Quest.Settings.settings.givePlayerSayMsg) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.say_no_response, options);
          } else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.say_no_response_full, options);
          }
          return Quest.World.world.SUCCESS;
        },
      }),

      new Quest.Command.Cmd('Stand', {
        rules:  [Quest.Command.cmdRules.testPosture],
        script: handleStandUp,
      }),

      new Quest.Command.Cmd('NpcStand', {
        cmdCategory: 'Posture',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
        ],
        rules:  [Quest.Command.cmdRules.testPosture],
        script: handleStandUp,
      }),

      new Quest.Command.Cmd('Make', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
          { extendedScope: true, scope: Quest.Parser.parser.isUnconstructed },
        ],
        script(objects: any) {
          const obj = objects[0][0];
          return obj.build({ char: Quest.World.player, item: obj }) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('MakeWith', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
          { extendedScope: true, scope: Quest.Parser.parser.isUnconstructed },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHere },
        ],
        script(objects: any) {
          const obj     = objects[0][0];
          const options = { char: Quest.World.player, item: obj };
          if (!obj.testComponents(objects[1], options)) return Quest.World.world.FAILED;
          return obj.build(options) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('NpcMake', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
          { scope: Quest.Parser.parser.isUnconstructed },
        ],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          const obj = objects[0][0];
          return obj.build({ char: npc, item: obj }) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('NpcMakeWith', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUnconstructed' does not exist on type ... Remove this comment to see the full error message
          { scope: Quest.Parser.parser.isUnconstructed },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHere },
        ],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          const obj     = objects[0][0];
          const options = { char: npc, item: obj };
          if (!obj.testComponents(objects[1], options)) return Quest.World.world.FAILED;
          return obj.build(options) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('FillWith', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isHeld },
          { special: 'fluid' },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          return handleFillFromUnknown(Quest.World.player, objects[0][0], objects[1]);
        },
      }),

      new Quest.Command.Cmd('NpcFillWith', {
        cmdCategory: 'Fill',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isHeld },
          { special: 'fluid' },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          return handleFillFromUnknown(npc, objects[0][0], objects[1]);
        },
      }),

      new Quest.Command.Cmd('EmptyInto', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isHeld },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          return handleFillFromVessel(Quest.World.player, objects[0][0], objects[1][0], undefined);
        },
      }),

      new Quest.Command.Cmd('NpcEmptyInto', {
        cmdCategory: 'Fill',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isHeld },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          return handleFillFromVessel(npc, objects[0][0], objects[1][0], undefined);
        },
      }),

      new Quest.Command.Cmd('EmptyFluidInto', {
        objects: [
          { special: 'fluid' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          return handleEmptyFluidInto(Quest.World.player, objects[1][0], objects[0]);
        },
      }),

      new Quest.Command.Cmd('NpcEmptyFluidInto', {
        cmdCategory: 'Fill',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          { special: 'fluid' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          return handleEmptyFluidInto(npc, objects[1][0], objects[0]);
        },
      }),

      new Quest.Command.Cmd('PutFluidIn', {
        objects: [
          { special: 'fluid' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'container', scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          return handleFillFromUnknown(Quest.World.player, objects[1][0], objects[0]);
        },
      }),

      new Quest.Command.Cmd('PutIn', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'container', scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          return handleInOutContainer(Quest.World.player, objects, 'drop', handleSingleDropInContainer);
        },
      }),

      new Quest.Command.Cmd('NpcPutIn', {
        cmdCategory: 'Drop/in',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldByNpc' does not exist on type '{}'... Remove this comment to see the full error message
          { multiple: true, scope: Quest.Parser.parser.isHeldByNpc },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'container', scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          return handleInOutContainer(npc, objects, 'drop', handleSingleDropInContainer);
        },
      }),

      new Quest.Command.Cmd('TakeOut', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContained' does not exist on type '{}'... Remove this comment to see the full error message
          { multiple: true, scope: Quest.Parser.parser.isContained },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'container', scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        script(objects: any) {
          return handleInOutContainer(Quest.World.player, objects, 'take', handleSingleTakeOutContainer);
        },
      }),

      new Quest.Command.Cmd('NpcTakeOut', {
        cmdCategory: 'Take',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContained' does not exist on type '{}'... Remove this comment to see the full error message
          { multiple: true, scope: Quest.Parser.parser.isContained },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'container', scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          return handleInOutContainer(npc, objects, 'take', handleSingleTakeOutContainer);
        },
      }),

      new Quest.Command.Cmd('GiveTo', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { multiple: true, scope: Quest.Parser.parser.isHeld },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isPresent },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          return handleGiveToNpc(Quest.World.player, objects);
        },
      }),

      new Quest.Command.Cmd('NpcGiveTo', {
        cmdCategory: 'Give',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeldByNpc' does not exist on type '{}'... Remove this comment to see the full error message
          { multiple: true, scope: Quest.Parser.parser.isHeldByNpc },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresentOrMe' does not exist on type '{... Remove this comment to see the full error message
          { attName: 'npc', scope: Quest.Parser.parser.isPresentOrMe },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          return handleGiveToNpc(npc, objects);
        },
      }),

      new Quest.Command.Cmd('Give', {
        antiRegexes: [Quest.lang.regex.GiveTo],
        matchItems(s: any) {
          if (!this._test(s)) return;
          if (!this._testNot(s)) return;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
          Quest.Parser.parser.msg('---------------------------------------------------------');
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
          Quest.Parser.parser.msg(`* Looking at candidate: ${this.name}`);

          // this is a temporary set of data used while we parser one input
          this.tmp.objectTexts = [],
          this.tmp.objects = [],
          this.tmp.score = this.score ? this.score : 10;
          this.tmp.error = undefined;

          const arr = this.tmp.regex.exec(s);
          arr.shift();  // first element is the whole match, so discard

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
          const { scope } = Quest.World.world;
          const npcs      = scope.filter((el: any) => el.npc && el !== Quest.World.player);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromTokens' does not exist on type '{}'.
          const items = Quest.Utilities.array.fromTokens(arr[0].split(' '), scope);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (!items) return this.setError(Quest.Parser.parser.NO_OBJECT, Quest.lang.object_unknown_msg(arr[0]));

          // The first item could be the NPC to give it to,
          // and we want to pull that out.
          // Disambiguation makes this tricky...
          if (items[0].length === 1) {
            // No need to disambig, only one item matched
            if (items[0][0].npc) {
              this.tmp.objects[1] = items[0];
              items.shift();
              this.tmp.objects[0] = items;
            } else {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
              if (npcs.length === 0) return this.setError(Quest.Parser.parser.NO_OBJECT, Quest.lang.object_unknown_msg(arr[0]));
              this.tmp.objects[1] = npcs;
              this.tmp.objects[0] = items;
            }
          } else {
            // At least two items matched
            // NPCs will take priority
            const npcList = items[0].filter((el: any) => el.npc);
            if (npcList.length === 0) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
              if (npcs.length === 0) return this.setError(Quest.Parser.parser.NO_OBJECT, Quest.lang.no_receiver);
              this.tmp.objects[1] = npcs;
              this.tmp.objects[0] = items;
            } else if (npcList.length === 1) {
              this.tmp.objects[1] = [npcList[0]];
              items.shift();
              this.tmp.objects[0] = items;
            } else {
              this.tmp.objects[1] = [npcList];
              items.shift();
              this.tmp.objects[0] = items;
            }
          }

          // pre-disambig items in this.tmp.objects[0]
          for (let i = 0; i < this.tmp.objects[0].length; i++) {
            const el = this.tmp.objects[0][i];
            if (el.length === 1) {
              this.tmp.objects[0][i] = el[0];
            } else {
              const held = el.filter((el: any) => el.loc === Quest.World.player.name);
              if (held.length === 1) {
                this.tmp.objects[0][i] = held[0];
              } else if (held.length > 1) {
                this.tmp.objects[0][i] = held;
              }
              // otherwise, stick we hat we have
            }
          }

          this.tmp.score = 10;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
          Quest.Parser.parser.msg(`..Base score: ${this.tmp.score}`);
        },

        script(objects: any) {
          return handleGiveToNpc(Quest.World.player, objects);
        },
      }),

      new Quest.Command.Cmd('NpcGive', {
        antiRegexes: Quest.lang.regex.NpcGiveTo,
        matchItems(s: any) {
          if (!this._test(s)) return;
          if (!this._testNot(s)) return;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
          Quest.Parser.parser.msg('---------------------------------------------------------');
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
          Quest.Parser.parser.msg(`* Looking at candidate: ${this.name}`);

          // this is a temporary set of data used while we parse one input
          this.tmp.objectTexts = [],
          this.tmp.objects = [],
          this.tmp.score = this.score ? this.score : 10;
          this.tmp.error = undefined;

          const arr = this.tmp.regex.exec(s);
          arr.shift();  // first element is the whole match, so discard
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
          const { scope } = Quest.World.world;

          // Which NPC are we asking to do this?
          let char: any;
          const charString = arr.shift();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'findInList' does not exist on type '{}'.
          const possibleChars = Quest.Parser.parser.findInList(charString, scope, {});
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (possibleChars.length === 0) return this.setError(Quest.Parser.parser.NO_OBJECT, Quest.lang.object_unknown_msg(charString));
          if (possibleChars.length === 1) {
            char = possibleChars[0];
          } else {
            const actualChars = possibleChars.filter((el: any) => (el.npc || el.player) && el !== char);
            if (possibleChars.length === 0) {
              char = possibleChars;
            } else if (possibleChars.length === 1) {
              char = possibleChars[0];
            } else {
              char = possibleChars;
            }
          }

          // npcs is a list of people we could be asking the character to give to
          const npcs = scope.filter((el: any) => (el.npc || el.player) && el !== char);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromTokens' does not exist on type '{}'.
          const items = Quest.Utilities.array.fromTokens(arr[0].split(' '), scope);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
          if (!items) return this.setError(Quest.Parser.parser.NO_OBJECT, Quest.lang.object_unknown_msg(arr[0]));

          // The first item could be the NPC to give it to,
          // and we want to pull that out.
          // Disambiguation makes this tricky...
          if (items[0].length === 1) {
            // No need to disambig, only one item matched
            if (items[0][0].npc || items[0][0] === Quest.World.player) {
              this.tmp.objects[1] = items[0];
              items.shift();
              this.tmp.objects[0] = items;
            } else {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
              if (npcs.length === 0) return this.setError(Quest.Parser.parser.NO_OBJECT, Quest.lang.object_unknown_msg(arr[0]));
              this.tmp.objects[1] = npcs;
              this.tmp.objects[0] = items;
            }
          } else {
            // At least two items matched
            // NPCs will take priority
            const npcList = items[0].filter((el: any) => el.npc || el.player);
            if (npcList.length === 0) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'NO_OBJECT' does not exist on type '{}'.
              if (npcs.length === 0) return this.setError(Quest.Parser.parser.NO_OBJECT, Quest.lang.no_receiver);
              this.tmp.objects[1] = npcs;
              this.tmp.objects[0] = items;
            } else if (npcList.length === 1) {
              this.tmp.objects[1] = [npcList[0]];
              items.shift();
              this.tmp.objects[0] = items;
            } else {
              this.tmp.objects[1] = [npcList];
              items.shift();
              this.tmp.objects[0] = items;
            }
          }

          // pre-disambig items in this.tmp.objects[0]
          for (let i = 0; i < this.tmp.objects[0].length; i++) {
            const el = this.tmp.objects[0][i];
            if (el.length === 1) {
              this.tmp.objects[0][i] = el[0];
            } else {
              const held = el.filter((el: any) => el.loc === char.name);
              if (held.length === 1) {
                this.tmp.objects[0][i] = held[0];
              } else if (held.length > 1) {
                this.tmp.objects[0][i] = held;
              }
              // otherwise, stick we hat we have
            }
          }
          this.tmp.objects.unshift([char]);

          this.tmp.score = 10;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{}'.
          Quest.Parser.parser.msg(`..Base score: ${this.tmp.score}`);
        },

        script(objects: any) {
          const char = objects[0][0];
          objects.shift();
          return handleGiveToNpc(char, objects);
        },
      }),

      new Quest.Command.Cmd('PushExit', {

        cmdCategory: 'Push',
        objects:     [
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'shiftable', scope: Quest.Parser.parser.isHere },
          { special: 'text' },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHere],
        script(objects: any) {
          return handlePushExit(Quest.World.player, objects);
        },
      }),

      new Quest.Command.Cmd('NpcPushExit', {

        cmdCategory: 'Push',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          { special: 'text' },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'shiftable', scope: Quest.Parser.parser.isHere },
          { special: 'text' },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHere],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          return handlePushExit(npc, objects);
        },
      }),

      new Quest.Command.Cmd('TieUp', {

        cmdCategory: 'Tie',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'rope', scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const rope = objects[0][0];
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope });
          return rope.handleTieTo(Quest.World.player);
        },
      }),

      new Quest.Command.Cmd('TieTo', {

        cmdCategory: 'Tie',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'rope', scope: Quest.Parser.parser.isHeld },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'attachable', scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const rope = objects[0][0];
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope });
          return rope.handleTieTo(Quest.World.player, objects[1][0]);
        },
      }),

      new Quest.Command.Cmd('NpcTieUp', {

        cmdCategory: 'Tie',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'rope', scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          const rope = objects[0][0];
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope });
          return rope.handleTieTo(npc);
        },
      }),

      new Quest.Command.Cmd('NpcTieTo', {

        cmdCategory: 'Tie',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'rope', scope: Quest.Parser.parser.isHeld },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'attachable', scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isHeld],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          const rope = objects[0][0];
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope });
          return rope.handleTieTo(npc, objects[1][0]);
        },
      }),

      new Quest.Command.Cmd('Untie', {

        cmdCategory: 'Untie',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'rope', scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        script(objects: any) {
          const rope = objects[0][0];
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope });
          return rope.handleUntieFrom(Quest.World.player);
        },
      }),

      new Quest.Command.Cmd('NpcUntie', {

        cmdCategory: 'Tie',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
          { attName: 'rope', scope: Quest.Parser.parser.isHeld },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          const rope = objects[0][0];
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope });
          return rope.handleUntieFrom(npc);
        },
      }),

      new Quest.Command.Cmd('UntieFrom', {

        cmdCategory: 'Untie',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'rope', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'attachable', scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        script(objects: any) {
          const rope = objects[0][0];
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope });
          return rope.handleUntieFrom(Quest.World.player, objects[1][0]);
        },
      }),

      new Quest.Command.Cmd('NpcUntieFrom', {

        cmdCategory: 'Tie',
        objects:     [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'rope', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'attachable', scope: Quest.Parser.parser.isHere },
        ],
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        script(objects: any) {
          const npc = objects[0][0];
          if (!npc.npc) return Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          objects.shift();
          const rope = objects[0][0];
          if (!rope.rope) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable, { rope });
          return rope.handleUntieFrom(npc, objects[1][0]);
        },
      }),

      new Quest.Command.Cmd('UseWith', {

        defmsg: Quest.lang.cannot_use,

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isPresent' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isPresent },
        ],
        // npcCmd:true,
        rules: [Quest.Command.cmdRules.testManipulate, Quest.Command.cmdRules.isPresent],
        script(objects: any) {
          const obj  = objects[0][0];
          const obj2 = objects[1][0];

          if (obj.useWith) {
            const result = obj.useWith(Quest.World.player, obj2);
            return result ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
          }
          if (obj2.withUse) {
            const result = obj2.withUse(Quest.World.player, obj);
            return result ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
          }

          if (obj.useWithDefaultsTo) {
            const cmd = Quest.Command.findCmd(obj.useWithDefaultsTo());
            if (cmd) {
              const result = cmd.script(objects);
              return result ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
            }
            throw new Error(`USE command defaulting to unknown command ${obj.useWithDefaultsTo}`);
          }
          if (obj2.withUseDefaultsTo) {
            const cmd = Quest.Command.findCmd(obj2.withUseDefaultsTo());
            if (cmd) {
              const result = cmd.script(objects);
              return result ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
            }
            throw new Error(`USE command defaulting to unknown command ${obj2.withUseDefaultsTo}`);
          }

          this.default({ char: Quest.World.player, item: obj });
          return Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('FollowMe', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
        ],
        script(objects: any) {
          const obj      = objects[0][0];
          const tpParams = { char: Quest.World.player, npc: obj };
          if (!obj.npc) return Quest.IO.failedmsg(Quest.lang.cannot_follow, tpParams);
          if (!obj.getAgreement('Follow')) return Quest.World.world.FAILED;
          return obj.startFollow() ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('WaitHere', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
        ],
        script(objects: any) {
          const obj      = objects[0][0];
          const tpParams = { item: obj };
          if (!obj.npc) return Quest.IO.falsemsg(Quest.lang.cannot_wait, tpParams);

          return obj.endFollow() ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('AskAbout', {

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: Quest.Parser.parser.isNpcAndHere },
          { special: 'text' },
          { special: 'text' },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.canTalkTo],
        script(arr: any) {
          if (!Quest.World.player.testTalk()) return false;
          if (!arr[0][0].askabout) return Quest.IO.failedmsg(Quest.lang.cannot_ask_about, { char: Quest.World.player, item: arr[0][0], text: arr[2] });

          return arr[0][0].askabout(arr[2], arr[1]) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('TellAbout', {

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: Quest.Parser.parser.isNpcAndHere },
          { special: 'text' },
          { special: 'text' },
        ],
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.canTalkTo],
        script(arr: any) {
          if (!Quest.World.player.testTalk()) return false;
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'cannot_tell_about'.
          if (!arr[0][0].tellabout) return Quest.IO.failedmsg(cannot_tell_about, { char: Quest.World.player, item: arr[0][0], text: arr[1] });

          return arr[0][0].tellabout(arr[2], arr[1]) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

      new Quest.Command.Cmd('TalkAbout', {

        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isNpcAndHere' does not exist on type '{}... Remove this comment to see the full error message
          { scope: Quest.Parser.parser.isNpcAndHere },
          { special: 'text' },
          { special: 'text' },
        ],

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'canTalkTo' does not exist on type '{}'.
        rules: [Quest.Command.cmdRules.canTalkTo],
        // score:1, // to override TALK TO
        script(arr: any) {
          if (!Quest.World.player.testTalk()) return false;
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'cannot_tell_about'.
          if (!arr[0][0].tellabout && !arr[0][0].askabout) return Quest.IO.failedmsg(cannot_tell_about, { char: Quest.World.player, item: arr[0][0], text: arr[1] });

          return arr[0][0].talkabout(arr[2], arr[1]) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        },
      }),

    ];

    for (const s of ['In', 'Out', 'Up', 'Down', 'Through']) {
      commands.push(new Quest.Command.Cmd(`Go${s}Item`, {

        dirType: s,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
        objects: [{ attName: `go${s}Direction`, scope: Quest.Parser.parser.isHere }],
        script(objects: any) {
          if (typeof objects[0][0][`go${this.dirType}Item`] === 'string') {
            return Quest.IO.failedmsg(objects[0][0][`go${this.dirType}Item`], { char: Quest.World.player, item: objects[0][0] });
          }
          return Quest.World.currentLocation.goItem(objects[0][0], this.dirType);
        },
      }));

      commands.push(new Quest.Command.Cmd(`NpcGo${s}Item`, {
        dirType: s,
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: 'npc', scope: Quest.Parser.parser.isHere },
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{}'.
          { attName: `go${s}Direction`, scope: Quest.Parser.parser.isHere },
        ],
        script(objects: any) {
          if (typeof objects[1][0][`go${this.dirType}Item`] === 'string') {
            return Quest.IO.failedmsg(objects[1][0][`go${this.dirType}Item`], { char: objects[0][0], item: objects[1][0] });
          }
          return Quest.World.currentLocation.goItem(objects[1][0], this.dirType, objects[0][0]);
        },
      }));
    }

    // DEBUG commands

    if (Quest.Settings.settings.playMode === 'dev') {
      commands.push(new Quest.Command.Cmd('DebugWalkThrough', {
        objects: [
          { special: 'text' },
        ],
        script(objects: any) {
          if (typeof walkthroughs === 'undefined') {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg('No walkthroughs set');
            return Quest.World.world.FAILED;
          }
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const wt = walkthroughs[objects[0]];
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (wt === undefined) return Quest.IO.failedmsg(`No walkthrough found called ${objects[0]}`);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'walkthroughInProgress' does not exist on... Remove this comment to see the full error message
          Quest.Settings.settings.walkthroughInProgress = true;
          for (const el of wt) {
            if (typeof el === 'string') {
              Quest.Utilities.runCmd(el);
            } else {
              Quest.Settings.settings.walkthroughMenuResponses = Array.isArray(el.menu) ? el.menu : [el.menu];
              Quest.Utilities.runCmd(el.cmd);
              Quest.Settings.settings.walkthroughMenuResponses = [];
            }
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'walkthroughInProgress' does not exist on... Remove this comment to see the full error message
          Quest.Settings.settings.walkthroughInProgress = false;
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugInspect', {
        objects: [
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'isInWorld' does not exist on type '{}'.
          { scope: Quest.Parser.parser.isInWorld },
        ],
        script(arr: any) {
          const item = arr[0][0];
          Quest.IO.debugmsg(`See the console for details on the object ${item.name} (press F12 to Quest.World.world. the console)`);
          console.log(item);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugInspectByName', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          const item_name = arr[0];
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!Quest.World.w[item_name]) {
            Quest.IO.debugmsg(`No object called ${item_name}`);
            return Quest.World.world.FAILED;
          }

          Quest.IO.debugmsg(`See the console for details on the object ${item_name} (press F12 to Quest.World.world. the console)`);
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          console.log(Quest.World.w[item_name]);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugTest', {
        script() {
          if (!Quest.Settings.settings.tests) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg('The TEST command is for unit testing during game development, and is not activated (F12 for more).');
            console.log('To activate testing in your game, set Quest.Settings.settings.tests to true. More details here: https://github.com/ThePix/QuestJS/wiki/Unit-testing');
            return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'runTests' does not exist on type '{}'.
          if (typeof test.runTests !== 'function') {
            console.log(Quest.Utilities.test);
            return Quest.World.world.FAILED;
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'runTests' does not exist on type '{}'.
          Quest.Utilities.test.runTests();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugInspectCommand', {
        objects: [
          { special: 'text' },
        ],
        script(arr: any) {
          Quest.IO.debugmsg(`Looking for ${arr[0]}`);
          for (const cmd of commands) {
            if (cmd.name.toLowerCase() === arr[0] || (cmd.cmdCategory && cmd.cmdCategory.toLowerCase() === arr[0])) {
              Quest.IO.debugmsg(`Name: ${cmd.name}`);
              for (const key in cmd) {
                if (cmd.hasOwnProperty(key)) {
                  Quest.IO.debugmsg(`--${key}: ${cmd[key]}`);
                }
              }
            }
          }
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugListCommands', {
        objects: [
        ],
        script(arr: any) {
          let count = 0;
          for (const cmd of commands) {
            if (!cmd.name.match(/\d$/)) {
              let s = `${cmd.name} (${cmd.regex}`;

              let altCmd;
              let n = 2;
              do {
                altCmd = commands.find((el) => el.name === cmd.name + n);
                if (altCmd) s += ` or ${altCmd.regex}`;
                n++;
              } while (altCmd);
              s += ')';

              const npcCmd = commands.find((el) => el.name === `Npc${cmd.name}2`);
              if (npcCmd) s += ' - NPC too';
              Quest.IO.debugmsg(s);
              count++;
            }
          }
          Quest.IO.debugmsg(`... Found ${count} commands.`);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugListCommands2', {
        objects: [
        ],
        script(arr: any) {
          let count = 0;
          for (const cmd of commands) {
            const s = `${cmd.name} (${cmd.regex})`;
            Quest.IO.debugmsg(s);
            count++;
          }
          Quest.IO.debugmsg(`... Found ${count} commands.`);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugParserToggle', {
        objects: [
        ],
        script(arr: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
          if (Quest.Parser.parser.debug) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
            Quest.Parser.parser.debug = false;
            Quest.IO.debugmsg('Parser debugging messages are off.');
          } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'debug' does not exist on type '{}'.
            Quest.Parser.parser.debug = true;
            Quest.IO.debugmsg('Parser debugging messages are on.');
          }
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugStats', {
        objects: [
        ],
        script(arr: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
          for (const el of Quest.Settings.settings.statsData) el.count = 0;
          for (const key in w) {
            for (const el of Quest.Settings.settings.statsData) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              const res = el.test(Quest.World.w[key]);
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
              if (res === true) el.count++;
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
              if (typeof res === 'number') el.count += res;
            }
          }
          for (const el of Quest.Settings.settings.statsData) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ name: s... Remove this comment to see the full error message
            Quest.IO.debugmsg(`${el.name}: ${el.count}`);
          }
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('DebugHighlight', {
        objects: [
        ],
        script(arr: any) {
          for (const el of document.querySelectorAll('.parser')) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
            el.style.color = 'black';
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
            el.style.backgroundColor = 'yellow';
          }
          for (const el of document.querySelectorAll('.error')) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
            el.style.backgroundColor = 'yellow';
          }
          for (const el of document.querySelectorAll('.meta')) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
            el.style.color = 'black';
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
            el.style.backgroundColor = '#8f8';
          }
          Quest.IO.debugmsg('Previous parser and error messages are now highlighted.');
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));

      commands.push(new Quest.Command.Cmd('MetaTranscriptWalkthrough', {
        script() {
          Quest.SaveLoad.saveLoad.transcriptWalk();
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
      }));
    }

    // Functions used by commands
    // (but not in the commands array)

    // Cannot handle multiple vessels
    // want to transfer a fluid from a source to a sink

    function handleFillFromUnknown(char: any, sink: any, fluid: any) {
      // fluid can be undefined
      const options = { fluid };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{}'.
      if (!Quest.Utilities.util.findSource(options)) return Quest.IO.failedmsg(fluid ? Quest.lang.no_fluid_here : Quest.lang.no_fluid_here_at_all, options);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'source' does not exist on type '{ fluid:... Remove this comment to see the full error message
      if (options.source.vessel) return handleFillFromVessel(char, options.source, sink, options.fluid);
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'source' does not exist on type '{ fluid:... Remove this comment to see the full error message
      return handleFillFromSource(char, options.source, sink, options.fluid);
    }

    function handleFillFromVessel(char: any, source: any, sink: any, fluid: any) {
      // fluid can be undefined
      if (!fluid) fluid = source.containedFluidName;
      const options = {
        char, fluid, item: sink, source,
      };

      if (!source.vessel) return Quest.IO.failedmsg(Quest.lang.not_vessel, options);
      if (source.closed) return Quest.IO.failedmsg(Quest.lang.container_closed, options);
      if (!source.containedFluidName) return Quest.IO.failedmsg(Quest.lang.already_empty, options);
      if (!sink.vessel && !sink.sink) return Quest.IO.failedmsg(Quest.lang.not_sink, options);
      if (sink.vessel && sink.containedFluidName) return Quest.IO.failedmsg(Quest.lang.already_full, options);
      if (!char.testManipulate(source, 'fill')) return Quest.World.world.FAILED;
      if (!char.getAgreement('Fill', source, sink, fluid)) return Quest.World.world.FAILED;
      if (!source.isAtLoc(char.name)) return Quest.IO.failedmsg(Quest.lang.not_carrying, options);
      if (source.containedFluidName !== fluid) return Quest.IO.failedmsg(Quest.lang.no_fluid_here, options);
      return source.doEmpty(options) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
    }

    function handleFillFromSource(char: any, source: any, sink: any, fluid: any) {
      const options = {
        char, fluid, item: sink, source,
      };

      if (!source.isSourceOf) return Quest.IO.failedmsg(Quest.lang.not_source, options);
      if (source.closed) return Quest.IO.failedmsg(Quest.lang.container_closed, options);
      if (!sink.vessel) return Quest.IO.failedmsg(Quest.lang.not_vessel, options);
      if (sink.containedFluidName) return Quest.IO.failedmsg(Quest.lang.already_full, options);
      if (!char.testManipulate(sink, 'fill')) return Quest.World.world.FAILED;
      if (!char.getAgreement('Fill', source, sink, fluid)) return Quest.World.world.FAILED;
      // if the source is the room itself, we assume it is here
      if (!source.room && !source.isAtLoc(char.loc)) return Quest.IO.failedmsg(Quest.lang.not_here, options);
      if (!source.isSourceOf(fluid)) return Quest.IO.failedmsg(Quest.lang.no_fluid_here, options);
      return sink.doFill(options) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
    }

    function handleEmptyFluidInto(char: any, sink: any, fluid: any) {
      for (const key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const o = Quest.World.w[key];
        if (o.vessel && o.containedFluidName === fluid && o.loc === char.name) {
          return handleFillFromVessel(char, o, sink, fluid);
        }
      }
      return Quest.IO.failedmsg(Quest.lang.not_carrying_fluid, { char, fluid });
    }

    export function handleInOutContainer(char: any, objects: any, verb: any, func: any) {
      let success     = false;
      const container = objects[1][0];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
      const options = {
        char, container, multiple: objects[0].length > 1 || Quest.Parser.parser.currentCommand.all, verb,
      };

      if (container.handleInOutContainer) return container.handleInOutContainer(options, objects[0]);

      if (!container.container) return Quest.IO.failedmsg(Quest.lang.not_container, options);
      if (container.closed) {
        if (container.containerAutoOpen) {
          if (!container.open({ char, item: container })) return false;
        } else if (!container.containerIgnoreClosed) {
          return Quest.IO.failedmsg(Quest.lang.container_closed, options);
        }
      }

      for (const obj of objects[0]) {
        if (!char.testManipulate(obj, verb)) return Quest.World.world.FAILED;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ char: a... Remove this comment to see the full error message
        options.count = obj.countable ? obj.extractNumber() : undefined;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'item' does not exist on type '{ char: an... Remove this comment to see the full error message
        options.item = obj;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type '{ char: a... Remove this comment to see the full error message
        if (options.count) options[`${obj.name}_count`] = options.count;  // for the text processor
        const flag = func(char, container, obj, options);
        success    = success || flag;
      }
      if (success) char.pause();
      return success ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
    }

    export function handleSingleDropInContainer(char: any, container: any, obj: any, options: any) {
      options.fromLoc = char.name;
      options.toLoc   = container.name;
      if (!char.getAgreement('Drop/in', obj, container)) return;
      if (!container.testForRecursion(char, obj)) return false;
      if (obj.testDrop && !obj.testDrop(options)) return false;
      if (!obj.msgDropIn) return Quest.IO.falsemsg(Quest.lang.cannot_drop, options);
      if (container.testDropIn && !container.testDropIn(options)) return false;
      if (!obj.isAtLoc(char.name)) return Quest.IO.failedmsg(Quest.lang.not_carrying, { char, item: obj });
      if (obj.getTakeDropCount) obj.getTakeDropCount(options, char.name);

      if (typeof obj.msgDropIn === 'function') {
        obj.msgDropIn(options);
      } else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(obj.msgDropIn, options);
      }
      obj.moveToFrom(options);
      return true;
    }

    function handleSingleTakeOutContainer(char: any, container: any, obj: any, options: any) {
      options.toLoc   = char.name;
      options.fromLoc = container.name;
      if (!char.getAgreement('Take', obj)) return false;
      if (!obj.isAtLoc(container.name)) return Quest.IO.failedmsg(Quest.lang.not_inside, { container, item: obj });
      if (obj.getTakeDropCount) obj.getTakeDropCount(options, container.name);
      if (obj.testTake && !obj.testTake(options)) return false;
      if (container.testTakeOut && !container.testTakeOut(options)) return false;

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(obj.msgTakeOut, options);
      obj.moveToFrom(options);
      return true;
    }

    function handleGiveToNpc(char: any, objects: any) {
      let success = false;
      const npc   = objects[1][0];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
      const multiple = objects[0].length > 1 || Quest.Parser.parser.currentCommand.all;
      if (!npc.npc && npc !== Quest.World.player) return Quest.IO.failedmsg(Quest.lang.not_npc_for_give, { char, item: npc });
      if (!npc.handleGiveTo) log(npc);

      for (const obj of objects[0]) {
        const flag = npc.handleGiveTo({
          char, fromLoc: char.name, item: obj, multiple, npc, toLoc: npc.name,
        });
        success    = success || flag;
      }
      // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
      if (success === Quest.World.world.SUCCESS) char.pause();
      return success ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
    }

    function handleStandUp(objects: any) {
      let char;
      if (objects.length === 0) {
        char = Quest.World.player;
      } else {
        const npc = objects[0][0];
        if (!npc.npc) {
          Quest.IO.failedmsg(Quest.lang.not_npc, { char: Quest.World.player, item: npc });
          return Quest.World.world.FAILED;
        }
        if (!npc.posture) {
          Quest.IO.failedmsg(Quest.lang.already, { item: npc });
          return Quest.World.world.FAILED;
        }
        if (!npc.getAgreement('Posture', 'stand')) {
          // The getAgreement should give the response
          return Quest.World.world.FAILED;
        }
        char = npc;
      }

      if (!char.testPosture()) {
        return Quest.World.world.FAILED;
      }
      if (char.posture) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(Quest.lang.stop_posture(char));
        char.pause();
        return Quest.World.world.SUCCESS;
      }
    }

    // we know the char can manipulate, we know the obj is here and not held
    function handlePushExit(char: any, objects: any) {
      const verb = objects[0];
      const obj  = objects[1][0];
      const dir  = Quest.Utilities.getDir(objects[2]);
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const room     = Quest.World.w[char.loc];
      const tpParams = { char, dir, item: obj };

      if (!obj.shiftable && obj.takeable) return Quest.IO.failedmsg(Quest.lang.take_not_push, tpParams);
      if (!obj.shiftable) return Quest.IO.failedmsg(Quest.lang.cannot_push, tpParams);
      if (!room[dir] || room[dir].isHidden()) return Quest.IO.failedmsg(Quest.lang.not_that_way, tpParams);
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (room[dir].isLocked()) return Quest.IO.failedmsg(Quest.lang.locked_exit(char, room[dir]));
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (typeof room[dir].noShiftingMsg === 'function') return Quest.IO.failedmsg(room[dir].noShiftingMsg(char, item));
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (typeof room[dir].noShiftingMsg === 'string') return Quest.IO.failedmsg(room[dir].noShiftingMsg);
      if (!char.getAgreement('Push', obj, dir)) return false;

      if (typeof obj.shift === 'function') {
        const res = obj.shift(char, dir, verb);
        return res ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
      }

      // by default, objects cannot be pushed up
      if (dir === 'up') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(Quest.lang.cannot_push_up, tpParams);
        return Quest.World.world.FAILED;
      }

      // not using moveToFrom; if there are
      const dest = room[dir].name;
      obj.moveToFrom({ char, item: obj, toLoc: dest });
      char.loc = dest;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'dest' does not exist on type '{ char: an... Remove this comment to see the full error message
      tpParams.dest = Quest.World.w[dest];
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(Quest.lang.push_exit_successful, tpParams);
      return Quest.World.world.SUCCESS;
    }

  }
}
