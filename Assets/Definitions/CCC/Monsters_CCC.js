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
const GATE_TYPES = ["Open", "Closed", "Gold", "Silver", "Red", "Green", "Blue", "Up", "Down", "Emerald", "Purple"];

const SCROLL_TYPE = ["Light", "Invisibility", "DrainMana", "Cripple", "BoostWeapon", "BoostArmor", "DestroyArmor", "DestroyWeapon",
    "Petrify", "MagicBoost", "Luck", "HalfLife", "Explode", "Radar"];

const SHRINE_TYPE = {
    Attack1_1: {
        name: "AttackShrine_1_1",
        sprite: "AttackShrine1",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_1: {
        name: "DefenseShrine_1_1",
        sprite: "DefenseShrine1",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_1: {
        name: "MagicShrine_1_1",
        sprite: "MagicShrine1",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_2: {
        name: "AttackShrine_1_2",
        sprite: "AttackShrine2",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_2: {
        name: "DefenseShrine_1_2",
        sprite: "DefenseShrine2",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_2: {
        name: "MagicShrine_1_2",
        sprite: "MagicShrine2",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_3: {
        name: "AttackShrine_1_3",
        sprite: "AttackShrine3",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_3: {
        name: "DefenseShrine_1_3",
        sprite: "DefenseShrine3",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_3: {
        name: "MagicShrine_1_3",
        sprite: "MagicShrine3",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_4: {
        name: "AttackShrine_1_4",
        sprite: "AttackShrine4",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_4: {
        name: "DefenseShrine_1_4",
        sprite: "DefenseShrine4",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Defense1_8: {
        name: "Defense1_8",
        sprite: "DefenseShrine8",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_4: {
        name: "MagicShrine_1_4",
        sprite: "MagicShrine4",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_5: {
        name: "AttackShrine_1_5",
        sprite: "AttackShrine5",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_5: {
        name: "DefenseShrine_1_5",
        sprite: "DefenseShrine5",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_5: {
        name: "MagicShrine_1_5",
        sprite: "MagicShrine5",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_6: {
        name: "AttackShrine_1_6",
        sprite: "AttackShrine6",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_6: {
        name: "DefenseShrine_1_6",
        sprite: "DefenseShrine5",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_6: {
        name: "MagicShrine_1_6",
        sprite: "MagicShrine6",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_7: {
        name: "AttackShrine_1_7",
        sprite: "AttackShrine7",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_7: {
        name: "DefenseShrine_1_7",
        sprite: "DefenseShrine7",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_7: {
        name: "MagicShrine_1_7",
        sprite: "MagicShrine7",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Defense1_9: {
        name: "Defense1_9",
        sprite: "DefenseShrine9",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Attack1_10: {
        name: "AttackShrine_1_10",
        sprite: "AttackShrine10",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_10: {
        name: "Defense1_10",
        sprite: "DefenseShrine10",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },

    Attack1_11: {
        name: "AttackShrine_1_11",
        sprite: "AttackShrine11",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_11: {
        name: "DefenseShrine_1_11",
        sprite: "DefenseShrine11",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_11: {
        name: "MagicShrine_1_11",
        sprite: "MagicShrine11",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_12: {
        name: "AttackShrine_1_12",
        sprite: "AttackShrine12",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_12: {
        name: "DefenseShrine_1_12",
        sprite: "DefenseShrine12",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_12: {
        name: "MagicShrine_1_12",
        sprite: "MagicShrine12",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Magic1_13: {
        name: "MagicShrine_1_13",
        sprite: "MagicShrine13",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Magic1_14: {
        name: "MagicShrine_1_14",
        sprite: "MagicShrine14",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_15: {
        name: "AttackShrine_1_15",
        sprite: "AttackShrine15",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_16: {
        name: "DefenseShrine_1_16",
        sprite: "DefenseShrine16",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Attack1_17: {
        name: "AttackShrine_1_17",
        sprite: "AttackShrine17",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Defense1_17: {
        name: "DefenseShrine_1_17",
        sprite: "DefenseShrine17",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Magic1_17: {
        name: "MagicShrine_1_17",
        sprite: "MagicShrine17",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Attack1_18: {
        name: "AttackShrine_1_18",
        sprite: "AttackShrine18",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1000,
        level: 1,
    },
    Attack2_19: {
        name: "AttackShrine_2_19",
        sprite: "AttackShrine19",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1750,
        level: 2,
    },
    Attack3_20: {
        name: "AttackShrine_3_20",
        sprite: "AttackShrine20",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 2500,
        level: 3,
    },
    Defense1_18: {
        name: "DefenseShrine_1_18",
        sprite: "DefenseShrine18",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1000,
        level: 1,
    },
    Defense2_19: {
        name: "DefenseShrine_2_19",
        sprite: "DefenseShrine19",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1750,
        level: 2,
    },
    Defense3_20: {
        name: "DefenseShrine_3_20",
        sprite: "DefenseShrine20",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 2500,
        level: 3,
    },
    Magic1_18: {
        name: "MagicShrine_1_18",
        sprite: "MagicShrine18",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1000,
        level: 1,
    },
    Magic2_19: {
        name: "MagicShrine_2_19",
        sprite: "MagicShrine19",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1750,
        level: 2,
    },
    Magic3_20: {
        name: "MagicShrine_3_20",
        sprite: "MagicShrine20",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 2500,
        level: 3,
    },
    Attack1_21: {
        name: "AttackShrine_1_21",
        sprite: "AttackShrine21",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1500,
        level: 1,
    },
    Defense1_21: {
        name: "DefenseShrine_1_21",
        sprite: "DefenseShrine21",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1500,
        level: 1,
    },
    Magic1_21: {
        name: "MagicShrine_1_21",
        sprite: "MagicShrine21",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1500,
        level: 1,
    },

    Attack1_22: {
        name: "AttackShrine_1_22",
        sprite: "AttackShrine22",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 1500,
        level: 1,
    },
    Defense1_22: {
        name: "DefenseShrine_1_22",
        sprite: "DefenseShrine22",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 1500,
        level: 1,
    },
    Magic1_22: {
        name: "MagicShrine_1_22",
        sprite: "MagicShrine22",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 1500,
        level: 1,
    },

    Attack1_23: {
        name: "AttackShrine_1_23",
        sprite: "AttackShrine23",
        which: "attack",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "SwordSkill",
        price: 2000,
        level: 1,
    },
    Defense1_23: {
        name: "DefenseShrine_1_23",
        sprite: "DefenseShrine23",
        which: "defense",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "ShieldSkill",
        price: 2000,
        level: 1,
    },
    Magic1_23: {
        name: "MagicShrine_1_23",
        sprite: "MagicShrine23",
        which: "magic",
        category: 'crest',
        interactionCategory: 'shrine',
        inventorySprite: "MagicSkill",
        price: 2000,
        level: 1,
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
    DescentOracle: {
        name: "DescentOracle",
        sprite: "DescentOracle",
        category: 'crest',
        voice: "Female",
        text: "Are you sure you are ready to be here already?",
        interactionCategory: "oracle",
    },
    TrainingOracle: {
        name: "TrainingOracle",
        sprite: "TrainingOracle",
        category: 'crest',
        voice: "Female",
        text: "If you will not train with all of the dungeon professors, you will never defeat Ghostface.",
        interactionCategory: "oracle",
    },
    MagicOracle: {
        name: "MagicOracle",
        sprite: "MagicOracle",
        category: 'crest',
        voice: "Female",
        text: "There are clues as to which path will be right one. If you fail you die!",
        interactionCategory: "oracle",
    },
    MagicOracle2: {
        name: "MagicOracle2",
        sprite: "MagicOracle2",
        category: 'crest',
        voice: "Female",
        text: "Don't leave without the gold key. Or else.",
        interactionCategory: "oracle",
    },
    PriceOracle: {
        name: "PriceOracle",
        sprite: "PriceOracle",
        category: 'crest',
        voice: "Female",
        text: "Some shrines are more expensive than others. But the also give more. Maybe.",
        interactionCategory: "oracle",
    },
    CrouchingDom: {
        name: "CrouchingDom",
        sprite: "CrouchingDom",
        category: 'crest',
        voice: "Female",
        text: "There migh be subtle clues as to which shrine is more expensive than the other.",
        interactionCategory: "oracle",
    },
    StandingDomme: {
        name: "StandingDomme",
        sprite: "StandingDomme",
        category: 'crest',
        voice: "Female",
        text: "Sometimes a situation requires explosive solution.",
        interactionCategory: "oracle",
    },
    SittingDomme: {
        name: "SittingDomme",
        sprite: "SittingDomme",
        category: 'crest',
        voice: "Female",
        text: "Not everybody has something important to say. Some just waste your time.",
        interactionCategory: "oracle",
    },
    RedWoman: {
        name: "RedWoman",
        sprite: "RedWoman",
        category: 'crest',
        voice: "Female",
        text: "If you think ther are enough gold coins for all the trainers, than you haven't beem paying attention.",
        interactionCategory: "oracle",
    },
    Croucher: {
        name: "Croucher",
        sprite: "Croucher",
        category: 'crest',
        voice: "Female",
        text: "Did you notice that praying has just gotten more expensive?",
        interactionCategory: "oracle",
    },
    WitchOracle1: {
        name: "WitchOracle1",
        sprite: "WitchOracle1",
        category: 'crest',
        voice: "Female",
        text: "Helmets look like little cauldrons, right?",
        interactionCategory: "oracle",
    },
    WitchOracle2: {
        name: "WitchOracle2",
        sprite: "WitchOracle2",
        category: 'crest',
        voice: "Female",
        text: "Poisons are so green, don't you think?",
        interactionCategory: "oracle",
    },
    KeyOracle: {
        name: "KeyOracle",
        sprite: "KeyOracle",
        category: 'crest',
        voice: "Female",
        text: "From some metal bars, and some precious gems, keys can be forged.",
        interactionCategory: "oracle",
    },
    Boss: {
        name: "Boss",
        sprite: "Boss",
        category: 'crest',
        voice: "Female",
        text: "Are you able to take both?",
        interactionCategory: "oracle",
    },
    FunOracle: {
        name: "FunOracle",
        sprite: "FunOracle",
        category: 'crest',
        voice: "Female",
        text: "Are you having fun yet?",
        interactionCategory: "oracle",
    },
    Roadie: {
        name: "Roadie",
        sprite: "Roadie",
        category: 'crest',
        voice: "Female",
        text: "I am fan of LaughingSkull. How about you?",
        interactionCategory: "oracle",
    },
    RockDomme: {
        name: "RockDomme",
        sprite: "RockDomme",
        category: 'crest',
        voice: "Female",
        text: "Welcome to level 99. It's surprising you are still alive.",
        interactionCategory: "oracle",
    },
    FarmeressOracle: {
        name: "FarmeressOracle",
        sprite: "FarmeressOracle",
        category: 'crest',
        voice: "Female",
        text: "I heard the wolves come from the Enchanted Forest.",
        interactionCategory: "oracle",
    },
    Tits: {
        name: "Tits",
        sprite: "Tits",
        category: 'crest',
        voice: "Female",
        text: "Welcome to Tourist Information, Travel, and Survival. How may I help you?",
        interactionCategory: "oracle",
    },
    MetalOracle: {
        name: "MetalOracle",
        sprite: "MetalOracle",
        category: 'crest',
        voice: "Female",
        text: "GoldSteel is alloy of four different metals. Gold, uranium, and what else?",
        interactionCategory: "oracle",
    },
    GemOracle: {
        name: "GemOracle",
        sprite: "GemOracle",
        category: 'crest',
        voice: "Female",
        text: "Ghosty's Tear can be made from four other precious stones.",
        interactionCategory: "oracle",
    },
    DerriereOracle: {
        name: "DerriereOracle",
        sprite: "DerriereOracle",
        category: 'crest',
        voice: "Female",
        text: "Ghosty's Tear is made of Diamond, Moonstone and something more. I can't recall.",
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
    Rex: {
        name: "Rex",
        model: "Rex",
        scale: 1.25 / 2 ** 9,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 45,
        defense: 35,
        magic: 30,
        health: 50,
        xp: 100,
        gold: 100,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [10, ["wanderer"], 5, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 5,
        stalkDistance: 6,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Hulk: {
        name: "Hulk",
        model: "Hulk",
        scale: 1.5 / 2 ** 6,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 48,
        defense: 36,
        magic: 5,
        health: 50,
        xp: 100,
        gold: 100,
        attackSound: "HumanAttack1",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [10, ["wanderer"], 4, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.greenShine,
    },
    RedDragon: {
        name: "RedDragon",
        texture: "RedDragon",
        model: "Dragon",
        scale: 1.92 / 2 ** 4,
        rotateToNorth: Math.PI,
        midHeight: 0.25,
        fly: 0.25,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 48,
        defense: 35,
        magic: 40,
        health: 50,
        xp: 120,
        gold: 125,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [10, ["wanderer"], 7, ["shoot"]],
        moveSpeed: 1.05,
        mana: 5,
        caster: true,
        shootDistance: 7,
        stalkDistance: 8,
        material: MATERIAL.gold,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
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
        attack: 50,
        defense: 40,
        magic: 30,
        health: 60,
        xp: 110,
        gold: 100,
        attackSound: "MonsterAttack2",
        hurtSound: "MonsterHurt2",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.1,
        material: MATERIAL.gold,
    },
    AngrySheep: {
        name: "AngrySheep",
        model: "Sheep",
        scale: 1.5 / 2 ** 9,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 100,
        defense: 0,
        magic: 0,
        health: 60,
        xp: 30,
        gold: 1,
        attackSound: "Sheep",
        hurtSound: "PainSqueek",
        behaviourArguments: [8, ["wanderer"], 6, ["advancer"]],
        moveSpeed: 1.0,
        material: MATERIAL.standard,
    },
    GreenRex: {
        name: "GreenRex",
        texture: "GreenRex",
        model: "Rex",
        scale: 1.25 / 2 ** 9,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 55,
        defense: 45,
        magic: 42,
        health: 60,
        xp: 125,
        gold: 125,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt",
        behaviourArguments: [10, ["wanderer"], 6, ["shoot"]],
        moveSpeed: 1.05,
        mana: 3,
        caster: true,
        shootDistance: 6,
        stalkDistance: 7,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    Drax: {
        name: "Drax",
        model: "Drax",
        scale: 1.25 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 60,
        defense: 50,
        magic: 40,
        health: 100,
        xp: 150,
        gold: 125,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [Infinity, ["wanderer"], 10, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 10,
        stalkDistance: 12,
        material: MATERIAL.standard,
        missile: Missile,
        missileType: COMMON_ITEM_TYPE.Fireball,
    },
    GreenWolf: {
        name: "Wolf",
        texture: "GreenWolf",
        model: "Wolf",
        scale: 1.6 / 2 ** 2,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 60,
        defense: 40,
        magic: 12,
        health: 50,
        xp: 100,
        gold: 50,
        attackSound: "MonsterAttack1",
        hurtSound: "MonsterHurt3",
        behaviourArguments: [10, ["wanderer"], 5, ["advancer"]],
        moveSpeed: 1.2,
        material: MATERIAL.greenFluence,
    },
    /** not yet tuned */
    GreenBasilisk: {
        name: "GreenBasilisk",
        texture: "GreenBasilisk",
        model: "Basilisk",
        scale: 1.7 / 2 ** 9,
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
        moveSpeed: 0.95,
        material: MATERIAL.greenFluence,
    },

    BlueSkeleton: {
        name: "BlueSkeleton",
        texture: "BlueMetal",
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
        material: MATERIAL.standard,
    },
    GreenSkeleton: {
        name: "GreenSkeleton",
        texture: "GreenMetal",
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
    SilverBar: {
        name: "SilverBar",
        category: "interaction_item",
        element: "BAR",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "Silver",
        inventorySprite: "SilverBar",
        material: MATERIAL.silver,
        text: "Silver. Malleable."
    },
    IronBar: {
        name: "IronBar",
        category: "interaction_item",
        element: "BAR",
        scale: 1 / 2 ** 4,
        glueToFloor: true,
        texture: "IronTexture",
        inventorySprite: "IronBar",
        material: MATERIAL.standard,
        text: "Iron? I can make something from it."
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
    GoldCoin: {
        name: "GoldCoin",
        category: "interaction_item",
        element: "COIN",
        scale: 1.8 / 2 ** 8,
        glueToFloor: true,
        texture: "Gold",
        inventorySprite: "GoldCoin",
        material: MATERIAL.gold,
        text: "Face on the coin looks like my mother."
    },
    Blood: {
        name: "Blood",
        category: "interaction_item",
        element: "FLASK",
        scale: 1.1 / 2 ** 5,
        glueToFloor: true,
        texture: "BloodTexture",
        inventorySprite: "Blood",
        material: MATERIAL.redShine,
        text: "Disgusting. Give it to someone else."
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
    BabyGreenSpider: {
        name: "BabyGreenSpider",
        category: "interaction_item",
        model: "Spider",
        scale: 1 / 2 ** 8,
        rotateToNorth: Math.PI,
        texture: "SpiderGreen",
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
    BabyDragon: {
        name: "BabyDragon",
        category: "interaction_item",
        model: "Dragon",
        scale: 1 / 2 ** 5,
        fly: 0.5,
        rotateToNorth: Math.PI,
        moveSpeed: 1.75,
        material: MATERIAL.standard,
        behaviourArguments: [Infinity, ["wanderer"], -1],
        inventorySprite: "BabyDragon",
        text: "Come to mamma."
    },
    BabySheep: {
        name: "BabySheep",
        category: "interaction_item",
        model: "Sheep",
        scale: 1.1 / 2 ** 10,
        rotateToNorth: Math.PI,
        moveSpeed: 1.25,
        material: MATERIAL.standard,
        behaviourArguments: [Infinity, ["wanderer"], -1],
        inventorySprite: "Sheep",
        text: "Poor lamb. Are you hurt?",
    },
    WolfLeader: {
        name: "WolfLeader",
        category: "interaction_item",
        model: "Wolf",
        scale: 1.0 / 2 ** 3,
        rotateToNorth: Math.PI,
        moveSpeed: 1.1,
        material: MATERIAL.standard,
        behaviourArguments: [Infinity, ["wanderer"], -1],
        inventorySprite: "WolfHead",
        text: "Got you, evil bastard.",
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
        text: "Pearl looks like moon's tear."
    },
    Fish: {
        name: "Fish",
        category: "interaction_item",
        inventorySprite: "Fish",
        text: "Smelly little swimmer."
    },
    Frog: {
        name: "Frog",
        category: "interaction_item",
        inventorySprite: "Frog",
        text: "Is that a prince?"
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
        text: "Such a great story. About a princess."
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
    PurpleKey: {
        name: "PurpleKey",
        category: "key",
        inventorySprite: "PurpleKey",
        color: "Purple"
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
        text: "Hmm. Princess meets GhostFace. Sad story."
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
    Leotard: {
        name: "Leotard",
        category: "interaction_item",
        inventorySprite: "Leotard",
        text: "Leotard for leopard."
    },
    LeoHat: {
        name: "LeoHat",
        category: "interaction_item",
        inventorySprite: "LeoHat",
        text: "Cool hat. Leopard spots. I could hide in the jungle."
    },
    LeoPumps: {
        name: "LeoPumps",
        category: "interaction_item",
        inventorySprite: "LeoPumps",
        text: "Looks like something Purrscilla would wear."
    },
    HealthSkill: {
        name: "HealthSkill",
        category: "status",
        inventorySprite: "Health",
        which: "health",
        level: 5,
    },
    ManaSkill: {
        name: "ManaSkill",
        category: "status",
        inventorySprite: "Mana",
        which: "mana",
        level: 5,
    },
    DefenseSkill: {
        name: "DefenseSkill",
        category: "skill",
        inventorySprite: "ShieldSkill",
        which: "defense",
        level: 3,
    },
    MagicSkill: {
        name: "MagicSkill",
        category: "skill",
        inventorySprite: "MagicSkill",
        which: "magic",
        level: 3,
    },
    AttackSkill: {
        name: "AttackSkill",
        category: "skill",
        inventorySprite: "SwordSkill",
        which: "attack",
        level: 3,
    },
    Whip: {
        name: "Whip",
        category: "interaction_item",
        inventorySprite: "Whip",
        text: "I can punish GhostFace."
    },
    Handcuffs: {
        name: "Handcuffs",
        category: "interaction_item",
        inventorySprite: "Handcuffs",
        text: "Should I arrest or kill GhostFace?"
    },
    Revolver: {
        name: "Revolver",
        category: "interaction_item",
        inventorySprite: "Revolver",
    },
    Sponge: {
        name: "Sponge",
        category: "interaction_item",
        inventorySprite: "Sponge",
        text: "Maybe I should take a bath?"
    },
    RubberDuck: {
        name: "RubberDuck",
        category: "interaction_item",
        inventorySprite: "RubberDuck",
        text: "One should never bath alone."
    },
    Candle: {
        name: "Candle",
        category: "interaction_item",
        inventorySprite: "Candle",
        text: "Common baby light my fire."
    },
    Ammo: {
        name: "Ammo",
        category: "interaction_item",
        inventorySprite: "Ammo",
    },
    GoldBar: {
        name: "GoldBar",
        category: "interaction_item",
        inventorySprite: "GoldBar",
    },
    LP: {
        name: "LP",
        category: "interaction_item",
        inventorySprite: "LP",
        text: "Some nice death metal."
    },
    Ribbon: {
        name: "Ribbon",
        category: "interaction_item",
        inventorySprite: "Ribbon",
        text: "I will look pretty with this."
    },
    HairBrush: {
        name: "HairBrush",
        category: "interaction_item",
        inventorySprite: "HairBrush",
        text: "Time to comb my hair. I have been adventuring too long."
    },
    Shield: {
        name: "Shield",
        category: "interaction_item",
        inventorySprite: "Shield",
    },
    Sword: {
        name: "Sword",
        category: "interaction_item",
        inventorySprite: "Sword",
    },
    Helmet: {
        name: "Helmet",
        category: "interaction_item",
        inventorySprite: "Helmet",
    },
    IronBar: {
        name: "IronBar",
        category: "interaction_item",
        inventorySprite: "IronBar",
        text: "Iron? I can make something from it."
    },
    Emerald: {
        name: "Emerald",
        category: "interaction_item",
        inventorySprite: "Emerald",
        text: "Emerald? I can make something from it."
    },
    Diamond: {
        name: "Diamond",
        category: "interaction_item",
        inventorySprite: "Diamond",
        text: "Diamond? My best friend."
    },
    Wasp: {
        name: "Wasp",
        category: "interaction_item",
        inventorySprite: "Wasp",
        text: "Stingy?"
    },
    Beer: {
        name: "Beer",
        category: "interaction_item",
        inventorySprite: "Beer",
        text: "A cold one."
    },
    Shawl: {
        name: "Shawl",
        category: "interaction_item",
        inventorySprite: "Shawl",
    },
    WoolenCap: {
        name: "WoolenCap",
        category: "interaction_item",
        inventorySprite: "WoolenCap",
    },
    Gloves: {
        name: "Gloves",
        category: "interaction_item",
        inventorySprite: "Gloves",
    },
    Dough: {
        name: "Dough",
        category: "interaction_item",
        inventorySprite: "Dough",
    },
    Pie: {
        name: "Pie",
        category: "interaction_item",
        inventorySprite: "Pie",
    },
    Amethyst: {
        name: "Amethyst",
        category: "interaction_item",
        inventorySprite: "Amethyst",
    },
    Moonstone: {
        name: "Moonstone",
        category: "interaction_item",
        inventorySprite: "Moonstone",
    },
    PocketRocket: {
        name: "PocketRocket",
        category: "interaction_item",
        inventorySprite: "PocketRocket",
    },
    Milk: {
        name: "Milk",
        category: "interaction_item",
        inventorySprite: "Milk",
    },
    Egg: {
        name: "Egg",
        category: "interaction_item",
        inventorySprite: "Egg",
    },
    WolfHead: {
        name: "WolfHead",
        category: "interaction_item",
        inventorySprite: "WolfHead",
    },
    RocketTop: {
        name: "RocketTop",
        category: "interaction_item",
        inventorySprite: "RocketTop",
        text: "Part of the rocket? Where is another?"
    },
    RocketBottom: {
        name: "RocketBottom",
        category: "interaction_item",
        inventorySprite: "RocketBottom",
        text: "Fixing this might be a rocket science. Ha ha."
    },
    BackPack: {
        name: "BackPack",
        category: "interaction_item",
        inventorySprite: "BackPack",
        text: "Let's put this pack on my back."
    },
    HikingBoot: {
        name: "HikingBoot",
        category: "interaction_item",
        inventorySprite: "HikingBoot",
        text: "Not my size."
    },
    SunScreen: {
        name: "SunScreen",
        category: "interaction_item",
        inventorySprite: "SunScreen",
        text: "Sun screen factor 50."
    },
    Towel: {
        name: "Towel",
        category: "interaction_item",
        inventorySprite: "Towel",
        text: "A towel. Pity I am not wet."
    },
    SilverBar: {
        name: "SilverBar",
        category: "interaction_item",
        inventorySprite: "SilverBar",
        text: "Silver. Malleable."
    },
    UraniumBar: {
        name: "UraniumBar",
        category: "interaction_item",
        inventorySprite: "UraniumBar",
    },
    PurpleTear: {
        name: "PurpleTear",
        category: "interaction_item",
        inventorySprite: "PurpleTear",
    },
    GoldSteel: {
        name: "GoldSteel",
        category: "interaction_item",
        inventorySprite: "GoldSteel",
    },
    Shell: {
        name: "Shell",
        category: "interaction_item",
        inventorySprite: "Shell",
        text: "Pretty shell."
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
        sprite: "Knightess",
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
    Purrscilla: {
        name: "Purrscilla",
        sprite: "Purrscilla",
        category: 'crest',
        voice: "Female",
        wants: ["LeoPumps", "LeoPumps", "LeoHat", "Leotard"],
        gives: "GoldCoin",
        text: {
            intro: "Purrscilla purrs for stylish grace, spotted fashion, my ideal embrace.",
            progress: "Fashion's call, one piece is here, more to strut, bring them near.",
            conclusion: "All in leopard, style complete, here's your gold, for a feat so neat."
        }
    },
    Dominatrix: {
        name: "Dominatrix",
        sprite: "Dominatrix",
        category: 'crest',
        voice: "Female",
        wants: ["Handcuffs", "Whip"],
        gives: "Revolver",
        text: {
            intro: "In leather's embrace, I seek delight, Bring my favorite toys, hidden from sight.",
            progress: "Toys for play, part of my game, more to find, to fuel the flame.",
            conclusion: "Toys in hand, my collection's prime, take this revolver, use it in time.",
        }
    },
    Siren: {
        name: "Siren",
        sprite: "Siren",
        category: 'crest',
        voice: "Female",
        wants: ["Sponge", "RubberDuck"],
        gives: "Candle",
        text: {
            intro: "A siren's bath, a wish so vague, bring items soft and buoyant, a watery stage.",
            progress: "A piece for my bath, one more to seek, bring it swift, don't be meek.",
            conclusion: "Bath complete, a splash of fun, hold this candle, till my return, hun.",
        }
    },
    DeMona: {
        name: "DeMona",
        sprite: "DeMona",
        category: 'crest',
        voice: "Female",
        wants: ["BabyDragon", "BabyDragon", "BabyDragon", "BabyDragon", "BabyDragon"],
        gives: "GoldBar",
        text: {
            intro: "Mother of dragons, heart in a whirl, Find all my babies, each precious pearl.",
            progress: "A dragonling found, more out there roam, seek my brood, bring them home.",
            conclusion: "All my babies, back in my nest, take this gold bar, gold is best.",
        }
    },
    PoliceWoman: {
        name: "PoliceWoman",
        sprite: "PoliceWoman",
        category: 'crest',
        voice: "Female",
        wants: ["Revolver", "Ammo"],
        gives: "LP",
        text: {
            intro: "In law's pursuit, a tool I lack, a revolver and ammo, I need in my pack.",
            progress: "Part supplied, but still I wait, complete the set, before it's too late.",
            conclusion: "Armed and ready, thanks to you, here's a metal LP, blast it true!",
        }
    },
    Rapunzel: {
        name: "Rapunzel",
        sprite: "Rapunzel",
        category: 'crest',
        voice: "Female",
        wants: ["Ribbon", "HairBrush"],
        gives: "Shield",
        text: {
            intro: "Long hair's plight, a brush and band, for Rapunzel's locks, lend a hand.",
            progress: "One item here, my hair awaits, bring the next, before it's too late.",
            conclusion: "Brush and ribbon, now I'm dight, For your aid, a shield for fight.",
        }
    },
    Froggess: {
        name: "Froggess",
        sprite: "Froggess",
        category: 'crest',
        voice: "Female",
        wants: ["Fly", "Fly", "Fly"],
        gives: "Sword",
        text: {
            intro: "Froggess here, in pond's domain, three flies I seek, for your gain.",
            progress: "A fly snagged, my appetite whets, more to catch in my nets.",
            conclusion: "Three flies caught, my feast's delight, for you, a sword, which I stole from the knight.",
        }
    },
    MetalMaiden: {
        name: "MetalMaiden",
        sprite: "MetalMaiden",
        category: 'crest',
        voice: "Female",
        wants: ["LP", "LP", "LP", "LP", "LP"],
        gives: "Ribbon",
        text: {
            intro: "Metal's maiden, vinyl's my quest, five LPs to rock at my best.",
            progress: "Records found, but still some missing, my playlist's hungry, keep on fishing.",
            conclusion: "Metal's roar now complete in my lair, for you, a ribbon, wear it if you dare.",
        }
    },
    Ghostess: {
        name: "Ghostess",
        sprite: "Ghostess",
        category: 'crest',
        voice: "Female",
        wants: ["Skull", "Skull", "Skull", "Candle", "Candle"],
        gives: "HairBrush",
        text: {
            intro: "Ghostess whispers, in shadows roam, three skulls, two candles, for my ghostly home.",
            progress: "Skulls and candles, some in sight, bring more to glow in the night.",
            conclusion: "Skulls and candles, now in place, for your aid, a hairbrush with grace.",
        }
    },
    SwordGirl: {
        name: "SwordGirl",
        sprite: "SwordGirl",
        category: 'crest',
        voice: "Female",
        wants: ["Sword", "Shield"],
        gives: "Helmet",
        text: {
            intro: "Sword Girl shines, in battle's light, seeks sharp allies, for her fight.",
            progress: "Weapons gather, her collection grows, yet still, for more, her eagerness shows.",
            conclusion: "My beauty's unmatched, no helmet to wear, for you instead, this helm, I'll share.",
        }
    },
    RedWellWoman: {
        name: "RedWellWoman",
        sprite: "RedWellWoman",
        category: 'crest',
        voice: "Female",
        wants: ["Blood", "Blood", "Blood"],
        gives: "GoldCoin",
        text: {
            intro: "From depths dark, a plea so red, three doses sought, of liquid dread.",
            progress: "Your quest unfolds, in shadows deep, still more to find, before you sleep.",
            conclusion: "Your task complete, with red in hand, a gold coin for you, as was planned.",
        }
    },
    SkullCollector: {
        name: "SkullCollector",
        sprite: "SkullCollector",
        category: 'crest',
        voice: "Female",
        wants: ["Skull", "Skull", "Skull", "Skull", "Skull"],
        gives: "GoldCoin",
        text: {
            intro: "In shadows lurk, a collector's plea, skulls she seeks, from you and me.",
            progress: "Her collection grows, yet still she waits, for more to come, through darkened gates.",
            conclusion: "With skulls in tow, her smile gleams, a gold coin yours, in moonlight beams.",
        }
    },
    Locksmithstress: {
        name: "Locksmithstress",
        sprite: "Locksmithstress",
        category: 'crest',
        voice: "Female",
        wants: ["GoldBar", "GoldBar", "GoldBar", "RedGem", "BlueGem", "GreenGem"],
        gives: "EmeraldKey",
        text: {
            intro: "In keys and locks, my skills supreme, Gold and gems to fulfill my dream.",
            progress: "More treasures sought to forge the link, How close are we? What do you think?",
            conclusion: "With gold and gems now in my stash, An Emerald Key for you, to dash."
        }
    },
    Shepardess: {
        name: "Shepardess",
        sprite: "Shepardess",
        category: 'crest',
        voice: "Female",
        wants: ["Sheep", "Sheep", "Sheep", "Sheep", "Sheep"],
        gives: "Diamond",
        text: {
            intro: "Lost in meadows, my sheep, my care, Find them please, this task I dare.",
            progress: "Some sheep found, but more remain, In fields afar, 'neath sun and rain.",
            conclusion: "All my sheep, safe and sound, For you, a diamond, as promised, profound."
        }
    },
    ForestWitch: {
        name: "ForestWitch",
        sprite: "ForestWitch",
        category: 'crest',
        voice: "Female",
        wants: ["Helmet", "Poison", "Poison", "BlueGem"],
        gives: "Emerald",
        text: {
            intro: "In the forest deep, a potion to brew, Needs of green hue, and a cauldron too.",
            progress: "Ingredients gather, my brew starts to bubble, Still something's missing, on the double.",
            conclusion: "Potion complete, with cauldron and gem, An emerald for you, from the forest's hem."
        }
    },
    Locksmithstress2: {
        name: "Locksmithstress2",
        sprite: "Locksmithstress2",
        category: 'crest',
        voice: "Female",
        wants: ["IronBar", "IronBar", "IronBar", "Emerald", "Diamond"],
        gives: "EmeraldKey",
        text: {
            intro: "With iron's strength and gems so fine, A key I'll forge, both tough and divine.",
            progress: "The forge burns bright, your task's halfway, More materials needed, without delay.",
            conclusion: "All combined, with skill and flair, Your Emerald Key, crafted with care."
        }
    },
    Spideress: {
        name: "Spideress",
        sprite: "Spideress",
        category: 'crest',
        voice: "Female",
        wants: ["BabyGreenSpider", "BabyGreenSpider", "BabyGreenSpider"],
        gives: "Fly",
        text: {
            intro: "In silk and shadow, I await, For my children, do not be late.",
            progress: "Some returned, yet more to find, In your search, please be kind.",
            conclusion: "All my babies, safe with their kin, For you, a Fly, caught on a whim."
        }
    },
    Libra: {
        name: "Libra",
        sprite: "Libra",
        category: 'crest',
        voice: "Female",
        wants: ["Book", "GoldenBook"],
        gives: "LP",
        text: {
            intro: "Amidst the silence, a desire loud, For knowledge golden, and stories proud.",
            progress: "One treasure found, one more to seek, In realms of words, for those who peek.",
            conclusion: "Both book and gold, now in my keep, For you, death metal, dark and deep."
        }
    },
    DesertGirl: {
        name: "DesertGirl",
        sprite: "DesertGirl",
        category: 'crest',
        voice: "Female",
        wants: ["Beer", "Beer"],
        gives: "GoldBar",
        text: {
            intro: "Two beer or not two beer, that is the question.",
            progress: "One ale procured, yet thirst's ambition calls for a second's provision.",
            conclusion: "Libations twice, now my spirit's quenched, For thee, a bar of gold, nobly wrenched."
        }
    },
    Wasp1: {
        name: "Wasp1",
        sprite: "Wasp1",
        category: 'crest',
        voice: "Female",
        wants: ["Wasp", "Wasp"],
        gives: "Shawl",
        text: {
            intro: "Buzzing heart, a mother's plea, For my babies, come fly to me.",
            progress: "One found, in the hive's embrace, Yet another, lost in space.",
            conclusion: "Babies back, in their rightful buzz, For you, a shawl, as warm as fuzz."
        }
    },
    Wasp2: {
        name: "Wasp2",
        sprite: "Wasp2",
        category: 'crest',
        voice: "Female",
        wants: ["Wasp", "Wasp"],
        gives: "WoolenCap",
        text: {
            intro: "In the buzz of day, a sister's call, For my wasplets, small and all.",
            progress: "A sibling safe, beneath my wing, Seek the last, let the hive sing.",
            conclusion: "Together again, my heart caps in joy, For your help, a woolen cap, oh boy."
        }
    },
    AnotherSquirrel: {
        name: "AnotherSquirrel",
        sprite: "AnotherSquirrel",
        category: 'crest',
        voice: "Female",
        wants: ["Acorn", "Acorn"],
        gives: "Gloves",
        text: {
            intro: "Chitter chatter, a request so fine, Two acorns sought, for winter's dine.",
            progress: "One treasure found, another to seek, In leafy nooks, by the creek.",
            conclusion: "Acorns gathered, my winter's feast, For you, gloves, from the least."
        }
    },
    Climber: {
        name: "Climber",
        sprite: "Climber",
        category: 'crest',
        voice: "Female",
        wants: ["Shawl", "Gloves", "WoolenCap"],
        gives: "PocketRocket",
        text: {
            intro: "Where were you so long, Princess? Don't you know how cold I am?",
            progress: "Cloth and warmth, piece by piece, Continue on, till all's in fleece.",
            conclusion: "At last, warmth surrounds, chill's defeat, A PocketRocket, for you, a fiery treat."
        }
    },
    Farmeress: {
        name: "Farmeress",
        sprite: "Farmeress",
        category: 'crest',
        voice: "Female",
        wants: ["WolfHead"],
        gives: "Egg",
        text: {
            intro: "Troubled by wolves, night and day, Bring me their leader's head, I pray.",
            progress: "Is the pack still prowling, leader strong? Your quest, it seems, still lingers long.",
            conclusion: "With the leader's fall, my farm's at peace, For your bravery, an egg, my thanks won't cease."
        }
    },
    WaterFairy: {
        name: "WaterFairy",
        sprite: "WaterFairy",
        category: 'crest',
        voice: "Female",
        wants: ["RocketBottom", "RocketTop"],
        gives: "PocketRocket",
        text: {
            intro: "Rocket science? Bring it to Fairy, In engines and thrusters, I'm quite merry.",
            progress: "Part secured, but incomplete, More engineering feats to meet.",
            conclusion: "Both segments joined, a rocket's grace, Ready for space, in its rightful place."
        }
    },
    Cookie: {
        name: "Cookie",
        sprite: "Cookie",
        category: 'crest',
        voice: "Female",
        wants: ["LittleChicken", "Apple", "Dough"],
        gives: "Pie",
        text: {
            intro: "In the kitchen, where magic's spun, Ingredients needed, one by one.",
            progress: "A mix in progress, but not yet complete, Seek and gather, for a treat so sweet.",
            conclusion: "Ingredients blended, under my chef's guise, For you, a pie, a delicious surprise."
        }
    },
    Bakeress: {
        name: "Bakeress",
        sprite: "Bakeress",
        category: 'crest',
        voice: "Female",
        wants: ["Egg", "Milk"],
        gives: "Dough",
        text: {
            intro: "Flour and passion, for bread to rise, Egg and milk, for dough's disguise.",
            progress: "Stirring, waiting, something lacks, Continue your quest, no time to relax.",
            conclusion: "Egg and milk, now mixed within, Your reward, dough ready to spin."
        }
    },

    Spacy: {
        name: "Spacy",
        sprite: "Spacy",
        category: 'crest',
        voice: "Female",
        wants: ["PocketRocket"],
        gives: "Amethyst",
        text: {
            intro: "Among the stars, I dream to soar, A PocketRocket, I implore.",
            progress: "Is the rocket ready, to traverse the sky? Your mission, it seems, is not yet nigh.",
            conclusion: "Rocket in hand, the cosmos await, For your aid, an Amethyst, to celebrate."
        }
    },
    SpaceWarrior: {
        name: "SpaceWarrior",
        sprite: "SpaceWarrior",
        category: 'crest',
        voice: "Female",
        wants: ["PocketRocket"],
        gives: "Moonstone",
        text: {
            intro: "In the vacuum of space, a warrior's call, For a PocketRocket, to conquer all.",
            progress: "The rocket's quest, not yet done, Press on, brave one, till victory's won.",
            conclusion: "With rocket secured, through stars we'll roam, For your bravery, a Moonstone, from the cosmic dome."
        }
    },
    HillBillie: {
        name: "HillBillie",
        sprite: "HillBillie",
        category: 'crest',
        voice: "Female",
        wants: ["HikingBoot", "HikingBoot", "BackPack"],
        gives: "Milk",
        text: {
            intro: "Up these hills, I long to tread, But proper gear, I sadly shed.",
            progress: "A boot, a pack, my journey's start, Yet more is needed, to play my part.",
            conclusion: "Fully equipped, the mountains I'll milk, For you, fresh alpine milk, smooth as silk."
        }
    },
    Venus: {
        name: "Venus",
        sprite: "Venus",
        category: 'crest',
        voice: "Female",
        wants: ["Towel", "SunScreen"],
        gives: "Pearl",
        text: {
            intro: "From ocean's embrace, I emerge anew, Sun's fiery gaze, I wish to eschew.",
            progress: "Protection begun, yet still incomplete, Items of comfort, for sun's harsh beat.",
            conclusion: "Now fully shielded, from the sun's fierce kiss, A pearl from the depths, your reward is this."
        }
    },
    WellWoman: {
        name: "WellWoman",
        sprite: "WellWoman",
        category: 'crest',
        voice: "Female",
        wants: ["Towel", "SunScreen"],
        gives: "GoldBar",
        text: {
            intro: "From the well's depth, I rise, sun drenched, Towel and sunscreen, my skin's defense.",
            progress: "Shelter from the sun, partially found, More is needed, for warmth all around.",
            conclusion: "With both towel and cream, I stand unburned, For your kindness, a gold bar earned."
        }
    },
    MathTeacher: {
        name: "MathTeacher",
        sprite: "MathTeacher",
        category: 'crest',
        voice: "FemHighQuick",
        wants: ["Pie"],
        gives: "UraniumBar",
        text: {
            intro: "In a world of numbers, PI reigns supreme. Can you deliver, or is it just a dream?",
            progress: null,
            conclusion: "Ah, a pie of a different sort! Not my calculation, but a good sport. Here's Uranium, for your effort."
        }
    },
    NinJette: {
        name: "NinJette",
        sprite: "NinJette",
        category: 'crest',
        voice: "Female",
        wants: ["Sword", "Whip"],
        gives: "Diamond",
        text: {
            intro: "Shadows whisper, my arsenal lost, Sword and whip, what a cost.",
            progress: "One weapon found, yet one remains, Silent footsteps, only gains.",
            conclusion: "Arsenal complete, my shadow's dance, For you, a diamond, thanks to chance."
        }
    },
    Gemma: {
        name: "Gemma",
        sprite: "Gemma",
        category: 'crest',
        voice: "Female",
        wants: ["Diamond", "Amethyst", "Moonstone", "Pearl"],
        gives: "PurpleTear",
        text: {
            intro: "Beneath the earth, where secrets gleam, I seek jewels to fulfill a dream.",
            progress: "A gem a stone, in hand you bring, Yet more are needed, for the tear to sing.",
            conclusion: "Diamond, amethyst, moonstone, pearl, all unite, Behold, the PurpleTear, in its mystical light."
        }
    },
    AlloyaPinkass: {
        name: "AlloyaPinkass",
        sprite: "AlloyaPinkass",
        category: 'crest',
        voice: "Female",
        wants: ["GoldBar", "IronBar", "SilverBar", "UraniumBar"],
        gives: "GoldSteel",
        text: {
            intro: "In fire and forge, my art does bloom, For GoldSteel creation, metals I consume.",
            progress: "Bar by bar, the alloy takes shape, Continue your quest, let no metal escape.",
            conclusion: "Gold, iron, silver, uranium, now blend, GoldSteel is forged, your journey's end."
        }
    },
    BlondeVenus: {
        name: "BlondeVenus",
        sprite: "BlondeVenus",
        category: 'crest',
        voice: "Female",
        wants: ["Shell", "Shell"],
        gives: "EmeraldKey",
        text: {
            intro: "From seafoam's embrace, I arise, Seeking shells under the skies.",
            progress: "One shell returned to ocean's call, Yet another awaits, to complete the thrall.",
            conclusion: "Shells reunited with the sea's embrace, For you, an EmeraldKey, a token of grace."
        }
    },
    Keysa: {
        name: "Keysa",
        sprite: "Keysa",
        category: 'crest',
        voice: "Female",
        wants: ["GoldSteel", "PurpleTear"],
        gives: "PurpleKey",
        text: {
            intro: "In my workshop, magic and metal blend, For a unique key, two treasures I'll mend.",
            progress: "One piece is here, bring another to be clear.",
            conclusion: "GoldSteel and PurpleTear, now finely entwined, Behold, the PurpleKey, uniquely designed."
        }
    },
    





    /** undef */

};

const INTERACTION_SHRINE = {
    Doctress: {
        name: "Doctress",
        sprite: "Doctress",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "HealthSkill",
        text: {
            intro: "In white coat's care, a cure I wield, your health to boost, if gold's unsealed.",
            progress: null,
            conclusion: "Gold received, now feel my art, increased health, a fresh new start."
        }
    },
    DefenseProfessor: {
        name: "DefenseProfessor",
        sprite: "DefenseProfessor",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "DefenseSkill",
        text: {
            intro: "In armor clad, skills to bestow, for gold, your defense shall grow.",
            progress: null,
            conclusion: "Gold in hand, now heed my lore, stronger defense, for battles more."
        }
    },
    Alchemist: {
        name: "Alchemist",
        sprite: "Alchemist",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "ManaSkill",
        text: {
            intro: "With potions brewed and arcane might, for gold, I'll boost your mana's flight.",
            progress: null,
            conclusion: "Coin transmuted, now feel the surge, mana expanded, let power emerge."
        }
    },
    Sorceress: {
        name: "Sorceress",
        sprite: "Sorceress",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "MagicSkill",
        text: {
            intro: "Veiled in secrets, wisdom's key, a small price for magic's spree.",
            progress: null,
            conclusion: "Offering accepted, now wisdom flows, in magic's depth, your knowledge grows."
        }
    },
    Ninja: {
        name: "Ninja",
        sprite: "Ninja",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "AttackSkill",
        text: {
            intro: "Shadows whisper, skills to impart, for a price, the art of the martial heart.",
            progress: null,
            conclusion: "Price accepted, now shadows your guide, asskicking skills, in you reside."
        }
    },
    Priestess: {
        name: "Priestess",
        sprite: "Priestess",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "HealthSkill",
        text: {
            intro: "In sacred light, a blessing I hold, For a token, watch your health unfold.",
            progress: null,
            conclusion: "Offering given, now receive my grace, health enhanced, for your journeys pace."
        }
    },
    ManaGoddess: {
        name: "ManaGoddess",
        sprite: "ManaGoddess",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "ManaSkill",
        text: {
            intro: "In celestial realms, power I wield, for your coin, Mana's full force unsealed.",
            progress: null,
            conclusion: "Your offering accepted, let the magic flow, Mana unleashed, in radiant glow."
        }
    },
    Whipper: {
        name: "Whipper",
        sprite: "Whipper",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "AttackSkill",
        text: {
            intro: "With whip in hand, skills to hone, for a gold coin, your strength I'll own.",
            progress: null,
            conclusion: "Payment made, now feel my power, attack skills honed, foes will cower."
        }
    },
    CanyonGirl: {
        name: "CanyonGirl",
        sprite: "CanyonGirl",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "HealthSkill",
        text: {
            intro: "In canyon's echo, a secret I hold, for a coin of gold, watch your health threshold.",
            progress: null,
            conclusion: "Gold received, under open sky, your health soars, reaching high."
        }
    },
    SnakeGirl: {
        name: "SnakeGirl",
        sprite: "SnakeGirl",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "DefenseSkill",
        text: {
            intro: "Slithering grace, defense to weave, a gold coin offered, lessons you'll receive.",
            progress: null,
            conclusion: "Coin now mine, your training's begun, in defense arts, you'll second to none."
        }
    },
    AnotherWitch: {
        name: "AnotherWitch",
        sprite: "AnotherWitch",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "MagicSkill",
        text: {
            intro: "A witch in shadows, magic's host, seeks gold coin for her arcane boast.",
            progress: null,
            conclusion: "Gold coin given, the pact is sealed, arcane secrets to you revealed."
        }
    },
    HealthGoddess: {
        name: "HealthGoddess",
        sprite: "HealthGoddess",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "HealthSkill",
        text: {
            intro: "From realms divine, where well being thrives, For one gold coin, your health revives.",
            progress: null,
            conclusion: "With your tribute gleaming, in palms divine, Receive now a boost of health, eternally thine."
        }
    },
    TempleGuardian: {
        name: "TempleGuardian",
        sprite: "TempleGuardian",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "DefenseSkill",
        text: {
            intro: "At temple gates, a guardian stands, For gold, she'll teach defense with hands.",
            progress: null,
            conclusion: "Gold offered, secrets now unfurled, With newfound skill, face a braver world."
        }
    },
    GothGirl: {
        name: "GothGirl",
        sprite: "GothGirl",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "ManaSkill",
        text: {
            intro: "Beneath the moon's pale gaze, secrets thrive, A single gold coin, and your powers I'll revive.",
            progress: null,
            conclusion: "The coin disappears into night's embrace, Unleashing mana, your arcane base."
        }
    },
    RedHeadDomme: {
        name: "RedHeadDomme",
        sprite: "RedHeadDomme",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "AttackSkill",
        text: {
            intro: "In the dance of dominance, power's play, A gold coin's worth, for strength I'll convey.",
            progress: null,
            conclusion: "The coin's essence, now a distant memory, In its stead, attack skills sharp as can be."
        }
    },
    RedMagicWoman: {
        name: "RedMagicWoman",
        sprite: "RedMagicWoman",
        category: 'crest',
        voice: "Female",
        wants: ["GoldCoin"],
        gives: "MagicSkill",
        text: {
            intro: "From the heart of fire, where spells are born, For a gold coin, your magic's reborn.",
            progress: null,
            conclusion: "The coin's glow fades, but in its wake, A surge of magic, yours to take."
        }
    },




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

const KEY_TYPES = ["Gold", "Silver", "Red", "Green", "Blue", "Emerald", "Purple"];
const KEY_TEXTURES = ["Gold", "Silver", "RedMetal", "GreenMetal", "BlueMetal", "EmeraldTexture", "PurpleMetal"];
const KEY_MATERIAL = ["gold", "silver", "redShine", "greenShine", "blueShine", "standard", "standard"];
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