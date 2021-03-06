import { QuestClass } from '../../types/quest';
import { msg, falsemsg } from '../../lib/io';

export const init = (Quest: QuestClass) => {
  register('battlefield', {
    book: 'The Taming of the Shrew',
    listen: 'Mandy can hear nothing except the buzzing of the flies.',
    smell: 'Mandy tries her best not to smell anything, but the stench of death and rotting meat is everywhere.',
    uniform: 'a red uniform, that looks disturbing like the military uniform of the dead soldiers',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('battlefield', {
    afterEnter() {
      if (this.visited === 2) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Chess is supposed to be based on warfare or a metaphor or something, thinks Mandy. Perhaps that was why moving the horse on the chessboard brought her here.');
      }
      if (this.visited === 4) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('If the chessboard is a metaphor for this battle, and there is some kind of mystical link between then two, it occurs to Mandy that the knight she turned back in the house might be similarly linked to this dead horse.');
      }
    },

    afterFirstEnter() {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("'Shit,' mutters Mandy. This is certainly outside the house, but she has no idea where she is. Or even when; how long is it since horses were used in a war, or uniforms like that?");
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'clockwork_thespian' does not exist on ty... Remove this comment to see the full error message
      Quest.World.w.clockwork_thespian.state = 201;
    },

    desc: 'Mandy is standing on a small rise overlooking a battlefield, next to a dead horse. All around her there are corpses, some in red uniforms, some in blue uniforms; all are covered in blood and mud and flies. To the south is a beach, and beyond that a sea that looks strangely peaceful after the horrors all around here.',

    headingAlias: 'An Unknown Battlefield',

    scenery: [
      { alias: ['corpses', 'body', 'bodies', 'soldiers'], examine: 'There must be hundreds or even thousands of dead soldiers here. Mandy wonders how long ago the battle was; her forensic skills are not that great, but it cannot be more than a week or so; the bodies do not seem to have decayed at all.', parserPriority: 10 },
      { alias: ['red uniforms', 'red soldiers'], examine: 'The soldiers in red are armed with muskets; many have bayonets fitted. As well red jackets, they have white belts and helmets and black trousers and boots.' },
      { alias: ['blue uniforms', 'blue soldiers'], examine: 'The soldiers in blue are armed with muskets; many have bayonets fitted. As well blue jackets and trousers, they have black belts and boots, and blue hats that look like upturned flowerpots.' },
      { alias: 'flies', examine: 'The flies seem to be the big winner of this battle.' },
      { alias: 'blood', examine: 'There is blood everywhere! All the soldiers are covered in it, it is all over the ground. And where there is no blood, there is mud.' },
      { alias: 'mud', examine: 'There is mud everywhere! All the soldiers are covered in it, it is all over the ground. And where there is no mud, there is blood.' },
      { alias: 'beach', examine: 'The beach to the south looks like the sort of place that would be quite nice, if it were not for the corpses.' },
    ],
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('beach', { msg: 'Mandy picks her way carefully around the corpses, to the beach.' }),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('dead_horse', {
    beat: "Mandy hits the equine corpse, then does it again and again and again. After some time she realises it is have no effect. 'I'm flogging a dead horse,' she says.",
    examine: "{once:Mandy looks at the dead horse rather gingerly, slightly worried at what she will see. }There are no obvious wounds on the horse that she can see, but it is not breathing, and feels cold. It looks relatively small to Mandy's inexpert eye.",
    loc: 'battlefield',
    ride: "Mandy straddles the dead horse, and gives it's rump a good slap. 'Giddy up,' she says. The horse does not move, so she stands again.",
    scenery: true,
    shift: 'The horse is to heavy to move.',
    turn() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'oar' does not exist on type '{}'.
      if (!Quest.World.w.oar.isHeld()) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("{i:This can't be right,} thinks Mandy, as she tries to push the rump of the dead horse, to get it to turn. 'Shit!' It is too heavy to move. If she had a lever...");
        return false;
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg("{once:{i:This can't be right,} thinks Mandy. }She puts the oar under the rump of the dead horse. With a grunt, she jerks it up, and the hindquarters of the horse move a bit. With a shrug, she does it again, and again, slowly inching the back end of the horse round the front end...");
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('She lets go of the oar, and stands to take a breath, and suddenly the Quest.World.world dissolves around here.');
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('She is back in the house.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'oar' does not exist on type '{}'.
      Quest.World.w.oar.loc = 'battlefield';
      Quest.World.player.loc = 'gallery';
      Quest.World.world.update();
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
      Quest.World.world.enterRoom();
      return true;
    },
    withUse(char: any, obj: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'oar' does not exist on type '{}'.
      if (obj !== Quest.World.w.oar) return falsemsg('Mandy wonder how she ould use {nm:item:the} on the horse.', { item: obj });
      return this.turn();
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('beach', {
    desc: 'The beach would be nice if it were not the dead soldiers; there seem to be more blue-uniformed ones here than red. The sand looks fine and almost white, {ifNot:beach:paddleFlag:and the sea to the south looks very inviting}{if:beach:paddleFlag:though the sea full of corpses is not exactly inviting}. There might be a way along the beach through the bodies to the southwest, or she could go back north to the dead horse.{if:sand_item:sandcastleBuilt: There is an impressive sandcastle in the middle of a relative corpse-free area.}',
    headingAlias: 'A Sandy Beach',

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    in: new Quest.World.Exit('_', {
      isHidden() {
        return Quest.World.w.chamber_pot.loc !== 'sea';
      },
      use(char: any) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg("Mandy carefully steps into her chamber pot boat... Which promptly capsizes! 'Shit,' she screams, now drenched in the filthy water. 'Well that was a fucking stupid idea,' she mutters to herself, as she steps back on dry land, dragging the chamber-pot-that-is-definitely-not-a-boat behind her.");
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
        Quest.World.w.chamber_pot.loc = 'beach';
        return false;
      },
    }),

    isSourceOf(fluid: any) {
      return fluid === 'sand' || fluid === 'water';
    },

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    north: new Quest.World.Exit('battlefield', { msg: 'Mandy heads back up the small rise, carefully stepping around the corpses.' }),

    paddleFlag: false,

    scenery: [
      { alias: 'corpses', examine: 'There must be hundreds or even thousands of dead soldiers here. Mandy wonders how long ago the battle was; her forensic skills are not that great, but it cannot be more than a week or so; the bodies do not seem to have decayed at all.' },
      { alias: 'red uniforms', examine: 'The soldiers in red are armed with muskets; many have bayonets fitted. As well red jackets, they have white belts and helmets and black trousers and boots.' },
      { alias: 'blue soldiers', examine: 'The soldiers in blue are armed with muskets; many have bayonets fitted. As well blue jackets and trousers, they have black belts and boots, and red hats that look like upturned flowerpots.' },
      { alias: 'flies', examine: 'The flies seem to be the big winner of this battle.' },
    ],

    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    south: new Quest.World.Exit('_', {
      alsoDir: ['swim'],
      use(char: any) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
        msg('Mandy is about to paddle in the sea, when she sees a corpse floating nearby, surrounded by clouds of red. And another over there. And... lots of corpses. Perhaps the sea is not so inviting.');
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'beach' does not exist on type '{}'.
        Quest.World.w.beach.paddleFlag = true;
        return false;
      },
    }),
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    southwest: new Quest.World.Exit('rocky_beach'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('sea', Quest.Templates.CONTAINER(), {
    examine: 'The sea looks nice from a distance, but now she almost has her toes in it, Mandy can see the bits of mutilated bodies in it; not so enticing.',
    loc: 'beach',
    scenery: true,
    testDropIn(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (options.item !== Quest.World.w.chamber_pot || Quest.World.w.chamber_pot.size !== 7) return falsemsg("The thought of putting anything in that filthy water makes Mandy's stomach turn.");
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.chamber_pot.containedFluidName) return falsemsg('Mandy wonders if the chamber pot would make a boat. Not while it is full of {show:fluid} of course.', { fluid: Quest.World.w.chamber_pot.containedFluidName });
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy carefully puts the enormous chamber pot into the water; it floats!');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.loc = 'sea';
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('sand_item', {
    alias: 'sand',
    build(options: any) {
      return this.play(options);
    },
    dig(options: any) {
      return this.play(options);
    },
    examine: 'The sand looks great for playing in. Mandy remembers building sandcastles and just digging holes in sand like this when she was kid.',
    kick(options: any) {
      return this.smash(options);
    },
    loc: 'beach',
    play(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'sandcastle' does not exist on type '{}'.
      if (Quest.World.w.sandcastle.loc) return falsemsg('Mandy looks at her sandcastle. Perhaps that is enough playing for now.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'sandcastle' does not exist on type '{}'.
      return Quest.World.w.sandcastle.build();
    },
    scenery: true,
    smash(options: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy spends a few minutes kicking sand. It does not achieve anything, but she feels better for it.');
      return true;
    },
    take(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (!Quest.World.w.chamber_pot.isHeld()) return falsemsg('Mandy scoops up some sand in her hand, and watches as it slowly falls through her fingers.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.chamber_pot.containedFluidName === 'sand') return falsemsg('Mandy things about getting more sand, but chamber pot is already full, she will not be able to carry more.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      if (Quest.World.w.chamber_pot.containedFluidName) return falsemsg('Mandy thinks about getting some sand, but the chamber pot is already full; she would need to empty it first.');

      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy scoops up a load of sand into the chamber pot.');
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'chamber_pot' does not exist on type '{}'... Remove this comment to see the full error message
      Quest.World.w.chamber_pot.containedFluidName = 'sand';
      return true;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('sandcastle', Quest.Templates.CONSTRUCTION(), {
    buildAtLocation: true,
    buildPrecheck(options: any) {
      if (this.loc) return falsemsg(Quest.lang.construction_already, options);
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (options.char.loc !== 'beach') return falsemsg('Mandy laments that she is not on a sandy beach, and is therefore unable build a sandcastle.');
      return true;
    },
    examine: 'The sandcastle looks pretty good, to Mandy\'s eye; four squat towers, connected by thick walls and surrounded by a moat. Well, a ditch that will {i:become} a moat when the tide comes in.',
    kick(options: any) {
      return this.smash(options);
    },
    msgConstruction: 'Mandy wonders if she has time to play in the sand. She gives a shrug. She is on a beach in the nineteenth century. It will be over a century until she is born! She finds a patch of beach that is relatively free of blood and bodies, and where the sand is just slightly damp, and sits down. She spends the best part of an hour building a sandcastle. It is not as easy as she remembers - but she is just using her hands, rather than bucket and spade.|She stands up to inspect her work. Pretty damn good!',
    smash(options: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('With a big grin, Mandy kicks the sandcastle, again and again, until no trace is left.');
      delete this.loc;
      return true;
    },
    synonyms: ['sand castle'],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('rocky_beach', {
    desc: 'The beach is all rocks here, close to the headland, further from the shoreline. On the plus side, there are definitely fewer corpses here.{once: Mandy wonders if the blue army arrived by sea, landing where the beach is sandy, and getting shot as they disembarked, before pushing the reds back.} She can see the battered remains of a boat here.',

    headingAlias: 'A Rocky Beach',
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    northeast: new Quest.World.Exit('beach'),
    scenery: [
      { alias: 'corpses', examine: 'There must be hundreds or even thousands of dead soldiers here. Mandy wonders how long ago the battle was; her forensic skills are not that great, but it cannot be more than a week or so; the bodies do not seem to have decayed at all.' },
      { alias: 'red uniforms', examine: 'The soldiers in red are armed with muskets; many have bayonets fitted. As well red jackets, they have white belts and helmets and black trousers and boots.' },
      { alias: 'blue soldiers', examine: 'The soldiers in blue are armed with muskets; many have bayonets fitted. As well blue jackets and trousers, they have black belts and boots, and red hats that look like upturned flowerpots.' },
      { alias: 'flies', examine: 'The flies seem to be the big winner of this battle.' },
      { alias: 'rocks', examine: 'The rocks are rocks.' },
    ],
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('battered_boat', {
    examine: 'The boat is a wreck -- really just bits of broken wood -- but might have been about four metres long, with perhaps two or three sets of rowers.{if:oar:scenery: It looks like only one of the oars has survived.}',
    loc: 'rocky_beach',
    scenery: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('oar', Quest.Templates.TAKEABLE(), {
    examine: 'The oar is made of solid wood, and about a metre long.',
    // cannot get taken to size change rooms
    loc: 'rocky_beach',
    repair: 'Mandy takes a good look at the boat; it is beyond repair she decides.',
    scenery: true,
    use() {
      if (Quest.World.player.loc === 'battlefield') {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'dead_horse' does not exist on type '{}'.
        return Quest.World.w.dead_horse.turn();
      }
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg('Mandy wonders how she can use the oar... Perhaps she can find a boat?');
      return false;
    },
  });
}
