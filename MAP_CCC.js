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
        name: "Entrance",
        data: '{"width":"16","height":"16","map":"BB2ABAA7BABAA3BABB2ABB4AA2BB2AA4BB2AA4BAA4BAA3BAA4BAA2BAA2BAA2BABB2AA3BAA22BAA2BAA3BABAA8EABAA4BB5AA2BB2ABB6ABABB2AA3BB9ABB4EBAA2BB4ABAA2BB10EBAA3BAA2BABB2AA2EBB2ABB7ABB4AA2BB31AB$ABB3AA2BB3ABB3"}',
        wall: "DungeonWall",
        floor: "GreenDungeonWall",
        ceil: "GreyDungeonFloor",
        decals: '[[88,5,"AticAtac112","picture"],[88,3,"AticAtac111","picture"],[88,1,"AticAtac110","picture"],[56,4,"RoundGrille96","crest"],[136,1,"LS","crest"],[23,7,"Zaxxon89","picture"],[25,7,"BlueMax20","picture"],[99,7,"ActecChallenge2","picture"],[75,7,"AntAttack2","picture"],[107,7,"Arena2","picture"],[131,5,"AA100","picture"],[153,5,"AMC3","picture"],[178,7,"MonkeyIsland143","picture"],[180,7,"DungeonMaster96","picture"],[241,1,"OReillyMine50","picture"],[243,1,"Scramble7","picture"]]',
        lights: '[[88,7,"WallLamp","standard"],[32,5,"WallLamp","red"],[131,3,"WallLamp","standard"],[14,7,"Lamp4","yellowgreen"],[141,7,"WallTorch","fire"],[214,5,"WallLamp3","red"],[244,1,"WallTorch","fire"],[177,7,"WallTorch","fire"]]',
        start: '[24,7]',
        gates: '[[8,7,"1.1","2.1","Closed"],[248,1,"1.2","3.1","Red"],[128,5,"1.3","4.1","Open"],[207,3,"1.4","5.1","Open"]]',
        keys: '[[102,0],[103,1],[104,2],[105,2],[106,3],[120,4]]',
        monsters: '[[72,"Bat"],[118,"RedGoldBat"],[166,"SkeletonDemo"]]',
        scrolls: '[[132,0],[149,1],[164,8]]',
        potions: '[[199,0],[202,1]]',
        gold: '[[37,"GoldBar"],[36,"SilverBar"],[35,"GoldCube"],[34,"Coins"]]',
        skills: '[[194,"Sword"],[195,"Sting"],[210,"Shield"],[211,"Magic"],[226,"Heart"],[227,"Mana"]]',
        containers: '[[67,"Chest","GOLD_ITEM_TYPE.GoldBar"],[84,"TreasureChest","SKILL_ITEM_TYPE.Sword"]]',
        doors: '[49,93,189,179]',
    }
    ,
    2: {
        name: "Small",
        data: '{"width":"8","height":"8","map":"BB4AA5BAA5BABB3AA11BB10ABABAA4BABB11AB$"}',
        wall: "Wall8",
        floor: "StoneFloor3",
        ceil: "GreyDungeonFloor",
        decals: '[[35,7,"AMC2","picture"],[24,5,"ActecChallenge2","picture"],[39,3,"AirWolf31","picture"],[28,1,"AlleyKat","picture"]]',
        lights: '[[3,7,"WallLamp","standard"]]',
        start: '[51,1]',
        gates: '[[59,1,"2.1","1.1","Open"]]',
    }
    ,
    3: {
        name: "Shrines",
        data: '{"width":"16","height":"16","map":"BB2AA9BB2AA9BB5ABB2AA2BB7AA2BB2AA2BB7ABB20ABB20ABB10AA3BB11$BB136A"}',
        wall: "DarkBricks",
        floor: "BrickTiles",
        ceil: "SpideryWall",
        decals: '[[4,7,"MonkeyIsland112","picture"],[10,7,"TombRaider109","picture"],[64,5,"Predator50","picture"],[66,5,"Killerwat50","picture"],[70,3,"DefenderOfTheCrown110","picture"],[68,3,"JupiterLander70","picture"],[55,1,"Oblivion110","picture"]]',
        lights: '[[1,7,"WallLamp","standard"],[34,7,"WallLamp","standard"],[14,7,"WallLamp3","white"]]',
        start: '[23,7]',
        gates: '[[7,7,"3.1","1.2","Open"]]',
        shrines: '[[113,1,"AttackShrine"],[115,1,"DefenseShrine"],[117,1,"MagicShrine"]]',
    }
    ,
    4: {
        name: "Small room",
        data: '{"width":"8","height":"8","map":"BB6AA18BAA2BB2AA6BB6AA2BB3AA5BB12A$"}',
        wall: "RockWall100",
        floor: "ScarletFloor1",
        ceil: "MossyWall3",
        decals: '[[42,5,"ArabianNights1","picture"],[8,5,"Apshai6","picture"],[44,5,"Apshai10","picture"],[44,3,"AppleLisa","picture"],[39,3,"BeachHeadReplace","picture"],[4,7,"AtariFalcon","picture"],[58,1,"AticAtac131","picture"]]',
        lights: '[[40,5,"WallLamp","standard"],[60,1,"WallLamp3","fire"],[3,7,"WallLamp","standard"]]',
        start: '[22,3]',
        gates: '[[23,3,"4.1","1.3","Open"],[24,5,"4.2","6.1","Open"]]',
    }
    ,
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
    ,
    6: {
        name: "Chasm",
        data: '{"width":"12","height":"12","map":"BB2ÁABB7ÁAÁÁ6AA40BB19ABB3ABB4AA2BAA3BB42A$AA8"}',
        wall: "MossyWallExcellent",
        floor: "ScarletRocks",
        ceil: "DullMoss",
        start: '[70,3]',
        decals: '[[124,1,"Jetpac3","picture"],[127,1,"BC103","picture"],[16,7,"Pitstop3","picture"],[19,7,"Morrowind140","picture"],[37,5,"TombRaider102","picture"],[97,5,"GatewayToApshai110","picture"],[46,3,"CongoBongo2","picture"],[106,3,"BoogaBoo90","picture"],[68,4,"Grate1_128","crest"],[67,4,"Grate1_128","crest"]]',
        lights: '[[14,7,"WallLamp","standard"],[21,7,"WallLamp","standard"],[122,1,"WallLamp3","lightRed"],[129,1,"WallLamp3","red"],[126,1,"WallLamp","standard"],[18,7,"WallLamp","standard"]]',
        gates: '[[71,3,"6.1","4.2","Open"],[60,5,"6.2","7.1","Gold"]]',
        keys: '[[38,0]]',
        monsters: '[[26,"RedGoldBat"],[110,"MissGalaxyDemo"]]',
        triggers: '[[44,4,"PurpleTriggerButton",0,42],[82,3,"MarbleTriggerButton",0,78]]',
    }
    ,
