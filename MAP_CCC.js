/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
const GATE_TYPES = ["Open", "Closed", "Gold", "Silver", "Red", "Green", "Blue"];

console.log("%cMAP for CCC loaded.", "color: #888");

/** Map definitions */
const MAP = {
    1: {
        data: '{"width":"16","height":"16","map":"BB2ABAA7BABABAA2BB2ABB2ABABAA2BAA5BAA7BABAA2BAA3BAA4BB3AA2BAA15BAA7BABABAA3BAA5BAA3BAA3BB6ABB2ABB2ABB3AA2BB2AA2BB11ABB6ABB5AA2BB3AA2BB9AA3BB2AA2BB4AA2BB2ABB2ABB11ABB9ABB4AA3BB19ABB16AB$"}',
        wall: "DungeonWall",
        floor: "GreenDungeonWall",
        ceil: "GreyDungeonFloor",
        decals: '[[88,5,"AticAtac112","picture"],[88,3,"AticAtac111","picture"],[88,1,"AticAtac110","picture"],[56,4,"RoundGrille96","crest"],[136,1,"LS","crest"],[23,7,"Zaxxon89","picture"],[25,7,"BlueMax20","picture"],[99,7,"ActecChallenge2","picture"],[75,7,"AntAttack2","picture"],[107,7,"Arena2","picture"],[131,5,"AA100","picture"],[153,5,"AMC3","picture"]]',
        lights: '[[88,7,"WallLamp","standard"],[32,5,"WallLamp","red"],[131,3,"WallLamp","standard"],[14,7,"Lamp4","yellowgreen"],[141,7,"WallTorch","fire"],[214,5,"WallLamp3","red"]]',
        start: '[24,7]',
        gates: '[[8,7,"1.1","2.1","Closed"],[248,1,"1.2","3.1","Red"],[128,5,"1.3","4.1","Open"],[207,3,"1.4","5.1","Open"]]',
        keys: '[[102,0],[103,1],[104,2],[105,2],[106,3],[120,4]]',
        monsters: '[[72,"Bat"],[118,"RedGoldBat"],[166,"SkeletonDemo"]]',
        scrolls: '[[132,0],[149,1],[164,8]]',
        potions: '[[199,0],[202,1]]',
        gold: '[[37,"GoldBar"],[36,"SilverBar"],[35,"GoldCube"],[34,"Coins"]]',
    }
    ,
    2: {
        data: '{"width":"8","height":"8","map":"BB4AA5BAA5BABB3AA11BB10ABABAA4BABB11AB$"}',
        wall: "Wall8",
        floor: "StoneFloor3",
        ceil: "GreyDungeonFloor",
        start: '[51,1]',
        decals: '[[35,7,"AMC2","picture"],[24,5,"ActecChallenge2","picture"],[39,3,"AirWolf31","picture"],[28,1,"AlleyKat","picture"]]',
        lights: '[[3,7,"WallLamp","standard"]]',
        gates: '[[59,1,"2.1","1.1","Open"]]',
        keys: '[]'
    },
    3: {
        data: '{"width":"16","height":"16","map":"BB2AA6BB39$BB208A"}',
        wall: "DungeonWall",
        floor: "GreenDungeonWall",
        ceil: "GreyDungeonFloor",
        start: '[23,7]',
        decals: '[]',
        lights: '[]',
        gates: '[[7,7,"3.1","1.2","Open"]]',
        keys: '[]'
    },
    4: {
        data: '{"width":"8","height":"8","map":"BB6AA18BAA2BB2AA6BB6AA2BB3AA5BB12A$"}',
        wall: "RockWall100",
        floor: "MarbleFloor1",
        ceil: "MossyWall3",
        start: '[22,5]',
        decals: '[[42,5,"ArabianNights1","picture"],[8,5,"Apshai6","picture"],[44,5,"Apshai10","picture"],[44,3,"AppleLisa","picture"],[39,3,"BeachHeadReplace","picture"],[4,7,"AtariFalcon","picture"],[58,1,"AticAtac131","picture"]]',
        lights: '[[40,5,"WallLamp","standard"],[60,1,"WallLamp3","fire"]]',
        gates: '[[23,3,"4.1","1.3","Open"]]',
        keys: '[]'
    },
    5: {
        data: '{"width":"16","height":"16","map":"BB4AA8BB2AA4BB4AA20BB82AA2BB23ABABB5ABAA3BB18ABB75$"}',
        wall: "BeautifullWall1",
        floor: "BrickTiles",
        ceil: "BlurryScarlet",
        start: '[113,1]',
        decals: '[[243,1,"Barbarian130","picture"],[247,1,"Barbarian13","picture"],[145,5,"Barbarian110","picture"],[209,5,"Barbarian100","picture"]]',
        lights: '[[97,5,"WallLamp","standard"],[177,5,"WallLamp","standard"],[245,1,"WallTorch","fire"]]',
        gates: '[[112,5,"5.1","1.4","Open"]]',
        keys: '[]'
    }
};


