// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('me', Quest.Templates.PLAYER(), {
    examine: 'Just a regular guy.',
    loc: 'lounge',
    synonyms: ['me', 'myself'],
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('lounge', {
    desc: 'A smelly room with an old settee and a tv.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    east: new Quest.World.Exit('kitchen'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
Quest.World.createItem('torch', Quest.Templates.TAKEABLE(), Quest.Templates.SWITCHABLE(false, 'providing light'), {
    charge(options) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        if (options.char.loc != 'garage')
            return Quest.IO.falsemsg('There is nothing to charge the torch with here.');
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg('{pv:char:charge:true} the torch - it should last for hours now.', options);
        this.power = 20;
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
    examine: 'A small black torch.',
    lightSource() {
        return this.switchedon ? Quest.World.world.LIGHT_FULL : Quest.World.world.LIGHT_NONE;
    },
    loc: 'lounge',
    power: 3,
    synonyms: ['flashlight'],
    testSwitchOn() {
        if (this.power < 0) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('The torch is dead.');
            return false;
        }
        return true;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('garage_key', Quest.Templates.KEY(), {
    examine: 'A big key.',
    loc: 'lounge',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('box', Quest.Templates.CONTAINER(), {
    examine: 'A big box.',
    loc: 'lounge',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createItem('phone', {
    contacts() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'isContact' does not exist on type '{}'.
        const contacts = Quest.Utilities.scopeBy(Quest.Parser.parser.isContact);
        contacts.push('Never mind.');
        log(contacts);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        Quest.IO.showMenuDiag('Who do you want to call?', contacts, (result) => {
            if (result === 'Never mind.')
                return;
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
            Quest.World.w.phone.makeCall(result);
        });
    },
    // loc:"me",
    examine: 'Your phone.',
    gallery: [
        'A photo of you in a fetching bonnet sat on a garden seat, taken on Easter Sunday two years ago.',
        'A kitten playing with a ball of wool. You remember the stupid cat gave you quite a scratch just after you took the photo.',
        'You and Penny, outside the Royal Whistler, queuing to get inside on New Years Eve.',
    ],
    hangUp() {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const npc = Quest.World.w[Quest.World.player.onPhoneTo];
        if (npc.phoneEnd) {
            npc.phoneEnd();
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            Quest.IO.msg('You say your goodbyes to {nm:npc:the} and hang up.', { npc });
        }
        delete Quest.World.player.onPhoneTo;
    },
    internet: {
        rabbit: 'Rabbits are small mammals in the family Leporidae (along with the hare) of the order Lagomorpha (along with the pika).',
    },
    makeCall(npc) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
        if (Quest.World.w.phone.loc !== Quest.World.player.name)
            return Quest.IO.failedmsg('You cannot phone anyone without a phone.');
        if (!npc.npc)
            return Quest.IO.failedmsg('Why would you want to phone {nm:item:the}?', { item: npc });
        if (!npc.phone)
            return Quest.IO.failedmsg('You wish you had {nms:item:the} number in your phone.', { item: npc });
        if (npc.isHere())
            return Quest.IO.failedmsg('You think about phoning {nm:item:the}, but as {pv:item:be} is standing right here, that might look a bit odd.', { item: npc });
        if (Quest.World.player.onPhoneTo === npc.name)
            return Quest.IO.failedmsg('You think about phoning {nm:item:the} - then remember you already are!', { item: npc });
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (Quest.World.player.onPhoneTo)
            return Quest.IO.failedmsg('You think about phoning {nm:item:the} - then remember you are already on the phone to {nm:other:the}!', { item: npc, other: Quest.World.w[Quest.World.player.onPhoneTo] });
        if (npc.phone()) {
            Quest.World.player.onPhoneTo = npc.name;
            return true;
        }
        return false;
    },
    news: [
        {
            content: 'Scientists in Lowther Junction are saying have detected an asteroid on a collision course with earth, due to arrive in three days.',
            name: 'Asteroid Heading to Earth',
            weather: 'The outlook for the next two days is generally fine with scattered showers, but on Tuesday expect high winds, dust storms and the end of the human race.',
        },
        {
            content: 'News of the impending end of the human race has led to wide-spread panic across the globe.',
            name: 'Asteroid Panic',
            weather: 'The outlook for the next two days is generally fine but with heavy showers, but on Tuesday expect high winds, dust storms and the end of the human race.',
        },
        {
            content: 'Scientists in Lowther Junction have now admitted that their reports about an asteroid heading for earth were just a joke.',
            name: 'All a Big Joke!',
            weather: 'The outlook for the week is generally fine with scattered showers, getting steadily heavier towards the end of the week.',
        },
    ],
    newsState: 0,
    newsfeed() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('You check the news on your phone...');
        const news = this.news[this.newsState];
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(`{b:${news.name}:} ${news.content}`);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(`{b:Weather:} ${news.weather}`);
        return true;
    },
    photogallery() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('You idly flick through the photos on your phone...');
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        for (const s of this.gallery)
            Quest.IO.msg(s);
        return true;
    },
    saveLoadExcludedAtts: ['internet', 'news'],
    searchinternet() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.askDiag('Search the web', (s) => {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg(`On your phone you search for "${s}".`);
            const regex = RegExp(s);
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
            for (const key in Quest.World.w.phone.internet) {
                if (regex.test(key)) {
                    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                    Quest.IO.msg(`You find: {i:${Quest.World.w.phone.internet[key]}}`);
                    return true;
                }
            }
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('You find nothing of interest.');
            return false;
        });
    },
    takephoto() {
        const subjects = Quest.Utilities.scopeHereListed();
        subjects.push('Never mind.');
        log(subjects);
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        Quest.IO.showMenuDiag('What do you want a photo of?', subjects, (result) => {
            if (result === 'Never mind.')
                return;
            if (result.photo) {
                result.photo();
            }
            else {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
                Quest.IO.msg('You take a photo of {nm:item:the} on your phone.', { item: result });
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
                Quest.World.w.phone.gallery.push(Quest.Text.processText('A {random:out-of-focus:crooked:cool:artistic:indifference:poor:good:frankly awful} photo of {nm:item:the}.', { item: result }));
            }
        });
    },
    verbFunction(list) {
        list.pop();
        list.push(Quest.World.player.onPhoneTo ? 'Hang up' : 'Contacts');
        list.push('Take photo');
        list.push('Photo gallery');
        list.push('Search internet');
        list.push('News feed');
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('kitchen', {
    afterFirstEnter() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('A fresh smell here!');
    },
    desc: 'A clean room, a clock hanging on the wall. There is a sink in the corner.',
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    down: new Quest.World.Exit('basement', {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'trapdoor' does not exist on type '{}'.
        isHidden() {
            return Quest.World.w.trapdoor.closed;
        },
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    north: new Quest.World.Exit('garage'),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    west: new Quest.World.Exit('lounge'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('Lara', Quest.NPC.NPC(true), {
    askOptions: [
        {
            msg: "'I like it,' says Lara.",
            test(p) {
                return p.text.match(/house/);
            },
        },
        {
            msg: "'Needs some work,' Lara says with a sigh. 'I'm hoping to grow carrots.",
            test(p) {
                return p.text.match(/garden/);
            },
        },
        {
            msg: "'I'm giving up hope of it ever getting sorted,' Lara says.",
            test(p) {
                return p.text.match(/garden/);
            },
        },
        {
            failed: true,
            msg: 'Lara has no interest in that.',
        },
    ],
    contact: true,
    loc: 'kitchen',
    phone() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('You phone Lara.');
        return true;
    },
    photo() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('You take a photo of Lara.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
        Quest.World.w.phone.gallery.push(Quest.Text.processText('A {random:nice:blurry:good:poor} photo of {nm:item:the} {random:smiling:looking cross:eating a carrot} in {nm:loc:the}.', { item: this, loc: Quest.World.currentLocation }));
    },
    talkto(list) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('You chat to Lara about carrots for a while.');
    },
    verbFunction(list) {
        if (!this.isHere())
            list.shift();
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('trapdoor', Quest.Templates.OPENABLE(false), {
    examine: 'A small trapdoor in the floor.',
    loc: 'kitchen',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('garage', {
    desc: 'An empty garage.',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('kitchen'),
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('basement', {
    darkDesc: 'It is dark, but you can just see the outline of the trapdoor above you.',
    desc: 'A dank room, with piles of crates everywhere.',
    dests: [
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        new Quest.World.Exit('kitchen'),
    ],
    lightSource() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'light_switch' does not exist on type '{}... Remove this comment to see the full error message
        return Quest.World.w.light_switch.switchedon ? Quest.World.world.LIGHT_FULL : Quest.World.world.LIGHT_NONE;
    },
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('light_switch', Quest.Templates.SWITCHABLE(false), {
    alias: 'light switch',
    examine: 'A switch, presumably for the light.',
    loc: 'basement',
});
//# sourceMappingURL=data.js.map