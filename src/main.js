import './style.css';
import { insults } from './insults.js';

const app = document.getElementById('app');

app.innerHTML = `
  <div class="container">
    <header class="header">
      <h1>Osobní Urážecí Stroje</h1>
      <p class="subtitle">Generátor kreativních urážek pro všechny příležitosti</p>
    </header>

    <main class="main">
      <div class="insult-card">
        <div class="insult-text" id="insultText">
          Klikněte na tlačítko pro vygenerování urážky
        </div>
      </div>

      <button class="generate-btn" id="generateBtn">
        <span class="btn-icon">🎲</span>
        <span class="btn-text">Vygenerovat urážku</span>
      </button>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Vygenerováno:</span>
          <span class="stat-value" id="counter">0</span>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>Vytvořeno s láskou a zlomyslností</p>
    </footer>
  </div>
`;

let counter = 0;
const insultText = document.getElementById('insultText');
const generateBtn = document.getElementById('generateBtn');
const counterElement = document.getElementById('counter');

function getRandomInsult() {
  const randomIndex = Math.floor(Math.random() * insults.length);
  return insults[randomIndex];
}

function animateInsult() {
  insultText.classList.add('fade-out');

  setTimeout(() => {
    const newInsult = getRandomInsult();
    insultText.textContent = newInsult;
    counter++;
    counterElement.textContent = counter;
    insultText.classList.remove('fade-out');
    insultText.classList.add('fade-in');

    setTimeout(() => {
      insultText.classList.remove('fade-in');
    }, 300);
  }, 150);
}

generateBtn.addEventListener('click', animateInsult);

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    animateInsult();
  }
});
