namespace Quest {
  export namespace NPC {
    const { log } = console;
    // Give a character a modifyOutgoingAttack function to have it modify an attack the character is making
    // or modifyIncomingAttack for an attack it is receiving
    const RPG_TEMPLATE = {
      // should this be on default items?
      activeEffects: [],

      afterLoadForTemplate() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'agenda' does not exist on type '{ offens... Remove this comment to see the full error message
        if (this.agenda && this.agenda[0].startWith('guardExit')) this.setGuardFromAgenda(this.agenda[0].split(':').shift());
        log('loaded!');
      },

      armour: 0,

      asleep: false,

      // player attacks this
      attack(options: any) {
        // Create an attack, based on the current skill, weapon and given target
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 2.
        const attack = Quest.RPG.Attack.createAttack(options.char, this);
        if (!attack) return false;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'true | At... Remove this comment to see the full error message
        attack.apply().output();

        // Quest.IO.msg(attack.result.join(''))
        return true;
      },

      blinded: false,

      dead: false,

      defensiveBonus: 0,

      getArmour() {
        return this.armour;
      },

      getDefensiveBonus(skill: any) {
        if (!skill.statForDefensiveBonus) {
          return this.defensiveBonus;
        }
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (this[skill.statForDefensiveBonus] !== undefined) {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          return this[skill.statForDefensiveBonus];
        }
        return 0;
      },

      getEquippedShield() {
        return null;
      },

      getEquippedWeapon() {
        return this;
      },

      getOffensiveBonus(skill: any) {
        if (!skill.statForOffensiveBonus) {
          return this.offensiveBonus;
        }
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (this[skill.statForOffensiveBonus] !== undefined) {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          return this[skill.statForOffensiveBonus];
        }
        return 0;
      },

      // ts-error-fixed ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
      hasEffect(name: any) {
        return this.activeEffects.includes(name);
      },

      isGuarding(exit: any) {
        if (this.dead) return false;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'guardingLoc' does not exist on type '{ o... Remove this comment to see the full error message
        return exit.origin.name === this.guardingLoc && exit.dir === this.guardingDir && this.loc === this.guardingLoc;
      },

      isLight: false,

      lightSource() {
        return this.isLight ? Quest.World.world.LIGHT_FULL : Quest.World.world.LIGHT_NONE;
      },

      modifyOutgoingAttack(attack: any) { },

      offensiveBonus: 0,

      petrified: false,

      setGuard(room: any, dir: any, comment: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'guardingLoc' does not exist on type '{ o... Remove this comment to see the full error message
        this.guardingLoc = room.name;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'guardingDir' does not exist on type '{ o... Remove this comment to see the full error message
        this.guardingDir = dir;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'guardingComment' does not exist on type ... Remove this comment to see the full error message
        this.guardingComment = comment;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ offensiv... Remove this comment to see the full error message
        if (!room[dir].guardedBy.includes(this.name)) room[dir].guardedBy.push(this.name);
        // log("Guarding " + dir + " exit of " + room.alias)
      },

      setGuardFromAgenda(ary: any) {
        log(ary);
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const room = Quest.World.w[ary.shift()];
        const dir  = ary.shift();
        this.setGuard(room, dir, ary.join(':'));
      },

      signalResponses: {},

      skillsLearnt: [],

      spellCasting: 0,

      spellDefence: 0,

      stunned: 0,

      // call this to flag as dead - no output
      terminate() {
        this.dead = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'suspended' does not exist on type '{ off... Remove this comment to see the full error message
        this.suspended = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'noCorpse' does not exist on type '{ offe... Remove this comment to see the full error message
        if (this.noCorpse) {
          rpg.destroy(this);
        }
      },

      testTalk() {
        // ts-error-fixed ts-migrate(2552) FIXME: Cannot find name 'falsems'. Did you mean 'Quest.IO.falsemsg... Remove this comment to see the full error message
        if (this.dead) return falsems(Quest.lang.npc_dead);
        return true;
      },

