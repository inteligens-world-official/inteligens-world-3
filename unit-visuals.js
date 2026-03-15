/**
 * WORLD WAR 3 - UNIT VISUAL DEPLOYMENT
 * Plasează unitățile cu precizie de 100% pe hartă
 */

const MAP_COORDINATES = {
    "Australia-East": { top: '78%', left: '85%' },
    "Siberia-North": { top: '15%', left: '75%' },
    "USA-East": { top: '35%', left: '25%' },
    "Pacific-Ocean": { top: '60%', left: '10%' }
};

function spawnUnitOnMap(unitType, locationKey, faction) {
    const map = document.getElementById('map-container');
    const coords = MAP_COORDINATES[locationKey];

    if (!coords) return;

    // Creăm elementul vizual (pictograma)
    const unitDiv = document.createElement('div');
    unitDiv.className = unit-icon unit-${faction.toLowerCase()};
    unitDiv.style.top = coords.top;
    unitDiv.style.left = coords.left;

    // Adăugăm imaginea corespunzătoare (Placeholder pentru iconițe)
    unitDiv.innerHTML = <img src="assets/icons/${unitType.toLowerCase()}.png" 
                         alt="${unitType}" 
                         style="width:100%; height:100%;">;

    // Eveniment de click: Afișează puterea de luptă (90% Precision)
    unitDiv.onclick = () => {
        const stats = calculateFinalStrike(unitType, faction);
        alert(UNITATE: ${unitType}\nFACȚIUNE: ${faction}\nAVANTAJ: +${stats.advantage_pct}%);
    };

    map.appendChild(unitDiv);
}

// Desfășurarea inițială a forțelor pentru Sezonul 1
function initialDeployment() {
    spawnUnitOnMap('TANC_LEVIATHAN', 'Australia-East', 'KHAOS');
    spawnUnitOnMap('SUBMARIN_NUC', 'Pacific-Ocean', 'ZENITH');
    spawnUnitOnMap('PORTAVION_A', 'USA-East', 'ZENITH');
}

window.addEventListener('load', initialDeployment);
