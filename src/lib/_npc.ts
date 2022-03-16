namespace Quest {
  export namespace NPC {
    // Should all be language neutral
    export const NPC = function (isFemale: any) {
      // A whole bunch of defaults are the same as the player
      const res = { ...Quest.Templates.CHARACTER(), ...CONSULTABLE(), ...AGENDA_FOLLOWER() };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'npc' does not exist on type '{ canReachT... Remove this comment to see the full error message
      res.npc = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isFemale' does not exist on type '{ canR... Remove this comment to see the full error message
      res.isFemale = isFemale;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = isFemale ? Quest.lang.pronouns.female : Quest.lang.pronouns.male;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'askOptions' does not exist on type '{ ca... Remove this comment to see the full error message
      res.askOptions = [];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'tellOptions' does not exist on type '{ c... Remove this comment to see the full error message
      res.tellOptions = [];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'excludeFromAll' does not exist on type '... Remove this comment to see the full error message
      res.excludeFromAll = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactions' does not exist on type '{ can... Remove this comment to see the full error message
      res.reactions = [];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'receiveItems' does not exist on type '{ ... Remove this comment to see the full error message
      res.receiveItems        = [];
      res.followers           = [];
      res.canReachThroughThis = () => false;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ canReach... Remove this comment to see the full error message
      res.icon = () => 'npc12';

      // This does not work properly, it just gets all clothing!!!
      // But authors could replace as required
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getWearingVisible' does not exist on typ... Remove this comment to see the full error message
      res.getWearingVisible = function () {
        return this.getWearing();
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{ canRea... Remove this comment to see the full error message
      res.isHere = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ canRe... Remove this comment to see the full error message
        return this.isAtLoc(Quest.World.player.loc);
      };

      res.msg = function (s, params) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{ canRea... Remove this comment to see the full error message
        if (this.isHere()) Quest.IO.msg(s, params);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'multiMsg' does not exist on type '{ canR... Remove this comment to see the full error message
      res.multiMsg = function (ary: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{ canRea... Remove this comment to see the full error message
        if (!this.isHere()) return;
        const counter = ary[0].replace(/[^a-z]/ig, '');
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (this[counter] === undefined) this[counter] = -1;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this[counter]++;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (this[counter] >= ary.length) this[counter] = ary.length - 1;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (ary[this[counter]]) Quest.IO.msg(ary[this[counter]]);
      };

      // can we see the NPC from here?
      // do we need a prefix?
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'inSight' does not exist on type '{ canRe... Remove this comment to see the full error message
      res.inSight = function (room: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ canReachT... Remove this comment to see the full error message
        if (!this.loc) return false;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!room) room = Quest.World.w[this.loc];
        if (Quest.World.player.loc === room.name) return true;
        if (room.visibleFrom === undefined) return false;
        if (typeof room.visibleFrom === 'function') return room.visibleFrom(Quest.World.currentLocation);
        if (Array.isArray(room.visibleFrom)) {
          if (room.visibleFrom.includes(Quest.World.currentLocation.name)) return room.visibleFromPrefix ? room.visibleFromPrefix : true;
        }
        return false;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setLeader' does not exist on type '{ can... Remove this comment to see the full error message
      res.setLeader = function (npc: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (typeof npc === 'string') npc = Quest.World.w[npc];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderName' does not exist on type '{ ca... Remove this comment to see the full error message
        if (this.leaderName) Quest.Utilities.array.remove(Quest.World.w[this.leaderName].followers, this.name);
        if (npc) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ canReach... Remove this comment to see the full error message
          npc.followers.push(this.name);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderName' does not exist on type '{ ca... Remove this comment to see the full error message
          this.leaderName = npc.name;
        } else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderName' does not exist on type '{ ca... Remove this comment to see the full error message
          delete this.leaderName;
        }
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getFollowers' does not exist on type '{ ... Remove this comment to see the full error message
      res.getFollowers = function () {
        return this.followers.map((el) => Quest.World.w[el]);
      };

      // Used by commands
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'startFollow' does not exist on type '{ c... Remove this comment to see the full error message
      res.startFollow = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderName' does not exist on type '{ ca... Remove this comment to see the full error message
        if (this.leaderName) return Quest.IO.falsemsg(Quest.lang.already_following, { npc: this });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'setLeader' does not exist on type '{ can... Remove this comment to see the full error message
        this.setLeader(Quest.World.player);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('{nv:npc:nod:true} his head.', { npc: this });
        return true;
      },
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'endFollow' does not exist on type '{ can... Remove this comment to see the full error message
      res.endFollow = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderName' does not exist on type '{ ca... Remove this comment to see the full error message
        if (!this.leaderName) return Quest.IO.falsemsg(Quest.lang.already_waiting, { npc: this });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'setLeader' does not exist on type '{ can... Remove this comment to see the full error message
        this.setLeader();
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('{nv:npc:nod:true} his head.', { npc: this });
        return true;
      },

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'endTurn' does not exist on type '{ canRe... Remove this comment to see the full error message
      res.endTurn = function (turn: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dead' does not exist on type '{ canReach... Remove this comment to see the full error message
        if (this.dead) return;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayTakeTurn' does not exist on type '{ c... Remove this comment to see the full error message
        this.sayTakeTurn();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doReactions' does not exist on type '{ c... Remove this comment to see the full error message
        this.doReactions();
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'paused' does not exist on type '{ canRea... Remove this comment to see the full error message
        if (!this.paused && !this.suspended && this.agenda && this.agenda.length > 0) this.doAgenda();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doEvent' does not exist on type '{ canRe... Remove this comment to see the full error message
        this.doEvent(turn);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'doReactions' does not exist on type '{ c... Remove this comment to see the full error message
      res.doReactions = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHere' does not exist on type '{ canRea... Remove this comment to see the full error message
        if (this.isHere() || Quest.Settings.settings.npcReactionsAlways) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactionFlags' does not exist on type '{... Remove this comment to see the full error message
          if (!this.reactionFlags) this.reactionFlags = [];
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactions' does not exist on type '{ can... Remove this comment to see the full error message
          for (const el of this.reactions) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactionFlags' does not exist on type '{... Remove this comment to see the full error message
            if (this.reactionFlags.includes(el.name)) continue;
            if (el.test(this)) {
              el.action(this);
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactionFlags' does not exist on type '{... Remove this comment to see the full error message
              this.reactionFlags.push(el.name);
              if (!el.noPause) this.pause();
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'reactionFlags' does not exist on type '{... Remove this comment to see the full error message
              if (el.override) this.reactionFlags = this.reactionFlags.concat(el.override);
            }
          }
        }
      };

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      for (const key in npc_utilities) res[key] = npc_utilities[key];

      // For ASK/TELL
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'topics' does not exist on type '{ canRea... Remove this comment to see the full error message
      res.topics = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'askOptions' does not exist on type '{ ca... Remove this comment to see the full error message
        if (this.askOptions.length === 0 && this.tellOptions.length === 0) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.lang.topics_no_ask_tell);
          return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        }

        let flag = false;
        for (const action of ['ask', 'tell']) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          const arr  = Quest.Utilities.getResponseList({ action, char: this }, this[`${action}Options`]);
          const arr2 = [];
          for (const res of arr) {
            if (res.silent && !Quest.World.player.mentionedTopics.includes(res.name)) continue;
            arr2.push(res.name);
          }
          if (arr2.length !== 0) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            Quest.IO.metamsg(lang[`topics_${action}_list`], { item: this, list: arr2.sort().join('; ') });
            flag = true;
          }
        }

        if (!flag) {
          Quest.IO.metamsg(Quest.lang.topics_none_found, { item: this });
        }

        return Quest.Settings.settings.lookCountsAsTurn ? Quest.World.world.SUCCESS : Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayBonus' does not exist on type '{ canR... Remove this comment to see the full error message
      res.sayBonus = 0;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayPriority' does not exist on type '{ c... Remove this comment to see the full error message
      res.sayPriority = 0;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayState' does not exist on type '{ canR... Remove this comment to see the full error message
      res.sayState = 0;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayUsed' does not exist on type '{ canRe... Remove this comment to see the full error message
      res.sayUsed = ' ';
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayResponse' does not exist on type '{ c... Remove this comment to see the full error message
      res.sayResponse = function (s: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayResponses' does not exist on type '{ ... Remove this comment to see the full error message
        if (!this.sayResponses) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayResponses' does not exist on type '{ ... Remove this comment to see the full error message
        for (const res of this.sayResponses) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayUsed' does not exist on type '{ canRe... Remove this comment to see the full error message
          if (res.id && this.sayUsed.includes(` ${res.id} `)) continue;
          if (!res.regex.test(s)) continue;
          res.response();
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayUsed' does not exist on type '{ canRe... Remove this comment to see the full error message
          if (res.id) this.sayUsed += `${res.id} `;
          return true;
        }
        return false;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayCanHear' does not exist on type '{ ca... Remove this comment to see the full error message
      res.sayCanHear = function (char: any, verb: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ canReachT... Remove this comment to see the full error message
        return char.loc === this.loc;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'askQuestion' does not exist on type '{ c... Remove this comment to see the full error message
      res.askQuestion = function (questionName: any) {
        if (typeof questionName !== 'string') questionName = questionName.name;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayQuestion' does not exist on type '{ c... Remove this comment to see the full error message
        this.sayQuestion = questionName;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayQuestionCountdown' does not exist on ... Remove this comment to see the full error message
        this.sayQuestionCountdown = Quest.Settings.settings.turnsQuestionsLast;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayBonus' does not exist on type '{ canR... Remove this comment to see the full error message
        this.sayBonus = 100;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayTakeTurn' does not exist on type '{ c... Remove this comment to see the full error message
      res.sayTakeTurn = function (questionName: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayQuestionCountdown' does not exist on ... Remove this comment to see the full error message
        if (this.sayQuestionCountdown <= 0) return;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayQuestionCountdown' does not exist on ... Remove this comment to see the full error message
        this.sayQuestionCountdown--;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayQuestionCountdown' does not exist on ... Remove this comment to see the full error message
        if (this.sayQuestionCountdown > 0) return;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayQuestion' does not exist on type '{ c... Remove this comment to see the full error message
        this.sayQuestion = false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'sayBonus' does not exist on type '{ canR... Remove this comment to see the full error message
        this.sayBonus = 0;
      };

      return res;
    };

    const npc_utilities = {
      askTopics(...topics: any[]) {
        const title = topics.shift();
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const fn = Quest.IO.io.menuFunctions[Quest.Settings.settings.funcForDynamicConv];
        fn(title, topics, (result: any) => {
          result.runscript();
        });
      },
      findTopic(alias: any, n = 1) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'findTopic' does not exist on type '{}'.
        return Quest.Utilities.util.findTopic(alias, this, n);
      },
      getTopics() {
        const list = [];
        for (const key in Quest.World.w) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (Quest.World.w[key].isTopicVisible && Quest.World.w[key].isTopicVisible(this)) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            list.push(Quest.World.w[key]);
          }
        }
        return list;
      },

      hideTopic(alias: any, n = 1) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'findTopic' does not exist on type '{}'.
        Quest.Utilities.util.findTopic(alias, this, n).hide();
      },

      showTopic(alias: any, n = 1) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'findTopic' does not exist on type '{}'.
        Quest.Utilities.util.findTopic(alias, this, n).show();
      },

      // @ts-expect-error ts-migrate(7023) FIXME: 'talkto' implicitly has return type 'any' because ... Remove this comment to see the full error message
      talkto() {
        // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'true' since the... Remove this comment to see the full error message
        if (Quest.Settings.settings.noTalkTo !== false) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.Settings.settings.noTalkTo);
          return false;
        }

        if (!Quest.World.player.testTalk(this)) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testTalk' does not exist on type '{ find... Remove this comment to see the full error message
        if (this.testTalk && !this.testTalk()) return false;

        // handle non-dynamic talkto
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'talk' does not exist on type '{ findTopi... Remove this comment to see the full error message
        if (typeof this.talk === 'string') {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(this.talk, { char: this });
          return true;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'talk' does not exist on type '{ findTopi... Remove this comment to see the full error message
        if (typeof this.talk === 'function') {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'talk' does not exist on type '{ findTopi... Remove this comment to see the full error message
          return this.talk();
        }

        // handle dynamic talkto
        const topics                         = this.getTopics();
        Quest.World.player.conversingWithNpc = this;
        if (topics.length === 0) return Quest.IO.failedmsg(Quest.lang.no_topics, { char: Quest.World.player, item: this });

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'greeting' does not exist on type '{ find... Remove this comment to see the full error message
        if (this.greeting) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
          Quest.Utilities.printOrRun(this, this, 'greeting');
        }
        topics.push(Quest.lang.never_mind);

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const fn = Quest.IO.io.menuFunctions[Quest.Settings.settings.funcForDynamicConv];
        fn(Quest.lang.speak_to_menu_title(this), topics, (result: any) => {
          if (result !== Quest.lang.never_mind) {
            result.runscript();
          }
        });

        return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
      },

    };

    export const AGENDA_FOLLOWER = function () {
      const res = {};
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'agenda' does not exist on type '{}'.
      res.agenda = [];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'suspended' does not exist on type '{}'.
      res.suspended = false;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'followers' does not exist on type '{}'.
      res.followers = [];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'inSight' does not exist on type '{}'.
      res.inSight = function () {
        return false;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'endTurn' does not exist on type '{}'.
      res.endTurn = function (turn: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'paused' does not exist on type '{}'.
        if (!this.paused && !this.suspended && this.agenda.length > 0) this.doAgenda();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doEvent' does not exist on type '{}'.
        this.doEvent(turn);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'setAgenda' does not exist on type '{}'.
      res.setAgenda = function (agenda: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'agenda' does not exist on type '{}'.
        this.agenda = agenda;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'suspended' does not exist on type '{}'.
        this.suspended = false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'agendaWaitCounter' does not exist on typ... Remove this comment to see the full error message
        this.agendaWaitCounter = false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'patrolCounter' does not exist on type '{... Remove this comment to see the full error message
        this.patrolCounter = false;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'doAgenda' does not exist on type '{}'.
      res.doAgenda = function () {
        // If this NPC has followers, we fake it so it seems to be the group
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'followers' does not exist on type '{}'.
        if (this.followers.length !== 0) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedPronouns' does not exist on type '{... Remove this comment to see the full error message
          this.savedPronouns = this.pronouns;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedAlias' does not exist on type '{}'.
          this.savedAlias = this.alias;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
          this.pronouns = Quest.lang.pronouns.plural;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'followers' does not exist on type '{}'.
          this.followers.unshift(this.name);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{}'.
          this.alias = Quest.Utilities.formatList(this.getFollowers(), { lastJoiner: Quest.lang.list_and });
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'followers' does not exist on type '{}'.
          this.followers.shift();
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'agenda' does not exist on type '{}'.
        const arr          = this.agenda[0].split(':');
        const functionName = arr.shift();
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (typeof agenda[functionName] !== 'function') {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg(`Unknown function \`${functionName}' in agenda for ${this.name}`);
          return;
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const flag = agenda[functionName](this, arr);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'agenda' does not exist on type '{}'.
        if (flag) this.agenda.shift();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doAgenda' does not exist on type '{}'.
        if (flag === 'next') this.doAgenda();

        // If we are faking the group, reset
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedPronouns' does not exist on type '{... Remove this comment to see the full error message
        if (this.savedPronouns) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{}'.
          this.pronouns = this.savedPronouns;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'alias' does not exist on type '{}'.
          this.alias = this.savedAlias;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'savedPronouns' does not exist on type '{... Remove this comment to see the full error message
          this.savedPronouns = false;
        }
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'pause' does not exist on type '{}'.
      res.pause = function () {
        // Quest.IO.debugmsg("pausing " + this.name);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'leaderName' does not exist on type '{}'.
        if (this.leaderName) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          Quest.World.w[this.leaderName].pause();
        } else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'paused' does not exist on type '{}'.
          this.paused = true;
        }
      };

      return res;
    };

    export const agenda = {
      debug(s: any, npc: any, arr: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'agendaDebugging' does not exist on type ... Remove this comment to see the full error message
        if (Quest.Settings.settings.agendaDebugging && Quest.Settings.settings.playMode === 'dev') Quest.IO.debugmsg(`AGENDA for ${npc.name}: ${s}; ${Quest.Utilities.formatList(arr, { doNotSort: true })}`);
      },
      debugS(s: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'agendaDebugging' does not exist on type ... Remove this comment to see the full error message
        if (Quest.Settings.settings.agendaDebugging && Quest.Settings.settings.playMode === 'dev') Quest.IO.debugmsg(`AGENDA comment: ${s}`);
      },

      disband(npc: any, arr: any) {
        this.debug('disband', npc, arr);
        for (const s of npc.followers) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const follower  = Quest.World.w[s];
          follower.leader = false;
        }
        npc.followers = [];
        this.text(npc, arr);
        return true;
      },

      // start and end are the objects, not their names!
      findPath: function (start: any, end: any, maxlength: any) {
        if (start === end) return [];

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pathID' does not exist on type '{ turnCo... Remove this comment to see the full error message
        if (!Quest.World.game.pathID) Quest.World.game.pathID = 0;
        if (maxlength === undefined) maxlength = 999;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pathID' does not exist on type '{ turnCo... Remove this comment to see the full error message
        Quest.World.game.pathID++;
        let currentList = [start];
        let length      = 0;
        let nextList; let dest; let
          exits;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pathID' does not exist on type '{ turnCo... Remove this comment to see the full error message
        start.pathfinderNote = { id: Quest.World.game.pathID };

        // At each iteration we look at the rooms linked from the previous one
        // Any new rooms go into nextList
        // Each room gets flagged with "pathfinderNote"
        while (currentList.length > 0 && length < maxlength) {
          nextList = [];
          length++;
          for (const room of currentList) {
            exits = room.getExits({ npc: true });
            for (const exit of exits) {
              if (exit.name === '_') continue;
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              dest = Quest.World.w[exit.name];
              if (dest === undefined) {
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                Quest.IO.errormsg(`Dest is undefined: ${exit.name} (room ${room.name}). Giving up.`);
                console.log(this);
                return false;
              }
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'pathID' does not exist on type '{ turnCo... Remove this comment to see the full error message
              if (dest.pathfinderNote && dest.pathfinderNote.id === Quest.World.game.pathID) continue;
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'pathID' does not exist on type '{ turnCo... Remove this comment to see the full error message
              dest.pathfinderNote = { id: Quest.World.game.pathID, jumpFrom: room };
              if (dest === end) return agenda.extractPath(start, end);
              nextList.push(dest);
            }
          }
          currentList = nextList;
        }
        return false;
        /* console.error("Path-finding failed: " + (currentList.length === 0 ? 'list is empty' : 'exceeded maximum length'))
        log("start: " + start.name)
        log("end: " + end.name)
        log("maxlength: " + maxlength)
        console.trace()
        throw("Path-finding failed, see comments above.") */
      },
      
      handleWaitFor(npc: any, arr: any, immediate: any) {
        this.debug('waitFor', npc, arr);
        let name = arr.shift();
        if (typeof npc[name] === 'function') {
          if (npc[name](arr)) {
            this.text(npc, arr);
            this.debugS('Pass');
            return (immediate ? 'next' : true);
          }
          return false;
        }
        if (name === 'player') name = Quest.World.player.name;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (npc.loc === Quest.World.w[name].loc) {
          this.text(npc, arr);
          this.debugS('Pass');
          return (immediate ? 'next' : true);
        }
        return false;
      },

      extractPath(start: any, end: any) {
        const res   = [end];
        let current = end;
        let count   = 0;

        do {
          current = current.pathfinderNote.jumpFrom;
          res.push(current);
          count++;
        } while (current !== start && count < 99);
        res.pop();  // The last is the start location, which we do not ned
        return res.reverse();
      },

      handleWaitUntilWhile(npc: any, arr: any, reverse: any, immediate: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const item = arr[0] === 'player' ? player : Quest.World.w[arr[0]];
        arr.shift();
        const attName = arr.shift();
        const value   = Quest.Utilities.util.guessMyType(arr.shift());
        let flag      = item[attName] === value;
        if (reverse) flag = !flag;
        if (flag) return false;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(arr.join(':'));
        return immediate ? 'next' : true;
      },

      joinedBy(npc: any, arr: any) {
        this.debug('joinedBy', npc, arr);
        const followerName = arr.shift();
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        Quest.World.w[followerName].setLeader(npc);
        this.text(npc, arr);
        return true;
      },

      joining(npc: any, arr: any) {
        this.debug('joining', npc, arr);
        const leaderName = arr.shift();
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        npc.setLeader(Quest.World.w[leaderName]);
        this.text(npc, arr);
        return true;
      },

      // Move directly to the given location, then print the rest of the array as text
      // Use "player" to go directly to the room the player is in.
      // Use an item (i.e., an object not flagged as a room) to have the NPC move
      // to the room containing the item.
      // None of the usual reactions will be performed, so items carried with not react to
      // moving, any followers will be left behind, etc.
      jumpTo(npc: any, arr: any) {
        let dest = arr.shift();
        if (dest === 'player') {
          dest = Quest.World.player.loc;
        } else if (dest === '_') {
          dest = false;
        } else {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!Quest.World.w[dest]) return Quest.IO.errormsg(`Location '${dest}' not recognised in the agenda of ${npc.name}`);
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!Quest.World.w[dest].room) dest = dest.loc;  // go to the room the item is in
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!Quest.World.w[dest]) return Quest.IO.errormsg(`Location '${dest}' not recognized in the agenda of ${npc.name}`);
        }
        npc.loc = dest;
        this.text(npc, arr);
        return true;
      },

      // Move to the given location, using available, unlocked exits, one room per turn
      // then print the rest of the array as text
      // Use "player" to go to the room the player is in (if the player moves, the NPC will head
      // to the new position, but will be omniscient!).
      // Use an item (i.e., an object not flagged as a room) to have the NPC move
      // to the room containing the item.
      // This may be repeated any number of turns
      leadTo(npc: any, arr: any) {
        this.debug('leadTo', npc, arr);
        if (npc.loc !== Quest.World.player.loc) return false;
        return this.walkTo(npc, arr);
      },

      // Move the given item directly to the given location, then print the rest of the array as text
      // Do not use for items with a funny location, such as COUNTABLES
      moveItem(npc: any, arr: any) {
        this.debug('moveItem', npc, arr);
        const item = arr.shift();
        let dest   = arr.shift();
        if (dest === 'player') {
          dest = Quest.World.player.name;
        } else if (dest === '_') {
          dest = false;
        } else {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!Quest.World.w[dest]) return Quest.IO.errormsg(`Location '${dest}' not recognized in the agenda of ${npc.name}`);
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        Quest.World.w[item].moveToFrom({ char: npc, item, toLoc: dest });
        this.text(npc, arr);
        return true;
      },

      // Move to the given location, then print the rest of the array as text.
      // There must be an exit from the current room to that room.
      moveTo(npc: any, arr: any) {
        let dest = arr.shift();
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!Quest.World.w[dest]) return Quest.IO.errormsg(`Location '${dest}' not recognised in the agenda of ${npc.name}`);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!Quest.World.w[dest].room) dest = dest.loc;  // go to the room the item is in
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const exit = Quest.World.w[npc.loc].findExit(dest);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!exit) return Quest.IO.errormsg(`Could not find an exit to location '${dest}' in the agenda of ${npc.name}`);
        // log("Move " + npc.name + " to " + dest)
        npc.movingMsg(exit);
        npc.moveChar(exit);
        this.text(npc, arr);
        return true;
      },

      msg(npc: any, arr: any) {
        this.debug('msg (string)', npc, arr);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(arr.join(':'));
        return true;
      },
      
      patrol(npc: any, arr: any) {
        this.debug('patrol', npc, arr);
        if (npc.patrolCounter === undefined) npc.patrolCounter = -1;
        npc.patrolCounter = (npc.patrolCounter + 1) % arr.length;
        this.moveTo(npc, [arr[npc.patrolCounter]]);
        return false;
      },
      
      // wait one turn
      pause(npc: any, arr: any) {
        return true;
      },

      // Alias for text
      run(npc: any, arr: any) {
        return this.text(npc, arr);
      },

      // sets one attribute on the given item
      // it will guess if Boolean, integer or string
      setItemAtt(npc: any, arr: any) {
        this.debug('setItemAtt', npc, arr);
        const item = arr.shift();
        const att  = arr.shift();
        let value  = arr.shift();
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!Quest.World.w[item]) Quest.IO.errormsg(`Item '${item}' not recognised in the agenda of ${npc.name}`);
        if (value === 'true') value = true;
        if (value === 'false') value = false;
        if (/^\d+$/.test(value)) value = parseInt(value);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        Quest.World.w[item][att] = value;
        this.text(npc, arr);
        return true;
      },

      // Initiate a conversation, with this topic
      showTopic(npc: any, arr: any) {
        const alias = arr.shift();
        npc.showTopic(alias);
        this.text(npc, arr);
        return true;
      },

      // print the array as text if the player is here
      // otherwise this will be skipped
      // Used by several other functions, so this applies to them too
      text(npc: any, arr: any) {
        if (typeof npc[arr[0]] === 'function') {
          this.debug('text (function)', npc, arr);
          const fn  = arr.shift();
          const res = npc[fn](arr);
          return (typeof res === 'boolean' ? res : true);
        }
        this.debug('text (string)', npc, arr);

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        if (npc.inSight()) Quest.IO.msg(arr.join(':'));
        return true;
      },

      // Wait n turns
      wait(npc: any, arr: any) {
        this.debug('wait', npc, arr);
        if (arr.length === 0) return true;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (isNaN(arr[0])) Quest.IO.errormsg(`Expected wait to be given a number in the agenda of '${npc.name}'`);
        const count = parseInt(arr.shift());
        if (npc.agendaWaitCounter !== undefined) {
          npc.agendaWaitCounter++;
          if (npc.agendaWaitCounter >= count) {
            this.debugS('Pass');
            this.text(npc, arr);
            return true;
          }
          return false;
        }
        npc.agendaWaitCounter = 0;
        return false;
      },

      // Wait until ...
      // This may be repeated any number of times
      waitFor(npc: any, arr: any) {
        return this.handleWaitFor(npc, arr, false);
      },

      waitForNow(npc: any, arr: any) {
        return this.handleWaitFor(npc, arr, true);
      },

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      waitUntil(npc: any, arr: any) {
        return agenda.handleWaitUntilWhile(npc, arr, true);
      },

      waitUntilNow(npc: any, arr: any) {
        return agenda.handleWaitUntilWhile(npc, arr, true, true);
      },

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
      waitWhile(npc: any, arr: any) {
        return agenda.handleWaitUntilWhile(npc, arr, false);
      },

      waitWhileNow(npc: any, arr: any) {
        return agenda.handleWaitUntilWhile(npc, arr, false, true);
      },

      // Move to another room via a random, unlocked exit, then print the rest of the array as text
      walkRandom(npc: any, arr: any) {
        this.debug('walkRandom', npc, arr);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const exit = Quest.World.w[npc.loc].getRandomExit({ excludeLocked: true, excludeScenery: true });
        if (exit === null) {
          this.text(npc, arr);
          return true;
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!Quest.World.w[exit.name]) Quest.IO.errormsg(`Location '${exit.name}' not recognised in the agenda of ${npc.name}`);
        npc.movingMsg(exit);
        npc.moveChar(exit);
        return false;
      },

      walkTo(npc: any, arr: any) {
        this.debug('walkTo', npc, arr);
        let dest = arr.shift();
        if (dest === 'player') dest = Quest.World.player.loc;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[dest] === undefined) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.errormsg(`Location '${dest}' not recognised in the agenda of ${npc.name}`);
          return true;
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!Quest.World.w[dest].room) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          dest = Quest.World.w[dest].loc;
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (Quest.World.w[dest] === undefined) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
            Quest.IO.errormsg(`Object location '${dest}' not recognised in the agenda of ${npc.name}`);
            return true;
          }
        }
        if (npc.isAtLoc(dest)) {
          this.text(npc, arr);
          return true;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'findPath' does not exist on type '{ debu... Remove this comment to see the full error message
        const route = agenda.findPath(Quest.World.w[npc.loc], Quest.World.w[dest]);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!route) Quest.IO.errormsg(`Location '${dest}' not reachable in the agenda of ${npc.name}`);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const exit = Quest.World.w[npc.loc].findExit(route[0]);
        npc.movingMsg(exit);
        npc.moveChar(exit);
        if (npc.isAtLoc(dest)) {
          this.text(npc, arr);
          return true;
        }
        return false;
      },
    };

    const CONSULTABLE = function () {
      const res = {};
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'consultable' does not exist on type '{}'... Remove this comment to see the full error message
      res.consultable = true;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'askabout' does not exist on type '{}'.
      res.askabout = function (text1: any, text2: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'asktellabout' does not exist on type '{}... Remove this comment to see the full error message
        return this.asktellabout(text1, text2, Quest.lang.ask_about_intro, this.askOptions, 'ask');
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'tellabout' does not exist on type '{}'.
      res.tellabout = function (text1: any, text2: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'asktellabout' does not exist on type '{}... Remove this comment to see the full error message
        return this.asktellabout(text1, text2, Quest.lang.tell_about_intro, this.tellOptions, 'tell');
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'talkabout' does not exist on type '{}'.
      res.talkabout = function (text1: any, text2: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'talkOptions' does not exist on type '{}'... Remove this comment to see the full error message
        let data = this.talkOptions;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'talkOptions' does not exist on type '{}'... Remove this comment to see the full error message
        if (!this.talkOptions) data = this.tellOptions ? this.tellOptions.concat(this.askOptions) : this.askOptions;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'asktellabout' does not exist on type '{}... Remove this comment to see the full error message
        return this.asktellabout(text1, text2, Quest.lang.talk_about_intro, data, 'talk');
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'asktellabout' does not exist on type '{}... Remove this comment to see the full error message
      res.asktellabout = function (text1: any, text2: any, intro: any, list: any, action: any) {
        // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'true' since the... Remove this comment to see the full error message
        if (Quest.Settings.settings.noAskTell !== false) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.Settings.settings.noAskTell);
          return false;
        }

        if (!Quest.World.player.testTalk(this)) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testTalk' does not exist on type '{}'.
        if (this.testTalk && !this.testTalk(text1, action)) return false;

        if (!list || list.length === 0) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          Quest.IO.metamsg(Quest.Settings.settings.noAskTell);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          return Quest.IO.errormsg(`No ${action}Options set for ${this.name} and I think there should at least be default saying why.`);
        }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        if (Quest.Settings.settings.givePlayerAskTellMsg) Quest.IO.msg(intro(this, text1, text2), { char: Quest.World.player });

        const params = {
          action,
          char: this,
          text: text1,
          text2,
        };
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'askTellDone' does not exist on type '{}'... Remove this comment to see the full error message
        return Quest.Utilities.scopeBy(params, list, this.askTellDone);
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'askTellDone' does not exist on type '{}'... Remove this comment to see the full error message
      res.askTellDone = function (params: any, response: any) {
        if (!response) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.npc_no_interest_in, params);
          return;
        }
        if (response.mentions) {
          for (const s of response.mentions) {
            if (!Quest.World.player.mentionedTopics.includes(s)) Quest.World.player.mentionedTopics.push(s);
          }
        }
        params.char.pause();
      };

      return res;
    };

    export const QUESTION = function () {
      return {
        sayResponse(char: any, s: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'responses' does not exist on type '{ say... Remove this comment to see the full error message
          for (const res of this.responses) {
            if (!res.regex || res.regex.test(s)) {
              char.sayBonus    = 0;
              char.sayQuestion = false;
              res.response(s);
              return true;
            }
          }
          return false;
        },
      };
    };

    export const TOPIC = function (fromStart: any) {
      return {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ conversat... Remove this comment to see the full error message
        belongsTo(loc: any) {
          return this.loc === loc;
        },

        conversationTopic: true,

        count: 0,

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countdown' does not exist on type '{ con... Remove this comment to see the full error message
        eventIsActive() {
          this.showTopic && !this.hideTopic && this.countdown;
        },

        eventPeriod: 1,

        eventScript() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'countdown' does not exist on type '{ con... Remove this comment to see the full error message
          this.countdown--;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'countdown' does not exist on type '{ con... Remove this comment to see the full error message
          if (this.countdown < 0) this.hide();
        },

        hide() {
          return this.hideTopic = true;
        },

        hideAfter: true,

        hideTopic: false,

        isAtLoc: () => false,

        isTopicVisible(char: any) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
          return this.showTopic && !this.hideTopic && this.belongsTo(char.name) && this.isVisible(char);
        },

        isVisible: () => true,

        nowHide:    [],
        // we do not want "the" prepended
        nowShow:    [],
        properNoun: true,
        runscript() {
          const obj = Quest.World.player.conversingWithNpc;
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (obj === undefined) return Quest.IO.errormsg(`No conversing NPC called ${Quest.World.player.conversingWithNpc} found.`);
          obj.pause();
          this.hideTopic = this.hideAfter;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'script' does not exist on type '{ conver... Remove this comment to see the full error message
          if (!this.script && !this.msg) return Quest.IO.errormsg(`Topic ${this.name} has neither script nor msg attributes.`);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'script' does not exist on type '{ conver... Remove this comment to see the full error message
          if (this.script) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'script' does not exist on type '{ conver... Remove this comment to see the full error message
            if (typeof this.script !== 'function') return Quest.IO.errormsg(`script for topic ${this.name} is not a function.`);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'script' does not exist on type '{ conver... Remove this comment to see the full error message
            this.script.bind(obj)({ char: obj, player: Quest.World.player, topic: this });
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{ conversat... Remove this comment to see the full error message
          if (this.msg) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{ conversat... Remove this comment to see the full error message
            if (typeof this.msg !== 'string') return Quest.IO.errormsg(`msg for topic ${this.name} is not a string.`);
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(this.msg, { char: obj, topic: this });
          }
          this.showHideList(this.nowShow, true);
          this.showHideList(this.nowHide, false);
          this.count++;
          Quest.World.world.endTurn(Quest.World.world.SUCCESS);
        },
        show() {
          return this.showTopic = true;
        },
        showHideList(list: any, isShow: any) {
          if (typeof list === 'string') {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ conversa... Remove this comment to see the full error message
            log(`WARNING: ${isShow ? 'nowShow' : 'nowHide'} for topic ${this.name} is a string.`);
            return;
          }
          for (const s of list) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'findTopic' does not exist on type '{}'.
            const t = Quest.Utilities.util.findTopic(s);
            if (t) {
              t[isShow ? 'showTopic' : 'hideTopic'] = true;
            } else {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ conversa... Remove this comment to see the full error message
              log(`WARNING: Topic ${this.name} wants to now show/hide a non-existent topic, ${s}`);
            }
          }
        },
        showTopic: fromStart,
      };
    };
  }
}