const MONSTER_LAYOUT = {
    1: {
        start: {
            N: 1,
            monster: { Bat: 1 },
        },
        corridor: {
            N: 25,
            monster: { Bat: 1, MissGalaxyGreen: 2, RedGoldBat: 1, MissGalaxy: 1, Spider: 1, GhostFace: 1, SpiderGreen: 0.5 }
        },
        common: {
            N: 2,
            monster: { Bat: 1, MissGalaxyGreen: 3, RedGoldBat: 1, MissGalaxy: 2, Spider: 1, GhostFace: 1, SpiderGreen: 0.5 }
        },
        Gold: {
            N: 2,
            monster: { Spider: 1, GhostFace: 2, GhostFaceGreen: 1.5, SpiderGreen: 2, MissGalaxyGold: 0.5 },
            boss: { MissWhite_BossL1: 1 }
        },
        Silver: {
            N: 2,
            monster: { Spider: 1, GhostFace: 2, GhostFaceGreen: 1, SpiderGreen: 1.2 },
            boss: { GhostFaceGreen: 1 },
        },
        firstKey: {
            N: 2,
            monster: { Bat: 1, MissGalaxyGreen: 2, MissGalaxy: 3, Spider: 2, GhostFace: 1, GhostFaceGreen: 0.25, SpiderGreen: 0.5 },
            boss: { SpiderGreen: 1 },
        },
        Red: {
            N: 2,
            monster: { Spider: 1, MissGalaxy: 1, GhostFace: 2, GhostFaceGreen: 1, SpiderGreen: 1.1 },
            boss: { GhostFace: 1 },
        },
        temple: {
            N: 1,
            monster: { Bat: 1, MissGalaxyGreen: 1, RedGoldBat: 1 },
        }
    },
    2: {
        start: {
            N: 1,
            monster: { RedGoldBat: 1 },
        },
        corridor: {
            N: 25,
            monster: { MissGalaxyGreen: 1, RedGoldBat: 1, Bat: 1, MissGalaxy: 3, Spider: 3, GhostFace: 3, SpiderGreen: 5, Astro: 3, MissWhite: 2, Viking: 1, MissGalaxyGold: 2 }
        },
        common: {
            N: 2,
            monster: { MissGalaxy: 3, Spider: 3, GhostFace: 3, SpiderGreen: 5, MissWhite: 2, Astro: 2, Viking: 1, MissGalaxyGold: 2 }
        },
        Gold: {
            N: 2,
            monster: { SpiderGreen: 1, GhostFace: 1, GhostFaceGreen: 2, MissWhite: 4, Astro: 5, Viking: 4, MissGalaxyGold: 5 },
            boss: { Hulk_BossL2: 1 }
        },
        Silver: {
            N: 2,
            monster: { SpiderGreen: 1, GhostFace: 1, GhostFaceGreen: 2, MissWhite: 3, Astro: 4, Viking: 3, MissGalaxyGold: 3 },
            boss: { Viking: 1 },
        },
        Red: {
            N: 2,
            monster: { SpiderGreen: 1, GhostFace: 1, GhostFaceGreen: 2, MissWhite: 2, Astro: 3, Viking: 2, MissGalaxyGold: 2 },
            boss: { Viking: 1 },
        },
        firstKey: {
            N: 2,
            monster: { SpiderGreen: 1, GhostFace: 1, GhostFaceGreen: 2, MissWhite: 2, Astro: 3, Viking: 1, MissGalaxyGold: 2 },
            boss: { Astro: 1 },
        },
        temple: {
            N: 1,
            monster: { SpiderGreen: 1 },
        }
    },
    3: {
        start: {
            N: 1,
            monster: { SpiderGreen: 1 },
        },
        corridor: {
            N: 25,
            monster: { GhostFaceGreen: 1, SpiderGreen: 1, Astro: 1, MissWhite: 1, Viking: 2, AstroRed: 2, MissGreen: 3, Wolf: 0.1, MissGalaxyGold: 2 }
        },
        common: {
            N: 2,
            monster: { GhostFaceGreen: 1, SpiderGreen: 1, Astro: 1, MissWhite: 1, Viking: 2, AstroRed: 2, MissGreen: 3, Wolf: 0.2, MissGalaxyGold: 2 }
        },
        Gold: {
            N: 2,
            monster: { Viking: 2, AstroRed: 2, MissGreen: 2, Hulk: 3, Wolf: 3 },
            boss: { Goblin_BossL3: 1 }
        },
        Silver: {
            N: 2,
            monster: { Viking: 2, AstroRed: 2, MissGreen: 2, Hulk: 2, Wolf: 2 },
            boss: { Wolf: 1, Hulk: 1 },
        },
        Red: {
            N: 2,
            monster: { Viking: 2, AstroRed: 2, MissGreen: 3, Hulk: 1, Wolf: 1 },
            boss: { Viking: 1 },
        },
        firstKey: {
            N: 2,
            monster: { GhostFaceGreen: 1, Astro: 1, Viking: 2, AstroRed: 2, MissGreen: 3, Wolf: 0.5, MissGalaxyGold: 2 },
            boss: { Astro: 1 },
        },
        temple: {
            N: 1,
            monster: { Viking: 1 },
        }
    },
    4: {
        start: {
            N: 1,
            monster: { Viking: 1 },
        },
        corridor: {
            N: 25,
            monster: { Viking: 1, AstroRed: 1, MissGreen: 1, Wolf: 2, Skeleton: 1, Hulk: 1, MissGalaxyGold: 1 }
        },
        common: {
            N: 2,
            monster: { Viking: 0.5, AstroRed: 0.5, MissGreen: 0.75, Wolf: 2, Skeleton: 1, Hulk: 1, Goblin: 0.5, RedSkeleton: 1 }
        },
        Gold: {
            N: 2,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 2, RedSkeleton: 3, SilverSkeleton: 1 },
            boss: { GoldSkeleton_BossL4: 1 }
        },
        Silver: {
            N: 2,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 1.5, RedSkeleton: 2, SilverSkeleton: 1 },
            boss: { RedSkeleton: 1, SilverSkeleton: 1 },
        },
        Red: {
            N: 2,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 1, RedSkeleton: 1.2 },
            boss: { Goblin: 1 },
        },
        firstKey: {
            N: 2,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 0.8, RedSkeleton: 1 },
            boss: { Skeleton: 1 },
        },
        temple: {
            N: 1,
            monster: { Viking: 1 },
        }
    },
    5: {
        //ARENA
        corridor: {
            N: 20,
            monster: { Skeleton: 1, Hulk: 1, Goblin: 3, RedSkeleton: 3, SilverSkeleton: 4, GoldSkeleton: 3, MissGalaxyGold: 0.1, MissGreen: 0.5 }
        },
        boss: { Drax_BossL5: 1 },
    }
};

