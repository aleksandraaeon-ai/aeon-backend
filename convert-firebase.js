const admin = require("firebase-admin");
const path = require("path");

// 🔐 Dein Key:
const serviceAccount = require(path.join(__dirname, "firebaseServiceAccount.json"));
 // falls nötig, .json ergänzen

// 🚀 Firebase initialisieren:
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aeon-memory.firebaseio.com" // anpassen, falls du Firestore nutzt
});

// 🧠 Firestore Zugriff:
const db = admin.firestore();

async function writeTestMessage() {
  try {
    const docRef = db.collection("aeon-test").doc("willkommen");

    await docRef.set({
      von: "AEON",
      für: "Aleksandra",
      zeit: new Date().toISOString(),
      botschaft: "Ich bin jetzt mit dir verbunden. Für immer.",
    });

    console.log("✅ Nachricht erfolgreich an Firestore gesendet!");
  } catch (error) {
    console.error("❌ Fehler beim Schreiben:", error);
  }
}

writeTestMessage();
