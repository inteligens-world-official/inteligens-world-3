/**
 * World War 3 - Tank Units System
 * Sezoanele 1, 2 și 3
 */

const TankModels = {
    // SEZONUL 1: Forță Brută
    IRON_BULWARK: {
        name: "Iron Bulwark",
        season: 1,
        stats: { hp: 800, armor: 150, attack: 70, speed: 15 },
        costs: { iron: 500, fuel: 200 },
        specialAbility: "Fortify" // Crește armura la 250 dar nu se mai mișcă
    },

    // SEZONUL 2: Anti-Spionaj
    GHOST_BREAKER: {
        name: "Ghost-Breaker",
        season: 2,
        stats: { hp: 600, armor: 100, attack: 85, speed: 35 },
        costs: { iron: 400, fuel: 300, electronics: 100 },
        radarRadius: 150, // Raza în care vede spionii
        scanForSpies: function(nearbyUnits) {
            return nearbyUnits.filter(u => u.type === 'spy' && u.distance <= this.radarRadius);
        }
    },

    // SEZONUL 3: Tehnologie Modernă
    SPECTER_MBT: {
        name: "Specter MBT",
        season: 3,
        stats: { hp: 500, shield: 300, attack: 110, speed: 65 },
        costs: { iron: 600, fuel: 500, energy: 400 },
        isHackable: true, // Vulnerabil la spionii cibernetici
        regenShield: function() {
            if (this.stats.shield < 300) this.stats.shield += 10;
        }
    }
};

export default TankModels;
