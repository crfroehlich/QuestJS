namespace Quest {
  export namespace RPG {
    const log = console.log;
    // Authors can overide as desired
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
    Quest.Settings.settings.attackOutputLevel = 10
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'output' does not exist on type '{ perfor... Remove this comment to see the full error message
    Quest.Settings.settings.output = function (reportTexts: any) {
      for (let el of reportTexts) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'attackOutputLevel' does not exist on typ... Remove this comment to see the full error message
        if (el.level <= Quest.Settings.settings.attackOutputLevel) {
          if (el.level === 1) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(el.t)
          }
          else if (el.level === 2) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.metamsg(el.t)
          }
          else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msgPre(el.t)
          }
        }
      }
    }

    Quest.Settings.settings.afterTurn.push(function () {
      for (const key in Quest.World.w) {
        const obj = Quest.World.w[key]
        // handle limited duration active effects
        if (obj.activeEffects) {
          for (let name of obj.activeEffects) {
            if (obj['countdown_' + name]) {
              obj['countdown_' + name]--
              if (obj['countdown_' + name] <= 0) {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(rpg.findEffect(name).terminate(obj))
              }
            }
          }
        }

        // handle limited duration summoned creatures
        if (obj.summonedCountdown) {
          obj.summonedCountdown--
          if (obj.summonedCountdown <= 0) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            if (obj.isHere()) Quest.IO.msg("{nv:item:disappear:true}.", { item: obj })
            rpg.destroy(obj)
          }
        }
      }

      // Determine lighting and fog/smoke in room
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
      Quest.World.currentLocation.rpgLighting = Quest.World.game.dark ? rpg.DARK : rpg.LIGHT
      if (!Quest.World.currentLocation.rpgFog) Quest.World.currentLocation.rpgFog = 0
      let targetFog = Quest.World.currentLocation.defaultFog ? Quest.World.currentLocation.defaultFog : 0
      if (Quest.World.currentLocation.activeEffects) {
        for (const effectName of Quest.World.currentLocation.activeEffects) {
          const effect = rpg.findEffect(effectName)
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          if (effect.fogEffect) targetFog *= effect.fogEffect
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          if (effect.lightEffect) {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            if (effect.lightEffect === rpg.UTTERLIGHT) Quest.World.currentLocation.rpgLighting = rpg.UTTERLIGHT
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            if (effect.lightEffect === rpg.UTTERDARK && Quest.World.currentLocation.rpgLighting !== rpg.UTTERLIGHT) Quest.World.currentLocation.rpgLighting = rpg.UTTERDARK
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            if (effect.lightEffect === rpg.LIGHT && Quest.World.currentLocation.rpgLighting !== rpg.UTTERLIGHT && Quest.World.currentLocation.rpgLighting !== rpg.UTTERDARK) Quest.World.currentLocation.rpgLighting = rpg.DARK
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            if (effect.lightEffect === rpg.LIGHT && Quest.World.currentLocation.rpgLighting !== rpg.UTTERLIGHT && Quest.World.currentLocation.rpgLighting !== rpg.UTTERDARK && Quest.World.currentLocation.rpgLighting !== rpg.LIGHT) Quest.World.currentLocation.rpgLighting = rpg.DARK
          }
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
        Quest.World.game.dark = (Quest.World.currentLocation.rpgLighting === rpg.UTTERDARK || Quest.World.currentLocation.rpgLighting === rpg.DARK) // !!! This could have bad consequences!
      }
      if (targetFog > Quest.World.currentLocation.rpgFog) Quest.World.currentLocation.rpgFog++
      if (targetFog < Quest.World.currentLocation.rpgFog) Quest.World.currentLocation.rpgFog--

    })

    export class Effect {
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
        Quest.Utilities.array.remove(target.activeEffects, this.name)
        delete target['countdown_' + this.name]
        let s
        if (this.finish) s = this.finish(target)
        if (this.suppressFinishMsg) return ''
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultEffectExpires' does not exist on ... Remove this comment to see the full error message
        if (!s) s = Quest.lang.defaultEffectExpires
        return Quest.Text.processText(s, { effect: this, target: target })
      }
    }

    export const rpg = {
      list: [],
      effectsList: [],
      copyToEffect: ['element', 'visage'],
      add: function (skill: any) {
        //this.list.push(skill)
      },

      find: function (skillName: any) {
        skillName = skillName.toLowerCase()
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
        return this.list.find(el => skillName === el.name.toLowerCase() || (el.regex && skillName.match(el.regex)))
      },

      findSkill: function (skillName: any, suppressErrorMsg: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
        const skill = this.list.find(el => skillName === el.name)
        if (!skill && !suppressErrorMsg) return Quest.IO.errormsg("Failed to find skill/spell: '" + skillName + "'")
        return skill
      },


      findEffect: function (name: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
        return this.effectsList.find(el => name === el.name)
      },

      defaultSkillTestUseable: function (char: any) { return true },
      defaultSkillAfterUse: function (attack: any, count: any) { },

      defaultSpellTestUseable: function (char: any) { return true },
      defaultSpellAfterUse: function (attack: any, count: any) { },

      broadcast: function (group: any, message: any, source: any, other: any) {
        for (const key in Quest.World.w) {
          const o = Quest.World.w[key]
          if (o.signalGroups && o.signalGroups.includes(group)) {
            rpg.broadcastCommunication(o, message, source, other)
          }
        }
      },
      broadcastAll: function (message: any, source: any, other: any) {
        log(source.name)
        for (const key in Quest.World.w) {
          const o = Quest.World.w[key]
          if (o.signalGroups && source.signalGroups && Quest.Utilities.array.intersection(o.signalGroups, source.signalGroups).length) {
            log(o.name)
            rpg.broadcastCommunication(o, message, source, other)
          }
        }
      },
      broadcastCommunication: function (npc: any, message: any, source: any, other: any) {
        const name = 'signalResponse_' + message
        if (npc[name]) {
          npc[name].bind(npc)(source, other)
        }
        else if (rpg[name]) {
          rpg[name].bind(npc)(source, other)
        }
        else {
          log('WARNING: No response for ' + message)
        }
      },

      signalResponse_test: function (source: any) { Quest.IO.msg("{nv:npc:receive:true} a message from {show:source}.", { npc: this, source: source }) },
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'alert' does not exist on type '{ list: n... Remove this comment to see the full error message
      signalResponse_alert: function () { this.alert = true },
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'asleep' does not exist on type '{ list: ... Remove this comment to see the full error message
      signalResponse_wake: function () { this.asleep = false },
      signalResponse_attack: function (source: any, target: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'aggressive' does not exist on type '{ li... Remove this comment to see the full error message
        this.aggressive = true
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type '{ list: ... Remove this comment to see the full error message
        this.target = target ? target.name : Quest.World.player.name
      },

      // These are only suitable for attacks the player (and allies) uses; do not use for foes, they will target each other!

      // Get a list of foes in the current room.
      // A foe is any NPC whose allegiance is NOT friend
      getFoes: function (target: any) { return rpg.handleGetting(target, function (o: any) { return o.allegiance !== 'friend' }, true); },
      getFoesBut: function (target: any) { return rpg.handleGetting(target, function (o: any) { return o.allegiance !== 'friend' }, false); },

      // Get a list of hostiles in the current room.
      // May not work without a parameter to isHostile.
      getHostiles: function (target: any) { return rpg.handleGetting(target, function (o: any) { return o.isHostile() }, true); },
      getHostilesBut: function (target: any) { return rpg.handleGetting(target, function (o: any) { return o.isHostile() }, false); },

      // Get a list of NPCs in the current room
      getAll: function (target: any) { return rpg.handleGetting(target, function () { return true }, true) },
      getAllBut: function (target: any) { return rpg.handleGetting(target, function () { return true }, false) },


      handleGetting: function (target: any, fn: any, includeTarget: any) {
        const l = Quest.Utilities.scopeHereListed().filter(function (el) {
          return el.npc && fn(el) && el !== target;
        })
        if (target !== undefined && includeTarget) l.unshift(target)
        return l
      },


      pursueToAttack: function (target: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const exit = Quest.World.w[this.loc].findExit(target.loc)
        if (!exit) return false  // not in adjacent room, so give up
        // may want to check NPC can use that exit

        //log("Move " + npc.name + " to " + dest)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'movingMsg' does not exist on type '{ lis... Remove this comment to see the full error message
        this.movingMsg(exit)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveChar' does not exist on type '{ list... Remove this comment to see the full error message
        this.moveChar(exit)
        return true
      },

      isSpellAvailable: function (char: any, spell: any) {
        for (let el of Quest.Utilities.scopeHeldBy(char)) {
          if (el.spellsAvailableToLearn && el.spellsAvailableToLearn.includes(spell.name)) {
            return el
          }
        }
        return false
      },


      teleport: function (char: any, loc: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const oldLocation = Quest.World.w[char.loc]
        char.loc = loc

        if (char === Quest.World.player) {
          Quest.World.world.update()
          // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
          Quest.World.world.enterRoom(new Quest.World.Exit(loc, { origin: oldLocation, dir: 'teleport', msg: Quest.lang.teleport }))
        }
      },

      destroy: function (obj: any) {
        if (obj.clonePrototype) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          delete Quest.World.w[obj.name]
        }
        else {
          delete obj.loc
        }
      },

      hasEffect: function (obj: any, effect: any) {
        if (!obj.activeEffects) return false
        if (typeof effect !== 'string') effect = effect.name
        return obj.activeEffects.includes(effect)
      },


      elements: {
        list: [
          { name: 'fire', opposed: 'frost' },
          { name: 'frost', opposed: 'fire' },

          { name: 'storm', opposed: 'earthmight' },
          { name: 'earthmight', opposed: 'storm' },

          { name: 'shadow', opposed: 'rainbow' },
          { name: 'rainbow', opposed: 'shadow' },

          { name: 'divine', opposed: 'necrotic' },
          { name: 'necrotic', opposed: 'divine' },

          { name: 'chaos', opposed: 'law' },
          { name: 'law', opposed: 'chaos' },

          { name: 'life', opposed: 'corruption' },
          { name: 'corruption', opposed: 'life' },
        ],

        opposed: function (s: any) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (!s) Quest.IO.errormsg("elements.opposed was sent something that evaluates to false (type is " + (typeof s) + ")")
          for (let el of this.list) {
            if (el.name === s) return el.opposed
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg("elements.opposed was sent an unrecognised element: " + s)
          return null
        },
      },
    }

    Quest.Utilities.util.defaultExitUse = function (char: any, exit: any) {
      if (!exit) exit = this
      if (char.testMove && !char.testMove(exit)) return false
      const guards = exit.isGuarded()
      if (guards && guards.length > 0) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(Quest.lang.wayGuarded, { exit: exit })
        for (const guard of guards) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          if (guard.guardingComment) Quest.IO.msg(guard.guardingComment, { char: char })
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          if (guard.guardingReaction) Quest.IO.msg(guard.guardingReaction(char, this))
        }
        return false
      }

      if (exit.isLocked()) {
        return Quest.IO.falsemsg(exit.lockedmsg ? exit.lockedmsg : Quest.lang.locked_exit, { char: char, exit: exit })
      }
      if (exit.testExit && !exit.testExit(char, exit)) return false
      for (const el of char.getCarrying()) {
        if (el.testCarry && !el.testCarry({ char: char, item: el, exit: exit })) return false
      }
      return this.simpleUse ? this.simpleUse(char) : Quest.Utilities.util.defaultSimpleExitUse(char, exit)
    }

    // do we need a dead attribute? is it an attribute of NPC? yes and no

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ping' does not exist on type '{ debug: (... Remove this comment to see the full error message
    Quest.NPC.agenda.ping = function () { log('ping'); return false }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'guardExit' does not exist on type '{ deb... Remove this comment to see the full error message
    Quest.NPC.agenda.guardExit = function (npc: any, arr: any) {
      npc.setGuardFromAgenda(arr)
      return false
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'guardScenery' does not exist on type '{ ... Remove this comment to see the full error message
    Quest.NPC.agenda.guardScenery = function (npc: any, arr: any) {
      const item = Quest.World.w[arr.shift()]
      if (item.scenery) return false
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(arr.join(':'))
      if (item.loc && Quest.World.w[item.loc] && (Quest.World.w[item.loc].npc || Quest.World.w[item.loc].player)) npc.target = item.loc
      npc.antagonise(Quest.World.player)
      npc.delayAgendaAttack = true
      return true
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'guardSceneryNow' does not exist on type ... Remove this comment to see the full error message
    Quest.NPC.agenda.guardSceneryNow = function (npc: any, arr: any) {
      const item = Quest.World.w[arr.shift()]
      if (item.scenery) return false
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(arr.join(':'))
      if (item.loc && Quest.World.w[item.loc] && (Quest.World.w[item.loc].npc || Quest.World.w[item.loc].player)) npc.target = item.loc
      npc.antagonise(Quest.World.player)
      return true
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'antagonise' does not exist on type '{ de... Remove this comment to see the full error message
    Quest.NPC.agenda.antagonise = function (npc: any, arr: any) {
      if (arr.length === 0) {
        npc.antagonise(Quest.World.player)
      }
      else if (arr[0] === 'player') {
        npc.antagonise(Quest.World.player)
      }
      else if (arr[0] === 'target') {
        npc.antagonise(Quest.World.w[npc.target])
      }
      else {
        const target = Quest.World.w[arr[0]]
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!target) return Quest.IO.errormsg("Unknown target set for `antagonise` agenda item: " + arr[0])
        npc.antagonise(target)
      }
      return true
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ongoingAttack' does not exist on type '{... Remove this comment to see the full error message
    Quest.NPC.agenda.ongoingAttack = function (npc: any, arr: any) {
      const attack = npc.performAttack(arr)
      return typeof attack === 'boolean' ? attack : attack.target.dead
    }

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'singleAttack' does not exist on type '{ ... Remove this comment to see the full error message
    Quest.NPC.agenda.singleAttack = function (npc: any, arr: any) {
      npc.performAttack(arr)
      return true
    }
  }
}