/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */

"use strict";

/** Lights */
const LIGHT_COLORS = {
    standard: new Float32Array([0.90, 0.90, 0.81]),
    standard2: new Float32Array([0.88, 0.86, 0.78]),
    standardDimmed: new Float32Array([0.8, 0.8, 0.7]),
    standardSoft: new Float32Array([0.80, 0.78, 0.70]),         // Slightly softer, subtle warm tint
    standardMuted: new Float32Array([0.72, 0.70, 0.63]),        // More muted and calm
    standardDim: new Float32Array([0.64, 0.62, 0.56]),          // Dimmer, gentle ambiance
    standardFaint: new Float32Array([0.56, 0.54, 0.49]),        // Very faint, subtle background tone
    standardVeryFaint: new Float32Array([0.48, 0.46, 0.42]),    // softer, calmer, gently dimmed
    standardUltraFaint: new Float32Array([0.40, 0.38, 0.35]),   // extremely subdued, subtle background
    standardRedish: new Float32Array([0.95, 0.88, 0.80]),
    standardYellow: new Float32Array([0.88, 0.83, 0.65]),       // Slightly yellow-tinted, bright and warm
    standardYellowDim: new Float32Array([0.78, 0.72, 0.55]),    // Moderately dimmed yellowish tint
    standardYellowSoft: new Float32Array([0.68, 0.62, 0.47]),   // Gentle soft yellow glow
    standardYellowFaint: new Float32Array([0.58, 0.53, 0.40]),  // Subtle, faint yellowish ambiance
    dim: new Float32Array([0.45, 0.45, 0.40]),
    dimRed: new Float32Array([0.50, 0.225, 0.035]),
    fire: new Float32Array([0.94, 0.50, 0.07]),
    fireNew: new Float32Array([0.90, 0.45, 0.10]),
    fireSoft: new Float32Array([0.80, 0.40, 0.12]),             // gentler flame, suitable for candles or torches
    fireDim: new Float32Array([0.68, 0.34, 0.10]),              // muted, dim flame for subtle ambiance
    fireplace: new Float32Array([0.80, 0.40, 0.12]),
    fireplaceDim: new Float32Array([0.68, 0.34, 0.10]),
    red: new Float32Array([0.95, 0.70, 0.70]),
    lightRed: new Float32Array([0.5, 0.1, 0.1]),
    yellowgreen: new Float32Array([0.90, 0.90, 0.50]),
    darkYellow: new Float32Array([0.80, 0.80, 0.0]),
    veryDarkYellow: new Float32Array([0.50, 0.50, 0.0]),
    white: new Float32Array([1.0, 1.0, 1.0]),
    blue: new Float32Array([0.0, 0.0, 1.0]),
    lightBlue: new Float32Array([0.0, 0.0, 0.5]),
    fullRed: new Float32Array([1.0, 0.0, 0.0]),
    gold: new Float32Array([0.831372, 0.686274, 0.21568627]),
    silver: new Float32Array([0.752941176, 0.752941176, 0.752941176]),
    green: new Float32Array([0.0, 1.0, 0.0]),
    lightGreen: new Float32Array([0.0, 0.5, 0.0]),
    gray: new Float32Array([0.5, 0.5, 0.5]),
    darkgray: new Float32Array([0.25, 0.25, 0.25]),
    lightgray: new Float32Array([0.75, 0.75, 0.75]),
    emerald: new Float32Array([0.3137, 0.7843, 0.470588]),
    white: new Float32Array([1.0, 1.0, 1.0]),
    candle: new Float32Array([1.0, 0.823529, 0.1098]),
    dimCandle: new Float32Array([0.8, 0.7, 0.10]),
    weakCandle: new Float32Array([0.5, 0.41, 0.05]),
    softCandle: new Float32Array([0.85, 0.75, 0.25]),       // Gentle candle glow, soft yellow
    warmCandle: new Float32Array([0.70, 0.60, 0.15]),       // Warmer, slightly dimmer candlelight
    faintCandle: new Float32Array([0.55, 0.48, 0.10]),      // Very subdued, faint candle effect
    harshSun: new Float32Array([1.0, 1.0, 1.0]),
    normalSun: new Float32Array([0.9, 0.85, 0.8]),
    cyan: new Float32Array([0.0, 1.0, 1.0]),
    orange: new Float32Array([1.0, 0.65, 0.0]),
    pink: new Float32Array([1.0, 0.0, 0.5]),
    orangeDimmed: new Float32Array([0.8, 0.52, 0.0]),        // Slightly softer and warmer
    softOrange: new Float32Array([0.7, 0.45, 0.05]),         // Even more gentle, muted orange
    mutedOrange: new Float32Array([0.6, 0.4, 0.1]),           // Most subdued, earthy orange
    steelAmbient: new Float32Array([0.30, 0.32, 0.34]),    // Soft, cool dark-gray base tone
    steelDiffuse: new Float32Array([0.55, 0.57, 0.59]),    // Brighter, reflective gray tone
    steelSpecular: new Float32Array([0.85, 0.87, 0.89]),   // Bright specular highlights with bluish tint
};

