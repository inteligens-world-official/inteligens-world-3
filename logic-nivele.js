/**
 * WORLD WAR 3 - LEVEL & PROGRESSION SYSTEM (Sezonul 1)
 * Gestionează XP-ul și promovarea gradelor militare.
 */

const LevelSystem = {
    // Configurația pragurilor de XP
    XP_THRESHOLDS: {
        RECRUT: 0,
        SOLDAT: 1000,
        OFITER: 5000,
        COLONEL: 15000,
        GENERAL: 50000,
        AMIRAL: 100000
    },

    /**
     * Adaugă XP jucătorului după o misiune sau bătălie
     * @param {number} xpAmount - Cantitatea de XP câștigată
     */
    addExperience: function(xpAmount) {
        const numeComandant = localStorage.getItem('nume_comandant');
        
        if (!numeComandant) return;

        const userRef = firebase.database().ref('jucatori_inregistrati/' + numeComandant);

        userRef.once('value').then((snapshot) => {
            let data = snapshot.val();
            let currentXP = (data.experienta || 0) + xpAmount;
            let currentRank = data.rang_jucator || "RECRUT";
            
            // Verificăm dacă a avansat în grad
            let newRank = this.calculateRank(currentXP);

            // Actualizăm serverul
            userRef.update({
                experienta: currentXP,
                rang_jucator: newRank,
                ultima_actualizare_nivel: new Date().toLocaleString()
            }).then(() => {
                localStorage.setItem('rang_jucator', newRank);
                console.log([PROGRES] XP Actual: ${currentXP}. Rang: ${newRank});
                
                if (newRank !== currentRank) {
                    this.triggerPromotionAlert(newRank);
                }
            });
        });
    },

    /**
     * Determină rangul în funcție de XP-ul total
     */
    calculateRank: function(xp) {
        let finalRank = "RECRUT";
        for (let rank in this.XP_THRESHOLDS) {
            if (xp >= this.XP_THRESHOLDS[rank]) {
                finalRank = rank;
            }
        }
        return finalRank;
    },

    /**
     * Notificare vizuală pentru promovare
     */
    triggerPromotionAlert: function(rank) {
        alert(FELICITĂRI, COMANDANTE! Ai fost promovat la rangul de: ${rank});
        // Forțăm reîncărcarea interfeței pentru a schimba culorile (Verde -> Roșu)
        window.location.reload();
    }
};

// Exemplu: Când jucătorul termină o misiune în Harta Operativă
// LevelSystem.addExperience(1200);
