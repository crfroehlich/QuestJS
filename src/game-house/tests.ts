"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'resetOnCompletion' does not exist on typ... Remove this comment to see the full error message
test.resetOnCompletion = false
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ignoreHTML' does not exist on type '{}'.
test.ignoreHTML = true
//test.logCommand = function(s) { log('"' + s + '",') }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'afterFinish' does not exist on type '{}'... Remove this comment to see the full error message
test.afterFinish = function (success: any) {
  if (success) {
    debugmsg("Hurrah!")
  }
  else {
    debugmsg("Oh dear...")
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
test.tests = function () {


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Grow a tree")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.seedsPlanted = 3
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.growthTime = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy watches as four shoots grow.", processText("Mandy watches as {nv:item:grow:false:grown_tamarind_tree_count}.", { item: w.grown_tamarind_tree, grown_tamarind_tree_count: 4 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy can see four shoots.", processText("Mandy can see {nm:item:count}.", { item: w.grown_tamarind_tree, grown_tamarind_tree_count: 4 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy watches as three shoots grow; the shoots are now about two centimetres high.", processText("Mandy watches as {nv:item:grow:false:count_this}; {nv:item:be:false:count_this:suppressCount} now about {show:grown_tamarind_tree:getHeight} high.", { item: w.grown_tamarind_tree, count_this: 'seedsPlanted', suppressCount: 'seedsPlanted' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy can see three shoots.", processText("Mandy can see {nm:item:count:false:count_this}.", { item: w.grown_tamarind_tree, count_this: 'seedsPlanted' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy watches as three shoots grow; the shoots are now about two centimetres high.", processText("Mandy watches as {nv:item:grow:false:count_this}; {nv:item:be:false:count_this:suppressCount} now about {show:grown_tamarind_tree:getHeight} high.", { item: w.grown_tamarind_tree, count_this: 'seedsPlanted', suppressCount: 'seedsPlanted' }))


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.seedsPlanted = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.growthTime = 6
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy watches as the plant grows.", processText("Mandy watches as {nv:item:grow:false:grown_tamarind_tree_count}.", { item: w.grown_tamarind_tree, grown_tamarind_tree_count: 1 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy can see one plant.", processText("Mandy can see {nm:item:count}.", { item: w.grown_tamarind_tree, grown_tamarind_tree_count: 1 }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy watches as the plant grows; the plant is now about twenty centimetres high.", processText("Mandy watches as {nv:item:grow:false:count_this}; {nv:item:be} now about {show:grown_tamarind_tree:getHeight} high.", { item: w.grown_tamarind_tree, count_this: 'seedsPlanted' }))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.seedsPlanted = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.growthTime = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.update()



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Plurals")
  let s_in, s_out
  s_in = "Mandy watches as {nv:item:grow:false:count_this}; {nv:item:be:false:suppressCount} now about {show:grown_tamarind_tree:getHeight} high."

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.seedsPlanted = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  s_out = processText(s_in, { item: w.grown_tamarind_tree, count_this: 'seedsPlanted', suppressCount: 'seedsPlanted' })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy watches as the shoot grows; the shoot is now about one centimetre high.", s_out)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  s_out = processText("{nv:item:wither:true:suppressCount} away to nothing.", { item: w.grown_tamarind_tree, suppressCount: 'seedsPlanted' })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The shoot withers away to nothing.", s_out)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.seedsPlanted = 3
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("the shoots", Quest.lang.getName(w.grown_tamarind_tree, { article: 2, suppressCount: 'seedsPlanted' }))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  s_out = processText(s_in, { item: w.grown_tamarind_tree, count_this: 'seedsPlanted', suppressCount: 'seedsPlanted' })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Mandy watches as three shoots grow; the shoots are now about one centimetre high.", s_out)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  s_out = processText("{nv:item:wither:true:suppressCount} away to nothing.", { item: w.grown_tamarind_tree, count_this: 'seedsPlanted', suppressCount: 'seedsPlanted' })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The shoots wither away to nothing.", s_out)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'grown_tamarind_tree' does not exist on t... Remove this comment to see the full error message
  w.grown_tamarind_tree.seedsPlanted = 0




  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Shrink/grow phone")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, w.mobile_phone.size_changing)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(7, w.mobile_phone.maxsize)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, w.mobile_phone.minsize)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
  w.mobile_phone.shrink()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('small mobile phone', w.mobile_phone.alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["Mandy's phone is now tiny."], function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
    w.mobile_phone.examine(player, {})
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["Mandy looks at her shrunken phone. Maybe it was a bit optimistic thinking it would now be charged, just because it is so much smaller."], function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
    w.mobile_phone.use(player, {})
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
  w.mobile_phone.shrink()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('tiny mobile phone', w.mobile_phone.alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["Her stupid phone is now too small to use!"], function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
    w.mobile_phone.use(player, {})
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
  w.mobile_phone.grow()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
  w.mobile_phone.grow()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('mobile phone', w.mobile_phone.alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["Mandy looks at her phone. 'Shit.' No charge left. She only charged it last night... No, wait, she had found it on her bedroom floor this morning. 'Shit,' she says again."], function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
    w.mobile_phone.use(player, {})
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
  w.mobile_phone.grow()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('big mobile phone', w.mobile_phone.alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertOut' does not exist on type '{}'.
  test.assertOut(["Her stupid phone is now too big to use!"], function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
    w.mobile_phone.use(player, {})
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'mobile_phone' does not exist on type '{}... Remove this comment to see the full error message
  w.mobile_phone.shrink()


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Book")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x book", ["Mandy glances at her copy of \"Antony and Cleopatra\". She really should get around to actually reading it some time, what with an exam on it in just a few weeks."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x Antony", /Mandy glances at her copy of /)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x Antony and Cleopatra", /Mandy glances at her copy of /)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'highfield_lane' does not exist on type '... Remove this comment to see the full error message
  w.highfield_lane.zone = 'steampunk'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shakespeare_book' does not exist on type... Remove this comment to see the full error message
  w.shakespeare_book.afterCarry()

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x book", ["Mandy glances at her copy of \"Antony and Cleopatra\". Wait, this is not the same book! This is a copy of \"Love's Labour's Lost\". What has happened to \"Antony and Cleopatra\"? Ms Coulter will be furious."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x book", ["Mandy looks at the book she now has. A copy of \"Love's Labour's Lost\". She wonders if it would be any less boring than \"Antony and Cleopatra\". Probably not worth risking finding out."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x othello", /Mandy looks at the book she now has/)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x Antony", /Mandy looks at the book she now has/)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'highfield_lane' does not exist on type '... Remove this comment to see the full error message
  w.highfield_lane.zone = 'external'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'shakespeare_book' does not exist on type... Remove this comment to see the full error message
  w.shakespeare_book.afterCarry()








  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Telescope")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'movePlayer' does not exist on type '{}'.
  test.movePlayer('observatory')

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Telescope basics and ceiling")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x tel", ["The telescope itself is about four metres long. It is held in place by a complicated mechanism, involving cogs and gears, and the whole thing is made of brass, giving it a strange beauty. Mandy wonders idly if she could climb up it. It is currently raised up, and pointing northeastward.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("use tel", ["Mandy looks though the eyepiece at the side of the base of the telescope, but all she can see is a uniform off-white. Exactly the same colour as the ceiling...",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("push lever", ["She pushes the lever down, and a huge slot in the ceiling opens up, directly in front of the telescope, allowing anyone using the telescope to actually see the sky.", "She glances outside; the sky looks threatening. It had been quite nice before she entered the house.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("look through t", ["Mandy looks though the eyepiece at the side of the base of the telescope. For a moment, all she can see is the reflection of her eyelashes, but she opens her eye wide, and can see... clouds. And they look pretty much the same as they do without a telescope.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("pull lever", ["She pulls the lever up, and the slot in the ceiling slides closed."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("pull lever", ["She pulls the lever down, and the huge slot in the ceiling opens up."])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Telescope azimuth")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn left left", "With a grunt of effort, Mandy turns the left wheel a full rotation anti-clockwise -- it is hard work! As she does the entire telescope, and the mechanism holding it, rotates, with a painful grinding noise. At the same time, the ceiling also turns.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, w.telescope.azimuth)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn left left", "With a grunt of effort, Mandy turns the left wheel a full rotation anti-clockwise -- it is hard work! As she does the entire telescope, and the mechanism holding it, rotates, with a painful grinding noise. At the same time, the ceiling also turns.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(7, w.telescope.azimuth)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn left right", "Mandy turns the left wheel a full rotation clockwise, and as she does the entire telescope, and the mechanism holding it, smoothly rotates. At the same time, the ceiling also turns.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, w.telescope.azimuth)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x tel", "The telescope itself is about four metres long. It is held in place by a complicated mechanism, involving cogs and gears, and the whole thing is made of brass, giving it a strange beauty. Mandy wonders idly if she could climb up it. It is currently raised up, and pointing northward.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn left left", "With a grunt of effort, Mandy turns the left wheel a full rotation anti-clockwise -- it is hard work! As she does the entire telescope, and the mechanism holding it, rotates, with a painful grinding noise. At the same time, the ceiling also turns.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn left left", "With a grunt of effort, Mandy turns the left wheel a full rotation anti-clockwise -- it is hard work! As she does the entire telescope, and the mechanism holding it, rotates, with a painful grinding noise. At the same time, the ceiling also turns, and she can just see the roof of the great hall through the slot.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(6, w.telescope.azimuth)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("pull lever", ["She pulls the lever up, and the slot in the ceiling slides closed."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn left left", "With a grunt of effort, Mandy turns the left wheel a full rotation anti-clockwise -- it is hard work! As she does the entire telescope, and the mechanism holding it, rotates, with a painful grinding noise. At the same time, the ceiling also turns.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn left right", "Mandy turns the left wheel a full rotation clockwise, and as she does the entire telescope, and the mechanism holding it, smoothly rotates. At the same time, the ceiling also turns.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x left", "The left wheel is about seven centimetres across, and made of brass. There is a set of numbers on dials, like a gas meter, just above the wheel, showing 275.")


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Telescope altitude")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(5, w.telescope.altitude)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn right right", "Mandy turns the right wheel a full rotation clockwise, and as she does the telescope rises.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn right right", "Mandy turns the right wheel a full rotation clockwise, and as she does the telescope rises.")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn right right", "Mandy tries to move the right wheel clockwise, but it will not turn any more.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(7, w.telescope.altitude)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn right left", "Mandy turns the right wheel a full rotation anti-clockwise, and as she does the telescope lowers.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn right left", "Mandy turns the right wheel a full rotation anti-clockwise, and as she does the telescope lowers.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn right left", "Mandy turns the right wheel a full rotation anti-clockwise, and as she does the telescope lowers.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x right", "The right wheel is about seven centimetres across, and made of brass. There is a set of numbers on dials, like a gas meter, just above the wheel, showing 40.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(4, w.telescope.altitude)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x tel", ["The telescope itself is about four metres long. It is held in place by a complicated mechanism, involving cogs and gears, and the whole thing is made of brass, giving it a strange beauty. Mandy wonders idly if she could climb up it. It is currently diagonal, and pointing westward.",])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Telescope Climb")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("climb", ["She clambers up the telescope.", "The Observatory (On The Telescope)", "Mandy clings to the top of the mechanism that supports the telescope. From here she can... Not do a lot. The domed roof is too far to touch, and the eyepiece of the telescope is back on the ground. She could perhaps edge west along the telescope itself."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", /She cannot go east/)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
  w.telescope.azimuth = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", ["Mandy cautiously edges along the telescope to the very end.", "The Observatory (End Of The Telescope)", "Mandy sits -- somewhat precariously -- straddling the telescope. From here she could touch the ceiling, if she really want to."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", "Mandy looks at the slot in the ceiling, just beyond the end of the telescope. If that were open, she might be able to get out through it, she muses.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
  w.telescope.roofOpen = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", "Mandy considers for a moment a leap of faith from the end of the telescope, out through the slot in the ceiling... No, not a good idea.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", /She cannot go west/)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["Mandy cautiously edges back along the telescope to where it is supported, and clings to the mechanism, feeling decidedly safer.", "The Observatory (On The Telescope)", "Mandy clings to the top of the mechanism that supports the telescope. From here she can... Not do a lot. The domed roof is too far to touch, and the eyepiece of the telescope is back on the ground. She could perhaps edge north along the telescope itself."])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
  w.telescope.altitude = 7
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", "Mandy looks at the end of the telescope; if it were not so steep and smooth, she could edge along it.")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
  w.telescope.azimuth = 6
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
  w.telescope.altitude = 2
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
  w.telescope.roofOpen = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["Mandy cautiously edges along the telescope to the very end.", "The Observatory (End Of The Telescope)", "Mandy sits -- somewhat precariously -- straddling the telescope. From here she could touch the ceiling, if she really want to."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("n", /She cannot go north/)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", "Mandy looks at the slot in the ceiling, just beyond the end of the telescope. If that were open, she might be able to get out through it, she muses.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["Mandy cautiously edges back along the telescope to where it is supported, and clings to the mechanism, feeling decidedly safer.", "The Observatory (On The Telescope)", "Mandy clings to the top of the mechanism that supports the telescope. From here she can... Not do a lot. The domed roof is too far to touch, and the eyepiece of the telescope is back on the ground. She could perhaps edge west along the telescope itself."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["Mandy cautiously edges along the telescope to the very end.", "The Observatory (End Of The Telescope)", "Mandy sits -- somewhat precariously -- straddling the telescope. From here she could touch the ceiling, if she really want to."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'telescope' does not exist on type '{}'.
  w.telescope.roofOpen = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("w", ["Mandy reaches over to the opening in the roof. She climbs through, and for a moment is balanced precariously on the bottom of the slot, before she jumps onto the adjacent roof, heart pounding in her chest.", "On A High Roof", /Mandy is standing/, /./, /./])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("e", ["Mandy nervously jumps back on to the sill of the opening in the observatory roof. After a moment to catch her breath, she reaches across, to grab the telescope, and straddle the end of it.", "The Observatory (End Of The Telescope)", "Mandy sits -- somewhat precariously -- straddling the telescope. The open slot in the ceiling is just in front of her, and beyond that, she can see the roof of the great hall. It looks close enough she might be able to head west, climbing across."])















  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Hourglass")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'movePlayer' does not exist on type '{}'.
  test.movePlayer('greenhouse_west')

  // hourglass.state, .fillState
  // tamarind_seed.countableLocs

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Plant seeds")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, w.grown_tamarind_tree.seedsPlanted)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
  w.tamarind_seed.countableLocs[player.name] = 5
  world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("plant 2 seeds in ground", ["Mandy carefully plants two tamarind seeds in the bare earth.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put three seeds in earth", ["Mandy carefully plants three tamarind seeds in the bare earth.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put phone in earth", ["Mandy wonders if burying the mobile phone is going to achieve anything. Probably not.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get 5 seeds", ["She takes five tamarind seeds.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("plant 2 seed", ["Mandy carefully plants two tamarind seeds in the bare earth.",])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Cannot plant/get seed while hourglass active")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hourglass' does not exist on type '{}'.
  w.hourglass.active = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("plant 3 seeds", ["Mandy starts to put another three tamarind seeds in the ground, but as her hands get near, they start to blur, and feel numb. Perhaps not such a good idea when the hourglass is running.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get seed", ["Mandy starts to dig the tamarind seed from the ground, but as her hands get near, they start to blur, and feel numb. Perhaps not such a good idea when the hourglass is running.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hourglass' does not exist on type '{}'.
  w.hourglass.active = false
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("plant seed", ["Mandy carefully plants one tamarind seed in the bare earth.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, w.tamarind_seed.countAtLoc('bare_earth'))


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Turn hourglass")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn ho", ["Mandy turns the hourglass over.", "All the sand is in the upper bulb in the hourglass.", "Mandy watches as three shoots grow; the shoots are now about two centimetres high.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, w.hourglass.active)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Take hourglass while sand falling")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get ho", ["She takes the hourglass.", "The shoots wither away to nothing.", "As time passes, sand falls from the upper bulb of the hourglass; it now has about 25% of the sand left in it."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, w.hourglass.active)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hourglass' does not exist on type '{}'.
  w.hourglass.state = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("turn ho", ["Mandy turns the hourglass over.", "All the sand is in the upper bulb in the hourglass.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, w.hourglass.active)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Place hourglass while sand falling")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
  w.tamarind_seed.countableLocs.bare_earth = 3
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, w.tamarind_seed.countAtLoc('bare_earth'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put ho on ped", ["Mandy feels a slight jolt, like static electricity, as she places the hourglass on the pedestal.", "As time passes, sand falls from the upper bulb of the hourglass; it now has about 25% of the sand left in it.", "Mandy watches as three shoots grow; the shoots are now about two centimetres high.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, w.grown_tamarind_tree.seedsPlanted)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, w.tamarind_seed.countableLocs.bare_earth)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, w.hourglass.active)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("Wait", ["Time passes...", "As time passes, sand falls from the upper bulb of the hourglass; it is now empty.",])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Take and lace hourglass while sand not falling")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get ho", ["She takes the hourglass.", "The shoots wither away to nothing."])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("put ho on ped", ["Mandy feels a slight jolt, like static electricity, as she places the hourglass on the pedestal."])



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Make funnel")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("make funnel", ["She needs a piece of paper to build a paper funnel.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
  w.secret_recipe.loc = player.name
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("make funnel", ["She builds a paper funnel from the piece of paper.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(undefined, w.secret_recipe.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(player.name, w.paper_funnel.loc)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
  w.secret_recipe.loc = player.name
  world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("make funnel", ["The paper funnel has already been made.",])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Make funnel With")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'paper_funnel' does not exist on type '{}... Remove this comment to see the full error message
  delete w.paper_funnel.loc
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
  w.secret_recipe.loc = player.name
  world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("make funnel with paper", ["She builds a paper funnel from the piece of paper.",])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'paper_funnel' does not exist on type '{}... Remove this comment to see the full error message
  delete w.paper_funnel.loc
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
  w.secret_recipe.loc = player.name
  world.update()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("make funnel with bag", ["She cannot make a paper funnel from a school bag.",])




  /**/


}