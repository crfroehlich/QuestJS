"use strict";



// The Attack object is used when someone casts a spell or makes a weapon or unarmed attack.
// The target could be the attacker, the room, a weapon or other item, or a number of characters.
// The Attack object should only be created once we are sure the command is successful
// (that is, the player input is okay - we can still throw errors if the code is wrong!).
// The Attack object may get modified at several points in the process,
// each can add to the reportTexts array to say what it has done
// If the primaryTargets is false, the target is the attacker himself
class Attack {
  abort: any;
  armourModifier: any;
  armourMultiplier: any;
  attackNumber: any;
  attacker: any;
  damageMultiplier: any;
  damageNumber: any;
  defensiveBonus: any;
  element: any;
  modifiedDamage: any;
  notAnAttack: any;
  offensiveBonus: any;
  primaryFailure: any;
  primarySuccess: any;
  primaryTargets: any;
  prototype: any;
  reportTexts: any;
  result: any;
  roll: any;
  secondaryDamageMultiplier: any;
  secondaryFailure: any;
  secondarySuccess: any;
  secondaryTargets: any;
  skill: any;
  target: any;
  weapon: any;
  // The attacker is performing the attack
  // The target is who it is directed at, but others could be affected; can be undefined if the skill allows
  // The skill is also optional, a default one will be used
  // The source is the magic item the spell was cast from
  static createAttack(attacker: any, target: any, skill: any, source: any) {
    const attack = new Attack()
    
    attack.attacker = attacker
    attack.skill = skill
    attack.target = target
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'source' does not exist on type 'Attack'.
    attack.source = source
    
    // Find the skill
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSkill' does not exist on type '{ list... Remove this comment to see the full error message
    if (attacker === player && skill === undefined && rpg.getSkill) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSkill' does not exist on type '{ list... Remove this comment to see the full error message
      attack.skill = rpg.getSkill()
      // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'skillUI'. Did you mean 'skill'?
      skillUI.resetButtons()
    }
    if (!attack.skill) attack.skill = defaultSkill
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'reportText' does not exist on type 'Atta... Remove this comment to see the full error message
    attack.reportText = (source && source.reportText) ? source.reportText : attack.skill.reportText

    if (!attack.skill.testUseable(attack.attacker)) return false

    // Set targets
    if (attack.skill.noTarget) {
      attack.primaryTargets = attack.skill.getPrimaryTargets ? attack.skill.getPrimaryTargets(undefined, attack) : [attack.attacker]
    }
    else {
      attack.primaryTargets = attack.skill.getPrimaryTargets ? attack.skill.getPrimaryTargets(target, attack) : [target]
    }
    attack.secondaryTargets = attack.skill.getSecondaryTargets ? attack.skill.getSecondaryTargets(target, attack) : []
    
    if (attack.primaryTargets.length === 0) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'noTarget' does not exist on type '{ rege... Remove this comment to see the full error message
      return falsemsg(attack.skill.msgNoTarget ? attack.skill.msgNoTarget : lang.noTarget, attack)
    }
    

    // Set some defaults first
    attack.attackNumber = 1
    attack.reportTexts = []
    attack.armourModifier = 0
    attack.armourMultiplier = 1
    attack.primarySuccess = attack.skill.primarySuccess //|| 'A hit!'
    attack.primaryFailure = attack.skill.primaryFailure //|| 'A miss!'
    attack.secondarySuccess = attack.skill.secondarySuccess //|| 'A hit!'
    attack.secondaryFailure = attack.skill.secondaryFailure //|| 'A miss!'

    //log(attack.reportText)
    //log({attacker:attacker, skill:attack.skill, target:attack.primaryTargets[0], source:source})
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(attack.reportText, {attacker:attacker, skill:attack.skill, target:attack.primaryTargets[0], source:source})

    // Get the weapon (for most monsters, the monster IS the weapon)
    // Base the attack on the weapon
    // Some skills use no weapon
    attack.msg('Offensive bonus', 4)
    if (attack.skill.noWeapon) {
      attack.offensiveBonus = attack.skill.offensiveBonus
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'damage' does not exist on type 'Attack'.
      attack.damage = attack.skill.damage
      attack.element = attack.skill.element
      attack.report('From skill:', attack.offensiveBonus)
    }
    else {
      attack.weapon = attacker.getEquippedWeapon()
      attack.offensiveBonus = attack.weapon.offensiveBonus || 0
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'damage' does not exist on type 'Attack'.
      attack.damage = attack.weapon.damage
      attack.element = attack.weapon.element
      attack.report('From weapon:', attack.offensiveBonus)
    }
    
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'damage' does not exist on type 'Attack'.
    if (attack.damage) attack.setDamageAtts(attack.damage)
    if (attack.skill.secondaryDamage) attack.setDamageAtts(attack.skill.secondaryDamage, 'secondaryDamage')
    
    // modify for the skill
    if (attack.skill.modifyOutgoingAttack) attack.skill.modifyOutgoingAttack(attack)
    attack.report('After skill:', attack.offensiveBonus)
      
    // Now take into account the attacker's stats
    attack.offensiveBonus += attacker.getOffensiveBonus(attack.skill)
    attack.report('After attacker bonus:', attack.offensiveBonus)
    attacker.modifyOutgoingAttack(attack)
    attack.report('After attacker mods:', attack.offensiveBonus)
    
    // Now take into account the attacker's weapon's active spell
    //if (!attack.skill.noWeapon) attack.applyActiveEffects(attack.weapon, true, 'Weapon')
    
    // Now take into account the attacker's active spells
    attack.applyActiveEffects(attack.attacker, true)
    attack.report('After attacker effects:', attack.offensiveBonus)
    
    // Anything the attacker is holding
    const items = scopeHeldBy(attack.attacker)
    for (let el of items) {
      if (el.modifyOutgoingAttack) el.modifyOutgoingAttack(attack)
      attack.applyActiveEffects(el, true)
    }
    attack.report('After attacker items:', attack.offensiveBonus)
  
    // Now take into account the target's room (count as incoming still)
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const room = (target ? w[target.loc] : w[attacker.loc])
    if (room.modifyOutgoingAttack) room.modifyOutgoingAttack(attack)
    attack.applyActiveEffects(room, false)
    attack.report('After room effects:', attack.offensiveBonus)

    return attack
  }


