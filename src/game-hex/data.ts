"use strict"

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem("me", Quest.Templates.PLAYER(), {
  loc: "hex_0_0",
  regex: /^(me|myself|player)$/,
  examine: "Just a regular guy.",
  hitpoints: 100,
})







createBiome(5, -4, 'G', {
  desc: "The market square is the centre of the city, and is teeming with people.  In the southeast corner you see the magnificent entrance of Estalia Manor.|In the centre of the square, a golden statue of Stratos and Geo embracing while looking north to the Great Temple stands on a stone plinth; their presence blesses all who pass through.",
  getHexSymbol: function () { return 'assets/icons/houseicon.png' },
  getHexSymbolOffset: function () { return [-8, -8] },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  in: new Quest.World.Exit('tower'),
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom("tower", {
  desc: 'In a tower',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  out: new Quest.World.Exit(map.coordToCellName(5, -4)),
})


// @ts-expect-error ts-migrate(2339) FIXME: Property 'generate' does not exist on type '{ togg... Remove this comment to see the full error message
map.generate(-5, 8, [
  '    ss  ',
  '  sssms  ',
  '  sDDGms',
  ' ssGDGms',
  ' sGGGmms',
  'ssddGGms',
  'sdddGGms',
  'sdddGGCms',
  'sddddGCms',
  ' sddddCmss',
  '  sdddmssms',
  '   sddmssGms',
  '    smmsssss',
  '    smss',
  '     ss',
])


// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(-1, 4, 5, 5)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(0, 5, 0, 2, 3)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(0, 4, 0, 3, 3)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(0, 3, 5, 4)

// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(1, 5, 0, 2, 2)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(1, 4, 2)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(1, 2, 4, 4, 4)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(1, 1, 0, 4, 4)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(1, 1, 0, 4, 4)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(1, 0, 0, 4, 2)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(1, -1, 0, 2, 2)
// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(1, -1, 0, 2)

// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(2, -1, 2, 2)

// @ts-expect-error ts-migrate(2339) FIXME: Property 'river' does not exist on type '{ toggle:... Remove this comment to see the full error message
map.river(5, -4, 0, 2)


