"use strict";



// This is where the world exist!
const w = {};


//@DOC
// ## World Functions
//
// These are functions for creating objects in the game world
//@UNDOC


//@DOC
// Use this to create a new item (as opposed to a room).
// It adds various defaults that apply only to items.
// The first argument should be a string - a unique name for this object, composed only of letters, numbers and underscores.
// It will than take any number of dictionaries that will be combined to set the properties.
// Generally objects should not be created during play as they will not be saved properly.
// Either keep the object hodden until required or clone existing objects.
function createItem() {
  const args = Array.prototype.slice.call(arguments)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'itemCreateFunc' does not exist on type '... Remove this comment to see the full error message
  return createItemOrRoom(args, DEFAULT_ITEM, Quest.settings.itemCreateFunc)
}



//@DOC
// Use this to create a new room (as opposed to an item).
// It adds various defaults that apply only to items
// The first argument should be a string - a unique name for this object, composed only of letters, numbers and underscores.
// It will than take any number of dictionaries that will be combined to set the properties.
// Generally objects should not be created during play as they will not be saved properly.
// Either keep the object hodden until required or clone existing objects.
function createRoom() {
  const args = Array.prototype.slice.call(arguments)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'roomCreateFunc' does not exist on type '... Remove this comment to see the full error message
  const o = createItemOrRoom(args, DEFAULT_ROOM, Quest.settings.roomCreateFunc)
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  if (o.scenery) {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    for (const x of o.scenery) {
      const el = typeof x === 'string' ? {alias:x} : x 
      const alias = Array.isArray(el.alias) ? el.alias.shift() : el.alias
      const aliases = Array.isArray(el.alias) ? el.alias : []
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (!alias) throw "ERROR: Scenery item is missing an alias in room: " + o.name
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      const obj = createItem(o.name + '_scenery_' + alias.replace(/\W/g, ''), {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        loc:o.name,
        alias:alias,
        synonyms:aliases,
        scenery:true,
        examine:el.examine ? el.examine : lang.default_description,
      })
      delete el.alias
      delete el.examine
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      for (const key in el) obj[key] = el[key]
    }
  }
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  delete o.scenery
  return o
}


function createItemOrRoom(args: any, defaults: any, createFunc: any) {
  const name = args.shift()
  args.unshift(defaults)
  const o = createObject(name, args)
  if (createFunc) createFunc(o)
  return o
}



//@DOC
// Use this to create new items during play. The given item will be cloned at the given location.
// The `newName` is optional, one will be generated if not supplied. If you do supply one bear inmid that
// every clone must have a unique name.
function cloneObject(item: any, loc: any, newName: any) {
  if (item === undefined) { console.log("Item is not defined.") }
  if (typeof item === 'string') {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const o = w[item]
    if (o === undefined) { console.log("No item called '" + item + "' found in cloneObject.") }
    item = o
  }
  const clone = {};
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  for (let key in item) clone[key] = item[key];
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
  clone.name = newName === undefined ? util.findUniqueName(item.name) : newName;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'clonePrototype' does not exist on type '... Remove this comment to see the full error message
  if (!clone.clonePrototype) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clonePrototype' does not exist on type '... Remove this comment to see the full error message
    clone.clonePrototype = item;
  }
  if (loc !== undefined) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{}'.
    clone.loc = loc;
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSaveStringPreamble' does not exist on... Remove this comment to see the full error message
  clone.getSaveStringPreamble = function(item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clonePrototype' does not exist on type '... Remove this comment to see the full error message
    return "Clone:" + this.clonePrototype.name + "="
  }
  
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  w[clone.name] = clone
  return clone
}



