// ==========================================
// 1. CONFIGURAȚIA OFICIALĂ INTELIGENS
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyCZWA9HfF2vpxS-o3R4jTW3Pgzot8EtQN4",
  authDomain: "world-war-3-84b0f.firebaseapp.com",
  databaseURL: "https://world-war-3-84b0f-default-rtdb.firebaseio.com/",
  projectId: "world-war-3-84b0f",
  storageBucket: "world-war-3-84b0f.firebasestorage.app",
  messagingSenderId: "697325755845",
  appId: "1:697325755845:web:482887c50c2add41e97fac"
};

// ==========================================
// 2. INIȚIALIZARE SERVER
// ==========================================
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// ==========================================
// 3. LOGICA DE MEMORARE ȘI ACTUALIZARE DATE
// ==========================================
function salveazaSiLogheaza(idRecrut, parolaRecrut) {
    // Generăm un email automat bazat pe ID pentru baza de date
    // (Jucătorul îl poate actualiza ulterior în setări)
    const emailCreat = idRecrut.toLowerCase() + "@inteligens-world.ro";

    // Salvăm în serverul Realtime Database sub folderul 'jucatori_inregistrati'
    return database.ref('jucatori_inregistrati/' + idRecrut).set({
        nume_utilizator: idRecrut,
        parola_acces: parolaRecrut,       // Memorează parola pe server
        email_asociat: emailCreat,        // Actualizează datele de email
        data_creare: new Date().toLocaleString(),
        status_cont: "ACTIV",
        nivel_acces: "AMIRAL"
    })
    .then(() => {
        // Memorează datele local pentru a fi recunoscut pe harta.html
        localStorage.setItem('nume_comandant', idRecrut);
        localStorage.setItem('parola_comandant', parolaRecrut);
        localStorage.setItem('email_comandant', emailCreat);

        console.log("Datele pentru " + idRecrut + " au fost memorate și sincronizate.");
        
        // Trimite utilizatorul la Harta Operativă
        alert("INTELIGENS: DATE MEMORATE PE SERVER. ACCES CONFIRMAT!");
        window.location.href = 'harta.html';
    })
    .catch((error) => {
        console.error("Eroare Server Inteligens:", error);
        alert("EROARE CRITICĂ SERVER: " + error.message);
    });
}

// ==========================================
// 4. MESAJE DE CONTROL SISTEM
// ==========================================
console.log("Sistemul INTELIGENS Database: OPERAȚIONAL 100%");
