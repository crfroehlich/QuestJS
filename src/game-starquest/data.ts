"use strict"


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("bridge", {
  headingAlias:"Bridge",
  desc:"This is the the brains of the Star Quest; this is where everything across the rest of the ship is controlled. In the centre is the command chair, surrounded by the workstations for each of the bridge officers. At the front, the view screen gives a panoramic view  of {if:ship:arrivedAtSector:space:the inside of the stardock}.",
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("quarters"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("crew_lounge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("med_bay"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("science_labs"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("engineering"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("shuttle_bay"),
  ],  
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("quarters", {
  headingAlias:"Captain's Quarters",
  desc:"This is the the brains of the Star Quest; this is where everything across the rest of the ship is controlled. In the centre is the command chair, surrounded by the workstations for each of the bridge officers. At the front, the view screen gives a panoramic view  of {if:ship:arrivedAtSector:space:the inside of the stardock}.",
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("bridge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("crew_lounge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("med_bay"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("science_labs"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("engineering"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("shuttle_bay"),
  ],  
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("crew_lounge", {
  headingAlias:"Crew Lounge",
  desc:"This is where the crew relax. And eat and drink.",
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("bridge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("quarters"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("med_bay"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("science_labs"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("engineering"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("shuttle_bay"),
  ],  
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("med_bay", {
  headingAlias:"Medical Bay",
  desc:"Any medical situation is handled here. There are four beds, all equipped with a bio-scanner.",
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("bridge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("quarters"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("crew_lounge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("science_labs"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("engineering"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("shuttle_bay"),
  ],  
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("science_labs", {
  headingAlias:"Science Labs",
  desc:"While data from the external scanners can be analysed from the bridge, sometimes more detail is required - and that involves getting an item to the labs.",
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("bridge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("quarters"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("crew_lounge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("med_bay"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("engineering"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("shuttle_bay"),
  ],  
})

// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("engineering", {
  headingAlias:"Engineering",
  desc:"Engineering is dominated by the flux torus, which is the engine the moves the ship through hyperspace. Inside the doughnut-shaped device, the Q-flux is maintained at incredible high temperatures, and contained within EM-fields. However, that is all hidden away behind the alulead shielding.|All the ship's power is also taken from the flux torus.",
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("bridge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("quarters"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("crew_lounge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("med_bay"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("science_labs"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("shuttle_bay"),
  ],  
})


// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createRoom("shuttle_bay", {
  headingAlias:"Shuttle Hanger",
  desc:"The ship has two shuttle craft, each capable of holding six persons. There is an additional bay to allow shuttles from other ships.",
  dests:[
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("bridge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("quarters"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("crew_lounge"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("med_bay"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("science_labs"),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    new Exit("engineering"),
  ],  
})





// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("stars_mainscreen", {
  alias:'Forward view',
  isAtLoc:function(loc: any, situation: any) { return situation === world.PARSER && loc === 'bridge' },
  examine:function() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg('On the mainscreen you see a field of stars, and familiar constellations you can see from earth, though brighter and more constant and so many more of them.')
  },
})







// @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
createItem("ship", {
  showStarMap:false,
  dateTime:0,
  onView:'stars_mainscreen',
  getDateTime:function(add: any) { 
    let n = (854 * 360 + 63) * 24 + 5
    if (add) {
      if (typeof add === 'string') add = parseInt(add)
      n += add
    }
    else {
      n += this.dateTime
    }
    return Math.floor(n / 24 / 360) + "." + (Math.floor(n / 24) % 360) + "." + (n % 24)
  },
  hullIntegrity:100,
  shields:101,
  getShields:function() {
    if (this.shields <= 0) return '<b>Failed</b>'
    if (this.shields === 101) return '<i>Off</i>'
    return this.shields + '%'
  },
  //currentSystem:'sol',
  currentLocation:'stardock',
  alert:0,
  alerts:['grey', 'Yellow', 'Orange', 'Red'],
  getAlert:function() {
    const c = this.alerts[this.alert]
    return this.alert ? '<span style="border:black 1px solid;background-color:' + c + ';">&nbsp;' + c + '&nbsp;</span>' : '-'
  },
  afterLoad:function() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ship' does not exist on type '{}'.
    if (w.ship.arrivedAtSector) {
      // load missions
    }
  },
})  
  