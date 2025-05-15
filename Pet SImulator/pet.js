let hunger = 50;
let happiness = 50;
let energy = 50;

const hungerEl = document.getElementById("hunger");
const happinessEl = document.getElementById("happiness");
const energyEl = document.getElementById("energy");
const statusEl = document.getElementById("status");
const petFace = document.getElementById("pet");

function updateStats() {
  hungerEl.textContent = hunger;
  happinessEl.textContent = happiness;
  energyEl.textContent = energy;

  // Status update
  if (hunger >= 90) {
    statusEl.textContent = "Fluffy is starving!";
    petFace.textContent = "😿";
  } else if (happiness <= 10) {
    statusEl.textContent = "Fluffy is very sad.";
    petFace.textContent = "😢";
  } else if (energy <= 10) {
    statusEl.textContent = "Fluffy is exhausted.";
    petFace.textContent = "😴";
  } else if (hunger <= 20 && happiness >= 80 && energy >= 80) {
    statusEl.textContent = "Fluffy is super happy!";
    petFace.textContent = "😻";
  } else {
    statusEl.textContent = "Fluffy is feeling okay!";
    petFace.textContent = "😺";
  }
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function feed() {
  hunger = clamp(hunger - 30);
  energy = clamp(energy + 10);
  happiness = clamp(happiness + 5);
  updateStats();
}

function play() {
  happiness = clamp(happiness + 20);
  energy = clamp(energy - 10);
  hunger = clamp(hunger + 10);
  updateStats();
}

function sleep() {
  energy = clamp(energy + 30);
  hunger = clamp(hunger + 10);
  updateStats();
}

// Stats decay every 5 seconds
setInterval(() => {
  hunger = clamp(hunger + 2);
  happiness = clamp(happiness - 1);
  energy = clamp(energy - 1);
  updateStats();
}, 5000);

// Initial stat display
updateStats();
