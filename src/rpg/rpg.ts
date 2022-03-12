"use strict";





// Authors can overide as desired
// @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
settings.attackOutputLevel = 10
// @ts-expect-error ts-migrate(2339) FIXME: Property 'output' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.output = function(reportTexts: any) {
  for (let el of reportTexts) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
    if (el.level <= settings.attackOutputLevel) {
      if (el.level === 1) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg(el.t)
      }
      else  if (el.level === 2) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        metamsg(el.t)
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msgPre(el.t)
      }
    }
  }
}



// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '() => void' is not assignable to... Remove this comment to see the full error message
settings.afterTurn.push(function() {
  for (const key in w) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const obj = w[key]
    
    

    // handle limited duration active effects
    if (obj.activeEffects) {
      for (let name of obj.activeEffects) {
        if (obj['countdown_' + name]) {
          obj['countdown_' + name]--
          if (obj['countdown_' + name] <= 0) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            msg(rpg.findEffect(name).terminate(obj))
          }
        }
      }
    }

    // handle limited duration summoned creatures
    if (obj.summonedCountdown) {
      obj.summonedCountdown--
      if (obj.summonedCountdown <= 0) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        if (obj.isHere()) msg("{nv:item:disappear:true}.", {item:obj})
        rpg.destroy(obj)
      }
    }
  }

  // Determine lighting and fog/smoke in room
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
  currentLocation.rpgLighting = game.dark ? rpg.DARK : rpg.LIGHT
  if (!currentLocation.rpgFog) currentLocation.rpgFog = 0
  let targetFog = currentLocation.defaultFog ? currentLocation.defaultFog : 0
  if (currentLocation.activeEffects) {
    for (const effectName of currentLocation.activeEffects) {
      const effect = rpg.findEffect(effectName)
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (effect.fogEffect) targetFog *= effect.fogEffect
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (effect.lightEffect) {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        if (effect.lightEffect === rpg.UTTERLIGHT) currentLocation.rpgLighting = rpg.UTTERLIGHT
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        if (effect.lightEffect === rpg.UTTERDARK && currentLocation.rpgLighting !== rpg.UTTERLIGHT) currentLocation.rpgLighting = rpg.UTTERDARK
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        if (effect.lightEffect === rpg.LIGHT && currentLocation.rpgLighting !== rpg.UTTERLIGHT && currentLocation.rpgLighting !== rpg.UTTERDARK) currentLocation.rpgLighting = rpg.DARK
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        if (effect.lightEffect === rpg.LIGHT && currentLocation.rpgLighting !== rpg.UTTERLIGHT && currentLocation.rpgLighting !== rpg.UTTERDARK && currentLocation.rpgLighting !== rpg.LIGHT) currentLocation.rpgLighting = rpg.DARK
      }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
    game.dark = (currentLocation.rpgLighting === rpg.UTTERDARK || currentLocation.rpgLighting === rpg.DARK) // !!! This could have bad consequences!
  }
  if (targetFog > currentLocation.rpgFog) currentLocation.rpgFog++
  if (targetFog < currentLocation.rpgFog) currentLocation.rpgFog--
  
})








class Effect {
  alias: any;
  finish: any;
  name: any;
  start: any;
  suppressFinishMsg: any;
  constructor(name: any, data: any, extra = {}) {
    this.name = name
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    for (let key in data) this[key] = data[key]
    if (!this.alias) this.alias = name
    for (const name of rpg.copyToEffect) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (extra[name]) this[name] = extra[name]
    }
    if (rpg.findEffect(this.name)) throw new Error("Effect name collision: " + this.name)
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'this' is not assignable to param... Remove this comment to see the full error message
    rpg.effectsList.push(this)
  }

  apply(attack: any, target: any, duration: any) {
    if (this.start) attack.msg(this.start(target), 1)
    if (duration) target['countdown_' + this.name] = duration
    if (!target.activeEffects.includes(this.name)) target.activeEffects.push(this.name)
  }

  terminate(target: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
    array.remove(target.activeEffects, this.name)
    delete target['countdown_' + this.name]
    let s
    if (this.finish) s = this.finish(target)
    if (this.suppressFinishMsg) return ''
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultEffectExpires' does not exist on ... Remove this comment to see the full error message
    if (!s) s = lang.defaultEffectExpires
    return processText(s, {effect:this, target:target})
  }
}





