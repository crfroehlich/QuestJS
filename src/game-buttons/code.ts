
/*
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Charge', {
  npcCmd:true,
  regex:/^(?:charge|power) (.+)$/,
  objects:[
    {scope:parser.isHeld}
  ],
  defmsg:"{pv:item:'be:true} not something you can charge.",
}))
*/









// @ts-expect-error ts-migrate(2339) FIXME: Property 'getItemHtml' does not exist on type '{ n... Remove this comment to see the full error message
io.getItemHtml = function (item: any, loc: any, isSubItem: any, highlight: any) {
  const verbList = item.getVerbs(loc)
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  if (verbList === undefined) { errormsg("No verbs for " + item.name); console.log(item); }

  let s = '<p id="' + item.name + '-item" class="item-class"><span class="item-name">' + item.getListAlias(loc) + ':</span>'
  for (let verb of verbList) {
    if (typeof verb === 'string') verb = { name: verb, action: verb }
    s += ' <span class="item-action-button" onclick="io.clickItemAction(\'' + item.name + '\', \'' + verb.action + '\')">';
    s += verb.name;
    s += '</span>';
  }
  s += '</p>'
  return s
}







// @ts-expect-error ts-migrate(2339) FIXME: Property 'isRoom' does not exist on type '{}'.
parser.isRoom = function (o: any) { return o.room }

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('GoTo', {
  npcCmd: true,
  regex: /^(?:go to|go) (.+)$/,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isRoom' does not exist on type '{}'.
    { scope: parser.isRoom }
  ],
  script: function (objects: any) {
    const room = objects[0][0]
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (room === currentLocation) return failedmsg("As if by magic, you are suddenly... where you already were.")
    if (!room.room) return failedmsg("{pv:item:be:true} not a destination.", { item: room })
    for (const ex of currentLocation.dests) {
      if (room.name === ex.name) {
        return ex.use(player, ex) ? world.SUCCESS : world.FAILED
      }
    }
    return failedmsg("{pv:item:be:true} not a destination you can get to from here.", { item: room })
  },
}))



// @ts-expect-error ts-migrate(2339) FIXME: Property 'isContact' does not exist on type '{}'.
parser.isContact = function (o: any) { return o.contact }



// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'smartPhone... Remove this comment to see the full error message
const smartPhoneFunctions = ["Contacts", "Take photo", "Photo gallery", "Search internet", "Hang up", "News feed"]

for (let el of smartPhoneFunctions) {
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(new Quest.Command.Cmd(el, {
    regex: new RegExp('^' + el.toLowerCase() + ' (.+)$'),
    attName: Quest.Utilities.verbify(el),
    objects: [
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
      { scope: parser.isHeld },
    ],
    defmsg: "{pv:item:'be:true} not something you can do that with.",
  }))
}



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Phone', {
  npcCmd: true,
  regex: /^(?:telephone|phone|call|contact) (.+)$/,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContact' does not exist on type '{}'.
    { scope: parser.isContact }
  ],
  script: function (objects: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
    return w.phone.makeCall(objects[0][0]) ? world.SUCCESS : world.FAILED
  },
}))



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('HangUp', {
  npcCmd: true,
  regex: /^(?:hang up|end call)$/,
  objects: [
  ],
  script: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (!player.onPhoneTo) return failedmsg("You are not on a call.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
    w.phone.hangUp()
    return world.SUCCESS
  },
}))







// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(new Quest.Command.Cmd('DialogTest', {
  npcCmd: true,
  regex: /^(?:dialog) (.*)$/,
  objects: [
    { special: 'text' },
  ],
  script: function (objects: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
    const funcName = parser.currentCommand.string.replace(/dialog /i, '')
    log(funcName)
    const choices = ['red', 'yellow', 'blue']
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    io.menuFunctions[funcName]('Pick a colour?', choices, function (result: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You picked " + result)
    })
    return world.SUCCESS_NO_TURNSCRIPTS
  },
}))

