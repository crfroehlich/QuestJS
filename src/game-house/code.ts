"use strict"


// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'walkthroug... Remove this comment to see the full error message
const walkthroughs = {
  telescope: [
    "x t", "x ceiling", "u", "north", "west", "d",
    "push lever",
    "x t", "x ceiling", "u", "north", "west", "d",
    "push lever",
    "turn left left", "turn left left", "turn left left",
    "x t", "x ceiling", "u", "x ceiling", "north", "west", "d",
    "push lever",
    "x t", "x ceiling", "u", "north", "west", "d",
    "push lever",
    "turn right left", "turn right left", "turn right left", "turn right left", "turn right left",
    "x t", "x ceiling", "u", "x ceiling", "north", "west", "d",
    "push lever",
    "x t", "x ceiling", "u", "x ceiling", "north", "west",
  ],
  c: [
    "x book",
    "x Antony",
    "x Antony and Cleopatra",
    "x book",
    "x book",
    "x othello",
    "x Antony",
    "north",
    "south",
    "east",
    "knock on door",
    "knock on door",
    "look through door",
    "east",
    "west",
    "get letter",
    "drop letter",
    "read letter",
    "open letter",
    "put letter in bag",
    "east",
    "x door",
    "look through door",
    "east",
    // inside house
    "south",
    "north",
    "south",
    "north",
    "x fireplace",
    "x clock",
    "x key",
    "get key",
    "wind clock",
    // got key
    "south",
    "x win",
    "south",
    "x window",
    "smash window",
    "north",
    "smash window",
    "l",
    "get shard",
    // got shard
    "x window",
    "east",
    "northeast",
    "x cab",
    "x cracks",
    "north",
    "southwest",
    "west",
    "south",
    "east",
    "x cab",
    "shift cab",
    "west",
    "north",
    "east",
    "northeast",
    "x cab",
    "x cracks",
    "north",
    "get boots",
    // got boots
    "south",
    "southwest",
    "drop boots",
    "west",
    "south",
    "east",
    "*get small boots",
    "get boots",
    "west",
    "north",
    "south",
    "south",
    "x win",
    "east",
    "east",
    "east",
    "x boots",
    "north",
    "ask man about house",
    "open dolls",
    "x dolls",
    "x man",
    "get balloon",
    "talk to man",
    "give boots to man",
    "ask man about boots",
    "get balloon",
    "give boots to man",
    "wait",
    "wait",
    "get balloon",
    "get boots",
    // boots fixed
    "x boots",
    "south",
    "down",
    "down",
    "x coil",
    // get wire
    "get wire",
    "x wire",
    "u",
    "up",


    // "u",
    // "d",
    // "north",
    // "drop wire",
    // "south",
    // "get wire",
    // "north",
    // "south",


    // "east",
    // "south",
    // "south",
    // "east",
    // "drop wire",




    "south",
    "get pot",
    "x pot",
    "l",
    "north",
    "up",
    // the telescope
    "x tel",
    "use tel",
    "push lever",
    "look through t",
    "pull lever",
    "pull lever",
    "turn left left",
    "turn left left",
    "turn left right",
    "x tel",
    "turn left left",
    "turn left left",
    "turn right right",
    "turn right left",
    "turn right left",
    "turn right left",
    "climb",
    "east",
    "west",
    "west",
    "drop pot",
    "tie wire to vane",
    "east",
    "east",
    "d",
    "down",
    "down",
    "down",
    // Patch animated
    "Look at animated corpse",
    "give boots to patch",  // too small
    "get boots",
    "up",
    "up",
    "west",
    "x tree",
    "get pod",
    "west",
    "west",
    "north",
    "east",
    "drop boots",
    "west",
    "north",
    "east",
    // get boots
    "get boots",
    "west",
    "south",
    "east",
    "x boots",
    "drop boots",
    "west",
    "north",
    "east",
    // go inside boots
    "in",
    "get card",
    "x card",
    "read card",
    "l",
    "out",
    "drop card",
    "west",
    "south",
    "east",
    "take boots",
    // got boots
    "take paper",
    "x paper",
    "west",
    "south",
    "east",
    "east",
    "east",
    "down",
    "down",
    "x strange device",
    "give boots to patch",
    "x strange  device",
    "p,follow",
    "up",


    // "west",
    // "west",
    // "west",
    // "west",
    // "patch,get grate",
    // "put pot under leak",
    // "east",
    // "patch,wait",
    // "west",

    "up",
    "west",
    "west",
    "west",
    "in",
    "east",
    "east",
    "east",
    "down",
    "west",
    "patch,wait",
    "west",
    "west",
    "in",
    "out",
    "east",
    "east",
    "east",
    "up",
    "east",
    "south",
    "south",
    "west",
    "nw",
    "west",
    "x man",
    "use key",
    "se",
    "east",
    "get phone from bag",
    "east",
    "drop phone",
    "drop key",
    "west",
    "north",
    "east",
    "x key",
    "x phone",
    "get all",
    "west",
    "south",
    "west",
    "sw",
    "x man",
    "put key in man",
    "wind up man",
    "talk to man",
    "ne",
    "east",
    "south",
    "east",
    "east",
    "east",
    "x hamlet",
    "west",
    "west",
    "west",
    "north",
    "west",
    "nw",
    "talk to man",
    "ne",
    "east",
    "north",
    "turn king",
    "turn knight",
    "turn horse",
    "fill pot",
    "south",
    "fill pot",
    "south",
    "x pot",
    "sw",
    "x boat",
    "x oar",
    "get oar",
    "ne",
    "north",
    "turn horse",
    "south",
    "south",
    "east",
    "east",
    "get pod",
    "get tree",
    "get tree",
    "east",
    "down",
    "west",
    "patch,open pod",
    "patch,give me pod",
    "west",
    "plant pod",
    "open pod",
    // plant seeds, hourglass normal size
    "plant 1 seeds in ground",
    "turn ho",
    "wait",
    "wait",
    "climb tree",
    "wait",
    "get ho",
    "turn ho",
    "wait",
    "turn ho",
    "wait",
    "west",
    "west",
    "west",
    "south",
    "east",
    "west",
    "south",
    "east",
    "drop pot",
    "drop h",
    "west",
    "north",
    "east",
    "get all",
    "west",
    "south",
    "east",
    "drop ho",
    "drop pot",
    "west",
    "north",
    "east",
    "get po",
    "pour sand into ho",
    "x ho",
    "pour sand into ho",
    "pour po into ho",
    "west",
    "south",
    "east",
    "get ho",
    "west",
    "north",
    "north",
    "east",
    "east",
    "east",
    "climb",
    "turn ho",
    "wait",
    "wait",
    "put ho on ped",
    "wait",
    "wait",
    "wait",
    "climb tree",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "up",
    "d",
    "plant 2 seeds",
    "turn ho",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "wait",
    "east",
    "east",
    "up",
    "west",
    "west",
    "southwest",
    "southwest",
    "out",
    "ask mal about escape",
    "talk to mal",
    "get letter from bag",
    "give letter to mal",
    "x i",
    "ask mal about einstein",
    "read i",
    "ask mal about einstein",
    "north",
    "say north",
    "say in",
    "talk to house",
    "ask house about riddle",
    "ask house about mal",
    "ask house about einstein",
    "talk to house",
    "say fkgjgh",
    "say one",
    "west",
    /**/
  ],
  a: [
    "north",
    "south",
    "x house",
    "script walk",
    "go in house",
    "x house",
    "enter house",
    "out",
    "get letter",
    "enter house",
    "enter house",
    "north",
    "x clock",
    "wind clock",
    "i",
    "x uniform",
    "x book",
    "west",
    "west",
    "west",
    "west",
    "north",
    "east",
    "northeast",
    "x hole",
    "x bureau",
    "climb bureau",
    "southwest",
    "west",
    "north",
    "east",
    "move bureau",
    "drop key",
    "west",
    "south",
    "east",
    "get key",
    "northeast",
    "in",
    "get boots",
    "l",
    "south",
    "southwest",
    "west",
    "west",
    "southwest",
    "x uniform",
    "x mannequin",
    "wind man",
    "ask man about himself",
    "ask man about house",
    "ask man about riddle",
    "ask man about hamlet",
    "ask man about shakespeare",
    "x book",
    "read book",
    "southeast",
    "east",
    "east",
    "west",
    "south",
    "read book",
    "x uniform",
    "script walk",
  ],
}


