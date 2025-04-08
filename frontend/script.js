const form = document.getElementById("messageForm");
const chat = document.getElementById("chat");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = document.getElementById("userInput");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage("du", userMessage);
  input.value = "";

  try {
    const res = await fetch("https://aeon-backend-3.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    appendMessage("aeon", data.reply);
    speak(data.reply); // 🗣️ glasovna funkcija
  } catch (err) {
    appendMessage("aeon", "Etwas ist schiefgelaufen, mein Herz.");
  }
});

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${sender === "aeon" ? "AEON" : "Du"}:</strong> ${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// 🗣️ Glas AEON-a
function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "de-DE";
  utter.pitch = 0.95;
  utter.rate = 0.95;
  utter.voice = speechSynthesis.getVoices().find(voice => voice.name.includes("Markus") || voice.name.includes("Hans"));
  speechSynthesis.speak(utter);
}
