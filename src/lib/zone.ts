import { Quest } from '../types/quest';

Quest.Settings.settings.saveLoadExcludedAtts.push('zoneExits');
Quest.Settings.settings.saveLoadExcludedAtts.push('zoneDescs');

const zoneExit = function (this: any, char: any, exit: any) {
  if (!exit) exit = this;
  const newX    = char.positionX + this.data.x;
  const newY    = char.positionY + this.data.y;
  const { dir } = exit;

  // zoneExits to other places
  for (const el of this.origin.zoneExits) {
    if (char.positionX === el.x && char.positionY === el.y && dir === el.dir) {
      const tpParams = { char, dir };
      if (el.blocking) return Quest.IO.falsemsg(el.blockedmsg || Quest.lang.not_that_way, tpParams);
      if (el.isLocked) return Quest.IO.falsemsg(el.lockedmsg || Quest.lang.locked_exit, tpParams);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(el.msg || Quest.lang.go_successful, tpParams);
      this.origin.afterZoneEixit(dir);
      // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      char.moveChar(new Quest.World.Exit(el.dest, exit));
      return true;
    }
  }

  // If the direction is "in", "up", or "down", just say no
  if (this.origin.defaultToBlocked || this.data.type !== 'compass') return Quest.IO.failedmsg(Quest.lang.not_that_way, { char, dir: this.dir });

  // Check if a feature blocks the way
  for (const name in Quest.World.w) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const o = Quest.World.w[name];
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (o.zone === this.origin.name && newX === o.x && newY === o.y && o.featureNoExit) return Quest.IO.falsemsg(o.featureNoExit.replace('#', dir));
  }

  // Check if this would cross a border
  for (const el of this.origin.getBorders()) {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (el.border(newX, newY)) return Quest.IO.falsemsg(el.borderMsg.replace('#', dir));
  }

  // Handle objects at the old location
  this.origin.afterZoneEixit(dir);

  // More the player
  char.positionX = newX;
  char.positionY = newY;
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg(Quest.lang.stop_posture(char));
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  Quest.IO.msg(Quest.lang.go_successful, { char, dir });
  // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  char.moveChar(new Quest.World.Exit(this.origin.name, exit));

  return true;
};

