

const $ = id => document.getElementById(id);

let history = [];

let section = "";

let aiConfigured = false;

const sections = {

  Agenda: "Hier kun je straks je afspraken bekijken.",

  Werk: "Hier komen je zakelijke dossiers, leasing en klanten.",

  Onderzoeken: "Hier komen je stamboomonderzoek en SVVU-onderzoek.",

  Nieuws: "Hier komt het actuele nieuws.",

  Woning: "Hier komen je woning, energie en plannen.",

  "Privé": "Hier komen je persoonlijke plannen en herinneringen."

};

function show(page) {

  document.querySelectorAll(".page").forEach(el => {

    el.classList.toggle("active", el.id === page);

  });

  document.querySelectorAll("nav button").forEach(el => {

    el.classList.toggle(

      "selected",

      el.dataset.page === page

    );

  });

  window.scrollTo(0, 0);

}

function openSection(name) {

  section = name;

  if ($("detail-title")) {

    $("detail-title").textContent = name;

  }

  if ($("detail-text")) {

    $("detail-text").textContent =

      sections[name] || "Onderdeel wordt voorbereid.";

  }

  show("detail");

}

function addMessage(role, message) {

  history.push({ role, content: message });

  const chat = $("chat-messages");

  if (!chat) return;

  const bubble = document.createElement("div");

  bubble.className = "message " + role;

  bubble.textContent = message;

  chat.appendChild(bubble);

  chat.scrollTop = chat.scrollHeight;

}

function localAnswer(question) {

  const q = question.toLowerCase();

  if (q.includes("agenda")) {

    return "Je agenda is nog niet gekoppeld. Zodra er een beveiligde koppeling is, kunnen hier afspraken verschijnen.";

  }

  if (q.includes("werk") || q.includes("leasing")) {

    return "Bij Werk kunnen we je leasingdossiers, klanten en zakelijke taken organiseren.";

  }

  if (q.includes("stamboom") || q.includes("familie")) {

    return "Je stamboomonderzoek kan onder Onderzoeken worden beheerd. Er is nog geen onderzoeksdatabase gekoppeld.";

  }

  if (q.includes("svvu") || q.includes("voetbal")) {

    return "Je SVVU-onderzoek kan hier worden georganiseerd. Er is nog geen krantenarchief gekoppeld.";

  }

  if (q.includes("nieuws")) {

    return "De live nieuwsfunctie moet nog worden aangesloten.";

  }

  if (q.includes("woning") || q.includes("energie")) {

    return "Bij Woning kunnen we je energieverbruik, verwarming en woonplannen bijhouden.";

  }

  return "Ik heb je bericht ontvangen. Dit is momenteel een demonstratiechat. Voor echte AI-antwoorden moet nog een beveiligde AI-service worden aangesloten.";

}

async function sendMessage() {

  const input = $("chat-input");

  if (!input) return;

  const message = input.value.trim();

  if (!message) return;

  input.value = "";

  addMessage("user", message);

  if (!aiConfigured) {

    addMessage("assistant", localAnswer(message));

    return;

  }

  addMessage(

    "assistant",

    "De AI-koppeling is nog niet beschikbaar."

  );

}

function openChat() {

  show("chat");

  const input = $("chat-input");

  if (input) input.focus();

}

function initApp() {

  document.querySelectorAll("[data-page]").forEach(button => {

    button.addEventListener("click", () => {

      show(button.dataset.page);

    });

  });

  document.querySelectorAll("[data-section]").forEach(button => {

    button.addEventListener("click", () => {

      openSection(button.dataset.section);

    });

  });

  const send = $("send-button");

  if (send) {

    send.addEventListener("click", sendMessage);

  }

  const input = $("chat-input");

  if (input) {

    input.addEventListener("keydown", event => {

      if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();

      }

    });

  }

  const chatButton = $("chat-button");

  if (chatButton) {

    chatButton.addEventListener("click", openChat);

  }

  window.openChat = openChat;

  window.openSection = openSection;

  window.show = show;

  window.sendMessage = sendMessage;

}

if (document.readyState === "loading") {

  document.addEventListener("DOMContentLoaded", initApp);

} else {

  initApp();

}
