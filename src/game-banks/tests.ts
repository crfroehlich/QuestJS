"use strict";

// @ts-expect-error ts-migrate(2339) FIXME: Property 'resetOnCompletion' does not exist on typ... Remove this comment to see the full error message
test.resetOnCompletion = false


// @ts-expect-error ts-migrate(2339) FIXME: Property 'tests' does not exist on type '{}'.
test.tests = function () {

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Planet Analysis")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  w.Xsansi.currentPlanet = 2
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  const response = { char: w.Ostap }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("'Not as interesting as the last one, I think.'", planetAnalysis(response))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  w.Ostap.rank2 = 4
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("'There are things a live here, but buried. There's bacteria in the soil. But it is not primitive bacteria. I cannot say for sure - I know only Earth bacteria - but I think this is highly evolved. I think some disaster, an extinction event, has wiped out virtually all life. This is all that survives.'", planetAnalysis(response))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  w.Ostap.rank2 = 8
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("'It is sad; a whole planet dead - or virtually dead. Sad that we missed them, sad they all died. This is why this mission is so important, so mankind can spread to the stars before something like this happens on Earth.'", planetAnalysis(response))
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  w.Ostap.rank2 = 0


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Probe events 1")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = true;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testOutput' does not exist on type '{}'.
  test.testOutput = [];

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  w.Xsansi.currentPlanet = 2
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  w.Ostap.deployProbeOverallTotal = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  w.Ostap.deployProbeTotal = 1
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'probe_prototype' does not exist on type ... Remove this comment to see the full error message
  const probe = w.probe_prototype.cloneMe(w.Ostap)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Ostap", probe.owner)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Bio-probe I", probe.alias)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("In flight", probe.status)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, probe.launchCounter)
  probe.eventScript()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("In flight", probe.status)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, probe.launchCounter)
  for (let i = 0; i < TURNS_TO_LANDING - 1; i++) probe.eventScript()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, w.Ostap.rank2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, w.me.bonus)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Landing", probe.status)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(TURNS_TO_LANDING, probe.launchCounter)
  probe.eventScript()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("Exploring", probe.status)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1 + TURNS_TO_LANDING, probe.launchCounter)


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Probe events 2")
  for (let i = 0; i < 4; i++) probe.eventScript()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, w.Ostap.rank2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, w.me.bonus)
  for (let i = 0; i < 4; i++) probe.eventScript()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(2, w.Ostap.rank2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(4, w.me.bonus)
  for (let i = 0; i < 8; i++) probe.eventScript()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, w.Ostap.rank2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(6, w.me.bonus)
  for (let i = 0; i < 4; i++) probe.eventScript()
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(3, w.Ostap.rank2)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(6, w.me.bonus)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  w.Ostap.rank2 = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Ostap' does not exist on type '{}'.
  w.Ostap.deployProbeOverallTotal = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  w.Xsansi.currentPlanet = 0
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'testing' does not exist on type '{}'.
  Quest.Utilities.test.testing = false;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual("'Bio-probe I has successfully landed on the planet.' announces Xsansi.", test.testOutput[0])


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'start' does not exist on type '{}'.
  test.start("Spacesuit")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("o", ["You climb out of the stasis pod.", "The stasis bay", /^There are six/, "A drawer under the pod slides open to reveal your jumpsuit."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get jumpsuit", ["You take your jumpsuit.", "The stasis pod drawer slides shut."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear jumpsuit", ["You put on your jumpsuit."]);

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("open locker", ["You open the locker. Inside it you can see a spare spacesuit, a sealant spray and your spacesuit.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get spa", ["You take your spacesuit.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear spa", ["You can't put your spacesuit on over your jumpsuit.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("remove j", ["You take your jumpsuit off.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear s", ["You put on your spacesuit.", "'Satellite I has successfully entered orbit around the planet.' announces Xsansi.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You can't go starboard.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("a", ["You head aft.", "The cargo bay", "The cargo bay is a large, open area, with numerous crates, several with their own stasis fields. Yellow lines on the floor indicate access ways to be kept clear. The ship's airlock is to port, whilst engineering is aft. The stasis bay is forward, and to starboard, stairs lead up to the top deck, where the living quarters are.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("starboard", ["You head starboard.", "The airlock", "The airlock is just big enough for two persons wearing spacesuits, and is featureless besides the doors, port and starboard, and the controls.",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ai, evac airlock", ["'Evacuating the airlock... Room is now under vacuum.'",])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("port", "The door to the cargo bay will not open while it is pressurised and the airlock is not.")



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'start' does not exist on type '{}'.
  test.start("Planet one")

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ai about crew", test.padArray(["'Tell me about the crew, Xsansi,' you say."], 4));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("o", ["You climb out of the stasis pod.", "The stasis bay", /^There are six/, "A drawer under the pod slides open to reveal your jumpsuit."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("get jumpsuit", ["You take your jumpsuit.", "The stasis pod drawer slides shut."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("wear jumpsuit", ["You put on your jumpsuit."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Go to Ostap")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("a", ["You head aft.", "The cargo bay", /^The cargo bay is/]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("u", ["You walk up the narrow stair way to the top deck.", "The top deck aft", /^The top deck is where the living quarters/]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("f", ["You head forward.", "The top deck forward", /^You are standing at the forward end /, "'Satellite I has successfully entered orbit around the planet.' announces Xsansi."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about probes", "There doesn't seem to be anything you might call 'ostap' here.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", ["You head starboard.", "The canteen", /^The canteen/, "You can see Ostap here."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x chair", ["It's just scenery."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x table", "The table is plastic, attached to the wall at one end, and held up by a single leg at the other end. The table is bare.");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about bio-probes", test.padArray(["'How does a bio-probe work?' you ask Ostap."], 2));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about his health", ["'How are you feeling?' you ask Ostap.", "'I am feeling good.'"]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Order launch");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ostap, launch 19 probes", ["'Launch 19 bio-probes,' you say to Ostap.", "'We only have 16 and we should save some for the other planets on our itinerary.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ostap, launch 2 bio-probe", ["'Launch 2 bio-probes,' you say to Ostap.", "'Okay captain.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Ostap leaves the canteen, heading port."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("p", ["You head port.", "The top deck forward", "You are standing at the forward end of a narrow corridor, with your cabin to port, and the canteen to starboard. Ahead, is the lounge.", "You can see Ostap here.", "Ostap leaves the top deck forward, heading down."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("d", ["You head down.", "The hallway", /^This is, in a sense, the central nexus of the ship./, "You can see Ostap here.", "Ostap leaves the hallway, heading down."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("d", ["You head down.", "The Forward probe hanger", /^The forward probe hanger is where the satellites/, "You can see Kyle and Ostap here.", "Ostap leaves the Forward probe hanger, heading aft."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("a", ["You head aft.", "The Aft probe hanger", /^The aft probe hanger has/, "You can see Ostap here.", "'Okay, two probes to deploy...' mutters Ostap as he types at the console."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Launching");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Ostap prepares the first bio-probe."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about lost probes", ["'Do we ever lose probes?' you ask Ostap.", /^'We are exploring the unknown, we have to expect /])
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about planet", ["'What's your report on HD 154088D?' you ask Ostap.", "'So, this one does not look so interesting,' he replies. 'I think we see nothing more than bacteria here - maybe not even that.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about lost probes", ["'Do we ever lose probes?' you ask Ostap.", /^'We are exploring the unknown/]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("topics for ostap", ["Some suggestions for what to ask Ostap about: background; expertise; health; planet; probes."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Ostap launches the first bio-probe."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Ostap prepares the second bio-probe."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Ostap launches the second bio-probe."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "'Okay, two probes launched,' says Ostap as he stands up.", "'Bio-probe I has successfully landed on the planet.' announces Xsansi."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Waiting")
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes..."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "'Contact with Bio-probe II has been lost as it attempted to land on the planet.' announces Xsansi."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about lost probes", ["'What does Xsansi mean by \"contact lost\" with that probe?' you ask Ostap.", /^'We are exploring the unknown/]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about planet", ["'What's your report on HD 154088D?' you ask Ostap.", "'So, this one does not look so interesting,' he replies. 'I think we see nothing more than bacteria here - maybe not even that.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("topics ostap", ["Some suggestions for what to ask Ostap about: background; expertise; health; lost probe; planet; probes."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(0, w.Ostap.relationship);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about himself", ["'Tell me about yourself,' you say to Ostap.", /^'I'm from Nastasiv, near Ternopil.'/]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, w.Ostap.relationship);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about himself", ["'Tell me about yourself,' you say to Ostap.", /^'I'm from Nastasiv, near Ternopil.'/]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertEqual' does not exist on type '{}'... Remove this comment to see the full error message
  test.assertEqual(1, w.Ostap.relationship);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about planet", ["'What's your report on HD 154088D?' you ask Ostap.", "'So far, we see nothing. No life, no green. Perhaps bacteria living below the surface?'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ostap about jjjj", ["Ostap has no interest in that."]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Ostap to stasis");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ostap, go in stasis pod", ["'Ostap, you're work here is done; you can go get in your stasis pod.'", "'Right, okay then.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Ostap leaves the Aft probe hanger, heading forward."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("f", test.padArray([], 5));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("u", test.padArray([], 5));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("s", test.padArray([], 5));
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ostap, stop", ["'Ostap, forget what I said; don't get in your stasis pod yet.'", "'Oh, okay.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ostap, stop", ["'Ostap, stop what you're doing.'", "'Not really doing anything.'"]);


  // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{}'.
  test.title("Waiting 2");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", "Time passes...");
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", "Time passes...");

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("l", ["The stasis bay", /All pods are currently open/, "You can see Ostap here."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ostap, go in stasis pod", ["'Ostap, you're work here is done; you can go get in your stasis pod.'", "'Right, okay then.'"]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", ["Time passes...", "Just in his underwear, Ostap climbs into his stasis pod."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("x ostap", ["Ostap is a big guy; not fat, but broad and tall. He keeps his dark hair in a short ponytail. He is in his underwear. He is lying in his stasis pod.", "'Close the pod, Xsansi,' Ostap says. The stasis pod lid smoothly lowers, and Xsansi operates the stasis field."]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("l", ["The stasis bay", /Ostap's stasis pod is closed/]);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("ask ai about crew", [
    "'Tell me about the crew, Xsansi,' you say.", "'Crew member Ostap's designation is: biology. His current status is: In stasis.'",
    "'Crew member Aada's designation is: geology. Her current status is: perfect. Her current location is: the Women's cabin.'",
    "'Crew member Kyle's designation is: coms. His current status is: good. His current location is: the Forward probe hanger.'",
    "'Crew member Ha-yoon's designation is: engineering. Her current status is: good. Her current location is: Engineering (starboard).'",
  ])

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'assertCmd' does not exist on type '{}'.
  test.assertCmd("z", "Time passes...");


  /* */
};
