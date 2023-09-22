/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** features to parse MazEditor outputs */
const MAP_TOOLS = {
    VERSION: "0.3",
    CSS: "color: #F9A",
    properties: ['decals', 'lights', 'gates', 'keys', 'monsters', 'scrolls', 'potions', 'gold', 'skills', 'containers', 'shrines'],
    INI: {
        FOG: true,
        GA_BYTE_SIZE: 2
    },
    initialize(pMapObject) {
        this.MAP = pMapObject;
        if (ENGINE.verbose) console.log(`MAP TOOLS associated`, this.MAP);
    },
    setByteSize(byte) {
        if (![1, 2, 4].includes(byte)) {
            console.error("MAP_TOOLS set up with wrong size. Reset to default 8 bit!");
            byte = 1;
        }
        MAP_TOOLS.INI.GA_BYTE_SIZE = byte;
        if (ENGINE.verbose) console.log(`MAP TOOLS GA bytesize`, MAP_TOOLS.INI.GA_BYTE_SIZE);
    },
    unpack(level) {
        this.MAP[level].map = FREE_MAP.import(JSON.parse(this.MAP[level].data), MAP_TOOLS.INI.GA_BYTE_SIZE);
        const GA = this.MAP[level].map.GA;
        this.MAP[level].pw = this.MAP[level].map.width * ENGINE.INI.GRIDPIX;
        this.MAP[level].ph = this.MAP[level].map.height * ENGINE.INI.GRIDPIX;
        this.MAP[level].map.level = level;
        if (this.INI.FOG) {
            GA.massSet(MAPDICT.FOG);
        }
        const start = JSON.parse(this.MAP[level].start) || null;
        if (start) {
            this.MAP[level].map.startPosition = new Pointer(GA.indexToGrid(start[0]), Vector.fromInt(start[1]));
            this.MAP[level].map.start = start;
        }
        for (const prop of this.properties) {
            if (this.MAP[level][prop] !== undefined) {
                this.MAP[level].map[prop] = JSON.parse(this.MAP[level][prop]);
            } else {
                this.MAP[level].map[prop] = [];
            }
        }
        if (!this.MAP[level].name) {
            this.MAP[level].name = `Room - ${level}`;
        }
        if (ENGINE.verbose) console.info("Unpacked MAP level", level, "map", this.MAP[level].map);
    }
};
const SPAWN_TOOLS = {
    spawn(level) {
        console.info("spawning level", level);
        const map = MAP_TOOLS.MAP[level].map;
        const GA = map.GA;
        this.decals(map, GA);
        this.lights(map, GA);
        this.shrines(map, GA);
        this.externalGates(map, GA);
        this.keys(map, GA);
        this.monsters(map, GA);
        this.scrolls(map, GA);
        this.potions(map, GA);
        this.gold(map, GA);
        this.skills(map, GA);
        this.containers(map, GA);
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
    monsters(map, GA) {
        for (const M of map.monsters) {
            const grid = Grid.toCenter(GA.indexToGrid(M[0]));
            const type = MONSTER_TYPE[M[1]];
            ENTITY3D.add(new $3D_Entity(grid, type, UP));
        }
    },
    scrolls(map, GA) {
        for (const S of map.scrolls) {
            const grid = Grid.toCenter(GA.indexToGrid(S[0]));
            ITEM3D.add(new FloorItem3D(grid, COMMON_ITEM_TYPE.Scroll, S[1]));
        }
    },
    potions(map, GA) {
        for (const P of map.potions) {
            const grid = Grid.toCenter(GA.indexToGrid(P[0]));
            const potion = POTION_TYPE[POTION_TYPES[P[1]]];
            ITEM3D.add(new FloorItem3D(grid, potion));
        }
    },
    gold(map, GA) {
        for (const G of map.gold) {
            const grid = Grid.toCenter(GA.indexToGrid(G[0]));
            ITEM3D.add(new FloorItem3D(grid, GOLD_ITEM_TYPE[G[1]]));
        }
    },
    skills(map, GA) {
        for (const S of map.skills) {
            const grid = Grid.toCenter(GA.indexToGrid(S[0]));
            ITEM3D.add(new FloorItem3D(grid, SKILL_ITEM_TYPE[S[1]]));
        }
    },
    containers(map, GA) {
        for (const C of map.containers) {
            const grid = Grid.toCenter(GA.indexToGrid(C[0]));
            ITEM3D.add(new FloorItem3D(grid, CONTAINER_ITEM_TYPE[C[1]], C[2]));
        }
    },
    shrines(map, GA) {
        for (const S of map.shrines) {
            const grid = GA.indexToGrid(S[0]);
            GA.addShrine(grid);
            const face = DirectionToFace(Vector.fromInt(S[1]));
            INTERACTIVE_DECAL3D.add(new Shrine(grid, face, SHRINE_TYPE[S[2]]));
        }
    }
};

/** defaults */
MAP_TOOLS.initialize(MAP);
MAP_TOOLS.setByteSize(2);

/** END */
console.log(`%cMAP and SPAWN tools ${MAP_TOOLS.VERSION} loaded.`, MAP_TOOLS.CSS);