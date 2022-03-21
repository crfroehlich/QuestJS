import { Quest } from '../../types/quest';

export {
  init,
  falsemsg,
  msg,
  updateStatus,
  metamsg,
  hr,
  errormsg,
  failedmsg,
  askDiag,
  showMenuDiag,
  createAdditionalPane,
  clickExit,
  wait,
  finish,
  parsermsg,
  blankLine,
  debugmsg,
} from './util';

(() => {
  if (Quest.Settings.settings.playMode !== 'dev') {
    window.onbeforeunload = (event: any) => {
      // event.returnValue = "Are you sure?";
    };
  }
  Quest.Settings.settings.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  Quest.Settings.settings.autoscroll = !Quest.Settings.settings.mediaQuery.matches;
})();
