const questions = {
  general: [
      { question: "What is the smallest country in the world by area?", options: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"], answer: 1 },
      { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2 },
      { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "J.K. Rowling"], answer: 1 },
  ],
  tech: [
      { question: "Who is known as the father of the computer?", options: ["Alan Turing", "Charles Babbage", "Steve Jobs", "Tim Berners-Lee"], answer: 1 },
      { question: "What is the name of the latest stable release of Python (as of 2023)?", options: ["Python 3.8", "Python 3.9", "Python 3.10", "Python 3.11"], answer: 3 },
      { question: "Which company developed the JavaScript programming language?", options: ["Netscape", "Microsoft", "Sun Microsystems", "Oracle"], answer: 0 },
  ],
  sports: [
      { question: "What is the length of a cricket pitch?", options: ["20 meters", "26 meters", "24 meters", "22 meters"], answer: 3 },
      { question: "Who is considered the GOAT in football?", options: ["Cristiano Ronaldo", "Pele", "Lionel Messi", "Diego Maradona"], answer: 2 },
      { question: "In which sport would you perform a slam dunk?", options: ["Soccer", "Basketball", "Volleyball", "Baseball"], answer: 1 },
  ],
  history: [
      { question: "Who was the first President of the United States?", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], answer: 0 },
      { question: "In what year did the Titanic sink?", options: ["1918", "1905", "1912", "1920"], answer: 2 },
      { question: "Who discovered America?", options: ["Christopher Columbus", "Ferdinand Magellan", "Leif Erikson", "Marco Polo"], answer: 0 },
  ],
  geography: [
      { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Rome", "Paris"], answer: 3 },
      { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
      { question: "Which continent is known as the 'Dark Continent'?", options: ["Asia", "Africa", "Australia", "America"], answer: 1 },
  ],
  literature: [
      { question: "Who wrote 'Pride and Prejudice'?", options: ["Emily Brontë", "Jane Austen", "Charles Dickens", "Mark Twain"], answer: 1 },
      { question: "What is a haiku?", options: ["A type of poem", "A novel", "A painting", "A song"], answer: 0 },
      { question: "Which author created the character Sherlock Holmes?", options: ["Agatha Christie", "Arthur Conan Doyle", "J.K. Rowling", "Stephen King"], answer: 1 },
  ],
  movies: [
      { question: "Which movie won the Oscar for Best Picture in 2020?", options: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"], answer: 0 },
      { question: "Who directed 'Jurassic Park'?", options: ["George Lucas", "Steven Spielberg", "James Cameron", "Peter Jackson"], answer: 1 },
      { question: "What is the highest-grossing film of all time?", options: ["Titanic", "Avatar", "Avengers: Endgame", "Star Wars"], answer: 2 },
  ],
};

const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.querySelector('.quiz-screen');
const resultScreen = document.querySelector('.result-screen');
const questionElement = document.querySelector('.quiz-question h3');
const optionsList = document.querySelector('.options');
const nextBtn = document.querySelector('.next-question button');
const scoreElement = document.getElementById('score');
const totalQuestionsElement = document.getElementById('total-questions');
const accuracyElement = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const topicTitle = document.querySelector('.topic h2');

let currentQuestionIndex = 0;
let score = 0;
let selectedTopic = "";

startBtn.addEventListener("click", () => {
  selectedTopic = document.getElementById('select-topic').value;
  startQuiz();
});

nextBtn.addEventListener("click", () => {
  nextQuestion();
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  const topicNames = {
      general: "General Knowledge",
      tech: "Technology",
      sports: "Sports",
      history:"History",
      geography:"Geography",
      literature:"Literature",
      movies:"Movies",
  };
  topicTitle.textContent = `Topic: ${topicNames[selectedTopic]}`;
  
  loadQuestion();
}

function loadQuestion() {
  const questionData = questions[selectedTopic][currentQuestionIndex];
  questionElement.textContent = questionData.question;
  optionsList.innerHTML = "";

  questionData.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.className = "option";
      li.textContent = option;
      li.addEventListener("click", () => handleAnswer(index));
      optionsList.appendChild(li);
  });
}

function handleAnswer(selectedIndex) {
  const questionData = questions[selectedTopic][currentQuestionIndex];
  if (selectedIndex === questionData.answer) {
      score++;
  }
  document.querySelectorAll('.option').forEach((option, index) => {
      option.style.backgroundColor = index === questionData.answer ? "green" : (index === selectedIndex ? "red" : "");
      option.style.pointerEvents = "none";
  });
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[selectedTopic].length) {
      loadQuestion();
  } else {
      showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreElement.textContent = score;
  totalQuestionsElement.textContent = questions[selectedTopic].length;
  accuracyElement.textContent = `${Math.round((score / questions[selectedTopic].length) * 100)}%`;
}
restartBtn.addEventListener("click", () => {
  restartQuiz();
});

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedTopic = "";

  resultScreen.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");

  questionElement.textContent = "";
  optionsList.innerHTML = "";
}
