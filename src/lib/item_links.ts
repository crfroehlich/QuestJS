import { Quest } from '../types/quest';

// @DOC
// ## ITEM LINKS LIB
//
// VERSION 0.11
//
// AUTHOR: KV
//
// DESCRIPTION:  Add hyperlink functionality to [QuestJS](https://github.com/ThePix/QuestJS)
//
// (Documentation generated by [PixDocs](https://github.com/ThePix/PixDocs))
//
//---
//
// ##### **NOTE**
//
// #####  This library is now included in [QuestJS](https://github.com/ThePix/QuestJS) as of QuestJS version 0.4, but this library is not loaded by default.
//
// #####  View [the setup instructions](https://github.com/ThePix/QuestJS/wiki/Hyperlinks).
//
//---
// @UNDOC

/*
Developer comments

There are two parts to this, exits and items.

Exits is trivial; we just subvert the text processor directive that states the exits;
have it disable all the existing exits, then output the new ones with links added.

Items is far more complex...

This is what the HTML looks like. The object is in the first child of the child span, with the verbs collected in the second.
JS dataset attributes are used to store data, including all the options sent to Quest.lang.getName, so we can reproduce it.

This means if the item changes its alias, the text could get changed.

<span class="object-link dropdown"
      data-objname="book"
      data-article="1"
      data-lastjoiner="and"
      data-modified="true"
      data-nothing="nothing"
      data-loc="lounge"
      data-sep=",">
  <span class="object-link dropdown" data-objname="book" data-article="1" data-lastjoiner="and" data-modified="false" data-nothing="nothing" data-loc="lounge" data-sep=",">
    <span onclick="itemLinks.itemClick(this)" obj="book" class="droplink" name="book-link">
      a book
    </span>
    <span obj="book" class="dropdown-content">
      <span obj="book-verbs-list-holder">
        <span class="list-link-verb" onclick="itemLinks.itemLinkClick(this)" data-linkverb="Examine" data-objname="book" data-objalias="book">
          Examine
        </span>
        <span class="list-link-verb" onclick="itemLinks.itemLinkClick(this)" data-linkverb="Take" data-objname="book" data-objalias="book">
          Take
        </span>
      </span>
    </span>
  </span>
</span>

*/

// @DOC
// ### Function: _itemLinks.update_()
//
// Keeps the verb links and exit links updated after each turn.
//
//---
// @UNDOC
const itemLinks = {};
// ts-error-fixed ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message
Quest.IO.io.modulesToUpdate.push(itemLinks);

// ts-error-fixed ts-migrate(2339) FIXME: Property 'update' does not exist on type '{}'.
itemLinks.update = function () {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'linksEnabled' does not exist on type '{ ... Remove this comment to see the full error message
  if (!Quest.Settings.settings.linksEnabled) return;

  for (const el of document.querySelectorAll('.object-link')) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const obj = Quest.World.w[el.dataset.objname];
    if (obj.scopeStatus.canReach || obj.scopeStatus.visible) {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'disableItemLink' does not exist on type ... Remove this comment to see the full error message
      itemLinks.disableItemLink(el);
    } else {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'updateItemLinks' does not exist on type ... Remove this comment to see the full error message
      itemLinks.updateItemLinks(el);
    }
  }
};

// @DOC
// Returns **&lt;STRING&gt;**
//
// - all available verbs for the item.
//
// **PARAM:**
//
// - ```obj``` - **&lt;OBJECT&gt;** The in-game item
//
//---
// ts-error-fixed ts-migrate(2339) FIXME: Property 'getVerbsLinks' does not exist on type '{... Remove this comment to see the full error message
itemLinks.getVerbsLinks = function (obj) {
  if (!obj.getVerbs) return;  // if a room

  const verbArr = obj.getVerbs();
  let s         = '';
  for (const o of verbArr) {
    s += '<span class="list-link-verb" onclick="itemLinks.itemLinkClick(this)" ';
    s += `data-linkverb="${o}" data-objname="${obj.name}" data-objalias="${obj.alias}">${Quest.Utilities.sentenceCase(o)}</span>`;
  }
  return s;
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'itemClick' does not exist on type '{}'.
itemLinks.itemClick = function (el) {
  const originallyShown = el.nextSibling.style.display === 'block';

  for (const el of document.querySelectorAll('.dropdown-content')) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'style' does not exist on type 'Element'.
    el.style.display = 'none';
  }
  if (!originallyShown) el.nextSibling.style.display = 'block';
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'itemLinkClick' does not exist on type '{... Remove this comment to see the full error message
itemLinks.itemLinkClick = function (el) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'toggleDisplay' does not exist on type '{... Remove this comment to see the full error message
  Quest.IO.io.toggleDisplay(el.parentNode.parentNode);
  Quest.Utilities.runCmd(`${el.dataset.linkverb} ${el.dataset.objalias}`);
};

// @DOC
//  Disables the item link class. (Used when an item is out of scope.)
//
// **PARAM:**
//
// - ```el``` - **&lt;OBJECT&gt;** The HTML element
//
//---
// ts-error-fixed ts-migrate(2339) FIXME: Property 'disableItemLink' does not exist on type ... Remove this comment to see the full error message
itemLinks.disableItemLink = function (el) {
  el.children[0].removeAttribute('onclick');
  el.classList.remove('object-link');
  el.classList.remove('dropdown');
  el.children[0].classList.remove('droplink');
  // el.style.cursor = 'default'
};

