/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

/**
 * definition of:
 *      monsters
 *      scrolls
 *      other item types
 */

"use strict";
console.log("%cMonsters for CCC loaded.", "color: #888");
const GATE_TYPES = ["Open", "Closed", "Gold", "Silver", "Red", "Green", "Blue", "Up", "Down", "Emerald"];

const SCROLL_TYPE = ["Light", "Invisibility", "DrainMana", "Cripple", "BoostWeapon", "BoostArmor", "DestroyArmor", "DestroyWeapon",
    "Petrify", "MagicBoost", "Luck", "HalfLife", "Explode", "Radar"];

const SHRINE_TYPE = {
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
};

const ORACLE_TYPE = {
    BlondeOracle: {
        name: "BlondeOracle",
        sprite: "BlondeOracle",
        category: 'crest',
        voice: "Female",
        text: "If the bug has not been solved, run away, don't be too bold.",
        interactionCategory: "oracle",
    },
    SpiderDominaOracle: {
        name: "SpiderDominaOracle",
        sprite: "SpiderDominaOracle",
        category: 'crest',
        voice: "Female",
        text: "I heard the maze of Lady Fox is infested with spiders.",
        interactionCategory: "oracle",
    },
    SpiderDominaOracle2: {
        name: "SpiderDominaOracle2",
        sprite: "SpiderDominaOracle2",
        category: 'crest',
        voice: "Female",
        text: "Don't miss the spider in this dungeon.",
        interactionCategory: "oracle",
    },
    CatOracle: {
        name: "CatOracle",
        sprite: "CatOracle",
        category: 'crest',
        voice: "Female",
        text: "There are five cats around. Find them all.",
        interactionCategory: "oracle",
    },
    RedRidingOracle: {
        name: "RedRidingOracle",
        sprite: "RedRidingOracle",
        category: 'crest',
        voice: "Female",
        text: "If you want to be sure something is poisoned, use many bottles of poison.",
        interactionCategory: "oracle",
    },
    PunisherOracle: {
        name: "PunisherOracle",
        sprite: "PunisherOracle",
        category: 'crest',
        voice: "Female",
        text: "Punisher will sell you a key to continue the quest, but it's wiser to invest in training first.",
        interactionCategory: "oracle",
    },
    DungeonOracle: {
        name: "DungeonOracle",
        sprite: "DungeonOracle",
        category: 'crest',
        voice: "Female",
        text: "Everybody loves chicken. Except those that want fish. Or something else.",
        interactionCategory: "oracle",
    },
};

const GOLD_ITEM_TYPE = {
    GoldBar: {
        name: "GoldBar",
        category: "gold",
        element: "BAR",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Gold",
        minVal: 50,
        maxVal: 100,
        value: 100,
        material: MATERIAL.gold,
    },
    SilverBar: {
        name: "SilverBar",
        category: "gold",
        element: "BAR",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Silver",
        minVal: 25,
        maxVal: 50,
        value: 50,
        material: MATERIAL.silver,
    },
    GoldCube: {
        name: "GoldCube",
        category: "gold",
        element: "CUBE_CENTERED",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "Gold",
        minVal: 10,
        maxVal: 25,
        value: 25,
        material: MATERIAL.gold,
    },
    Coins: {
        name: "Coins",
        category: "gold",
        element: "COINS",
        scale: 1.5 / 2 ** 0,
        glueToFloor: true,
        texture: "Coins",
        minVal: 10,
        maxVal: 25,
        value: 10,
        material: MATERIAL.gold,
    },
};

const SKILL_ITEM_TYPE = {
    Sword: {
        name: "Sword",
        category: "skill",
        which: "attack",
        element: "SWORD",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Sword",
        inventorySprite: "SwordSkill",
        material: MATERIAL.silver,
    },
    Shield: {
        name: "Shield",
        category: "skill",
        which: "defense",
        element: "SHIELD",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "ScrapedMetal",
        inventorySprite: "ShieldSkill",
        material: MATERIAL.silver,
    },
    Magic: {
        name: "Magic",
        category: "skill",
        which: "magic",
        element: "PENTAGRAM",
        scale: 1 / 2 ** 1,
        glueToFloor: true,
        texture: "Red2",
        inventorySprite: "MagicSkill",
        material: MATERIAL.redShine,
    },
    Heart: {
        name: "Heart",
        category: "status",
        which: "health",
        element: "HEART",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "Red",
        inventorySprite: "Health",
        material: MATERIAL.redShine,
    },
    Mana: {
        name: "ManaSkill",
        category: "status",
        which: "mana",
        element: "BALL",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Magic",
        inventorySprite: "Mana",
        material: MATERIAL.standard,
    },
    Sting: {
        name: "Sting",
        category: "skill",
        which: "attack",
        element: "STING",
        scale: 1 / 2 ** 1,
        glueToFloor: true,
        texture: "Sting",
        inventorySprite: "SwordSkill",
        material: MATERIAL.silver,
    },
};

