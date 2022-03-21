import { Quest } from '../../types/quest';
import { log } from '../logger';

export const canTalkTo = (cmd: any, options: any) => {
  if (!options.char.testTalk(options.item)) {
    return false;
  }
  if (!options.item.npc && !options.item.talker && !options.item.player) {
    return Quest.IO.falsemsg(Quest.lang.not_able_to_hear, options);
  }
  return true;
};

// Item's location is the char
export const isHeld = (cmd: any, options: any) => {
  if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER)) {
    return true;
  }

  if (options.item.loc) {
    options.holder = Quest.World.w[options.item.loc];
    if (options.holder.npc || options.holder.player) {
      return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
    }
  }

  return Quest.IO.falsemsg(Quest.lang.not_carrying, options);
};

// Item's location is the char and it is not worn
export const isHeldNotWorn = (cmd: any, options: any) => {
  if (
    !options.item.getWorn() &&
    options.item.isAtLoc(options.char.name, Quest.World.world.PARSER)
  ) {
    return true;
  }

  if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER)) {
    return Quest.IO.falsemsg(Quest.lang.already_wearing, options);
  }

  if (options.item.loc) {
    options.holder = Quest.World.w[options.item.loc];
    if (options.holder.npc || options.holder.player) {
      return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
    }
  }

  return Quest.IO.falsemsg(Quest.lang.not_carrying, options);
};

// Item's location is the char's location or the char
// or item is reachable, but not held by someone else
export const isHere = (cmd: any, options: any) => {
  if (options.item.isAtLoc(options.char.loc, Quest.World.world.PARSER)) {
    return true;
  }

  if (options.item.loc) {
    options.holder = Quest.World.w[options.item.loc];
    if (options.already && options.holder === options.char) {
      return Quest.IO.falsemsg(Quest.lang.already_have, options);
    }
    if (options.holder.npc || options.holder.player) {
      return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
    }
  }

  if (options.item.scopeStatus.canReach || options.item.multiLoc) return true;
  return Quest.IO.falsemsg(Quest.lang.not_here, options);
};

// Used by take to note if player already holding
export const isHereAlready = (cmd: any, options: any) => {
  options.already = true;
  return isHere(cmd, options);
};

// Item's location is the char's location or the char
// or item is reachable, but not held by someone else
export const isPresent = (cmd: any, options: any) => {
  if (options.item.isAtLoc(options.char.loc, Quest.World.world.PARSER)) {
    return true;
  }
  if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER)) {
    return true;
  }

  if (options.item.loc) {
    options.holder = Quest.World.w[options.item.loc];
    // Has a specific location and held by someone
    if (options.holder.npc || options.holder.player) {
      return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
    }
  }

  if (options.item.scopeStatus.canReach) {
    return true;
  }

  return Quest.IO.falsemsg(Quest.lang.not_here, options);
};

// In this location or held by this char, or in a container (used by eg TAKE)
export const isPresentOrContained = (cmd: any, options: any) => {
  // use parser functions here as we do not want messages at this point

  if (!options.item.isAtLoc) {
    log(options.item.name);
  }
  if (!options.char) {
    log(cmd.name);
  }

  if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER)) {
    return true;
  }
  if (Quest.Parser.parser.isHere(options.item)) {
    return true;
  }

  if (options.item.loc) {
    options.holder = Quest.World.w[options.item.loc];
    if (options.holder && (options.holder.npc || options.holder.player)) {
      return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
    }
  }
  if (Quest.Parser.parser.isContained(options.item)) {
    return true;
  }
  return Quest.IO.falsemsg(Quest.lang.not_here, options);
};

// Item's location is the char and it is worn
export const isWorn = (cmd: any, options: any) => {
  if (
    options.item.getWorn() &&
    options.item.isAtLoc(options.char.name, Quest.World.world.PARSER)
  ) {
    return true;
  }

  if (options.item.isAtLoc(options.char.name, Quest.World.world.PARSER)) {
    return Quest.IO.falsemsg(Quest.lang.not_wearing, options);
  }

  if (options.item.loc) {
    options.holder = Quest.World.w[options.item.loc];
    if (options.holder.npc || options.holder.player) {
      return Quest.IO.falsemsg(Quest.lang.char_has_it, options);
    }
  }

  return Quest.IO.falsemsg(Quest.lang.not_carrying, options);
};

export const testManipulate = (cmd: any, options: any) => {
  if (!options.char.testManipulate(options.item, cmd.name)) {
    return false;
  }
  return true;
};

export const testPosture = (cmd: any, options: any) => {
  if (!options.char.testPosture(cmd.name)) {
    return false;
  }
  return true;
};

export const cmdRules = {
  canTalkTo,
  isHeld,
  isHeldNotWorn,
  isHere,
  isHereAlready,
  isPresent,
  isPresentOrContained,
  isWorn,
  testManipulate,
  testPosture,
};