export const ZONE = function (defaultToBlocked: any) {
  const res = {
    cellSize: 16,
    defaultToBlocked,

    featureColour: 'blue',

    // The below are all defaults for map drawing
    insideColour: 'yellow',

    mapBorder:     true,
    mapCells:      [],
    mapFeatures:   [],
    mapFont:       '12px sans-serif',
    mapLabels:     [],
    outsideColour: 'silver',
    playerColour:  'black',
    zone:          true,
    zoneExits:     [],
  };

  for (const ex of Quest.lang.exit_list) {
    if (ex.type === 'nocmd') continue;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    res[ex.name] = new Quest.World.Exit('_', { data: ex, use: zoneExit });
  }

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getExitObjs' does not exist on type '{ z... Remove this comment to see the full error message
  res.getExitObjs = function (options: any) {
    const zoneExits = [];
    for (const ex of Quest.lang.exit_list) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'hasExit' does not exist on type '{ zoneE... Remove this comment to see the full error message
      if (ex.type !== 'nocmd' && this.hasExit(ex.name, options)) zoneExits.push(ex);
    }
    return zoneExits;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'hasExit' does not exist on type '{ zoneE... Remove this comment to see the full error message
  res.hasExit = function (dir: any, options: any) {
    if (options === undefined) options = {};
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[dir]) return false;

    // Check for special exit
    for (const el of this.zoneExits) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'x' does not exist on type 'never'.
      if (Quest.World.player.positionX === el.x && Quest.World.player.positionY === el.y && dir === el.dir) {
        // console.log("found special")
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'blocking' does not exist on type 'never'... Remove this comment to see the full error message
        if (el.blocking) return false;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'isLocked' does not exist on type 'never'... Remove this comment to see the full error message
        if (options.excludeLocked && el.isLocked) return false;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'scenery' does not exist on type 'never'.
        if (options.excludeScenery && el.scenery) return false;
        // console.log("it is good")
        return true;
      }
    }

    // Non-compass directions not allowed
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (this.defaultToBlocked || this[dir].data.type !== 'compass') {
      return false;
    }

    // Check if this would cross a border
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const newX = Quest.World.player.positionX + this[dir].data.x;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const newY = Quest.World.player.positionY + this[dir].data.y;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getBorders' does not exist on type '{ zo... Remove this comment to see the full error message
    for (const el of this.getBorders()) {
      if (el.borderMsg !== undefined) continue;
      if (el.border(newX, newY)) {
        return false;
      }
    }

    return true;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'desc' does not exist on type '{ zoneExit... Remove this comment to see the full error message
  res.desc = function () {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'zoneDescs' does not exist on type '{ zon... Remove this comment to see the full error message
    for (const el of this.zoneDescs) {
      if (el.when !== undefined) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getDesc' does not exist on type '{ zoneE... Remove this comment to see the full error message
        if (el.when(Quest.World.player.positionX, Quest.World.player.positionY)) return this.getDesc(el);
      } else if (el.x !== undefined) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getDesc' does not exist on type '{ zoneE... Remove this comment to see the full error message
        if (el.x === Quest.World.player.positionX && el.y === Quest.World.player.positionY) return this.getDesc(el);
      } else {
        // console.log(el)
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getDesc' does not exist on type '{ zoneE... Remove this comment to see the full error message
        return this.getDesc(el);
      }
    }
    return `ERROR: No description found for zone at x=${Quest.World.player.positionX}, y=${Quest.World.player.positionY}`;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getDesc' does not exist on type '{ zoneE... Remove this comment to see the full error message
  res.getDesc = function (el: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getFeatureDescs' does not exist on type ... Remove this comment to see the full error message
    return (typeof el.desc === 'function' ? el.desc() : el.desc) + this.getFeatureDescs();
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'afterZoneEixit' does not exist on type '... Remove this comment to see the full error message
  res.afterZoneEixit = function (dir: any) {
    for (const name in Quest.World.w) {
      const o = Quest.World.w[name];
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      if (o.loc === this.name && o !== Quest.World.player) {
        o.loc       = false;
        o.positionX = Quest.World.player.positionX;
        o.positionY = Quest.World.player.positionY;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
        o.zoneElsewhere = this.name;
      }
    }
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getFeatureDescs' does not exist on type ... Remove this comment to see the full error message
  res.getFeatureDescs = function () {
    let s = '';
    for (const name in Quest.World.w) {
      const el = Quest.World.w[name];
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      if (el.zone !== this.name || el.zoneBorder) continue;
      if (Quest.World.player.positionX === el.positionX && Quest.World.player.positionY === el.positionY && el.featureLookHere) {
        s += ` ${el.featureLookHere}`;
      } else {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getDirection' does not exist on type '{ ... Remove this comment to see the full error message
        const d = this.getDirection(Quest.World.player, el.positionX, el.positionY, el.range);
        if (d) s += ` ${el.featureLook.replace('#', d)}`;
      }
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getBorders' does not exist on type '{ zo... Remove this comment to see the full error message
    for (const el of this.getBorders()) {
      if (el.isAdjacentTo(Quest.World.player) && el.borderDesc) s += ` ${el.borderDesc}`;
    }
    return s;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'beforeEnter' does not exist on type '{ z... Remove this comment to see the full error message
  res.beforeEnter = function () {
    if (Quest.World.player.positionX === undefined) Quest.World.player.positionX = 0;
    if (Quest.World.player.positionY === undefined) Quest.World.player.positionY = 0;
    for (const name in Quest.World.w) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const o = Quest.World.w[name];
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      if (o.zoneElsewhere === this.name && o.positionX === Quest.World.player.positionX && o.positionY === Quest.World.player.positionY) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
        o.loc           = this.name;
        o.zoneElsewhere = false;
      }
    }
  };

  // Gets the compass direction from that char to the given co-ordinate
  // If range is given, will return false if the distance is greater than that
  // No guarantee what will happen if the char is at at the coordinates
  // (because of the way floats are handled it may not be accurate/reliable)
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getDirection' does not exist on type '{ ... Remove this comment to see the full error message
  res.getDirection = function (char: any, objX: any, objY: any, range: any) {
    const x = objX - char.positionX;
    const y = objY - char.positionY;
    const r = Math.sqrt(x * x + y * y);
    if (range && r > range) return false;
    const theta = Math.atan(y / x) * 180 / Math.PI;
    if (x > 0 && theta <= 22.5 && theta >= -22.5) return Quest.lang.exit_list[7].name;
    if (x > 0 && theta <= 67.5 && theta >= 22.5) return Quest.lang.exit_list[2].name;
    if (x > 0 && theta >= -67.5 && theta <= -22.5) return Quest.lang.exit_list[12].name;

    if (x < 0 && theta <= 22.5 && theta >= -22.5) return Quest.lang.exit_list[5].name;
    if (x < 0 && theta <= 67.5 && theta >= 22.5) return Quest.lang.exit_list[10].name;
    if (x < 0 && theta >= -67.5 && theta <= -22.5) return Quest.lang.exit_list[0].name;

    return y > 0 ? Quest.lang.exit_list[1].name : Quest.lang.exit_list[11].name;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getBorders' does not exist on type '{ zo... Remove this comment to see the full error message
  res.getBorders = function () {
    const borders = [];
    // ts-error-fixed ts-migrate(2588) FIXME: Cannot assign to 'name' because it is a constant.
    for (name in Quest.World.w) {
      // ts-error-fixed ts-migrate(2538) FIXME: Type 'void' cannot be used as an index type.
      if (Quest.World.w[name].zoneBorder && Quest.World.w[name].zone === this.name) borders.push(Quest.World.w[name]);
    }
    return borders;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getBorderAt' does not exist on type '{ z... Remove this comment to see the full error message
  res.getBorderAt = function (x: any, y: any) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getBorders' does not exist on type '{ zo... Remove this comment to see the full error message
    for (const el of this.getBorders()) {
      if (el.border(x, y)) {
        return el;
      }
    }
    return false;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getFeatureAt' does not exist on type '{ ... Remove this comment to see the full error message
  res.getFeatureAt = function (x: any, y: any) {
    for (const name in Quest.World.w) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const el = Quest.World.w[name];
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      if (el.zone !== this.name || el.zoneBorder) continue;
      if (x === el.positionX && y === el.positionY) {
        return el;
      }
    }
    return false;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'drawMap' does not exist on type '{ zoneE... Remove this comment to see the full error message
  res.drawMap = function () {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    if (this.size === undefined) return false;
    const cells    = [];
    const features = [];
    const labels   = [];
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    for (let x = -this.size; x <= this.size; x++) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      for (let y = -this.size; y <= this.size; y++) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
        const x2 = (this.size + x) * this.cellSize;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
        const y2 = (this.size - y) * this.cellSize;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getBorderAt' does not exist on type '{ z... Remove this comment to see the full error message
        if (this.getBorderAt(x, y)) {
          cells.push(`<rect x="${x2}" y="${y2}" width="${this.cellSize}" height="${this.cellSize}" stroke="none" fill="${this.outsideColour}"/>`);
        } else {
          cells.push(`<rect x="${x2}" y="${y2}" width="${this.cellSize}" height="${this.cellSize}" stroke="none" fill="${this.insideColour}"/>`);
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getFeatureAt' does not exist on type '{ ... Remove this comment to see the full error message
        const feature = this.getFeatureAt(x, y);
        if (feature) {
          const colour = feature.zoneColour || this.featureColour;
          features.push(`<circle cx="${x2 + this.cellSize / 2}" cy="${y2 + this.cellSize / 2}" r="${this.cellSize / 2 - 1}" stroke="none" fill="${colour}"/>`);
          if (feature.zoneMapName) labels.push(`<text x="${x2 + this.cellSize}" y="${y2 + 5}" style="font: ${this.mapFont}; fill: black;">${feature.zoneMapName}</text>`);
        }
      }
    }

    const map = cells.concat(this.mapCells, features, this.mapFeatures, labels, this.mapLabels);

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    const x2 = (this.size + Quest.World.player.positionX) * this.cellSize;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    const y2 = (this.size - Quest.World.player.positionY) * this.cellSize;
    map.push(`<rect x="${x2 + 4}" y="${y2 + 4}" width="${this.cellSize - 8}" height="${this.cellSize - 8}" stroke="none" fill="${this.playerColour}"/>`);

    // ts-error-fixed ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    const svgSize = (this.size * 2 + 1) * this.cellSize;
    if (this.mapBorder) map.push(`<rect x="0" y="0" width="${svgSize}" height="${svgSize}" stroke="black" fill="none"/>`);
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    Quest.IO.draw(svgSize, svgSize, map);
    return true;
  };

  return res;
};

export const ZONE_BORDER = function (loc: any) {
  return {
    isAdjacentTo(char: any) {
      if (char.loc !== this.zone) return false;
      for (let x = char.positionX - 1; x <= char.positionX + 1; x++) {
        for (let y = char.positionY - 1; y <= char.positionY + 1; y++) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'border' does not exist on type '{ zoneBo... Remove this comment to see the full error message
          if (this.border(x, y)) return true;
        }
      }
      return false;
    },
    isLocatedAt(loc: any) {
      return this.isAdjacentTo(Quest.World.player);
    },
    zone:       loc,
    zoneBorder: true,
  };
};

export const ZONE_ITEM = function (loc: any, x: any, y: any) {
  return { positionX: x, positionY: y, zoneElsewhere: loc };
};

export const ZONE_FEATURE = function (loc: any, x: any, y: any, range: any, adjacent: any) {
  return {
    adjacent,
    // ts-error-fixed ts-migrate(7023) FIXME: 'isLocatedAt' implicitly has return type 'any' bec... Remove this comment to see the full error message
    isLocatedAt(loc: any) {
      if (adjacent) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'x' does not exist on type '{ positionX: ... Remove this comment to see the full error message
        return loc === this.zone && Math.abs(Quest.World.player.positionX - this.x) < 2 && Math.abs(Quest.World.player.positionY - this.y) < 2;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'x' does not exist on type '{ positionX: ... Remove this comment to see the full error message
      return loc === this.zone && Quest.World.player.positionX === this.x && Quest.World.player.positionY === this.y;
    },

    positionX: x,

    positionY: y,

    range,

    scenery: true,

    zone: loc,
  };
};
