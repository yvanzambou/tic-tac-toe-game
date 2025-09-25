const tabs = document.querySelectorAll(".tab");
const msg = document.querySelector(".msg");
const restart = document.querySelector(".restart");
const winnerConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let tableState = Array(9).fill("");
let svg_X = '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"> <line x1="10" y1="10" x2="90" y2="90" stroke="red" stroke-width="10" /> <line x1="10" y1="90" x2="90" y2="10" stroke="red" stroke-width="10" /> </svg>';
let svg_O = '<svg height="100" width="100" xmlns="http://www.w3.org/2000/svg"><circle r="40" cx="50" cy="50" stroke="blue" stroke-width="10" fill="white" /></svg>';
let currentPlayer = svg_X;
let running = false;
let thereIsAWinner = false;

// ============================

function initializeGame() {
    tabs.forEach(tab => tab.addEventListener("click", tabCliked));
    restart.addEventListener("click", restartGame);
    updateMsg();
    running = true;
}

function updateMsg() {
    msg.innerHTML = currentPlayer + "ist dran!";
}

function tabCliked() {
    const tabIndex = this.getAttribute("tabIndex");
    if(thereIsAWinner) {
        return;
    }
    if (!(tableState[tabIndex] == "" || running)) {
        return;
    }
    updateTab(this, tabIndex);
    checkWinner();
}

function updateTab(tab, index) {
    tableState[index] = currentPlayer;
    tab.innerHTML = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == svg_O) ? svg_X : svg_O;
    updateMsg();
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winnerConditions.length; i++) {
        const condition = winnerConditions[i];
        const tabA = tableState[condition[0]];
        const tabB = tableState[condition[1]];
        const tabC = tableState[condition[2]];

        if (tabA == "" || tabB == "" || tabC == "") continue;
        
        if (tabA == tabB && tabB == tabC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        endGame();
        msg.innerHTML = currentPlayer + "hat gewonnen!";
        thereIsAWinner = true;
    } else if (!tableState.includes("")) {
        endGame();
         msg.innerHTML = "Spiel unentschieden!"
    } else {
        changePlayer();
    }
}

function endGame() {
    tabs.forEach(tab => tab.style.cursor = "not-allowed");
    running = false;
}

function restartGame() {
    currentPlayer = svg_X;
    tableState = Array(9).fill("");
    tabs.forEach(tab => tab.style.cursor = "pointer");
    updateMsg();
    tabs.forEach(tab => tab.innerHTML = "");
    thereIsAWinner = false;
    running = true;
}

// ============================

initializeGame();