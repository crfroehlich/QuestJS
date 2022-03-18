// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('knife', Quest.Templates.TAKEABLE(), {
    chargeResponse(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('There is a loud bang, and the knife is destroyed.');
        this.loc = false;
        return false;
    },
    examine(options) {
        if (this.sharp) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('A really sharp knife.');
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('A blunt knife.');
        }
    },
    loc: 'Buddy',
    sharp: false,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('lounge', {
    desc: 'A smelly room with an old settee and a tv. There is a tatty rug on the floor.{if:player:name:piggy_suu: This is Piggy-Suu\'s favourite room.}',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('kitchen'),
    hint: 'There is a lot in this room! The bricks can be picked up by number (try GET 3 BRICKS). The book can be read. The coin is stuck to the floor. There are containers too. Kyle is an NPC; you can tell him to do nearly anything the player character can do (everything except looking and talking).',
    mapColour: 'silver',
    scenery: [
        'tv',
        { alias: ['old settee', 'couch', 'sofa'] },
        { alias: 'rug', examine: 'It might have been blue at one time. Maybe.' },
    ],
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('conservatory'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    up: new Quest.World.Exit('bedroom'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('dining_room'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Buddy', Quest.NPC.NPC(false), {
    examine: 'An orangutan!',
    loc: 'lounge',
    money: 10,
    properNoun: true,
    receiveItems: [
        {
            f(options) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                Quest.IO.msg('{multi}Done.', options);
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ test: ()... Remove this comment to see the full error message
                options.item.loc = this.name;
            },
            test() {
                return true;
            },
        },
    ],
    talkto() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'getState' does not exist on type '{ INIT... Remove this comment to see the full error message
        const res = Quest.quest.getState('A carrot for Buddy', this);
        console.log(res);
        if (!res.status) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Hey, Buddy,' you say.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Hey yourself! Say, could you get me a carrot?'");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'start' does not exist on type '{ INITIAL... Remove this comment to see the full error message
            Quest.quest.start('A carrot for Buddy');
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Hey, Buddy,' you say.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Hey yourself! Where is that carrot?'");
        }
    },
});
// ts-error-fixed ts-migrate(2339) FIXME: Property 'changePOV' does not exist on type '{}'.
Quest.Utilities.util.changePOV(Quest.World.w.Buddy);
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('dining_room_on_stool', {
    alias: 'dining room (on a stool)',
    desc: 'Stood on a stool, in an old-fashioned room.',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    down: new Quest.World.Exit('dining_room', { mapIgnore: true }),
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    east: new Quest.World.Exit('lounge', { mapIgnore: true }),
    // loc:"dining_room",
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('hole', {
    desc: 'An old-fashioned room.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('book', Quest.Templates.TAKEABLE(), Quest.Templates.READABLE(true), {
    examine: 'A leather-bound book.',
    loc: 'lounge',
    lookinside: 'The book has pages and pages of text, but you do not even recognise the alphabet.',
    read(options) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'isHeld' does not exist on type '{}'.
        if (Quest.Command.cmdRules.isHeld(null, options)) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
            if (options.char === Quest.World.w.Lara) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Okay.' Lara spends a few minutes reading the book.");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'I meant, read it to me.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'All of it?'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Quick summary.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'It is all about carrots. The basic gist is that all carrots should be given to me.' You are not entirely sure you believe her.");
            }
            else {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                Quest.IO.msg('It is not in a language {pv:char:understand}.', options);
            }
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'abort' does not exist on type '{}'.
            Quest.Parser.parser.abort();
            return true;
        }
        return false;
    },
    watchedNumberAttribute: 5,
    watchedStringAttribute: 'yellow',
});
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addChangeListener' does not exist on typ... Remove this comment to see the full error message
Quest.Utilities.util.addChangeListener(Quest.World.w.book, 'watchedStringAttribute', (o, current, previous) => {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(`watchedStringAttribute changed from ${previous} to ${current}`);
});
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addChangeListener' does not exist on typ... Remove this comment to see the full error message
Quest.Utilities.util.addChangeListener(Quest.World.w.book, 'watchedNumberAttribute', (o, current, previous) => {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(`watchedNumberAttribute changed from ${previous} to ${current}`);
}, (o, current, previous) => current > 10 && current !== previous);
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('book_cover', Quest.Templates.COMPONENT('book'), {
    examine: 'The book cover is very fancy.',
    parserPriority: -20,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('boots', Quest.Templates.WEARABLE(), {
    examine: 'Some old boots.',
    loc: 'lounge',
    pronouns: Quest.lang.pronouns.plural,
    special_att_3: 'three',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('canteen', Quest.Templates.TAKEABLE(), Quest.Templates.VESSEL(), {
    examine: 'The canteen is {ifExists:canteen:containedFluidName:full:empty}.',
    loc: 'lounge',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('glass_cabinet', Quest.Templates.CONTAINER(true), Quest.Templates.LOCKED_WITH(['cabinet_key', 'small_key']), {
    examine: 'A cabinet with a glass front.',
    isLocatedAt(loc) {
        return (loc == 'lounge' || loc == 'dining_room');
    },
    transparent: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('cabinet_key', Quest.Templates.KEY(), {
    examine: 'A small brass key.',
    loc: 'garage',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('jewellery_box', Quest.Templates.TAKEABLE(), Quest.Templates.CONTAINER(true), { alias: 'jewellery box', examine: 'A nice box.', loc: 'glass_cabinet' });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('ring', Quest.Templates.TAKEABLE(), { examine: 'A ring.', loc: 'jewellery_box' });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('cardboard_box', Quest.Templates.TAKEABLE(), Quest.Templates.CONTAINER(true), {
    alias: 'cardboard box',
    closed: false,
    examine: 'A big cardboard box.',
    loc: 'lounge',
    regex: /cardboard/,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('ham_and_cheese_sandwich', Quest.Templates.EDIBLE(false), {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    afterIngest() {
        Quest.IO.msg('That was great!');
    },
    loc: 'lounge',
    pattern: 'egg|mayo',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('ornate_doll', Quest.Templates.TAKEABLE(), {
    alias: 'ornate doll',
    examine: 'A fancy doll, eigthteenth century.',
    loc: 'glass_cabinet',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('coin', Quest.Templates.TAKEABLE(), {
    examine: 'A gold coin.',
    loc: 'lounge',
    take: '{pv:char:try:true} to pick up the coin, but it just will not budge.',
    take2(options) {
        return Quest.IO.falsemsg('{pv:char:try:true} to pick up the coin, but it just will not budge.', options);
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('small_key', Quest.Templates.KEY(), {
    alias: 'small key', examine: 'A small key.', loc: 'lounge',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('flashlight', Quest.Templates.TAKEABLE(), Quest.Templates.SWITCHABLE(false, 'providing light'), {
    chargeResponse(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('{nv:char:push:true} the button. There is a brief hum of power, and a flash.', options);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'flashlight' does not exist on type '{}'.
        Quest.World.w.flashlight.power = 20;
        return true;
    },
    eventIsActive() {
        return this.switchedon;
    },
    eventPeriod: 1,
    eventScript() {
        this.power--;
        if (this.power === 2) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('The torch flickers.');
        }
        if (this.power < 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('The torch flickers and dies.{once: Perhaps there is a charger in the garage?}');
            this.doSwitchoff();
        }
    },
    examine: 'A small red torch.',
    lightSource() {
        return this.switchedon ? Quest.World.world.LIGHT_FULL : Quest.World.world.LIGHT_NONE;
    },
    loc: 'lounge',
    power: 2,
    regex: /^torch$/,
    testSwitchOn() {
        if (this.power < 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('The torch is dead.');
            return false;
        }
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('dining_room', {
    alias: 'dining room',
    desc: 'An old-fashioned room.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('lounge'),
    hint: 'This room features an NPC who will sometimes do as you ask. Compliment her, and she will go to another room, and with then pick things up and drop them (but not bricks). Also not that the glass cabinet is in this room as well as the lounge.',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    up: new Quest.World.Exit('dining_room_on_stool', { mapIgnore: true }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('lift'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('lift_item', {
    alias: 'lift',
    examine: 'An old-fashioned lift.',
    goInDirection: 'west',
    loc: 'dining_room',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('chair', Quest.Templates.FURNITURE({ sit: true }), {
    afterPostureOn(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('The chair makes a strange noise when {nv:char:sit} on it.', options);
    },
    examine: 'A wooden chair.',
    loc: 'dining_room',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createRoom('lift', Quest.Templates.TRANSIT('east'), {
    desc: 'A curious lift.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('dining_room'),
    transitMenuPrompt: 'Where do you want to go?',
});
// calling it button_0 make it appear before button_1 in lists
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('button_0', 
// ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
Quest.Templates.TRANSIT_BUTTON('lift'), {
    alias: 'Button: G',
    examine: 'A button with the letter G on it.',
    scenery: true,
    transitAlreadyHere: "You're already there mate!",
    transitDest: 'dining_room',
    transitDestAlias: 'Ground Floor',
    transitGoToDest: 'The old man presses the button....',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('button_1', 
// ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
Quest.Templates.TRANSIT_BUTTON('lift'), {
    alias: 'Button: 1',
    examine: 'A button with the letter 1 on it.',
    scenery: true,
    transitAlreadyHere: 'You press the button; nothing happens.',
    transitDest: 'bedroom',
    transitDestAlias: 'The Bedroom',
    transitGoToDest: 'You press the button; the door closes and the lift heads to the first floor. The door opens again.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('button_2', 
// ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
Quest.Templates.TRANSIT_BUTTON('lift'), {
    alias: 'Button: 2',
    examine: 'A button with the letter 2 on it.',
    locked: true,
    scenery: true,
    transitAlreadyHere: 'You press the button; nothing happens.',
    transitDest: 'attic',
    transitDestAlias: 'The Attic',
    transitGoToDest: 'You press the button; the door closes and the lift heads to the second floor. The door opens again.',
    transitLocked: 'That does nothing, the button does not work.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('attic', {
    desc: 'An spooky attic.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('lift'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('kitchen', {
    afterFirstEnter() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('A fresh smell here!');
    },
    desc: 'A clean room{if:clock:scenery:, a clock hanging on the wall}. There is a sink in the corner.',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    down: new Quest.World.Exit('basement', {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'trapdoor' does not exist on type '{}'.
        isHidden() {
            return Quest.World.w.trapdoor.closed;
        },
        msg: 'You go through the trapdoor, and down the ladder.',
        npcEnterMsg(char) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg('{nv:char:come:true} through the trapdoor, and {cj:char:climb} down the ladder to join you in the basement.', { char });
        },
        npcLeaveMsg(char) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg('{nv:char:disappear:true} through the trapdoor.', { char });
        },
    }),
    hint: 'This room features two doors that open and close. The garage door needs a key.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('garage'),
    source: 'water',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('lounge'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('clock', Quest.Templates.TAKEABLE(), {
    examine: 'A white clock.',
    loc: 'kitchen',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('trapdoor', Quest.Templates.OPENABLE(false), {
    examine: 'A small trapdoor in the floor.',
    goThroughDirection: 'down',
    loc: 'kitchen',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('camera', Quest.Templates.TAKEABLE(), {
    examine: 'A cheap digital camera.',
    loc: 'kitchen',
    regex: /^picture box$/,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('big_kitchen_table', Quest.Templates.SURFACE(), {
    examine: 'A Formica table.',
    loc: 'kitchen',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('jug', Quest.Templates.TAKEABLE(), Quest.Templates.VESSEL(), {
    examine: 'A small jug, stripped blue and white.',
    loc: 'big_kitchen_table',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('honey_pot', {
    examine: 'A pot of honey.',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('kitchen_sink', {
    examine: 'A dirty sink.',
    isSourceOf(fluid) {
        return fluid === 'water';
    },
    loc: 'kitchen',
    scenery: true,
    sink(fluid, char, vessel) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('{nv:char:empty:true} {nm:item:the} into the dirty sink.', { char, item: vessel });
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('basement', {
    darkDesc: 'It is dark, but you can just see the outline of the trapdoor above you.',
    desc: 'A dank room, with piles of crates everywhere.',
    hint: 'The basement illustrates light and dark. There is a torch in the lounge that may be useful.',
    lightSource() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'light_switch' does not exist on type '{}... Remove this comment to see the full error message
        return Quest.World.w.light_switch.switchedon ? Quest.World.world.LIGHT_FULL : Quest.World.world.LIGHT_NONE;
    },
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    up: new Quest.World.Exit('kitchen', {
        isHidden() {
            return false;
        },
    }),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('light_switch', Quest.Templates.SWITCHABLE(false), {
    alias: 'light switch',
    examine: 'A switch, presumably for the light.',
    loc: 'basement',
    testSwitchOn() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'crates' does not exist on type '{}'.
        if (!Quest.World.w.crates.moved) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('You cannot reach the light switch, without first moving the crates.');
            return false;
        }
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('ladder', {
    examine: 'A ladder, fixed to the wall, leading to the trapdoor.',
    goUpDirection: 'up',
    loc: 'basement',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('crates', {
    examine: 'A bunch of old crates.',
    loc: 'basement',
    move() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('You move the crates, so the light switch is accessible.');
        this.moved = true;
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('garage', {
    desc: 'An empty garage.',
    hint: 'The garage features a complex mechanism, with two components.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('kitchen'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('garage_door', Quest.Templates.LOCKED_DOOR('garage_key', 'kitchen', 'garage'), {
    examine: 'The door to the garage.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('garage_key', Quest.Templates.KEY(), {
    examine: 'A big key.',
    loc: 'lounge',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('charger', {
    examine: 'A device bigger than a washing machine to charge a torch? It has a compartment and a button. {charger_state}.',
    loc: 'garage',
    mended: false,
    use() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.metamsg('To use the charge, you need to put the torch in the compartment and press the button.');
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('charger_compartment', Quest.Templates.COMPONENT('charger'), Quest.Templates.CONTAINER(true), {
    alias: 'compartment',
    examine: 'The compartment is just the right size for the torch. It is {if:charger_compartment:closed:closed:open}.',
    testDropIn() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
        const contents = Quest.World.w.charger_compartment.getContents(Quest.World.world.LOOK);
        if (contents.length > 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('The compartment is full.');
            return false;
        }
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('charger_button', Quest.Templates.COMPONENT('charger'), Quest.Templates.BUTTON(), {
    alias: 'button',
    examine: 'A big red button.',
    push(options) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
        const contents = Quest.World.w.charger_compartment.getContents(Quest.World.world.ALL)[0];
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
        if (!Quest.World.w.charger_compartment.closed || !contents)
            return Quest.IO.falsemsg('{pv:char:push:true} the button, but nothing happens.', options);
        if (!contents.chargeResponse)
            return Quest.IO.falsemsg('{pv:char:push:true} the button. There is a brief hum of power, but nothing happens.', options);
        return contents.chargeResponse(options);
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('bedroom', {
    desc: 'A large room, with a big bed and a wardrobe.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    down: new Quest.World.Exit('lounge'),
    hint: 'The bedroom has a variety of garments that can be put on - in the right order.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    in: new Quest.World.Exit('wardrobe'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('lift'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('wardrobe', Quest.Defaults.DEFAULT_ROOM, {
    desc: 'Oddly empty of fantasy worlds.',
    examine: 'It is so big you could probably get inside it.',
    loc: 'bedroom',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    out: new Quest.World.Exit('bedroom'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('bed', Quest.Templates.FURNITURE({ recline: true, sit: true }), {
    examine: 'What would a bedroom be without a bed?',
    loc: 'bedroom',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('underwear', Quest.Templates.WEARABLE(1, ['lower']), {
    examine: 'Clean!',
    loc: 'bedroom',
    pronouns: Quest.lang.pronouns.massnoun,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('jeans', Quest.Templates.WEARABLE(2, ['lower']), { examine: 'Clean!', loc: 'bedroom', pronouns: Quest.lang.pronouns.plural });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('shirt', Quest.Templates.WEARABLE(2, ['upper']), { examine: 'Clean!', loc: 'bedroom' });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('coat', Quest.Templates.WEARABLE(3, ['upper']), { examine: 'Clean!', loc: 'bedroom' });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('jumpsuit', Quest.Templates.WEARABLE(2, ['upper', 'lower']), { examine: 'Clean!', loc: 'bedroom' });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('suit_trousers', Quest.Templates.WEARABLE(2, ['lower']), { examine: 'The trousers.', loc: 'wardrobe', pronouns: Quest.lang.pronouns.plural });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('jacket', Quest.Templates.WEARABLE(3, ['upper']), { examine: 'The jacket', loc: 'wardrobe' });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('waistcoat', Quest.Templates.WEARABLE(2, ['upper']), { examine: 'The waistcoat', loc: 'wardrobe' });
// ts-error-fixed ts-migrate(2339) FIXME: Property 'suit_trousers' does not exist on type '{... Remove this comment to see the full error message
Quest.Templates.createEnsemble('suit', [Quest.World.w.suit_trousers, Quest.World.w.jacket, Quest.World.w.waistcoat], { examine: 'A complete suit.', regex: /xyz/ });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('conservatory', {
    desc: 'A light airy room.',
    hint: 'The conservatory features a pro-active NPC.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('lounge'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('garden'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('crate', Quest.Templates.FURNITURE({ stand: true }), Quest.Templates.SHIFTABLE(), {
    examine: 'A large wooden crate, probably strong enough to stand on.',
    loc: 'conservatory',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('broken_chair', {
    attachable: true,
    examine: 'A broken chair.',
    loc: 'conservatory',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('rope', Quest.Templates.ROPE(3), {
    examine: "The rope is about 40' long.",
    loc: 'conservatory',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('garden', {
    desc: 'Very overgrown. The garden opens onto a road to the west, whilst the conservatory is east. There is a hook on the wall.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('conservatory'),
    mapColour: 'green',
    visibleFrom: ['dining_room'],
    visibleFromPrefix: 'Through the window you can see',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('road'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('hook', {
    attachable: true,
    examine: 'A rusty hook, on the wall of the house.',
    loc: 'garden',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('far_away', {
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('lounge'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Arthur', Quest.NPC.NPC(false), {
    agenda: [
        'text:Arthur stands up and stretches.',
        "text:'I'm going to find Lara, and show her the garden,' says Arthur.:'Whatever!'",
        "walkTo:Lara:'Hi, Lara,' says Arthur. 'Come look at the garden.'",
        "joinedBy:Lara:'Sure,' says Lara.",
        "walkTo:garden:inTheGardenWithLara:'Look at all the beautiful flowers,' says Arthur.:Through the window you see Arthur say something to Lara.",
        'run:inTheGardenWithLara:Lara smells the flowers.:You notice Lara is smelling the flowers in the garden.',
        'walkTo:conservatory',
        'walkTo:garden',
    ],
    examine() {
        if (this.suspended) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Arthur is asleep.');
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Arthur is awake.');
        }
    },
    inTheGardenWithLara(arr) {
        if (this.isHere()) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(arr[0]);
        }
        if (Quest.World.player.loc === 'dining_room') {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(arr[1]);
        }
    },
    loc: 'garden',
    properNoun: true,
    suspended: true,
    talkto() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Hey, wake up,' you say to Arthur.");
        this.suspended = false;
        this.pause();
        this.multiMsg([
            "'What?' he says, opening his eyes. 'Oh, it's you.'",
            "'I am awake!'",
            false,
            "'Stop it!'",
        ]);
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('ball', {
    // loc:"Kyle",
    examine: 'Some old boots.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Kyle', Quest.NPC.NPC(false), {
    askOptions: [
        {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            script() {
                Quest.IO.msg(`'Oh!' says Kyle. 'I suppose I would say: ${this.examine}'`);
            },
            test(p) {
                return p.text.match(/kyle|himself/);
            },
        },
        {
            msg: "'I like it,' says Kyle.",
            name: 'House',
            test(p) {
                return p.text.match(/house/);
            },
        },
        {
            name: 'Garden',
            responses: [
                {
                    msg: "'Looks much better now,' Kyle says with a grin.",
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'garden' does not exist on type '{}'.
                    test(p) {
                        return Quest.World.w.garden.fixed;
                    },
                },
                {
                    msg: "'Needs some work,' Kyle says with a sign.",
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
                    script(p) {
                        Quest.World.w.Kyle.needsWorkCount++;
                    },
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
                    test(p) {
                        return Quest.World.w.Kyle.needsWorkCount === 0;
                    },
                },
                {
                    msg: "'I'm giving up hope of it ever getting sorted,' Kyle says.",
                },
            ],
            test(p) {
                return p.text.match(/garden/);
            },
        },
        {
            responses: [
                {
                    mentions: ['Swings'],
                    msg: "'Going to the park sounds like fun,' Kyle says with a grin. 'We can go on the swings!'",
                    name: 'Park',
                },
            ],
            test(p) {
                return p.text.match(/park/);
            },
        },
        {
            msg: "'The fountain does not work.'",
            name: 'Fountain',
            test(p) {
                return p.text.match(/fountain/) && p.char.specialFlag;
            },
        },
        {
            msg: "'The swings are fun!'",
            name: 'Swings',
            silent: true,
            test(p) {
                return p.text.match(/swing/);
            },
        },
        {
            failed: true,
            msg: 'Kyle has no interest in that subject.',
        },
    ],
    convTopics: [
        {
            alias: "What's the deal with the garden?",
            nowShow: ["Seriously, what's the deal with the garden?"],
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("You ask Kyle about the garden, but he's not talking.");
            },
            showTopic: true,
        },
        {
            alias: "Seriously, what's the deal with the garden?",
            msg: "You ask Kyle about the garden, but he's STILL not talking.",
        },
        {
            alias: 'The weather',
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(`You talk to ${this.alias} about the weather; he asks your opinion...`);
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'askTopics' does not exist on type '{ sho... Remove this comment to see the full error message
                this.askTopics('Tell Kyle your view on the weather...', Quest.World.w.kyle_response_good, Quest.World.w.kyle_response_bad);
            },
            showTopic: true,
        },
        {
            alias: 'The weather is good',
            name: 'kyle_response_good',
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg('You tell Kyle you think the weather is good.');
            },
        },
        {
            alias: 'The weather is bad',
            name: 'kyle_response_bad',
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(`You tell ${this.alias} the weather is bad; he shakes his head sadly.`);
            },
        },
        {
            alias: 'Lead me to the garden',
            name: 'kyle_to_garden',
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Can you show me where the garden is?'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'No problem,' says Kyle.");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
                Quest.World.w.Kyle.agenda = [
                    'leadTo:garden',
                    "waitFor:player:'So here we are,' says Kyle.",
                ];
            },
            showTopic: true,
        },
    ],
    // alias:'Bobby',
    examine: 'A grizzly bear. But cute.',
    loc: 'lounge',
    needsWorkCount: 0,
    receiveItems: [
        {
            f() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Oh!' says Kyle. 'Is this a book?'");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
                Quest.World.w.book.loc = this.name;
                return true;
            },
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
            item: Quest.World.w.book,
        },
        {
            f(options) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                Quest.IO.msg('{multi}Done.', options);
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ test: ()... Remove this comment to see the full error message
                options.item.loc = this.name;
                return true;
            },
            test() {
                return true;
            },
        },
    ],
    talkto2() {
        switch (this.talkto_count) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            case 0:
                Quest.IO.msg("You say 'Hello,' to Kyle, and he replies in kind.");
                break;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            case 1:
                Quest.IO.msg("You ask Kyle how to get upstairs. 'You know,' he replies, 'I have no idea.'");
                break;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            case 2:
                Quest.IO.msg("'Where do you sleep?' you ask Kyle.");
                Quest.IO.msg("'What's \"sleep\"?'");
                break;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            default:
                Quest.IO.msg('You wonder what you can talk to Kyle about.');
                break;
        }
        this.pause();
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('kyle_question', Quest.NPC.QUESTION(), {
    responses: [
        {
            regex: /^(yes)$/,
            response() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Oh, cool,' says Kyle.");
            },
        },
        {
            regex: /^(no)$/,
            response() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Oh, well, Lara, this is Tester, he or she is testing Quest 6,' says Kyle.");
            },
        },
        {
            response() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'I don't know what that means,' says Kyle. 'It's a simple yes-no question.'");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
                Quest.World.w.Kyle.askQuestion('kyle_question');
            },
        },
    ],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('straw_boater', 
// ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
Quest.Templates.WEARABLE(false), { examine: 'A straw boater.', loc: 'Kyle', worn: true });
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Lara', Quest.NPC.NPC(true), {
    examine: 'A normal-sized bunny.',
    getAgreementDefault() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'I'm not doing that!' says Lara indignantly.");
        return false;
    },
    getAgreementDrop() {
        return true;
    },
    getAgreementGo(ex) {
        if (!this.happy) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(`'I'm not going ${ex.dir},' says Lara indignantly. 'I don't like that room.'`);
            return false;
        }
        return true;
    },
    getAgreementPosture() {
        if (!this.happy) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'I don't think so!' says Lara indignantly.");
            return false;
        }
        return true;
    },
    getAgreementRead() {
        return true;
    },
    getAgreementTake(item) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'brick' does not exist on type '{}'.
        if (item === Quest.World.w.brick) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'I'm not picking up any bricks,' says Lara indignantly.");
            return false;
        }
        return true;
    },
    greeting() {
        if (this.talkto_count === 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Hello,' says Lara.");
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'You again?' says Lara.");
        }
    },
    happy: false,
    loc: 'dining_room',
    properNoun: true,
    receiveItems: [
        {
            f() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'A knife?' says Lara. 'I guess I could use that... for something?'");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
                Quest.World.w.knife.loc = this.name;
            },
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
            item: Quest.World.w.knife,
        },
        {
            f(options) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'A carrot!' says Lara with delight, before stuffing it in her mouth. 'So, do you have any more?'");
                delete options.item.loc;
            },
            test(options) {
                return options.item.name.startsWith('carrot');
            },
        },
        {
            f(options) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Oh, my,' says Lara. 'How delightful.' She slips the ring on her finger, then hands you a key.");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'ring' does not exist on type '{}'.
                Quest.World.w.ring.loc = 'Lara';
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'ring' does not exist on type '{}'.
                Quest.World.w.ring.worn = true;
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'garage_key' does not exist on type '{}'.
                Quest.World.w.garage_key.loc = options.char.name;
            },
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'ring' does not exist on type '{}'.
            item: Quest.World.w.ring,
        },
        {
            f(options) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Hmm, a book about carrots,' says Lara. 'Thanks.'");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
                Quest.World.w.book.loc = 'Lara';
            },
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'book' does not exist on type '{}'.
            item: Quest.World.w.book,
        },
    ],
    receiveItemsFailMsg: "'That's not a carrot,' Lara points out.",
    sayPriority: 3,
    sayResponses: [
        {
            id: 'hello',
            regex: /^(hi|hello)$/,
            response() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Oh, hello there,' replies Lara.");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
                if (Quest.World.w.Kyle.isHere()) {
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg("'Have you two met before?' asks Kyle.");
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'Kyle' does not exist on type '{}'.
                    Quest.World.w.Kyle.askQuestion('kyle_question');
                }
            },
        },
    ],
    testTalkPlayer() {
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Lara_garage_key', Quest.NPC.TOPIC(true), {
    alias: 'Can I have the garden key?',
    loc: 'Lara',
    script() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('You ask Lara about the garage key; she agrees to give it to you if you give her a ring. Perhaps there is one in the glass cabinet?');
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Lara_very_attractive', Quest.NPC.TOPIC(true), {
    alias: "You're very attractive",
    loc: 'Lara',
    script() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("You tell Lara she looks very attractive. 'Why thank you!' she replies, smiling at last.");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
        Quest.World.w.Lara.happy = true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Lara_carrots', Quest.NPC.TOPIC(true), {
    alias: 'I hear you like carrots',
    loc: 'Lara',
    script() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Need carrots!' she says with feeling. 'Fading away bunny!' She looks mournfully at her ample tummy.");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Lara' does not exist on type '{}'.
        Quest.World.w.Lara.happy = true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('walls', {
    examine: "They're walls, what are you expecting?",
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    isLocatedAt(loc) {
        return Quest.World.w[loc].room;
    },
    regex: /^wall$/,
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('brick', Quest.Templates.COUNTABLE({ dining_room: 1, lounge: 7 }), {
    examine: 'A brick is a brick.',
    // regex:/^(\d+ )?bricks?$/,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('shop', {
    desc: 'A funny little shop.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('road'),
    willBuy(obj) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'trophy' does not exist on type '{}'.
        return (obj === Quest.World.w.trophy);
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('road', {
    desc: 'A road heading west over a bridge. You can see a shop to the north.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('garden'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('shop'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('bridge'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('carrot', Quest.Templates.TAKEABLE(), Quest.Templates.MERCH(2, ['shop']), {
    examine: "It's a carrot!",
    slice(options) {
        if (options.with === undefined) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
            if (Quest.World.w.knife.loc !== Quest.World.player.name) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                return Quest.IO.falsemsg('Going to need a knife to do that.');
            }
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'knife' does not exist on type '{}'.
        else if (options.with !== Quest.World.w.knife) {
            return Quest.IO.falsemsg("You can't cut a carrot with {nm:with:the}.", { with: options.with });
        }
        // do stuff
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Done.');
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('honey_pasta', Quest.Templates.TAKEABLE(), Quest.Templates.MERCH(5, ['shop']), {
    examine: "It's pasta. With honey on it.",
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('trophy', Quest.Templates.TAKEABLE(), Quest.Templates.MERCH(15, 'shop'), {
    doNotClone: true,
    examine: 'It is a unique trophy!',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('cactus', Quest.Zone.ZONE_FEATURE('desert', 1, -2, 3), {
    examine: 'Prickly!',
    featureLook: 'There is a big cactus to the #.',
    zoneColour: 'green',
    zoneMapName: 'Strange cactus',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('tower', Quest.Zone.ZONE_FEATURE('desert', -1, 3, 4), {
    examine: 'The tower looks ancient, but in a fair state of repair. It is about four storeys high.',
    featureLook: 'There is a tower to the #.',
    featureLookHere: 'There is a tall stone tower here.',
    zoneMapName: 'Ancient tower',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('barrier', Quest.Zone.ZONE_BORDER('desert'), {
    border(x, y) {
        return (x * x + y * y > 55);
    },
    borderDesc: 'The air seems to kind of shimmer.',
    borderMsg: 'You try to head #, but hit an invisible barrier.',
    examine: 'It is invisible!',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('canyon', Quest.Zone.ZONE_BORDER('desert'), {
    border(x, y) {
        return (x - y > 5);
    },
    // borderMsg:"You cannot go #, the canyon is too wide to jump and too steep to climb.",
    borderDesc: 'There is a deep canyon southeast of you, running from the southwest to the northeast.',
    examine: 'It looks very deep!',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createRoom('desert', Quest.Zone.ZONE(), {
    // Colour of the player
    cellSize: 20,
    // Hide the map border
    featureColour: 'blue',
    // Locations the player cannot access
    mapBorder: false,
    // Style of the labels for features
    mapCells: [
        '<rect x="0" y="162" width="336" height="16" stroke="none" fill="#999"/>',
    ],
    // The size of each location, if less than 10 the player will disappear!
    mapFont: 'italic 10px serif',
    outsideColour: 'transparent',
    // Default colour for features
    playerColour: 'black',
    size: 8,
    zoneDescs: [
        {
            desc: 'You are standing on a road heading west through a desert, and east over a bridge.',
            x: 5,
            y: 0,
        },
        {
            desc: 'You are standing on a road running east to west through a desert.',
            when(x, y) {
                return y === 0;
            },
        },
        {
            desc: 'You are standing in the desert, north of the road.',
            when(x, y) {
                return y > 0;
            },
        },
        {
            desc: 'You are standing in the desert, south of the road.',
        },
    ],
    zoneExits: [
        {
            dest: 'inside_tower', dir: 'in', msg: 'You step inside the tower, and climb the step, spiral staircase to the top.', x: -1, y: 3,
        },
        {
            dest: 'bridge', dir: 'east', msg: 'You start across the bridge.', x: 5, y: 0,
        },
    ],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('silver_coin', Quest.Templates.TAKEABLE(), Quest.Zone.ZONE_ITEM('desert', 1, 1), {
    examine: 'A curious silver coin; you do not recognise it. It says it is worth two dollars.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('bridge', {
    beforeEnter() {
        Quest.World.player.positionX = 5;
        Quest.World.player.positionY = 0;
    },
    desc: 'From the bridge you can just how deep the canyon is.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('road'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('desert'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('inside_tower', {
    alias: 'Inside the tower',
    beforeEnter() {
        Quest.World.player.positionX = -1;
        Quest.World.player.positionY = 3;
    },
    desc: 'A tower, looking out over the desert. To the south is the road, heading east back to your house. To the north is a magic portal, going who knows where.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    down: new Quest.World.Exit('desert'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('shop'),
    properNoun: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('piggy_suu', Quest.NPC.NPC(true), {
    alias: 'Piggy-suu',
    examine: 'Piggy-suu is a pig.',
    loc: 'bridge',
    money: 10,
    receiveItems: [
        {
            f(options) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                Quest.IO.msg(Quest.lang.done_msg, options);
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ test: ()... Remove this comment to see the full error message
                options.item.loc = this.name;
                return true;
            },
            test() {
                return true;
            },
        },
    ],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Boris', Quest.NPC.NPC(), {});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('timetable', Quest.NPC.AGENDA_FOLLOWER(), {
    check() {
        return this.flag;
    },
    counter: 0,
    script(n) {
        this.counter += (n[0] ? parseInt(n[0]) : 1);
    },
});
//# sourceMappingURL=data.js.map