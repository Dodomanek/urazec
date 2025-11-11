(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))y(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&y(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function y(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const h=["Máš IQ menší než teplotu místnosti... v lednu... na Antarktidě.","Kdyby hloupost bolela, volal bys sanitku každou hodinu.","Tvoje osobnost má tolik hloubky jako kaluž na parkovišti.","Jsi živý důkaz, že evoluce může jít i zpět.","Kdyby byl mozek dynamit, neměl bys dost na to, aby ti spadl klobouk.","Tvoje logika má tolik smyslu jako brčko ve vidličce.","Jsi tak nudný, že ti televize vypíná zvuk.","Máš osobnost jako nedělní omítka.","Tvoje kreativita je na úrovni prázdného Word dokumentu.","Jsi tak speciální jako šedá ponožka.","Tvoje myšlenky jsou jako internet v roce 1995 - pomalé a nepoužitelné.","Kdyby byl inteligence měna, byl bys bankrot.","Máš charizma jako mokrý pařez.","Tvoje nápady mají tolik energie jako rozbitá baterie.","Jsi jako tutorial, který všichni přeskočí.","Tvoje vtipnost je na úrovni notifikací o aktualizaci Windows.","Máš tolik talentu jako prázdný textový soubor.","Jsi jako reklama na YouTube - všichni tě chtějí přeskočit.","Tvoje elegance připomíná pytlík od brambůrků v parku.","Máš styl jako prezentace v Comic Sans.","Tvoje sebevědomí je oprávněné asi jako parkování na invalidním místě.","Jsi tak originální jako motivační citát na Facebooku.","Tvoje konverzace je vzrušující jako čtení nápisu na lahvi od minerálky.","Máš energii jako telefon na 1 procentech bez nabíječky.","Jsi jako captcha - nikdo tě nemá rád a všichni tě musí řešit."],B=document.getElementById("app");B.innerHTML=`
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
`;let g=0,p=null;const l=document.getElementById("insultText"),E=document.getElementById("generateBtn"),L=document.getElementById("voiceBtn"),m=document.getElementById("listenBtn"),z=document.getElementById("sendBtn"),i=document.getElementById("userInput"),x=document.getElementById("counter"),d=document.getElementById("chatMessages"),j=document.getElementById("listeningStatus"),f=document.getElementById("voiceIndicator"),u=window.speechSynthesis,M=window.SpeechRecognition||window.webkitSpeechRecognition,a=new M;a.continuous=!1;a.interimResults=!0;a.lang="cs-CZ";let k=!1;const b=["To ti říkám já, ne naopak!","Haha, to je dobrá! Máš další?","Zajímavé, ale já bych ti dal ještě lepší.","Aha, teď si to vezmu! 😏","To je slabé, počkej na mou!","Ano, ano, ale podívej se na mě!","Včera jsem slyšel lepší od školáka.","To je tak sladké. Teď tedy něco opravdového.","Pche! To je vůbec nic.","Trochu jsi mě zklaman. Zkusíš znovu?"];function S(){const e=Math.floor(Math.random()*h.length);return h[e]}function w(){const e=Math.floor(Math.random()*b.length);return b[e]}function v(e,t=!1){const o=document.createElement("div");o.className=`chat-message ${t?"user":"agent"}`,o.textContent=e,d.appendChild(o),d.scrollTop=d.scrollHeight}function c(e){u.speaking&&u.cancel();const t=new SpeechSynthesisUtterance(e);t.lang="cs-CZ",t.rate=1,t.pitch=1,t.volume=1,f.style.display="flex",t.onend=()=>{f.style.display="none"},u.speak(t)}function I(){l.classList.add("fade-out"),setTimeout(()=>{const e=S();p=e,l.textContent=e,g++,x.textContent=g,l.classList.remove("fade-out"),l.classList.add("fade-in"),v(e,!1),c(e),setTimeout(()=>{l.classList.remove("fade-in")},300)},150)}a.onstart=()=>{k=!0,j.textContent="Poslouchám...",m.classList.add("active")};a.onend=()=>{k=!1,j.textContent="Vypnuto",m.classList.remove("active")};a.onresult=e=>{let t="";for(let o=e.resultIndex;o<e.results.length;o++)t+=e.results[o][0].transcript;e.results[e.results.length-1].isFinal,i.value=t};a.onerror=e=>{console.error("Speech recognition error:",e.error)};function C(){k?a.stop():(i.value="",a.start())}function T(){const e=i.value.trim();e&&(v(e,!0),c(e),i.value="",setTimeout(()=>{const t=w();v(t,!1),c(t)},1500))}E.addEventListener("click",I);L.addEventListener("click",()=>{p&&c(p)});m.addEventListener("click",C);z.addEventListener("click",T);i.addEventListener("keypress",e=>{e.key==="Enter"&&T()});document.addEventListener("keydown",e=>{e.code==="Space"&&(e.preventDefault(),I())});
