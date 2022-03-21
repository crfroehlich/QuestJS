import { IExitList } from '../../types/iquest';

export abstract class IoLib {
  // Display Icons for compas
  public static displayIconsCompass(exit: IExitList) {
    const datatransform = exit.rotate
      ? ' style="transform: rotate(40deg)"'
      : '';
    return `<i class="fas ${exit.symbol}"${datatransform}></i>`;
  }
}
