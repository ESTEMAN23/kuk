
let currentRound = 0;
let data = null;
let successStreak = 0;

fetch("https://esteman23.github.io/mathlord/data/A4_1.json")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    showRound(currentRound);
  });

function pad(n, width = 2) {
  return n.toString().padStart(width, " ");
}

function showRound(roundIndex) {
  const container = document.getElementById("round-container");
  document.getElementById("feedback-text").innerText = "";
  container.innerHTML = `<h3>Ronda ${roundIndex + 1} de ${data.rounds.length}</h3>`;
  const round = data.rounds[roundIndex];
  round.items.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="math-block">
${pad(item.top)}<br>
+${pad(item.bottom)}
      </div>
      <br>
      <input type="number" id="answer-${item.id}" class="math-input"/>
    `;
    container.appendChild(div);
  });
}

function submitRound() {
  const round = data.rounds[currentRound];
  let correctCount = 0;

  round.items.forEach((item) => {
    const input = document.getElementById(`answer-${item.id}`);
    const value = parseInt(input.value);
    const correct = item.top + item.bottom;
    if (value === correct) {
      correctCount++;
    }
  });

  const feedback = document.getElementById("feedback-text");

  if (correctCount === round.items.length) {
    successStreak++;
    feedback.innerText = `✅ ¡Perfecto! Todas correctas (${correctCount}/${round.items.length}).`;
  } else {
    successStreak = 0;
    feedback.innerText = `❌ Obtuviste ${correctCount} de ${round.items.length} correctas. Intenta de nuevo.`;
    return;
  }

  if (successStreak >= 2) {
    feedback.innerText += "\n🎉 Desbloqueaste el siguiente scroll.";
    // Aquí puedes añadir lógica para mostrar botón o redirigir a A4.2
  }

  if (currentRound < data.rounds.length - 1) {
    currentRound++;
    setTimeout(() => showRound(currentRound), 1500);
  } else {
    feedback.innerText += "\n📜 Scroll completado.";
  }
}