//@DOC
// Creates a basic object. Generally it is better to use CreateItem or CreateRoom.
function createObject(name: any, listOfHashes: any) {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (world.isCreated && !Quest.settings.saveDisabled) return errormsg("Attempting to use createObject with `" + name + "` after set up. To ensure games save properly you should use cloneObject to create ites during play.")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (/\W/.test(name)) return errormsg("Attempting to use the prohibited name `" + name + "`; a name can only include letters and digits - no spaces or accented characters. Use the 'alias' attribute to give an item a name with other characters.")
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (w[name]) return errormsg("Attempting to use the name `" + name + "` when there is already an item with that name in the world.")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (typeof listOfHashes.unshift !== 'function') return errormsg("The list of hashes for `" + name + "` is not what I was expecting. Maybe you meant to use createItem or createRoom?")

  // put the default attributes on the lift
  listOfHashes.unshift(DEFAULT_OBJECT)
  
  const item = { name:name }
  
  for (let hash of listOfHashes) {
    for (let key in hash) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      item[key] = hash[key]
    }
  }

  // Give every object an alias and list alias (used in the inventories)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'setAlias' does not exist on type '{ name... Remove this comment to see the full error message
  item.setAlias(item.alias ? item.alias : item.name.replace(/_/g, " "), item)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbFunctions' does not exist on type '{... Remove this comment to see the full error message
  item.verbFunctions = [function(o: any, verbList: any) {
    verbList.push(lang.verbs.examine)
    if (o.use !== undefined) verbList.push(lang.verbs.use)
  }]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'nameModifierFunctions' does not exist on... Remove this comment to see the full error message
  item.nameModifierFunctions = []
  for (let hash of listOfHashes) {
    if (hash.afterCreation) hash.afterCreation(item)
  }

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  w[name] = item;
  return item;
}





let player: any, currentLocation: any







