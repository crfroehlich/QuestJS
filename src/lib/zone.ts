"use strict";


Quest.Settings.settings.saveLoadExcludedAtts.push("zoneExits")
Quest.Settings.settings.saveLoadExcludedAtts.push("zoneDescs")

const zoneExit = function (this: any, char: any, exit: any) {
  if (!exit) exit = this
  const newX = char.positionX + this.data.x
  const newY = char.positionY + this.data.y
  const dir = exit.dir

  // zoneExits to other places
  for (let el of this.origin.zoneExits) {
    if (char.positionX === el.x && char.positionY === el.y && dir === el.dir) {
      const tpParams = { char: char, dir: dir }
      if (el.blocking) return falsemsg(el.blockedmsg || lang.not_that_way, tpParams)
      if (el.isLocked) return falsemsg(el.lockedmsg || lang.locked_exit, tpParams)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(el.msg || lang.go_successful, tpParams)
      this.origin.afterZoneEixit(dir)
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      char.moveChar(new Exit(el.dest, exit))
      return true
    }
  }

  // If the direction is "in", "up", or "down", just say no
  if (this.origin.defaultToBlocked || this.data.type !== 'compass') return failedmsg(lang.not_that_way, { char: char, dir: this.dir })


  // Check if a feature blocks the way
  for (let name in w) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const o = w[name]
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (o.zone === this.origin.name && newX === o.x && newY === o.y && o.featureNoExit) return falsemsg(o.featureNoExit.replace('#', dir))
  }

  // Check if this would cross a border
  for (let el of this.origin.getBorders()) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (el.border(newX, newY)) return falsemsg(el.borderMsg.replace('#', dir))
  }

  // Handle objects at the old location
  this.origin.afterZoneEixit(dir)

  // More the player
  char.positionX = newX
  char.positionY = newY
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg(lang.stop_posture(char));
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  msg(lang.go_successful, { char: char, dir: dir });
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  char.moveChar(new Exit(this.origin.name, exit))

  return true;
};

