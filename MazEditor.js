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
const MAP = {
  map: {

  },
  init() {
    MAP.map.decals = [];
    MAP.map.lights = [];
    MAP.map.start = [];
    MAP.map.gates = [];
    MAP.map.keys = [];
    MAP.map.monsters = [];
  }
};
const INI = {
  MAXINT: 96,
  MININT: 8,
  MAX_GRID: 64,
  MIN_GRID: 8,
  SPACE_X: 2048,
  SPACE_Y: 2048
};
const PRG = {
  VERSION: "0.06.14",
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
    $("#buttons").on("click", "#copy", GAME.copyToClipboard);

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
const GAME = {
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
    let dir, nameId, type, dirIndex;
    let currentValue = GA.getValue(grid);
    let gridIndex = GA.gridToIndex(grid);

    switch (radio) {
      case 'flip':
        if (GA.isWall(grid)) {
          GA.carveDot(grid);
        } else {
          GA.toWall(grid);
        }
        $("#error_message").html("All is fine");
        break;
      case "space":
        GA.carveDot(grid);
        $("#error_message").html("All is fine");
        break;
      case "wall":
        GA.toWall(grid);
        $("#error_message").html("All is fine");
        break;
      case "door":
        GA.toDoor(grid);
        $("#error_message").html("All is fine");
        break;
      case "trapdoor":
        GA.addTrapDoor(grid);
        $("#error_message").html("All is fine");
        break;
      case "blockwall":
        GA.addBlockWall(grid);
        $("#error_message").html("All is fine");
        break;
      case "gate":
        console.log("gate");
        switch (currentValue) {
          case MAPDICT.WALL:
            break;
          default:
            $("#error_message").html(`Gate placement not supported on value: ${currentValue}`);
            return;
        }
        //
        let dirs = GA.getDirections(grid, MAPDICT.EMPTY);
        if (dirs.length > 1) {
          alert(`bad gate position, posible exits ${dirs.length}`);
          break;
        }
        dirIndex = dirs[0].toInt();
        MAP.map.gates.push(Array(gridIndex, dirIndex, $("#sgateID")[0].value, $("#tgateID")[0].value, $("#gatetype")[0].value));
        break;
      case "decal":
        switch (currentValue) {
          case MAPDICT.EMPTY:
            dir = NOWAY;
            [nameId, type] = GAME.getSelectedDecal();
            break;
          case MAPDICT.WALL:
            dir = GAME.getSelectedDir();
            if (dir.same(NOWAY)) {
              $("#error_message").html("Wall decal needs direction");
              return;
            }
            [nameId, type] = GAME.getSelectedDecal();
            break;
          default:
            $("#error_message").html(`Decal placement not supported on value: ${currentValue}`);
            return;
        }

        dirIndex = dir.toInt();
        $("#error_message").html("All is fine");
        GAME.assertUniqueDecalPosition(gridIndex, dirIndex, MAP.map.decals);
        MAP.map.decals.push(Array(gridIndex, dirIndex, nameId, type));
        break;
      case "light":
        console.log("light, value", currentValue, "grid", grid);
        switch (currentValue) {
          case MAPDICT.WALL:
            dir = GAME.getSelectedDir();
            console.log(".dir", dir);
            if (dir.same(NOWAY)) {
              $("#error_message").html("Light decal needs direction");
              return;
            }
            dirIndex = dir.toInt();
            nameId = $("#light_decal")[0].value;
            type = $("#lighttype")[0].value;
            MAP.map.lights.push(Array(gridIndex, dirIndex, nameId, type));
            break;
          default:
            $("#error_message").html(`Light placement not supported on value: ${currentValue}`);
            return;
        }
        $("#error_message").html("All is fine");
        break;
      case "cleargrid":
        for (let arrType of [MAP.map.decals, MAP.map.lights, MAP.map.gates, MAP.map.keys]) {
          let iElementToRemove = [];
          for (let [index, element] of arrType.entries()) {
            if (element[0] === gridIndex) {
              iElementToRemove.push(index);
            }
          }
          arrType.removeIfIndexInArray(iElementToRemove);
        }
        $("#error_message").html("All is fine: grid cleared");
        break;
      case "start":
        //console.log("start, value", currentValue, "grid", grid);
        switch (currentValue) {
          case MAPDICT.EMPTY:
            dir = GAME.getSelectedDir();
            console.log(".dir", dir);
            if (dir.same(NOWAY)) {
              $("#error_message").html("Start needs direction");
              return;
            }
            dirIndex = dir.toInt();
            MAP.map.start = [gridIndex, dirIndex];
            break;
          default:
            $("#error_message").html(`Start placement not supported on value: ${currentValue}`);
            return;
        }
        $("#error_message").html("All is fine");
        break;
      case "key":
        //console.log("key, value", currentValue, "grid", grid);
        switch (currentValue) {
          case MAPDICT.EMPTY:
            let keyValue = $("#key_type")[0].value;
            let keyTypeIndex = KEY_TYPES.indexOf(keyValue);
            console.log("key", gridIndex, keyValue, keyTypeIndex);
            MAP.map.keys.push(Array(gridIndex, keyTypeIndex));
            break;
          default:
            $("#error_message").html(`Key placement not supported on value: ${currentValue}`);
            return;
        }
        $("#error_message").html("All is fine");
        break;
      case "monster":
        console.log("monster, value", currentValue, "grid", grid);
        switch (currentValue) {
          case MAPDICT.EMPTY:
            let monsterValue = $("#monster_type")[0].value;
            MAP.map.monsters.push(Array(gridIndex, monsterValue));
            break;
          default:
            $("#error_message").html(`Monster placement not supported on value: ${currentValue}`);
            return;
        }
        break;
    }

    GAME.render();
  },
  assertUniqueDecalPosition(gridIndex, dirIndex, array) {
    for (let [index, element] of array.entries()) {
      if (element[0] === gridIndex) {
        if (element[1] === dirIndex) {
          let remove = array.splice(index, 1);
          $("#error_message").html("removed duplicate decal");
          console.warn("removed duplicate decal", remove);
          return;
        }
      }
    }
  },
  printMaterialDetails() {
    const material = MATERIAL[$("#materialtype")[0].value];
    const html = `
    <span style="background-color: ${colorVectorToRGB_String(material.ambientColor)}">Ambient: ${colorVectorToHex(material.ambientColor)}</span><br/>
    <span style="background-color: ${colorVectorToRGB_String(material.diffuseColor)}">Diffuse: ${colorVectorToHex(material.diffuseColor)}</span><br/>
    <span style="background-color: ${colorVectorToRGB_String(material.specularColor)}">Specular: ${colorVectorToHex(material.specularColor)}</span><br/>
    <span>Shininess: ${material.shininess}</span><br/>
    `;
    $("#material-details").html(html);
  },
  printLightDetails() {
    const light = LIGHT_COLORS[$("#lighttype")[0].value];
    const html = `
      <span>R: ${light[0]}</span><br/>
      <span>G: ${light[1]}</span><br/>
      <span>B: ${light[2]}</span><br/>
    `;
    $("#light-details").html(html);
    const code = colorVectorToHex(light);
    $("#light-code").html(`<span style="background-color: ${colorVectorToRGB_String(light)}"> Code: ${code}</span>`);
  },
  getSelectedDecal() {
    const radio = $("#selector2 input[name=decalusage]:checked").val();
    switch (radio) {
      case "picture":
        return [$("#picture_decal")[0].value, radio];
      case "crest":
        return [$("#crest_decal")[0].value, radio];
      default:
        console.error("decalusage error");
        return [NULL, NULL];
    }
  },
  getSelectedDir() {
    const radio = $("#selector input[name=directions]:checked").val();
    return eval(radio);
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
    const radio = $("#selector input[name=renderer]:checked").val();
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
      MAP.init();
      console.log("map:", MAP.map);
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
  async copyToClipboard() {
    let copyText = $("#exp")[0];
    console.log("copyText", copyText);
    try {
      await navigator.clipboard.writeText(copyText.value);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  },
  getResolution(texture) {
    return [texture.width, texture.height];
  },
  updateTextures() {
    const wallTexture = TEXTURE[$("#walltexture")[0].value];
    const floorTexture = TEXTURE[$("#floortexture")[0].value];
    const ceilTexure = TEXTURE[$("#ceiltexture")[0].value];
    ENGINE.fill(LAYER.wallcanvas, wallTexture);
    ENGINE.fill(LAYER.floorcanvas, floorTexture);
    ENGINE.fill(LAYER.ceilcanvas, ceilTexure);
    const ids = ["wall_resolution", "floor_resolution", "ceil_resolution"];
    for (const [i, pTexture] of [wallTexture, floorTexture, ceilTexure].entries()) {
      let res = GAME.getResolution(pTexture);
      $(`#${ids[i]}`).html(`width: ${res[0]}, height: ${res[1]}`);
    }
  },
  repaintTextures() {
    GAME.updateTextures();
    if ($("#selector input[name=renderer]:checked").val() === "texture") {
      GAME.texture();
    }
  },
  setup() {
    console.log("GAME SETUP started");
    GAME.updateWH();

    $(ENGINE.gameWindowId).width(ENGINE.gameWIDTH + 4);
    ENGINE.addBOX("ROOM", ENGINE.gameWIDTH, ENGINE.gameHEIGHT, ["pacgrid", "wall", "grid", "coord", "click"], null);

    $("#buttons").append("<input type='button' id='new' value='New'>");
    $("#buttons").append("<input type='button' id='export' value='Export'>");
    $("#buttons").append("<input type='button' id='import' value='Import'>");
    $("#buttons").append("<input type='button' id='copy' value='Copy to Clipboard'>");

    $("#gridsize").on("change", GAME.render);

    const TextureList = [];
    for (const prop in TEXTURE) {
      TextureList.push(prop);
    }
    TextureList.sort();

    for (const prop of TextureList) {
      $("#walltexture").append(`<option value="${prop}">${prop}</option>`);
      $("#floortexture").append(`<option value="${prop}">${prop}</option>`);
      $("#ceiltexture").append(`<option value="${prop}">${prop}</option>`);
    }
    LAYER.wallcanvas = $("#wallcanvas")[0].getContext("2d");
    LAYER.floorcanvas = $("#floorcanvas")[0].getContext("2d");
    LAYER.ceilcanvas = $("#ceilcanvas")[0].getContext("2d");
    $("#floortexture").val("RockFloor");
    $("#ceiltexture").val("Pavement");
    GAME.updateTextures();
    $("#walltexture").change(GAME.repaintTextures);
    $("#floortexture").change(GAME.repaintTextures);
    $("#ceiltexture").change(GAME.repaintTextures);

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

    for (const light in LIGHT_COLORS) {
      $("#lighttype").append(`<option value="${light}">${light}</option>`);
    }
    GAME.printLightDetails();
    $("#lighttype").change(GAME.printLightDetails);

    for (const material in MATERIAL) {
      if (material !== "VERSION") {
        $("#materialtype").append(`<option value="${material}">${material}</option>`);
      }
    }
    GAME.printMaterialDetails();
    $("#materialtype").change(GAME.printMaterialDetails);

    for (const gateType of GATE_TYPES) {
      $("#gatetype").append(`<option value="${gateType}">${gateType}</option>`);
    }
    ENGINE.drawToId("gatecanvas", 0, 0, SPRITE[`DungeonDoor_${$("#gatetype")[0].value}`]);

    $("#gatetype").change(function () {
      ENGINE.drawToId("gatecanvas", 0, 0, SPRITE[`DungeonDoor_${$("#gatetype")[0].value}`]);
    });

    for (const keyType of KEY_TYPES) {
      $("#key_type").append(`<option value="${keyType}">${keyType}</option>`);
    }
    $("#randpic").click(GAME.randomPic);
    $("#randcrest").click(GAME.randomCrest);

    for (const monsterType in MONSTER_TYPE) {
      $("#monster_type").append(`<option value="${monsterType}">${monsterType} A: ${MONSTER_TYPE[monsterType].attack} D: ${MONSTER_TYPE[monsterType].defense} M: ${MONSTER_TYPE[monsterType].magic}</option>`);
    }
  },
  randomPic() {
    const pic = DECAL_PAINTINGS.chooseRandom();
    $("#picture_decal").val(pic).change();
    ENGINE.drawToId("picturecanvas", 0, 0, SPRITE[$("#picture_decal")[0].value]);
  },
  randomCrest() {
    const pic = [...DECAL_CRESTS, ...BOTTOM_CRESTS, ...TOP_CRESTS].chooseRandom();
    $("#crest_decal").val(pic).change();
    ENGINE.drawToId("crestcanvas", 0, 0, SPRITE[$("#crest_decal")[0].value]);
  },
  texture() {
    GAME.textureGrid();
  },
  export() {
    let rle = MAP.map.GA.exportMap();
    let Export = { width: MAP.width, height: MAP.height, map: rle };
    let RoomID = $("#roomid")[0].value;
    let roomExport = `${RoomID} : {
data: '${JSON.stringify(Export)}',
wall: "${$("#walltexture")[0].value}",
floor: "${$("#floortexture")[0].value}",
ceil: "${$("#ceiltexture")[0].value}",\n`;
    const descriptors = ['start', 'decals', 'lights', 'gates', 'keys', 'monsters'];
    for (let desc of descriptors) {
      if (MAP.map[desc].length > 0) {
        roomExport += `${desc}: '${JSON.stringify(MAP.map[desc])}',\n`;
      }
    }
    roomExport += `}`;
    $("#exp").val(roomExport);
  },
  import() {
    const ImportText = $("#exp").val();
    console.info("ImportText", ImportText);
    const Import = JSON.parse(ImportText.extractGroup(/data:\s\'(.*)\'/));
    const roomId = ImportText.extract(/^\w*/);
    $("#roomid").val(roomId);

    const Textures = ["wall", "floor", "ceil"];
    for (const prop of Textures) {
      const pattern = new RegExp(`${prop}:\\s"(.*)"`);
      $(`#${prop}texture`).val(ImportText.extractGroup(pattern));
    }

    GAME.updateTextures();
    MAP.map = FREE_MAP.import(Import);
    MAP.init();

    const properties = ['decals', 'lights', 'start', 'gates', 'keys', 'monsters'];
    for (const prop of properties) {
      const pattern = new RegExp(`${prop}:\\s'(.*)'`);
      let value = ImportText.extractGroup(pattern);
      MAP.map[prop] = JSON.parse(value) || [];
    }

    console.log("map", MAP.map);
    MAP.width = Import.width;
    MAP.height = Import.height;
    $("#horizontalGrid").val(Import.width);
    $("#verticalGrid").val(Import.height);
    $("#horizontalGrid").trigger("change");
    $("#verticalGrid").trigger("change");
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