/*
This can be considered a stateless controller for the game world.
It is stateless because nothing here will be saved - use `game` for that.
It handles initialising, turn taking, room entering
*/
const world = {
  //VISIBLE:1,
  //REACHABLE:2,

  // constants for lighting levels
  LIGHT_NONE:0,
  LIGHT_SELF:1,
  LIGHT_MEAGRE:2,
  LIGHT_FULL:3,
  LIGHT_EXTREME:4,

  // constants for verbosity of room descriptions
  BRIEF:1,
  TERSE:2,
  VERBOSE:3,
  
  // constants for isAtLoc situations
  LOOK:1,
  PARSER:2,
  INVENTORY:3,
  SIDE_PANE:4,
  PURCHASE:5,
  ALL:6,
  
  // constants for command responses
  // (but a verb will return true or false, so the command that uses it
  // can in turn return one of these - a verb is an attribute of an object)
  SUCCESS:1,                             
  SUCCESS_NO_TURNSCRIPTS:2,
  FAILED:-1,
  PARSER_FAILURE:-2,

  isCreated:false,
  



  
  //------------------------------------------------------------
  // Initialisation

  init:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.settings.performanceLog('Start world.init')
    // Initialise the player
    for (let key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (w[key].player) { player = w[key]; }
    }
    if (!player) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      errormsg("No player object found. This is probably due to an error in the data file where the player object is defined, but could be because you have not set one.");
      return;
    }

    // Initialise all object
    for (let key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      world.initItem(w[key])
    }
    
    // Initialise commands
    initCommands()
    
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbosity' does not exist on type '{ per... Remove this comment to see the full error message
    Quest.settings.verbosity = world.VERBOSE

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ticker' does not exist on type '{ turnCo... Remove this comment to see the full error message
    game.ticker = setInterval(world.gameTimer, Quest.settings.timerInterval);

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    w[player.loc].visited++
    world.update()
    world.saveGameState()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.settings.performanceLog('End world.init')
    world.isCreated = true
  },

  // Every item or room should have this called for them.
  // That will be done at the start, but you need to do it yourself 
  // if creating items on the fly (but you should not be doing that anyway!).
  initItem:function(item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (Quest.settings.playMode === 'dev' && item.loc && !w[item.loc]) {
      console.log("ERROR: The item `" + item.name + "` is in an unknown location (" + item.loc + ")");
    }
    
    if (item._setup) item._setup()
    if (item.setup) item.setup()
    for (let exit of lang.exit_list) {
      const ex = item[exit.name];
      if (ex) {
        ex.origin = item;
        ex.dir = exit.name;
        if (ex.alsoDir) {
          for (let dir of ex.alsoDir) {
            // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
            item[dir] = new Exit(ex.name, ex);
            item[dir].scenery = true
            item[dir].isAlsoDir = true
            item[dir].dir = dir
            delete item[dir].alsoDir
          }
        }
      }
    }
    
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (Quest.settings.playMode === 'dev' && item.consultable && !Quest.settings.noAskTell) {
      if (!item.tellOptions || item.tellOptions.length === 0) log("WARNING: No tellOptions " + item.name)
      if (!item.askOptions || item.askOptions.length === 0) log("WARNING: No askOptions " + item.name)
    }
    
    if (item.convTopics) {
      item.convTopics.forEach(function (value: any, i: any) {
        value.loc = item.name
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
        createItem(value.name ? value.name : item.name + '_convTopic_' + i, TOPIC(), value)
      })
      delete item.convTopics
    }
    
    if (item.roomSet) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!Quest.settings.roomSetList[item.roomSet]) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        Quest.settings.roomSetList[item.roomSet] = []
      }
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.settings.roomSetList[item.roomSet].push({name:item.name, visited:false})
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
    if (Quest.settings.playMode === 'dev') {
      const dirs = lang.exit_list.filter(el => el.type !== 'nocmd').map(el => el.name)
      //console.log(dirs)
      for (let key in item) {
        if (dirs.includes(key)) {
          // @ts-expect-error ts-migrate(2358) FIXME: The left-hand side of an 'instanceof' expression m... Remove this comment to see the full error message
          if (!item[key] instanceof Exit) console.log("ERROR: Exit " + key + " of " + item.name + " is not an Exit instance.")
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (item[key].name !== '_' && !w[item[key].name]) console.log("ERROR: Exit " + key + " of " + item.name + " goes to an unknown location (" + item[key].name + ").")
        }
        else {
          if (item[key] instanceof Exit) console.log("ERROR: Attribute " + key + " of " + item.name + " is an Exit instance and probably should not.")
        }
      }
    }
  },


  // Start the game - could be called after the start up dialog, so not part of init
  begin:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.settings.performanceLog('Start begin')
    if (Quest.settings.startingDialogEnabled) return
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
    if (typeof Quest.settings.intro === "string") {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(Quest.settings.intro)
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
    else if (Quest.settings.intro) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'intro' does not exist on type '{ perform... Remove this comment to see the full error message
      for (let el of Quest.settings.intro) msg(el)
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
    if (typeof Quest.settings.setup === "function") Quest.settings.setup()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    world.enterRoom()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.settings.performanceLog('End begin')
  },




  //------------------------------------------------------------
  // Turn taking

  // Call after the player takes a turn, sending it a result, SUCCESS, SUCCESS_NO_TURNSCRIPTS or FAILED
  endTurn:function(result: any) {
    if (result === true) log("That command returned 'true', rather than the proper result code.");
    if (result === false) log("That command returned 'false', rather than the proper result code.");
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleChangeListeners' does not exist on... Remove this comment to see the full error message
    util.handleChangeListeners()
    if (result === world.SUCCESS || (Quest.settings.failCountsAsTurn && result === world.FAILED)) {
      game.turnCount++
      game.elapsedTime += Quest.settings.dateTime.secondsPerTurn;
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      for (let key in w) w[key].endTurn()
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleChangeListeners' does not exist on... Remove this comment to see the full error message
      util.handleChangeListeners()
      // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
      for (const el of Quest.settings.afterTurn) el(true)
      world.resetPauses();
      world.update();
      world.saveGameState();
      endTurnUI(true);
    }
    else {
      // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
      for (const el of Quest.settings.afterTurn) el(false)
      endTurnUI(false);
    }
  },


  // Updates the game world, specifically...
  // Sets the scoping snapshot
  // Sets the light/dark
  update:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!player) return errormsg("No player object found. This will not go well...")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (player.loc === player.name) return errormsg("The location assigned to the player is the player itself.")
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!player.loc || !w[player.loc]) {
      if (world.isCreated) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return errormsg((player.loc === undefined ? "No player location set." : "Player location set to '" + player.loc + "', which does not exist.") + " Has the player just moved? This is likely to be because of an error in the exit being used.")
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return errormsg((player.loc === undefined ? "No player location set." : "Player location set to '" + player.loc + "', which does not exist.") + " This is may be because of an error in one of the .js files; the browser has hit the error and stopped at that point, before getting to where the player is set. Is there another error above this one? If so, that i the real problem.")
      }
    }
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    currentLocation = w[player.loc]
    
    world.scopeSnapshot()
  },




  resetPauses:function() {
    for (let key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (w[key].paused){
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        w[key].paused = false
      }
    }
  },

  // Returns true if bad lighting is not obscuring the item
  ifNotDark:function(item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    return (!game.dark || item.lightSource() > world.LIGHT_NONE);
  },

  // scopeStatus is used to track what the player can see and reach; it is a lot faster than working 
  // it out each time, as the scope needs to be checked several times every turn.
  scopeSnapshot:function() {
    // reset every object
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    for (let key in w) w[key].scopeStatus = {}
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scope' does not exist on type '{ LIGHT_N... Remove this comment to see the full error message
    world.scope = []

    world.takeScopeSnapshot("See")
    world.takeScopeSnapshot("Reach")

    let light = world.LIGHT_NONE
    for (let key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (w[key].scopeStatus) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (light < w[key].lightSource()) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          light = w[key].lightSource()
        }
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    game.dark = (light < world.LIGHT_MEAGRE)
  },
  
  
  // mode is either "Reach" or "See"
  takeScopeSnapshot:function(mode: any) {
    // start from the current room
    let room = currentLocation
    room.scopeStatus['room' + mode] = true
    // crawl up the room hierarchy to the topmost reachable/visible
    while (room.loc && room['can' + mode + 'ThroughThis']()) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      room = w[room.loc]
      room.scopeStatus['room' + mode] = true
    }
    // room is now the top level applicable, so now work downwards from here (recursively)
    room.scopeSnapshot(mode)
  },
  


  //------------------------------------------------------------
  // Entering a new room

  // Runs the script and gives the description
  enterRoom:function(exit: any) {
    if (currentLocation.beforeEnter === undefined) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return errormsg("This room, " + currentLocation.name + ", has no 'beforeEnter` function defined.  This is probably because it is not actually a room (it was not created with 'createRoom' and has not got the DEFAULT_ROOM template), but is an item. It is not clear what state the game will continue in.")
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.settings.beforeEnter(exit)
    if (currentLocation.visited === 0) {
      if (currentLocation.roomSet) {
        currentLocation.roomSetOrder = 1
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        for (const el of Quest.settings.roomSetList[currentLocation.roomSet]) {
          if (el.visited) currentLocation.roomSetOrder++
          if (el.name === currentLocation.name) el.visited = true
        }
      }
      currentLocation.beforeFirstEnter(exit)
    }
    currentLocation.beforeEnter(exit)
    world.enterRoomAfterScripts(exit);
  },

  // Called when entering a new room, after beforeEnter and beforeFirstEnter re done
  enterRoomAfterScripts:function(exit: any) {
    currentLocation.description()
    player.handleMovingFollowers(exit) 
    currentLocation.visited++
    currentLocation.afterEnter(exit)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
    Quest.settings.afterEnter(exit)
    if (currentLocation.visited === 1) { currentLocation.afterFirstEnter(exit) }
    for (let key in currentLocation.afterEnterIf) {
      // if already done, skip
      if (currentLocation.afterEnterIfFlags.split(" ").includes(key)) continue;
      if (currentLocation.afterEnterIf[key].test()) {
        currentLocation.afterEnterIf[key].action()
        currentLocation.afterEnterIfFlags += " " + key
      }
    }
  },
  
  

  //------------------------------------------------------------
  // Real time event handling
  gameTimer:function() {
    // Note that this gets added to window by setInterval, so 'this' does not refer to the game object
    game.elapsedRealTime++;
    let somethingHappened = false
    for (let i = 0; i < game.timerEventNames.length; i++) {
      if (game.timerEventTriggerTimes[i] && game.timerEventTriggerTimes[i] < game.elapsedRealTime) {
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        const flag = Quest.settings.eventFunctions[game.timerEventNames[i]]()
        if (game.timerEventIntervals[i] !== -1 && !flag) {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
          game.timerEventTriggerTimes[i] += game.timerEventIntervals[i]
        }
        else {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
          game.timerEventTriggerTimes[i] = 0
        }
        somethingHappened = true
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleChangeListeners' does not exist on... Remove this comment to see the full error message
    if (somethingHappened) util.handleChangeListeners()
  },


  //------------------------------------------------------------
  // UNDO Support
  gameState:[],
  saveGameState:function() {
    if (Quest.settings.maxUndo > 0) {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      world.gameState.push(saveLoad.getSaveBody());
      if (world.gameState.length > Quest.settings.maxUndo) world.gameState.shift();
    }
  },

}





const game = {
  turnCount:0,
  elapsedTime:0,
  elapsedRealTime:0,
  startTime:Quest.settings.dateTime.start,
  name:'built-in_game_object',
  
  timerEventNames:[],
  timerEventTriggerTimes:[],
  timerEventIntervals:[],

  getSaveString:function() {
    let s = "GameState="
    for (const key in this) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this.saveLoadExclude(key)) s += saveLoad.encode(key, this[key])
    }
    return s
  },
  setLoadString:function(s: any) {
    const parts = s.split("=")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (parts.length !== 2) return errormsg("Bad format in saved data (" + s + ")")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (parts[0] !== "GameState") return errormsg("Expected GameState to be second")
    saveLoad.setFromArray(this, parts[1].split(";"));
  },
  // @ts-expect-error ts-migrate(7023) FIXME: 'saveLoadExclude' implicitly has return type 'any'... Remove this comment to see the full error message
  saveLoadExclude:function(att: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return (att === 'player' || typeof this[att] === 'function' || typeof this[att] === 'object')
  },
}






