/**
* WORLD WAR 3 - CORE COMBAT ENGINE (Sezonul 1)
* Analiza de Precizie: WW3 Tech (90%) vs. Standard (55%)
*/

const COMBAT_DATABASE = {
    EFFICIENCY_WW3: 0.90,     
    EFFICIENCY_LEGACY: 0.55,  
    
    FACTIONS: {
        ZENITH: {
            precision: 0.95,      
            bit_modifier: 1.2,    
            special: "Orbital Strike"
        },
        KHAOS: {
            precision: 0.75,      
            damage_multiplier: 1.4, 
            special: "Splash Damage"
        }
    }
};

const UNIT_STATS = {
    SUBMARIN_NUC: { hp: 600, atk: 150, range: "Global", stealth: true },
    PORTAVION_A:  { hp: 1500, atk: 100, drones: 12, shield: 200 },
    TANC_LEVIATHAN: { hp: 1000, atk: 250, armor: 0.8 }
};

function calculateFinalStrike(unitType, factionName) {
    const unit = UNIT_STATS[unitType];
    const faction = COMBAT_DATABASE.FACTIONS[factionName];
    
    // 1. Calculăm Damage-ul de Bază bazat pe eficiența WW3 (90%)
    let basePower = unit.atk * COMBAT_DATABASE.EFFICIENCY_WW3;
    
    // 2. Aplicăm modificatorul de facțiune
    let finalDamage;
    if (factionName === 'ZENITH') {
        finalDamage = basePower * faction.precision;
    } else {
        finalDamage = (basePower * faction.precision) * faction.damage_multiplier;
    }

    // 3. Comparație cu unitățile Standard (55%)
    let legacyDmg = unit.atk * COMBAT_DATABASE.EFFICIENCY_LEGACY;
    let advantage = ((finalDamage / legacyDmg - 1) * 100).toFixed(1);

    // AFIȘARE REZULTATE (Fără semne de exclamare)
    console.log(--- RAPORT DE LUPTĂ [${factionName}] ---);
    console.log(Unitate: ${unitType});
    console.log(Damage Generat: ${finalDamage.toFixed(2)});
    console.log(Avantaj față de alte jocuri: +${advantage}%);
    
    return {
        damage: finalDamage,
        advantage_pct: advantage
    };
}

function checkOrbitalReady(currentBits) {
    const threshold = 1000;
    if (currentBits >= threshold) {
        if (typeof triggerOrbitalVisuals === "function") {
            triggerOrbitalVisuals(); 
        }
        return { power: 5000, precision: "100%", status: "DEVASTATING" };
    }
    return { status: "CHARGING", remaining: threshold - currentBits };
}

// Simularea bătăliei inițiale
const sim = calculateFinalStrike('TANC_LEVIATHAN', 'KHAOS');
