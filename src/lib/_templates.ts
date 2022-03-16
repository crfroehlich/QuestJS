namespace Quest {
  export namespace Templates {

    // Should all be language neutral
    export const TAKEABLE_DICTIONARY = {
      afterCreation(o: any) {
        o.verbFunctions.push((o: any, verbList: any) => {
          verbList.push(o.isAtLoc(Quest.World.player.name) ? Quest.lang.verbs.drop : Quest.lang.verbs.take);
        });
      },

      drop(options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testDrop' does not exist on type '{ afte... Remove this comment to see the full error message
        if (this.testDrop && !this.testDrop(options)) return false;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const dest = Quest.World.w[options.char.loc];
        if (dest.testDropIn && !dest.testDropIn(options)) return false;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgDrop, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveToFrom' does not exist on type '{ af... Remove this comment to see the full error message
        this.moveToFrom(options, 'loc', 'name');
        return true;
      },
      msgDrop:    Quest.lang.drop_successful,
      msgDropIn:  Quest.lang.done_msg,
      msgTake:    Quest.lang.take_successful,
      msgTakeOut: Quest.lang.done_msg,

      take(options: any) {
        const { char } = options;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ after... Remove this comment to see the full error message
        if (this.isAtLoc(char.name)) return Quest.IO.falsemsg(Quest.lang.already_have, options);
        if (!char.testManipulate(this, 'take')) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testTake' does not exist on type '{ afte... Remove this comment to see the full error message
        if (this.testTake && !this.testTake(options)) return false;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[char.loc].testTakeOut && !Quest.World.w[char.loc].testTakeOut(options)) return false;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgTake, options);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveToFrom' does not exist on type '{ af... Remove this comment to see the full error message
        this.moveToFrom(options, 'name', 'loc');
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ after... Remove this comment to see the full error message
        if (this.scenery) this.scenery = false;
        return true;
      },

      // This returns the location from which the item is to be taken
      // (and does not do taking from a location).
      // This can be useful for weird objects, such as ropes
      // @ts-expect-error ts-migrate(7023) FIXME: 'takeFromLoc' implicitly has return type 'any' bec... Remove this comment to see the full error message
      takeFromLoc(char: any) {
        return this.loc;
      },

      takeable: true,

    };

    export const TAKEABLE = () => TAKEABLE_DICTIONARY;

    export const SHIFTABLE = function () {
      return {
        shiftable: true,
      };
    };

    export const createEnsemble = function (name: any, ensembleMembers: any, dict: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
      const res = Quest.World.createItem(name, dict);
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.ensemble = true;
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.ensembleMembers = ensembleMembers;
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.parserPriority = 30;
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.inventorySkip = true;
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.takeable = true;
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.getWorn = function (situation: any) {
        return this.isAtLoc(this.ensembleMembers[0].loc, situation) && this.ensembleMembers[0].getWorn();
      };

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.nameModifierFunctions = [function (o: any, list: any) {
        if (o.ensembleMembers[0].getWorn() && o.isAllTogether() && o.ensembleMembers[0].isAtLoc(Quest.World.player.name)) list.push(Quest.lang.invModifiers.worn);
      }];

      // Tests if all parts are n the same location and either all are worn or none are worn
      // We can use this to determine if the set is together or not too
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.isLocatedAt = function (loc: any, situation: any) {
        if (situation !== Quest.World.world.PARSER) return false;
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const worn = this.ensembleMembers[0].getWorn();
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        for (const member of this.ensembleMembers) {
          if (member.loc !== loc) return false;
          if (member.getWorn() !== worn) return false;
        }
        return true;
      };

      // Tests if all parts are together
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.isAllTogether = function () {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const worn = this.ensembleMembers[0].getWorn();
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        const { loc } = this.ensembleMembers[0];
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        for (const member of this.ensembleMembers) {
          if (member.loc !== loc) return false;
          if (member.breakEnsemble && member.breakEnsemble()) return false;
          if (member.getWorn() !== worn) return false;
        }
        return true;
      };

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.msgDrop = Quest.lang.drop_successful;
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.msgTake = Quest.lang.take_successful;

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.drop = function (options: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const dest = Quest.World.w[options.char.loc];
        if (dest.testDrop && !dest.testDrop(options)) return false;
        if (dest.testDropIn && !dest.testDropIn(options)) return false;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgDrop, options);
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        for (const member of this.ensembleMembers) {
          member.moveToFrom(options, 'loc');
        }
        return true;
      };

      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      res.take = function (options: any) {
        const { char } = options;
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        if (this.isAtLoc(char.name)) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.already_have, options);
          return false;
        }

        if (!char.testManipulate(this, 'take')) return false;
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        if (this.testTake && !this.testTake(options)) return false;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[char.loc].testTakeOut && !Quest.World.w[char.loc].testTakeOut(options)) return false;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgTake, options);
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        for (const member of this.ensembleMembers) {
          member.moveToFrom(options, 'name');
          if (member.scenery) member.scenery = false;
        }
        return true;
      };

      for (const member of ensembleMembers) {
        member.ensembleMaster = res;
      }
      return res;
    };

    export const MERCH = function (value: any, locs: any) {
      const res = {

        canBeSoldHere(loc: any) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          return Quest.World.w[loc].willBuy && Quest.World.w[loc].willBuy(this);
        },

        // The price when the player buys the item
        // Uses the sellingDiscount, as te shop is selling it!
        getBuyingPrice(char: any) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (Quest.World.w[char.loc].sellingDiscount) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return Math.round(this.getPrice() * (100 - Quest.World.w[char.loc].sellingDiscount) / 100);
          }
          return this.getPrice();
        },

        getPrice() {
          return this.price;
        },

        // The price when the player sells the item
        // By default, half the "list" price
        //
        getSellingPrice(char: any) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (Quest.World.w[char.loc].buyingValue) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            return Math.round(this.getPrice() * (Quest.World.w[char.loc].buyingValue) / 100);
          }
          return Math.round(this.getPrice() / 2);
        },

        // @ts-expect-error ts-migrate(7023) FIXME: 'isForSale' implicitly has return type 'any' becau... Remove this comment to see the full error message
        isForSale(loc: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'salesLoc' does not exist on type '{ pric... Remove this comment to see the full error message
          if (!this.salesLoc && !this.salesLocs) return false;  // already sold
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotClone' does not exist on type '{ pr... Remove this comment to see the full error message
          if (this.doNotClone) return (this.salesLoc === loc);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'salesLocs' does not exist on type '{ pri... Remove this comment to see the full error message
          return (this.salesLocs.includes(loc));
        },

        // @ts-expect-error ts-migrate(7023) FIXME: 'isLocatedAt' implicitly has return type 'any' bec... Remove this comment to see the full error message
        isLocatedAt(loc: any, situation: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'salesLoc' does not exist on type '{ pric... Remove this comment to see the full error message
          if (this.salesLoc || this.salesLocs) {
            // In the shop for sale
            return (situation === Quest.World.world.PURCHASE || situation === Quest.World.world.PARSER) && this.isForSale(loc);
          }

          // Acting like a normal item
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ price: an... Remove this comment to see the full error message
          return this.loc === loc;
        },

        msgPurchase: Quest.lang.purchase_successful,

        msgSell: Quest.lang.sell_successful,

        price: value,

        purchase(options: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'testPurchase' does not exist on type '{ ... Remove this comment to see the full error message
          if (this.testPurchase && !this.testPurchase(options)) return false;
          if (!this.isForSale(options.char.loc)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotClone' does not exist on type '{ pr... Remove this comment to see the full error message
            return Quest.IO.failedmsg(this.doNotClone && this.isAtLoc(options.char.name) ? Quest.lang.cannot_purchase_again : Quest.lang.cannot_purchase_here, options);
          }

          const cost    = this.getBuyingPrice(options.char);
          options.money = cost;
          if (options.char.money < cost) return Quest.IO.failedmsg(Quest.lang.cannot_afford, options);
          return this.purchaseScript(options, options.char, cost);
        },

        purchaseScript(options: any, char: any, cost: any) {
          char.money -= cost;
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(this.msgPurchase, options);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotClone' does not exist on type '{ pr... Remove this comment to see the full error message
          if (this.doNotClone) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ price: an... Remove this comment to see the full error message
            this.loc = char.name;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'salesLoc' does not exist on type '{ pric... Remove this comment to see the full error message
            delete this.salesLoc;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterPurchase' does not exist on type '{... Remove this comment to see the full error message
            if (this.afterPurchase) this.afterPurchase(options);
          } else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            const o = Quest.World.cloneObject(this, char.name);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{}'.
            o.loc = char.name;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'salesLocs' does not exist on type '{}'.
            delete o.salesLocs;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterPurchase' does not exist on type '{... Remove this comment to see the full error message
            if (o.afterPurchase) o.afterPurchase(options);
          }
          return Quest.World.world.SUCCESS;
        },

        sell(options: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'testSell' does not exist on type '{ pric... Remove this comment to see the full error message
          if (this.testSell && !this.testSell(options)) return false;
          if (!this.canBeSoldHere(options.char.loc)) {
            return Quest.IO.failedmsg(Quest.lang.cannot_sell_here, options);
          }
          const cost          = this.getSellingPrice(options.char);
          options.money       = cost;
          options.char.money += cost;
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(this.msgSell, options);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotClone' does not exist on type '{ pr... Remove this comment to see the full error message
          if (this.doNotClone) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'salesLoc' does not exist on type '{ pric... Remove this comment to see the full error message
            this.salesLoc = options.char.loc;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ price: an... Remove this comment to see the full error message
            delete this.loc;
          } else {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            delete Quest.World.w[this.name];
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSell' does not exist on type '{ pri... Remove this comment to see the full error message
          if (this.afterSell) this.afterSell(options);
          return Quest.World.world.SUCCESS;
        },
      };
      if (!Array.isArray(locs)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doNotClone' does not exist on type '{ pr... Remove this comment to see the full error message
        res.doNotClone = true;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'salesLoc' does not exist on type '{ pric... Remove this comment to see the full error message
        res.salesLoc = locs;
      } else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'salesLocs' does not exist on type '{ pri... Remove this comment to see the full error message
        res.salesLocs = locs;
      }
      return res;
    };

    // countableLocs should be a dictionary, with the room name as the key, and the number there as the value
    export const COUNTABLE = function (countableLocs: any) {
      const res = { ...TAKEABLE_DICTIONARY };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'countable' does not exist on type '{ aft... Remove this comment to see the full error message
      res.countable = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
      res.countableLocs = countableLocs || {};
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'multiLoc' does not exist on type '{ afte... Remove this comment to see the full error message
      res.multiLoc = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultToAll' does not exist on type '{ ... Remove this comment to see the full error message
      res.defaultToAll = true;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isUltimatelyHeldBy' does not exist on ty... Remove this comment to see the full error message
      res.isUltimatelyHeldBy = function (obj: any) {
        const locs = [];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        for (const key in this.countableLocs) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
          if (this.countableLocs[key]) locs.push(key);
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'multiIsUltimatelyHeldBy' does not exist ... Remove this comment to see the full error message
        return Quest.Utilities.util.multiIsUltimatelyHeldBy(obj, locs);
      },

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'extractNumber' does not exist on type '{... Remove this comment to see the full error message
      res.extractNumber = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'cmdMatch' does not exist on type '{ afte... Remove this comment to see the full error message
        const md = /^(\d+)/.exec(this.cmdMatch);
        if (!md) {
          return false;
        }
        return parseInt(md[1]);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'beforeSaveForTemplate' does not exist on... Remove this comment to see the full error message
      res.beforeSaveForTemplate = function () {
        const l = [];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        for (const key in this.countableLocs) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
          l.push(`${key}=${this.countableLocs[key]}`);
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'customSaveCountableLocs' does not exist ... Remove this comment to see the full error message
        this.customSaveCountableLocs = l.join(',');
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'beforeSave' does not exist on type '{ af... Remove this comment to see the full error message
        this.beforeSave();
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLoadForTemplate' does not exist on ... Remove this comment to see the full error message
      res.afterLoadForTemplate = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'customSaveCountableLocs' does not exist ... Remove this comment to see the full error message
        const l = this.customSaveCountableLocs.split(',');
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        this.countableLocs = {};
        for (const el of l) {
          const parts = el.split('=');
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
          this.countableLocs[parts[0]] = parseInt(parts[1]);
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'customSaveCountableLocs' does not exist ... Remove this comment to see the full error message
        this.customSaveCountableLocs = false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLoad' does not exist on type '{ aft... Remove this comment to see the full error message
        this.afterLoad();
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getListAlias' does not exist on type '{ ... Remove this comment to see the full error message
      res.getListAlias = function (loc: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'pluralAlias' does not exist on type '{ a... Remove this comment to see the full error message
        return `${Quest.Utilities.sentenceCase(this.pluralAlias)} (${this.countAtLoc(loc)})`;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLocatedAt' does not exist on type '{ a... Remove this comment to see the full error message
      res.isLocatedAt = function (loc: any, situation: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        if (!this.countableLocs[loc]) {
          return false;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        return (this.countableLocs[loc] > 0 || this.countableLocs[loc] === 'infinity');
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'countAtLoc' does not exist on type '{ af... Remove this comment to see the full error message
      res.countAtLoc = function (loc: any) {
        if (typeof loc !== 'string') loc = loc.name;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        if (!this.countableLocs[loc]) {
          return 0;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        return this.countableLocs[loc];
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveToFrom' does not exist on type '{ af... Remove this comment to see the full error message
      res.moveToFrom = function (options: any, toLoc: any, fromLoc: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'setToFrom' does not exist on type '{}'.
        Quest.Utilities.util.setToFrom(options, toLoc, fromLoc);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'extractNumber' does not exist on type '{... Remove this comment to see the full error message
        let count = options.count ? options.count : this.extractNumber();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countAtLoc' does not exist on type '{ af... Remove this comment to see the full error message
        if (!count) count = options.fromLoc === Quest.World.player.name ? 1 : this.countAtLoc(options.fromLoc);
        if (count === 'infinity') count = 1;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'takeFrom' does not exist on type '{ afte... Remove this comment to see the full error message
        this.takeFrom(options.fromLoc, count);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'giveTo' does not exist on type '{ afterC... Remove this comment to see the full error message
        this.giveTo(options.toLoc, count);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'takeFrom' does not exist on type '{ afte... Remove this comment to see the full error message
      res.takeFrom = function (loc: any, count: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        if (this.countableLocs[loc] !== 'infinity') this.countableLocs[loc] -= count;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        if (this.countableLocs[loc] <= 0) this.countableLocs[loc] = false;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        Quest.World.w[loc].afterDropIn(Quest.World.player, { count, item: this });
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'giveTo' does not exist on type '{ afterC... Remove this comment to see the full error message
      res.giveTo = function (loc: any, count: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        if (!this.countableLocs[loc]) {
          this.countableLocs[loc] = 0;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countableLocs' does not exist on type '{... Remove this comment to see the full error message
        if (this.countableLocs[loc] !== 'infinity') this.countableLocs[loc] += count;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        Quest.World.w[loc].afterDropIn(Quest.World.player, { count, item: this });
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{ af... Remove this comment to see the full error message
      res.findSource = function (sourceLoc: any, tryContainers: any) {
        // some at the specific location, so use them
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ after... Remove this comment to see the full error message
        if (this.isAtLoc(sourceLoc)) {
          return sourceLoc;
        }

        if (tryContainers) {
          const containers = Quest.Utilities.scopeReachable().filter((el) => el.container);
          for (const container of containers) {
            if (container.closed) continue;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ after... Remove this comment to see the full error message
            if (this.isAtLoc(container.name)) return container.name;
          }
        }

        return false;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getTakeDropCount' does not exist on type... Remove this comment to see the full error message
      res.getTakeDropCount = function (options: any, loc: any) {
        options.excess = false; // do this here to ensure it is resrt
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'extractNumber' does not exist on type '{... Remove this comment to see the full error message
        let n = this.extractNumber();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countAtLoc' does not exist on type '{ af... Remove this comment to see the full error message
        const m = this.countAtLoc(loc);
        if (!n) {  // no number specified
          if (m === 'infinity') {
            n = 1;
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultToAll' does not exist on type '{ ... Remove this comment to see the full error message
          else if (this.defaultToAll) {
            n = m;
          } else {
            n = 1;
          }
        }
        if (n > m) {  // too big number specified
          n              = m;
          options.excess = true;
        }
        options.count = n;
      };

      // As this is flagged as multiLoc, need to take special care about where the thing is
      res.take = function (options) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{ af... Remove this comment to see the full error message
        const sourceLoc = this.findSource(options.char.loc, true);
        if (!sourceLoc) return Quest.IO.falsemsg(Quest.lang.none_here, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getTakeDropCount' does not exist on type... Remove this comment to see the full error message
        this.getTakeDropCount(options, sourceLoc);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testTake' does not exist on type '{ afte... Remove this comment to see the full error message
        if (this.testTake && !this.testTake(options)) return false;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[sourceLoc].testTakeOut && !Quest.World.w[sourceLoc].testTakeOut(options)) return false;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgTake, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'takeFrom' does not exist on type '{ afte... Remove this comment to see the full error message
        this.takeFrom(sourceLoc, options.count);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'giveTo' does not exist on type '{ afterC... Remove this comment to see the full error message
        this.giveTo(options.char.name, options.count);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ after... Remove this comment to see the full error message
        if (this.scenery) this.scenery = false;
        return true;
      };

      res.drop = function (options) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'countAtLoc' does not exist on type '{ af... Remove this comment to see the full error message
        if (this.countAtLoc(options.char.name) === 0) return Quest.IO.falsemsg(Quest.lang.none_held, options);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const dest          = Quest.World.w[options.char.loc];
        options.destination = dest;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getTakeDropCount' does not exist on type... Remove this comment to see the full error message
        this.getTakeDropCount(options, options.char.name);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testDrop' does not exist on type '{ afte... Remove this comment to see the full error message
        if (this.testDrop && !this.testDrop(options)) return false;
        if (dest.testDropIn && !dest.testDropIn(options)) return false;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgDrop, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'takeFrom' does not exist on type '{ afte... Remove this comment to see the full error message
        this.takeFrom(options.char.name, options.count);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'giveTo' does not exist on type '{ afterC... Remove this comment to see the full error message
        this.giveTo(options.char.loc, options.count);
        return true;
      };

      res.afterCreation = function (o) {
        if (!o.regex) o.regex = new RegExp(`^(\\d+ )?${o.name}s?$`);
      };

      return res;
    };

    export const WEARABLE = function (wear_layer: any, slots: any) {
      const res = { ...TAKEABLE_DICTIONARY };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wearable' does not exist on type '{ afte... Remove this comment to see the full error message
      res.wearable = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'armour' does not exist on type '{ afterC... Remove this comment to see the full error message
      res.armour = 0;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wear_layer' does not exist on type '{ af... Remove this comment to see the full error message
      res.wear_layer = wear_layer || false;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'slots' does not exist on type '{ afterCr... Remove this comment to see the full error message
      res.slots = slots && wear_layer ? slots : [];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'worn' does not exist on type '{ afterCre... Remove this comment to see the full error message
      res.worn = false;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'useDefaultsTo' does not exist on type '{... Remove this comment to see the full error message
      res.useDefaultsTo = function (char: any) {
        return char === Quest.World.player ? 'Wear' : 'NpcWear';
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSlots' does not exist on type '{ afte... Remove this comment to see the full error message
      res.getSlots = function () {
        return this.slots;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getWorn' does not exist on type '{ after... Remove this comment to see the full error message
      res.getWorn = function () {
        return this.worn;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getArmour' does not exist on type '{ aft... Remove this comment to see the full error message
      res.getArmour = function () {
        return this.armour;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgWear' does not exist on type '{ after... Remove this comment to see the full error message
      res.msgWear = Quest.lang.wear_successful;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgRemove' does not exist on type '{ aft... Remove this comment to see the full error message
      res.msgRemove = Quest.lang.remove_successful;

      res.afterCreation = function (o) {
        o.verbFunctions.push((o: any, verbList: any) => {
          if (!o.isAtLoc(Quest.World.player.name)) {
            verbList.push(Quest.lang.verbs.take);
          } else if (o.getWorn()) {
            if (!o.getWearRemoveBlocker(Quest.World.player, false)) verbList.push(Quest.lang.verbs.remove);
          } else {
            verbList.push(Quest.lang.verbs.drop);
            if (!o.getWearRemoveBlocker(Quest.World.player, true)) verbList.push(Quest.lang.verbs.wear);
          }
        });

        o.nameModifierFunctions.push((o: any, list: any) => {
          if (o.worn && o.isAtLoc(Quest.World.player.name)) list.push(Quest.lang.invModifiers.worn);
        });
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ afterCre... Remove this comment to see the full error message
      res.icon = () => 'garment12';

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getWearRemoveBlocker' does not exist on ... Remove this comment to see the full error message
      res.getWearRemoveBlocker = function (char: any, toWear: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'wear_layer' does not exist on type '{ af... Remove this comment to see the full error message
        if (!this.wear_layer) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getSlots' does not exist on type '{ afte... Remove this comment to see the full error message
        const slots = this.getSlots();
        for (const slot of slots) {
          const outer = char.getOuterWearable(slot);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'wear_layer' does not exist on type '{ af... Remove this comment to see the full error message
          if (outer && outer !== this && (outer.wear_layer >= this.wear_layer || outer.wear_layer === 0)) {
            return outer;
          }
        }
        return false;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testWear' does not exist on type '{ afte... Remove this comment to see the full error message
      res.testWear = function () {
        return true;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testRemove' does not exist on type '{ af... Remove this comment to see the full error message
      res.testRemove = function () {
        return true;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_canWearRemove' does not exist on type '... Remove this comment to see the full error message
      res._canWearRemove = function (toWear: any, options: any) {
        if (toWear) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'testWear' does not exist on type '{ afte... Remove this comment to see the full error message
          if (!this.testWear(options)) return false;
        } else {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'testRemove' does not exist on type '{ af... Remove this comment to see the full error message
          if (!this.testRemove(options)) return false;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getWearRemoveBlocker' does not exist on ... Remove this comment to see the full error message
        const outer = this.getWearRemoveBlocker(options.char, toWear);
        if (outer) {
          options.outer = outer;
          return Quest.IO.falsemsg(toWear ? Quest.lang.cannot_wear_over : Quest.lang.cannot_remove_under, options);
        }
        return true;
      };

      // Assumes the item is already held
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'wear' does not exist on type '{ afterCre... Remove this comment to see the full error message
      res.wear = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_canWearRemove' does not exist on type '... Remove this comment to see the full error message
        if (!this._canWearRemove(true, options)) return false;
        if (!options.char.testManipulate(this, 'wear')) return false;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgWear, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'worn' does not exist on type '{ afterCre... Remove this comment to see the full error message
        this.worn = true;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterWear' does not exist on type '{ aft... Remove this comment to see the full error message
        if (this.afterWear) this.afterWear(options);
        return true;
      };

      // Assumes the item is already held
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{ afterC... Remove this comment to see the full error message
      res.remove = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property '_canWearRemove' does not exist on type '... Remove this comment to see the full error message
        if (!this._canWearRemove(false, options)) return false;
        if (!options.char.testManipulate(this, 'remove')) return false;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgRemove, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'worn' does not exist on type '{ afterCre... Remove this comment to see the full error message
        this.worn = false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterRemove' does not exist on type '{ a... Remove this comment to see the full error message
        if (this.afterRemove) this.afterRemove(options);
        return true;
      };

      return res;
    };

    const OPENABLE_DICTIONARY = {
      close(options: any) {
        options.container = this;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'openable' does not exist on type '{ msgC... Remove this comment to see the full error message
        if (!this.openable) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.cannot_close, { item: this });
          return false;
        }
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
        if (this.closed) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.already, { item: this });
          return false;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testClose' does not exist on type '{ msg... Remove this comment to see the full error message
        if (this.testClose && !this.testClose(options)) {
          return false;
        }
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
        this.closed = true;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgClose, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterClose' does not exist on type '{ ms... Remove this comment to see the full error message
        if (this.afterClose) this.afterClose(options);
        return true;
      },
      msgClose:        Quest.lang.close_successful,
      msgCloseAndLock: Quest.lang.close_and_lock_successful,
      msgLock:         Quest.lang.lock_successful,
      msgOpen:         Quest.lang.open_successful,

      msgUnlock: Quest.lang.unlock_successful,

      open(options: any) {
        options.container = this;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'openable' does not exist on type '{ msgC... Remove this comment to see the full error message
        if (!this.openable) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.cannot_open, { item: this });
          return false;
        }
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
        if (!this.closed) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.already, { item: this });
          return false;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOpen' does not exist on type '{ msgC... Remove this comment to see the full error message
        if (this.testOpen && !this.testOpen(options)) {
          return false;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'locked' does not exist on type '{ msgClo... Remove this comment to see the full error message
        if (this.locked) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'testKeys' does not exist on type '{ msgC... Remove this comment to see the full error message
          if (this.testKeys(options.char)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'locked' does not exist on type '{ msgClo... Remove this comment to see the full error message
            this.locked = false;
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
            this.closed = false;
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(this.msgUnlock, options);
            this.openMsg(options);
            return true;
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.locked, options);
          return false;
        }
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
        this.closed = false;
        this.openMsg(options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterOpen' does not exist on type '{ msg... Remove this comment to see the full error message
        if (this.afterOpen) this.afterOpen(options);
        return true;
      },

      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      openMsg(options: any) {
        Quest.IO.msg(this.msgOpen, options);
      },

    };

    export const CONTAINER = function (openable: any) {
      const res = { ...OPENABLE_DICTIONARY };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type '{ msg... Remove this comment to see the full error message
      res.container = true;

      // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
      res.closed = openable;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openable' does not exist on type '{ msgC... Remove this comment to see the full error message
      res.openable = openable;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentsType' does not exist on type '{ ... Remove this comment to see the full error message
      res.contentsType = 'container';
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{ m... Remove this comment to see the full error message
      res.getContents = Quest.Utilities.util.getContents;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testForRecursion' does not exist on type... Remove this comment to see the full error message
      res.testForRecursion = Quest.Utilities.util.testForRecursion;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'listContents' does not exist on type '{ ... Remove this comment to see the full error message
      res.listContents = Quest.Utilities.util.listContents;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'transparent' does not exist on type '{ m... Remove this comment to see the full error message
      res.transparent = false;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCreation' does not exist on type '{... Remove this comment to see the full error message
      res.afterCreation = function (o: any) {
        o.verbFunctions.push((o: any, verbList: any) => {
          if (o.openable) {
            verbList.push(o.closed ? Quest.lang.verbs.open : Quest.lang.verbs.close);
          }
        });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'nameModifierFunctionForContainer' does n... Remove this comment to see the full error message
        o.nameModifierFunctions.push(Quest.Utilities.util.nameModifierFunctionForContainer);
      },

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'lookinside' does not exist on type '{ ms... Remove this comment to see the full error message
      res.lookinside = function (options: any) {
        options.container = this;
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
        if (this.closed && !this.transparent) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.nothing_inside, options);
          return false;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listContents' does not exist on type '{ ... Remove this comment to see the full error message
        options.list = this.listContents(Quest.World.world.LOOK, true);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(Quest.lang.look_inside, options);
        return true;
      };

      res.openMsg = function (options) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'listContents' does not exist on type '{ ... Remove this comment to see the full error message
        options.list = this.listContents(Quest.World.world.LOOK);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(`${this.msgOpen} ${options.list === Quest.lang.list_nothing ? Quest.lang.it_is_empty : Quest.lang.look_inside_it}`, options);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ msgClose... Remove this comment to see the full error message
      res.icon = function () {
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
        return this.closed ? 'closed12' : 'opened12';
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'canReachThroughThis' does not exist on t... Remove this comment to see the full error message
      res.canReachThroughThis = function () {
        return !this.closed;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'canSeeThroughThis' does not exist on typ... Remove this comment to see the full error message
      res.canSeeThroughThis = function () {
        return !this.closed || this.transparent;
      };

      return res;
    };

    export const SURFACE = function () {
      const res = {};
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type '{}'.
      res.container = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{}'... Remove this comment to see the full error message
      res.getContents = Quest.Utilities.util.getContents;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testForRecursion' does not exist on type... Remove this comment to see the full error message
      res.testForRecursion = Quest.Utilities.util.testForRecursion;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'listContents' does not exist on type '{}... Remove this comment to see the full error message
      res.listContents = Quest.Utilities.util.listContents;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCreation' does not exist on type '{... Remove this comment to see the full error message
      res.afterCreation = function (o: any) {
        o.nameModifierFunctions.push(Quest.Utilities.util.nameModifierFunctionForContainer);
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'closed' does not exist on type '{}'.
      res.closed = false;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openable' does not exist on type '{}'.
      res.openable = false;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'contentsType' does not exist on type '{}... Remove this comment to see the full error message
      res.contentsType = 'surface',
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'canReachThroughThis' does not exist on t... Remove this comment to see the full error message
      res.canReachThroughThis = () => true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'canSeeThroughThis' does not exist on typ... Remove this comment to see the full error message
      res.canSeeThroughThis = () => true;
      return res;
    };

    export const OPENABLE = function (alreadyOpen: any) {
      const res = { ...OPENABLE_DICTIONARY };
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'closed' does not exist on type '{ msgClo... Remove this comment to see the full error message
      res.closed = !alreadyOpen;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'openable' does not exist on type '{ msgC... Remove this comment to see the full error message
      res.openable = true;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCreation' does not exist on type '{... Remove this comment to see the full error message
      res.afterCreation = function (o: any) {
        o.verbFunctions.push((o: any, verbList: any) => {
          verbList.push(o.closed ? Quest.lang.verbs.open : Quest.lang.verbs.close);
        });
        o.nameModifierFunctions.push((o: any, list: any) => {
          if (!o.closed) list.push(Quest.lang.invModifiers.open);
        });
      };

      return res;
    };

    export const LOCKED_WITH = function (keyNames: any) {
      if (typeof keyNames === 'string') {
        keyNames = [keyNames];
      }
      if (keyNames === undefined) {
        keyNames = [];
      }
      return {
        keyNames,
        lock(options: any) {
          options.container = this;
          if (this.locked) return Quest.IO.falsemsg(Quest.lang.already, options);
          if (!this.testKeys(options.char, true)) return Quest.IO.falsemsg(Quest.lang.no_key, options);

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'closed' does not exist on type '{ keyNam... Remove this comment to see the full error message
          if (!this.closed) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closed' does not exist on type '{ keyNam... Remove this comment to see the full error message
            this.closed = true;
            this.locked = true;
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(this.msgCloseAndLock, options);
          } else {
            this.locked = true;
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(this.msgLock, options);
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLock' does not exist on type '{ key... Remove this comment to see the full error message
          if (this.afterLock) this.afterLock(options);
          return true;
        },
        locked: true,
        lockwith(options: any) {
          this.lock(options);
        },

        testKeys(char: any, toLock: any) {
          for (const s of this.keyNames) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (!Quest.World.w[s]) return Quest.IO.errormsg(`The key name for this container, \`${s}\`, does not match any key in the game.`);
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (Quest.World.w[s].isAtLoc(char.name)) return true;
          }
          return false;
        },

        unlock(options: any) {
          options.container = this;
          if (!this.locked) return Quest.IO.falsemsg(Quest.lang.already, { item: this });
          if (options.secondItem) {
            if (!this.keyNames.includes(options.secondItem.name)) return Quest.IO.falsemsg(Quest.lang.cannot_unlock_with, options);
          } else if (!this.testKeys(options.char, false)) return Quest.IO.falsemsg(Quest.lang.no_key, options);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(this.msgUnlock, options);
          this.locked = false;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterUnlock' does not exist on type '{ k... Remove this comment to see the full error message
          if (this.afterUnlock) this.afterUnlock(options);
          return true;
        },

        unlockwith(options: any) {
          this.unlock(options);
        },
      };
    };

    export const LOCKED_DOOR = function (key: any, loc1: any, loc2: any, name1: any, name2: any) {
      const res = { ...OPENABLE(false), ...LOCKED_WITH(key) };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc1' does not exist on type '{ msgClose... Remove this comment to see the full error message
      res.loc1 = loc1;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc2' does not exist on type '{ msgClose... Remove this comment to see the full error message
      res.loc2 = loc2;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name1' does not exist on type '{ msgClos... Remove this comment to see the full error message
      res.name1 = name1;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'name2' does not exist on type '{ msgClos... Remove this comment to see the full error message
      res.name2 = name2;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ msgCl... Remove this comment to see the full error message
      res.scenery = true;

      // @ts-expect-error ts-migrate(2339) FIXME: Property '_setup' does not exist on type '{ msgClo... Remove this comment to see the full error message
      res._setup = function () {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const room1 = Quest.World.w[this.loc1];
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!room1) return Quest.IO.errormsg(`Bad location name '${this.loc1}' for door ${this.name}`);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc2' does not exist on type '{ msgClose... Remove this comment to see the full error message
        const exit1 = room1.findExit(this.loc2);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!exit1) return Quest.IO.errormsg(`No exit to '${this.loc2}' for door ${this.name}`);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir1' does not exist on type '{ msgClose... Remove this comment to see the full error message
        this.dir1 = exit1.dir;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir1' does not exist on type '{ msgClose... Remove this comment to see the full error message
        if (!room1[this.dir1]) return Quest.IO.errormsg(`Bad exit '${this.dir1}' in location '${room1.name}' for door: ${this.name} (possibly because the room is defined after the door?)`);

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const room2 = Quest.World.w[this.loc2];
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!room2) return Quest.IO.errormsg(`Bad location name '${this.loc2}' for door ${this.name}`);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc1' does not exist on type '{ msgClose... Remove this comment to see the full error message
        const exit2 = room2.findExit(this.loc1);
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!exit2) return Quest.IO.errormsg(`No exit to '${this.loc1}' for door ${this.name}`);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir2' does not exist on type '{ msgClose... Remove this comment to see the full error message
        this.dir2 = exit2.dir;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir2' does not exist on type '{ msgClose... Remove this comment to see the full error message
        if (!room2[this.dir2]) return Quest.IO.errormsg(`Bad exit '${this.dir2}' in location '${room2.name}' for door: ${this.name} (possibly because the room is defined after the door?)`);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir1' does not exist on type '{ msgClose... Remove this comment to see the full error message
        room1[this.dir1].use = Quest.Utilities.util.useWithDoor;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir1' does not exist on type '{ msgClose... Remove this comment to see the full error message
        room1[this.dir1].door = this.name;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir1' does not exist on type '{ msgClose... Remove this comment to see the full error message
        room1[this.dir1].doorName = this.name1 || `door to ${Quest.lang.getName(Quest.World.w[this.loc2], { article: Quest.Utilities.DEFINITE })}`;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir2' does not exist on type '{ msgClose... Remove this comment to see the full error message
        room2[this.dir2].use = Quest.Utilities.util.useWithDoor;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir2' does not exist on type '{ msgClose... Remove this comment to see the full error message
        room2[this.dir2].door = this.name;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dir2' does not exist on type '{ msgClose... Remove this comment to see the full error message
        room2[this.dir2].doorName = this.name2 || `door to ${Quest.lang.getName(Quest.World.w[this.loc1], { article: Quest.Utilities.DEFINITE })}`;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLocatedAt' does not exist on type '{ m... Remove this comment to see the full error message
      res.isLocatedAt = function (loc: any) {
        return (loc == this.loc1 || loc == this.loc2);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ msgClose... Remove this comment to see the full error message
      res.icon = () => 'door12';

      return res;
    };

    export const KEY = function () {
      const res = { ...TAKEABLE_DICTIONARY };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'key' does not exist on type '{ afterCrea... Remove this comment to see the full error message
      res.key = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ afterCre... Remove this comment to see the full error message
      res.icon = () => 'key12';
      return res;
    };

    export const READABLE = function (mustBeHeld: any) {
      const res = {};
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'readable' does not exist on type '{}'.
      res.readable = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'mustBeHeld' does not exist on type '{}'.
      res.mustBeHeld = mustBeHeld;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{}'.
      res.icon = () => 'readable12';
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCreation' does not exist on type '{... Remove this comment to see the full error message
      res.afterCreation = function (o: any) {
        o.verbFunctions.push((o: any, verbList: any) => {
          if (o.loc === Quest.World.player.name || !o.mustBeHeld) verbList.push(Quest.lang.verbs.read);
        });
      };
      return res;
    };

    export const FURNITURE = function (options: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (options === undefined) return Quest.IO.errormsg('No options for FURNITURE template. Look in the stack traces below for a reference to a file you are using to create objects, and see what the line number is.');
      const res = {
        getoff(options: any) {
          if (!options.char.posture) {
            options.char.msg(Quest.lang.already, options);
            return false;
          }
          if (options.char.posture) {
            options.char.msg(Quest.lang.stop_posture(options.char));  // stop_posture handles details
            return true;
          }
        },
        testPostureOn: () => true,
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'useDefaultsTo' does not exist on type '{... Remove this comment to see the full error message
      res.useDefaultsTo = function (char: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'useCmd' does not exist on type '{ testPo... Remove this comment to see the full error message
        const cmd = this.useCmd ? this.useCmd : (this.reclineon ? 'ReclineOn' : (this.siton ? 'SitOn' : 'StandOn'));
        return char === Quest.World.player ? cmd : `Npc${cmd}`;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCreation' does not exist on type '{... Remove this comment to see the full error message
      res.afterCreation = function (o: any) {
        o.verbFunctions.push((o: any, verbList: any) => {
          if (Quest.World.player.posture && Quest.World.player.postureFurniture === o.name) {
            verbList.push(Quest.lang.verbs.getOff);
            return;
          }
          if (Quest.World.player.posture && Quest.World.player.posture !== 'standing') return;
          if (o.siton) verbList.push(Quest.lang.verbs.sitOn);
          if (o.standon) verbList.push(Quest.lang.verbs.standOn);
          if (o.reclineon) verbList.push(Quest.lang.verbs.reclineOn);
        });
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'assumePosture' does not exist on type '{... Remove this comment to see the full error message
      res.assumePosture = function (options: any, posture: any, name: any, adverb: any) {
        options.posture = posture;
        const { char }  = options;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ testPost... Remove this comment to see the full error message
        if (char.posture === posture && char.postureFurniture === this.name) {
          char.msg(Quest.lang.already, { item: char });
          return false;
        }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        if (!this.testPostureOn({ char, posture })) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ testPost... Remove this comment to see the full error message
        if (char.posture && char.postureFurniture !== this.name) {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'stop_posture'.
          char.msg(stop_posture(char));
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          char.msg(lang[`${name}_on_successful`], options);
        }
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        else if (char.posture && this[`${char.posture}_to_${posture}`] && this.postureChangesImplemented) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          char.msg(this[`${char.posture}_to_${posture}`], options);
        } else {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          char.msg(lang[`${name}_on_successful`], options);
        }
        char.posture = posture;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ testPost... Remove this comment to see the full error message
        char.postureFurniture = this.name;
        char.postureAdverb    = adverb === undefined ? 'on' : adverb;
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'afterPostureOn' does not exist on type '... Remove this comment to see the full error message
        if (this.afterPostureOn) this.afterPostureOn(options);
        return true;
      };

      if (options.sit) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'siton' does not exist on type '{ testPos... Remove this comment to see the full error message
        res.siton = function (options: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'assumePosture' does not exist on type '{... Remove this comment to see the full error message
          return this.assumePosture(options, 'sitting', 'sit');
        };
      }
      if (options.stand) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'standon' does not exist on type '{ testP... Remove this comment to see the full error message
        res.standon = function (options: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'assumePosture' does not exist on type '{... Remove this comment to see the full error message
          return this.assumePosture(options, 'standing', 'stand');
        };
      }
      if (options.recline) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'reclineon' does not exist on type '{ tes... Remove this comment to see the full error message
        res.reclineon = function (options: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'assumePosture' does not exist on type '{... Remove this comment to see the full error message
          return this.assumePosture(options, 'reclining', 'recline');
        };
      }
      if (options.useCmd) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'useCmd' does not exist on type '{ testPo... Remove this comment to see the full error message
        res.useCmd = options.useCmd;
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ testPost... Remove this comment to see the full error message
      res.icon = () => 'furniture12';
      return res;
    };

    export const SWITCHABLE = function (alreadyOn: any, nameModifier: any) {
      const res = {};
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'switchedon' does not exist on type '{}'.
      res.switchedon = alreadyOn;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'nameModifier' does not exist on type '{}... Remove this comment to see the full error message
      res.nameModifier = nameModifier;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgSwitchOff' does not exist on type '{}... Remove this comment to see the full error message
      res.msgSwitchOff = Quest.lang.switch_off_successful;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgSwitchOn' does not exist on type '{}'... Remove this comment to see the full error message
      res.msgSwitchOn = Quest.lang.switch_on_successful;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCreation' does not exist on type '{... Remove this comment to see the full error message
      res.afterCreation = function (o: any) {
        o.verbFunctions.push((o: any, verbList: any) => {
          if (!o.mustBeHeldToOperate || o.isAtLoc(Quest.World.player)) {
            verbList.push(o.switchedon ? Quest.lang.verbs.switchoff : Quest.lang.verbs.switchon);
          }
        });
        o.nameModifierFunctions.push((o: any, list: any) => {
          if (o.nameModifier && o.switchedon) list.push(o.nameModifier);
        });
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'switchon' does not exist on type '{}'.
      res.switchon = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'switchedon' does not exist on type '{}'.
        if (this.switchedon) {
          options.char.msg(Quest.lang.already, { item: this });
          return false;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testSwitchOn' does not exist on type '{}... Remove this comment to see the full error message
        if (!this.testSwitchOn(options)) return false;
        if (!options.char.getAgreement('SwitchOn', this, true)) return false;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'suppressMsgs' does not exist on type '{}... Remove this comment to see the full error message
        if (!this.suppressMsgs) options.char.msg(this.msgSwitchOn, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doSwitchon' does not exist on type '{}'.
        this.doSwitchon(options);
        return true;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'doSwitchon' does not exist on type '{}'.
      res.doSwitchon = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
        const lighting = Quest.World.game.dark;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'switchedon' does not exist on type '{}'.
        this.switchedon = true;
        Quest.World.world.update();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
        if (lighting !== Quest.World.game.dark) {
          Quest.World.currentLocation.description();
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSwitchOn' does not exist on type '{... Remove this comment to see the full error message
        if (this.afterSwitchOn) this.afterSwitchOn(options);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testSwitchOn' does not exist on type '{}... Remove this comment to see the full error message
      res.testSwitchOn = () => true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testSwitchOff' does not exist on type '{... Remove this comment to see the full error message
      res.testSwitchOff = () => true;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'switchoff' does not exist on type '{}'.
      res.switchoff = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'switchedon' does not exist on type '{}'.
        if (!this.switchedon) {
          options.char.msg(Quest.lang.already, { item: this });
          return false;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testSwitchOff' does not exist on type '{... Remove this comment to see the full error message
        if (!this.testSwitchOff(options)) return false;
        if (!options.char.getAgreement('SwitchOn', this, false)) return false;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'suppressMsgs' does not exist on type '{}... Remove this comment to see the full error message
        if (!this.suppressMsgs) options.char.msg(this.msgSwitchOff, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doSwitchoff' does not exist on type '{}'... Remove this comment to see the full error message
        this.doSwitchoff(options);
        return true;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'doSwitchoff' does not exist on type '{}'... Remove this comment to see the full error message
      res.doSwitchoff = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
        const lighting = Quest.World.game.dark;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'switchedon' does not exist on type '{}'.
        this.switchedon = false;
        Quest.World.world.update();
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'dark' does not exist on type '{ turnCoun... Remove this comment to see the full error message
        if (lighting !== Quest.World.game.dark) {
          Quest.World.currentLocation.description();
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterSwitchOff' does not exist on type '... Remove this comment to see the full error message
        if (this.afterSwitchOff) this.afterSwitchOff(options);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{}'.
      res.icon = function () {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'switchedon' does not exist on type '{}'.
        return this.switchedon ? 'turnedon12' : 'turnedoff12';
      };

      return res;
    };

    // Ideally Quest will check components when doing a command for the whole
    // I think?
    export const COMPONENT = function (nameOfWhole: any) {
      const res = {
        component: true,
        // Set this as it has its own take attribute
        isLocatedAt(loc: any, situation: any) {
          if (situation !== Quest.World.world.PARSER && situation !== Quest.World.world.ALL) return false;
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const cont = Quest.World.w[this.loc];
          return cont.isAtLoc(loc);
        },

        loc: nameOfWhole,

        scenery: true,
        take(options: any) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          options.whole = Quest.World.w[this.loc];
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.cannot_take_component, options);
          return false;
        },
        takeable: true,
      };
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!Quest.World.w[nameOfWhole]) Quest.IO.debugmsg(`Whole is not define: ${nameOfWhole}`);
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.World.w[nameOfWhole].componentHolder = true;
      return res;
    };

    export const EDIBLE = function (isLiquid: any) {
      const res = { ...TAKEABLE_DICTIONARY };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLiquid' does not exist on type '{ afte... Remove this comment to see the full error message
      res.isLiquid = isLiquid;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgIngest' does not exist on type '{ aft... Remove this comment to see the full error message
      res.msgIngest = isLiquid ? Quest.lang.drink_successful : Quest.lang.eat_successful;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'eat' does not exist on type '{ afterCrea... Remove this comment to see the full error message
      res.eat = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLiquid' does not exist on type '{ afte... Remove this comment to see the full error message
        if (this.isLiquid) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.cannot_eat, options);
          return false;
        }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgIngest, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ afterCrea... Remove this comment to see the full error message
        this.loc = null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterIngest' does not exist on type '{ a... Remove this comment to see the full error message
        if (this.afterIngest) this.afterIngest(options);
        return true;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'drink' does not exist on type '{ afterCr... Remove this comment to see the full error message
      res.drink = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLiquid' does not exist on type '{ afte... Remove this comment to see the full error message
        if (!this.isLiquid) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.cannot_drink, options);
          return false;
        }
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgIngest, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ afterCrea... Remove this comment to see the full error message
        this.loc = null;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterIngest' does not exist on type '{ a... Remove this comment to see the full error message
        if (this.afterIngest) this.afterIngest(options);
        return true;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'ingest' does not exist on type '{ afterC... Remove this comment to see the full error message
      res.ingest = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLiquid' does not exist on type '{ afte... Remove this comment to see the full error message
        if (this.isLiquid) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'drink' does not exist on type '{ afterCr... Remove this comment to see the full error message
          return this.drink(options);
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'eat' does not exist on type '{ afterCrea... Remove this comment to see the full error message
        return this.eat(options);
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type '{ afterCre... Remove this comment to see the full error message
      res.icon          = () => 'edible12';
      res.afterCreation = function (o) {
        o.verbFunctions.push((o: any, verbList: any) => {
          verbList.push(o.isAtLoc(Quest.World.player.name) ? Quest.lang.verbs.drop : Quest.lang.verbs.take);
          if (o.isAtLoc(player)) verbList.push(o.isLiquid ? Quest.lang.verbs.drink : Quest.lang.verbs.eat);
        });
      };
      return res;
    };

    export const VESSEL = function () {
      const res = {};
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'vessel' does not exist on type '{}'.
      res.vessel = true;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCreation' does not exist on type '{... Remove this comment to see the full error message
      res.afterCreation = function (o: any) {
        if (o.volumeContained) {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'list'.
          list.push(`full of ${o.containedFluidName}`);
        }
      },

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{}'.
      res.findSource = function (options: any) {
        return Quest.Utilities.util.findSource(options);
      },

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'fill' does not exist on type '{}'.
      res.fill = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'findSource' does not exist on type '{}'.
        if (!this.findSource(options)) return Quest.IO.falsemsg(Quest.lang.no_generic_fluid_here, { item: this });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doFill' does not exist on type '{}'.
        return this.doFill(options);
      },

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'doFill' does not exist on type '{}'.
      res.doFill = function (options: any) {
        options.item = this;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testFill' does not exist on type '{}'.
        if (this.testFill && !this.testFill(options)) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
        if (this.containedFluidName) return Quest.IO.falsemsg(Quest.lang.already_full, options);

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
        this.containedFluidName = options.fluid;
        if (options.source.vessel) delete options.source.containedFluidName;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(Quest.lang.fill_successful, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterFill' does not exist on type '{}'.
        if (this.afterFill) this.afterFill(options);
        return true;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'empty' does not exist on type '{}'.
      res.empty = function (options: any) {
        delete options.item;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'doEmpty' does not exist on type '{}'.
        return this.doEmpty(options);
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'doEmpty' does not exist on type '{}'.
      res.doEmpty = function (options: any) {
        options.source = this;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
        options.fluid = this.containedFluidName;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
        if (!this.containedFluidName) return Quest.IO.falsemsg(Quest.lang.already_empty, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testEmpty' does not exist on type '{}'.
        if (this.testEmpty && !this.testEmpty(options)) return false;

        if (!options.item) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.empty_successful, options);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
          delete this.containedFluidName;
        } else if (options.item === options.source) {
          return Quest.IO.falsemsg(Quest.lang.pour_into_self, options);
        } else if (options.item.vessel) {
          if (options.item.containedFluidName) return Quest.IO.falsemsg(Quest.lang.already_full, { char: options.char, fluid: options.item.containedFluidName, item: options.sink });
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.empty_into_successful, options);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
          options.item.containedFluidName = this.containedFluidName;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
          delete this.containedFluidName;
        } else if (options.item.sink) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
          if (!options.item.sink(this.containedFluidName, options.char, this)) return false;
        } else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(Quest.lang.empty_onto_successful, options);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
          delete this.containedFluidName;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterEmpty' does not exist on type '{}'.
        if (this.afterEmpty) this.afterEmpty(options.char, { fluid: this.containedFluidName, sink: options.item });
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'containedFluidName' does not exist on ty... Remove this comment to see the full error message
        delete this.containedFluidName;
        return true;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleInOutContainer' does not exist on ... Remove this comment to see the full error message
      res.handleInOutContainer = function (options: any, items: any) {
        let success = false;
        for (const obj of items) {
          if (!options.char.testManipulate(obj, options.verb)) return Quest.World.world.FAILED;
          options.count = obj.countable ? obj.extractNumber() : undefined;
          options.item  = obj;
          if (options.count) options[`${obj.name}_count`] = options.count;  // for the text processor
          let flag;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'container' does not exist on type '{}'.
          if (this.container) {
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'func'.
            success = success || func(char, container, obj, options);
          }
          /* else if (obj.representsFluid) {
            flag = this.doFill({char:options.char, fluid:obj.representsFluid})
            success = success || flag
          } */
          else {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.not_container_not_vessel, options);
          }
        }
        if (success) options.char.pause();
        return success ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
      },

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCreation' does not exist on type '{... Remove this comment to see the full error message
      res.afterCreation = function (o: any) {
        o.verbFunctions.push((o: any, verbList: any) => {
          if (!o.isAtLoc(Quest.World.player.name)) return;
          verbList.push(o.containedFluidName ? Quest.lang.verbs.empty : Quest.lang.verbs.fill);
        });
      };
      return res;
    };

    export const CONSTRUCTION = function (componentNames: any) {
      const res = {};
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'construction' does not exist on type '{}... Remove this comment to see the full error message
      res.construction = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'componentNames' does not exist on type '... Remove this comment to see the full error message
      res.componentNames = componentNames || [];
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'destroyComponentsOnBuild' does not exist... Remove this comment to see the full error message
      res.destroyComponentsOnBuild = true;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'msgConstruction' does not exist on type ... Remove this comment to see the full error message
      res.msgConstruction = Quest.lang.construction_done;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testComponents' does not exist on type '... Remove this comment to see the full error message
      res.testComponents = function (components: any, options: any) {
        for (const el of components) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'componentNames' does not exist on type '... Remove this comment to see the full error message
          if (!res.componentNames.includes(el.name)) {
            options.wrong = el;
            return Quest.IO.falsemsg(Quest.lang.component_wrong, options);
          }
        }
        return true;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'buildPrecheck' does not exist on type '{... Remove this comment to see the full error message
      res.buildPrecheck = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{}'.
        if (this.loc) return Quest.IO.falsemsg(Quest.lang.construction_already, options);
        for (const el of options.components) {
          if (el.loc !== Quest.World.player.name) {
            options.missing = el;
            return Quest.IO.falsemsg(Quest.lang.component_missing, options);
          }
        }
        return true;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'build' does not exist on type '{}'.
      res.build = function (options: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'componentNames' does not exist on type '... Remove this comment to see the full error message
        const components   = this.componentNames.map((el: any) => Quest.World.w[el]);
        options.components = components;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'buildPrecheck' does not exist on type '{... Remove this comment to see the full error message
        if (!this.buildPrecheck(options)) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testConstruction' does not exist on type... Remove this comment to see the full error message
        if (this.testConstruction && !this.testConstruction(options)) return false;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'destroyComponentsOnBuild' does not exist... Remove this comment to see the full error message
        if (this.destroyComponentsOnBuild) {
          for (const el of components) delete el.loc;
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{}'.
        this.loc     = this.buildAtLocation ? Quest.World.player.loc : Quest.World.player.name;
        options.list = Quest.Utilities.formatList(components, { article: Quest.Utilities.DEFINITE, lastJoiner: 'and' });
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgConstruction, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterConstruction' does not exist on typ... Remove this comment to see the full error message
        if (this.afterConstruction) this.afterConstruction(options);
        return true;
      };

      return res;
    };

    export const ROPE = function (length: any, tetheredTo: any) {
      const res = {

        attachTo(char: any, item: any) {
          const { loc } = item; // may want to go deep in case tied to a component of an item !!!
          if (!this.tiedTo1) {
            if (this.locs.length > 1) this.locs.shift();
            if (this.locs[0] !== loc) this.locs.unshift(loc);
            this.tiedTo1 = item.name;
          } else {
            if (this.locs.length > 1) this.locs.pop();
            if (this.locs[this.locs.length - 1] !== loc) this.locs.push(loc);
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
            this.tiedTo2 = item.name;
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterAttach' does not exist on type '{ r... Remove this comment to see the full error message
          if (this.afterAttach) this.afterAttach(char, { item });
        },

        attachVerb: Quest.lang.rope_attach_verb,

        attachedVerb: Quest.lang.rope_attached_verb,

        canAttachTo(item: any) {
          return item.attachable;
        },

        detachFrom(char: any, item: any) {
          if (this.tiedTo1 === item.name) {
            if (this.locs.length === 2 && this.locs.includes(char.name)) this.locs.shift(); // remove this room
            if (this.locs[0] !== char.name) {
              this.locs.unshift(char.name);
            }
            this.tiedTo1 = false;
          } else {
            if (this.locs.length === 2 && this.locs.includes(char.name)) this.locs.pop(); // remove this room
            if (this.locs[this.locs.length - 1] !== char.name) this.locs.push(char.name);
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
            this.tiedTo2 = false;
          }
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterDetach' does not exist on type '{ r... Remove this comment to see the full error message
          if (this.afterDetach) this.afterDetach(char, { item });
        },

        detachVerb: Quest.lang.rope_detach_verb,

        examineAddendum() {
          // It is tied to the chair, and trails into the kitchen.

          // What is it tied to (and we can see)
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const obj1 = (this.tiedTo1 && Quest.World.w[this.tiedTo1].isHere()) ? Quest.World.w[this.tiedTo1] : false;
          // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
          const obj2 = (this.tiedTo2 && Quest.World.w[this.tiedTo2].isHere()) ? Quest.World.w[this.tiedTo2] : false;

          // Handle the easy cases, only one loc in locs
          if (this.locs.length === 1) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'examineAddBothEnds' does not exist on ty... Remove this comment to see the full error message
            if (obj1 && obj2) return Quest.Text.processText(Quest.lang.examineAddBothEnds, { item: this, obj1, obj2 });
            if (obj1) return Quest.Text.processText(Quest.lang.rope_examine_attached_one_end, { item: this, obj1 });
            if (obj2) return Quest.Text.processText(Quest.lang.rope_examine_attached_one_end, { item: this, obj1: obj2 });
            return '';  // just in one place, like any ordinary object
          }

          // Who is it held by (and we can see)
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const end1    = Quest.World.w[this.locs[0]];
          const holder1 = (end1.npc || end1.player) && end1.isHere() ? end1 : false;
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const end2    = Quest.World.w[this.locs[this.locs.length - 1]];
          const holder2 = (end2.npc || end2.player) && end2.isHere() ? end2 : false;

          // What locations does it go to
          const index = this.locs.findIndex((el) => el === Quest.World.player.loc);
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const loc1 = (index > 0 && Quest.World.w[this.locs[index - 1]].room) ? Quest.World.w[this.locs[index - 1]] : false;
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const loc2 = (index < (this.locs.length - 1) && Quest.World.w[this.locs[index + 1]].room) ? Quest.World.w[this.locs[index + 1]] : false;

          let s    = '';
          let flag = false;
          if (obj1 || holder1 || loc1) {
            s   += ` ${Quest.lang.rope_one_end} `;
            flag = true;
          }
          if (obj1) {
            s += Quest.lang.rope_examine_end_attached.replace('obj', 'obj1');
          } else if (holder1) {
            s += Quest.lang.rope_examine_end_held.replace('holder', 'holder1');
          } else if (loc1) {
            s += Quest.lang.rope_examine_end_headed.replace('loc', 'loc1');
          }

          if (obj2 || holder2 || loc2) {
            s   += ` ${flag ? Quest.lang.rope_other_end : Quest.lang.rope_one_end} `;
            flag = true;
          }
          if (obj2) {
            s += Quest.lang.rope_examine_end_attached.replace('obj', 'obj2');
          } else if (holder2) {
            s += Quest.lang.rope_examine_end_held.replace('holder', 'holder2');
          } else if (loc2) {
            s += Quest.lang.rope_examine_end_headed.replace('loc', 'loc2');
          }

          return Quest.Text.processText(s, {
            holder1, holder2, item: this, loc1, loc2, obj1, obj2,
          });
        },

        findAttachable() {
          // Is there some other source?
          const items = Quest.Utilities.scopeReachable();
          for (const obj of items) {
            if (obj.attachable) return obj;
          }
          return undefined;
        },

        getAttached() {
          const res = this.tiedTo1 ? [this.tiedTo1] : [];
          // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
          if (this.tiedTo2) res.push(this.tiedTo2);
          return res;
        },

        handleTieTo(char: any, obj: any) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
          if (obj === undefined) obj = this.findAttachable(this);
          const options = { char, item: this, obj };

          if (obj === undefined) return Quest.IO.falsemsg(Quest.lang.rope_no_attachable_here, options);
          if (!obj.attachable) return Quest.IO.failedmsg(Quest.lang.rope_not_attachable_to, options);

          if (this.tiedTo1 === obj.name) return Quest.IO.failedmsg(Quest.lang.already, { item: this });
          // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
          if (this.tiedTo2 === obj.name) return Quest.IO.failedmsg(Quest.lang.already, { item: this });
          // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo' does not exist on type '{ rope: ... Remove this comment to see the full error message
          if (this.tiedTo1 && this.tiedTo) return Quest.IO.failedmsg(Quest.lang.rope_tied_both_ends_already, { item: this, obj1: Quest.World.w[this.tiedTo1], obj2: Quest.World.w[this.tiedTo2] });

          if (obj.testAttach && !obj.testAttach(options)) return Quest.World.world.FAILED;
          this.attachTo(char, obj);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'suppessMsgs' does not exist on type '{ r... Remove this comment to see the full error message
          if (!this.suppessMsgs) Quest.IO.msg(this.msgAttach, options);
          return Quest.World.world.SUCCESS;
        },

        handleUntieFrom(char: any, obj: any) {
          const tpParams = { char, item: this, obj };
          if (obj === undefined) {
            // obj not set; can we guess it?
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
            if (!this.tiedTo1 && !this.tiedTo2) return Quest.IO.failedmsg(Quest.lang.rope_not_attached, tpParams);
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
            if (this.tiedTo1 && !this.tiedTo2) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              obj = Quest.World.w[this.tiedTo1];
            }
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
            else if (!this.tiedTo1 && this.tiedTo2) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              obj = Quest.World.w[this.tiedTo2];
            }
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            else if (Quest.World.w[this.tiedTo1].isHere() && !Quest.World.w[this.tiedTo2].isHere()) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              obj = Quest.World.w[this.tiedTo1];
            }
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            else if (!Quest.World.w[this.tiedTo1].isHere() && Quest.World.w[this.tiedTo2].isHere()) {
              // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
              obj = Quest.World.w[this.tiedTo2];
            } else {
              return Quest.IO.failedmsg(Quest.lang.rope_detach_end_ambig, tpParams);
            }
            tpParams.obj = obj;
          } else {
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
            if (this.tiedTo1 !== obj.name && this.tiedTo2 !== obj.name) {
              return Quest.IO.failedmsg(Quest.lang.rope_not_attached_to, tpParams);
            }
          }
          if (obj === this.tiedTo1 && this.tethered) return Quest.IO.failedmsg(Quest.lang.rope_tethered, tpParams);

          this.detachFrom(char, obj);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'suppessMsgs' does not exist on type '{ r... Remove this comment to see the full error message
          if (!this.suppessMsgs) Quest.IO.msg(this.msgDetach, tpParams);
          return Quest.World.world.SUCCESS;
        },

        isAttachedTo(item: any) {
          // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
          return this.tiedTo1 === item.name || this.tiedTo2 === item.name;
        },

        isLocatedAt(loc: any, situation: any) {
          // @ts-expect-error ts-migrate(2551) FIXME: Property 'loc' does not exist on type '{ rope: boo... Remove this comment to see the full error message
          if (this.loc) {
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'loc' does not exist on type '{ rope: boo... Remove this comment to see the full error message
            this.locs = [this.loc];
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'loc' does not exist on type '{ rope: boo... Remove this comment to see the full error message
            this.loc = false;
          }
          if (typeof loc !== 'string') loc = loc.name;
          // If the rope is in the location and held by the character, only want it to appear once in the side pane
          if (situation === Quest.World.world.SIDE_PANE && this.locs.includes(Quest.World.player.name) && loc !== Quest.World.player.name) return false;
          return this.locs.includes(loc);
        },

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'multiIsUltimatelyHeldBy' does not exist ... Remove this comment to see the full error message
        isUltimatelyHeldBy(obj: any) {
          return Quest.Utilities.util.multiIsUltimatelyHeldBy(obj, this.locs);
        },

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        locs: tetheredTo ? [Quest.World.w[Quest.World.w[tetheredTo].loc]] : [],

        msgAttach: Quest.lang.rope_attach_success,

        msgDetach: Quest.lang.rope_detach_success,

        msgUnwind: Quest.lang.rope_unwind,

        msgWind: Quest.lang.rope_wind,

        rope: true,

        ropeLength: length,

        tethered: (tetheredTo !== undefined),

        tiedTo1: tetheredTo,
        useWith(char: any, item: any) {
          return this.handleTieTo(char, item) === Quest.World.world.SUCCESS;
        },
        ...TAKEABLE_DICTIONARY,
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveToFrom' does not exist on type '{ ro... Remove this comment to see the full error message
      res.moveToFrom = function () {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg('You cannot use "moveToFrom" with a ROPE object, due to the complicated nature of these things. You should either prevent the user trying to do this, or look to implement some custom code as the ROPE template does for DROP and TAKE. Sorry I cannot be any more help than that!');
      };

      res.drop = function (options) {
        const { char } = options;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ rope:... Remove this comment to see the full error message
        if (!this.isAtLoc(char.name)) return Quest.IO.falsemsg(Quest.lang.not_carrying, options);

        let end;
        if (this.locs.length === 1) {
          // Rope is in one place so move as a single item
          this.locs = [char.loc];
          end       = 0;
        } else if (this.locs[0] === char.name) {
          // end 1 is here and not attached, so get that
          this.locs.shift();
          end = 1;
        } else if (this.locs[this.locs.length - 1] === char.name) {
          // end 2 is here and not attached, so get that
          this.locs.pop();
          end = 2;
        }
        options.end     = end;
        options.toLoc   = char.loc;
        options.fromLoc = char.name;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgDrop, options);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[char.loc].afterDropIn) Quest.World.w[char.loc].afterDropIn(options);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[char.name].afterTakeFrom) Quest.World.w[char.name].afterTakeFrom(options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterMove' does not exist on type '{ rop... Remove this comment to see the full error message
        if (this.afterMove !== undefined) this.afterMove(options);
        return true;
      };

      res.take = function (options) {
        const { char } = options;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isAtLoc' does not exist on type '{ rope:... Remove this comment to see the full error message
        if (this.isAtLoc(char.name) && !this.isAtLoc(options.char.loc)) return Quest.IO.falsemsg(Quest.lang.already_have, options);
        if (!char.testManipulate(this, 'take')) return false;
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
        if (this.tiedTo1 && this.tiedTo2) return Quest.IO.falsemsg(Quest.lang.rope_tied_both_end, options);

        let end;
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
        if (this.locs.length === 1 && !this.tiedTo1 && !this.tiedTo2) {
          // Rope is in one place, not tied to anything, so move as a single item
          this.locs = [char.name];
          end       = 0;
        } else if (this.locs[0] === char.loc && !this.tiedTo1) {
          // end 1 is here and not attached, so get that
          this.locs.unshift(char.name);
          end = 1;
        }
        // @ts-expect-error ts-migrate(2551) FIXME: Property 'tiedTo2' does not exist on type '{ rope:... Remove this comment to see the full error message
        else if (this.locs[this.locs.length - 1] === char.loc && !this.tiedTo2) {
          // end 2 is here and not attached, so get that
          this.locs.push(char.name);
          end = 2;
        } else if (this.locs[0] === char.loc || this.locs[this.locs.length - 1] === char.loc) {
          // an end is here - presumably tied to something
          return Quest.IO.falsemsg(Quest.lang.rope_tied_one_end, options);
        } else {
          return Quest.IO.falsemsg(Quest.lang.rope_no_end, options);
        }
        options.end     = end;
        options.toLoc   = char.name;
        options.fromLoc = char.loc;

        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgTake, options);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[char.loc].afterTakeOut) Quest.World.w[char.loc].afterTakeOut(options);
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.w[char.name].afterDropIn) Quest.World.w[char.name].afterDropIn(options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterMove' does not exist on type '{ rop... Remove this comment to see the full error message
        if (this.afterMove !== undefined) this.afterMove(options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterTake' does not exist on type '{ rop... Remove this comment to see the full error message
        if (this.afterTake !== undefined) this.afterTake(options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'scenery' does not exist on type '{ rope:... Remove this comment to see the full error message
        if (this.scenery) this.scenery = false;
        return true;
      };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'testCarry' does not exist on type '{ rop... Remove this comment to see the full error message
      res.testCarry = function (options: any) {
        if (this.ropeLength === undefined) return true; // length not set, infinitely long!
        if (this.locs.length < 3) return true; // just in one room
        if (!this.locs.includes(options.char.name)) return true; // not carrying, so no issue
        if (this.locs[0] === options.char.name) {
          if (this.locs[2] === options.exit.name) return true; // heading back where we came from
        } else {
          if (this.locs[this.locs.length - 3] === options.exit.name) return true; // heading back where we came from
        }
        if (this.locs.length <= this.ropeLength) return true;
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(Quest.lang.rope_cannot_move, options);
        return false;
      };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterCarry' does not exist on type '{ ro... Remove this comment to see the full error message
      res.afterCarry = function (options: any) {
        const { char } = options;
        if (this.locs.length === 1) return; // carried as single item, treat as std item
        if (!this.locs.includes(char.name)) return; // not carrying, so no issue
        if (this.locs[0] === char.name) {
          // suppose locs is me, lounge, kitchen, garden
          // case 1: move lounge to kitchen -> me, kitchen, garden
          // case 2: move lounge to hall -> me, hall, lounge, kitchen, garden
          this.locs.shift();  // remove me
          if (this.locs[1] === char.loc) {
            this.locs.shift();
            char.msg(this.msgWind, { char, item: this });
          } else {
            this.locs.unshift(char.loc);
            char.msg(this.msgUnwind, { char, item: this });
          }
          this.locs.unshift(char.name);
        } else {
          this.locs.pop();  // remove me
          if (this.locs[this.locs.length - 2] === char.loc) {
            this.locs.pop();
            char.msg(this.msgWind, { char, item: this });
          } else {
            this.locs.push(char.loc);
            char.msg(this.msgUnwind, { char, item: this });
          }
          this.locs.push(char.name);
        }
      };
      return res;
    };

    const BUTTON_DICTIONARY = {
      afterCreation(o: any) {
        o.verbFunctions.push((o: any, verbList: any) => {
          verbList.push(Quest.lang.verbs.push);
        });
      },
      button: true,

      msgPress: Quest.lang.press_button_successful,
    };

    export const BUTTON = function () {
      const res = { ...BUTTON_DICTIONARY };

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type '{ button: ... Remove this comment to see the full error message
      res.push = function (options: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(this.msgPress, options);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterPress' does not exist on type '{ bu... Remove this comment to see the full error message
        if (this.afterPress) this.afterPress(options);
      };

      return res;
    };

    export const TRANSIT_BUTTON = function (nameOfTransit: any, transitDest: any) {
      const res = { ...BUTTON_DICTIONARY };
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ button: b... Remove this comment to see the full error message
      res.loc = nameOfTransit,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitDest' does not exist on type '{ b... Remove this comment to see the full error message
      res.transitDest = transitDest;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitButton' does not exist on type '{... Remove this comment to see the full error message
      res.transitButton = true,
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitAlreadyHere' does not exist on ty... Remove this comment to see the full error message
      res.transitAlreadyHere = Quest.lang.transit_already_here;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitGoToDest' does not exist on type ... Remove this comment to see the full error message
      res.transitGoToDest = Quest.lang.transit_go_to_dest;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type '{ button: ... Remove this comment to see the full error message
      res.push = function (options: any) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const transit = Quest.World.w[this.loc];
        const exit    = transit[transit.transitDoorDir];

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'testTransitButton' does not exist on typ... Remove this comment to see the full error message
        if (this.testTransitButton && !this.testTransitButton(options.char, { multiple: options.multiple, transit })) return false;
        if (transit.testTransit && !transit.testTransit(options.char, { button: this, multiple: options.multiple })) return false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'locked' does not exist on type '{ button... Remove this comment to see the full error message
        if (this.locked) return Quest.IO.falsemsg(this.transitLocked);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitDest' does not exist on type '{ b... Remove this comment to see the full error message
        if (exit.name === this.transitDest) return Quest.IO.falsemsg(this.transitAlreadyHere);

        if (transit.transitAutoMove) {
          Quest.World.player.moveChar(transit[transit.transitDoorDir]);  // Quest.World.player.previousLoc,
        } else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
          Quest.Utilities.printOrRun(Quest.World.player, this, 'transitGoToDest');
          transit.transitUpdate(this, true);
        }
        return true;
      };

      return res;
    };

    // This is for rooms
    export const ROOM_SET = function (setName: any) {
      return { roomSet: setName };
    };

    // This is for rooms
    export const TRANSIT = function (exitDir: any) {
      return {
        // The exit is not saved, so after a load, need to update the exit
        afterLoadForTemplate() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentButtonName' does not exist on typ... Remove this comment to see the full error message
          if (this.currentButtonName) this.setTransitDest(Quest.World.w[this.currentButtonName]);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterLoad' does not exist on type '{ sav... Remove this comment to see the full error message
          if (this.afterLoad) this.afterLoad();
        },

        beforeEnter() {
          const transitButton = this.findTransitButton(Quest.World.player.previousLoc);
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (transitButton) this.transitUpdate(transitButton);
        },

        findTransitButton(dest: any) {
          for (const key in Quest.World.w) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (Quest.World.w[key].loc === this.name && Quest.World.w[key].transitDest === dest) return Quest.World.w[key];
          }
          return null;
        },

        // @ts-expect-error ts-migrate(7023) FIXME: 'getTransitButtons' implicitly has return type 'an... Remove this comment to see the full error message
        getTransitButtons(includeHidden: any, includeLocked: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{ s... Remove this comment to see the full error message
          return this.getContents(Quest.World.world.LOOK).filter((el: any) => {
            if (!el.transitButton) return false;
            if (!includeHidden && el.hidden) return false;
            if (!includeLocked && el.locked) return false;
            return true;
          });
        },

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        getTransitDestButton() {
          return Quest.World.w[this.currentButtonName];
        },

        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        getTransitDestLocation() {
          return Quest.World.w[this[this.transitDoorDir].name];
        },

        isTransitHere(char = Quest.World.player) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          log(this[this.transitDoorDir].name);
          log(char.loc);
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          return this[this.transitDoorDir].name === char.loc;
        },

        mapMoveableLoc: true,

        mapRedrawEveryTurn: true,

        saveExitDests: true,

        setTransitDest(transitButton: any) {
          if (typeof transitButton === 'string') {
            transitButton = this.findTransitButton(transitButton);
          }
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (!transitButton) return Quest.IO.errormsg('Trying to set a transit to an unfathomable destination.');

          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          this[this.transitDoorDir].name = transitButton.transitDest;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentButtonName' does not exist on typ... Remove this comment to see the full error message
          this.currentButtonName = transitButton.name;
        },

        transitDoorDir: exitDir,

        transitOfferMenu() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'testTransit' does not exist on type '{ s... Remove this comment to see the full error message
          if (this.testTransit && !this.testTransit(Quest.World.player)) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitAutoMove' does not exist on type ... Remove this comment to see the full error message
            if (this.transitAutoMove) Quest.World.player.moveChar(this[this.transitDoorDir]);  // Quest.World.player.previousLoc,
            return false;
          }
          const buttons            = this.getTransitButtons(true, false);
          const { transitDoorDir } = this;
          const room               = this;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitMenuPrompt' does not exist on typ... Remove this comment to see the full error message
          Quest.IO.showMenu(this.transitMenuPrompt, buttons.map((el: any) => el.transitDestAlias), (result: any) => {
            for (const button of buttons) {
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'i'.
              if (buttons[i].transitDestAlias === result) {
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'i'.
                buttons[i].push(false, Quest.World.player);
              }
            }
          });
        },

        transitUpdate(transitButton: any, callEvent: any) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (!this[this.transitDoorDir]) return Quest.IO.errormsg(`The transit "${this.name}" is set to use "${this.transitDoorDir}" as the exit, but has no such exit.`);
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          const previousDest = this[this.transitDoorDir].name;
          this.setTransitDest(transitButton);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'transitUpdate' does not exist on type '{... Remove this comment to see the full error message
          if (typeof map !== 'undefined' && map.transitUpdate) map.transitUpdate(this, transitButton, callEvent);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterTransitMove' does not exist on type... Remove this comment to see the full error message
          if (callEvent && this.afterTransitMove) this.afterTransitMove(transitButton.transitDest, previousDest);
        },
      };
    };

    export const CHARACTER = function () {
      return {

        afterCarryList: [],

        afterCreation(o: any) {
          o.nameModifierFunctions.push((o: any, l: any) => {
            const s     = '';
            const state = o.getStatusDesc();
            const held  = o.getHolding();
            const worn  = o.getWearingVisible();

            const list = [];
            if (state) {
              list.push(state);
            }
            if (held.length > 0) {
              list.push(`${Quest.lang.invHoldingPrefix} ${Quest.Utilities.formatList(held, {
                article: Quest.Utilities.INDEFINITE, lastJoiner: Quest.lang.list_and, loc: o.name, modified: false, nothing: Quest.lang.list_nothing, npc: true,
              })}`);
            }
            if (worn.length > 0) {
              list.push(`${Quest.lang.invWearingPrefix} ${Quest.Utilities.formatList(worn, {
                article: Quest.Utilities.INDEFINITE, lastJoiner: Quest.lang.list_and, loc: o.name, modified: false, nothing: Quest.lang.list_nothing, npc: true,
              })}`);
            }
            if (list.length > 0) l.push(list.join('; '));
          });
          o.verbFunctions.push((o: any, verbList: any) => {
            verbList.shift();
            verbList.push(Quest.lang.verbs.lookat);
            if (!Quest.Settings.settings.noTalkTo) verbList.push(Quest.lang.verbs.talkto);
          });
        },

        // The following are used also both player and NPCs, so we can use the same functions for both
        canReachThroughThis: () => true,

        canSeeThroughThis: () => true,

        followers: [],

        getAgreement(cmdType: any, obj1: any, obj2: any) {
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (this[`getAgreement${cmdType}`]) return this[`getAgreement${cmdType}`](obj1, obj2);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'getAgreementDefault' does not exist on t... Remove this comment to see the full error message
          if (this.getAgreementDefault) return this.getAgreementDefault();
          return true;
        },

        getCarrying() {
          const res = [];
          for (const key in Quest.World.w) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            if (Quest.World.w[key].isUltimatelyHeldBy && Quest.World.w[key].isUltimatelyHeldBy(this)) res.push(Quest.World.w[key]);
          }
          return res;
        },
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getContents' does not exist on type '{}'... Remove this comment to see the full error message
        getContents: Quest.Utilities.util.getContents,
        getHolding() {
          return this.getContents(Quest.World.world.LOOK).filter((el: any) => !el.getWorn());
        },
        getOuterWearable(slot: any) {
          const clothing = this.getWearing().filter((el: any) => {
            if (typeof el.getSlots !== 'function') {
              console.log('Item with worn set to true, but no getSlots function');
              console.log(el);
            }
            return el.getSlots().includes(slot);
          });

          if (clothing.length === 0) {
            return false;
          }
          let outer = clothing[0];
          for (const garment of clothing) {
            if (garment.wear_layer > outer.wear_layer) {
              outer = garment;
            }
          }
          return outer;
        },
        getStatusDesc() {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'posture' does not exist on type '{ canRe... Remove this comment to see the full error message
          if (!this.posture) return false;
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'posture' does not exist on type '{ canRe... Remove this comment to see the full error message
          return `${this.posture} ${this.postureAdverb} ${Quest.lang.getName(Quest.World.w[this.postureFurniture], { article: Quest.Utilities.DEFINITE })}`;
        },
        getWearing() {
          return this.getContents(Quest.World.world.LOOK).filter((el: any) => el.getWorn() && !el.ensemble);
        },
        handleGiveTo(options: any) {
          if (!options.item.isAtLoc(options.char.name)) return Quest.IO.falsemsg(Quest.lang.not_carrying, options);
          if (!options.char.getAgreement('Give', options.item, this)) return false;
          if (!options.char.testManipulate(options.item, 'give')) return false;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'receiveItems' does not exist on type '{ ... Remove this comment to see the full error message
          for (const el of this.receiveItems) {
            if (el.item && el.item === options.item) {
              el.f.bind(this)(options);
              return true;
            }
            if (el.test && el.test(options)) {
              el.f.bind(this)(options);
              return true;
            }
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'receiveItemsFailMsg' does not exist on t... Remove this comment to see the full error message
          if (typeof this.receiveItemsFailMsg === 'string') return Quest.IO.falsemsg(this.receiveItemsFailMsg, options);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'receiveItemsFailMsg' does not exist on t... Remove this comment to see the full error message
          if (typeof this.receiveItemsFailMsg === 'function') {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'receiveItemsFailMsg' does not exist on t... Remove this comment to see the full error message
            this.receiveItemsFailMsg(options);
            return false;
          }
          return Quest.IO.falsemsg(Quest.lang.not_interested_for_give, options);
        },

        handleMovingFollowers(exit: any) {
          for (const s of this.followers) {
            const follower = Quest.World.w[s];
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type 'never'.
            if (follower.loc === this.loc) continue;
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'testFollowTo' does not exist on type 'ne... Remove this comment to see the full error message
            if (!follower.testFollowTo || follower.testFollowTo(Quest.World.w[exit.name])) {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'player' does not exist on type '{ canRea... Remove this comment to see the full error message
              if (this.player) follower.movingMsg(exit, true);
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'moveChar' does not exist on type 'never'... Remove this comment to see the full error message
              follower.moveChar(exit);
            }
          }
        },

        mentionedTopics: [],

        // Use this to move the character. Describing it should be done elsewhere
        moveChar(exit: any) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
          if (!(exit instanceof Quest.World.Exit)) return Quest.IO.errormsg(`Using moveChar for ${this.name} but no exit sent.`);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'getObj' does not exist on type '{}'.
          const room = Quest.Utilities.util.getObj(exit.name);
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'previousLoc' does not exist on type '{ c... Remove this comment to see the full error message
          this.previousLoc = this.loc;

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'player' does not exist on type '{ canRea... Remove this comment to see the full error message
          if (this.player) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'clearScreenOnRoomEnter' does not exist o... Remove this comment to see the full error message
            if (Quest.Settings.settings.clearScreenOnRoomEnter) Quest.IO.clearScreen();
            Quest.World.currentLocation.afterExit(exit);
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ canReachT... Remove this comment to see the full error message
            this.loc = room.name;
            Quest.World.world.update();
            Quest.World.world.enterRoom(exit);
          } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ canReachT... Remove this comment to see the full error message
            this.loc = room.name;
            this.handleMovingFollowers(exit);
          }

          // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterMove' does not exist on type '{ can... Remove this comment to see the full error message
          if (this.afterMove) this.afterMove(exit);
          for (const el of this.getCarrying()) {
            if (el.afterCarry) el.afterCarry({ char: this, exit, item: el });
          }
        },

        // Use when the NPC changes rooms; will give a message if the player can observe it
        movingMsg(exit: any) {
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'player' does not exist on type '{ canRea... Remove this comment to see the full error message
          if (this.player) {
            if (exit.msg) {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
              Quest.Utilities.printOrRun(this, exit, 'msg');
            } else if (Quest.lang.go_successful) {
              // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
              Quest.IO.msg(Quest.lang.go_successful, { char: this, dir: exit.dir });
            }
          } else if (exit.msgNPC) {
            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'char'.
            exit.msgNPC(char);
          } else {
            Quest.lang.npc_leaving_msg(this, exit);
            Quest.lang.npc_entering_msg(this, exit);
          }
        },

        // Also used by NPCs, so has to allow for that
        msg(s: any, params: any) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
          Quest.IO.msg(s, params);
        },

        pause: Quest.Utilities.NULL_FUNC,

        testManipulate: () => true,

        testMove: () => true,

        testPosture: () => true,

        testTakeDrop: () => true,

        testTalk() {
          return this.testTalkFlag;
        },

        testTalkFlag: true,
      };
    };

    export const PLAYER = function () {
      const res = CHARACTER();
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'pronouns' does not exist on type '{ canR... Remove this comment to see the full error message
      res.pronouns = Quest.lang.pronouns.secondperson;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'player' does not exist on type '{ canRea... Remove this comment to see the full error message
      res.player = true;

      // @ts-expect-error ts-migrate(2339) FIXME: Property 'receiveItems' does not exist on type '{ ... Remove this comment to see the full error message
      res.receiveItems = [
        {
          f(options: any) {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg(Quest.lang.done_msg, options);
            options.item.loc = this.name;
            return true;
          },
          test() {
            return true;
          },
        },
      ];

      return res;
    };
  }
}
