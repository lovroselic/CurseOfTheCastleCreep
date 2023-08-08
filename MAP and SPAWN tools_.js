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
    }
};
const SPAWN_TOOLS = {
    spawn(level) {
        console.info("spawning level", level);
        const map = MAP_TOOLS.MAP[level].map;
        const GA = map.GA;
        this.decals(map, GA);
        this.lights(map, GA);
    },
    decals(map, GA) {
        console.log("spawning decals");
        for (const D of map.decals) {
            const grid = GA.indexToGrid(D[0]);
            const face = DirectionToFace(Vector.fromInt(D[1]));
            const picture = D[2];
            const type = D[3];
            console.log("Decal", D, "grid", grid, "face", face, "picture", picture, "type", type);
            DECAL3D.add(new StaticDecal(grid, face, SPRITE[picture], type, picture));
        }
    },
    lights(map, GA) {
        console.log("spawning lights");
        for (const L of map.lights) {
            const grid = GA.indexToGrid(L[0]);
            const face = DirectionToFace(Vector.fromInt(L[1]));
            const picture = L[2];
            const type = L[3];
            console.log("Light", L, "grid", grid, "face", face, "picture", picture, "type", type);
            LIGHTS3D.add(new LightDecal(grid, face, SPRITE[picture], "light", picture, LIGHT_COLORS[type]));
        }
    },
};

/** defaults */
MAP_TOOLS.initialize(MAP);


/** END */
console.log(`%cMAP and SPAWN tools ${MAP_TOOLS.VERSION} loaded.`, MAP_TOOLS.CSS);