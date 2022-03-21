import { Quest } from '../types/quest';
import { Cmd } from './_command';
import { msg } from './io';

const imagePane = {
  defaults: {
    imageStyle: {
      'background-color': '#ddd',
      border: '3px black solid',
      height: '400px',
      right: '0',
      top: '200px',
      width: '400px',
    },
  },
  toggle: true,
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultStyle' does not exist on type '{ ... Remove this comment to see the full error message
imagePane.defaultStyle = { display: 'block', position: 'fixed' };
// ts-error-fixed ts-migrate(2345) FIXME: Argument of type '{ toggle: boolean; defaults: { i... Remove this comment to see the full error message
Quest.IO.io.modulesToInit.push(imagePane);

// ts-error-fixed ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ toggle: ... Remove this comment to see the full error message
imagePane.init = function () {
  // First set up the HTMP page

  // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
  Object.assign(
    document.querySelector('#quest-image').style,
    imagePane.defaultStyle,
    Quest.Settings.settings.imageStyle,
  );
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'imageHeight' does not exist on type '{ p... Remove this comment to see the full error message
  Quest.Settings.settings.imageHeight = parseInt(
    Quest.Settings.settings.imageStyle.height,
  );
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'imageWidth' does not exist on type '{ pe... Remove this comment to see the full error message
  Quest.Settings.settings.imageWidth = parseInt(
    Quest.Settings.settings.imageStyle.width,
  );

  // Set the default values for settings
  for (const key in imagePane.defaults) {
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!settings[key]) settings[key] = imagePane.defaults[key];
  }
};

// ts-error-fixed ts-migrate(2339) FIXME: Property 'hide' does not exist on type '{ toggle: ... Remove this comment to see the full error message
imagePane.hide = function () {
  document.querySelector('#quest-image').style.display = 'none';
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'show' does not exist on type '{ toggle: ... Remove this comment to see the full error message
imagePane.show = function () {
  document.querySelector('#quest-image').style.display = 'block';
};

// ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
Quest.Commands.commands.unshift(
  new Cmd('MetaImages', {
    script() {
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'hideImagePane' does not exist on type '{... Remove this comment to see the full error message
      if (Quest.Settings.settings.hideImagePane) {
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#quest-images').style.display = 'block';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'hideImagePane' does not exist on type '{... Remove this comment to see the full error message
        delete Quest.Settings.settings.hideImagePane;
      } else {
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#quest-images').style.display = 'none';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'hideImagePane' does not exist on type '{... Remove this comment to see the full error message
        Quest.Settings.settings.hideImagePane = true;
      }
      // ts-error-fixed ts-migrate(2339) FIXME: Property 'calcMargins' does not exist on type '{ n... Remove this comment to see the full error message
      Quest.IO.io.calcMargins();
      // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
      msg(Quest.lang.done_msg);
    },
  }),
);
