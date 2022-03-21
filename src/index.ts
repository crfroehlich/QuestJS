import { init as initCloak } from './games/game-cloak';
import './lang/lang-en';
import { log } from './lib/logger';
import './lib/_commands';
import './lib/_defaults';
import './lib/_file_saver';
import {init as initIO } from'./lib/_io';
import './lib/_npc';
import './lib/_parser';
import './lib/_saveload';
import './lib/_settings';
import './lib/_templates';
import './lib/_text';
import './lib/_util';
import './lib/_world';
import { Quest } from './types/quest';

let folder = window.location.hash.replace('#', '') || 'game-cloak';
if (window.location.search) {
  folder += `-${window.location.search.substring(1)}`;
}

switch (folder) {
  case 'game-cloak':
    initCloak(Quest);
    break;
  default:
    log('nope');
    break;
}

Quest.World.world.init();
initIO();

const select: HTMLSelectElement | null = document.getElementById(
  'quest-select',
) as HTMLSelectElement;
if (select) {
  select.value = folder;
  select.onchange = () => {
    // window.location.hash = select.value;
    // window.location.reload();
  };
}
