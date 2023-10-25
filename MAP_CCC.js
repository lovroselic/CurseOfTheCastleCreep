/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
console.log("%cMAP for CCC loaded.", "color: #888");
/**
 * entry texts
 */

const MAP_TEXT = {
    2: "I should leave no stone unturned.",
    3: "Hmm? Which way to go first?",
    4: "I wonder if you are smart enough to lead me over Ghosty's traps?",
};

/** Map definitions */
const MAP = {
    1: {
        name: "Outside",
        sg: 0,
        data: '{"width":"9","height":"9","map":"BB6AA19BABB23AA4BB5ABB14$BB6A"}',
        wall: "DungeonWall",
        floor: "Grass2",
        ceil: "Sky1",
        start: '[40,1]',
        decals: '[[25,3,"Forest","crest"],[34,3,"Forest","crest"],[43,3,"Forest","crest"],[52,3,"Forest","crest"],[61,3,"Forest","crest"],[19,5,"Forest","crest"],[28,5,"Forest","crest"],[37,5,"Forest","crest"],[46,5,"Forest","crest"],[55,5,"Forest","crest"],[65,1,"Forest","crest"],[66,1,"Forest","crest"],[68,1,"Forest","crest"],[69,1,"Forest","crest"],[67,1,"Forest","crest"],[12,7,"LS","crest"],[14,7,"LS","crest"],[12,5,"CCC1","picture"]]',
        lights: '[[11,7,"WallLamp","standard"],[15,7,"WallLamp","standard"]]',
        gates: '[[4,7,"1.1","2.1","Gold"]]',
        keys: '[[21,0]]',
    }
    ,
    2: {
        name: "Entrance Hall",
        sg: 0,
        data: '{"width":"16","height":"16","map":"BB2AA4BB3ABB2ABB4AA3BB2ABB3AA12BB2ABAEABABB3AA10BB3ABAA2EAA6BEBAA4BAA5BAA8BB2ABAA2BAA2BAA6BB2AA2BAA7BB3ABAA3BB10ABAA2BABAA2BAA5BABABB3ABABABAA2BABAA2BB2ABABB2ABABB4AA2BB3ABB2EBB2AA2BB8AA2BB3ABB29ABB2$ABAA3B"}',
        wall: "DungeonWall",
        floor: "GreenDungeonWall",
        ceil: "GreyDungeonFloor",
        start: '[24,7]',
        decals: '[[72,1,"AticAtac111","picture"],[107,1,"Goonies90","picture"],[77,1,"DungeonMaster91","picture"],[145,1,"AticAtac117","picture"],[53,1,"TheHobbit16","picture"],[96,5,"1942_200","picture"],[85,5,"Reaper","crest"],[43,5,"TombRaider101","picture"],[47,3,"LeisureSuitLarry93","picture"],[101,3,"CrystalCastles90","picture"],[95,3,"MonkeyIsland143","picture"],[23,7,"EyeOfTheBeholder130","picture"],[19,7,"KokotoniWilf60","picture"],[59,3,"ManicMiner52","picture"],[69,5,"Crack20","crest"],[101,5,"Crack21","crest"],[56,4,"Grate1_128","crest"],[115,4,"Drain64","crest"],[45,4,"FlatPond2","crest"],[120,1,"MrRobot11","picture"],[151,1,"KingsQuest50","picture"],[153,1,"UW10","picture"],[195,1,"Defender110","picture"],[173,1,"Captive200","picture"],[248,1,"Prince51","picture"],[235,1,"BrianBloodaxe11","picture"],[244,1,"JungleHunt2","picture"],[176,5,"EyeOfTheBeholder110","picture"],[165,5,"Bagitman90","picture"],[155,5,"SVS1011","picture"],[191,3,"JetPac50","picture"],[143,3,"Unknown30","picture"],[181,3,"SittingSkeleton2","crest"],[147,7,"Hero72","picture"],[120,7,"SkoolDaze50","picture"],[173,7,"Zaxxon70","picture"],[195,7,"MontyMole111","picture"],[139,3,"TheHobbit14","picture"],[152,4,"RoundGrille96","crest"],[196,4,"RoundGrille96","crest"],[205,4,"Grate1_128","crest"],[151,7,"CastleOfTerror4","picture"],[153,7,"Elvira1","picture"],[200,3,"ReturnToCastleWolfenstein14","picture"],[201,1,"BattleThroughTime2","picture"]]',
        lights: '[[17,7,"WallLamp","standard"],[26,7,"WallLamp","standard"],[13,7,"WallLamp","standard"],[67,7,"WallTorch","fire"],[72,7,"WallTorch","fire"],[242,1,"WallLamp3","standardRedish"],[238,1,"WallLamp3","standardRedish"],[184,1,"WallTorch","fire"],[234,3,"WallTorch","fire"]]',
        gates: '[[8,7,"2.1","1.1","Open"],[247,1,"2.2","3.1","Closed"]]',
        monsters: '[[97,"RedGoldBat"],[30,"RedGoldBat"],[88,"Bat"],[194,"Spider"],[157,"Spider"]]',
        potions: '[[28,0],[60,1]]',
        gold: '[[233,"SilverBar"],[161,"GoldBar"],[219,"GoldCube"]]',
        skills: '[[225,"Sword"],[140,"Shield"]]',
        containers: '[[84,"Wardrobe","INTERACTION_ITEM.Fly",7],[132,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",1],[164,"Chest","GOLD_ITEM_TYPE.SilverBar",7],[142,"Barrel","GOLD_ITEM_TYPE.GoldCube",7]]',
        doors: '[92,49,187,197]',
    }
    ,
    3: {
        name: "Which Way",
        sg: 0,
        data: '{"width":"13","height":"9","map":"BB5AA12BB2AA27BABB7ABB13ABABB3ABABB15ABABB20A$"}',
        wall: "Wall10",
        floor: "GreenDungeonWall",
        ceil: "RockCeiling",
        start: '[19,7]',
        decals: '[[58,1,"SwordOfFargoal200","picture"],[18,7,"CastleHaunt","picture"],[20,7,"CastleHaunt200","picture"],[96,1,"Wolfenstein70","picture"],[98,1,"Wolfenstein31","picture"],[50,3,"Vixen3","picture"],[76,3,"Vixen70","picture"],[40,5,"Tombraider140","picture"],[66,5,"TombRaider130","picture"]]',
        lights: '[[58,7,"WallLamp","standard"],[27,5,"WallLamp","standard"]]',
        gates: '[[6,7,"3.1","2.2","Open"],[52,5,"3.2","4.1","Blue"],[64,3,"3.3","5.1","Blue"],[110,1,"3.4","6.1","Red"]]',
        keys: '[[45,4]]',
        monsters: '[[71,"Spider"],[54,"Bat"],[62,"RedGoldBat"]]',
        containers: '[[36,"Crate","GOLD_ITEM_TYPE.GoldBar",7]]',
    }
    ,
    4: {
        name: "West Staircase Up",
        sg: 0,
        data: '{"width":"8","height":"8","map":"BB4AA3BAA8BB2AA3BAA2BB7ABB3ABB10ABABB3ABB6ABB3A$"}',
        wall: "DarkBricks",
        floor: "BrickTiles",
        ceil: "BrokenRuin",
        start: '[54,3]',
        decals: '[[10,7,"DungeonMaster201","picture"],[12,7,"DungeonMaster97","picture"],[50,1,"DungeonMaster91","picture"],[61,1,"DungeonMaster70","picture"],[25,5,"DungeonMaster204","picture"],[38,3,"DungeonMaster200","picture"],[35,4,"FlatPond2","crest"],[19,4,"Crack4","crest"]]',
        lights: '[[51,1,"WallLamp2","standard"]]',
        gates: '[[55,3,"4.1","3.2","Open"],[3,7,"4.2","7.1","Up"]]',
        monsters: '[[11,"MissGalaxyGreen"]]',
        scrolls: '[[9,0],[21,6]]',
        containers: '[[33,"Barrel","GOLD_ITEM_TYPE.GoldBar",5],[30,"Barrel","INTERACTION_ITEM.Fly",3]]',
    }
    ,
    5: {
        name: "placeholder",
        sg: 0,
        data: '{"width":"8","height":"8","map":"BB5AA11BABB20AA3BB5ABB10$BB6A"}',
        wall: "BeautifullWall1",
        floor: "RockFloor",
        ceil: "Pavement",
        start: '[11,7]',
        gates: '[[3,7,"5.1","3.3","Open"]]',
    }
    ,
    6: {
        name: "placeholder",
        sg: 0,
        data: '{"width":"8","height":"8","map":"BB5AA11BABB20AA3BB5ABB10$BB6A"}',
        wall: "BeautifullWall1",
        floor: "RockFloor",
        ceil: "Pavement",
        start: '[11,7]',
        gates: '[[3,7,"6.1","3.4","Open"]]',
    }
    ,
    7: {
        name: "West Tower",
        sg: 0,
        data: '{"width":"20","height":"20","map":"BB3AA8EAA5BB4AEÁÁ2AA32BAA8BB5AA2BB2AQBEBB2ABB2ÁÁ3AA2BÁABAA2BB2AA2BB2AA16BAA6EABAA4BAA2BAA8BAA9BAA7BAA8BAA2BAA12BB4AA2BABB3ABABB2ABB2ÁBB6AA2BAA2BABB4AA2EABB2ABB3ABABB7ABB3ABAA2BB10ABB2AA2BABB2ABB4EBB7ABB7ABB4ABB12EBB15$AA2BB10ABB2ABB12ABB6AA4BB3AA3ÁAA2ÁÁ22BÁÁ2AA2"}',
        wall: "BrownishWall",
        floor: "BrownishMarble",
        ceil: "BlurryScarlet",
        start: '[377,1]',
        decals: '[[296,7,"DancingSkeletons2","crest"],[298,7,"DancingSkeletons2","crest"],[339,3,"CrawlMaster110","picture"],[306,7,"CrawlMaster111","picture"],[311,7,"CrawlMaster112","picture"],[261,7,"CrawlMaster113","picture"],[105,7,"CrawlMaster114","picture"],[112,7,"CrawlMaster115","picture"],[383,1,"CrawlMaster130","picture"],[348,1,"CrawlMaster131","picture"],[391,1,"CrawlMaster132","picture"],[386,1,"CrawlMaster133","picture"],[320,5,"SittingSkeleton2","crest"],[344,5,"PrayingSkeleton10","crest"],[200,5,"Skeleton12","crest"],[121,5,"Daggerfall4","picture"],[349,5,"SpectrumGame1","picture"],[173,3,"AztecChallenge112","picture"],[353,3,"Skullkeep","picture"],[304,3,"Imhotep2","picture"],[217,3,"Defender110","picture"],[257,3,"Invaders2","picture"],[136,3,"Soccer3","picture"],[164,5,"TombRaider111","picture"],[262,1,"SeaWolf60","picture"],[388,1,"AticAtacCrest1","crest"],[355,5,"Barbarian112","picture"],[48,7,"ImpossibleMsission112","picture"],[10,7,"JetSetWilly88","picture"],[13,7,"LeisureSuitLarry74","picture"],[7,7,"Fred102","picture"],[3,7,"ReturnToCastleWolfenstein11","picture"],[82,1,"ReturnToCastleWolfenstein12","picture"],[107,1,"ReturnToCastleWolfenstein13","picture"],[85,1,"ReturnToCastleWolfenstein14","picture"],[91,1,"RickDangerous11","picture"],[94,1,"F1-1","picture"],[38,3,"ManicMiner61","picture"],[78,3,"MontyMole100","picture"],[35,3,"DM107","picture"],[48,3,"Choplifter11","picture"],[75,5,"AticAtac201","picture"],[44,5,"GIJoe71","picture"],[52,5,"CrystalCastles90","picture"],[46,4,"Grate1_128","crest"],[50,4,"Grate1_128","crest"],[68,4,"Drain2_96","crest"],[148,4,"RoundGrille96","crest"],[146,4,"RoundGrille96","crest"],[150,4,"RoundGrille96","crest"]]',
        lights: '[[297,7,"WallLamp","standard"],[306,1,"WallLamp","standard"],[311,1,"WallLamp","standard"],[382,1,"WallTorch","fire"],[262,7,"WallTorch","fire"],[373,3,"WallLamp","standard"],[364,5,"WallLamp","standard"],[359,3,"WallLamp","standard"],[106,7,"WallLamp","standard"],[110,7,"WallLamp","standard"],[44,3,"WallLamp","standard"],[48,5,"WallLamp","standard"],[52,3,"WallLamp","standard"],[16,7,"WallLamp","standard"]]',
        gates: '[[397,1,"7.1","4.2","Down"],[59,3,"7.2","8.1","Up"]]',
        monsters: '[[317,"Bat"],[321,"Spider"],[286,"MissGalaxyGreen"],[291,"MissGalaxyGreen"],[203,"MissGreen"],[214,"MissGreen"],[147,"MissGreen"],[150,"MissGalaxyGreen"],[57,"Bat"],[42,"MissGalaxyGreen"],[53,"MissGalaxyGreen"],[28,"MissGreen"]]',
        scrolls: '[[89,12],[292,2],[181,4],[236,11]]',
        potions: '[[318,0],[365,1],[372,1],[328,1],[329,1]]',
        gold: '[[241,"GoldCube"],[196,"GoldCube"],[274,"GoldCube"],[368,"GoldCube"],[307,"GoldCube"],[122,"SilverBar"],[135,"SilverBar"],[165,"SilverBar"]]',
        skills: '[[281,"Heart"],[361,"Mana"],[276,"Magic"]]',
        containers: '[[283,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",3],[363,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",3],[22,"Chest","GOLD_ITEM_TYPE.SilverBar",7],[29,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",7],[61,"Barrel","SKILL_ITEM_TYPE.Magic",1],[74,"Crate","GOLD_ITEM_TYPE.SilverBar",1]]',
        doors: '[335,324,124,162,175,133,108]',
        triggers: '[[313,3,"MarbleTriggerButton",0,268],[304,5,"MarbleTriggerButton",0,248],[232,4,"MarbleTriggerButton",0,188]]',
        entities: '[[40,5,"BlackWidow"]]',
    }
    ,
    8 : {
        name: "West Top",
        sg: 0,
        data: '{"width":"10","height":"10","map":"BB3AA2BABAA12BB5ABAA4BAA4BB2AA4BABB7ABABABABABB2ABB5ABB2ABB2AA3BABB2ABB4ABB11$BA"}',
        wall: "GreenDungeonWall",
        floor: "ScarletFloor1",
        ceil: "MossyWall3",
        start: '[61,5]',
        decals: '[[63,3,"WOWc1","crest"],[66,3,"Underwurlde131","picture"],[38,3,"Shamus4","picture"],[78,3,"RickDangerous70","picture"],[33,5,"SVS112","picture"],[20,5,"HalfLife60","picture"],[71,5,"KnightLore111","picture"],[13,7,"Oblivion110","picture"],[8,7,"BeachHeadReplace","picture"],[36,7,"WhoDaresWins71","picture"],[33,7,"Barbarian3","picture"],[63,1,"Witcher103","picture"],[66,1,"Neptunes daughters","picture"],[93,1,"LCP","picture"],[57,4,"Grate1_128","crest"],[63,7,"MonkeyIsland112","picture"],[66,7,"ZakMcKraken89","picture"],[33,3,"KingsQuest52","picture"],[36,3,"KokotoniWilf70","picture"],[36,5,"WinterGames79","picture"],[66,5,"LeisureSuitLarry71","picture"],[63,5,"LastNinja110","picture"],[33,1,"Fred100","picture"],[36,1,"TimeTunnel60","picture"],[2,7,"BlueMax11","picture"],[29,3,"Silkworm200","picture"],[4,7,"UW27","picture"]]',
        lights: '[[84,1,"WallLamp","dim"],[15,7,"WallLamp","dim"],[58,3,"WallLamp","dim"],[41,5,"WallLamp","dim"]]',
        gates: '[[60,5,"8.1","7.2","Down"]]',
        keys: '[[14,4]]',
        monsters: '[[18,"SpiderGreen"],[21,"MissWhite"],[86,"MissGalaxyGreen"]]',
        potions: '[[44,0],[65,1]]',
        containers: '[[83,"Barrel","GOLD_ITEM_TYPE.GoldBar",1],[17,"Wardrobe","GOLD_ITEM_TYPE.GoldCube",7]]',
        shrines: '[[49,3,"AttackShrine"],[69,3,"DefenseShrine"],[96,1,"MagicShrine"]]',
        objects: '[[11,"RedGem"]]',
        }

};