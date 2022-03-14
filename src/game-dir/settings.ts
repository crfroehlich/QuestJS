"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.settings.title = "No Compass"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.settings.author = "The Pixie"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.settings.version = "0.1"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.settings.thanks = []
// @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.settings.warnings = "No warnings have been set for this game."
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.settings.playMode = "dev"

Quest.settings.compassPane = false
//Quest.settings.noAskTell = false
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.settings.noTalkTo = false

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.settings.setup = function() {
  createAdditionalPane(2, "Go to", 'directions', function() {
    let html = ''
    for (const ex of currentLocation.dests) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const dest = w[ex.name]
      html += '<div style="margin-bottom: 10px;"><p class="item" onclick="runCmd(\'go to ' + dest.alias.toLowerCase() + '\')">' + dest.headingAlias + '</p></div>'
    }
    return html
  })
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'roomCreateFunc' does not exist on type '... Remove this comment to see the full error message
Quest.settings.roomCreateFunc = function(o: any) {
  if (o.dests) {
    for (const ex of o.dests) {
      ex.origin = o
      ex.dir = 'to ' + (o.dirAlias ? o.dirAlias : o.alias)
    }
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
Quest.settings.inventoryPane.push(
  {name:'On Phone To', alt:'onPhoneTo', test:function(item: any) { return item.name === player.onPhoneTo  } }
)

Quest.settings.afterEnter = function() {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (player.onPhoneTo && w[player.onPhoneTo].loc === player.loc) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
    w.phone.hangUp()
  }
}