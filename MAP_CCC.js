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
        name: "East Staircase up",
        sg: 0,
        data: '{"width":"8","height":"8","map":"BB3ABB2AA6BAA4BAA2BAA4BB15ABAA2BB5AA2BB7ABB4A$"}',
        wall: "Wall8",
        floor: "TinyBricks",
        ceil: "MossyWall",
        start: '[41,5]',
        decals: '[[11,7,"DM107","picture"],[1,7,"Hero60","picture"],[38,7,"CrawlMaster112","picture"],[51,1,"Galaga70","picture"],[61,1,"Scramble60","picture"],[25,1,"Sorcery31","picture"],[8,5,"AirWolf31","picture"],[30,3,"SVS1011","picture"]]',
        lights: '[[12,7,"WallLamp2","gray"],[33,5,"WallLamp2","gray"]]',
        gates: '[[40,5,"5.1","3.3","Open"],[5,7,"5.2","9.1","Up"]]',
        monsters: '[[27,"Spider"]]',
        potions: '[[19,1]]',
        containers: '[[10,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",7],[54,"Crate","GOLD_ITEM_TYPE.GoldBar",3]]',
    }
    ,
    6: {
        name: "A Hall",
        sg: 0,
        data: '{"width":"13","height":"13","map":"BB3AA3BABB3AA24BB2AA4BB2AA4BB2AA2BAA10BAA5BB2AA4BAA10BB2AA7BB9AA2BAA2BB8ABB9ABB4ABB2AA2BB2AA2BAA3BAA4BB19A$"}',
        wall: "MossyBricks1",
        floor: "Wall11",
        ceil: "Wall11",
        start: '[19,7]',
        decals: '[[148,1,"Skull2","crest"],[150,1,"Skull4","crest"],[17,7,"AticAtac204","picture"],[11,7,"SpaceQuest103","picture"],[1,7,"ForgottenForest1","picture"],[21,7,"Hero100","picture"],[58,7,"EyeOfTheBeholder90","picture"],[128,7,"KnightLore111","picture"],[118,7,"RiverRaid70","picture"],[147,1,"Jumpman70","picture"],[151,1,"Galaga71","picture"],[110,1,"Ishar80","picture"],[40,1,"BeachHead100","picture"],[50,1,"Grog1","picture"],[53,5,"MontyMole52","picture"],[105,5,"Morrowind140","picture"],[82,5,"DM106","picture"],[13,5,"Pitfall72","picture"],[26,5,"PharaohCurse112","picture"],[130,5,"SirFred4","picture"],[143,5,"MassEffect1","picture"],[22,5,"Witcher113","picture"],[152,5,"DonkeyKong99","picture"],[25,3,"BrianBloodaxe11","picture"],[38,3,"ZimSalaBim201","picture"],[63,3,"ManicMiner63","picture"],[115,3,"TempleOfApshai89","picture"],[142,3,"TheHobbit16","picture"],[155,3,"TheHobbit15","picture"],[86,3,"MonkeyIsland102","picture"],[2,7,"Goonies5","picture"],[10,7,"Paratroopers2","picture"],[157,1,"AticAtac111","picture"],[158,1,"HalfLife14","picture"],[166,1,"DM90","picture"],[167,1,"ForbiddenForest110","picture"],[82,1,"ForbiddenForest99","picture"],[86,1,"ForbiddenForest90","picture"],[58,3,"PharaohCurse140","picture"],[110,3,"SirFred88","picture"],[110,5,"Elite","picture"],[58,5,"BC103","picture"],[82,7,"Oblivion140","picture"],[86,7,"KQ100","picture"],[16,3,"BrianBloodaxe71","picture"],[146,3,"Valhalla88","picture"]]',
        lights: '[[58,1,"Lamp4","dim"],[110,7,"Lamp4","dim"],[82,3,"Lamp4","dim"],[86,5,"Lamp4","dim"]]',
        gates: '[[6,7,"6.1","3.4","Open"],[162,1,"6.2","13.1","Blue"],[78,5,"6.3","15.1","Closed"],[90,3,"6.4","19.1","Green"]]',
        monsters: '[[84,"MissGalaxyGold"],[140,"MissWhite"],[132,"MissGalaxy"],[36,"Bat"],[28,"MissWhite"]]',
        scrolls: '[[84,4]]',
        gold: '[[70,"GoldCube"],[72,"GoldCube"],[98,"GoldCube"],[96,"GoldCube"]]',
        containers: '[[144,"Barrel","GOLD_ITEM_TYPE.GoldBar",1],[154,"Barrel","GOLD_ITEM_TYPE.GoldBar",1],[14,"Barrel","GOLD_ITEM_TYPE.GoldBar",7],[24,"Barrel","GOLD_ITEM_TYPE.GoldBar",7]]',
    }
    ,
    7: {
        name: "West Tower",
        sg: 0,
        data: '{"width":"20","height":"20","map":"BB3AA8EAA5BB4AEÁÁ2AA32BAA8BB5AA2BB2AQBEBB2ABB2ÁÁ3AA2BÁABAA2BB2AA2BB2AA16BAA6EABAA4BAA2BAA8BAA9BAA7BAA8BAA2BAA12BB4AA2BABB3ABABB2ABB2ÁBB6AA2BAA2BABB4AA2EABB2ABB3ABABB7ABB3ABAA2BB10ABB2AA2BABB2ABB4EBB7ABB7ABB4ABB12EBB15$AA2BB10ABB2ABB12ABB6AA4BB3AA3ÁAA2ÁÁ22BÁÁ2AA2"}',
        wall: "SpideryWall2",
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
    8: {
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
    ,
    9: {
        name: "East Tower",
        sg: 0,
        data: '{"width":"13","height":"13","map":"BB3AA3BABAA8BB3AA5BABABB3AA5BAA20BAA6BB39AA3BABABABB3AA2BB2ABB4AA2BB10ABB9ABB6ABB13$A"}',
        wall: "BrownishWall",
        floor: "MarbleFloor5",
        ceil: "MossyCeiling",
        start: '[149,1]',
        decals: '[[32,4,"FlatPond","crest"],[68,4,"FlatPond2","crest"],[74,4,"FlatPond3","crest"],[110,4,"RoundGrille96","crest"],[58,1,"Reaper","crest"],[70,3,"DancingSkeletons2","crest"],[72,5,"PrayingSkeleton10","crest"],[5,7,"WOW104","picture"],[7,7,"WOW10","picture"],[28,7,"Fred110","picture"],[21,7,"Fred102","picture"],[148,1,"Arena200","picture"],[150,1,"Arena2","picture"],[138,1,"TombRaider113","picture"],[114,1,"LSL102","picture"],[106,1,"CastleOfTerror4","picture"],[120,1,"Sorcery88","picture"],[53,5,"AticAtac204","picture"],[79,5,"AticAtac203","picture"],[63,3,"SasbreWulf60","picture"],[89,3,"SabreWulf99","picture"],[36,7,"SP111","picture"],[17,7,"WhoDaresWins88","picture"],[40,5,"LadyTut102","picture"],[92,5,"JetSetWilly60","picture"],[106,5,"Sentinel2","picture"],[134,5,"CodenameIceman98","picture"],[102,3,"Witcher100","picture"],[126,3,"RobinHood3","picture"]]',
        lights: '[[16,7,"Lamp4","dim"],[36,3,"Lamp4","dim"],[126,1,"Lamp4","dim"],[120,5,"Lamp4","dim"]]',
        gates: '[[162,1,"9.1","5.2","Down"],[65,5,"9.2","10.1","Closed"],[77,3,"9.3","11.1","Closed"],[6,7,"9.4","12.1","Up"]]',
        monsters: '[[97,"RedGoldBat"],[66,"MissGalaxyGreen"],[75,"Spider"],[45,"SpiderGreen"]]',
        scrolls: '[[41,1],[101,3],[62,0]]',
        potions: '[[107,0],[49,1]]',
        skills: '[[24,"Sting"]]',
        containers: '[[35,"Barrel","GOLD_ITEM_TYPE.GoldBar",7],[29,"Barrel","GOLD_ITEM_TYPE.GoldBar",7],[121,"Crate","GOLD_ITEM_TYPE.SilverBar",1],[113,"Crate","GOLD_ITEM_TYPE.SilverBar",1],[44,"Chest","GOLD_ITEM_TYPE.SilverBar",1]]',
        triggers: '[[59,5,"PurpleTriggerButton",1,50],[85,5,"PurpleTriggerButton",1,37]]',
        entities: '[[84,7,"HedgeHog"]]',
    }
    ,
    10: {
        name: "Fruit Quest",
        sg: 0,
        data: '{"width":"13","height":"13","map":"BB3AA14BB16ABB2AA13BB4AA29BABB2AA2BB10AA12BAA3BB6ABB2AA5BÁABB5QABABABB18A$AA2BB6"}',
        wall: "DarkWall1",
        floor: "DarkMarble2",
        ceil: "BeautifullWall1",
        start: '[89,3]',
        decals: '[[26,5,"MrRobot60","picture"],[130,5,"Barbarian111","picture"],[30,5,"Portal132","picture"],[34,5,"LastNinja10","picture"],[87,5,"JSW113","picture"],[134,5,"TombRaider110","picture"],[138,5,"BrideOfFrankenstein","picture"],[142,3,"ImpossibleMsission112","picture"],[38,3,"Underwurlde100","picture"],[138,3,"Vixen70","picture"],[34,3,"JetSetWilly60","picture"],[134,3,"LadyTut10","picture"],[81,3,"SVS110","picture"],[84,3,"Scramble23","picture"],[55,1,"SabreWulf87","picture"],[57,1,"Paratroopers3","picture"],[63,1,"ManicMiner52","picture"],[114,1,"Elvira1","picture"],[109,1,"OlympicSkier","picture"],[107,1,"Valhalla2","picture"],[56,7,"TheHobbit16","picture"],[60,7,"TombRaider95","picture"],[63,7,"Imhotep2","picture"],[105,7,"LadyTut60","picture"],[111,7,"Nebulus90","picture"],[114,7,"ImpossibleMission140","picture"]]',
        lights: '[[10,7,"WallLamp","standard"],[6,7,"WallLamp","standard"],[2,7,"WallLamp","standard"],[158,1,"WallLamp","standard"],[162,1,"WallLamp","standard"],[166,1,"WallLamp","standard"],[78,5,"WallTorch","fire"],[81,5,"WallTorch","fire"],[84,5,"WallTorch","fire"]]',
        gates: '[[90,3,"10.1","9.2","Open"]]',
        monsters: '[[36,"SpiderGreen"],[144,"SpiderGreen"],[14,"MissGreen"],[154,"MissGreen"],[86,"Spider"],[80,"MissGalaxyGreen"]]',
        scrolls: '[[49,0],[122,12],[40,7]]',
        gold: '[[128,"GoldCube"],[152,"GoldCube"],[68,"GoldCube"],[99,"GoldCube"]]',
        skills: '[[32,"Shield"]]',
        containers: '[[22,"Barrel","GOLD_ITEM_TYPE.GoldBar",7],[118,"Barrel","GOLD_ITEM_TYPE.GoldBar",7],[150,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",1],[92,"Chest","GOLD_ITEM_TYPE.SilverBar",1],[66,"Chest","GOLD_ITEM_TYPE.GoldBar",5],[18,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",5],[16,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",3]]',
        triggers: '[[107,7,"MarbleTriggerButton",0,58]]',
        objects: '[[132,"Apple"]]',
        traps: '[[84,1,"MarbleTriggerButton",0,"Bounceball",19]]',
    }
    ,
    11: {
        name: "Fruit Quest Part II",
        sg: 0,
        data: '{"width":"13","height":"13","map":"BB2ÁÁ4BAA7BB2AA3BAA2BB4AA2BABAA4BAA10BB4ABB2AA3BB2ABB2ABAA2BAA4BB2ABB2ABB7AA3BABB3ABAA2BAA2BB2AA6BB4ABABB2EBB4AA2BB24ABB2A$ABB6ÁÁ8AA4"}',
        wall: "BrownishMarble",
        floor: "StoneBlockPavement",
        ceil: "BlurryMossy",
        start: '[79,5]',
        decals: '[[132,7,"Drelbs2","picture"],[108,7,"KingsQuest50","picture"],[123,7,"SpaceQuest10","picture"],[84,7,"Cauldron8","picture"],[138,7,"Gauntlet","picture"],[115,7,"Vixen51","picture"],[140,7,"Tombraider140","picture"],[88,7,"AticAtac131","picture"],[119,1,"RobinOfTheWood50","picture"],[157,1,"EyeOfTheBeholder100","picture"],[161,1,"PharaohCurse130","picture"],[163,1,"Pitfall72","picture"],[165,1,"DotHunter","picture"],[167,1,"LaraCroft123","picture"],[115,1,"DungeonMaster205","picture"],[117,5,"SVS111","picture"],[125,5,"SVS132","picture"],[110,5,"BackToFuture200","picture"],[94,3,"Ishar99","picture"],[125,3,"SabreWulf89","picture"],[114,3,"LSL_Eve2","picture"],[142,3,"Miner70","picture"],[135,4,"Grate1_128","crest"],[136,4,"Grate1_128","crest"],[137,4,"Grate1_128","crest"],[124,4,"Grate1_128","crest"],[111,4,"Grate1_128","crest"],[11,7,"CamelotWarriors","picture"],[1,7,"LeisureSuitLarry75","picture"],[26,5,"LeisureSuitLarry70","picture"],[68,1,"LeisureSuitLarry73","picture"],[75,1,"LSL100","picture"],[25,3,"AticAtac140","picture"],[64,3,"ForbiddenForest90","picture"]]',
        lights: '[[92,7,"WallLamp","dim"],[109,7,"WallLamp","dim"],[85,7,"WallLamp","dim"],[87,7,"WallLamp","dim"],[3,7,"WallLamp","dim"],[9,7,"WallLamp","dim"],[70,1,"WallTorch","fire"]]',
        gates: '[[78,5,"11.1","9.3","Open"]]',
        monsters: '[[46,"MissGalaxy"],[28,"MissWhite"],[41,"MissWhite"],[146,"Spider"],[151,"SpiderGreen"]]',
        scrolls: '[[144,9],[152,6]]',
        potions: '[[128,1],[22,1],[61,0]]',
        gold: '[[33,"SilverBar"]]',
        skills: '[[82,"Shield"]]',
        containers: '[[14,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",5],[53,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",5],[121,"Barrel","GOLD_ITEM_TYPE.SilverBar",5]]',
        doors: '[89]',
        triggers: '[[66,1,"MarbleTriggerButton",1,67],[109,1,"MarbleTriggerButton",1,95],[38,3,"MarbleTriggerButton",0,32],[8,7,"MarbleTriggerButton",0,31],[72,1,"MarbleTriggerButton",0,30],[74,1,"MarbleTriggerButton",2,76]]',
        objects: '[[40,"Pear"]]',
        traps: '[[7,7,"MarbleTriggerButton",1,"MissGreen",63],[51,3,"MarbleTriggerButton",1,"SpiderGreen",24],[73,1,"MarbleTriggerButton",0,"Bounceball",21]]',
    }
    ,
    12: {
        name: "East Spire",
        sg: 0,
        data: '{"width":"15","height":"15","map":"BB2AA4EAA3BAA2BAA2BAA2BB3ABAA3BB2ABB3ABAA4BABAA7BAA3BAA4BB2AA3BB2ABAA2BAA5BB2ABAA5BAA2BAA2BAA4BAA3BAA4BAA3BB10ABB8AA5BB2ABABB3AA2BB2AA2BB2AA2BABAA3BAA2BABB2ABB4ABB2ABAA2BEABABB8QBB2ABB8ABB13A$AA2BB5ABB2"}',
        wall: "Wall12",
        floor: "ScarletTIles3",
        ceil: "TiledFloor",
        start: '[208,1]',
        decals: '[[130,7,"AirWolf200","picture"],[1,7,"SexOlympics2","picture"],[3,7,"Belwothe","picture"],[7,7,"AlienKong","picture"],[10,7,"Hero52","picture"],[12,7,"Gods99","picture"],[71,7,"TombRaider103","picture"],[65,7,"TombRaider102","picture"],[63,7,"TombRaider105","picture"],[178,7,"TombRaider106","picture"],[168,7,"WhoDaresWins1","picture"],[108,7,"SkyrimElf","picture"],[221,1,"DungeonMaster96","picture"],[218,1,"LeisureSuitLarry71","picture"],[215,1,"BrianBloodaxe71","picture"],[201,1,"MonkeyIsland111","picture"],[199,1,"AmberStar202","picture"],[212,1,"Captive199","picture"],[139,1,"Nebulus50","picture"],[108,1,"BattleChopper","picture"],[61,1,"Tombraider140","picture"],[63,1,"Drelbs3","picture"],[66,1,"LastNinja110","picture"],[53,1,"Spelunker70","picture"],[71,1,"Miner3","picture"],[58,1,"GatewayToApshai140","picture"],[82,1,"EveryoneIsAWally2","picture"],[98,1,"Arnie201","picture"],[100,1,"SasbreWulf60","picture"],[102,1,"MonkeyIsland101","picture"],[131,1,"DM105","picture"],[168,1,"BrianBloodaxe20","picture"],[103,7,"Pitstop200","picture"],[99,7,"SabreWulf50","picture"],[53,7,"HalfLife13","picture"],[30,5,"Uridium2","picture"],[172,5,"AticAtac115","picture"],[121,5,"CastleWolfenstein21","picture"],[151,5,"Witcher111","picture"],[143,5,"SVS132","picture"],[177,3,"DefenderOfTheCrown100","picture"],[74,3,"Ski64","picture"],[71,3,"Wadca","picture"],[53,3,"TimeTunnel70","picture"],[97,3,"Oblivion140","picture"],[111,3,"Fred21","picture"],[142,3,"Pirates200","picture"],[171,3,"Zaxxon3","picture"],[134,3,"Ultima70","picture"],[178,1,"Yennefer","picture"],[53,5,"DonkeyKong100","picture"],[71,5,"ManicMiner11","picture"],[108,5,"Underwurlde100","picture"],[139,5,"RobinHood3","picture"],[168,5,"Zak50","picture"],[108,3,"RickDangerous11","picture"],[139,3,"Shamus60","picture"],[168,3,"Barbarian110","picture"]]',
        lights: '[[79,7,"WallLamp3","dimRed"],[139,7,"WallLamp3","dimRed"],[143,7,"WallLamp3","dimRed"],[146,7,"WallLamp3","dimRed"],[106,5,"WallLamp3","dimRed"],[166,5,"WallLamp3","dimRed"],[2,7,"WallTorch","fire"],[24,7,"WallLamp","standard"]]',
        gates: '[[223,1,"12.1","9.4","Down"]]',
        keys: '[[163,2],[28,4]]',
        monsters: '[[93,"SpiderGreen"],[186,"SpiderGreen"],[167,"MissGalaxy"],[16,"MissGalaxy"],[37,"MissWhite"],[27,"MissGalaxy"],[144,"RedGoldBat"],[41,"MissGalaxyGold"]]',
        scrolls: '[[133,0],[141,12],[189,10],[123,11]]',
        potions: '[[25,0],[200,1],[83,1]]',
        containers: '[[21,"TreasureChest","GOLD_ITEM_TYPE.SilverBar",7],[18,"Barrel","GOLD_ITEM_TYPE.SilverBar",7],[96,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",7],[43,"Barrel","GOLD_ITEM_TYPE.SilverBar",3],[88,"Crate","GOLD_ITEM_TYPE.GoldCube",3],[197,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",1],[203,"Barrel","GOLD_ITEM_TYPE.SilverBar",5]]',
        shrines: '[[90,5,"AttackShrine"],[135,5,"DefenseShrine"],[180,5,"MagicShrine"]]',
        doors: '[129,35]',
        triggers: '[[133,4,"MarbleTriggerButton",1,148],[47,4,"MarbleTriggerButton",1,62]]',
        objects: '[[32,"BlueGem"]]',
    }
    ,
    13: {
        name: "Strange Corridor",
        sg: 0,
        data: '{"width":"11","height":"11","map":"BB2AA7BB3ABB22AA2BB4ABB5ABB9AA2BAA2BB13ABB28ABB2AA2BB3AA2BB3$BB3A"}',
        wall: "Wall8",
        floor: "MarbleTiles4",
        ceil: "ThatchFloor",
        start: '[16,7]',
        decals: '[[22,5,"ManicMiner11","picture"],[59,5,"LeisureSuitLarry74","picture"],[92,5,"LadyTut102","picture"],[72,3,"Pipeline50","picture"],[94,3,"AlleyKat","picture"],[32,3,"Ishar15","picture"],[35,1,"Sorcery70","picture"],[39,1,"1942_201","picture"],[41,1,"RickDangerous11","picture"],[94,1,"Fred102","picture"],[39,7,"Wolf10","picture"]]',
        lights: '[[14,7,"WallLamp3","dimRed"],[18,7,"WallLamp3","dimRed"]]',
        gates: '[[5,7,"13.1","6.2","Open"],[115,1,"13.2","14.1","Down"]]',
        monsters: '[[71,"Viking"],[93,"MissGalaxyGold"],[38,"RedGoldBat"]]',
        gold: '[[83,"SilverBar"]]',
        containers: '[[48,"TreasureChest","GOLD_ITEM_TYPE.SilverBar",5],[81,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",5],[50,"Barrel","GOLD_ITEM_TYPE.SilverBar",3]]',
        triggers: '[[45,1,"MarbleTriggerButton",1,49],[53,1,"MarbleTriggerButton",1,82]]',
        traps: '[[1,7,"MarbleTriggerButton",1,"MissGreen",27],[9,7,"MarbleTriggerButton",1,"MissGalaxyGreen",42]]',
    }
    ,
    14: {
        name: "Dark Cave",
        sg: 0,
        data: '{"width":"11","height":"11","map":"BB4AA11BAA5BB3ABB2AA3BAA3BAA2BAA4BABB2AA3BB2AA5BB2AA4BB5ABB2AA2BABB2AA2BB3ABAA3BB2AA2ÁAA3BB6ABABB14A$ABB2"}',
        wall: "MossyWallExcellent",
        floor: "StoneBlockPavement",
        ceil: "BeautifullWall1",
        start: '[16,7]',
        decals: '[[7,7,"F1-1","picture"],[9,7,"Pitfall89","picture"],[47,7,"Witcher101","picture"],[51,7,"DungeonMaster70","picture"],[80,7,"AMC3","picture"],[84,7,"BladeRunner","picture"],[115,1,"Pitfall100","picture"],[117,1,"Pitfall2-100","picture"],[119,1,"Pitfall23","picture"],[113,1,"Pitfall27","picture"],[111,1,"Pitfall50","picture"],[67,1,"AticAtac117","picture"],[75,1,"LeisureSuitLarry91","picture"],[80,1,"KQ102","picture"],[84,1,"DragonSkulle110","picture"],[22,5,"DefenderOfTheCrown110","picture"],[44,5,"CodenameIceman2","picture"],[88,5,"SirFred60","picture"],[47,5,"Killerwat60","picture"],[32,3,"KingsQuest51","picture"],[54,3,"AntAttack200","picture"],[98,3,"BeyondForbiddenForest110","picture"],[82,1,"Pacman200","picture"],[51,3,"SVS110","picture"],[60,4,"FlatPond3","crest"],[58,4,"FlatPond3","crest"],[37,7,"Skull11","crest"],[39,7,"PrayingSkeleton10","crest"],[80,5,"Crack3","crest"],[84,3,"Crack4","crest"]]',
        lights: '[[82,7,"WallLamp","dim"],[67,7,"WallTorch","dimRed"],[75,7,"WallTorch","dimRed"]]',
        gates: '[[5,7,"14.1","13.2","Up"]]',
        monsters: '[[71,"MissWhite"],[93,"Viking"],[19,"MissGalaxyGold"]]',
        potions: '[[78,0],[86,1]]',
        containers: '[[19,"Wardrobe","INTERACTION_ITEM.Pearl",7],[12,"Crate","GOLD_ITEM_TYPE.SilverBar",5],[100,"Crate","GOLD_ITEM_TYPE.SilverBar",5],[108,"Chest","GOLD_ITEM_TYPE.GoldBar",3]]',
        triggers: '[[26,5,"RockTriggerButton",0,38]]',
        entities: '[[2,7,"DemonGirl"]]',
        objects: '[[104,"GreenGem"]]',
    }
    ,
    15: {
        name: "Pathways",
        sg: 0,
        data: '{"width":"16","height":"16","map":"BB2AA6BB3ABB2ABB8AEBB7ABAA6BAA15BABB2AA3BABB2AA2BAA2BABABAA3BAA2BB2AA2BB8ABAA3BABABB4ABB2AA2BB4AA4BB4AA3BABABB4AA2BAA4BB2ABB2AA2BABAA2BB13ABEBB4AA2BB2EABB2AA2BB2ABEAA3BAA3BB5ABB8AA2BABB5AA2BB18AB$AA2BB7AA2BB3"}',
        wall: "TinyBricks",
        floor: "ScarletFloor1",
        ceil: "BlurryScarlet",
        start: '[46,3]',
        decals: '[[59,5,"MonkeyIsland112","picture"],[71,5,"Portal131","picture"],[73,5,"WinterGames11","picture"],[122,5,"CyberPunk200","picture"],[152,5,"BoogaBoo90","picture"],[134,5,"TombRaider107","picture"],[164,5,"Ishar71","picture"],[84,5,"WizardOfWor89","picture"],[37,5,"CrawlMaster132","picture"],[130,5,"Sorcery88","picture"],[160,5,"Oblivion141","picture"],[80,5,"Portal130","picture"],[17,5,"Daggerfall4","picture"],[49,5,"MassEffect2","picture"],[193,5,"Oblivion140","picture"],[225,5,"Paratroopers3","picture"],[203,5,"Commando201","picture"],[235,5,"AmberStar203","picture"],[140,5,"CyberPunk201","picture"],[92,5,"RMC50","picture"],[172,5,"MontyMole111","picture"],[31,3,"Jumpman3","picture"],[63,3,"HeavyOnTheMagick60","picture"],[91,3,"Barbarian100","picture"],[105,3,"Pitfall89","picture"],[156,3,"SuperDogfight3","picture"],[108,3,"LeisureSuitLarry200","picture"],[138,3,"Ishar99","picture"],[168,3,"HeroQuest50","picture"],[71,3,"Triss","picture"],[134,3,"SpaceQuest10","picture"],[187,3,"Witcher101","picture"],[116,3,"Ishar15","picture"],[84,3,"TombRaider102","picture"],[37,3,"MonkeyIsland101","picture"],[98,3,"SpaceQuest103","picture"],[164,3,"HeadOverHeels3","picture"],[197,3,"TimeTunnel60","picture"],[207,3,"SammyLightfoot2","picture"],[146,3,"Cuthbert20","picture"],[14,7,"Unknown3","picture"],[2,7,"HunchBack70","picture"],[58,7,"Popeye2","picture"],[73,7,"Fred112","picture"],[120,7,"Soccer3","picture"],[69,7,"Morrowind140","picture"],[66,7,"Ski64","picture"],[198,7,"Prince51","picture"],[200,7,"Skullkeep","picture"],[202,7,"Vixen50","picture"],[150,7,"LSL31","picture"],[58,1,"AticAtac116","picture"],[233,1,"LastNinja10","picture"],[200,1,"OilWell50","picture"],[231,1,"OlympicSkier","picture"],[170,1,"JupiterLander70","picture"],[178,1,"DM104","picture"],[253,1,"DungeonMaster96","picture"],[243,1,"RobinToTheRescue1","picture"]]',
        lights: '[[12,7,"WallLamp2","dim"],[24,7,"WallLamp2","dim"],[4,7,"WallLamp2","dim"],[244,1,"WallLamp2","dim"],[254,1,"WallLamp2","dim"],[105,1,"WallLamp2","dim"],[182,5,"WallLamp2","dim"],[112,5,"WallLamp2","dim"],[6,7,"WallLamp2","dim"]]',
        gates: '[[47,3,"15.1","6.3","Open"],[10,7,"15.2","16.1","Closed"],[32,5,"15.3","17.1","Down"],[208,5,"15.4","18.1","Down"]]',
        monsters: '[[106,"MissGalaxyGold"],[113,"MissGalaxyGold"],[185,"Viking"],[38,"Viking"],[35,"RedGoldBat"],[211,"RedGoldBat"],[221,"Viking"],[133,"SpiderGreen"]]',
        potions: '[[104,0],[93,0]]',
        gold: '[[196,"GoldBar"]]',
        skills: '[[22,"Heart"],[186,"Mana"]]',
        containers: '[[19,"Barrel","GOLD_ITEM_TYPE.GoldBar",7],[74,"Barrel","GOLD_ITEM_TYPE.GoldBar",7],[226,"Crate","GOLD_ITEM_TYPE.SilverBar",1],[236,"Crate","GOLD_ITEM_TYPE.SilverBar",1]]',
        doors: '[43,56,67,179]',
        triggers: '[[141,4,"RockTriggerButton",1,77],[216,4,"RockTriggerButton",1,219]]',
    }
    ,
    16: {
        name: "A Chapel",
        sg: 0,
        data: '{"width":"11","height":"11","map":"BB6AA30BB3AA6BAA3BAA2BAA2BABB13AA2BABB10AA7BAA4BB3ABAA2BB16AB$"}',
        wall: "RockWall100",
        floor: "BrokenTiles3",
        ceil: "RockCeiling",
        start: '[104,1]',
        decals: '[[57,7,"MontyMole111","picture"],[63,7,"DM104","picture"],[111,1,"Hero81","picture"],[119,1,"LeisureSuitLarry75","picture"],[91,1,"Apshai10","picture"],[95,1,"Arena200","picture"],[33,5,"LaraCroft1","picture"],[55,5,"ESB","picture"],[77,5,"AticAtac113","picture"],[43,3,"CamelotWarriors","picture"],[65,3,"Infiltrator71","picture"],[87,3,"TombRaider109","picture"],[63,3,"SpectrumGame1","picture"],[57,5,"CrawlMaster131","picture"],[57,3,"TheHobbit15","picture"],[60,3,"Shamus91","picture"],[63,5,"ManicMiner14","picture"],[60,5,"TempleOfApshai70","picture"],[57,1,"WhoDaresWins50","picture"],[63,1,"FranticFreddie3","picture"]]',
        lights: '[[60,1,"WallLamp","standard"],[60,7,"WallTorch","dimRed"]]',
        gates: '[[115,1,"16.1","15.2","Open"]]',
        monsters: '[[45,"Bat"],[53,"Bat"],[27,"RedGoldBat"],[49,"RedGoldBat"]]',
        scrolls: '[[46,3]]',
        potions: '[[100,0],[108,1]]',
        containers: '[[23,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",7],[31,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",7]]',
        shrines: '[[2,7,"AttackShrine"],[5,7,"DefenseShrine"],[8,7,"MagicShrine"]]',
    }
    ,
    17: {
        name: "Pretty Bunnys",
        sg: 0,
        data: '{"width":"16","height":"16","map":"BB3EAA2BAA2BB2ABAA2BB2ABB5AA6BABAA14ÁAA11BABÁBB2AA5BAA7BAA12ÁAA3ÁAA2BB4AÁAA8EBB12AA4BB5ABB13ABB7ABAA2BABB2ABB2AA3BB2AA3BB8EBABB2ABB5QBB3ABB6EABB17$AA2BB2AA2BB3AA4BB3ÁAA2ÁÁ5AÁÁ6BB2"}',
        wall: "MossWall14",
        floor: "DarkMarble3",
        ceil: "MossyWall",
        start: '[46,3]',
        decals: '[[208,5,"DungeonDoor_Blocked","crest"],[67,7,"SP111","picture"],[1,7,"SP4","picture"],[5,7,"SP60","picture"],[97,1,"SP62","picture"],[101,1,"SP63","picture"],[67,1,"SP64","picture"],[16,5,"SP65","picture"],[80,5,"SP66","picture"],[22,5,"SP67","picture"],[22,3,"SP68","picture"],[67,3,"Sp61","picture"],[86,3,"SP69","picture"],[54,3,"SP70","picture"],[67,5,"SP71","picture"],[86,5,"ImpossibleMsission111","picture"],[110,3,"Frogger111","picture"],[62,3,"LodeRunner10","picture"],[30,3,"Uridium2","picture"],[11,7,"JetSetWilly60","picture"],[123,1,"SirFred62","picture"],[97,7,"Paperboy2","picture"],[101,7,"TurboEsprit200","picture"],[139,7,"Pitfall71","picture"],[141,7,"Portal130","picture"],[187,7,"Goonies88","picture"],[184,7,"LadyTut10","picture"],[199,7,"EyeOfTheBeholder90","picture"],[178,7,"RobinOfTheWood4","picture"],[195,7,"Prince50","picture"],[221,7,"AticAtac203","picture"],[218,7,"Blackwyche2","picture"],[177,1,"LeisureSuitLarry94","picture"],[196,1,"MonkeyIsland101","picture"],[179,1,"Pitfall73","picture"],[168,1,"Blackwyche110","picture"],[172,1,"FireAnt60","picture"],[220,1,"BladeRunner7","picture"],[217,1,"Pooyan3","picture"],[248,1,"MontyMole100","picture"],[242,1,"ImpossibleMission90","picture"],[244,1,"ZakMcKraken89","picture"],[246,1,"AticAtacCrest1","crest"],[251,1,"LeisureSuitLarry90","picture"],[128,5,"Hero51","picture"],[135,5,"Cavelon13","picture"],[188,5,"Kangaroo60","picture"],[233,5,"ImpossibleMsission112","picture"],[134,3,"SexOlympics2","picture"],[166,3,"Invasion","picture"],[171,3,"AztecChallenge112","picture"],[217,3,"Hero71","picture"]]',
        lights: '[[9,7,"WallLamp","standard"],[48,5,"WallLamp","standard"],[99,7,"WallLamp","standard"],[137,7,"WallLamp","standard"],[197,7,"WallLamp","standard"]]',
        gates: '[[47,3,"17.1","15.3","Up"],[253,1,"17.2","18.2","Closed"]]',
        monsters: '[[24,"GhostMinion"],[26,"GhostMinion"],[66,"MissGalaxyGold"],[148,"Viking"],[209,"MissGalaxyGold"],[189,"MissGalaxyGold"],[235,"MissGalaxyGold"]]',
        scrolls: '[[43,12],[180,2],[194,6],[68,4],[228,11]]',
        potions: '[[37,1],[117,1]]',
        gold: '[[156,"GoldCube"],[173,"GoldCube"],[204,"GoldCube"],[185,"GoldCube"],[130,"GoldCube"],[81,"GoldCube"]]',
        skills: '[[23,"Sting"],[25,"Shield"],[27,"Magic"]]',
        containers: '[[17,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",7],[161,"Barrel","GOLD_ITEM_TYPE.GoldBar",1],[231,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",1]]',
        doors: '[70,98,150,120]',
        triggers: '[[13,7,"RockTriggerButton",0,74],[105,5,"RockTriggerButton",0,72],[78,3,"RockTriggerButton",0,73],[119,1,"RockTriggerButton",0,87],[197,1,"RockTriggerButton",0,55]]',
        entities: '[[3,7,"PrettyBunny"]]',
        traps: '[[75,4,"RockTriggerButton",0,"Fireball",77]]',
    }
    ,
    18: {
        name: "Squirells",
        sg: 0,
        data: '{"width":"19","height":"19","map":"BÁAA2ÁÁ2BB6EBB3EÁÁ2BB2ABAA22BB2AA5BAÁÁ5AA6ÁÁ5AA9ÁAA23ÁAA2ÁAA5ÁÁ4BAA23BAÁAÁBB12ABB4ABB2AA2BB2ÁABAÁÁ2ABB12ABB2AÁÁ2BB15ÁBB34ÁAB$ABEAA2ÁÁ2AA2BABABB3ABAA4BB2AA2BAA9ÁÁ4BB2AEBAÁAÁÁ2BB3ÁBÁABÁÁ7AÁÁ5BB2ÁÁ2AA2ÁÁ5AÁÁ9BÁBB2ÁÁ6AÁÁ7BÁÁ2A"}',
        wall: "MossWall16",
        floor: "MarbleFloor1",
        ceil: "MossyWall3",
        start: '[21,7]',
        decals: '[[22,7,"RobinOfTheWood50","picture"],[6,7,"Fred113","picture"],[8,7,"AticAtac131","picture"],[13,7,"LadyTut60","picture"],[55,7,"Infiltrator60","picture"],[248,7,"TimeTunnel50","picture"],[250,7,"ScubaDive60","picture"],[235,7,"Ghostbusters201","picture"],[239,7,"HalfLife11","picture"],[241,7,"BrianBloodaxe11","picture"],[250,1,"Triss","picture"],[252,1,"Goonies90","picture"],[236,1,"F2","picture"],[241,1,"WinterGames11","picture"],[239,1,"AztecChallenge110","picture"],[327,1,"KQ102","picture"],[355,1,"FireAnt21","picture"],[206,1,"Barbarian131","picture"],[349,1,"Pyjamarama50","picture"],[353,1,"Miranda1","picture"],[209,5,"Trashman2","picture"],[42,5,"GIJoe71","picture"],[45,5,"Hero51","picture"],[70,5,"KQ101","picture"],[285,5,"HalfLife72","picture"],[272,5,"Cuthbert90","picture"],[310,5,"LSL102","picture"],[278,5,"Serpentine50","picture"],[316,5,"MonkeyIsland141","picture"],[96,1,"Skull11","crest"],[70,3,"Gods70","picture"],[94,3,"ManicMiner14","picture"],[132,3,"SasbreWulf60","picture"],[80,3,"ManicMiner52","picture"],[80,5,"WOW10","picture"],[278,3,"LastNinja140","picture"],[316,3,"EveryoneIsAWally70","picture"],[281,3,"TheHobbit89","picture"],[319,3,"TombRaider103","picture"]]',
        lights: '[[57,5,"WallTorch","dimRed"],[243,7,"WallTorch","dimRed"],[237,7,"WallLamp","standard"],[45,7,"WallLamp3","dim"],[70,7,"WallLamp3","dim"],[325,1,"WallLamp","standard"],[171,5,"Lamp4","dim"],[189,3,"Lamp4","dim"]]',
        gates: '[[2,7,"18.2","17.2","Open"],[301,3,"18.1","15.4","Up"]]',
        keys: '[[334,3]]',
        monsters: '[[179,"GhostMinion"],[184,"GhostMinion"],[51,"MissGalaxyGold"],[46,"MissGalaxyGold"],[192,"MissGalaxyGold"],[287,"Viking"],[275,"Viking"]]',
        scrolls: '[[83,0],[221,5]]',
        gold: '[[213,"GoldCube"],[112,"GoldCube"],[101,"GoldCube"],[330,"GoldBar"],[147,"SilverBar"]]',
        skills: '[[270,"Heart"],[258,"Mana"]]',
        containers: '[[79,"Barrel","GOLD_ITEM_TYPE.GoldBar",1],[305,"Barrel","GOLD_ITEM_TYPE.GoldBar",1],[255,"Wardrobe","GOLD_ITEM_TYPE.GoldBar",7],[140,"Crate","GOLD_ITEM_TYPE.SilverBar",null],[163,"Crate","GOLD_ITEM_TYPE.SilverBar",null]]',
        doors: '[61,97,297,291]',
        triggers: '[[45,3,"MarbleTriggerButton",0,135],[190,5,"MarbleTriggerButton",0,67],[70,1,"MarbleTriggerButton",0,200],[243,1,"MarbleTriggerButton",0,196],[160,4,"MarbleTriggerButton",1,249],[294,4,"MarbleTriggerButton",0,298]]',
        entities: '[[351,1,"Squirell"]]',
    }
    ,
    19 : {
        name: "Green Room",
        sg: 0,
        data: '{"width":"16","height":"16","map":"BB3ABB10AA132BB27ABB13AA10BB58A$"}',
        wall: "MossyBricks1",
        floor: "RedBrickFloor1",
        ceil: "DungeonFloor",
        start: '[49,5]',
        gates: '[[48,5,"19.1","6.4","Open"]]',
        }
};