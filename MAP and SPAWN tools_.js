/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** features to parse MazEditor outputs */
const MAP_TOOLS = {
    VERSION: "0.1",
    CSS: "color: #F9A",
    initialize(pMapObject) {
        this.MAP = pMapObject;
        if (ENGINE.verbose) console.log(`MAP TOOLS associated`, this.MAP);
    },
    unpack(level) {
        console.log("unpacking MAP level", level);
        this.MAP[level].map = FREE_MAP.import(JSON.parse(this.MAP[level].data));
        const GA = this.MAP[level].map.GA;
        this.MAP[level].pw = this.MAP[level].map.width * ENGINE.INI.GRIDPIX;
        this.MAP[level].ph = this.MAP[level].map.height * ENGINE.INI.GRIDPIX;
        this.MAP[level].map.level = level;
        const start = JSON.parse(this.MAP[level].start) || null;
        if (start) {
            this.MAP[level].map.startPosition = new Pointer(GA.indexToGrid(start[0]), Vector.fromInt(start[1]));
            this.MAP[level].map.start = start;
        }
        this.MAP[level].map.decals = JSON.parse(this.MAP[level].decals) || null;
        this.MAP[level].map.lights = JSON.parse(this.MAP[level].lights) || null;
        this.MAP[level].map.gates = JSON.parse(this.MAP[level].gates) || null;
        this.MAP[level].map.keys = JSON.parse(this.MAP[level].keys) || null;
    }
};
const SPAWN_TOOLS = {
    spawn(level) {
        console.info("spawning level", level);
        const map = MAP_TOOLS.MAP[level].map;
        const GA = map.GA;
        this.decals(map, GA);
        this.lights(map, GA);
        this.externalGates(map, GA);
        this.keys(map, GA);
    },
    decals(map, GA) {
        for (const D of map.decals) {
            const grid = GA.indexToGrid(D[0]);
            const face = DirectionToFace(Vector.fromInt(D[1]));
            const picture = D[2];
            const type = D[3];
            DECAL3D.add(new StaticDecal(grid, face, SPRITE[picture], type, picture));
        }
    },
    lights(map, GA) {
        for (const L of map.lights) {
            const grid = GA.indexToGrid(L[0]);
            const face = DirectionToFace(Vector.fromInt(L[1]));
            const picture = L[2];
            const type = L[3];
            LIGHTS3D.add(new LightDecal(grid, face, SPRITE[picture], "light", picture, LIGHT_COLORS[type]));
        }
    },
    externalGates(map, GA) {
        for (const G of map.gates) {
            const color = G[4];
            const grid = GA.indexToGrid(G[0]);
            GA.addStair(grid);
            const dir = Vector.fromInt(G[1]);
            const pointer = new Pointer(grid, dir);
            map[G[2]] = pointer;
            const face = DirectionToFace(dir);
            const picture = `DungeonDoor_${color}`;
            const destination = new Destination(G[3], G[3].split(".")[0]);
            let opEn = false;
            if (color === "Open") opEn = true;
            let locked = true;
            if (["Open", "Closed"].includes(color)) locked = false;
            const externalGate = new ExternalGate(grid, face, SPRITE[picture], "portal", picture, color, opEn, locked, destination, GAME.useStaircase);
            INTERACTIVE_BUMP3D.add(externalGate);
        }
        INTERACTIVE_BUMP3D.setup();
    },
    keys(map, GA) {
        for (const K of map.keys) {
            const grid = Grid.toCenter(GA.indexToGrid(K[0]));
            const key = KEY_TYPE[KEY_TYPES[K[1]]];
            ITEM3D.add(new FloorItem3D(grid, key));
        }
    },
};

/** defaults */
MAP_TOOLS.initialize(MAP);

/** END */
console.log(`%cMAP and SPAWN tools ${MAP_TOOLS.VERSION} loaded.`, MAP_TOOLS.CSS);