function Exit(this: any, name: any, hash: any) {
  if (!hash) hash = {}
  this.name = name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultExitUse' does not exist on type '... Remove this comment to see the full error message
  this.use = util.defaultExitUse
  this.getExitObject = function() { return lang.exit_list.find(el => el.name === this.dir ) }
  this.nice = function() {
    const dirObj = this.getExitObject()
    return dirObj.niceDir ? dirObj.niceDir : dirObj.name
  }
  this.reverseNice = function() {
    const dirObj = this.reverseObject()
    return dirObj.niceDir ? dirObj.niceDir : dirObj.name
  }
  this.reverse = function() { return this.getExitObject().opp }
  this.reverseObject = function() {
    const dir = this.getExitObject().opp
    return lang.exit_list.find(el => el.name === dir)
  }
  this.guardedBy = []  // this is a list of names of NPCs that may be guarding the exit
  this.isGuarded = function() {
    const guards = []
    //log(this)
    for (const s of this.guardedBy) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const guard = w[s]
      if (guard.isGuarding && guard.isGuarding(this)) guards.push(guard)
    }
    this.guardedBy = guards.map(el => el.name)
    return guards
  }
  this.isLocked = function() { return this.origin.isExitLocked(this.dir); }
  this.setLock = function(locked: any) { return this.origin.setExitLock(this.dir, locked); }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
  this.isHidden = function() { return this.origin.isExitHidden(this.dir) || game.dark; }
  this.setHide = function(hidden: any) { return this.origin.setExitHide(this.dir, hidden); }
  for (let key in hash) {
    if (key !== 'name') this[key] = hash[key];
  }
}




