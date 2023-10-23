/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";
console.log("%cMAP for CCC loaded.", "color: #888");

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
    2 : {
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
        containers: '[[84,"Wardrobe","INTERACTION_ITEM.Fly",7],[132,"TreasureChest","GOLD_ITEM_TYPE.GoldBar",1]]',
        doors: '[92,49,187,197]',
        }
};