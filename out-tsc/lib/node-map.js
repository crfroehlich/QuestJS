import { Quest } from '../types/quest';
// ts-error-fixed ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'map'.
const map = {
    defaults: {
        mapBorderColour: 'black',
        mapCellSize: 20,
        mapExitColour: '#444',
        mapExitWidth: 3,
        mapLabelColour: 'black',
        mapLabelOffset: 15,
        mapLocationColour: 'yellow',
        mapScale: 25,
        mapTextColour: 'black',
    },
    toggle: true,
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'defaultStyle' does not exist on type '{ ... Remove this comment to see the full error message
map.defaultStyle = { display: 'block', position: 'fixed' }; // !!!!!!!!!!!!!!
// ts-error-fixed ts-migrate(2345) FIXME: Argument of type '{ toggle: boolean; defaults: { m... Remove this comment to see the full error message
Quest.IO.io.modulesToUpdate.push(map);
// ts-error-fixed ts-migrate(2345) FIXME: Argument of type '{ toggle: boolean; defaults: { m... Remove this comment to see the full error message
Quest.IO.io.modulesToInit.push(map);
// Authors can override this so there are several starting locations if there are isolated regions
// ts-error-fixed ts-migrate(2339) FIXME: Property 'getStartingLocations' does not exist on ... Remove this comment to see the full error message
map.getStartingLocations = function () {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapAutomapFrom' does not exist on type '... Remove this comment to see the full error message
    const starts = Quest.Settings.settings.mapAutomapFrom ? Quest.Settings.settings.mapAutomapFrom.map((el) => Quest.World.w[el]) : [Quest.World.w[Quest.World.player.loc]];
    let count = 0;
    for (const start of starts) {
        start.mapX = 0;
        start.mapY = 0;
        start.mapZ = 0;
        start.mapRegion = count;
        count++;
    }
    return starts;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'transitUpdate' does not exist on type '{... Remove this comment to see the full error message
map.transitUpdate = function (location, transitButton, callEvent) {
    location.mapCurrentConnection = location.locations.findIndex((el) => el.connectedRoom.name === transitButton.transitDest);
    if (location.mapCurrentConnection === -1) {
        // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        Quest.IO.errormsg(`Failed to find a location called "${transitButton.transitDest}"`);
        console.log(location.locations);
        return;
    }
    const loc = location.locations[location.mapCurrentConnection];
    // set these so we can get the player location
    location.mapX = loc.mapX;
    location.mapY = loc.mapY;
    location.mapZ = loc.mapZ;
    location.mapRegion = loc.mapRegion;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'init' does not exist on type '{ toggle: ... Remove this comment to see the full error message
map.init = function () {
    // First set up the HTMP page
    // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
    Object.assign(document.querySelector('#quest-map').style, map.defaultStyle, Quest.Settings.settings.mapStyle);
    // document.querySelector("<style>")
    //    .prop("type", "text/css")
    //    .innerHTML = ".map-text " + Quest.Utilities.util.dictionaryToCss(Quest.Settings.settings.mapLabelStyle, true)
    //    .appendTo("head")
    // document.querySelector('.map-text').style.color = 'red'
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapHeight' does not exist on type '{ per... Remove this comment to see the full error message
    Quest.Settings.settings.mapHeight = parseInt(Quest.Settings.settings.mapStyle.height);
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapWidth' does not exist on type '{ perf... Remove this comment to see the full error message
    Quest.Settings.settings.mapWidth = parseInt(Quest.Settings.settings.mapStyle.width);
    // Set the default values for settings
    for (const key in map.defaults) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!settings[key])
            settings[key] = map.defaults[key];
    }
    // rooms is a list of rooms to be mapped
    // set it up with some seed rooms
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapGetStartingLocations' does not exist ... Remove this comment to see the full error message
    const rooms = Quest.Settings.settings.mapGetStartingLocations ? Quest.Settings.settings.mapGetStartingLocations() : map.getStartingLocations();
    // go through each room in the list
    while (rooms.length > 0) {
        // get the next room
        const room = rooms.shift();
        // go through each exit
        for (const dir of Quest.lang.exit_list) {
            // we are only interested in compass and vertical, and if the exit exists
            if (dir.type !== 'compass' && dir.type !== 'vertical')
                continue;
            if (!room.hasExit(dir.name))
                continue;
            // For this exit, skip if flagged to ignore or points to non-room
            const exit = room[dir.name];
            if (exit.mapIgnore)
                continue;
            if (exit.name === '_')
                continue;
            // For the exit destination, skip if flagged to ignore
            // otherwise map it
            // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const exitRoom = Quest.World.w[exit.name];
            if (!exitRoom)
                throw new Error(`Mapping to unknown exit: ${exit.name}`);
            if (exitRoom.mapIgnore) {
                exit.mapIgnore = true;
                continue;
            }
            if (exitRoom.mapMoveableLoc || room.mapMoveableLoc) {
                exit.mapMoveableLoc = true;
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapMultiRoomFromExit' does not exist on ... Remove this comment to see the full error message
                map.mapMultiRoomFromExit(room, exitRoom, exit, dir);
            }
            else {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapRoomFromExit' does not exist on type ... Remove this comment to see the full error message
                map.mapRoomFromExit(room, exitRoom, exit, dir, rooms);
            }
            if (exitRoom.mapMoveableLoc && !exitRoom.mapDraw) {
                // ts-error-fixed ts-migrate(2339) FIXME: Property 'moveableLocDraw' does not exist on type ... Remove this comment to see the full error message
                exitRoom.mapDraw = map.moveableLocDraw;
            }
        }
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'layers' does not exist on type '{ toggle... Remove this comment to see the full error message
    map.layers = [
        // rooms on other levels
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapBorderColour' does not exist on type ... Remove this comment to see the full error message
        { attrs: `stroke="${Quest.Settings.settings.mapBorderColour}" stroke-width="1" fill="${Quest.Settings.settings.mapLocationColour}" opacity="0.2" pointer-events="none"`, name: 'otherLevels' },
        // exits
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapExitColour' does not exist on type '{... Remove this comment to see the full error message
        { attrs: `style="stroke:${Quest.Settings.settings.mapExitColour};stroke-width:${Quest.Settings.settings.mapExitWidth}px;fill:${Quest.Settings.settings.mapExitColour}"`, name: 'exits' },
        // rooms on this level
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapBorderColour' does not exist on type ... Remove this comment to see the full error message
        { attrs: `stroke="${Quest.Settings.settings.mapBorderColour}" stroke-width="1" fill="${Quest.Settings.settings.mapLocationColour}"`, name: 'base' },
        // features (anything the author might want to add)
        { attrs: '', name: 'features' },
        // labels
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapLabelColour' does not exist on type '... Remove this comment to see the full error message
        { attrs: `pointer-events="none" fill="${Quest.Settings.settings.mapLabelColour}" text-anchor="middle"`, name: 'labels' },
    ];
};
// Mapping from room to exitRoom, exit is the exit linking the two, dir is an object from Quest.lang.exit_list
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapRoomFromExit' does not exist on type ... Remove this comment to see the full error message
map.mapRoomFromExit = function (room, exitRoom, exit, dir, rooms) {
    // console.log(exit)
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
    const offsetX = (exit.mapOffsetX ? exit.mapOffsetX : dir.x) * Quest.Settings.settings.mapScale;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
    const offsetY = (exit.mapOffsetY ? exit.mapOffsetY : dir.y) * Quest.Settings.settings.mapScale;
    const offsetZ = (exit.mapOffsetZ ? exit.mapOffsetZ : dir.z);
    // console.log('' + offsetX + ', ' + offsetY + ', ' + offsetZ)
    if (exitRoom.mapX === undefined) {
        // if room not done, set coords, add to rooms
        if (!exitRoom.mapIgnore) {
            exitRoom.mapX = room.mapX + offsetX;
            exitRoom.mapY = room.mapY - offsetY;
            exitRoom.mapZ = room.mapZ + offsetZ;
            exitRoom.mapRegion = room.mapRegion;
            if (rooms)
                rooms.push(exitRoom);
            // console.log("Rooms: " + rooms.map(el => el.name).join(', '))
        }
        // console.log(exitRoom)
    }
    else {
        // if done, check coords and alert if dodgy
        if (exitRoom.mapX !== room.mapX + offsetX) {
            console.log(`WARNING: Mapping exit from ${room.name} to ${exit.name} - funny X offset (${exitRoom.mapX} vs ${room.mapX + offsetX})`);
            console.log(room);
            console.log(exitRoom);
            console.log(exit.mapOffsetX);
            console.log(dir.x);
            console.log(`${offsetX}, ${offsetY}, ${offsetZ}`);
        }
        if (exitRoom.mapY !== room.mapY - offsetY)
            console.log(`WARNING: Mapping exit from ${room.name} to ${exit.name} - funny Y offset (${exitRoom.mapY} vs ${room.mapY + offsetY})`);
        if (exitRoom.mapZ !== room.mapZ + offsetZ)
            console.log(`WARNING: Mapping exit from ${room.name} to ${exit.name} - funny Z offset`);
    }
};
// Mapping from room to exitRoom, exit is the exit linking the two, dir is an object from Quest.lang.exit_list
// Use when exitRoom is multi-location, so is not to be added to the room list, and needs to know each location
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapMultiRoomFromExit' does not exist on ... Remove this comment to see the full error message
map.mapMultiRoomFromExit = function (room, exitRoom, exit, dir) {
    // console.log(exit)
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
    const offsetX = (exit.mapOffsetX ? exit.mapOffsetX : dir.x) * Quest.Settings.settings.mapScale;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapScale' does not exist on type '{ perf... Remove this comment to see the full error message
    const offsetY = (exit.mapOffsetY ? exit.mapOffsetY : dir.y) * Quest.Settings.settings.mapScale;
    const offsetZ = (exit.mapOffsetZ ? exit.mapOffsetZ : dir.z);
    // console.log('' + offsetX + ', ' + offsetY + ', ' + offsetZ)
    if (exitRoom.locations === undefined)
        exitRoom.locations = [];
    exitRoom.mapRegion = true;
    const loc = {};
    if (!exitRoom.mapIgnore) {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapX' does not exist on type '{}'.
        loc.mapX = room.mapX + offsetX;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapY' does not exist on type '{}'.
        loc.mapY = room.mapY - offsetY;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapZ' does not exist on type '{}'.
        loc.mapZ = room.mapZ + offsetZ;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapRegion' does not exist on type '{}'.
        loc.mapRegion = room.mapRegion;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'connectedRoom' does not exist on type '{... Remove this comment to see the full error message
        loc.connectedRoom = room;
        // loc.connection = exit
        exitRoom.locations.push(loc);
    }
};
// Draw the map
// It collects all the SVG in five lists, which are effectively layers.
// This means all the exits appear in one layer, all the labels in another
// and so labels are always on top of exits
// ts-error-fixed ts-migrate(2339) FIXME: Property 'update' does not exist on type '{ toggle... Remove this comment to see the full error message
map.update = function () {
    // grab the current room region and level. If the room is missing either, give up now!
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const level = Quest.World.w[Quest.World.player.loc].mapZ;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const region = Quest.World.w[Quest.World.player.loc].mapRegion;
    if (level === undefined || region === undefined)
        return;
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if (Quest.World.w[Quest.World.player.loc].mapIgnore)
        return;
    // Stuff gets put in any of several layers, which will be displayed in this order
    const lists = {};
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'layers' does not exist on type '{ toggle... Remove this comment to see the full error message
    for (const el of map.layers)
        lists[el.name] = ['', `<g id="${el.name}-layer" ${el.attrs}>`];
    // Loop through every room
    for (const key in Quest.World.w) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const room = Quest.World.w[key];
        // Do not map if in another region (if region is true, the room can handle it)
        // Only show if visited unless mapShowNotVisited
        if (room.mapRegion !== region && room.mapRegion !== true)
            continue;
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapShowNotVisited' does not exist on typ... Remove this comment to see the full error message
        if (!Quest.Settings.settings.mapShowNotVisited && !room.visited)
            continue;
        // Call mapDraw on the room if it has that, otherwise the default version
        (room.mapDraw ? room : map).mapDraw(lists, region, level, room);
    }
    // Add it all together
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDefs' does not exist on type '{ perfo... Remove this comment to see the full error message
    const result = Quest.Settings.settings.mapDefs ? Quest.Settings.settings.mapDefs() : [];
    for (const key in lists) {
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        for (const el of lists[key])
            result.push(el);
        result.push('</g>');
    }
    // console.log(result)
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapExtras' does not exist on type '{ per... Remove this comment to see the full error message
    if (Quest.Settings.settings.mapExtras)
        result.push(...Quest.Settings.settings.mapExtras());
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapMarker' does not exist on type '{ per... Remove this comment to see the full error message
    result.push(Quest.Settings.settings.mapMarker ? Quest.Settings.settings.mapMarker(Quest.World.w[Quest.World.player.loc]) : map.marker(Quest.World.w[Quest.World.player.loc].mapX, Quest.World.w[Quest.World.player.loc].mapY));
    // Centre the view on the player, and draw it
    // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const x = Quest.World.w[Quest.World.player.loc].mapX - Quest.Settings.settings.mapWidth / 2;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapHeight' does not exist on type '{ per... Remove this comment to see the full error message
    const y = -Quest.Settings.settings.mapHeight / 2 + Quest.World.w[Quest.World.player.loc].mapY;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapWidth' does not exist on type '{ perf... Remove this comment to see the full error message
    Quest.IO.draw(Quest.Settings.settings.mapWidth, Quest.Settings.settings.mapHeight, result, { destination: 'quest-map', x, y });
};
// The default draw function for a room
// Puts the various bits in the appropriate lists
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDraw' does not exist on type '{ toggl... Remove this comment to see the full error message
map.mapDraw = function (lists, region, level, room) {
    // Location itself
    const destinationLayer = room.mapZ === level ? lists.base : lists.otherLevels;
    if (room.mapDrawString) {
        destinationLayer.push(room.mapDrawString);
    }
    else if (room.mapDrawBase) {
        const s = room.mapDrawBase();
        if (!room.mapRedrawEveryTurn)
            room.mapDrawString = s;
        destinationLayer.push(s);
    }
    else {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDrawDefault' does not exist on type '... Remove this comment to see the full error message
        destinationLayer.push(map.mapDrawDefault(room));
    }
    if (room.mapZ !== level)
        return;
    // Exits
    for (const dir of Quest.lang.exit_list) {
        if (dir.type !== 'compass')
            continue;
        if (!room.hasExit(dir.name))
            continue;
        const exit = room[dir.name];
        if (exit.mapIgnore)
            continue;
        if (exit.name === '_')
            continue;
        // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        const exitRoom = Quest.World.w[exit.name];
        if (exit.mapDrawString) {
            lists.exits.push(exit.mapDrawString);
        }
        else if (exit.mapDrawBase) {
            lists.exits.push(exit.mapDrawBase(room, exitRoom, region, level));
        }
        else if (exit.mapMoveableLoc) {
            // For an exit going TO a mapMoveableLoc,
            // assume a straight exit
            // console.log('here ' + room.name + ' ' + dir.name)
            let s = `<line x1="${room.mapX}" y1="${room.mapY}`;
            // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            s += `" x2="${room.mapX + dir.x * Quest.Settings.settings.mapScale / 2}" y2="${room.mapY - dir.y * Quest.Settings.settings.mapScale / 2}`;
            if (exit.mapStyle)
                s += `" style="${exit.mapStyle}`;
            s += '"/>';
            exit.mapDrawString = s;
            // console.log(s)
            lists.exits.push(s);
        }
        else {
            let s = `<line x1="${room.mapX}" y1="${room.mapY}`;
            s += `" x2="${(exitRoom.mapX + room.mapX) / 2}" y2="${(exitRoom.mapY + room.mapY) / 2}`;
            if (exit.mapStyle)
                s += `" style="${exit.mapStyle}`;
            s += '"/>';
            if (!exit.mapRedrawEveryTurn)
                exit.mapDrawString = s;
            lists.exits.push(s);
        }
    }
    // Features
    if (room.mapDrawFeatures)
        lists.features.push(room.mapDrawFeatures());
    // Labels
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDrawLabels' does not exist on type '{... Remove this comment to see the full error message
    if (!Quest.Settings.settings.mapDrawLabels)
        return;
    if (room.mapDrawLabelString) {
        lists.labels.push(room.mapDrawLabelString);
    }
    else if (room.mapDrawLabel) {
        const s = room.mapDrawLabel(region, level);
        if (!room.mapRedrawEveryTurn)
            room.mapDrawLabelString = s;
        lists.labels.push(s);
    }
    else {
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDrawLabelDefault' does not exist on t... Remove this comment to see the full error message
        lists.labels.push(map.mapDrawLabelDefault(room));
    }
};
// The default draw function for a multi-location room
// Puts the various bits in the appropriate lists
// ts-error-fixed ts-migrate(2339) FIXME: Property 'moveableLocDraw' does not exist on type ... Remove this comment to see the full error message
map.moveableLocDraw = function (lists, region, level, room) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'locations' does not exist on type '{ tog... Remove this comment to see the full error message
    for (const el of this.locations) {
        if (el.mapRegion !== region)
            continue;
        // Location itself
        const destinationLayer = el.mapZ === level ? lists.base : lists.otherLevels;
        // if a multi-location room, give it the special draw function
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDrawDefault' does not exist on type '... Remove this comment to see the full error message
        destinationLayer.push(room.mapDrawBase ? room.mapDrawBase(level, el) : map.mapDrawDefault(room, el));
        // Exits
        for (const dir of Quest.lang.exit_list) {
            if (dir.type !== 'compass')
                continue;
            if (!room.hasExit(dir.name))
                continue;
            const exit = room[dir.name];
            if (exit.mapIgnore)
                continue;
            if (exit.name === '_')
                continue;
            // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            const exitRoom = Quest.World.w[exit.name];
            if (exit.mapDrawBase) {
                lists.exits.push(exit.mapDrawBase(room, exitRoom, region, level));
            }
            else if (dir.name === room.transitDoorDir) {
                // For an exit going FROM a mapMoveableLoc,
                for (const el of room.locations) {
                    if (el.mapZ !== level || el.mapRegion !== region)
                        continue;
                    let s = `<line x1="${el.mapX}" y1="${el.mapY}`;
                    // ts-error-fixed ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                    s += `" x2="${el.mapX + dir.x * Quest.Settings.settings.mapScale / 2}" y2="${el.mapY - dir.y * Quest.Settings.settings.mapScale / 2}`;
                    s += '"/>';
                    lists.exits.push(s);
                }
            }
            else {
                let s = `<line x1="${el.mapX}" y1="${room.mapY}`;
                s += `" x2="${(exitRoom.mapX + el.mapX) / 2}" y2="${(exitRoom.mapY + el.mapY) / 2}`;
                s += '"/>';
                lists.exits.push(s);
            }
        }
        // Features
        if (room.mapDrawFeatures)
            lists.features.push(room.mapDrawFeatures());
        // Labels
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDrawLabels' does not exist on type '{... Remove this comment to see the full error message
        if (!Quest.Settings.settings.mapDrawLabels || el.mapZ !== level)
            return;
        if (room.mapDrawLabelString) {
            lists.labels.push(room.mapDrawLabelString);
        }
        else if (room.mapDrawLabel) {
            const s = room.mapDrawLabel(region, level);
            if (!room.mapRedrawEveryTurn)
                room.mapDrawLabelString = s;
            lists.labels.push(s);
        }
        else {
            // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDrawLabelDefault' does not exist on t... Remove this comment to see the full error message
            lists.labels.push(map.mapDrawLabelDefault(room, el));
        }
    }
};
// loc has the coordinates, but defaults to o
// (used by moveableLocDraw)
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDrawDefault' does not exist on type '... Remove this comment to see the full error message
map.mapDrawDefault = function (o, loc) {
    if (loc === undefined)
        loc = o;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapCellSize' does not exist on type '{ p... Remove this comment to see the full error message
    const w = o.mapWidth ? o.mapWidth : Quest.Settings.settings.mapCellSize;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapCellSize' does not exist on type '{ p... Remove this comment to see the full error message
    const h = o.mapHeight ? o.mapHeight : Quest.Settings.settings.mapCellSize;
    let s = '<rect x="';
    s += loc.mapX - w / 2;
    s += '" y="';
    s += loc.mapY - h / 2;
    s += `" width="${w}" height="${h}`;
    if (o.mapColour)
        s += `" fill="${o.mapColour}`;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getClickAttrs' does not exist on type '{... Remove this comment to see the full error message
    s += `"${map.getClickAttrs(o)}/>`;
    return s;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'getClickAttrs' does not exist on type '{... Remove this comment to see the full error message
map.getClickAttrs = function (o) {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapClick' does not exist on type '{ perf... Remove this comment to see the full error message
    if (!Quest.Settings.settings.mapClick)
        return '';
    return ` onclick="Quest.Settings.settings.mapClick('${o.name}')" cursor="pointer" role="button"`;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'mapDrawLabelDefault' does not exist on t... Remove this comment to see the full error message
map.mapDrawLabelDefault = function (o, loc) {
    if (loc === undefined)
        loc = o;
    let s = '<text class="map-text" x="';
    s += loc.mapX;
    s += '" y="';
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapLabelOffset' does not exist on type '... Remove this comment to see the full error message
    s += loc.mapY - Quest.Settings.settings.mapLabelOffset;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'mapLabelRotate' does not exist on type '... Remove this comment to see the full error message
    if (Quest.Settings.settings.mapLabelRotate)
        s += `" transform="rotate(${Quest.Settings.settings.mapLabelRotate},${loc.mapX},${loc.mapY - Quest.Settings.settings.mapLabelOffset})`;
    s += '">';
    s += o.mapLabel ? o.mapLabel : Quest.Utilities.sentenceCase(o.alias);
    s += '</text>';
    return s;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'polygon' does not exist on type '{ toggl... Remove this comment to see the full error message
map.polygon = function (room, points, attrs) {
    return map.polyany('polygon', room, points, attrs);
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'polyline' does not exist on type '{ togg... Remove this comment to see the full error message
map.polyline = function (room, points, attrs) {
    return map.polyany('line', room, points, attrs);
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'polyroom' does not exist on type '{ togg... Remove this comment to see the full error message
map.polyroom = function (room, points, attrs) {
    return map.polyany('room', room, points, attrs);
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'polyany' does not exist on type '{ toggl... Remove this comment to see the full error message
map.polyany = function (type, room, points, attrs) {
    let s = `<poly${type === 'line' ? 'line' : 'gon'} points="`;
    s += points.map((el) => `${room.mapX + el[0]},${room.mapY + el[1]}`).join(' ');
    s += '" ';
    if (attrs)
        s += ` style="${attrs}"`;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getClickAttrs' does not exist on type '{... Remove this comment to see the full error message
    if (type === 'room')
        s += map.getClickAttrs(room);
    s += '/>';
    // console.log(s)
    return s;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'rectRoom' does not exist on type '{ togg... Remove this comment to see the full error message
map.rectRoom = function (room, points, attrs) {
    return map.rect(true, room, points, attrs);
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'rectangle' does not exist on type '{ tog... Remove this comment to see the full error message
map.rectangle = function (room, points, attrs) {
    return map.rect(false, room, points, attrs);
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'rect' does not exist on type '{ toggle: ... Remove this comment to see the full error message
map.rect = function (isRoom, room, points, attrs) {
    let s = `<rect x="${room.mapX + points[0][0]}" y="${room.mapY + points[0][1]}`;
    s += `" width="${points[1][0]}" height="${points[1][1]}"`;
    if (attrs)
        s += ` style="${attrs}"`;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getClickAttrs' does not exist on type '{... Remove this comment to see the full error message
    if (isRoom)
        s += map.getClickAttrs(room);
    s += '/>';
    return s;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'ellipse' does not exist on type '{ toggl... Remove this comment to see the full error message
map.ellipse = function (isRoom, room, points, attrs) {
    let s = `<ellipse cx="${room.mapX + points[0][0]}" cy="${room.mapY + points[0][1]}`;
    s += `" rx="${points[1][0]}" ry="${points[1][1]}"`;
    if (attrs)
        s += ` style="${attrs}"`;
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'getClickAttrs' does not exist on type '{... Remove this comment to see the full error message
    if (isRoom)
        s += map.getClickAttrs(room);
    s += '/>';
    return s;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'text' does not exist on type '{ toggle: ... Remove this comment to see the full error message
map.text = function (room, st, points, attrs) {
    let s = `<text x="${room.mapX + points[0]}" y="${room.mapY + points[1]}"`;
    if (attrs)
        s += ` style="${attrs}"`;
    s += ` text-anchor="middle">${st}</text>`;
    // console.log(s)
    return s;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'bezier' does not exist on type '{ toggle... Remove this comment to see the full error message
map.bezier = function (room, points, attrs) {
    let s = '<path d="M ';
    s += `${room.mapX + points[0][0]} ${room.mapY + points[0][1]}`;
    points.shift();
    s += points.length === 2 ? ' q ' : ' c ';
    s += points.map((el) => `${el[0]} ${el[1]}`).join(' ');
    s += '" ';
    if (attrs)
        s += ` style="${attrs}"`;
    s += '/>';
    // console.log(s)
    return s;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'marker' does not exist on type '{ toggle... Remove this comment to see the full error message
map.marker = function (x, y) {
    let s = '<circle cx="';
    s += x;
    s += '" cy="';
    s += y;
    s += '" r="5" stroke="black" fill="blue"/>';
    return s;
};
// ts-error-fixed ts-migrate(2339) FIXME: Property 'playMode' does not exist on type '{ perf... Remove this comment to see the full error message
if (Quest.Settings.settings.playMode === 'dev') {
    // ts-error-fixed ts-migrate(7009) FIXME: 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    Quest.Commands.commands.unshift(new Quest.Command.Cmd('DebugMap', {
        objects: [],
        regex: /^debug map$/,
        script() {
            for (const key in Quest.World.w) {
                // ts-error-fixed ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                if (Quest.World.w[key].mapZ == undefined)
                    continue;
                // ts-error-fixed ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
                Quest.IO.metamsg(`${Quest.World.w[key].name}: ${Quest.World.w[key].mapX}, ${Quest.World.w[key].mapY}, ${Quest.World.w[key].mapZ} Region=${Quest.World.w[key].mapRegion}`);
            }
            return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
        },
    }));
}
Quest.Command.findCmd('Map').script = function () {
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'hideMap' does not exist on type '{ perfo... Remove this comment to see the full error message
    if (Quest.Settings.settings.hideMap) {
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#quest-map').style.display = 'block';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'hideMap' does not exist on type '{ perfo... Remove this comment to see the full error message
        delete Quest.Settings.settings.hideMap;
    }
    else {
        // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
        document.querySelector('#quest-map').style.display = 'none';
        // ts-error-fixed ts-migrate(2339) FIXME: Property 'hideMap' does not exist on type '{ perfo... Remove this comment to see the full error message
        Quest.Settings.settings.hideMap = true;
    }
    // ts-error-fixed ts-migrate(2339) FIXME: Property 'calcMargins' does not exist on type '{ n... Remove this comment to see the full error message
    Quest.IO.io.calcMargins();
    // ts-error-fixed ts-migrate(2554) FIXME: Expected 3 arguments, but got 1.
    Quest.IO.msg(Quest.lang.done_msg);
    return Quest.World.world.SUCCESS_NO_TURNSCRIPTS;
};
//# sourceMappingURL=node-map.js.map