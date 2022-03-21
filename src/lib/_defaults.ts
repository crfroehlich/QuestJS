import { IDefaults } from '../types/iquest';
import { Quest } from '../types/quest';

// Should all be language neutral
export const DEFAULT_OBJECT = {
  afterDropIn: Quest.Utilities.NULL_FUNC,

  afterLoad: Quest.Utilities.NULL_FUNC,

  afterLoadForTemplate() {
    this.afterLoad();
  },

  afterTakeOut: Quest.Utilities.NULL_FUNC,

  beforeSave: Quest.Utilities.NULL_FUNC,

  beforeSaveForTemplate() {
    this.beforeSave();
  },

  canReachThroughThis: () => false,

  canSeeThroughThis: () => false,

  countAtLoc(loc: any) {
    if (typeof loc !== 'string') loc = loc.name;
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return this.isAtLoc(loc) ? 1 : 0;
  },

  doEvent(turn: any) {
    // ("this=" + this.name);
    // Not active, so stop
    if (!this.eventIsActive()) return;
    // Countdown running, so stop
    if (this.eventCountdown > 1) {
      this.eventCountdown--;
      return;
    }
    // If there is a condition and it is not met, stop
    // log("this=" + this.name);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'eventCondition' does not exist on type '... Remove this comment to see the full error message
    if (this.eventCondition && !this.eventCondition(turn)) return;
    // log("this=" + this.name);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'eventScript' does not exist on type '{ p... Remove this comment to see the full error message
    this.eventScript(turn);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'eventPeriod' does not exist on type '{ p... Remove this comment to see the full error message
    if (typeof this.eventPeriod === 'number') {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'eventPeriod' does not exist on type '{ p... Remove this comment to see the full error message
      this.eventCountdown = this.eventPeriod;
    } else {
      this.eventActive = false;
    }
  },

  endTurn(turn: any) {
    this.doEvent(turn);
  },

  eventActive: false,

  eventCountdown: 0,

  eventIsActive() {
    return this.eventActive;
  },

  getExits() {
    return [];
  },

  getSaveString() {
    this.beforeSaveForTemplate();
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    let s = this.getSaveStringPreamble();
    for (const key in this) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (typeof this[key] !== 'function') {
        if (!this.saveLoadExclude(key)) {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          s += Quest.SaveLoad.saveLoad.encode(key, this[key]);
        }
      }
    }
    return s;
  },

  getSaveStringPreamble(item: any) {
    return 'Object=';
  },

  getWorn: () => false,

  hasExit: (dir: any) => false,

  isApparentTo(situation: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultIsApparentTo' does not exist on t... Remove this comment to see the full error message
    if (Quest.Settings.settings.defaultIsApparentTo)
      return Quest.Settings.settings.defaultIsApparentTo(situation);

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ prono... Remove this comment to see the full error message
    if (situation === Quest.World.world.LOOK && this.scenery) return false;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ prono... Remove this comment to see the full error message
    if (
      situation === Quest.World.world.SIDE_PANE &&
      this.scenery &&
      !Quest.Settings.settings.showSceneryInSidePanes
    )
      return false;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'player' does not exist on type '{ pronou... Remove this comment to see the full error message
    if (situation === Quest.World.world.SIDE_PANE && this.player) return false;
    return true;
  },

  isAtLoc(loc: any, situation: any) {
    if (typeof loc !== 'string') loc = loc.name;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!Quest.World.w[loc])
      Quest.IO.errormsg(
        `The location name \`${loc}\`, does not match anything in the game.`,
      );
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
    if (!this.isLocatedAt(loc, situation)) return false;
    return this.isApparentTo(situation);
  },

  isHeld() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return this.isAtLoc(Quest.World.player.name);
  },

  isHere() {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return this.isAtLoc(Quest.World.player.loc);
  },

  isHereOrHeld() {
    return this.isHere() || this.isHeld();
  },

  // ts-error-fixed ts-migrate(7023) FIXME: 'isLocatedAt' implicitly has return type 'any' bec... Remove this comment to see the full error message
  isLocatedAt(loc: any) {
    return loc === this.loc;
  },

  isUltimatelyHeldBy(obj: any) {
    let o = this;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
    while (o.loc) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
      if (o.loc === obj.name) return true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
      if (!o.loc)
        return Quest.IO.errormsg(
          `isUltimatelyHeldBy has found that the object "${o.name}" has no loc attribute (or it is set to undefined/false/null/0), and so has failed. If this is a takeable item you may need to give it a custom isUltimatelyHeldBy function. If this is a takeable container or surface, it needs a loc attribute set.`,
        );
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!Quest.World.w[o.loc])
        return Quest.IO.errormsg(
          `isUltimatelyHeldBy has found that the object "${o.name}" has its "loc" attribute set to "${o.loc}"), which does not exist, and so has failed.`,
        );
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      o = Quest.World.w[o.loc];
    }
    return false;
  },

  moveToFrom(options: any, toLoc: any, fromLoc: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'setToFrom' does not exist on type '{}'.
    Quest.Utilities.util.setToFrom(options, toLoc, fromLoc);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
    if (options.fromLoc === undefined) options.fromLoc = this.loc;
    if (options.fromLoc === options.toLoc) return;

    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!Quest.World.w[options.fromLoc])
      Quest.IO.errormsg(
        `The location name \`${options.fromLoc}\`, does not match anything in the game.`,
      );
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!Quest.World.w[options.toLoc])
      Quest.IO.errormsg(
        `The location name \`${options.toLoc}\`, does not match anything in the game.`,
      );
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ pronouns:... Remove this comment to see the full error message
    this.loc = options.toLoc;
    options.item = this;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    Quest.World.w[options.fromLoc].afterTakeOut(options);
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    Quest.World.w[options.toLoc].afterDropIn(options);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterMove' does not exist on type '{ pro... Remove this comment to see the full error message
    if (this.afterMove !== undefined) this.afterMove(options);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterTake' does not exist on type '{ pro... Remove this comment to see the full error message
    if (
      options.toLoc === Quest.World.player.name &&
      this.afterTake !== undefined
    )
      this.afterTake(options);
  },

  pronouns: Quest.lang.pronouns.thirdperson,

  saveLoadExclude(att: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof this[att] === 'function') return true;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (typeof this[att] === 'object' && !Array.isArray(this[att])) return true;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (this[att] instanceof Quest.World.Exit) return true;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'hasMatch' does not exist on type '{}'.
    if (
      Quest.Utilities.array.hasMatch(
        Quest.Settings.settings.saveLoadExcludedAtts,
        att,
      )
    )
      return true;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'hasMatch' does not exist on type '{}'.
    if (Quest.Utilities.array.hasMatch(this.saveLoadExcludedAtts, att))
      return true;
    return false;
  },
  saveLoadExcludedAtts: [],
  scopeSnapshot(mode: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'scopeStatus' does not exist on type '{ p... Remove this comment to see the full error message
    if (this.scopeStatus[`done${mode}`]) return; // already done this one

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'scopeStatus' does not exist on type '{ p... Remove this comment to see the full error message
    if (Object.keys(this.scopeStatus).length === 0)
      Quest.World.world.scope.push(this);

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'scopeStatus' does not exist on type '{ p... Remove this comment to see the full error message
    this.scopeStatus[`can${mode}`] = true; // set the value
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'scopeStatus' does not exist on type '{ p... Remove this comment to see the full error message
    this.scopeStatus[`done${mode}`] = true;

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{ p... Remove this comment to see the full error message
    if (!this.getContents && !this.componentHolder) return; // no lower levels so done

    let l;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{ p... Remove this comment to see the full error message
    if (this.getContents) {
      // this is a container, so get the contents

      // cannot see or reach contents and not flagged is a visible room, and not the player, so abort
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (
        !this[`can${mode}ThroughThis`]() &&
        !this.scopeStatus[`room${mode}`] &&
        this !== Quest.World.player
      )
        return;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{ p... Remove this comment to see the full error message
      l = this.getContents(Quest.World.world.PARSER);
    } else {
      // this has components, so get them
      l = [];
      for (const key in Quest.World.w) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[key].loc === this.name) l.push(Quest.World.w[key]);
      }
    }
    for (const el of l) {
      // go through them
      el.scopeSnapshot(mode);
    }
  },
  setAlias(alias: any, options = {}) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{ pronoun... Remove this comment to see the full error message
    this.alias = alias;
    // ts-error-fixed ts-migrate(2551) FIXME: Property 'listAlias' does not exist on type '{ pro... Remove this comment to see the full error message
    this.listAlias = options.listAlias
      ? options.listAlias
      : Quest.Utilities.sentenceCase(alias);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'headingAlias' does not exist on type '{ ... Remove this comment to see the full error message
    this.headingAlias = options.headingAlias
      ? options.headingAlias
      : Quest.Settings.settings.getDefaultRoomHeading(this);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'parserOptionsSet' does not exist on type... Remove this comment to see the full error message
    this.parserOptionsSet = false;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'pluralAlias' does not exist on type '{ p... Remove this comment to see the full error message
    this.pluralAlias = options.pluralAlias
      ? options.pluralAlias
      : Quest.lang.getPlural(alias);
    // ts-error-fixed ts-migrate(2551) FIXME: Property 'properNoun' does not exist on type '{ pr... Remove this comment to see the full error message
    this.properNoun =
      options.properNoun === undefined
        ? /^[A-Z]/.test(this.alias)
        : options.properNoun;
  },
  testTalkPlayer: () => false,
};

