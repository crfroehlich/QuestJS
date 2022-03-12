"use strict"



register('theatre', {
  book:'Twelfth Night',
  uniform:'a long, dark green dress, with ridiculous white ruffs at the cuffs and collar',
  smell:'There is an odd smell here; it reminds Mandy of hot asphalt, but not quite the same.',
  listen:'Mandy listens... Is that applause she hear faintly here?',
  floor:"The floor is wooden, and a little worn. Well-trodden, even.",
  walls:"The walls are a dirty cream colour; the paint is peeling in places.",
  ceiling:"The ceiling is white.",
})








// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("theatre", {
  windowsface:'none',
  alias:"theatre backstage",
  properNoun:true,
  desc:"This is a long, narrow room full of junk -- what looks like old stage scenery and props. It looks as though the exits northwest and southwest lead to the stage, whilst east heads back to the gallery.",
  afterEnter:function() {
  },
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  northwest:new Exit("theatre_stage", {msg:'Mandy heads northwest, through the side-left wing, onto the stage.'}),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  southwest:new Exit("theatre_stage", {msg:'Mandy heads southwest, through the side-right wing, onto the stage.'}),
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  east:new Exit("gallery_south"),
  scenery:[
    {alias:'scenery', examine:'There are several huge boards, each painted on both sides, presumably designed to go together to form either a country lane backdrop, or, when reversed, a room with panelled walls.'},
    {alias:['junk', 'props'], examine:'There is a table that is upside-down, with two chairs, a grandfather clock and a hatstand on it.'},
    {alias:'table', examine:'The table is wooden, and quite plain.'},
    {alias:'chairs', examine:'The chairs are made of dark wood, and are ornate, if rather shabby.'},
    {
      alias:['grandfather clock','box'], 
      examine:'On closer inspection the grandfather clock is actually a tall, narrow box, painted to look like a clock. There is no back to it; the box is empty.',
      windup:'Mandy is about to wind up the grandfather clock, when she realises it is just a stage prop - a box painted to look like a clock.',
      open:'The box that is painted to resemble a grandfather clock has no back to it; it is just an empty box.',
    },
  ],
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem('hatstand', SURFACE(), {
  examine:'The hatstand is wooden, and badly made; it is a wonder it is still together.{if:floppy_hat:loc:hatstand: There is a floppy hat on it.}',
  loc:'theatre',
  scenery:true,
  testDropIn:function(options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'floppy_hat' does not exist on type '{}'.
    if (options.item !== w.floppy_hat) return falsemsg("Mandy can only put hats on the hatstand - the clue is in the name.")

    return true
  },
})




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("theatre_stage", {
  windowsface:'none',
  alias:"theatre stage",
  desc:"{once:They say \"All the world's a stage\", but this bit definitely is, muses Mandy, realising she is indeed standing on a stage:Mandy is standing on a stage}. The curtain is up and bright lights are pointed at her, making it hard to see the rest of the theatre, but the chairs seem to be empty. As theatres go, it is not big, with a small balcony, and only a dozen or so rows in the stalls. Backstage is through the wings, northeast and southeast.",
  beforeFirstEnter:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("'Oh, what? Hey!' She is startled for a moment to see a figure standing on the stage. She is about to say something more articulate when she realises it is not moving.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    w.clockwork_thespian.loc = this.name
  },
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  west:new Exit("_", {use:util.cannotUse, msg:'Mandy heads west, towards the edge of the stage, intending to jump down into the stalls, but somehow cannot do it. As she gets nearer to the edge her steps get heavier and heavier -- it is almost like those bright lights are pushing her back.'}),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  northeast:new Exit("theatre", {msg:'Mandy heads northeast, through the side-left wing, to the backstage area.'}),
  // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
  southeast:new Exit("theatre", {msg:'Mandy heads southeast, through the side-right wing, to the backstage area.'}),
  scenery:[
    {alias:'lights', examine:'There are about a dozen lights shining directly on to the stage, from three points up on the ceiling. They are too bright for her to see anything behind them.'},
    {alias:'orchestra pit', examine:'Curiously, there is no orchestra pit.'},
    {alias:['seats', 'audience', 'rows', 'chairs'], examine:'Mandy scans the threatre again. There are perhaps three hundred seats, and they all seem to be empty.'},
    {alias:['balcony', 'gods'], examine:'The balcony looks to have three rows of seats.'},
    {alias:'stalls', examine:'There are about twelve rows of seats in the stalls.'},
    {alias:'curtain', examine:'Above her head, Mandy can see the red curtain.'},
    {alias:'box', examine:'There is no box on either side, Mandy notes.'},
    {alias:'frilly shirt', examine:"The {if:clockwork_thespian:state:0:mannequin:clockwork thespian}'s shirt is an off-white colour, with frills at the cuffs and down the front.", take:"The shirt has no buttons; it seems to have been sown on to the {if:clockwork_thespian:state:0:mannequin:clockwork thespian}."},
    {alias:'baggy trousers', examine:"The {if:clockwork_thespian:state:0:mannequin:clockwork thespian}'s trousers are a dark brown colour, and flare out around the thighs, before narrowing at the ankles.", take:"The trousers have no fastenings; they seem to have been sown on to the {if:clockwork_thespian:state:0:mannequin:clockwork thespian}."},
    {alias:'shoes', examine:"The {if:clockwork_thespian:state:0:mannequin:clockwork thespian}'s shoes are brown and leather, and pointed at the toe.", take:"The shoes cannot be taken while the {if:clockwork_thespian:state:0:mannequin:clockwork thespian} is standing in them."},
    {alias:['scenery','backdrop'], examine:'The backdrop is just a wall with three large{if:generic_window:bricked_up:, bricked-up} windows.'},
  ],
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("floppy_hat", WEARABLE(), {
  loc:"clockwork_thespian",
  examine:"The hat is not unlike a cowboy's, but made of softer material. It is black, with a wide brim.",
  afterWear:function(options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Patch' does not exist on type '{}'.
    if (options.char === w.Patch && !this.patchFlag) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy looks at Patch in his new hat. 'You look cool!'")
      this.patchFlag = true
    }
    if (options.char === player && !this.playerFlag) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy decides she likes the hat; it makes her feel very... Bohemian she decides. It is a shame there is no mirror here.")
      this.playerFlag = true
    }
  },   
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("clockwork_thespian", NPC(), CONTAINER(false), {
  alias:"theatre mannequin",
  synonyms:['theatre mannequin', 'clockwork thespian', 'cecil malewicz'],
  state:0,
  npc:false,
  testDropIn(options: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
    if (options.item !== w.large_key) return falsemsg("That is not something you can put in the keyhole. The clue is in the word \"keyhole\".")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
    if (w.large_key.size > 6) return falsemsg("The key is too large for the keyhole.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
    if (w.large_key.size < 6) return falsemsg("The key is too small for the keyhole.")
    return true
  },
  getAgreement:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    return falsemsg("'I have no time for that, girl! I have a show to prepare!'")
  },
  brevity:function() {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I've found it, the answer,' says Mandy triumphantly. 'It's \"Brevity\"!'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'{class:riddle:Perfect!} Indeed it is. I knew you would find it. And now I will tell you how to escape this house. Outside this small theatre is a long gallery, with a chess set on a table.'")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'chess_pieces' does not exist on type '{}... Remove this comment to see the full error message
      if (w.chess_pieces.gluedDownNoted) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I saw it. All the pieces are glued down.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Not all of them. The white k{class:riddle:night changes} the room if you twist it, takes you outside the house.'")
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I saw it.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'The white k{class:riddle:night changes} the room if you twist it, takes you outside the house.'")
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'white_knight' does not exist on type '{}... Remove this comment to see the full error message
      w.white_knight.active = true
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      w.clockwork_thespian.state = 102
  },
  examine:function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    if (w.clockwork_thespian.state === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The figure seems to have been manufactured to resemble a man of impressive proportions, in height, but also in the girth of his chest. And its groin too, Mandy notices with a wry smile. It, or he, is constructed of brass, and looks to be jointed. He is clothed in a frilly off-white shirt, and dark baggy trousers, as well as a floppy hat. Mandy notices there is a hole in the back of his shirt, and a corresponding hole in his back, where a simple, if large, key might fit.")
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The clockwork thespian seems to have been manufactured to resemble a man of impressive proportions, in height, but also in the girth of his chest. And his groin too, Mandy noticed with a wry smile. He is constructed of brass, and looks to be jointed. He is clothed in a frilly off-white shirt, and dark baggy trousers, as well as a floppy hat.")
    }
  },
  talkto:function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    if (w.clockwork_thespian.state === 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Hello!' says Mandy to the inanimate figure. There is no response.")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 1) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'So...' says Mandy, 'I don't suppose you can tell me how to get out of here?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I seek to know what the soul of wit is. If you can tell me what that is, then I shall help you as far as I am able.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'The soul of wit? I've no idea what you're talking about.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Come, come, it is a simple question. Any scholar of the bard should know it. You have one of his works in your bag. I must say, Twelfth Night is one of my favourites. Why do you feign ignorance?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("{i:No feigning here,} thinks Mandy. The bard, that has to be Shakespeare. She wishes she had actually read some of that stupid book. {if:shakespeare_book:state:0:Wait, did he say \"Twelfth Night\", that is not right. Her book is \"Antony and Cleopatra\". She has a feeling he wrote quite a few plays:Then again, she has a feeling he wrote quite a few plays}. 'So, remind me which play it was again.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Why, Hamlet of course, as you well know. Act 2, scene 2. Now quickly girl, answer the question, and we shall be done here.'")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      w.clockwork_thespian.state = 2
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 2) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Why do you need to know what the soul of wit is anyway?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'There are rules that must be obeyed. If I am to help you, then you must first do something for me. As to the exact question, well, I made that up myself. You are clearly a scholar of the bard, so I know it is easy for you, but for the riff-raff, it will be utterly beyond them.'")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      w.clockwork_thespian.state = 3
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 3) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'How do you know what's in my bag?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I just do. It is something you get use to when you've been here as long as I have. One might as well ask, how does one remember one's name. One just does.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'How long have you been here?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I don't really know, it is so hard to judge. It was the 3rd of October 1932 when I entered herein. To me, it feels as though at least two or three whole years have passed.'")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      w.clockwork_thespian.state = 4
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 4) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I'm not really a, er, scholar of the bard.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Ah, such modesty. So becoming in a young lady!'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'No, really. I know fuck all about Shakespeare, and I'm not much of a lady either!'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Oh. Oh, dear. That's unfortunate. I'm afraid once the question has been set, it cannot be unset.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Says who? Who makes up these stupid rules?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("He shrugged. 'That's just the way things are in The House. Perhaps you should look it up? In a library, maybe. I imagine there's a library...'")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      w.clockwork_thespian.state = 5
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 5) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy had nothing to say to the Clockwork Thespian at the moment.")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 101) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      w.clockwork_thespian.brevity()
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 102) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy has nothing to say to the Clockwork Thespian at the moment.")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 201) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'What the fuck?' says Mandy to the Clockwork Thespian indignantly. 'You said I'd be able to get out of this stupid house!'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'And indeed you did!'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I want to go home, you stupid jerk, not to some field full of dead people.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Of course, but it is a {i:process}. Going to the battlefield was a necessary part of that process.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Seriously?' pouts Mandy. 'So what's the next part of this stupid process then?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I would suggest there was something at the battlefield that will help you progress.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'The oar? I had that, but it did not come back with me.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Something else. Something that may help the passing of time...'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'What the..?'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'I can say no more.'")
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Of course not! Heaven forbid you could just tell me!'")
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      w.clockwork_thespian.state = 202
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    else if (w.clockwork_thespian.state === 202) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy has nothing to say to the Clockwork Thespian at the moment; she just gives the stupid thing a kick.")
    }
  },
  windup:function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
    if (w.large_key.loc !== player.name && w.large_key.loc !== this.name)  {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg("Mandy has nothing to wind up the mannequin with.")
    }
    else {
      return this.dowindup()
    }
  },
  dowindup:function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
    if (w.large_key.size < 6) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg("Mandy looks at the hole in the back of the inanimate figure; a square peg. Like it would fit the key she has -- only much bigger.")
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
    if (w.large_key.size > 6) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      return falsemsg("Mandy looks at the hole in the back of the inanimate figure; a square peg. Like it would fit the key she has -- if not {i:that} big.")
    }
    
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
    if (w.clockwork_thespian.state === 0) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
      if (w.large_key.loc !== 'clockwork_thespian') {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy looks at the hole in the back of the inanimate figure; a square peg. She puts the large key over it, and finds it is a good fit. What are the odds?")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
        w.large_key.loc = 'clockwork_thespian'
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("She gives the key in the back of the mannequin half a turn, with some effort. Another turn, and another, until it will turn no more. Suddenly, the figure moves, and Mandy jumps back, even though that is exactly what she is hoping for. He looks at her. 'Good day. I see you are a fellow thespian!' he says in a fruity voice.{if:floppy_hat:loc:player: 'And you seem to have my hat!'}")
      this.state = 1
      this.setAlias('clockwork thespian')
      this.npc = true
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("Mandy gives the clockwork thespian another couple of turns with the key. She does not want him winding down.")
    }
    return true
  },
  nameModifierFunction:function(list: any) {
    list.length = 0
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'floppy_hat' does not exist on type '{}'.
    if (w.floppy_hat.loc === this.name) list.push('wearing a floppy hat')
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'large_key' does not exist on type '{}'.
    if (w.large_key.loc === this.name) list.push('a large key in his back')
  },

  testTalk:function(text: any) {
    if (!this.npc) return falsemsg(text ? lang.cannot_ask_about : lang.cannot_talk_to, {item:this, char:player, text:text})
    return true
  },
  askOptions:[
    { name:'House',
      test:function(p: any) { return p.text.match(/escape|house/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
        if (w.clockwork_thespian.state < 2) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So...' says Mandy, 'I don't suppose you can tell me how to get out of here?'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I seek to know what the soul of wit is. If you can tell me what that is, then I shall help you as far as I am able.'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'The soul of wit? I've no idea what you're talking about.'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Come, come, it is a simple question. Any scholar of the bard should know it. You have one of his works in your bag. I must say, Twelfth Night is one of my favourites. Why do you feign ignorance?'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("{i:No feigning here,} thinks Mandy. The bard, that has to be Shakespeare. She wishes she had actually read some of that stupid book. {if:shakespeare_book:state:0:Wait, did he say \"Twelfth Night\", that is not right. Her book is \"Antony and Cleopatra\". She has a feeling he wrote quite a few plays:Then again, she has a feeling he wrote quite a few plays}. 'So, remind me which play it was again.'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Why, Hamlet of course, as you well know. Act 2, scene 2. Now quickly girl, answer the question, and we shall be done here.'")
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
          w.clockwork_thespian.state = 2
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So what's the deal with this house,' asks Mandy. 'Why can we not escape it?'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("The clockwork thespian gives a dramatic sign. 'Tis our lot in life,' he laments.")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Well that insight was a big help...'")
        }
      }
    },
    { name:'Fellow Thespian',
      test:function(p: any) { return p.text.match(/fellow/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Why did you say I'm a fellow thespian' asks Mandy.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I see you carry one of the Bard's plays. I must say, Twelfth Night is one of my favourites.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("The bard, thinks Mandy, that has to be Shakespeare. She wishes she had actually read some of that stupid book.{if:shakespeare_book:state:0: Wait, did he say \"Twelfth Night\", that is not right. Her book is \"Antony and Cleopatra\".}")
      }
    },
    { name:'Soul of wit',
      test:function(p: any) { return p.text.match(/wit/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'So... the soul of wit, the soul of wit... What was that again?' asks Mandy.")
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'white_knight' does not exist on type '{}... Remove this comment to see the full error message
        if (!w.white_knight.active) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'That is for you to determine, my dear,' declares the clockwork thespian. 'Tis a simple question.'")
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tis brevity, as you already said.'")
        }
      }
    },
    { // cock
      test:function(p: any) { return p.text.match(/cock|dick|penis|genitals/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("What would a clockwork thespian have... down below, Mandy muses. Anything at all? She is tempted to ask him, but it might be a sensitive subject, and really none of her business. Not to say, very embarrassing to ask about!")
      }
    },
    { // boots
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'boots' does not exist on type '{}'.
      test:function(p: any) { return p.text.match(/boots/) && w.boots.loc === player.name; },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What's the deal with these boots?' asks Mandy, holding up the pair of boots.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Well they're not mine, I can assure you of that! The owner of these must be quite the giant! And rather down on his luck, I would wager.'")
      }
    },
    { // key
      test:function(p: any) { return p.text.match(/key/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Can I have that key back?' asks Mandy. 'I got it from the clock in the dining room.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Oh, I see. I feel rather like I would prefer to keep it. Who knows what will happen if I am not kept constantly wound up? I would hate for it to go astray.'")
      }
    },
    { name:'Clockwork',
      test:function(p: any) { return p.text.match(/clockwork/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'So...' Mandy wonders what the social etiquette is when talking to someone who is clockwork. Why did none of her personal development lessons at Kyderbrook cover this? She decides to just go for it. 'So how come you are clockwork?' asks Mandy. 'I mean, I have you always...'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'An unfortunate situation,' admits the clockwork thespian. 'Twas not always so. Once I was flesh-and-blood, like yourself, until misfortune struck me down in my prime! I have been meaning to consult a physician about my condition, but have been unable to leave this accursed house.'")
      }
    },
    { name:'Theatre',
      test:function(p: any) { return p.text.match(/theatre/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What's the deal with the theatre?' asks Mandy. 'Are there ever shows?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Also no,' laments the clockwork thespian. 'The lights are on, but no audience awaits in rapt anticipation, no actors perform.'")
      }
    },
    { // shakespeare
      test:function(p: any) { return p.text.match(/shakespeare/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Tell me about Shakespeare,' says Mandy. 'What was he like?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I can assure you, I am not that old!' declares the clockwork thespian.")
      }
    },
    { name:'Himself',
      test:function(p: any) { return p.text.match(/himself|who he|clockwock|thespian/) || (p.text.match(/he is/) && p.text2 === 'who');},
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Tell me about yourself,' says Mandy. 'Like, have you always been... you know... clockwork?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Mine is a sorry tale!' declares the clockwork thespian. 'I was born Cecil Malewicz, eldest of three...")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Wait, \"Malewicz\"? So you're related to Winfield?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Indeed, my younger brother. Twas while I was visiting my brother that something utterly inexplicable happened, and I ended up here, in this sorry state, my illustrious career in the theatre brought to an abrupt stop in this mocking travesty of life.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'How sad.'")
      }
    },
    { // tiny man
      test:function(p: any) { return p.text.match(/bert|tiny man/); },
      script:function() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Who's the tiny man?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'If that is a reference to my...'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'What? No!' Mandy feels her cheeks redden. 'The small man who lives in the doll's house in the nursery.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Oh, well... I am afraid I an not familiar with the diminutive gentleman..'")
      }
    },
    { // malewicz
      test:function(p: any) { return p.text.match(/doctor|winfield|malewicz|man/); },
      script:function() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Do you know a Dr Winfield Malewicz?' says Mandy. 'I've got a letter for him.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Indeed I do, young lady. Indeed I do.' He pauses, presumably for dramatic effect - Mandy waits impatiently. 'He's my brother!'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Your brother? And is he... er... clockwork?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'No, no. That would be absurd! He is flesh-and-blood, like you and me!'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Right... And where would I find him?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Seems to spend most his time fiddling with that contraction of his. Steam operated analytical engine or some such nonsense. Find the steam engine and take the lift to the top. Nothing simpler, my dear.'")
      }
    },
    { // life
      test:function(p: any) { return p.text.match(/lift|elevator/); },
      script:function() {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Do you know to use the lift?' says Mandy.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Ah, yes, I do. It has a series of buttons, one corresponding to each floor. Jolly clever really.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I meant how do you get it to come down to your floor?'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Oh, I see. Well, there's another button beside the doorway. Simply press that, and then wait.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'This is the lift by the steam engine we are talking about? It has no button.'")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Have you checked? It did last time I looked.' It occurs to Mandy he could have been inanimate for decades; maybe the buttons disappeared during that time.")
      }
    },
    { // riddle
      test:function(p: any) { return p.text.match(/riddle/); },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'white_knight' does not exist on type '{}... Remove this comment to see the full error message
        if (!w.white_knight.active) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So... the soul of wit, the soul of wit... What was that again?' asks Mandy.")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'That is for you to determine, my dear,' declares the clockwork thespian. 'Tis a simple question.'")
        }
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'weird_room' does not exist on type '{}'.
        else if (w.weird_room.visited > 0) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Can you help me solve the riddle?'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tis brevity, as you already said.'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Not that one. The house's riddle: \"What direction?\".'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Ah, that. No more than I already have.'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'What does that mean? Have you already helped me?'")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'I can say no more, I'm afraid. It's {class:riddle:gotta be you}. Just remember that {class:riddle:one thing}.'")
        }
        else {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'So... the soul of wit, the soul of wit... What was that again?' asks Mandy.")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("'Tis \"brevity\", as you already said.'")
        }
      }
    },
    { name:'Mannequins',
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'brass_dining_room' does not exist on typ... Remove this comment to see the full error message
      test:function(p: any) { return p.text.match(/mannequin/) && w.brass_dining_room.visited > 2; },
      msg:"'What's the deal with the mannequins in the dining room?' This guy is a mannequin himself, so might have a clue, Mandy reasons.|'I'm afraid I have not ventured far from here. The rest of the house rather unnerves me, while here, on the stage, I feel at home.'",
    },
    { name:'Silvers',
      test:function(p: any) { return p.text.match(/silver/) && player.silverSpotted > 0; },
      msg:"'What's the deal with the Silvers - the guy in silver I saw?'|'I must admit, I do not know. They are very elusive, and yet I get the impression they are running the place!'",
    },
    {
      test:function(p: any) { return true },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'Tell me about " + p.text + "' says Mandy.")
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("'I'm sure I don't know about that!' declares the clockwork thespian.")
      }
    },
  ],
  tellOptions:[
    {
      test:function(p: any) { return true },
      script:function(p: any) {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy starts to tell the clockwork thespian about " + p.text + " but he pays no attention.")
      }
    },
  ],
})
