/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** features to parse MazEditor outputs */
const MAP_TOOLS = {
    VERSION: "1.00",
    CSS: "color: #F9A",
    properties: ['start', 'decals', 'lights', 'gates', 'keys', 'monsters', 'scrolls', 'potions', 'gold', 'skills', 'containers',
        'shrines', 'doors', 'triggers', 'entities', 'objects', 'traps', 'oracles', 'movables', 'trainers', 'interactors'],
    INI: {
        FOG: true,
        GA_BYTE_SIZE: 2
    },
    initialize(pMapObject) {
        this.MAP = pMapObject;
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
        if (this.MAP[level].adapted_data) {
            const adapted_data = JSON.parse(this.MAP[level].data);
            adapted_data.map = this.MAP[level].adapted_data;
            console.warn("loading adapted data", adapted_data);
            this.MAP[level].map = FREE_MAP.import(adapted_data, MAP_TOOLS.INI.GA_BYTE_SIZE);
            this.MAP[level].map.rebuilt = true;
        } else {
            this.MAP[level].map = FREE_MAP.import(JSON.parse(this.MAP[level].data), MAP_TOOLS.INI.GA_BYTE_SIZE);
            this.MAP[level].map.rebuilt = false;
        }

        const GA = this.MAP[level].map.GA;
        this.MAP[level].pw = this.MAP[level].map.width * ENGINE.INI.GRIDPIX;
        this.MAP[level].ph = this.MAP[level].map.height * ENGINE.INI.GRIDPIX;
        this.MAP[level].map.level = level;

        if (this.INI.FOG && !this.MAP[level].map.rebuilt) {
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
        const SG = this.MAP[level].sg || null;
        this.MAP[level].map.sg = SG;
        this.MAP[level].map.storage = new IAM_Storage();
        if (ENGINE.verbose) console.info("Unpacked MAP level", level, "map", this.MAP[level].map);
    },

    /**
     * direct accesses WebGL
     * @param {*} level - leved/dungeon/room id
     */
    rebuild_3D_world(level) {
        this.MAP[level].world = WORLD.build(this.MAP[level].map);
        WebGL.setWorld(this.MAP[level].world);
        this.MAP[level].map.rebuilt = true;
    },
    applyStorageActions(level) {
        if (!this.MAP[level].unused_storage) return;
        if (!this.MAP[level].map.storage.empty()) return;
        console.info("Applying actions for level", level);
        this.MAP[level].unused_storage.apply();
        this.MAP[level].map.storage.addStorage(this.MAP[level].unused_storage);
        console.log("this.MAP[level].map.storage", this.MAP[level].map.storage);
    }
};

const SG_DICT = {
    0: "Neutral",
    1: "Block",
    2: "Restore",
};

const SPAWN_TOOLS = {
    spawn(level) {
        const map = MAP_TOOLS.MAP[level].map;
        const GA = map.GA;
        const methods = ['decals', 'lights', 'shrines', 'oracles', 'externalGates', 'keys', 'monsters', 'scrolls', 'potions', 'gold', 'skills',
            'containers', 'doors', 'triggers', 'entities', 'trainers', 'objects', 'movables', 'traps', 'interactors'];

        methods.forEach(method => {
            this[method](map, GA);
        });
    },
    decals(map, GA) {
        for (const D of map.decals) {
            const grid = GA.indexToGrid(D[0]);
            const face = DirectionToFace(Vector.fromInt(D[1]));
            const picture = D[2];
            const type = D[3];
            let decal = SPRITE[picture];
            if (type === "texture") decal = TEXTURE[picture];
            DECAL3D.add(new StaticDecal(grid, face, decal, type, picture));
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
            const destination = new Destination(G[3], G[3].split(".")[0], G[2]);
            let opEn = false;
            if (["Open", "Up", "Down"].includes(color)) opEn = true;
            let locked = true;
            if (["Open", "Closed", "Up", "Down"].includes(color)) locked = false;
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
            const type = CONTAINER_ITEM_TYPE[C[1]]
            let rotation = null;
            if (C.length > 3 && C[3]) {
                let dir = Vector.fromInt(C[3]);
                if (dir.same(NOWAY)) {
                    rotation = null;
                } else {
                    rotation = UP.radAngleBetweenVectors(dir) + type.rotateToNorth;
                    const element = ELEMENT[type.element]
                    const SP = ELEMENT.getSurfaceProjection(element, type.scale);
                    grid.y = (grid.y >>> 0) + ((1 - dir.y) / 2) + (dir.y * SP.H / 2);
                    grid.x = (grid.x >>> 0) + ((1 - dir.x) / 2) + (dir.x * SP.H / 2);
                };
            }
            ITEM3D.add(new FloorItem3D(grid, type, C[2], rotation));
        }
    },
    shrines(map, GA) {
        for (const S of map.shrines) {
            const grid = GA.indexToGrid(S[0]);
            GA.addShrine(grid);
            const face = DirectionToFace(Vector.fromInt(S[1]));
            INTERACTIVE_DECAL3D.add(new Shrine(grid, face, SHRINE_TYPE[S[2]]));
        }
    },
    oracles(map, GA) {
        for (const S of map.oracles) {
            const grid = GA.indexToGrid(S[0]);
            GA.addShrine(grid);
            const face = DirectionToFace(Vector.fromInt(S[1]));
            INTERACTIVE_DECAL3D.add(new Oracle(grid, face, ORACLE_TYPE[S[2]]));
        }
    },
    doors(map, GA) {
        for (const door of map.doors) {
            const grid = GA.indexToGrid(door);
            GA.closeDoor(grid);
            GATE3D.add(new Gate(grid, DOOR_TYPE.Common, GA));
        }
    },
    triggers(map, GA) {
        for (const T of map.triggers) {
            const grid = GA.indexToGrid(T[0]);
            const face = DirectionToFace(Vector.fromInt(T[1]));
            const picture = T[2];
            const action = TRIGGER_ACTIONS[T[3]];
            const targetGrid = GA.indexToGrid(T[4]);
            const trigger = new Trigger(grid, face, picture, action, targetGrid, GA);
            INTERACTIVE_DECAL3D.add(trigger);
        }
    },
    entities(map, GA) {
        for (const E of map.entities) {
            const grid = GA.indexToGrid(E[0]);
            GA.addShrine(grid);
            const face = DirectionToFace(Vector.fromInt(E[1]));
            const type = INTERACTION_ENTITY[E[2]];
            const entity = new InteractionEntity(grid, face, type);
            INTERACTIVE_DECAL3D.add(entity);
        }
    },
    trainers(map, GA) {
        for (const E of map.trainers) {
            const grid = GA.indexToGrid(E[0]);
            GA.addShrine(grid);
            const face = DirectionToFace(Vector.fromInt(E[1]));
            const type = INTERACTION_SHRINE[E[2]];
            const entity = new InteractionEntity(grid, face, type);
            INTERACTIVE_DECAL3D.add(entity);
        }
    },
    interactors(map, GA) {
        for (const E of map.interactors) {
            const grid = GA.indexToGrid(E[0]);
            GA.addShrine(grid);
            const face = DirectionToFace(Vector.fromInt(E[1]));
            const type = INTERACTOR[E[2]];
            const entity = new InterActor(grid, face, type);
            INTERACTIVE_DECAL3D.add(entity);
        }
    },
    objects(map, GA) {
        for (const O of map.objects) {
            const grid = Grid.toCenter(GA.indexToGrid(O[0]));
            const type = INTERACTION_OBJECT[O[1]];
            ITEM3D.add(new FloorItem3D(grid, type));
        }
    },
    movables(map, GA) {
        for (const O of map.movables) {
            const grid = Grid.toCenter(GA.indexToGrid(O[0]));
            const type = MOVABLE_INTERACTION_OBJECT[O[1]];
            DYNAMIC_ITEM3D.add(new $Movable_Interactive_entity(grid, type));
        }
    },
    traps(map, GA) {
        for (const T of map.traps) {
            const grid = GA.indexToGrid(T[0]);
            const face = DirectionToFace(Vector.fromInt(T[1]));
            const picture = T[2];
            const action = TRAP_ACTION_LIST[T[3]];
            let prototype;
            switch (action) {
                case "Missile":
                    prototype = COMMON_ITEM_TYPE[T[4]];
                    break;
                case "Spawn":
                    prototype = MONSTER_TYPE[T[4]];
                    break;
                default:
                    throw new Error(`trap action error. ${action} not defined.`);
            }
            const targetGrid = GA.indexToGrid(T[5]);
            const trap = new Trap(grid, face, picture, action, prototype, targetGrid);
            INTERACTIVE_DECAL3D.add(trap);
        }
    }

};

class IAM_Storage {
    constructor(arr = []) {
        this.action_list = arr;
    }
    empty() {
        return this.action_list.length === 0;
    }
    apply() {
        for (const action of this.action_list) {
            console.log(". action", action);
            const IAM = eval(action.IAM);
            const obj = IAM.POOL[action.id - 1];
            console.log(".... trying", obj, action.action, action.arg);
            obj[action.action](action.arg);
            console.log("........ OK", obj, action.action, action.arg);
        }
    }
    add(item) {
        this.action_list.push(item);
    }
    addStorage(storage) {
        this.action_list.push(...storage.action_list);
    }
}

class IAM_Storage_item {
    /**
     * Creates an instance of IAM_Storage_item.
     * @param {string} IAM - string representation of corresponding IAM
     * @param {integer} id - id of object
     * @param {string} action - object method label
     * @param {*} [arg=null] - argument
     */
    constructor(IAM, id, action, arg = null) {
        this.IAM = IAM;
        this.id = id;
        this.action = action;
        this.arg = arg;
    }
}

/** defaults */
MAP_TOOLS.initialize(MAP);
MAP_TOOLS.setByteSize(2);

/** END */
console.log(`%cMAP and SPAWN tools ${MAP_TOOLS.VERSION} loaded.`, MAP_TOOLS.CSS);