export const DEFAULT_ROOM = {
  afterEnter: Quest.Utilities.NULL_FUNC,
  afterEnterIf: {},
  afterEnterIfFlags: '',
  afterExit: Quest.Utilities.NULL_FUNC,
  afterFirstEnter: Quest.Utilities.NULL_FUNC,
  beforeEnter: Quest.Utilities.NULL_FUNC,
  beforeFirstEnter: Quest.Utilities.NULL_FUNC,
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  darkDescription: () => Quest.IO.msg('It is dark.'),

  description() {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    if (Quest.World.game.dark) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      Quest.Utilities.printOrRun(player, this, 'darkDesc');
      return true;
    }
    for (const line of Quest.Settings.settings.roomTemplate) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(line);
    }
    return true;
  },

  examine() {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    if (Quest.World.game.dark) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      Quest.Utilities.printOrRun(player, this, 'darkDesc');
      return true;
    }
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(typeof this.desc === 'string' ? this.desc : this.desc());
    return true;
  },

  findExit(dest: any, options: any) {
    if (typeof dest === 'object') dest = dest.name;
    for (const exit of Quest.lang.exit_list) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (this.hasExit(exit.name, options) && this[exit.name].name === dest) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return this[exit.name];
      }
    }
    return null;
  },

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{}'... Remove this comment to see the full error message
  getContents: Quest.Utilities.util.getContents,

  getExit(dir: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this[dir];
  },

  getExitDirs(options: any) {
    return this.getExits(options).map((el) => el.dir);
  },

  getExitObjs(options: any) {
    if (options === undefined) options = {};
    const list = [];
    if (options.excludeAlsoDir === undefined) options.excludeAlsoDir = true;
    for (const exit of Quest.lang.exit_list) {
      if (this.hasExit(exit.name, options)) {
        list.push(exit);
      }
    }
    return list;
  },

  getExits(options: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this.getExitObjs(options).map((el) => this[el.name]);
  },

  // returns null if there are no exits
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'fromArray' does not exist on type '{ buf... Remove this comment to see the full error message
  getRandomExit(options: any) {
    return Quest.Random.rndm.fromArray(this.getExits(options));
  },

  // Returns an exit going TO this room. If sent "west", it will return the exit from the room to the west, to this room
  // which will probably be east, but may not
  getReverseExit(dir: any) {
    const reverseDir = Quest.lang.exit_list.find((el) => el.name === dir);
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const dest = this[dir];
    return dest.findExit(this);
  },

  // Used for GO IN HOUSE, CLIMB UP TREE, GO THROUGH PORTAL, etc.
  // dir should be one of 'In', 'Out', 'Up', 'Down', Through' - case sensitive
  // ts-error-fixed ts-migrate(7023) FIXME: 'goItem' implicitly has return type 'any' because ... Remove this comment to see the full error message
  goItem(obj: any, dir: any, char: any) {
    const att = `go${dir}Direction`;
    if (!char) char = Quest.World.player;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!obj[att])
      return Quest.IO.failedmsg(lang[`cannot_go_${dir.toLowerCase()}`], {
        char,
        item: obj,
      });
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[obj[att]])
      return Quest.IO.errormsg(
        `Trying to 'go ${dir.toLowerCase()}' using unknown exit '${
          obj[att]
        }' for ${this.name}`,
      );
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this[obj[att]].use(char)
      ? Quest.World.world.SUCCESS
      : Quest.World.world.FAILED;
  },

  hasExit(dir: any, options: any) {
    if (options === undefined) options = {};
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[dir]) return false;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (options.excludeAlsoDir && this[dir].isAlsoDir) return false;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (options.excludeLocked && this[dir].isLocked()) return false;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (options.excludeScenery && this[dir].scenery) return false;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return !this[dir].isHidden();
  },

  isExitHidden(dir: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this[`exit_hidden_${dir}`];
  },

  isExitLocked(dir: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return this[`exit_locked_${dir}`];
  },

  lightSource: () => Quest.World.world.LIGHT_FULL,

  room: true,

  // Hide or unhide the exit indicated
  // Returns false if the exit does not exist or is not an Quest.World.Exit object
  // Returns true if successful
  setExitHide(dir: any, hidden: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[dir]) return false;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this[`exit_hidden_${dir}`] = hidden;
    return true;
  },

  // Lock or unlock the exit indicated
  // Returns false if the exit does not exist or is not an Quest.World.Exit object
  // Returns true if successful
  setExitLock(dir: any, locked: any) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[dir]) return false;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this[`exit_locked_${dir}`] = locked;
    return true;
  },

  visited: 0,

  //
};