const CONTAINER_ITEM_TYPE = {
    Chest: {
        name: "Chest",
        category: "chest",
        element: "CHEST",
        scale: 1 / 2 ** 3,
        glueToFloor: true,
        texture: "Wood1",
        material: MATERIAL.standard,
        rotateToNorth: Math.PI / 2,
    },
    TreasureChest: {
        name: "TreasureChest",
        category: "chest",
        element: "TREASURE_CHEST",
        scale: 1.5 / 2 ** 3,
        glueToFloor: true,
        texture: "TreasureChest",
        material: MATERIAL.standard,
        rotateToNorth: 0,
    },
    Wardrobe: {
        name: "Wardrobe",
        category: "chest",
        element: "WARDROBE",
        scale: 1.23 / 2 ** 2,
        glueToFloor: true,
        texture: "Wardrobe",
        material: MATERIAL.standard,
        rotateToNorth: Math.PI,
    },
    Barrel: {
        name: "Barrel",
        category: "chest",
        element: "BARREL",
        scale: 1.15 / 2 ** 1,
        glueToFloor: true,
        texture: "Barrel",
        material: MATERIAL.standard,
        rotateToNorth: 0,
    },
    Crate: {
        name: "Crate",
        category: "chest",
        element: "CRATE",
        scale: 1.25 / 2 ** 3,
        glueToFloor: true,
        texture: "Crate",
        material: MATERIAL.standard,
        rotateToNorth: 0,
    },
};

const DOOR_TYPE = {
    Common: {
        name: "Common",
        color: null,
        locked: false,
        texture: "WoodenGate1",
        element: "CUBE_SM",
        material: MATERIAL.standardShine,
    },

};

const COMMON_ITEM_TYPE = {
    Scroll: {
        name: "Scroll",
        category: "scroll",
        element: "SCROLL",
        scale: 1.5 / 2 ** 4,
        glueToFloor: true,
        texture: "ScrollTexture",
        material: MATERIAL.paper,
    },
    Fireball: {
        name: "Fireball",
        category: 'missile',
        element: "BALL",
        scale: 1 / 2 ** 4,
        texture: "FireballTexture",
        moveSpeed: 8.0,
        lightColor: "#FF7700",
        material: MATERIAL.fire,
        construct: Missile,
    },
    Bounceball: {
        name: "Bounceball",
        category: 'missile',
        element: "BALL",
        scale: 1.5 / 2 ** 4,
        texture: "GreenMetal",
        moveSpeed: 8.0,
        lightColor: "#006600",
        material: MATERIAL.greenFluence,
        construct: BouncingMissile,
    },
};

