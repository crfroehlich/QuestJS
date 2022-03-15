
"use strict"



register('weird', {
  book: 'King Lear',
  uniform: 'grey robes, like something out of Harry Potter',
  smell: 'The room smells kind of like bleach and kind of like fresh cut grass and kind of like Sunday afternoons.',
  listen: 'Mandy can hear... a heartbeat?',
  floor: "The floor is black.",
  walls: "The walls are all black.",
  ceiling: "The ceiling is black.",
})


// deathToBeNoted

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("weird_room", {
  alias: "A Weird Room",
  properNoun: true,
  windowsface: 'none',
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  south: new Exit("steam_control_room"),
  desc: "This is best described as blackness. And yet, if is not darkness, as Mandy can see a strange man here. And the control room to the south.",
  afterFirstEnter: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("She glances at him quickly, the windows that seem to be laughing at her. How is that even possible? There are four windows, all rectangular and all different sizes. They look nothing like eyes, and yet somehow she knows they are laughing at her. {i:No, that's wrong,} she says to herself. {i:They're not windows, they really are eyes, and there's only two of them!}")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'{smallcaps:A mere girl,}' says the house... No, says the {i:man}, Mandy tells herself. '{smallcaps:A mere girl thinks she can solve a riddle that has stumped poor Malewicz for over a century?}'")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
    if (w.Winfield_Malewicz.loc) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
      w.Winfield_Malewicz.loc = this.name
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Over a century?' says Dr Malewicz, having followed Mandy. 'Can it really be that long?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Actually I never claimed to be able to solve anything,' Mandy points out. 'So if you could let me out, I'll just be on my way..?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'{smallcaps:No one leaves the house!}' the man shouts.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      Quest.IO.wait()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The house-man continues, in a quieter, but no more pleasant voice; '{smallcaps:It's just not possible. Now, that riddle... would you like to hear it.}'")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Actually I never claimed to be able to solve anything,' Mandy points out. 'So if you could let me out, I'll just be on my way..?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'{smallcaps:No one leaves the house!}' the man shouts.")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 0.
      Quest.IO.wait()
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("The house-man continues in a more normal voice; '{smallcaps:Not until I find a replacement, anyway, and then only in death! I must thank you for ridding me of the tiresome doctor}'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'I never...'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'Come, come, girl! You slaughtered the old fool in cold blood. {ifHeld:bloody_brick:You have the murder weapon right there in your hand:Your clothes are splattered with his blood.}'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'There may have been a misunderstanding...'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'{smallcaps:Of course! Now, that riddle... would you like to hear it.}'")
    }
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Mandy shrugs. 'I guess.'")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'{smallcaps:What direction?}'")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'That's it? What sort of riddle is that? That's as lame as \"what have I got in my pocket?\"'")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'{smallcaps:Fiendishly tricky.}'")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'Lame.'")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'{smallcaps:Nevertheless, you will not leave until you solve it.}'")
  },
  afterEnter: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
    if (w.Winfield_Malewicz.loc === this.name || w.Winfield_Malewicz.dead) return
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Winfield_Malewicz' does not exist on typ... Remove this comment to see the full error message
    w.Winfield_Malewicz.loc = this.name
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("Dr Malewicz follows Mandy into the strange room.")
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("house_man", NPC(), {
  loc: "weird_room",
  alias: 'house-man',
  talkCount: 0,
  parserPriority: 20,
  examine: "Just looking at the man hurts Mandy's eyes. People are not supposed to be houses! Does he have ginger hair, or red tiles? Are his lips green or his door? Why does he have four eyes? How can a house laugh at you?",
  endFollow: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    Quest.IO.msg("'Wait here,' says Mandy to {nm:npc:the}.", { npc: obj })
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'{smallcaps:I will... For ever.}'")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'Is that supposed to scare me? It just sounds lame. You've got us trapped here. We get it. No need to be a jerk about it.'")
    return false
  },
  startFollow: function () {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    Quest.IO.msg("'Follow me,' says Mandy to {nm:npc:the}.", { npc: obj })
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg("'{smallcaps:How can I follow you when I'm already everywhere!}'")
    return false
  },
  talkto: function () {
    // @ts-expect-error ts-migrate(2695) FIXME: Left side of comma operator is unused and has no s... Remove this comment to see the full error message
    msg: "'What...' Mandy starts to say.",
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("'{smallcaps:Uh-uh-uh,}' says the man. Or the house. '{smallcaps:Not until you answer my question. What direction?}'");
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(this.talkCount === 4 ? "'Yeah, okay, I get it,' mutters Mandy. 'You must be a whole barrel of laughs at a party.'" : "Mandy wonders what she should say.")
    this.talkCount++
    return false
  },
  getAgreement: function () {
    this.talkCount++
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("'{smallcaps:Uh-uh-uh,}' says the man. Or the house. '{smallcaps:Not until you answer my question. What direction?}'")
  },
  kill: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
    if (w.chamber_pot.loc === player.name && w.chamber_pot.size > 4) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("{Fuck this,} thinks Mandy. She takes the chamber pot, and swings it at the house-man's head as hard as she can. And yet he is not there, and somehow never was. '{smallcaps:Not going to happen,}' he says. She takes a couple more swings, but they are equally ineffective.")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'glass_shard' does not exist on type '{}'... Remove this comment to see the full error message
    else if (w.glass_shard.loc === player.name) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("{Fuck this,} thinks Mandy. She takes the glass shard, and swings it at the house-man's neck, hoping he is more man than house. And yet he is not there, and somehow never was. '{smallcaps:Not going to happen,}' he says. She takes a couple more swings, but they are equally ineffective.")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'crocodile_tooth' does not exist on type ... Remove this comment to see the full error message
    else if (w.crocodile_tooth.loc === player.name) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("{Fuck this,} thinks Mandy. She takes the crocodile tooth, and swings it at the house-man's neck, hoping he is more man than house. And that a tooth can be used as a weapon. Somehow he is not there, and never was. '{smallcaps:Not going to happen,}' he says. She takes a couple more swings, but they are equally ineffective.")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
    else if (w.chamber_pot.loc === player.name) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("Mandy wishes the chamber pot was not so small; it might have made a good weapon... Not that a weapon would necessarily work against a house-man, of course.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      Quest.IO.msg("Mandy wishes she still had the chamber pot or the glass shard; either might have made a good weapon... Not that a weapon would necessarily work against a house-man, of course.")
    }
  },
  askOptions: [
    {
      test: function (p: any) { return true },
      script: function (p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'What...' Mandy starts to say.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("'{smallcaps:h-uh-uh,}' says the man. Or the house. '{smallcaps:Not until you answer my question. What direction?}'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg(w.house_man.talkCount === 4 ? "'Yeah, okay, I get it,' mutters Mandy. 'You must be a whole barrel of laughs at a party.'" : "Mandy wonders what she should say.")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'house_man' does not exist on type '{}'.
        w.house_man.talkCount++
      }
    },
  ],
  tellOptions: [
    {
      test: function (p: any) { return true },
      script: function (p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        Quest.IO.msg("Mandy starts to tell the house-man about " + p.text + " but he pays no attention.")
      }
    },
  ],
})