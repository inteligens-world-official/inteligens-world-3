/**
 * WORLD WAR 3 - UNIT REGISTRY
 * Statistica de precizie 100% pentru Sezonul 1
 */

const ARMY_REGISTRY = {
    SOLDIERS: {
        id: "inf_01",
        name: "Vânător de Cenușă",
        faction: "KHAOS",
        hp: 100,
        atk: 15,
        speed: 5,
        cost: { oil: 20, uranium: 5 }
    },
    TANKS: {
        id: "tank_01",
        name: "Leviathan X1",
        faction: "KHAOS",
        hp: 850,
        atk: 210, // Damage brut masiv
        armor: 0.75,
        cost: { oil: 150, uranium: 40 }
    },
    SUBMARINES: {
        id: "sub_01",
        name: "Trident Stealth",
        faction: "ZENITH",
        hp: 400,
        atk: 180,
        stealth_rating: 0.90, // 90% invizibilitate
        cost: { oil: 100, uranium: 120 }
    },
    CARRIERS: {
        id: "carrier_01",
        name: "Zenith Fortress",
        faction: "ZENITH",
        hp: 1800,
        atk: 90, // Atac prin drone
        precision_bonus: 0.95,
        cost: { oil: 300, uranium: 500 }
    }
};

// Funcție pentru a genera o unitate nouă în inventarul jucătorului
function deployUnit(unitType) {
    const unit = ARMY_REGISTRY[unitType];
    console.log([HQ] Unitatea ${unit.name} a fost desfășurată pe câmpul de luptă!);
    return unit;
}
