/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

/**
 * definition of:
 *      monsters
 *      scrolls
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