const MONSTER_TYPE = {
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
    MissGalaxyGreen: {
        name: "MissGalaxyGreen",
        texture: "MissGalaxyGreen",
        model: "MissGalaxy",
        scale: 0.8 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
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
        material: MATERIAL.greenShine,
    },
    Spider: {
        name: "Spider",
        model: "Spider",
        scale: 1.4 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.35,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
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
    MissGreen: {
        name: "MissGreen",
        texture: "GhostFaceGreen",
        model: "MissWhite",
        scale: 1.5 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 9,
        defense: 3,
        magic: 8,
        health: 10,
        xp: 25,
        gold: 25,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [10, ["wanderer"], 7, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 7,
        stalkDistance: 5,
        material: MATERIAL.greenShine,
        missile: BouncingMissile,
        missileType: COMMON_ITEM_TYPE.Bounceball,
    },
    SpiderGreen: {
        name: "SpiderGreen",
        texture: "SpiderGreen",
        model: "Spider",
        scale: 1.4 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.35,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 10,
        defense: 5,
        magic: 3,
        health: 12,
        xp: 15,
        gold: 20,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [7, ["wanderer"], 3, ["follower"]],
        moveSpeed: 1.1,
        material: MATERIAL.standard,
    },
    MissGalaxy: {
        name: "MissGalaxy",
        model: "MissGalaxy",
        scale: 0.9 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 12,
        defense: 5,
        magic: 3,
        health: 15,
        xp: 20,
        gold: 15,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [7, ["wanderer"], 5, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standardShine,
    },
    MissWhite: {
        name: "MissWhite",
        model: "MissWhite",
        scale: 1.6 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 15,
        defense: 7,
        magic: 10,
        health: 15,
        xp: 40,
        gold: 50,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [12, ["wanderer"], 10, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 10,
        stalkDistance: 3,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    MissGalaxyGold: {
        name: "MissGalaxyGold",
        texture: "MissGalaxyGold",
        model: "MissGalaxy",
        scale: 1.1 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 16,
        defense: 8,
        magic: 4,
        health: 20,
        xp: 30,
        gold: 30,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.gold,
    },
    Viking: {
        name: "Viking",
        model: "Viking",
        scale: 0.9 / 2 ** 8,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 20,
        defense: 10,
        magic: 5,
        health: 25,
        xp: 30,
        gold: 30,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    GhostMinion: {
        name: "GhostMinion",
        model: "GhostFace",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 20,
        defense: 10,
        magic: 15,
        health: 30,
        xp: 50,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [15, ["wanderer"], 12, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 12,
        stalkDistance: 5,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Wolf: {
        name: "Wolf",
        model: "Wolf",
        scale: 1.7 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 22,
        defense: 16,
        magic: 12,
        health: 30,
        xp: 50,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt3",
        behaviourArguments: [10, ["wanderer"], 5, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.standard,
    },
    Astro: {
        name: "Astro",
        model: "Astro",
        scale: 1.5 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 24,
        defense: 18,
        magic: 15,
        health: 35,
        xp: 40,
        gold: 40,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [7, ["wanderer"], 5, ["shoot"]],
        moveSpeed: 1.0,
        mana: 2,
        caster: true,
        shootDistance: 5,
        stalkDistance: 6,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    AstroRed: {
        name: "AstroRed",
        texture: "AstroRed",
        model: "Astro",
        scale: 1.7 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 25,
        defense: 18,
        magic: 16,
        health: 42,
        xp: 50,
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
        missile: BouncingMissile,
        missileType: COMMON_ITEM_TYPE.Bounceball,
    },
    GhostMinionGreen: {
        name: "GhostMinionGreen",
        texture: "GhostFaceGreen",
        model: "GhostFace",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 25,
        defense: 15,
        magic: 20,
        health: 40,
        xp: 60,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [15, ["wanderer"], 12, ["shoot"]],
        moveSpeed: 1.05,
        mana: 3,
        caster: true,
        shootDistance: 12,
        stalkDistance: 5,
        material: MATERIAL.standard,
        missile: BouncingMissile,
        missileType: COMMON_ITEM_TYPE.Bounceball,
    },
    GhostMinionGreen2: {
        name: "GhostMinionGreen2",
        texture: "GhostFaceGreen",
        model: "GhostFace",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 25,
        defense: 15,
        magic: 20,
        health: 40,
        xp: 60,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [15, ["wanderer"], 12, ["shoot"]],
        moveSpeed: 1.05,
        mana: 3,
        caster: true,
        shootDistance: 12,
        stalkDistance: 5,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    GreatChick: {
        name: "GreatChick",
        model: "Chicken",
        scale: 1 / 2 ** 5,
        rotateToNorth: -Math.PI / 2,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 50,
        defense: 0,
        magic: 0,
        health: 50,
        xp: 25,
        gold: 1,
        attackSound: "MonsterAttack1",
        hurtSound: "PainSqueek",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.2,
        material: MATERIAL.standard,
    },
    GreatCat: {
        name: "GreatCat",
        model: "Cat",
        scale: 1.7 / 2 ** 7,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 60,
        defense: 0,
        magic: 0,
        health: 60,
        xp: 30,
        gold: 1,
        attackSound: "AngryCat",
        hurtSound: "PainSqueek",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.2,
        material: MATERIAL.standard,
    },
    Skeleton: {
        name: "WhiteSkeleton",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 30,
        defense: 20,
        magic: 20,
        health: 45,
        xp: 75,
        gold: 75,
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
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 35,
        defense: 25,
        magic: 20,
        health: 50,
        xp: 80,
        gold: 80,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.redShine,
    },
    SilverSkeleton: {
        name: "SilverSkeleton",
        texture: "Silver",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 38,
        defense: 28,
        magic: 20,
        health: 50,
        xp: 90,
        gold: 90,
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
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 30,
        defense: 20,
        magic: 25,
        health: 50,
        xp: 100,
        gold: 100,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [10, ["wanderer"], 7, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 7,
        stalkDistance: 8,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Dragon: {
        name: "Dragon",
        model: "Dragon",
        scale: 1.9 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.25,
        fly: 0.25,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 37,
        defense: 30,
        magic: 30,
        health: 50,
        xp: 100,
        gold: 100,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [10, ["wanderer"], 7, ["shoot"]],
        moveSpeed: 1.0,
        mana: 5,
        caster: true,
        shootDistance: 7,
        stalkDistance: 8,
        material: MATERIAL.gold,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Basilisk: {
        name: "Basilisk",
        model: "Basilisk",
        scale: 1.8 / 2 ** 9,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 40,
        defense: 30,
        magic: 25,
        health: 50,
        xp: 100,
        gold: 100,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 0.85,
        material: MATERIAL.greenFluence,
    },
    /** not tuned */
    Rex: {
        name: "Rex",
        model: "Rex",
        scale: 1.5 / 2 ** 9,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 30,
        defense: 20,
        magic: 25,
        health: 50,
        xp: 100,
        gold: 100,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [10, ["wanderer"], 7, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 7,
        stalkDistance: 8,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
};

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

/**
 * interaction entities, items and objects
 */

const INTERACTION_OBJECT = {
    Apple: {
        name: "Apple",
        category: "interaction_item",
        element: "APPLE",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Apple_BaseColor",
        material: MATERIAL.standard,
        inventorySprite: "Apple",
        text: "Oh, it's an apple."
    },
    Pear: {
        name: "Pear",
        category: "interaction_item",
        element: "PEAR",
        scale: 1 / 2 ** 7,
        glueToFloor: true,
        texture: "Pear_baseColor",
        material: MATERIAL.standard,
        inventorySprite: "Pear",
        text: "Juicy pear? How nice."
    },
    RedGem: {
        name: "RedGem",
        category: "interaction_item",
        element: "GEM",
        scale: 1.1 / 2 ** 4,
        glueToFloor: true,
        texture: "Red",
        material: MATERIAL.standard,
        inventorySprite: "RedGem",
        text: "Nice? Shiny? I'll keep that."
    },
    BlueGem: {
        name: "BlueGem",
        category: "interaction_item",
        element: "GEM",
        scale: 1.1 / 2 ** 4,
        glueToFloor: true,
        texture: "BlueMetal",
        material: MATERIAL.standard,
        inventorySprite: "BlueGem",
        text: "Nice? Shiny? I'll keep that."
    },
    GreenGem: {
        name: "GreenGem",
        category: "interaction_item",
        element: "GEM",
        scale: 1.1 / 2 ** 4,
        glueToFloor: true,
        texture: "GreenMetal",
        material: MATERIAL.standard,
        inventorySprite: "GreenGem",
        text: "Nice? Shiny? I'll keep that."
    },
    Sword: {
        name: "Sword",
        category: "interaction_item",
        element: "STING",
        scale: 1 / 2 ** 1,
        glueToFloor: true,
        texture: "Sting",
        material: MATERIAL.silver,
        inventorySprite: "Sword",
        text: "I'll put that sword in the bag."
    },
    CrystallBall: {
        name: "CrystallBall",
        category: "interaction_item",
        element: "BALL",
        scale: 0.65 / 2 ** 4,
        glueToFloor: true,
        texture: "Marble",
        material: MATERIAL.standardShine,
        inventorySprite: "CrystallBall",
        text: "Oh, crystall ball? I can see the future. Bad for Ghostface."
    },
    Shield: {
        name: "Shield",
        category: "interaction_item",
        element: "SHIELD",
        scale: 1 / 2 ** 5,
        glueToFloor: true,
        texture: "ScrapedMetal",
        inventorySprite: "Shield",
        material: MATERIAL.silver,
        text: "I'll put that shield in the bag."
    },
    Skull: {
        name: "Skull",
        category: "interaction_item",
        element: "SKULL",
        scale: 1 / 2 ** 1,
        glueToFloor: true,
        texture: "Skull_texture",
        inventorySprite: "Skull",
        material: MATERIAL.standard,
        text: "Creeepy?"
    },
    GoldBar: {
        name: "GoldBar",
        category: "interaction_item",
        element: "BAR",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Gold",
        inventorySprite: "GoldBar",
        material: MATERIAL.gold,
        text: "I should store some gold in the bag. Who knows ..."
    },
    IceCube: {
        name: "IceCube",
        category: "interaction_item",
        element: "CUBE_CENTERED",
        scale: 1.99 / 2 ** 5,
        glueToFloor: true,
        texture: "IceTexture",
        inventorySprite: "IceCube",
        material: MATERIAL.standardShine,
        text: "Ice cube. Cold?"
    },
    Rat: {
        name: "Rat",
        category: "interaction_item",
        element: "RAT",
        scale: 1 / 2 ** 3,
        glueToFloor: true,
        texture: "RatTexture",
        inventorySprite: "Rat",
        material: MATERIAL.standard,
        text: "Rat? Maybe I'll be hungry later."
    },
    Lizard: {
        name: "Lizard",
        category: "interaction_item",
        element: "LIZARD",
        scale: 1 / 2 ** 6,
        glueToFloor: true,
        texture: "LizardTexture",
        inventorySprite: "Lizard",
        material: MATERIAL.greenFluence,
        text: "Cute? Little dragon baby."
    },
    Scroll: {
        name: "Scroll",
        category: "interaction_item",
        element: "SCROLL",
        scale: 1.6 / 2 ** 4,
        glueToFloor: true,
        texture: "ScrollTexture",
        material: MATERIAL.paper,
        inventorySprite: "Scroll",
        text: "It's empty? I should write a poem."
    },
    Mushroom: {
        name: "Mushroom",
        category: "interaction_item",
        element: "MUSHROOM",
        scale: 1.4 / 2 ** 7,
        glueToFloor: true,
        texture: "MushroomTexture",
        inventorySprite: "Mushroom",
        material: MATERIAL.standard,
        text: "Poisonous. Don't eat."
    },
    Poison: {
        name: "Poison",
        category: "interaction_item",
        element: "FLASK",
        scale: 1.1 / 2 ** 5,
        glueToFloor: true,
        texture: "GreenMetal",
        inventorySprite: "Poison",
        material: MATERIAL.greenFluence,
        text: "Yikes. Don't drink this. It's deadly."
    },
};

const MOVABLE_INTERACTION_OBJECT = {
    LittleChicken: {
        name: "LittleChicken",
        category: "interaction_item",
        model: "Chicken",
        scale: 1 / 2 ** 6,
        rotateToNorth: -Math.PI / 2,
        moveSpeed: 1.5,
        material: MATERIAL.standard,
        behaviourArguments: [Infinity, ["wanderer"], -1],
        inventorySprite: "LittleChicken",
        text: "Chicken dinner? Yummy."
    },
    Spider: {
        name: "Spider",
        category: "interaction_item",
        model: "Spider",
        scale: 1 / 2 ** 8,
        rotateToNorth: Math.PI,
        moveSpeed: 1.5,
        material: MATERIAL.standard,
        behaviourArguments: [Infinity, ["wanderer"], -1],
        inventorySprite: "Spider",
        text: "Eight hairy legs? Creepy spider."
    },
    Cat: {
        name: "Cat",
        category: "interaction_item",
        model: "Cat",
        scale: 1.8 / 2 ** 8,
        rotateToNorth: Math.PI,
        moveSpeed: 1.75,
        material: MATERIAL.standard,
        behaviourArguments: [Infinity, ["wanderer"], -1],
        inventorySprite: "Cat",
        text: "Here, kitty kitty kitty!"
    },
};

const INTERACTION_ITEM = {
    Fly: {
        name: "Fly",
        category: "interaction_item",
        inventorySprite: "Fly",
        text: "Ugly fly? Who would want that?"
    },
    Hat: {
        name: "Hat",
        category: "interaction_item",
        inventorySprite: "Hat",
    },
    Mirror: {
        name: "Mirror",
        category: "interaction_item",
        inventorySprite: "Mirror",
    },
    Acorn: {
        name: "Acorn",
        category: "interaction_item",
        inventorySprite: "Acorn",
    },
    Pearl: {
        name: "Pearl",
        category: "interaction_item",
        inventorySprite: "Pearl",
        text: "Pearl looks like moon0s tear."
    },
    Fish: {
        name: "Fish",
        category: "interaction_item",
        inventorySprite: "Fish",
    },
    Frog: {
        name: "Frog",
        category: "interaction_item",
        inventorySprite: "Frog",
    },
    MagicWand: {
        name: "MagicWand",
        category: "interaction_item",
        inventorySprite: "MagicWand",
    },
    Book: {
        name: "Book",
        category: "interaction_item",
        inventorySprite: "Book",
    },
    PurpleRose: {
        name: "PurpleRose",
        category: "interaction_item",
        inventorySprite: "PurpleRose",
    },
    RedRose: {
        name: "RedRose",
        category: "interaction_item",
        inventorySprite: "RedRose",
        text: "Beautiful red rose. Very helpful."
    },
    BlueRose: {
        name: "BlueRose",
        category: "interaction_item",
        inventorySprite: "BlueRose",
    },
    Chip: {
        name: "Chip",
        category: "interaction_item",
        inventorySprite: "Chip",
        text: "An eight bit processor. Priceless."
    },
    Mushroom: {
        name: "Mushroom",
        category: "interaction_item",
        inventorySprite: "Mushroom",
        text: "Poisonous. Don't eat."
    },
    Floppy: {
        name: "Floppy",
        category: "interaction_item",
        inventorySprite: "Floppy",
        text: "Floppy disk? I can store my memoirs on it."
    },
    Crest: {
        name: "Crest",
        category: "interaction_item",
        inventorySprite: "Crest",
    },
    GoldKey: {
        name: "GoldKey",
        category: "key",
        inventorySprite: "GoldKey",
        color: "Gold"
    },
    EmeraldKey: {
        name: "EmeraldKey",
        category: "key",
        inventorySprite: "EmeraldKey",
        color: "Emerald"
    },
    Quill: {
        name: "Quill",
        category: "interaction_item",
        inventorySprite: "Quill",
    },
    Blood: {
        name: "Blood",
        category: "interaction_item",
        inventorySprite: "Blood",
        text: "Blood? Yuck."
    },
    GoldenBook: {
        name: "GoldenBook",
        category: "interaction_item",
        inventorySprite: "GoldenBook",
    },
    Heels: {
        name: "Heels",
        category: "interaction_item",
        inventorySprite: "Heels",
        text: "Hot. I'll wear those when I stomp on Ghostface."
    },
    GreenHeels: {
        name: "GreenHeels",
        category: "interaction_item",
        inventorySprite: "GreenHeels",
    },
    Poison: {
        name: "Poison",
        category: "interaction_item",
        inventorySprite: "Poison",
        text: "Yikes. Don't drink this. It's deadly."
    },
    LittleChicken: {
        name: "LittleChicken",
        category: "interaction_item",
        inventorySprite: "LittleChicken",
    },
    ChickenBones: {
        name: "ChickenBones",
        category: "interaction_item",
        inventorySprite: "ChickenBones",
    },
    GoldCoin: {
        name: "GoldCoin",
        category: "interaction_item",
        inventorySprite: "GoldCoin",
        text: "Face on the coin looks like my mother."
    },
};

const INTERACTION_ENTITY = {
    BlackWidow: {
        name: "BlackWidow",
        sprite: "BlackWidow",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Fly", "Fly"],
        gives: "Hat",
        text: {
            intro: "Ah, Princess, you're fierce and fey! Got something to sate my hunger today?",
            progress: "One fly down, you're catching on! Just one more and the prize is won.",
            conclusion: "Flies delivered, the deal's now through! Here's a silky hat just for you."
        }
    },
    HedgeHog: {
        name: "HedgeHog",
        sprite: "HedgeHog",
        category: 'crest',
        voice: "MaleLowSlow",
        wants: ["Apple", "Pear"],
        gives: "Mirror",
        text: {
            intro: "Hey, Princess, in your quest so grand, could you spare some fruit for the hedgehog of this land?",
            progress: "Ah, one gift landed, but I'm not done! Let's make this gifting twice the fun.",
            conclusion: "An apple and pear, oh you're so fine! Here's a mirror to see your royal shine."
        }
    },
    PrettyBunny: {
        name: "PrettyBunny",
        sprite: "PrettyBunny",
        category: 'crest',
        voice: "Female",
        wants: ["Mirror", "Hat"],
        gives: "Acorn",
        text: {
            intro: "Hello, Princess, you're quite the sight, but help me be the beauty of the night!",
            progress: "One gift is good, but I need two. A reflection check, then I'll outshine you!",
            conclusion: "Mirror and hat, now I'm divine! Take this acorn, I'm too gorgeous for such grime."
        }
    },
    DemonGirl: {
        name: "DemonGirl",
        sprite: "DemonGirl",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["RedGem", "BlueGem", "GreenGem"],
        gives: "Acorn",
        text: {
            intro: "Hey Princess, a girl needs friends. Bring me gems, that makes sense.",
            progress: "You are going in the right direction? Bring me more and you'll reach perfection.",
            conclusion: "Gems are cool when you're in hell, here's an acorn, use it well."
        }
    },
    Squirell: {
        name: "Squirell",
        sprite: "Squirell",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Acorn", "Acorn"],
        gives: "Pearl",
        text: {
            intro: "I Seek seed that from oak trees fall. In return, a shiny orb, prized by all.",
            progress: "One seed found, another dost hide. Grant both, and gain the ocean's pride.",
            conclusion: "Seeds twice given, my quest now ends. Take this gem the sea god sends.",
        }
    },
    Mermaid: {
        name: "Mermaid",
        sprite: "Mermaid",
        category: 'crest',
        voice: "Female",
        wants: ["Pearl", "Pearl"],
        gives: "Fish",
        text: {
            intro: "Seek moon's tears dropped in the sea, Bring me two, and a prize you'll see.",
            progress: "One gem from tides, one yet waits, hasten, for fish swims near the gates.",
            conclusion: "Moon's pair found, from depths they came, For your prize—fish, claimed in fame."
        }
    },
    Blacksmithstress: {
        name: "Blacksmithstress",
        sprite: "Blacksmithstress",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Sword", "Shield"],
        gives: "Crest",
        text: {
            intro: "Steel and spark, Blacksmithstress dream. For a crest, bring two items supreme.",
            progress: "One item's here, the forge is hot. Bring the next, show me what you've got.",
            conclusion: "Both now forged, into one they blend. Here's your crest, warrior to the end."
        }
    },
    ShroomFairy: {
        name: "ShroomFairy",
        sprite: "Fairy1",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Mushroom", "Mushroom"],
        gives: "Frog",
        text: {
            intro: "Twinkle bright, fair and airy. I seek shrooms that are quite scary.",
            progress: "Two I need, one is here. Find its twin, and I'll cheer.",
            conclusion: "Mushrooms twain, now in my keep. Here's your frog, from the deep."
        }
    },
    MagicFairy: {
        name: "MagicFairy",
        sprite: "Fairy2",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["MagicWand", "CrystallBall"],
        gives: "PurpleRose",
        text: {
            intro: "To weave a spell, to charm the night, I seek a wand and orb of light.",
            progress: "One item's here, yet magic waits, Bring the other to seal our fates.",
            conclusion: "Both now claimed, my joy is close. For your deeds, a purple rose."
        }
    },
    RoseGhostGirl: {
        name: "RoseGhostGirl",
        sprite: "GhostGirl2",
        category: 'crest',
        voice: "Female",
        wants: ["PurpleRose", "RedRose", "BlueRose"],
        gives: "Book",
        text: {
            intro: "Roses are purple, blue and red. Give them to someone who is dead.",
            progress: "Beautiful. But insufficient.",
            conclusion: "I feel alive again with this beautiful roses. Here. Some boring book."
        }
    },
    SkullGhostGirl: {
        name: "SkullGhostGirl",
        sprite: "GhostGirl1",
        category: 'crest',
        voice: "Female",
        wants: ["Skull", "Skull", "Skull"],
        gives: "Book",
        text: {
            intro: "Feeling headless, in a spooky swirl, help me out, bring some skulls.",
            progress: "Got a skull, but  more to find, for a book that might just blow your mind.",
            conclusion: "Three skulls for me, now I'm ahead! Here's your book, as exciting as... bread."
        }
    },
    Knightess: {
        name: "Knightess",
        sprite: "FemaleKnight",
        category: 'crest',
        voice: "Female",
        wants: ["Crest"],
        gives: "GoldKey",
        text: {
            intro: "Valiant I stand, a crest I seek, Made from sword and shield, for the brave, not meek.",
            progress: null,
            conclusion: "Crest received, honor's key. For you, golden access to Ghostface, from me."
        }
    },
    Devilla: {
        name: "Devilla",
        sprite: "Devilla",
        category: 'crest',
        voice: "Female",
        wants: ["Book", "Book"],
        gives: "GoldKey",
        text: {
            intro: "Infernal boredom, a devil's bane. Bring me books to soothe my pain.",
            progress: "One book read, one more to go. Hurry up, or time will slow.",
            conclusion: "Two books to quell my fiery sighs. For you, a GoldKey, a hellish prize."
        }
    },
    Witch: {
        name: "Witch",
        sprite: "Witch",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Frog", "Fish"],
        gives: "MagicWand",
        text: {
            intro: "Brew of the deep, a potion's plan, needs silent swimmer and leaping clan.",
            progress: "One creature stirs, another to seek, for underwater breath, both I bespeak.",
            conclusion: "Frog and fish, in the pot they dance, Here's my wand, thanks for the chance!"
        }
    },
    FakePrincess: {
        name: "FakePrincess",
        sprite: "FakePrincess",
        category: 'crest',
        voice: "Female",
        wants: ["Chip", "Floppy"],
        gives: "BlueRose",
        text: {
            intro: "I want to escape Ghostface and become retro coder. I will build my own computer.",
            progress: "Almost there. Just one more piece missing.",
            conclusion: "I can now escape Ghostace's grasp and follow my coding passion. Here's a Blue Rose for you."
        }
    },
    AlienGoldie: {
        name: "AlienGoldie",
        sprite: "AlienGoldie",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["GoldBar", "GoldBar", "GoldBar"],
        gives: "GoldKey",
        text: {
            intro: "From stars afar in golden hue, gold bars I have to seek from you.",
            progress: "A bar of gold, gleaming bright, but more to go, in cosmic light.",
            conclusion: "Gold thrice given, from Earth's own core, here's a GoldKey, opening new doors."
        }
    },
    IceQueen: {
        name: "IceQueen",
        sprite: "IceQueen",
        category: 'crest',
        voice: "Female",
        wants: ["IceCube", "IceCube", "IceCube"],
        gives: "GoldKey",
        text: {
            intro: "Queen of ice, yet feeling hot, three ice cubes is what I've sought.",
            progress: "One cube's chill, but I need more, two to go, for the cool I adore.",
            conclusion: "Cool at last, with cubes thrice. For you, a GoldKey, as cold as ice."
        }
    },
    CatGirl: {
        name: "CatGirl",
        sprite: "CatGirl",
        category: 'crest',
        voice: "Female",
        wants: ["Rat", "Rat", "Rat"],
        gives: "GoldKey",
        text: {
            intro: "Meow, dear Princess, a cat's request, bring three rats, put my skills to the test.",
            progress: "Nice rat caught, meow, what fun! But more to go, my job's not done.",
            conclusion: "Three rats for me, meow, you're keen. Here's your key, shiny and clean."
        }
    },
    DragonLady: {
        name: "DragonLady",
        sprite: "DragonLady",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Lizard", "Lizard", "Lizard"],
        gives: "GoldKey",
        text: {
            intro: "In fiery breath, a mother's plea, bring back my babies, three lizards to me.",
            progress: "Another baby back in my nest. Find the rest, complete this quest.",
            conclusion: "My babies three, now under my wing. For you, a Gold Key, from the dragon queen."
        }
    },
    Librarian: {
        name: "Librarian",
        sprite: "Librarian",
        category: 'crest',
        voice: "Female",
        wants: ["Scroll", "Scroll", "Scroll"],
        gives: "Quill",
        text: {
            intro: "In hushed halls, lined with lore, bring three scrolls, blank, I implore.",
            progress: "A scroll to fill, a good start, more are needed, to impart.",
            conclusion: "Scrolls thrice given, blank and fine, for you, quill and ink, to make words shine."
        }
    },
    LadyVampyra: {
        name: "LadyVampyra",
        sprite: "LadyVampyra",
        category: 'crest',
        voice: "Female",
        wants: ["Scroll", "Quill", "Blood"],
        gives: "EmeraldKey",
        text: {
            intro: "In shadows deep, a pact to weave, scroll, blood, and quill, for me to receive.",
            progress: "One item received, night's work not done. Bring all to seal, under the moon, not sun.",
            conclusion: "Scroll, blood, quill, the pact is nigh, For you, an Emerald Key, under the dark sky."
        }
    },
    FoxyLady: {
        name: "FoxyLady",
        sprite: "FoxyLady",
        category: 'crest',
        voice: "Female",
        wants: ["LittleChicken", "LittleChicken", "LittleChicken"],
        gives: "GoldenBook",
        text: {
            intro: "Sly and swift, with a hunger keen, three chickens sought, barely seen.",
            progress: "A chicken found, more to seek, fulfill my hunger, sly and sleek.",
            conclusion: "Three chickens caught, you're clever indeed, here's your book, for your deed."
        }
    },
    MrsOwl: {
        name: "MrsOwl",
        sprite: "OwlLady",
        category: 'crest',
        voice: "Female",
        wants: ["Spider", "Spider", "Spider"],
        gives: "GoldenBook",
        text: {
            intro: "In moonlit nights, with eyes so wide, I seek three spiders, nowhere to hide.",
            progress: "One spider snared, silent flight, but more for feast, in the night.",
            conclusion: "Three spiders caught, my hunger's booked, for you, a Golden Book, wisely overlooked."
        }
    },
    MissButterfly: {
        name: "MissButterfly",
        sprite: "ButterFlyLady",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Heels", "Heels"],
        gives: "GoldenBook",
        text: {
            intro: "Fluttering fashion, a wish so bold, a pair of red stilettos, leather, I'm sold.",
            progress: "One shoe found, or is it none? Bring the pair, then we're done.",
            conclusion: "Stilettos in pair, a sight so grand, here's your Golden Book, as planned."
        }
    },
    AngelLick: {
        name: "AngelLick",
        sprite: "AngelLick",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["GoldenBook", "GoldenBook", "GoldenBook"],
        gives: "EmeraldKey",
        text: {
            intro: "In heavenly realms, where clouds are my bed, seek three books, for ours is quite dead.",
            progress: "A book from below, a start indeed, more wisdom required, fulfill this need.",
            conclusion: "Three books from below, now heaven's new lore, here's an Emerald Key, to open new door."
        }
    },
    CuddlyBear: {
        name: "CuddlyBear",
        sprite: "CuddlyBear",
        category: 'crest',
        voice: "Female",
        wants: ["Pear", "Pear", "Pear"],
        gives: "GreenHeels",
        text: {
            intro: "a pear, a pear, for a cuddly bear?",
            progress: "Another pear or I'll despair.",
            conclusion: "Pears all here, back to my lair. For you, a stiletto with flair to spare."
        }
    },
    Kittie: {
        name: "Kittie",
        sprite: "Kittie",
        category: 'crest',
        voice: "Female",
        wants: ["Cat", "Cat", "Cat", "Cat", "Cat"],
        gives: "GreenHeels",
        text: {
            intro: "Whiskers twitch, in search I roam, help find my sisters, bring them home.",
            progress: "One sister found, purrs of delight, more out there, hidden from sight.",
            conclusion: "Sisters gathered, all in view, a stiletto not my hue, now for you."
        }
    },
    Lizzie: {
        name: "Lizzie",
        sprite: "Lizzie",
        category: 'crest',
        voice: "GlaDOS",
        wants: ["GreenHeels", "GreenHeels"],
        gives: "EmeraldKey",
        text: {
            intro: "Green scales, so sleek, but black shoes? a blight! Bring green stilettos, make my outfit right!",
            progress: "Stiletto found, is it green and bright? One more to match, then I'm a sight.",
            conclusion: "Perfect pair, now I'm a dazzle in the light, Here's an Emerald Key, for your dungeon fight."
        }
    },
    Sorceress: {
        name: "Sorceress",
        sprite: "Sorceress",
        category: 'crest',
        voice: "Female",
        wants: ["Mushroom", "Mushroom", "Mushroom", "Mushroom", "Mushroom"],
        gives: "Poison",
        text: {
            intro: "In shadows deep, where secrets bloom, bring me mushrooms, filled with doom.",
            progress: "Mushrooms enough for my dark concoction. Here's your poison, a lethal potion.",
            conclusion: "Enough for a deadly stew, so sly, take this flask of poison, let your enemies die."
        }
    },
    RedRidingHood: {
        name: "RedRidingHood",
        sprite: "RedRidingHood",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Poison", "Poison", "Poison", "LittleChicken"],
        gives: "ChickenBones",
        text: {
            intro: "Through woods so dark, a plan I weave, bring poison and chicken, for the wolf to deceive.",
            progress: "Part of the plan, now in my basket, more to gather, before we mask it.",
            conclusion: "Poison and chicken, now in my grasp, here's a poisoned corpse, for the wolf to clasp."
        }
    },
    Granny: {
        name: "Granny",
        sprite: "Granny",
        category: 'crest',
        voice: "GlaDOS",
        wants: ["ChickenBones"],
        gives: "GoldCoin",
        text: {
            intro: "Fear the wolf with each knock and tap, bring a poisoned chicken, set my trap.",
            progress: null,
            conclusion: "Tricky chicken for the wolf's last meal, for your help, a gold coin, that's the deal."
        }
    },
    Punisher: {
        name: "Punisher",
        sprite: "Punisher",
        category: 'crest',
        voice: "GlaDOS",
        wants: ["GoldCoin"],
        gives: "EmeraldKey",
        text: {
            intro: "Kneel before me, make it quick, a gold coin for your path, don't be thick.",
            progress: null,
            conclusion: "Coin in hand, you've served me well, here’s an Emerald Key, continue your tale to tell."
        }
    },
    Wolfie: {
        name: "Wolfie",
        sprite: "Wolfie",
        category: 'crest',
        voice: "MaleLowSlow",
        wants: ["LittleChicken", "LittleChicken", "LittleChicken", "LittleChicken", "LittleChicken"],
        gives: "GoldCoin",
        text: {
            intro: "Betrayed by Granny, and you, her aide, bring fresh chickens, no foul play laid!",
            progress: "Claws retracted, for now, my dear, more chickens needed to clear the air, I fear.",
            conclusion: "Chickens enough to calm my snarl, for you, a coin, from Wolfie's quarrel."
        }
    },
    Sharkeera: {
        name: "Sharkeera",
        sprite: "Sharkeera",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Fish", "Fish", "Fish"],
        gives: "GoldCoin",
        text: {
            intro: "From depths of charm, a finned request, bring fish to satisfy my quest.",
            progress: "A fish has found its way to me, more to capture, can't you see?",
            conclusion: "Fish aplenty, you've done well, a gold coin for you, from the ocean's swell."
        }
    },
    Fischelle: {
        name: "Fischelle",
        sprite: "Fischelle",
        category: 'crest',
        voice: "Female",
        wants: ["Fish", "Pearl", "Frog"],
        gives: "GoldCoin",
        text: {
            intro: "Ocean's riddle, three parts to seek, Shell's gem, deep swimmer, and jumper meek.",
            progress: "Gifts of depth, one, maybe two, continue the hunt, till riddle's through.",
            conclusion: "Riddle solved, sea's treasures found, for you, a coin of gold, profound."
        }
    },

    /**
     * NA::  
     * Sharkeera, Fichelle
     */

};

//container content
const CONTAINER_CONTENT_TYPES = { GOLD_ITEM_TYPE, SKILL_ITEM_TYPE, INTERACTION_ITEM };
const CONTAINER_CONTENT_LIST = stringifyObjectList(CONTAINER_CONTENT_TYPES);
const TRIGGER_ACTIONS = ["HOLE->toEmpty", "WALL->toEmpty", "EMPTY->toWall"];
const TRAP_ACTIONS = {
    Missile: ["Fireball", "Bounceball"],
    Spawn: listObjectKeys(MONSTER_TYPE)
};
const TRAP_ACTION_LIST = listObjectKeys(TRAP_ACTIONS);

const KEY_TYPES = ["Gold", "Silver", "Red", "Green", "Blue", "Emerald"];
const KEY_TEXTURES = ["Gold", "Silver", "RedMetal", "GreenMetal", "BlueMetal", "EmeraldTexture"];
const KEY_MATERIAL = ["gold", "silver", "redShine", "greenShine", "blueShine", "standard"];
const KEY_TYPE = {};
for (let [index, key] of KEY_TYPES.entries()) {
    KEY_TYPE[key] = new KeyTypeDefinition(key, `${key}Key`, key, KEY_TEXTURES[index], MATERIAL[KEY_MATERIAL[index]]);
}

const POTION_TYPES = ["Red", "Blue"];
const POTION_TEXTURES = ["RedLiquid", "BlueLiquid"];
const POTION_MATERIAL = ["redShine", "blueShine"];
const POTION_TYPE = {};
for (let [index, potion] of POTION_TYPES.entries()) {
    POTION_TYPE[potion] = new PotionTypeDefinition(`${potion}Potion`, `${potion}Potion24`, potion.toLowerCase(), POTION_TEXTURES[index], MATERIAL[POTION_MATERIAL[index]]);
}