import { Quest } from '../../types/quest';
import { log, warn } from '../logger';
import { Cmd } from './Cmd';

export class ExitCmd extends Cmd {
  dir: string;

  exitCmd = true;

  objects = [{ special: 'ignore' }, { special: 'ignore' }];

  constructor(name: string, dir: string, hash: any) {
    super(name, hash);
    this.dir = dir;
  }

  script(objects: any) {
    if (!Quest.World.currentLocation.hasExit(this.dir)) {
      const exitObj = Quest.lang.exit_list.find((el) => el.name === this.dir);
      // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      if (exitObj.not_that_way)
        return Quest.IO.failedmsg(exitObj.not_that_way, {
          char: Quest.World.player,
          dir: this.dir,
        });
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'customNoExitMsg' does not exist on type ... Remove this comment to see the full error message
      if (Quest.Settings.settings.customNoExitMsg)
        return Quest.IO.failedmsg(
          Quest.Settings.settings.customNoExitMsg(Quest.World.player, dir),
        );
      return Quest.IO.failedmsg(Quest.lang.not_that_way, {
        char: Quest.World.player,
        dir: this.dir,
      });
    }

    const ex = Quest.World.currentLocation.getExit(this.dir);
    if (typeof ex === 'object') {
      if (!Quest.World.player.testMove(ex)) {
        return Quest.World.world.FAILED;
      }
      if (typeof ex.use !== 'function') {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg(
          "Quest.World.Exit's 'use' attribute is not a function (or does not exist).",
        );
        log('Bad exit:');
        log(ex);
        return Quest.World.world.FAILED;
      }
      const flag = ex.use(Quest.World.player, ex);
      if (typeof flag !== 'boolean') {
        warn(
          `Quest.World.Exit on ${Quest.World.currentLocation.name} failed to return a Boolean value, indicating success or failure; assuming success`,
        );
        return Quest.World.world.SUCCESS;
      }
      if (flag && ex.extraTime) Quest.World.game.elapsedTime += ex.extraTime;
      return flag ? Quest.World.world.SUCCESS : Quest.World.world.FAILED;
    }

    Quest.IO.errormsg('Unsupported type for direction');
    return Quest.World.world.FAILED;
  }
}
