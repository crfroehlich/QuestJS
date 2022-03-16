/*
Quest.Commands.commands.unshift(new Quest.Command.Cmd('Charge', {
  npcCmd:true,
  regex:/^(?:charge|power) (.+)$/,
  objects:[
    {scope:Quest.Parser.parser.isHeld}
  ],
  defmsg:"{pv:item:'be:true} not something you can charge.",
}))
*/

// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('charger_state', () => {
// ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
  if (Quest.World.w.charger_compartment.closed) {
    return 'The compartment is closed';
  }
  // ts-error-fixed ts-migrate(2339) FIXME: Property 'charger_compartment' does not exist on t... Remove this comment to see the full error message
  const contents = Quest.World.w.charger_compartment.getContents();
  if (contents.length === 0) {
    return 'The compartment is empty';
  }
  return `The compartment contains ${Quest.Utilities.formatList(contents, { article: Quest.Utilities.INDEFINITE, lastJoiner: 'and' })}`;
});
