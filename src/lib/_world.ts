import { IGame, IPlayer, IWorld, IWorldClass } from '../types/iquest';
import { Quest } from '../types/quest';
import { initCommands } from './command/util';

// This is where the world exist!
export const w: IWorld = {};

// @DOC
// ## World Functions
//
// These are functions for creating objects in the game world
// @UNDOC

// @DOC
// Use this to create a new item (as opposed to a room).
// It adds various defaults that apply only to items.
// The first argument should be a string - a unique name for this object, composed only of letters, numbers and underscores.
// It will than take any number of dictionaries that will be combined to set the properties.
// Generally objects should not be created during play as they will not be saved properly.
// Either keep the object hodden until required or clone existing objects.
export function createItem(...params: any[]) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'itemCreateFunc' does not exist on type '... Remove this comment to see the full error message
  return createItemOrRoom(
    params,
    Quest.Defaults.DEFAULT_ITEM,
    Quest.Settings.settings.itemCreateFunc,
  );
}

// @DOC
// Use this to create a new room (as opposed to an item).
// It adds various defaults that apply only to items
// The first argument should be a string - a unique name for this object, composed only of letters, numbers and underscores.
// It will than take any number of dictionaries that will be combined to set the properties.
// Generally objects should not be created during play as they will not be saved properly.
// Either keep the object hodden until required or clone existing objects.
export function createRoom(...params: any[]) {
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'roomCreateFunc' does not exist on type '... Remove this comment to see the full error message
  const o = createItemOrRoom(
    params,
    Quest.Defaults.DEFAULT_ROOM,
    Quest.Settings.settings.roomCreateFunc,
  );
  // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  if (o.scenery) {
    // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    for (const x of o.scenery) {
      const el = typeof x === 'string' ? { alias: x } : x;
      const alias = Array.isArray(el.alias) ? el.alias.shift() : el.alias;
      const aliases = Array.isArray(el.alias) ? el.alias : [];
      // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (!alias)
        throw `ERROR: Scenery item is missing an alias in room: ${o.name}`;
      // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      const obj = createItem(`${o.name}_scenery_${alias.replace(/\W/g, '')}`, {
        alias,

        examine: el.examine ? el.examine : Quest.lang.default_description,
        // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        loc: o.name,
        scenery: true,
        synonyms: aliases,
      });
      delete el.alias;
      delete el.examine;
      // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      for (const key in el) obj[key] = el[key];
    }
  }
  // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  delete o.scenery;
  return o;
}

function createItemOrRoom(args: any, defaults: any, createFunc: any) {
  const name = args.shift();
  args.unshift(defaults);
  const o = createObject(name, args);
  if (createFunc) createFunc(o);
  return o;
}

// @DOC
// Use this to create new items during play. The given item will be cloned at the given location.
// The `newName` is optional, one will be generated if not supplied. If you do supply one bear inmid that
// every clone must have a unique name.
export function cloneObject(item: any, loc: any, newName: any) {
  if (item === undefined) {
    ('Item is not defined.');
  }
  if (typeof item === 'string') {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const o = w[item];
    if (o === undefined) {
      `No item called '${item}' found in cloneObject.`;
    }
    item = o;
  }
  const clone = {};
  // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  for (const key in item) clone[key] = item[key];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
  clone.name =
    newName === undefined
      ? Quest.Utilities.util.findUniqueName(item.name)
      : newName;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'clonePrototype' does not exist on type '... Remove this comment to see the full error message
  if (!clone.clonePrototype) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'clonePrototype' does not exist on type '... Remove this comment to see the full error message
    clone.clonePrototype = item;
  }
  if (loc !== undefined) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{}'.
    clone.loc = loc;
  }

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getSaveStringPreamble' does not exist on... Remove this comment to see the full error message
  clone.getSaveStringPreamble = function (item: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'clonePrototype' does not exist on type '... Remove this comment to see the full error message
    return `Clone:${this.clonePrototype.name}=`;
  };

  // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  w[clone.name] = clone;
  return clone;
}

