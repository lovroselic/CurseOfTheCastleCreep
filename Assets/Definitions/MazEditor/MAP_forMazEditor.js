/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** Decals */
const DECAL_PAINTINGS = [
    "1942_200", "1942_201", "1943_200", "AA100", "AMC2", "AMC3", "ActecChallenge2", "AirWolf200", "AirWolf201", "AirWolf31", "AlienKong", "AlleyKat", "AmberMoon200", "AmberStar200", "AmberStar201", "AmberStar202", "AmberStar203", "Amiga", "AntAttack2",
    "AntAttack200", "AntAttack4", "AppleLisa", "Apshai10", "ArabianNights1", "Arena2", "Arena200", "Arena201", "Arnie200", "Arnie201", "Arnie202", "ArticShipwreck2", "ArticShipwreck7", "AtariFalcon", "AtariST", "Athanor200", "Athanor201", "AticAtac110",
    "AticAtac111", "AticAtac112", "AticAtac113", "AticAtac114", "AticAtac115", "AticAtac116", "AticAtac117", "AticAtac130", "AticAtac131", "AticAtac140", "AticAtac200", "AticAtac201", "AticAtac202", "AticAtac203", "AticAtac204", "AticAtac205",
    "AticAtac206", "AztecChallenge100", "AztecChallenge101", "AztecChallenge110", "AztecChallenge111", "AztecChallenge112", "AztecChallenge130", "BC10", "BC103", "BC11", "BC90", "BackToFuture200", "BackToFuture201", "BackToNature1", "Bagitman11",
    "Bagitman90", "Barbarian100", "Barbarian110", "Barbarian111", "Barbarian112", "Barbarian13", "Barbarian130", "Barbarian131", "Barbarian3", "BattleChopper", "BattleThroughTime2", "BeachHead100", "BeachHeadReplace", "Belwothe",
    "BeyondForbiddenForest110", "BeyondForbiddenForest111", "BeyondForbiddenForest2", "Biggles2", "Blackwyche110", "Blackwyche2", "BladeRunner", "BladeRunner7", "BlueMax11", "BlueMax20", "BoogaBoo11", "BoogaBoo4", "BoogaBoo41", "BoogaBoo90",
    "Breakout200", "BrianBloodaxe11", "BrianBloodaxe20", "BrianBloodaxe70", "BrianBloodaxe71", "BrideOfFrankenstein", "BrideOfFrankenstein200", "BruceLee200", "C64", "C64_hard", "CBM_VIC20", "CCC1", "CamelotWarriors", "Captive199", "Captive200",
    "Captive201", "CastleHaunt", "CastleHaunt200", "CastleOFTerror11", "CastleOfTerror3", "CastleOfTerror4", "CastleOfTerror91", "CastleWolfenstein21", "Cauldron10", "Cauldron8", "Cavelon11", "Cavelon13", "Cavelon4", "Choplifter11", "Choplifter12",
    "ChuckieEgg1", "ChuckieEgg2", "CodenameIceman2", "CodenameIceman3", "CodenameIceman98", "Commando200", "Commando201", "CongoBongo2", "CrawlMaster110", "CrawlMaster111", "CrawlMaster112", "CrawlMaster113", "CrawlMaster114", "CrawlMaster115",
    "CrawlMaster130", "CrawlMaster131", "CrawlMaster132", "CrawlMaster133", "CrawlMaster2", "CrystalCastles2", "CrystalCastles200", "CrystalCastles90", "CrystalsOfZong10", "Cuthbert20", "Cuthbert70", "Cuthbert90", "CyberPunk200", "CyberPunk201",
    "DM100", "DM103", "DM104", "DM105", "DM106", "DM107", "DM90", "Daggerfall3", "Daggerfall4", "Decathlon200", "Defender110", "DefenderOfTheCrown", "DefenderOfTheCrown100", "DefenderOfTheCrown110", "DigDug2", "DonkeyKong100", "DonkeyKong200",
    "DonkeyKong99", "DotHunter", "DragonSkulle110", "Drelbs2", "Drelbs3", "DungeonMaster100", "DungeonMaster200", "DungeonMaster201", "DungeonMaster202", "DungeonMaster203", "DungeonMaster204", "DungeonMaster205", "DungeonMaster206",
    "DungeonMaster70", "DungeonMaster91", "DungeonMaster92", "DungeonMaster96", "DungeonMaster97", "DynaBlaster60", "EOB11", "ESB", "Elite", "Elite201", "ElvenWarrior1", "Elvira1", "Elvira2", "Elvira3", "EnigmaForce2", "EricTheViking10",
    "EveryoneIsAWally2", "EveryoneIsAWally70", "EveryoneIsAWally71", "EyeOfTheBeholder100", "EyeOfTheBeholder101", "EyeOfTheBeholder110", "EyeOfTheBeholder111", "EyeOfTheBeholder112", "EyeOfTheBeholder130", "EyeOfTheBeholder140",
    "EyeOfTheBeholder70", "EyeOfTheBeholder90", "F1-1", "F2", "F50", "FF100", "FF101", "FF5", "FalconPatrol7", "FalconPatrol70", "FalconPatrol71", "FalconPatrol72", "FalconPatrol8", "FalconPatrol9", "FalconPatrol99", "FireAnt2", "FireAnt21",
    "FireAnt60", "FireAnt70", "ForbiddenForest110", "ForbiddenForest90", "ForbiddenForest91", "ForbiddenForest99", "ForgottenForest1", "FortApocalypse", "FortApocalypse41", "FranticFreddie3", "Fred100", "Fred101", "Fred102", "Fred110", "Fred111",
    "Fred112", "Fred113", "Fred130", "Fred21", "Friday70", "Frogger110", "Frogger111", "Frogger112", "Frogger2", "GIJoe70", "GIJoe71", "GI_Joe2", "Galaga70", "Galaga71", "Galaxians10", "GatewayToApshai11", "GatewayToApshai110",
    "GatewayToApshai130", "GatewayToApshai140", "Gauntlet", "Geos", "Ghostbusters200", "Ghostbusters201", "Gods2", "Gods60", "Gods70", "Gods99", "GoldenAxe2", "Goonies5", "Goonies70", "Goonies88", "Goonies90", "Grog1", "HalfLife 89",
    "HalfLife11", "HalfLife12", "HalfLife13", "HalfLife14", "HalfLife50", "HalfLife60", "HalfLife70", "HalfLife71", "HalfLife72", "HalfLife88", "HalfLife91", "HeadOverHeels3", "HeavyOnTheMagick60", "Hero100", "Hero103", "Hero104", "Hero50",
    "Hero51", "Hero52", "Hero60", "Hero70", "Hero71", "Hero72", "Hero80", "Hero81", "Hero82", "HeroQuest50", "HeroesOfKarn80", "Hobbit101", "HoraceSki2", "HunchBack10", "HunchBack70", "HunchBack71", "HungryHorace11", "HungryHorace12",
    "IK2", "IK200", "IM13", "Iceman70", "Imhotep2", "Imhotep60", "ImpossibleMission11", "ImpossibleMission130", "ImpossibleMission140", "ImpossibleMission90", "ImpossibleMsission110", "ImpossibleMsission111", "ImpossibleMsission112",
    "ImpossibleMsission113", "Infiltrator60", "Infiltrator70", "Infiltrator71", "Invaders2", "Invasion", "Ishar11", "Ishar13", "Ishar14", "Ishar15", "Ishar70", "Ishar71", "Ishar72", "Ishar80", "Ishar98", "Ishar99", "JSW10", "JSW110",
    "JSW111", "JSW112", "JSW113", "Jawbreaker", "JetPac50", "JetPac70", "JetSetWilly11", "JetSetWilly60", "JetSetWilly88", "JetSetWilly89", "Jetpac3", "Jumpman3", "Jumpman70", "JungleHunt12", "JungleHunt2", "JungleHunt50", "JungleHunt89",
    "JungleStory60", "JupiterLander70", "JupiterLander99", "KL10", "KL102", "KQ100", "KQ101", "KQ102", "Kangaroo50", "Kangaroo60", "Karateka200", "Karn1", "Killerwat50", "Killerwat51", "Killerwat60", "KingsQuest50", "KingsQuest51",
    "KingsQuest52", "KingsQuest53", "KingsQuest60", "KnightLore110", "KnightLore111", "KnightLore31", "KokotoniWilf2", "KokotoniWilf60", "KokotoniWilf70", "LCP", "LSL100", "LSL101", "LSL102", "LSL103", "LSL31", "LSL_Eve2", "LadyTut10",
    "LadyTut102", "LadyTut60", "LaraCroft1", "LaraCroft102", "LaraCroft123", "LaraCroft2", "LaraCroft21", "LastNinja10", "LastNinja110", "LastNinja111", "LastNinja130", "LastNinja131", "LastNinja140", "LeisureSuitLarry200",
    "LeisureSuitLarry201", "LeisureSuitLarry50", "LeisureSuitLarry60", "LeisureSuitLarry61", "LeisureSuitLarry70", "LeisureSuitLarry71", "LeisureSuitLarry72", "LeisureSuitLarry73", "LeisureSuitLarry74", "LeisureSuitLarry75",
    "LeisureSuitLarry76", "LeisureSuitLarry77", "LeisureSuitLarry88", "LeisureSuitLarry89", "LeisureSuitLarry90", "LeisureSuitLarry91", "LeisureSuitLarry93", "LeisureSuitLarry94", "LodeRunner10", "LodeRunner11", "ManiacMansion11",
    "ManicMiner11", "ManicMiner12", "ManicMiner14", "ManicMiner50", "ManicMiner51", "ManicMiner52", "ManicMiner60", "ManicMiner61", "ManicMiner62", "ManicMiner63", "ManicMiner64", "MassEffect1", "MassEffect2", "MatchPoint2",
    "Maze", "Miner2049_1", "Miner3", "Miner70", "Miranda1", "MissileCommand", "MonkeyIsland100", "MonkeyIsland101", "MonkeyIsland102", "MonkeyIsland110", "MonkeyIsland111", "MonkeyIsland112", "MonkeyIsland140", "MonkeyIsland141",
    "MonkeyIsland142", "MonkeyIsland143", "Montezuma200", "Montezumas revenge2", "MontezumasRevenge90", "MontyMole100", "MontyMole110", "MontyMole111", "MontyMole112", "MontyMole50", "MontyMole51", "MontyMole52", "MontyMole99",
    "MoonBuggy", "MoonZX", "Morrowind100", "Morrowind130", "Morrowind140", "MrRobot11", "MrRobot60", "MrRobot70", "Nebulus2", "Nebulus50", "Nebulus90", "Neptunes daughters", "OReillyMine50", "ORileysMine2", "ORileysMine60",
    "Oblivion100", "Oblivion110", "Oblivion140", "Oblivion141", "OilWell50", "OilWell51", "OlympicSkier", "OlympicSkier6", "OperationWolf50", "PQ3", "PWE", "Pacman200", "Pacman201", "Paperboy2", "Paperboy50", "Paratroopers2",
    "Paratroopers3", "PharaohCurse11", "PharaohCurse110", "PharaohCurse111", "PharaohCurse112", "PharaohCurse130", "PharaohCurse140", "Pipeline50", "Pipeline51", "Pipeline88", "Pirates200", "Pitfall100", "Pitfall2-100", "Pitfall23",
    "Pitfall27", "Pitfall50", "Pitfall60", "Pitfall70", "Pitfall71", "Pitfall72", "Pitfall73", "Pitfall88", "Pitfall89", "Pitfall90", "Pitfall91", "Pitfall96", "Pitstop200", "Pitstop3", "Platoon50", "Pooyan3", "Popeye2", "Portal130",
    "Portal131", "Portal132", "Portal140", "Predator50", "Prince4", "Prince41", "Prince50", "Prince51", "PrinceMac", "Pssst", "PurpleHeart", "Pyjamarama11", "Pyjamarama50", "Pyjamarama70", "RMC50", "RadarRatRace10", "RadarRatRace20",
    "Rambo11", "Rambo3", "RedWarrior1", "ReturnToCastleWolfenstein11", "ReturnToCastleWolfenstein12", "ReturnToCastleWolfenstein13", "ReturnToCastleWolfenstein14", "RickDangerous11", "RickDangerous50", "RickDangerous51",
    "RickDangerous60", "RickDangerous70", "RiverRaid2", "RiverRaid70", "RobinHood3", "RobinOfTheWood4", "RobinOfTheWood50", "RobinOfTheWood88", "RobinToTheRescue1", "RobinToTheRescue89", "RobinsonsRequiem1", "SP111", "SP4", "SP60",
    "SP62", "SP63", "SP64", "SP65", "SP66", "SP67", "SP68", "SP69", "SP70", "SP71", "ST2", "SVS100", "SVS1001", "SVS101", "SVS1011", "SVS102", "SVS103", "SVS110", "SVS111", "SVS112", "SVS130", "SVS131", "SVS132", "SabreWulf11",
    "SabreWulf50", "SabreWulf87", "SabreWulf89", "SabreWulf99", "SammyLightfoot2", "SammyLightfoot4", "SasbreWulf60", "Scarab200", "Scramble10", "Scramble23", "Scramble60", "Scramble7", "ScubaDive60", "SeaWolf60", "SeaWolf88",
    "Sentinel2", "Sentinel50", "Serpentine50", "SexOlympics1", "SexOlympics2", "Shamus4", "Shamus60", "Shamus91", "Silkworm200", "SirFred4", "SirFred60", "SirFred61", "SirFred62", "SirFred70", "SirFred88", "Ski23", "Ski64",
    "SkoolDaze50", "SkoolDaze60", "SkoolDaze61", "Skullkeep", "Skyrim3", "Skyrim9", "SkyrimElf", "Soccer3", "Soccer99", "Sorcery31", "Sorcery70", "Sorcery88", "Sp61", "SpaceQuest10", "SpaceQuest103", "SpaceQuest200",
    "SpectrumGame1", "Spelunker70", "SpiderGreen", "SpikesPeak1", "SpyVsSpy41", "SumerGames60", "SuperDogfight3", "SwordOfFargoal200", "SwordOfFargoal201", "TempleOfApshai70", "TempleOfApshai89", "TheHobbit13", "TheHobbit14",
    "TheHobbit15", "TheHobbit16", "TheHobbit70", "TheHobbit71", "TheHobbit72", "TheHobbit73", "TheHobbit88", "TheHobbit89", "TheHobbit99", "TimeTunnel50", "TimeTunnel60", "TimeTunnel70", "TombRaider100", "TombRaider101",
    "TombRaider102", "TombRaider103", "TombRaider104", "TombRaider105", "TombRaider106", "TombRaider107", "TombRaider108", "TombRaider109", "TombRaider110", "TombRaider111", "TombRaider112", "TombRaider113", "TombRaider130",
    "TombRaider95", "TombRaider96", "TombRaider97", "TombRaider98", "TombRaider99", "Tombraider140", "Tombraider141", "Tornado1", "Tornado88", "Trashman2", "Triss", "TurboEsprit200", "Tutamkham50", "Tutanham11",
    "Tutanham12", "Tutankham102", "Tutankham104", "Tutankham105", "Tutankhamun88", "UW10", "UW27", "Ultima11", "Ultima50", "Ultima70", "Ultima89", "Underwurlde100", "Underwurlde110", "Underwurlde111", "Underwurlde130",
    "Underwurlde131", "Underwurlde140", "Underwurlde141", "Unknown3", "Unknown30", "Uridium2", "VIC20-2", "Valhalla2", "Valhalla88", "Vixen3", "Vixen50", "Vixen51", "Vixen70", "Vixen79", "Vixen89", "WOW10", "WOW104",
    "Wadca", "Wally88", "Wally99", "WhoDaresWins1", "WhoDaresWins10", "WhoDaresWins50", "WhoDaresWins70", "WhoDaresWins71", "WhoDaresWins88", "WinterGames10", "WinterGames11", "WinterGames79", "Witcher100", "Witcher101",
    "Witcher102", "Witcher103", "Witcher110", "Witcher111", "Witcher112", "Witcher113", "Witcher130", "Witcher47", "WizardOfWor89", "Wolf10", "Wolfenstein31", "Wolfenstein50", "Wolfenstein70", "Yennefer", "Yennefer21",
    "Yeppelin70", "ZX Spectrum", "ZX81-89", "Zak50", "Zak51", "ZakMcKraken89", "Zaxxon3", "Zaxxon70", "Zaxxon89", "Zeppelin4", "Zeppelin50", "Zeppelin88", "Zeppelin89", "ZimSalaBim2", "ZimSalaBim200", "ZimSalaBim201",
    "BetrayedAlliance", "Commando100", "Elite100", "F4", "GhostFace1", "GhostFace2", "GhostFace3", "GhostFace4", "Movie", "SpyHunter200", "LeisureSuitLarry300",
].sort();

