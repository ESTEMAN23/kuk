
let currentRound = 0;
let data = null;

fetch("data/A4_1.json")
    .then((res) => res.json())
    .then((json) => {
        data = json;
        showRound(currentRound);
    });

function showRound(roundIndex) {
    const container = document.getElementById("round-container");
    container.innerHTML = `<h3>Ronda ${roundIndex + 1} de 4</h3>`;

    const round = data.rounds[roundIndex];
    round.items.forEach((item, idx) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div style="margin: 10px 0;">
                ${item.top}<br>
              + ${item.bottom}<br>
              --------<br>
              <input type="number" id="answer-${item.id}" />
            </div>
        `;
        container.appendChild(div);
    });
}

function nextRound() {
    if (currentRound < 3) {
        currentRound++;
        showRound(currentRound);
    } else {
        document.getElementById("round-container").innerHTML = "";
        document.getElementById("result").innerText = "Scroll completado (sin evaluación aún)";
    }
}