// @DOC
// Creates a basic object. Generally it is better to use CreateItem or CreateRoom.
function createObject(name: any, listOfHashes: any) {
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (world.isCreated && !Quest.Settings.settings.saveDisabled)
    return Quest.IO.errormsg(
      `Attempting to use createObject with \`${name}\` after set up. To ensure games save properly you should use cloneObject to create ites during play.`,
    );
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (/\W/.test(name))
    return Quest.IO.errormsg(
      `Attempting to use the prohibited name \`${name}\`; a name can only include letters and digits - no Quest.Utilities.spaces or accented characters. Use the 'alias' attribute to give an item a name with other characters.`,
    );
  // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (w[name])
    return Quest.IO.errormsg(
      `Attempting to use the name \`${name}\` when there is already an item with that name in the world.`,
    );
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (typeof listOfHashes.unshift !== 'function')
    return Quest.IO.errormsg(
      `The list of hashes for \`${name}\` is not what I was expecting. Maybe you meant to use createItem or createRoom?`,
    );

  // put the default attributes on the lift
  listOfHashes.unshift(Quest.Defaults.DEFAULT_OBJECT);

  const item = { name };

  for (const hash of listOfHashes) {
    for (const key in hash) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      item[key] = hash[key];
    }
  }

  // Give every object an alias and list alias (used in the inventories)
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'setAlias' does not exist on type '{ name... Remove this comment to see the full error message
  item.setAlias(item.alias ? item.alias : item.name.replace(/_/g, ' '), item);

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'verbFunctions' does not exist on type '{... Remove this comment to see the full error message
  item.verbFunctions = [
    function (o: any, verbList: any) {
      verbList.push(Quest.lang.verbs.examine);
      if (o.use !== undefined) verbList.push(Quest.lang.verbs.use);
    },
  ];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'nameModifierFunctions' does not exist on... Remove this comment to see the full error message
  item.nameModifierFunctions = [];
  for (const hash of listOfHashes) {
    if (hash.afterCreation) hash.afterCreation(item);
  }

  w[name] = item;
  return item;
}

export const player: IPlayer = {
  ready: false,
};
export const currentLocation: any = {};

