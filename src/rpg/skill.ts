namespace Quest {
  export namespace Skill {
    export class Skill {
      alias: any;

      effect: any;

      name: any;

      offensiveBonus: any;

      reportText: any;

      targetEffectName: any;

      constructor(name: any, data: any) {
        this.name = name;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'attacking' does not exist on type '{ reg... Remove this comment to see the full error message
        this.reportText     = Quest.lang.attacking;
        this.offensiveBonus = 0;
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        for (const key in data) this[key] = data[key];
        if (!this.alias) this.alias = name;
        // log(this.alias)
        if (data.effect) {
          new Quest.RPG.Effect(this.name, this.effect, data);
          this.targetEffectName = true;
        }
        if (Quest.RPG.rpg.findSkill(this.name, true)) throw new Error(`Skill/Spell name collision: ${this.name}`);
        // ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'this' is not assignable to param... Remove this comment to see the full error message
        Quest.RPG.rpg.list.push(this);
      }

      testUseable(char: any) {
        return Quest.RPG.rpg.defaultSkillTestUseable(char);
      }

      afterUse(attack: any, count: any) {
        Quest.RPG.rpg.defaultSkillAfterUse(attack, count);
      }
    }

    export class MonsterAttack extends Skill {
      noWeapon: any;

      reportText: any;

      statForOffensiveBonus: any;

      constructor(name: any, data: any) {
        super(name, data);
        this.noWeapon = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'castSpell' does not exist on type '{ reg... Remove this comment to see the full error message
        this.reportText            = Quest.lang.castSpell;
        this.statForOffensiveBonus = 'spellCasting';
      }

      testUseable(char: any) {
        return true;
      }

      afterUse(attack: any, count: any) { }
    }

    export class Spell extends Skill {
      noWeapon: any;

      reportText: any;

      spell: any;

      statForOffensiveBonus: any;

      constructor(name: any, data: any) {
        super(name, data);
        this.spell    = true;
        this.noWeapon = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'castSpell' does not exist on type '{ reg... Remove this comment to see the full error message
        this.reportText            = Quest.lang.castSpell;
        this.statForOffensiveBonus = 'spellCasting';
      }

      testUseable(char: any) {
        return Quest.RPG.rpg.defaultSpellTestUseable(char);
      }

      afterUse(attack: any, count: any) {
        Quest.RPG.rpg.defaultSpellAfterUse(attack, count);
      }
    }

    export class SpellSelf extends Spell {
      automaticSuccess: any;

      getPrimaryTargets: any;

      noTarget: any;

      notAnAttack: any;

      reportText: any;

      suppressAntagonise: any;

      constructor(name: any, data: any) {
        super(name, data);
        this.getPrimaryTargets  = function (target: any, attack: any) {
          return [attack.attacker];
        };
        this.noTarget           = true;
        this.suppressAntagonise = true;
        this.automaticSuccess   = true;
        this.notAnAttack        = true;
        this.reportText         = '{nv:attacker:cast:true} the {i:{nm:skill}} spell.';
      }
    }

    export class SpellSummon extends Spell {
      automaticSuccess: any;

      description: any;

      duration: any;

      noTarget: any;

      prototype: any;

      constructor(prototype: any, data: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'summonSpellPre' does not exist on type '... Remove this comment to see the full error message
        super(`${Quest.lang.summonSpellPre} ${Quest.Utilities.titleCase(prototype.alias.replace('_', ' '))}`, data);
        this.noTarget         = true;
        this.automaticSuccess = true;
        this.prototype        = prototype;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'summonSpellDesc' does not exist on type ... Remove this comment to see the full error message
        if (!this.description) this.description = Quest.lang.summonSpellDesc(this);
      }

      targetEffect(attack: any) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        attack.item                   = Quest.World.cloneObject(this.prototype, attack.attacker.loc);
        attack.item.summonedCountdown = this.duration;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'summoning_successful' does not exist on ... Remove this comment to see the full error message
        attack.msg(Quest.lang.summoning_successful, 1);
      }
    }

    export class SpellInanimate extends Spell {
      getTargets: any;

      inanimateTarget: any;

      noTarget: any;

      constructor(name: any, data: any) {
        super(name, data);
        if (!data.noTarget) this.noTarget = true;
        this.inanimateTarget = true;
      }

      getPrimaryTargets(target: any, attack: any) {
        return this.getTargets(attack);
      }
    }

    const defaultSkill = new Skill('Basic attack', {

      modifyOutgoingAttack(attack: any) { },

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'primaryFailure' does not exist on type '... Remove this comment to see the full error message
      primaryFailure: Quest.lang.primaryFailure,
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'primarySuccess' does not exist on type '... Remove this comment to see the full error message
      primarySuccess: Quest.lang.primarySuccess,
    });
  }
}
