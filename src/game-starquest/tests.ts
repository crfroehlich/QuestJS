"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
test.tests = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 1")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Sir! Yes, sir", Quest.Text.processText("{Sir}! Yes, {sir}"))
  Quest.World.player.callmemaam = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Ma'am! Yes, ma'am", Quest.Text.processText("{Sir}! Yes, {sir}"))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 2")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  Quest.World.w.ship.helm = 'sharraaa'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  Quest.World.w.ship.science = 'sharraaa'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  Quest.World.w.ship.engineering = 'farrington_moss'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'sharraaa' does not exist on type '{}'.
  Quest.World.w.sharraaa.loc = 'bridge'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'farrington_moss' does not exist on type ... Remove this comment to see the full error message
  Quest.World.w.farrington_moss.loc = 'bridge'
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The Helmsman is Sharraaa.", Quest.Text.processText("The Helmsman is {role:helm:alias}."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The Helmsman is the Salis.", Quest.Text.processText("The Helmsman is {role:helm:altName}."))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("The Salis is the Helmsman.", Quest.Text.processText("{role:helm:altName:true} is the Helmsman."))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Text processor 3")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Stardate 854.63.5", Quest.Text.processText("{time}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  Quest.World.w.ship.dateTime += 24
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Stardate 854.64.5", Quest.Text.processText("{time}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  Quest.World.w.ship.dateTime += 2
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Stardate 854.64.7", Quest.Text.processText("{time}"))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Stardate 854.63.5", Quest.Text.processText("{time:0}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Stardate 854.63.6", Quest.Text.processText("{time:1}"))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Stardate 854.64.5", Quest.Text.processText("{time:24}"))


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Roster")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Helm", roster.getRole('helm').alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  log(Quest.World.w.ship)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, roster.hasOfficer('helm'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, roster.hasOfficer('armsman'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('sharraaa', roster.getOfficer('helm').name)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(null, roster.getOfficer('armsman'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(4, roster.getRoles().length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, roster.getRoles(true).length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, roster.getRoles(false).length)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['helm', 'science'], roster.getRoles('sharraaa'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(['engineering'], roster.getRoles(Quest.World.w.farrington_moss))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, Quest.World.w.sharraaa.getTopics().length)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Stars 1")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Stardock 83', stars.getLocation().alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Sol', stars.getSystem().alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Starbase 142', stars.getLocation('starbase').alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Cyrennis Minima', stars.getSystem('starbase').alias)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Missions 1")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Asteroid heading for Chloris V', missions.getMission('asteroid').alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, missions.isActive('asteroid'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(undefined, missions.getState('asteroid'))

  stars.arriveAtSector()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Ship officer roster:|Helm: Sharraaa|Chief Engineer: Farrington Moss|Science Officer: Sharraaa|Armsman: no assignment', roster.getRoster())

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Starbase 142', stars.getLocation().alias)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Stars 2")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Starbase 142', stars.getLocation().alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Cyrennis Minima', stars.getSystem().alias)

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Missions 2")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, missions.isActive('asteroid'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, missions.getState('asteroid'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual('Get to Chloris', missions.getStatus('asteroid'))


  /**/
}