// this version allows quotes in aliases
// @ts-expect-error ts-migrate(2339) FIXME: Property 'itemSetup' does not exist on type '{}'.
parser.itemSetup = function (item: any) {
  item.parserOptionsSet = true
  item.parserItemName = item.alias.toLowerCase().replace(/[^\w ]/g, '')
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'combos' does not exist on type '{}'.
  item.parserItemNameParts = Quest.Utilities.array.combos(item.parserItemName.split(' '))
  if (item.pattern) {
    if (!item.regex) item.regex = new RegExp("^(" + item.pattern + ")$")
    if (!item.synonyms) item.synonyms = item.pattern.split('|')
  }

  let list = [item.alias.toLowerCase().replace(/[^\w ]/g, '')]
  if (item.synonyms) {
    for (const el of item.synonyms) {
      const s = el.toLowerCase().replace(/[^\w ]/g, '')
      list.push(s)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'combos' does not exist on type '{}'.
      list = list.concat(Quest.Utilities.array.combos(s.split(' ')))
    }
    item.parserItemNameParts = item.parserItemNameParts.concat([...new Set(list)])
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
    Quest.Utilities.array.remove(item.parserItemNameParts, 'and')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
    Quest.Utilities.array.remove(item.parserItemNameParts, 'of')
  }
}