  // Once we have an attack object set up, call this to apply the attack to each target.
  // Creates a clone of this attack and calls resolve on it for each target to do the real work
  apply() {
    if (this.abort) {
      this.skill.afterUse(this, -1)
      return this
    }
    

    // Iterate through the targets and apply the attack
    // The attack may be modified by the target, so we send a clone
    let count = 0
    for (let target of this.primaryTargets) {
      for (let i = 0; i < this.attackNumber; i++) {
        if (this.clone().resolve(target, true, i)) count++
      }
    }
    for (let target of this.secondaryTargets) {
      for (let i = 0; i < this.attackNumber; i++) {
        this.clone().resolve(target, false, i)
      }
    }
    this.skill.afterUse(this, count)
    return this
  }





  // Once we have an attack object set up, call this to apply the attack to each target.
  // This applies all effects, and puts the descriptive text in reportTexts
  // (reportTexts is the attribute of the parent attack, not this clone)
  resolve(target: any, isPrimary: any, count = 0) {
    this.target = target
    
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'testAttribute' does not exist on type '{... Remove this comment to see the full error message
    if (isPrimary && !util.testAttribute(this.skill, "suppressAntagonise") && this.target.antagonise) {
      this.target.antagonise(this.attacker)
    }

    if (target.modAttitudeOnAttack && !this.notAnAttack) target.modAttitudeOnAttack()

    if (!this.skill.inanimateTarget) {
      // Now take into account the target's active spell
      this.applyActiveEffects(target, false)
      // And anything the target is holding
      const items = scopeHeldBy(target)
      for (let el of items) {
        if (el.modifyIncomingAttack) el.modifyIncomingAttack(this)
        this.applyActiveEffects(el, false)
      }
      // Now take into account the target
      if (target.modifyIncomingAttack) target.modifyIncomingAttack(this)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 3.
      if (this.element && target.element) this.modifyElementalAttack(target.element, this, isPrimary)
    }

    this.msg(processText("---\nTargeting {nm:target:the}...", {skill:this.skill, attacker:this.attacker, target:target}), 3)
    if (this.element) this.msg("Element: " + this.element, 3)
  
    // Is the target affected (hit)?
    if (this.skill.automaticSuccess || !target.getDefensiveBonus) {
      this.msg("Automatic success", 4)
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
      this.roll = random.int(1, 20)
      this.defensiveBonus = target.getDefensiveBonus(this.skill)
      this.result = this.offensiveBonus - this.defensiveBonus + this.roll
      this.report("Offensive bonus:", this.offensiveBonus)
      this.report("Defensive bonus:", this.defensiveBonus)
      this.report("Roll:", this.roll)
      this.report("Total:", this.result)
      
      if (this.result < 10) {
        if (isPrimary && this.primaryFailure) {
          this.msg(processText(this.primaryFailure, this), 1)
        }
        else if (!isPrimary && this.secondaryFailure) {
          this.msg(processText(this.secondaryFailure, this), 1)
        }
        else {
          this.msg("A miss...\n", 1)
        }
        if (isPrimary && this.skill.afterPrimaryFailure) this.skill.afterPrimaryFailure(this.prototype)
        if (target.afterAttack) target.afterAttack(this, false)
        return false
      }
    }
    if (isPrimary && this.primarySuccess) {
      this.msg(processText(this.primarySuccess, this), 1)
    }
    else if (!isPrimary && this.secondarySuccess) {
      this.msg(processText(this.secondarySuccess, this), 1)
    }
    else {
      //this.msg("A hit!", 1)
    }

    // if we got to here, the attack worked!

    if (this.skill.targetEffect) this.skill.targetEffect(this, target, isPrimary, count)

    if (this.skill.targetEffectName) {
      const effect = rpg.findEffect(this.skill.targetEffectName === true ? this.skill.name : this.skill.targetEffectName)
      if (!target.hasEffect(effect)) {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        if (effect.category) {
          for (let name of target.activeEffects) {
            const eff = rpg.findEffect(name)
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            if (eff.category === effect.category) {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
              this.msg(eff.terminate(target))
            }
          }
        }
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        effect.apply(this, target, this.skill.duration)
      }
    }

    if (isPrimary) {
      this.applyDamage(target)
    }
    else {
      this.applyDamage(target, 'secondaryDamage')
    }
    
    // handle death
    if (target.health <= 0) {
      if (target.afterDeath) target.afterDeath(this)
      this.msg(target.msgDeath, 1)
      target.terminate()
    }
    
    if (target.afterAttack) target.afterAttack(this, true)
    return true
  }

