const buttons = document.querySelectorAll(".choice");
const resultDiv = document.getElementById('result');
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById('computer-score');
const roundCountSpan = document.getElementById('round-count');

let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const playerChoice = button.dataset.choice;
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);

        if (result === "WIN") playerScore++;
        if (result === "LOSE") computerScore++;

        resultDiv.textContent = `You chose ${playerChoice}, computer chose ${computerChoice}. Result: ${result}`;

        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
        roundCountSpan.textContent = round;

        round++;

        if (round > maxRounds) {
            if (playerScore > computerScore) {
                resultDiv.textContent = "YOU HAVE WON";
            } else if (playerScore < computerScore) {
                resultDiv.textContent = "YOU HAVE LOST";
            } else {
                resultDiv.textContent = "DRAW, ALL OF YOU SUCK";
            }

        buttons.forEach(btn => btn.disabled = true);
        showResetButton();
        }


    });
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getResult(player, computer) {
    if (player === computer) return "DRAW";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "WIN";
    }
    return "LOSE";
}

function showResetButton() {
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "STRUGGLE AGAIN";
    resetBtn.style.marginTop = "20px";
    resetBtn.classList.add("resetBtn");

    resetBtn.addEventListener("click", () => {
        playerScore = 0;
        computerScore = 0;
        round = 1;

        playerScoreSpan.textContent = "0";
        computerScoreSpan.textContent = "0";
        roundCountSpan.textContent = "1";
        resultDiv.textContent = "";

        buttons.forEach(btn => btn.disabled = false);
        resetBtn.remove();
    });

    document.querySelector(".game-container").appendChild(resetBtn);
}