import { Quest } from '../../types/quest';
import { Cmd } from './Cmd';

// Use only for NPC commands that you are not giving your
// own custom script attribute. Commands must be an order to a single
// NPC in the form verb-object.
export class NpcCmd extends Cmd {
  constructor(name: string, hash: any) {
    super(name, hash);
    if (!this.cmdCategory) {
      this.cmdCategory = name;
    }
  }

  script(objects: any) {
    const npc = objects[0][0];
    if (!npc.npc) {
      Quest.IO.failedmsg(Quest.lang.not_npc, {
        char: Quest.World.player,
        item: npc,
      });
      return Quest.World.world.FAILED;
    }
    let success = false;
    let handled;
    if (objects.length !== 2) {
      Quest.IO.errormsg(
        `The command ${this.name} is trying to use a facility for NPCs to do it, but there is no object list; this facility is only for commands in the form verb-object.`,
      );
      return Quest.World.world.FAILED;
    }
    const multiple =
      objects[1].length > 1 || Quest.Parser.parser.currentCommand.all;
    for (const obj of objects[1]) {
      const options = { char: npc, item: obj, multiple };
      if (!npc.getAgreement(this.cmdCategory, obj, this)) {
        continue;
      }
      if (!obj[this.attName]) {
        this.default(options);
      } else {
        let result = this.processCommand({ char: npc, item: obj, multiple });
        if (result === Quest.World.world.SUCCESS_NO_TURNSCRIPTS) {
          result = true;
        }
        success = result || success;
      }
    }
    if (success) {
      npc.pause();
      return this.noTurnscripts
        ? Quest.World.world.SUCCESS_NO_TURNSCRIPTS
        : Quest.World.world.SUCCESS;
    }

    return Quest.World.world.FAILED;
  }
}
