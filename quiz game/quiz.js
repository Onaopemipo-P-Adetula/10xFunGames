const questions = [
  {
    q: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    q: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    q: "What color is the sky?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: "Blue"
  }
];

let current = 0;
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');

function showQuestion() {
  const q = questions[current];
  questionEl.textContent = q.q;
  answersEl.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    answersEl.appendChild(btn);
  });
}

function checkAnswer(answer) {
  if (answer === questions[current].answer) {
    resultEl.textContent = "Correct!";
  } else {
    resultEl.textContent = "Wrong!";
  }
  setTimeout(() => {
    current++;
    resultEl.textContent = "";
    if (current < questions.length) {
      showQuestion();
    } else {
      questionEl.textContent = "Quiz Completed!";
      answersEl.innerHTML = "";
    }
  }, 1000);
}

showQuestion();
