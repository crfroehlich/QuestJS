// ts-error-fixed ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.title = 'Star Quest';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.author = 'The Pixie';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.Settings.settings.version = '0.1';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.thanks = [];
// ts-error-fixed ts-migrate(2339) FIXME: Property 'warnings' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.warnings = 'No warnings have been set for this game.';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
Quest.Settings.settings.playMode = 'dev';

Quest.Settings.settings.compassPane     = false;
Quest.Settings.settings.panesCollapseAt = 0;
Quest.Settings.settings.themes          = ['sans-serif'];
// ts-error-fixed ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
Quest.Settings.settings.styleFile = 'style';
Quest.Settings.settings.files     = ['code', 'data', 'crew', 'page', 'stars', 'missions'];
Quest.Settings.settings.tests     = true;
// ts-error-fixed ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.Settings.settings.noTalkTo = false;
// ts-error-fixed ts-migrate(2322) FIXME: Type 'boolean' is not assignable to type 'string'.
Quest.Settings.settings.iconsFolder = false;

// ts-error-fixed ts-migrate(2339) FIXME: Property 'onView' does not exist on type '{ perfor... Remove this comment to see the full error message
Quest.Settings.settings.onView = function (item: any) {
  return Quest.World.w.ship.onView === item.name && Quest.World.currentLocation === Quest.World.w.bridge;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'pageOption' does not exist on type '{ pe... Remove this comment to see the full error message
Quest.Settings.settings.pageOption = function (item: any) {
  return item.pageOption;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'inventoryPane' does not exist on type '{... Remove this comment to see the full error message
Quest.Settings.settings.inventoryPane = [
  //  {name:'Items Held', alt:'itemsHeld', test:Quest.Settings.settings.isHeldNotWorn, getLoc:function() { return Quest.World.player.name; } },
// ts-error-fixed ts-migrate(2339) FIXME: Property 'onView' does not exist on type '{ perfor... Remove this comment to see the full error message
  { alt: 'itemsView', name: 'On Viewscreen', test: Quest.Settings.settings.onView },
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'pageOption' does not exist on type '{ pe... Remove this comment to see the full error message
  { alt: 'pageOptions', name: 'Your PAGE', test: Quest.Settings.settings.pageOption },
  {
    alt: 'itemsHere',
    getLoc() {
      return Quest.World.player.loc;
    },
    name: 'People Here',
    test: Quest.Settings.settings.isHere,
  },
];

// ts-error-fixed ts-migrate(2339) FIXME: Property 'favicon' does not exist on type '{ perfo... Remove this comment to see the full error message
Quest.Settings.settings.favicon = 'assets/icons/sq.png';

Quest.Settings.settings.funcForDynamicConv = 'showMenuDiag';

Quest.Settings.settings.status = [
// ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  function () {
    return `<td>Stardate:</td><td>${Quest.World.w.ship.getDateTime()}</td>`;
  },
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  function () {
    return `<td>Alert:</td><td>${Quest.World.w.ship.getAlert()}</td>`;
  },
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  function () {
    return `<td>System:</td><td>${stars.getSystem().alias}</td>`;
  },
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
  function () {
    return `<td>Location:</td><td>${stars.getLocation().alias}</td>`;
  },
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  function () {
    return `<td>Hull:</td><td>${Quest.World.w.ship.hullIntegrity}%</td>`;
  },
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
  function () {
    return `<td>Shields:</td><td>${Quest.World.w.ship.getShields()}</td>`;
  },
];

Quest.Settings.settings.libraries.push('image-pane');
// ts-error-fixed ts-migrate(2551) FIXME: Property 'imageStyle' does not exist on type '{ pe... Remove this comment to see the full error message
Quest.Settings.settings.imageStyle = {
  'background-color': '#111',
  border:             '3px black solid',
  height:             '400px',
  right:              '0',
  top:                '200px',
  width:              '400px',
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'roomCreateFunc' does not exist on type '... Remove this comment to see the full error message
Quest.Settings.settings.roomCreateFunc = function (o: any) {
  if (o.dests) {
    for (const ex of o.dests) {
      ex.origin = o;
      ex.dir    = `to ${o.dirAlias ? o.dirAlias : o.alias}`;
    }
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'setup' does not exist on type '{ perform... Remove this comment to see the full error message
Quest.Settings.settings.setup = function () {
  Quest.IO.createAdditionalPane(1, 'Go to', 'directions', () => {
    let html = '';
    for (const ex of Quest.World.currentLocation.dests) {
      // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const dest = Quest.World.w[ex.name];
      html      += `<div style="margin-bottom: 10px;"><p class="item" onclick="Quest.Utilities.runCmd('go to ${dest.alias.toLowerCase()}')">${dest.headingAlias}</p></div>`;
    }
    return html;
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg("You step on to the bridge. 'Welcome aboard, sir,' says a blonde woman in a red uniform, handing you a PAGE. 'I'm Yeoman Rand, I've been designated as your aide. The ship is all set, sir. We just need to to appoint the bridge officers. I believe Command has prepared a short list on your PAGE.'");
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg("'Thank you, yeoman.'");
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg("'Can I ask what our mission is, sir?'");
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg("'We're being sent to Sector 7 Iota.'");
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg("'That's a long way out, sir. What do they want us to do there? Anything to do with the Brakk?'");
  // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
  Quest.IO.msg("'I was just told to report to the Starbase. Beyond that... you know as much as I do, yeoman. Hopefully we'll not be close enough to the border to encounter any Brakk ships.'");
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.Settings.settings.playMode !== 'dev') Quest.IO.wait();

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  Quest.IO.metamsg('If this is your first play through - or you just want a reminder of how to get going - you might want to look at the {cmd:intro1:introductory text}, see {cmd:intro2:how to start} or look at the {cmd:intro3:further notes}.');
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
  if (Quest.Settings.settings.playMode !== 'dev') Quest.IO.wait();
  stars.draw('stardock');
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'updateCustomUI' does not exist on type '... Remove this comment to see the full error message
Quest.Settings.settings.updateCustomUI = function () {
  const encyc = Array.from(document.getElementsByClassName('item')).filter((el) => el.innerHTML === 'Encyclopedia')[0];
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'onclick' does not exist on type 'Element... Remove this comment to see the full error message
  encyc.onclick = function () {
    Quest.IO.askDiag('Search the web', Quest.World.w.encyclopedia.askDiag, 'Submit');
  };
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogTitle' does not exist on t... Remove this comment to see the full error message
Quest.Settings.settings.startingDialogTitle = 'Crew Roster';
// ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogWidth' does not exist on t... Remove this comment to see the full error message
Quest.Settings.settings.startingDialogWidth = 500;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogHeight' does not exist on ... Remove this comment to see the full error message
Quest.Settings.settings.startingDialogHeight = 480;
// ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogOnClick' does not exist on... Remove this comment to see the full error message
Quest.Settings.settings.startingDialogOnClick = function () {
  // ...
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogInit' does not exist on ty... Remove this comment to see the full error message
Quest.Settings.settings.startingDialogInit = function () {
  // document.querySelector('#namefield').focus()
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'startingDialogOnClick' does not exist on... Remove this comment to see the full error message
Quest.Settings.settings.startingDialogOnClick = function () {
  Quest.Settings.settings.startingDialogEnabled = true;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'dialogType' does not exist on type '{ pe... Remove this comment to see the full error message
  if (Quest.Settings.settings.dialogType === 'crew roster' && !Quest.World.w.ship.arrivedAtSector) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const npc = Quest.World.w[document.querySelector('#diag-name').value];

    for (const role of roster.data) {
      const assignedNpc = roster.getOfficer(role.name);
      // log(assignedNpc)
      if (assignedNpc && assignedNpc !== npc) continue;
      // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
      if (document.querySelector(`#diag-${role.name}`).checked) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        Quest.World.w.ship[role.name] = npc.name;
      } else {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
        Quest.World.w.ship[role.name] = false;
      }
    }
    const roles = roster.getRoles(npc);
    if (roles.length === 0) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`You assign no positions to ${npc.alias}.`);
    } else {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg(`You assign ${Quest.Utilities.formatList(roles)} to ${npc.alias}.`);
    }
    if (roles.length === 0 && npc.loc) {
      npc.loc = false;
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(npc.leaving, { char: npc });
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateUIItems' does not exist on type '{... Remove this comment to see the full error message
      Quest.IO.io.updateUIItems();
    }
    if (roles.length !== 0 && !npc.loc) {
      npc.loc = 'bridge';
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg(npc.entering, { char: npc });
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateUIItems' does not exist on type '{... Remove this comment to see the full error message
      Quest.IO.io.updateUIItems();
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'dialogType' does not exist on type '{ pe... Remove this comment to see the full error message
    delete Quest.Settings.settings.dialogType;
  }
};
