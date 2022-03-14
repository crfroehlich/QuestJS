"use strict";

// Should all be language neutral



const DEFAULT_OBJECT = {
  pronouns: lang.pronouns.thirdperson,

  // @ts-expect-error ts-migrate(7023) FIXME: 'isLocatedAt' implicitly has return type 'any' bec... Remove this comment to see the full error message
  isLocatedAt: function (loc: any) { return loc === this.loc },

  isApparentTo: function (situation: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultIsApparentTo' does not exist on t... Remove this comment to see the full error message
    if (Quest.settings.defaultIsApparentTo) return Quest.settings.defaultIsApparentTo(situation)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ prono... Remove this comment to see the full error message
    if (situation === world.LOOK && this.scenery) return false
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ prono... Remove this comment to see the full error message
    if (situation === world.SIDE_PANE && this.scenery && !Quest.settings.showSceneryInSidePanes) return false
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'player' does not exist on type '{ pronou... Remove this comment to see the full error message
    if (situation === world.SIDE_PANE && this.player) return false
    return true
  },

  isAtLoc: function (loc: any, situation: any) {
    if (typeof loc !== "string") loc = loc.name
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!w[loc]) errormsg("The location name `" + loc + "`, does not match anything in the game.")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    if (!this.isLocatedAt(loc, situation)) return false
    return this.isApparentTo(situation)
  },

  isHere: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return this.isAtLoc(player.loc);
  },

  isHeld: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return this.isAtLoc(player.name);
  },

  isUltimatelyHeldBy: function (obj: any) {
    let o = this
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
    while (o.loc) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
      if (o.loc === obj.name) return true
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
      if (!o.loc) return errormsg("isUltimatelyHeldBy has found that the object \"" + o.name + "\" has no loc attribute (or it is set to undefined/false/null/0), and so has failed. If this is a takeable item you may need to give it a custom isUltimatelyHeldBy function. If this is a takeable container or surface, it needs a loc attribute set.")
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!w[o.loc]) return errormsg("isUltimatelyHeldBy has found that the object \"" + o.name + "\" has its \"loc\" attribute set to \"" + o.loc + "\"), which does not exist, and so has failed.")
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      o = w[o.loc]
    }
    return false
  },

  isHereOrHeld: function () {
    return this.isHere() || this.isHeld();
  },

  countAtLoc: function (loc: any) {
    if (typeof loc !== "string") loc = loc.name;
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return this.isAtLoc(loc) ? 1 : 0;
  },

  scopeSnapshot: function (mode: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeStatus' does not exist on type '{ p... Remove this comment to see the full error message
    if (this.scopeStatus['done' + mode]) return  // already done this one

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeStatus' does not exist on type '{ p... Remove this comment to see the full error message
    if (Object.keys(this.scopeStatus).length === 0) world.scope.push(this)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeStatus' does not exist on type '{ p... Remove this comment to see the full error message
    this.scopeStatus['can' + mode] = true  // set the value
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scopeStatus' does not exist on type '{ p... Remove this comment to see the full error message
    this.scopeStatus['done' + mode] = true

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{ p... Remove this comment to see the full error message
    if (!this.getContents && !this.componentHolder) return // no lower levels so done

    let l
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{ p... Remove this comment to see the full error message
    if (this.getContents) {
      // this is a container, so get the contents

      // cannot see or reach contents and not flagged is a visible room, and not the player, so abort
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!this['can' + mode + 'ThroughThis']() && !this.scopeStatus['room' + mode] && this !== player) return
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{ p... Remove this comment to see the full error message
      l = this.getContents(world.PARSER)
    }
    else {
      // this has components, so get them
      l = []
      for (let key in w) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (w[key].loc === this.name) l.push(w[key]);
      }
    }
    for (let el of l) {
      // go through them
      el.scopeSnapshot(mode)
    }
  },

  canReachThroughThis: () => false,
  canSeeThroughThis: () => false,
  afterTakeOut: NULL_FUNC,
  afterDropIn: NULL_FUNC,
  testTalkPlayer: () => false,
  getExits: function () { return []; },
  hasExit: (dir: any) => false,
  getWorn: () => false,
  saveLoadExcludedAtts: [],


  moveToFrom: function (options: any, toLoc: any, fromLoc: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setToFrom' does not exist on type '{}'.
    util.setToFrom(options, toLoc, fromLoc)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
    if (options.fromLoc === undefined) options.fromLoc = this.loc
    if (options.fromLoc === options.toLoc) return

    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!w[options.fromLoc]) errormsg("The location name `" + options.fromLoc + "`, does not match anything in the game.");
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!w[options.toLoc]) errormsg("The location name `" + options.toLoc + "`, does not match anything in the game.");
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
    this.loc = options.toLoc
    options.item = this
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    w[options.fromLoc].afterTakeOut(options)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    w[options.toLoc].afterDropIn(options)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterMove' does not exist on type '{ pro... Remove this comment to see the full error message
    if (this.afterMove !== undefined) this.afterMove(options)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterTake' does not exist on type '{ pro... Remove this comment to see the full error message
    if (options.toLoc === player.name && this.afterTake !== undefined) this.afterTake(options)
  },

  afterLoad: NULL_FUNC,

  afterLoadForTemplate: function () {
    this.afterLoad();
  },

  beforeSave: NULL_FUNC,

  beforeSaveForTemplate: function () {
    this.beforeSave();
  },

  getSaveString: function () {
    this.beforeSaveForTemplate()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    let s = this.getSaveStringPreamble()
    for (let key in this) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (typeof this[key] !== "function") {
        if (!this.saveLoadExclude(key)) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          s += saveLoad.encode(key, this[key]);
        }
      }
    }
    return s
  },

  getSaveStringPreamble: function (item: any) {
    return "Object="
  },

  saveLoadExclude: function (att: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof this[att] === 'function') return true
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof this[att] === 'object' && !Array.isArray(this[att])) return true
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (this[att] instanceof Exit) return true
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasMatch' does not exist on type '{}'.
    if (array.hasMatch(Quest.settings.saveLoadExcludedAtts, att)) return true
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasMatch' does not exist on type '{}'.
    if (array.hasMatch(this.saveLoadExcludedAtts, att)) return true
    return false
  },


  setAlias: function (alias: any, options = {}) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{ pronoun... Remove this comment to see the full error message
    this.alias = alias
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'listAlias' does not exist on type '{ pro... Remove this comment to see the full error message
    this.listAlias = options.listAlias ? options.listAlias : sentenceCase(alias)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'headingAlias' does not exist on type '{ ... Remove this comment to see the full error message
    this.headingAlias = options.headingAlias ? options.headingAlias : Quest.settings.getDefaultRoomHeading(this)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'parserOptionsSet' does not exist on type... Remove this comment to see the full error message
    this.parserOptionsSet = false
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'pluralAlias' does not exist on type '{ p... Remove this comment to see the full error message
    this.pluralAlias = options.pluralAlias ? options.pluralAlias : lang.getPlural(alias)
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'properNoun' does not exist on type '{ pr... Remove this comment to see the full error message
    this.properNoun = options.properNoun === undefined ? /^[A-Z]/.test(this.alias) : options.properNoun
  },


  eventActive: false,
  eventCountdown: 0,
  eventIsActive: function () { return this.eventActive },
  endTurn: function (turn: any) { this.doEvent(turn) },
  doEvent: function (turn: any) {
    //console.log("this=" + this.name);
    // Not active, so stop
    if (!this.eventIsActive()) return;
    // Countdown running, so stop
    if (this.eventCountdown > 1) {
      this.eventCountdown--;
      return;
    }
    // If there is a condition and it is not met, stop
    //console.log("this=" + this.name);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'eventCondition' does not exist on type '... Remove this comment to see the full error message
    if (this.eventCondition && !this.eventCondition(turn)) return;
    //console.log("this=" + this.name);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'eventScript' does not exist on type '{ p... Remove this comment to see the full error message
    this.eventScript(turn);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'eventPeriod' does not exist on type '{ p... Remove this comment to see the full error message
    if (typeof this.eventPeriod === "number") {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'eventPeriod' does not exist on type '{ p... Remove this comment to see the full error message
      this.eventCountdown = this.eventPeriod;
    }
    else {
      this.eventActive = false;
    }
  },
};







