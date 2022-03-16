// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem(
  'me',
  Quest.Templates.PLAYER(),
  {
    examine(options: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`A ${this.isFemale ? 'chick' : 'guy'} called ${this.alias}`);
    },
    loc:   'lounge',
    regex: /^(me|myself|player)$/,
  },
);

// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem(
  'knife',
  Quest.Templates.TAKEABLE(),
  {
    chargeResponse(participant: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg('There is a loud bang, and the knife is destroyed.');
      this.loc = false;
      return false;
    },
    examine(options: any) {
      if (this.sharp) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('A really sharp knife.');
      } else {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('A blunt knife.');
      }
    },
    loc:   'me',
    sharp: false,
  },
);

// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('lounge', {
  desc: 'A smelly room with an [old settee:couch:sofa] and a [tv:telly].',
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east: new Quest.World.Exit('kitchen'),

  hint: 'There is a lot in this room! The bricks can be picked up by number (try GET 3 BRICKS). The book can be read. The coin is stuck to the floor. There are containers too. Kyle is an NPC; you can tell him to do nearly anything the player character can do (everything except looking and talking).',

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  up:   new Quest.World.Exit('bedroom'),
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  west: new Quest.World.Exit('dining_room'),
});
