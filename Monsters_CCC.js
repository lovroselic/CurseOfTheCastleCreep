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

const SCROLL_TYPE = ["Light", "Invisibility", "DrainMana", "Cripple", "BoostWeapon", "BoostArmor", "DestroyArmor", "DestroyWeapon",
    "Petrify", "MagicBoost", "Luck", "HalfLife"];

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
    },
    TreasureChest: {
        name: "TreasureChest",
        category: "chest",
        element: "TREASURE_CHEST",
        scale: 1.5 / 2 ** 3,
        glueToFloor: true,
        texture: "TreasureChest",
        material: MATERIAL.standard,
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
    SkeletonDemo: {
        name: "WhiteSkeletonDemo",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        fly: null,
        deathType: "SmokeExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 1,
        defense: 0,
        magic: 0,
        health: 1,
        xp: 1,
        gold: 50,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.01,
        material: MATERIAL.standardShine,
    },
    MissGalaxyDemo: {
        name: "MissGalaxyDemo",
        texture: "MissGalaxyGreen",
        model: "MissGalaxy",
        scale: 0.8 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        fly: null,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 1,
        defense: 0,
        magic: 0,
        health: 10,
        xp: 6,
        gold: 10,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [5, ["wanderer"], 3, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    //----------------
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
        material: MATERIAL.standard,
    },
    Hulk: {
        name: "Hulk",
        model: "Hulk",
        scale: 1.5 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
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
    Viking: {
        name: "Viking",
        model: "Viking",
        scale: 0.9 / 2 ** 8,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
    GhostFace: {
        name: "GhostFace",
        model: "GhostFace",
        scale: 1.82 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
    Wolf: {
        name: "Wolf",
        model: "Wolf",
        scale: 1.7 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
    SilverSkeleton: {
        name: "SilverSkeleton",
        texture: "Silver",
        model: "Skeleton",
        scale: 1.8 / 2 ** 3,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "SmokeExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
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
        inventory: GOLD_ITEM_TYPE.Coins,
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
    Drax: {
        name: "Drax",
        model: "Drax",
        scale: 1.5 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
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

//container content
const CONTAINER_CONTENT_TYPES = { GOLD_ITEM_TYPE, SKILL_ITEM_TYPE };
const CONTAINER_CONTENT_LIST = stringifyObjectList(CONTAINER_CONTENT_TYPES);
//console.info("CONTAINER_CONTENT_LIST", CONTAINER_CONTENT_LIST);

const TRIGGER_ACTIONS = ["HOLE->toEmpty", "WALL->toEmpty"];