      unsetGuard() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
        Quest.Utilities.array.remove(Quest.World.w[this.guardingLoc][this.guardingDir].guardedBy, this.name);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'guardingLoc' does not exist on type '{ o... Remove this comment to see the full error message
        delete this.guardingLoc;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'guardingDir' does not exist on type '{ o... Remove this comment to see the full error message
        delete this.guardingDir;
      },

    };

    export const RPG_PLAYER = function (female: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
      const res = Quest.Templates.PLAYER(female);

      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      for (const key in RPG_TEMPLATE) res[key] = RPG_TEMPLATE[key];

      // res.getEquippedWeapon = function() { return this.equipped ? Quest.World.w[this.equipped] : Quest.World.w.weapon_unarmed; }

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'allegiance' does not exist on type '{ ca... Remove this comment to see the full error message
      res.allegiance = 'friend';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'getEquippedWeapon' does not exist on typ... Remove this comment to see the full error message
      res.getEquippedWeapon = function () {
        const carried = Quest.Utilities.scopeHeldBy(this);
        return carried.find((el: any) => el.equipped && el.weapon) || Quest.World.w.weapon_unarmed;
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'getEquippedShield' does not exist on typ... Remove this comment to see the full error message
      res.getEquippedShield = function () {
        const carried = Quest.Utilities.scopeHeldBy(this);
        return carried.find((el: any) => el.equipped && el.shield);
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'getArmour' does not exist on type '{ can... Remove this comment to see the full error message
      res.getArmour = function () {
        const garments = Quest.Utilities.scopeHeldBy(this).filter((el: any) => el.worn);
        let armour     = 0;
        for (const el of garments) armour += el.getArmour();
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'armourScaling' does not exist on type '{... Remove this comment to see the full error message
        return armour / Quest.Settings.settings.armourScaling;
      };

      res.afterCreation = function (o) {
        if (!o.maxHealth) o.maxHealth = o.health;
      };

      return res;
    };

    export const RPG_NPC = function (female: any) {
      const res = Quest.NPC.NPC(female);

      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      for (const key in RPG_TEMPLATE) res[key] = RPG_TEMPLATE[key];

      // res.aggressive = true
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'allegiance' does not exist on type '{ ca... Remove this comment to see the full error message
      res.allegiance = 'foe';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'oldRpgOnCreation' does not exist on type... Remove this comment to see the full error message
      res.oldRpgOnCreation = res.afterCreation;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'attackPattern' does not exist on type '{... Remove this comment to see the full error message
      res.attackPattern = ['Basic attack'];
      res.afterCreation = function (o) {
        o.oldRpgOnCreation(o);
        if (!o.maxHealth) o.maxHealth = o.health;
        o.verbFunctions.push((o: any, verbList: any) => {
          verbList.push(Quest.lang.verbs.attack);
        });
        o.nameModifierFunctions.push((o: any, list: any) => {
          if (o.dead) list.push(Quest.lang.invModifiers.dead);
        });
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathGeneral;

      // An NPC is hostile if aggression is true and it is targeting the given character or an allied one
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHostile' does not exist on type '{ can... Remove this comment to see the full error message
      res.isHostile = function (chr: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'aggressive' does not exist on type '{ ca... Remove this comment to see the full error message
        if (!this.aggressive) return false;
        if (!chr) chr = Quest.World.player;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'target' does not exist on type '{ canRea... Remove this comment to see the full error message
        if (!this.target) this.target = Quest.World.player.name;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'target' does not exist on type '{ canRea... Remove this comment to see the full error message
        if (this.target === chr.name) return true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'target' does not exist on type '{ canRea... Remove this comment to see the full error message
        if (!this.target) return Quest.IO.errormsg('Oh dear, no target set for this NPC');
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (chr.allegiance && Quest.World.w[this.target].allegiance === chr.allegiance) return true;
        return false;
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'selectSkill' does not exist on type '{ c... Remove this comment to see the full error message
      res.selectSkill = function () {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'skillOptions' does not exist on type '{ ... Remove this comment to see the full error message
        return this.skillOptions ? rpg.findSkill(Quest.Random.rndm.fromArray(this.skillOptions)) : Quest.Skill.defaultSkill;
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'examine' does not exist on type '{ canRe... Remove this comment to see the full error message
      res.examine = function (options: any) {
        let s;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dead' does not exist on type '{ canReach... Remove this comment to see the full error message
        if (this.dead) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'exDead' does not exist on type '{ canRea... Remove this comment to see the full error message
          if (this.exDead) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'exDead' does not exist on type '{ canRea... Remove this comment to see the full error message
            s = this.exDead;
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'ex' does not exist on type '{ canReachTh... Remove this comment to see the full error message
            s = typeof this.ex === 'string' ? this.ex : this.ex();
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'deadAddendum' does not exist on type '{ ... Remove this comment to see the full error message
            s += Quest.lang.deadAddendum;
          }
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'asleep' does not exist on type '{ canRea... Remove this comment to see the full error message
        else if (this.asleep) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'exAsleep' does not exist on type '{ canR... Remove this comment to see the full error message
          if (this.exAsleep) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'exAsleep' does not exist on type '{ canR... Remove this comment to see the full error message
            s = this.exAsleep;
          } else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'ex' does not exist on type '{ canReachTh... Remove this comment to see the full error message
            s = typeof this.ex === 'string' ? this.ex : this.ex() + Quest.lang.asleepAddendum;
          }
        } else {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'ex' does not exist on type '{ canReachTh... Remove this comment to see the full error message
          s = typeof this.ex === 'string' ? this.ex : this.ex();
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'health' does not exist on type '{ canRea... Remove this comment to see the full error message
          if (this.health < this.maxHealth / 5) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'badlyInjuredAddendum' does not exist on ... Remove this comment to see the full error message
            s += Quest.lang.badlyInjuredAddendum;
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'health' does not exist on type '{ canRea... Remove this comment to see the full error message
          else if (this.health < this.maxHealth / 2) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'injuredAddendum' does not exist on type ... Remove this comment to see the full error message
            s += Quest.lang.injuredAddendum;
          }
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'includeHitsInExamine' does not exist on ... Remove this comment to see the full error message
        if (Quest.Settings.settings.includeHitsInExamine) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'health' does not exist on type '{ canRea... Remove this comment to see the full error message
          s += ` {class:tactical:Hits: ${this.health}/${this.maxHealth}.}`;
        }
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(s, options);
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'search' does not exist on type '{ canRea... Remove this comment to see the full error message
      res.search = function (options: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dead' does not exist on type '{ canReach... Remove this comment to see the full error message
        if (!this.dead && !this.asleep) return Quest.IO.falsemsg(Quest.lang.searchAlive, options);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSearch' does not exist on type '{... Remove this comment to see the full error message
        if (!Quest.Settings.settings.defaultSearch) return Quest.IO.falsemsg(Quest.lang.searchNothing, options);

        // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSearch' does not exist on type '{... Remove this comment to see the full error message
        Quest.Settings.settings.defaultSearch(this);
        return true;
      };

      // Attempt to make an attack on the given target.
      // Will return the attack itself if an attack is actually made.
      // Will return true is no attack is made, and the endeavor should be abandoned
      // (eg the target is dead or lost), or false if no attack is made by it is still
      // worth trying next turn.
      // Could come from an agenda, so target could be an array, and hence return values
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'performAttack' does not exist on type '{... Remove this comment to see the full error message
      res.performAttack = function (arr: any) {
        let target;
        if (Array.isArray(target)) {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          target = Quest.World.w[arr[0]];
          arr.shift();
        } else {
          target = arr;
          arr    = [];
        }
        if (target.dead) return true;

        // Is the target reachable?
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ canReachT... Remove this comment to see the full error message
        if (this.loc !== target.loc) {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'pursueToAttack' does not exist on type '... Remove this comment to see the full error message
          if (this.pursueToAttack) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'pursueToAttack' does not exist on type '... Remove this comment to see the full error message
            return !this.pursueToAttack(target);
          }

          return true;
        }

        let skill;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'nextAttack' does not exist on type '{ ca... Remove this comment to see the full error message
        if (this.nextAttack) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          skill = rpg.findSkill(this.nextAttack);
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'nextAttack' does not exist on type '{ ca... Remove this comment to see the full error message
          delete this.nextAttack;
        } else if (arr.length > 0) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          skill = rpg.findSkill(Quest.Random.rndm.fromArray(arr));
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'attackPattern' does not exist on type '{... Remove this comment to see the full error message
        else if (this.attackPattern) {
          // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          skill = rpg.findSkill(Quest.Random.rndm.fromArray(this.attackPattern));
        } else {
          skill = Quest.Skill.defaultSkill;
        }
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        const attack = Quest.RPG.Attack.createAttack(this, target, skill);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'apply' does not exist on type 'boolean |... Remove this comment to see the full error message
        attack.apply().output();
        return attack;
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'antagonise' does not exist on type '{ ca... Remove this comment to see the full error message
      res.antagonise = function (target: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'signalGroups' does not exist on type '{ ... Remove this comment to see the full error message
        if (this.signalGroups && this.signalGroups.length) {
          rpg.broadcastAll('attack', this, target);
        } else {
          rpg.broadcastCommunication(this, 'attack', this, target);
        }
      };

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'endTurn' does not exist on type '{ canRe... Remove this comment to see the full error message
      res.endTurn = function (turn: any) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dead' does not exist on type '{ canReach... Remove this comment to see the full error message
        if (this.dead) return;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'aggressive' does not exist on type '{ ca... Remove this comment to see the full error message
        if (this.aggressive && this.target) {
          // If attacking, ignore agenda, etc.
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'performAttack' does not exist on type '{... Remove this comment to see the full error message
          this.performAttack(Quest.World.w[this.target]);
        } else {
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'sayTakeTurn' does not exist on type '{ c... Remove this comment to see the full error message
          this.sayTakeTurn();
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'doReactions' does not exist on type '{ c... Remove this comment to see the full error message
          this.doReactions();
          // ts-error-fixed ts-migrate(2551) FIXME: Property 'paused' does not exist on type '{ canRea... Remove this comment to see the full error message
          if (!this.paused && !this.suspended && this.agenda && this.agenda.length > 0) this.doAgenda();
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'aggressive' does not exist on type '{ ca... Remove this comment to see the full error message
          if (this.aggressive && this.target && !this.delayAgendaAttack) {
            // Is the NPC now aggressive? If so, have an attack
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'performAttack' does not exist on type '{... Remove this comment to see the full error message
            this.performAttack(Quest.World.w[this.target]);
          }
          // ts-error-fixed ts-migrate(2339) FIXME: Property 'delayAgendaAttack' does not exist on typ... Remove this comment to see the full error message
          this.delayAgendaAttack = false;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'doEvent' does not exist on type '{ canRe... Remove this comment to see the full error message
        this.doEvent(turn);
      };

      return res;
    };

    const RPG_FRIEND = function (female: any) {
      const res = RPG_NPC(female);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'aggressive' does not exist on type '{ ca... Remove this comment to see the full error message
      res.aggressive = false;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'allegiance' does not exist on type '{ ca... Remove this comment to see the full error message
      res.allegiance = 'friend';
    };

    export const RPG_CORPOREAL_UNDEAD = function () {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const res = RPG_NPC();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'element' does not exist on type '{ canRe... Remove this comment to see the full error message
      res.element = 'necrotic';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.thirdperson;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathUndead;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunity' does not exist on type '... Remove this comment to see the full error message
      res.poisonImmunity = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunityMsg' does not exist on typ... Remove this comment to see the full error message
      res.poisonImmunityMsg = 'Poison has no effect on the undead!';
      return res;
    };

    export const RPG_NON_CORPOREAL_UNDEAD = function () {
      const res = RPG_CORPOREAL_UNDEAD();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'noCorpse' does not exist on type '{ canR... Remove this comment to see the full error message
      res.noCorpse = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathUndeadNoCorpse;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'modifyIncomingAttack' does not exist on ... Remove this comment to see the full error message
      res.modifyIncomingAttack = function (attack: any) {
        if (attack.element || attack.isMagic || attack.spell) {
          attack.damageMultiplier = 0;
          attack.primarySuccess   = attack.primarySuccess.replace(/[.!]/, ', but it passes straight through {sb:target}.');
        }
      };
      return res;
    };

    export const RPG_PHANTOM = function () {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const res = RPG_NPC();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'element' does not exist on type '{ canRe... Remove this comment to see the full error message
      res.element = 'rainbow';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'noCorpse' does not exist on type '{ canR... Remove this comment to see the full error message
      res.noCorpse = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathPhantom;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.thirdperson;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunity' does not exist on type '... Remove this comment to see the full error message
      res.poisonImmunity = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunityMsg' does not exist on typ... Remove this comment to see the full error message
      res.poisonImmunityMsg = 'Poison has no effect for some reason...';
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'unillusionable' does not exist on type '... Remove this comment to see the full error message
      res.unillusionable = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'unillusion' does not exist on type '{ ca... Remove this comment to see the full error message
      res.unillusion = function (attack: any) {
        attack.msg('{nv:target:disappear:true}.', 1);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'clonePrototype' does not exist on type '... Remove this comment to see the full error message
        if (this.clonePrototype) {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          delete Quest.World.w[this.name];
        } else {
          // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          delete Quest.World.w[this.name].loc;
        }
      };
      return res;
    };

    export const RPG_ELEMENTAL = function (element: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const res = RPG_NPC();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'element' does not exist on type '{ canRe... Remove this comment to see the full error message
      res.element = element;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'noCorpse' does not exist on type '{ canR... Remove this comment to see the full error message
      res.noCorpse = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathElemental;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.thirdperson;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunity' does not exist on type '... Remove this comment to see the full error message
      res.poisonImmunity = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunityMsg' does not exist on typ... Remove this comment to see the full error message
      res.poisonImmunityMsg = 'Poison has no effect on elementals!';
      return res;
    };

    export const RPG_CONSTRUCT = function () {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const res = RPG_NPC();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathConstruct;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.thirdperson;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunity' does not exist on type '... Remove this comment to see the full error message
      res.poisonImmunity = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunityMsg' does not exist on typ... Remove this comment to see the full error message
      res.poisonImmunityMsg = 'Poison has no effect on constructs!';
      return res;
    };

    export const RPG_DEMON = function () {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const res = RPG_NPC();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathConstruct;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.thirdperson;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunity' does not exist on type '... Remove this comment to see the full error message
      res.poisonImmunity = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'poisonImmunityMsg' does not exist on typ... Remove this comment to see the full error message
      res.poisonImmunityMsg = 'Poison has no effect on demons!';
      return res;
    };

    export const RPG_CORRUPTED = function () {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const res = RPG_NPC();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathConstruct;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.thirdperson;
      return res;
    };

    export const RPG_CREATED = function () {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const res = RPG_NPC();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathConstruct;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.thirdperson;
      return res;
    };

    export const RPG_PLANT = function () {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      const res = RPG_NPC();
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'msgDeath' does not exist on type '{ canR... Remove this comment to see the full error message
      res.msgDeath = Quest.lang.deathConstruct;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.thirdperson;
      return res;
    };

    export const RPG_FEY = function (female: any) {
      const res = RPG_NPC(female);

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'fey' does not exist on type '{ canReachT... Remove this comment to see the full error message
      res.fey = true;

      return res;
    };

    export const RPG_BEAST = function (female: any, aggressive: any) {
      const res = RPG_NPC(female);

      // ts-error-fixed ts-migrate(2339) FIXME: Property 'beast' does not exist on type '{ canReac... Remove this comment to see the full error message
      res.beast = true;
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'aggressive' does not exist on type '{ ca... Remove this comment to see the full error message
      res.aggressive = aggressive;
      res.testTalk   = function () {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dead' does not exist on type '{ canReach... Remove this comment to see the full error message
        if (this.dead) return falsems(Quest.lang.npc_dead);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'activeEffects' does not exist on type '{... Remove this comment to see the full error message
        if (this.activeEffects.includes(Quest.lang.communeWithAnimalSpell)) return true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'cannotTalkToBeast' does not exist on typ... Remove this comment to see the full error message
        return Quest.IO.falsemsg(Quest.lang.cannotTalkToBeast, { char: player, item: this });
      };

      return res;
    };
  }
}