  modifyElementalAttack(element: any) {
    if (this.element === element) {
      this.msg("Damage halved as same element", 4)
      this.damageMultiplier *= 0.5
      this.secondaryDamageMultiplier *= 0.5
    }
    if (this.element === rpg.elements.opposed(element)) {
      this.msg("Damage doubled as opposed element", 4)
      this.damageMultiplier *= 2
      this.secondaryDamageMultiplier *= 2
    }
  }

  msg(s: any, n: any) {
    this.reportTexts.push({t:processText(s, this), level:n || 1})
  }

  output() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'output' does not exist on type '{ perfor... Remove this comment to see the full error message
    settings.output(this.reportTexts)
    return this
  }

  report(s: any, n: any) {
    // @ts-expect-error ts-migrate(2550) FIXME: Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
    this.msg(s.padEnd(25) + ('' + n).padStart(3), 4)
  }

  clone() {
    const copy = new Attack()  // !!!!!
    // @ts-expect-error ts-migrate(2536) FIXME: Type 'Extract<keyof this, string>' cannot be used ... Remove this comment to see the full error message
    for (let key in this) copy[key] = this[key]
    copy.prototype = this
    return copy
  }

  setDamageAtts(string: any, prefix = 'damage') {
    const regexMatch = /^(\d*)d(\d+)([\+|\-]\d+)?$/i.exec(string);
    if (regexMatch === null) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      errormsg('Weapon ' + this.weapon.name + ' has a bad damage attribute: ' + string)
      return;
    }
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this[prefix + 'Number'] = regexMatch[1] === ""  ? 1 : parseInt(regexMatch[1]);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this[prefix + 'Sides'] = parseInt(regexMatch[2]);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this[prefix + 'Bonus'] = (regexMatch[3] === undefined  ? 0 : parseInt(regexMatch[3]));
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this[prefix + 'Multiplier'] = 1
  }

  applyDamage(target: any, prefix = 'damage') {
    // calculate base damage
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (this[prefix + 'Bonus'] || this[prefix + 'Number']) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      this.msg(`Damage: ${this.damageNumber}d${this[prefix + 'Sides']}+${this[prefix + 'Bonus']}\n`, 3)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      let damage = this[prefix + 'Bonus']
      
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      for (let i = 0; i < this[prefix + 'Number']; i++) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
        const roll = random.int(1, this[prefix + 'Sides'])
        damage += roll
        this.report('Damage roll ' + (i+1) + ':', roll)
      }
      this.report("Damage before armour:", damage)
      this.msg("Target's armour is " + target.getArmour(), 4)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      damage -= this[prefix + 'Number'] * (target.getArmour() * this.armourMultiplier + this.armourModifier)
      this.report("Damage after armour:", damage)
      if (damage < 1) damage = 1;
      this.report("Damage before multiplier:", damage)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      this.modifiedDamage = this[prefix + 'Multiplier'] * damage
      this.report("Total damage:", this.modifiedDamage)
      target.health -= this.modifiedDamage
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'damageReport' does not exist on type '{ ... Remove this comment to see the full error message
      this.msg(lang.damageReport, 1)
    }
  }


  applyActiveEffects(source: any, outgoing: any) {
    if (!source || !source.activeEffects) return
    for (let el of source.activeEffects) {
      const effect = rpg.findEffect(el)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!effect) return errormsg("applyActiveEffects: Failed to find skill [" + el + "]")
      if (outgoing) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'modifyOutgoingAttack' does not exist on ... Remove this comment to see the full error message
        if (effect.modifyOutgoingAttack) effect.modifyOutgoingAttack(this, source)
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'modifyIncomingAttack' does not exist on ... Remove this comment to see the full error message
        if (effect.modifyIncomingAttack) effect.modifyIncomingAttack(this, source)
      }
    }
  }
}















