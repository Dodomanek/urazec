import './style.css';
import { insults } from './insults.js';

const app = document.getElementById('app');

app.innerHTML = `
  <div class="container">
    <header class="header">
      <h1>Osobní Urážecí Stroje</h1>
      <p class="subtitle">Generátor kreativních urážek s živým hlasovým asistentem</p>
    </header>

    <main class="main">
      <div class="insult-card">
        <div class="insult-text" id="insultText">
          Klikněte na tlačítko pro vygenerování urážky
        </div>
        <div class="voice-indicator" id="voiceIndicator" style="display: none;">
          <span class="pulse"></span>
        </div>
      </div>

      <div class="button-group">
        <button class="generate-btn" id="generateBtn">
          <span class="btn-icon">🎲</span>
          <span class="btn-text">Vygenerovat urážku</span>
        </button>

        <button class="voice-btn" id="voiceBtn" title="Přehrát hlasitě">
          <span class="btn-icon">🔊</span>
        </button>

        <button class="listen-btn" id="listenBtn" title="Poslouchej co do řekneš">
          <span class="btn-icon">🎤</span>
        </button>
      </div>

      <div class="chat-box">
        <div class="chat-messages" id="chatMessages"></div>
        <div class="input-group">
          <input type="text" id="userInput" placeholder="Napiš co chceš říct (nebo klikni na 🎤)..." class="text-input">
          <button class="send-btn" id="sendBtn">Poslat</button>
        </div>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Vygenerováno:</span>
          <span class="stat-value" id="counter">0</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Stavů:</span>
          <span class="stat-value" id="listeningStatus">Vypnuto</span>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>Vytvořeno s láskou a zlomyslností • Hlasový asistent live chat</p>
    </footer>
  </div>
`;

let counter = 0;
let currentInsult = null;
const insultText = document.getElementById('insultText');
const generateBtn = document.getElementById('generateBtn');
const voiceBtn = document.getElementById('voiceBtn');
const listenBtn = document.getElementById('listenBtn');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const counterElement = document.getElementById('counter');
const chatMessages = document.getElementById('chatMessages');
const listeningStatus = document.getElementById('listeningStatus');
const voiceIndicator = document.getElementById('voiceIndicator');

const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = 'cs-CZ';

let isListening = false;

const responses = [
  "To ti říkám já, ne naopak!",
  "Haha, to je dobrá! Máš další?",
  "Zajímavé, ale já bych ti dal ještě lepší.",
  "Aha, teď si to vezmu! 😏",
  "To je slabé, počkej na mou!",
  "Ano, ano, ale podívej se na mě!",
  "Včera jsem slyšel lepší od školáka.",
  "To je tak sladké. Teď tedy něco opravdového.",
  "Pche! To je vůbec nic.",
  "Trochu jsi mě zklaman. Zkusíš znovu?",
];

function getRandomInsult() {
  const randomIndex = Math.floor(Math.random() * insults.length);
  return insults[randomIndex];
}

function getRandomResponse() {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

function addChatMessage(text, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isUser ? 'user' : 'agent'}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function speak(text) {
  if (synth.speaking) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'cs-CZ';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  voiceIndicator.style.display = 'flex';

  utterance.onend = () => {
    voiceIndicator.style.display = 'none';
  };

  synth.speak(utterance);
}

function animateInsult() {
  insultText.classList.add('fade-out');

  setTimeout(() => {
    const newInsult = getRandomInsult();
    currentInsult = newInsult;
    insultText.textContent = newInsult;
    counter++;
    counterElement.textContent = counter;
    insultText.classList.remove('fade-out');
    insultText.classList.add('fade-in');

    addChatMessage(newInsult, false);
    speak(newInsult);

    setTimeout(() => {
      insultText.classList.remove('fade-in');
    }, 300);
  }, 150);
}

recognition.onstart = () => {
  isListening = true;
  listeningStatus.textContent = 'Poslouchám...';
  listenBtn.classList.add('active');
};

recognition.onend = () => {
  isListening = false;
  listeningStatus.textContent = 'Vypnuto';
  listenBtn.classList.remove('active');
};

recognition.onresult = (event) => {
  let transcript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }

  if (event.results[event.results.length - 1].isFinal) {
    userInput.value = transcript;
  } else {
    userInput.value = transcript;
  }
};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};

function startListening() {
  if (!isListening) {
    userInput.value = '';
    recognition.start();
  } else {
    recognition.stop();
  }
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addChatMessage(message, true);
  speak(message);
  userInput.value = '';

  setTimeout(() => {
    const response = getRandomResponse();
    addChatMessage(response, false);
    speak(response);
  }, 1500);
}

generateBtn.addEventListener('click', animateInsult);
voiceBtn.addEventListener('click', () => {
  if (currentInsult) {
    speak(currentInsult);
  }
});
listenBtn.addEventListener('click', startListening);
sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    animateInsult();
  }
});
