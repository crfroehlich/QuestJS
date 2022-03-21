import { IIo, IIoClass }     from '../types/iquest';
import { Quest }             from '../types/quest';
import { settings }          from './_settings';
import { log, error, trace } from './logger';


export const IO: IIo = {
  ambient,
  askDiag,
  askText,
  blankLine,
  clearScreen,
  commentmsg,
  createAdditionalPane,
  debugmsg,
  draw,
  endTurnUI,
  errormsg,
  failedmsg,
  falsemsg,
  hr,
  metamsg,
  msg,
  msgBlankLine,
  msgDiv,
  msgHeading,
  msgPre,
  msgTable,
  parsermsg,
  printError,
  rawPrint,
  showDiag,
  showMenu,
  showMenuDiag,
  showMenuWithNumbers,
  showYesNoMenu,
  sound,
  video,
  wait,
};

Quest.IO = IO;