/** Crests */

const DECAL_CRESTS = ["LS", "Skull4", "Skull3", "Skull2", "Skull1", "Crack4", "Crack3", "Skeleton11", "Skeleton12", "Crack20", "Crack21", "DancingSkeletons2",
    "PrayingSkeleton10", "SittingSkeleton2", "Skeleton21", "Skull10", "Skull11", "WOWc1", "WOWc2", "Reaper", "AticAtacCrest1", "DungeonWall", "DungeonDoor_Blocked",
    "Skeleton20", "Skeleton121", "Skeleton23", "Skull20", "Skull21"];
const BOTTOM_CRESTS = ["Grate1_128"];
const TOP_CRESTS = ["Drain2_96", "Drain64", "Grate1_128", "RoundGrille96", "FlatPond", "FlatPond2", "FlatPond3", "FlatPond4", "FlatPond5", "FlatPond6", "FlatPond7"];
const LIGHT_DECALS = ["WallLamp", "WallLamp2", "WallLamp3", "WallTorch", "Lamp4", "WallLamp10", "WallLamp11", "WallLamp12", "WallLamp13", "WallLamp14", "WallLamp15",
    "WallLamp16", "WallLamp17", "WallLamp18", "WallLamp19", "WallLamp20", "WallLamp9",
    "WallLamp31", "WallLamp32", "WallLamp33", "WallLamp34", "WallLamp35",
    "Lamp40", "Lamp41", "Lamp42", "Lamp43", "Lamp44", "Lamp45", "Lamp46", "Lamp47", "Lamp48", "Lamp49", "Lamp50", "Lamp51", "Lamp52", "Lamp53",
];
const TRIGGER_DECALS = ["RockTriggerButton", "MarbleTriggerButton", "PurpleTriggerButton"];

console.log("%cMAP for MazEditor loaded.", "color: #888");