const ZONE = function (defaultToBlocked: any) {
  const res = {
    zoneExits: [],
    zone: true,
    defaultToBlocked: defaultToBlocked,
    // The below are all defaults for map drawing
    insideColour: 'yellow',
    outsideColour: 'silver',
    featureColour: 'blue',
    playerColour: 'black',
    mapCells: [],
    mapFeatures: [],
    mapLabels: [],
    cellSize: 16,
    mapBorder: true,
    mapFont: '12px sans-serif',
  }

  for (let ex of lang.exit_list) {
    if (ex.type === 'nocmd') continue
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    res[ex.name] = new Exit("_", { use: zoneExit, data: ex })
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getExitObjs' does not exist on type '{ z... Remove this comment to see the full error message
  res.getExitObjs = function (options: any) {
    const zoneExits = []
    for (let ex of lang.exit_list) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasExit' does not exist on type '{ zoneE... Remove this comment to see the full error message
      if (ex.type !== 'nocmd' && this.hasExit(ex.name, options)) zoneExits.push(ex)
    }
    return zoneExits
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hasExit' does not exist on type '{ zoneE... Remove this comment to see the full error message
  res.hasExit = function (dir: any, options: any) {
    if (options === undefined) options = {};
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!this[dir]) return false;

    // Check for special exit
    for (let el of this.zoneExits) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'x' does not exist on type 'never'.
      if (player.positionX === el.x && player.positionY === el.y && dir === el.dir) {
        //console.log("found special")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'blocking' does not exist on type 'never'... Remove this comment to see the full error message
        if (el.blocking) return false
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLocked' does not exist on type 'never'... Remove this comment to see the full error message
        if (options.excludeLocked && el.isLocked) return false
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scenery' does not exist on type 'never'.
        if (options.excludeScenery && el.scenery) return false
        //console.log("it is good")
        return true
      }
    }

    // Non-compass directions not allowed
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (this.defaultToBlocked || this[dir].data.type !== 'compass') {
      return false
    }

    // Check if this would cross a border
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const newX = player.positionX + this[dir].data.x
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const newY = player.positionY + this[dir].data.y
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBorders' does not exist on type '{ zo... Remove this comment to see the full error message
    for (let el of this.getBorders()) {
      if (el.borderMsg !== undefined) continue
      if (el.border(newX, newY)) {
        return false
      }
    }

    return true
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'desc' does not exist on type '{ zoneExit... Remove this comment to see the full error message
  res.desc = function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'zoneDescs' does not exist on type '{ zon... Remove this comment to see the full error message
    for (let el of this.zoneDescs) {
      if (el.when !== undefined) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDesc' does not exist on type '{ zoneE... Remove this comment to see the full error message
        if (el.when(player.positionX, player.positionY)) return this.getDesc(el)
      }
      else if (el.x !== undefined) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDesc' does not exist on type '{ zoneE... Remove this comment to see the full error message
        if (el.x === player.positionX && el.y === player.positionY) return this.getDesc(el)
      }
      else {
        //console.log(el)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDesc' does not exist on type '{ zoneE... Remove this comment to see the full error message
        return this.getDesc(el)
      }
    }
    return "ERROR: No description found for zone at x=" + player.positionX + ", y=" + player.positionY
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDesc' does not exist on type '{ zoneE... Remove this comment to see the full error message
  res.getDesc = function (el: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getFeatureDescs' does not exist on type ... Remove this comment to see the full error message
    return (typeof el.desc === 'function' ? el.desc() : el.desc) + this.getFeatureDescs()
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterZoneEixit' does not exist on type '... Remove this comment to see the full error message
  res.afterZoneEixit = function (dir: any) {
    for (let name in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const o = w[name]
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      if (o.loc === this.name && o !== player) {
        o.loc = false
        o.positionX = player.positionX
        o.positionY = player.positionY
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
        o.zoneElsewhere = this.name
      }
    }
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getFeatureDescs' does not exist on type ... Remove this comment to see the full error message
  res.getFeatureDescs = function () {
    let s = ''
    for (let name in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const el = w[name]
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      if (el.zone !== this.name || el.zoneBorder) continue
      if (player.positionX === el.positionX && player.positionY === el.positionY && el.featureLookHere) {
        s += ' ' + el.featureLookHere
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDirection' does not exist on type '{ ... Remove this comment to see the full error message
        const d = this.getDirection(player, el.positionX, el.positionY, el.range)
        if (d) s += ' ' + el.featureLook.replace('#', d)
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBorders' does not exist on type '{ zo... Remove this comment to see the full error message
    for (let el of this.getBorders()) {
      if (el.isAdjacentTo(player) && el.borderDesc) s += ' ' + el.borderDesc
    }
    return s
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'beforeEnter' does not exist on type '{ z... Remove this comment to see the full error message
  res.beforeEnter = function () {
    if (player.positionX === undefined) player.positionX = 0
    if (player.positionY === undefined) player.positionY = 0
    for (let name in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const o = w[name]
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      if (o.zoneElsewhere === this.name && o.positionX === player.positionX && o.positionY === player.positionY) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
        o.loc = this.name
        o.zoneElsewhere = false
      }
    }
  }

  // Gets the compass direction from that char to the given co-ordinate
  // If range is given, will return false if the distance is greater than that
  // No guarantee what will happen if the char is at at the coordinates
  // (because of the way floats are handled it may not be accurate/reliable)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDirection' does not exist on type '{ ... Remove this comment to see the full error message
  res.getDirection = function (char: any, objX: any, objY: any, range: any) {
    const x = objX - char.positionX
    const y = objY - char.positionY
    const r = Math.sqrt(x * x + y * y)
    if (range && r > range) return false
    const theta = Math.atan(y / x) * 180 / Math.PI
    if (x > 0 && theta <= 22.5 && theta >= -22.5) return lang.exit_list[7].name
    if (x > 0 && theta <= 67.5 && theta >= 22.5) return lang.exit_list[2].name
    if (x > 0 && theta >= -67.5 && theta <= -22.5) return lang.exit_list[12].name

    if (x < 0 && theta <= 22.5 && theta >= -22.5) return lang.exit_list[5].name
    if (x < 0 && theta <= 67.5 && theta >= 22.5) return lang.exit_list[10].name
    if (x < 0 && theta >= -67.5 && theta <= -22.5) return lang.exit_list[0].name

    return y > 0 ? lang.exit_list[1].name : lang.exit_list[11].name
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBorders' does not exist on type '{ zo... Remove this comment to see the full error message
  res.getBorders = function () {
    const borders = []
    // @ts-expect-error ts-migrate(2588) FIXME: Cannot assign to 'name' because it is a constant.
    for (name in w) {
      // @ts-expect-error ts-migrate(2538) FIXME: Type 'void' cannot be used as an index type.
      if (w[name].zoneBorder && w[name].zone === this.name) borders.push(w[name])
    }
    return borders
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBorderAt' does not exist on type '{ z... Remove this comment to see the full error message
  res.getBorderAt = function (x: any, y: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBorders' does not exist on type '{ zo... Remove this comment to see the full error message
    for (let el of this.getBorders()) {
      if (el.border(x, y)) {
        return el
      }
    }
    return false
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getFeatureAt' does not exist on type '{ ... Remove this comment to see the full error message
  res.getFeatureAt = function (x: any, y: any) {
    for (let name in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const el = w[name]
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      if (el.zone !== this.name || el.zoneBorder) continue
      if (x === el.positionX && y === el.positionY) {
        return el
      }
    }
    return false
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'drawMap' does not exist on type '{ zoneE... Remove this comment to see the full error message
  res.drawMap = function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    if (this.size === undefined) return false
    const cells = []
    const features = []
    const labels = []
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    for (let x = -this.size; x <= this.size; x++) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
      for (let y = -this.size; y <= this.size; y++) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
        const x2 = (this.size + x) * this.cellSize
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
        const y2 = (this.size - y) * this.cellSize
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getBorderAt' does not exist on type '{ z... Remove this comment to see the full error message
        if (this.getBorderAt(x, y)) {
          cells.push('<rect x="' + x2 + '" y="' + y2 + '" width="' + this.cellSize + '" height="' + this.cellSize + '" stroke="none" fill="' + this.outsideColour + '"/>')
        }
        else {
          cells.push('<rect x="' + x2 + '" y="' + y2 + '" width="' + this.cellSize + '" height="' + this.cellSize + '" stroke="none" fill="' + this.insideColour + '"/>')
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getFeatureAt' does not exist on type '{ ... Remove this comment to see the full error message
        const feature = this.getFeatureAt(x, y)
        if (feature) {
          const colour = feature.zoneColour || this.featureColour
          features.push('<circle cx="' + (x2 + this.cellSize / 2) + '" cy="' + (y2 + this.cellSize / 2) + '" r="' + (this.cellSize / 2 - 1) + '" stroke="none" fill="' + colour + '"/>')
          if (feature.zoneMapName) labels.push('<text x="' + (x2 + this.cellSize) + '" y="' + (y2 + 5) + '" style="font: ' + this.mapFont + '; fill: black;">' + feature.zoneMapName + '</text>')
        }
      }
    }

    const map = cells.concat(this.mapCells, features, this.mapFeatures, labels, this.mapLabels)

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    const x2 = (this.size + player.positionX) * this.cellSize
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    const y2 = (this.size - player.positionY) * this.cellSize
    map.push('<rect x="' + (x2 + 4) + '" y="' + (y2 + 4) + '" width="' + (this.cellSize - 8) + '" height="' + (this.cellSize - 8) + '" stroke="none" fill="' + this.playerColour + '"/>')

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ zoneExit... Remove this comment to see the full error message
    const svgSize = (this.size * 2 + 1) * this.cellSize
    if (this.mapBorder) map.push('<rect x="0" y="0" width="' + svgSize + '" height="' + svgSize + '" stroke="black" fill="none"/>')
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    draw(svgSize, svgSize, map)
    return true
  }

  return res;
}



const ZONE_BORDER = function (loc: any) {
  const res = {
    zoneBorder: true,
    zone: loc,
    isLocatedAt: function (loc: any) {
      return this.isAdjacentTo(player)
    },
    isAdjacentTo: function (char: any) {
      if (char.loc !== this.zone) return false
      for (let x = char.positionX - 1; x <= char.positionX + 1; x++) {
        for (let y = char.positionY - 1; y <= char.positionY + 1; y++) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'border' does not exist on type '{ zoneBo... Remove this comment to see the full error message
          if (this.border(x, y)) return true
        }
      }
      return false
    },
  };
  return res;
}

const ZONE_ITEM = function (loc: any, x: any, y: any) {
  const res = { positionX: x, positionY: y, zoneElsewhere: loc, };
  return res;
}

const ZONE_FEATURE = function (loc: any, x: any, y: any, range: any, adjacent: any) {
  const res = {
    positionX: x, positionY: y, range: range, adjacent: adjacent, zone: loc, scenery: true,
    // @ts-expect-error ts-migrate(7023) FIXME: 'isLocatedAt' implicitly has return type 'any' bec... Remove this comment to see the full error message
    isLocatedAt: function (loc: any) {
      if (adjacent) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'x' does not exist on type '{ positionX: ... Remove this comment to see the full error message
        return loc === this.zone && Math.abs(player.positionX - this.x) < 2 && Math.abs(player.positionY - this.y) < 2
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'x' does not exist on type '{ positionX: ... Remove this comment to see the full error message
        return loc === this.zone && player.positionX === this.x && player.positionY === this.y
      }
    }
  };
  return res;
}