/** Materials */

const MATERIAL = {
    VERSION: "1.03",
    wall: new Material(LIGHT_COLORS.gray, LIGHT_COLORS.lightgray, LIGHT_COLORS.darkgray, 0.8),
    marble: new Material(LIGHT_COLORS.gray, LIGHT_COLORS.lightgray, LIGHT_COLORS.darkgray, 0.85),
    standard: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.standard, LIGHT_COLORS.standard, 0.125),
    standardShine: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.standard, LIGHT_COLORS.standard, 0.8),
    paper: new Material(LIGHT_COLORS.standard, LIGHT_COLORS.white, LIGHT_COLORS.white, 0.8),
    gold: new Material(LIGHT_COLORS.gold, LIGHT_COLORS.gold, LIGHT_COLORS.gold, 0.90),
    silver: new Material(LIGHT_COLORS.silver, LIGHT_COLORS.silver, LIGHT_COLORS.silver, 0.90),
    redShine: new Material(LIGHT_COLORS.fullRed, LIGHT_COLORS.fullRed, LIGHT_COLORS.fullRed, 0.5),
    blueShine: new Material(LIGHT_COLORS.blue, LIGHT_COLORS.blue, LIGHT_COLORS.blue, 0.5),
    fire: new Material(LIGHT_COLORS.fire, LIGHT_COLORS.fire, LIGHT_COLORS.fire, 0.5),
    greenShine: new Material(LIGHT_COLORS.green, LIGHT_COLORS.green, LIGHT_COLORS.green, 0.90),
    greenFluence: new Material(LIGHT_COLORS.green, LIGHT_COLORS.lightGreen, LIGHT_COLORS.green, 0.05),
    blueFluence: new Material(LIGHT_COLORS.lightBlue, LIGHT_COLORS.lightBlue, LIGHT_COLORS.lightBlue, 0.05),
    redFluence: new Material(LIGHT_COLORS.fullRed, LIGHT_COLORS.lightRed, LIGHT_COLORS.fullRed, 0.05),
    emeraldShine: new Material(LIGHT_COLORS.emerald, LIGHT_COLORS.emerald, LIGHT_COLORS.emerald, 0.5),
    whiteShine: new Material(LIGHT_COLORS.white, LIGHT_COLORS.white, LIGHT_COLORS.white, 0.99),
    cyanShine: new Material(LIGHT_COLORS.cyan, LIGHT_COLORS.cyan, LIGHT_COLORS.cyan, 0.99),
    orangeShine: new Material(LIGHT_COLORS.orange, LIGHT_COLORS.orange, LIGHT_COLORS.orange, 0.99),
    pinkShine: new Material(LIGHT_COLORS.pink, LIGHT_COLORS.pink, LIGHT_COLORS.pink, 0.99),
    steel: new Material(LIGHT_COLORS.steelAmbient, LIGHT_COLORS.steelDiffuse, LIGHT_COLORS.steelSpecular, 0.85),
};
console.log(`%cMATERIAL v${MATERIAL.VERSION} loaded.`, "color: #888");
if (ENGINE.verbose) console.table(MATERIAL);