const rpg = {
  list:[],
  effectsList:[],
  copyToEffect:['element','visage'],
  add:function(skill: any) {
    //this.list.push(skill)
  },
  
  find:function(skillName: any) {
    skillName = skillName.toLowerCase()
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    return this.list.find(el => skillName === el.name.toLowerCase() || (el.regex && skillName.match(el.regex))) 
  },
  
  findSkill:function(skillName: any, suppressErrorMsg: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    const skill = this.list.find(el => skillName === el.name)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!skill && !suppressErrorMsg) return errormsg("Failed to find skill/spell: '" + skillName + "'")
    return skill
  },
  

  findEffect:function(name: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
    return this.effectsList.find(el => name === el.name)
  },

  defaultSkillTestUseable:function(char: any) { return true },
  defaultSkillAfterUse:function(attack: any, count: any) { },

  defaultSpellTestUseable:function(char: any) { return true },
  defaultSpellAfterUse:function(attack: any, count: any) { },

  broadcast:function(group: any, message: any, source: any, other: any) {
    for (const key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const o = w[key]
      if (o.signalGroups && o.signalGroups.includes(group)) {
        rpg.broadcastCommunication(o, message, source, other)
      }
    }
  },
  broadcastAll:function(message: any, source: any, other: any) {
    log(source.name)
    for (const key in w) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const o = w[key]
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'intersection' does not exist on type '{}... Remove this comment to see the full error message
      if (o.signalGroups && source.signalGroups && array.intersection(o.signalGroups, source.signalGroups).length) {
        log(o.name)
        rpg.broadcastCommunication(o, message, source, other)
      }
    }
  },
  broadcastCommunication:function(npc: any, message: any, source: any, other: any) {
    const name = 'signalResponse_' + message
    if (npc[name]) {
      npc[name].bind(npc)(source, other)
    }
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    else if (rpg[name]) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      rpg[name].bind(npc)(source, other)
    }
    else {
      log('WARNING: No response for ' + message)
    }
  },  
  
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  signalResponse_test:function(source: any) { msg("{nv:npc:receive:true} a message from {show:source}.", {npc:this, source:source})},
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'alert' does not exist on type '{ list: n... Remove this comment to see the full error message
  signalResponse_alert:function() { this.alert = true },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'asleep' does not exist on type '{ list: ... Remove this comment to see the full error message
  signalResponse_wake:function() { this.asleep = false },
  signalResponse_attack:function(source: any, target: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'aggressive' does not exist on type '{ li... Remove this comment to see the full error message
    this.aggressive = true
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type '{ list: ... Remove this comment to see the full error message
    this.target = target ? target.name : player.name
  },





  // These are only suitable for attacks the player (and allies) uses; do not use for foes, they will target each other!

  // Get a list of foes in the current room.
  // A foe is any NPC whose allegiance is NOT friend
  getFoes:function(target: any) { return rpg.handleGetting(target, function(o: any) { return o.allegiance !== 'friend' }, true); },
  getFoesBut:function(target: any) { return rpg.handleGetting(target, function(o: any) { return o.allegiance !== 'friend' }, false); },

  // Get a list of hostiles in the current room.
  // May not work without a parameter to isHostile.
  getHostiles:function(target: any) { return rpg.handleGetting(target, function(o: any) { return o.isHostile() }, true); },
  getHostilesBut:function(target: any) { return rpg.handleGetting(target, function(o: any) { return o.isHostile() }, false); },

  // Get a list of NPCs in the current room
  getAll:function(target: any) { return rpg.handleGetting(target, function() { return true }, true) },
  getAllBut:function(target: any) { return rpg.handleGetting(target, function() { return true }, false) },


  handleGetting:function(target: any, fn: any, includeTarget: any) {
    const l = scopeHereListed().filter(function(el) {
      return el.npc && fn(el) && el !== target;
    })
    if (target !== undefined && includeTarget) l.unshift(target)
    return l
  },


  pursueToAttack:function(target: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const exit = w[this.loc].findExit(target.loc)
    if (!exit) return false  // not in adjacent room, so give up
    // may want to check NPC can use that exit
    
    //log("Move " + npc.name + " to " + dest)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'movingMsg' does not exist on type '{ lis... Remove this comment to see the full error message
    this.movingMsg(exit) 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveChar' does not exist on type '{ list... Remove this comment to see the full error message
    this.moveChar(exit)
    return true
  },

  isSpellAvailable:function(char: any, spell: any) {
    for (let el of scopeHeldBy(char)) {
      if (el.spellsAvailableToLearn && el.spellsAvailableToLearn.includes(spell.name)) {
        return el
      }
    }
    return false
  },


  teleport:function(char: any, loc: any) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const oldLocation = w[char.loc]
    char.loc = loc
      
    if (char === player) {
      world.update()
      // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
      world.enterRoom(new Exit(loc, {origin:oldLocation, dir:'teleport', msg:lang.teleport}))
    }
  },

  destroy:function(obj: any) {
    if (obj.clonePrototype) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      delete w[obj.name]
    }
    else {
      delete obj.loc
    }
  },
  
  hasEffect:function(obj: any, effect: any) {
    if (!obj.activeEffects) return false
    if (typeof effect !== 'string') effect = effect.name
    return obj.activeEffects.includes(effect)
  },


  elements:{
    list:[
      {name:'fire', opposed:'frost'},
      {name:'frost', opposed:'fire'},

      {name:'storm', opposed:'earthmight'},
      {name:'earthmight', opposed:'storm'},

      {name:'shadow', opposed:'rainbow'},
      {name:'rainbow', opposed:'shadow'},

      {name:'divine', opposed:'necrotic'},
      {name:'necrotic', opposed:'divine'},

      {name:'chaos', opposed:'law'},
      {name:'law', opposed:'chaos'},

      {name:'life', opposed:'corruption'},
      {name:'corruption', opposed:'life'},
    ],
    
    opposed:function(s: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!s) errormsg("elements.opposed was sent something that evaluates to false (type is " + (typeof s) + ")")
      for (let el of this.list) {
        if (el.name === s) return el.opposed
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      errormsg("elements.opposed was sent an unrecognised element: " + s)
      return null
    },
  },
}















// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultExitUse' does not exist on type '... Remove this comment to see the full error message
util.defaultExitUse = function(char: any, exit: any) {
  if (!exit) exit = this
  if (char.testMove && !char.testMove(exit)) return false
  const guards = exit.isGuarded()
  if (guards && guards.length > 0) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(lang.wayGuarded, {exit:exit})
    for (const guard of guards) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      if (guard.guardingComment) msg(guard.guardingComment, {char:char})
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      if (guard.guardingReaction) msg(guard.guardingReaction(char, this))
    }
    return false
  }
  
  if (exit.isLocked()) {
    return falsemsg(exit.lockedmsg ? exit.lockedmsg : lang.locked_exit, {char:char, exit:exit})
  }
  if (exit.testExit && !exit.testExit(char, exit)) return false
  for (const el of char.getCarrying()) {
    if (el.testCarry && !el.testCarry({char:char, item:el, exit:exit})) return false
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'simpleUse' does not exist on type '{}'.
  return this.simpleUse ? this.simpleUse(char) : util.defaultSimpleExitUse(char, exit)
}






// do we need a dead attribute? is it an attribute of NPC? yes and no



// @ts-expect-error ts-migrate(2339) FIXME: Property 'ping' does not exist on type '{ debug: (... Remove this comment to see the full error message
agenda.ping = function() { log('ping'); return false }

// @ts-expect-error ts-migrate(2339) FIXME: Property 'guardExit' does not exist on type '{ deb... Remove this comment to see the full error message
agenda.guardExit = function(npc: any, arr: any) {
  npc.setGuardFromAgenda(arr)
  return false
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'guardScenery' does not exist on type '{ ... Remove this comment to see the full error message
agenda.guardScenery = function(npc: any, arr: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const item = w[arr.shift()]
  if (item.scenery) return false
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg(arr.join(':'))
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (item.loc && w[item.loc] && (w[item.loc].npc || w[item.loc].player)) npc.target = item.loc
  npc.antagonise(player)
  npc.delayAgendaAttack = true
  return true
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'guardSceneryNow' does not exist on type ... Remove this comment to see the full error message
agenda.guardSceneryNow = function(npc: any, arr: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const item = w[arr.shift()]
  if (item.scenery) return false
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg(arr.join(':'))
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (item.loc && w[item.loc] && (w[item.loc].npc || w[item.loc].player)) npc.target = item.loc
  npc.antagonise(player)
  return true
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'antagonise' does not exist on type '{ de... Remove this comment to see the full error message
agenda.antagonise = function(npc: any, arr: any) {
  if (arr.length === 0) {
    npc.antagonise(player)
  }
  else if (arr[0] === 'player') {
    npc.antagonise(player)
  }
  else if (arr[0] === 'target') {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    npc.antagonise(w[npc.target])
  }
  else {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const target = w[arr[0]]
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!target) return errormsg("Unknown target set for `antagonise` agenda item: " + arr[0])
    npc.antagonise(target)
  }
  return true
}





// @ts-expect-error ts-migrate(2339) FIXME: Property 'ongoingAttack' does not exist on type '{... Remove this comment to see the full error message
agenda.ongoingAttack = function(npc: any, arr: any) {
  const attack = npc.performAttack(arr)
  return typeof attack === 'boolean' ? attack : attack.target.dead
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'singleAttack' does not exist on type '{ ... Remove this comment to see the full error message
agenda.singleAttack = function(npc: any, arr: any) {
  npc.performAttack(arr)
  return true
}


  


