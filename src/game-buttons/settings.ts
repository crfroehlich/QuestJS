"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.title = "Buttons, buttons, buttons"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.author = "The Pixie"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.Settings.settings.version = "0.1"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.thanks = []
// @ts-expect-error ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.warnings = "No warnings have been set for this game."
// @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.playMode = "dev"

// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.Settings.settings.noTalkTo = false
// @ts-expect-error ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.styleFile = 'style'



// @ts-expect-error ts-migrate(2339) FIXME: Property 'roomCreateFunc' does not exist on type '... Remove this comment to see the full error message
Quest.Settings.settings.roomCreateFunc = function (o: any) {
  if (o.dests) {
    for (const ex of o.dests) {
      ex.origin = o
      ex.dir = 'to ' + (o.dirAlias ? o.dirAlias : o.alias)
    }
  }
}

Quest.Settings.settings.afterEnter = function () {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (player.onPhoneTo && w[player.onPhoneTo].loc === player.loc) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
    w.phone.hangUp()
  }
}



// For items
// @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
Quest.Settings.settings.inventoryPane = [
  { name: 'You are holding...', alt: 'itemsHeld', test: Quest.Settings.settings.isHeldNotWorn, getLoc: function () { return player.name; }, noContent: 'Nothing' },
  { name: 'You are wearing...', alt: 'itemsWorn', test: Quest.Settings.settings.isWorn, getLoc: function () { return player.name; }, noContent: 'Nothing' },
  { name: 'You can see...', alt: 'itemsHere', test: Quest.Settings.settings.isHere, getLoc: function () { return player.loc; }, noContent: 'Nothing' },
  { name: 'You are on the phone to', alt: 'onPhoneTo', test: function (item: any) { return item.name === player.onPhoneTo }, noContent: 'No one' }
]





// For directions
Quest.Settings.settings.compassPane = false
// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.setup = function () {
  Quest.IO.createAdditionalPane(0, "Go to", 'directions', function () {
    const exitList = currentLocation.getExits({ excludeLocked: true })
    let s = '<p class="item-class"><span class="item-name">You can go:</span>'
    for (let ex of exitList) {
      s += ' <span class="item-action-button" onclick="Quest.IO.io.clickExit(\'' + ex.dir + '\')">'
      s += ex.dir
      s += '</span>'
    }
    s += '</p>'
    return s
  })
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
  Quest.Settings.settings.updateCustomUI()
}


// @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
Quest.Settings.settings.updateCustomUI = function () {
  // For items
  for (const el of document.querySelectorAll('.item-action')) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
    el.style.display = 'block'
    log(el.innerHTML)
  }

  //el.previousSibling.innerHTML = currentLocation.headingAlias
}




