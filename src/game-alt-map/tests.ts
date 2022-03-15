"use strict";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
test.tests = function () {



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("custom date time")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("11 Marisi, 1374, 1:46 am", Quest.Utilities.util.getDateTime())
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDateTimeDict' does not exist on type ... Remove this comment to see the full error message
  const dateTimeDict = Quest.Utilities.util.getDateTimeDict()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(46, dateTimeDict.minute)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, dateTimeDict.hour)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("It is 11 Marisi, 1374, 1:46 am", Quest.Text.processText("It is {dateTime}"))
  game.elapsedTime += 8 * 60 * 60
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("It is 11 Marisi, 1374, 9:46 am", Quest.Text.processText("It is {dateTime}"))

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("-Two-Three-", Quest.Text.processText("{hour:3:8:One}-{hour:5:10:Two}-{hour:9:10:Three}-{hour:10:99:Four}"));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.util.isAfter('1003'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(false, Quest.Utilities.util.isAfter('0946'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.util.isAfter('0945'))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(true, Quest.Utilities.util.isAfter('0859'))






  /* */
};