require('dotenv').config();

try {
  const key = JSON.parse(process.env.FIREBASE_KEY);
  key.private_key = key.private_key.replace(/\\n/g, '\n');

  console.log("✅ Private key parsed successfully!");
  console.log(key); // opcionalno – prikazuje ceo objekt

} catch (e) {
  console.error("❌ ERROR parsing FIREBASE_KEY:", e.message);
}