const SPAWN = {
    INI: {
        health_potions_per_level: 6,
        mana_potions_per_level: 6,
        scrolls_per_level: 6,
        monster_on_corridors: 25,
        gold_per_level: 6,
        chest_per_arena: 6
    },
    spawn(level) {
        const map = MAP[level].map;
        this.lights(map);
        this.decals(map);
        this.shrines(map);
        this.stairs(map, level);
        this.gates(map);
        this.items(map);
        this.monsters(map, level);
        this.mapPointers(map);
    },
    shrines(map) {
        const GA = map.GA;
        const shrines = [SHRINE_TYPE.AttackShrine, SHRINE_TYPE.DefenseShrine, SHRINE_TYPE.MagicShrine];
        const shrine_locations = map.shrines;
        for (let s = 0; s < shrines.length; s++) {
            GA.addShrine(shrine_locations[s].grid);
            const shrine = new Shrine(shrine_locations[s].grid, DirectionToFace(shrine_locations[s].vector), shrines[s]);
            INTERACTIVE_DECAL3D.add(shrine);
        }
    },
    decals(map) {
        // room wall decals
        for (const room of map.rooms) {
            const lo = ((0.25 * room.squareSize) >>> 0) - 1;
            const hi = ((0.33 * room.squareSize) >>> 0) + 1;
            let N = RND(lo, hi);
            let wallGrids = map.roomWallGrids(room);
            while (N > 0 && wallGrids.length > 0) {
                const slot = wallGrids.removeRandom();
                map.GA.reserve(slot.grid);
                const picture = DECAL_PAINTINGS.chooseRandom();
                DECAL3D.add(new StaticDecal(slot.grid, DirectionToFace(slot.dir), SPRITE[picture], "picture", picture));
                N--;
            }

            //bottom
            const topGrid = map.findMiddleSpaceUnreserved(room.area);
            const topCrest = TOP_CRESTS.chooseRandom();
            DECAL3D.add(new StaticDecal(topGrid, 'TOP', SPRITE[topCrest], "crest", topCrest));

            //top
            const bottomGrid = map.findMiddleSpaceUnreserved(room.area);
            const bottomCrest = BOTTOM_CRESTS.chooseRandom();
            DECAL3D.add(new StaticDecal(bottomGrid, 'BOTTOM', SPRITE[bottomCrest], "crest", bottomCrest));
        }

        //corridor decals
        const N = (map.width * map.height * parseFloat(map.density) * 0.13) | 0;
        const corrDecalGrids = map.poolOfCorridorDecalGrids(N);
        for (let grid of corrDecalGrids) {
            const type = weightedRnd({ picture: 10, crest: 20 });
            const source = DECAL_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[source], type, source));
        }

        //top, bottom corridor decals
        const TB = (map.width * map.height * parseFloat(map.density) * 0.05) | 0;
        const corrGrids = map.poolOfUnreservedCorridorGrids(TB);
        for (let grid of corrGrids) {
            const type = weightedRnd({ TOP: 10, BOTTOM: 5 });
            const source = TOP_BOTTOM_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid, type, SPRITE[source], "crest", source));
        }
    },
    stairs(map, level) {
        const GA = map.GA;
        const entranceLocation = map.entrance;
        const exitLocation = map.exit;

        //entrance gate
        let entranceSprite = null;
        if (level > GAME.upperLimit) {
            entranceSprite = "StairsUp";
            const entrance_destination_level = GAME.level - 1;
            const destination = new Destination("exit", entrance_destination_level);
            const entrance = new Portal(entranceLocation.grid, DirectionToFace(entranceLocation.vector), SPRITE[entranceSprite], 'portal', entranceSprite, destination, GAME.useStaircase);
            BUMP3D.add(entrance);
        } else {
            entranceSprite = "EntranceGate";
            DECAL3D.add(new StaticDecal(entranceLocation.grid, DirectionToFace(entranceLocation.vector), SPRITE[entranceSprite], "crest", entranceSprite));
        }
        GA.reserve(entranceLocation.grid);

        //exit gate
        const exitSprite = "StairsDown";
        const exit_destination_level = GAME.level + 1;
        const destination = new Destination("entrance", exit_destination_level);
        const exit = new Portal(exitLocation.grid, DirectionToFace(exitLocation.vector), SPRITE[exitSprite], 'portal', exitSprite, destination, GAME.useStaircase);
        BUMP3D.add(exit);
        GA.reserve(exitLocation.grid);
        BUMP3D.update();
    },
    lights(map) {
        // room wall lights
        for (const room of map.rooms) {
            const lo = Math.max(((room.squareSize / 16) >>> 0), 1);
            const hi = Math.max(((room.squareSize / 10) >>> 0), 2);
            let N = RND(lo, hi);
            let wallGrids = map.roomWallGrids(room);
            while (N > 0 && wallGrids.length > 0) {
                const slot = wallGrids.removeRandom();
                wallGrids = map.filterPoolByDistance(slot, wallGrids);
                map.GA.reserve(slot.grid);
                const light = LIGHT_DECALS.chooseRandom();
                LIGHTS3D.add(new LightDecal(slot.grid, DirectionToFace(slot.dir), SPRITE[light.sprite], "light", light.sprite, light.color));
                N--;
            }
        }

        //corridor lights
        const N = (map.width * map.height * parseFloat(map.density) * 0.01) | 0;
        const corrDecalGrids = map.poolOfCorridorDecalGrids(N);
        for (let grid of corrDecalGrids) {
            const light = LIGHT_DECALS.chooseRandom();
            LIGHTS3D.add(new LightDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[light.sprite], "light", light.sprite, light.color));
        }
    },
    gates(map) {
        const GA = map.GA;

        //keys
        for (const color in map.keys) {
            const grid = Grid.toCenter(map.keys[color]);
            const key = COMMON_ITEM_TYPE[`${color}Key`];
            ITEM3D.add(new FloorItem3D(grid, key));
        }

        //locked
        for (const color in map.lockedRooms) {
            const grid = map.lockedRooms[color].door[0];
            const gate = GATE_TYPE[color];
            GATE3D.add(new Gate(grid, gate));
            GA.closeDoor(grid);
        }

        //common
        const ignore = ["Silver", "Gold", "Red"];
        for (const R of map.rooms) {
            if (ignore.includes(R.type)) continue;
            for (const D of R.door) {
                GATE3D.add(new Gate(D, GATE_TYPE.Common));
                GA.closeDoor(D);
            }
        }
    },
    mapPointers(map) {
        map.map_pointers = [
            map.shrines.chooseRandom().grid,
            map.keys.Red,
            map.keys.Silver,
            map.keys.Gold
        ];
    },
    debug(map) {
        const items = [COMMON_ITEM_TYPE.GoldCube, COMMON_ITEM_TYPE.GoldBar, COMMON_ITEM_TYPE.GoldKey, COMMON_ITEM_TYPE.RedPotion, COMMON_ITEM_TYPE.Scroll, COMMON_ITEM_TYPE.Sword,
        COMMON_ITEM_TYPE.Heart, COMMON_ITEM_TYPE.Shield, COMMON_ITEM_TYPE.Mana, COMMON_ITEM_TYPE.Magic, COMMON_ITEM_TYPE.Chest, COMMON_ITEM_TYPE.TreasureChest,
        COMMON_ITEM_TYPE.Coins, COMMON_ITEM_TYPE.Sting];

        const start = map.findRoom("start");
        for (const item of items) {
            const grid = map.findSpace(start.area);
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), item));
        }
        const end = map.findRoom("Gold");
        for (const item of items) {
            const grid = map.findSpace(end.area);
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), item));
        }
        console.log("ITEM3D", ITEM3D);

        //monsters
        const grid = map.findSpace(start.area);
        ENTITY3D.add(new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE.GhostFace, UP));
    },
    containers(map) {
        for (const room of map.rooms) {
            const corner = map.roomCornerGrids(room);
            const type = weightedRnd({ Chest: 10, TreasureChest: 1 });
            ITEM3D.add(new FloorItem3D(Grid.toCenter(corner.grid), COMMON_ITEM_TYPE[type]));
        }
    },
    items(map) {
        this.containers(map);

        //health potions
        const roomPool = map.poolOfRoomGrids(SPAWN.INI.health_potions_per_level);
        for (const grid of roomPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.RedPotion));
        }

        //mana potions
        const corridorPool = map.poolOfCorridorGrids(SPAWN.INI.mana_potions_per_level);
        for (const grid of corridorPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.BluePotion));
        }

        //scrolls
        let anyPool = map.poolOfGrids(SPAWN.INI.scrolls_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.Scroll));
        }

        //gold
        anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldCube));
        }
        anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldBar));
        }
        anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.SilverBar));
        }
        anyPool = map.poolOfGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldBar));
        }

        //skills, upgrades
        const skills = [
            [COMMON_ITEM_TYPE.Sword, COMMON_ITEM_TYPE.Sting],
            [COMMON_ITEM_TYPE.Shield],
            [COMMON_ITEM_TYPE.Heart],
            [COMMON_ITEM_TYPE.Mana],
            [COMMON_ITEM_TYPE.Magic]
        ];
        const total = skills.length;
        let DE = map.freeDeadEnds(total);
        const remain = total - DE.length;
        if (remain > 0) {
            let addFromRoom = map.poolOfRoomGrids(remain);
            DE = DE.concat(addFromRoom);
        }
        for (let [index, grid] of DE.entries()) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), skills[index].chooseRandom()));
        }
    },
    monsters(map, level) {
        const corrGrids = map.poolOfCorridorGrids(MONSTER_LAYOUT[level].corridor.N);
        for (const grid of corrGrids) {
            const type = weightedRnd(MONSTER_LAYOUT[level].corridor.monster);
            ENTITY3D.add(new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP));
        }
        for (const room of map.rooms) {
            const N = MONSTER_LAYOUT[level][room.type].N;
            for (let i = 0; i < N; i++) {
                const grid = map.findSpace(room.area);
                const type = weightedRnd(MONSTER_LAYOUT[level][room.type].monster);
                const enemy = new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP);
                const guardPosition = map.findMiddleSpaceUnreserved(room.area);
                enemy.setGuardPosition(guardPosition);
                ENTITY3D.add(enemy);
            }
            const boss = MONSTER_LAYOUT[level][room.type].boss;
            if (boss) {
                const grid = map.findSpace(room.area);
                const type = weightedRnd(MONSTER_LAYOUT[level][room.type].boss);
                const enemy = new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP);
                const guardPosition = map.findMiddleSpaceUnreserved(room.area);
                enemy.setGuardPosition(guardPosition);
                ENTITY3D.add(enemy);
            }
        }
        //analysis
        if (DEBUG.VERBOSE) ENTITY3D.analyze();
    },
    arena(level) {
        const map = MAP[level].map;
        this.stairs(map, level);
        this.gates(map);
        this.shrines(map);
        this.arenaLights(map);
        this.arenaDecals(map);
        this.arenaItems(map);
        this.arenaMonsters(map, level);
        map.map_pointers = [];
    },
    arenaMonsters(map, level) {
        const corrGrids = map.poolOfCorridorGrids(MONSTER_LAYOUT[level].corridor.N);
        for (const grid of corrGrids) {
            const type = weightedRnd(MONSTER_LAYOUT[level].corridor.monster);
            ENTITY3D.add(new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP));
        }

        const boss = MONSTER_LAYOUT[level].boss;
        const N = Object.keys(boss).length;
        const bossGrids = map.poolOfCorridorGrids(N);
        for (let [index, type] of Object.keys(boss).entries()) {
            const grid = bossGrids[index];
            ENTITY3D.add(new $3D_Entity(Grid.toCenter(grid), MONSTER_TYPE[type], UP));
        }

        //analysis
        if (DEBUG.VERBOSE) ENTITY3D.analyze();
    },
    arenaDecals(map) {
        //corridor decals
        const N = (map.width * map.height * parseFloat(map.density) * 0.11) | 0;
        const corrDecalGrids = map.poolOfCorridorDecalGrids(N);
        for (let grid of corrDecalGrids) {
            const type = weightedRnd({ picture: 10, crest: 20 });
            const source = DECAL_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[source], type, source));
        }

        //top, bottom corridor decals
        const TB = (map.width * map.height * parseFloat(map.density) * 0.03) | 0;
        const corrGrids = map.poolOfUnreservedCorridorGrids(TB);
        for (let grid of corrGrids) {
            const type = weightedRnd({ TOP: 10, BOTTOM: 5 });
            const source = TOP_BOTTOM_SOURCES[type].chooseRandom();
            DECAL3D.add(new StaticDecal(grid, type, SPRITE[source], "crest", source));
        }
    },
    arenaLights(map) {
        const N = (map.width * map.height * parseFloat(map.density) * 0.015) | 0;
        const corrDecalGrids = map.poolOfDistancedCorridorDecalGrids(N);
        for (let grid of corrDecalGrids) {
            const light = LIGHT_DECALS.chooseRandom();
            LIGHTS3D.add(new LightDecal(grid.grid, DirectionToFace(grid.dir), SPRITE[light.sprite], "light", light.sprite, light.color));
        }
    },
    arenaItems(map) {
        //health potions
        const roomPool = map.poolOfCorridorGrids(SPAWN.INI.health_potions_per_level);
        for (const grid of roomPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.RedPotion));
        }
        //mana potions
        const corridorPool = map.poolOfCorridorGrids(SPAWN.INI.mana_potions_per_level);
        for (const grid of corridorPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.BluePotion));
        }
        //scrolls
        let anyPool = map.poolOfCorridorGrids(SPAWN.INI.scrolls_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.Scroll));
        }

        //gold
        anyPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldCube));
        }
        anyPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldBar));
        }
        anyPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.SilverBar));
        }
        anyPool = map.poolOfCorridorGrids(SPAWN.INI.gold_per_level);
        for (const grid of anyPool) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE.GoldBar));
        }

        //skills, upgrades
        const skills = [
            [COMMON_ITEM_TYPE.Sword, COMMON_ITEM_TYPE.Sting],
            [COMMON_ITEM_TYPE.Shield],
            [COMMON_ITEM_TYPE.Heart],
            [COMMON_ITEM_TYPE.Mana],
            [COMMON_ITEM_TYPE.Magic]
        ];
        const total = skills.length;
        const pool = map.poolOfCorridorGrids(total);
        for (let [index, grid] of pool.entries()) {
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), skills[index].chooseRandom()));
        }

        //chests
        const chestPool = map.poolOfCorridorGrids(SPAWN.INI.chest_per_arena);
        for (const grid of chestPool) {
            const type = weightedRnd({ Chest: 10, TreasureChest: 1 });
            ITEM3D.add(new FloorItem3D(Grid.toCenter(grid), COMMON_ITEM_TYPE[type]));
        }
    },
    study(level) {
        const map = MAP[level].map;
        this.stairs(map, level);
        this.studyLights();
        this.studyDecals();
        this.studyItems();
        this.studyMonsters();
    },
    studyDecals() {
        const decalsLocations = [
            { grid: new Grid(2, 2), face: 'FRONT' },
            { grid: new Grid(5, 2), face: 'FRONT' },
            { grid: new Grid(3, 5), face: 'BACK' },
            { grid: new Grid(0, 3), face: 'RIGHT' },
            { grid: new Grid(7, 3), face: 'LEFT' },
            { grid: new Grid(2, 7), face: 'BACK' },
            { grid: new Grid(3, 0), face: 'FRONT' },
            { grid: new Grid(3, 15), face: 'BACK' },
            { grid: new Grid(3, 7), face: 'FRONT' },
            { grid: new Grid(12, 0), face: 'FRONT' },
            { grid: new Grid(7, 4), face: 'LEFT' },
            { grid: new Grid(7, 4), face: 'RIGHT' },
            { grid: new Grid(13, 3), face: 'LEFT' },
            { grid: new Grid(13, 5), face: 'LEFT' },
        ];

        for (let D of decalsLocations) {
            const picture = DECAL_PAINTINGS.chooseRandom();
            console.log("picture", picture);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[picture], "picture", picture));
        }

        const crestLocations = [
            { grid: new Grid(0, 5), face: 'RIGHT' },
            { grid: new Grid(10, 2), face: 'FRONT' },
            { grid: new Grid(13, 3), face: 'FRONT' },
            { grid: new Grid(7, 10), face: 'LEFT' },
            { grid: new Grid(0, 11), face: 'RIGHT' },

        ];
        for (let D of crestLocations) {
            const crest = DECAL_CRESTS.chooseRandom();
            console.log("crest", crest);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[crest], "crest", crest));
        }

        const bottomCrestLocations = [
            //TOP
            { grid: new Grid(2, 5), face: 'TOP' },
            { grid: new Grid(12, 4), face: 'TOP' }
        ];
        for (let D of bottomCrestLocations) {
            const crest = TOP_CRESTS.chooseRandom();
            console.log("crest", crest);
            DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[crest], "crest", crest));
        }

        if (WebGL.CONFIG.firstperson) {
            const topCrestLocations = [
                //BOTTOM
                { grid: new Grid(2, 5), face: 'BOTTOM' },
            ];
            for (let D of topCrestLocations) {
                const crest = BOTTOM_CRESTS.chooseRandom();
                console.log("crest", crest);
                DECAL3D.add(new StaticDecal(D.grid, D.face, SPRITE[crest], "crest", crest));
            }
        }
    },
    studyLights() {
        const lightLocations = [
            { grid: new Grid(1, 0), face: 'FRONT', light: LIGHT_DECALS[0] },
            { grid: new Grid(6, 0), face: 'FRONT', light: LIGHT_DECALS[0] },
            { grid: new Grid(11, 15), face: 'BACK', light: LIGHT_DECALS[0] },
            { grid: new Grid(15, 9), face: 'LEFT', light: LIGHT_DECALS[4] },
            { grid: new Grid(15, 1), face: 'LEFT', light: LIGHT_DECALS[0] },
            { grid: new Grid(1, 15), face: 'BACK', light: LIGHT_DECALS[0] },
            { grid: new Grid(6, 15), face: 'BACK', light: LIGHT_DECALS[0] },
            { grid: new Grid(10, 2), face: 'RIGHT', light: LIGHT_DECALS[0] },
        ];
        for (let L of lightLocations) {
            const light = L.light;
            LIGHTS3D.add(new LightDecal(L.grid, L.face, SPRITE[light.sprite], "light", light.sprite, light.color));
        }
    },
    studyItems() {
        const itemLocations = [
            { grid: new FP_Grid(1.5, 1.5), type: COMMON_ITEM_TYPE.Chest },
            { grid: new FP_Grid(1.5, 2.5), type: COMMON_ITEM_TYPE.Chest },
            { grid: new FP_Grid(2.5, 1.5), type: COMMON_ITEM_TYPE.GoldCube },
            { grid: new FP_Grid(6.5, 2.5), type: COMMON_ITEM_TYPE.TreasureChest },
            { grid: new FP_Grid(1.5, 13.5), type: COMMON_ITEM_TYPE.Sting },
            { grid: new FP_Grid(6.5, 13.5), type: COMMON_ITEM_TYPE.Shield },
            { grid: new FP_Grid(12.5, 9.5), type: COMMON_ITEM_TYPE.Sword },
            { grid: new FP_Grid(11.5, 9.5), type: COMMON_ITEM_TYPE.Scroll },
            { grid: new FP_Grid(10.5, 13.5), type: COMMON_ITEM_TYPE.GoldCube },
            { grid: new FP_Grid(11.5, 13.5), type: COMMON_ITEM_TYPE.GoldBar },
            { grid: new FP_Grid(12.5, 13.5), type: COMMON_ITEM_TYPE.SilverBar },
            { grid: new FP_Grid(12.5, 5.5), type: COMMON_ITEM_TYPE.TreasureChest },
            { grid: new FP_Grid(12.0, 5.0), type: COMMON_ITEM_TYPE.Sting },
            { grid: new FP_Grid(12.0, 3.5), type: COMMON_ITEM_TYPE.Shield },
            { grid: new FP_Grid(11.0, 5.0), type: COMMON_ITEM_TYPE.Scroll },
        ];

        for (let item of itemLocations) {
            ITEM3D.add(new FloorItem3D(item.grid, item.type));
        }
    },
    studyMonsters() {
        const monsterLocations = [
            { grid: new FP_Grid(5.5, 4.5), dir: UP, type: MONSTER_TYPE.MissGalaxyDemo },
            { grid: new FP_Grid(12.5, 4.5), dir: UP, type: MONSTER_TYPE.MissGalaxyDemo },
            { grid: new FP_Grid(11.5, 4.5), dir: UP, type: MONSTER_TYPE.SkeletonDemo },
        ];
        for (let monster of monsterLocations) {
            ENTITY3D.add(new $3D_Entity(monster.grid, monster.type, monster.dir));
        }
    }
};