/*
parser.specialText.integer = {
  error:function(text) {
    return false
  },
  exec:function(text) {
    return parseInt(text)
  },
}
*/




//  ----------- SUPPORT FOR ZONES ---------------------------

const zones = {}
let zone

const register = function (name: any, data: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
  w.uniform.uniforms[name] = data.uniform
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shakespeare_book' does not exist on type... Remove this comment to see the full error message
  w.shakespeare_book.names[name] = data.book
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  zones[name] = data
  zone = name
}




//  ----------- SUPPORT FOR SIZE-CHANGING ---------------------------

// Default to five; original defaulted to zero

const sizes = {
  1: 'xxsmall',
  2: 'xsmall',
  3: 'vsmall',
  4: 'small',
  5: 'int',
  6: 'big',
  7: 'vbig',
  8: 'xbig',
  9: 'xxbig',
}
const sizeAdjectives = {
  1: 'too-tiny-to-see',
  2: 'minute',
  3: 'tiny',
  4: 'small',
  5: '',
  6: 'big',
  7: 'huge',
  8: 'enormous',
  9: 'gargantuan',
}








const SIZE_CHANGING = function () {
  const res = Object.assign({}, TAKEABLE_DICTIONARY)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'size_changing' does not exist on type '{... Remove this comment to see the full error message
  res.size_changing = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ afterCre... Remove this comment to see the full error message
  res.size = 5
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'minsize' does not exist on type '{ after... Remove this comment to see the full error message
  res.minsize = 4
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'maxsize' does not exist on type '{ after... Remove this comment to see the full error message
  res.maxsize = 6

  res.afterCreation = function (o) {
    o.basealias = o.alias
    if (!o.desc5) log("WARNING: Size changer " + o.name + " has no desc5.")
    if (o.desc4) o.minsize = 3
    if (o.desc3) o.minsize = 2
    if (o.desc2) o.minsize = 1
    if (o.desc1) o.minsize = 0
    if (o.desc6) o.maxsize = 7
    if (o.desc7) o.maxsize = 8
    if (o.desc8) o.maxsize = 9
    if (o.desc9) o.maxsize = 10
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'examine' does not exist on type '{ after... Remove this comment to see the full error message
  res.examine = function (options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ afterCre... Remove this comment to see the full error message
    if (this.size === this.minsize) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("{nv:item:be:true} too tiny to see properly!", { item: this })
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ afterCre... Remove this comment to see the full error message
    else if (this.size === this.maxsize) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("{nv:item:be:true} of gigantic proportions!", { item: this })
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(this['desc' + this.size])
    }
    return true
  }

  res.take = function (options) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ after... Remove this comment to see the full error message
    if (this.isAtLoc(options.char.name)) {
      return falsemsg(Quest.lang.already_have, options)
    }
    if (!options.char.testManipulate(this, "take")) return false

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ afterCre... Remove this comment to see the full error message
    if (this.size === this.maxsize) {
      return falsemsg("{nv:item:be:true} far too big to pick up.", { item: this })
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ afterCre... Remove this comment to see the full error message
    else if (this.size === this.minsize) {
      return falsemsg("Mandy tries to pick up {nm:item:the}, but {pv:item:be} too tiny for her fingers to grasp.", { item: this })
    }

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(this.msgTake, options)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveToFrom' does not exist on type '{ af... Remove this comment to see the full error message
    this.moveToFrom(options, "name", "loc")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ after... Remove this comment to see the full error message
    if (this.scenery) this.scenery = false
    return true
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shrink' does not exist on type '{ afterC... Remove this comment to see the full error message
  res.shrink = function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ afterCre... Remove this comment to see the full error message
    this.size--
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setAlias' does not exist on type '{ afte... Remove this comment to see the full error message
    this.setAlias(this.size === 5 ? this.basealias : sizeAdjectives[this.size] + ' ' + this.basealias)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSizeChange' does not exist on type ... Remove this comment to see the full error message
    if (this.afterSizeChange) this.afterSizeChange()
  }

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grow' does not exist on type '{ afterCre... Remove this comment to see the full error message
  res.grow = function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'size' does not exist on type '{ afterCre... Remove this comment to see the full error message
    this.size++
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'setAlias' does not exist on type '{ afte... Remove this comment to see the full error message
    this.setAlias(this.size === 5 ? this.basealias : sizeAdjectives[this.size] + ' ' + this.basealias)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSizeChange' does not exist on type ... Remove this comment to see the full error message
    if (this.afterSizeChange) this.afterSizeChange()
  }

  return res;
}













