/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";
/////////////////////////////////////////////////
/*
 forked from: LevelEditor for Deep Down Into Darkness, v0.18.0
 ported to gen 3 ENGINE, GRID
 forked from MazeMaster 1.03
      
 to do:
      
 known bugs: 

 */
////////////////////////////////////////////////////
var MAP = {
  map: null
};
var INI = {
  MAXINT: 96,
  MININT: 8,
  MAX_GRID: 64,
  MIN_GRID: 8,
  SPACE_X: 2048,
  SPACE_Y: 2048
};
var PRG = {
  VERSION: "0.06.01",
  NAME: "MazEditor",
  YEAR: "2022, 2023",
  CSS: "color: #239AFF;",
  INIT() {

    console.log("%c**************************************************************************************************************************************", PRG.CSS);
    console.log(`${PRG.NAME} ${PRG.VERSION} by Lovro Selic, (c) C00lSch00l ${PRG.YEAR} on ${navigator.userAgent}`);
    console.log("%c**************************************************************************************************************************************", PRG.CSS);
    $("#title").html(PRG.NAME);
    $("#version").html(`${PRG.NAME} V${PRG.VERSION} <span style='font-size:14px'>&copy</span> C00lSch00l ${PRG.YEAR}`);
    $("input#toggleAbout").val("About " + PRG.NAME);
    $("#about fieldset legend").append(" " + PRG.NAME + " ");

    ENGINE.autostart = true;
    ENGINE.start = PRG.start;
    ENGINE.readyCall = GAME.setup;
    ENGINE.setGridSize(64);
    ENGINE.setSpriteSheetSize(64);
    ENGINE.init();
  },
  setup() {
    console.log("PRG.setup");
    $("#verticalGrid").change(GAME.updateWH);
    $("#horizontalGrid").change(GAME.updateWH);
    $("#gridsize").change(GAME.updateWH);
    $("#selector input[name=renderer]").click(GAME.render);
    $("#corr").click(GAME.render);
    $("#coord").click(GAME.render);
    $("#grid").click(GAME.render);

    $("#buttons").on("click", "#new", GAME.init);
    $("#buttons").on("click", "#export", GAME.export);
    $("#buttons").on("click", "#import", GAME.import);

    $("#engine_version").html(ENGINE.VERSION);
    $("#grid_version").html(GRID.VERSION);
    $("#maze_version").html(DUNGEON.VERSION);
    $("#lib_version").html(LIB.VERSION);
    $("#webgl_version").html(WebGL.VERSION);
    $("#iam_version").html(IndexArrayManagers.VERSION);

    $(".section").show();
  },
  start() {
    console.log(PRG.NAME + " started.");
    $("#startGame").addClass("hidden");
    $(document).keypress(function (event) {
      if (event.which === 32 || event.which === 13) {
        event.preventDefault();
      }
    });
    GAME.start();
  }
};
var GAME = {
  start() {
    $("#bottom")[0].scrollIntoView();
    ENGINE.topCanvas = ENGINE.getCanvasName("ROOM");
    $(ENGINE.topCanvas).on("click", { layer: ENGINE.topCanvas }, GAME.mouseClick);
    GAME.init();
    GAME.started = true;
  },
  mouseClick(event) {
    ENGINE.readMouse(event);
    let x = Math.floor(ENGINE.mouseX / ENGINE.gameWIDTH * MAP.width);
    let y = Math.floor(ENGINE.mouseY / ENGINE.gameHEIGHT * MAP.height);
    let grid = new Grid(x, y);
    var radio = $("#paint input[name=painter]:checked").val();
    let GA = MAP.map.GA;

    switch (radio) {
      case 'flip':
        if (GA.isWall(grid)) {
          GA.carveDot(grid);
        } else {
          GA.toWall(grid);
        }
        break;
      case "space":
        GA.carveDot(grid);
        break;
      case "wall":
        GA.toWall(grid);
        break;
      case "door":
        GA.toDoor(grid);
        break;
      case "trapdoor":
        GA.addTrapDoor(grid);
        break;
      case "blockwall":
        GA.addBlockWall(grid);
        break;
    }

    GAME.render();
  },
  pacGrid() {
    let corr = $("input[name='corr']")[0].checked;
    ENGINE.resizeBOX("ROOM");
    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
    let pac = PacGrid.gridToPacGrid(MAP.map);
    let lw = Math.round(ENGINE.INI.GRIDPIX / 12);
    ENGINE.PACGRID.configure(lw, "pacgrid", "#FFF", "#000", "#666");
    ENGINE.PACGRID.draw(pac, corr);
  },
  blockGrid() {
    let corr = $("input[name='corr']")[0].checked;
    ENGINE.resizeBOX("ROOM");
    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
    ENGINE.BLOCKGRID.configure("pacgrid", "#FFF", "#000");
    ENGINE.BLOCKGRID.draw(MAP.map, corr);
  },
  textureGrid() {
    let corr = $("input[name='corr']")[0].checked;
    ENGINE.resizeBOX("ROOM");
    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
    ENGINE.TEXTUREGRID.configure("pacgrid", "wall", $("#floortexture")[0].value, $("#walltexture")[0].value);
    ENGINE.TEXTUREGRID.draw(MAP.map, corr);
  },
  tileGrid() {
    let corr = $("input[name='corr']")[0].checked;
    ENGINE.resizeBOX("ROOM");
    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
    ENGINE.TEXTUREGRID.configure("pacgrid", "wall", 'BackgroundTile', 'WallTile');
    ENGINE.TEXTUREGRID.dynamicAssets = { door: "VerticalWall", trapdoor: "HorizontalWall", blockwall: "BlockWall" };
    ENGINE.TEXTUREGRID.set3D('D3');
    ENGINE.TEXTUREGRID.drawTiles(MAP.map, corr);
  },
  resize() {
    MAP.width = $("#horizontalGrid").val();
    MAP.height = $("#verticalGrid").val();
  },
  render() {
    var radio = $("#selector input[name=renderer]:checked").val();
    switch (radio) {
      case "line":
        GAME.pacGrid();
        break;

      case "block":
        GAME.blockGrid();
        break;

      case "texture":
        GAME.textureGrid();
        break;

      case "tile":
        GAME.tileGrid();
        break;
    }

    if ($("input[name='grid']")[0].checked) GRID.grid();
    if ($("input[name='coord']")[0].checked) GRID.paintCoord("coord", MAP.map);
  },
  init() {
    let OK = true;
    if (GAME.started) {
      OK = confirm("Sure?");
    }
    if (OK) {
      MAP.width = $("#horizontalGrid").val();
      MAP.height = $("#verticalGrid").val();
      MAP.map = FREE_MAP.create(MAP.width, MAP.height);
      console.log(MAP.map);
      GAME.render();
    }
  },
  updateWH() {
    if (isNaN(parseInt($("#verticalGrid").val(), 10))) $("#verticalGrid").val(32);
    if (isNaN(parseInt($("#horizontalGrid").val(), 10))) $("#horizontalGrid").val(24);
    if (isNaN(parseInt($("#gridsize").val(), 10))) $("#gridsize").val(32);
    if ($("#verticalGrid").val() > INI.MAXINT)
      $("#verticalGrid").val(INI.MAXINT);
    if ($("#verticalGrid").val() < INI.MININT)
      $("#verticalGrid").val(INI.MININT);
    if ($("#horizontalGrid").val() > INI.MAXINT)
      $("#horizontalGrid").val(INI.MAXINT);
    if ($("#horizontalGrid").val() < INI.MININT)
      $("#horizontalGrid").val(INI.MININT);
    if ($("#gridsize").val() < INI.MIN_GRID) $("#gridsize").val(INI.MIN_GRID);
    if ($("#gridsize").val() > INI.MAX_GRID) $("#gridsize").val(INI.MAX_GRID);
    if ($("#gridsize").val() % 8 !== 0) {
      $("#gridsize").val(Math.floor($("#gridsize").val() / 8) * 8);
    }
    ENGINE.INI.GRIDPIX = parseInt($("#gridsize").val(), 10);
    //change grids
    if ($("#horizontalGrid").val() * ENGINE.INI.GRIDPIX > INI.SPACE_X) {
      $("#horizontalGrid").val(Math.floor(INI.SPACE_X / ENGINE.INI.GRIDPIX));
    }
    if ($("#verticalGrid").val() * ENGINE.INI.GRIDPIX > INI.SPACE_Y) {
      $("#verticalGrid").val(Math.floor(INI.SPACE_Y / ENGINE.INI.GRIDPIX));
    }

    ENGINE.gameHEIGHT = $("#verticalGrid").val() * ENGINE.INI.GRIDPIX;
    ENGINE.gameWIDTH = $("#horizontalGrid").val() * ENGINE.INI.GRIDPIX;
    $("#ENGINEgameWIDTH").html(ENGINE.gameWIDTH);
    $("#ENGINEgameHEIGHT").html(ENGINE.gameHEIGHT);
    $("#spacex").html(INI.SPACE_X);
    $("#spacey").html(INI.SPACE_Y);
    GAME.resize();
  },
  setup() {
    console.log("GAME SETUP started");
    GAME.updateWH();

    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
    ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["pacgrid", "wall", "grid", "coord", "click"], null);

    $("#buttons").append("<input type='button' id='new' value='New'>");
    $("#buttons").append("<input type='button' id='export' value='Export'>");
    $("#buttons").append("<input type='button' id='import' value='Import'>");

    for (const prop in TEXTURE) {
      $("#walltexture").append(`<option value="${prop}">${prop}</option>`);
      $("#floortexture").append(`<option value="${prop}">${prop}</option>`);
      $("#ceiltexture").append(`<option value="${prop}">${prop}</option>`);
      LAYER.wallcanvas = $("#wallcanvas")[0].getContext("2d");
      LAYER.floorcanvas = $("#floorcanvas")[0].getContext("2d");
      LAYER.ceilcanvas = $("#ceilcanvas")[0].getContext("2d");
      ENGINE.fill(LAYER.wallcanvas, TEXTURE[$("#walltexture")[0].value]);
      ENGINE.fill(LAYER.floorcanvas, TEXTURE[$("#floortexture")[0].value]);
      ENGINE.fill(LAYER.ceilcanvas, TEXTURE[$("#ceiltexture")[0].value]);
    }

    $("#walltexture").change(function () {
      ENGINE.fill(LAYER.wallcanvas, TEXTURE[$("#walltexture")[0].value]);
      //repaint
      if ($("#selector input[name=renderer]:checked").val() === "texture") {
        GAME.texture();
      }
    });
    $("#floortexture").change(function () {
      ENGINE.fill(LAYER.floorcanvas, TEXTURE[$("#floortexture")[0].value]);
      //repaint
      if ($("#selector input[name=renderer]:checked").val() === "texture") {
        GAME.texture();
      }
    });
    $("#ceiltexture").change(function () {
      ENGINE.fill(LAYER.ceilcanvas, TEXTURE[$("#ceiltexture")[0].value]);
    });

    for (const pic of DECAL_PAINTINGS) {
      $("#picture_decal").append(`<option value="${pic}">${pic}</option>`);
    }
    ENGINE.drawToId("picturecanvas", 0, 0, SPRITE[$("#picture_decal")[0].value]);

    $("#picture_decal").change(function () {
      ENGINE.drawToId("picturecanvas", 0, 0, SPRITE[$("#picture_decal")[0].value]);
    });

    for (const crest of [...DECAL_CRESTS, ...BOTTOM_CRESTS, ...TOP_CRESTS]) {
      $("#crest_decal").append(`<option value="${crest}">${crest}</option>`);
    }
    ENGINE.drawToId("crestcanvas", 0, 0, SPRITE[$("#crest_decal")[0].value]);

    $("#crest_decal").change(function () {
      ENGINE.drawToId("crestcanvas", 0, 0, SPRITE[$("#crest_decal")[0].value]);
    });

    for (const light of LIGHT_DECALS) {
      $("#light_decal").append(`<option value="${light}">${light}</option>`);
    }
    ENGINE.drawToId("lightcanvas", 0, 0, SPRITE[$("#light_decal")[0].value]);
    $("#light_decal").change(function () {
      ENGINE.drawToId("lightcanvas", 0, 0, SPRITE[$("#light_decal")[0].value]);
    });
  },
  texture() {
    GAME.textureGrid();
  },
  export() {
    let rle = MAP.map.GA.exportMap();
    let Export = { width: MAP.width, height: MAP.height, map: rle };
    let roomExport = `RoomID : {
      data: '${JSON.stringify(Export)}',
      wall: "${$("#walltexture")[0].value}",
      floor: "${$("#floortexture")[0].value}",
      ceil: "${$("#ceiltexture")[0].value}",
    }`;
    $("#exp").val(roomExport);
  },
  import() {
    const ImportText = $("#exp").val();
    const Import = JSON.parse(ImportText.extractGroup(/data:\s\'(.*)\'/));
    const wall = ImportText.extractGroup(/wall:\s\"(.*)\"/);
    const floor = ImportText.extractGroup(/floor:\s\"(.*)\"/);
    const ceil = ImportText.extractGroup(/ceil:\s\"(.*)\"/);
    $("#walltexture").val(wall);
    $("#floortexture").val(floor);
    $("#ceiltexture").val(ceil);
    ENGINE.fill(LAYER.wallcanvas, TEXTURE[$("#walltexture")[0].value]);
    ENGINE.fill(LAYER.floorcanvas, TEXTURE[$("#floortexture")[0].value]);
    ENGINE.fill(LAYER.ceilcanvas, TEXTURE[$("#ceiltexture")[0].value]);

    MAP.map = FREE_MAP.import(Import);
    console.log(MAP.map);
    MAP.width = Import.width;
    MAP.height = Import.height;
    $("#horizontalGrid").val(Import.width);
    $("#verticalGrid").val(Import.height);
    GAME.updateWH();
    ENGINE.resizeBOX("ROOM");
    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
    GAME.render();
  },
};
$(function () {
  PRG.INIT();
  PRG.setup();
  ENGINE.LOAD.preload();
});