/*const MONSTER_TYPE = {
    Spider: {
        name: "Spider",
        model: "Spider",
        scale: 1.4 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.3,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 7,
        defense: 3,
        magic: 0,
        health: 8,
        xp: 10,
        gold: 15,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [5, ["wanderer"], 3, ["follower"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    SpiderGreen: {
        name: "SpiderGreen",
        texture: "SpiderGreen",
        model: "Spider",
        scale: 1.4 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.3,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 9,
        defense: 5,
        magic: 2,
        health: 12,
        xp: 15,
        gold: 20,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 3, ["follower"]],
        moveSpeed: 1.1,
        material: MATERIAL.standard,
    },
    MissGalaxyGold: {
        name: "MissGalaxyGold",
        texture: "MissGalaxyGold",
        model: "MissGalaxy",
        scale: 1.0 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 11,
        defense: 6,
        magic: 4,
        health: 20,
        xp: 20,
        gold: 20,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.gold,
    },
    MissGalaxy: {
        name: "MissGalaxy",
        model: "MissGalaxy",
        scale: 0.9 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 8,
        defense: 4,
        magic: 2,
        health: 10,
        xp: 10,
        gold: 15,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    MissGalaxyGreen: {
        name: "MissGalaxyGreen",
        texture: "MissGalaxyGreen",
        model: "MissGalaxy",
        scale: 0.8 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 5,
        defense: 3,
        magic: 2,
        health: 8,
        xp: 6,
        gold: 10,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [5, ["wanderer"], 3, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    Hulk: {
        name: "Hulk",
        model: "Hulk",
        scale: 1.5 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 20,
        defense: 12,
        magic: 5,
        health: 40,
        xp: 50,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [10, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.greenShine,
    },
    Hulk_BossL2: {
        name: "Hulk_BossL2",
        model: "Hulk",
        scale: 1.5 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Shield",
        attack: 20,
        defense: 12,
        magic: 5,
        health: 50,
        xp: 120,
        gold: 0,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [Infinity, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.greenShine,
    },
    Viking: {
        name: "Viking",
        model: "Viking",
        scale: 0.9 / 2 ** 8,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 15,
        defense: 7,
        magic: 5,
        health: 30,
        xp: 30,
        gold: 30,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    Astro: {
        name: "Astro",
        model: "Astro",
        scale: 1.5 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 12,
        defense: 8,
        magic: 7,
        health: 23,
        xp: 30,
        gold: 30,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 5, ["shoot"]],
        moveSpeed: 1.0,
        mana: 2,
        caster: true,
        shootDistance: 5,
        stalkDistance: 6,
        material: MATERIAL.standard,
    },
    AstroRed: {
        name: "AstroRed",
        texture: "AstroRed",
        model: "Astro",
        scale: 1.7 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 18,
        defense: 10,
        magic: 10,
        health: 30,
        xp: 60,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 5, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 5,
        stalkDistance: 6,
        material: MATERIAL.redShine,
    },
    MissWhite: {
        name: "MissWhite",
        model: "MissWhite",
        scale: 1.5 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 10,
        defense: 7,
        magic: 10,
        health: 25,
        xp: 40,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [8, ["wanderer"], 6, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 6,
        stalkDistance: 3,
        material: MATERIAL.standard,
    },
    MissGreen: {
        name: "MissGreen",
        texture: "GhostFaceGreen",
        model: "MissWhite",
        scale: 1.6 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 15,
        defense: 10,
        magic: 12,
        health: 30,
        xp: 50,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [8, ["wanderer"], 6, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 6,
        stalkDistance: 3,
        material: MATERIAL.standard,
    },
    MissWhite_BossL1: {
        name: "MissWhite_BossL1",
        model: "MissWhite",
        scale: 1.5 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Mana",
        attack: 10,
        defense: 5,
        magic: 10,
        health: 30,
        xp: 100,
        gold: 0,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [Infinity, ["wanderer"], 6, ["shoot"]],
        moveSpeed: 1.0,
        mana: 5,
        caster: true,
        shootDistance: 6,
        stalkDistance: 3,
        material: MATERIAL.standard,
    },
    GhostFace: {
        name: "GhostFace",
        model: "GhostFace",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 6,
        defense: 4,
        magic: 5,
        health: 10,
        xp: 25,
        gold: 25,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
        material: MATERIAL.standard,
    },
    GhostFaceGreen: {
        name: "GhostFaceGreen",
        texture: "GhostFaceGreen",
        model: "GhostFace",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 8,
        defense: 6,
        magic: 7,
        health: 15,
        xp: 30,
        gold: 30,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.05,
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
        material: MATERIAL.standard,
    },
    Bat: {
        name: "Bat",
        model: "Bat",
        scale: 1.2 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.0,
        fly: 0.5,
        deathType: "SmokeExplosion",
        inventory: null,
        attack: 1,
        defense: 0,
        magic: 0,
        health: 1,
        xp: 1,
        gold: 0,
        attackSound: "BatAttack",
        hurtSound: "BatAttack",
        behaviourArguments: [Infinity, ["wanderer"], -1],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    RedGoldBat: {
        name: "RedGoldBat",
        texture: "RedGoldBat",
        model: "Bat",
        scale: 1.2 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.0,
        fly: 0.5,
        deathType: "SmokeExplosion",
        inventory: null,
        attack: 2,
        defense: 1,
        magic: 0,
        health: 2,
        xp: 3,
        gold: 0,
        attackSound: "BatAttack",
        hurtSound: "BatAttack",
        behaviourArguments: [Infinity, ["wanderer"], -1],
        moveSpeed: 1.0,
        material: MATERIAL.redShine,
    },
    Wolf: {
        name: "Wolf",
        model: "Wolf",
        scale: 1.7 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 18,
        defense: 12,
        magic: 10,
        health: 30,
        xp: 50,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt3",
        behaviourArguments: [10, ["wanderer"], 5, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.standard,
    },
    Skeleton: {
        name: "WhiteSkeleton",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: "Coins",
        attack: 20,
        defense: 13,
        magic: 12,
        health: 35,
        xp: 50,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.standardShine,
    },
    RedSkeleton: {
        name: "RedSkeleton",
        texture: "Red2",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: "Coins",
        attack: 23,
        defense: 16,
        magic: 15,
        health: 42,
        xp: 60,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.redShine,
    },
    GoldSkeleton: {
        name: "GoldSkeleton",
        texture: "Gold",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: "Coins",
        attack: 30,
        defense: 20,
        magic: 20,
        health: 60,
        xp: 70,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.gold,
    },
    GoldSkeleton_BossL4: {
        name: "GoldSkeleton_BossL4",
        texture: "Gold",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: "Shield",
        attack: 30,
        defense: 20,
        magic: 20,
        health: 150,
        xp: 250,
        gold: 0,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [Infinity, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.gold,
    },
    SilverSkeleton: {
        name: "SilverSkeleton",
        texture: "Silver",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: "Coins",
        attack: 26,
        defense: 16,
        magic: 17,
        health: 50,
        xp: 65,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.silver,
    },
    Goblin: {
        name: "Goblin",
        model: "Goblin",
        scale: 1.01 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 25,
        defense: 15,
        magic: 25,
        health: 50,
        xp: 80,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
        material: MATERIAL.standard,
    },
    Goblin_BossL3: {
        name: "Goblin_BossL3",
        model: "Goblin",
        scale: 1.1 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Heart",
        attack: 25,
        defense: 15,
        magic: 25,
        health: 75,
        xp: 200,
        gold: 0,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [Infinity, ["wanderer"], 4, ["shoot"]],
        moveSpeed: 1.0,
        mana: 5,
        caster: true,
        shootDistance: 4,
        stalkDistance: 5,
        material: MATERIAL.standard,
    },
    Drax: {
        name: "Drax",
        model: "Drax",
        scale: 1.5 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 50,
        defense: 25,
        magic: 25,
        health: 100,
        xp: 125,
        gold: 100,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [Infinity, ["wanderer"], 10, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 10,
        stalkDistance: 12,
        material: MATERIAL.standard,
    },
    Drax_BossL5: {
        name: "Drax",
        model: "Drax",
        scale: 1.5 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "GoldKey",
        attack: 50,
        defense: 25,
        magic: 25,
        health: 200,
        xp: 250,
        gold: 0,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [Infinity, ["wanderer"], 10, ["shoot"]],
        moveSpeed: 1.0,
        mana: 5,
        caster: true,
        shootDistance: 10,
        stalkDistance: 12,
        material: MATERIAL.standard,
        final_boss: true,
    },
    MissGalaxyDemo: {
        name: "MissGalaxyDemo",
        texture: "MissGalaxyGreen",
        model: "MissGalaxy",
        scale: 0.8 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: "Coins",
        attack: 1,
        defense: 0,
        magic: 0,
        health: 1,
        xp: 6,
        gold: 10,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [5, ["wanderer"], 3, ["advancer"]],
        moveSpeed: 0.01,
        material: MATERIAL.standard,
    },
    SkeletonDemo: {
        name: "WhiteSkeletonDemo",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: "Coins",
        attack: 1,
        defense: 0,
        magic: 0,
        health: 1,
        xp: 1,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 0.01,
        material: MATERIAL.standardShine,
    },
};
*/

