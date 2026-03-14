// ==========================================
// WORLD WAR 3 - MOTOR ECONOMIC SEZONUL 1
// ==========================================

const ECON_CONFIG = {
    uranium_rate: 10,
    oil_rate: 25,
    update_interval: 60000 
};

// Tabelul de prețuri oficial pentru unități
const UNIT_SHOP = {
    KHAOS: {
        "Vânător de Cenușă": { uranium: 5, oil: 20, time: 30 },
        "Tanc Leviathan": { uranium: 50, oil: 150, time: 180 },
        "Drona Kamikaze": { uranium: 10, oil: 40, time: 45 },
        "Artilerie Asediu": { uranium: 100, oil: 200, time: 300 }
    },
    ZENITH: {
        "Gardian Plasma": { uranium: 15, oil: 10, time: 45 },
        "Blindat Strider": { uranium: 30, oil: 60, time: 120 },
        "Interceptor Phantom": { uranium: 80, oil: 40, time: 240 },
        "Sistem Satelit": { uranium: 200, oil: 50, time: 600 }
    }
};

let playerResources = {
    uranium: 100,
    oil: 500,
    credits: 1000,
    faction: localStorage.getItem('userFaction') || 'KHAOS' // Detectează facțiunea aleasă
};

// --- LOGICA DE GENERARE ---

function getOwnedBasesCount() {
    // Momentan returnăm 1 baze pentru test, aici va veni logica de pe hartă
    return 1; 
}

function generateResources() {
    const activeBases = getOwnedBasesCount();
    
    // Aplicăm bonusuri de facțiune
    let uBonus = playerResources.faction === 'ZENITH' ? 1.2 : 1.0; // ZENITH +20% Uraniu
    let oBonus = playerResources.faction === 'KHAOS' ? 1.2 : 1.0;  // KHAOS +20% Petrol

    playerResources.uranium += Math.floor(activeBases * ECON_CONFIG.uranium_rate * uBonus);
    playerResources.oil += Math.floor(activeBases * ECON_CONFIG.oil_rate * oBonus);
    
    updateUI();
}

// --- LOGICA DE ACHIZIȚIE ---

function buyUnit(unitName) {
    const faction = playerResources.faction;
    const unit = UNIT_SHOP[faction][unitName];

    if (!unit) {
        console.error("Unitatea nu există pentru facțiunea ta!");
        return;
    }

    if (playerResources.uranium >= unit.uranium && playerResources.oil >= unit.oil) {
        // Scădem resursele
        playerResources.uranium -= unit.uranium;
        playerResources.oil -= unit.oil;
        
        console.log(Recrutare începută: ${unitName}. Gata în ${unit.time}s);
        updateUI();
        
        // Aici poți adăuga o funcție care pornește timer-ul de construcție pe site
        return true;
    } else {
        alert("Resurse insuficiente! Mai ai nevoie de Uraniu sau Petrol.");
        return false;
    }
}

// --- ACTUALIZARE INTERFAȚĂ ---

function updateUI() {
    if(document.getElementById('uranium-display')) {
        document.getElementById('uranium-display').innerText = playerResources.uranium;
    }
    if(document.getElementById('oil-display')) {
        document.getElementById('oil-display').innerText = playerResources.oil;
    }
    // Salvăm progresul local
    localStorage.setItem('playerResources', JSON.stringify(playerResources));
}

// Pornire automată
setInterval(generateResources, ECON_CONFIG.update_interval);
updateUI();
