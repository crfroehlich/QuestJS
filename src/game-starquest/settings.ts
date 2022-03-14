"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.settings.title = "Star Quest"
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
Quest.settings.panesCollapseAt = 0
Quest.settings.themes = ['sans-serif']
// @ts-expect-error ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
Quest.settings.styleFile = 'style'
Quest.settings.files = ["code", "data", "crew", "page", "stars", "missions"]
Quest.settings.tests = true
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.settings.noTalkTo = false
// @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.settings.iconsFolder = false

// @ts-expect-error ts-migrate(2339) FIXME: Property 'onView' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.settings.onView = function(item: any) { return w.ship.onView === item.name && currentLocation === w.bridge }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'pageOption' does not exist on type '{ pe... Remove this comment to see the full error message
Quest.settings.pageOption = function(item: any) { return item.pageOption }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
Quest.settings.inventoryPane = [
//  {name:'Items Held', alt:'itemsHeld', test:Quest.settings.isHeldNotWorn, getLoc:function() { return player.name; } },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'onView' does not exist on type '{ perfor... Remove this comment to see the full error message
  {name:'On Viewscreen', alt:'itemsView', test:Quest.settings.onView },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'pageOption' does not exist on type '{ pe... Remove this comment to see the full error message
  {name:'Your PAGE', alt:'pageOptions', test:Quest.settings.pageOption },
  {name:'People Here', alt:'itemsHere', test:Quest.settings.isHere, getLoc:function() { return player.loc; } },
]

// @ts-expect-error ts-migrate(2339) FIXME: Property 'favicon' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.settings.favicon = 'assets/icons/sq.png'

Quest.settings.funcForDynamicConv = 'showMenuDiag'

Quest.settings.status = [
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  function() { return "<td>Stardate:</td><td>" + w.ship.getDateTime() + "</td>"; },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  function() { return "<td>Alert:</td><td>" + w.ship.getAlert() + "</td>"; },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  function() { return "<td>System:</td><td>" + stars.getSystem().alias + "</td>"; },
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  function() { return "<td>Location:</td><td>" + stars.getLocation().alias + "</td>"; },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  function() { return "<td>Hull:</td><td>" + w.ship.hullIntegrity + "%</td>"; },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  function() { return "<td>Shields:</td><td>" + w.ship.getShields() + "</td>"; },
]

Quest.settings.libraries.push('image-pane')
// @ts-expect-error ts-migrate(2551) FIXME: Property 'imageStyle' does not exist on type '{ pe... Remove this comment to see the full error message
Quest.settings.imageStyle = {
  right:'0',
  top:'200px',
  width:'400px',
  height:'400px',
  'background-color':'#111', 
  border:'3px black solid',
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

// @ts-expect-error ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.settings.setup = function() {
  
  createAdditionalPane(1, "Go to", 'directions', function() {
    let html = ''
    for (const ex of currentLocation.dests) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const dest = w[ex.name]
      html += '<div style="margin-bottom: 10px;"><p class="item" onclick="runCmd(\'go to ' + dest.alias.toLowerCase() + '\')">' + dest.headingAlias + '</p></div>'
    }
    return html
  })
  
  
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("You step on to the bridge. 'Welcome aboard, sir,' says a blonde woman in a red uniform, handing you a PAGE. 'I'm Yeoman Rand, I've been designated as your aide. The ship is all set, sir. We just need to to appoint the bridge officers. I believe Command has prepared a short list on your PAGE.'")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("'Thank you, yeoman.'")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("'Can I ask what our mission is, sir?'")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("'We're being sent to Sector 7 Iota.'")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("'That's a long way out, sir. What do they want us to do there? Anything to do with the Brakk?'")
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  msg("'I was just told to report to the Starbase. Beyond that... you know as much as I do, yeoman. Hopefully we'll not be close enough to the border to encounter any Brakk ships.'")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.settings.playMode !== 'dev') wait()
  
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  metamsg("If this is your first play through - or you just want a reminder of how to get going - you might want to look at the {cmd:intro1:introductory text}, see {cmd:intro2:how to start} or look at the {cmd:intro3:further notes}.")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.settings.playMode !== 'dev') wait()
  stars.draw('stardock')
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
Quest.settings.updateCustomUI = function() {
  const encyc = Array.from(document.getElementsByClassName('item')).filter(el => el.innerHTML === 'Encyclopedia')[0]
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'onclick' does not exist on type 'Element... Remove this comment to see the full error message
  encyc.onclick = function() { askDiag("Search the web", w.encyclopedia.askDiag, "Submit") }
  
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogTitle' does not exist on t... Remove this comment to see the full error message
Quest.settings.startingDialogTitle = "Crew Roster"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogWidth' does not exist on t... Remove this comment to see the full error message
Quest.settings.startingDialogWidth = 500
// @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogHeight' does not exist on ... Remove this comment to see the full error message
Quest.settings.startingDialogHeight = 480
// @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogOnClick' does not exist on... Remove this comment to see the full error message
Quest.settings.startingDialogOnClick = function() {
  // ...
}
// @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogInit' does not exist on ty... Remove this comment to see the full error message
Quest.settings.startingDialogInit = function() {
  //document.querySelector('#namefield').focus()
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'startingDialogOnClick' does not exist on... Remove this comment to see the full error message
Quest.settings.startingDialogOnClick = function() {
  Quest.settings.startingDialogEnabled = true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'dialogType' does not exist on type '{ pe... Remove this comment to see the full error message
  if (Quest.settings.dialogType === 'crew roster' && !w.ship.arrivedAtSector) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const npc = w[document.querySelector("#diag-name").value]

    for (let role of roster.data) {
      const assignedNpc = roster.getOfficer(role.name)
      //log(assignedNpc)
      if (assignedNpc && assignedNpc !== npc) continue
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      if (document.querySelector("#diag-" + role.name).checked) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        w.ship[role.name] = npc.name
      }
      else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        w.ship[role.name] = false
      }
    }
    const roles = roster.getRoles(npc)
    if (roles.length === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You assign no positions to " + npc.alias + ".")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You assign " + formatList(roles) + " to " + npc.alias + ".")
    }
    if (roles.length === 0 && npc.loc) {
      npc.loc = false
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(npc.leaving, {char:npc})
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateUIItems' does not exist on type '{... Remove this comment to see the full error message
      io.updateUIItems()
    }
    if (roles.length !== 0 && !npc.loc) {
      npc.loc = 'bridge'
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg(npc.entering, {char:npc})
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateUIItems' does not exist on type '{... Remove this comment to see the full error message
      io.updateUIItems()
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'dialogType' does not exist on type '{ pe... Remove this comment to see the full error message
    delete Quest.settings.dialogType
  }
}        