// @DOC
//  Enables the item link class.  (Used when an item is in scope.)
//
// **PARAM:**
//
// - ```el``` - **&lt;OBJECT&gt;** The HTML element
//
//---
// ts-error-fixed ts-migrate(2339) FIXME: Property 'updateItemLinks' does not exist on type ... Remove this comment to see the full error message
itemLinks.updateItemLinks = function (el) {
// ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const obj   = Quest.World.w[el.dataset.objname];
  const alias = el.children[0].innerHTML;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'nameTransformer' does not exist on type ... Remove this comment to see the full error message
  el.innerHTML = Quest.Settings.settings.nameTransformer(alias, obj);
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'updateItemLinks2' does not exist on type... Remove this comment to see the full error message
itemLinks.updateItemLinks2 = function (el) {
// ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const obj     = Quest.World.w[el.dataset.objname];
  const options = {};
  // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  for (const key in el.dataset) options[key] = Quest.Utilities.util.guessMyType(el.dataset[key]);
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'modified' does not exist on type '{}'.
  options.modified = false;
  el.innerHTML     = Quest.lang.getName(obj, options);
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'disableAllLinks' does not exist on type ... Remove this comment to see the full error message
itemLinks.disableAllLinks = function (className) {
  for (const el of document.querySelectorAll(`.${className}`)) {
    el.removeAttribute('onclick');
    el.classList.remove(className);
  }
};

// @DOC
// ### Function: _tp.text_processors.exits(arr, params)
//
//  Modified to return a string containing a list of exit links.
//
// Returns **&lt;STRING&gt;**
//
// - string with a list of exit links
//
// **PARAMS:**
//
// - ```arr``` - **&lt;ARRAY&gt;** TODO: Ask Pixie how to describe this.
//
// - ```params``` - **&lt;OBJECT&gt;** TODO: Ask Pixie how to describe this.
//
// ---
// @UNDOC
// ts-error-fixed ts-migrate(2339) FIXME: Property 'exitsHere' does not exist on type '{}'.
Quest.Text.text_processors.exitsHere = function (arr, params) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'disableAllLinks' does not exist on type ... Remove this comment to see the full error message
  itemLinks.disableAllLinks('exit-link');
  // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const list = Quest.World.w[Quest.World.player.loc].getExitDirs().map((el) => `<span class="exit-link" onclick="Quest.Utilities.runCmd('${el}')">${el}</span>`);
  return Quest.Utilities.formatList(list, { lastJoiner: Quest.lang.list_or, nothing: Quest.lang.list_nowhere });
};

// Set to ```true``` by this library to enable the links
// ts-error-fixed ts-migrate(2339) FIXME: Property 'linksEnabled' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Settings.settings.linksEnabled = true;

// ts-error-fixed ts-migrate(2345) FIXME: Argument of type '() => void' is not assignable to... Remove this comment to see the full error message
Quest.Settings.settings.afterFinish.push(() => {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'disableAllLinks' does not exist on type ... Remove this comment to see the full error message
  itemLinks.disableAllLinks('exit-link');
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'disableAllLinks' does not exist on type ... Remove this comment to see the full error message
  itemLinks.disableAllLinks('dropdown');
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'disableAllLinks' does not exist on type ... Remove this comment to see the full error message
  itemLinks.disableAllLinks('droplink');
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'disableAllLinks' does not exist on type ... Remove this comment to see the full error message
  itemLinks.disableAllLinks('cmd-link');
});

// @DOC
// Used by Quest.lang.getName to add HTML link tags, etc
//
// Returns **&lt;STRING&gt;**
//
// - The item's link
//
// **PARAMS:**
//
// - ```alias``` - **&lt;STRING&gt;** The iitem's name, as prepared by Quest.lang.getName
// - ```obj``` - **&lt;OBJECT&gt;** The in-game item
//
//---
// ts-error-fixed ts-migrate(2339) FIXME: Property 'nameTransformer' does not exist on type ... Remove this comment to see the full error message
Quest.Settings.settings.nameTransformer = function (alias, obj, options) {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'linksEnabled' does not exist on type '{ ... Remove this comment to see the full error message
  if (!Quest.Settings.settings.linksEnabled) return alias;

  let s = `<span class="object-link dropdown" data-objname="${obj.name}"`;
  // for (const key in options) s += ` data-${key}="${options[key]}"`
  s += '><span onclick="itemLinks.itemClick(this)" ';
  s += `obj="${obj.name}" class="droplink" name="${obj.name}-link">${alias}</span>`;
  s += `<span obj="${obj.name}" class="dropdown-content">`;
  s += `<span obj="${obj.name}-verbs-list-holder">`;
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'getVerbsLinks' does not exist on type '{... Remove this comment to see the full error message
  s += itemLinks.getVerbsLinks(obj);
  s += '</span></span></span>';
  return s;
};

// @DOC
// [Back to top](#item-links-lib)
// @UNDOC
