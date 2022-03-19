import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
  /*
  Quest.Commands.commands.unshift(new Quest.Command.Cmd('Charge', {
    npcCmd:true,
    regex:/^(?:charge|power) (.+)$/,
    objects:[
      {scope:Quest.Parser.parser.isHeld}
    ],
    defmsg:"{pv:item:'be:true} not something you can charge.",
  }))
  */

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getItemHtml' does not exist on type '{ n... Remove this comment to see the full error message
  Quest.IO.io.getItemHtml = function (item: any, loc: any, isSubItem: any, highlight: any) {
    const verbList = item.getVerbs(loc);
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (verbList === undefined) {
      Quest.IO.errormsg(`No verbs for ${item.name}`); console.log(item);
    }

    let s = `<p id="${item.name}-item" class="item-class"><span class="item-name">${item.getListAlias(loc)}:</span>`;
    for (let verb of verbList) {
      if (typeof verb === 'string') verb = { action: verb, name: verb };
      s += ` <span class="item-action-button" onclick="Quest.IO.io.clickItemAction('${item.name}', '${verb.action}')">`;
      s += verb.name;
      s += '</span>';
    }
    s += '</p>';
    return s;
  };

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'isRoom' does not exist on type '{}'.
  Quest.Parser.parser.isRoom = function (o: any) {
    return o.room;
  };

  // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(new Quest.Command.Cmd('GoTo', {
    npcCmd:  true,
    objects: [
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'isRoom' does not exist on type '{}'.
      { scope: Quest.Parser.parser.isRoom },
    ],
    regex: /^(?:go to|go) (.+)$/,
    script(objects: any) {
      const room = objects[0][0];
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (room === Quest.World.currentLocation) return Quest.IO.failedmsg('As if by magic, you are suddenly... where you already were.');
      if (!room.room) return Quest.IO.failedmsg('{pv:item:be:true} not a destination.', { item: room });
      for (const ex of Quest.World.currentLocation.dests) {
        if (room.name === ex.name) {
          return ex.use(Quest.World.player, ex) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
        }
      }
      return Quest.IO.failedmsg('{pv:item:be:true} not a destination you can get to from here.', { item: room });
    },
  }));

  // ts-error-fixed ts-migrate(2339) FIXME: Property 'isContact' does not exist on type '{}'.
  Quest.Parser.parser.isContact = function (o: any) {
    return o.contact;
  };

  // ts-error-fixed ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'smartPhone... Remove this comment to see the full error message
  const smartPhoneFunctions = ['Contacts', 'Take photo', 'Photo gallery', 'Search internet', 'Hang up', 'News feed'];

  for (const el of smartPhoneFunctions) {
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    Quest.Commands.commands.unshift(new Quest.Command.Cmd(el, {
      attName: Quest.Utilities.verbify(el),
      defmsg:  "{pv:item:'be:true} not something you can do that with.",
      objects: [
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
        { scope: Quest.Parser.parser.isHeld },
      ],
      regex: new RegExp(`^${el.toLowerCase()} (.+)$`),
    }));
  }

  // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(new Quest.Command.Cmd('Phone', {
    npcCmd:  true,
    objects: [
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'isContact' does not exist on type '{}'.
      { scope: Quest.Parser.parser.isContact },
    ],
    regex: /^(?:telephone|phone|call|contact) (.+)$/,
    script(objects: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
      return Quest.World.w.phone.makeCall(objects[0][0]) ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
    },
  }));

  // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(new Quest.Command.Cmd('HangUp', {
    npcCmd:  true,
    objects: [
    ],
    regex: /^(?:hang up|end call)$/,
    script() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (!Quest.World.player.onPhoneTo) return Quest.IO.failedmsg('You are not on a call.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
      Quest.World.w.phone.hangUp();
      return Quest.World.world.SUCCESS;
    },
  }));

  // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  Quest.Commands.commands.unshift(new Quest.Command.Cmd('DialogTest', {
    npcCmd:  true,
    objects: [
      { special: 'text' },
    ],
    regex: /^(?:dialog) (.*)$/,
    script(objects: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'currentCommand' does not exist on type '... Remove this comment to see the full error message
      const funcName = Quest.Parser.parser.currentCommand.string.replace(/dialog /i, '');
      log(funcName);
      const choices = ['red', 'yellow', 'blue'];
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      Quest.IO.io.menuFunctions[funcName]('Pick a colour?', choices, (result: any) => {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(`You picked ${result}`);
      });
      return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
    },
  }));
};
