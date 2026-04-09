let screens = ["screen-logo","screen-intro","screen-menu","screen-lobby","screen-game"];

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let mode = "";

const cells = document.querySelectorAll(".cell");

// 🔁 Screen control
function showScreen(id) {
    screens.forEach(s => document.getElementById(s).classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
}

// 🎬 FLOW: Logo → Intro → Menu
setTimeout(() => showScreen("screen-intro"), 2000);
setTimeout(() => showScreen("screen-menu"), 5000);

// ▶ Start Game
function startGame(selectedMode) {
    mode = selectedMode;
    showScreen("screen-game");
    restartGame();
}

// 🎮 Game Logic
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let index = cell.getAttribute("data-index");

        if (board[index] !== "") return;

        board[index] = currentPlayer;
        cell.innerText = currentPlayer;

        if (checkWinner()) {
            setTimeout(() => alert(currentPlayer + " Wins 👑"), 100);
            restartGame();
            return;
        }

        if (!board.includes("")) {
            alert("Draw!");
            restartGame();
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (mode === "robot" && currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    });
});

// 🤖 AI
function aiMove() {
    let empty = board.map((v,i)=> v===""?i:null).filter(v=>v!==null);
    let move = empty[Math.floor(Math.random()*empty.length)];
    document.querySelector(`.cell[data-index='${move}']`).click();
}

// 🏆 Check Winner
function checkWinner() {
    let win = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return win.some(p =>
        board[p[0]] &&
        board[p[0]] === board[p[1]] &&
        board[p[1]] === board[p[2]]
    );
}

// 🔄 Restart
function restartGame() {
    board = ["","","","","","","","",""];
    cells.forEach(c => c.innerText = "");
    currentPlayer = "X";
}

// 🌐 ONLINE (Demo like Ludo King)
function createRoom() {
    let code = Math.floor(1000 + Math.random()*9000);
    alert("Room Created: " + code);
    showScreen("screen-game");
}

function joinRoom() {
    let code = document.getElementById("roomCode").value;
    if (code === "") {
        alert("Enter Room Code!");
        return;
    }
    alert("Joined Room: " + code);
    showScreen("screen-game");
}