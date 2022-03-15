var cloakHere = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
  if (w.cloak.isAtLoc('me')) return true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
  if (w.cloak.isHere()) return true
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'cloak' does not exist on type '{}'.
  if (w.cloak.isAtLoc('hook') && player.isAtLoc('cloakroom')) return true
  return false
}

Quest.lang.no_smell = "It smells slightly musty."

Quest.lang.no_listen = "It is quiet as the grave..."

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
tp.addDirective("cloakHere", function (arr: any, params: any) {
  return cloakHere() ? arr[0] : arr[1]
});

Quest.Command.findCmd('MetaCredits').script = function () {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('This game was created by The Pixie, following the Cloak of Darkness specification by Roger Firth.')
}

Quest.Command.findCmd('MetaHelp').script = function () {
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('Just type stuff at the prompt!')
}

// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.push(new Quest.Command.Cmd('HangUp', {
  regex: /^(?:hang up|hang) (.+?)(?: on the hook| on hook|)$/,
  objects: [
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
    { scope: Quest.Parser.parser.isHeld },
  ],
  script: function (objects: any) {
    if (!objects[0][0].isAtLoc(player)) {
      return Quest.IO.failedmsg("You're not carrying {sb:obj}.", { obj: objects[0][0] })
    }
    else if (objects[0][0].worn) {
      return Quest.IO.failedmsg("Not while you're wearing {sb:obj}!", { obj: objects[0][0] })
    }
    else if (!player.isAtLoc('cloakroom')) {
      return Quest.IO.failedmsg("Hang {sb:obj} where, exactly?", { obj: objects[0][0] })
    }
    else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'hook' does not exist on type '{}'.
      objects[0][0].moveToFrom(player, w.hook)
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg("You hang {nm:obj:the} on the hook.", { obj: objects[0][0] })
      return world.SUCCESS
    }
  }
}))