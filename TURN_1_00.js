/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
/*jshint -W083 */
"use strict";

/**
 *      dependencies:
 *          ENGINE
 *          GAME.infoTimer
 */

const TURN = {
    VERSION: "1.00",
    CSS: "color: #b785a7",
    damage(attacker, defender) {
        if (attacker.attack === 0) return 0;
        let delta = attacker.attack - defender.defense;
        let damage = RND(Math.min(-1, (delta / 2) | 0), Math.max(delta, 1));
        return damage;
    },
    /*magicDamage(attacker, defender) {
        if (attacker.magic === 0) return 0;
    },*/
    display(value, color = "#0F0") {
        ENGINE.clearLayer("info");
        let CTX = LAYER.info;
        let fs = 16;
        CTX.font = fs + "px Times";
        CTX.shadowColor = "#666";
        CTX.shadowOffsetX = 1;
        CTX.shadowOffsetY = 1;
        CTX.shadowBlur = 0;
        CTX.fillStyle = color;
        CTX.textAlign = "center";
        CTX.fillText(value, ENGINE.gameWIDTH / 2, ENGINE.gameHEIGHT / 2);
        GAME.infoTimer();
    }
};
//END
console.log(`%cTURN ${TURN.VERSION} loaded.`, TURN.CSS);