/*
This can be considered a stateless controller for the game world.
It is stateless because nothing here will be saved - use `game` for that.
It handles initialising, turn taking, room entering
*/
export const world: IWorldClass = {
  ALL: 6,

  // constants for verbosity of room descriptions
  BRIEF: 1,

  FAILED: -1,

  INVENTORY: 3,

  LIGHT_EXTREME: 4,

  LIGHT_FULL: 3,

  LIGHT_MEAGRE: 2,

  // VISIBLE:1,
  // REACHABLE:2,
  // constants for lighting levels
  LIGHT_NONE: 0,

  LIGHT_SELF: 1,
  // constants for isAtLoc situations
  LOOK: 1,
  PARSER: 2,
  PARSER_FAILURE: -2,
  PURCHASE: 5,
  SIDE_PANE: 4,

  // constants for command responses
  // (but a verb will return true or false, so the command that uses it
  // can in turn return one of these - a verb is an attribute of an object)
  SUCCESS: 1,

  SUCCESS_NO_TURNSCRIPTS: 2,

  TERSE: 2,
  VERBOSE: 3,

  // Start the game - could be called after the start up dialog, so not part of init
  begin() {
    Quest.Settings.settings.performanceLog('Start begin');
    if (Quest.Settings.settings.startingDialogEnabled) return;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
    if (typeof Quest.Settings.settings.intro === 'string') {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(Quest.Settings.settings.intro);
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
    else if (Quest.Settings.settings.intro) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
      for (const el of Quest.Settings.settings.intro) Quest.IO.msg(el);
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
    if (typeof Quest.Settings.settings.setup === 'function')
      Quest.Settings.settings.setup();
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    world.enterRoom();
    Quest.Settings.settings.performanceLog('End begin');
  },

  //------------------------------------------------------------
  // Turn taking
  // Call after the player takes a turn, sending it a result, SUCCESS, SUCCESS_NO_TURNSCRIPTS or FAILED
  endTurn(result: any) {
    if (result === true)
      "That command returned 'true', rather than the proper result code.";
    if (result === false)
      "That command returned 'false', rather than the proper result code.";
    Quest.Utilities.util.handleChangeListeners();
    if (
      result === world.SUCCESS ||
      (Quest.Settings.settings.failCountsAsTurn && result === world.FAILED)
    ) {
      game.turnCount++;
      game.elapsedTime += Quest.Settings.settings.dateTime.secondsPerTurn;
      for (const key in w) w[key].endTurn();
      Quest.Utilities.util.handleChangeListeners();
      for (const el of Quest.Settings.settings.afterTurn) el(true);
      world.resetPauses();
      world.update();
      world.saveGameState();
      Quest.IO.endTurnUI(true);
    } else {
      for (const el of Quest.Settings.settings.afterTurn) el(false);
      Quest.IO.endTurnUI(false);
    }
  },

  //------------------------------------------------------------
  // Entering a new room
  // Runs the script and gives the description
  enterRoom(exit: any) {
    if (currentLocation.beforeEnter === undefined) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return Quest.IO.errormsg(
        `This room, ${currentLocation.name}, has no 'beforeEnter\` function defined.  This is probably because it is not actually a room (it was not created with 'createRoom' and has not got the Quest.Defaults.DEFAULT_ROOM template), but is an item. It is not clear what state the game will continue in.`,
      );
    }
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.Settings.settings.beforeEnter(exit);
    if (currentLocation.visited === 0) {
      if (currentLocation.roomSet) {
        currentLocation.roomSetOrder = 1;
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        for (const el of Quest.Settings.settings.roomSetList[
          currentLocation.roomSet
        ]) {
          if (el.visited) currentLocation.roomSetOrder++;
          if (el.name === currentLocation.name) el.visited = true;
        }
      }
      currentLocation.beforeFirstEnter(exit);
    }
    currentLocation.beforeEnter(exit);
    world.enterRoomAfterScripts(exit);
  },

  // Called when entering a new room, after beforeEnter and beforeFirstEnter re done
  enterRoomAfterScripts(exit: any) {
    currentLocation.description();
    player.handleMovingFollowers(exit);
    currentLocation.visited++;
    currentLocation.afterEnter(exit);
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.Settings.settings.afterEnter(exit);
    if (currentLocation.visited === 1) {
      currentLocation.afterFirstEnter(exit);
    }
    for (const key in currentLocation.afterEnterIf) {
      // if already done, skip
      if (currentLocation.afterEnterIfFlags.split(' ').includes(key)) continue;
      if (currentLocation.afterEnterIf[key].test()) {
        currentLocation.afterEnterIf[key].action();
        currentLocation.afterEnterIfFlags += ` ${key}`;
      }
    }
  },

  //------------------------------------------------------------
  // UNDO Support
  gameState: [],

  //------------------------------------------------------------
  // Real time event handling
  gameTimer() {
    // Note that this gets added to window by setInterval, so 'this' does not refer to the game object
    game.elapsedRealTime++;
    let somethingHappened = false;
    for (let i = 0; i < game.timerEventNames.length; i++) {
      if (
        game.timerEventTriggerTimes[i] &&
        game.timerEventTriggerTimes[i] < game.elapsedRealTime
      ) {
        // ts-error-fixed ts-migrate(2349) FIXME: This expression is not callable.
        const flag =
          Quest.Settings.settings.eventFunctions[game.timerEventNames[i]]();
        if (game.timerEventIntervals[i] !== -1 && !flag) {
          // ts-error-fixed ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
          game.timerEventTriggerTimes[i] += game.timerEventIntervals[i];
        } else {
          // ts-error-fixed ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
          game.timerEventTriggerTimes[i] = 0;
        }
        somethingHappened = true;
      }
    }
    if (somethingHappened) Quest.Utilities.util.handleChangeListeners();
  },

  // Returns true if bad lighting is not obscuring the item
  ifNotDark(item: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    return !game.dark || item.lightSource() > world.LIGHT_NONE;
  },

  //------------------------------------------------------------
  // Initialisation
  init() {
    Quest.Settings.settings.performanceLog('Start world.init');
    // Initialise the player
    for (const key in w) {
      if (w[key].player) {
        Object.assign(player, w[key]);
        player.ready = true;
      }
    }
    if (player.ready !== true) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      Quest.IO.errormsg(
        'No player object found. This is probably due to an error in the data file where the player object is defined, but could be because you have not set one.',
      );
      return;
    }

    // Initialise all object
    for (const key in w) {
      world.initItem(w[key]);
    }

    // Initialise commands
    initCommands();

    Quest.Settings.settings.verbosity = world.VERBOSE;

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'ticker' does not exist on type '{ turnCo... Remove this comment to see the full error message
    game.ticker = setInterval(
      world.gameTimer,
      Quest.Settings.settings.timerInterval,
    );

    w[player.loc].visited++;
    world.update();
    world.saveGameState();
    Quest.Settings.settings.performanceLog('End world.init');
    world.isCreated = true;
  },

  // Every item or room should have this called for them.
  // That will be done at the start, but you need to do it yourself
  // if creating items on the fly (but you should not be doing that anyway!).
  initItem(item: any) {
    if (
      Quest.Settings.settings.playMode === 'dev' &&
      item.loc &&
      !w[item.loc]
    ) {
      `ERROR: The item \`${item.name}\` is in an unknown location (${item.loc})`;
    }

    if (item._setup) item._setup();
    if (item.setup) item.setup();
    for (const exit of Quest.lang.exit_list) {
      const ex = item[exit.name];
      if (ex) {
        ex.origin = item;
        ex.dir = exit.name;
        if (ex.alsoDir) {
          for (const dir of ex.alsoDir) {
            // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
            item[dir] = new Exit(ex.name, ex);
            item[dir].scenery = true;
            item[dir].isAlsoDir = true;
            item[dir].dir = dir;
            delete item[dir].alsoDir;
          }
        }
      }
    }

    if (
      Quest.Settings.settings.playMode === 'dev' &&
      item.consultable &&
      !Quest.Settings.settings.noAskTell
    ) {
      if (!item.tellOptions || item.tellOptions.length === 0)
        log(`WARNING: No tellOptions ${item.name}`);
      if (!item.askOptions || item.askOptions.length === 0)
        log(`WARNING: No askOptions ${item.name}`);
    }

    if (item.convTopics) {
      item.convTopics.forEach((value: any, i: any) => {
        value.loc = item.name;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
        createItem(
          value.name ? value.name : `${item.name}_convTopic_${i}`,
          Quest.NPC.TOPIC(),
          value,
        );
      });
      delete item.convTopics;
    }

    if (item.roomSet) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!Quest.Settings.settings.roomSetList[item.roomSet]) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        Quest.Settings.settings.roomSetList[item.roomSet] = [];
      }
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.Settings.settings.roomSetList[item.roomSet].push({
        name: item.name,
        visited: false,
      });
    }

    if (Quest.Settings.settings.playMode === 'dev') {
      const dirs = Quest.lang.exit_list
        .filter((el) => el.type !== 'nocmd')
        .map((el) => el.name);
      // (dirs)
      for (const key in item) {
        if (dirs.includes(key)) {
          if (!(item[key] instanceof Exit))
            `ERROR: Exit ${key} of ${item.name} is not an Exit instance.`;
          if (item[key].name !== '_' && !w[item[key].name])
            `ERROR: Exit ${key} of ${item.name} goes to an unknown location (${item[key].name}).`;
        } else if (item[key] instanceof Exit)
          `ERROR: Attribute ${key} of ${item.name} is an Exit instance and probably should not.`;
      }
    }
  },

  isCreated: false,

  resetPauses() {
    for (const key in w) {
      if (w[key].paused) {
        w[key].paused = false;
      }
    }
  },

  saveGameState() {
    if (Quest.Settings.settings.maxUndo > 0) {
      // ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      world.gameState.push(Quest.SaveLoad.saveLoad.getSaveBody());
      if (world.gameState.length > Quest.Settings.settings.maxUndo)
        world.gameState.shift();
    }
  },

  // scopeStatus is used to track what the player can see and reach; it is a lot faster than working
  // it out each time, as the scope needs to be checked several times every turn.
  scopeSnapshot() {
    // reset every object
    for (const key in w) w[key].scopeStatus = {};
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
    world.scope = [];

    world.takeScopeSnapshot('See');
    world.takeScopeSnapshot('Reach');

    let light = world.LIGHT_NONE;
    for (const key in w) {
      if (w[key].scopeStatus) {
        if (light < w[key].lightSource()) {
          light = w[key].lightSource();
        }
      }
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    game.dark = light < world.LIGHT_MEAGRE;
  },

  // mode is either "Reach" or "See"
  takeScopeSnapshot(mode: any) {
    // start from the current room
    let room = currentLocation;
    room.scopeStatus = room.scopeStatus || {};
    room.scopeStatus[`room${mode}`] = true;
    // crawl up the room hierarchy to the topmost reachable/visible
    while (room.loc && room[`can${mode}ThroughThis`]()) {
      room = w[room.loc];
      room.scopeStatus[`room${mode}`] = true;
    }
    // room is now the top level applicable, so now work downwards from here (recursively)
    room.scopeSnapshot(mode);
  },

  // Updates the game world, specifically...
  // Sets the scoping snapshot
  // Sets the light/dark
  update() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!player)
      return Quest.IO.errormsg(
        'No player object found. This will not go well...',
      );
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (player.loc === player.name)
      return Quest.IO.errormsg(
        'The location assigned to the player is the player itself.',
      );
    if (!player.loc || !w[player.loc]) {
      if (world.isCreated) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.errormsg(
          `${
            player.loc === undefined
              ? 'No player location set.'
              : `Player location set to '${player.loc}', which does not exist.`
          } Has the player just moved? This is likely to be because of an error in the exit being used.`,
        );
      }

      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return Quest.IO.errormsg(
        `${
          player.loc === undefined
            ? 'No player location set.'
            : `Player location set to '${player.loc}', which does not exist.`
        } This is may be because of an error in one of the .js files; the browser has hit the error and stopped at that point, before getting to where the player is set. Is there another error above this one? If so, that i the real problem.`,
      );
    }
    Object.assign(currentLocation, w[player.loc]);
    world.scopeSnapshot();
  },
};