7 : {
    name: "InteractionStudy",
    data: '{"width":"16","height":"16","map":"BB5AA11BB2AA7BAA13BB2AA10BB3ÁAA16ÁÁ3AA7BB2AA31BABAA2BB5AA2BB8AA2BB22ABB4ÁAA6BÁBABB7ABB53A$ÁÁ12AA4ÁÁ2AA2"}',
    wall: "MossWall12",
    floor: "ScarletTIles3",
    ceil: "StoneBlockPavement",
    start: '[186,5]',
    decals: '[[29,7,"LeisureSuitLarry88","picture"],[237,1,"LeisureSuitLarry61","picture"],[124,4,"FlatPond","crest"]]',
    lights: '[[86,5,"WallLamp","standard"],[134,5,"WallLamp","standard"],[62,3,"WallLamp","standard"],[174,3,"WallLamp","standard"],[232,1,"WallTorch","fire"],[24,7,"WallTorch","fire"]]',
    gates: '[[127,3,"7.1","6.2","Open"]]',
    containers: '[[189,"TreasureChest","INTERACTION_ITEM.Fly"],[205,"TreasureChest","INTERACTION_ITEM.Fly"]]',
    triggers: '[[94,3,"MarbleTriggerButton",0,122],[110,3,"MarbleTriggerButton",0,121],[142,3,"MarbleTriggerButton",0,120],[38,4,"PurpleTriggerButton",1,36]]',
    entities: '[[234,1,"BlackWidow"]]',
    }
};

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
