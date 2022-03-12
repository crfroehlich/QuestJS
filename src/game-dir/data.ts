"use strict"

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("me", PLAYER(), {
  loc:"lounge",
  synonyms:['me', 'myself'],
  examine: "Just a regular guy.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("lounge", {
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("kitchen"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("master_bedroom"),
  ],
  desc:"A smelly room with an old settee and a tv.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
createItem("torch", TAKEABLE(), SWITCHABLE(false, 'providing light'), {
  loc:"lounge",
  examine:"A small black torch.",
  synonyms:["flashlight"],
  lightSource:function() {
    return this.switchedon ? world.LIGHT_FULL : world.LIGHT_NONE
  },
  eventPeriod:1,
  eventIsActive:function() {
    return this.switchedon
  },
  eventScript:function() {
    this.power--;
    if (this.power === 2) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The torch flickers.")
    }
    if (this.power < 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The torch flickers and dies.{once: Perhaps there is a charger in the garage?}");
      this.doSwitchoff()
    }
  },
  testSwitchOn () {
    if (this.power < 0) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("The torch is dead.")
      return false
    }
    return true
  },
  power:3,
  charge:function(options: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    if (options.char.loc != "garage") return falsemsg("There is nothing to charge the torch with here.")

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    msg("{pv:char:charge:true} the torch - it should last for hours now.", options)
    this.power = 20
    return true
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("garage_key", KEY(), {
  loc:"lounge",
  examine: "A big key.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("box", CONTAINER(), {
  loc:"lounge",
  examine: "A big box.",
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("phone", {
  loc:"me",
  examine: "Your phone.",
  saveLoadExcludedAtts:['internet', 'news'],
  verbFunction:function(list: any) {
    list.pop()
    list.push(player.onPhoneTo ? 'Hang up' : 'Contacts')
    list.push("Take photo",)
    list.push("Photo gallery")
    list.push("Search internet")
    list.push("News feed")
  },
  contacts:function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'isContact' does not exist on type '{}'.
    const contacts = scopeBy(parser.isContact)
    contacts.push('Never mind.')
    log(contacts)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    showMenuDiag('Who do you want to call?', contacts, function(result: any) {
      if (result === 'Never mind.') return
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
      w.phone.makeCall(result)
    });    
  },
  makeCall:function(npc: any) { 
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
    if (w.phone.loc !== player.name) return failedmsg("You cannot phone anyone without a phone.")
    if (!npc.npc) return failedmsg("Why would you want to phone {nm:item:the}?", {item:npc})
    if (!npc.phone) return failedmsg("You wish you had {nms:item:the} number in your phone.", {item:npc})
    if (npc.isHere()) return failedmsg("You think about phoning {nm:item:the}, but as {pv:item:be} is standing right here, that might look a bit odd.", {item:npc})
    if (player.onPhoneTo === npc.name) return failedmsg("You think about phoning {nm:item:the} - then remember you already are!", {item:npc})
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (player.onPhoneTo) return failedmsg("You think about phoning {nm:item:the} - then remember you are already on the phone to {nm:other:the}!", {item:npc, other:w[player.onPhoneTo]})

    if (npc.phone()) {
      player.onPhoneTo = npc.name
      return true
    }
    return false
  },
  hangUp:function() { 
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const npc = w[player.onPhoneTo]
    if (npc.phoneEnd) {
      npc.phoneEnd()
    }
    else {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      msg("You say your goodbyes to {nm:npc:the} and hang up.", {npc:npc})
    }
    delete player.onPhoneTo
  },
  gallery:[
    "A photo of you in a fetching bonnet sat on a garden seat, taken on Easter Sunday two years ago.",
    "A kitten playing with a ball of wool. You remember the stupid cat gave you quite a scratch just after you took the photo.",
    "You and Penny, outside the Royal Whistler, queuing to get inside on New Years Eve.",
  ],
  takephoto:function() {
    const subjects = scopeHereListed()
    subjects.push('Never mind.')
    log(subjects)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    showMenuDiag('What do you want a photo of?', subjects, function(result: any) {
      if (result === 'Never mind.') return
      if (result.photo) {
        result.photo()
      }
      else {
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
        msg("You take a photo of {nm:item:the} on your phone.", {item:result})
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
        w.phone.gallery.push(processText("A {random:out-of-focus:crooked:cool:artistic:indifference:poor:good:frankly awful} photo of {nm:item:the}.", {item:result}))
      }
    });    
  },
  photogallery:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You idly flick through the photos on your phone...")
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    for (const s of this.gallery) msg(s)
    return true
  },
  newsState:0,
  news:[
    {
      name:'Asteroid Heading to Earth',
      content:'Scientists in Lowther Junction are saying have detected an asteroid on a collision course with earth, due to arrive in three days.',
      weather:'The outlook for the next two days is generally fine with scattered showers, but on Tuesday expect high winds, dust storms and the end of the human race.',
    },  
    {
      name:'Asteroid Panic',
      content:'News of the impending end of the human race has led to wide-spread panic across the globe.',
      weather:'The outlook for the next two days is generally fine but with heavy showers, but on Tuesday expect high winds, dust storms and the end of the human race.',
    },  
    {
      name:'All a Big Joke!',
      content:'Scientists in Lowther Junction have now admitted that their reports about an asteroid heading for earth were just a joke.',
      weather:'The outlook for the week is generally fine with scattered showers, getting steadily heavier towards the end of the week.',
    },  
  ],
  newsfeed:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You check the news on your phone...")
    const news = this.news[this.newsState]
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("{b:" + news.name + ":} " + news.content)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("{b:Weather:} " + news.weather)
    return true
  },
  internet:{
    rabbit:"Rabbits are small mammals in the family Leporidae (along with the hare) of the order Lagomorpha (along with the pika).",
  },
  searchinternet:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    askDiag("Search the web", function(s: any) {
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("On your phone you search for \"" + s + "\".")
      const regex = RegExp(s)
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
      for (const key in w.phone.internet) {
        if (regex.test(key)) {
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
          msg("You find: {i:" + w.phone.internet[key] + "}")
          return true
        }
      }
      // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("You find nothing of interest.")
      return false      
    })
  },
  
})




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("master_bedroom", {
  desc:'A small, but snug bedroom.',
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("lounge"),
  ],
})




// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("kitchen", {
  desc:'A clean room, a clock hanging on the wall. There is a sink in the corner.',
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("garage"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("lounge"),
    // @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    new Exit('basement', {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'trapdoor' does not exist on type '{}'.
      isHidden:function() { return w.trapdoor.closed; },
    }),    
  ],
  afterFirstEnter:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("A fresh smell here!");
  },
})



// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("Lara", NPC(true), {
  loc:'kitchen',
  contact:true,
  phone:function() { 
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You phone Lara.")
    return true
  },
  verbFunction:function(list: any) {
    if (!this.isHere()) list.shift()
  },
  askOptions:[
    {
      test:function(p: any) { return p.text.match(/house/); }, 
      msg:"'I like it,' says Lara.",
    },
    {
      test:function(p: any) { return p.text.match(/garden/); },
      msg:"'Needs some work,' Lara says with a sigh. 'I'm hoping to grow carrots.",
    },
    {
      test:function(p: any) { return p.text.match(/garden/); },
      msg:"'I'm giving up hope of it ever getting sorted,' Lara says.",
    },
    {
      msg:"Lara has no interest in that.",
      failed:true,
    }
  ],
  talkto:function(list: any) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You chat to Lara about carrots for a while.")
  },
  photo:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg("You take a photo of Lara.")
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'phone' does not exist on type '{}'.
    w.phone.gallery.push(processText("A {random:nice:blurry:good:poor} photo of {nm:item:the} {random:smiling:looking cross:eating a carrot} in {nm:loc:the}.", {item:this, loc:currentLocation}))
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("trapdoor", OPENABLE(false), {
  loc:"kitchen",
  examine:"A small trapdoor in the floor.",
})







// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("garage", {
  desc:'An empty garage.',
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit('kitchen'),
  ],
})









// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("basement", {
  desc:"A dank room, with piles of crates everywhere.",
  darkDesc:"It is dark, but you can just see the outline of the trapdoor above you.",
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit('kitchen'),
  ],
  lightSource:function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'light_switch' does not exist on type '{}... Remove this comment to see the full error message
    return w.light_switch.switchedon ? world.LIGHT_FULL : world.LIGHT_NONE;
  },
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
createItem("light_switch", SWITCHABLE(false), { 
  loc:"basement",
  alias:"light switch",
  examine:"A switch, presumably for the light.",
})