register('medieval', {
    book: 'Hamlet',
    ceiling: 'The ceiling is wood, like the floor, supported by thick beams.',
    door: 'The door is wood; panelled and unpainted.',
    floor: 'The floor is rough wood.',
    listen: 'Mandy can hear nothing.',
    smell: 'The room does not smell good; there is a definitely odour of dung.',
    uniform: 'a startling blue and red uniform that is especially uncomfortable',
    walls: 'The walls are all rough-cut stone.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('great_gallery', {
    afterEnter() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
        if (Quest.World.w.uniform.wet === 4) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'uniform' does not exist on type '{}'.
            Quest.World.w.uniform.wet = 2;
        }
        // ts-error-fixed ts-migrate(1117) FIXME: An object literal cannot have multiple properties ... Remove this comment to see the full error message
        // afterEnter() {
        /// / ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        //   if (this.silverSighting[this.visited % 15]) Quest.IO.msg(this.silverSighting[this.visited % 15])
        // },
    },
    desc: 'The great gallery is a wooden platform that overlooks the great hall, running along the north and east sides of it. A wide flight of wooden stairs leads back down to the hall, while a narrow spiral staircase goes further upwards. The walls are of rough-cut stone. There is a rather low doorway north, and further exits east, south and west.{if:spike:alias:mangled metal: There is a black line running from the observatory, down to the Great Hall.}',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    down: new Quest.World.Exit('great_hall'),
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    east: new Quest.World.Exit('brass_dining_room', {
        simpleUse(char) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
            if (Quest.World.w.brass_dining_room.blocked())
                return Quest.IO.falsemsg('Mandy starts heading east, but the dining room is now so full of mannequins, she cannot get into it.');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultSimpleExitUse' does not exist on ... Remove this comment to see the full error message
            return Quest.Utilities.util.defaultSimpleExitUse(char, this);
        },
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    examine_ceiling() {
        Quest.IO.msg('The stone bricks of the walls curve over to form a vaulted roof to the room.');
    },
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north: new Quest.World.Exit('nursery', { msg: 'Mandy has to stoop to get through the narrow door to the north.' }),
    scenery: [
        { alias: ['balustrade', 'banister', 'handrail'], examine: 'A study, but rough-cut balustrade runs the length of the gallery.' },
        { alias: 'stairs', examine: 'The stairs look old and well-used.' },
    ],
    silverSighting: {
        14: 'Mandy can see another silver figure on the floor below. Again it seems to be studying the floor, before running off.',
        8: 'Mandy sees a silver figure in the great hall below her. It seems to be sniffing the floor, but then it looks up at Mandy, skitters away, heading west.',
    },
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('solar'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    up: new Quest.World.Exit('observatory'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('greenhouse_catwalk_east'),
    windowsface: 'north',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('great_hall', {
    afterEnter(exit) {
        if (this.visited === 9) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'greenhouse_east' does not exist on type ... Remove this comment to see the full error message
            if (exit.origin === Quest.World.w.greenhouse_east) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg('Mandy sees a flash of silver as a figure darts up the stairs at the other end of the room.');
            }
            else {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg('Mandy sees a flash of silver as a figure darts out the doors at the other end of the room, heading into the greenhouse.');
            }
        }
    },
    desc: 'The great hall is an impressive size. It looks older than the rest of the house, a lot older, being built of rough-cut stone. There are large double doors to the west, and a wooden staircase leads up to a wooden gallery that runs along the west side of the hall. To the south, a doorway leads to a flight of steps heading downwards.{if:spike:alias:mangled metal: There is a black line running from the gallery, down to the lab.}',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    down: new Quest.World.Exit('mad_science_lab'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    examine_ceiling() {
        Quest.IO.msg('The stone bricks of the walls curve over to form a vaulted roof to the room, up above the gallery.');
    },
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('mad_science_lab'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    up: new Quest.World.Exit('great_gallery'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('greenhouse_east'),
    windowsface: 'north',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('great_hall_floor', {
    alias: 'floor',
    examine() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('The floor is composed of flagstones, of the same mid-grey as the walls. It looks a little uneven in places.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'great_gallery' does not exist on type '{... Remove this comment to see the full error message
        if (Quest.World.w.great_gallery.visited > 7) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Remembering the interest the silver figure had in the floor, Mandy examines that patch of it especially well, but it looks as boring as the rest.');
        }
    },
    loc: 'great_hall',
    scenery: true,
    smell() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'great_gallery' does not exist on type '{... Remove this comment to see the full error message
        if (Quest.World.w.great_gallery.visited > 7) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy thinks about the silver figure sniffing the floor. Most of the flagstones just smell somewhat musty, but there is one - more or less when the silver was sniffing - that smells distinctly of lavender.');
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('The floor smells vaguely unpleasant; kind of musty.');
        }
    },
    synonyms: ['ground', 'flagstones'],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('solar', {
    desc: "The solar. Mandy knows the name from history class; this is where the lord of the castle would sleep. None too comfortable to Mandy's eyes, but possibly the height of luxury a thousand years ago. A large bed, crudely built of wood; a tapestry hung from one wall{if:chamber_pot:scenery:; a chamber pot under the bed}.",
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('great_gallery'),
    scenery: [
        { alias: 'bed', examine: 'The bed is a four-poster, but not ornate at all, and surprisingly small; probably a bit wider than her own bed, but not as long.' },
        { alias: 'tapestry', examine: 'The tapestry has a rather impressive image of a knight fighting a dragon, though time has muted the colours.' },
    ],
    windowsface: 'south',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('chamber_pot', SIZE_CHANGING(), Quest.Templates.VESSEL(), {
    afterMove() {
        this.msgTake = Quest.lang.take_successful;
        this.underLeak = false;
        this.underTree = false;
        this.flipped = false;
    },
    desc4: 'A tiny chamber pot, probably not useful for anything.{chamber_pot}',
    desc5: 'A chamber pot, useful for... something?{chamber_pot}',
    desc6: 'A huge chamber pot, useful for... She decides she would rather not think about that!{chamber_pot}',
    desc7: 'An enormous chamber pot, almost big enough to use as a boat!{chamber_pot}',
    desc8: 'A gigantic chamber pot; it is probable as big as her bedroom inside.',
    eventIsActive() {
        return this.underLeak;
    },
    eventPeriod: 1,
    eventScript() {
        this.underLeakState++;
        if (this.underLeakState > 20)
            this.containedFluidName = 'water';
    },
    flipped: false,
    loc: 'solar',
    msgTake: 'Mandy takes the chamber pot, trying desperately not to think about what it has been used for. At least it is empty...',
    nameModifierFunction(list) {
        if (this.containedFluidName)
            list.push(`full of ${this.containedFluidName}`);
    },
    scenery: true,
    synonyms: ['chamberpot'],
    testCarry() {
        if (this.loc === Quest.World.player.name && this.size === 7 && this.containedFluidName)
            return Quest.IO.falsemsg('Mandy starts to the door, but the weight of the enormous chamber pot full of {show:fluid} is just too much for her to lug around.', { fluid: this.containedFluidName });
        return true;
    },
    testFill(options) {
        if (this.size > 5) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(`Mandy thinks about filling the chamber pot with ${options.fluid}, but it is so big, she would never be able to lift it.`);
            return false;
        }
        if (options.fluid === 'water' && Quest.World.player.loc === 'beach') {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy thinks about filling the chamber pot with water from the sea, but just the sight of those bodies in it is making her feel nauseous. No way is she going near that water.');
            return false;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        if (Quest.World.w.chamber_pot.underLeakState > 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy empties the tiny bit of oily water out of the chamber pot.');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
            Quest.World.w.chamber_pot.underLeakState = 0;
        }
        return true;
    },
    underLeak: false,
    underLeakState: 0,
    underTree: false,
    use() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy looks at the chamber pot. She could actually do with a wee, but the thought of using that... No, she can wait.');
    },
});
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('chamber_pot', (arr, params) => {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
    if (Quest.World.w.chamber_pot.underLeakState > 0)
        return ' It has a tiny bit of oily water in it.';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
    if (Quest.World.w.chamber_pot.flipped)
        return ' It is upside down.';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
    if (!Quest.World.w.chamber_pot.containedFluidName)
        return '';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
    return ` It is full of ${Quest.World.w.chamber_pot.containedFluidName}.`;
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('mad_science_lab', {
    afterEnter() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
        if (Quest.World.w.wire.tiedTo2 === 'spike') {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Suddenly there is a crack of thunder, so loud Mandy can hear it even down here. Mandy shrieks in shock at a bright flash that she thinks at first is the lightning, but then realises is the wire suddenly, and very briefly, glowing white-hot.');
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('There is a smell of ozone and burnt flesh and, as her pounding heart slows again, she sees that smoke is coming from the strange device.');
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("Then she notices the body on the bench twitching. It raises its right arm, and looks at it. 'It's alive!' Mandy cackles, because, really, what else is one supposed to do after animating a body with lightning?");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
            Quest.World.w.spike.setAlias('mangled metal');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
            delete Quest.World.w.wire.tiedTo2;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
            delete Quest.World.w.wire.loc;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
            Quest.World.w.patchwork_body.transform(Quest.World.w.Patch);
        }
    },
    alias: 'mad science laboratory',
    desc() {
        let s = 'This appears to be some kind of laboratory, though nothing like the ones at school. While they have their own distinctive smell, this room is ';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
        s += Quest.World.w.spike.alias === 'mangled metal' ? 'altogether worse, with a strong smell of burnt rubber' : 'different, though Mandy is not sure what it is';
        s += '. The room is dominated by a very solid wooden bench';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
        if (Quest.World.w.patchwork_body.isHere('this')) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
            if (Quest.World.w.patchwork_body.loc || Quest.World.w.Patch.state === 0) {
                s += ', with a corpse on it; is it there to be dissected?';
            }
            else {
                s += ', with a patchwork body on it.';
            }
            s += ' A strange device stands at the head of the table, connected to the body by a number of thick wires';
        }
        else {
            s += '. At one end of the bench a strange device stands with wires dangling from it';
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
        if (Quest.World.w.wire.scenery) {
            s += ', and a coil of wire sits on the floor beside it';
        }
        s += '. Above the table, a crocodile is suspended.';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mad_science_journal' does not exist on t... Remove this comment to see the full error message
        if (Quest.World.w.mad_science_journal.scenery) {
            s += ' Mandy can also see a journal lying in a corner, as though tossed there in anger.';
        }
        return s;
    },
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    examine_ceiling() {
        Quest.IO.msg('The stone bricks of the walls curve over to form a vaulted roof to the room.');
    },
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    examine_floor() {
        Quest.IO.msg('The floor is packed earth; there are patches that look darker, where something might have been spilt perhaps.');
    },
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('great_hall'),
    smell() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
        if (Quest.World.w.spike.alias === 'mangled metal') {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('There is a strong smell burnt flesh -- disturbingly like barbecue -- and ozone.');
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy warily sniffs the air; it is not a pleasant smell. Acrid, a bit like vinegar, but not quite.');
        }
    },
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    up: new Quest.World.Exit('great_hall'),
    windowsface: 'none',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('stuffed_crocodile', Quest.Templates.TAKEABLE(), Quest.Templates.CONTAINER(true), {
    afterMove(options) {
        this.msgTake = Quest.lang.take_successful;
    },
    examine: 'The crocodile is a little over a metre long, and hanging from the ceiling on four wires. It looks like it is stuffed, and it is kind of creepy imagining that once it had been alive.{ifNot:stuffed_crocodile:closed: Its mouth is wide open, and one tooth {if:crocodile_tooth:loc:stuffed_crocodile:looks lose:is missing}.}',
    // cannot get taken to size change rooms
    loc: 'mad_science_lab',
    msgTake: 'Patch looks up at the crocodile for a moment. He reaches up, and gives it a good pull, yanking the fixing from the ceiling in a shower of dust.',
    parserPriority: 50,
    scenery: true,
    testCarry(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (options.char === Quest.World.player)
            return Quest.IO.falsemsg('Mandy thinks about heading off... She hoists up the crocodile to get the better grip, but it is just too big! No way is she going anywhere whilst carrying this thing.');
    },
    testDropIn(options) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'crocodile_tooth' does not exist on type ... Remove this comment to see the full error message
        if (options.item === Quest.World.w.crocodile_tooth)
            return Quest.IO.falsemsg("The tooth does not seem to want to go back into the crocodile's mouth. Mandy shrugs; no big deal.");
        Quest.IO.Quest.IO.falsemsg("Mandy contemplates putting {nm:item:the} in the mouth of the crocodile. People have handbags made out of crocodiles, right? It suddenly occurs to her that the crocodile will be skinned, and its leather used to make the bag, rather than putting things down the corpse's gullet.", options);
    },
    testOpen(options) {
        return this.testTake(options);
    },
    testTake(options) {
        if (!this.scenery)
            return true;
        if (options.char.postureFurniture === 'mad_science_bench' && options.char.posture === 'standing') {
            this.msgTake = 'Mandy can just about reach the crocodile from the bench. She reaches up, and gives it a good pull, yanking the fixing from the ceiling in a shower of dust.';
            return true;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
        if (options.char !== Quest.World.w.Patch)
            return Quest.IO.falsemsg('The crocodile is too high for {nm:char:the} to reach.', { char: options.char });
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('crocodile_tooth', SIZE_CHANGING(), {
    desc5: 'The tooth is a couple of centimetres long, and very sharp.',
    desc6: "The tooth is huge - about as long as Mandy's arm - and very sharp.",
    loc: 'stuffed_crocodile',
    sharp: true,
    testTake(options) {
        if (this.loc !== 'stuffed_crocodile' || !Quest.World.w.stuffed_crocodile.scenery)
            return true;
        if (options.char.postureFurniture === 'mad_science_bench' && options.char.posture === 'standing')
            return true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
        if (options.char !== Quest.World.w.Patch && this.loc === 'stuffed_crocodile' && Quest.World.w.stuffed_crocodile.scenery)
            return Quest.IO.falsemsg('The crocodile is too high for {nm:char:the} to reach.', { char: options.char });
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('mad_science_bench', Quest.Templates.FURNITURE({ recline: true, sit: true, stand: true }), {
    alias: 'bench',
    examine: 'The wood of the bench has black rings and circles scorched into it, testament to years of use. Or perhaps a week of use by an inept experimenter, Mandy muses.',
    loc: 'mad_science_lab',
    scenery: true,
    synonyms: ['table'],
    take: 'The bench is far to heavy for Mandy to pick up.',
    testPostureOn(options) {
        let phrase = '';
        if (options.posture === 'reclining')
            phrase = 'lying down';
        if (options.posture === 'sitting')
            phrase = 'sitting down';
        if (options.posture === 'standing')
            phrase = 'standing up on the bench';
        const s = `The thought of ${phrase} next to a body assembled from numerous corpses makes Mandy feel sick.`;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
        if (Quest.World.w.patchwork_body.loc === 'mad_science_lab')
            return Quest.IO.falsemsg(s);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
        if (Quest.World.w.Patch.isHere() && !Quest.World.w.boots.isAtLoc('Patch'))
            return Quest.IO.falsemsg(`${s} The fact that said body is now moving makes the prospect no more appealing.`);
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('patchwork_body', {
    alias: 'patchwork body',
    examine() {
        this.state = 1;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy gingerly inspects the corpse on the table. It is naked, but nothing to suggest it is either male or female. Mandy decides she does not want to look too closely at {i:that} situation. As she looks closer, she can see stitch marks, and with a growing sense of nausea, she realises it is not a corpse, but the stitched together parts of {i:several} corpses.');
    },
    loc: 'mad_science_lab',
    scenery: true,
    shift: 'Mandy thinks about shifting the body off the table. She would have to touch it to do that. And really, why would she want to?',
    state: 0,
    synonyms: ['corpse'],
    take: 'Mandy thinks about picking up the body... Not going to happen.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('patchwork_body_stiches', Quest.Templates.COMPONENT('patchwork_body'), {
    alias: 'stitches',
    examine: 'Mandy looks closer at the stitching holding the patchwork body together. She has to acknowledge that the needlework is good quality - and presumably all done by hand. She remembers her own efforts at making oven gloves at school, and that was with a machine. Not good.',
    synonyms: ['marks', 'parts'],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Patch', Quest.NPC.NPC(false), {
    afterMove() {
        this.huggingTree = false;
        delete this.goUpDirection;
    },
    alias: 'animated corpse',
    askOptions: [
        {
            script(p) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'What's the big deal about the boots?' asks Mandy. Patch just stares at her.");
            },
            // boots
            test(p) {
                return p.text.match(/boot/);
            },
        },
        {
            script(p) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(`'Tell me about ${p.text},' says Mandy. Patch just stares at her`);
            },
            test(p) {
                return true;
            },
        },
    ],
    endFollow() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg("'Wait here,' says Mandy to {nm:npc:the}.", { npc: this });
        if (!this.leaderName)
            return Quest.IO.falsemsg('{nv:npc:look:true} at Mandy in confusion.', { npc: this });
        this.setLeader();
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('{nv:npc:nod:true} his head.', { npc: this });
        return true;
    },
    examine() {
        let s;
        if (this.state === 0) {
            s = "Mandy looks at the creature she bought to life. It is about two and a half metres tall, and very solidly built. Patches of it are hairy, other patches are dark skinned, some light skinned. Its face is not attractive, it too is a mishmash of parts. Mandy really does not want to know where all the parts came from. However, it needs a name... 'I'll call you Patch,' she says. It nods it head, possibly in acknowledgement.";
            this.setAlias('Patch');
            this.state = 1;
        }
        else {
            s = 'Mandy looks at Patch, the creature she bought to life. He is about two and a half metres tall, and very solidly built. Patches of him are hairy, other patches are dark skinned, some light skinned. His face is not attractive, it too is a mishmash of parts. Mandy really does not want to know where all the parts came from.';
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (Quest.World.w.boots.isAtLoc('Patch')) {
            s += ' He is wearing a pair of boots.';
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
        const held = Quest.Utilities.scopeHeldBy(Quest.World.w.Patch);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
        Quest.Utilities.array.remove(held, Quest.World.w.boots);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
        Quest.Utilities.array.remove(held, Quest.World.w.boots_toe);
        if (held.length > 0)
            s += ` He is holding ${Quest.Utilities.formatList(held, { article: Quest.Utilities.INDEFINITE, lastJoiner: 'and' })}.`;
        if (this.huggingTree)
            s += '|He is currently hugging a tree.';
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(s);
    },
    getAgreement() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (Quest.World.w.boots.loc !== 'Patch')
            return Quest.IO.falsemsg('Patch looks mournfully at his feet. His bare feet.');
        return true;
    },
    hasPod() {
        const l = Quest.Utilities.scopeHeldBy(this);
        for (const el of l) {
            if (el.name.startsWith('tamarind_pod_prototype'))
                return true;
        }
        return false;
    },
    hug: 'He might be made from a collection of disparate body parts, but there is something quite endearing about Patch. Mandy gives him a big hug, and he grins at her.',
    kill: 'Mandy contemplates killing Patch... Would it be murder, given he is made up of dead bodies anyway? And she game him life, so that must mean she has the right to take it away; she is sure she has heard people say that about God. On the other hand, if she did kill him, would that be considered a massacre, given he is made up all numerous bodies -- would she get blamed for killing all them? She decides it is not worth the legal nightmare that would ensue.',
    receiveItems: [
        {
            f(options) {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
                if (Quest.World.w.boots.size < 5) {
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ item: any... Remove this comment to see the full error message
                    options.item.loc = this.loc;
                    return Quest.IO.falsemsg('Mandy gives the boots to {nm:npc:the}. He looks at the tiny footwear in confusion, before dropping them on the floor.', options);
                }
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
                if (!Quest.World.w.boots.mended) {
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ item: any... Remove this comment to see the full error message
                    options.item.loc = this.loc;
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
                    Quest.World.w.boots.rejectedForHole = true;
                    return Quest.IO.falsemsg('Mandy gives the boots to {nm:npc:the}. He looks at the footwear at first with a big smile, which turns into a forlorn frown when he finds the right boot is coming apart. With a glum expression, he drops them on the floor.', options);
                }
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'secret_recipe' does not exist on type '{... Remove this comment to see the full error message
                if (Quest.World.w.secret_recipe.loc === 'boots_room') {
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'loc' does not exist on type '{ item: any... Remove this comment to see the full error message
                    options.item.loc = this.loc;
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                    Quest.IO.msg('Mandy gives the boots to {nm:npc:the}. He looks at the footwear with a big smile, then proceeds to pull on the left boot... Suddenly his grin turns to a frown, and he pulls off the boot, dropping both on the floor.', options);
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
                    if (Quest.World.w.boots.rejectedForHole = true) {
                        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                        Quest.IO.msg("'For fuck's sake,' mutters Mandy, 'now what? Is there a stone in it or something?'");
                    }
                    else {
                        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                        Quest.IO.msg("'What the...' mutters Mandy, 'Is there a stone in it or something?'");
                    }
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
                    Quest.World.w.boots.rejectedForStone = true;
                    return false;
                }
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'name' does not exist on type '{ item: an... Remove this comment to see the full error message
                options.item.loc = this.name;
                options.item.worn = true;
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'animated' does not exist on type '{ item... Remove this comment to see the full error message
                this.animated = true;
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                Quest.IO.msg('Mandy gives the boots to {nm:npc:the}. He looks at the footwear with a big smile, then proceeds to pull on the left boot... Then the right. He looks at them, now on his feet, for a moment, before getting off the bench, and standing upright, ripping of all the wires connecting him to the strange device.', options);
            },
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
            item: Quest.World.w.boots,
        },
    ],
    receiveItemsFailMsg(options) {
        options.item.loc = this.loc;
        return Quest.IO.Quest.IO.falsemsg('Mandy gives {nm:item:the} to {nm:Patch:the}. {nv:Patch:look} at {sb:item} in confusion, before dropping {sb:item} to the floor.', options);
    },
    startFollow() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg("'Follow me,' says Mandy to {nm:npc:the}.", { npc: this });
        if (this.leaderName)
            return Quest.IO.Quest.IO.falsemsg('{nv:npc:look:true} at Mandy in confusion.', { npc: this });
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (Quest.World.w.boots.loc !== 'Patch')
            return Quest.IO.falsemsg('Patch looks mournfully at his feet. His bare feet.');
        this.setLeader(Quest.World.player);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('{nv:npc:nod:true} his head.', { npc: this });
        return true;
    },
    state: 0,
    synonyms: ['patch', 'patchwork body', 'animated corpse'],
    talkto() {
        if (this.state === 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'I shall call you \"Patch\",' declares Mandy.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('The animated body seems to stand a little taller, Mandy thinks, proud to have a name.');
            this.setAlias('Patch');
            this.state = 1;
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(this.talktoOptions[Quest.Random.rndm.int(2)]);
        }
        return true;
    },
    talktoOptions: [
        "'So, do you come here often?' Mandy asks Patch. He gave no indication either way.",
        "'Tell me about yourself!' says Mandy to Patch. His silence suggested there is not much to tell. Or he is unable to talk.",
        "'Where now, do you think?' Mandy asks Patch. Patch seems as stumped as Mandy.",
    ],
    tellOptions: [
        {
            script(p) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(`Mandy starts to tell Patch about ${p.text}. He looks at her intensely, but she gets the feeling he has no idea what she is saying.`);
            },
            test(p) {
                return true;
            },
        },
    ],
    testFollowTo(room) {
        if (room && !room.noFollow)
            return true;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy realises Patch is no longer following her.');
        this.setLeader();
        return false;
    },
});
// ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
Quest.World.w.Patch.nameModifierFunctions[0] = function (item, l) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
    if (Quest.World.w.boots.loc === 'Patch')
        l.push('wearing a pair of boots');
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    const held = Quest.Utilities.scopeHeldBy(Quest.World.w.Patch);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
    Quest.Utilities.array.remove(held, Quest.World.w.boots);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'remove' does not exist on type '{}'.
    Quest.Utilities.array.remove(held, Quest.World.w.boots_toe);
    if (held.length > 0)
        l.push(`holding ${Quest.Utilities.formatList(held, { article: Quest.Utilities.INDEFINITE, lastJoiner: 'and' })}`);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    if (Quest.World.w.Patch.huggingTree)
        l.push('hugging a tree');
};
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('strange_device', {
    alias: 'strange device',
    attachable: true,
    examine() {
        let s = 'The machine at the head of the table is about a metre and a half tall; a wooden cabinet, with brass fittings. On the front are a series of dials and knobs. ';
        let body;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
        if (Quest.World.w.patchwork_body.isAtLoc('mad_science_lab')) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'patchwork_body' does not exist on type '... Remove this comment to see the full error message
            body = Quest.World.w.patchwork_body;
            s += ' About a dozen wires run from the machine to the body, each attached to its own brass bolt on the machine, and to a clip on the torso.';
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
        else if (!Quest.World.w.Patch.animated) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
            body = Quest.World.w.Patch;
            s += ' About a dozen wires run from the machine to {nm:item:the}, each attached to its own brass bolt on the machine, and to a clip on his torso.';
        }
        else {
            s += ' About a dozen wires hang down from the machine, each attached to its own brass bolt on the machine.';
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
        if (Quest.World.w.spike.alias === 'mangled metal')
            s += ' There is smoke coming from the back of it.';
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg(s, { item: body });
    },
    loc: 'mad_science_lab',
    scenery: true,
    switchoffn: 'It is already off.',
    switchon: 'Mandy tries to turn on the strange device, but there seems to be no power to it.',
    synonyms: ['strange machine'],
    testAttach(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.falsemsg('Mandy thinks about attaching the wire to the the strange device... But the other end is already soldered to it, and she decides having one end fixed to it is enough.');
    },
    use: 'Mandy gives the knobs on the strange device a twist, but nothing happens. She gives it a kick, but that is no more successful.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('device_controls', Quest.Templates.COMPONENT('strange_device'), {
    attachable: true,
    examine: 'There are three black knobs, each set to about half way between zero and ten. Each has a dial above, each reading exactly zero.',
    parserPriority: -10,
    scenery: true,
    synonyms: ['dials', 'knobs'],
    testAttach(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.falsemsg('Mandy thinks about attaching the wire to the the strange device... But the other end is already soldered to it, and she decides having one end fixed to it is enough.');
    },
    turn() {
        return this.use();
    },
    use() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy looks at the complicated controls on the strange device. She probably should not mess with them.');
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Ah, what the hell...' She turns the knob on the left clockwise a bit, then a bit more. Then all of them as far as they can go, and then turns them all the other way as far as they can go. Nothing happens.");
        return false;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('bolts', Quest.Templates.COMPONENT('strange_device'), {
    attachable: true,
    examine: 'There are twelve bolts on the strange device, in a row under the control panel. {ifExists:patchwork_body:loc:Each has a wire that runs to a pad on the patchwork body:Each has a wire dangling from it}.',
    handleUntieFrom() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.failedmsg('Mandy thinks about detaching the wires, but decides to leave it alone. {ifExists:patchwork_body:loc:Just has a weird feeling it is important that they stay attached to the body:They are no use to her, and not doing any harm just dangling there}.');
    },
    parserPriority: 15,
    rope: true,
    synonyms: ['pads', 'wires'],
    testAttach(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.falsemsg('Mandy thinks about attaching the wire to the the strange device... But the other end is already soldered to it, and she decides having one end fixed to it is enough.');
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('wire', Quest.Templates.ROPE(8, 'strange_device'), {
    afterMove() {
        if (!this.examined) {
            this.examined = true;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy realises one end of the wire on the spindle is soldered to the strange machine.');
        }
        if (!this.moved)
            this.moved = true;
    },
    alias: 'wire',
    attachTo(char, item) {
        if (this.locs[this.locs.length - 1] === Quest.World.player.name)
            this.locs.pop();
        this.locs.push(item.name);
        this.tiedTo2 = item.name;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
        if (item === Quest.World.w.spike) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy wraps the wire from the spindle around the letter E on the weather vane, then lets the spindle drop, happy that it is secure.');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'sky' does not exist on type '{}'.
            if (Quest.World.w.sky.state < 5) {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'sky' does not exist on type '{}'.
                Quest.World.w.sky.state = 5;
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg('A brief flash of lightning lights up the weather vane, and a few seconds later Mandy hears the thunder.');
            }
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg('Mandy attaches the wire from the spindle to {nm:item:true}, then lets the spindle drop.', { item });
        }
    },
    detachFrom(char, item) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!this.tiedTo2)
            return Quest.IO.falsemsg('Mandy looks at where the wire is soldered to the strange device. That is not coming of there.');
        this.tiedTo2 = false;
        this.locs.pop();
        this.locs.push(Quest.World.player.name);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'spike' does not exist on type '{}'.
        if (item === Quest.World.w.spike) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy unwraps the wire from the spindle around the letter E on the weather vane.');
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg('Mandy detaches the wire from {nm:item:true}.', { item });
        }
    },
    examine() {
        let s = 'The wire is about a millimetre thick, and ';
        let { length } = this.locs;
        if (this.isHeld())
            length--;
        if (length === 1) {
            s += `she guesses there is about ${Quest.lang.toWords(5 * this.ropeLength)} metres of it, the end of which is soldered to the side of the machine at the head of the table.`;
        }
        else if (length === 2) {
            s += 'she guesses there is about twenty metres of it on the spindle, which is also metal, and more heading down the stairs to the laboratory.';
        }
        else if (length === this.ropeLength - 1) {
            s += 'there is not much left.';
        }
        else if (length === this.ropeLength) {
            s += 'she is holding just the end of it.';
        }
        else {
            s += `she guesses there is about ${Quest.lang.toWords(5 * (this.ropeLength - length))} metres of it in a coil; more is heading back to the laboratory.`;
        }
        this.examined = true;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(s);
    },
    indefArticle: 'some',
    loc: 'mad_science_lab',
    msgTake: 'She takes the coil of wire.',
    msgUnwind: 'The wire trails behind as Mandy unwinds it.',
    msgWind: 'Mandy coils up the wire.',
    parserPriority: 10,
    pronouns: Quest.lang.pronouns.massnoun,
    scenery: true,
    suppessMsgs: true,
    synonyms: ['coil of wires', 'wires', 'cable'],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('mad_science_journal', SIZE_CHANGING(), {
    desc4: 'The journal is about the size of a postage stamp; it looks like various things have been spilled on it, including acid, given the entire bottom right corner is missing. It looks old too -- or at least old-fashioned -- and is bound in leather.',
    desc5: 'The journal is in a bad condition; it looks like various things have been spilled on it, including acid, given the entire bottom right corner is missing. It looks old too -- or at least old-fashioned -- and is bound in leather.',
    desc6: 'The journal is as big as a table, and its bad condition is even more apparent; it looks like various things have been spilled on it, including acid, given the entire bottom right corner is missing. It looks old too -- or at least old-fashioned -- and is bound in leather.',
    loc: 'mad_science_lab',
    read: 'Mandy leafs though the {if:mad_science_journal:size:4:tiny }{if:mad_science_journal:size:6:huge }journal, scanning the pages. Most of it makes as little sense as her "Chemistry in Context" text book, and the handwriting does not help. What the hell is a homunculus? The last third of the journal is empty, but the last entry says: "I am so near, all I need is the vital spark. Weather vane on the Great Hall?"',
    scenery: true,
});
/*

This room resets when the balloon touches the floor

The player needs to:
enter
open doll's house
talk to man
give boots to man
wait
get boots

get balloon, touch, move, knock, etc. heads it up,

*/
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('nursery', {
    afterEnter() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'yellow_balloon' does not exist on type '... Remove this comment to see the full error message
        Quest.World.w.yellow_balloon.state = 0;
    },
    afterExit() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'yellow_balloon' does not exist on type '... Remove this comment to see the full error message
        Quest.World.w.yellow_balloon.reset();
    },
    desc: "This seems to be a nursery, or at least what a nursery might have looked like a century ago. {if:china_doll:scenery:A china doll sits on a chair, and there is a doll's house near them:On the far side of the room, there is a chair and a doll's house}. Mandy can also see a cream-painted cot near the window{ifExists:yellow_balloon:loc:, and a balloon..}. The only way out is back south.",
    hereish(o) {
        return ['nursery', 'dollshouse', 'tiny_man'].includes(o.loc);
    },
    noFollow: true,
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('great_gallery', { msg: 'Mandy ducks down to go out the door, and as she does a sudden flash of light momentarily disorientates her.' }),
    windowsface: 'north',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('nursery_chair', Quest.Templates.FURNITURE({ sit: true }), {
    alias: 'chair',
    examine: 'A simple wooden chair; small, as though for a child.',
    loc: 'nursery',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('nursery_cot', Quest.Templates.FURNITURE({ recline: true, sit: true }), {
    alias: 'cot',
    examine: 'A simple cot, of unpainted wood.',
    loc: 'nursery',
    scenery: true,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    testPostureOn() {
        return Quest.IO.falsemsg('Mandy looks at the cot, and decides it is too small for her.');
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('china_doll', SIZE_CHANGING(), {
    alive: true,
    desc3: 'The china doll is so small, Mandy can hardly see it.',
    desc4: "The doll is small enough to fit comfortably in Mandy's palm. Her head and shoulders are glazed porcelain, including her dark hair and blue eyes; she has very rosy cheeks. She is wearing quite a fancy burnt umber dress, with belt and buttons. She is decidedly less creepy this size.",
    desc5: 'The doll is about forty centimetres tall, or would be if she was standing upright -- she clearly is supposed to be female. Her head and shoulders are glazed porcelain, including her dark hair and blue eyes; she has very rosy cheeks. She is wearing quite a fancy burnt umber dress, with belt and buttons. There is something creepy about her.',
    desc6: 'The doll would be considerably taller than Mandy if she were standing upright. Her head and shoulders are glazed porcelain, including her dark hair and blue eyes; she has very rosy cheeks. She is wearing quite a fancy burnt umber dress, with belt and buttons. Definitely creepy.',
    loc: 'nursery',
    msgTake: "{if:china_doll:scenery:Mandy picks up the china doll because you never know when a creepy toy is going to come in useful. The body is soft and floppy, and the contrast with the head is a little disturbing.|'Help me!' says a tiny voice. Was that the doll speaking?:Mandy picks up the china doll.}",
    parserPriority: 5,
    scenery: true,
    testTake() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (this.alive)
            return Quest.IO.falsemsg('Mandy tries to grab the china doll, but she is a bit more tricky to grab hold off now she is a live. There is also the moral question of whether Mandy should be picking up a living person too.');
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('china_doll_dress', Quest.Templates.COMPONENT('china_doll'), {
    alias: 'dress',
    examine: 'The reddish brown dress is quite fancy, if old fashioned, and equipped with all the accessories of a proper dress albeit in miniature. {ifMoreThan:china_doll:size:5: Well, not in miniature now, but it was when she first saw it.} There seems to be no way to get the dress off the doll, in fact, Mandy suspects the doll\'s torso is just stuffing inside the dress.',
    scenery: true,
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('yellow_balloon', {
    alias: 'yellow balloon',
    burst() {
        const sharp = Quest.World.player.getSharp();
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (!sharp)
            return Quest.IO.falsemsg('Mandy jabs her finger at the balloon, and it just bounces off. She jabs again, and then again, but does no better. she needs something sharp.');
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('Mandy jabs at the balloon with {nm:item:the}, and it just bounces off. She jabs again, and then again, and finally the balloon pops! The remains drop to the floor. She resists the urge to grind the limp yellow remnants under her heel.', { item: sharp });
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'yellow_balloon_remains' does not exist o... Remove this comment to see the full error message
        this.transform(Quest.World.w.yellow_balloon_remains);
    },
    catch() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy tries to catch the balloon, but it bounces upwards, out of reach.');
        this.state = 0;
    },
    eventIsActive() {
        return Quest.World.player.loc === 'nursery' && this.loc === 'nursery';
    },
    eventPeriod: 1,
    eventScript() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(this.states[this.state]);
        this.state++;
        if (this.state === this.states.length) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Suddenly everything goes white...');
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(Quest.World.w.great_gallery.north.msg);
            this.reset();
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(this.states[0]);
            this.state++;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            for (const s of Quest.Settings.settings.roomTemplate)
                Quest.IO.msg(s);
        }
    },
    examine: 'The balloon is bright yellow, and pretty much spherical, except for the bit where it is blown up.',
    kick() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy kicks the balloon, making it rise up to the ceiling.');
        this.state = 0;
    },
    knockon() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy knocks the balloon, sending it up to the ceiling.');
        this.state = 0;
    },
    loc: 'nursery',
    reset() {
        // balloon burst, so no reset
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'yellow_balloon_remains' does not exist o... Remove this comment to see the full error message
        if (Quest.World.w.yellow_balloon_remains.loc)
            return;
        this.state = 0;
        // wire
        // either the wire is not here OR the player is holding it OR it is in the room
        // either the player is in the nursery or great_gallery
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
        if (Quest.World.w.wire.isAtLoc('nursery')) {
            log('sort wire');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
            if (Quest.World.w.wire.locs[Quest.World.w.wire.locs.length - 1] === 'player')
                Quest.World.w.wire.locs.pop();
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
            if (Quest.World.w.wire.locs[Quest.World.w.wire.locs.length - 1] === 'nursery')
                Quest.World.w.wire.locs.pop();
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
            log(Quest.World.w.wire.locs);
            if (Quest.World.player.loc === 'nursery') {
                log('nursery');
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
                Quest.World.w.wire.locs.push('nursery');
            }
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
            Quest.World.w.wire.locs.push('player');
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'wire' does not exist on type '{}'.
            log(Quest.World.w.wire.locs);
        }
        // dollshouse
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dollshouse' does not exist on type '{}'.
        Quest.World.w.dollshouse.closed = true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dollshouse' does not exist on type '{}'.
        Quest.World.w.dollshouse.hasBeenOpened = false;
        // china doll
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
        for (const el of [Quest.World.w.china_doll, Quest.World.w.nursery_cot, Quest.World.w.nursery_chair]) {
            el.scenery = true;
            el.loc = 'nursery';
        }
        // tiny man
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        Quest.World.w.tiny_man.state = 0;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        if (Quest.World.w.tiny_man.breakingIntoPod) {
            // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            Quest.World.w[Quest.World.w.tiny_man.breakingIntoPod].loc = Quest.World.player.name;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
            delete Quest.World.w.tiny_man.breakingIntoPod;
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        delete Quest.World.w.tiny_man.agenda;
        // boots not mended if in the room
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'nursery' does not exist on type '{}'.
        if (Quest.World.w.nursery.hereish(Quest.World.w.boots))
            Quest.World.w.boots.mended = false;
        for (const key in Quest.World.w) {
            // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const o = Quest.World.w[key];
            // not interested in rooms, scenery or player
            if (o.room || o.scenery || o.player)
                continue;
            // anything else in the nursery goes back to player inventory
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'nursery' does not exist on type '{}'.
            if (Quest.World.w.nursery.hereish(o))
                o.loc = Quest.World.player.name;
        }
    },
    scenery: true,
    smash() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy tries to burst the stupid balloon, but it bounces out of reach, rising up to the ceiling.');
        this.state = 0;
    },
    state: 0,
    states: [
        'The balloon is near the ceiling, but seems to be falling...',
        'The balloon, gently falling from the ceiling, is at about head height.',
        'The balloon has drifted down to about waist height.',
        'The balloon is at knee height, floating downwards.',
        'Mandy watches the balloon as it drifts down, to touch the floor...',
    ],
    take() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy tries to grab the balloon, but it bounces upwards, out of reach.');
        this.state = 0;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('yellow_balloon_remains', {
    alias: 'remains of a yellow balloon',
    examine: 'A ragged piece of yellow rubber.',
    grind: "'Fuck it,' said Mandy, 'I {i:am} going to do it.' She stands over the remains of the yellow balloon, puts her heel down on it, and {i:grinds}. It feels good!",
    pronouns: Quest.lang.pronouns.plural,
    repair: 'Realistically, the yellow balloon is beyond repair.',
    synonyms: ['remnants'],
    take: 'Mandy wonders if the remains of a very annoying balloon are worth picking up. She decides they are not.',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('dollshouse', Quest.Templates.CONTAINER(true), {
    afterDropIn(options) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
        if (options.item === Quest.World.w.china_doll) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('After a moment, the china doll suddenly comes to life! She sits up, and looks around, then gets to her feet.');
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Blow me,' says the tiny man, 'you found me a friend, lady-giant! Mind, if you could get me one a bit less creepy next time, that would be even better.'");
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
            Quest.World.w.china_doll.alive = true;
        }
    },
    alias: "doll's house",
    examine() {
        let s = "Like the room, the doll's house is old fashioned. Made of wood, the roof looks like maybe it has been carved to look like it is thatched. The walls are white, the window frames are metal, and it stands on a base painted green. ";
        if (this.closed) {
            s += 'It looks like the back would open up.';
        }
        else {
            s += 'The back is opened up, and inside Mandy can see a tiny man.';
        }
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(s);
    },
    hasBeenOpened: false,
    loc: 'nursery',
    openCount: 0,
    openMsg() {
        if (this.hasBeenOpened) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("She opens the doll's house. There is the little man; he looks at Mandy. 'You again, eh?'");
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("She opens the doll's house. Inside, the house is perfectly furnished, complete with a little man, sat on a chair.");
            let s = "The little man looks at Mandy, a look of surprise on his face. 'Cor blimey, you're a big 'un!' ";
            switch (this.openCount) {
                case 0:
                    s += ' Apparently he is alive!';
                    break;
                case 1:
                    s += ' Apparently he is alive! Mandy has a strange feeling of déjà vu...';
                    break;
                case 2:
                    s += ' Apparently he is alive! Mandy has a strange feeling of déjà vu, then a feeling of déjà vu about the feeling of déjà vu!';
                    break;
                case 3:
                    s += ' Apparently he is alive! Why is that not a surprise?';
                    break;
                default:
                    s += ' He is alive, just as she expected.';
                    break;
            }
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(s);
            this.openCount++;
            this.hasBeenOpened = true;
        }
    },
    scenery: true,
    synonyms: ['dollshouse', 'dollhouse', 'dolls house', 'doll house', 'doll\'s house', 'back,'],
    testDropIn(options) {
        log(options);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
        log(Quest.World.w.china_doll);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
        if (options.item === Quest.World.w.china_doll && Quest.World.w.china_doll.size === 4)
            return true;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'china_doll' does not exist on type '{}'.
        if (options.item === Quest.World.w.china_doll)
            return Quest.IO.falsemsg("Mandy thinks about putting the china doll in the doll's house, but she is too big.");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.falsemsg("Mandy thinks about putting {nm:item:the} in the doll's house, but maybe now is not the time to be playing in it.");
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('tiny_man', Quest.NPC.NPC(false), {
    agendaBootsDone() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Okay, there you go,' says the tiny man, putting the boots on the floor just outside the doll's house. 'Good as new! Well, nearly.'");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        Quest.World.w.tiny_man.state = 3;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        Quest.World.w.boots.loc = 'nursery';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        Quest.World.w.boots.mended = true;
    },
    agendaPodDone() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
        const count = Quest.Random.rndm.int(3, 5);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(`'Nearly there,' says the tiny man with a cheerful grin. He gives the chisel another tap, and the pod splits open, to reveal ${count} seeds.`);
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
        if (!Quest.World.w.tamarind_seed.countableLocs[Quest.World.player.name])
            Quest.World.w.tamarind_seed.countableLocs[Quest.World.player.name] = 0;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
        Quest.World.w.tamarind_seed.countableLocs[Quest.World.player.name] += count;
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        delete Quest.World.w[Quest.World.w.tiny_man.breakingIntoPod].loc;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        delete Quest.World.w.tiny_man.breakingIntoPod;
    },
    alias: 'tiny man',
    askOptions: [
        {
            msg: "'Who are you?' says Mandy.|He shrugs. 'Name's Cuthbert, but most call me Big Bert.'|'Why do they call you \"Big Bert\"?'|'It's short for Cuthbert, see?'",
            name: 'Himself',
            test(p) {
                return p.text.match(/himself|who he|man/) || (p.text.match(/he is/) && p.text2 === 'who');
            },
        },
        {
            msg: "'Nice house,' says Mandy politely. 'Is it your?'|'I should be so lucky! I'm just here mending some shoes. They've got some great tools.'",
            name: 'House',
            test(p) {
                return p.text.match(/doll\'?s?\'? ?house/);
            },
        },
        {
            msg: "'I don't suppose you know how I can get out of this stupid house?'|The little man looks around him at the doll's house, then at Mandy. 'You're not in it, love.'|'No, not that house, this one!' She points vaguely around the nursery.|'Wait, I'm in a house inside another house? Stone the crows! If that don't beat all!' Clearly he was not going to be much use in that regard.",
            name: 'Escape',
            test(p) {
                return p.text.match(/escape|way out|get out|house/);
            },
        },
        {
            msg: "'Are you making those shoes or mending them?'|'Mending 'em. Be good as new when I've done with 'em.'|'Whose are they?'|'Mine! You think I go around mending random shoes? Strange hobby that would be!'",
            name: 'Shoes',
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
            script() {
                Quest.World.w.tiny_man.askedAboutShoes = true;
            },
            test(p) {
                return p.text.match(/shoes/);
            },
        },
        {
            msg: "'What's the deal with the mannequins in the dining room?'|The little man look through a doorway, into the dining room of the doll's house. 'Don't see no mannequins in there, love.'",
            // Mannequins
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
            test(p) {
                return p.text.match(/mannequin/) && Quest.World.w.brass_dining_room.visited > 2;
            },
        },
        {
            msg: "'What's the deal with the Silvers - the guy in silver I saw?'|'I don't know. Something weird about them, if you ask me. I just keep me head down when they're around.'",
            name: 'Silvers',
            test(p) {
                return p.text.match(/silver/) && Quest.World.player.silverSpotted > 0;
            },
        },
        {
            name: 'Boots',
            script() {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
                Quest.World.w.boots.doRepair();
            },
            test(p) {
                return p.text.match(/boot/);
            },
        },
        {
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'I can't help noticing...,' says Mandy wondering how she say this, 'that you quite... well, small.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Or maybe you're freakishly tall.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Well, maybe. But this room looks to me like a nursery for people my  size, and you're in a toy house.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Ah, that coz this 'ouse went big. Never used to be. I got trapped 'ere, see? In this 'ouse when it was normal-sized. Went exploring, trying to find a way out, like, walked in this room with all the signs of the zodiac on the rub. As I looked at, the whole house grew! Suddenly I `ad to walk miles to get anywhere. Eventually I found this place, what's a bit more my size, what with the {class:riddle:little things} in it.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("`How long ago was that?' asks Mandy");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Only about ten minutes, maybe twenty.' Mandy thinks about the balloon, and wonders how many years it has really been.");
            },
            test(p) {
                return p.text.match(/small|tiny/);
            },
        },
        {
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Do you know a Dr Winfield Malewicz?' says Mandy. 'I've got a letter for him.'|He looks Mandy up and down. 'I swear postmen get younger ever day! And bigger too. Yeah, I know the doctor. Weird guy, 'as an 'house on me route.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Your route?'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Yeah, me route, when I'm deliverin' coal. Up Highfield Lane as I recalls. God knows what me customers are doing with no coal! Must be days now.'");
            },
            test(p) {
                return p.text.match(/doctor|winfield|malewicz|man/);
            },
        },
        {
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'What's the deal with the balloon?' asks Mandy");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("The tiny man looks out the window. 'Yeah, I saw that floating up there when I got here, like some great floaty yellow thing. Big ain't it?'");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'dollshouse' does not exist on type '{}'.
                if (Quest.World.w.dollshouse.openCount > 3) {
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg("'I was more concerned with the way it seems to rewind time when it hits the floor.'");
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg("'You what? You on drugs on summit?' Being in the middle of it, he may not realise anything odd is happening, it occurs to Mandy.");
                }
            },
            test(p) {
                return p.text.match(/balloon/);
            },
        },
        {
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'I don't suppose you know any Shakespeare?' asks Mandy. 'Hamlet in particular.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Do I look like a toff?'");
            },
            test(p) {
                return p.text.match(/hamlet/);
            },
        },
        {
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'What did you do before you got trapped here?' asks Mandy");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'I'm a coal merchant. I was just 'ere bring round a sack of coal, when I kind of got sucked inside. {class:riddle:Drag me down,} it did! That was weeks ago. What's happened to my business?' Mandy decides not to tell him the entire coal industry is dead in England, and no one has coal fires any more.");
            },
            test(p) {
                return p.text.match(/past|origin|career|job|deliver/);
            },
        },
        {
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'You know anything about this letter?' asks Mandy");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'What am I, a postman?'");
            },
            test(p) {
                return p.text.match(/letter/);
            },
        },
        {
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'What's the deal with the telescope in the observatory?' asks Mandy");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Observatory? You 'aving a laugh! I bin delivering round here for years; and ?I can tell you, this is a 'ouse, ain't got no observatory. '");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'You must've noticed it's a lot bigger than it should be from the outside.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Lot of 'ouses look big 'un there are. Clever use of furniture, that's the trick.'");
            },
            test(p) {
                return p.text.match(/telescope|observatory/);
            },
        },
        {
            alias: 'So where do you live?',
            script() {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'So where {i:do} you live?'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'14 Clarence Street. Least, that's where I lived before I come in 'ere.'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'Clarence Street? I know that road, Charlene Porter lives there.' It is a terrace house, built in the later nineteenth century, near the centre of town.");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'I don't know no Charlene. French is she?'");
            },
            // !!!
            test(p) {
                return p.text.match(/live/) && p.text2 === 'where';
            },
        },
        {
            script(p) {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
                Quest.World.w.tiny_man.badTopicCount++;
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(`Mandy asks the little man about ${p.text}.`);
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'What the..?' he replies, 'Ask me about a topic what I know about.'");
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
                if (Quest.World.w.tiny_man.badTopicCount > 7)
                    Quest.IO.msg("'Do you know about anything?' asks Mandy getting increasingly frustrated.|'Not a lot, no.'");
            },
        },
    ],
    badTopicCount: 0,
    // override default for NPCs so we see it when he is in house
    endFollow() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg("'Wait here,' says Mandy to {nm:npc:the}.", { npc: obj });
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.falsemsg("'I wasn't going nowhere!'");
    },
    examine() {
        let s = 'The man is only about ten centimetres tall, but looks normally proportioned. He is dressed in blue overalls, and has dark hair, that is going grey. ';
        if (this.state < 2) {
            s += 'He seems to be making a pair of shoes.';
        }
        else if (this.state === 2) {
            s += 'He is mending the boots Mandy has given him.';
        }
        else if (this.breakingIntoPod) {
            s += 'He is trying to break into a tamarind pod.';
        }
        else {
            s += 'He is once again making a pair of shoes.';
        }
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(s);
    },
    getAgreement(verb, item) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (verb !== 'Repair')
            return Quest.IO.falsemsg("'Sorry, lady-giant, I've got to much to do here. In fact I best get on.'");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
        if (item !== Quest.World.w.boots && item !== Quest.World.w.tiny_shoes)
            return Quest.IO.falsemsg("'Sorry, lady-giant, I can do shoes, maybe boots at a push, but... No, not that.'");
        return true;
    },
    inSight() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dollshouse' does not exist on type '{}'.
        return Quest.World.player.loc === 'nursery' && !Quest.World.w.dollshouse.closed;
    },
    kill: 'Mandy contemplates killing the little man. The guy is only ten centimetres, no court in the land would consider him an actual person, would it. Admittedly he does seem like a normal person. And what if he is normal-sized, and it is she who is a giant? No court in the land would find a giant innocent for the cold-bloodied murder of a man just trying to make a living mending shoes. Probably best to let him live, annoying though he is.',
    loc: 'dollshouse',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg(s, params) {
        Quest.IO.msg(s, params);
    },
    receiveItems: [
        {
            f(options) {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
                if (Quest.World.w.boots.size !== 4) {
                    return Quest.IO.falsemsg("Mandy gives {nm:item:the} to the tiny man. 'What'd I want something like that for?' he asks.|'I thought you might be a cobbler elf.'|'A what? Are you taking the piss?'|'No! It's just you're quite... small.|'I'm normal size, I am. You're the freak, lady-giant. I can't fix no giant lady boots; I only do {i:normal-size} footwear.'", options);
                }
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
                if (Quest.World.w.tiny_man.state !== 1 || Quest.World.w.boots.size !== 4) {
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg("Mandy gives the small boots to the tiny man. 'What'd I want something like that for?' he asks.|'I thought you might be a cobbler elf.'|'A what? Are you taking the piss?'|'No! It's just you're quite... small.|'I'm normal size, I am. You're the freak, lady-giant. Though I suppose I {i:could} fix them.' He starts to examine the hole in the boot.");
                }
                else {
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg("Mandy gives the boots to the tiny man. 'I'll get on that as soon as I've done these,' he says.");
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg("{ifExists:yellow_balloon:loc:Mandy glances at the balloon. }'I don't suppose you could do it now?' She smiles sweetly at him, making him jump back from his seat in horror.");
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg("'Okay, okay, giant-lady! Whatever you say!' He drops the shoes, and starts to examine the hole in the boot.");
                }
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
                Quest.World.w.boots.loc = 'tiny_man';
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
                Quest.World.w.tiny_man.bootsState = 2;
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
                Quest.World.w.tiny_man.agenda = ['wait:3', 'run:agendaBootsDone'];
            },
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
            item: Quest.World.w.boots,
        },
        {
            f(options) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("Mandy gives the tamarind pod to the tiny man. 'What'd I want something like that for?' he asks.|'I thought you might be able to cut it open,' says Mandy. 'You know, with your little tools.'|'My what?'|'Er, your normal-sized tools?'");
                if (options.item.size > 4) {
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg("He shrugs. 'Give it a go.' He grabs and hammer and chisel, and sets about trying to break into the pod.");
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
                    Quest.World.w.tiny_man.breakingIntoPod = options.item.name;
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
                    Quest.World.w.tiny_man.agenda = ['wait', 'wait', "text:'It's a right tough one, this,' the tiny man notes, as he catches his breath, 'but I'll get into it, {class:riddle:one way or another}.' He starts banging the hammer on the chisel again. Mandy wonders if he should be using a mallet, but says nothing.", 'wait', 'run:agendaPodDone'];
                }
                else {
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'int' does not exist on type '{ buffer: n... Remove this comment to see the full error message
                    const count = Quest.Random.rndm.int(3, 5);
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg(`He shrugs. 'Should be easy enough.' He grabs and hammer and chisel, and sets the chisel to the pod. He gives it a gentle tap, and the pod splits open, to reveal ${count} seeds.`);
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
                    if (!Quest.World.w.tamarind_seed.countableLocs[Quest.World.player.name])
                        Quest.World.w.tamarind_seed.countableLocs[Quest.World.player.name] = 0;
                    // ts-error-fixed ts-migrate(2339) FIXME: Property 'tamarind_seed' does not exist on type '{... Remove this comment to see the full error message
                    Quest.World.w.tamarind_seed.countableLocs[Quest.World.player.name] += count;
                }
                delete options.item.loc;
            },
            test(options) {
                return options.item.name.startsWith('tamarind_pod_prototype');
            },
        },
    ],
    receiveItemsFailMsg: "Mandy gives {nm:item:the} to the tiny man. 'What'd I want something like that for?' he asks.",
    scenery: true,
    startFollow() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg("'Follow me,' says Mandy to {nm:npc:the}.", { npc: obj });
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.falsemsg("'If it's all the same to you, I'll stay here.'");
    },
    state: 0,
    synonyms: ['little man', 'big bert', 'cuthbert'],
    take() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.falsemsg("Mandy tries to grab the tiny man, because a four inch high man has to score a few views on Youtube, but he dodges out of the way. 'Ere, wot you playin' at?' he demands. 'You keep yer 'ands off!'");
    },
    talkto() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Mandy wonders what {i:topics} she could {i:ask the tiny man about}...');
        return false;
    },
    tellOptions: [
        {
            script(p) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(`Mandy starts to tell the tiny man about ${p.text}.`);
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("He looks at her, 'Listen giant-lady, I don't really care.{once: Maybe these things are important in the giant Quest.World.world, but not in mine.}'");
            },
            test(p) {
                return true;
            },
        },
    ],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('tiny_shoes', {
    examine: 'The tiny shoes are brown; they lace up and are rather pointed at the toe.',
    loc: 'nursery',
    repair(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (options.char === Quest.World.player)
            return Quest.IO.falsemsg('With the best will in the Quest.World.world, Mandy is not going to be ablke to repair the shoes. Better leave it to the cobbler elf...');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'tiny_man' does not exist on type '{}'.
        if (Quest.World.w.tiny_man.bootsState === 2)
            return Quest.IO.falsemsg("'So can you fox those shoes?' asks Mandy.|'Not while I'm doin' this I can't.'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'So can you fox those shoes?' asks Mandy.|'Reckon so!'");
        return true;
    },
    scenery: true,
    take: "Mandy tries to grab the shoes, but the tiny man is too quick for her. 'They're not your!'",
});
//# sourceMappingURL=medieval.js.map