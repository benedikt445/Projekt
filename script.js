const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const segments = 6; // Anzahl der Segmente
const segmentAngle = 360 / segments;
const colors = ["#f9c74f", "#f9844a", "#90be6d", "#43aa8b", "#4d908e", "#577590"];
const labels = [
  "Wellness 🧖",
  "Kuss 😘",
  "Cash 💵",
  "Berlintrip 🏙️",
  "Hauptpreis 🎁",
  "Umarmung 🤗",

];
const mainPrizeIndex = 0; // Hauptpreis auf Segment 1 (Index 0)
let isSpinning = false;

function drawWheel() {
  for (let i = 0; i < segments; i++) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, (i * segmentAngle * Math.PI) / 180, ((i + 1) * segmentAngle * Math.PI) / 180);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(((i + 0.5) * segmentAngle * Math.PI) / 180);
    ctx.textAlign = "center";
    ctx.fillStyle = "#000";
    ctx.font = "14px Arial";
    ctx.fillText(labels[i], 100, 10);
    ctx.restore();
  }
}

function spinWheel() {
  if (isSpinning) return;

  isSpinning = true;
  const spinAngle = 360 * 5 + (360 - mainPrizeIndex * segmentAngle); // Dreht 5 Umdrehungen und landet auf dem Hauptpreis
  const spinTime = 5000; // Dreht 5 Sekunden

  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    const currentAngle = Math.min((elapsed / spinTime) * spinAngle, spinAngle);
    canvas.style.transform = `rotate(${currentAngle}deg)`;

    if (elapsed < spinTime) {
      requestAnimationFrame(animate);
    } else {
      setTimeout(() => {
        alert(`Herzlichen Glückwunsch! Du hast den Hauptpreis 🎁 gewonnen!`);
        isSpinning = false;
      window.location.href ="https://benedikt455.github.io/Projekt/Ticket%20PDF%20ges.pdf";
          
      }, 1000);
    }
  }

  requestAnimationFrame(animate);
}

drawWheel();
document.getElementById("spinButton").addEventListener("click", spinWheel);
