import { Quest } from './types/quest';
import './lib/_settings';
import './lib/_util';
import './lang/lang-en';
import './lib/_file_saver';
import './lib/_saveload';
import './lib/_text';
import './lib/_io';
import './lib/_command';
import './lib/_defaults';
import './lib/_templates';
import './lib/_world';
import './lib/_npc';
import './lib/_parser';
import './lib/_commands';
import { init as initCloak } from './games/game-cloak';

let folder = window.location.hash.replace('#', '') || 'game-cloak';
if (window.location.search) {
  folder += `-${window.location.search.substring(1)}`;
}

switch (folder) {
  case 'game-cloak':
    initCloak(Quest);
    break;
  default:
    console.log('nope');
    break;
}

Quest.World.world.init();
Quest.IO.io.init();

const select: HTMLSelectElement | null = document.getElementById('quest-select') as HTMLSelectElement;
if (select) {
  select.value    = folder;
  select.onchange = () => {
    // window.location.hash = select.value;
    // window.location.reload();
  };
}