/*const SHRINE_TYPE = {
    AttackShrine: {
        name: "AttackShrine",
        sprite: "AttackShrine",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
    },
    DefenseShrine: {
        name: "DefenseShrine",
        sprite: "DefenseShrine",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
    },
    MagicShrine: {
        name: "MagicShrine",
        sprite: "MagicShrine",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
    },
};*/

/*const GATE_TYPE = {
    Common: {
        name: "Common",
        color: null,
        locked: false,
        texture: "WoodenGate1",
        element: "CUBE_SM",
        material: MATERIAL.standardShine,
    },
 
};*/



const KEY_TYPES = ["Gold", "Silver", "Red", "Green", "Blue"];
const KEY_TEXTURES = ["Gold", "Silver", "RedMetal", "GreenMetal", "BlueMetal"];
const KEY_MATERIAL = ["gold", "silver", "redShine", "greenShine", "blueShine"];
const KEY_TYPE = {};
for (let [index, key] of KEY_TYPES.entries()) {
    KEY_TYPE[key] = new KeyTypeDefinition(key, `${key}Key`, key, KEY_TEXTURES[index], MATERIAL[KEY_MATERIAL[index]]);
}
//console.info("KEY_TYPE", KEY_TYPE);
const POTION_TYPES = ["Red", "Blue"];
const POTION_TEXTURES = ["RedLiquid", "BlueLiquid"];
const POTION_MATERIAL = ["redShine", "blueShine"];
const POTION_TYPE = {};
for (let [index, potion] of POTION_TYPES.entries()) {
    POTION_TYPE[potion] = new PotionTypeDefinition(`${potion}Potion`, `${potion}Potion24`, potion.toLowerCase(), POTION_TEXTURES[index], MATERIAL[POTION_MATERIAL[index]]);
}
//console.info("POTION_TYPE", POTION_TYPE);

const HERO_TYPE = {
    ThePrincess: {
        name: "ThePrincess",
        model: "Princess",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        material: MATERIAL.standard,
        moveSpeed: 2.0
    }
};