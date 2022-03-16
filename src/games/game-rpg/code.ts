Quest.Text.addDirective('armour', (arr: any, params: any) =>
// ts-error-fixed ts-migrate(2339) FIXME: Property 'armourScaling' does not exist on type '{... Remove this comment to see the full error message
  (params[arr[0] ? arr[0] : 'item'].armour / Quest.Settings.settings.armourScaling).toFixed(1));

Quest.Text.addDirective('lore', (arr: any, params: any) => (Quest.World.player.activeEffects.includes('Lore') ? arr[1] : arr[0]));

// ts-error-fixed ts-migrate(2551) FIXME: Property 'signalResponse_destroy' does not exist o... Remove this comment to see the full error message
Quest.RPG.rpg.signalResponse_destroy = function () {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'msg' does not exist on type '{ list: nev... Remove this comment to see the full error message
  this.msg('{nv:item:be:true} dispelled.', { item: this });
  Quest.RPG.rpg.destroy(this);
};
