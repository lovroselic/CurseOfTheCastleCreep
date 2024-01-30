const MONSTER_TYPE = {

    
    
    
    
    Drax: {
        name: "Drax",
        model: "Drax",
        scale: 1.5 / 2 ** 1,
        rotateToNorth: Math.PI,
        midHeight: 0.5,
        deathType: "BloodExplosion",
        inventory: GOLD_ITEM_TYPE.Coins,
        attack: 50,
        defense: 25,
        magic: 25,
        health: 100,
        xp: 125,
        gold: 100,
        attackSound: "HumanAttack1",
        hurtSound: "Ow",
        behaviourArguments: [Infinity, ["wanderer"], 10, ["shoot"]],
        moveSpeed: 1.0,
        mana: 3,
        caster: true,
        shootDistance: 10,
        stalkDistance: 12,
        material: MATERIAL.standard,
    },
};