const DEFAULT_ROOM = {
  room: true,
  beforeEnter: NULL_FUNC,
  beforeFirstEnter: NULL_FUNC,
  afterEnter: NULL_FUNC,
  afterEnterIf: {},
  afterEnterIfFlags: '',
  afterFirstEnter: NULL_FUNC,
  afterExit: NULL_FUNC,
  visited: 0,

  lightSource: () => world.LIGHT_FULL,

  description: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    if (game.dark) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      printOrRun(player, this, "darkDesc");
      return true;
    }
    for (let line of Quest.settings.roomTemplate) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(line);
    }
    return true;
  },

  examine: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    if (game.dark) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      printOrRun(player, this, "darkDesc");
      return true;
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(typeof this.desc === 'string' ? this.desc : this.desc())
    return true;
  },

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  darkDescription: () => msg("It is dark."),

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{}'... Remove this comment to see the full error message
  getContents: util.getContents,

  getExit: function (dir: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this[dir]
  },

  getExitObjs: function (options: any) {
    if (options === undefined) options = {};
    const list = []
    if (options.excludeAlsoDir === undefined) options.excludeAlsoDir = true
    for (let exit of lang.exit_list) {
      if (this.hasExit(exit.name, options)) {
        list.push(exit)
      }
    }
    return list
  },

  getExits: function (options: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this.getExitObjs(options).map(el => this[el.name])
  },

  getExitDirs: function (options: any) {
    return this.getExits(options).map(el => el.dir)
  },

  // returns null if there are no exits
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getRandomExit: function (options: any) { return Quest.Random.rndm.fromArray(this.getExits(options)) },

  hasExit: function (dir: any, options: any) {
    if (options === undefined) options = {};
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[dir]) return false;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (options.excludeAlsoDir && this[dir].isAlsoDir) return false;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (options.excludeLocked && this[dir].isLocked()) return false;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (options.excludeScenery && this[dir].scenery) return false;
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return !this[dir].isHidden();
  },

  findExit: function (dest: any, options: any) {
    if (typeof dest === "object") dest = dest.name;
    for (let exit of lang.exit_list) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (this.hasExit(exit.name, options) && this[exit.name].name === dest) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return this[exit.name];
      }
    }
    return null;
  },

  // Lock or unlock the exit indicated
  // Returns false if the exit does not exist or is not an Exit object
  // Returns true if successful
  setExitLock: function (dir: any, locked: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[dir]) return false
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this['exit_locked_' + dir] = locked
    return true
  },

  isExitLocked: function (dir: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this['exit_locked_' + dir]
  },

  // Hide or unhide the exit indicated
  // Returns false if the exit does not exist or is not an Exit object
  // Returns true if successful
  setExitHide: function (dir: any, hidden: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[dir]) return false
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this['exit_hidden_' + dir] = hidden
    return true
  },

  isExitHidden: function (dir: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this['exit_hidden_' + dir]
  },

  // Returns an exit going TO this room. If sent "west", it will return the exit from the room to the west, to this room
  // which will probably be east, but may not
  getReverseExit: function (dir: any) {
    const reverseDir = lang.exit_list.find(el => el.name === dir)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const dest = this[dir]
    return dest.findExit(this)
  },

  // Used for GO IN HOUSE, CLIMB UP TREE, GO THROUGH PORTAL, etc.
  // dir should be one of 'In', 'Out', 'Up', 'Down', Through' - case sensitive
  // @ts-expect-error ts-migrate(7023) FIXME: 'goItem' implicitly has return type 'any' because ... Remove this comment to see the full error message
  goItem: function (obj: any, dir: any, char: any) {
    const att = 'go' + dir + 'Direction'
    if (!char) char = player
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!obj[att]) return failedmsg(lang['cannot_go_' + dir.toLowerCase()], { item: obj, char: char })
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[obj[att]]) return errormsg("Trying to 'go " + dir.toLowerCase() + "' using unknown exit '" + obj[att] + "' for " + this.name)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this[obj[att]].use(char) ? world.SUCCESS : world.FAILED
  }

  //    


};


