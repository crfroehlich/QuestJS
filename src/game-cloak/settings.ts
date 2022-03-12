"use strict"

// About your game
// @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ perform... Remove this comment to see the full error message
settings.title = "Cloak of Darkness"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'author' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.author = "The Pixie"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'version' does not exist on type '{ perfo... Remove this comment to see the full error message
settings.version = "0.3"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'thanks' does not exist on type '{ perfor... Remove this comment to see the full error message
settings.thanks = []
// @ts-expect-error ts-migrate(2339) FIXME: Property 'ifid' does not exist on type '{ performa... Remove this comment to see the full error message
settings.ifid = '1F95711E-44DE-4C57-AA30-0BAB292E5874'

settings.panes = 'none'

settings.roomTemplate = [
  "#{cap:{hereName}}",
  "{hereDesc}",
  "{objectsHere:You can see {objects} here.}",
]

// @ts-expect-error ts-migrate(2339) FIXME: Property 'styleFile' does not exist on type '{ per... Remove this comment to see the full error message
settings.styleFile = 'style'
