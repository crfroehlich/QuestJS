"use strict";

 
// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("me",
  PLAYER(),
  { 
    loc:"lounge",
    regex:/^(me|myself|player)$/,
    examine:function(options: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("A " + (this.isFemale ? "chick" : "guy") + " called " + this.alias);
    },
  }
);


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("knife",
  TAKEABLE(),
  { 
    loc:"me",
    sharp:false,
    examine:function(options: any) {
      if (this.sharp) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("A really sharp knife.");
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("A blunt knife.");
      }
    },
    chargeResponse:function(participant: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("There is a loud bang, and the knife is destroyed.")
      this.loc = false
      return false
    },
  }
);







// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("lounge", {
  desc:'A smelly room with an [old settee:couch:sofa] and a [tv:telly].',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east:new Exit('kitchen'),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west:new Exit("dining_room"),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up:new Exit("bedroom"),
  hint:"There is a lot in this room! The bricks can be picked up by number (try GET 3 BRICKS). The book can be read. The coin is stuck to the floor. There are containers too. Kyle is an NPC; you can tell him to do nearly anything the player character can do (everything except looking and talking).",
});
