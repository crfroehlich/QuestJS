// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('stasis_pod_status', (arr, params) => 
// ts-error-fixed ts-migrate(2339) FIXME: Property 'stasis_bay' does not exist on type '{}'.
Quest.World.w.stasis_bay.tpStatus());
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('status', (arr, params) => {
    if (typeof params.char.status === 'string') {
        return params.char.status === 'stasis' ? 'In stasis' : 'Deceased';
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'intervalDescs' does not exist on type '{... Remove this comment to see the full error message
    return Quest.Settings.settings.intervalDescs[Quest.Utilities.util.getByInterval(Quest.Settings.settings.intervals, params.char.status)];
});
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('table_desc', (arr, params) => 
// ts-error-fixed ts-migrate(2339) FIXME: Property 'canteen_table' does not exist on type '{... Remove this comment to see the full error message
Quest.World.w.canteen_table.tpDesc());
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('planet', (arr, params) => 
// ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
PLANETS[Quest.World.w.Xsansi.currentPlanet].starName + PLANETS[Quest.World.w.Xsansi.currentPlanet].planet);
// ts-error-fixed ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective('star', (arr, params) => 
// ts-error-fixed ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
PLANETS[Quest.World.w.Xsansi.currentPlanet].starName);
//# sourceMappingURL=text.js.map