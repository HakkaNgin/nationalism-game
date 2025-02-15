// Load questions from data.json
let gameData;
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        gameData = data;
        startGame();
    });

// Game State
let currentQuestion = null;

// Start the game
function startGame() {
    currentQuestion = gameData.start;
    showQuestion(currentQuestion);
}

// Show a question and its options
function showQuestion(questionKey) {
    let questionData = gameData[questionKey];
    document.getElementById("question").textContent = questionData.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    questionData.options.forEach(option => {
        let button = document.createElement("button");
        button.textContent = option.text;
        button.onclick = () => handleChoice(option.next);
        optionsDiv.appendChild(button);
    });
}

// Handle user choice
function handleChoice(nextQuestion) {
    if (gameData[nextQuestion]) {
        showQuestion(nextQuestion);
    } else {
        showResult(nextQuestion);
    }
}

// Show final country result
function showResult(countryKey) {
    let result = gameData.results[countryKey];
    document.getElementById("game").innerHTML = `
        <h2>${result.name}</h2>
        <img src="assets/${result.image}" alt="${result.name}">
        <p>${result.description}</p>
        <button onclick="startGame()">Play Again</button>
    `;
}