const DEFAULT_ITEM = {
  lightSource: () => world.LIGHT_NONE,
  icon: () => "",
  testKeys: (char: any, toLock: any) => false,
  // @ts-expect-error ts-migrate(7023) FIXME: 'getListAlias' implicitly has return type 'any' be... Remove this comment to see the full error message
  getListAlias: function (loc: any) { return this.listAlias },

  getVerbs: function () {
    const verbList: any = []
    //console.log('verbs for ' + this.name)
    //console.log('count ' + this.verbFunctions.length)
    //console.log(verbList)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbFunctions' does not exist on type '{... Remove this comment to see the full error message
    for (let f of this.verbFunctions) f(this, verbList)

    //console.log(verbList)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ light... Remove this comment to see the full error message
    if (!this.isAtLoc(player.name)) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'hereVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
      if (this.hereVerbs) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'hereVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
        for (let s of this.hereVerbs) verbList.push(s)
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getWorn' does not exist on type '{ light... Remove this comment to see the full error message
    else if (this.getWorn()) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wornVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
      if (this.wornVerbs) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'wornVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
        for (let s of this.wornVerbs) verbList.push(s)
      }
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'heldVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
      if (this.heldVerbs) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'heldVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
        for (let s of this.heldVerbs) verbList.push(s)
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'verbFunction' does not exist on type '{ ... Remove this comment to see the full error message
    if (this.verbFunction) this.verbFunction(verbList)
    return verbList;
  },

  transform: function (item: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ lightSour... Remove this comment to see the full error message
    item.loc = this.loc
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ lightSour... Remove this comment to see the full error message
    delete this.loc
    for (const key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (w[key].loc === this.name) w[key].loc = item.name
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
    for (const key in parser.pronouns) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
      if (parser.pronouns[key] === this) parser.pronouns[key] = item
    }
  },
};

