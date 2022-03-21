import { getNodeByQuery } from '../../components/lib/dom';
import { DEFINITE }       from '../../types/enums';
import { IoState }        from './IoState';

export class IoToolbar extends IoState {
  // Create Toolbar
  createToolbar() {
    let el = getNodeByQuery('toolbar');
    if (!el) {
      const div = document.createElement('div');
      div.setAttribute('id', 'toolbar');
      // div.classList.add('button')
      div.classList.add('toolbar');
      document
        .querySelector('body')
        .insertBefore(div, getNodeByQuery('main'));
      el                                      = getNodeByQuery('toolbar');
      getNodeByQuery('main').style.paddingTop = '30px';
      getNodeByQuery('panes').style.top       = '36px';
    }

    let html                = '';
    const [one, two, three] = this.settings.toolbar;
    html                   += `<div class="left">${this.getToolbarHTML(one)}</div>`;
    html                   += `<div class="middle">${this.getToolbarHTML(two)}</div>`;
    html                   += `<div class="right">${this.getToolbarHTML(three)}</div>`;
    el.innerHTML            = html;
  }

  getToolbarHTML(data: any) {
    if (data.room) {
      return this.util.sentenceCase(
        this.lang.getName(this.w[this.player.loc], {
          article: DEFINITE,
        }),
      );
    }
    if (data.title) {
      return `<b><i>${this.settings.title}</i></b>`;
    }
    if (data.content) {
      return data.content();
    }
    if (data.buttons) {
      let s = '';
      for (const el of data.buttons) {
        const js = el.cmd ? `Quest.Utilities.runCmd('${el.cmd}')` : el.onclick;
        s       += ` <a class="link" onclick="${js}"><i class="fas ${el.icon}" title="${el.title}"></i></a>`;
      }
      return s;
    }
    return '';
  }
}
