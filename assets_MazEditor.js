/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
//Assets for MazEditor
"use strict";
console.log("%cAssets for MazeEditor ready.", "color: orange");

LoadTextures = [
    //defaults
    "BrickWall4.jpg", "RockFloor.jpg",
    /** wall, floor, ceil */
    { srcName: "BrickWall128.jpg", name: "BrickWall" },
    { srcName: "BrickWall2_128.jpg", name: "BrickWall2" },
    { srcName: "BlackBrickWall128.jpg", name: "BlackBrickWall" },
    { srcName: "CastleWall.jpg", name: "CastleWall" },
    { srcName: "RockFloor.jpg", name: "RockFloor" },
    { srcName: "MorgueFloor256.jpg", name: "MorgueFloor" },
    { srcName: "BrownWall256.jpg", name: "DungeonWall" },
    { srcName: "GreenDungeonWall256.jpg", name: "GreenDungeonWall" },
    { srcName: "StoneFloor3_128.jpg", name: "StoneFloor3" },
    { srcName: "StoneFloor128.jpg", name: "StoneFloor" },
    { srcName: "Pavement1_128.jpg", name: "Pavement" },
    { srcName: "Pavement128.jpg", name: "Pavement2" },
    { srcName: "TlakFloor3_128.jpg", name: "TlakFloor3" },
    { srcName: "DungeonFloor128.jpg", name: "DungeonFloor" },
    { srcName: "BrickWall3_128.jpg", name: "BrickWall3" },
    { srcName: "ThatchFloor128.jpg", name: "ThatchFloor" },
    { srcName: "OldWall128.jpg", name: "OldFloor" },
    { srcName: "RockWall128.jpg", name: "RockWall" },
    { srcName: "GreyDungeonFloor128.jpg", name: "GreyDungeonFloor" },
    { srcName: "StoneWall2_128.jpg", name: "StoneWall2" },
    { srcName: "BrokenRuin128.jpg", name: "BrokenRuin" },
    { srcName: "DirtFloor.jpg", name: "DirtFloor" },
    { srcName: "RockCeiling.jpg", name: "RockCeiling" },
    { srcName: "TiledFloor5.jpg", name: "TiledFloor" },
    { srcName: "Rough1.jpg", name: "Rough" },
    { srcName: "Wall6.jpg", name: "DungeonWall4" },
    { srcName: "Tile1.jpg", name: "Tile" },
    { srcName: "Wall7.jpg", name: "Wall7" },
    { srcName: "Wall13.jpg", name: "Wall13" },
    { srcName: "Wall12.jpg", name: "Wall12" },
    { srcName: "Wall11.jpg", name: "Wall11" },
    { srcName: "Wall10.jpg", name: "Wall10" },
    { srcName: "Wall9.jpg", name: "Wall9" },
    { srcName: "Wall8.jpg", name: "Wall8" },
    { srcName: "GreyWall.jpg", name: "GreyWall" },
];

LoadSheetSequences = [
    { srcName: "BrownWall64.png", count: 12, name: "WallTile", trim: false },
    { srcName: "BlackWall64.png", count: 2, name: "BackgroundTile", trim: false },
    { srcName: "d3-64.png", count: 6, name: "D3", trim: false },
    { srcName: "VertiWall64.png", count: 1, name: "VerticalWall", trim: false },
    { srcName: "HoriWall64.png", count: 1, name: "HorizontalWall", trim: true },
    { srcName: "BlockWall64.png", count: 1, name: "BlockWall", trim: false },
];
