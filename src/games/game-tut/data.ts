import { QuestClass } from '../../types/quest';

export const init = (Quest: QuestClass) => {
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

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('coin', Quest.Templates.TAKEABLE(), {
    examine: 'A gold coin.',
    loc: 'lounge',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('glass_cabinet', Quest.Templates.CONTAINER(), {
    examine: 'A cabinet with a glass front',
    loc: 'lounge',
    transparent: true,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
  Quest.World.createItem('ornate_doll', Quest.Templates.TAKEABLE(), Quest.Templates.LOCKED_WITH('cabinet_key'), {
    examine: 'A fancy doll, eighteenth century.',
    loc: 'glass_cabinet',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('boots', Quest.Templates.WEARABLE(), {
    examine: 'Some old boots.',
    loc: 'lounge',
    pronouns: Quest.lang.pronouns.plural,
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('Lara', Quest.NPC.NPC(true), {
    examine: 'A normal-sized rabbit.',
    loc: 'lounge',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
  Quest.World.createItem('torch', Quest.Templates.TAKEABLE(), Quest.Templates.SWITCHABLE(false, 'providing light'), {
    charge(options: any) {
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (options.char.loc != 'garage') return Quest.IO.falsemsg('There is nothing to charge the torch with here.');

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

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('cabinet_key', Quest.Templates.KEY(), {
    examine: 'A small brass key.',
    loc: 'garage',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('garage_door', Quest.Templates.LOCKED_DOOR('garage_key', 'kitchen', 'garage'), {
    examine: 'The door to the garage.',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createItem('charger', {
    examine: 'A device bigger than a washing machine to charge a torch? It has a compartment and a button. {charger_state}.',
    loc: 'garage',
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 4.
  Quest.World.createItem('charger_compartment', Quest.Templates.COMPONENT('charger'), Quest.Templates.CONTAINER(true), {
    alias: 'compartment',
    examine: 'The compartment is just the right size for the torch. It is {if:charger_compartment:closed:closed:open}.',
    testDropIn(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
      const contents = Quest.World.w.charger_compartment.getContents();
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
      if (contents.length > 0) return Quest.IO.falsemsg('The compartment is full.');

      return true;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('charger_button', Quest.Templates.COMPONENT('charger'), {
    alias: 'button',
    examine: 'A big red button.',
    push(options: any) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
      if (!Quest.World.w.charger_compartment.closed || Quest.World.w.torch.loc !== 'charger_compartment') return Quest.IO.falsemsg('{pv:char:push:true} the button, but nothing happens.', options);

      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
      Quest.IO.msg('{pv:char:push:true} the button. There is a brief hum of power, and a flash.', options);
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'torch' does not exist on type '{}'.
      Quest.World.w.torch.power = 20;
      return true;
    },
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 2.
  Quest.World.createRoom('basement', {
    darkDesc: 'It is dark, but you can just see the outline of the trapdoor above you.',
    desc: 'A dank room, with piles of crates everywhere.',

    lightSource() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'light_switch' does not exist on type '{}... Remove this comment to see the full error message
      return Quest.World.w.light_switch.switchedon ? Quest.World.world.LIGHT_FULL : Quest.World.world.LIGHT_NONE;
    },
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    up: new Quest.World.Exit('kitchen'),
  });

  // ts-error-fixed ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
  Quest.World.createItem('light_switch', Quest.Templates.SWITCHABLE(false), {
    alias: 'light switch',
    examine: 'A switch, presumably for the light.',
    loc: 'basement',
  });
}
