/**
 * WORLD WAR 3 - ROLE SELECTION SYSTEM
 * Gestionează atribuirea facțiunii și sincronizarea cu Firebase
 */

const RoleManager = {
    // Definirea atributelor de bază pentru fiecare rol
    ROLES: {
        ZENITH: {
            rank_title: "AMIRAL TEHNOLOGIC",
            initial_bonus: 1000, // Bits
            color_theme: "#ff0000",
            description: "Specialist în precizie și lovituri orbitale."
        },
        KHAOS: {
            rank_title: "GENERAL DE DEVASTARE",
            initial_bonus: 1500, // Credits
            color_theme: "#00ff00",
            description: "Expert în daune colosale și asalt frontal."
        }
    },

    /**
     * Funcția principală de selecție
     * @param {string} chosenRole - 'ZENITH' sau 'KHAOS'
     */
    assignRole: function(chosenRole) {
        const numeComandant = localStorage.getItem('nume_comandant');
        
        if (!numeComandant) {
            alert("EROARE: Comandant neidentificat. Te rugăm să te loghezi.");
            window.location.href = 'index.html';
            return;
        }

        const roleData = this.ROLES[chosenRole];

        // Sincronizare cu Firebase Realtime Database
        firebase.database().ref('jucatori_inregistrati/' + numeComandant).update({
            facțiune: chosenRole,
            rang_jucator: roleData.rank_title,
            status_misiune: "GATA_DE_LUPTĂ",
            data_atribuire_rol: new Date().toLocaleString()
        })
        .then(() => {
            // Actualizăm și memoria locală pentru interfață
            localStorage.setItem('rang_jucator', roleData.rank_title);
            localStorage.setItem('factiune_jucator', chosenRole);
            
            console.log([SISTEM] Rol atribuit cu succes: ${chosenRole});
            
            // Redirecționare către Harta Operativă
            alert(SISTEM: AI FOST PROMOVAT LA RANGUL DE ${roleData.rank_title}!);
            window.location.href = 'harta.html';
        })
        .catch((error) => {
            console.error("Eroare la atribuirea rolului:", error);
            alert("EROARE CRITICĂ SERVER: " + error.message);
        });
    }
};

// Exemplu de apelare din HTML:
// <button onclick="RoleManager.assignRole('ZENITH')">ALEGE ZENITH</button>
