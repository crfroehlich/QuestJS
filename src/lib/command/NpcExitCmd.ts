import { Quest } from '../../types/quest';
import { Cmd } from './Cmd';

export class NpcExitCmd extends Cmd {
  dir: string;

  exitCmd = true;

  objects = [
    { attName: 'npc', scope: Quest.Parser.parser.isHere },
    { special: 'ignore' },
    { special: 'ignore' },
  ];

  constructor(name: string, dir: string, hash: any) {
    super(name, hash);
    this.dir = dir;
  }

  script(objects: any) {
    const npc = objects[0][0];
    if (!npc.npc)
      return Quest.IO.failedmsg(Quest.lang.not_npc, {
        char: Quest.World.player,
        item: npc,
      });
    if (!Quest.World.currentLocation.hasExit(this.dir)) {
      const exitObj = Quest.lang.exit_list.find((el) => el.name === this.dir);
      if (exitObj.not_that_way) {
        return Quest.IO.failedmsg(exitObj.not_that_way, {
          char: npc,
          dir: this.dir,
        });
      }
      return Quest.IO.failedmsg(Quest.lang.not_that_way, {
        char: npc,
        dir: this.dir,
      });
    }

    const ex = Quest.World.currentLocation.getExit(this.dir);
    if (typeof ex !== 'object') {
      Quest.IO.errormsg('Unsupported type for direction');
      return Quest.World.world.FAILED;
    }

    if (npc.testMove && !npc.testMove(ex)) {
      return Quest.World.world.FAILED;
    }
    if (!npc.getAgreement('Go', ex)) {
      return Quest.World.world.FAILED;
    }

    const flag = ex.use(npc, ex);
    if (flag) npc.pause();
    return flag ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
  }
}
