"use strict"

Quest.Text.addDirective("armour", function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'armourScaling' does not exist on type '{... Remove this comment to see the full error message
  return (params[arr[0] ? arr[0] : 'item'].armour / Quest.Settings.settings.armourScaling).toFixed(1)
})

Quest.Text.addDirective("lore", function (arr: any, params: any) {
  return Quest.World.player.activeEffects.includes('Lore') ? arr[1] : arr[0]
})

// @ts-expect-error ts-migrate(2551) FIXME: Property 'signalResponse_destroy' does not exist o... Remove this comment to see the full error message
Quest.RPG.rpg.signalResponse_destroy = function () {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{ list: nev... Remove this comment to see the full error message
  this.msg("{nv:item:be:true} dispelled.", { item: this })
  Quest.RPG.rpg.destroy(this)
}