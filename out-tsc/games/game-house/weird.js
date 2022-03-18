register('weird', {
    book: 'King Lear',
    ceiling: 'The ceiling is black.',
    floor: 'The floor is black.',
    listen: 'Mandy can hear... a heartbeat?',
    smell: 'The room smells kind of like bleach and kind of like fresh cut grass and kind of like Sunday afternoons.',
    uniform: 'grey robes, like something out of Harry Potter',
    walls: 'The walls are all black.',
});
// deathToBeNoted
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
Quest.World.createRoom('weird_room', {
    afterEnter() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
        if (Quest.World.w.Winfield_Malewicz.loc === this.name || Quest.World.w.Winfield_Malewicz.dead)
            return;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
        Quest.World.w.Winfield_Malewicz.loc = this.name;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg('Dr Malewicz follows Mandy into the strange room.');
    },
    afterFirstEnter() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("She glances at him quickly, the windows that seem to be laughing at her. How is that even possible? There are four windows, all rectangular and all different sizes. They look nothing like eyes, and yet somehow she knows they are laughing at her. {i:No, that's wrong,} she says to herself. {i:They're not windows, they really are eyes, and there's only two of them!}");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'{smallcaps:A mere girl,}' says the house... No, says the {i:man}, Mandy tells herself. '{smallcaps:A mere girl thinks she can solve a riddle that has stumped poor Malewicz for over a century?}'");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
        if (Quest.World.w.Winfield_Malewicz.loc) {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
            Quest.World.w.Winfield_Malewicz.loc = this.name;
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Over a century?' says Dr Malewicz, having followed Mandy. 'Can it really be that long?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Actually I never claimed to be able to solve anything,' Mandy points out. 'So if you could let me out, I'll just be on my way..?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'{smallcaps:No one leaves the house!}' the man shouts.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
            Quest.IO.wait();
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("The house-man continues, in a quieter, but no more pleasant voice; '{smallcaps:It's just not possible. Now, that riddle... would you like to hear it.}'");
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Actually I never claimed to be able to solve anything,' Mandy points out. 'So if you could let me out, I'll just be on my way..?'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'{smallcaps:No one leaves the house!}' the man shouts.");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
            Quest.IO.wait();
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("The house-man continues in a more normal voice; '{smallcaps:Not until I find a replacement, anyway, and then only in death! I must thank you for ridding me of the tiresome doctor}'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'I never...'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'Come, come, girl! You slaughtered the old fool in cold blood. {ifHeld:bloody_brick:You have the murder weapon right there in your hand:Your clothes are splattered with his blood.}'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'There may have been a misunderstanding...'");
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'{smallcaps:Of course! Now, that riddle... would you like to hear it.}'");
        }
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("Mandy shrugs. 'I guess.'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'{smallcaps:What direction?}'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'That's it? What sort of riddle is that? That's as lame as \"what have I got in my pocket?\"'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'{smallcaps:Fiendishly tricky.}'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Lame.'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'{smallcaps:Nevertheless, you will not leave until you solve it.}'");
    },
    alias: 'A Weird Room',
    desc: 'This is best described as blackness. And yet, if is not darkness, as Mandy can see a strange man here. And the control room to the south.',
    properNoun: true,
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    south: new Quest.World.Exit('steam_control_room'),
    windowsface: 'none',
});
// ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
Quest.World.createItem('house_man', Quest.NPC.NPC(), {
    alias: 'house-man',
    askOptions: [
        {
            script(p) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'What...' Mandy starts to say.");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg("'{smallcaps:h-uh-uh,}' says the man. Or the house. '{smallcaps:Not until you answer my question. What direction?}'");
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(Quest.World.w.house_man.talkCount === 4 ? "'Yeah, okay, I get it,' mutters Mandy. 'You must be a whole barrel of laughs at a party.'" : 'Mandy wonders what she should say.');
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'house_man' does not exist on type '{}'.
                Quest.World.w.house_man.talkCount++;
            },
            test(p) {
                return true;
            },
        },
    ],
    endFollow() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg("'Wait here,' says Mandy to {nm:npc:the}.", { npc: obj });
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'{smallcaps:I will... For ever.}'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'Is that supposed to scare me? It just sounds lame. You've got us trapped here. We get it. No need to be a jerk about it.'");
        return false;
    },
    examine: "Just looking at the man hurts Mandy's eyes. People are not supposed to be houses! Does he have ginger hair, or red tiles? Are his lips green or his door? Why does he have four eyes? How can a house laugh at you?",
    getAgreement() {
        this.talkCount++;
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        return Quest.IO.falsemsg("'{smallcaps:Uh-uh-uh,}' says the man. Or the house. '{smallcaps:Not until you answer my question. What direction?}'");
    },
    kill() {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        if (Quest.World.w.chamber_pot.loc === Quest.World.player.name && Quest.World.w.chamber_pot.size > 4) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("{Fuck this,} thinks Mandy. She takes the chamber pot, and swings it at the house-man's head as hard as she can. And yet he is not there, and somehow never was. '{smallcaps:Not going to happen,}' he says. She takes a couple more swings, but they are equally ineffective.");
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'glass_shard' does not exist on type '{}'... Remove this comment to see the full error message
        else if (Quest.World.w.glass_shard.loc === Quest.World.player.name) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("{Fuck this,} thinks Mandy. She takes the glass shard, and swings it at the house-man's neck, hoping he is more man than house. And yet he is not there, and somehow never was. '{smallcaps:Not going to happen,}' he says. She takes a couple more swings, but they are equally ineffective.");
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'crocodile_tooth' does not exist on type ... Remove this comment to see the full error message
        else if (Quest.World.w.crocodile_tooth.loc === Quest.World.player.name) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("{Fuck this,} thinks Mandy. She takes the crocodile tooth, and swings it at the house-man's neck, hoping he is more man than house. And that a tooth can be used as a weapon. Somehow he is not there, and never was. '{smallcaps:Not going to happen,}' he says. She takes a couple more swings, but they are equally ineffective.");
        }
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        else if (Quest.World.w.chamber_pot.loc === Quest.World.player.name) {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy wishes the chamber pot was not so small; it might have made a good weapon... Not that a weapon would necessarily work against a house-man, of course.');
        }
        else {
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg('Mandy wishes she still had the chamber pot or the glass shard; either might have made a good weapon... Not that a weapon would necessarily work against a house-man, of course.');
        }
    },
    loc: 'weird_room',
    parserPriority: 20,
    startFollow() {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        Quest.IO.msg("'Follow me,' says Mandy to {nm:npc:the}.", { npc: obj });
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'{smallcaps:How can I follow you when I'm already everywhere!}'");
        return false;
    },
    talkCount: 0,
    talkto() {
        // ts-error-fixed ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
        "'What...' Mandy starts to say.",
            // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
            Quest.IO.msg("'{smallcaps:Uh-uh-uh,}' says the man. Or the house. '{smallcaps:Not until you answer my question. What direction?}'");
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(this.talkCount === 4 ? "'Yeah, okay, I get it,' mutters Mandy. 'You must be a whole barrel of laughs at a party.'" : 'Mandy wonders what she should say.');
        this.talkCount++;
        return false;
    },
    tellOptions: [
        {
            script(p) {
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
                Quest.IO.msg(`Mandy starts to tell the house-man about ${p.text} but he pays no attention.`);
            },
            test(p) {
                return true;
            },
        },
    ],
});
//# sourceMappingURL=weird.js.map