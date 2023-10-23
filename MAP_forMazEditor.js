/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** Decals */
const DECAL_PAINTINGS = [
    "C64", "HoraceSki", "VIC20", "Apshai6", "Apshai5", "Apshai4", "Apshai3", "Hero30", "Cliffhanger", "Fred101", "Fred102",
    "FF5", "LaraCroft1", "LaraCroft2", "IM13", "FF101", "FF100", "AA100", "UW10", "KL10", "SVS100", "SVS101", "SP4", "JSW10", "Vixen3", "WOW10", "ESB",
    "ActecChallenge2", "AlleyKat", "BeachHead100", "Blackwyche2", "Hero100", "Invaders2", "KL102", "Karn1", "LastNinja10", "MoonBuggy", "PQ3",
    "Pitfall2-100", "SVS103", "Galaxians10", "BC10", "LSL100", "LaraCroft21", "MoonZX", "Fred21", "Frogger2", "LSL31",
    "Amiga", "Apshai10", "BC103", "Barbarian3", "BattleChopper", "Belwothe", "BladeRunner", "BlueMax20", "BrideOfFrankenstein", "Goonies5", "Hero103",
    "OlympicSkier", "Pitfall23", "Prince4", "PurpleHeart", "AntAttack2", "BeachHeadReplace", "Cavelon13", "Cavelon4", "CongoBongo2", "FalconPatrol7",
    "LaraCroft123", "RobinToTheRescue1", "Ski64", "SpaceQuest10", "AtariST", "BC11", "BladeRunner7", "BlueMax11", "C64_hard", "CastleHaunt", "Cavelon11",
    "CrawlMaster2", "DM100", "DigDug2", "DotHunter", "EricTheViking10", "FireAnt2", "HungryHorace11", "Invasion", "KQ100", "KQ101", "LSL_Eve2", "ManiacMansion11",
    "ORileysMine2", "PWE", "Pitfall100", "Scramble10", "SuperDogfight3", "Tutanham11", "Tutanham12", "Ultima11", "WinterGames10",
    "AntAttack4", "Cauldron10", "DM103", "DM104", "DonkeyKong100", "Elvira1", "Elvira2", "Elvira3", "FalconPatrol8", "FalconPatrol9", "FortApocalypse",
    "GatewayToApshai11", "Grog1", "Hero104", "HungryHorace12", "KQ102", "LSL101", "LSL102", "LSL103", "LadyTut10", "LodeRunner10", "LodeRunner11", "MissileCommand",
    "OlympicSkier6", "Pitfall27", "Popeye2", "PrinceMac", "SVS102", "SabreWulf11", "Scramble7", "Shamus4", "Ski23", "Skyrim3", "Tutankham102", "Unknown3", "Witcher47",
    "Wolf10", "Zaxxon3", "ZimSalaBim2", "ArticShipwreck2", "BoogaBoo11", "CastleOFTerror11", "Cauldron8", "DM105", "DM106", "DM107", "DefenderOfTheCrown", "EOB11",
    "FortApocalypse41", "Hobbit101", "LCP", "LadyTut102", "ManicMiner11", "ManicMiner12", "MatchPoint2", "Miner2049_1", "MrRobot11", "Paratroopers2", "PharaohCurse11",
    "Rambo3", "RobinOfTheWood4", "SP111", "ST2", "SammyLightfoot2", "SirFred4", "Skyrim9", "SkyrimElf", "Tutankham105", "UW27", "WOW104", "WinterGames11",
    "Arena2", "Barbarian13", "BoogaBoo4", "BrianBloodaxe11", "CastleOfTerror3", "CastleOfTerror4", "CrystalCastles2", "Daggerfall3", "Daggerfall4", "EnigmaForce2",
    "EveryoneIsAWally2", "GI_Joe2", "Gauntlet", "Gods2", "ImpossibleMission11", "JungleHunt2", "LaraCroft102", "ManicMiner14", "Miranda1", "Montezuma's revenge2",
    "Nebulus2", "Neptune's daughters", "RobinHood3", "SammyLightfoot4", "Scramble23", "Skullkeep", "Soccer3", "SpaceQuest103", "TheHobbit13", "TheHobbit14",
    "TheHobbit15", "Trashman2", "Triss", "Tutankham104", "Yennefer", "ZX Spectrum", "AirWolf31", "ArticShipwreck7", "AtariFalcon", "Bagitman11", "BattleThroughTime2",
    "BoogaBoo41", "CBM_VIC20", "CastleWolfenstein21", "CodenameIceman2", "CodenameIceman3", "F2", "FalconPatrol99", "GoldenAxe2", "HalfLife11", "HalfLife12", "HalfLife13",
    "HalfLife14", "HeadOverHeels3", "IK2", "Ishar11", "Ishar13", "Ishar14", "Ishar15", "Jetpac3", "Jumpman3", "JungleHunt12", "KnightLore31", "KokotoniWilf2",
    "LeisureSuitLarry201", "MassEffect1", "MassEffect2", "Maze", "Miner3", "Paperboy2", "Paratroopers3", "Pooyan3", "Prince41", "Pyjamarama11", "RedWarrior1",
    "ReturnToCastleWolfenstein11", "ReturnToCastleWolfenstein12", "ReturnToCastleWolfenstein13", "ReturnToCastleWolfenstein14", "RickDangerous11", "Sorcery31",
    "Spike'sPeak1", "SpyVsSpy41", "TheHobbit16", "Valhalla2", "WhoDaresWins1", "Wolfenstein31", "Yennefer21", "Zeppelin4",
    "AppleLisa", "BC90", "BackToNature1", "Bagitman90", "BeyondForbiddenForest2", "Biggles2", "BoogaBoo90", "CamelotWarriors", "CastleOfTerror91",
    "Choplifter11", "Choplifter12", "CrystalCastles90", "Cuthbert90", "DM90", "Drelbs2", "DungeonMaster91", "DungeonMaster92", "ElvenWarrior1",
    "EyeOfTheBeholder90", "FireAnt21", "ForbiddenForest90", "ForbiddenForest91", "Geos", "HalfLife91", "Imhotep2", "ImpossibleMission90", "JetSetWilly11",
    "LeisureSuitLarry90", "LeisureSuitLarry91", "MontezumasRevenge90", "Nebulus90", "Pitfall90", "Pitfall91", "Pitstop3", "Rambo11", "SexOlympics1", "SexOlympics2",
    "Shamus91", "Tornado1", "FranticFreddie3",
    "BrianBloodaxe20", "CodenameIceman98", "Cuthbert20", "DonkeyKong99", "Drelbs3", "DungeonMaster96", "DungeonMaster97", "F1-1", "ForbiddenForest99", "ForgottenForest1",
    "Gods99", "Goonies90", "Ishar98", "Ishar99", "JupiterLander99", "LeisureSuitLarry93", "LeisureSuitLarry94", "MontyMole99", "Pitfall96", "RadarRatRace10", "SabreWulf99",
    "Soccer99", "TheHobbit99", "Unknown30", "Wally99", "AMC2", "AMC3", "ArabianNights1", "CrystalsOfZong10", "HalfLife 89", "Hero80", "Hero81", "Hero82", "HeroesOfKarn80",
    "HunchBack10", "Ishar80", "JetSetWilly88", "JetSetWilly89", "JungleHunt89", "LeisureSuitLarry88", "LeisureSuitLarry89", "Pitfall88", "Pitfall89", "RobinToTheRescue89",
    "SabreWulf89", "TempleOfApshai89", "TheHobbit89", "Vixen89", "WhoDaresWins10", "WizardOfWor89", "ZX81-89", "ZakMcKraken89", "Zaxxon89", "Zeppelin89",
    "Goonies88", "HalfLife88", "Pipeline88", "Pssst", "RadarRatRace20", "RiverRaid2", "RobinOfTheWood88", "RobinsonsRequiem1", "SabreWulf87", "SeaWolf88", "Sentinel2",
    "SirFred88", "Sorcery88", "TheHobbit88", "Tornado88", "Tutankhamun88", "Ultima89", "Uridium2", "Valhalla88", "Vixen79", "Wally88", "WhoDaresWins88", "WinterGames79", "Zeppelin88",
    "BrianBloodaxe70", "BrianBloodaxe71", "ChuckieEgg1", "ChuckieEgg2", "Cuthbert70", "DungeonMaster70", "EveryoneIsAWally70", "EveryoneIsAWally71", "EyeOfTheBeholder70",
    "FalconPatrol70", "FalconPatrol71", "FalconPatrol72", "FireAnt70", "Friday70", "GIJoe70", "GIJoe71", "Galaga70", "Galaga71", "Gods70", "Goonies70", "HalfLife70",
    "HalfLife71", "HalfLife72", "Hero70", "Hero71", "Hero72", "HunchBack70", "HunchBack71", "Iceman70", "Infiltrator70", "Infiltrator71", "Ishar70", "Ishar71",
    "Ishar72", "Jawbreaker", "JetPac70", "Jumpman70", "JupiterLander70", "KokotoniWilf70", "LeisureSuitLarry70", "LeisureSuitLarry71", "LeisureSuitLarry72",
    "LeisureSuitLarry73", "LeisureSuitLarry74", "LeisureSuitLarry75", "LeisureSuitLarry76", "LeisureSuitLarry77", "Miner70", "MrRobot70", "Pitfall70", "Pitfall71",
    "Pitfall72", "Pitfall73", "Pyjamarama70", "RickDangerous70", "RiverRaid70", "SirFred70", "Sorcery70", "Spelunker70", "TempleOfApshai70", "TheHobbit70", "TheHobbit71",
    "TheHobbit72", "TheHobbit73", "TimeTunnel70", "Ultima70", "Vixen70", "WhoDaresWins70", "WhoDaresWins71", "Wolfenstein70", "Yeppelin70", "Zaxxon70",
    "DynaBlaster60", "FireAnt60", "Gods60", "HalfLife60", "HeavyOnTheMagick60", "Hero60", "Imhotep60", "Infiltrator60", "JetSetWilly60", "JungleStory60", "Kangaroo60",
    "Killerwat60", "KingsQuest60", "KokotoniWilf60", "LadyTut60", "LeisureSuitLarry60", "LeisureSuitLarry61", "ManicMiner60", "ManicMiner61", "ManicMiner62",
    "ManicMiner63", "ManicMiner64", "MrRobot60", "ORiley'sMine60", "Pitfall60", "RickDangerous60", "SP60", "SP62", "SP63", "SP64", "SP65", "SP66", "SP67", "SP68",
    "SP69", "SP70", "SP71", "SasbreWulf60", "Scramble60", "ScubaDive60", "SeaWolf60", "Shamus60", "SirFred60", "SirFred61", "SirFred62", "SkoolDaze60", "SkoolDaze61",
    "Sp61", "SumerGames60", "TimeTunnel60", "F50", "HalfLife50", "Hero50", "Hero51", "Hero52", "HeroQuest50", "JetPac50", "JungleHunt50", "Kangaroo50", "Killerwat50",
    "Killerwat51", "KingsQuest50", "KingsQuest51", "KingsQuest52", "KingsQuest53", "LeisureSuitLarry50", "ManicMiner50", "ManicMiner51", "ManicMiner52", "MontyMole50",
    "MontyMole51", "MontyMole52", "Nebulus50", "OReillyMine50", "OilWell50", "OilWell51", "OperationWolf50", "Paperboy50", "Pipeline50", "Pipeline51", "Pitfall50", "Platoon50",
    "Predator50", "Prince50", "Prince51", "Pyjamarama50", "RMC50", "RickDangerous50", "RickDangerous51", "RobinOfTheWood50", "SabreWulf50", "Sentinel50", "Serpentine50",
    "SkoolDaze50", "TimeTunnel50", "Tutamkham50", "Ultima50", "Vixen50", "Vixen51", "Wadca", "WhoDaresWins50", "Wolfenstein50", "Zak50", "Zak51", "Zeppelin50",
    "AztecChallenge100", "AztecChallenge101", "Barbarian100", "DefenderOfTheCrown100", "DungeonMaster100", "EyeOfTheBeholder100", "EyeOfTheBeholder101", "Fred100",
    "MonkeyIsland100", "MonkeyIsland101", "MonkeyIsland102", "MontyMole100", "Morrowind100", "Oblivion100", "SVS1001", "SVS1011", "TombRaider100", "TombRaider101",
    "TombRaider102", "TombRaider103", "TombRaider104", "TombRaider105", "TombRaider106", "TombRaider107", "TombRaider108", "TombRaider109", "TombRaider95",
    "TombRaider96", "TombRaider97", "TombRaider98", "TombRaider99", "Underwurlde100", "Witcher100", "Witcher101", "Witcher102", "Witcher103",
    "AticAtac110", "AticAtac111", "AticAtac112", "AticAtac113", "AticAtac114", "AticAtac115", "AticAtac116", "AticAtac117", "AztecChallenge110",
    "AztecChallenge111", "AztecChallenge112", "Barbarian110", "Barbarian111", "Barbarian112", "BeyondForbiddenForest110", "BeyondForbiddenForest111",
    "Blackwyche110", "CrawlMaster110", "CrawlMaster111", "CrawlMaster112", "CrawlMaster113", "CrawlMaster114", "CrawlMaster115", "Defender110",
    "DefenderOfTheCrown110", "DragonSkulle110", "EyeOfTheBeholder110", "EyeOfTheBeholder111", "EyeOfTheBeholder112", "ForbiddenForest110", "Fred110",
    "Fred111", "Fred112", "Fred113", "Frogger110", "Frogger111", "Frogger112", "GatewayToApshai110", "ImpossibleMsission110", "ImpossibleMsission111",
    "ImpossibleMsission112", "ImpossibleMsission113", "JSW110", "JSW111", "JSW112", "JSW113", "KnightLore110", "KnightLore111", "LastNinja110",
    "LastNinja111", "MonkeyIsland110", "MonkeyIsland111", "MonkeyIsland112", "MontyMole110", "MontyMole111", "MontyMole112", "Oblivion110",
    "PharaohCurse110", "PharaohCurse111", "PharaohCurse112", "SVS110", "SVS111", "SVS112", "TombRaider110", "TombRaider111", "TombRaider112",
    "TombRaider113", "Underwurlde110", "Underwurlde111", "Witcher110", "Witcher111", "Witcher112", "Witcher113",
    "AticAtac130", "AticAtac131", "AztecChallenge130", "Barbarian130", "Barbarian131", "CrawlMaster130", "CrawlMaster131", "CrawlMaster132",
    "CrawlMaster133", "EyeOfTheBeholder130", "Fred130", "GatewayToApshai130", "ImpossibleMission130", "LastNinja130", "LastNinja131", "Morrowind130",
    "PharaohCurse130", "Portal130", "Portal131", "Portal132", "SVS130", "SVS131", "SVS132", "TombRaider130", "Underwurlde130", "Underwurlde131", "Witcher130",
    "AticAtac140", "EyeOfTheBeholder140", "GatewayToApshai140", "ImpossibleMission140", "LastNinja140", "MonkeyIsland140", "MonkeyIsland141", "MonkeyIsland142",
    "MonkeyIsland143", "Morrowind140", "Oblivion140", "Oblivion141", "PharaohCurse140", "Portal140", "Tombraider140", "Tombraider141", "Underwurlde140", "Underwurlde141",
    "1942_200", "1942_201", "1943_200", "AirWolf200", "AirWolf201", "AlienKong", "AmberMoon200", "AmberStar200", "AmberStar201", "AmberStar202", "AmberStar203",
    "AntAttack200", "Arena200", "Arena201", "Arnie200", "Arnie201", "Arnie202", "Athanor200", "Athanor201", "AticAtac200", "AticAtac201", "AticAtac202", "AticAtac203",
    "AticAtac204", "AticAtac205", "AticAtac206", "BackToFuture200", "BackToFuture201", "Breakout200", "BrideOfFrankenstein200", "BruceLee200", "Captive199", "Captive200",
    "Captive201", "CastleHaunt200", "Commando200", "Commando201", "CrystalCastles200", "CyberPunk200", "CyberPunk201", "Decathlon200", "DonkeyKong200",
    "DungeonMaster200", "DungeonMaster201", "DungeonMaster202", "DungeonMaster203", "DungeonMaster204", "DungeonMaster205", "DungeonMaster206", "Elite",
    "Elite201", "Ghostbusters200", "Ghostbusters201", "IK200", "Karateka200", "LeisureSuitLarry200", "Montezuma200", "Pacman200", "Pacman201", "Pirates200",
    "Pitstop200", "Scarab200", "Silkworm200", "SpaceQuest200", "SpectrumGame1", "SwordOfFargoal200", "SwordOfFargoal201", "TurboEsprit200", "ZimSalaBim200",
    "ZimSalaBim201",
    "CCC1"
].sort();
/** Crests */

const DECAL_CRESTS = ["LS", "Skull4", "Skull3", "Skull2", "Skull1", "Crack4", "Crack3", "Skeleton11", "Skeleton12", "Crack20", "Crack21", "DancingSkeletons2",
    "PrayingSkeleton10", "SittingSkeleton2", "Skeleton21", "Skull10", "Skull11", "WOWc1", "WOWc2", "Reaper", "AticAtacCrest1", "DungeonWall","Forest"];
const BOTTOM_CRESTS = ["Grate1_128"];
const TOP_CRESTS = ["Drain2_96", "Drain64", "Grate1_128", "RoundGrille96", "FlatPond", "FlatPond2", "FlatPond3"];
const LIGHT_DECALS = ["WallLamp", "WallLamp2", "WallLamp3", "WallTorch", "Lamp4"];
const TRIGGER_DECALS = ["PurpleTriggerButton", "MarbleTriggerButton"];
console.log("%cMAP for MazEditor loaded.", "color: #888");