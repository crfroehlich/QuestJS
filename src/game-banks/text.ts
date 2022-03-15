"use strict"

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective("stasis_pod_status", function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'stasis_bay' does not exist on type '{}'.
  return w.stasis_bay.tpStatus()
})

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective("status", function (arr: any, params: any) {
  if (typeof params.char.status === "string") {
    return params.char.status === 'stasis' ? 'In stasis' : 'Deceased'
  }
  else {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'intervalDescs' does not exist on type '{... Remove this comment to see the full error message
    return Quest.Settings.settings.intervalDescs[Quest.Utilities.util.getByInterval(Quest.Settings.settings.intervals, params.char.status)]
  }
})

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective("table_desc", function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'canteen_table' does not exist on type '{... Remove this comment to see the full error message
  return w.canteen_table.tpDesc()
})


// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective("planet", function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  return PLANETS[w.Xsansi.currentPlanet].starName + PLANETS[w.Xsansi.currentPlanet].planet
})

// @ts-expect-error ts-migrate(2339) FIXME: Property 'addDirective' does not exist on type '{ ... Remove this comment to see the full error message
Quest.Text.addDirective("star", function (arr: any, params: any) {
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Xsansi' does not exist on type '{}'.
  return PLANETS[w.Xsansi.currentPlanet].starName
})

