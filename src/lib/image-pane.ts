"use strict"




const imagePane = {
  toggle: true,
  defaults: {
    imageStyle: {
      right: '0',
      top: '200px',
      width: '400px',
      height: '400px',
      'background-color': '#ddd',
      border: '3px black solid',
    },
  }
}



// @ts-expect-error ts-migrate(2339) FIXME: Property 'defaultStyle' does not exist on type '{ ... Remove this comment to see the full error message
imagePane.defaultStyle = { position: 'fixed', display: 'block' }
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ toggle: boolean; defaults: { i... Remove this comment to see the full error message
io.modulesToInit.push(imagePane)

// @ts-expect-error ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ toggle: ... Remove this comment to see the full error message
imagePane.init = function () {
  // First set up the HTMP page

  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  Object.assign(document.querySelector('#quest-image').style, imagePane.defaultStyle, Quest.Settings.settings.imageStyle)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'imageHeight' does not exist on type '{ p... Remove this comment to see the full error message
  Quest.Settings.settings.imageHeight = parseInt(Quest.Settings.settings.imageStyle.height)
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'imageWidth' does not exist on type '{ pe... Remove this comment to see the full error message
  Quest.Settings.settings.imageWidth = parseInt(Quest.Settings.settings.imageStyle.width)

  // Set the default values for settings
  for (let key in imagePane.defaults) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (!settings[key]) settings[key] = imagePane.defaults[key]
  }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'hide' does not exist on type '{ toggle: ... Remove this comment to see the full error message
imagePane.hide = function () { document.querySelector('#quest-image').style.display = 'none' }
// @ts-expect-error ts-migrate(2339) FIXME: Property 'show' does not exist on type '{ toggle: ... Remove this comment to see the full error message
imagePane.show = function () { document.querySelector('#quest-image').style.display = 'block' }



// @ts-expect-error ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
commands.unshift(new Quest.Command.Cmd('MetaImages', {
  script: function () {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideImagePane' does not exist on type '{... Remove this comment to see the full error message
    if (Quest.Settings.settings.hideImagePane) {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#quest-images').style.display = 'block'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideImagePane' does not exist on type '{... Remove this comment to see the full error message
      delete Quest.Settings.settings.hideImagePane
    }
    else {
      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      document.querySelector('#quest-images').style.display = 'none'
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'hideImagePane' does not exist on type '{... Remove this comment to see the full error message
      Quest.Settings.settings.hideImagePane = true
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'calcMargins' does not exist on type '{ n... Remove this comment to see the full error message
    io.calcMargins()
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    msg(Quest.lang.done_msg)
  },
}))