export const DEFAULT_ITEM = {
  // ts-error-fixed ts-migrate(7023) FIXME: 'getListAlias' implicitly has return type 'any' be... Remove this comment to see the full error message
  getListAlias(loc: any) {
    return this.listAlias;
  },

  getVerbs() {
    const verbList: any = [];
    // ('verbs for ' + this.name)
    // ('count ' + this.verbFunctions.length)
    // (verbList)
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'verbFunctions' does not exist on type '{... Remove this comment to see the full error message
    for (const f of this.verbFunctions) f(this, verbList);

    // (verbList)
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ light... Remove this comment to see the full error message
    if (!this.isAtLoc(Quest.World.player.name)) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'hereVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
      if (this.hereVerbs) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'hereVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
        for (const s of this.hereVerbs) verbList.push(s);
      }
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getWorn' does not exist on type '{ light... Remove this comment to see the full error message
    else if (this.getWorn()) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'wornVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
      if (this.wornVerbs) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'wornVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
        for (const s of this.wornVerbs) verbList.push(s);
      }
    } else {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'heldVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
      if (this.heldVerbs) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'heldVerbs' does not exist on type '{ lig... Remove this comment to see the full error message
        for (const s of this.heldVerbs) verbList.push(s);
      }
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'verbFunction' does not exist on type '{ ... Remove this comment to see the full error message
    if (this.verbFunction) this.verbFunction(verbList);
    return verbList;
  },

  icon: () => '',

  lightSource: () => Quest.World.world.LIGHT_NONE,

  testKeys: (char: any, toLock: any) => false,

  transform(item: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ lightSour... Remove this comment to see the full error message
    item.loc = this.loc;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ lightSour... Remove this comment to see the full error message
    delete this.loc;
    for (const key in Quest.World.w) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (Quest.World.w[key].loc === this.name)
        Quest.World.w[key].loc = item.name;
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
    for (const key in Quest.Parser.parser.pronouns) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
      if (Quest.Parser.parser.pronouns[key] === this)
        Quest.Parser.parser.pronouns[key] = item;
    }
  },
};

export const Defaults: IDefaults = {
  DEFAULT_ITEM,
  DEFAULT_OBJECT,
  DEFAULT_ROOM,
};

Quest.Defaults = Defaults;