export const game: IGame = {
  elapsedRealTime: 0,
  elapsedTime: 0,
  getSaveString() {
    let s = 'GameState=';
    for (const key in this) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this.saveLoadExclude(key))
        s += Quest.SaveLoad.saveLoad.encode(key, this[key]);
    }
    return s;
  },
  name: 'built-in_game_object',
  // ts-error-fixed ts-migrate(7023) FIXME: 'saveLoadExclude' implicitly has return type 'any'... Remove this comment to see the full error message
  saveLoadExclude(att: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return (
      att === 'player' ||
      typeof this[att] === 'function' ||
      typeof this[att] === 'object'
    );
  },

  setLoadString(s: any) {
    const parts = s.split('=');
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (parts.length !== 2)
      return Quest.IO.errormsg(`Bad format in saved data (${s})`);
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (parts[0] !== 'GameState')
      return Quest.IO.errormsg('Expected GameState to be second');
    Quest.SaveLoad.saveLoad.setFromArray(this, parts[1].split(';'));
  },

  startTime: Quest.Settings.settings.dateTime.start,

  timerEventIntervals: [],

  timerEventNames: [],

  timerEventTriggerTimes: [],

  turnCount: 0,
};

export function Exit(this: any, name: any, hash: any) {
  if (!hash) hash = {};
  this.name = name;
  this.use = Quest.Utilities.util.defaultExitUse;
  this.getExitObject = function () {
    return Quest.lang.exit_list.find((el) => el.name === this.dir);
  };
  this.nice = function () {
    const dirObj = this.getExitObject();
    return dirObj.niceDir ? dirObj.niceDir : dirObj.name;
  };
  this.reverseNice = function () {
    const dirObj = this.reverseObject();
    return dirObj.niceDir ? dirObj.niceDir : dirObj.name;
  };
  this.reverse = function () {
    return this.getExitObject().opp;
  };
  this.reverseObject = function () {
    const dir = this.getExitObject().opp;
    return Quest.lang.exit_list.find((el) => el.name === dir);
  };
  this.guardedBy = []; // this is a list of names of NPCs that may be guarding the exit
  this.isGuarded = function () {
    const guards = [];
    // log(this)
    for (const s of this.guardedBy) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const guard = w[s];
      if (guard.isGuarding && guard.isGuarding(this)) guards.push(guard);
    }
    this.guardedBy = guards.map((el) => el.name);
    return guards;
  };
  this.isLocked = function () {
    return this.origin.isExitLocked(this.dir);
  };
  this.setLock = function (locked: any) {
    return this.origin.setExitLock(this.dir, locked);
  };
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
  this.isHidden = function () {
    return this.origin.isExitHidden(this.dir) || game.dark;
  };
  this.setHide = function (hidden: any) {
    return this.origin.setExitHide(this.dir, hidden);
  };
  for (const key in hash) {
    if (key !== 'name') this[key] = hash[key];
  }
}

export const World: IWorld = {
  Exit,
  cloneObject,
  createItem,
  createItemOrRoom,
  createObject,
  createRoom,
  currentLocation,
  game,
  player,
  w,
  world,
};

Quest.World = World;
