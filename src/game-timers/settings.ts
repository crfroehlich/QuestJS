"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.title = "Your new game"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.author = "Your name here"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.Settings.settings.version = "0.1"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.thanks = []
// @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.warnings = "No warnings have been set for this game."
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.playMode = "dev"

Quest.Settings.settings.symbolsForCompass = true
Quest.Settings.settings.themes = ['sans-serif']

Quest.Settings.settings.eventFunctions = {
  sayNow: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Now!")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
    io.scrollToEnd()
  },

  sayThen: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Then!")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
    io.scrollToEnd()
  },

  sayOften: function () {
    if (!player.count) player.count = 0
    player.count++
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("Often! " + player.count)
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scrollToEnd' does not exist on type '{ n... Remove this comment to see the full error message
    io.scrollToEnd()
    if (player.count > 3) return true
  },
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.setup = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'registerTimerEvent' does not exist on ty... Remove this comment to see the full error message
  Quest.Utilities.util.registerTimerEvent("sayNow", 2, 2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'registerTimerEvent' does not exist on ty... Remove this comment to see the full error message
  Quest.Utilities.util.registerTimerEvent("sayThen", 10)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'registerTimerEvent' does not exist on ty... Remove this comment to see the full error message
  Quest.Utilities.util.registerTimerEvent("sayOften", 3, 3)
}