// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('me', Quest.Templates.PLAYER(), {
  examine:  'Just a regular guy.',
  loc:      'lounge',
  synonyms: ['me', 'myself'],
});

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('lounge', {
  desc: 'The lounge is boring, the author really needs to put stuff in it.',
});
