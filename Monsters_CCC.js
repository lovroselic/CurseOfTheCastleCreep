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
const GATE_TYPES = ["Open", "Closed", "Gold", "Silver", "Red", "Green", "Blue", "Up", "Down"];

const SCROLL_TYPE = ["Light", "Invisibility", "DrainMana", "Cripple", "BoostWeapon", "BoostArmor", "DestroyArmor", "DestroyWeapon",
    "Petrify", "MagicBoost", "Luck", "HalfLife", "Explode"];

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
        wants: ["Skull", "Skull", "Skull"], // one at fake Princess, one at blacksmistress, one at knightess
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
        wants: ["Crest",],
        gives: "GoldKey",
        text: {
            intro: "Valiant I stand, a crest I seek, Made from sword and shield, for the brave, not meek.",
            progress: null,
            conclusion: "Crest received, honor's key. For you, golden access to Ghostface, from me."
        }
    },

    /**
     * Devilla
     * wants book?? and book
     * gives goldKey
     */


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

    /**
     * CatGirl 
     * wants two mice (movable interavtion object)
     * gives: goldKey 
     */

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
    /**
     * AlienGoldie
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

const KEY_TYPES = ["Gold", "Silver", "Red", "Green", "Blue"];
const KEY_TEXTURES = ["Gold", "Silver", "RedMetal", "GreenMetal", "BlueMetal"];
const KEY_MATERIAL = ["gold", "silver", "redShine", "greenShine", "blueShine"];
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